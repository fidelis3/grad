import os
import pandas as pd
from pypdf import PdfReader
from dotenv import load_dotenv
import chromadb
from chromadb.utils import embedding_functions

load_dotenv()


def extract_text_from_pdf(pdf_path: str) -> str:
    print(f"Reading PDF: {os.path.basename(pdf_path)}")
    reader = PdfReader(pdf_path)
    full_text = ""
    for page in reader.pages:
        if page.extract_text():
            full_text += page.extract_text() + " "
    return full_text


def chunk_text(text: str, chunk_size=1000, chunk_overlap=150) -> list:
    return [
        text[i : i + chunk_size]
        for i in range(0, len(text), chunk_size - chunk_overlap)
    ]


def setup_and_store_in_chromadb(chunks: list, collection_name: str, doc_ids: list):
    client = chromadb.PersistentClient(path="db")
    openai_ef = embedding_functions.OpenAIEmbeddingFunction(
        api_key=os.getenv("OPENAI_API_KEY"), model_name="text-embedding-3-small"
    )
    collection = client.get_or_create_collection(
        name=collection_name, embedding_function=openai_ef
    )

    batch_size = 100
    for i in range(0, len(chunks), batch_size):
        batch_chunks = chunks[i : i + batch_size]
        batch_ids = doc_ids[i : i + batch_size]
        print(
            f"Storing batch {i//batch_size + 1} with {len(batch_chunks)} chunks in '{collection_name}'..."
        )
        collection.add(documents=batch_chunks, ids=batch_ids)
    print(
        f"Successfully stored a total of {len(chunks)} chunks in '{collection_name}'."
    )


def main():
    if not os.getenv("OPENAI_API_KEY"):
        raise ValueError("OPENAI_API_KEY not found.")

    guideline_folder = "data/guidelines"
    if os.path.exists(guideline_folder):
        print("--- Start: Ingesting Clinical Guidelines ---")
        for filename in os.listdir(guideline_folder):
            if filename.endswith(".pdf"):
                pdf_path = os.path.join(guideline_folder, filename)
                guideline_text = extract_text_from_pdf(pdf_path)
                guideline_chunks = chunk_text(guideline_text)
                chunk_ids = [
                    f"{filename}_chunk_{i}" for i in range(len(guideline_chunks))
                ]
                setup_and_store_in_chromadb(
                    guideline_chunks, "clinical_guidelines", chunk_ids
                )
        print("--- End: Ingesting Clinical Guidelines ---\n")

    student_data_folder = "data/student_data"
    if os.path.exists(student_data_folder):
        print("--- Start: Ingesting Student Data ---")

        try:
            desc_df = pd.read_csv(
                os.path.join(student_data_folder, "symptom_Description.csv")
            )
            symptoms_df = pd.read_csv(os.path.join(student_data_folder, "dataset.csv"))
            precautions_df = pd.read_csv(
                os.path.join(student_data_folder, "symptom_precaution.csv")
            )

            symptom_cols = [f"Symptom_{i}" for i in range(1, 18)]
            symptoms_df["Symptoms"] = symptoms_df[symptom_cols].apply(
                lambda row: ", ".join(row.dropna().astype(str).str.strip()), axis=1
            )
            precaution_cols = [f"Precaution_{i}" for i in range(1, 5)]
            precautions_df["Precautions"] = precautions_df[precaution_cols].apply(
                lambda row: ", ".join(row.dropna().astype(str).str.strip()), axis=1
            )
            desc_df.columns = [col.strip().lower() for col in desc_df.columns]
            symptoms_df.columns = [col.strip().lower() for col in symptoms_df.columns]
            precautions_df.columns = [
                col.strip().lower() for col in precautions_df.columns
            ]
            merged_df = pd.merge(
                desc_df, symptoms_df[["disease", "symptoms"]], on="disease", how="left"
            )
            merged_df = pd.merge(
                merged_df,
                precautions_df[["disease", "precautions"]],
                on="disease",
                how="left",
            )
            merged_df.drop_duplicates(subset=["disease"], keep="first", inplace=True)
            merged_df["document"] = merged_df.apply(
                lambda row: f"Disease: {row['disease']}\nDescription: {row['description']}\nCommon Symptoms: {row['symptoms']}\nRecommended Precautions: {row['precautions']}",
                axis=1,
            )
            documents_to_ingest = merged_df["document"].tolist()
            doc_ids = [
                f"disease_{row['disease'].replace(' ', '_')}"
                for index, row in merged_df.iterrows()
            ]

            setup_and_store_in_chromadb(
                documents_to_ingest, "student_knowledge", doc_ids
            )

        except FileNotFoundError:
            print(
                "INFO: One or more student CSV files not found, skipping CSV ingestion."
            )

        for filename in os.listdir(student_data_folder):
            if filename.endswith(".pdf"):
                pdf_path = os.path.join(student_data_folder, filename)
                student_pdf_text = extract_text_from_pdf(pdf_path)
                student_pdf_chunks = chunk_text(student_pdf_text)
                doc_ids = [
                    f"{filename}_chunk_{i}" for i in range(len(student_pdf_chunks))
                ]
                setup_and_store_in_chromadb(
                    student_pdf_chunks, "student_knowledge", doc_ids
                )

        print("--- End: Ingesting Student Data ---")


if __name__ == "__main__":
    main()
