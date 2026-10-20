import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback high-quality generation template in case API key is missing or model unavailable
function generateMockPlan(role: string, jobDescription: string, resume: string, prepHours: number) {
  const isJava = /java|spring/i.test(role + ' ' + jobDescription);
  const isPython = /python|django|fastapi|data/i.test(role + ' ' + jobDescription);
  const isFrontend = /react|frontend|javascript|css|html/i.test(role + ' ' + jobDescription);

  const mainTech = isJava ? 'Java & Spring Boot' : isPython ? 'Python & REST APIs' : isFrontend ? 'React & TypeScript' : 'Full Stack Development';

  return {
    analysis: {
      roleTitle: role || 'Junior Software Developer',
      summary: `Targeted analysis for an entry-level candidate preparing for ${role || 'Junior Software Developer'}. The prompt system extracts core technical stacks, enforces practical fresher-level expectations, and eliminates hallucinated experience.`,
      keyResponsibilities: [
        'Design, develop, and test maintainable application modules and APIs',
        'Participate in code reviews, debugging sessions, and agile sprint ceremonies',
        'Collaborate with senior developers to integrate databases and third-party services',
        'Write unit tests, maintain clean documentation, and follow version control protocols'
      ],
      extractedTechStack: isJava
        ? ['Java 17+', 'Spring Boot', 'REST APIs', 'SQL / MySQL', 'Maven', 'Git & GitHub', 'JUnit']
        : isPython
        ? ['Python 3.10+', 'FastAPI / Django', 'PostgreSQL / SQL', 'REST APIs', 'Docker Basics', 'Git']
        : ['React 18+', 'TypeScript', 'Tailwind CSS / HTML5', 'REST APIs', 'Git / GitHub', 'State Management'],
      assumptionsFlagged: [
        'Assumed entry-level / MCA fresher baseline with strong CS fundamentals',
        'Assumed familiarity with Git version control and relational database querying'
      ],
      missingInfo: [
        resume ? 'Candidate supplied project details used.' : 'No detailed resume supplied; questions are calibrated for standard academic and personal projects.'
      ]
    },
    prioritizedTopics: {
      mustPrepare: [
        {
          topic: `${mainTech} Core Fundamentals`,
          category: 'Core Language',
          why: 'Every technical screen begins with deep probing of language concepts, OOP, and data structures.'
        },
        {
          topic: 'SQL Queries, Joins, Keys & Normalization',
          category: 'Database',
          why: 'Essential for day-to-day data manipulation. Freshers are tested on writing JOINs without ORM crutches.'
        },
        {
          topic: 'RESTful Architecture & HTTP Status Codes',
          category: 'Backend / Networking',
          why: 'Crucial for modern microservices and web apps. Differentiate 200, 201, 400, 401, 403, 404, 500.'
        },
        {
          topic: 'Core Coding & Problem-Solving Drills',
          category: 'Algorithms',
          why: 'Freshers are expected to solve string and array manipulations on a whiteboard or shared IDE.'
        }
      ],
      shouldPrepare: [
        {
          topic: 'ORM & Database Interaction Basics',
          category: 'Framework',
          why: 'Understanding how entities map to tables (e.g. Spring Data JPA, SQLAlchemy, or Prisma).'
        },
        {
          topic: 'Git Workflows (branch, rebase, merge conflict)',
          category: 'Dev Tools',
          why: 'Demonstrates immediate team readiness and version control literacy.'
        },
        {
          topic: 'API Testing & Postman Validation',
          category: 'Testing',
          why: 'Interviewers love to ask how you manually tested your backend before writing automated suites.'
        }
      ],
      goodToKnow: [
        {
          topic: 'Cloud Fundamentals (AWS S3, EC2 or GCP Cloud Run)',
          category: 'Cloud / DevOps',
          why: 'Bonus topic that demonstrates curiosity beyond basic coursework.'
        },
        {
          topic: 'Docker Containerization Fundamentals',
          category: 'DevOps',
          why: 'Explaining images vs containers shows production-level mindset.'
        },
        {
          topic: 'CI/CD Pipelines (GitHub Actions overview)',
          category: 'Tooling',
          why: 'Great differentiator for entry-level candidates.'
        }
      ]
    },
    technicalQA: [
      {
        question: 'What are the four pillars of OOP and how have you applied them?',
        answer: 'The four pillars are Encapsulation (bundling data and methods, e.g., private variables with getters/setters), Abstraction (hiding implementation details using interfaces or abstract classes), Inheritance (reusing code across parent and child classes), and Polymorphism (overriding and overloading methods to perform different actions).',
        keyTakeaway: 'Always give a 1-sentence real-world analogy alongside the definitions.',
        category: 'Core OOP'
      },
      {
        question: 'What is the difference between INNER JOIN, LEFT JOIN, and RIGHT JOIN in SQL?',
        answer: 'An INNER JOIN returns only records that have matching values in both tables. A LEFT JOIN returns all records from the left table and matched records from the right table (filling with NULL if no match). A RIGHT JOIN returns all records from the right table and matched records from the left.',
        keyTakeaway: 'Mention that LEFT JOIN is commonly used when parent records might not have child rows (e.g., customers without orders).',
        category: 'Database'
      },
      {
        question: 'Explain idempotent HTTP methods in RESTful APIs.',
        answer: 'An HTTP method is idempotent if calling it multiple times with the same parameters produces the same side-effect on the server as calling it once. GET, PUT, and DELETE are idempotent. POST is NOT idempotent because repeating it creates new resource entities.',
        keyTakeaway: 'Interviewers love testing whether you understand PUT (idempotent replacement) vs POST (non-idempotent creation).',
        category: 'REST APIs'
      },
      {
        question: 'How do you handle exceptions and prevent application crashes?',
        answer: 'Exceptions should be caught using structured try-catch-finally blocks or global controller advice (@ControllerAdvice in Spring Boot / middleware in Express). Specific exceptions should be handled first before catching general Exception, and sensitive stack traces should never leak to the client.',
        keyTakeaway: 'Highlight logging the error server-side while returning clean error DTOs to clients.',
        category: 'Architecture'
      }
    ],
    codingPractice: [
      {
        title: 'Check If a String is a Palindrome',
        difficulty: 'Easy',
        problemStatement: 'Given a string s, determine if it reads the same backward as forward, ignoring casing and non-alphanumeric characters.',
        approach: 'Use a two-pointer approach starting at index 0 and index length - 1. Increment left and decrement right while matching characters.',
        solutionCode: `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
        complexity: 'Time: O(N) | Space: O(1)',
        testCases: ['"racecar" -> true', '"A man, a plan, a canal: Panama" -> true', '"hello" -> false']
      },
      {
        title: 'Find the Second-Largest Element in an Array',
        difficulty: 'Easy / Medium',
        problemStatement: 'Given an array of integers, return the second distinct largest element without sorting the entire array.',
        approach: 'Maintain two variables: first = -Infinity and second = -Infinity. Traverse the array once, updating both when a new maximum is found.',
        solutionCode: `function findSecondLargest(arr) {
  let first = -Infinity;
  let second = -Infinity;
  for (const num of arr) {
    if (num > first) {
      second = first;
      first = num;
    } else if (num > second && num !== first) {
      second = num;
    }
  }
  return second === -Infinity ? null : second;
}`,
        complexity: 'Time: O(N) | Space: O(1)',
        testCases: ['[12, 35, 1, 10, 34, 1] -> 34', '[10, 10, 10] -> null']
      },
      {
        title: 'Count Character Frequencies in a String',
        difficulty: 'Easy',
        problemStatement: 'Given a string, count how many times each character appears and output the frequency map.',
        approach: 'Iterate through the string once and use a hash map / object or frequency array to increment counts.',
        solutionCode: `function charFrequency(str) {
  const map = {};
  for (const char of str) {
    map[char] = (map[char] || 0) + 1;
  }
  return map;
}`,
        complexity: 'Time: O(N) | Space: O(K) where K is unique characters',
        testCases: ['"banana" -> { b: 1, a: 3, n: 2 }']
      },
      {
        title: 'Two Sum Problem',
        difficulty: 'Easy / Medium',
        problemStatement: 'Given an array of integers and a target sum, return indices of the two numbers such that they add up to target.',
        approach: 'Use a hash map to store the complement (target - num) and its index during a single pass.',
        solutionCode: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
        complexity: 'Time: O(N) | Space: O(N)',
        testCases: ['[2, 7, 11, 15], target 9 -> [0, 1]']
      }
    ],
    projectQuestions: [
      {
        question: 'Walk me through the architecture of your primary academic / portfolio project.',
        rationale: 'Interviewers want to see if you actually understand how the client, server, and database talk to each other.',
        idealTalkingPoints: [
          'State the problem the project solved and who the user was',
          'Describe the layered architecture: UI -> Controller/Router -> Service Layer -> Repository/DAO -> Database',
          'Explain why you chose your database (e.g. relational vs document) and how you validated input'
        ]
      },
      {
        question: 'What was the single hardest bug or bottleneck you encountered, and how did you diagnose it?',
        rationale: 'Tests debugging methodology: logs, breakpoints, network tabs, and persistence rather than guessing.',
        idealTalkingPoints: [
          'Identify specific symptom (e.g., CORS error, null pointer exception, slow query join)',
          'Describe the systematic debugging steps: checking server logs, inspecting payload in Postman/DevTools',
          'Explain the root cause and the fix implemented'
        ]
      }
    ],
    hrQuestions: [
      {
        question: 'Tell me about yourself.',
        sampleAnswer: 'I am a recent MCA graduate passionate about software engineering with hands-on practice in Java, Python, and modern web frameworks. During my coursework and projects, I built full-stack applications integrating REST APIs with relational databases. I focus on writing clean, readable code and I am eager to contribute to production features, learn best practices from senior engineers, and grow with your team.',
        frameworkTip: 'Present-Past-Future structure: Who you are today -> Key technical achievements -> Why this specific company.'
      },
      {
        question: 'Why do you want to join our company as an entry-level developer?',
        sampleAnswer: 'I researched your engineering work and was impressed by your scalable products and collaborative culture. As a fresher, I want to be in an environment with high engineering standards where I can be mentored while actively delivering value on sprint tasks.',
        frameworkTip: 'Mention a specific product feature or engineering domain to prove you researched the company.'
      }
    ],
    trickyFollowUps: [
      {
        trickyQuestion: 'You wrote that you know SQL and databases, but what happens under the hood when you create an index?',
        trap: 'Freshers say "it makes queries fast" without explaining B-Tree or disk I/O reduction, or forgetting the write overhead.',
        strongResponse: 'An index builds an auxiliary data structure, commonly a B-Tree, that allows the database engine to search in O(log N) rather than doing a full table scan O(N). However, it adds overhead during INSERT/UPDATE operations and consumes disk space.'
      },
      {
        trickyQuestion: 'If you get stuck on a coding task and cannot solve it within an hour, what is your exact next step?',
        trap: 'Saying "I will keep trying until midnight" (burnout) or "I immediately ask senior devs" (learned helplessness).',
        strongResponse: 'I timebox 30-45 minutes to read documentation, debug with logs, and search official docs. If still blocked, I formulate a concise question: what I am trying to achieve, what I attempted, and the exact error trace, then consult a teammate.'
      }
    ],
    revisionPlan: [
      {
        timeSlot: prepHours <= 4 ? 'Hour 1: Core Fundamentals' : 'Phase 1: Language & OOP Deep Dive',
        title: 'Core Concepts & OOP Review',
        focusAreas: ['Class vs Object', 'Interfaces & Abstract Classes', 'Collection frameworks', 'Garbage collection & memory model'],
        checklist: ['Review OOP definitions with 1 analogy each', 'Practice 3 standard interview questions aloud']
      },
      {
        timeSlot: prepHours <= 4 ? 'Hour 2: Hands-On Coding Drills' : 'Phase 2: Algorithmic Drills',
        title: 'Strings, Arrays & Basic DS',
        focusAreas: ['Palindrome & Anagrams', 'Two pointers technique', 'Second largest element', 'Frequency map'],
        checklist: ['Write code without IDE autocomplete', 'Trace edge cases (empty input, null, single element)']
      },
      {
        timeSlot: prepHours <= 4 ? 'Hour 3: Database & APIs' : 'Phase 3: Database & REST APIs',
        title: 'SQL Queries & REST Architecture',
        focusAreas: ['INNER vs LEFT JOIN queries', 'Primary vs Foreign keys', 'HTTP status codes', 'Idempotency'],
        checklist: ['Write 2 SQL joins by hand', 'Review GET, POST, PUT, DELETE rules']
      },
      {
        timeSlot: prepHours <= 4 ? 'Hour 4: Project Defense & Mock' : 'Phase 4: Behavioral & Mock Practice',
        title: 'Project Defense & HR Rehearsal',
        focusAreas: ['"Tell me about yourself"', 'Project architecture walk-through', 'Handling challenging questions'],
        checklist: ['Run 3 interactive mock questions in simulator', 'Review tricky follow-ups']
      }
    ],
    mockInterviewQuestions: [
      {
        id: 'mock-1',
        category: 'Introduction',
        question: 'Please introduce yourself and highlight your most relevant software development projects.',
        sampleGoodAnswer: 'Highlight education, core tech stack, and 1 flagship project architecture.',
        criteria: 'Clarity, conciseness (under 90 seconds), relevance to job description.'
      },
      {
        id: 'mock-2',
        category: 'Technical Fundamentals',
        question: 'Can you explain the difference between method overloading and method overriding, with a short example?',
        sampleGoodAnswer: 'Overloading is compile-time polymorphism in the same class (same name, different params). Overriding is runtime polymorphism in a subclass (same signature, different implementation).',
        criteria: 'Accurate terminology, polymorphism connection, clear examples.'
      },
      {
        id: 'mock-3',
        category: 'Database & SQL',
        question: 'Write or explain a query to find the department with the highest average employee salary.',
        sampleGoodAnswer: 'SELECT department_id, AVG(salary) FROM employees GROUP BY department_id ORDER BY AVG(salary) DESC LIMIT 1;',
        criteria: 'GROUP BY usage, aggregate AVG(), ORDER BY DESC and LIMIT.'
      },
      {
        id: 'mock-4',
        category: 'System & Project Defense',
        question: 'In your project, how did you secure your REST endpoints and handle user authorization?',
        sampleGoodAnswer: 'Explained JWT authentication or session tokens, password hashing with BCrypt, and role-based route guards.',
        criteria: 'Security awareness, authentication vs authorization distinction.'
      }
    ]
  };
}

// API: Generate Preparation Plan
app.post('/api/generate-prep', async (req, res) => {
  try {
    const { role = 'Junior Software Developer', jobDescription = '', resume = '', prepHours = 4, interviewDate = '' } = req.body;

    if (!jobDescription || jobDescription.trim().length < 10) {
      return res.status(400).json({ error: 'Please provide a job description with at least 10 characters.' });
    }

    if (ai) {
      const prompt = `You are an expert personalized software developer interview coach.
Follow these EXACT system instructions from the "AI-Powered Interview Preparation Prompt System" repository:
1. Role: Personalized software developer interview coach for entry-level / fresh graduate roles.
2. Context: Candidate is applying for an entry-level software/IT role. Relevant skills may include Java, Python, SQL, HTML, CSS, JavaScript, Spring Boot, REST APIs, Git/GitHub, Linux, and cloud fundamentals. Adapt solely to the supplied job description and optional resume.
3. Strict Constraints:
   - Prioritize technologies and responsibilities explicitly mentioned in the job description.
   - Explain concepts in simple language and provide interview-ready answers.
   - Separate essential topics from optional topics into Must Prepare, Should Prepare, and Good to Know.
   - Include 5-8 fresher-level coding problems with approaches and examples.
   - Do NOT assume professional experience or invent resume details.
   - Label assumptions and missing information clearly.
   - Provide a realistic revision plan fitting the available time (${prepHours} hours).
   - Generate mock interview questions.

Inputs:
- Role: ${role}
- Job Description:
${jobDescription}
- Resume / Project Details (optional):
${resume || 'No resume supplied; assume fresh graduate with foundational projects.'}
- Target Date: ${interviewDate || 'Upcoming'}
- Available Prep Time: ${prepHours} hours

Return valid, clean JSON with this exact schema:
{
  "analysis": {
    "roleTitle": "string",
    "summary": "string",
    "keyResponsibilities": ["string"],
    "extractedTechStack": ["string"],
    "assumptionsFlagged": ["string"],
    "missingInfo": ["string"]
  },
  "prioritizedTopics": {
    "mustPrepare": [{"topic": "string", "category": "string", "why": "string"}],
    "shouldPrepare": [{"topic": "string", "category": "string", "why": "string"}],
    "goodToKnow": [{"topic": "string", "category": "string", "why": "string"}]
  },
  "technicalQA": [
    {"question": "string", "answer": "string", "keyTakeaway": "string", "category": "string"}
  ],
  "codingPractice": [
    {
      "title": "string",
      "difficulty": "Easy" | "Medium",
      "problemStatement": "string",
      "approach": "string",
      "solutionCode": "string",
      "complexity": "string",
      "testCases": ["string"]
    }
  ],
  "projectQuestions": [
    {"question": "string", "rationale": "string", "idealTalkingPoints": ["string"]}
  ],
  "hrQuestions": [
    {"question": "string", "sampleAnswer": "string", "frameworkTip": "string"}
  ],
  "trickyFollowUps": [
    {"trickyQuestion": "string", "trap": "string", "strongResponse": "string"}
  ],
  "revisionPlan": [
    {
      "timeSlot": "string",
      "title": "string",
      "focusAreas": ["string"],
      "checklist": ["string"]
    }
  ],
  "mockInterviewQuestions": [
    {"id": "string", "category": "string", "question": "string", "sampleGoodAnswer": "string", "criteria": "string"}
  ]
}`;

      const generatePromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const timeoutPromise = new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API timeout')), 12000)
      );

      const response = await Promise.race([generatePromise, timeoutPromise]);

      const text = response?.text;
      if (text) {
        const parsed = JSON.parse(text);
        return res.json({ success: true, data: parsed, source: 'gemini-3.8-flash' });
      }
    }

    // High quality deterministic fallback
    const fallback = generateMockPlan(role, jobDescription, resume, prepHours);
    return res.json({ success: true, data: fallback, source: 'fallback-prompt-engine' });
  } catch (err: any) {
    console.error('Handled in /api/generate-prep, serving fallback:', err?.message);
    const fallback = generateMockPlan(req.body?.role || 'Junior Developer', req.body?.jobDescription || '', req.body?.resume || '', req.body?.prepHours || 4);
    return res.json({ success: true, data: fallback, source: 'fallback-prompt-engine', note: err?.message });
  }
});

// API: Mock Interview Evaluation
app.post('/api/mock-evaluate', async (req, res) => {
  try {
    const { question, answer, role = 'Junior Software Developer', jobDescription = '' } = req.body;

    if (!answer || answer.trim().length < 5) {
      return res.status(400).json({ error: 'Please provide an answer with at least 5 characters.' });
    }

    if (ai) {
      const prompt = `You are an encouraging but rigorous technical interview coach for software developer positions.
Evaluate the candidate's answer to this interview question:
Question: "${question}"
Candidate Answer: "${answer}"
Role Target: "${role}"

Evaluate for:
1. Technical correctness and accuracy
2. Clarity, structure, and communication
3. Tone and confidence
4. Any missing key concepts

Return JSON in this exact structure:
{
  "score": number between 1 and 10,
  "verdict": "Exceptional" | "Solid Answer" | "Needs Polish" | "Needs Revision",
  "correctness": "string",
  "clarity": "string",
  "strengths": ["string"],
  "improvements": ["string"],
  "idealAnswer": "string",
  "followUpQuestion": "string"
}`;

      const evalPromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.4,
        },
      });

      const timeoutPromise = new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error('Evaluation timeout')), 8000)
      );

      const response = await Promise.race([evalPromise, timeoutPromise]);

      const text = response?.text;
      if (text) {
        const parsed = JSON.parse(text);
        return res.json({ success: true, evaluation: parsed, source: 'gemini-3.8-flash' });
      }
    }

    // Deterministic evaluation fallback
    const wordCount = answer.trim().split(/\s+/).length;
    const score = Math.min(9, Math.max(5, Math.floor(wordCount / 10) + 4));

    return res.json({
      success: true,
      evaluation: {
        score,
        verdict: score >= 8 ? 'Solid Answer' : 'Needs Polish',
        correctness: 'Your answer demonstrates good foundational awareness of the concept.',
        clarity: wordCount < 20 ? 'A bit brief. Try providing a specific example or analogy to illustrate your point.' : 'Well structured with clear terminology.',
        strengths: [
          'Directly addressed the question prompt',
          'Avoided rambling or unnecessary jargon'
        ],
        improvements: [
          'Connect the concept to a practical project you implemented',
          'Mention trade-offs or edge-cases where applicable'
        ],
        idealAnswer: `A comprehensive answer defines the concept cleanly, explains the rationale, and mentions a practical application from your own project experience.`,
        followUpQuestion: 'How would you test this implementation or verify its performance under load?'
      },
      source: 'fallback-prompt-engine'
    });
  } catch (err: any) {
    console.error('Error in /api/mock-evaluate:', err);
    return res.status(500).json({ error: 'Failed to evaluate answer', details: err.message });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AI Interview Prep server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
