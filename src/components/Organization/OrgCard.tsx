import React from 'react';
import { Organization } from '../types';
import { Users, ArrowRight } from 'lucide-react';

interface OrgCardProps {
  org: Organization;
  onClick: (org: Organization) => void;
}

export const OrgCard: React.FC<OrgCardProps> = ({ org, onClick }) => {
  return (
    <div 
      onClick={() => onClick(org)}
      className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 mb-3 bg-white border border-slate-200 rounded-xl hover:border-orange-200 hover:shadow-md hover:shadow-orange-500/5 transition-all cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-2xl group-hover:bg-orange-50 group-hover:border-orange-100 transition-colors">
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 group-hover:text-orange-600 transition-colors">{org.name}</h3>
          <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
            </span>
            <span className="text-slate-300">•</span>
            <span></span>
          </div>
        </div>
      </div>
      
      <div className="mt-3 sm:mt-0 flex items-center justify-between w-full sm:w-auto gap-4">
        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-orange-400 transform group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
};
