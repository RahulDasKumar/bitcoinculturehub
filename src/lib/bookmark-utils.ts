// Utility functions for determining item types safely

export type ItemType = 'artifact' | 'creator' | 'community' | 'event' | 'meme';

export const inferItemType = (item: any): ItemType => {
  // Safely infer item type from various possible data shapes
  if (item.type && ['artifact', 'creator', 'community', 'event', 'meme'].includes(item.type)) {
    return item.type as ItemType;
  }
  
  if (item.category) {
    const category = item.category.toLowerCase();
    if (category.includes('artifact')) return 'artifact';
    if (category.includes('creator')) return 'creator';
    if (category.includes('community')) return 'community';
    if (category.includes('event')) return 'event';
    if (category.includes('meme')) return 'meme';
  }
  
  // Safe fallback
  return 'artifact';
};