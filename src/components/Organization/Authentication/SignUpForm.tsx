import React, { useState } from 'react';
import { Organization } from '../../types';
import { OrgCard } from '../OrgCard';
import { useEffect } from 'react';
import { API_URL } from '@/config';
import {
    Network,
    Plus,
    Search,
    Sparkles,
    Building2,
    Wallet,
    Mail,
    MapPin,
    Upload,
    Info
} from 'lucide-react';
import useAuthStore from '@/hooks/use-auth';
const ORG_TYPES = [
    'Conference / Event',
    'Media / Podcast',
    'Nonprofit / NGO',
    'Company / Startup',
    'Meetup / Local Club',
    'Individual Creator'
];
import { useOrganizationStore } from "@/hooks/use-organization";
import { useNavigate } from 'react-router-dom';
const SignUpForm = () => {
    const [activeTab, setActiveTab] = useState<'create' | 'dashboard'>('dashboard');
    const [orgs] = useState<Organization[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);

    const [selectedOrgType, setSelectedOrgType] = useState('Media / Podcast');
    const { organizations, fetchMyOrganizations, loading } = useOrganizationStore();
    // New form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const nav = useNavigate()
    const token = useAuthStore(state => state.token);
    useEffect(() => {
        if (activeTab === "dashboard" && token) {
            fetchMyOrganizations(token);
            console.log(organizations)
            console.log("running in organization")
            
        }
    }, [activeTab, token]);
    const handleCreateProfile = async () => {


        const body = {
            name,
            email,
            location,
            description,
            type: selectedOrgType
        };

        try {
            const res = await fetch(`${API_URL}/org/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            if (!res.ok) {
                const err = await res.json();
                alert(err.detail || "Failed to create organization");
                return;
            }

            const data = await res.json();
            console.log("Created org:", data);

            // reset form + return to dashboard
            setName('');
            setEmail('');
            setLocation('');
            setDescription('');
            setActiveTab("dashboard");

        } catch (e) {
            console.error(e);
            alert("Something went wrong");
        }
    };

    const filteredOrgs = orgs.filter(org =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 font-sans text-slate-800">
            {/* Mobile Branding */}
            <div className="mb-8 text-center sm:hidden">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-sm mb-4">
                    <span className="text-2xl">₿</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900">SatoshiSync</h1>
            </div>

            {/* Main Card Container */}
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row min-h-[700px] border border-slate-100 transition-all duration-300">

                {/* LEFT PANEL — unchanged */}
                <div className="lg:w-4/12 bg-slate-900 p-8 flex flex-col justify-between relative overflow-hidden text-white">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full opacity-20 blur-3xl -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl -ml-16 -mb-16"></div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-8 border border-white/10">
                            <Network className="w-6 h-6 text-orange-400" />
                        </div>

                        <h2 className="text-3xl font-bold mb-4">
                            {activeTab === 'create' ? 'Join the Network' : 'Your Ecosystem'}
                        </h2>
                        <p className="text-slate-400 leading-relaxed mb-8">
                            {activeTab === 'create'
                                ? 'Create your organization profile to connect with the Bitcoin ecosystem.'
                                : 'Manage your approved organizations and activities.'
                            }
                        </p>

                        {activeTab === 'dashboard' && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="p-2 bg-white/10 rounded-lg">
                                        <Building2 className="w-5 h-5 text-orange-200" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Active Orgs</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:w-8/12 p-6 lg:p-10 bg-white flex flex-col relative overflow-hidden">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                        <h2 className="text-2xl font-bold">
                            {activeTab === 'create' ? 'Organization Details' : 'Your Organizations'}
                        </h2>

                        <div className="bg-slate-100 p-1 rounded-xl inline-flex">
                            <button
                                onClick={() => setActiveTab('create')}
                                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'create'
                                    ? 'bg-white shadow-sm ring-1 ring-slate-200'
                                    : 'text-slate-500'
                                    }`}
                            >
                                Create Profile
                            </button>
                            <button
                                onClick={() => setActiveTab('dashboard')}
                                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'dashboard'
                                    ? 'bg-white shadow-sm ring-1 ring-slate-200 text-orange-600'
                                    : 'text-slate-500'
                                    }`}
                            >
                                My Orgs
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto pr-2 -mr-2">
                        {activeTab === 'create' ? (
                            <div className="flex flex-col lg:flex-row gap-8 pb-4 animate-fade-in">

                                {/* LEFT column — unchanged except state binding */}
                                <div className="lg:w-5/12 flex flex-col gap-8">
                                    <div>
                                        <h3 className="text-xs font-bold text-slate-400 uppercase mb-4">Organization Profile</h3>
                                        <div className="relative group cursor-pointer w-32 h-32 mx-auto lg:mx-0">
                                            <div className="w-full h-full rounded-full bg-slate-50 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
                                                <Upload className="w-6 h-6 mb-2" />
                                                <span className="text-xs font-medium">Upload Logo</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Org Type */}
                                    <div>
                                        <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">Organization Type</h3>
                                        <div className="space-y-2.5">
                                            {ORG_TYPES.map((type) => (
                                                <label
                                                    key={type}
                                                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedOrgType === type
                                                        ? 'border-slate-900 bg-white shadow-sm'
                                                        : 'border-slate-200 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        checked={selectedOrgType === type}
                                                        onChange={() => setSelectedOrgType(type)}
                                                        className="hidden"
                                                    />
                                                    <span className="text-sm font-medium">{type}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT column — updated inputs */}
                                <div className="lg:w-7/12 flex flex-col gap-6">

                                    {/* Organization Name */}
                                    <div>
                                        <label className="block text-xs font-bold mb-2">Organization Name</label>
                                        <div className="relative group">
                                            <input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                type="text"
                                                placeholder="Bitcoin Test"
                                                className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-xs font-bold mb-2">Contact Email</label>
                                        <input
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            placeholder="hello@example.com"
                                            className="w-full pl-4 pr-4 py-3 bg-slate-50 border rounded-xl text-sm"
                                        />
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label className="block text-xs font-bold mb-2">Based In</label>
                                        <input
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            type="text"
                                            placeholder="Charlotte, NC"
                                            className="w-full pl-4 pr-4 py-3 bg-slate-50 border rounded-xl text-sm"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-xs font-bold mb-2">Bio / Description</label>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows={4}
                                            placeholder="Describe your organization's mission..."
                                            className="w-full p-4 bg-slate-50 border rounded-xl text-sm resize-none"
                                        />
                                    </div>
                                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
                                        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="text-sm font-semibold text-blue-900">Verification Required</h4>
                                            <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                                                Your organization must be verified by moderators before the account is active. We will contact you via email to complete the process.
                                            </p>
                                        </div>
                                    </div>
                                    {/* Footer Buttons */}
                                    <div className="flex justify-end gap-4 mt-4 pt-6 border-t">
                                        <button
                                            onClick={() => setActiveTab('dashboard')}
                                            className="text-sm text-slate-500"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            onClick={handleCreateProfile}
                                            className="bg-slate-700 text-white px-8 py-3 rounded-xl font-medium hover:bg-slate-900"
                                        >
                                            Create Profile
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ) : (
                            /* Dashboard unchanged */
                                <div className="flex flex-col h-full animate-fade-in">

                                    {/* Search Bar */}
                                    <div className="relative mb-6">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Search your organizations..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-sm"
                                        />
                                    </div>

                                    {/* Loading */}
                                    {loading && (
                                        <div className="text-center py-8 text-slate-500">Loading your organizations...</div>
                                    )}

                                    {/* No orgs */}
                                    {!loading && organizations.length === 0 && (
                                        <div className="text-center py-8 text-slate-500">
                                            You have no organizations yet.
                                        </div>
                                    )}

                                    {/* Organization List */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 pb-10">
                                        {organizations
                                            .filter(org =>
                                                org.status === "verified" &&
                                                org.name.toLowerCase().includes(searchTerm.toLowerCase())
                                            )
                                            .map(org => (
                                                <div
                                                    key={org.id}
                                                    className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white"
                                                >
                                                    <h3 className="text-lg font-semibold mb-1">{org.name}</h3>
                                                    <p className="text-sm text-slate-500 mb-2">{org.type}</p>

                                                    <div className="text-xs text-slate-400 mb-4">
                                                        Created: {new Date(org.submittedAt).toLocaleDateString()}
                                                    </div>

                                                    <button
                                                        className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm hover:bg-slate-700 transition"
                                                        onClick={() => nav(`/org-page/${org.id}`)}
                                                    >
                                                        View Dashboard
                                                    </button>
                                                </div>
                                            ))}
                                    </div>

                                </div>

                        )}
                    </div>

                </div>
            </div>

        </div>
    );
};

export default SignUpForm;
