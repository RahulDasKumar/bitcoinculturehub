
import React, { useEffect } from 'react';
import { ArrowLeft, Globe, Users, CheckCircle } from 'lucide-react';
import Badge from './Badge';
import ActionCards from './ActionCards';
import LiveNowTable from './LiveNowTable';
import NetworkSnapshot from './NetworkSnapshot';
import SyncStatus from './SyncStatus';
import ContributorsSection from './ContributorsSection';
import OrganizationSettings from './OrganizationSettings';
import Header from '../Header';
import { useOrganizationStore } from '@/hooks/use-organization';
import useAuthStore from "@/hooks/use-auth";
import { useNavigate, useParams } from 'react-router-dom';

export default function OwnerDashboard() {
  const { orgId } = useParams<{ orgId: string }>();
  const token = useAuthStore((s) => s.token);
  const { opportunities, fetchOrganizationsOpportunity, currentOrganization, fetchOrganizationDashboard, findUserApplicants, fetchOrganizationMembers,organizatonMembers } = useOrganizationStore();
  const nav = useNavigate()
  useEffect(()=>{
    if(!orgId) return
    fetchOrganizationDashboard(orgId,token)
    fetchOrganizationsOpportunity(orgId)
    fetchOrganizationMembers(orgId,token)
  },[])

  if (!currentOrganization) return <div>Loading organization...</div>;

  return (
    <div className="min-h-screen pb-20 bg-[#f9fafb]">
      <Header/>
      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* Back Button */}
        <div className="mb-10 flex">
          <button className="inline-flex items-center gap-3 text-[#4A72B2] hover:text-[#385890] transition-colors group cursor-pointer" onClick={() => nav(-1)}>
            <ArrowLeft size={20} className="text-gray-500 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-[17px] font-medium tracking-tight">Back to Public Page</span>
          </button>
        </div>

        {/* Page Title Section */}
        <header className="mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2 font-inter">Manage {currentOrganization.name}</h1>
          <p className="text-lg text-gray-500 mb-6">Coordinate events, opportunities, chapters, and updates — globally.</p>
          <div className="flex gap-2">
            <Badge variant="outline"><Globe size={10} /> Global Organization</Badge>
            <Badge variant="outline"><Users size={10} /> Student-Led</Badge>
            <Badge variant="orange"><CheckCircle size={10} /> Verified on BCH</Badge>
          </div>
        </header>

        {/* Sections */}
        <ActionCards orgId={orgId} />
        <LiveNowTable opportunities={opportunities} orgId={orgId}/>
        <NetworkSnapshot />
        <SyncStatus />
        <ContributorsSection />
        <OrganizationSettings />
      </main>
    </div>
  );
}
