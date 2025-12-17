import React from 'react';

const Mission: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-black uppercase mb-6 tracking-tight">Our Mission</h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-6 font-medium">
            We believe in proof-of-work over credentials. In showing, not telling. In building trust through action, not applications.
          </p>
          <p className="text-gray-500 text-base mb-8">
            This platform connects builders with opportunities based on what they've shipped—not where they went to school or who they know.
          </p>
          <button className="bg-black text-white px-6 py-3 font-bold uppercase text-sm tracking-wide hover:bg-gray-800 transition-colors">
            Post an Opportunity
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mission;