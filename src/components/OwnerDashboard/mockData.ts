
import { LiveItem, NetworkStat, SyncItem, Organization, Contributor } from './types';

export const LIVE_ITEMS: LiveItem[] = [
  { type: 'EVENT', title: 'Global Virtual Summit 2025', region: 'Global', status: 'LIVE', engagement: '612 RSVPs' },
  { type: 'EVENT', title: 'UCLA Bitcoin Meetup', region: 'US-West', status: 'DRAFT', engagement: '—' },
  { type: 'ANNOUNCEMENT', title: 'Semester Kickoff', region: 'Global', status: 'LIVE', engagement: '1.2k views' },
];

export const NETWORK_STATS: NetworkStat[] = [
  { label: 'Active Chapters', value: '47' },
  { label: 'Upcoming Events', value: '12' },
  { label: 'Open Opportunities', value: '8' },
  { label: 'Engagement This Week', value: '2.4k' },
];

export const SYNC_ITEMS: SyncItem[] = [
  { name: 'Mission & Purpose', description: 'Core message', isSynced: true },
  { name: 'What BSN Does', description: 'Activities overview', isSynced: true },
  { name: 'Programs', description: 'Your offerings', isSynced: true },
  { name: 'Events', description: 'Auto-synced', isSynced: true },
  { name: 'Opportunities', description: 'Auto-synced', isSynced: true },
  { name: 'Chapters', description: 'Global network', isSynced: true },
  { name: 'Leadership', description: 'Team & roles', isSynced: true },
  { name: 'Social Links', description: 'X, Nostr, etc.', isSynced: true },
];

export const ASSOCIATED_ORGS: Organization[] = [
  { name: 'MIT Bitcoin Club', region: 'USA • US-East' },
  { name: 'Oxford Blockchain Society', region: 'UK • Europe' },
  { name: 'University of Tokyo Bitcoin', region: 'Japan • Asia-Pacific' },
  { name: 'Stanford Bitcoin Club', region: 'USA • US-West' },
];

export const CONTRIBUTORS: Contributor[] = [
  { name: 'Parker Lewis', role: 'GLOBAL ADMIN', region: 'Global', since: '2022' },
  { name: 'Aleks Svetski', role: 'GLOBAL ADMIN', region: 'Global', since: '2022' },
  { name: 'Maria Santos', role: 'REGIONAL LEAD', region: 'Latin America', since: '2023' },
  { name: 'Chen Wei', role: 'REGIONAL LEAD', region: 'Asia-Pacific', since: '2023' },
  { name: 'Emma Fischer', role: 'CHAPTER LEAD', region: 'Europe', since: '2024' },
];
