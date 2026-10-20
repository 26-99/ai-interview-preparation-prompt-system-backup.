# AI Interview Preparation Prompt System

An AI-powered interview preparation platform that helps fresh graduates and junior software developers prepare for technical interviews using personalized study plans, coding practice, and mock interview feedback.

## 🚀 Live Demo

- **Live Application:** https://ais-pre-3nunuhi65z5hgkly6kg3i7-192692930843.asia-northeast1.run.app
- **GitHub Repository:** https://github.com/26-99/ai-interview-preparation-prompt-system-backup..git

## 📌 Problem Statement

Job seekers often struggle to prepare for technical interviews because job descriptions contain different technologies, expectations, and skill requirements. Generic preparation resources can make it difficult to identify what to study first.

This project provides a structured, personalized approach to interview preparation based on job requirements.

## ✨ Key Features

- **Job Description Analysis:** Extracts relevant technical skills and requirements from job descriptions.
- **Prioritized Preparation Plan:** Organizes topics into Must Prepare, Should Prepare, and Good to Know categories.
- **Personalized Coding Practice:** Generates relevant coding drills based on the target role and technology stack.
- **Mock Interview Simulator:** Conducts sequential interview practice, evaluates answers, and provides constructive feedback.
- **Time-Boxed Revision Sprint:** Helps users organize their preparation into focused revision sessions.
- **Prompt Evolution Lab:** Demonstrates the evolution from an initial prompt to a constrained and reusable prompt system.
- **Interview Progress Tracking:** Supports structured preparation and progress monitoring.
- **Submission Toolkit:** Helps users organize project and submission information.

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Backend:** Node.js, Express
- **AI Integration:** Google Gemini API using the `@google/genai` SDK
- **Deployment:** Google Cloud Run through Google AI Studio

## 🧠 Prompt Engineering Approach

The project uses a structured prompt engineering workflow:

1. **Initial Concept:** Define the interview preparation problem and desired outcomes.
2. **Constrained Guardrails:** Add instructions to reduce unsupported claims, distinguish facts from assumptions, and keep preparation grounded in available information.
3. **Final Reusable Prompt:** Refine the instructions into a reusable system for structured interview preparation.

The workflow aims to make interview preparation more relevant, organized, and consistent.

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm
- A Google Gemini API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/26-99/ai-interview-preparation-prompt-system-backup.git
   ```

2. Navigate to the project folder:

   ```bash
   cd ai-interview-preparation-prompt-system-backup
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure your Gemini API key using the environment variable expected by the backend. Check the server code and `.env.example` for the exact variable name. Never commit your actual API key to GitHub.

5. Start the application using the development command defined in `package.json`:

   ```bash
   npm run dev
   ```

   Check `package.json` for the available scripts and any additional setup requirements.

## 🔐 Security

- Keep API keys and credentials private.
- Store secrets in environment variables.
- Do not commit `.env` files containing real credentials.
- Use `.env.example` for documenting required environment variables without exposing secret values.

## 🎯 Project Objective

To demonstrate how AI, prompt engineering, and full-stack web development can be combined to create a practical interview preparation tool for students, fresh graduates, and early-career developers.

## 👩‍💻 Author

**Ananya Nagaraj**

MCA Graduate | Aspiring Software Developer

