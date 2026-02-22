
import { ApplicantInformation } from '@/components/types';
import { useOrganizationStore } from '@/hooks/use-organization';
import React, { useState } from 'react';



const DecisionDesk: React.FC = () => {
    const { findUserApplicants, user_applications, updateApplicantStatus, handleOffer } = useOrganizationStore();
    const STAGES = ["applied", "interviewing", "in_progress", "completed","offered"]; 

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

    // accepted offers, allow user to accept or reject
    const accepted_offer = groupedApplicants['offered']

    const handleDecision = async (id: string, decision: 'in_progress' | 'rejected') => {
        console.log('clicking button')
        await handleOffer(id,decision)
    };


    return (
        <section className="mt-20">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <svg className="w-8 h-8 bitcoin-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-4xl font-black tracking-tighter uppercase">Decision Desk</h2>
                </div>

            </div>

            {accepted_offer.length === 0 ? (
                <div className="border-[3px] border-dashed border-gray-200 bg-gray-50/50 py-20 flex flex-col items-center justify-center text-center">
                    <div className="relative mb-6">
                        <svg className="w-20 h-20 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4a2 2 0 012-2m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <div className="absolute -top-2 -right-2 bg-white border-2 border-gray-100 rounded-full p-1">
                            <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-300 mb-2">Inbox Zero</h3>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 max-w-xs leading-loose">
                        No pending offers found in the mempool. Keep building and shipping proof of work to attract opportunities.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {accepted_offer.map((offer) => (
                        <div
                            key={offer.id}
                            className={`relative border-[3px] border-black p-6 bg-white transition-all overflow-hidden ${offer.status !== 'PENDING' ? 'opacity-75 grayscale-[0.5]' : 'hover:translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'
                                }`}
                        >
                            {/* Status Stamps */}
                            {offer.status === 'in_progress' && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] border-4 border-green-500 text-green-500 font-black text-4xl px-4 py-2 uppercase z-10 pointer-events-none bg-white/80 shadow-lg">
                                    Confirmed
                                </div>
                            )}
                            {offer.status === 'rejected' && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[12deg] border-4 border-red-500 text-red-500 font-black text-4xl px-4 py-2 uppercase z-10 pointer-events-none bg-white/80 shadow-lg">
                                    Declined
                                </div>
                            )}

                            <div className="mb-6">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">
                                    {offer.opportunity_type} OFFER
                                </span>
                                <h4 className="text-2xl font-black uppercase leading-tight mb-1">{offer.opportunity_name}</h4>
                            </div>

                            {/* <div className="bg-gray-50 p-3 border border-gray-100 mb-8">
                                <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Remuneration</span>
                                <p className="font-mono text-lg font-bold tracking-tight">{offer.compensation}</p>
                            </div> */}

                            <div className="flex gap-3">
                                <button
                                    disabled={offer.status !== 'offered'}
                                    onClick={() => handleDecision(offer.id, 'in_progress')}
                                    className={`flex-1 py-3 font-black text-xs uppercase tracking-widest transition-all ${offer.status === 'offered'
                                            ? 'bg-black text-white hover:bg-[#f7931a]'
                                            : offer.status === 'ACCEPTED' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleDecision(offer.id, 'rejected')}
                                    className={`px-4 py-3 border-2 border-black font-black text-xs uppercase tracking-widest transition-all ${offer.status === 'offered'
                                            ? 'hover:bg-red-50 hover:text-red-600'
                                            : offer.status === 'REJECTED' ? 'bg-red-500 text-white border-red-500' : 'bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed'
                                        }`}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Persistent Future Slot */}
                    <div className="border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 transition-opacity cursor-help group">
                        <svg className="w-10 h-10 text-gray-200 group-hover:text-black mb-3 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-[9px] font-black uppercase text-gray-300 group-hover:text-black tracking-widest transition-colors">Future Yield Slot</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default DecisionDesk;
