from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from .tools.custom_tool import MedicalKnowledgeRetrieverTool

@CrewBase
class MedaiCrew:
    """Medai crew"""

    agents_config = "config/doctor_agents.yaml"
    tasks_config = "config/doctor_tasks.yaml"

    medical_retriever_tool = MedicalKnowledgeRetrieverTool()

    @agent
    def symptom_analyzer_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["symptom_analyzer_agent"],
            verbose=True,
            allow_delegation=False,
        )

    @agent
    def differential_diagnosis_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["differential_diagnosis_agent"],
            verbose=True,
            allow_delegation=False,
        )

    @agent
    def research_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["research_agent"],
            tools=[self.medical_retriever_tool],
            verbose=True,
        )

    @agent
    def guideline_compliance_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["guideline_compliance_agent"],
            tools=[self.medical_retriever_tool],
            verbose=True,
        )

    @agent
    def contraindication_ddi_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["contraindication_ddi_agent"],
            tools=[self.medical_retriever_tool],
            verbose=True,
        )

    @agent
    def final_report_agent(self) -> Agent:
        return Agent(config=self.agents_config["final_report_agent"], verbose=True)

    @task
    def symptom_structuring_task(self) -> Task:
        return Task(
            config=self.tasks_config["symptom_structuring_task"],
            agent=self.symptom_analyzer_agent(),
        )

    @task
    def differential_diagnosis_task(self) -> Task:
        return Task(
            config=self.tasks_config["differential_diagnosis_task"],
            agent=self.differential_diagnosis_agent(),
        )

    @task
    def research_task(self) -> Task:
        return Task(
            config=self.tasks_config["research_task"],
            agent=self.research_agent(),
        )

    @task
    def guideline_compliance_task(self) -> Task:
        return Task(
            config=self.tasks_config["guideline_compliance_task"],
            agent=self.guideline_compliance_agent(),
        )

    @task
    def contraindication_task(self) -> Task:
        return Task(
            config=self.tasks_config["contraindication_task"],
            agent=self.contraindication_ddi_agent(),
        )

    @task
    def final_report_task(self) -> Task:
        return Task(
            config=self.tasks_config["final_report_task"],
            agent=self.final_report_agent(),
            output_file="final_diagnosis_report.md",
        )

    @crew
    def crew(self) -> Crew:
        """Creates the Medai crew"""
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            memory=True,
            verbose=True,
        )

@CrewBase
class PatientTriageCrew:
    """Crew for safe, patient-facing triage and education."""

    agents_config = "config/triage_agents.yaml"
    tasks_config = "config/triage_tasks.yaml"

    medical_retriever_tool = MedicalKnowledgeRetrieverTool()

    @agent
    def patient_triage_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["patient_triage_agent"],
            tools=[self.medical_retriever_tool],
            verbose=True,
            allow_delegation=False,
        )

    @task
    def patient_triage_task(self) -> Task:
        return Task(
            config=self.tasks_config["patient_triage_task"],
            agent=self.patient_triage_agent(),
            output_file="patient_triage_report.md",
        )

    @crew
    def crew(self) -> Crew:
        return Crew(
            agents=[self.patient_triage_agent()],
            tasks=[self.patient_triage_task()],
            verbose=True,
        )
