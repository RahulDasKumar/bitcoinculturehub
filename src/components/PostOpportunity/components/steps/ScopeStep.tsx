
import React from 'react';
import { FormData } from '../../types';

interface StepProps {
  data: FormData;
  update: (updates: Partial<FormData>) => void;
}

const ScopeStep: React.FC<StepProps> = ({ data, update }) => {
  const outputs = [
    { id: 'Files', icon: 'fa-regular fa-folder' },
    { id: 'Content', icon: 'fa-regular fa-file-lines' },
    { id: 'Event Support', icon: 'fa-solid fa-microphone' },
    { id: 'Code', icon: 'fa-solid fa-code' },
    { id: 'Design Assets', icon: 'fa-regular fa-image' },
    { id: 'Documentation', icon: 'fa-regular fa-paste' },
    { id: 'Video', icon: 'fa-solid fa-clapperboard' },
    { id: 'Research Report', icon: 'fa-solid fa-magnifying-glass' },
  ];

  const toggleOutput = (id: string) => {
    const current = data.output_type || [];
    if (current.includes(id)) {
      update({ output_type: current.filter(x => x !== id) });
    } else {
      update({ output_type: [...current, id] });
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-orange-500 text-white w-6 h-6 flex items-center justify-center font-bold text-xs">2</div>
        <h2 className="text-sm font-bold uppercase tracking-widest">SCOPE</h2>
      </div>
      
      <hr className="mb-8 border-gray-300" />

      {/* One-sentence summary */}
      <div className="mb-8">
        <label className="block text-[11px] font-bold uppercase mb-2 text-gray-800">ONE-SENTENCE SUMMARY</label>
        <input 
          type="text" 
          value={data.summary}
          onChange={(e) => update({ summary: e.target.value })}
          placeholder="e.g., Design a professional poster for Bitcoin Campus Week at MIT"
          className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-orange-500"
        />
        <p className="text-[10px] text-gray-400 mt-2 italic font-medium">This appears in search results and matching</p>
      </div>

      {/* Full Description */}
      <div className="mb-8">
        <label className="block text-[11px] font-bold uppercase mb-2 text-gray-800">FULL DESCRIPTION</label>
        <textarea 
          rows={10}
          value={data.description}
          onChange={(e) => update({ description: e.target.value })}
          placeholder="Provide a detailed description of the opportunity, what the builder will work on, any context they need to know, and what success looks like..."
          className="w-full border border-gray-300 p-4 text-sm focus:outline-none focus:border-orange-500 resize-none"
        ></textarea>
        <div className="flex justify-between items-center mt-2">
          <span className="text-[10px] text-gray-400">{data.description.length} characters • Aim for 200+ characters for clarity</span>
        </div>
      </div>

      {/* Output Type */}
      <div className="mb-8">
        <div className="mb-1">
          <label className="block text-[11px] font-bold uppercase text-gray-800">OUTPUT TYPE</label>
          <p className="text-[10px] text-gray-400 mb-3">What will the builder deliver?</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {outputs.map(out => (
            <button
              key={out.id}
              onClick={() => toggleOutput(out.id)}
              className={`flex flex-col items-center justify-center p-3 border transition-all ${
                data.output_type.includes(out.id) ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-300 hover:border-gray-400 text-gray-700'
              }`}
            >
              <i className={`${out.icon} mb-2 text-lg`}></i>
              <span className="text-[10px] font-bold uppercase tracking-tight">{out.id}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Due Date */}
      <div className="mb-8">
        <label className="block text-[11px] font-bold uppercase mb-2 text-gray-800">DUE DATE (OPTIONAL)</label>
        <div className="relative">
          <input 
            type="date" 
            value={data.due_date}
            onChange={(e) => update({ due_date: e.target.value })}
            className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

       {/* Estimated Hours Slider Repeat (as per screenshot 2) */}
       <div>
        <div className="flex justify-between items-center mb-4">
          <label className="text-[11px] font-bold uppercase text-gray-800">ESTIMATED HOURS: {data.estimated_hours}H</label>
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

export default ScopeStep;
