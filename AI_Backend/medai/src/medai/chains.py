import os
from dotenv import load_dotenv
from typing import Dict, Any, Literal

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

from .crew import MedaiCrew, PatientTriageCrew, CaseGeneratorCrew
from .tools.custom_tool import MedicalKnowledgeRetrieverTool
from .templates import (
    CONDENSE_QUESTION_PROMPT,
    SIMPLE_RAG_PROMPT,
    DOCTOR_ROUTER_PROMPT,
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
        return {"output": result.raw}


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

DoctorRouterChain = DOCTOR_ROUTER_PROMPT | openai_gpt4o.with_structured_output(
    DoctorRouteQuery
)

DoctorBranch = RunnableBranch(
    (
        lambda x: x["route"].route == "report_generation",
        RunnableLambda(lambda x: x["input"]) | DiagnosticCrewRunnable(),
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
