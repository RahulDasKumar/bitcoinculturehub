
import { Event, Meetup, VirtualEvent } from './types';

export const CONFERENCES: Event[] = [
    {
        id: 'ba26',
        name: 'BITCOIN ATLANTIS',
        location: 'FUNCHAL, PORTUGAL',
        dateRange: 'FEB 6-8',
        month: 'FEBRUARY 2026',
        type: 'conference',
        tags: ['CULTURE', 'ADOPTION', 'EUROPE'],
        description: 'The premier European Bitcoin gathering on the island of Madeira. Three days of focused discussion on Bitcoin adoption, circular economies, and freedom technology.'
    },
    {
        id: 'prague26',
        name: 'BTC PRAGUE',
        location: 'PRAGUE, CZECH REPUBLIC',
        dateRange: 'MAY 14-16',
        month: 'MAY 2026',
        type: 'conference',
        tags: ['BUILDERS', 'STUDENTS', 'CULTURE'],
        description: "Central Europe's largest Bitcoin-only conference bringing together developers, entrepreneurs, and enthusiasts from across the globe."
    },
    {
        id: 'austin26',
        name: 'BITCOIN++ AUSTIN',
        location: 'AUSTIN, USA',
        dateRange: 'MAY 7-9',
        month: 'MAY 2026',
        type: 'conference',
        tags: ['DEV-ONLY', 'PRIVACY', 'L2'],
        description: 'A developer-focused conference diving deep into Bitcoin protocol development, Layer 2 solutions, and technical innovation.'
    },
    {
        id: 'baltic26',
        name: 'BALTIC HONEYBADGER',
        location: 'RIGA, LATVIA',
        dateRange: 'AUG 21-22',
        month: 'AUGUST 2026',
        type: 'conference',
        tags: ['CYPHERPUNK', 'MINING', 'PRIVACY'],
        description: "An intimate, community-driven conference known for its grassroots ethos and focus on Bitcoin's cypherpunk roots."
    },
    {
        id: 'adopting26',
        name: 'ADOPTING BITCOIN',
        location: 'SAN SALVADOR, EL SALVADOR',
        dateRange: 'NOV 15-17',
        month: 'NOVEMBER 2026',
        type: 'conference',
        tags: ['ADOPTION', 'EL SALVADOR', 'ECONOMY'],
        description: 'Exploring real-world Bitcoin adoption in the first country to make Bitcoin legal tender. Practical insights from the ground level.'
    }
];

export const MEETUPS: Meetup[] = [
    {
        id: 'ny',
        city: 'NEW YORK',
        schedule: [
            { day: 'TUE', name: 'Bitcoin Park NYC', location: 'PubKey, Manhattan', frequency: 'Weekly' },
            { day: 'THU', name: 'Lightning Developers NYC', location: 'Virtual + IRL', frequency: 'Bi-weekly' }
        ]
    },
    {
        id: 'atx',
        city: 'AUSTIN',
        schedule: [
            { day: 'WED', name: 'Austin Bitcoin Club', location: 'Bitcoin Commons', frequency: 'Weekly' },
            { day: 'FRI', name: 'Pleb Lab Sessions', location: 'Pleb Lab', frequency: 'Weekly' }
        ]
    },
    {
        id: 'ldn',
        city: 'LONDON',
        schedule: [
            { day: 'MON', name: 'London Bitcoin Devs', location: 'Various', frequency: 'Monthly' }
        ]
    },
    {
        id: 'bna',
        city: 'NASHVILLE',
        schedule: [
            { day: 'THU', name: 'Bitcoin Park Meetup', location: 'Bitcoin Park', frequency: 'Weekly' }
        ]
    }
];

export const VIRTUAL_EVENTS: VirtualEvent[] = [
    { id: 'v1', name: 'Bitcoin Policy Weekly', platform: 'X Space', host: 'Bitcoin Policy Institute' },
    { id: 'v2', name: 'Lightning Dev Workshop', platform: 'Workshop', host: 'Lightning Labs' },
    { id: 'v3', name: 'Nostr Protocol Discussion', platform: 'X Space', host: 'Nostr Devs' }
];
