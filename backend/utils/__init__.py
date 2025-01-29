def get_gemini_content(file: any, prompt: str):
    """
    This function prepares the content for Gemini API.
    """
    contents = [{"mime_type": file.mimetype, "data": file.read()}, prompt]
    return contents
