import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FILTER_TAGS } from '../types';
import { FilterCategory } from '../types';
import Header from '../Header';

interface SectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const FilterSection: React.FC<SectionProps> = ({ title, isOpen, onToggle, children }) => {
  return (
    <div className="border border-gray-200 mb-2 bg-white">
      
      <button
        className="w-full flex justify-between items-center px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          {isOpen ? <span className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full"></span> : null}
          {title}
        </span>
        {isOpen ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
      </button>
      {isOpen && <div className="px-4 pb-4 pt-0">{children}</div>}
    </div>
  );
};

const SidebarFilters: React.FC = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    [FilterCategory.BASICS]: true,
    [FilterCategory.SKILLS_FIT]: false,
    [FilterCategory.REWARDS_LOGISTICS]: false,
    [FilterCategory.ORGANIZER_QUALITY]: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-black uppercase tracking-tight">Filters</h3>
      </div>

      <FilterSection
        title={FilterCategory.BASICS}
        isOpen={openSections[FilterCategory.BASICS]}
        onToggle={() => toggleSection(FilterCategory.BASICS)}
      >
        <div className="space-y-6 mt-2">
          <div>
            <h4 className="text-xs text-gray-500 uppercase font-semibold mb-2">Opportunity Type</h4>
            <div className="flex flex-wrap gap-2">
              {FILTER_TAGS.opportunityType.map((tag) => (
                <button
                  key={tag}
                  className="px-2 py-1 text-[10px] font-bold uppercase border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-colors bg-white text-gray-800"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs text-gray-500 uppercase font-semibold mb-2">Location</h4>
            <div className="flex flex-wrap gap-2">
              {FILTER_TAGS.location.map((tag) => (
                <button
                  key={tag}
                  className="px-2 py-1 text-[10px] font-bold uppercase border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-colors bg-white text-gray-800"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs text-gray-500 uppercase font-semibold mb-2">Time Commitment</h4>
            <div className="flex flex-wrap gap-2">
              {FILTER_TAGS.timeCommitment.map((tag) => (
                <button
                  key={tag}
                  className="px-2 py-1 text-[10px] font-bold uppercase border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-colors bg-white text-gray-800"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          <p className="text-xs text-gray-400 italic">
            Filter by type, location, and time to find your next opportunity.
          </p>
        </div>
      </FilterSection>

      {/* <FilterSection
        title={FilterCategory.REWARDS_LOGISTICS}
        isOpen={openSections[FilterCategory.REWARDS_LOGISTICS]}
        onToggle={() => toggleSection(FilterCategory.REWARDS_LOGISTICS)}
      >
        <div className="text-xs text-gray-400 py-2">Reward filters...</div>
      </FilterSection>

      <FilterSection
        title={FilterCategory.SKILLS_FIT}
        isOpen={openSections[FilterCategory.SKILLS_FIT]}
        onToggle={() => toggleSection(FilterCategory.SKILLS_FIT)}
      >
        <div className="text-xs text-gray-400 py-2">Skill filters...</div>
      </FilterSection>

      <FilterSection
        title={FilterCategory.ORGANIZER_QUALITY}
        isOpen={openSections[FilterCategory.ORGANIZER_QUALITY]}
        onToggle={() => toggleSection(FilterCategory.ORGANIZER_QUALITY)}
      >
        <div className="text-xs text-gray-400 py-2">Quality filters...</div>
      </FilterSection>
       */}
      <button className="text-xs text-gray-400 mt-2 hover:text-black uppercase font-bold tracking-wide w-full text-center py-2">
        Filters update instantly
      </button>
    </div>
  );
};

export default SidebarFilters;