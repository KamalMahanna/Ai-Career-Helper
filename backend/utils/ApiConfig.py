def get_api_key(request_key: str) -> str:
    """
    Returns the Gemini API key from request headers.
    Args:
        request_key: API key provided in the request headers (required)
    Returns:
        str: The API key to use
    Raises:
        ValueError: If no API key is provided
    """
    if not request_key:
        raise ValueError("API key is required")
    return request_key
