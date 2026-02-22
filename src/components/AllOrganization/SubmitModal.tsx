
import React, { useState } from 'react';
import { Organization } from '../types';

interface SubmitModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<Organization>) => void;
}

const ORG_TYPES = [
    'Conference / Event',
    'Media / Podcast',
    'Nonprofit / NGO',
    'Company / Startup',
    'Meetup / Local Club',
    'Individual Creator'
];

export const SubmitModal: React.FC<SubmitModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [selectedType, setSelectedType] = useState(null);
    const [location, setLocation] = useState('');
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !description || !selectedType || !email) return;
        onSubmit({
            name,
            description,
            type: selectedType,
            email,
            location
        });
        // Reset form
        setName('');
        setEmail('');
        setDescription('');
        setLocation('')
        setSelectedType(null);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-3xl overflow-hidden shadow-2xl rounded-sm animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex justify-between items-center p-8 pb-4">
                    <h2 className="text-xl font-bold text-gray-900">Submit an Organization</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="px-8 py-2 grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Left Column: Organization Type */}
                        <div className="space-y-4">
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                                Organization Type
                            </label>
                            <div className="space-y-2">
                                {ORG_TYPES.map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setSelectedType(type)}
                                        className={`w-full text-left px-5 py-3 rounded-full text-sm border transition-all duration-200 ${selectedType === type
                                                ? 'border-gray-900 bg-gray-900 text-white shadow-md'
                                                : 'border-gray-100 bg-white text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Details */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Organization Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-sm focus:bg-white focus:border-gray-400 outline-none transition-all text-sm placeholder:text-gray-300"
                                    placeholder="Bitcoin Test"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Organization Location</label>
                                <input
                                    type="text"
                                    required
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-sm focus:bg-white focus:border-gray-400 outline-none transition-all text-sm placeholder:text-gray-300"
                                    placeholder="New York City, NY"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Contact Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-sm focus:bg-white focus:border-gray-400 outline-none transition-all text-sm placeholder:text-gray-300"
                                    placeholder="hello@example.com"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Bio</label>
                                <textarea
                                    required
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-sm focus:bg-white focus:border-gray-400 outline-none transition-all h-32 text-sm resize-none placeholder:text-gray-300"
                                    placeholder="Describe your organization in < 50 characters"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 border-t border-gray-100 p-8 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-8 py-2.5 border border-gray-900 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!selectedType || !name || !email || !description || !location}
                            className="px-8 py-2.5 bg-black text-white text-[11px] font-bold uppercase tracking-widest border-2 border-transparent hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed ring-offset-2 ring-orange-500 focus:ring-2"
                            style={{ border: '2px solid transparent', boxShadow: '0 0 0 2px black, 0 0 0 4px #f97316' }}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
