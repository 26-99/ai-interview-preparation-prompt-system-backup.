import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveStudio } from './components/InteractiveStudio';
import { PromptEvolutionLab } from './components/PromptEvolutionLab';
import { AiToolsSection } from './components/AiToolsSection';
import { SubmissionModal } from './components/SubmissionModal';
import { Footer } from './components/Footer';

export default function App() {
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('java-fresher');

  const handleStartStudio = (presetId?: string) => {
    if (presetId) {
      setSelectedPresetId(presetId);
    }
    const studioElement = document.getElementById('studio');
    if (studioElement) {
      studioElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExplorePrompts = () => {
    const evoElement = document.getElementById('evolution');
    if (evoElement) {
      evoElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'sections-preview') {
      const studioElement = document.getElementById('studio');
      if (studioElement) {
        studioElement.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top sticky navigation */}
      <Navbar 
        onOpenSubmission={() => setSubmissionModalOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero 
          onStartStudio={handleStartStudio}
          onExplorePrompts={handleExplorePrompts}
        />

        <InteractiveStudio 
          initialPresetId={selectedPresetId}
        />

        <PromptEvolutionLab />

        <AiToolsSection 
          onOpenSubmission={() => setSubmissionModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mission Submission Modal */}
      <SubmissionModal 
        isOpen={submissionModalOpen}
        onClose={() => setSubmissionModalOpen(false)}
      />
    </div>
  );
}
