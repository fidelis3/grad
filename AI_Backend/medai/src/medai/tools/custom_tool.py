import os
import chromadb
from crewai.tools import BaseTool
from typing import Type, Any, Literal, Optional, Union, List
from pydantic import BaseModel, Field
from chromadb.utils import embedding_functions


ALLOWED_COLLECTIONS = {"clinical_guidelines", "research_studies"}


class MedicalKnowledgeInput(BaseModel):
    """Input schema for the MedicalKnowledgeRetrieverTool."""

    query: str = Field(..., description="The medical topic to search for.")
    collection_name: Optional[Union[str, List[str]]] = Field(
        default=None,
        description=(
            "The collection name to search in (string) or a list of collection names. "
            "Allowed values: 'clinical_guidelines', 'research_studies'. "
            "If omitted, all allowed collections will be searched."
        ),
    )


class MedicalKnowledgeRetrieverTool(BaseTool):
    name: str = "Medical Knowledge Retriever"
    description: str = (
        "Performs a hybrid search on a specified medical knowledge base collection(s). "
        "Use 'clinical_guidelines' for standard-of-care questions. "
        "Use 'research_studies' for questions about specific drugs or recent trials. "
        "You may pass a single collection name, a list of names, or omit to search both."
    )
    args_schema: Type[BaseModel] = MedicalKnowledgeInput

    def _run(self, query: str, collection_name: Optional[Union[str, List[str]]] = None, **kwargs) -> str:
        """
        Performs a hybrid search and returns formatted results.
        collection_name may be:
          - None (search default set)
          - a string (single collection)
          - a list of strings (multiple collections)
        """
        # Normalize collection names
        if collection_name is None:
            collection_names = list(ALLOWED_COLLECTIONS)
        elif isinstance(collection_name, str):
            collection_names = [collection_name]
        else:
            # assume list-like
            collection_names = list(collection_name)

        # Validate requested collections against allowed set
        valid_collections = [c for c in collection_names if c in ALLOWED_COLLECTIONS]
        invalid = [c for c in collection_names if c not in ALLOWED_COLLECTIONS]
        if not valid_collections:
            return (
                "No valid collection names provided. "
                f"Allowed collections: {', '.join(sorted(ALLOWED_COLLECTIONS))}. "
                f"Received: {collection_name!r}"
            )

        if invalid:
            print(f"WARNING: Ignoring unsupported collections: {invalid}. Searching: {valid_collections}")

        print(f"INFO: Performing HYBRID SEARCH in {valid_collections} for query: '{query}'")

        # Initialize client and embedding function once
        try:
            client = chromadb.PersistentClient(path="db")
        except Exception as e:
            return f"Error connecting to ChromaDB PersistentClient: {e}"

        try:
            openai_ef = embedding_functions.OpenAIEmbeddingFunction(
                api_key=os.getenv("OPENAI_API_KEY"), model_name="text-embedding-3-small"
            )
        except Exception as e:
            return f"Error creating embedding function: {e}"

        combined_docs: List[str] = []

        for col in valid_collections:
            try:
                collection = client.get_collection(name=col, embedding_function=openai_ef)
            except Exception as e:
                # If collection is missing or can't be opened, continue to next
                print(f"WARNING: Could not open collection '{col}': {e}")
                continue

            # Vector similarity query
            try:
                vector_results = collection.query(query_texts=[query], n_results=3)
                vector_docs = vector_results.get("documents", [[]])[0]
            except Exception as e:
                print(f"WARNING: Vector query failed on '{col}': {e}")
                vector_docs = []

            # Keyword-ish query using a simple where filter (best-effort)
            try:
                first_word = query.split()[0] if query.strip() else ""
                keyword_results = collection.query(
                    query_texts=[query],
                    n_results=3,
                    where_document={"$contains": first_word} if first_word else None,
                )
                keyword_docs = keyword_results.get("documents", [[]])[0]
            except Exception as e:
                print(f"WARNING: Keyword query failed on '{col}': {e}")
                keyword_docs = []

            combined_docs.extend(vector_docs)
            combined_docs.extend(keyword_docs)

        # Deduplicate preserving order
        unique_docs = list(dict.fromkeys([d for d in combined_docs if d]))

        if not unique_docs:
            searched = ", ".join(valid_collections)
            return f"No relevant documents found in the searched collections: {searched}."

        return self._format_results(unique_docs)

    def _format_results(self, documents: list) -> str:
        """Helper function to format document chunks into a single string."""
        formatted_string = ""
        for i, doc in enumerate(documents, 1):
            formatted_string += f"Retrieved Document {i}:\n{doc}\n\n"
        return formatted_string.strip()
