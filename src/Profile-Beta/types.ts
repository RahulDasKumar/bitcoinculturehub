export interface Event {
  id: string;
  title: string;
  date: string;
  type: string;
}

export interface Opportunity {
  id: string;
  role: string;
  company: string;
  status: 'APPLIED' | 'INTERVIEW' | 'SAVED';
  sats?: number;
  tags?: string[];
}

export interface Proof {
  id: string;
  title: string;
  date: string;
  sats: number;
}

export interface Article {
  id: string;
  title: string;
  source: string;
  readTime: string;
  progress: number;
}

export interface PipelineItem {
  id: string;
  role: string;
  company: string;
  sats: number | string;
  tags: string[];
  status: 'SAVED' | 'APPLIED' | 'IN PROGRESS' | 'COMPLETED';
}

export interface TimelineItem {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  type: 'event' | 'achievement' | 'milestone' | 'proof';
  icon?: string;
}

export interface Goal {
  id: string;
  title: string;
  progress: number;
  target?: string;
  label?: string;
  icon?: 'calendar' | 'briefcase' | 'trending-up' | 'zap';
}