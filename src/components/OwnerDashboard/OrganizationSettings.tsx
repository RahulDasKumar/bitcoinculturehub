import React, { useState } from 'react';
import { Settings, ChevronUp, ChevronDown, Link as LinkIcon, Mail, Bell } from 'lucide-react';
import Toggle from './Toggle';
import { useOrganizationStore } from '@/hooks/use-organization';
import useAuthStore from '@/hooks/use-auth';
interface Prompt {
  prompt_key: string;
  custom_text: string;
}

interface OrganizationProps {
  orgID: string;
  prompts: Prompt[];
}

const OrganizationSettings: React.FC<OrganizationProps> = ({ orgID, prompts }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [localPrompts, setLocalPrompts] = useState<Prompt[]>(prompts);
  const [notif1, setNotif1] = useState(true);
  const [notif2, setNotif2] = useState(false);
  const [notif3, setNotif3] = useState(false);
  const  {token} = useAuthStore()
  const { upsertOrgPrompt } = useOrganizationStore();

  // Handle prompt input changes
  const handlePromptChange = (idx: number, value: string) => {
    const updated = [...localPrompts];
    updated[idx] = { ...updated[idx], custom_text: value };
    setLocalPrompts(updated);
  };

  // Save all prompts to backend
  const handleSavePrompts = async () => {
    for (const prompt of localPrompts) {
      await upsertOrgPrompt(orgID, prompt, token);
    }
  };

  return (
    <section className="mb-16">
      {/* Accordion Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-4 border border-gray-100 bg-white rounded-t-xl cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-900">
          <Settings size={16} className="text-gray-500" /> Organization Settings
        </div>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>

      {/* Accordion Content */}
      {isOpen && (
        <div className="bg-white border-x border-b border-gray-100 rounded-b-xl p-8 space-y-10 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Prompts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {localPrompts.map((prompt, idx) => (
              <div className="space-y-1" key={prompt.prompt_key}>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {prompt.prompt_key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </label>
                <input
                  type="text"
                  value={prompt.custom_text}
                  onChange={(e) => handlePromptChange(idx, e.target.value)}
                  className="w-full px-4 py-6 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
                />
              </div>
            ))}
          </div>

          <button
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded font-bold text-sm hover:bg-orange-600 transition-colors"
            onClick={handleSavePrompts}
          >
            Save Changes
          </button>

          {/* Notification Preferences */}
          <div>
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-900 mb-6">
              <Bell size={14} /> Notification Preferences
            </div>
            <div className="space-y-4 max-w-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-700">Email me when someone applies</span>
                <Toggle enabled={notif1} onChange={setNotif1} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-700">Email me weekly digest</span>
                <Toggle enabled={notif2} onChange={setNotif2} />
              </div>
              <div className="flex items-center justify-between opacity-50">
                <span className="text-sm font-bold text-gray-700">Email me when a chapter becomes inactive</span>
                <Toggle enabled={notif3} onChange={setNotif3} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrganizationSettings;
