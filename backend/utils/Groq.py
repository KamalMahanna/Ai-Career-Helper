import urllib.request
import urllib.error
import json
from .ApiConfig import get_api_key

def get_groq_response(
    prompt: str, model_name: str = "openai/gpt-oss-120b", api_key: str = None
):
    """
    This function gets the response from the Groq API.
    Args:
        prompt: The prompt content to send to Groq
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

        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {get_api_key(api_key)}",
            "Content-Type": "application/json"
        }
        data = {
            "model": model_name,
            "messages": [
                {"role": "user", "content": prompt}
            ]
        }
        
        req = urllib.request.Request(
            url,
            data=json.dumps(data).encode("utf-8"),
            headers=headers,
            method="POST"
        )
        
        with urllib.request.urlopen(req) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            return res_data["choices"][0]["message"]["content"]

    except ValueError as e:
        return {
            'message': str(e),
            'code': 'InvalidKey',
            'details': 'The provided API key is invalid or missing'
        }, 400
    except urllib.error.HTTPError as e:
        status_code = e.code
        error_message = e.read().decode("utf-8")
        try:
            error_data = json.loads(error_message)
            error_msg = error_data.get("error", {}).get("message", error_message)
        except Exception:
            error_msg = error_message
            
        error_response = {
            'message': error_msg,
            'details': None
        }
        
        if status_code == 401 or "api key" in error_msg.lower() or "invalid" in error_msg.lower():
            error_response.update({
                'code': 'InvalidKey',
                'details': 'The provided API key is invalid'
            })
            return error_response, 401
        elif status_code == 429 or "quota exceeded" in error_msg.lower() or "rate limit" in error_msg.lower():
            error_response.update({
                'code': 'ResourceExhausted',
                'details': 'API quota exceeded. Please wait and try again.'
            })
            return error_response, 429
            
        return error_response, status_code
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
            return error_response, 429
            
        return error_response, 400
