import json
from .ArticleText import get_article_text
from .TextFromPdf import extract_text_from_pdf


# This file is used to extract data from the request.
class ExtractFiles:
    """
    This class is used to extract files and data from the request.
    """

    def __init__(self, request):
        """
        Initializes the ExtractFiles class.
        """
        self.request = request
        self.requestFiles = self.request.files.getlist("files")
        self.dataStr = self.request.form.get("data")
        self.data = json.loads(self.dataStr)

        if self.requestFiles:
            self.pdfFile = self.requestFiles[0]

    def for_ats_score(self) -> tuple:
        """
        Extracts data for ATS score calculation.
        """
        self.jobDescription = self.data.get("jobDescription")
        return self.jobDescription, self.pdfFile

    def for_summarize(self) -> str:
        """
        Extracts data for text summarization.
        """
        self.text = self.data.get("text")
        self.url = self.data.get("url")

        if self.url.strip():
            self.articleText = get_article_text(self.url)
            self.text += self.articleText

        try:
            self.pdfText = extract_text_from_pdf(self.pdfFile)
            self.text += "\n" + self.pdfText
        except Exception as e:
            pass

        return self.text

    def for_career_guide(self) -> str:
        """
        Extracts data for career guide.
        """
        self.interests = self.data.get("interests")

        return self.interests

    def for_interview_questions(self) -> str:
        """
        Extracts data for interview questions.
        """
        self.role = self.data.get("skills")

        return self.role

    def for_project_ideas(self) -> tuple:
        """
        Extracts data for project ideas.
        """
        self.skills = self.data.get("skills")
        self.difficulty = self.data.get("difficulty")

        return self.skills, self.difficulty

    def for_roadmap(self) -> str:
        """
        Extracts data for roadmap.
        """
        self.skills = self.data.get("skill")

        return self.skills
