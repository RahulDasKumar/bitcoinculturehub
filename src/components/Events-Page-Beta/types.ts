
export interface Event {
    id: string;
    name: string;
    location: string;
    dateRange: string;
    description: string;
    month: string;
    tags?: string[];
    type: 'conference' | 'meetup' | 'virtual';
}

export interface Meetup {
    id: string;
    city: string;
    schedule: {
        day: string;
        name: string;
        location: string;
        frequency: string;
    }[];
}

export interface VirtualEvent {
    id: string;
    name: string;
    platform: string;
    host: string;
}
