from langchain_core.runnables import Runnable, RunnableConfig
from pydantic import BaseModel, Field
from typing import Dict, Any

from .crew import PatientTriageCrew


class TriageInput(BaseModel):
    symptom_description: str = Field(
        description="The detailed description of the patient's symptoms."
    )


class TriageCrewRunnable(Runnable):
    """A LangChain Runnable that executes the PatientTriageCrew."""

    def invoke(
        self, input: Dict[str, Any], config: RunnableConfig = None
    ) -> Dict[str, Any]:
        """
        Accepts an input dictionary and returns the raw markdown report from the crew.
        """

        crew_inputs = {"symptoms": input["symptom_description"]}

        crew_result = PatientTriageCrew().crew().kickoff(inputs=crew_inputs)

        return {"report": crew_result.raw}

PatientTriageChain = TriageCrewRunnable().with_types(input_type=TriageInput)
