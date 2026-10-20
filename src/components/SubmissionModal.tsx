import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  Send, 
  ExternalLink, 
  Globe, 
  Github, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { GITHUB_REPO_URL, LIVE_WEBSITE_URL } from '../data/repoData';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmissionModal: React.FC<SubmissionModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const submissionText = `🎯 Today's Mission Submission: AI-Powered Interview Preparation Prompt System Website

1. Live Website Link:
${LIVE_WEBSITE_URL}

2. GitHub Repository:
${GITHUB_REPO_URL}

3. AI Tools & Architecture Used:
- Google Gemini 3.8 Flash (@google/genai SDK): Powers server-side intelligent job description extraction, priority ranking (Must / Should / Good to Know), tailored fresher coding drills with test cases, and real-time evaluation of candidate responses during the interactive mock interview.
- Structured AI Prompt System by 26-99: Production prompt engineering framework featuring 3 progressive iterations (Initial Concept -> Constrained Guardrails -> Final Reusable System) with strict anti-hallucination auditing, facts vs. assumptions labeling, and sequential one-question-at-a-time mock coaching.
- Full-Stack Express + React 19 + TypeScript on Vite: Hosted with secure server-side API proxying on Cloud Run, ensuring zero client-side credential leakage and fast responsive interaction.
- Deterministic Fallback Engine: High-reliability fallback generation guaranteeing uninterrupted availability even under network interruptions.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(submissionText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Mission Submission Toolkit
            </h3>
            <p className="text-xs text-slate-400">
              Live website link and AI tools summary ready to submit.
            </p>
          </div>
        </div>

        {/* Live Link Card */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              Live Published Website Link
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              Active & Live
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs sm:text-sm font-mono text-slate-200 truncate">
            <span className="truncate">{LIVE_WEBSITE_URL}</span>
            <a
              href={LIVE_WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 p-1 flex-shrink-0"
              title="Open Live Website"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* GitHub Project Link */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Github className="w-3.5 h-3.5 text-slate-300" />
            GitHub Repository
          </span>
          <div className="flex items-center justify-between gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs sm:text-sm font-mono text-slate-200 truncate">
            <span className="truncate">{GITHUB_REPO_URL}</span>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white p-1 flex-shrink-0"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Formatted Submission Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Ready-to-Submit Response:
            </span>
            <span className="text-[11px] text-slate-400">Includes all mission requirements</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap">
            {submissionText}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Close
          </button>

          <button
            onClick={handleCopy}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 hover:from-indigo-600 hover:to-violet-700 transition-all"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Full Submission Text</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
