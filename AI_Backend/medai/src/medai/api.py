from fastapi import FastAPI
from langserve import add_routes
from medai.chains import PatientTriageChain

app = FastAPI(
    title="Medical Diagnosis Aid API",
    description="An API for interacting with the MedAI multi-agent system.",
    version="1.0.0",
)

add_routes(
    app,
    PatientTriageChain,
    path="/api/triage",
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the MedAI API. Go to /triage/playground/ to interact with the triage chain."}