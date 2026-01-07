
import React from 'react';
import { Calendar, Megaphone, Plus } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { useNavigate } from 'react-router-dom';

const ActionCards = ({orgId}) => {

  const nav = useNavigate()
  return <>
  <section className="mb-16">
    <SectionHeader title="What Would You Like to Do?" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <button className="flex flex-col items-start p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
        <div className="p-3 bg-orange-50 rounded-lg text-orange-500 mb-4 group-hover:scale-110 transition-transform">
          <Calendar size={24} />
        </div>
        <h3 className="font-bold text-gray-900 mb-1 text-left">Create Event</h3>
        <p className="text-sm text-gray-500 text-left">Host a campus meetup, summit, or virtual session</p>
      </button>
      <button className="flex flex-col items-start p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
        <div className="p-3 bg-orange-50 rounded-lg text-orange-500 mb-4 group-hover:scale-110 transition-transform">
          <Megaphone size={24} />
        </div>
        <h3 className="font-bold text-gray-900 mb-1 text-left">Post Announcement</h3>
        <p className="text-sm text-gray-500 text-left">Share updates with the global student network</p>
      </button>
      <button className="flex flex-col items-start p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow group" onClick={()=>nav(`/post-opportunity/${orgId}`)}>
        <div className="p-3 bg-orange-50 rounded-lg text-orange-500 mb-4 group-hover:scale-110 transition-transform">
          <Plus size={24} />
        </div>
        <h3 className="font-bold text-gray-900 mb-1 text-left">Post Opportunity</h3>
        <p className="text-sm text-gray-500 text-left">Recruit volunteers, interns, speakers, or contributors</p>
      </button>
    </div>
  </section>
  </>
}

export default ActionCards;
