import React, { useEffect, useState } from 'react';
import SectionHeader from './ui/SectionHeader';
import { Briefcase, Plus } from 'lucide-react';
import { useOrganizationStore } from '@/hooks/use-organization';
import Loader from './ui/Loader';
import { ApplicantInformation } from '@/components/types';

const PipelineSection: React.FC = () => {
  const { findUserApplicants, user_applications } = useOrganizationStore();
  const [loading, setLoading] = useState(true);

  const STAGES = ["applied", "IN_PROGRESS", "completed"]; // hardcoded stages

  // Group applicants by status
  const groupedApplicants: Record<string, ApplicantInformation[]> = STAGES.reduce((acc, stage) => {
    acc[stage] = [];
    return acc;
  }, {} as Record<string, ApplicantInformation[]>);

  user_applications.forEach(app => {
    if (STAGES.includes(app.status)) {
      groupedApplicants[app.status].push(app);
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await findUserApplicants(); // populate user_applications
      } catch (error) {
        console.error("Failed to fetch user applications", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <section className="mb-12"><Loader /></section>;

  const getStatusColor = (stage: string) => {
    switch (stage) {
      case 'applied': return 'bg-yellow-400';
      case 'IN_PROGRESS': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <section className="mb-12">
      <SectionHeader
        icon={Briefcase}
        title="Opportunities Pipeline"
        rightElement={
          <button className="flex items-center gap-2 border border-black px-4 py-1.5 text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors">
            <Plus className="w-3 h-3" /> Browse Opportunities
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAGES.map(stage => {
          const applicants = groupedApplicants[stage] || [];

          return (
            <div key={stage} className="flex flex-col">
              {/* Column Header */}
              <div className="flex justify-between items-center mb-3 pb-1 border-b-2 border-gray-100">
                <h3 className="font-header font-bold uppercase text-sm">{stage.replace('_', ' ')}</h3>
                <span className="text-xs font-bold text-gray-400">{applicants.length}</span>
              </div>

              {/* Cards */}
              <div className="space-y-3">
                {applicants.map(app => (
                  <div key={app.opportunity_id} className="border border-black p-3 bg-white hover:shadow-md transition-shadow cursor-pointer relative group">
                    {/* Status Color Line */}
                    <div className={`absolute top-0 left-0 w-1 h-full ${getStatusColor(stage)}`}></div>

                    <div className="pl-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm leading-tight">{app.opportunity_name}</h4>
                        <span className="text-[10px] font-bold text-gray-400">{app.opportunity_name}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 mb-3">{app.opportunity_type}</p>
                    </div>
                  </div>
                ))}

                {applicants.length === 0 && (
                  <div className="border border-dashed border-gray-300 p-4 text-center text-xs text-gray-400 h-24 flex items-center justify-center">
                    Empty
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PipelineSection;
