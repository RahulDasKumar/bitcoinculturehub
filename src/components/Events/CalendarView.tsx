import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import EventCard from "./EventCard";

interface CalendarViewProps {
  events: any[];
}

const CalendarView = ({ events }: CalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<"month" | "year">("month");

  const eventsOnSelectedDate = events.filter(event => {
    // Simple date matching - in production, use proper date comparison
    return true; // Show all for now
  });

  return (
    <div className="grid lg:grid-cols-[400px_1fr] gap-6">
      {/* Calendar */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Select a date
            </h3>
            <p className="text-sm text-muted-foreground">
              See events happening on specific days
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("month")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === "month"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode("year")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === "year"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              Year
            </button>
          </div>
        </div>
        {viewMode === "month" ? (
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 12 }, (_, i) => {
              const month = new Date(2025, i, 1);
              return (
                <button
                  key={i}
                  className="p-3 text-sm rounded-lg border border-border hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="font-semibold text-foreground">
                    {month.toLocaleDateString('en-US', { month: 'short' })}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {Math.floor(Math.random() * 10) + 1} events
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </Card>

      {/* Events for selected date */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            {selectedDate ? selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            }) : 'Select a date'}
          </h2>
          <p className="text-muted-foreground">
            {eventsOnSelectedDate.length} event{eventsOnSelectedDate.length !== 1 ? 's' : ''} scheduled
          </p>
        </div>
        <div className="space-y-4">
          {eventsOnSelectedDate.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
