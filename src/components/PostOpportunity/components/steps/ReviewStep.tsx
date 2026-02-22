
import React from 'react';
import { FormData } from '../../types';
import useAuthStore from '@/hooks/use-auth';
import { useOrganizationStore } from '@/hooks/use-organization';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface StepProps {
  data: FormData;
  update: (updates: Partial<FormData>) => void;
}

const ReviewStep: React.FC<StepProps> = ({ data, update }) => {
  const nav = useNavigate()
  const {token}= useAuthStore()
  const { postOpportunity } = useOrganizationStore()
  const { toasts, dismiss, toast } = useToast()
  const onSubmit = async () => {
    if (data.location.type == 'Remote') {
      data.location.text = 'Remote'
    }
    postOpportunity(data, token)
    toast({
      title: "Job Created",
      description: "Opportunity Created - Successful ",
    });
    setTimeout(()=>{
      nav("/opportunity")
    },500)
   
  }
  const checklist = [
    { label: 'Title specified', checked: !!data.title },
    { label: 'Type selected', checked: !!data.type },
    { label: 'Summary written', checked: !!data.summary },
    { label: 'Full description added', checked: data.description.length > 200 },
    { label: 'Skills specified', checked: data.categories.length > 0 },
  ];

  const finishedCount = checklist.filter(item => item.checked).length;
  const totalCount = checklist.length
  const clarityScore = (finishedCount / totalCount) * 100
  return (
    <div className="p-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-orange-500 text-white w-6 h-6 flex items-center justify-center font-bold text-xs">5</div>
        <h2 className="text-sm font-bold uppercase tracking-widest">REVIEW</h2>
      </div>
      
      <hr className="mb-8 border-gray-300" />

      {/* Clarity Score Card */}
      {/* <div className="border border-gray-300 rounded-sm p-6 mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-800 mb-1">CLARITY SCORE</h4>
            <p className="text-[10px] text-gray-400">How clearly is this opportunity defined?</p>
          </div>
          <div className="text-right">
            <span className="text-4xl font-bold text-red-500">{clarityScore}%</span>
            <p className="text-[10px] text-red-500 font-bold uppercase">Incomplete</p>
          </div>
        </div>
        <div className="w-full h-1 bg-gray-100 rounded-full">
          <div className={`w-[${clarityScore}%] h-full bg-red-500 rounded-full`}></div>
        </div>
      </div> */}

      {/* Quick Improvements */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-800 mb-4 tracking-widest">
          <i className="fa-regular fa-lightbulb text-orange-500"></i>
          QUICK IMPROVEMENTS
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="border border-orange-100 bg-orange-50/30 p-3 text-[11px] text-orange-800 flex gap-3 items-center">
            <i className="fa-regular fa-circle-exclamation text-orange-400"></i>
            Add a more descriptive, outcome-oriented title
          </div>
          <div className="border border-orange-100 bg-orange-50/30 p-3 text-[11px] text-orange-800 flex gap-3 items-center">
            <i className="fa-regular fa-circle-exclamation text-orange-400"></i>
            Write a clearer one-sentence summary for search visibility
          </div>
          <div className="border border-orange-100 bg-orange-50/30 p-3 text-[11px] text-orange-800 flex gap-3 items-center">
            <i className="fa-regular fa-circle-exclamation text-orange-400"></i>
            Add more detail to the full description to help builders understand the scope
          </div>
        </div>
      </div>

      {/* Completion Checklist */}
      <div className="mb-8">
        <label className="block text-[11px] font-bold uppercase mb-4 text-gray-800 tracking-wider">COMPLETION CHECKLIST</label>
        <div className="flex flex-col gap-3">
          {checklist.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-gray-600">
              <div className={`w-4 h-4 border-2 flex items-center justify-center ${item.checked ? 'bg-orange-500 border-orange-500' : 'border-gray-300'}`}>
                {item.checked && <i className="fa-solid fa-check text-white text-[10px]"></i>}
              </div>
              <span className="text-[12px] font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-[10px] text-gray-400 font-medium italic">This opportunity will be live immediately after publishing.</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <button className="w-full bg-orange-300 text-white font-bold text-xs uppercase py-3 tracking-widest flex items-center justify-center gap-2 transition-colors cursor-not-allowed">
          <i className="fa-solid fa-paper-plane"></i>
          PUBLISH OPPORTUNITY
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="border-2 border-black font-bold text-xs uppercase py-3 flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all">
            <i className="fa-regular fa-floppy-disk"></i>
            SAVE DRAFT
          </button>
          <button className="bg-gray-500 text-white font-bold text-xs uppercase py-3 flex items-center justify-center gap-2 hover:bg-black transition-all" onClick={onSubmit}>
            <i className="fa-regular fa-star"></i>
            PUBLISH NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
