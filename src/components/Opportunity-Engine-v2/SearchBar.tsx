import React from 'react';
import { Search, ChevronDown, ArrowUpDown } from 'lucide-react';

const SearchBar: React.FC = () => {
  return (
    <div className="sticky top-0 z-20 bg-white border-b border-gray-200 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-none leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-black focus:border-black sm:text-sm uppercase font-medium tracking-wide"
              placeholder="Search by title, org, or skill"
            />
          </div>
          <div className="flex-shrink-0 relative">
            <button className="w-full md:w-auto flex items-center justify-between space-x-2 bg-white border border-gray-300 px-4 py-2 text-sm font-bold uppercase tracking-wide hover:bg-gray-50 focus:outline-none">
              <span className="flex items-center">
                <ArrowUpDown className="h-3 w-3 mr-2" />
                Best Match
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;