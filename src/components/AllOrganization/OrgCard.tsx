
import React from 'react';
import { Organization } from '../types';
import { useNavigate } from 'react-router-dom';
interface OrgCardProps {
    org: Partial<Organization>;
    onView: (org: Organization) => void;
}

export const OrgCard: React.FC<OrgCardProps> = ({ org, onView }) => {

    const nav = useNavigate()
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-8 border-b border-gray-100 group transition-all duration-200">
            <div className="flex-1 pr-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{org.name}</h3>
                <p className="text-gray-500 italic text-sm sm:text-base font-normal">
                    {org.description}
                </p>
            </div>
            <div className="mt-4 sm:mt-0">
                <button
                    onClick={() => nav(`/org-page/${org.id}`)}
                    className="px-6 py-2 border-2 border-gray-900 text-xs font-bold uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-colors duration-200"
                >
                    View Org
                </button>
            </div>
        </div>
    );
};
