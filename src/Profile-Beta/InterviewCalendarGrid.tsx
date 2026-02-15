
import React from 'react';

export interface InterviewItem {
    id: string;
    company: string;
    role: string;
    date: Date;
    time: string;
    link?: string;
}
interface InterviewCalendarGridProps {
    currentDate: Date;
    selectedDate: Date | null;
    onSelectDate: (date: Date) => void;
    onPrevMonth: () => void;
    onNextMonth: () => void;
    getConfirmedOnDate: (date: Date) => InterviewItem[];
}

const InterviewCalendarGrid: React.FC<InterviewCalendarGridProps> = ({
    currentDate,
    selectedDate,
    onSelectDate,
    onPrevMonth,
    onNextMonth,
    getConfirmedOnDate
}) => {
    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const startOffset = firstDayOfMonth(year, month);
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    return (
        <div className="flex-1 bg-white p-6">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black uppercase tracking-tighter">{monthName} {year}</h3>
                <div className="flex gap-2">
                    <button onClick={onPrevMonth} className="p-2 border-2 border-black hover:bg-black hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={onNextMonth} className="p-2 border-2 border-black hover:bg-black hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-black border border-black">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                    <div key={day} className="bg-gray-50 p-2 text-center text-[10px] font-black tracking-widest text-gray-400">
                        {day}
                    </div>
                ))}

                {Array.from({ length: startOffset }).map((_, i) => (
                    <div key={`empty-${i}`} className="bg-white min-h-[80px]" />
                ))}

                {Array.from({ length: totalDays }).map((_, i) => {
                    const day = i + 1;
                    const date = new Date(year, month, day);
                    const dayConfirmed = getConfirmedOnDate(date);

                    const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === month && selectedDate?.getFullYear() === year;
                    const isToday = new Date().toDateString() === date.toDateString();

                    return (
                        <div
                            key={day}
                            onClick={() => onSelectDate(date)}
                            className={`bg-white min-h-[80px] p-2 cursor-pointer transition-all hover:bg-orange-50 relative group ${isSelected ? 'ring-2 ring-black z-10' : ''
                                }`}
                        >
                            <span className={`text-[11px] font-black ${isToday ? 'bg-black text-white px-1.5 py-0.5' : isSelected ? 'text-black' : 'text-gray-300'
                                }`}>
                                {day < 10 ? `0${day}` : day}
                            </span>

                            <div className="mt-2 space-y-1">
                                {dayConfirmed.map(int => (
                                    <div key={int.id} className="h-1.5 w-full bg-[#f7931a] rounded-full" title={`Confirmed: ${int.company}`} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InterviewCalendarGrid;
