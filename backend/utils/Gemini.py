from google import genai
from .ApiConfig import get_api_key


# This file is used to get the response from the Gemini API.
def get_gemini_response(
    contents: list, model_name: str = "gemini-2.5-flash-preview-04-17", api_key: str = None
) -> str:
    """
    This function gets the response from the Gemini API.
    Args:
        contents: The prompt content to send to Gemini
        model_name: The model to use
        api_key: API key from request headers (required)
    Returns:
        str: The generated response
    Raises:
        ValueError: If API key is missing or invalid
    """
    try:
        if not api_key:
            raise ValueError("API key is required")

        client = genai.Client(api_key=get_api_key(api_key))
        response = client.models.generate_content(
                        model=model_name,
                        contents=contents)
        return response.text

    except ValueError as e:
        return {
            'message': str(e),
            'code': 'InvalidKey',
            'details': 'The provided API key is invalid or missing'
        }, 400
    except Exception as e:
        error_message = str(e)
        error_response = {
            'message': error_message,
            'details': None
        }
        
        if "API key" in error_message.lower() or "invalid key" in error_message.lower():
            error_response.update({
                'code': 'InvalidKey',
                'details': 'The provided API key is invalid'
            })
        elif "quota exceeded" in error_message.lower() or "rate limit" in error_message.lower():
            error_response.update({
                'code': 'ResourceExhausted',
                'details': 'API quota exceeded. Please wait and try again.'
            })
            return error_response, 429  # Too Many Requests status code
        
        return error_response, 400
