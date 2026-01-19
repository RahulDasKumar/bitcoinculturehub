import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useOrganizationStore } from '@/hooks/use-organization';
import useAuthStore from '@/hooks/use-auth';

interface Prompt {
    prompt_key: string;
    custom_text: string;
}

interface EditModalProps {
    section: Prompt | null;
    isOpen: boolean;
    onClose: () => void;
    orgID:string
}

const EditModal: React.FC<EditModalProps> = ({ section, isOpen, onClose,orgID }) => {
    const [content, setContent] = useState('');
    const { token } = useAuthStore();
    const { upsertOrgPrompt } = useOrganizationStore();

    useEffect(() => {
        if (section) setContent(section.custom_text);
    }, [section]);

    if (!isOpen || !section) return null;

    const handleSave = async () => {
        if (!section) return;
        const updatedPrompt = { prompt_key: section.prompt_key, custom_text: content };
        // Call the store method directly to update backend + state
       
        await upsertOrgPrompt(orgID, updatedPrompt, token);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg shadow-2xl relative animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="p-6 pb-0 flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Edit {section.prompt_key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Update this section. Changes will appear on your public page.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <X />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                        {section.prompt_key.replace(/_/g, ' ')}
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-40 p-3 border-2 border-black focus:outline-none focus:ring-0 resize-none font-medium text-gray-800"
                        placeholder={`Enter details about ${section.prompt_key.replace(/_/g, ' ')}...`}
                    />
                </div>

                {/* Footer */}
                <div className="p-6 pt-0 flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 border-2 border-black font-bold text-sm tracking-widest hover:bg-gray-50 transition-colors uppercase"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2.5 bg-black text-white border-2 border-black font-bold text-sm tracking-widest hover:bg-gray-900 transition-colors uppercase"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
