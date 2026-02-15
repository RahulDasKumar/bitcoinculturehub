import React, { useState, useEffect } from 'react';
import InterviewCalendarGrid from './InterviewCalendarGrid';
import InterviewSlotPicker from './InterviewSlot';
import { useOpportunity } from '@/hooks/use-opportunity';
export interface InterviewItem {
    id: string;
    company: string;
    role: string;
    date: Date;
    time: string;
    link?: string;
}
const InterviewScheduler: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    
    const { bookedInterviews, getBookedInterviews, loading } = useOpportunity();

    // Load booked interviews on mount
    useEffect(() => {
        getBookedInterviews();
    }, []);

    const confirmedInterviews: InterviewItem[] = bookedInterviews.map(interview => {
        const interviewDate = new Date(interview.interview_datetime);
        return {
            id: interview.id,
            company: 'Bitcoin Company', // Placeholder - will be populated with real data
            role: 'Position', // Placeholder - will be populated with real data
            date: interviewDate,
            time: interviewDate.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }) + ' CST',
            link: undefined // Add if you have meeting links in your backend
        };
    });

    const isSameDay = (d1: Date, d2: Date) =>
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear();

    const getConfirmedOnDate = (date: Date) => confirmedInterviews.filter(i => isSameDay(i.date, date));

    const selectedConfirmed = selectedDate ? getConfirmedOnDate(selectedDate) : [];


    return (
        <section className="mt-20">
            <div className="flex items-center gap-3 mb-8">
                <svg className="w-8 h-8 text-[#f7931a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h2 className="text-4xl font-black tracking-tighter uppercase">Interview Ledger</h2>
                <div className="bg-[#f7931a] text-white px-4 py-2 rounded-full text-sm font-black">
                    {confirmedInterviews.length} Booked
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 border-[3px] border-black p-1 bg-black">
                <InterviewCalendarGrid
                    currentDate={currentDate}
                    selectedDate={selectedDate}
                    onSelectDate={(date) => {
                        setSelectedDate(date);
                    }}
                    onPrevMonth={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                    onNextMonth={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                    getConfirmedOnDate={getConfirmedOnDate}
                />

                <InterviewSlotPicker
                    selectedDate={selectedDate}
                    confirmedInterviews={selectedConfirmed}
                />
            </div>
        </section>
    );
};

export default InterviewScheduler;