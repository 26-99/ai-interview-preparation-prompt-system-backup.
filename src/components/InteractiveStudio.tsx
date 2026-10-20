import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  Download, 
  Printer, 
  Play, 
  RotateCcw, 
  Layers, 
  Code2, 
  BookOpen, 
  HelpCircle, 
  AlertTriangle, 
  CheckSquare, 
  MessageSquare, 
  ShieldAlert, 
  Clock, 
  ChevronRight, 
  ChevronDown, 
  Award,
  Cpu
} from 'lucide-react';
import { 
  PRESET_JOBS, 
  PrepPlan, 
  CodingProblem, 
  TechnicalQAItem, 
  ProjectQuestion, 
  HRQuestion, 
  TrickyFollowUp, 
  RevisionSlot, 
  MockQuestion 
} from '../data/repoData';

interface InteractiveStudioProps {
  initialPresetId?: string;
}

export const InteractiveStudio: React.FC<InteractiveStudioProps> = ({ initialPresetId }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(initialPresetId || 'java-fresher');
  const [role, setRole] = useState('Junior Java Developer');
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState('');
  const [prepHours, setPrepHours] = useState<number>(4);
  const [interviewDate, setInterviewDate] = useState('In 2 days');

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [plan, setPlan] = useState<PrepPlan | null>(null);
  const [activeTab, setActiveTab] = useState<'analysis' | 'priority' | 'technical' | 'coding' | 'project' | 'hr' | 'tricky' | 'revision' | 'mock'>('analysis');

  // Copy states
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  // Checkbox tracking for revision checklist
  const [completedChecklist, setCompletedChecklist] = useState<Record<string, boolean>>({});

  // Mock interview state
  const [currentMockIndex, setCurrentMockIndex] = useState<number>(0);
  const [mockCandidateAnswer, setMockCandidateAnswer] = useState<string>('');
  const [mockEvaluating, setMockEvaluating] = useState<boolean>(false);
  const [mockEvaluation, setMockEvaluation] = useState<any>(null);

  // Load preset on mount or change
  useEffect(() => {
    const preset = PRESET_JOBS.find(p => p.id === selectedPresetId);
    if (preset) {
      setRole(preset.role);
      setJobDescription(preset.jobDescription);
      setResume(preset.resume);
      setPrepHours(preset.prepHours);
      setInterviewDate(preset.interviewDate);
    }
  }, [selectedPresetId]);

  // Initial generation on first mount with the repo preset
  useEffect(() => {
    if (!plan) {
      handleGenerate();
    }
  }, []);

  const handleSelectPreset = (id: string) => {
    setSelectedPresetId(id);
    const preset = PRESET_JOBS.find(p => p.id === id);
    if (preset) {
      setRole(preset.role);
      setJobDescription(preset.jobDescription);
      setResume(preset.resume);
      setPrepHours(preset.prepHours);
      setInterviewDate(preset.interviewDate);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setMockEvaluation(null);
    setMockCandidateAnswer('');
    setCurrentMockIndex(0);

    const steps = [
      'Extracting skills & responsibilities from Job Description...',
      'Auditing candidate profile & anti-hallucination guardrails...',
      'Categorizing into Must / Should / Good to Know priority matrix...',
      'Synthesizing fresher coding drills & test cases...',
      'Structuring time-boxed revision plan & mock interview...'
    ];

    let stepIndex = 0;
    setLoadingStep(steps[0]);
    const stepInterval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        setLoadingStep(steps[stepIndex]);
      }
    }, 450);

    try {
      const res = await fetch('/api/generate-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role,
          jobDescription: jobDescription || 'Junior Software Developer with Java, SQL, Spring Boot, REST APIs',
          resume,
          prepHours,
          interviewDate
        })
      });

      const json = await res.json();
      if (json.data) {
        setPlan(json.data);
      }
    } catch (err) {
      console.error('Error fetching plan:', err);
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  // Evaluate candidate answer in mock interview
  const handleEvaluateMock = async () => {
    if (!plan || !plan.mockInterviewQuestions[currentMockIndex]) return;
    const currentQ = plan.mockInterviewQuestions[currentMockIndex];

    setMockEvaluating(true);
    try {
      const res = await fetch('/api/mock-evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQ.question,
          answer: mockCandidateAnswer || currentQ.sampleGoodAnswer,
          role,
          jobDescription
        })
      });
      const data = await res.json();
      if (data.evaluation) {
        setMockEvaluation(data.evaluation);
      }
    } catch (err) {
      console.error('Mock evaluation error:', err);
    } finally {
      setMockEvaluating(false);
    }
  };

  const handleCopyFullPrompt = () => {
    const prompt = `You are my personalized software developer interview coach. Analyze the job description I provide and use my resume only if I supply it. Identify the skills and responsibilities required for the role. Create a prioritized preparation plan with Must Prepare, Should Prepare, and Good to Know categories. Provide relevant technical questions with accurate, simple, interview-ready answers; 5–10 fresher-level coding problems with approaches and examples; project questions grounded in my actual projects; HR questions; likely follow-ups; and a final revision checklist. Focus on the supplied job description, clearly label assumptions, do not invent professional experience or company-specific information, and avoid unnecessary advanced topics. Finally, offer an interactive mock interview, asking one question at a time and evaluating each response before continuing.

Inputs:
- Target Role: ${role}
- Job description:
${jobDescription}
- Resume or project details (optional):
${resume || 'None'}
- Interview date: ${interviewDate}
- Available preparation time: ${prepHours} hours`;

    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleCopyMarkdown = () => {
    if (!plan) return;
    let md = `# Interview Preparation Plan: ${plan.analysis.roleTitle}\n\n`;
    md += `## 1. Job Description Analysis\n${plan.analysis.summary}\n\n`;
    md += `### Extracted Tech Stack\n${plan.analysis.extractedTechStack.map(t => `- ${t}`).join('\n')}\n\n`;
    md += `## 2. Prioritized Topics Matrix\n`;
    md += `### Must Prepare (High Priority)\n${plan.prioritizedTopics.mustPrepare.map(t => `- **${t.topic}** (${t.category}): ${t.why}`).join('\n')}\n\n`;
    md += `### Should Prepare (Medium Priority)\n${plan.prioritizedTopics.shouldPrepare.map(t => `- **${t.topic}** (${t.category}): ${t.why}`).join('\n')}\n\n`;
    md += `### Good to Know (Bonus)\n${plan.prioritizedTopics.goodToKnow.map(t => `- **${t.topic}** (${t.category}): ${t.why}`).join('\n')}\n\n`;
    md += `## 3. Technical Questions & Answers\n`;
    md += plan.technicalQA.map((qa, i) => `**Q${i+1}: ${qa.question}**\n*Answer:* ${qa.answer}\n*Key Takeaway:* ${qa.keyTakeaway}\n`).join('\n');
    md += `\n## 4. Coding Problems\n`;
    md += plan.codingPractice.map((cp, i) => `### ${i+1}. ${cp.title} (${cp.difficulty})\n${cp.problemStatement}\n*Approach:* ${cp.approach}\n\`\`\`javascript\n${cp.solutionCode}\n\`\`\`\n*Complexity:* ${cp.complexity}\n`).join('\n');

    navigator.clipboard.writeText(md);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  const toggleCheck = (id: string) => {
    setCompletedChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate checklist completion
  const totalChecklistItems = plan?.revisionPlan?.reduce((acc, slot) => acc + slot.checklist.length, 0) || 1;
  const completedCount = Object.values(completedChecklist).filter(Boolean).length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalChecklistItems) * 100));

  const tabList = [
    { id: 'analysis', label: '1. JD Analysis', icon: Cpu },
    { id: 'priority', label: '2. Priority Matrix', icon: Layers },
    { id: 'technical', label: '3. Technical Q&A', icon: BookOpen },
    { id: 'coding', label: '4. Coding Arena', icon: Code2 },
    { id: 'project', label: '5. Project Defense', icon: HelpCircle },
    { id: 'hr', label: '6. HR Questions', icon: MessageSquare },
    { id: 'tricky', label: '7. Tricky Traps', icon: ShieldAlert },
    { id: 'revision', label: '8. Revision Sprint', icon: Clock },
    { id: 'mock', label: '9. Mock Interview Coach', icon: Award },
  ] as const;

  return (
    <section id="studio" className="py-12 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Prompt Studio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Interview Preparation Studio
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Feed any job description. Generate the 9-part structured roadmap and practice with the sequential mock coach.
            </p>
          </div>

          {/* Quick Preset Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Presets:</span>
            {PRESET_JOBS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedPresetId === preset.id
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Target Role */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Target Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Junior Java Developer / Associate Full Stack"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium"
              />
            </div>

            {/* Preparation Window */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Available Preparation Time
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {[4, 8, 12, 24, 72].map((hrs) => (
                  <button
                    key={hrs}
                    type="button"
                    onClick={() => setPrepHours(hrs)}
                    className={`py-2 text-xs font-bold rounded-lg transition-all ${
                      prepHours === hrs
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {hrs}h
                  </button>
                ))}
              </div>
            </div>

            {/* Target Date */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Target Interview Date
              </label>
              <input
                type="text"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                placeholder="e.g. In 2 days / Friday morning"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Job Description Textarea */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Job Description (Paste Full JD)
                </label>
                <span className="text-[11px] text-slate-400">Required</span>
              </div>
              <textarea
                rows={5}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the complete job description here..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono leading-relaxed"
              />
            </div>

            {/* Resume / Projects Textarea */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Candidate Resume / Project Details
                </label>
                <span className="text-[11px] text-emerald-400">Anti-Hallucination Anchor</span>
              </div>
              <textarea
                rows={5}
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Mention your actual MCA / BTech degree, projects, and technologies. The prompt system will restrict questions to these."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono leading-relaxed"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyFullPrompt}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copiedPrompt ? 'System Prompt Copied!' : 'Copy Formatted Prompt'}</span>
              </button>

              {plan && (
                <button
                  type="button"
                  onClick={handleCopyMarkdown}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                >
                  {copiedMarkdown ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copiedMarkdown ? 'Markdown Copied!' : 'Export Markdown'}</span>
                </button>
              )}
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={handleGenerate}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/25 hover:from-indigo-600 hover:to-violet-700 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Generating Roadmap...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Preparation Plan</span>
                </>
              )}
            </button>
          </div>

          {/* Loading status bar */}
          {loading && (
            <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />
              <p className="text-xs text-indigo-200 font-mono animate-pulse">{loadingStep}</p>
            </div>
          )}
        </div>

        {/* Results Dossier */}
        {plan && (
          <div className="space-y-6">
            {/* Dossier Header Bar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                    Preparation Dossier
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                    Verified Fresher Blueprint
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {plan.analysis.roleTitle}
                </h3>
              </div>

              {/* Revision Sprint Progress */}
              <div className="w-full sm:w-64 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between text-[11px] text-slate-300 font-medium mb-1.5">
                  <span>Sprint Completion</span>
                  <span className="font-mono text-indigo-400 font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 9-Tab Navigation */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 no-scrollbar">
              {tabList.map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab 1: JD Analysis */}
            {activeTab === 'analysis' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Summary */}
                  <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-indigo-400" />
                      Executive Summary
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {plan.analysis.summary}
                    </p>
                  </div>

                  {/* Extracted Tech Stack */}
                  <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                    <h4 className="text-sm font-bold text-white">Extracted Technologies & Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {plan.analysis.extractedTechStack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Responsibilities */}
                  <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                    <h4 className="text-sm font-bold text-white">Primary Core Responsibilities</h4>
                    <ul className="space-y-2">
                      {plan.analysis.keyResponsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Audit & Guardrails Sidebar */}
                <div className="space-y-6">
                  {/* Assumptions Flagged */}
                  <div className="p-5 rounded-2xl bg-slate-900/70 border border-amber-500/20 space-y-3">
                    <div className="flex items-center gap-2 text-amber-400">
                      <AlertTriangle className="w-4 h-4" />
                      <h4 className="text-xs font-bold uppercase tracking-wider">Assumptions Flagged</h4>
                    </div>
                    <ul className="space-y-2">
                      {plan.analysis.assumptionsFlagged.map((item, i) => (
                        <li key={i} className="text-xs text-slate-300 leading-relaxed pl-2 border-l-2 border-amber-500/40">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Missing Info Flagged */}
                  <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 text-slate-300">
                      <HelpCircle className="w-4 h-4 text-indigo-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wider">Missing JD Info</h4>
                    </div>
                    <ul className="space-y-2">
                      {plan.analysis.missingInfo.map((item, i) => (
                        <li key={i} className="text-xs text-slate-400 leading-relaxed pl-2 border-l-2 border-slate-700">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Priority Matrix */}
            {activeTab === 'priority' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Must Prepare */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-rose-500/30 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                      <h4 className="text-sm font-extrabold text-white">Must Prepare</h4>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                      Critical (80% Weight)
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Non-negotiable core concepts. If you fail these, the technical round terminates early.
                  </p>
                  <div className="space-y-3">
                    {plan.prioritizedTopics.mustPrepare.map((item, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-rose-200">{item.topic}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{item.why}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Should Prepare */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <h4 className="text-sm font-extrabold text-white">Should Prepare</h4>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                      High Impact
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Practical framework application, tool usage, and testing methodologies.
                  </p>
                  <div className="space-y-3">
                    {plan.prioritizedTopics.shouldPrepare.map((item, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-200">{item.topic}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{item.why}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Good to Know */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <h4 className="text-sm font-extrabold text-white">Good to Know</h4>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      Differentiator
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Cloud deployment, containerization, and advanced architecture bonus points.
                  </p>
                  <div className="space-y-3">
                    {plan.prioritizedTopics.goodToKnow.map((item, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-200">{item.topic}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{item.why}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Technical Q&A */}
            {activeTab === 'technical' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>
                    Interview-ready answers calibrated for freshers. Simple explanations without confusing jargon, accompanied by key takeaways.
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {plan.technicalQA.map((qa, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                          <span className="text-indigo-400 font-mono mr-2">Q{i + 1}.</span>
                          {qa.question}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 whitespace-nowrap">
                          {qa.category}
                        </span>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
                        <span className="text-emerald-400 font-bold block mb-1">Interview-Ready Answer:</span>
                        {qa.answer}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-indigo-300/90 bg-indigo-950/30 px-3 py-2 rounded-lg border border-indigo-500/20">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                        <span><strong>Key Takeaway:</strong> {qa.keyTakeaway}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Coding Practice */}
            {activeTab === 'coding' && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>5–10 Fresher Coding Drills extracted for this exact role. Focus on optimal approach & edge cases.</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {plan.codingPractice.map((prob, i) => (
                    <div key={i} className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold flex items-center justify-center">
                            #{i + 1}
                          </span>
                          <h4 className="text-base font-bold text-white">{prob.title}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                            {prob.difficulty}
                          </span>
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {prob.complexity}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs sm:text-sm text-slate-300">
                        <strong className="text-slate-100">Problem Statement:</strong> {prob.problemStatement}
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-indigo-200">
                        <strong>Approach:</strong> {prob.approach}
                      </div>

                      {/* Code Block with Copy */}
                      <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#0d1117]">
                        <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400 font-mono">
                          <span>JavaScript / Reference Solution</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(prob.solutionCode);
                              setCopiedCodeIndex(i);
                              setTimeout(() => setCopiedCodeIndex(null), 2000);
                            }}
                            className="flex items-center gap-1 text-slate-300 hover:text-white"
                          >
                            {copiedCodeIndex === i ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedCodeIndex === i ? 'Copied' : 'Copy Code'}</span>
                          </button>
                        </div>
                        <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                          <code>{prob.solutionCode}</code>
                        </pre>
                      </div>

                      {/* Test Cases */}
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Example Test Cases:</span>
                        <div className="flex flex-wrap gap-2">
                          {prob.testCases.map((tc, tcIdx) => (
                            <span key={tcIdx} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                              {tc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 5: Project Defense */}
            {activeTab === 'project' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>
                    Questions anchored exclusively in the candidate's actual projects. No imaginary professional experience or exaggerated claims.
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {plan.projectQuestions.map((pq, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        <span className="text-indigo-400 font-mono mr-2">Q{i + 1}.</span>
                        {pq.question}
                      </h4>
                      <p className="text-xs text-slate-400 italic">
                        <strong>Why interviewers ask this:</strong> {pq.rationale}
                      </p>
                      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                        <span className="text-xs font-bold text-emerald-400 block">Recommended Talking Points:</span>
                        <ul className="space-y-1.5">
                          {pq.idealTalkingPoints.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-300">
                              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 6: HR Questions */}
            {activeTab === 'hr' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-violet-400 flex-shrink-0" />
                  <span>
                    Essential behavioral questions with tailored answers highlighting passion, adaptability, and culture fit for freshers.
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {plan.hrQuestions.map((hr, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        <span className="text-violet-400 font-mono mr-2">HR-{i + 1}:</span>
                        {hr.question}
                      </h4>
                      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
                        <strong className="text-violet-300 block mb-1">Recommended Response:</strong>
                        {hr.sampleAnswer}
                      </div>
                      <div className="text-xs text-slate-400 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
                        <strong className="text-indigo-400">Framework Tip:</strong> {hr.frameworkTip}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 7: Tricky Traps */}
            {activeTab === 'tricky' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>
                    Catch deceptive follow-up questions before they trip you up. Learn to avoid common pitfalls freshers fall into.
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {plan.trickyFollowUps.map((trap, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-slate-900/80 border border-rose-500/20 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-mono font-bold uppercase">
                          Trap Scenario #{i + 1}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        "{trap.trickyQuestion}"
                      </h4>
                      <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs text-rose-300">
                        <strong>The Trap to Avoid:</strong> {trap.trap}
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-emerald-300 leading-relaxed">
                        <strong className="text-emerald-400 block mb-1">Bulletproof Answer Strategy:</strong>
                        {trap.strongResponse}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 8: Revision Sprint */}
            {activeTab === 'revision' && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>
                      Practical {prepHours}-Hour Revision Checklist. Check off tasks as you prepare to track your sprint progress!
                    </span>
                  </div>
                  <span className="font-mono text-indigo-400 font-bold text-xs">{progressPercent}% Done</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {plan.revisionPlan.map((slot, sIdx) => (
                    <div key={sIdx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className="text-xs font-mono font-bold text-amber-400">{slot.timeSlot}</span>
                        <h4 className="text-sm font-bold text-white">{slot.title}</h4>
                      </div>

                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Key Focus Areas:</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {slot.focusAreas.map((fa, faIdx) => (
                            <span key={faIdx} className="text-[11px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                              {fa}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-800/80">
                        <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">Sprint Checklist:</span>
                        <div className="space-y-1.5">
                          {slot.checklist.map((item, cIdx) => {
                            const checkId = `slot-${sIdx}-item-${cIdx}`;
                            const isChecked = !!completedChecklist[checkId];
                            return (
                              <div
                                key={cIdx}
                                onClick={() => toggleCheck(checkId)}
                                className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                                  isChecked
                                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200 line-through'
                                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                                }`}
                              >
                                <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                  isChecked ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-slate-600'
                                }`}>
                                  {isChecked && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span className="leading-snug">{item}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 9: Interactive Mock Interview Coach */}
            {activeTab === 'mock' && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span>
                      Prompt Protocol: <em>"Ask one question at a time. Wait for response, evaluate correctness and clarity, then continue."</em>
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-400">
                    Question {currentMockIndex + 1} of {plan.mockInterviewQuestions.length}
                  </span>
                </div>

                {/* Current Question Card */}
                {plan.mockInterviewQuestions[currentMockIndex] && (
                  <div className="p-6 rounded-2xl bg-slate-900/90 border border-indigo-500/30 space-y-5 shadow-2xl">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-xs font-bold font-mono">
                          Question {currentMockIndex + 1}
                        </span>
                        <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono">
                          {plan.mockInterviewQuestions[currentMockIndex].category}
                        </span>
                      </div>

                      {/* Question jump buttons */}
                      <div className="flex items-center gap-1.5">
                        {plan.mockInterviewQuestions.map((_, qIdx) => (
                          <button
                            key={qIdx}
                            onClick={() => {
                              setCurrentMockIndex(qIdx);
                              setMockEvaluation(null);
                              setMockCandidateAnswer('');
                            }}
                            className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                              currentMockIndex === qIdx
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                          >
                            {qIdx + 1}
                          </button>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                      "{plan.mockInterviewQuestions[currentMockIndex].question}"
                    </h3>

                    <div className="text-xs text-slate-400 flex items-center gap-2">
                      <span className="font-semibold text-slate-300">Interviewer Evaluation Criteria:</span>
                      <span>{plan.mockInterviewQuestions[currentMockIndex].criteria}</span>
                    </div>

                    {/* Candidate Answer Box */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                          Your Answer:
                        </label>
                        <button
                          type="button"
                          onClick={() => setMockCandidateAnswer(plan.mockInterviewQuestions[currentMockIndex].sampleGoodAnswer)}
                          className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-2"
                        >
                          Use Sample Good Answer
                        </button>
                      </div>
                      <textarea
                        rows={4}
                        value={mockCandidateAnswer}
                        onChange={(e) => setMockCandidateAnswer(e.target.value)}
                        placeholder="Type your response as you would speak it in an interview..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    {/* Submit Answer */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        disabled={mockEvaluating || !mockCandidateAnswer.trim()}
                        onClick={handleEvaluateMock}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50"
                      >
                        {mockEvaluating ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>AI Evaluating Your Answer...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Answer for AI Evaluation</span>
                          </>
                        )}
                      </button>

                      {currentMockIndex < plan.mockInterviewQuestions.length - 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            setCurrentMockIndex(currentMockIndex + 1);
                            setMockEvaluation(null);
                            setMockCandidateAnswer('');
                          }}
                          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                        >
                          <span>Skip to Next Question</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* AI Feedback Card */}
                    {mockEvaluation && (
                      <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-mono font-extrabold text-indigo-300 text-base">
                              {mockEvaluation.score}/10
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white">AI Coach Feedback</h4>
                              <span className="text-xs text-indigo-400 font-semibold">{mockEvaluation.verdict}</span>
                            </div>
                          </div>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Evaluated via Gemini 3.8 Flash
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                            <span className="text-xs font-bold text-slate-200 block">Technical Correctness:</span>
                            <p className="text-xs text-slate-300 leading-relaxed">{mockEvaluation.correctness}</p>
                          </div>
                          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                            <span className="text-xs font-bold text-slate-200 block">Clarity & Communication:</span>
                            <p className="text-xs text-slate-300 leading-relaxed">{mockEvaluation.clarity}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Strengths:</span>
                            <ul className="space-y-1">
                              {mockEvaluation.strengths?.map((str: string, sIdx: number) => (
                                <li key={sIdx} className="flex items-start gap-2 text-xs text-slate-300">
                                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                  <span>{str}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-1.5">
                            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Areas to Improve:</span>
                            <ul className="space-y-1">
                              {mockEvaluation.improvements?.map((imp: string, iIdx: number) => (
                                <li key={iIdx} className="flex items-start gap-2 text-xs text-slate-300">
                                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                                  <span>{imp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {mockEvaluation.followUpQuestion && (
                          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-1">
                            <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" />
                              Interviewer Follow-Up Question:
                            </span>
                            <p className="text-xs sm:text-sm text-white italic">
                              "{mockEvaluation.followUpQuestion}"
                            </p>
                          </div>
                        )}

                        {currentMockIndex < plan.mockInterviewQuestions.length - 1 && (
                          <div className="pt-2 flex justify-end">
                            <button
                              type="button"
                              onClick={() => {
                                setCurrentMockIndex(currentMockIndex + 1);
                                setMockEvaluation(null);
                                setMockCandidateAnswer('');
                              }}
                              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-bold shadow-md hover:bg-indigo-700 transition-colors"
                            >
                              <span>Next Question</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
