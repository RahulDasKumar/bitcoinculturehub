import {
  UPCOMING_EVENTS,
  ACTIVE_OPPORTUNITIES,
  RECENT_PROOF,
  ARTICLES,
  FOLLOWING,
  TOPICS,
  PIPELINE_DATA,
  RESUME_PROOF,
  RESUME_EVENTS,
  SKILLS,
  ARCHIVE_DATA,
  GOALS
} from './constants';
import {
  Event,
  Opportunity,
  Proof,
  Article,
  PipelineItem,
  TimelineItem,
  Goal
} from './types';

// Simulate network latency (in milliseconds)
const SIMULATED_LATENCY = 800;

// Helper to simulate async API call
function mockApiCall<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, SIMULATED_LATENCY);
  });
}

export const BitcoinHomebaseAPI = {
  /**
   * SECTION: This Week
   */
  getUpcomingEvents: async (): Promise<Event[]> => {
    // API CALL START: Replace with -> const res = await fetch('/api/events'); return res.json();
    return mockApiCall(UPCOMING_EVENTS);
  },

  getActiveOpportunities: async (): Promise<Opportunity[]> => {
    // API CALL START
    return mockApiCall(ACTIVE_OPPORTUNITIES);
  },

  getRecentProof: async (): Promise<Proof[]> => {
    // API CALL START
    return mockApiCall(RECENT_PROOF);
  },

  /**
   * SECTION: Explore
   */
  getArticles: async (): Promise<Article[]> => {
    // API CALL START
    return mockApiCall(ARTICLES);
  },

  getFollowing: async (): Promise<any[]> => {
    // API CALL START
    return mockApiCall(FOLLOWING);
  },

  getTopics: async (): Promise<string[]> => {
    // API CALL START
    return mockApiCall(TOPICS);
  },

  /**
   * SECTION: Pipeline
   */
  getPipeline: async (): Promise<Record<string, PipelineItem[]>> => {
    // API CALL START
    return mockApiCall(PIPELINE_DATA);
  },

  /**
   * SECTION: Resume
   */
  getResumeProof: async (): Promise<any[]> => {
    // API CALL START
    return mockApiCall(RESUME_PROOF);
  },

  getResumeEvents: async (): Promise<any[]> => {
    // API CALL START
    return mockApiCall(RESUME_EVENTS);
  },

  getSkills: async (): Promise<any[]> => {
    // API CALL START
    return mockApiCall(SKILLS);
  },
  
  updatePrivacySettings: async (isPrivate: boolean): Promise<{ success: boolean }> => {
     // API CALL START: await fetch('/api/user/settings', { method: 'POST', body: JSON.stringify({ isPrivate }) });
     return mockApiCall({ success: true });
  },

  /**
   * SECTION: Archive
   */
  getArchive: async (): Promise<TimelineItem[]> => {
    // API CALL START
    return mockApiCall(ARCHIVE_DATA);
  },

  /**
   * SECTION: Goals
   */
  getGoals: async (): Promise<Record<string, Goal[]>> => {
    // API CALL START
    return mockApiCall(GOALS);
  }
};