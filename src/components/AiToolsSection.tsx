import React from 'react';
import { 
  Cpu, 
  Terminal, 
  Server, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  Check, 
  Copy,
  Layers,
  Sparkles
} from 'lucide-react';
import { AI_TOOLS_EXPLANATION, CHECKLISTS, GITHUB_REPO_URL, LIVE_WEBSITE_URL } from '../data/repoData';

interface AiToolsSectionProps {
  onOpenSubmission: () => void;
}

export const AiToolsSection: React.FC<AiToolsSectionProps> = ({ onOpenSubmission }) => {
  return (
    <section id="ai-tools" className="py-16 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Architecture & Toolkit</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI Tools Used & Implementation Details
          </h2>
          <p className="text-sm text-slate-400">
            A transparent breakdown of how Google Gemini, structured prompt engineering, and full-stack web infrastructure power this website.
          </p>
        </div>

        {/* 4 AI Tools Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AI_TOOLS_EXPLANATION.tools.map((tool, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {tool.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">0{idx + 1}</span>
              </div>
              <h3 className="text-base font-bold text-white">{tool.name}</h3>
              <p className="text-xs text-indigo-400 font-semibold">{tool.role}</p>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {tool.description}
              </p>
            </div>
          ))}
        </div>

        {/* Toolkit Checklists */}
        <div id="checklists" className="pt-6 space-y-6">
          <div className="border-t border-slate-800/80 pt-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Verified Compliance
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Toolkit Checklist Verification
                </h3>
              </div>
              <button
                onClick={onOpenSubmission}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs font-bold hover:from-indigo-600 hover:to-violet-700 transition-all shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open Submission Exporter</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Checklist 1: AI Website Builder Checklist */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-sm font-bold text-white">AI Website Builder Checklist</h4>
                </div>
                <ul className="space-y-2.5">
                  {CHECKLISTS.builder.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Checklist 2: Landing Page Planning Template */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <h4 className="text-sm font-bold text-white">Landing Page Planning</h4>
                </div>
                <ul className="space-y-2.5">
                  {CHECKLISTS.landing.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Checklist 3: Deployment Checklist */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold text-white">Deployment Checklist</h4>
                </div>
                <ul className="space-y-2.5">
                  {CHECKLISTS.deployment.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
