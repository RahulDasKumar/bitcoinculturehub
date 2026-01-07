
import React, { useState } from 'react';
import { Plus, Globe, Edit2, Archive, ChevronDown } from 'lucide-react';
import Badge from './Badge';
import Toggle from './Toggle';
import { ASSOCIATED_ORGS, CONTRIBUTORS } from './mockData';

const ContributorsSection: React.FC = () => {
  const [permissions, setPermissions] = useState({ admin: true, regional: true, chapter: true });

  return (
    <section className="mb-16 space-y-12">
      <header>
         <h2 className="text-xl font-bold text-gray-900">Associated Organizations & Contributors</h2>
      </header>
{/* 
      {/* Orgs Card
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <div>
            <h3 className="font-bold text-gray-900">Associated Organizations</h3>
            <p className="text-xs text-gray-500">Chapters, partners, and affiliated groups</p>
          </div>
          <button className="bg-orange-500 text-white px-4 py-1.5 rounded text-[11px] font-black uppercase tracking-widest hover:bg-orange-600 flex items-center gap-1.5">
            <Plus size={14} /> Add Organization
          </button>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100 text-[11px] font-medium text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Organization</th>
              <th className="px-6 py-4">Country / Region</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ASSOCIATED_ORGS.map((org, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{org.name}</td>
                <td className="px-6 py-4 text-gray-500 flex items-center gap-1.5">
                  <Globe size={14} className="text-gray-400" /> {org.region}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */} 

      {/* Contributors Card */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <div>
            <h3 className="font-bold text-gray-900">Contributors</h3>
            <p className="text-xs text-gray-500">People who help run BSN</p>
          </div>
          <button className="bg-orange-500 text-white px-4 py-1.5 rounded text-[11px] font-black uppercase tracking-widest hover:bg-orange-600 flex items-center gap-1.5">
            <Plus size={14} /> Add Contributor
          </button>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100 text-[11px] font-medium text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4 text-center">Role</th>
              <th className="px-6 py-4">Region</th>
              <th className="px-6 py-4">Since</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {CONTRIBUTORS.map((c, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{c.name}</td>
                <td className="px-6 py-4 text-center">
                  <Badge variant="outline" className="border-black border-2">{c.role}</Badge>
                </td>
                <td className="px-6 py-4 text-gray-500">{c.region}</td>
                <td className="px-6 py-4 text-gray-500">{c.since}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-900"><Edit2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Advanced Settings Expander */}
        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors">
            <Archive size={14} /> Advanced Access Settings <ChevronDown size={14} />
          </button>
          
          <div className="mt-6 border border-gray-200 rounded-lg p-6 bg-white space-y-4">
            <p className="text-xs text-gray-400 italic mb-4">Configure detailed permissions for each role type.</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-gray-700">Global Admins can manage all chapters</p>
              <Toggle enabled={permissions.admin} onChange={(v) => setPermissions(p => ({...p, admin: v}))} />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-gray-700">Regional Leads can post events in their region</p>
              <Toggle enabled={permissions.regional} onChange={(v) => setPermissions(p => ({...p, regional: v}))} />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-gray-700">Chapter Leads can manage their own chapter</p>
              <Toggle enabled={permissions.chapter} onChange={(v) => setPermissions(p => ({...p, chapter: v}))} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContributorsSection;
