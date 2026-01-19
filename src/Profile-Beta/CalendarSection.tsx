import React from 'react';
import SectionHeader from './ui/SectionHeader';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import ComingSoonOverlay from './CommingSoonOverlay';

const CalendarSection: React.FC = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const startDayOffset = 1; 

  return (
    <ComingSoonOverlay active={true} bannerRotation="rotate-[-2deg]">

    <section className="mb-12">
      <SectionHeader icon={CalendarIcon} title="My Bitcoin Calendar" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar Widget */}
        <div className="border border-black p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6 px-2">
            <button className="p-1 hover:bg-gray-200 rounded"><ChevronLeft className="w-4 h-4" /></button>
            <h3 className="font-header font-bold text-lg uppercase">December 2025</h3>
            <button className="p-1 hover:bg-gray-200 rounded"><ChevronRight className="w-4 h-4" /></button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2 text-center">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
              <div key={d} className="text-[10px] font-bold text-gray-500 uppercase">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
             {/* Empty start slots */}
             <div className="aspect-square"></div>

             {days.map(day => {
               const isSeventeen = day === 17;
               return (
                 <div key={day} className={`aspect-square flex items-center justify-center text-sm relative group cursor-pointer
                   ${isSeventeen ? 'bg-bitcoin text-white font-bold' : 'bg-white hover:bg-gray-100 text-gray-700'}
                   border border-gray-100 shadow-sm
                 `}>
                   {day}
                 </div>
               )
             })}
          </div>
          
          <div className="flex gap-4 mt-4 text-[10px] text-gray-600">
             <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-bitcoin"></span> RSVP'd</div>
             <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-black"></span> Saved</div>
             <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Deadline</div>
          </div>
        </div>

        {/* Right Side: Upcoming Events List (Empty State in screenshot) */}
        <div className="flex flex-col">
          <h3 className="font-header font-bold text-lg uppercase mb-4">Upcoming Events</h3>
          <div className="flex-1 bg-gray-50 border border-gray-200 flex flex-col items-center justify-center p-8 mb-4 border-dashed border-2">
             <p className="text-gray-500 mb-4">No upcoming events selected</p>
             <button className="border-2 border-black px-6 py-2 font-bold uppercase text-xs hover:bg-black hover:text-white transition-colors">
               Explore Events
             </button>
          </div>
          <button className="w-full border border-black py-3 font-bold uppercase text-xs hover:bg-black hover:text-white transition-colors">
            Browse All Events
          </button>
        </div>
      </div>
    </section>
    </ComingSoonOverlay>
  );
};

export default CalendarSection;