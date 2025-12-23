import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="w-full h-32 flex items-center justify-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-bitcoin"></div>
      <span className="ml-3 text-xs font-bold uppercase text-gray-400">Loading data...</span>
    </div>
  );
};

export default Loader;