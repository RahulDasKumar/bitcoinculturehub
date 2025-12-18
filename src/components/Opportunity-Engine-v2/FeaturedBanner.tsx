import React from 'react';
import { ArrowRight } from 'lucide-react';

const FeaturedBanner: React.FC = () => {
  return (
    <div className="bg-black text-white p-8 md:p-10 mb-8 w-full border border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <span className="bg-[#FF6B00] text-white text-xs font-black uppercase px-2 py-1 tracking-widest mb-4 md:mb-0">
          Featured This Week
        </span>
      </div>
      
      <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 tracking-tight">
        Bitcoin Conference Host
      </h2>
      
      <p className="text-gray-400 text-base md:text-lg font-medium mb-8 max-w-2xl">
        Premium opportunity • Travel + ticket included • Earn bonus XP • Network with industry leaders
      </p>
      
      <div className="flex gap-4">
        <button className="bg-[#FF6B00] hover:bg-[#e56000] text-white px-6 py-3 font-bold uppercase text-xs md:text-sm tracking-widest transition-colors">
          View Details
          <ArrowRight className="inline-block ml-2 w-4 h-4" />
        </button>
        <button className="bg-transparent border border-white text-white hover:bg-white hover:text-black px-6 py-3 font-bold uppercase text-xs md:text-sm tracking-widest transition-colors">
          Save For Later
        </button>
      </div>
    </div>
  );
};

export default FeaturedBanner;