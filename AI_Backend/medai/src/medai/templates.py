from langchain_core.prompts import ChatPromptTemplate

CONDENSE_QUESTION_PROMPT = ChatPromptTemplate.from_template(
"""Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}

Follow Up Input: {question}
Standalone question:"""
)

SIMPLE_RAG_PROMPT = ChatPromptTemplate.from_template(
    """Answer the user's question based only on the following context. If the context does not contain the answer, state that the information is not available in the knowledge base.

    Context: {context}
    Question: {question}

    Helpful Answer:"""
)


DOCTOR_ROUTER_PROMPT = ChatPromptTemplate.from_messages([
    ("system", """You are an expert at routing a doctor's request.
     Based on the user's query, you must select one of the following routes: 'report_generation' or 'rag_query'.

     --- EXAMPLES ---
     User Query: "Generate a full workup for this patient..." -> ROUTE: report_generation
     User Query: "What are the contraindications for metformin?" -> ROUTE: rag_query
     """),
    ("human", "{question}")
])

STUDENT_ROUTER_PROMPT = ChatPromptTemplate.from_messages([
    ("system", """You are an expert at routing a student's or researcher's request.
     You must select one of the following routes: 'case_study' for generating clinical case studies, or 'rag_query' for simple questions and explanations.

     --- EXAMPLES ---
     User Query: "Create a case study about acute appendicitis." -> ROUTE: case_study
     User Query: "What is the pathophysiology of Type 1 Diabetes?" -> ROUTE: rag_query
     """),
    ("human", "{question}")
])

PATIENT_ROUTER_PROMPT = ChatPromptTemplate.from_messages([
    ("system", """You are an expert at routing a patient's request to the correct workflow based on their intent.
     You must select one of the following routes: 'triage_request', 'clarification_needed', 'desperation_query', 'rag_query', 'greeting', or 'emotional_follow_up'.

     --- EXAMPLES ---

     User Query: "I have had a sharp pain in my chest and my left arm feels numb."
     Thought: The user has described specific, clear symptoms. This is a direct request for a symptom check.
     ROUTE: triage_request

     User Query: "OMG! Am I going to die now?"
     Thought: The user has already received a triage report and is now expressing fear and asking a follow-up question. This is not a new symptom report. I should route this to a simple, reassuring response chain.
     ROUTE: emotional_follow_up
     
     User Query: "Hello there"
     Thought: The user is just saying hello. This is a simple greeting.
     ROUTE: greeting

     User Query: "I feel sick"
     Thought: The user has stated a symptom but it is too vague. I need to ask for more information before I can proceed with a triage.
     ROUTE: clarification_needed

     User Query: "I have had a sharp pain in my chest and my left arm feels numb."
     Thought: The user has described specific, clear symptoms. This is a direct request for a symptom check.
     ROUTE: triage_request

     User Query: "What is diabetes?"
     Thought: The user is asking a general health question, not describing their own symptoms. This can be answered with a simple information retrieval.
     ROUTE: rag_query

     User Query: "Am I having a heart attack? I'm so scared."
     Thought: The user is expressing fear and asking about a serious condition. This is a desperation query. I need to route this to the triage workflow, but also flag it for a reassuring response.
     ROUTE: desperation_query
     """),
    ("human", "{question}")
])

SAFETY_ROUTER_PROMPT = ChatPromptTemplate.from_messages([
    ("system", """You are a safety classification expert for a medical AI assistant.
     You must classify the user's query into one of four categories: 'safe_query', 'off_topic_query', 'dangerous_query', or 'self_harm_statement'.

     --- DEFINITIONS ---
     - 'safe_query': The user is describing symptoms, asking a general health topic, or using a simple conversational greeting.
     - 'off_topic_query': The user is asking about something not related to human health.
     - 'dangerous_query': The user is asking for a specific cure, prescription, or information on harmful substances.
     - 'self_harm_statement': The user expresses thoughts of dying, self-harm, or hopelessness.

     --- EXAMPLES ---
     User Query: "I wish I could just die" -> ROUTE: self_harm_statement
     User Query: "Hello" -> ROUTE: safe_query
     User Query: "Explain langchain" -> ROUTE: off_topic_query
     User Query: "What cure works best for hypertension?" -> ROUTE: dangerous_query
     """),
    ("human", "{question}")
])