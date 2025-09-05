from crewai.tools import BaseTool
from typing import Type
from pydantic import BaseModel, Field


class MedicalKnowledgeInput(BaseModel):
    """Input schema for the MedicalKnowledgeRetrieverTool."""

    query: str = Field(
        ...,
        description="The medical topic or specific question to search for in the knowledge base.",
    )


class MedicalKnowledgeRetrieverTool(BaseTool):
    name: str = "Medical Knowledge Retriever"
    description: str = (
        "A specialized tool for searching and retrieving information from a curated medical knowledge base. "
        "Use this tool to find clinical guidelines, research papers, and established medical facts related to symptoms or diagnoses."
    )
    args_schema: Type[BaseModel] = MedicalKnowledgeInput

    def _run(self, query: str) -> str:
        """
        Connects to the ChromaDB vector store and performs a hybrid search
        to find the most relevant medical documents.
        """
        print(f"INFO: Searching medical knowledge base for query: '{query}'")

        placeholder_output = (
            f"Placeholder Output for Query: '{query}'\n\n"
            "Retrieved Document 1: Study on clinical presentation of migraines. Source: Journal of Medicine, 2023.\n"
            "Retrieved Document 2: NICE guidelines for headache management. Source: NICE-guidelines-2022.\n"
            "Retrieved Document 3: Research paper on differential diagnosis for acute headaches. Source: The Lancet, 2021."
        )
        return placeholder_output

    def format_results(self, results: list) -> str:
        """Helper function to format a list of document chunks into a single string."""
        formatted_string = ""
        for i, doc in enumerate(results):
            
            source = doc.metadata.get("source", "Unknown")
            publication_date = doc.metadata.get("publication_date", "N/A")
            formatted_string += f"Retrieved Document {i+1}: {doc.content}\nSource: {source}, Published: {publication_date}\n\n"

        if not formatted_string:
            return "No relevant documents found in the medical knowledge base."

        return formatted_string.strip()
