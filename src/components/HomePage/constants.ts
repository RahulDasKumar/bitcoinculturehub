
import { Opportunity, Organization } from '../types';

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    title: 'FRONTEND DEVELOPER',
    type: 'FULL-TIME',
    company: 'Start9',
    description: 'Join our team building sovereign computing solutions. You\'ll work on our flagship Embassy product, creating intuitive interfaces for self-hosting.',
    reward: '$120k - $160k',
    postedAt: '2 days ago',
    location: 'Remote',
    tags: ['React', 'TypeScript', 'Bitcoin']
  },
  {
    id: '2',
    title: 'COMMUNITY MANAGER',
    type: 'PART-TIME',
    company: 'BTC Prague',
    description: 'Help grow Central Europe\'s largest Bitcoin community. Manage social channels, coordinate meetups, and engage with our 2,800+ members.',
    reward: '€2,500/mo',
    postedAt: '1 week ago',
    location: 'Prague',
    tags: ['Community', 'Events', 'Social']
  },
  {
    id: '3',
    title: 'LIGHTNING BOUNTY: LNBITS PLUGIN',
    type: 'BOUNTY',
    company: 'Bitcoin Design Foundation',
    description: 'Build a new extension for LNbits that integrates with existing payment workflows. Open source contribution with bounty paid via Lightning.',
    reward: '500,000 sats',
    postedAt: '3 days ago',
    location: 'Remote',
    tags: ['Lightning', 'Python', 'Open Source']
  }
];

export const ORGANIZATIONS: Organization[] = [
  {
    id: '1',
    name: 'BITCOIN DESIGN FOUNDATION',
    type: 'FOUNDATION',
    description: 'Open-source design for Bitcoin products.',
    location: 'Global',
    members: '450',
    initial: 'B'
  },
  {
    id: '2',
    name: 'START9',
    type: 'STARTUP',
    description: 'Building sovereign computing for everyone.',
    location: 'Denver, USA',
    members: '35',
    initial: 'S'
  },
  {
    id: '3',
    name: 'BTC PRAGUE',
    type: 'COMMUNITY',
    description: 'Central Europe\'s largest Bitcoin community.',
    location: 'Prague, Czechia',
    members: '2,800',
    initial: 'B'
  },
  {
    id: '4',
    name: 'MIAMI BITCOIN CLUB',
    type: 'MEETUP',
    description: 'Weekly meetups and builder sessions in Miami.',
    location: 'Miami, USA',
    members: '1,200',
    initial: 'M'
  }
];

// export const EVENTS: Event[] = [
//   {
//     id: '1',
//     name: 'BITCOIN 2025',
//     isFlagship: true,
//     description: 'The world\'s largest Bitcoin conference returns with 30,000+ attendees.',
//     location: 'Las Vegas, USA',
//     date: 'May 27, 2025'
//   },
//   {
//     id: '2',
//     name: 'BALTIC HONEYBADGER',
//     isFlagship: true,
//     description: 'Europe\'s premier technical Bitcoin conference.',
//     location: 'Riga, Latvia',
//     date: 'Sep 5, 2025'
//   },
//   {
//     id: '3',
//     name: 'ADOPTING BITCOIN',
//     description: 'The definitive conference for Bitcoin builders and circular economies.',
//     location: 'San Salvador, El Salvador',
//     date: 'Nov 15, 2025'
//   },
//   {
//     id: '4',
//     name: 'BITCOIN AMSTERDAM',
//     description: 'Two days of talks, workshops, and networking in Europe\'s cultural capital.',
//     location: 'Amsterdam, Netherlands',
//     date: 'Oct 9, 2025'
//   }
// ];
