
import React from 'react';
import { Event } from '../types';
import { MapPin, Calendar } from 'lucide-react';

interface Props {
  event: Event;
}

export const EventCard: React.FC<Props> = ({ event }) => {
  return (
    <div className="border border-zinc-200 p-6 hover:border-zinc-400 transition-colors relative h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-black uppercase tracking-tighter">{event.name}</h3>
        {event.isFlagship && (
          <span className="text-[9px] font-bold px-1.5 py-0.5 border border-orange-100 bg-orange-50 text-orange-600 uppercase tracking-widest">
            Flagship
          </span>
        )}
      </div>

      <p className="text-zinc-600 text-sm mb-6 flex-grow leading-relaxed">
        {event.description}
      </p>

      <div className="flex items-center gap-4 text-zinc-400 text-[11px] font-bold uppercase mt-auto">
        <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {event.location}</span>
        <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {event.date}</span>
      </div>
    </div>
  );
};
