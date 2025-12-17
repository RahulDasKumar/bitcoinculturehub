import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "@/hooks/use-auth";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Plus, TrendingUp, Bookmark, Users, CheckCircle2, BarChart3, Edit } from "lucide-react";
import Header from "../Header";
import { AddOpportunityModal } from "./AddOpportunityModal";
import { EditOrganizationModal } from "./EditOrganizationModal";
import { useOrganizationStore } from "@/hooks/use-organization";
import { Organization } from "../types";
import { ArrowLeftIcon } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { EditOpportunityModal } from "./EditOpportunityModal";
import { ViewApplicantsModal } from "./ViewOpportunityModal";

export default function OrganizationDashboard() {
    const { orgId } = useParams<{ orgId: string }>();
    const token = useAuthStore((s) => s.token);
    const [organization, setOrganization] = useState<Organization>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { opportunities, fetchOrganizationsOpportunity } = useOrganizationStore();
    const navigate = useNavigate();
    useEffect(() => {
        if (!orgId || !token) return;

        const fetchOrg = async () => {
            setLoading(true);
            const res = await fetch(`http://127.0.0.1:8000/org/${orgId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setOrganization(data);

            } else {
                setOrganization(null);
            }
            setLoading(false);
        };

        fetchOrg();
        fetchOrganizationsOpportunity(orgId)
        console.log(opportunities)
    }, [orgId, token]);


    if (!organization) return <p className="text-muted-foreground">Organization not found</p>;
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 pt-24 pb-16">
                <Button onClick={()=>navigate(-1)}>
                    <ArrowLeftIcon />
                </Button>
            
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">{organization.name} Dashboard</h2>
                        <p className="text-muted-foreground">Manage opportunities & track performance</p>
                    </div>
                    <div className="flex items-center space-between">
                        <AddOpportunityModal opportunityTitle={organization.name} opportunityType={organization.type} opportunityDescription={organization.description} org_id={orgId}/>
                    <EditOrganizationModal organization={undefined}/>
                    </div>
                </div>

                {/* Example Insights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <Card className="p-6">
                        <Eye className="w-5 h-5 text-primary" />
                        <div className="text-3xl font-bold">{organization.totalViews || 0}</div>
                        <div className="text-sm text-muted-foreground">Total Views</div>
                    </Card>

                    <Card className="p-6">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        <div className="text-3xl font-bold">{organization.activeListings || 0}</div>
                        <div className="text-sm text-muted-foreground">Active Listings</div>
                    </Card>

                    <Card className="p-6">
                        <Bookmark className="w-5 h-5 text-primary" />
                        <div className="text-3xl font-bold">{organization.saves || 0}</div>
                        <div className="text-sm text-muted-foreground">Saves</div>
                    </Card>

                    <Card className="p-6">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <div className="text-3xl font-bold">{organization.completed || 0}</div>
                        <div className="text-sm text-muted-foreground">Completed</div>
                    </Card>
                </div>

                {/* Opportunities Placeholder */}
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" /> Opportunities
                </h3>
                <div className="space-y-4">
                    {opportunities?.map((opportunity: any) => (
                        <Card key={opportunity.id} className="p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <h3 className="font-bold text-lg">{opportunity.title}</h3>
                                        <Badge variant="secondary">{opportunity.type}</Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-6 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Eye className="w-4 h-4 text-muted-foreground" />
                                            <span className="font-semibold">{0}</span> views
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Bookmark className="w-4 h-4 text-muted-foreground" />
                                            <span className="font-semibold">{0}</span> saves
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-muted-foreground" />
                                            <span className="font-semibold">{0}</span> claims
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-success" />
                                            <span className="font-semibold text-success">{0}</span> completed
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <EditOpportunityModal org_id={orgId} opp_id={opportunity.id} opportunityTitle={opportunity.title}
                                        opportunityType={opportunity.type}  
                                        opportunityDescription={opportunity.description} location={opportunity.location}/>
                                    <ViewApplicantsModal opportunityTitle={opportunity.title} opp_id={opportunity.id} org_id={orgId}></ViewApplicantsModal>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
