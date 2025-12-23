import React from 'react';
import { ApplicantInformation, Opportunity } from '../types';
import { MapPin, Clock } from 'lucide-react';
import useAuthStore from '@/hooks/use-auth';
import { useOrganizationStore } from '@/hooks/use-organization';

interface MatchCardProps {
  opportunity: Opportunity;
  variant?: 'grid' | 'list';
  applicants: ApplicantInformation[];
}

const MatchCard: React.FC<MatchCardProps> = ({ opportunity, applicants, variant = 'grid' }) => {
  const { applyToOpportunity } = useOrganizationStore();
  const { token, user, isLoggedIn } = useAuthStore();
  const isGrid = variant === 'grid';

  // Only create baseApplication if user is logged in
  const baseApplication: ApplicantInformation | null = isLoggedIn
    ? {
      username: user.username,
      avatar: user.avatar,
      location: user.location,
      email: user.email,
      opportunity_id: '',
      status: '',
      appliedAt: '',
      org_id: ''
    }
    : null;

  const handleApply = (oppId: string, orgId: string) => {
    if (!baseApplication) return; // safety check
    const applicationWithOpp: ApplicantInformation = {
      ...baseApplication,
      opportunity_id: oppId,
      status: 'applied',
      org_id: orgId,
      appliedAt: new Date().toISOString()
    };
    applyToOpportunity(token, applicationWithOpp);
  };

  let hasApplied = false;
  applicants.forEach(app => {
    if (app.opportunity_id === opportunity.id) {
      hasApplied = true;
    }
  });

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
        </div>
      </div>

      {/* Title & Org */}
      <h3 className="text-lg font-black uppercase leading-tight mb-1 truncate" title={opportunity.title}>
        {opportunity.title}
      </h3>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
        {opportunity.org_name}
      </p>

      {/* Description Snippet */}
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
      </div>

      {/* Status */}
      <div className="space-y-1 mb-4 min-h-[40px]">
        <div className="inline-block px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide border bg-green-50 text-green-600 border-green-100">
          {"active"}
        </div>
      </div>

      {/* Apply Button */}
      <div className="w-full md:w-auto">
        <button
          disabled={hasApplied || !isLoggedIn} // disable if applied or not logged in
          onClick={() =>
            !hasApplied && isLoggedIn && handleApply(opportunity.id, opportunity.org_id)
          }
          className={`font-bold uppercase text-xs py-2 px-6 tracking-widest transition-colors w-full md:w-auto
            ${hasApplied || !isLoggedIn
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-black hover:bg-gray-800 text-white'
            }`}
        >
          {hasApplied
            ? 'Applied'
            : !isLoggedIn
              ? 'Login to Claim'
              : 'Claim'}
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
