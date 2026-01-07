import { Opportunity, ApplicantInformation } from '../types';
import { Clock, MapPin } from 'lucide-react';
import { useOrganizationStore } from '@/hooks/use-organization';
import useAuthStore from '@/hooks/use-auth';

interface ListProps {
    opportunities: Opportunity[];
    applicants: ApplicantInformation[];
}

const OpportunityList = ({ opportunities, applicants }: ListProps) => {
    const { applyToOpportunity } = useOrganizationStore();
    const { token, user, isLoggedIn } = useAuthStore();

    const appliedOpportunityIds = new Set(
        applicants.map(app => String(app.opportunity_id))
    );
    console.log(opportunities)
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

    return (
        <div className="space-y-4">
            {opportunities.map((opp) => {
                const hasApplied = appliedOpportunityIds.has(String(opp.id));

                return (
                    <div
                        key={opp.id}
                        className="border border-gray-200 p-5 bg-white hover:border-black transition-colors group flex flex-col md:flex-row gap-6"
                    >
                        <div className="flex-grow">
                            <div className="flex flex-wrap gap-2 mb-3">
                                <span className="bg-black text-white text-[10px] font-bold uppercase px-1.5 py-0.5 tracking-wider">
                                    {opp.type}
                                </span>
                            </div>

                            <h3 className="text-xl font-black uppercase leading-none mb-1 group-hover:text-[#FF6B00] transition-colors">
                                {opp.title}
                            </h3>

                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                                {opp.org_name}
                            </p>

                            <p className="text-sm text-gray-600 mb-4 max-w-2xl line-clamp-1">
                                {opp.description}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {opp.categories.map(tag => (
                                    <span key={tag} className="bg-gray-100 text-gray-600 text-[10px] font-bold uppercase px-2 py-1">
                                        {tag}
                                    </span>
                                ))}
                            </div> 
                        </div>

                        <div className="flex flex-row md:flex-col justify-between items-center md:items-end min-w-[140px] border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 gap-4">
                            <div className="space-y-1 text-right hidden md:block">
                                <div className="flex items-center justify-end text-xs font-bold text-gray-800 uppercase">
                                    <Clock className="w-3 h-3 mr-1.5 text-gray-400" />
                                    {opp.time_commitment}
                                </div>
                                <div className="flex items-center justify-end text-xs font-bold text-gray-800 uppercase">
                                    <MapPin className="w-3 h-3 mr-1.5 text-gray-400" />
                                    {opp.location}
                                </div>
                            </div>

                            {/* Mobile meta view */}
                            <div className="flex flex-col gap-1 md:hidden">
                                <div className="flex items-center text-[10px] font-bold text-gray-800 uppercase">
                                    <Clock className="w-3 h-3 mr-1.5 text-gray-400" />
                                    {opp.time_commitment}
                                </div>
                                <div className="flex items-center text-[10px] font-bold text-gray-800 uppercase">
                                    <MapPin className="w-3 h-3 mr-1.5 text-gray-400" />
                                    {opp.location}
                                </div>
                            </div>

                            <div className="w-full md:w-auto">
                                <button
                                    disabled={hasApplied || !isLoggedIn} // disable if applied or not logged in
                                    onClick={() =>
                                        !hasApplied && isLoggedIn && handleApply(opp.id, opp.org_id)
                                    }
                                    className={`font-bold uppercase text-xs py-2 px-6 tracking-widest transition-colors w-full md:w-auto
                                        ${hasApplied || !isLoggedIn
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-black hover:bg-gray-800 text-white'
                                        }
                                    `}
                                >
                                    {hasApplied
                                        ? 'Applied'
                                        : !isLoggedIn
                                            ? 'Login to Claim'
                                            : 'Claim'}
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default OpportunityList;
