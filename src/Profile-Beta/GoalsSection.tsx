import React, { useEffect, useState } from 'react';
import SectionHeader from './ui/SectionHeader';
import { Zap, Plus, ArrowRight } from 'lucide-react';
import { BitcoinHomebaseAPI } from './api';
import { Goal } from './types';
import Loader from './ui/Loader';
import ComingSoonOverlay from './CommingSoonOverlay';

const GoalsSection: React.FC = () => {
  const [goals, setGoals] = useState<Record<string, Goal[]>>({ WEEK: [], MONTH: [], YEAR: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await BitcoinHomebaseAPI.getGoals();
        setGoals(data);
      } catch (error) {
        console.error("Failed to fetch goals", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <section className="mb-20"><Loader /></section>;

  return (
    <ComingSoonOverlay active={true} bannerRotation="rotate-[-2deg]">
    <section className="mb-20 relative group overflow-hidden">
      {/* Coming Soon Overlay */}
      {/* Greyed out content */}
        <SectionHeader
          icon={Zap}
          title="Goals & Intentions"
          subtitle="Set intentions. Track progress. Build with purpose."
          rightElement={
            <button className="flex items-center gap-2 border border-black px-4 py-1.5 text-xs font-bold uppercase">
              <Plus className="w-3 h-3" /> Add Goal
            </button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-black p-4 bg-white flex flex-col h-full">
            <h3 className="font-header font-bold uppercase text-xs mb-4 border-b border-gray-100 pb-2">This Week</h3>
            <div className="flex-1 space-y-4">
              {goals.WEEK?.map(goal => (
                <div key={goal.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-bold">{goal.title}</span>
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                  </div>
                  <div className="h-2 w-full bg-gray-100 mb-2">
                    <div className="h-full bg-bitcoin" style={{ width: `${goal.progress}%` }}></div>
                  </div>
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded uppercase font-bold">{goal.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-black p-4 bg-white flex flex-col h-full">
            <h3 className="font-header font-bold uppercase text-xs mb-4 border-b border-gray-100 pb-2">This Month</h3>
            <div className="flex-1 space-y-4">
              {goals.MONTH?.map(goal => (
                <div key={goal.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-bold">{goal.title}</span>
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                  </div>
                  <div className="h-2 w-full bg-gray-100 mb-2">
                    <div className="h-full bg-gray-400" style={{ width: `${goal.progress}%` }}></div>
                  </div>
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded uppercase font-bold">{goal.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-black p-4 bg-white flex flex-col h-full">
            <h3 className="font-header font-bold uppercase text-xs mb-4 border-b border-gray-100 pb-2">This Year</h3>
            <div className="flex-1 space-y-4">
              {goals.YEAR?.map(goal => (
                <div key={goal.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-bold">{goal.title}</span>
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                  </div>
                  <div className="h-2 w-full bg-gray-100 mb-2">
                    <div className="h-full bg-black" style={{ width: `${goal.progress}%` }}></div>
                  </div>
                  <span className="text-[10px] text-gray-400 uppercase">{goal.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
    </section>
    </ComingSoonOverlay >
  );
};

export default GoalsSection;
