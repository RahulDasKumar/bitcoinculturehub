import React, { useEffect, useState } from 'react';
import Hero from './Hero';
import Mission from './Mission';
import SearchBar from './SearchBar';
import SidebarFilters, { ActiveFilters } from './SidebarFilters';
import MatchCard from '../OpportunityComponents/MatchCard';
import FeaturedBanner from './FeaturedBanner';
import OpportunityList from './OpportunityList';
import OrganizationGrid from './OrganizationGrid';
import FooterCTA from './FooterCTA';
import { useOrganizationStore } from '@/hooks/use-organization';
import Header from '../Header';
import { opportunities } from '../Forum/mockData';

const OpportunityEngineBeta: React.FC = () => {
    const { all_opportunities, fetchAllOpportunity, findUserApplicants, user_applications } = useOrganizationStore();

    useEffect(() => {
        fetchAllOpportunity();
        findUserApplicants();
    }, []);

    console.log(opportunities);
    console.log(user_applications, ' user applications');

    // ── Filter State ─────────────────────────────────────────────────────────────
    // Each array holds the tags the user has selected for that category.
    // An empty array means "no filter applied" (show everything).
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
        opportunityType: [],
        location: [],
        timeCommitment: [],
    });

    // Toggles a single tag on/off within a given filter category.
    // If the tag is already selected, it removes it. Otherwise it adds it.
    const toggleFilter = (category: keyof ActiveFilters, value: string) => {
        setActiveFilters((prev) => {
            const current = prev[category];
            const updated = current.includes(value)
                ? current.filter((v) => v !== value) // deselect
                : [...current, value];               // select
            return { ...prev, [category]: updated };
        });
    };

    // Resets all filters back to their empty/default state
    const clearFilters = () => {
        setActiveFilters({ opportunityType: [], location: [], timeCommitment: [] });
    };

    // ── Filtering Logic ───────────────────────────────────────────────────────────
    // Rules:
    //   - Within a category: OR  (opportunity matches ANY selected tag)
    //   - Across categories: AND (opportunity must pass ALL active category filters)
    //   - Empty category    → no restriction (show all for that field)
    const filteredOpportunities = all_opportunities.filter((opp) => {
        // Opportunity Type — matches opp.type
        if (activeFilters.opportunityType.length > 0) {
            const match = activeFilters.opportunityType.some(
                (tag) => opp.type?.toUpperCase() === tag
            );
            if (!match) return false;
        }

        // Location — matches opp.location.type (e.g. "REMOTE", "IN-PERSON", "HYBRID")
        if (activeFilters.location.length > 0) {
            const match = activeFilters.location.some(
                (tag) => opp.location?.type?.toUpperCase() === tag
            );
            if (!match) return false;
        }

        // Time Commitment — matches opp.time_commitment (e.g. "FULL TIME", "1-5HRS")
        if (activeFilters.timeCommitment.length > 0) {
            const match = activeFilters.timeCommitment.some(
                (tag) => opp.time_commitment?.toUpperCase() === tag
            );
            if (!match) return false;
        }

        return true;
    });

    // Top 3 matches still comes from the filtered set so they stay in sync
    const matched_opportunities = filteredOpportunities.slice(0, 3);
    const numberOfOpportunities = filteredOpportunities.length;

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <Hero />
            <Mission />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-20 mt-3">
                {/* <SearchBar /> */}

                <div className="flex flex-col lg:flex-row gap-8 mt-8">
                    {/* Sidebar — receives filter state and callbacks */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <div className="sticky top-24">
                            <SidebarFilters
                                activeFilters={activeFilters}
                                onToggleFilter={toggleFilter}
                                onClearFilters={clearFilters}
                            />
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
                                {matched_opportunities.map(match => (
                                    <MatchCard key={match.id} opportunity={match} applicants={user_applications} />
                                ))}
                            </div>
                        </div>

                        {/* Featured Banner */}
                        <FeaturedBanner />

                        {/* All Opportunities List — filtered results */}
                        <div className="mb-12">
                            <div className="flex items-center mb-6">
                                <h3 className="text-xl font-black uppercase tracking-tight mr-4">All Opportunities</h3>
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">{numberOfOpportunities} Available</span>
                            </div>

                            <OpportunityList opportunities={filteredOpportunities} applicants={user_applications} />
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
