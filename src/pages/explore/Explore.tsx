export const dynamic = 'force-dynamic';

import { useState, useMemo, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Modal from "./Modal";
import { categories, Category } from "./data";
import UnifiedCard from "@/components/UnifiedCard";
import { ExploreItem } from "./data";
import { exploreData } from "@/pages/explore/explore-data";

// Feature flag for modal navigation
const FEATURE_EXPLORE_MODAL_NAV = true;

const ExplorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedItem, setSelectedItem] = useState<ExploreItem  | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal navigation state
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [visibleItemsSnapshot, setVisibleItemsSnapshot] = useState<ExploreItem [] | null>(null);
 
  const allItems = useMemo(() => exploreData, []);

  // Apply filters (category + search)
  const filteredData = useMemo(() => {
    let filtered = allItems;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  }, [selectedCategory, allItems, searchTerm]);

  const visibleItems = filteredData.slice(0, visibleCount);
  const hasMore = visibleCount < filteredData.length;

  // Card click opens modal
  const handleCardClick = (item: ExploreItem) => {
    
    // setSelectedItem(item);
    // setIsModalOpen(true);
  };

  // Derive selected item from navigation
  const derivedSelectedItem = useMemo(() => {
    if (currentIndex !== null && visibleItemsSnapshot) {
      return visibleItemsSnapshot[currentIndex];
    }
    return selectedItem;
  }, [currentIndex, visibleItemsSnapshot, selectedItem]);

  // Category change
  const handleCategoryChange = useCallback((category: Category) => {
    setSelectedCategory(category);
    setVisibleCount(12);
  }, []);

  // Load more button
  const handleLoadMore = useCallback(async () => {
    setIsLoadingMore(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setVisibleCount(prev => Math.min(prev + 12, filteredData.length));
    setIsLoadingMore(false);
  }, [filteredData.length]);

  // Reset visible count on new search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setVisibleCount(12);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      <section className="py-12 sm:py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            Explore the Culture
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8">
            Artists, art, memes, and lore — discover the soul of Bitcoin in every form.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search culture..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              aria-label="Search Bitcoin culture content"
            />
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-6 sm:py-8 bg-surface-dark border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                size="lg"
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-xs sm:text-sm ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary hover:shadow-md"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="py-8 sm:py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {visibleItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                {searchTerm ? 'No items found matching your search.' : 'No items found in this category.'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
                {visibleItems.map((item) => (
                  <UnifiedCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    tags={item.tags}
                    image_url={item.image_url}
                    type={item.category}
                    onClick={() => handleCardClick(item)}
                    itemId={item.realId}
                    itemType={item.type}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="text-center">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base"
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                  >
                    {isLoadingMore ? "Loading..." : `Load More (${filteredData.length - visibleCount} more)`}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Modal */}
      <Modal
  item={selectedItem}
  isOpen={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
    setSelectedItem(null);
  }}
/>
</div>
  );
};

export default ExplorePage;
