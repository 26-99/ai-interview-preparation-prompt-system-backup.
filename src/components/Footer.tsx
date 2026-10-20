import React from 'react';
import { Sparkles, Github, ExternalLink, Heart, ArrowUp } from 'lucide-react';
import { GITHUB_REPO_URL, LIVE_WEBSITE_URL } from '../data/repoData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">PromptPrep AI</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                v2.0
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              A production web application built on the open-source <strong>ai-interview-preparation-prompt-system</strong> by <strong>26-99</strong>.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            Designed for fresh graduates (MCA, B.Tech, BCA, CS/IT) entering the software industry.
          </p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> using Gemini 3.8 Flash & Full-Stack React.
          </p>
        </div>
      </div>
    </footer>
  );
};
