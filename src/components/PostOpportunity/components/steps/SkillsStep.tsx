
import React from 'react';
import { FormData } from '../../types';

interface StepProps {
  data: FormData;
  update: (updates: Partial<FormData>) => void;
}

const SkillsStep: React.FC<StepProps> = ({ data, update }) => {
  const categories = ['Content', 'Design', 'Engineering', 'Events', 'Operations', 'Research', 'Community'];
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const domains = ['Lightning', 'Media', 'Education', 'Design', 'Nostr', 'Security', 'Marketing', 'Development', 'Writing', 'Video'];
  const tools = ['Figma', 'Canva', 'GitHub', 'Nostr', 'VS Code', 'Premiere Pro', 'After Effects', 'Photoshop', 'Twitter/X'];

  const toggleDomain = (d: string) => {
    const current = data.categories || [];
    update({ categories: current.includes(d) ? current.filter(x => x !== d) : [...current, d] });
  };

  const toggleTool = (t: string) => {
    const current = data.tools || [];
    update({ tools: current.includes(t) ? current.filter(x => x !== t) : [...current, t] });
  };

  return (
    <div className="p-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-orange-500 text-white w-6 h-6 flex items-center justify-center font-bold text-xs">3</div>
        <h2 className="text-sm font-bold uppercase tracking-widest">SKILLS</h2>
      </div>
      
      <hr className="mb-8 border-gray-300" />

      {/* Primary Category */}
      <div className="mb-8">
        <label className="block text-[11px] font-bold uppercase mb-3 text-gray-800 tracking-wider">PRIMARY CATEGORY</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => update({ primaryCategory: c })}
              className={`border p-2.5 text-xs font-medium transition-all ${
                data.primaryCategory === c ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Required Skill Level */}
      <div className="mb-8">
        <label className="block text-[11px] font-bold uppercase mb-3 text-gray-800 tracking-wider">REQUIRED SKILL LEVEL</label>
        <div className="flex gap-2">
          {levels.map(l => (
            <button
              key={l}
              onClick={() => update({ skill_level: l })}
              className={`flex-1 border p-2.5 text-[11px] font-bold uppercase tracking-tight transition-all ${
                data.skill_level === l ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-300 text-gray-800'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Domains */}
      <div className="mb-8">
        <label className="block text-[11px] font-bold uppercase mb-2 text-gray-800 tracking-wider">SKILL DOMAINS (OPTIONAL)</label>
        <div className="flex flex-wrap gap-2">
          {domains.map(d => (
            <button
              key={d}
              onClick={() => toggleDomain(d)}
              className={`border px-3 py-1.5 text-xs transition-all ${
                data.categories.includes(d) ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Tools / Stack */}
      <div className="mb-4">
        <label className="block text-[11px] font-bold uppercase mb-2 text-gray-800 tracking-wider">TOOLS / STACK (OPTIONAL)</label>
        <div className="flex flex-wrap gap-2">
          {tools.map(t => (
            <button
              key={t}
              onClick={() => toggleTool(t)}
              className={`border px-3 py-1.5 text-[10px] text-gray-600 font-medium transition-all ${
                data.tools.includes(t) ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsStep;
