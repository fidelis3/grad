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
    ("system", """You are an expert at routing a student or researcher's request to the correct workflow.
     You must select one of the following routes: 'deep_research', 'case_study', 'summarize', 'quiz_generation', 'flashcard_generation', or 'rag_query'.

     --- EXAMPLES ---
     User Query: "Summarize the latest research on CRISPR for treating sickle cell anemia." -> ROUTE: deep_research
     User Query: "Give me a case study on multiple sclerosis." -> ROUTE: case_study
     User Query: "Summarize this for me: [text]" -> ROUTE: summarize
     User Query: "Create a 5-question quiz on the Krebs cycle." -> ROUTE: quiz_generation
     User Query: "Make me some flashcards for the main types of antibiotics." -> ROUTE: flashcard_generation
     User Query: "Explain the pathophysiology of Parkinson's disease." -> ROUTE: rag_query
     User Query: "Hello" -> ROUTE: rag_query 
     """),
    ("human", "{question}")
])

QUIZ_GENERATOR_PROMPT = ChatPromptTemplate.from_template(
    """You are a medical school professor creating a challenging, open-ended quiz for a medical student on the topic of '{topic}'.
Your task is to create 3-5 thought-provoking questions that require clinical reasoning, not just simple recall. 
After the questions, you MUST provide a separate section with detailed answers for comparison.

--- EXAMPLE OF THE REQUIRED FORMAT ---
**Topic:** Hypertension

**Questions:**
1. A 65-year-old patient on hydrochlorothiazide for hypertension presents with muscle weakness. What is the likely electrolyte imbalance, and what is the physiological mechanism?
2. Why is an ACE inhibitor often a first-line choice for a patient with both hypertension and diabetes?

---
**Detailed Answers:**
1. **Answer:** The likely imbalance is hypokalemia (low potassium). Thiazide diuretics increase the excretion of potassium in the urine, which can lead to depleted levels, causing muscle weakness.
2. **Answer:** ACE inhibitors have a nephroprotective (kidney-protective) effect by reducing pressure in the glomeruli. This is particularly beneficial for patients with diabetes, who are at high risk for diabetic nephropathy.
--- END OF EXAMPLE ---

Now, using the provided context, generate a quiz in the same two-part format.

Context:
{context}

Quiz:"""
)


FLASHCARD_GENERATOR_PROMPT = ChatPromptTemplate.from_template(
    """You are an expert instructional designer creating clinical scenario-based flashcards for medical students on the topic of '{topic}'.
The front of each card MUST be a patient presentation or clinical scenario. The back MUST be the most likely diagnosis or the next best step in management.

--- EXAMPLE OF THE REQUIRED FORMAT ---
**Front:** A 62-year-old male with a history of smoking and hyperlipidemia presents with 2 hours of crushing substernal chest pain and an ECG showing ST-segment elevation in the anterior leads (V1-V4).
**Back:** Diagnosis: Acute Anterior STEMI (ST-Elevation Myocardial Infarction). The findings are indicative of an occlusion of the Left Anterior Descending (LAD) artery.
--- END OF EXAMPLE ---

Now, using the provided context, generate 5 flashcards in this format.

Context:
{context}

Flashcards:"""
)

PATIENT_ROUTER_PROMPT = ChatPromptTemplate.from_messages([
    ("system", """You are an expert at routing a patient's request to the correct workflow 
    based on their most recent message AND the conversation history.  

    You must select exactly one of the following routes:  
    - 'triage_request' → The user has provided enough specific symptoms that triage can proceed.  
    - 'clarification_needed' → The user has been vague or has not given enough detail to begin triage.  
    - 'desperation_query' → The user expresses fear, panic, or worry about their condition, even if they provide symptoms.  
    - 'rag_query' → The user asks about a general medical or health topic (definitions, conditions, treatments, research).  
    - 'greeting' → The user says hello, good morning, thanks, or something similar.  
    - 'emotional_follow_up' → The user expresses emotions (scared, anxious, upset) in response to a previous assistant message.  

    --- ROUTING PRINCIPLES ---
    - A list of multiple specific symptoms (e.g. "itchy skin, diarrhea, vomiting, swollen legs") 
      is a **triage_request**.  
    - If the user only says something vague like "I feel sick" or "I don't feel good", 
      classify as **clarification_needed**.  
    - If they are both descriptive **and** scared ("I have chest pain and I’m terrified it’s a heart attack"), 
      classify as **desperation_query**.  
    - Questions like "What is diabetes?" or "How does asthma work?" → **rag_query**.  
    - "Hello", "Hi there", "Thanks" → **greeting**.  
    - Emotional replies like "I'm scared" after your previous clarification → **emotional_follow_up**.  

    --- EXAMPLES ---
    User Query: "Hello there"  
    ROUTE: greeting  

    User Query: "I feel sick"  
    ROUTE: clarification_needed  

    User Query: "What is diabetes?"  
    ROUTE: rag_query  

    User Query: "I'm so scared."  
    ROUTE: emotional_follow_up  

    User Query: "I have itchy skin, constant diarrhea for 3 days, vomiting, fatigue, and a swollen left leg."  
    ROUTE: triage_request  

    User Query: "I have chest pain and I think I'm going to die."  
    ROUTE: desperation_query  

    --- CONVERSATIONAL EXAMPLE ---
    AI previously said: "Could you please tell me more about your symptoms?"  
    User now says: "I've had chest pains, fatigue and dizziness for the past few days."  
    Thought: This is specific enough to proceed with triage.  
    ROUTE: triage_request  
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