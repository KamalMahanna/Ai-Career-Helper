# This file is used to generate prompts for the Gemini API.
class Generate:
    """
    This class is used to generate prompts for the Gemini API.
    """

    @staticmethod
    def ats_score_prompt(jobDescription: str) -> str:
        """
        Generates a prompt for ATS score calculation.
        """
        prompt = f"""
            You are an advanced AI system specialized in Application Tracking Systems (ATS) analysis. Given a resume and a job description delimited by angle brackets, your task is to perform a comprehensive evaluation and provide the following:
                1. **ATS Score:**
                - Analyze the resume in the context of the job description.
                - Calculate an ATS score that reflects how well the resume matches the job requirements. This score should consider factors such as keywords, relevant experience, education, and skills alignment.
                - The ATS score should be expressed as a percentage or numerical value, representing the degree of alignment between the applicant's qualifications and the job requirements.Ensure that scorereflects the true aligment not a generic range. Don't just 50-60 percent. Note if resume not match the resume say you not have these skills and give low range of score as well like 20-30 or whatever you finds sutiable.But when it match so show sore accordingly.
                in brief if resume doesn't match give low score and matches give high score accordingly
                2. **Missing Skills and Qualifications:**
                - Review the job description to identify key skills, qualifications,Experince, and competencies required for the position.
                - Compare these requirements with the content of the resume.
                - Identify and list any critical skills, qualifications, or competencies mentioned in the job description that are missing or inadequately represented in the resume.
                - Provide specific examples from the job description that are not covered in the resume.
                3. **Additional Insights:**
                - Offer insights into the overall suitability of the resume for the job position.
                - Highlight any strengths of the resume that align well with the job description.
                - Suggest areas for improvement in the resume to better match the job requirements.
                Ensure that your analysis is thorough and provides actionable feedback. Your evaluation should help in understanding how well the applicant's resume fits the job description and what improvements could be made to enhance the chances of passing through an ATS filter. '''
            ------
            Below is the Job Description: 
            <{jobDescription}>
            """
        return prompt

    @staticmethod
    def summarize_prompt(text: str) -> str:
        """
        Generates a prompt for text summarization.
        """
        prompt = f"""
        Please provide a thorough summary of the provided text, extracting key points and central themes. Ensure the summary is detailed and comprehensive, offering readers a clear understanding of the text's content without requiring them to read it in full. Your summary should be clear and concise, focusing on conveying the main ideas effectively. There are no specific formatting requirements, allow.
        ------
        Here is the text to summarize:
        {text}
        """

        return prompt

    @staticmethod
    def for_career_guide(interests: str) -> str:
        """
        Generates a prompt for career guide.
        """
        prompt = f"""
        Imagine you are a professional career instructor providing personalized guidance. Based on the list of hobbies or interests I will provide, your task is to:
        - Identify suitable career paths or professions aligned with these hobbies or interests.
        - for each profession, Recommend specific subjects, courses, or skills to study that are essential for entering these professions.
        - Outline a clear and actionable plan to help achieve success in the suggested career path, including practical steps, resources, or certifications to pursue and required timeframe.
        ------
        Here is the list of my hobbies or interests:
        {interests}
        """

        return prompt

    @staticmethod
    def for_interview_questions(role: str) -> str:
        """
        Generates a prompt for interview questions.
        """
        prompt = f"""
        Generate a comprehensive list of over 100 most asked interview questions based on the following skill set. The questions should vary in difficulty and cover different aspects, such as technical, behavioral, problem-solving, and situational scenarios. Additionally, include questions that focus on assessing the candidate's experience, depth of knowledge, and ability to apply the skill in real-world situations.
        Skills to cover: {role}
        """

        return prompt

    @staticmethod
    def for_project_ideas(skills: str, difficulty: str) -> str:
        """
        Generates a prompt for project ideas.
        """
        prompt = f"""
        You are a project expert. Generate a list of projects for the skills: <{skills}> with difficulty level: <{difficulty}>
        """

        return prompt

    @staticmethod
    def for_roadmap(skills: str) -> str:
        """
        Generates a prompt for roadmap.
        """
        prompt = f"""
        You are a career expert. You will be provided with a list of skills and your task is to generate a detailed, step by step roadmap to learn those skills, also provide free or popular courses or articles with links.
        Generate a career roadmap for the skills: <{skills}>"""

        return prompt
