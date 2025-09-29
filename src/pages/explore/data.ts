export interface ExploreItem {
    id: string;
    realId?: string;
    title: string;
    description: string;
    category: 'Artifacts' | 'Creators' | 'Memes' | 'Communities' | 'Events';
    summary?: string;
    tags: string[];
    image_url: string;
    bio?: string;
    genesis?: string;
    development?: string;
    legacy?: string;
    content?: string;
    external_url?: string;
    logo_url?: string;
    type?: 'artifact' | 'creator' | 'community' | 'event' | 'meme';
  }
  
  export interface CommunityItem {
    id: string;
    name: string;
    title?: string;
    description?: string;
    logo_url?: string;
    created_at: string;
    external_url?: string;
  }
  
  // Static explore data removed - now using dynamic Supabase data only
  
  export const categories = ['All', 'Artifacts', 'Creators', 'Memes', 'Communities', 'Events'] as const;
  export type Category = typeof categories[number];