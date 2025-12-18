export interface ProfileInformation {
    id: string;
    username: string;
    avatar?: string;
    karma: number;
    satsTipped: number;
    satsEarned: number;
    role: 'admin' | 'moderator' | 'builder' | 'user';
    badges: string[];
    email:string;
    location:string;
    bio:string;
    links:string[]

}

export const FILTER_TAGS = {
    opportunityType: [
        'VOLUNTEER', 'CREATOR COLLAB', 'SPEAKING', 'STREET TEAM',
        'DESIGN', 'OPS / EVENT OPS', 'CONTENT / WRITING',
        'PRODUCT / RESEARCH', 'ENGINEERING / TECHNICAL',
        'CAMPUS / STUDENT CLUB', 'INTERNSHIP / FELLOWSHIP'
    ],
    location: ['REMOTE', 'IN-PERSON', 'HYBRID'],
    timeCommitment: ['FULL TIME', 'PART TIME', 'ONE-OFF', '1-5HRS', '5-15HRS', '15HRS+']
};

export enum FilterCategory {
    BASICS = 'BASICS',
    REWARDS_LOGISTICS = 'REWARDS & LOGISTICS',
    SKILLS_FIT = 'SKILLS & FIT',
    ORGANIZER_QUALITY = 'ORGANIZER & QUALITY',
}

export interface ApplicantInformation{
    opp_id: string;
    username: string;
    avatar?: string;
    email: string;
    location: string;
    status:string;
    appliedAt:string;
}

export interface Reply {
    id: string;
    author: ProfileInformation;
    content: string;
    timestamp: Date;
    upvotes: number;
    downvotes: number;
    sats: number;
    replies?: Reply[];
    isTopAnswer?: boolean;
}

export interface Thread {
    id: string;
    title: string;
    author: ProfileInformation;
    content: string;
    timestamp: Date;
    channel: string;
    upvotes: number;
    downvotes: number;
    replyCount: number;
    sats: number;
    tags: string[];
    isPinned?: boolean;
    isHot?: boolean;
    replies?: Reply[];
}

export interface Channel {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    threadCount: number;
}

export enum OrganizationType {
    CONFERENCE = 'Conference / Event',
    MEDIA = 'Media / Podcast',
    NONPROFIT = 'Nonprofit / NGO',
    COMPANY = 'Company / Startup',
    MEETUP = 'Meetup / Local Club',
    CREATOR = 'Individual Creator'
}

export interface SignUpFormData {
    organizationName: string;
    organizationType: OrganizationType | null;
    location: string;
    description: string;
    email: string;
    password?: string;
    profileImage: File | null;

}

export interface GeminiBioResponse {
    description: string;
}

export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export interface Member {
    id: string;
    name: string;
    role: string;
    avatar?: string;
}

export interface Opportunity {
    id: string;
    title: string;
    type: string;
    description: string;
    location:string;
    timeCommitment:string;
    categories:string[],
    org_id?:string
}

export interface Organization {
    id: string;
    name: string;
    type: OrganizationType;
    location: string;
    email: string;
    status: VerificationStatus;
    submittedAt: string;
    description?: string;
    website?: string;
    owner:Member
}

export interface ArtPiece {
    id: string;
    title: string;
    artist: string;
    imageUrl: string;
    priceBTC: number;
    status: VerificationStatus;
    submittedAt: string;
}