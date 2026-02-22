import React, { useState, useMemo, useEffect } from 'react';
import { useOpportunity } from '@/hooks/use-opportunity';

export interface InterviewSlot {
    id: string;
    company: string;
    role: string;
    date: Date;
    time: string;
    opportunity_id: string;
    applicant_id: string;
}

interface SchedulerProps {
    onBook?: (slot: InterviewSlot) => void;
}

interface CompanyGroup {
    company: string;
    role: string;
    slots: InterviewSlot[];
    opportunity_id: string;
}

const Scheduler: React.FC<SchedulerProps> = ({ onBook }) => {
    const [expandedCompany, setExpandedCompany] = useState<string | null>(null);
    const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
    const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [booking, setBooking] = useState(false);

    const { pendingInterviews, getPendingInterviews, selectInterviewTime, loading } = useOpportunity();

    // Load pending interviews on mount
    useEffect(() => {
        getPendingInterviews();
    }, []);
    console.log(pendingInterviews, 'inside the scheduler component')
    // Transform backend data to frontend format
    const transformedSlots: InterviewSlot[] = useMemo(() => {
        return pendingInterviews.map(interview => {
            const interviewDate = new Date(interview.interview_datetime);
            return {
                id: interview.id,
                company: interview.org_name, // Placeholder - will be populated with real data
                role: interview.opportunity_title, // Placeholder - will be populated with real data
                date: interviewDate,
                time: interviewDate.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                }) + ' CST',
                opportunity_id: interview.opportunity_id,
                applicant_id: interview.applicant_id
            };
        });
    }, [pendingInterviews]);

    // Group slots by opportunity_id (which represents company/role combination)
    const companiesWithSlots = useMemo(() => {
        const groups: Record<string, CompanyGroup> = {};
        transformedSlots.forEach(slot => {
            const key = slot.opportunity_id; // Group by opportunity
            if (!groups[key]) {
                groups[key] = {
                    company: slot.company,
                    role: slot.role,
                    slots: [],
                    opportunity_id: slot.opportunity_id
                };
            }
            groups[key].slots.push(slot);
        });
        return Object.values(groups);
    }, [transformedSlots]);

    const handleExpandCompany = (opportunityId: string) => {
        const isCollapsing = expandedCompany === opportunityId;
        setExpandedCompany(isCollapsing ? null : opportunityId);
        setSelectedDateKey(null);
        setSelectedSlotId(null);
    };

    // Auto-select first date when expanded
    useEffect(() => {
        if (expandedCompany) {
            const companyGroup = companiesWithSlots.find(g => g.opportunity_id === expandedCompany);
            if (companyGroup) {
                const groupedSlots: Record<string, { date: Date; slots: InterviewSlot[] }> = {};
                companyGroup.slots.forEach(slot => {
                    const key = slot.date.toDateString();
                    if (!groupedSlots[key]) {
                        groupedSlots[key] = { date: slot.date, slots: [] };
                    }
                    groupedSlots[key].slots.push(slot);
                });

                const dateKeys = Object.keys(groupedSlots).sort((a, b) =>
                    new Date(a).getTime() - new Date(b).getTime()
                );

                if (dateKeys.length > 0 && !selectedDateKey) {
                    setSelectedDateKey(dateKeys[0]);
                }
            }
        }
    }, [expandedCompany, companiesWithSlots, selectedDateKey]);

    // Success screen
    if (isSuccess) {
        const bookedSlot = transformedSlots.find(s => s.id === selectedSlotId);
        return (
            <div className="bg-white border-[3px] border-black p-8 text-center animate-in zoom-in-95 duration-300">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">Transmission Locked</h3>
                <p className="text-gray-500 font-medium mb-8">
                    Your interview is confirmed for<br />
                    <span className="text-black font-black uppercase">{bookedSlot?.date.toLocaleDateString()} @ {bookedSlot?.time}</span>
                </p>
                <button
                    onClick={() => {
                        setIsSuccess(false);
                        setExpandedCompany(null);
                        getPendingInterviews(); // Refresh the list
                    }}
                    className="bg-black text-white px-8 py-3 font-black uppercase tracking-widest text-xs hover:bg-[#f7931a] transition-all"
                >
                    Return to Dashboard
                </button>
            </div>
        );
    }

    // Loading state
    if (loading && pendingInterviews.length === 0) {
        return (
            <div className="bg-white border-[3px] border-black p-12 text-center">
                <div className="w-12 h-12 border-4 border-[#f7931a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Loading Interviews...</p>
            </div>
        );
    }

    // No pending interviews
    if (companiesWithSlots.length === 0) {
        return (
            <div className="bg-white border-[3px] border-black p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">No Pending Interviews</h3>
                <p className="text-gray-500 text-sm">You don't have any interview invitations at the moment.</p>
            </div>
        );
    }

    // Main view - list of companies
    return (
        <div className="space-y-4">
            {companiesWithSlots.map((companyGroup) => {
                const { company, role, slots: companySlots, opportunity_id } = companyGroup;
                const isExpanded = expandedCompany === opportunity_id;

                // Group company's slots by date - moved calculation outside of hooks
                const groupedSlots: Record<string, { date: Date; slots: InterviewSlot[] }> = {};
                companySlots.forEach(slot => {
                    const key = slot.date.toDateString();
                    if (!groupedSlots[key]) {
                        groupedSlots[key] = { date: slot.date, slots: [] };
                    }
                    groupedSlots[key].slots.push(slot);
                });

                const dateKeys = Object.keys(groupedSlots).sort((a, b) =>
                    new Date(a).getTime() - new Date(b).getTime()
                );

                const handleBooking = async () => {
                    if (!selectedSlotId || booking) return;

                    const slot = companySlots.find(s => s.id === selectedSlotId);
                    if (!slot) return;

                    setBooking(true);
                    try {
                        // Call the API to book the interview
                        await selectInterviewTime(selectedSlotId, opportunity_id);

                        if (onBook) onBook(slot);
                        setIsSuccess(true);
                    } catch (error) {
                        console.error('Failed to book interview:', error);
                        alert('Failed to book interview. Please try again.');
                    } finally {
                        setBooking(false);
                    }
                };

                // Collapsed card view
                if (!isExpanded) {
                    return (
                        <div
                            key={opportunity_id}
                            onClick={() => handleExpandCompany(opportunity_id)}
                            className="group relative border-[3px] border-black bg-white p-1 cursor-pointer transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(247,147,26,1)]"
                        >
                            <div className="border-[1px] border-black p-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-gray-50/50">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-[#f7931a] flex items-center justify-center rounded-sm shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <span className="text-2xl font-black text-white">{company.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f7931a] mb-1 block">Inbound Transmission</span>
                                        <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">{company}</h3>
                                        <p className="text-gray-500 font-medium text-sm mt-2">
                                            <span className="font-black">{role}</span> • {companySlots.length} available slot{companySlots.length > 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    className="bg-black text-white px-10 py-4 font-black uppercase tracking-widest text-sm hover:bg-[#f7931a] transition-all flex items-center gap-4 group-hover:scale-105"
                                >
                                    Schedule Now
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </button>
                            </div>
                            <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
                                <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-48 h-1 bg-[#f7931a] rotate-45 opacity-50"></div>
                                <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-48 h-1 bg-[#f7931a] rotate-45 translate-y-4 opacity-30"></div>
                            </div>
                        </div>
                    );
                }

                // Expanded card view
                return (
                    <div key={opportunity_id} className="bg-white border-[3px] border-black overflow-hidden flex flex-col md:flex-row min-h-[500px] animate-in fade-in zoom-in-95 duration-300">
                        {/* Left Panel: Context */}
                        <div className="md:w-1/3 bg-black text-white p-8 flex flex-col justify-between border-b-[3px] md:border-b-0 md:border-r-[3px] border-black">
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-12 rounded-full border-2 border-[#f7931a] overflow-hidden bg-gray-800 flex items-center justify-center">
                                        <span className="text-xl font-black text-[#f7931a]">{company.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#f7931a]">Company</p>
                                        <h4 className="text-xl font-black uppercase tracking-tight">{company}</h4>
                                    </div>
                                </div>
                                <h2 className="text-4xl font-black uppercase tracking-tighter leading-none mb-4">Select Your Block</h2>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    Choose a synchronization window for your <span className="text-white font-bold">{role}</span> interview.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-xs font-bold text-gray-300">
                                        <svg className="w-4 h-4 text-[#f7931a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        30 MINUTE TRANSMISSION
                                    </div>
                                    <div className="flex items-center gap-3 text-xs font-bold text-gray-300">
                                        <svg className="w-4 h-4 text-[#f7931a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                        VIDEO CONFERENCE (P2P)
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleExpandCompany(opportunity_id)}
                                    className="mt-8 w-full py-3 border-2 border-white/20 hover:bg-white/10 text-white font-black uppercase tracking-widest text-xs transition-all"
                                >
                                    ← Minimize
                                </button>
                            </div>
                        </div>

                        {/* Right Panel: Picker */}
                        <div className="flex-1 p-8 flex flex-col bg-gray-50/30">
                            <div className="flex-1">
                                {/* Step 1: Date Picker */}
                                <div className="mb-10">
                                    <h5 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-4">Step 1: Pick a Date</h5>
                                    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                                        {dateKeys.map(key => {
                                            const isSelected = selectedDateKey === key;
                                            const dateObj = groupedSlots[key].date;
                                            return (
                                                <button
                                                    key={key}
                                                    onClick={() => {
                                                        setSelectedDateKey(key);
                                                        setSelectedSlotId(null);
                                                    }}
                                                    className={`flex-shrink-0 w-24 h-24 border-2 flex flex-col items-center justify-center transition-all ${isSelected
                                                        ? 'border-black bg-black text-white shadow-[4px_4px_0px_0px_rgba(247,147,26,1)]'
                                                        : 'border-gray-200 bg-white hover:border-black'
                                                        }`}
                                                >
                                                    <span className="text-[10px] font-black uppercase tracking-widest mb-1">
                                                        {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                                                    </span>
                                                    <span className="text-2xl font-black">{dateObj.getDate()}</span>
                                                    <span className="text-[10px] font-bold uppercase">{dateObj.toLocaleDateString('en-US', { month: 'short' })}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Step 2: Time Picker */}
                                {selectedDateKey && (
                                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                        <h5 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-4">Step 2: Pick a Time</h5>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {groupedSlots[selectedDateKey].slots.map(slot => {
                                                const isSelected = selectedSlotId === slot.id;
                                                return (
                                                    <button
                                                        key={slot.id}
                                                        onClick={() => setSelectedSlotId(slot.id)}
                                                        className={`py-4 px-2 border-2 text-center text-xs font-black uppercase tracking-widest transition-all ${isSelected
                                                            ? 'border-[#f7931a] bg-orange-50 text-[#f7931a] ring-2 ring-[#f7931a] ring-inset'
                                                            : 'border-black bg-white hover:bg-gray-100'
                                                            }`}
                                                    >
                                                        {slot.time}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer Actions */}
                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <button
                                    disabled={!selectedSlotId || booking}
                                    onClick={handleBooking}
                                    className={`w-full py-4 font-black uppercase tracking-widest transition-all text-sm flex items-center justify-center gap-3 ${selectedSlotId && !booking
                                        ? 'bg-black text-white hover:bg-[#f7931a] cursor-pointer shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    {booking ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Booking...
                                        </>
                                    ) : selectedSlotId ? (
                                        <>
                                            Finalize Booking
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </>
                                    ) : (
                                        'Select a Timeslot'
                                    )}
                                </button>
                                <p className="text-center text-[10px] font-bold text-gray-400 mt-4 uppercase tracking-widest">
                                    Times displayed in Central Standard Time (CST)
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Scheduler;