
import React, { useState } from 'react';
import { Settings, ChevronUp, ChevronDown, Link as LinkIcon, Mail, Bell, Trash2, Archive } from 'lucide-react';
import Toggle from './Toggle';

const OrganizationSettings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [notif1, setNotif1] = useState(true);
  const [notif2, setNotif2] = useState(false);
  const [notif3, setNotif3] = useState(false);

  return (
    <section className="mb-16">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-4 border border-gray-100 bg-white rounded-t-xl cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-900">
          <Settings size={16} className="text-gray-500" /> Organization Settings
        </div>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      
      {isOpen && (
        <div className="bg-white border-x border-b border-gray-100 rounded-b-xl p-8 space-y-10 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Details Group */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-900 mb-4">
                <Settings size={14} /> Organization Details
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Organization Name</label>
                <input type="text" defaultValue="Bitcoin Students Network" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-shadow" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Display Name</label>
                <input type="text" defaultValue="BSN" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-shadow" />
              </div>
            </div>

            {/* Additional Inputs */}
            <div className="space-y-6 md:mt-11">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5"><LinkIcon size={12} /> Website</label>
                <input type="text" defaultValue="https://bitcoinstudentsnetwork.org" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-shadow" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5"><Mail size={12} /> Contact Email</label>
                <input type="email" defaultValue="hello@bitcoinstudentsnetwork.org" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-shadow" />
              </div>
            </div>
          </div>

          {/* Notifications */}
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

          {/* Danger Zone */}
          <div className="pt-8 border-t border-gray-100">
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-red-500 mb-6">
              <Trash2 size={14} /> Danger Zone
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-red-100 bg-red-50/30 rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Archive Organization</h4>
                  <p className="text-[10px] text-gray-500">Hide from public view but keep all data</p>
                </div>
                <button className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-600 rounded text-[10px] font-bold uppercase tracking-widest bg-white hover:bg-red-50 transition-colors">
                  <Archive size={14} /> Archive
                </button>
              </div>
              <div className="p-4 border border-red-200 bg-red-50 rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Delete Organization</h4>
                  <p className="text-[10px] text-gray-500">Permanently delete BSN and all associated data</p>
                </div>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white rounded text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-colors">
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrganizationSettings;
