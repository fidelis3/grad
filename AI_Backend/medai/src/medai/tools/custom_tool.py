import os
import chromadb
from crewai.tools import BaseTool
from typing import Type, Any
from pydantic import BaseModel, Field
from chromadb.utils import embedding_functions

class MedicalKnowledgeInput(BaseModel):
    """Input schema for the MedicalKnowledgeRetrieverTool."""

    query: dict = Field(
        ...,
        description="The medical topic or specific question to search for, sent as a dictionary.",
    )

class MedicalKnowledgeRetrieverTool(BaseTool):
    name: str = "Medical Knowledge Retriever"
    description: str = (
        "A specialized tool for searching and retrieving information from a curated medical knowledge base. "
        "Use this tool to find clinical guidelines, research papers, and established medical facts related to symptoms or diagnoses."
    )
    args_schema: Type[BaseModel] = MedicalKnowledgeInput

    def _run(self, query: dict) -> str:
        """
        Connects to the ChromaDB vector store and performs a similarity search.
        This method now reliably handles the dictionary input from the AI.
        """

        search_query = query.get("query", query.get("description", ""))
        if not isinstance(search_query, str) or not search_query:
            return "Error: Could not find a valid query string in the provided input."

        print(f"INFO: Searching medical knowledge base for query: '{search_query}'")

        client = chromadb.PersistentClient(path="db")
        openai_ef = embedding_functions.OpenAIEmbeddingFunction(
            api_key=os.getenv("OPENAI_API_KEY"), model_name="text-embedding-3-small"
        )
        collection = client.get_collection(
            name="medical_guidelines", embedding_function=openai_ef
        )

        results = collection.query(query_texts=[search_query], n_results=3)

        return self._format_results(results)

    def _format_results(self, results: dict) -> str:
        """Helper function to format ChromaDB query results into a single string."""
        documents = results.get("documents", [[]])[0]

        if not documents:
            return "No relevant documents found in the medical knowledge base."

        formatted_string = ""
        for i, doc in enumerate(documents):
            formatted_string += f"Retrieved Document {i+1}:\n{doc}\n\n"

        return formatted_string.strip()
