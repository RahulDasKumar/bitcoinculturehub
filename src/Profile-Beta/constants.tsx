import { Event, Opportunity, Proof, Article, PipelineItem, TimelineItem, Goal } from './types';
import { Calendar, Briefcase, Zap, Trophy, Award, Mic, TrendingUp, BookOpen } from 'lucide-react';
import React from 'react';

export const UPCOMING_EVENTS: Event[] = [
  { id: '1', title: 'Bitcoin Art Workshop', date: 'Dec 18, 2:00 PM', type: 'WORKSHOP' },
  { id: '2', title: 'Nashville Meetup', date: 'Dec 20, 7:00 PM', type: 'MEETUP' },
  { id: '3', title: 'Design Sprint Call', date: 'Dec 22, 10:00 AM', type: 'CALL' },
];

export const ACTIVE_OPPORTUNITIES: Opportunity[] = [
  { id: '1', role: 'UI Designer', company: 'Bitcoin Magazine', status: 'APPLIED' },
  { id: '2', role: 'Workshop Facilitator', company: 'PlebLab', status: 'INTERVIEW' },
  { id: '3', role: 'Poster Design', company: 'BTC Conference', status: 'SAVED' },
];

export const RECENT_PROOF: Proof[] = [
  { id: '1', title: 'Nashville Meetup Poster', date: 'Dec 10', sats: 25000 },
  { id: '2', title: 'Workshop Hosting', date: 'Dec 8', sats: 50000 },
  { id: '3', title: 'Logo Design', date: 'Dec 5', sats: 15000 },
];

export const ARTICLES: Article[] = [
  { id: '1', title: 'Understanding Lightning Network Routing', source: 'Bitcoin Magazine', readTime: '8 min', progress: 100 },
  { id: '2', title: 'The Art of Bitcoin Visual Design', source: 'Design Bitcoin', readTime: '12 min', progress: 100 },
  { id: '3', title: 'Building on Nostr: A Developer Guide', source: 'Nostr.how', readTime: '15 min', progress: 65 },
  { id: '4', title: 'Bitcoin Economics for Creatives', source: 'Saylor Academy', readTime: '20 min', progress: 0 },
];

export const FOLLOWING = [
  { name: 'Jack Mallers', handle: '@jackmallers', img: 'https://picsum.photos/40/40?random=1' },
  { name: 'Lyn Alden', handle: '@lynalden', img: 'https://picsum.photos/40/40?random=2' },
  { name: 'Matt Odell', handle: '@matt_odell', img: 'https://picsum.photos/40/40?random=3' },
  { name: 'Gigi', handle: '@dergigi', img: 'https://picsum.photos/40/40?random=4' },
];

export const TOPICS = ['Lightning', 'Art', 'Design', 'Nostr', 'Privacy', 'Self-custody', 'Education'];

export const PIPELINE_DATA: Record<string, PipelineItem[]> = {
  SAVED: [
    { id: '1', role: 'Poster Designer', company: 'BTC Conference', sats: '100k', tags: ['Design', 'Illustration'], status: 'SAVED' },
    { id: '2', role: 'Content Writer', company: 'Bitcoin Magazine', sats: '50k/article', tags: ['Writing', 'Research'], status: 'SAVED' },
  ],
  APPLIED: [
    { id: '3', role: 'UI Designer', company: 'Wallet of Satoshi', sats: '500k', tags: ['UI/UX', 'Figma'], status: 'APPLIED' },
  ],
  IN_PROGRESS: [
    { id: '4', role: 'Workshop Facilitator', company: 'PlebLab', sats: '75k', tags: ['Teaching', 'Bitcoin'], status: 'IN PROGRESS' },
  ],
  COMPLETED: [
    { id: '5', role: 'Logo Design', company: 'Local Meetup', sats: '25k', tags: ['Design'], status: 'COMPLETED' },
    { id: '6', role: 'Event Photography', company: 'Nashville Bitcoin', sats: '30k', tags: ['Photography'], status: 'COMPLETED' },
  ]
};

export const RESUME_PROOF = [
  { title: 'Nashville Meetup Poster Series', date: 'Dec 2024', tag: 'Design' },
  { title: 'Lightning Workshop Host', date: 'Nov 2024', tag: 'Education' },
  { title: 'Bitcoin Art Exhibition', date: 'Oct 2024', tag: 'Event' },
  { title: 'Wallet UI Consultation', date: 'Sep 2024', tag: 'Consulting' },
  { title: 'Conference Volunteer', date: 'Aug 2024', tag: 'Community' },
];

export const RESUME_EVENTS = [
  { title: 'Bitcoin Conference 2024', date: 'Nov 2024', role: 'Speaker' },
  { title: 'Nashville Meetup', date: 'Monthly', role: 'Organizer' },
  { title: 'PlebLab Demo Day', date: 'Oct 2024', role: 'Presenter' },
  { title: 'Art Basel Bitcoin', date: 'Sep 2024', role: 'Exhibitor' },
];

export const SKILLS = [
  { name: 'Visual Design', level: 4 },
  { name: 'Event Organizing', level: 4 },
  { name: 'Lightning Network', level: 3 },
  { name: 'Illustration', level: 3 },
  { name: 'Teaching', level: 2 },
];

export const ARCHIVE_DATA: TimelineItem[] = [
  { id: '1', title: 'Bitcoin Conference 2024', subtitle: "Spoke on 'Bitcoin Art in the Digital Age'", date: 'Nov 14', type: 'event' },
  { id: '2', title: 'First 100k sats earned', date: 'Oct 19', type: 'proof' },
  { id: '3', title: 'PlebLab Hackathon Winner', subtitle: '2nd place for wallet UI concept', date: 'Oct 19', type: 'achievement' },
  { id: '4', title: 'Nashville Meetup Poster Series', date: 'Sep 14', type: 'proof' },
  { id: '5', title: 'Reached Level 5', date: 'Jul 31', type: 'milestone' },
  { id: '6', title: 'First Workshop Hosted', subtitle: 'Intro to Bitcoin Art - 25 attendees', date: 'Jul 9', type: 'event' },
  { id: '7', title: 'Art Basel Bitcoin Exhibition', date: 'Jun 19', type: 'event' },
];

export const GOALS: Record<string, Goal[]> = {
  WEEK: [
    { id: '1', title: 'Host 2 workshops', progress: 50, label: 'Events', icon: 'calendar' },
    { id: '2', title: 'Complete Lightning module', progress: 60, label: 'Lightning', icon: 'zap' }
  ],
  MONTH: [
    { id: '3', title: 'Land 3 paid gigs', progress: 33, label: 'Pipeline', icon: 'briefcase' }
  ],
  YEAR: [
    { id: '4', title: 'Reach Level 10', progress: 80, label: '80% complete', icon: 'trending-up' },
    { id: '5', title: 'Earn 1M sats', progress: 25, label: '25% complete', icon: 'trending-up' }
  ]
};