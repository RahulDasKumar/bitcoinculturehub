
import React from 'react';
import { FormData } from '../types';

interface MarketplacePreviewProps {
  data: FormData;
}

const MarketplacePreview: React.FC<MarketplacePreviewProps> = ({ data }) => {
  return (
    <div className="sticky top-20">
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-500 mb-2">
        <i className="fa-regular fa-eye"></i>
        MARKETPLACE PREVIEW
      </div>
      
      <div className="border border-gray-300 bg-white p-6 rounded-sm shadow-sm">
        <div className="bg-orange-500 text-white text-[9px] font-bold uppercase inline-block px-1.5 py-0.5 rounded-sm mb-3">
          {data.type.toUpperCase() || 'TYPE'}
        </div>
        
        <h3 className="text-xl font-bold uppercase leading-tight mb-1 break-words">
          {data.title || 'OPPORTUNITY TITLE'}
        </h3>

        
        <p className="text-xs text-gray-500 italic mb-6">
          {data.summary || 'One-sentence summary of this opportunity...'}
        </p>
        
        <div className="flex flex-col gap-2 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2 text-[11px] text-gray-600">
            <i className="fa-regular fa-clock w-4"></i>
            <span>{data.estimated_hours}h</span>
            <span className="mx-2 text-gray-200">|</span>
            <i className="fa-solid fa-location-dot w-4"></i>
            <span>{data.location.type}</span>
          </div>
          
          <div className="flex items-center gap-2 text-[11px] text-gray-600">
            <i className="fa-solid fa-user-graduate w-4"></i>
            <span>Public credit on completion</span>
          </div>
        </div>
      </div>
      
      <p className="text-[10px] text-gray-400 text-center mt-3">
        This is how builders will see your opportunity
      </p>
    </div>
  );
};

export default MarketplacePreview;
