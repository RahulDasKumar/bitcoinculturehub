import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useOrganizationStore } from '@/hooks/use-organization';
import { useNavigate } from 'react-router-dom';
import OrganizationCard from '../OpportunityComponents/OrganizationCard';


const OrganizationGrid: React.FC = () => {
    const { all_organization,fetchAllOrganizations} = useOrganizationStore()
    const nav = useNavigate()
    useEffect(()=>{
        fetchAllOrganizations()
    }, [fetchAllOrganizations])
  return (
    <div className="py-12 border-t border-gray-200 mt-12">
        <div className="flex justify-between items-end mb-8">
            <div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-1">All Organizations</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Trusted by builders worldwide</p>
            </div>
              <button className="text-xs font-bold uppercase border border-gray-300 px-3 py-1 hover:bg-black hover:text-white transition-colors flex items-center" onClick={() => { nav('/orgs')}}>
                See All <ArrowRight className="ml-1 w-3 h-3" />
            </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {all_organization.map(org => (
                  <OrganizationCard org={org}/>
            ))}
        </div>
    </div>
  );
};

export default OrganizationGrid;