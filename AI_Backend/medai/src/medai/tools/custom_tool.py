import os
import chromadb
from crewai.tools import BaseTool
from typing import Type, Any, Literal
from pydantic import BaseModel, Field
from chromadb.utils import embedding_functions


class MedicalKnowledgeInput(BaseModel):
    """Input schema for the MedicalKnowledgeRetrieverTool."""

    query: str = Field(description="The medical topic to search for.")
    collection_name: Literal["clinical_guidelines", "research_studies"] = Field(
        description="The specific database collection to search in."
    )


class MedicalKnowledgeRetrieverTool(BaseTool):
    name: str = "Medical Knowledge Retriever"
    description: str = (
        "Performs a hybrid search on a specified medical knowledge base collection. "
        "Use 'clinical_guidelines' for standard-of-care questions. "
        "Use 'research_studies' for questions about specific drugs or recent trials."
    )
    args_schema: Type[BaseModel] = MedicalKnowledgeInput

    def _run(self, query: str, collection_name: str, **kwargs) -> str:
        """Performs a hybrid search and returns formatted results."""
        print(
            f"INFO: Performing HYBRID SEARCH in '{collection_name}' for query: '{query}'"
        )

        client = chromadb.PersistentClient(path="db")
        openai_ef = embedding_functions.OpenAIEmbeddingFunction(
            api_key=os.getenv("OPENAI_API_KEY"), model_name="text-embedding-3-small"
        )
        collection = client.get_collection(
            name=collection_name, embedding_function=openai_ef
        )

        vector_results = collection.query(query_texts=[query], n_results=3)
        vector_docs = vector_results.get("documents", [[]])[0]

        keyword_results = collection.query(
            query_texts=[query],
            n_results=3,
            where_document={"$contains": query.split()[0]},
        )
        keyword_docs = keyword_results.get("documents", [[]])[0]

        combined_docs = vector_docs + keyword_docs
        unique_docs = list(dict.fromkeys(combined_docs))

        if not unique_docs:
            return f"No relevant documents found in the '{collection_name}' collection."

        return self._format_results(unique_docs)

    def _format_results(self, documents: list) -> str:
        """Helper function to format document chunks into a single string."""
        formatted_string = ""
        for i, doc in enumerate(documents, 1):
            formatted_string += f"Retrieved Document {i}:\n{doc}\n\n"
        return formatted_string.strip()
