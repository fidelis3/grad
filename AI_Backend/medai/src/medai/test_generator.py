from .crew import CaseGeneratorCrew


def run_generator():
    print("## Welcome to the Clinical Case Generator")
    print("-----------------------------------------")

    condition = input(
        "Enter a medical condition to generate a case study for (e.g., 'Type 2 Diabetes'): "
    )

    inputs = {
        "medical_condition": condition,
    }

    try:
        generator_crew = CaseGeneratorCrew().crew()
        result = generator_crew.kickoff(inputs=inputs)
        print("\n\n--- Generated Case Study ---")
        print(result.raw)
    except Exception as e:
        print(f"An error occurred while running the crew: {e}")


if __name__ == "__main__":
    run_generator()
