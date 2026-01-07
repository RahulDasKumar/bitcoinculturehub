
import React from 'react';
import SectionHeader from './SectionHeader';
import { NETWORK_STATS } from './mockData';

const NetworkSnapshot: React.FC = () => (
  <section className="mb-16">
    <SectionHeader title="Network Snapshot" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {NETWORK_STATS.map((stat, idx) => (
        <div key={idx} className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm">
          <p className="text-xs font-medium text-gray-500 mb-1">{stat.label}</p>
          <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  </section>
);

export default NetworkSnapshot;
