from fastapi import FastAPI
from langserve import add_routes
from pydantic import BaseModel

from typing import Dict, Any, Union

from .chains import (
    DiagnosticConversationChain,
    PatientTriageChain,
    ClinicalCaseGeneratorChain,
    DoctorMasterChain
)

app = FastAPI(
    title="Medical Diagnosis Aid API",
    description="Provides direct-action and conversational AI endpoints for different user roles.",
    version="3.0.0"
)

class AppInput(BaseModel):
    input: Union[str, Dict[str, Any]]

add_routes(
    app, 
    DiagnosticConversationChain, 
    path="/api/doctor/generate-report"
)

add_routes(
    app, 
    PatientTriageChain, 
    path="/api/patient/triage"
)

add_routes(
    app,
    ClinicalCaseGeneratorChain,
    path="/api/student/generate-case"
)

add_routes(
    app,
    DoctorMasterChain,
    path="/api/doctor/chat"
)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to the MedAI API v3. Go to /docs for a list of all endpoints."
    }