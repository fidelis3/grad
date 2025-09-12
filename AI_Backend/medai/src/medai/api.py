from fastapi import FastAPI, BackgroundTasks, Request
from langserve import add_routes
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
import dotenv
import requests

dotenv.load_dotenv()


from typing import Dict, Any, Union

from .chains import (
    DiagnosticConversationChain,
    PatientTriageChain,
    ClinicalCaseGeneratorChain,
    DoctorMasterChain,
    PatientMasterChain,
    StudentMasterChain,
)

app = FastAPI(
    title="Medical Diagnosis Aid API",
    description="Provides direct-action and conversational AI endpoints for different user roles.",
    version="3.0.0",
)

origins = [
    "http://localhost:3000",
    "http://localhost:3000/doctor/ai-assistant",
    "http://localhost:8000",
    "https://grad-seven.vercel.app",
    "https://grad-seven.vercel.app/symptomchecker",
    "https://grad-seven.vercel.app/doctor/ai-assistant",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CrisisReport(BaseModel):
    name: str | None = None
    email: str | None = None
    message: str | None = None


def trigger_n8n_crisis_webhook(payload: dict):
    webhook_url = os.getenv("N8N_CRISIS_WEBHOOK_URL")
    if webhook_url:
        try:
            requests.post(webhook_url, json=payload)
            print("INFO: Successfully triggered n8n crisis workflow.")
        except Exception as e:
            print(f"ERROR: Failed to trigger n8n crisis workflow. Error: {e}")
    else:
        print("WARNING: N8N_CRISIS_WEBHOOK_URL not set. Cannot trigger workflow.")


class ChatInput(BaseModel):
    input: Union[str, Dict[str, Any]]


add_routes(app, DiagnosticConversationChain, path="/api/doctor/generate-report")

add_routes(app, PatientTriageChain, path="/api/patient/triage")

add_routes(app, ClinicalCaseGeneratorChain, path="/api/student/generate-case")

add_routes(
    app, DoctorMasterChain.with_types(input_type=ChatInput), path="/api/doctor/chat"
)

add_routes(
    app, PatientMasterChain.with_types(input_type=ChatInput), path="/api/patient/chat"
)

add_routes(
    app, StudentMasterChain.with_types(input_type=ChatInput), path="/api/student/chat"
)


@app.post("/api/report-crisis")
def report_crisis(report: CrisisReport, background_tasks: BackgroundTasks):
    """
    Receives crisis details from the frontend and triggers a high-priority
    n8n workflow in the background.
    """
    print(f"Received crisis report: {report.model_dump()}")
    background_tasks.add_task(trigger_n8n_crisis_webhook, report.model_dump())
    return {"status": "received", "message": "Crisis report is being processed."}


@app.post("/api/appointment/chat")
async def appointment_chat_proxy(request: Request):
    """
    Receives a message from the frontend and forwards it to the n8n
    appointment booking webhook.
    """
    n8n_webhook_url = os.getenv("N8N_APPOINTMENT_WEBHOOK_URL")
    if not n8n_webhook_url:
        return {
            "reply": "Sorry, the appointment booking service is currently unavailable."
        }

    incoming_data = await request.json()

    try:
        response = requests.post(n8n_webhook_url, json=incoming_data)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"ERROR: Failed to connect to n8n appointment webhook. Error: {e}")
        return {
            "reply": "Sorry, I couldn't connect to the appointment booking service right now."
        }


@app.get("/health")
def health_check():
    """A simple endpoint to confirm the server is running."""
    return {"status": "ok"}


@app.get("/")
def read_root():
    return {
        "message": "Welcome to the MedAI API v3. Go to /docs for a list of all endpoints."
    }
