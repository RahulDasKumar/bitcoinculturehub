import React, { useEffect, useState } from 'react';
import { ArrowLeft, Globe, Users, CheckCircle, ExternalLinkIcon } from 'lucide-react';
import Badge from './Badge';
import ActionCards from './ActionCards';
import LiveNowTable from './LiveNowTable';
import NetworkSnapshot from './NetworkSnapshot';
import SyncStatus from './SyncStatus';
import ContributorsSection from './ContributorsSection';
import OrganizationSettings from './Settings';
import Header from '../Header';
import { useOrganizationStore } from '@/hooks/use-organization';
import useAuthStore from "@/hooks/use-auth";
import { useNavigate, useParams } from 'react-router-dom';
import DetailCard from './DetailCard';
import EditModal from './EditModal';
import SectionHeader from './SectionHeader';
import GenerateInvite  from '../GenerateLinkButton/GenerateInvite';
export default function OwnerDashboard() {
  const { orgId } = useParams<{ orgId: string }>();
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s)=>s.user)
  const nav = useNavigate();
  const isAdmin = user.email == 'dasrkd3@gmail.com'
  console.log(user.email)
  const {
    opportunities,
    fetchOrganizationsOpportunity,
    currentOrganization,
    fetchOrganizationDashboard,
    fetchOrganizationMembers,
    orgPrompts,
    fetchOrgPrompts,
    upsertOrgPrompt
  } = useOrganizationStore();

  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);

  useEffect(() => {
    if (!orgId) return;
    fetchOrganizationDashboard(orgId, token);
    fetchOrganizationsOpportunity(orgId);
    fetchOrganizationMembers(orgId);
    fetchOrgPrompts(orgId, token);
  }, []);

  if (!currentOrganization) return <div>Loading organization...</div>;
  console.log(orgPrompts, ' is the organization ')
  console.log(orgId,orgPrompts)
  const sectionBeingEdited = orgPrompts.find(p => p.prompt_key === editingSectionId) || null;

  const handleSaveSection = async (key: string, newContent: string) => {
    if (!orgId) return;
    const promptToSave = { prompt_key: key, custom_text: newContent };
    await upsertOrgPrompt(orgId, promptToSave, token);
    setEditingSectionId(null);
  };

  return (
    <div className="min-h-screen pb-20 bg-[#f9fafb]">
      <Header />
      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* Back Button */}
        <div className="mb-10 flex">
          <button
            className="inline-flex items-center gap-3 text-[#4A72B2] hover:text-[#385890] transition-colors group cursor-pointer"
            onClick={() => nav(-1)}
          >
            <ArrowLeft size={20} className="text-gray-500 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-[17px] font-medium tracking-tight">Back to Public Page</span>
          </button>
        </div>

        {/* Page Title Section */}
        <header className="mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2 font-inter">
            Manage {currentOrganization.name}
          </h1>
          <p className="text-lg text-gray-500 mb-6">
            Coordinate events, opportunities, chapters, and updates — globally.
          </p>
          <div className="flex gap-2">
            <Badge variant="outline"><Globe size={10} /> Global Organization</Badge>
            <Badge variant="outline"><Users size={10} /> Student-Led</Badge>
            <Badge variant="orange"><CheckCircle size={10} /> Verified on BCH</Badge>
          </div>
          <GenerateInvite orgId={orgId} role={'member'} token={token} />
          {isAdmin && (
            <div className="flex flex-row items-start">
              <p className="text-lg text-gray-500 mb-6">Admin Only</p>
              <GenerateInvite orgId={orgId} role="owner" token={token} />
            </div>
          )}
          
        </header>

        {/* Sections */}
        <ActionCards orgId={orgId} />
        <LiveNowTable opportunities={opportunities} orgId={orgId} />
        {/* <NetworkSnapshot />
        <SyncStatus />
        <ContributorsSection /> */}


        {/* Editable Detail Cards */}
        <SectionHeader
          title="Update Organization Details"
          subtitle='Click any section to edit what appears on your public page'
          
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {orgPrompts.map(section => (
            <DetailCard
              key={section.prompt_key}
              section={section}
              onClick={() => setEditingSectionId(section.prompt_key)}
            />
          ))}
        </div>
        <OrganizationSettings organization={currentOrganization}/>

      </main>
        
      {/* Edit Modal */}
      {sectionBeingEdited && (
        <EditModal
          section={sectionBeingEdited}
          isOpen={!!sectionBeingEdited}
          onClose={() => setEditingSectionId(null)}
          orgID={orgId}
        />
      )}
    </div>
  );
}
