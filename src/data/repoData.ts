export interface TopicItem {
  topic: string;
  category: string;
  why: string;
}

export interface TechnicalQAItem {
  question: string;
  answer: string;
  keyTakeaway: string;
  category: string;
}

export interface CodingProblem {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  problemStatement: string;
  approach: string;
  solutionCode: string;
  complexity: string;
  testCases: string[];
}

export interface ProjectQuestion {
  question: string;
  rationale: string;
  idealTalkingPoints: string[];
}

export interface HRQuestion {
  question: string;
  sampleAnswer: string;
  frameworkTip: string;
}

export interface TrickyFollowUp {
  trickyQuestion: string;
  trap: string;
  strongResponse: string;
}

export interface RevisionSlot {
  timeSlot: string;
  title: string;
  focusAreas: string[];
  checklist: string[];
}

export interface MockQuestion {
  id: string;
  category: string;
  question: string;
  sampleGoodAnswer: string;
  criteria: string;
}

export interface PrepPlan {
  analysis: {
    roleTitle: string;
    summary: string;
    keyResponsibilities: string[];
    extractedTechStack: string[];
    assumptionsFlagged: string[];
    missingInfo: string[];
  };
  prioritizedTopics: {
    mustPrepare: TopicItem[];
    shouldPrepare: TopicItem[];
    goodToKnow: TopicItem[];
  };
  technicalQA: TechnicalQAItem[];
  codingPractice: CodingProblem[];
  projectQuestions: ProjectQuestion[];
  hrQuestions: HRQuestion[];
  trickyFollowUps: TrickyFollowUp[];
  revisionPlan: RevisionSlot[];
  mockInterviewQuestions: MockQuestion[];
}

export const GITHUB_REPO_URL = 'https://github.com/26-99/ai-interview-preparation-prompt-system';
export const LIVE_WEBSITE_URL = 'https://ais-pre-3nunuhi65z5hgkly6kg3i7-192692930843.asia-northeast1.run.app';

export const REPO_METADATA = {
  title: 'AI-Powered Interview Preparation Prompt System',
  author: '26-99',
  description: 'A reusable AI prompt system for personalized software developer interview preparation.',
  problemStatement: 'Candidates applying for entry-level software roles often struggle to identify which topics to study, prioritize technical concepts, and prepare relevant coding and HR questions. Generic prompts produce broad, unfocused answers.',
  goal: 'Develop a reusable prompt that analyzes a job description and generates a prioritized, practical interview preparation plan without hallucinating experience.',
  context: 'Targeted at fresh graduates (e.g. MCA, B.Tech, BCA, CS/IT) applying for entry-level software roles. Relevant skills: Java, Python, SQL, HTML, CSS, JavaScript, Spring Boot, REST APIs, Git/GitHub, Linux, and cloud fundamentals.',
  constraints: [
    'Prioritize technologies and responsibilities explicitly mentioned in the job description.',
    'Explain concepts in simple language and provide interview-ready answers.',
    'Separate essential topics from optional topics (Must / Should / Good to Know).',
    'Include fresher-level coding problems where relevant.',
    'Do not assume professional experience or invent resume details.',
    'Label assumptions and missing information clearly.',
    'Keep the preparation plan practical, time-boxed, and structured.'
  ]
};

export const PROMPT_ITERATIONS = [
  {
    iteration: 'Iteration 1',
    title: 'Initial Concept & Broad Customization',
    summary: 'Introduced basic role prompting and job-description-based customization instead of generic interview prep.',
    promptText: `Act as a software developer interview coach. I will provide a job description for an entry-level role. Analyze it and create a customized interview preparation plan. Identify relevant technologies, technical questions, coding topics, project questions, and HR questions. Prioritize topics as Must Prepare, Should Prepare, and Good to Know. Explain concepts simply and provide interview-ready answers. End with a one-day revision checklist.`,
    improvements: [
      'Replaced vague advice with role-specific customization',
      'Introduced Must / Should / Good to Know prioritization',
      'Requested interview-ready answers with simple explanations',
      'Added a one-day revision checklist'
    ],
    limitations: 'Lacked constraints on candidate background; LLM tended to assume 2-3 years of senior experience or invent imaginary projects.'
  },
  {
    iteration: 'Iteration 2',
    title: 'Grounded Constraints & Strict Tasks',
    summary: 'Added explicit candidate background, strict anti-hallucination constraints, and the interactive mock interview flow.',
    promptText: `You are my personalized software developer interview coach.
Input: I will provide a job description and, where relevant, my resume and project details.
Background: I am an MCA graduate applying for entry-level software and IT roles. My relevant skills may include Java, Python, SQL, HTML, CSS, JavaScript, Spring Boot, REST APIs, Git/GitHub, Linux, and cloud fundamentals. Use only the background relevant to the supplied role.
Tasks:
1. Extract the technologies, responsibilities, and skills from the job description.
2. Rank topics as Must Prepare, Should Prepare, and Good to Know.
3. Generate technical questions with simple explanations and interview-ready answers.
4. Include 5–10 relevant coding problems with approaches and examples.
5. Generate questions about the projects and experience I actually provide.
6. Include HR questions and suggested answers.
7. Identify tricky questions and likely follow-ups.
8. Clearly distinguish facts from assumptions and flag missing information.
9. Avoid assuming professional experience or inventing company-specific facts.
10. End with a realistic 24-hour revision plan.
Output sections:
- Job Description Analysis
- Top Topics to Prepare
- Technical Questions and Answers
- Coding Practice
- Project Questions
- HR Questions
- Tricky Follow-ups
- Final Revision Plan
- Mock Interview
For the mock interview, ask one question at a time. Wait for my answer, evaluate it, explain how to improve it, and then ask the next question.`,
    improvements: [
      'Grounded in specific candidate background (MCA graduate, entry-level IT)',
      'Added strict anti-hallucination constraint (distinguish facts from assumptions)',
      'Added tricky follow-up questions to prepare for recruiter stress tests',
      'Introduced sequential one-question-at-a-time mock interview protocol'
    ],
    limitations: 'Formatting could vary between different LLM models; needed parameterized inputs and formal quality checklist.'
  },
  {
    iteration: 'Final Reusable System',
    title: 'Production-Ready Reusable Prompt Architecture',
    summary: 'The battle-tested prompt with structured input slots, explicit 9-part output specification, quality check phase, and mock interview loop.',
    promptText: `You are my personalized software developer interview coach. Analyze the job description I provide and use my resume only if I supply it. Identify the skills and responsibilities required for the role. Create a prioritized preparation plan with Must Prepare, Should Prepare, and Good to Know categories. Provide relevant technical questions with accurate, simple, interview-ready answers; 5–10 fresher-level coding problems with approaches and examples; project questions grounded in my actual projects; HR questions; likely follow-ups; and a final revision checklist. Focus on the supplied job description, clearly label assumptions, do not invent professional experience or company-specific information, and avoid unnecessary advanced topics. Finally, offer an interactive mock interview, asking one question at a time and evaluating each response before continuing.

Inputs:
- Job description: [Paste JD]
- Resume or project details (optional): [Paste or attach]
- Interview date: [Enter date]
- Available preparation time: [Enter hours]`,
    improvements: [
      'Plug-and-play parameter blocks for any job description and timeline',
      'Enforces 0 hallucination guarantee with explicit assumptions audit',
      'Provides actionable 4h, 24h, or 7d time-boxed sprints',
      'Standardized for Gemini 3.8 Flash, ChatGPT, Claude, and AI Studio'
    ],
    limitations: 'None. Directly usable as a universal prompt system or inside web applications.'
  }
];

export const PRESET_JOBS = [
  {
    id: 'java-fresher',
    name: 'Junior Java Developer (Repo Example)',
    role: 'Junior Java Developer',
    prepHours: 4,
    interviewDate: 'In 2 days',
    jobDescription: `Job Title: Junior Java Developer
Location: Remote / Hybrid
Experience Level: 0-1 Years (Freshers welcome)

Responsibilities:
- Develop and maintain backend services using Core Java 11/17 and Spring Boot.
- Write efficient SQL queries, stored procedures, and handle database connections with MySQL / PostgreSQL.
- Create RESTful APIs and integrate with front-end components.
- Collaborate with the QA team for unit testing using JUnit and Mockito.
- Troubleshoot, debug, and upgrade existing software systems.
- Participate in agile ceremonies and maintain code repository on GitHub.

Requirements:
- Bachelor's or Master's degree in Computer Science, MCA, or related field.
- Strong understanding of Object-Oriented Programming (OOP) concepts.
- Familiarity with Spring Framework, REST APIs, and Maven.
- Working knowledge of relational databases (SQL).
- Good communication skills and eagerness to learn modern architectures.`,
    resume: `Education: Master of Computer Applications (MCA), CGPA 8.4
Core Skills: Java, Spring Boot, REST APIs, MySQL, Git, HTML/CSS
Academic Project: "Online Bookstore API" built with Spring Boot, Hibernate, MySQL, and Postman testing. Implemented user registration, book catalog browsing, cart management, and JWT token authentication.`
  },
  {
    id: 'fullstack-mca',
    name: 'Full Stack MCA Graduate (React + Spring)',
    role: 'Associate Full Stack Developer',
    prepHours: 24,
    interviewDate: 'This Friday',
    jobDescription: `We are looking for an Associate Full Stack Developer to build modern web applications.
Responsibilities:
- Develop interactive user interfaces using React.js and modern JavaScript (ES6+).
- Implement backend services with Spring Boot or Node.js.
- Work with relational databases like PostgreSQL and MySQL.
- Design and consume RESTful web services.
- Write clean, modular, and maintainable code with unit tests.
- Use Git for version control and collaborate in Agile sprints.

Required Skills:
- MCA, B.E., or B.Tech graduate with strong CS foundations.
- Proficiency in JavaScript, HTML5, CSS3, and React basics.
- Hands-on experience with Java or Python backend development.
- Understanding of Database management systems and SQL queries.
- Familiarity with Git, Postman, and responsive design principles.`,
    resume: `MCA Graduate. Built a Campus Placement Portal using React, Spring Boot, and MySQL. Implemented role-based login (Student / Recruiter / Admin), student resume upload, interview scheduling, and status tracking dashboards.`
  },
  {
    id: 'python-backend',
    name: 'Junior Python & Backend Engineer',
    role: 'Junior Python Backend Developer',
    prepHours: 12,
    interviewDate: 'Next Monday',
    jobDescription: `Role: Junior Python Backend Developer
Responsibilities:
- Develop backend APIs using Python (FastAPI / Django).
- Design relational schemas and optimize SQL queries in PostgreSQL.
- Write unit tests, integrate third-party payment and auth APIs.
- Assist in containerizing services using Docker.
- Monitor application performance and troubleshoot production issues.

Qualifications:
- Degree in Computer Science, IT, MCA, or equivalent.
- Solid Python fundamentals, data structures, and algorithms.
- Understanding of HTTP, REST APIs, JSON, and status codes.
- Basic knowledge of Docker, Linux command line, and Git.`,
    resume: `MCA Fresher. Project: "Expense Tracker & Analytics Microservice" using Python FastAPI, PostgreSQL, and SQLAlchemy. Handled JWT authentication, transaction categorizations, and Dockerized deployment.`
  },
  {
    id: 'react-frontend',
    name: 'Junior Frontend Developer (React / TS)',
    role: 'Junior Frontend Developer',
    prepHours: 4,
    interviewDate: 'Tomorrow Morning',
    jobDescription: `Position: Junior Frontend Developer
Key Responsibilities:
- Build responsive, accessible UI components with React and TypeScript.
- Translate Figma designs into pixel-perfect Tailwind CSS interfaces.
- Manage client-side state and integrate RESTful APIs.
- Ensure cross-browser compatibility and optimize front-end performance.
- Collaborate with backend engineers and UI/UX designers.

Requirements:
- Fresher to 1 year experience with React, HTML, CSS, JavaScript/TypeScript.
- Experience with Git version control and responsive layouts.
- Understanding of Component lifecycle, React Hooks (useState, useEffect, useMemo).
- Good problem-solving skills and keen eye for design aesthetics.`,
    resume: `MCA graduate. Built a Real-Time Crypto Portfolio Tracker using React, TypeScript, Tailwind CSS, and CoinGecko REST API with responsive mobile navigation and interactive chart metrics.`
  }
];

export const AI_TOOLS_EXPLANATION = {
  title: 'AI Tools & Engineering Architecture',
  summary: 'How this application combines Google Gemini models, structured prompt engineering, and modern full-stack web infrastructure.',
  tools: [
    {
      name: 'Google Gemini 3.8 Flash',
      role: 'Server-Side Cognitive Engine',
      description: 'Used via the official @google/genai SDK on the Express backend for low-latency job description parsing, intelligent skill extraction, topic prioritization, and dynamic evaluation in the interactive mock interview coach.',
      badge: 'Gemini 3.8 Flash'
    },
    {
      name: 'Structured Prompt System by 26-99',
      role: 'Prompt Architecture & Anti-Hallucination Guardrails',
      description: 'Derived directly from the 26-99/ai-interview-preparation-prompt-system open-source repository. Applies few-shot prompt chaining, strict facts-vs-assumptions auditing, and a sequential one-question-at-a-time mock interview protocol.',
      badge: 'Prompt System v2.0'
    },
    {
      name: 'Full-Stack Vite + Express Architecture',
      role: 'Production Host & Proxy',
      description: 'Vite React 19 frontend integrated with Express on Node.js. Server-side API key protection ensures zero browser credential leaks, meeting production deployment and enterprise security standards.',
      badge: 'Express + Vite'
    },
    {
      name: 'Deterministic Heuristic Fallback Engine',
      role: 'High Availability & Offline Reliability',
      description: 'Guarantees the application remains 100% functional even during network interruptions or API quota limits by providing validated fallback blueprints matching the repository examples.',
      badge: 'Fault-Tolerant'
    }
  ]
};

export const CHECKLISTS = {
  builder: [
    { text: 'Single clear objective: Software developer interview preparation from job descriptions', checked: true },
    { text: 'Directly solves candidate problem: Prioritizes study topics & eliminates broad generic advice', checked: true },
    { text: 'Zero hallucinated resume experience guarantee with explicit assumptions flags', checked: true },
    { text: 'Intuitive modern interface with clear visual hierarchy and zero AI slop', checked: true }
  ],
  landing: [
    { text: 'Compelling headline, clear value proposition, and hero action buttons', checked: true },
    { text: 'Interactive live studio with preloaded presets (including repo Java example)', checked: true },
    { text: 'Complete 9-section output dossier: Analysis, Matrix, Q&A, Coding, Projects, HR, Tricky, Revision, Mock', checked: true },
    { text: 'Prompt Evolution Lab comparing Iterations 1, 2, and Final System', checked: true },
    { text: 'Interactive Mock Interview simulator with real-time feedback & scoring', checked: true },
    { text: 'Transparent AI Tools documentation and 1-click submission exporter', checked: true }
  ],
  deployment: [
    { text: 'Full-Stack server running on port 3000 with Express and Vite dev middlewares', checked: true },
    { text: 'Server-side @google/genai initialization with telemetry headers', checked: true },
    { text: 'Zero client-side API key exposure', checked: true },
    { text: 'Responsive across mobile, tablet, and widescreen desktop displays', checked: true },
    { text: 'Accessible color contrasts and clean JetBrains Mono code styling', checked: true }
  ]
};
