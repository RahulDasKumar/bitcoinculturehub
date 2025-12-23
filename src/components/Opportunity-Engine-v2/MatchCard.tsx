import React from 'react';
import { ApplicantInformation, Opportunity } from '../types';
import { MapPin, Clock, DollarSign, Users, Flame, Zap } from 'lucide-react';
import useAuthStore from '@/hooks/use-auth';
import { useOrganizationStore } from '@/hooks/use-organization';

interface MatchCardProps {
  opportunity: Opportunity;
  variant?: 'grid' | 'list';
  applicants: ApplicantInformation[];
}

const MatchCard: React.FC<MatchCardProps> = ({ opportunity, applicants,variant = 'grid' }) => {
  const isGrid = variant === 'grid';
  const { applyToOpportunity } = useOrganizationStore()
  const { token, user } = useAuthStore()

  const baseApplication: ApplicantInformation = {
    username: user.username,
    avatar: user.avatar,
    location: user.location,
    email: user.email,
    opportunity_id: '',
    status: '',
    appliedAt: '',
    org_id: ''
  };

  const handleApply = (oppId: string, orgId: string) => {
    console.log('apply button being clicked')
    const applicationWithOpp: ApplicantInformation = {
      ...baseApplication,
      opportunity_id: oppId,
      status: 'applied',
      org_id: orgId,
      appliedAt: new Date().toISOString()
    };

    applyToOpportunity(token, applicationWithOpp);
  };
  let hasApplied = false
  applicants.forEach(app=>{
    if(app.opportunity_id == opportunity.id){
      hasApplied = true
    }
  })
  // Dynamic border color based on match percentage or special status
  // const borderColor = opportunity.matchPercentage > 90 ? 'border-[#FF6B00]' : 'border-gray-200';
  // const borderWidth = opportunity.matchPercentage > 90 ? 'border-2' : 'border';
  const borderColor = 'border-gray-200';
  const borderWidth = 'border-2';
  return (
    <div className={`bg-white ${borderWidth} ${borderColor} p-5 flex flex-col h-full hover:shadow-lg transition-shadow duration-200`}>
      {/* Header tags */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-2 flex-wrap">
          <span className="bg-black text-white text-[10px] font-bold uppercase px-1.5 py-0.5 tracking-wider">
            {opportunity.type}
          </span>
          {/* {opportunity.isSponsored && (
             <span className="bg-[#FF6B00] text-white text-[10px] font-bold uppercase px-1.5 py-0.5 tracking-wider">
             SPONSORED
           </span>
          )}
          {opportunity.matchPercentage > 90 && (
             <span className="bg-[#FF6B00] text-white text-[10px] font-bold uppercase px-1.5 py-0.5 tracking-wider">
             TOP MATCH
           </span>
          )} */}
        </div>
        <div className="border border-gray-300 px-1.5 py-0.5 text-[10px] font-bold text-gray-600 uppercase tracking-wider">
          {/* {opportunity.matchPercentage}% Match */}
        </div>
      </div>

      {/* Title & Org */}
      <h3 className="text-lg font-black uppercase leading-tight mb-1 truncate" title={opportunity.title}>
        {opportunity.title}
      </h3>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
        {opportunity.org_name}
      </p>

      {/* Description Snippet (Simulated) */}
      <p className="text-sm text-gray-600 mb-6 line-clamp-3">
        {opportunity.id === '1' && "You've attended 3 Nashville meetups—easy weekend IRL win."}
        {opportunity.id === '2' && "You shipped an editing clip—this creator collab is 1-3h with feedback."}
        {opportunity.id === '3' && "Campus speaker slot near you; your mining club badge boosts acceptance."}
        {Number(opportunity.id) > 3 && "Low-commit design task; perfect for building your portfolio."}
      </p>

      {/* Details Grid */}
      <div className="mt-auto space-y-2 mb-6">
        <div className="flex items-center text-xs font-semibold text-gray-700 uppercase">
            <Clock className="w-3.5 h-3.5 mr-2 text-gray-400" />
          {opportunity.time_commitment}
        </div>
        <div className="flex items-center text-xs font-semibold text-gray-700 uppercase">
            <MapPin className="w-3.5 h-3.5 mr-2 text-gray-400" />
            {opportunity.location}
        </div>
        {/* {opportunity.compensation && (
            <div className="flex items-center text-xs font-semibold text-gray-700 uppercase">
                <DollarSign className="w-3.5 h-3.5 mr-2 text-gray-400" />
                {opportunity.compensation}
            </div>
        )} */}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-6">
   
      </div>

      {/* Status Indicators */}
      <div className="space-y-1 mb-4 min-h-[40px]">
        {/* {opportunity.deadline && (
             <div className="flex items-center text-[10px] font-bold text-[#FF6B00] uppercase tracking-wide">
             <Zap className="w-3 h-3 mr-1" />
             {opportunity.deadline}
           </div>
        )} */}
        {/* {opportunity.status && (
            <div className={`inline-block px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide border 
                ${opportunity.status === 'High Demand' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                {opportunity.status}
            </div>
        )} */}
        <div className={`inline-block px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide border 'bg-green-50 text-green-600 border-green-100'}`}>
          {"active"}
        </div>
        {/* {opportunity.viewCount && (
            <div className="flex items-center text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                <Users className="w-3 h-3 mr-1" />
                {opportunity.viewCount} People Viewing Now
            </div>
        )} */}
        {/* {opportunity.claimedCount && (
             <div className="flex items-center text-[10px] font-bold text-gray-500 uppercase tracking-wide">
             <Users className="w-3 h-3 mr-1" />
             {opportunity.claimedCount} People Claimed Today
         </div>
        )} */}
      </div>

      <div className="w-full md:w-auto">
        <button
          disabled={hasApplied}
          onClick={() =>
            !hasApplied && handleApply(opportunity.id, opportunity.org_id)
          }
          className={`font-bold uppercase text-xs py-2 px-6 tracking-widest transition-colors w-full md:w-auto
                                        ${hasApplied
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-black hover:bg-gray-800 text-white'
            }
                                    `}
        >
          {hasApplied ? 'Applied' : 'Claim'}
        </button>
      </div>
    </div>
  );
};

export default MatchCard;