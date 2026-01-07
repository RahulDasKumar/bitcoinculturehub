
import React from 'react';
import { Calendar, Megaphone, Eye, Edit2,Trash } from 'lucide-react';
import SectionHeader from './SectionHeader';
import Badge from './Badge';
import { LIVE_ITEMS } from './mockData';
import { Opportunity } from '../types';
import { useToast } from "@/hooks/use-toast";
import { useOrganizationStore } from '@/hooks/use-organization';
import useAuthStore from '@/hooks/use-auth';
interface LiveNowProps {
  opportunities: Opportunity[]
  orgId:string
}

const LiveNowTable: React.FC<LiveNowProps> = ({opportunities,orgId}) => {
  const { deleteOpportunity } = useOrganizationStore()
  const { token } = useAuthStore()
  const handleDelete = (oppId)=>{
    deleteOpportunity(oppId,orgId,token)
  }
  const modifiedOpportunities = opportunities.map(opp=>({...opp, type : 'OPP', status:'LIVE'}))
  return<>
  <section className="mb-16">
    <SectionHeader 
      title="What's Live Right Now" 
      action={<button className="text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest">View All</button>}
    />
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-gray-50 text-gray-500 border-b border-gray-100 font-medium uppercase text-[11px] tracking-wider">
            <th className="px-6 py-4">Type</th>
            <th className="px-6 py-4">Title</th>
            {/* <th className="px-6 py-4">Region</th> */}
            <th className="px-6 py-4">Status</th>
            {/* <th className="px-6 py-4">Engagement</th> */}
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
            {modifiedOpportunities.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <Badge variant="outline">
                  {item.type === 'EVENT' ? <Calendar size={10} /> : <Megaphone size={10} />}
                  {item.type}
                </Badge>
              </td>
              <td className="px-6 py-4 font-bold text-gray-900">{item.title}</td>
              {/* <td className="px-6 py-4 text-gray-500">{item.region}</td> */}
              <td className="px-6 py-4">
                <Badge variant={item.status === 'LIVE' ? 'green' : 'black'}>{item.status}</Badge>
              </td>
              {/* <td className="px-6 py-4 text-gray-500">
                {item.engagement !== '—' ? (
                  <button className="underline decoration-gray-300 hover:text-orange-500">{item.engagement}</button>
                ) : '—'}
              </td> */}
              <td className="px-6 py-4">
                <div className="flex justify-end gap-3 text-gray-400">
                  {item.status === 'DRAFT' ? (
                    <button className="bg-orange-500 text-white px-4 py-1.5 rounded text-[11px] font-black uppercase tracking-widest hover:bg-orange-600 transition-colors">Publish</button>
                  ) : (
                    <>
                      <button className="hover:text-gray-600"><Eye size={18} /></button>
                      <button className="hover:text-gray-600"><Edit2 size={18} /></button>
                          <button className="hover:text-gray-600" onClick={()=>{
                            handleDelete(item.id)
                          }}><Trash size={18}/></button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
  </>
}
export default LiveNowTable;
