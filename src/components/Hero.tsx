import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  Cpu, 
  BookOpen, 
  Clock, 
  ShieldCheck, 
  Code2, 
  ExternalLink 
} from 'lucide-react';
import { GITHUB_REPO_URL } from '../data/repoData';

interface HeroProps {
  onStartStudio: (presetId?: string) => void;
  onExplorePrompts: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartStudio, onExplorePrompts }) => {
  return (
    <section id="hero" className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-500/10 via-violet-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Repo pill */}
        <div className="flex justify-center mb-6">
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-xs font-medium text-slate-300 hover:text-white hover:border-indigo-500/60 transition-all shadow-sm group backdrop-blur"
          >
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-indigo-300 font-semibold">GitHub Project:</span>
            <span>26-99 / ai-interview-preparation-prompt-system</span>
            <ExternalLink className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Transform Any Job Description into a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400">
              Personalized Interview Prep Plan
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Eliminates generic, unfocused advice for fresh graduates and junior software developers. 
            Extracts exact tech stacks, prioritizes into <strong className="text-white font-medium">Must Prepare / Should Prepare / Good to Know</strong>, 
            provides grounded coding drills, and conducts an interactive 1-by-1 mock interview.
          </p>

          {/* Action buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onStartStudio()}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-xl shadow-indigo-600/30 hover:from-indigo-600 hover:to-violet-700 transition-all flex items-center gap-2 group hover:scale-102"
            >
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>Launch Prep Studio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onStartStudio('java-fresher')}
              className="px-5 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-slate-500 text-sm font-semibold text-slate-200 hover:text-white transition-all flex items-center gap-2"
            >
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>Try Java Fresher Preset</span>
            </button>

            <button
              onClick={onExplorePrompts}
              className="px-5 py-3.5 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800 text-sm font-medium text-slate-300 hover:text-white transition-all flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>Inspect Prompt Architecture</span>
            </button>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur hover:border-slate-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">9-Part Structured Dossier</h3>
            <p className="text-xs text-slate-400 mt-1">
              Tech analysis, 3-tier priority matrix, coding drills, project defense, HR questions, and revision checklists.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur hover:border-slate-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">0 Hallucinated Roles</h3>
            <p className="text-xs text-slate-400 mt-1">
              Strictly audits facts vs assumptions. Never invents professional experience or senior-level architecture crutches.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur hover:border-slate-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Time-Boxed Sprints</h3>
            <p className="text-xs text-slate-400 mt-1">
              Tailors preparation whether you have 4 hours, 24 hours, or 3 days with hour-by-hour interactive checklist phases.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur hover:border-slate-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-3">
              <Terminal className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Interactive Mock Coach</h3>
            <p className="text-xs text-slate-400 mt-1">
              Asks 1 question at a time, scores response clarity and correctness, and provides instant actionable tips.
            </p>
          </div>
        </div>

        {/* Problem vs Solution Comparison Banner */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-rose-400 font-mono">
                The Problem It Solves
              </span>
              <h4 className="text-base font-bold text-slate-200">
                Generic Prompts Fail Fresh Graduates
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Standard AI prompts like <em>"Prepare me for a software engineer interview"</em> generate overwhelming 20-page textbook lists with microservices, Kubernetes, and distributed systems that freshers are not tested on, while missing basic coding drills and SQL joins.
              </p>
            </div>

            <div className="space-y-2 md:border-l md:border-slate-800 md:pl-6">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                The Systemic Solution
              </span>
              <h4 className="text-base font-bold text-slate-200">
                Role-Grounded & Prioritized Preparation
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                This prompt system extracts explicit keywords from the job description, separates Must-Know fundamentals from Good-to-Know bonus topics, drafts grounded project questions, and conducts realistic sequential mock interviews.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
