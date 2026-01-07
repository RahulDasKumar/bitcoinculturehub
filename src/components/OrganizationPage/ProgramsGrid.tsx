
import React, { useEffect, useState } from 'react';
import { Opportunity } from '../types';
import { useOrganizationStore } from '@/hooks/use-organization';
import { useParams } from "react-router-dom";
import MatchCard from '../Opportunity-Engine-v2/MatchCard';
import ComingSoonOverlay from '../../Profile-Beta/CommingSoonOverlay';


const ProgramsGrid = ({ opportunities, user_applications }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Programs', 'Events', 'Opportunities'];
  const { orgId } = useParams<{ orgId: string }>();


  return <>
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-10">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeFilter === filter 
              ? 'bg-black text-white shadow-md' 
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {filter === 'All' && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
            {filter}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map(opp => (
          <MatchCard opportunity={opp} applicants={user_applications} variant='grid' />
        ))}
      </div>
    </div>
  </>;
};

export default ProgramsGrid;
