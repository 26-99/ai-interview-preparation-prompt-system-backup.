import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  GitCommit
} from 'lucide-react';
import { PROMPT_ITERATIONS } from '../data/repoData';

export const PromptEvolutionLab: React.FC = () => {
  const [selectedIterationIndex, setSelectedIterationIndex] = useState(2); // Default to Final Reusable Prompt
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const current = PROMPT_ITERATIONS[selectedIterationIndex];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="evolution" className="py-16 bg-slate-950/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold">
            <Terminal className="w-3.5 h-3.5" />
            <span>Prompt Engineering Lab</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            How the Prompt System Evolved
          </h2>
          <p className="text-sm text-slate-400">
            Compare the iterations documented in the repository: from the initial naive concept to the hardened, constraint-grounded production system.
          </p>
        </div>

        {/* Iteration Selector Stepper */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PROMPT_ITERATIONS.map((item, idx) => {
            const isSelected = selectedIterationIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedIterationIndex(idx)}
                className={`p-4 rounded-2xl text-left border transition-all relative ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500 ring-1 ring-indigo-500/50 shadow-xl shadow-indigo-500/10'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                      {item.iteration}
                    </span>
                  </div>
                  {idx === 2 && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      Recommended
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{item.summary}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Iteration Detail Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider mb-1">
                <GitCommit className="w-4 h-4" />
                <span>{current.iteration} Inspection</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {current.title}
              </h3>
            </div>

            <button
              onClick={() => handleCopy(current.promptText, selectedIterationIndex)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/20"
            >
              {copiedIndex === selectedIterationIndex ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Prompt Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Prompt Code</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Prompt Text Box */}
            <div className="lg:col-span-7 space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Full Prompt Text:
              </span>
              <div className="relative rounded-2xl bg-[#090d16] border border-slate-800 p-5 font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto max-h-[460px] overflow-y-auto">
                <pre className="whitespace-pre-wrap">{current.promptText}</pre>
              </div>
            </div>

            {/* Analysis & Key Takeaways */}
            <div className="lg:col-span-5 space-y-5">
              {/* Improvements */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-emerald-500/20 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Key Improvements Added</h4>
                </div>
                <ul className="space-y-2">
                  {current.improvements.map((imp, impIdx) => (
                    <li key={impIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitations / Evolution Need */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400">
                  <AlertCircle className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Engineering Limitation</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {current.limitations}
                </p>
              </div>

              {/* Prompt Engineering Techniques */}
              <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 space-y-2">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Techniques Demonstrated
                </span>
                <p className="text-xs text-slate-400">
                  {selectedIterationIndex === 0 && 'Role Prompting, Custom Output Formatting, Time-bounded scoping.'}
                  {selectedIterationIndex === 1 && 'Context Grounding, Negative Prompting (do not invent experience), Multi-turn mock protocol.'}
                  {selectedIterationIndex === 2 && 'Reusable Parameterized Slots, Audit Gates, Zero-shot Schema Enforcing, Quality Verification.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
