
export interface LiveItem {
  type: 'EVENT' | 'ANNOUNCEMENT';
  title: string;
  region: string;
  status: 'LIVE' | 'DRAFT';
  engagement: string;
}

export interface NetworkStat {
  label: string;
  value: string;
}

export interface SyncItem {
  name: string;
  description: string;
  isSynced: boolean;
}

export interface Organization {
  name: string;
  region: string;
}

export interface Contributor {
  name: string;
  role: 'GLOBAL ADMIN' | 'REGIONAL LEAD' | 'CHAPTER LEAD';
  region: string;
  since: string;
}
