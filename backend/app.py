from flask import Flask, request
from flask_cors import CORS

from utils import get_gemini_content
from utils.PromptsGenerator import Generate

from utils.Gemini import get_gemini_response
from utils.FilesExtractor import ExtractFiles


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://ai-career-helper.onrender.com"}})


@app.route("/ats-score", methods=["POST"])
def ats_score():
    """
    This function calculates the ATS score for a given resume and job description.
    """
    try:
        data: tuple = ExtractFiles(request).for_ats_score()
        jobDescription, resumePdf = data[0], data[1]

        prompt = Generate.ats_score_prompt(jobDescription)
        gemini_content = get_gemini_content(resumePdf, prompt)
        response = get_gemini_response(gemini_content)

        return response

    except Exception as e:
        return str(e), 400


@app.route("/summarize", methods=["POST"])
def text_summarizer():
    try:
        text = ExtractFiles(request).for_summarize()
        prompt = Generate.summarize_prompt(text)
        response = get_gemini_response(prompt)

        return response

    except Exception as e:
        return str(e), 400


@app.route("/career-guide", methods=["POST"])
def career_guide():
    try:
        interests = ExtractFiles(request).for_career_guide()
        prompt = Generate.for_career_guide(interests)
        response = get_gemini_response(prompt)

        return response

    except Exception as e:
        return str(e), 400


@app.route("/interview-questions", methods=["POST"])
def interview_questions():
    try:
        role = ExtractFiles(request).for_interview_questions()
        prompt = Generate.for_interview_questions(role)
        response = get_gemini_response(prompt)

        return response

    except Exception as e:
        return str(e), 400


@app.route("/project-ideas", methods=["POST"])
def project_ideas():
    try:
        skills, difficulty = ExtractFiles(request).for_project_ideas()
        prompt = Generate.for_project_ideas(skills, difficulty)
        response = get_gemini_response(prompt)

        return response

    except Exception as e:
        return str(e), 400


@app.route("/roadmap", methods=["POST"])
def roadmap():
    try:
        skills = ExtractFiles(request).for_roadmap()
        prompt = Generate.for_roadmap(skills)
        response = get_gemini_response(prompt)

        return response

    except Exception as e:
        return str(e), 400


if __name__ == "__main__":
    app.run()
