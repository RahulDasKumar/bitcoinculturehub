import React, { useEffect, useState } from 'react';
import { ArrowRight, Zap, Check } from 'lucide-react';
import { BitcoinHomebaseAPI } from './api';
import { Event, Opportunity, Proof } from './types';
import Loader from './ui/Loader';
import ComingSoonOverlay from './CommingSoonOverlay';

const ThisWeek: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [proof, setProof] = useState<Proof[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsData, oppsData, proofData] = await Promise.all([
          BitcoinHomebaseAPI.getUpcomingEvents(),
          BitcoinHomebaseAPI.getActiveOpportunities(),
          BitcoinHomebaseAPI.getRecentProof()
        ]);
        setEvents(eventsData);
        setOpportunities(oppsData);
        setProof(proofData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <section className="mb-12"><Loader /></section>;

  return (
    <section className="mb-12">
      <div className="flex justify-between items-end mb-4 border-b-2 border-black pb-2">
        <h2 className="font-header text-4xl font-bold uppercase">This Week</h2>
        <span className="text-gray-500 text-sm mb-1">Your momentum snapshot</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Upcoming Events */}
        <div className="border border-black p-4 flex flex-col h-full bg-white relative hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-header font-bold uppercase text-sm flex items-center gap-2">
              <span className="text-bitcoin">📅</span> Upcoming Events
            </h3>
            <a href="#" className="text-[10px] font-bold uppercase flex items-center gap-1 hover:text-bitcoin">
              View All <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          <div className="flex-1 space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex justify-between items-start group cursor-pointer">
                <div>
                  <p className="font-bold text-sm leading-tight group-hover:text-bitcoin transition-colors">{event.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                </div>
                <span className="text-[10px] uppercase border border-gray-300 px-1 py-0.5 rounded-sm text-gray-500">
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Active Opportunities */}
        <div className="border border-black p-4 flex flex-col h-full bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-header font-bold uppercase text-sm flex items-center gap-2">
              <span className="text-bitcoin">💼</span> Active Opportunities
            </h3>
            <a href="#" className="text-[10px] font-bold uppercase flex items-center gap-1 hover:text-bitcoin">
              Pipeline <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          <div className="flex-1 space-y-4">
            {opportunities.map((opp) => (
              <div key={opp.id} className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-sm leading-tight">{opp.role}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{opp.company}</p>
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm ${
                  opp.status === 'APPLIED' ? 'bg-orange-100 text-orange-600' :
                  opp.status === 'INTERVIEW' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {opp.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Skill Focus */}
        <ComingSoonOverlay active={true} bannerRotation="rotate-[-2deg]">

        <div className="border border-black p-4 flex flex-col h-full bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-header font-bold uppercase text-sm flex items-center gap-2">
              <span className="text-bitcoin"><Zap className="w-4 h-4 fill-current" /></span> Skill Focus
            </h3>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex justify-between items-end mb-2">
              <p className="font-bold text-sm">Lightning Network</p>
              <p className="text-xs text-gray-500">12/20 hrs</p>
            </div>
            <div className="w-full bg-gray-200 h-2 mb-2 rounded-full overflow-hidden">
              <div className="bg-bitcoin h-full rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="text-[10px] text-gray-500">60% to mastery milestone</p>
          </div>
        </div>
        </ComingSoonOverlay>
        <ComingSoonOverlay active={true} bannerRotation="rotate-[-2deg]">

        {/* Card 4: Recent Proof */}
        <div className="border border-black p-4 flex flex-col h-full bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-header font-bold uppercase text-sm flex items-center gap-2">
              <span className="text-bitcoin"><Check className="w-4 h-4" /></span> Recent Proof
            </h3>
          </div>
          <div className="flex-1 space-y-3">
            {proof.map((proof) => (
              <div key={proof.id} className="flex justify-between items-center border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                <div>
                  <p className="font-bold text-xs leading-tight">{proof.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{proof.date}</p>
                </div>
                <span className="text-[10px] font-bold text-bitcoin">
                  +{proof.sats} sats
                </span>
              </div>
            ))}
          </div>
        </div>
        </ComingSoonOverlay>
      </div>
      
    </section>
  );
};

export default ThisWeek;