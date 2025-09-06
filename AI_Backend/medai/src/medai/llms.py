from crewai import LLM

llm_map = {
    "gpt-4o": LLM(model="openai/gpt-4o"),
    "gpt-4o-mini": LLM(model="openai/gpt-4o-mini"),
    "gemini-1.5-pro": LLM(model="gemini/gemini-1.5-pro-latest"),
}


def get_llm(model_name: str) -> LLM:
    """
    A centralized function to get a specific LLM instance from our map.
    Defaults to gpt-4o-mini if the name is not found.
    """
    print(f"INFO: Requesting model: '{model_name}'")
    llm_instance = llm_map.get(model_name)

    if llm_instance:
        return llm_instance
    else:
        print(f"WARNING: Unknown model name '{model_name}'. Defaulting to gpt-4o-mini.")
        return llm_map.get("gpt-4o-mini")
