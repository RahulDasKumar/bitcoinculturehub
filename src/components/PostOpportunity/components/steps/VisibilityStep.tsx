
import React from 'react';
import { FormData } from '../../types';

interface StepProps {
  data: FormData;
  update: (updates: Partial<FormData>) => void;
}

const VisibilityStep: React.FC<StepProps> = ({ data, update }) => {
  return (
    <div className="p-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-orange-500 text-white w-6 h-6 flex items-center justify-center font-bold text-xs">5</div>
        <h2 className="text-sm font-bold uppercase tracking-widest">VISIBILITY</h2>
      </div>
      
      <hr className="mb-8 border-gray-300" />

      <div className="border border-gray-300 rounded-sm p-8 bg-white">
        <h4 className="text-[11px] font-bold uppercase text-gray-800 mb-4 tracking-wider">DEFAULT (FREE)</h4>
        
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-gray-700">
            <i className="fa-solid fa-check text-green-500 text-xs"></i>
            <span className="text-xs font-medium">Appears in marketplace</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <i className="fa-solid fa-check text-green-500 text-xs"></i>
            <span className="text-xs font-medium">Appears on organization page</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <i className="fa-solid fa-check text-green-500 text-xs"></i>
            <span className="text-xs font-medium">Eligible for smart matching</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisibilityStep;
