
import React from 'react';
import { Plus, Calendar, Briefcase } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer>
      {/* Ready to Contribute CTA Section */}
      <div className="bg-black text-white pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Ready to contribute?</h2>
          <p className="text-zinc-500 max-w-xl mx-auto mb-16 text-sm font-medium leading-relaxed uppercase tracking-tight">
            Whether you're hosting an event, building a company, or looking for your next opportunity — Bitcoin Culture Hub is where it starts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            <div className="border border-zinc-800 p-8 flex flex-col items-center group cursor-pointer hover:bg-zinc-900 transition-colors">
              <Plus className="w-6 h-6 text-orange-500 mb-6" />
              <h3 className="font-bold uppercase text-xs mb-3 tracking-widest">Create Organization</h3>
              <p className="text-zinc-500 text-[11px] uppercase leading-tight">Start a hub for your startup, community, or meetup group.</p>
            </div>
            
            <div className="border border-zinc-800 p-8 flex flex-col items-center group cursor-pointer hover:bg-zinc-900 transition-colors">
              <Calendar className="w-6 h-6 text-orange-500 mb-6" />
              <h3 className="font-bold uppercase text-xs mb-3 tracking-widest">Host an Event</h3>
              <p className="text-zinc-500 text-[11px] uppercase leading-tight">List your conference, meetup, or online gathering.</p>
            </div>

            <div className="border border-zinc-800 p-8 flex flex-col items-center group cursor-pointer hover:bg-zinc-900 transition-colors">
              <Briefcase className="w-6 h-6 text-orange-500 mb-6" />
              <h3 className="font-bold uppercase text-xs mb-3 tracking-widest">Post Opportunity</h3>
              <p className="text-zinc-500 text-[11px] uppercase leading-tight">Find talent for jobs, bounties, or contributor roles.</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Not sure where to start?</p>
            <button className="bg-white text-black px-8 py-3 font-bold uppercase text-xs hover:bg-zinc-200 transition-colors">
              Create your profile
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="bg-black text-white py-20 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-1">
            <h4 className="font-black text-sm uppercase mb-6 tracking-tighter">Bitcoin Culture Hub</h4>
            <p className="text-zinc-500 text-xs font-medium leading-relaxed max-w-[200px]">
              The operating system for Bitcoin culture. Connect with organizations, discover events, and find opportunities.
            </p>
          </div>
          
          <div>
            <h5 className="text-[10px] font-black uppercase text-zinc-300 mb-6 tracking-[0.2em]">Platform</h5>
            <ul className="space-y-4 text-xs font-bold text-zinc-500 uppercase tracking-tight">
              <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Organizations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Opportunities</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-black uppercase text-zinc-300 mb-6 tracking-[0.2em]">Resources</h5>
            <ul className="space-y-4 text-xs font-bold text-zinc-500 uppercase tracking-tight">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Create Event</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Post Opportunity</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-black uppercase text-zinc-300 mb-6 tracking-[0.2em]">Legal</h5>
            <ul className="space-y-4 text-xs font-bold text-zinc-500 uppercase tracking-tight">
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-24 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
          <p>© 2025 Bitcoin Culture Hub. All rights reserved.</p>
          <p>Built for Bitcoiners, by Bitcoiners.</p>
        </div>
      </div>
    </footer>
  );
};
