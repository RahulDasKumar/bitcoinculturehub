import React, { useState, useEffect } from 'react';
import { Organization } from '../types';
import Header from '../Header';
import MemberManagement from './MemberManagement';
import { useOrganizationStore } from '@/hooks/use-organization';

const NetworkAdministration: React.FC = () => {
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);

  const { all_organization, fetchAllOrganizations } = useOrganizationStore();

  useEffect(() => {
    fetchAllOrganizations();
  }, [fetchAllOrganizations]);

  const selectedOrg = all_organization.find(
    (org: Organization) => org.id === selectedOrgId
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-inter">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-16">

          {/* ALL ORGANIZATIONS */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-black uppercase">ALL ORGANIZATIONS</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                  TRUSTED BY BUILDERS WORLDWIDE
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {all_organization.map((org) => (
                <button
                  key={org.id}
                  onClick={() =>
                    setSelectedOrgId(selectedOrgId === org.id ? null : org.id)
                  }
                  className={`aspect-square border flex flex-col items-center justify-center p-6 transition-all ${selectedOrgId === org.id
                      ? 'border-black bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                      : 'border-gray-100 bg-white hover:border-gray-200'
                    }`}
                >
                  <div className="w-14 h-14 mb-4 flex items-center justify-center text-xl font-black bg-black text-white">
                    {org.name.charAt(0)}
                  </div>
                  <span className="text-[10px] font-black uppercase text-center">
                    {org.name}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* MEMBER MANAGEMENT */}
          {selectedOrg && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-300">
              <MemberManagement org={selectedOrg} />
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default NetworkAdministration;
