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
    ("system", """You are an expert at routing a patient's request.
     You must select one of the following routes: 'triage_request' for analyzing symptoms, or 'rag_query' for simple health-related questions.

     --- EXAMPLES ---
     User Query: "I have a sharp pain in my side and a fever." -> ROUTE: triage_request
     User Query: "What is hypertension?" -> ROUTE: rag_query
     """),
    ("human", "{question}")
])