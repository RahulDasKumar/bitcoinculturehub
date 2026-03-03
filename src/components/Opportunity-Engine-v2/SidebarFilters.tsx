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

// Collapsible section wrapper — shows/hides filter group on click
const FilterSection: React.FC<SectionProps> = ({ title, isOpen, onToggle, children }) => {
  return (
    <div className="border border-gray-200 mb-2 bg-white">

      <button
        className="w-full flex justify-between items-center px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          {/* Orange dot shows when this section is open */}
          {isOpen ? <span className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full"></span> : null}
          {title}
        </span>
        {isOpen ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
      </button>
      {isOpen && <div className="px-4 pb-4 pt-0">{children}</div>}
    </div>
  );
};

// Shape of the active filter state — one array per filter category
export interface ActiveFilters {
  opportunityType: string[];
  location: string[];
  timeCommitment: string[];
}

// Props SidebarFilters receives from OpportunityEngine:
// - activeFilters: which tags are currently selected
// - onToggleFilter: called when a tag button is clicked (adds/removes from active list)
// - onClearFilters: called when "Clear Filters" is clicked
interface SidebarFiltersProps {
  activeFilters: ActiveFilters;
  onToggleFilter: (category: keyof ActiveFilters, value: string) => void;
  onClearFilters: () => void;
}

const SidebarFilters: React.FC<SidebarFiltersProps> = ({ activeFilters, onToggleFilter, onClearFilters }) => {
  // Controls which accordion sections are open
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    [FilterCategory.BASICS]: true,
    [FilterCategory.SKILLS_FIT]: false,
    [FilterCategory.REWARDS_LOGISTICS]: false,
    [FilterCategory.ORGANIZER_QUALITY]: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // True if ANY filter is active across all categories
  const hasActiveFilters =
    activeFilters.opportunityType.length > 0 ||
    activeFilters.location.length > 0 ||
    activeFilters.timeCommitment.length > 0;

  // Returns the appropriate Tailwind class string based on whether the tag is selected
  const filterButtonClass = (isActive: boolean) =>
    `px-2 py-1 text-[10px] font-bold uppercase border transition-colors ${
      isActive
        ? 'bg-black text-white border-black'            // selected state: filled black
        : 'border-gray-300 hover:border-black hover:bg-black hover:text-white bg-white text-gray-800' // default
    }`;

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

          {/* --- Opportunity Type --- */}
          <div>
            <h4 className="text-xs text-gray-500 uppercase font-semibold mb-2">Opportunity Type</h4>
            <div className="flex flex-wrap gap-2">
              {FILTER_TAGS.opportunityType.map((tag) => (
                <button
                  key={tag}
                  // Toggle this tag in the opportunityType filter array
                  onClick={() => onToggleFilter('opportunityType', tag)}
                  className={filterButtonClass(activeFilters.opportunityType.includes(tag))}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* --- Location --- */}
          <div>
            <h4 className="text-xs text-gray-500 uppercase font-semibold mb-2">Location</h4>
            <div className="flex flex-wrap gap-2">
              {FILTER_TAGS.location.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onToggleFilter('location', tag)}
                  className={filterButtonClass(activeFilters.location.includes(tag))}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* --- Time Commitment --- */}
          <div>
            <h4 className="text-xs text-gray-500 uppercase font-semibold mb-2">Time Commitment</h4>
            <div className="flex flex-wrap gap-2">
              {FILTER_TAGS.timeCommitment.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onToggleFilter('timeCommitment', tag)}
                  className={filterButtonClass(activeFilters.timeCommitment.includes(tag))}
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

      {/* Other filter sections (commented out until implemented) */}
      {/* <FilterSection title={FilterCategory.REWARDS_LOGISTICS} ...> */}
      {/* <FilterSection title={FilterCategory.SKILLS_FIT} ...> */}
      {/* <FilterSection title={FilterCategory.ORGANIZER_QUALITY} ...> */}

      {/* Show "Clear Filters" when any filter is active, otherwise show static hint text */}
      {hasActiveFilters ? (
        <button
          onClick={onClearFilters}
          className="text-xs text-red-500 mt-2 hover:text-red-700 uppercase font-bold tracking-wide w-full text-center py-2"
        >
          Clear Filters
        </button>
      ) : (
        <p className="text-xs text-gray-400 mt-2 uppercase font-bold tracking-wide w-full text-center py-2">
          Filters update instantly
        </p>
      )}
    </div>
  );
};

export default SidebarFilters;
