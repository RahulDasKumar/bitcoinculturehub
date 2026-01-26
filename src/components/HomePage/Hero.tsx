
import React from 'react';
import { Calendar, Building2, Briefcase } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="bg-black text-white pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
          Bitcoin happens here
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-12 font-medium leading-relaxed">
          Connect with organizations, discover events, and find opportunities in the Bitcoin ecosystem. Build your reputation through proof of work.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-24">
          <button className="bg-white text-black px-8 py-3 font-bold uppercase flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors">
            Find Opportunities <span className="text-lg">→</span>
          </button>
          <button className="border border-white text-white px-8 py-3 font-bold uppercase hover:bg-white hover:text-black transition-all">
            Explore Events
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-wide mb-1">Events</h3>
              <p className="text-zinc-500 text-sm leading-snug">
                Conferences, meetups, and conversations shaping Bitcoin culture.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-wide mb-1">Organizations</h3>
              <p className="text-zinc-500 text-sm leading-snug">
                Startups, clubs, and communities building on Bitcoin.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-wide mb-1">Opportunities</h3>
              <p className="text-zinc-500 text-sm leading-snug">
                Jobs, bounties, and roles for contributors at every level.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
