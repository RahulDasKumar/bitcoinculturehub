import React from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import ScrollToPlugin from "gsap/ScrollToPlugin";
const Hero: React.FC = () => {
  gsap.registerPlugin(ScrollToPlugin);
  
  const handleClick = () => {
      gsap.to(window, {
        duration: 1.4,
        scrollTo: "#opportunity-list",
        ease: "power3.inOut"
      });
    }

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
          {/* <button className="bg-[#FF6B00] hover:bg-[#e56000] text-white px-8 py-3 font-bold uppercase text-sm tracking-wide transition-colors">
            Post an Opportunity
            <ArrowRight className="inline-block ml-2 w-4 h-4" />
          </button> */}
          <button className="bg-transparent border border-white text-white hover:bg-white hover:text-black px-8 py-3 font-bold uppercase text-sm tracking-wide transition-colors" onClick={()=>(handleClick())}>
            Browse Opportunities
          </button>
        </div>


      </div>
    </div>
  );
};

export default Hero;