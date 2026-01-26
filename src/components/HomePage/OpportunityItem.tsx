
import React from 'react';
import { Opportunity } from '../types';
import { Clock, MapPin, Zap } from 'lucide-react';

interface Props {
  item: Opportunity;
}

export const OpportunityItem: React.FC<Props> = ({ item }) => {
  const isBounty = item.type === 'BOUNTY';

  return (
    <div className="border border-zinc-200 p-6 hover:border-zinc-400 transition-colors group">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-black uppercase tracking-tight">{item.title}</h3>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 border ${
              isBounty ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-zinc-100 text-zinc-500 border-zinc-200'
            }`}>
              {item.type}
            </span>
          </div>
          <p className="text-zinc-500 font-bold text-sm uppercase mb-3">{item.company}</p>
        </div>
        <div className="text-right flex flex-col items-end">
          <div className="flex items-center gap-1.5 font-bold">
            {isBounty && <Zap className="w-4 h-4 text-orange-500 fill-orange-500" />}
            <span className={isBounty ? 'text-zinc-900' : 'text-zinc-900'}>{item.reward}</span>
          </div>
          <div className="flex items-center gap-4 mt-2 text-zinc-400 text-xs font-medium uppercase">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.postedAt}</span>
            <span className="flex items-center gap-1">{item.location}</span>
          </div>
        </div>
      </div>
      
      <p className="text-zinc-600 text-sm mb-6 leading-relaxed max-w-3xl">
        {item.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {item.tags.map(tag => (
          <span key={tag} className="text-[11px] font-medium text-zinc-500 border border-zinc-100 bg-zinc-50 px-2 py-0.5">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
