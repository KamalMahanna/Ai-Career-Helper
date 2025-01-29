import PyPDF2


# This file is used to extract text from a PDF file.
def extract_text_from_pdf(pdf_file: any) -> str:
    """
    This function extracts text from a PDF file.
    """
    text = ""
    try:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text() + "\n"
    except Exception as e:
        return f"Error: {e}"
    return text
