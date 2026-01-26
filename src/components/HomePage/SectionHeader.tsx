
import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  buttonText: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, buttonText }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
      <div>
        <h2 className="text-3xl font-black tracking-tighter uppercase mb-2">{title}</h2>
        <p className="text-zinc-500 font-medium">{subtitle}</p>
      </div>
      <button className="bg-black text-white px-4 py-2 text-xs font-bold uppercase hover:bg-zinc-800 transition-colors shrink-0">
        {buttonText}
      </button>
    </div>
  );
};
