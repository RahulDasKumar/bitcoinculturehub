
import React from 'react';
import { ExternalLink, CheckCircle } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { SYNC_ITEMS } from './mockData';

const SyncStatus: React.FC = () => (
  <section className="mb-16">
    <SectionHeader 
      title="Public Page Sync Status" 
      subtitle="See which sections are synced to your public page"
      action={
        <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors">
          <ExternalLink size={14} /> View Public Page
        </button>
      }
    />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {SYNC_ITEMS.map((item, idx) => (
        <div key={idx} className="bg-white p-4 border border-gray-100 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
            <p className="text-[10px] text-gray-400">{item.description}</p>
          </div>
          {item.isSynced && (
            <div className="flex items-center gap-1 border border-green-200 text-green-600 bg-green-50 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest">
              <CheckCircle size={8} /> Synced
            </div>
          )}
        </div>
      ))}
    </div>
  </section>
);

export default SyncStatus;
