
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Organization } from '../types';
import useAuthStore from '@/hooks/use-auth';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/src/ScrollToPlugin';
const HeroActions = ({organization}) => {

  gsap.registerPlugin(ScrollToPlugin);

  const handleClick = () => {
    gsap.to(window, {
      duration: 1.4,
      scrollTo: "#programs",
      ease: "power3.inOut"
    });
  }
  const {user} = useAuthStore()
  const nav = useNavigate()
  const canEdit =  user?.id == organization.owner_id

  return (
    <div className="flex flex-wrap gap-4 mt-10">
      <button className="bg-[#f7931a] hover:bg-[#e88a18] text-white px-8 py-3.5 font-bold rounded-sm text-sm uppercase tracking-wide flex items-center transition-all shadow-sm">
        Join the Network
        <span className="ml-2">→</span>
      </button>
      <button className="bg-white border-2 border-black hover:bg-gray-50 text-black px-8 py-3.5 font-bold rounded-sm text-sm uppercase tracking-wide transition-all" onClick={handleClick}>
        View Opportunities
      </button>
      <button className="bg-white border-2 border-black hover:bg-gray-50 text-black px-8 py-3.5 font-bold rounded-sm text-sm uppercase tracking-wide transition-all">
        Explore Events
      </button>
    {canEdit && (      <button className="bg-black hover:bg-gray-800 text-white px-8 py-3.5 font-bold rounded-sm text-sm uppercase tracking-wide transition-all w-full sm:w-auto mt-4 sm:mt-0" onClick={()=>{nav(`/org-dash/${organization.id}`)}}>
        Manage Your Org
      </button>)}

    </div>
  );
};

export default HeroActions;
