from medai.utils import log_result
import warnings
from medai.crew import PatientTriageCrew

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")


def run_triage():
    print("## Welcome to the Patient Triage System")
    print("-----------------------------------------")
    symptoms = input("Please describe your symptoms: ")
    inputs = {"symptoms": symptoms}
    try:
        triage_crew = PatientTriageCrew().crew()
        result = triage_crew.kickoff(inputs=inputs)
        print("\n\n--- Triage Advice ---")
        print(result.raw)
        log_result(result.raw)
    except Exception as e:
        print(f"An error occurred while running the crew: {e}")


if __name__ == "__main__":
    run_triage()
