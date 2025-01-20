import google.generativeai as genai
from .ApiConfig import get_api_key


# This file is used to get the response from the Gemini API.
def get_gemini_response(
    contents: list, model_name: str = "gemini-2.0-flash-thinking-exp-1219"
) -> str:
    """
    This function gets the response from the Gemini API.
    """
    try:
        genai.configure(api_key=get_api_key())
        # model = genai.GenerativeModel("gemini-exp-1206")
        model = genai.GenerativeModel(model_name=model_name)
        response = model.generate_content(contents=contents)
        return response.parts[-1].text

    except Exception as e:
        return str(e), 400
