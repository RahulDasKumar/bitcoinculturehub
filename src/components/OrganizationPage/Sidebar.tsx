
import React from 'react';
import ComingSoonOverlay from '../../Profile-Beta/CommingSoonOverlay';
import { useNavigate } from 'react-router-dom';

const RELATED_ORGS = [
  { id: '1', name: 'Bitcoin Culture Hub', badge: 'Community', description: 'Cultural Education and Bitcoin Adoption', stats: 'Partner organization · 8 shared contributors', initials: 'BP' },
  { id: '2', name: 'Midwest Bitcoin Summit', badge: 'Conference', description: 'Open-source internship program for...', stats: 'Overlapping audience · 3 active opportunities', initials: 'So' },
  { id: '3', name: 'Bitcoin Park', badge: 'Community', description: 'Austin-based Bitcoin coworking & events', initials: 'BC' },
  { id: '4', name: 'Bitcoin Student Network', badge: 'Community', description: 'Bitcoin protocol research & education', stats: 'Similar opportunities · 94% completion rate', initials: 'CL' },
  { id: '5', name: 'Bitcoin Design', badge: 'Community', description: 'Open-source Bitcoin UX community', initials: 'BD' },
];

const TOPICS  = [
  { id: '1', name: 'Bitcoin Education', followers: '2,340 followers' },
  { id: '2', name: 'Lightning Network', followers: '1,890 followers' },
  { id: '3', name: 'Open Source', followers: '3,120 followers' },
  { id: '4', name: 'Student Programs', followers: '980 followers' },
  { id: '5', name: 'Developer Grants', followers: '1,450 followers' },
];

const TEAM  = [
  { id: '1', name: 'SC', role: 'Co-Founder & Executive Director', initials: 'SC' },
  { id: '2', name: 'MW', role: 'Co-Founder & Head of Partnerships', initials: 'MW' },
  { id: '3', name: 'ER', role: 'Head of Education', initials: 'ER' },
  { id: '4', name: 'JO', role: 'Africa Regional Lead', initials: 'JO' },
];

const OPPORTUNITIES = [
  { id: '1', title: 'Lightning Integration Bounty', type: 'Bounty', deadline: 'Due Jan 15', company: 'OpenSats' },
  { id: '2', title: 'Education Grant', type: 'Grant', deadline: 'Due Feb 1', company: 'HRF' },
  { id: '3', title: 'Summer Internship 2025', type: 'Internship', deadline: 'Due Mar 1', company: 'Chaincode Labs' },
];

const SectionTitle: React.FC<{ children: React.ReactNode; subtitle?: string }> = ({ children, subtitle }) => (
  <div className="mb-4">
    <h4 className="text-sm font-extrabold text-black uppercase tracking-wider">{children}</h4>
    {subtitle && <p className="text-[10px] text-gray-700 mt-1 uppercase font-bold">{subtitle}</p>}
  </div>
);

const Sidebar: React.FC = () => {

  const nav = useNavigate()
  return <>
    <aside className="space-y-12">
      <section>
        <SectionTitle subtitle="Active in similar work on BSN">Related Organizations</SectionTitle>
        <div className="space-y-px border-t border-l border-gray-200">
          {RELATED_ORGS.map(org => (
            <div key={org.id} className="p-4 border-b border-r border-gray-200 flex gap-4 hover:bg-gray-50 cursor-pointer transition-colors group">
              <div className="w-10 h-10 bg-gray-50 border border-gray-300 flex items-center justify-center font-bold text-xs text-black rounded group-hover:bg-white">
                {org.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[13px] font-black text-black">{org.name}</span>
                  {org.badge && (
                    <span className="text-[8px] border border-gray-400 px-1 py-0.5 rounded text-black font-bold uppercase tracking-widest">
                      {org.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-black font-medium mt-0.5 line-clamp-1">{org.description}</p>
                {org.stats && (
                   <p className="text-[10px] text-gray-700 font-bold mt-1">{org.stats}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-3 border border-black text-[10px] font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all" onClick={() => nav("/orgs")}>
          Explore All Organizations
        </button>
      </section>

      {/* Related Topics */}
      <ComingSoonOverlay>
      <section>
        <SectionTitle subtitle="Follow to see more">Related Topics</SectionTitle>
        <div className="space-y-px border-t border-l border-gray-200">
          {TOPICS.map(topic => (
            <div key={topic.id} className="p-4 border-b border-r border-gray-200 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors">
              <div>
                <p className="text-[13px] font-black text-black">{topic.name}</p>
                <p className="text-[10px] text-black font-medium">{topic.followers}</p>
              </div>
              <button className="border-2 border-black px-3 py-1.5 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 hover:bg-black hover:text-white transition-all">
                <span className="text-sm">+</span> Follow
              </button>
            </div>
          ))}
        </div>
      </section>
      </ComingSoonOverlay>
      {/* Team */}
      {/* <section>
        <div className="space-y-px border-t border-l border-gray-200">
          {TEAM.map(member => (
            <div key={member.id} className="p-4 border-b border-r border-gray-200 flex items-center gap-4 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold text-[10px] rounded">
                {member.initials}
              </div>
              <p className="text-[11px] font-black text-black">{member.role}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Related Opportunities */}
      <section>
        <SectionTitle subtitle="Open roles and bounties">Related Opportunities</SectionTitle>
        <div className="space-y-px border-t border-l border-gray-200">
          {OPPORTUNITIES.map(op => (
            <div key={op.id} className="p-4 border-b border-r border-gray-200 flex flex-col gap-1 hover:bg-gray-50 cursor-pointer transition-colors relative">
               <div className="absolute top-4 right-4 text-[8px] font-bold px-1.5 py-0.5 rounded border-2 border-black text-black uppercase tracking-widest bg-white">
                {op.type}
              </div>
              <p className="text-[12px] font-black text-black w-4/5">{op.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-black font-bold">{op.company}</span>
                <span className="text-[10px] text-gray-500 font-bold">·</span>
                <span className="text-[10px] text-black font-bold">{op.deadline}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-3 border border-black text-[10px] font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all" onClick={() => nav("/opportunity")}>
          Explore All Opportunities
        </button>
      </section>
    </aside>
  </>;
};

export default Sidebar;
