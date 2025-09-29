// World-class feature flag handling for Vite projects
// Safe for browser execution with proper fallbacks

// Helper to safely access Vite environment variables
const getEnvFlag = (key: string, defaultValue: boolean = false): boolean => {
    try {
      // Vite env vars are available via import.meta.env
      const value = import.meta.env[key];
      if (typeof value === 'string') {
        return value.toLowerCase() === 'true';
      }
      return defaultValue;
    } catch {
      // Graceful fallback if import.meta.env is not available
      return defaultValue;
    }
  };
  
  // Feature flags with safe defaults - no runtime crashes
  export const FEATURE_BOOKMARKS_V2 = getEnvFlag('VITE_FEATURE_BOOKMARKS_V2', true); // default ON for dev
  export const FEATURE_EXPLORE_MODAL_NAV = getEnvFlag('VITE_FEATURE_EXPLORE_MODAL_NAV', true); // default ON for dev
  export const FEATURE_SUBMIT_HUB = getEnvFlag('VITE_FEATURE_SUBMIT_HUB', true); // default ON for dev
  export const FEATURE_PROFILE_BOOKMARKS_ROW = getEnvFlag('VITE_FEATURE_PROFILE_BOOKMARKS_ROW', true); // default ON for dev
  export const FEATURE_PROFILES_CLIENT_FETCH = getEnvFlag('VITE_FEATURE_PROFILES_CLIENT_FETCH', true); // default ON for dev
  
  // Type-safe feature flag registry
  export interface FeatureFlags {
    FEATURE_BOOKMARKS_V2: boolean;
    FEATURE_EXPLORE_MODAL_NAV: boolean;
    FEATURE_SUBMIT_HUB: boolean;
    FEATURE_PROFILE_BOOKMARKS_ROW: boolean;
    FEATURE_PROFILES_CLIENT_FETCH: boolean;
  }
  
  // Export all flags as a typed object for easier testing/debugging
  export const featureFlags: FeatureFlags = {
    FEATURE_BOOKMARKS_V2,
    FEATURE_EXPLORE_MODAL_NAV,
    FEATURE_SUBMIT_HUB,
    FEATURE_PROFILE_BOOKMARKS_ROW,
    FEATURE_PROFILES_CLIENT_FETCH,
  };
  
  // Debug helper (only in development)
  if (import.meta.env.DEV) {
    console.log('🚀 Feature Flags:', featureFlags);
  }