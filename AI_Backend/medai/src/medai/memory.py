# src/medai/core/memory.py
from langchain_community.chat_message_histories import ChatMessageHistory

# A simple in-memory store for chat histories
memories = {}

def get_memory_for_session(session_id: str):
    if session_id not in memories:
        memories[session_id] = ChatMessageHistory()
    return memories[session_id]