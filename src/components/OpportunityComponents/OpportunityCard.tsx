import useAuthStore from '@/hooks/use-auth';
import { ApplicantInformation, Opportunity } from '../types';
import { useNavigate } from 'react-router-dom';
import { useOrganizationStore } from '@/hooks/use-organization';
interface OpportunityCardProps {
    opportunity: Opportunity;
    hasApplied: boolean;
}

const OpportunityCard = ({
    opportunity,
    hasApplied,
}: OpportunityCardProps) => {
    const { token, user, isLoggedIn } = useAuthStore();
    const {applyToOpportunity} = useOrganizationStore();
    const navigate = useNavigate();
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
        if (!baseApplication) return;
        applyToOpportunity(token, {
            ...baseApplication,
            opportunity_id: oppId,
            status: 'applied',
            org_id: orgId,
            appliedAt: new Date().toISOString()
        });
    };

    return (
        <div
            onClick={() => navigate(`/opportunity/${opportunity.id}`)}
            className="border border-gray-200 p-5 bg-white hover:border-black transition-colors group flex flex-col md:flex-row gap-6 cursor-pointer"
        >
            {/* Card content */}
            <div className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-black text-white text-[10px] font-bold uppercase px-1.5 py-0.5 tracking-wider">
                        {opportunity.type}
                    </span>
                </div>

                <h3 className="text-xl font-black uppercase leading-none mb-1 group-hover:text-[#FF6B00] transition-colors">
                    {opportunity.title}
                </h3>

                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    {opportunity.org_name}
                </p>

                <p className="text-sm text-gray-600 mb-4 max-w-2xl line-clamp-1">
                    {opportunity.description}
                </p>

                <div className="flex flex-wrap gap-3">
                    {opportunity.categories.map((tag) => (
                        <span
                            key={tag}
                            className="bg-gray-100 text-gray-600 text-[10px] font-bold uppercase px-2 py-1"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Claim button */}
            <div className="flex flex-row md:flex-col justify-between items-center md:items-end min-w-[140px] border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 gap-4">
                <button
                    disabled={hasApplied || !isLoggedIn}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!hasApplied && isLoggedIn) {
                            handleApply(opportunity.id, opportunity.org_id);
                        }
                    }}
                    className={`font-bold uppercase text-xs py-2 px-6 tracking-widest transition-colors w-full md:w-auto
                        ${hasApplied || !isLoggedIn
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-black hover:bg-gray-800 text-white'
                        }`}
                >
                    {hasApplied ? 'Applied' : !isLoggedIn ? 'Login to Claim' : 'Claim'}
                </button>
            </div>
        </div>
    );
};

export default OpportunityCard;
