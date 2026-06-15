import groq
from .ApiConfig import get_api_key

def get_groq_response(
    prompt: str, model_name: str = "openai/gpt-oss-120b", api_key: str = None
):
    """
    This function gets the response from the Groq API using the official SDK.
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

        # Initialize the official Groq client with the user's API key
        client = groq.Groq(api_key=get_api_key(api_key))

        # Request completions using the official client
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "user", "content": prompt}
            ],
            model=model_name,
        )
        return chat_completion.choices[0].message.content

    except ValueError as e:
        return {
            'message': str(e),
            'code': 'InvalidKey',
            'details': 'The provided API key is invalid or missing'
        }, 400
    except groq.AuthenticationError as e:
        return {
            'message': str(e),
            'code': 'InvalidKey',
            'details': 'The provided API key is invalid'
        }, 401
    except groq.RateLimitError as e:
        return {
            'message': str(e),
            'code': 'ResourceExhausted',
            'details': 'API quota exceeded. Please wait and try again.'
        }, 429
    except groq.APIStatusError as e:
        return {
            'message': str(e),
            'details': None
        }, e.status_code
    except Exception as e:
        return {
            'message': str(e),
            'details': None
        }, 400
