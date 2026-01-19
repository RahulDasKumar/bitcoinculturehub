
import React from 'react';

interface TopNavProps {
  activeTab: 'members' | 'settings' | 'reports';
  setActiveTab: (tab: 'members' | 'settings' | 'reports') => void;
}

const TopNav: React.FC<TopNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-12">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-none font-black text-xl">
            B
          </div>
          <div>
            <h1 className="font-black tracking-tighter leading-none text-xl text-black uppercase">BCH HUB</h1>
            <p className="text-[9px] text-gray-400 font-bold tracking-[0.2em] uppercase">Control</p>
          </div>
        </div>
        
        {/* Hidden or removed tabs as per "Get rid of the multiple pages" */}
        <div className="hidden md:flex items-center space-x-8">
           <span className="text-[10px] font-black tracking-widest text-black border-b-2 border-black pb-1">NETWORK ADMINISTRATION</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] font-black text-black leading-none">ROOT ADMINISTRATOR</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5">Global Protocol Level</p>
        </div>
        <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-none border-2 border-black font-black text-lg">
          A
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
