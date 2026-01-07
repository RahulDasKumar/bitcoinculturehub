import React, { useEffect, useState } from 'react';
import OrgHeader from './Header';
import Header from '../Header';
import HeroActions from './HeroActions';
import InvolvementQuickActions from './InvolvementQuickActions';
import ProgramsGrid from './ProgramsGrid';
import Sidebar from './Sidebar';
import AboutSection from './AboutSection';
import TimelineSection from './TimelineSection';
import { useOrganizationStore } from '@/hooks/use-organization';
import { useParams } from 'react-router-dom';
import useAuthStore from '@/hooks/use-auth';

const OrganizationPage: React.FC = () => {
    const { orgId } = useParams<{ orgId: string }>();
    const {
        fetchOrganizationsOpportunity,
        opportunities,
        findUserApplicants,
        user_applications,
        currentOrganization,
        fetchGeneralDashboard,
        fetchOrganizationDashboard
    } = useOrganizationStore();
    const { token, user, isLoggedIn } = useAuthStore();

    useEffect(() => {
        if (!orgId) return;

        fetchOrganizationsOpportunity(orgId);
        fetchGeneralDashboard(orgId);
        findUserApplicants();
    }, [orgId]);

    if (!currentOrganization) return <div>Loading organization...</div>;

    console.log(currentOrganization);

    return (
        <div className="min-h-screen bg-white">
            {/* Container to center content */}
            <Header />
            <div className="max-w-[1200px] mx-auto px-6 py-12">
                <OrgHeader org_title={currentOrganization.name} />

                {/* Buttons and Description */}
                <div className="mt-8">
                    <p className="text-[#6b7280] text-xl max-w-2xl leading-relaxed">
                        The global network connecting students to Bitcoin education, builders, and opportunity.
                    </p>
                    <HeroActions organization={currentOrganization} />
                </div>

                {/* Social Links */}
                <div className="flex gap-6 mt-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    <button className="flex items-center gap-2 hover:text-black transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Follow
                    </button>
                    <button className="flex items-center gap-2 hover:text-black transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Share
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="mt-20 flex flex-col lg:flex-row gap-12">
                    {/* Left Column (Main Content) */}
                    <div className="flex-1 space-y-24">
                        <InvolvementQuickActions />

                        <section id="get-involved">
                            <div className="mb-8">
                                <h2 className="text-3xl font-extrabold text-black mb-2">Get Involved</h2>
                                <p className="text-gray-500">Find your place in the network — learn, contribute, or lead.</p>
                            </div>
                            <ProgramsGrid opportunities={opportunities} user_applications={user_applications} />
                        </section>

                        <AboutSection />
                        <TimelineSection />
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="w-full lg:w-80 shrink-0">
                        <Sidebar />
                    </div>
                </div>
            </div>

            {/* Sticky footer visual artifact helper */}
            <footer className="h-20 border-t border-gray-100 flex items-center justify-center mt-20">
                <p className="text-sm text-gray-400">© 2025 Bitcoin Students Network. Built for Builders.</p>
            </footer>
        </div>
    );
};

export default OrganizationPage;
