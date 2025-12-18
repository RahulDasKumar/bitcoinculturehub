import { useState } from "react";
import { Calendar, MapPin, Globe2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCard from "./EventCard";
import FilterChip from "./FilterChip";
import HappeningNowCard from "./HappeningNowCard";
import PersonalizedOverviewCard from "./PersonalizedOverviewCard";
import ViewTabs from "./ViewTabs";
import SelectorPill from "./SelectorPill";
import CalendarView from "./CalendarView";
import MapView from "./MapView";
import SearchBar from "./SearchBar";
import QuickTimeToggles from "./QuickTimeToggles";
import EventDetailModal from "./EventDetailModal";
import Header from "../Header";

const EventPage = () => {
    const [activeView, setActiveView] = useState<"calendar" | "map">("calendar");
    const [location, setLocation] = useState("New York City");
    const [timeframe, setTimeframe] = useState("This week");
    const [searchQuery, setSearchQuery] = useState("");
    const [quickTimeFilter, setQuickTimeFilter] = useState<"now" | "tonight" | "weekend" | "week" | "month">("week");
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const userName = "Kyle"; // In production, get from auth context

    const formatFilters = ["All", "IRL", "Virtual", "Hybrid", "Drops"];
    const audienceFilters = ["Beginner", "Students", "Builders/Devs", "Collectors", "Educators"];
    const priceFilters = ["Free", "Paid", "Stack sats"];

    const happeningNowEvents = [
        {
            id: 1,
            title: "Bitcoin & Art: Live Discussion",
            platform: "X Spaces",
            status: "Live",
            time: "Now",
        },
        {
            id: 2,
            title: "Lightning Network Deep Dive",
            platform: "YouTube",
            status: "Starting soon",
            time: "Starts in 12 min",
        },
        {
            id: 3,
            title: "Bitcoin NYC Happy Hour",
            platform: "PubKey NYC",
            status: "Starting soon",
            time: "Starts in 45 min",
        },
    ];

    const todayEvents = [
        {
            id: 4,
            title: "Bitcoin Design Workshop",
            date: "Thu",
            time: "7:30 PM",
            location: "Bitcoin Park, Nashville",
            tags: ["IRL", "Meetup", "Free"],
            attending: 23,
            friendsGoing: 3,
            host: "Bitcoin Park",
            type: "meetup",
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
        },
        {
            id: 5,
            title: "Building on Lightning: Developer Workshop",
            date: "Thu",
            time: "9:00 PM",
            location: "Virtual • Zoom",
            tags: ["Virtual", "Workshop", "Student-friendly"],
            attending: 156,
            friendsGoing: 0,
            host: "Lightning Labs",
            type: "virtual",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
        },
    ];

    const tonightEvents = [
        {
            id: 6,
            title: "Bitcoin Culture Hub Launch Party",
            date: "Thu",
            time: "10:00 PM",
            location: "PubKey NYC",
            tags: ["IRL", "Party", "Free"],
            attending: 89,
            friendsGoing: 7,
            host: "BCH Team",
            type: "irl",
            image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
        },
    ];

    const thisWeekendEvents = [
        {
            id: 7,
            title: "Bitcoin Conference 2025",
            date: "Sat-Sun",
            time: "9:00 AM",
            location: "Miami Convention Center",
            tags: ["IRL", "Conference", "Multi-day"],
            attending: 2341,
            friendsGoing: 12,
            host: "Bitcoin Magazine",
            type: "conference",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
        },
        {
            id: 8,
            title: "NFT Art Drop: Bitcoin Ordinals",
            date: "Sat",
            time: "2:00 PM",
            location: "Online • Ordinals",
            tags: ["Drop", "Art", "Limited"],
            attending: 567,
            friendsGoing: 2,
            host: "Bitcoin Artists Collective",
            type: "drop",
            image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=300&fit=crop",
        },
    ];

    const allEvents = [...todayEvents, ...tonightEvents, ...thisWeekendEvents];

    return (
        <div className="min-h-screen bg-background">
            {/* Global Nav */}
            <Header/>
            <div className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-card p-6 hidden lg:block">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-foreground">Bitcoin Culture Hub</h2>
                </div>
                <nav className="space-y-2">
                    <a href="#" className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                        Home
                    </a>
                    <a href="#" className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                        Explore
                    </a>
                    <a href="#" className="block px-4 py-2 bg-accent/10 text-accent font-medium rounded-lg">
                        Events
                    </a>
                    <a href="#" className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                        Marketplace
                    </a>
                    <a href="#" className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                        Community
                    </a>
                </nav>
            </div>

            {/* Main Content */}
            <div className="lg:ml-64">
                <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Enhanced Header */}
                    <div className="mb-8 animate-fade-in">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                            <div className="flex-1">
                                <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3 tracking-tight">
                                    What's happening in Bitcoin, {userName}?
                                </h1>
                                <p className="text-lg text-muted-foreground mb-6">
                                    See live spaces, IRL meetups, conferences, drops, and summits – all in one place.
                                </p>
                                <SearchBar value={searchQuery} onChange={setSearchQuery} />
                            </div>
                            <Button size="lg" className="shadow-md hover:shadow-lg transition-all whitespace-nowrap h-fit">
                                Host an event
                            </Button>
                        </div>

                        {/* Location & Timeframe Selectors */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            <SelectorPill
                                icon={MapPin}
                                label="Browsing"
                                value={location}
                                onClick={() => { }}
                            />
                            <SelectorPill
                                icon={Clock}
                                label="Timeframe"
                                value={timeframe}
                                onClick={() => { }}
                            />
                        </div>

                        {/* View Tabs */}
                        <ViewTabs activeView={activeView} onViewChange={setActiveView} />
                    </div>

                    {/* Content based on active view */}
                    {activeView === "calendar" ? (
                        <div className="animate-fade-in space-y-8">
                            {/* For You Overview Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <PersonalizedOverviewCard
                                    title="Your day in Bitcoin"
                                    description="2 events today • 1 going • 1 recommended"
                                    variant="highlight"
                                />
                                <PersonalizedOverviewCard
                                    title="Your week"
                                    description="5 events this week across your hubs"
                                />
                                <PersonalizedOverviewCard
                                    title="Big moments coming up"
                                    description="BTC Prague • BSN Summit • Halving Week"
                                />
                            </div>

                            {/* Calendar View */}
                            <CalendarView events={allEvents} />

                            {/* All Events Feed Below Calendar */}
                            <div className="space-y-12">
                                {/* Today */}
                                <div>
                                    <h2 className="text-2xl font-semibold text-foreground mb-6">Today</h2>
                                    <div className="space-y-4">
                                        {todayEvents.map((event) => (
                                            <div key={event.id} onClick={() => setSelectedEvent(event)} className="cursor-pointer">
                                                <EventCard event={event} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Tonight */}
                                <div>
                                    <h2 className="text-2xl font-semibold text-foreground mb-6">Tonight</h2>
                                    <div className="space-y-4">
                                        {tonightEvents.map((event) => (
                                            <div key={event.id} onClick={() => setSelectedEvent(event)} className="cursor-pointer">
                                                <EventCard event={event} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* This Weekend */}
                                <div>
                                    <h2 className="text-2xl font-semibold text-foreground mb-6">This Weekend</h2>
                                    <div className="space-y-4">
                                        {thisWeekendEvents.map((event) => (
                                            <div key={event.id} onClick={() => setSelectedEvent(event)} className="cursor-pointer">
                                                <EventCard event={event} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : activeView === "map" ? (
                        <div className="animate-fade-in">
                            <MapView />
                        </div>
                    ) : (
                        <>
                            {/* Happening Now Rail */}
                            <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-foreground">
                                        Live & Starting Soon
                                    </h2>
                                    <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80">
                                        See all
                                    </Button>
                                </div>
                                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                    {happeningNowEvents.map((event) => (
                                        <HappeningNowCard key={event.id} event={event} />
                                    ))}
                                </div>
                            </div>

                            {/* Personalized Overview + Quick Time Toggles */}
                            {activeView === "for-you" && (
                                <>
                                    <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <PersonalizedOverviewCard
                                                title="Your day in Bitcoin"
                                                description="2 events today • 1 going • 1 recommended"
                                                variant="highlight"
                                            />
                                            <PersonalizedOverviewCard
                                                title="Your week"
                                                description="5 events this week across your hubs"
                                            />
                                            <PersonalizedOverviewCard
                                                title="Big moments coming up"
                                                description="BTC Prague • BSN Summit • Halving Week"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-center mb-8 animate-slide-up" style={{ animationDelay: "0.25s" }}>
                                        <QuickTimeToggles
                                            selected={quickTimeFilter}
                                            onSelect={setQuickTimeFilter}
                                        />
                                    </div>
                                </>
                            )}

                            {/* Filter Chips */}
                            <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                                <div className="space-y-3">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs font-medium text-muted-foreground self-center">Format:</span>
                                        {formatFilters.map((filter) => (
                                            <FilterChip key={filter} label={filter} variant="secondary" />
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs font-medium text-muted-foreground self-center">Audience:</span>
                                        {audienceFilters.map((filter) => (
                                            <FilterChip key={filter} label={filter} variant="secondary" />
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs font-medium text-muted-foreground self-center">Price:</span>
                                        {priceFilters.map((filter) => (
                                            <FilterChip key={filter} label={filter} variant="secondary" />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Event Feed */}
                            <div className="space-y-12 animate-slide-up" style={{ animationDelay: "0.4s" }}>
                                {/* Today */}
                                <div>
                                    <h2 className="text-2xl font-semibold text-foreground mb-6">Today</h2>
                                    <div className="space-y-4">
                                        {todayEvents.map((event) => (
                                            <div key={event.id} onClick={() => setSelectedEvent(event)} className="cursor-pointer">
                                                <EventCard event={event} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Tonight */}
                                <div>
                                    <h2 className="text-2xl font-semibold text-foreground mb-6">Tonight</h2>
                                    <div className="space-y-4">
                                        {tonightEvents.map((event) => (
                                            <div key={event.id} onClick={() => setSelectedEvent(event)} className="cursor-pointer">
                                                <EventCard event={event} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* This Weekend */}
                                <div>
                                    <h2 className="text-2xl font-semibold text-foreground mb-6">This Weekend</h2>
                                    <div className="space-y-4">
                                        {thisWeekendEvents.map((event) => (
                                            <div key={event.id} onClick={() => setSelectedEvent(event)} className="cursor-pointer">
                                                <EventCard event={event} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Event Detail Modal */}
                    <EventDetailModal
                        event={selectedEvent || allEvents[0]}
                        open={!!selectedEvent}
                        onOpenChange={(open) => !open && setSelectedEvent(null)}
                        relatedEvents={allEvents.slice(1, 3)}
                    />
                </main>
            </div>
        </div>
    );
};

export default EventPage;
