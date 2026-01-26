
import React from 'react';
import { Organization } from '../types';
import { Globe, Users } from 'lucide-react';

interface Props {
  org: Organization;
}

export const OrganizationCard: React.FC<Props> = ({ org }) => {
  return (
    <div className="border border-zinc-200 p-6 flex flex-col h-full hover:border-zinc-400 transition-colors">
      <div className="flex gap-4 mb-4">
        <div className="w-10 h-10 border border-zinc-200 flex items-center justify-center font-bold text-lg bg-zinc-50 shrink-0 uppercase">
          {org.initial}
        </div>
        <div>
          <h3 className="font-black text-sm uppercase tracking-tight mb-0.5">{org.name}</h3>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{org.type}</p>
        </div>
      </div>
      
      <p className="text-zinc-600 text-sm mb-6 flex-grow leading-relaxed">
        {org.description}
      </p>

      <div className="flex items-center gap-4 text-zinc-400 text-[10px] font-bold uppercase">
        <span className="flex items-center gap-1.5"><Globe className="w-3 h-3" /> {org.location}</span>
        <span className="flex items-center gap-1.5"><Users className="w-3 h-3" /> {org.members}</span>
      </div>
    </div>
  );
};
