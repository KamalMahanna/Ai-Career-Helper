# AI Career Helper

[Visit the deployed webpage](https://ai-career-helper.netlify.app/)

## Getting Started

This guide will walk you through the steps to run the AI Job Helper project locally.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Python:**  You can download Python from the official website: [https://www.python.org/downloads/](https://www.python.org/downloads/). Make sure to add Python to your PATH during installation. You can verify the installation by opening a terminal and running:

  ```bash
  python3 --version
  ```
* **Node.js:** You can download Node.js from the official website: [https://nodejs.org/](https://nodejs.org/). npm (Node Package Manager) is included with Node.js. You can verify the installation by opening a terminal and running:

  ```bash
  node --version
  npm --version
  ```

### Installation

1. **Clone the repository:**

   ```bash
   git clone -b localhost https://github.com/KamalMahanna/Ai-Career-Helper.git
   cd Ai-Career-Helper
   ```
2. **Install Python dependencies (backend):**

   ```bash
   pip install -r requirements.txt
   ```
3. **Install Node.js dependencies (frontend):**

   ```bash
   npm install
   ```

### Configuration

1. **Obtain a Gemini API Key:**

   * Go to the Google AI Studio website: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
   * Create a project if you haven't already.
   * Generate an API key.


### Running the Application

To run the development servers:

```bash
# Run the backend development server
gunicorn backend.app:app

# Run the frontend development server
npm run dev
```
