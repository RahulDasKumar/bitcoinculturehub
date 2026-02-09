import React from 'react';
import ThisWeek from './ThisWeek';
import CalendarSection from './CalendarSection';
import ExploreSection from './ExploreSection';
import PipelineSection from './PipelineSection';
import ResumeSection from './ResumeSection';
import ArchiveSection from './ArchiveSection';
import GoalsSection from './GoalsSection';
import Header from '@/components/Header';
import ResumeHub from './Resume';
import useAuthStore from '@/hooks/use-auth';
import ProfileBadge from './ProfileBadge';
import SectionHeader from './ui/SectionHeader';
import { FileUser, Plus } from 'lucide-react';
import MyOrganization from './MyOrganizations';
import DecisionDesk from './DecisionDesk';
const ProfileBeta: React.FC = () => {
  const { user } = useAuthStore()
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

      <div className="max-w-7xl mx-auto px-4 space-y-4 ">
        <SectionHeader
          icon={FileUser}
          title="Resume Section"
        />
        <div className='flex flex-row space-even justify-evenly'>
        <ResumeHub />
          <ProfileBadge username={user.username}/>
        </div>
        
        <div className="w-full border-t border-gray-200 my-8"></div>
        <PipelineSection />
        <div className="w-full border-t border-gray-200 my-8"></div>
        <DecisionDesk/>
        <div className="w-full border-t border-gray-200 my-8"></div>
        <MyOrganization/>
      </div>

      <footer className="max-w-7xl mx-auto px-4 py-8 border-t border-black text-center text-xs text-gray-400 uppercase">
        Built for Bitcoiners • 2024
      </footer>
    </main>
  );
};

export default ProfileBeta;