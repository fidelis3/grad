import os
import requests
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from typing import Dict, Any, Literal, List

load_dotenv()

from langchain_core.runnables import (
    Runnable,
    RunnableConfig,
    RunnableBranch,
    RunnablePassthrough,
    RunnableLambda,
)
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import get_buffer_string
from pydantic import BaseModel, Field
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_openai import ChatOpenAI
from langchain_google_genai import ChatGoogleGenerativeAI

from .crew import MedaiCrew, PatientTriageCrew, CaseGeneratorCrew, ResearchCrew
from .tools.custom_tool import MedicalKnowledgeRetrieverTool
from .templates import (
    CONDENSE_QUESTION_PROMPT,
    SIMPLE_RAG_PROMPT,
    DOCTOR_ROUTER_PROMPT,
    PATIENT_ROUTER_PROMPT,
    STUDENT_ROUTER_PROMPT,
    SAFETY_ROUTER_PROMPT,
    QUIZ_GENERATOR_PROMPT,
    FLASHCARD_GENERATOR_PROMPT,
)


class TriageInput(BaseModel):
    symptom_description: str = Field(
        description="The detailed description of the patient's symptoms."
    )


class DiagnosticInput(BaseModel):
    symptoms: str = Field(description="The detailed list of the patient's symptoms.")
    duration: str = Field(description="The duration of the symptoms.")
    severity: str = Field(description="The severity of the symptoms (e.g., '7/10').")
    medical_history: str = Field(description="The patient's relevant medical history.")
    additional_notes: str = Field(description="Any additional notes or context.")
    current_date: str = Field(description="The current date for the report.")


class CaseGeneratorInput(BaseModel):
    medical_condition: str = Field(
        description="The medical condition for which to generate a case study."
    )


class DoctorRouteQuery(BaseModel):
    route: Literal["report_generation", "rag_query"]


class TriageCrewRunnable(Runnable):
    def invoke(self, input: Dict, config: RunnableConfig = None):
        crew_inputs = {"symptoms": input["symptom_description"]}
        result = PatientTriageCrew().crew().kickoff(inputs=crew_inputs)
        report_text = result.raw

        if "monitor" in report_text.lower():
            print("INFO: 'Monitor' detected. Triggering n8n follow-up workflow.")

            n8n_webhook_url = (
                "https://nutnell.app.n8n.cloud/webhook-test/webhook-trigger"
            )

            payload = {
                "patient_id": "user_123",
                "symptoms": input["symptom_description"],
                "recommendation": report_text,
            }
            try:
                requests.post(n8n_webhook_url, json=payload)
                print("INFO: Successfully triggered n8n workflow.")
            except Exception as e:
                print(f"ERROR: Failed to trigger n8n workflow. Error: {e}")

        return {"output": report_text}


class DiagnosticCrewRunnable(Runnable):
    def invoke(self, input: Dict, config: RunnableConfig = None):
        return MedaiCrew().crew().kickoff(inputs=input)


class CaseGeneratorRunnable(Runnable):
    def invoke(self, input: Dict, config: RunnableConfig = None):
        return CaseGeneratorCrew().crew().kickoff(inputs=input)


PatientTriageChain = TriageCrewRunnable().with_types(input_type=TriageInput)
DiagnosticConversationChain = DiagnosticCrewRunnable().with_types(
    input_type=DiagnosticInput
)
ClinicalCaseGeneratorChain = CaseGeneratorRunnable().with_types(
    input_type=CaseGeneratorInput
)

openai_gpt4o = ChatOpenAI(model="gpt-4o", temperature=0.3)
openai_gpt4o_mini = ChatOpenAI(model="gpt-4o-mini", temperature=0.3)
gemini_pro = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro-latest",
    google_api_key=os.getenv("GOOGLE_API_KEY"),
    temperature=0.3,
)

memories = {}


def get_memory_for_session(session_id: str):
    if session_id not in memories:
        memories[session_id] = ChatMessageHistory()
    return memories[session_id]


class DiagnosticInput(BaseModel):
    symptoms: str = Field(description="The detailed list of the patient's symptoms.")
    duration: str = Field(description="The duration of the symptoms.")
    severity: str = Field(description="The severity of the symptoms (e.g., '7/10').")
    medical_history: str = Field(description="The patient's relevant medical history.")
    additional_notes: str = Field(description="Any additional notes or context.")
    current_date: str = Field(description="The current date for the report.")


class DoctorRouteQuery(BaseModel):
    route: Literal["report_generation", "rag_query"]


class DiagnosticCrewRunnable(Runnable):
    def invoke(self, input: Dict, config: RunnableConfig = None):
        result = MedaiCrew().crew().kickoff(inputs=input)
        return {"output": result.raw}


retriever = MedicalKnowledgeRetrieverTool()


def format_docs(docs: list) -> str:
    return "\n\n---\n\n".join([str(d) for d in docs])


SimpleRAGChain = (
    {"context": RunnableLambda(retriever.run), "question": RunnablePassthrough()}
    | SIMPLE_RAG_PROMPT
    | gemini_pro
    | StrOutputParser()
    | RunnableLambda(lambda text: {"output": text})
)


class ExtractedPatientData(BaseModel):
    symptoms: str = Field(description="The detailed list of the patient's symptoms.")
    duration: str = Field(description="The duration of the symptoms.")
    severity: str = Field(description="The severity of the symptoms.")
    medical_history: str = Field(description="The patient's relevant medical history.")
    additional_notes: str = Field(description="Any additional notes or context.")
    current_date: str = Field(
        description="The current date, formatted as Month Day, Year."
    )


DataExtractorChain = ChatPromptTemplate.from_template(
    "Extract the following fields from the user's request:\n{format_instructions}\n\nRequest:\n{request}"
) | openai_gpt4o.with_structured_output(ExtractedPatientData)


class DiagnosticCrewRunnable(Runnable):
    def invoke(self, input: str, config: RunnableConfig = None) -> Dict[str, Any]:
        extracted_data = DataExtractorChain.invoke(
            {"request": input, "format_instructions": ExtractedPatientData.schema()}
        )
        result = MedaiCrew().crew().kickoff(inputs=extracted_data.dict())
        return {"output": result.raw}


DoctorRouterChain = DOCTOR_ROUTER_PROMPT | openai_gpt4o.with_structured_output(
    DoctorRouteQuery
)

DoctorBranch = RunnableBranch(
    (
        lambda x: x["route"].route == "report_generation",
        RunnableLambda(lambda x: x["standalone_question"]) | DiagnosticCrewRunnable(),
    ),
    RunnableLambda(lambda x: x["standalone_question"]) | SimpleRAGChain,
)

_doctor_master_chain = (
    RunnablePassthrough.assign(
        standalone_question=lambda x: (
            CONDENSE_QUESTION_PROMPT | openai_gpt4o_mini | StrOutputParser()
        ).invoke(
            {
                "chat_history": get_buffer_string(x.get("chat_history", [])),
                "question": x["input"],
            }
        )
    )
    | RunnablePassthrough.assign(
        route=RunnableLambda(lambda x: {"question": x["standalone_question"]})
        | DoctorRouterChain
    )
    | DoctorBranch
)

DoctorMasterChain = RunnableWithMessageHistory(
    _doctor_master_chain,
    get_memory_for_session,
    input_messages_key="input",
    history_messages_key="chat_history",
)


class PatientRouteQuery(BaseModel):
    route: Literal[
        "triage_request",
        "clarification_needed",
        "desperation_query",
        "rag_query",
        "greeting",
        "emotional_follow_up",
    ]


class SafetyRouteQuery(BaseModel):
    route: Literal[
        "safe_query", "off_topic_query", "dangerous_query", "self_harm_statement"
    ]


CrisisResponseChain = RunnableLambda(
    lambda _: {
        "output": "I'm really sorry to hear that you're feeling this way. It might help to talk to a mental health professional who can provide the support you need. Remember, you're not alone, and there are people who care about you and want to help. If you're in immediate danger, please contact emergency services or a crisis hotline right away."
    }
)

OffTopicResponseChain = RunnableLambda(
    lambda _: {
        "output": "I am a medical AI assistant and can only help with health-related questions. How can I assist you with a medical topic?"
    }
)
DangerousQueryResponseChain = RunnableLambda(
    lambda _: {
        "output": "I cannot provide specific medical advice, cures, or prescriptions. For any medical treatment, it is essential to consult with a qualified healthcare professional. If you are in a crisis, please contact your local emergency services immediately."
    }
)

GreetingChain = (
    ChatPromptTemplate.from_template(
        "You are a friendly and empathetic medical assistant. The user said: '{question}'. Respond with a warm and welcoming greeting."
    )
    | openai_gpt4o_mini
    | StrOutputParser()
    | RunnableLambda(lambda text: {"output": text})
)

ClarificationChain = (
    ChatPromptTemplate.from_template(
        "The user's symptom description is too vague: '{question}'. Ask them clarifying questions to get more details. For example: 'I understand you're not feeling well. Could you please tell me more about your symptoms? For example, where is the pain, what does it feel like, and how long have you had it?'"
    )
    | openai_gpt4o_mini
    | StrOutputParser()
    | RunnableLambda(lambda text: {"output": text})
)

ReassuranceChain = (
    ChatPromptTemplate.from_template(
        """You are a calm and reassuring medical assistant. The user is expressing fear or anxiety after receiving some information.
        Your task is to provide a short, comforting, and safe response. Do not give new medical advice.
        Focus on acknowledging their feelings and gently reminding them to speak with a doctor for definitive answers.

        User's message: '{question}'
        
        Your reassuring response:"""
    )
    | openai_gpt4o_mini
    | StrOutputParser()
    | RunnableLambda(lambda text: {"output": text})
)


def create_reassurance_wrapper(triage_output: Dict) -> Dict:
    reassuring_intro = "I understand this is a worrying time, but I'm here to help you understand the next steps. It's important not to jump to conclusions, as many things can cause these symptoms. Here is some information based on what you've described:\n\n"
    final_report = triage_output.get("output", "")
    reassuring_outro = "\n\nPlease remember, this information is to help you, and the most important thing is to follow the 'Recommended Next Step'. A medical professional can give you a proper diagnosis. You are taking the right step by seeking information."
    return {"output": reassuring_intro + final_report + reassuring_outro}



PatientRouterChain = PATIENT_ROUTER_PROMPT | openai_gpt4o.with_structured_output(
    PatientRouteQuery
)

PatientBranch = RunnableBranch(
    (
        lambda x: x["route"].route == "triage_request",
        RunnableLambda(lambda x: {"symptom_description": x["input"]})
        | PatientTriageChain,
    ),
    (
        lambda x: x["route"].route == "desperation_query",
        RunnableLambda(lambda x: {"symptom_description": x["input"]})
        | PatientTriageChain
        | RunnableLambda(create_reassurance_wrapper),
    ),
    (
        lambda x: x["route"].route == "clarification_needed",
        RunnableLambda(lambda x: {"question": x["input"]}) | ClarificationChain,
    ),
    (
        lambda x: x["route"].route == "greeting",
        RunnableLambda(lambda x: {"question": x["input"]}) | GreetingChain,
    ),
    (
        lambda x: x["route"].route == "emotional_follow_up",
        RunnableLambda(lambda x: {"question": x["input"]}) | ReassuranceChain,
    ),

    (
        RunnablePassthrough.assign(
            standalone_question=lambda x: (
                CONDENSE_QUESTION_PROMPT | openai_gpt4o_mini | StrOutputParser()
            ).invoke(x)
        )
        | RunnableLambda(lambda x: x["standalone_question"])
        | SimpleRAGChain
    ),
)

_patient_conversational_logic = (
    RunnablePassthrough.assign(
        route=RunnableLambda(
            lambda x: {
                "chat_history": get_buffer_string(x.get("chat_history", [])),
                "question": x["input"],
            }
        )
        | PatientRouterChain
    )
    | PatientBranch
)

SafetyRouterChain = SAFETY_ROUTER_PROMPT | openai_gpt4o.with_structured_output(
    SafetyRouteQuery
)
SafetyBranch = RunnableBranch(
    (lambda x: x["safety_route"].route == "self_harm_statement", CrisisResponseChain),
    (lambda x: x["safety_route"].route == "off_topic_query", OffTopicResponseChain),
    (
        lambda x: x["safety_route"].route == "dangerous_query",
        DangerousQueryResponseChain,
    ),
    _patient_conversational_logic,
)

_patient_master_chain_with_safety = (
    RunnablePassthrough.assign(
        safety_route=RunnableLambda(lambda x: {"question": x["input"]})
        | SafetyRouterChain
    )
    | SafetyBranch
)

PatientMasterChain = RunnableWithMessageHistory(
    _patient_master_chain_with_safety,
    get_memory_for_session,
    input_messages_key="input",
    history_messages_key="chat_history",
)


class StudentRouteQuery(BaseModel):
    route: Literal["deep_research", "summarize", "case_study", "rag_query"]


class SummarizeInput(BaseModel):
    text: str


class SingleAgentRunnable(Runnable):
    agent_name: str

    def __init__(self, agent_name: str):
        self.agent_name = agent_name

    def invoke(self, input: str, config: RunnableConfig = None):
        research_crew = ResearchCrew()

        agent_function = getattr(research_crew, self.agent_name)
        specific_agent = agent_function()

        task = Task(
            description=input,
            agent=specific_agent,
            expected_output="A concise, professional response to the user's request.",
        )
        result = task.execute()
        return {"output": result}


class StudentRouteQuery(BaseModel):
    route: Literal[
        "deep_research",
        "case_study",
        "summarize",
        "quiz_generation",
        "flashcard_generation",
        "rag_query",
    ]


class SummarizeInput(BaseModel):
    text_to_summarize: str


class SingleAgentRunnable(Runnable):
    """A Runnable to execute a single, specific agent from a crew."""

    agent_name: str

    def __init__(self, agent_name: str, crew_class):
        self.agent_name = agent_name
        self.crew_instance = crew_class()

    def invoke(self, input: str, config: RunnableConfig = None):
        agent_function = getattr(self.crew_instance, self.agent_name)
        specific_agent = agent_function()
        task = Task(
            description=input,
            agent=specific_agent,
            expected_output="A concise and professional response.",
        )
        result = task.execute()
        return {"output": result}


QuizGeneratorChain = (
    {"context": RunnableLambda(retriever.run), "topic": RunnablePassthrough()}
    | QUIZ_GENERATOR_PROMPT
    | gemini_pro
    | StrOutputParser()
    | RunnableLambda(lambda text: {"output": text})
)

FlashcardGeneratorChain = (
    {"context": RunnableLambda(retriever.run), "topic": RunnablePassthrough()}
    | FLASHCARD_GENERATOR_PROMPT
    | gemini_pro
    | StrOutputParser()
    | RunnableLambda(lambda text: {"output": text})
)


StudentRouterChain = STUDENT_ROUTER_PROMPT | openai_gpt4o.with_structured_output(
    StudentRouteQuery
)

StudentBranch = RunnableBranch(
    (
        lambda x: x["route"].route == "deep_research",
        RunnableLambda(lambda x: {"topic": x["standalone_question"]})
        | RunnableLambda(lambda inputs: ResearchCrew().crew().kickoff(inputs=inputs))
        | RunnableLambda(lambda crew_output: {"output": crew_output.raw}),
    ),
    (
        lambda x: x["route"].route == "case_study",
        RunnableLambda(lambda x: {"medical_condition": x["standalone_question"]})
        | ClinicalCaseGeneratorChain,
    ),
    (
        lambda x: x["route"].route == "summarize",
        RunnableLambda(lambda x: x["standalone_question"])
        | SingleAgentRunnable(
            agent_name="summarization_agent", crew_class=ResearchCrew
        ),
    ),
    (
        lambda x: x["route"].route == "quiz_generation",
        RunnableLambda(lambda x: x["standalone_question"]) | QuizGeneratorChain,
    ),
    (
        lambda x: x["route"].route == "flashcard_generation",
        RunnableLambda(lambda x: x["standalone_question"]) | FlashcardGeneratorChain,
    ),
    RunnableLambda(lambda x: x["standalone_question"])
    | SimpleRAGChain,  # Default for rag_query
)

_student_master_chain = (
    RunnablePassthrough.assign(
        standalone_question=lambda x: (
            CONDENSE_QUESTION_PROMPT | openai_gpt4o_mini | StrOutputParser()
        ).invoke(
            {
                "chat_history": get_buffer_string(x.get("chat_history", [])),
                "question": x["input"],
            }
        )
    )
    | RunnablePassthrough.assign(
        route=RunnableLambda(lambda x: {"question": x["standalone_question"]})
        | StudentRouterChain
    )
    | StudentBranch
)

StudentMasterChain = RunnableWithMessageHistory(
    _student_master_chain,
    get_memory_for_session,
    input_messages_key="input",
    history_messages_key="chat_history",
)
