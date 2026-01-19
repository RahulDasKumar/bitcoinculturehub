
import React, { useState, useEffect } from 'react';
import { Organization } from '../types';
import { OrgCard } from './OrgCard';
import { SubmitModal } from './SubmitModal';
import { DetailModal } from './DetailModal';
import { useOrganizationStore } from '@/hooks/use-organization';
import Header from '../Header';

const Directory: React.FC = () => {
    const { all_organization,fetchAllOrganizations} = useOrganizationStore()
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(()=>{
            fetchAllOrganizations()
        }, [fetchAllOrganizations])


    const handleAddOrg = (data: Organization) => {
        const newOrg: Partial<Organization> = {
            id: Math.random().toString(36).substr(2, 9),
            name: data.name,
            description: data.description,
            type: data.type,
            email: data.email
        };
        // setOrgs(prev => [newOrg, ...prev]);
        setIsSubmitModalOpen(false);
    };

    const filteredOrgs = all_organization.filter(org =>
        org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white text-gray-900 selection:bg-orange-100">
            {/* Top Banner */}
            <Header/>
            <div className="h-1 w-full bg-gradient-to-r from-orange-400 via-orange-600 to-orange-400"></div>

            <main className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
                {/* Header Section */}
                <div className="mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                        Organizations Building Bitcoin
                    </h1>
                    <div className="space-y-1">
                        <p className="text-gray-500 text-lg leading-relaxed">
                            A living ledger of institutions that have shipped, funded, taught, defended, or supported Bitcoin.
                        </p>
                        <p className="text-gray-400 italic text-sm font-medium">
                            Hiring is optional. Proof-of-work is not.
                        </p>
                    </div>
                </div>

                {/* CTA and Search */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-16">
                    <button
                        onClick={() => setIsSubmitModalOpen(true)}
                        className="bg-black text-white px-8 py-3.5 font-bold uppercase text-xs tracking-[0.2em] shadow-lg hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Submit an Organization
                    </button>

                    <div className="relative w-full sm:w-64 group">
                        <input
                            type="text"
                            placeholder="Search builders..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-sm text-sm focus:outline-none focus:bg-white focus:border-gray-900 transition-all"
                        />
                        <svg className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* List Header */}
                <div className="border-b-2 border-gray-900 pb-2 mb-4">
                    <p className="text-sm font-bold uppercase tracking-widest text-gray-900">
                        {filteredOrgs.length} {filteredOrgs.length === 1 ? 'organization' : 'organizations'}
                    </p>
                </div>

                {/* Results List */}
                <div className="divide-y divide-gray-50">
                    {filteredOrgs.length > 0 ? (
                        filteredOrgs.map((org) => (
                            <OrgCard
                                key={org.id}
                                org={org}
                                onView={setSelectedOrg}
                            />
                        ))
                    ) : (
                        <div className="py-20 text-center">
                            <p className="text-gray-400 italic">No organizations found matching your criteria.</p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-4 text-sm font-bold underline"
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <footer className="mt-32 pt-12 border-t border-gray-100 text-center">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em]">
                        Decentralized & Verified
                    </p>
                    <p className="mt-2 text-gray-300 text-[10px] uppercase tracking-tighter">
                        Est. 2009 • Built with Code & Conviction
                    </p>
                </footer>
            </main>

            {/* Modals */}
            <SubmitModal
                isOpen={isSubmitModalOpen}
                onClose={() => setIsSubmitModalOpen(false)}
                onSubmit={handleAddOrg}
            />

            <DetailModal
                org={selectedOrg}
                onClose={() => setSelectedOrg(null)}
            />
        </div>
    );
};

export default Directory;
