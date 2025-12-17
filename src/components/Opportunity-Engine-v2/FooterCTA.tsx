import React from 'react';
import { ArrowRight } from 'lucide-react';

const FooterCTA: React.FC = () => {
  return (
    <div className="py-16 border-t border-black border-b-4 border-b-black mb-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
            <span className="w-2 h-2 bg-[#FF6B00]"></span>
            Organizer & Trust
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight mb-4">
            List an Opportunity
          </h2>
          <p className="text-gray-600 mb-8 max-w-md">
            Reach Bitcoin-native builders who prove themselves through action, not resumes.
          </p>
          <button className="bg-[#FF6B00] hover:bg-[#e56000] text-white px-8 py-4 font-bold uppercase text-sm tracking-widest transition-colors flex items-center">
            Get Started <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
        
        <div className="bg-gray-100 p-12 flex flex-col items-center justify-center text-center h-full min-h-[250px]">
          <div className="text-6xl font-black tracking-tighter mb-2 flex items-start">
            100
            <span className="text-4xl mt-1">+</span>
          </div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Organizations Trust Us
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterCTA;