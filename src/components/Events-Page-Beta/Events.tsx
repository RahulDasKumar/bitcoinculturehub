
import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Calendar, MapPin, Users, Info, ArrowRight, ExternalLink, X, Bookmark, Star, ChevronUp } from 'lucide-react';
import { CONFERENCES, MEETUPS, VIRTUAL_EVENTS } from './data';
import { Event } from './types';
import Header from '../Header';
import FeaturedEventBanner from './FeaturedEventBanner';

const EventPage2: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [plannedMonths, setPlannedMonths] = useState<string[]>(['FEB', 'MAY']);
    const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set(['prague26']));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [interestedEvents, setInterestedEvents] = useState<Set<string>>(new Set());

    const toggleMonth = (month: string) => {
        setPlannedMonths(prev =>
            prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]
        );
    };

    const toggleEvent = (id: string) => {
        const next = new Set(expandedEvents);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setExpandedEvents(next);
    };

    const toggleInterested = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const next = new Set(interestedEvents);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setInterestedEvents(next);
    };

    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    const filteredConferences = useMemo(() => {
        if (!searchQuery) return CONFERENCES;
        const q = searchQuery.toLowerCase();
        return CONFERENCES.filter(c =>
            c.name.toLowerCase().includes(q) ||
            c.location.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q)
        );
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-white text-black selection:bg-orange-100 relative">
            <Header/>
            {/* Drawer Overlay */}
            {isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm transition-opacity"
                    onClick={() => setIsDrawerOpen(false)}
                />
            )}

            {/* Side Drawer */}
            <div className={`
        fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[70] shadow-2xl transition-transform duration-300 ease-in-out
        ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
                <div className="flex flex-col h-full">
                    {/* Drawer Header */}
                    <div className="flex justify-between items-center p-6 border-b border-gray-100">
                        <h2 className="text-xl font-display uppercase tracking-tight">My Year In Bitcoin</h2>
                        <button
                            onClick={() => setIsDrawerOpen(false)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Drawer Content */}
                    <div className="flex-1 overflow-y-auto p-12 flex flex-col items-center justify-start pt-24">
                        <div className="w-20 h-20 bg-gray-50 flex items-center justify-center mb-8 border border-gray-100">
                            <Calendar size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-display uppercase tracking-tight mb-2">Your Year Starts Here</h3>
                        <p className="text-gray-400 text-sm text-center max-w-[280px] leading-relaxed">
                            Save conferences and meetups to build your personal Bitcoin calendar for 2026.
                        </p>

                        {/* List of planned months if any exist */}
                        {plannedMonths.length > 0 && (
                            <div className="mt-12 w-full space-y-3">
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-4 border-b border-gray-50 pb-2">Currently Tracking</div>
                                {plannedMonths.map(m => (
                                    <div key={m} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 group">
                                        <span className="font-bold text-sm tracking-widest">{m} 2026</span>
                                        <button
                                            onClick={() => toggleMonth(m)}
                                            className="text-[10px] font-black uppercase text-gray-300 hover:text-red-500 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <header className="bg-black text-white px-6 pt-24 pb-16">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-6xl md:text-8xl font-display uppercase leading-tight tracking-tighter mb-8">
                        Plan Your Year<br />In Bitcoin
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-10 leading-relaxed">
                        *The canonical calendar for conferences, meetups, and conversations shaping Bitcoin culture.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button className="bg-[#F7931A] hover:bg-orange-500 transition-colors text-white px-8 py-3 font-bold uppercase tracking-wide flex items-center gap-2">
                            Browse Events <ArrowRight size={18} />
                        </button>
                        <div className="bg-white/10 px-8 py-3 text-white border border-white/20 font-bold uppercase tracking-wide cursor-default">
                            2026 Schedule
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-white/10 flex gap-16 md:gap-24 overflow-x-auto no-scrollbar">
                        <div>
                            <div className="text-4xl md:text-5xl font-display">127</div>
                            <div className="text-xs uppercase tracking-widest text-gray-500 mt-2 font-bold">Events Listed</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-display">34</div>
                            <div className="text-xs uppercase tracking-widest text-gray-500 mt-2 font-bold">Cities</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-display">2026</div>
                            <div className="text-xs uppercase tracking-widest text-gray-500 mt-2 font-bold">Calendar Year</div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-12">
                {/* Search Bar */}
                <div className="relative mb-12">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by city, title, or topic"
                        className="w-full bg-gray-50 border border-gray-200 py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-lg"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Planning Status Card */}
                <div className="bg-white border border-gray-100 shadow-sm p-6 md:p-8 mb-16 rounded-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Your 2026 in Bitcoin</div>
                            <h2 className="text-2xl font-display uppercase tracking-tight">
                                <span className="text-[#F7931A]">{plannedMonths.length} of 12</span> Months Planned
                            </h2>
                            <p className="text-gray-500 mt-1">Fill your year with Bitcoin. {12 - plannedMonths.length} months still open.</p>
                        </div>
                        <button className="bg-black text-white px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors">
                            Explore All Events
                        </button>
                    </div>

                    <div className="grid grid-cols-4 md:grid-cols-12 gap-2 mb-4">
                        {months.map(m => (
                            <button
                                key={m}
                                onClick={() => toggleMonth(m)}
                                className={`
                  h-16 flex flex-col items-center justify-center border transition-all relative
                  ${plannedMonths.includes(m)
                                        ? 'bg-[#F7931A] border-[#F7931A] text-white'
                                        : 'bg-gray-50 border-gray-100 text-gray-400 hover:border-gray-300'}
                `}
                            >
                                <span className="text-[10px] font-black">{m}</span>
                                {plannedMonths.includes(m) && (
                                    <div className="mt-1">
                                        <Calendar size={10} fill="white" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gray-300 transition-all duration-500"
                            style={{ width: `${(plannedMonths.length / 12) * 100}%` }}
                        />
                    </div>
                    <div className="flex justify-end mt-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{plannedMonths.length}/12 months</span>
                    </div>
                </div>

                <FeaturedEventBanner/>

                {/* Weekly Section */}
                {/* <section className="mb-20">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-900">This Week in Bitcoin Events</h3>
                        <span className="text-xs text-gray-400 font-bold uppercase">Dec 15-21</span>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-6 flex items-center gap-6 group hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200">
                            <div className="w-12 h-12 bg-white flex items-center justify-center border border-gray-100">
                                <Calendar className="text-gray-400" size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-lg">Bitcoin Atlantis Week</h4>
                                        <p className="text-gray-500 text-sm">Madeira, Portugal</p>
                                    </div>
                                    <div className="text-[#F7931A] text-[10px] font-black uppercase tracking-widest">Starts Thursday</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 flex items-center gap-6 group hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200">
                            <div className="w-12 h-12 bg-white flex items-center justify-center border border-gray-100">
                                <Users className="text-gray-400" size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-lg">Austin Bitcoin Developers</h4>
                                        <p className="text-gray-500 text-sm">Monthly gathering</p>
                                    </div>
                                    <div className="text-orange-600 text-[10px] font-black uppercase tracking-widest">Tuesday 7PM</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 flex items-center gap-6 group hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200">
                            <div className="w-12 h-12 bg-white flex items-center justify-center border border-gray-100">
                                <Info className="text-gray-400" size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-lg">Lightning Dev Chat</h4>
                                        <p className="text-gray-500 text-sm">X Space · 2.4k Interested</p>
                                    </div>
                                    <div className="text-orange-600 text-[10px] font-black uppercase tracking-widest">Friday 3PM UTC</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-xs text-gray-400 italic mt-6">Most Bitcoiners check this once a week to stay oriented.</p>
                </section> */}

                {/* Global Conferences */}
                <section className="mb-24">
                    <h2 className="text-4xl font-display uppercase tracking-tight mb-2">Global Conferences</h2>
                    <p className="text-gray-500 mb-12">The anchor events shaping Bitcoin culture. Plan your year around these gatherings.</p>

                    <div className="space-y-16">
                        {Array.from(new Set(filteredConferences.map(c => c.month))).map((month: string) => (
                            <div key={month}>
                                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-2">
                                    <h3 className="text-[10px] font-black text-[#F7931A] uppercase tracking-[0.2em]">{month}</h3>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">
                                        {month.includes('FEB') ? 'Early year, lower crowds — great for focused networking' :
                                            month.includes('MAY') ? 'Peak builder season — high overlap with developers' :
                                                month.includes('AUG') ? 'August is quieter, more intimate events' :
                                                    'Global South focus — unique perspectives on adoption'}
                                    </span>
                                </div>

                                <div className="space-y-6">
                                    {filteredConferences.filter(c => c.month === month).map(conference => {
                                        const isExpanded = expandedEvents.has(conference.id);
                                        const isInterested = interestedEvents.has(conference.id);
                                        return (
                                            <div
                                                key={conference.id}
                                                className={`border border-gray-100 p-8 transition-all group cursor-pointer ${isExpanded ? 'bg-white border-gray-200 shadow-sm' : 'hover:border-gray-300'}`}
                                                onClick={() => toggleEvent(conference.id)}
                                            >
                                                <div className="flex flex-col md:flex-row gap-8">
                                                    {/* Date Column (Hidden when expanded based on screenshot?) */}
                                                    {!isExpanded && (
                                                        <div className="md:w-32 flex-shrink-0">
                                                            <div className="text-sm font-bold uppercase text-gray-500">{conference.dateRange}</div>
                                                        </div>
                                                    )}

                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex-1">
                                                                {isExpanded && (
                                                                    <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">
                                                                        {conference.dateRange}
                                                                    </div>
                                                                )}
                                                                <h4 className={`text-2xl font-display uppercase transition-colors ${isExpanded ? 'text-[#F7931A]' : 'group-hover:text-[#F7931A]'}`}>
                                                                    {conference.name}
                                                                </h4>
                                                                <div className="flex items-center gap-1.5 text-gray-400 text-sm mt-1 uppercase font-bold tracking-wider">
                                                                    <MapPin size={12} />
                                                                    {conference.location}
                                                                </div>
                                                            </div>
                                                            <div className="flex-shrink-0 ml-4">
                                                                {isExpanded ? <ChevronUp className="text-gray-300" /> : <ChevronDown className="text-gray-300 group-hover:text-gray-500" />}
                                                            </div>
                                                        </div>

                                                        {isExpanded && (
                                                            <div className="mt-6 pt-6 animate-in fade-in slide-in-from-top-2 duration-300" onClick={(e) => e.stopPropagation()}>
                                                                <p className="text-gray-600 leading-relaxed max-w-3xl mb-8">
                                                                    {conference.description}
                                                                </p>

                                                                {/* Tags */}
                                                                <div className="flex flex-wrap gap-2 mb-8">
                                                                    {conference.tags?.map(tag => (
                                                                        <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-sm">
                                                                            {tag}
                                                                        </span>
                                                                    ))}
                                                                </div>

                                                                {/* Action Buttons */}
                                                                <div className="flex flex-wrap items-center gap-6 mb-12">
                                                                    <button
                                                                        className="border border-black px-6 py-3 flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                                                                        onClick={() => toggleMonth(conference.month.split(' ')[0].substring(0, 3).toUpperCase())}
                                                                    >
                                                                        <Bookmark size={14} />
                                                                        Save to My Year
                                                                    </button>
                                                                    <button
                                                                        className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all ${isInterested ? 'text-orange-500' : 'text-gray-400 hover:text-black'}`}
                                                                        onClick={(e) => toggleInterested(conference.id, e)}
                                                                    >
                                                                        <Star size={14} fill={isInterested ? "#F7931A" : "none"} />
                                                                        Interested
                                                                    </button>
                                                                </div>

                                                                {/* Explore More */}
                                                                <div className="pt-8 border-t border-gray-100">
                                                                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-4">Explore More</div>
                                                                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                                                                        <a href="#" className="underline-offset-4 hover:underline decoration-gray-300">More events like this</a>
                                                                        <a href="#" className="underline-offset-4 hover:underline decoration-gray-300">Other events in Europe</a>
                                                                        <a href="#" className="underline-offset-4 hover:underline decoration-gray-300">Popular with builders</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex items-center justify-between border border-dashed border-gray-200 p-6 bg-gray-50/30">
                        <div className="flex items-center gap-4">
                            <Calendar className="text-gray-400" />
                            <div>
                                <div className="text-sm font-bold uppercase">See all of Bitcoin's 150 previous conferences</div>
                                <div className="text-xs text-gray-500">Explore the events that shaped Bitcoin culture</div>
                            </div>
                        </div>
                        <button className="border border-black px-6 py-2 text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                            Explore Archive
                        </button>
                    </div>
                </section>

                {/* Local Meetups */}
                {/* <section className="mb-24">
                    <h2 className="text-4xl font-display uppercase tracking-tight mb-2">Local Meetups</h2>
                    <p className="text-gray-500 mb-12">The recurring rhythm of Bitcoin communities worldwide. Find your local gathering.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {MEETUPS.map(meetup => (
                            <div key={meetup.id} className="border border-gray-100 rounded-sm">
                                <div className="bg-gray-50 p-4 border-b border-gray-100 flex items-center gap-2">
                                    <MapPin size={16} className="text-green-500" />
                                    <h4 className="font-display uppercase text-sm tracking-wide">{meetup.city}</h4>
                                </div>
                                <div className="p-4 space-y-4">
                                    {meetup.schedule.map((item, idx) => (
                                        <div key={idx} className="bg-white p-4 border border-gray-50 flex items-center gap-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                                            <div className="w-12 text-[10px] font-black text-gray-400 uppercase tracking-tighter">{item.day}</div>
                                            <div className="flex-1">
                                                <div className="text-sm font-bold">{item.name}</div>
                                                <div className="text-xs text-gray-400">{item.location} · {item.frequency}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section> */}

                {/* Live & Virtual */}
                {/* <section className="mb-24">
                    <h2 className="text-3xl font-display uppercase tracking-tight mb-2">Live & Virtual</h2>
                    <p className="text-gray-500 mb-8">Ongoing conversations and workshops happening online.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {VIRTUAL_EVENTS.map(v => (
                            <div key={v.id} className="bg-gray-50 border border-transparent hover:border-gray-200 transition-all p-4 flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-50 flex items-center justify-center text-blue-500">
                                    <span className="font-black text-xs">LIVE</span>
                                </div>
                                <div>
                                    <div className="text-sm font-bold">{v.name}</div>
                                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                                        {v.platform} · {v.host}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 bg-orange-50/30 border border-orange-100 p-8 flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-12 h-12 bg-orange-100 flex items-center justify-center text-orange-500 text-2xl font-black rounded-sm">
                            +
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h4 className="text-xs font-black uppercase tracking-widest text-orange-800 mb-1">Hosting an event?</h4>
                            <p className="text-sm text-orange-900/70">
                                Add your event to Bitcoin's most thorough event database and reach the masses of Bitcoiners planning their year.
                            </p>
                        </div>
                        <button className="bg-white border border-gray-200 px-8 py-3 text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all flex items-center gap-2 group">
                            Submit your event <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </section> */}

                {/* For Organizers */}
                <section className="mt-32 pt-20 border-t border-gray-100">
                    <div className="max-w-3xl">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4 block">For Organizers</span>
                        <h2 className="text-5xl font-display uppercase tracking-tighter leading-none mb-8">
                            Where Bitcoin Events Live Year-Round
                        </h2>
                        <p className="text-lg text-gray-500 leading-relaxed mb-12">
                            Your event becomes part of how Bitcoiners plan their year — not just another listing.
                            BCH is where serious planners discover, save, and commit to events months in advance.
                        </p>

                        <div className="flex flex-wrap gap-12 md:gap-20 mb-16">
                            <div>
                                <div className="text-3xl font-display">120+</div>
                                <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-1 font-bold">Conferences Listed</div>
                            </div>
                            <div>
                                <div className="text-3xl font-display">15K+</div>
                                <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-1 font-bold">Monthly Active Planners</div>
                            </div>
                            <div>
                                <div className="text-3xl font-display">4 Months</div>
                                <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-1 font-bold">Avg. Planning Horizon</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                            {[
                                { text: 'Appears in year-long planning views', icon: <ChevronDown size={14} className="-rotate-90" /> },
                                { text: 'Discovered by Bitcoiners planning months ahead', icon: <Calendar size={14} /> },
                                { text: 'Listed alongside global flagship conferences', icon: <MapPin size={14} /> },
                                { text: 'Visibility throughout the entire event lifecycle', icon: <Users size={14} /> }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 bg-gray-50 p-4 border border-gray-100 text-xs font-bold uppercase tracking-tight">
                                    <span className="text-orange-500">{item.icon}</span>
                                    {item.text}
                                </div>
                            ))}
                        </div>

                        <div className="bg-black text-white p-8 mb-12 relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-gray-500">Why BCH over Eventbrite or Luma?</h5>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-sm">
                                    <div className="text-[#F7931A] mt-1 font-bold">✓</div>
                                    <div>Bitcoiners plan here — your audience is already browsing</div>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <div className="text-[#F7931A] mt-1 font-bold">✓</div>
                                    <div>Long-term visibility, not just launch-day traffic</div>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <div className="text-[#F7931A] mt-1 font-bold">✓</div>
                                    <div>Editorial credibility — curated, not crowded</div>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button className="bg-[#F7931A] text-white px-10 py-4 font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-orange-500 transition-all">
                                List Your Event <ArrowRight size={18} />
                            </button>
                            <button className="border border-gray-200 px-10 py-4 font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">
                                Organizer Resources
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-6">
                            Free for community meetups · Flexible pricing for conferences
                        </p>
                    </div>
                </section>
            </main>

            {/* Footer
            <footer className="bg-gray-50 border-t border-gray-100 py-16 px-6">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-black flex items-center justify-center text-white font-black text-sm">₿</div>
                        <span className="font-display uppercase tracking-widest text-lg">BCH Calendar</span>
                    </div>
                    <div className="flex gap-8 text-xs font-black uppercase tracking-widest text-gray-400">
                        <a href="#" className="hover:text-black transition-colors">Archive</a>
                        <a href="#" className="hover:text-black transition-colors">Twitter</a>
                        <a href="#" className="hover:text-black transition-colors">RSS Feed</a>
                        <a href="#" className="hover:text-black transition-colors">Privacy</a>
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        © 2026 Bitcoin Event Directory
                    </div>
                </div>
            </footer> */}

            {/* Floating My Year Widget */}
            <div className="fixed bottom-8 right-8 z-50">
                <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="bg-black text-white px-6 py-3 font-bold uppercase tracking-widest flex items-center gap-3 shadow-2xl hover:scale-105 transition-transform group"
                >
                    <Calendar size={18} className="group-hover:rotate-12 transition-transform" />
                    <span>My Year</span>
                    <span className="bg-[#F7931A] w-5 h-5 flex items-center justify-center rounded-full text-[10px]">
                        {plannedMonths.length}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default EventPage2;
