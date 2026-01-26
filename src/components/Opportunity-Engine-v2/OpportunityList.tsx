import { Opportunity, ApplicantInformation } from '../types';
import { Clock, MapPin } from 'lucide-react';
import { useOrganizationStore } from '@/hooks/use-organization';
import useAuthStore from '@/hooks/use-auth';
import { useNavigate, useParams } from 'react-router-dom';
import OpportunityModal from './OpportunityModal'; // import the new modal
import OpportunityCard from '../OpportunityComponents/OpportunityCard';

interface ListProps {
    opportunities: Opportunity[];
    applicants: ApplicantInformation[];
}

const OpportunityList = ({ opportunities, applicants }: ListProps) => {
    const { applyToOpportunity } = useOrganizationStore();
    const { token, user, isLoggedIn } = useAuthStore();
    
    const navigate = useNavigate();
    const { id: activeOppId } = useParams();
    const selectedOpp = opportunities.find((o) => String(o.id) === activeOppId);

    const appliedOpportunityIds = new Set(
        applicants.map((app) => String(app.opportunity_id))
    );

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
            <div id="opportunity-list" className="space-y-4">
                {opportunities.map((opp) => {
                    const hasApplied = appliedOpportunityIds.has(String(opp.id));

                    return (
                        <OpportunityCard
                            key={opp.id}
                            opportunity={opp}
                            hasApplied={hasApplied}
                        />
                    );
                })}
                <OpportunityModal opportunity={selectedOpp || null} />
            </div>
    );
};

export default OpportunityList;
