import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="bg-black text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-2">
          We Serve <br className="hidden md:block" /> Builders*
        </h1>
        <p className="text-gray-400 text-sm md:text-base font-medium mb-10">
          *If you're building, you belong here
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button className="bg-[#FF6B00] hover:bg-[#e56000] text-white px-8 py-3 font-bold uppercase text-sm tracking-wide transition-colors">
            Post an Opportunity
            <ArrowRight className="inline-block ml-2 w-4 h-4" />
          </button>
          <button className="bg-transparent border border-white text-white hover:bg-white hover:text-black px-8 py-3 font-bold uppercase text-sm tracking-wide transition-colors">
            Browse Opportunities
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-2xl border-t border-gray-800 pt-8">
          <div>
            <div className="text-3xl font-black mb-1">247</div>
            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Active Opportunities</div>
          </div>
          <div>
            <div className="text-3xl font-black mb-1">1.2K</div>
            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Builders</div>
          </div>
          <div>
            <div className="text-3xl font-black mb-1">89%</div>
            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;