import os
import json
from datetime import datetime

LOG_DIR = "logs"


def log_result(result: str):
    """Saves the crew's result to a timestamped JSON file in the logs directory."""
    if not os.path.exists(LOG_DIR):
        os.makedirs(LOG_DIR)

    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    filename = os.path.join(LOG_DIR, f"result_{timestamp}.json")

    with open(filename, "w", encoding="utf-8") as f:
        json.dump({"result": result}, f, ensure_ascii=False, indent=4)

    print(f"Result saved to {filename}")
