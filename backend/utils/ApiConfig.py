import os

from dotenv import load_dotenv
load_dotenv()

# This file is used to get the Gemini API key from the environment variables.
def get_api_key() -> str:
    """
    Returns the Gemini API key.
    """
    return os.getenv('GEMINI_API_KEY')
