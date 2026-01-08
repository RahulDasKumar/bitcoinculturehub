
import React, { useState } from 'react';
import { FormData } from '../../types';

interface StepProps {
  data: FormData;
  update: (updates: Partial<FormData>) => void;
}

const BasicsStep: React.FC<StepProps> = ({ data, update }) => {
  const types = ['Volunteer', 'Paid Task', 'Bounty', 'Internship', 'Role', 'Speaking', 'Creator Collab'];
  const locationType = ['Remote', 'IRL', 'Hybrid'];
  const commitments = [
    { id: 'One-off', label: 'One-off', sub: 'Single task, no ongoing commitment' },
    { id: 'Short Project', label: 'Short Project', sub: '1-4 weeks' },
    { id: 'Ongoing', label: 'Ongoing', sub: 'Recurring or long-term' },
  ];
  return (
    <div className="p-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-orange-500 text-white w-6 h-6 flex items-center justify-center font-bold text-xs">1</div>
        <h2 className="text-sm font-bold uppercase tracking-widest">BASICS</h2>
      </div>
      
      <hr className="mb-8 border-gray-300" />

      {/* Opportunity Title */}
      <div className="mb-8">
        <label className="block text-[11px] font-bold uppercase mb-2 text-gray-800">OPPORTUNITY TITLE</label>
        <input 
          type="text" 
          value={data.title}
          onChange={(e) => update({ title: e.target.value })}
          placeholder="e.g., Design a Bitcoin Campus Week poster"
          className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
        />
        <div className="mt-2 bg-gray-50 border border-gray-200 p-3 text-[11px]">
          <div className="flex gap-2">
            <i className="fa-regular fa-lightbulb text-orange-500 mt-0.5"></i>
            <div>
              <p className="text-green-600 mb-1">✓ Good: "Design a Bitcoin Campus Week poster"</p>
              <p className="text-red-500">✗ Avoid: "Graphic design help"</p>
            </div>
          </div>
        </div>
      </div>

      {/* Opportunity Type */}
      <div className="mb-8">
        <label className="block text-[11px] font-bold uppercase mb-2 text-gray-800">OPPORTUNITY TYPE</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {types.map(t => (
            <button
              key={t}
              onClick={() => update({ type: t })}
              className={`border p-2 text-xs font-medium transition-all ${
                data.type === t ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

     

      {/* Location */}
      <div className="mb-8">
        <label className="block text-[11px] font-bold uppercase mb-2 text-gray-800">LOCATION TYPE</label>
        <div className="flex gap-2">
          {locationType.map(loc => (
            <button
              key={loc}
              onClick={() => update({ location: { ...data.location, type: loc } })}
              className={`flex-1 border p-2 text-xs font-bold uppercase transition-all ${
                data.location.type === loc ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-300 text-gray-800'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
        
        {((data.location.type == 'IRL' || data.location.type == 'Hybrid' )) && 
          <div className="mb-8">
            <label className="block text-[11px] font-bold uppercase mb-2 text-gray-800">Location</label>
            <input
              type="text"
              onChange={(e) => update({location: { ...data.location, text: e.target.value }})}
              placeholder="e.g., Design a Bitcoin Campus Week poster"
              className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        }
      </div>
      {/* Time Commitment */}
      <div className="mb-8">
        <label className="block text-[11px] font-bold uppercase mb-2 text-gray-800">TIME COMMITMENT</label>
        <div className="flex flex-col gap-2">
          {commitments.map(c => (
            <button
              key={c.id}
              onClick={() => update({ time_commitment: c.id })}
              className={`w-full text-left border p-3 rounded-sm transition-all ${
                data.time_commitment === c.id ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{c.label}</span>
                <span className="text-xs text-gray-400">— {c.sub}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Estimated Hours Slider */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="text-[11px] font-bold uppercase text-gray-800">WEEKLY HOURS: {data.estimated_hours}H</label>
        </div>
        <div className="px-2 pb-8">
          <input 
            type="range" 
            min="5" 
            max="100" 
            value={data.estimated_hours}
            onChange={(e) => update({ estimated_hours: parseInt(e.target.value) })}
            className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-orange-500" 
          />
          <div className="flex justify-between mt-4 text-[10px] text-gray-400 font-bold uppercase">
            <span>5h</span>
            <span>50h</span>
            <span>100h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicsStep;
