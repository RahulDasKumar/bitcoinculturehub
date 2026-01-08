import React from 'react';
import ThisWeek from './ThisWeek';
import CalendarSection from './CalendarSection';
import ExploreSection from './ExploreSection';
import PipelineSection from './PipelineSection';
import ResumeSection from './ResumeSection';
import ArchiveSection from './ArchiveSection';
import GoalsSection from './GoalsSection';
import Header from '@/components/Header';

const ProfileBeta: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-bitcoin selection:text-white pb-20">
      <Header/>
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 py-8 pt-12">
        <h1 className="font-display text-6xl uppercase tracking-tighter leading-none mb-1">
          My Bitcoin Homebase
        </h1>
        <p className="text-gray-500 text-sm">
          Your daily command center for building in Bitcoin.
        </p>
        <div className="w-full h-[4px] bg-black mt-6 mb-8"></div>
      </header>

      <div className="max-w-7xl mx-auto px-4 space-y-4">
        <ThisWeek />
        <div className="w-full border-t border-gray-200 my-8"></div>
        <PipelineSection />
        <div className="w-full border-t border-gray-200 my-8"></div>
        <ExploreSection />
        <div className="w-full border-t border-gray-200 my-8"></div>
        <CalendarSection />
        <div className="w-full border-t border-gray-200 my-8"></div>
        <ResumeSection />
        <div className="w-full border-t border-gray-200 my-8"></div>
        <ArchiveSection />
        <div className="w-full border-t border-gray-200 my-8"></div>
        <GoalsSection />
      </div>

      <footer className="max-w-7xl mx-auto px-4 py-8 border-t border-black text-center text-xs text-gray-400 uppercase">
        Built for Bitcoiners • 2024
      </footer>
    </main>
  );
};

export default ProfileBeta;