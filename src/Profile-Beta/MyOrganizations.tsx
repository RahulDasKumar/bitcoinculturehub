import React, { useState, useEffect } from 'react';
import { Organization } from '../components/types';

import { useOrganizationStore } from '@/hooks/use-organization';
import SectionHeader from './ui/SectionHeader';
import { Hammer, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const MyOrganization: React.FC = () => {
    const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
    const nav = useNavigate()
    const {
        organizations,
        fetchMyOrganizations,
        ownedOrganizations,
        fetchOwnedOrganization,
    } = useOrganizationStore();

    useEffect(() => {
        fetchMyOrganizations();
        fetchOwnedOrganization();
    }, [fetchMyOrganizations, fetchOwnedOrganization]);

    return (
        <div className="space-y-16">
            <SectionHeader
                icon={Hammer}
                title="Organizations I am apart of"
                subtitle="Heres how I am apart of the community"
            />

            {/* ORGANIZATIONS I AM APART OF */}
            <section>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {organizations.length === 0 ? (
                        <button
                            disabled
                            className="
                aspect-square
                border-2 border-dashed border-gray-300
                flex flex-col items-center justify-center
                text-gray-400
                cursor-not-allowed
              "
                        >
                            <Plus className="w-6 h-6 mb-2" />
                            <span className="text-[10px] uppercase tracking-widest">
                                No organizations
                            </span>
                        </button>
                    ) : (
                        organizations.map((org) => {
                            const isDeleted = org.deleted_at !== null;
                            const isSelected = selectedOrgId === org.id;

                            return (
                                <button
                                    key={org.id}
                                    onClick={() => {
                                        nav(`/org-page/${org.id}`)
                                    }}
                                    className={`
                    aspect-square border flex flex-col items-center justify-center p-6 transition-all
                    ${isSelected
                                            ? 'border-black bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                                            : 'border-gray-100 bg-white hover:border-gray-200'
                                        }
                    ${isDeleted
                                        ? 'opacity-40 cursor-not-allowed bg-gray-100'
                                            : 'cursor-pointer'
                                        }
                  `}
                                >
                                    <div className="w-14 h-14 mb-4 flex items-center justify-center text-xl font-black bg-black text-white">
                                        {org.name.charAt(0)}
                                    </div>

                                    <span className="text-[10px] font-black uppercase text-center">
                                        {org.name}
                                    </span>

                                    {isDeleted && (
                                        <span className="mt-2 text-[9px] uppercase tracking-widest text-gray-500">
                                            Deleted
                                        </span>
                                    )}
                                </button>
                            );
                        })
                    )}
                </div>
            </section>

            <SectionHeader
                icon={Hammer}
                title="Organizations I own"
                subtitle="Heres how I influence the community"
            />

            {/* ORGANIZATIONS I OWN */}
            <section>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
                    {ownedOrganizations.length === 0 ? (
                        <button
                            disabled
                            className="
                aspect-square
                border-2 border-dashed border-gray-300
                flex flex-col items-center justify-center
                text-gray-400
                cursor-not-allowed
              "
                        >
                            <Plus className="w-6 h-6 mb-2" />
                            <span className="text-[10px] uppercase tracking-widest">
                                No organizations
                            </span>
                        </button>
                    ) : (
                        ownedOrganizations.map((org) => {
                            const isDeleted = org.deleted_at !== null;
                            const isSelected = selectedOrgId === org.id;

                            return (
                                <button
                                    key={org.id}
                                    onClick={() => {
                                        nav(`/org-dash/${org.id}`)
                                    }}
                                    className={`
                    aspect-square border flex flex-col items-center justify-center p-6 transition-all
                    ${isSelected
                                            ? 'border-black bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                                            : 'border-gray-100 bg-white hover:border-gray-200'
                                        }
                    ${isDeleted
                                            ? 'opacity-40 bg-gray-100 cursor-pointer'
                                            : 'cursor-pointer'
                                        }
                  `}
                                >
                                    <div className="w-14 h-14 mb-4 flex items-center justify-center text-xl font-black bg-black text-white">
                                        {org.name.charAt(0)}
                                    </div>

                                    <span className="text-[10px] font-black uppercase text-center">
                                        {org.name}
                                    </span>

                                    {isDeleted && (
                                        <span className="mt-2 text-[9px] uppercase tracking-widest text-gray-500">
                                            Deleted
                                        </span>
                                    )}
                                </button>
                            );
                        })
                    )}
                </div>
            </section>
        </div>
    );
};

export default MyOrganization;
