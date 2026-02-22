
import React from 'react';
export interface InterviewItem {
    id: string;
    company: string;
    role: string;
    date: Date;
    time: string;
    meeting_link?: string;
}

interface InterviewSlotPickerProps {
    selectedDate: Date | null;
    confirmedInterviews: InterviewItem[];
}

const InterviewSlotPicker: React.FC<InterviewSlotPickerProps> = ({
    selectedDate,
    confirmedInterviews,
}) => {
    
    return (
        <div className="w-full lg:w-[400px] bg-white p-6 border-t-[3px] lg:border-t-0 lg:border-l-[3px] border-black flex flex-col">
            <div className="mb-8">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 text-center lg:text-left">Ledger for</h4>
                <p className="text-3xl font-black uppercase tracking-tighter text-center lg:text-left">
                    {selectedDate?.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
            </div>

            <div className="flex-1 space-y-8 overflow-y-auto pr-2 max-h-[500px]">
                {/* Confirmed Interviews */}
                {confirmedInterviews.length > 0 ? (
                    <div>
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-[#f7931a] mb-4 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[#f7931a] rounded-full"></div>
                            Confirmed Transmissions
                        </h5>
                        <div className="space-y-4">
                            {confirmedInterviews.map(interview => (
                                <div key={interview.id} className="border-l-4 border-black pl-4 py-2 bg-gray-50 hover:bg-white transition-colors">
                                    <span className="text-[9px] font-black text-black uppercase tracking-widest block mb-1">
                                        {interview.time}
                                    </span>
                                    <h5 className="text-xl font-black uppercase leading-tight mb-1">{interview.role}</h5>
                                    <p className="text-sm font-bold text-gray-500 mb-4">{interview.company}</p>

                                    {interview.meeting_link && (
                                        <a
                                            href={interview.meeting_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-[#f7931a] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                            Join Call
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-20">
                        <svg className="w-16 h-16 text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs font-black uppercase tracking-widest text-gray-400">Block Empty</p>
                        <p className="text-[10px] font-bold text-gray-300 mt-2 italic px-8">No confirmed sessions recorded for this epoch.</p>
                    </div>
                )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-2">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-center">Protocol Actions</p>
                <button className="w-full border-2 border-black py-3 text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Propose Manual Override
                </button>
            </div>
        </div>
    );
};

export default InterviewSlotPicker;
