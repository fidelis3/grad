import requests
import xml.etree.ElementTree as ET
from crewai.tools import BaseTool
from pydantic import BaseModel, Field
from typing import Type

class AHRQSearchInput(BaseModel):
    """Input for the AHRQ Search tool."""
    query: str = Field(..., description="The clinical topic to search for in the AHRQ Guideline Clearinghouse.")

class AHRQSearchTool(BaseTool):
    name: str = "AHRQ Guideline Search"
    description: str = (
        "Use this tool to search the Agency for Healthcare Research and Quality (AHRQ) database "
        "for official clinical guideline titles and summaries. This should be your first step "
        "to discover the names of relevant guidelines before performing a deep search."
    )
    args_schema: Type[BaseModel] = AHRQSearchInput

    def _run(self, *args, **kwargs) -> str:
        """Searches the AHRQ API and returns a formatted list of guideline titles and summaries."""
        
        query = kwargs.get('query', '')
        if not query and args:
            query = args[0]
        
        if not query or not isinstance(query, str):
            return "Error: A valid search query string was not provided to the AHRQ tool."
        # ------------------------------------

        print(f"INFO: Searching AHRQ for guidelines related to: '{query}'")
        api_url = f"https://epc.ahrq.gov/api/v1/public/search/clineRecs?query={query}"
        
        try:
            response = requests.get(api_url)
            response.raise_for_status()
            
            data = response.json()
            results = data.get("result", {}).get("clineRecs", [])
            
            if not results:
                return f"No guidelines found on AHRQ for the query: '{query}'"

            formatted_results = f"Found {len(results)} relevant guidelines on AHRQ:\n\n"
            for i, result in enumerate(results[:3], 1):
                title = result.get("title", "No Title")
                org = result.get("organization", "No Organization")
                summary = result.get("recText", "No Summary Available.")
                formatted_results += f"{i}. Title: {title}\n   Organization: {org}\n   Summary: {summary}\n\n"
                
            return formatted_results.strip()

        except requests.exceptions.RequestException as e:
            return f"Error connecting to AHRQ API: {e}"
        except Exception as e:
            return f"An unexpected error occurred: {e}"