
import React from 'react';
import { Organization } from '../types';

interface DetailModalProps {
    org: Organization | null;
    onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ org, onClose }) => {
    if (!org) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl p-8 shadow-2xl rounded-sm">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">{org.name}</h2>
                        <div className="h-1 w-20 bg-orange-500"></div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-black">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-6">
                    <p className="text-xl text-gray-700 leading-relaxed italic">
                        "{org.description}"
                    </p>

                    <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-4">
                        {org.website && (
                            <a
                                href={org.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors font-medium text-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                Official Website
                            </a>
                        )}
                    </div>

                    <div className="bg-orange-50 p-6 border-l-4 border-orange-500 mt-8">
                        <p className="text-orange-900 font-medium text-sm uppercase tracking-widest mb-2">Proof of Work</p>
                        <p className="text-orange-800 text-sm">
                            This organization has demonstrated a long-term commitment to the Bitcoin network through technical contributions, educational outreach, or infrastructure support.
                        </p>
                    </div>
                </div>

                <div className="mt-10">
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-900 text-white py-4 font-bold uppercase tracking-widest hover:bg-black transition-colors"
                    >
                        Return to Ledger
                    </button>
                </div>
            </div>
        </div>
    );
};
