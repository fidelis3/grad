import os
import chromadb
import openai
from pypdf import PdfReader
from dotenv import load_dotenv
from langchain.text_splitter import RecursiveCharacterTextSplitter
from chromadb.utils import embedding_functions

load_dotenv()

def load_and_extract_text(pdf_path: str) -> str:
    """
    Loads a PDF file and extracts all its text content.
    """
    print(f"Reading PDF from: {pdf_path}")
    reader = PdfReader(pdf_path)
    full_text = ""
    for page in reader.pages:
        full_text += page.extract_text() + " "
    print(f"Successfully extracted {len(full_text)} characters from the PDF.")
    return full_text

def chunk_text(text: str) -> list:
    """
    Splits a long text into smaller chunks.
    """
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=150,
        length_function=len,
    )
    chunks = text_splitter.split_text(text)
    print(f"Text split into {len(chunks)} chunks.")
    return chunks

def setup_and_store_in_chromadb(chunks: list, collection_name: str):
    """
    Sets up a persistent ChromaDB client, creates an embedding function,
    and stores the text chunks in the specified collection.
    """
    print("Setting up ChromaDB...")

    client = chromadb.PersistentClient(path="db")

    openai_ef = embedding_functions.OpenAIEmbeddingFunction(
        api_key=os.getenv("OPENAI_API_KEY"),
        model_name="text-embedding-3-small"
    )

    collection = client.get_or_create_collection(
        name=collection_name,
        embedding_function=openai_ef
    )

    print(f"Storing {len(chunks)} chunks in ChromaDB collection '{collection_name}'...")

    ids = [f"guideline_chunk_{i}" for i in range(len(chunks))]
    
    collection.add(
        documents=chunks,
        ids=ids
    )
    print("Successfully stored all chunks in ChromaDB.")

def main():
    """
    The main function for the data ingestion process.
    """
    openai.api_key = os.getenv("OPENAI_API_KEY")
    if not openai.api_key:
        raise ValueError("OPENAI_API_KEY not found in environment variables.")

    pdf_file_path = "data/hypertension-in-adults-diagnosis-and-management.pdf"
    collection_name = "medical_guidelines"

    document_text = load_and_extract_text(pdf_file_path)

    text_chunks = chunk_text(document_text)

    setup_and_store_in_chromadb(text_chunks, collection_name)

if __name__ == "__main__":
    main()