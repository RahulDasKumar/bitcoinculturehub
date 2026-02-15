import React, { useState } from "react";
import { X, Calendar, Clock, Send, Trash2 } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useOrganizationStore } from '@/hooks/use-organization';
import { useOpportunity } from "@/hooks/use-opportunity";
interface InterviewSlot {
    date: Date;
    time: string;
}

interface CalendarInviteModalProps {
    isOpen: boolean;
    onClose: () => void;
    token: string;
    applicant_id: string;
    org_id:string,
    opp_id:string
}

const availableHours = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
];

const CalendarInviteModal: React.FC<CalendarInviteModalProps> = ({
    isOpen,
    onClose,
    token,
    applicant_id,
    opp_id,
    org_id
}) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [selectedSlots, setSelectedSlots] = useState<InterviewSlot[]>([]);
    const [sending, setSending] = useState(false);
    const { postInterviewTimes } = useOpportunity()
        const {updateApplicantStatus} = useOrganizationStore();
    if (!isOpen) return null;

    const addSlot = (time: string) => {
        if (!selectedDate) return;

    const combinedDateTime = new Date(selectedDate);
    const [hours, minutes] = time.match(/(\d+):(\d+) (AM|PM)/)!.slice(1, 4);
    let h = parseInt(hours);
    const m = parseInt(minutes);
    const ampm = time.split(" ")[1];

    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;

    combinedDateTime.setHours(h, m, 0, 0);

    const exists = selectedSlots.find(
        slot => slot.date.getTime() === combinedDateTime.getTime()
    );
    if (exists) return;

    setSelectedSlots([...selectedSlots, { date: combinedDateTime, time }]);
    };

    const removeSlot = (index: number) => {
        setSelectedSlots(selectedSlots.filter((_, i) => i !== index));
    };

    const handleSendInterview = async () => {
        if (selectedSlots.length === 0) {
            alert("Please select at least one interview slot.");
            return;
        }

        setSending(true);
        console.log(selectedSlots)

        // post or patch api should go around here
        try {
            await postInterviewTimes(org_id, opp_id, applicant_id, selectedSlots);
            alert("Interview slots sent successfully!");
            onClose();
            setSelectedSlots([]);
        } catch (error) {
            console.error('Failed to send interview slots:', error);
            alert('Failed to send interview invitation. Please try again.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-900">
                            Schedule Interview
                        </h2>
                        <button onClick={onClose}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        {/* Calendar */}
                        <div>
                            <div className="flex items-center mb-3 space-x-2 text-slate-600">
                                <Calendar size={18} />
                                <span className="font-semibold">Select Date</span>
                            </div>
                            <DayPicker
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                disabled={{ before: new Date() }}
                            />
                        </div>

                        {/* Time Slots */}
                        <div>
                            <div className="flex items-center mb-3 space-x-2 text-slate-600">
                                <Clock size={18} />
                                <span className="font-semibold">Select Time</span>
                            </div>

                            {selectedDate ? (
                                <div className="grid grid-cols-2 gap-3">
                                    {availableHours.map((hour) => (
                                        <button
                                            key={hour}
                                            onClick={() => addSlot(hour)}
                                            className="py-2 rounded-xl border border-slate-200 hover:bg-blue-50 hover:border-blue-400 transition-all text-sm font-semibold"
                                        >
                                            {hour}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-slate-400">
                                    Please select a date first.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Selected Slots */}
                    {selectedSlots.length > 0 && (
                        <div className="mt-8">
                            <h3 className="font-semibold mb-3 text-slate-700">
                                Selected Interview Slots
                            </h3>
                            <div className="space-y-2">
                                {selectedSlots.map((slot, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-200"
                                    >
                                        <span className="text-sm font-medium">
                                            {slot.date.toDateString()} — {slot.time}
                                        </span>
                                        <button onClick={() => removeSlot(index)}>
                                            <Trash2 size={16} className="text-red-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Send Button */}
                    <button
                        onClick={handleSendInterview}
                        disabled={sending}
                        className="w-full mt-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition-all flex justify-center items-center space-x-2"
                    >
                        {sending ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Send size={18} />
                                <span>Send Interview Offer</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalendarInviteModal;
