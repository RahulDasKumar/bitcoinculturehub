
import React from 'react';
import { FormData } from '../../types';

interface StepProps {
  data: FormData;
  update: (updates: Partial<FormData>) => void;
}

const RewardsStep: React.FC<StepProps> = ({ data, update }) => {
  const perks = [
    'Resume/portfolio worthy',
    'Letter of recommendation',
    'Introduction to network',
    'Public shoutout'
  ];



  return (
    <div className="p-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-orange-500 text-white w-6 h-6 flex items-center justify-center font-bold text-xs">4</div>
        <h2 className="text-sm font-bold uppercase tracking-widest">REWARDS</h2>
      </div>
      
      <hr className="mb-8 border-gray-300" />

      {/* Info Banner */}
      <div className="mb-8 bg-gray-50 border-l-4 border-orange-500 p-4 flex gap-3">
         <div className="flex-1">
            <p className="text-xs font-bold text-gray-800 mb-1">Most builders join BCH to build proof-of-work and momentum.</p>
            <p className="text-xs text-gray-400">Compensation is optional — recognition matters most.</p>
         </div>
      </div>

      {/* Proof of Work Credit (Static/Locked as per screenshot) */}
      <div className="mb-6 border-2 border-green-500 rounded-sm p-4 flex items-center justify-between bg-white">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-green-500 flex items-center justify-center text-green-500 bg-green-50">
            <i className="fa-solid fa-seedling"></i>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800">Proof-of-Work Credit</h4>
            <p className="text-[11px] text-gray-400">Builder's contribution is recorded in their public profile</p>
          </div>
        </div>
        <div className="bg-green-100 text-green-700 text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase border border-green-500">
          ALWAYS ON
        </div>
      </div>

      {/* Visibility & Network Benefits */}
      <div className="mb-6 border border-gray-300 rounded-sm p-6 bg-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-xl text-gray-800">
            <i className="fa-solid fa-share-nodes"></i>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800">Visibility & Network Benefits</h4>
            <p className="text-[10px] text-gray-400 font-medium">Additional perks for the builder</p>
          </div>
        </div>
        

      </div>

      {/* Add Compensation Accordion */}
      <div className="border border-gray-300 rounded-sm p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 border-2 border-gray-300 flex items-center justify-center"></div>
          <div>
            <h4 className="text-sm font-bold text-gray-800">Add Compensation</h4>
            <p className="text-[10px] text-gray-400">Optional — sats, USD, or stipend</p>
          </div>
        </div>
        <i className="fa-solid fa-chevron-down text-gray-400 text-[10px]"></i>
      </div>
    </div>
  );
};

export default RewardsStep;
