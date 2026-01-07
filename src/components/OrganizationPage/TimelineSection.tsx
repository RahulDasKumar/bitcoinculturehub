
import React from 'react';

const TimelineSection: React.FC = () => {
  const events = [
    {
      year: '2021',
      title: 'BSN founded by 5 student club leaders',
      stats: '5 founding chapters · 50 students'
    },
    {
      year: '2022',
      title: 'Reached 50 campus clubs across 20 countries',
      stats: '45 new chapters · 2,000+ students'
    }
  ];

  return (
    <section>
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-black mb-2">Proof-of-Work Ledger</h2>
        <p className="text-black font-medium">The receipts of a movement in motion.</p>
      </div>

      <div className="relative pl-24 space-y-8">
        {/* Timeline Line */}
        <div className="absolute left-10 top-2 bottom-2 w-px bg-gray-200"></div>

        {events.map((ev, idx) => (
          <div key={idx} className="relative group">
            {/* Year Badge */}
            <div className="absolute -left-24 top-0 w-20 h-8 bg-black text-white flex items-center justify-center font-bold text-xs rounded-sm">
              {ev.year}
            </div>

            {/* Event Card */}
            <div className="border-2 border-black p-8 hover:bg-gray-50 transition-colors bg-white shadow-sm">
              <h4 className="text-lg font-black mb-3 text-black">{ev.title}</h4>
              <div className="flex items-center gap-6 text-black font-bold text-xs">
                 <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#f7931a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    {ev.stats.split('·')[0].trim()}
                 </div>
                 <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    {ev.stats.split('·')[1].trim()}
                 </div>
              </div>
            </div>
          </div>
        ))}

        {/* See More */}
        <div className="pt-4 flex justify-center">
          <button className="border-2 border-black border-dashed px-12 py-3 text-[10px] font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all flex items-center gap-3">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
             See All (5)
          </button>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
