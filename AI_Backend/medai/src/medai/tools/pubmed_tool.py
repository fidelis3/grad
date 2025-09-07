import os
from Bio import Entrez
from crewai.tools import BaseTool
from pydantic import BaseModel, Field
from typing import Type

Entrez.email = os.getenv("NCBI_EMAIL", "your.email@example.com")

class PubMedSearchInput(BaseModel):
    """Input for the PubMed Search tool."""
    query: str = Field(..., description="The medical topic to search for on PubMed.")

class PubMedSearchTool(BaseTool):
    name: str = "PubMed Search"
    description: str = (
        "A tool for searching the PubMed database of biomedical literature. "
        "Use this for finding recent research papers, clinical trials, and medical studies on any given topic."
    )
    args_schema: Type[BaseModel] = PubMedSearchInput

    def _run(self, query: str) -> str:
        """
        Searches PubMed for a given query and returns the top 3 results.
        """
        print(f"INFO: Searching PubMed for: '{query}'")
        try:

            handle = Entrez.esearch(db="pubmed", term=query, retmax="3")
            record = Entrez.read(handle)
            handle.close()
            
            id_list = record["IdList"]
            if not id_list:
                return f"No recent articles found on PubMed for the query: '{query}'"

            handle = Entrez.efetch(db="pubmed", id=id_list, rettype="medline", retmode="text")
            records_text = handle.read()
            handle.close()

            return f"Found {len(id_list)} results on PubMed:\n\n{records_text}"

        except Exception as e:
            return f"Error searching PubMed: {e}"