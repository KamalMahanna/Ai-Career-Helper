# AI Career Helper

[Visit the deployed webpage](https://ai-career-helper.netlify.app/)

## Getting Started

This guide will walk you through the steps to run the AI Job Helper project locally.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **Python:**  You can download Python from the official website: [https://www.python.org/downloads/](https://www.python.org/downloads/). Make sure to add Python to your PATH during installation. You can verify the installation by opening a terminal and running:
    ```bash
    python --version
    ```
    or
    ```bash
    python3 --version
    ```
*   **Node.js:** You can download Node.js from the official website: [https://nodejs.org/](https://nodejs.org/). npm (Node Package Manager) is included with Node.js. You can verify the installation by opening a terminal and running:
    ```bash
    node --version
    npm --version
    ```

### Installation

1. **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2. **Install Python dependencies (backend):**
    ```bash
    pip install -r requirements.txt
    ```
    or
    ```bash
    python3 -m pip install -r requirements.txt
    ```

3. **Install Node.js dependencies (frontend):**
    ```bash
    npm install
    ```

### Configuration

1. **Obtain a Gemini API Key:**
    *   Go to the Google AI Studio website: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
    *   Create a project if you haven't already.
    *   Generate an API key.

2. **Configure Environment Variables:**
    *   Rename the `.env.example` file in the project root to `.env`.
        ```bash
        mv .env.example .env
        ```
    *   Open the `.env` file and add your Gemini API key:
        ```
        GEMINI_API_KEY=YOUR_API_KEY_HERE
        ```
        Replace `YOUR_API_KEY_HERE` with the API key you obtained.

### Running the Application

To run the development servers:

```bash
# Run the backend development server
python backend/app.py

# Run the frontend development server
npm run dev
