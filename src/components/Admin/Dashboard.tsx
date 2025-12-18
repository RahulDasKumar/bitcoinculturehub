import React, { useState } from 'react';
import { Organization, ArtPiece, VerificationStatus, OrganizationType } from '../types';
import { Button } from './ui/Button';
import Header from '../Header';

// Mock Data
const MOCK_ORGS: Organization[] = [
    {
        id: '1',
        name: 'Bitcoin Austin',
        type: OrganizationType.MEETUP,
        location: 'Austin, TX',
        email: 'organizer@bitcoinaustin.com',
        status: 'pending',
        submittedAt: '2023-10-24',
        description: "The premier Bitcoin meetup in Central Texas. We host monthly pleb miners, devs, and casual socials. Focused on education and adoption.",
        website: "bitcoinaustin.com",
        members: [
            { id: 'm1', name: 'Justin R.', role: 'Lead Organizer' },
            { id: 'm2', name: 'Elena K.', role: 'Events Co-chair' },
            { id: 'm3', name: 'Mike D.', role: 'Treasurer' }
        ],
        opportunities: [
            { id: 'o1', title: 'Guest Speaker - Lightning Dev', type: 'Collaboration', description: 'Looking for a technical speaker for our November deep dive on LDK.' },
            { id: 'o2', title: 'Venue Sponsor', type: 'Grant', description: 'Seeking a local venue to host 100+ attendees for our holiday party.' }
        ],
        owner: { id: 'm1', name: 'Justin R.', role: 'Lead Organizer' }
    },
    {
        id: '2',
        name: 'Satoshi Studios',
        type: OrganizationType.MEDIA,
        location: 'Remote',
        email: 'contact@satoshi.studio',
        status: 'verified',
        submittedAt: '2023-10-20',
        description: "A creative studio dedicated to producing high-quality documentaries and short films about the Bitcoin revolution.",
        website: "satoshi.studio",
        members: [
            { id: 'm4', name: 'Ria S.', role: 'Producer' },
            { id: 'm5', name: 'Ken T.', role: 'Video Editor' }
        ],
        opportunities: [
            { id: 'o3', title: 'Sound Engineer', type: 'Job', description: 'Contract role for mixing and mastering our upcoming podcast series.' }
        ],
        owner: { id: 'm1', name: 'Justin R.', role: 'Lead Organizer' }
    },
    {
        id: '3',
        name: 'Chain Reaction Conf',
        type: OrganizationType.CONFERENCE,
        location: 'Miami, FL',
        email: 'hello@chainreaction.com',
        status: 'pending',
        submittedAt: '2023-10-25',
        description: "Annual institutional digital asset summit connecting traditional finance with the new economy.",
        website: "chainreaction.com",
        members: [
            { id: 'm6', name: 'Sarah L.', role: 'Director' },
            { id: 'm7', name: 'David W.', role: 'Ops Lead' }
        ],
        opportunities: [
            { id: 'o4', title: 'Volunteers Needed', type: 'Volunteer', description: 'Help with registration and wayfinding during the 3-day event.' },
            { id: 'o5', title: 'Media Partners', type: 'Collaboration', description: 'Open to cross-promotion with major crypto news outlets.' }
        ],
        owner: { id: 'm1', name: 'Justin R.', role: 'Lead Organizer' }
    }
];

const MOCK_ART: ArtPiece[] = [
    {
        id: 'a1',
        title: 'Digital Gold Rush',
        artist: 'NakamotoDesigns',
        imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=1000',
        priceBTC: 0.05,
        status: 'pending',
        submittedAt: '2023-10-24'
    },
    {
        id: 'a2',
        title: 'Genesis Block Abstract',
        artist: 'CryptoArtist_X',
        imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1000',
        priceBTC: 0.12,
        status: 'pending',
        submittedAt: '2023-10-23'
    }
];

// Icons
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
const BuildingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M8 10h.01" /><path d="M16 10h.01" /><path d="M8 14h.01" /><path d="M16 14h.01" /></svg>;
const ImageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>;
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>;
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>;

export const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'orgs' | 'art'>('orgs');
    const [organizations, setOrganizations] = useState<Organization[]>(MOCK_ORGS);
    const [artPieces, setArtPieces] = useState<ArtPiece[]>(MOCK_ART);
    const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

    const handleOrgVerification = (id: string, newStatus: VerificationStatus) => {
        setOrganizations(prev => prev.map(org =>
            org.id === id ? { ...org, status: newStatus } : org
        ));
        if (selectedOrg && selectedOrg.id === id) {
            setSelectedOrg(prev => prev ? { ...prev, status: newStatus } : null);
        }
    };

    const handleArtVerification = (id: string, newStatus: VerificationStatus) => {
        setArtPieces(prev => prev.map(art =>
            art.id === id ? { ...art, status: newStatus } : art
        ));
    };

    const StatusBadge = ({ status }: { status: VerificationStatus }) => {
        const styles = {
            pending: "bg-amber-50 text-amber-700 border-amber-200",
            verified: "bg-green-50 text-green-700 border-green-200",
            rejected: "bg-red-50 text-red-700 border-red-200"
        };

        return (
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status]}`}>
                {status}
            </span>
        );
    };

    return <>
    <Header></Header>
        <main className="w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden transition-all duration-500 ease-in-out max-w-[95%] h-[85vh]  items-center m-auto">
            <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">

                {/* Admin Header */}
                <div className="bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between shrink-0">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Admin Dashboard</h2>
                        <p className="text-slate-500 text-sm">Manage verification requests</p>
                    </div>
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab('orgs')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'orgs' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                        >
                            <BuildingIcon />
                            Organizations
                            {organizations.filter(o => o.status === 'pending').length > 0 && (
                                <span className="ml-1 w-2 h-2 rounded-full bg-[#F7931A]"></span>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('art')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'art' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                        >
                            <ImageIcon />
                            Art Pieces
                            {artPieces.filter(a => a.status === 'pending').length > 0 && (
                                <span className="ml-1 w-2 h-2 rounded-full bg-[#F7931A]"></span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-8 overflow-y-auto flex-1">

                    {/* Organizations List */}
                    {activeTab === 'orgs' && (
                        <div className="space-y-4 animate-fade-in">
                            {organizations.map((org) => (
                                <div
                                    key={org.id}
                                    onClick={() => setSelectedOrg(org)}
                                    className="bg-white rounded-xl border border-slate-200 p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-lg group-hover:bg-slate-200 transition-colors">
                                            {org.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 group-hover:text-[#F7931A] transition-colors">{org.name}</h3>
                                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                                <span>{org.type}</span>
                                                <span>•</span>
                                                <span>{org.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <StatusBadge status={org.status} />
                                        <div className="text-slate-300">
                                            <ChevronRightIcon />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {organizations.length === 0 && (
                                <div className="text-center py-12 text-slate-400">No organizations found.</div>
                            )}
                        </div>
                    )}

                    {/* Art Pieces List */}
                    {activeTab === 'art' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                            {artPieces.map((art) => (
                                <div key={art.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                                    <div className="h-48 w-full bg-slate-100 relative">
                                        <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover" />
                                        <div className="absolute top-3 right-3">
                                            <StatusBadge status={art.status} />
                                        </div>
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-semibold text-slate-900">{art.title}</h3>
                                            <p className="text-sm text-slate-500">by {art.artist}</p>
                                            <p className="text-xs font-mono text-[#F7931A] mt-2 font-medium">{art.priceBTC} BTC</p>
                                        </div>

                                        {art.status === 'pending' && (
                                            <div className="flex gap-3 mt-6">
                                                <Button
                                                    variant="outline"
                                                    className="flex-1 py-2 text-xs border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                                                    onClick={() => handleArtVerification(art.id, 'rejected')}
                                                >
                                                    Reject
                                                </Button>
                                                <Button
                                                    className="flex-1 py-2 text-xs bg-green-600 hover:bg-green-700"
                                                    onClick={() => handleArtVerification(art.id, 'verified')}
                                                >
                                                    Verify
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {artPieces.length === 0 && (
                                <div className="col-span-2 text-center py-12 text-slate-400">No art pieces submitted.</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Organization Detail Sidebar Overlay */}
                {selectedOrg && (
                    <div className="absolute inset-0 z-50 flex justify-end">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px] transition-opacity duration-300"
                            onClick={() => setSelectedOrg(null)}
                        />

                        {/* Slide-over Panel */}
                        <div className="relative w-full max-w-md bg-white shadow-2xl h-full overflow-y-auto flex flex-col animate-in slide-in-from-right duration-300 border-l border-slate-200 overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedOrg(null)}
                                className="absolute top-4 right-4 p-2 bg-white rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10 border border-slate-100 shadow-sm"
                            >
                                <XIcon />
                            </button>

                            <div className="px-8 pt-12 pb-8 border-b border-slate-100 bg-slate-50/50">
                                <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-3xl font-bold text-slate-300 mb-6">
                                    {selectedOrg.name.charAt(0)}
                                </div>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 leading-tight">{selectedOrg.name}</h2>
                                        <p className="text-slate-500 font-medium mt-1">{selectedOrg.type}</p>
                                    </div>
                                    <StatusBadge status={selectedOrg.status} />
                                </div>
                            </div>

                            {/* Content Sections */}
                            <div className="p-8 space-y-8 flex-1">

                                {/* About Section */}
                                <section>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">About</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                        {selectedOrg.description || "No description provided."}
                                    </p>
                                    <div className="flex flex-col gap-2 text-sm text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <GlobeIcon />
                                            <span className="hover:underline cursor-pointer text-slate-700">{selectedOrg.website || "No website"}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                            <span>{selectedOrg.location}</span>
                                        </div>
                                    </div>
                                </section>

                                {/* Team Members Section */}
                                <section>
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Team Members</h4>
                                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                            {selectedOrg.members.length}
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        {selectedOrg.members.map(member => (
                                            <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                                                    {member.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                                                    <p className="text-xs text-slate-500">{member.role}</p>
                                                </div>
                                            </div>
                                        ))}
                                        {selectedOrg.members.length === 0 && <p className="text-sm text-slate-400 italic">No members listed.</p>}
                                    </div>
                                </section>

                                {/* Opportunities Section */}
                                <section>
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Opportunities</h4>
                                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                            {selectedOrg.opportunities.length}
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        {selectedOrg.opportunities.map(opp => (
                                            <div key={opp.id} className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 hover:bg-white hover:shadow-sm hover:border-slate-200 transition-all">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h5 className="font-semibold text-slate-900 text-sm">{opp.title}</h5>
                                                    <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{opp.type}</span>
                                                </div>
                                                <p className="text-xs text-slate-500 leading-normal">{opp.description}</p>
                                            </div>
                                        ))}
                                        {selectedOrg.opportunities.length === 0 && <p className="text-sm text-slate-400 italic">No open opportunities.</p>}
                                    </div>
                                </section>
                            </div>

                            {/* Footer Actions */}
                            <div className="p-8 border-t border-slate-100 bg-slate-50 sticky bottom-0">
                                <div className="flex gap-4">
                                    <Button
                                        variant="outline"
                                        className="flex-1 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                                        onClick={() => {
                                            handleOrgVerification(selectedOrg.id, 'rejected');
                                            // Keep sidebar open to show status change or close it? Let's keep it open.
                                        }}
                                    >
                                        Reject
                                    </Button>
                                    <Button
                                        className="flex-1 bg-green-600 hover:bg-green-700"
                                        onClick={() => handleOrgVerification(selectedOrg.id, 'verified')}
                                    >
                                        Verify Organization
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </main>
    </>
};