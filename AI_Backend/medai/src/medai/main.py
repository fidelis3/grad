import warnings
from medai.crew import MedaiCrew

# Suppressing the SyntaxWarning
warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")


def run():
    """Run the Medai crew."""
    print("## Welcome to the Medical Diagnosis Aid Crew")
    print("-------------------------------------------")

    # Collecting all the necessary inputs from the user
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
    }

    try:
        crew = MedaiCrew().crew()
        result = crew.kickoff(inputs=inputs)
        print("\n\n## Final Report:")
        print(result)
    except Exception as e:
        print(f"An error occurred while running the crew: {e}")


if __name__ == "__main__":
    run()
