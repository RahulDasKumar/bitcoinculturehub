import React from 'react';
import { Opportunity, ApplicantInformation } from '../types';
import { Clock, MapPin } from 'lucide-react';
import { useOrganizationStore } from '@/hooks/use-organization';
import useAuthStore from '@/hooks/use-auth';

interface ListProps {
    opportunities: Opportunity[];
}

const OpportunityList = ({ opportunities }: ListProps) => {
    const { applyToOpportunity } = useOrganizationStore();
    const { token, user } = useAuthStore();

    const baseApplication: ApplicantInformation = {
        username: user.username,
        avatar: user.avatar,
        location: user.location,
        email: user.email,
        opp_id: '',     
        status: '',
        appliedAt: ''
    };

    const handleApply = (oppId: string) => {
        const applicationWithOpp: ApplicantInformation = {
            ...baseApplication,
            opp_id: oppId,
            status: 'applied',
            appliedAt: new Date().toISOString()
        };

        applyToOpportunity(token, applicationWithOpp);
    };

    return (
        <div className="space-y-4">
            {opportunities.map((opp) => (
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
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{opp.type}</p>

                        <p className="text-sm text-gray-600 mb-4 max-w-2xl line-clamp-1">
                            {Number(opp.id) > 2
                                ? 'Low-commit design task; perfect for building your portfolio.'
                                : "You've attended 3 Nashville meetups—easy weekend IRL win."}
                        </p>
                    </div>

                    <div className="flex flex-row md:flex-col justify-between items-center md:items-end min-w-[140px] border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 gap-4">
                        <div className="space-y-1 text-right hidden md:block">
                            <div className="flex items-center justify-end text-xs font-bold text-gray-800 uppercase">
                                <Clock className="w-3 h-3 mr-1.5 text-gray-400" />
                                {opp.timeCommitment}
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
                                {opp.timeCommitment}
                            </div>
                            <div className="flex items-center text-[10px] font-bold text-gray-800 uppercase">
                                <MapPin className="w-3 h-3 mr-1.5 text-gray-400" />
                                {opp.location}
                            </div>
                        </div>

                        <div className="w-full md:w-auto">
                            <button
                                className="bg-black hover:bg-gray-800 text-white font-bold uppercase text-xs py-2 px-6 tracking-widest transition-colors w-full md:w-auto"
                                onClick={() => handleApply(opp.id)}
                            >
                                Claim
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OpportunityList;
