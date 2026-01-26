
import React, { useEffect } from 'react';
import { Hero } from './Hero';
import { SectionHeader } from './SectionHeader';
import { OpportunityItem } from './OpportunityItem';
import { OrganizationCard } from './OrganizationCard';
import { EventCard } from './EventCard';
import { Footer } from './Footer';
import { OPPORTUNITIES, ORGANIZATIONS } from './constants';
import Header from '../Header';
import { useOrganizationStore } from '@/hooks/use-organization';
import OpportunityCard from '../OpportunityComponents/OpportunityCard';
const Homepage: React.FC = () => {

  const {all_opportunities, fetchAllOpportunity,findUserApplicants,user_applications}= useOrganizationStore()
  const appliedOpportunityIds = new Set(
    user_applications.map((app) => String(app.opportunity_id))
  );
      useEffect(()=>{
          fetchAllOpportunity()
          findUserApplicants()
      }, [])
  const homepageOpportunities = all_opportunities.slice(0,3)

  return (
    <div className="min-h-screen bg-white">
      <Header/>
      <Hero />
      
      <main className="max-w-6xl mx-auto px-6 space-y-32 py-24">
        {/* Opportunities Section */}
        <section id="opportunities">
          <SectionHeader 
            title="Opportunities" 
            subtitle="Jobs, bounties, and roles for contributors at every level."
            buttonText="Post an Opportunity"
          />
          <div className="space-y-4 mb-8">
            {homepageOpportunities.map((opp) => {
              const hasApplied = appliedOpportunityIds.has(String(opp.id));
              return (
                <OpportunityCard opportunity={opp} hasApplied={hasApplied}/>)
})}
          </div>
          <div className="flex justify-end">
            <button className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-orange-500 transition-colors">
              View All Opportunities <span>→</span>
            </button>
          </div>
        </section>

        {/* Organizations Section */}
        <section id="organizations">
          <SectionHeader 
            title="Organizations" 
            subtitle="Startups, clubs, and communities building on Bitcoin."
            buttonText="Create an Organization"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {ORGANIZATIONS.map(org => (
              <OrganizationCard key={org.id} org={org} />
            ))}
          </div>
          <div className="flex justify-end">
            <button className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-orange-500 transition-colors">
              View All Organizations <span>→</span>
            </button>
          </div>
        </section>

        {/* Events Section */}
        {/* <section id="events">
          <SectionHeader 
            title="Upcoming Events" 
            subtitle="Conferences, meetups, and conversations shaping Bitcoin culture."
            buttonText="List your Event"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {EVENTS.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="flex justify-end">
            <button className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-orange-500 transition-colors">
              View All Events <span>→</span>
            </button>
          </div>
        </section> */}
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;
