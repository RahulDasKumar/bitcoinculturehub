import React, { useEffect } from 'react';
import Hero from './Hero';
import Mission from './Mission';
import SearchBar from './SearchBar';
import SidebarFilters from './SidebarFilters';
import MatchCard from './MatchCard';
import FeaturedBanner from './FeaturedBanner';
import OpportunityList from './OpportunityList';
import OrganizationGrid from './OrganizationGrid';
import FooterCTA from './FooterCTA';
import { useOrganizationStore } from '@/hooks/use-organization';
import Header from '../Header';
const OpportunityEngineBeta: React.FC = () => {
    const {all_opportunities, fetchAllOpportunity,findUserApplicants,user_applications}= useOrganizationStore()
    useEffect(()=>{
        fetchAllOpportunity()
        findUserApplicants()
    }, [])

    return (
        <div className="min-h-screen bg-white">
            <Header/>
            <Hero />
            <Mission />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-20">
                <SearchBar />

                <div className="flex flex-col lg:flex-row gap-8 mt-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <div className="sticky top-24">
                            <SidebarFilters />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">

                        {/* Top Matches Section */}
                        <div className="mb-12">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-xl font-black uppercase tracking-tight">Top Matches</h3>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">Based on your proof-of-work</p>
                                </div>
                                <div className="hidden md:block">
                                    <span className="text-xs font-bold border border-gray-300 px-2 py-1 uppercase">3 Picks</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                {all_opportunities.map(match => (
                                    <MatchCard key={match.id} opportunity={match} applicants={user_applications} />
                                ))}
                            </div>
                        </div>

                        {/* Featured Banner */}
                        <FeaturedBanner />

                        {/* All Opportunities List */}
                        <div className="mb-12">
                            <div className="flex items-center mb-6">
                                <h3 className="text-xl font-black uppercase tracking-tight mr-4">All Opportunities</h3>
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">5 Available</span>
                            </div>

                            <OpportunityList opportunities={all_opportunities}  applicants={user_applications} />
                        </div>

                        {/* Organizations Grid */}
                        <OrganizationGrid />

                        {/* Footer CTA */}
                        <FooterCTA />

                    </div>
                </div>
            </main>

            {/* Simple Footer Text */}
            <footer className="bg-white border-t border-gray-200 py-8 text-center">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                    © 2024 We Serve Builders. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default OpportunityEngineBeta;