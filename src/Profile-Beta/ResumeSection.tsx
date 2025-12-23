import React, { useEffect, useState } from 'react';
import SectionHeader from './ui/SectionHeader';
import { Layout, Share2, Download, Eye, EyeOff, Star } from 'lucide-react';
import { BitcoinHomebaseAPI } from './api';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import Loader from './ui/Loader';
import ComingSoonOverlay from './CommingSoonOverlay';

const ResumeSection: React.FC = () => {
  const [isPrivate, setIsPrivate] = useState(true);
  const [proof, setProof] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const earningsData = [
    { v: 10 }, { v: 15 }, { v: 8 }, { v: 25 }, { v: 20 }, { v: 35 }, { v: 30 }, { v: 45 }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [proofData, eventsData, skillsData] = await Promise.all([
          BitcoinHomebaseAPI.getResumeProof(),
          BitcoinHomebaseAPI.getResumeEvents(),
          BitcoinHomebaseAPI.getSkills()
        ]);
        setProof(proofData);
        setEvents(eventsData);
        setSkills(skillsData);
      } catch (error) {
        console.error("Failed to fetch resume data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <section className="mb-12"><Loader /></section>;

  return (
    <ComingSoonOverlay active={true} bannerRotation="rotate-[-2deg]">
      <section className="mb-12">
        <SectionHeader
          icon={Layout}
          title="My Bitcoin Resume"
          rightElement={
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 mr-4">
                <span className={`text-[10px] uppercase font-bold ${!isPrivate ? 'text-gray-400' : 'text-black'}`}>Public</span>
                <button className="w-8 h-4 bg-gray-200 rounded-full relative transition-colors duration-200">
                  <div className={`w-3 h-3 bg-black rounded-full absolute top-0.5 transition-all duration-200 ${isPrivate ? 'right-0.5' : 'left-0.5'}`}></div>
                </button>
                <span className={`text-[10px] uppercase font-bold ${isPrivate ? 'text-gray-400' : 'text-black'}`}>Private</span>
              </div>
              <button className="flex items-center gap-2 border border-black px-3 py-1.5 text-xs font-bold uppercase">
                <Share2 className="w-3 h-3" /> Share
              </button>
              <button className="flex items-center gap-2 border border-black px-3 py-1.5 text-xs font-bold uppercase">
                <Download className="w-3 h-3" /> Export
              </button>
            </div>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="border border-black p-6 bg-bitcoin-light/20">
              <h3 className="font-header font-bold uppercase text-sm mb-4 flex items-center gap-2">
                <span className="text-bitcoin bg-black rounded-full w-4 h-4 flex items-center justify-center text-[10px]">✓</span> Proof of Work
              </h3>
              <div className="space-y-0">
                {proof.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0 border-dashed">
                    <div>
                      <p className="font-bold text-sm">{item.title}</p>
                      <p className="text-[10px] text-gray-500">{item.date}</p>
                    </div>
                    <span className="text-[10px] bg-gray-200 px-2 py-1 rounded-full text-gray-600 font-bold uppercase">{item.tag}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-black p-6 bg-white">
              <h3 className="font-header font-bold uppercase text-sm mb-4">Events & Talks</h3>
              <div className="space-y-0">
                {events.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-bold text-sm">{item.title}</p>
                      <p className="text-[10px] text-gray-500">{item.date}</p>
                    </div>
                    <span className="text-[10px] font-bold text-right text-gray-800">{item.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-black p-6 bg-white">
              <h3 className="font-header font-bold uppercase text-sm mb-4">Top Skills</h3>
              <div className="space-y-3">
                {skills.map((skill, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-sm font-bold">{skill.name}</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${star <= skill.level ? 'fill-bitcoin text-bitcoin' : 'text-gray-200'}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-black p-6 bg-gray-50 h-40">
              <h3 className="font-header font-bold uppercase text-sm mb-2">Reputation</h3>
              <div className="grid grid-cols-3 gap-4 h-full items-center pb-6">
                <div className="text-center">
                  <div className="text-3xl font-header font-bold flex justify-center items-start gap-1">5 <Star className="w-3 h-3 fill-bitcoin text-bitcoin mt-1" /></div>
                  <div className="text-[10px] text-gray-500 uppercase">5 reviews</div>
                </div>
                <div className="text-center border-x border-gray-200">
                  <div className="text-3xl font-header font-bold">8</div>
                  <div className="text-[10px] text-gray-500 uppercase">Level</div>
                </div>
                <div className="text-center">
                  <div className="h-8 w-16 mx-auto mb-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={earningsData}>
                        <Area type="monotone" dataKey="v" stroke="#000" fill="#F7931A" strokeWidth={1} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase">Show earnings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ComingSoonOverlay>
  );
};

export default ResumeSection;