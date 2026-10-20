import React, { useState } from 'react';
import { 
  Sparkles, 
  Github, 
  Share2, 
  CheckCircle2, 
  BookOpen, 
  Terminal, 
  Layers, 
  Play, 
  Copy, 
  Menu, 
  X,
  Send
} from 'lucide-react';
import { GITHUB_REPO_URL, LIVE_WEBSITE_URL } from '../data/repoData';

interface NavbarProps {
  onOpenSubmission: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSubmission, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(LIVE_WEBSITE_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const navLinks = [
    { label: 'Interactive Studio', id: 'studio', icon: Play },
    { label: 'Prompt Lab', id: 'evolution', icon: Terminal },
    { label: '9 Output Sections', id: 'sections-preview', icon: Layers },
    { label: 'AI Architecture', id: 'ai-tools', icon: BookOpen },
    { label: 'Checklists', id: 'checklists', icon: CheckCircle2 },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-white tracking-tight">PromptPrep</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                v2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">AI Interview Prep Prompt System</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
              >
                <Icon className="w-3.5 h-3.5 text-indigo-400" />
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={handleCopyLink}
            title="Copy Live Site Link"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
          >
            {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copiedLink ? 'Link Copied!' : 'Live Link'}</span>
          </button>

          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-medium text-slate-200 hover:text-white hover:border-slate-600 transition-colors"
          >
            <Github className="w-3.5 h-3.5 text-slate-300" />
            <span>26-99/repo</span>
          </a>

          <button
            onClick={onOpenSubmission}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 text-xs font-bold text-white shadow-md shadow-indigo-600/25 hover:from-indigo-600 hover:to-violet-700 transition-all hover:scale-102"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submission Toolkit</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenSubmission}
            className="p-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold"
          >
            <Send className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800/80 transition-colors"
              >
                <Icon className="w-4 h-4 text-indigo-400" />
                {link.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiedLink ? 'Link Copied!' : 'Copy Live Website URL'}</span>
            </button>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
            >
              <Github className="w-4 h-4" />
              <span>View GitHub Repository</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
