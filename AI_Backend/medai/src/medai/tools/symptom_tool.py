import requests
import xml.etree.ElementTree as ET
from crewai.tools import BaseTool
from pydantic import BaseModel, Field
from typing import Type

class SymptomInput(BaseModel):
    symptoms: str = Field(..., description="A string of patient symptoms to search for on MedlinePlus.")

class SymptomToDiseaseTool(BaseTool):
    name: str = "MedlinePlus Symptom Search"
    description: str = (
        "Use this tool to search the NIH MedlinePlus database to find health topics "
        "and potential conditions related to a given set of symptoms. This is your primary tool "
        "for formulating an initial differential diagnosis."
    )
    args_schema: Type[BaseModel] = SymptomInput

    def _run(self, symptoms: str) -> str:
        """Searches the MedlinePlus API for health topics related to symptoms."""
        print(f"INFO: Searching MedlinePlus for: '{symptoms}'")
        base_url = "https://wsearch.nlm.nih.gov/ws/query"
        params = {
            "db": "healthTopics",
            "term": symptoms
        }
        
        try:
            response = requests.get(base_url, params=params)
            response.raise_for_status()
            
            root = ET.fromstring(response.content)
            results = []
            for doc in root.findall('.//document'):
                title = doc.find("content[@name='title']").text
                url = doc.get('url')
                summary_element = doc.find("content[@name='FullSummary']")
                summary = summary_element.text if summary_element is not None else "No summary available."
                results.append(f"Title: {title}\nURL: {url}\nSummary: {summary.strip()}")

            if not results:
                return f"No health topics found on MedlinePlus for the query: '{symptoms}'"

            return f"Found {len(results)} relevant health topics on MedlinePlus:\n\n---\n\n" + "\n\n---\n\n".join(results[:3]) # Return top 3 results

        except requests.exceptions.RequestException as e:
            return f"Error connecting to MedlinePlus API: {e}"
        except ET.ParseError:
            return "Error: Failed to parse the response from MedlinePlus API."
        except Exception as e:
            return f"An unexpected error occurred: {e}"