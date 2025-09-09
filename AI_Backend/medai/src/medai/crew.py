from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from .tools.custom_tool import MedicalKnowledgeRetrieverTool
from .tools.pubmed_tool import PubMedSearchTool
from .tools.ahrq_tool import AHRQSearchTool
from .tools.symptom_tool import SymptomToDiseaseTool
from .llms import get_llm


@CrewBase
class MedaiCrew:
    """Medai crew for deep medical diagnosis"""

    agents_config = "config/doctor_agents.yaml"
    tasks_config = "config/doctor_tasks.yaml"
    medical_retriever_tool = MedicalKnowledgeRetrieverTool()
    pubmed_search_tool = PubMedSearchTool()
    ahrq_search_tool = AHRQSearchTool()
    symptom_tool = SymptomToDiseaseTool()

    @agent
    def symptom_analyzer_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["symptom_analyzer_agent"],
            llm=get_llm("gemini-1.5-pro"),
            verbose=True,
        )

    @agent
    def differential_diagnosis_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["differential_diagnosis_agent"],
            tools=[self.symptom_tool],
            verbose=True,
        )

    @agent
    def research_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["research_agent"],
            tools=[self.pubmed_search_tool],
            llm=get_llm("gemini-1.5-pro"),
            verbose=True,
        )

    @agent
    def guideline_compliance_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["guideline_compliance_agent"],
            tools=[self.ahrq_search_tool, self.medical_retriever_tool],
            llm=get_llm("gemini-1.5-pro"),
            verbose=True,
        )

    @agent
    def contraindication_ddi_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["contraindication_ddi_agent"],
            llm=get_llm("gemini-1.5-pro"),
            verbose=True,
        )

    @agent
    def final_report_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["final_report_agent"],
            verbose=True,
        )

    @task
    def symptom_structuring_task(self) -> Task:
        config = self.tasks_config["symptom_structuring_task"]
        return Task(
            description=config["description"],
            agent=self.symptom_analyzer_agent(),
            expected_output=config["expected_output"],
        )

    @task
    def differential_diagnosis_task(self) -> Task:
        config = self.tasks_config["differential_diagnosis_task"]
        return Task(
            description=config["description"],
            agent=self.differential_diagnosis_agent(),
            expected_output=config["expected_output"],
        )

    @task
    def research_task(self) -> Task:
        config = self.tasks_config["research_task"]
        return Task(
            description=config["description"],
            agent=self.research_agent(),
            expected_output=config["expected_output"],
        )

    @task
    def guideline_compliance_task(self) -> Task:
        config = self.tasks_config["guideline_compliance_task"]
        return Task(
            description=config["description"],
            agent=self.guideline_compliance_agent(),
            expected_output=config["expected_output"],
        )

    @task
    def contraindication_task(self) -> Task:
        config = self.tasks_config["contraindication_task"]
        return Task(
            description=config["description"],
            agent=self.contraindication_ddi_agent(),
            expected_output=config["expected_output"],
        )

    @task
    def final_report_task(self) -> Task:
        config = self.tasks_config["final_report_task"]
        return Task(
            description=config["description"],
            agent=self.final_report_agent(),
            expected_output=config["expected_output"],
            output_file="final_diagnosis_report.md",
        )

    @crew
    def crew(self) -> Crew:
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            memory=True,
            verbose=True,
        )


@CrewBase
class PatientTriageCrew:
    agents_config = "config/triage_agents.yaml"
    tasks_config = "config/triage_tasks.yaml"
    medical_retriever_tool = MedicalKnowledgeRetrieverTool()
    symptom_tool = SymptomToDiseaseTool()

    @agent
    def patient_triage_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["patient_triage_agent"],
            tools=[self.medical_retriever_tool, self.symptom_tool],
            llm=get_llm("gemini-1.5-pro"),
            verbose=True,
            allow_delegation=False,
        )

    @task
    def patient_triage_task(self) -> Task:
        task_config = self.tasks_config["patient_triage_task"]
        return Task(
            description=task_config["description"],
            agent=self.patient_triage_agent(),
            expected_output=task_config["expected_output"],
            output_file="patient_triage_report.md",
        )

    @crew
    def crew(self) -> Crew:
        return Crew(
            agents=[self.patient_triage_agent()],
            tasks=[self.patient_triage_task()],
            verbose=True,
        )


@CrewBase
class CaseGeneratorCrew:
    agents_config = "config/case_generator_agents.yaml"
    tasks_config = "config/case_generator_tasks.yaml"
    medical_retriever_tool = MedicalKnowledgeRetrieverTool()
    pubmed_search_tool = PubMedSearchTool()
    ahrq_search_tool = AHRQSearchTool()

    @agent
    def case_generator_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["case_generator_agent"],
            tools=[
                self.medical_retriever_tool,
                self.pubmed_search_tool,
                self.ahrq_search_tool,
            ],
            verbose=True,
            allow_delegation=False,
        )

    @task
    def case_generation_task(self) -> Task:
        task_config = self.tasks_config["case_generation_task"]
        return Task(
            description=task_config["description"],
            agent=self.case_generator_agent(),
            expected_output=task_config["expected_output"],
            output_file="clinical_case_study.md",
        )

    @crew
    def crew(self) -> Crew:
        return Crew(
            agents=[self.case_generator_agent()],
            tasks=[self.case_generation_task()],
            verbose=True,
        )


@CrewBase
class ResearchCrew:
    agents_config = "config/student_agents.yaml"
    tasks_config = "config/student_tasks.yaml"

    def __init__(self):
        self.medical_retriever_tool = MedicalKnowledgeRetrieverTool()
        self.pubmed_search_tool = PubMedSearchTool()
        self.ahrq_search_tool = AHRQSearchTool()

    @agent
    def literature_review_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["literature_review_agent"],
            tools=[self.pubmed_search_tool],
            llm=get_llm("gemini-1.5-pro"),
            verbose=True,
        )

    @agent
    def guideline_analyst_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["guideline_analyst_agent"],
            tools=[self.ahrq_search_tool, self.medical_retriever_tool],
            llm=get_llm("gemini-1.5-pro"),
            verbose=True,
        )

    @agent
    def summarization_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["summarization_agent"],
            verbose=True,
        )

    @task
    def literature_review_task(self) -> Task:
        config = self.tasks_config["literature_review_task"]
        return Task(
            description=config["description"],
            agent=self.literature_review_agent(),
            expected_output=config["expected_output"],
        )

    @task
    def guideline_analysis_task(self) -> Task:
        config = self.tasks_config["guideline_analysis_task"]
        return Task(
            description=config["description"],
            agent=self.guideline_analyst_agent(),
            expected_output=config["expected_output"],
        )

    @task
    def deep_research_task(self) -> Task:
        config = self.tasks_config["deep_research_task"]
        return Task(
            description=config["description"],
            agent=self.summarization_agent(),
            expected_output=config["expected_output"],
            context=[self.literature_review_task(), self.guideline_analysis_task()],
        )

    @crew
    def crew(self) -> Crew:
        return Crew(
            agents=[
                self.literature_review_agent(),
                self.guideline_analyst_agent(),
                self.summarization_agent(),
            ],
            tasks=[
                self.literature_review_task(),
                self.guideline_analysis_task(),
                self.deep_research_task(),
            ],
            verbose=True,
        )
