from medai.utils import log_result
from datetime import datetime
import warnings
from medai.crew import MedaiCrew

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")


def run():
    """Run the Medai crew."""
    print("## Welcome to the Medical Diagnosis Aid Crew")
    print("-------------------------------------------")

    symptoms = input("Enter a list of symptoms: ")
    duration = input("Enter the duration of symptoms: ")
    severity = input("Enter the severity of symptoms (e.g., 7/10): ")
    medical_history = input("Enter relevant medical history (or 'None'): ")
    additional_notes = input("Enter any additional notes (or 'None'): ")

    inputs = {
        "symptoms": symptoms,
        "duration": duration,
        "severity": severity,
        "medical_history": medical_history,
        "additional_notes": additional_notes,
        "current_date": datetime.now().strftime("%B %d, %Y"),
    }

    try:
        crew = MedaiCrew().crew()
        result = crew.kickoff(inputs=inputs)
        print("\n\n## Final Report:")
        print(result.raw)
        log_result(result.raw)
    except Exception as e:
        print(f"An error occurred while running the crew: {e}")


if __name__ == "__main__":
    run()
