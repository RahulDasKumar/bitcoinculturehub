// Force-dynamic rendering (Next.js optimization)
export const dynamic = "force-dynamic";

import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Modal from "./Modal";
import UnifiedCard from "@/components/UnifiedCard";
import { categories, Category, ExploreItem } from "./data";
import { useExploreData } from "@/hooks/useExploreData";
import { useNavigate } from "react-router-dom"; 
import useAuthStore from "@/hooks/use-auth";
const ExplorePage = () => {
  // ------------------------------
  // 🧠 State Management
  // ------------------------------

  const navigate = useNavigate(); 

  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedItem, setSelectedItem] = useState<ExploreItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const {isLoggedIn} = useAuthStore()
  // Modal navigation state (future support)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [visibleItemsSnapshot, setVisibleItemsSnapshot] = useState<ExploreItem[] | null>(null);

  // Pagination setup (fetches 10 at a time when expanded in future)
  const [skip, setSkip] = useState(0);
  const limit = 10;

  // ------------------------------
  // ⚙️ Data Fetching (MongoDB)
  // ------------------------------
  const { data: allItems, loading, error } = useExploreData(skip, limit);

  // ------------------------------
  // 🔍 Filtering Logic (Search + Category)
  // ------------------------------
  const filteredData = useMemo(() => {
    let filtered = allItems || [];

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchLower)
        )
          
      );
    }

    return filtered;
  }, [selectedCategory, allItems, searchTerm]);

  // Visible items to render (no pagination yet)
  const visibleItems = filteredData;

  // ------------------------------
  // 🖱️ Handlers
  // ------------------------------

  // Open modal when a card is clicked
  const handleCardClick = (item: ExploreItem) => {
    console.log("🟢 CARD CLICKED:", item.title, item);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Close modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Change category
  const handleCategoryChange = useCallback((category: Category) => {
    setSelectedCategory(category);
  }, []);

  // Future pagination (Load More button)
  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setSkip((prev) => prev + limit);
    setIsLoadingMore(false);
  };

  // ------------------------------
  // 🧩 Loading & Error States
  // ------------------------------

  if (loading && allItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading Bitcoin culture...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>Error loading data: {error}</p>
      </div>
    );
  }

  // ------------------------------
  // 🎨 Main UI
  // ------------------------------

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-background text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            Explore the Culture
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8">
            Artists, art, memes, and lore — discover the soul of Bitcoin in every form.
          </p>

          {/* Search Input */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search culture..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground 
              placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              aria-label="Search Bitcoin culture content"
            />
          </div>
        </div>
      </section>
      {isLoggedIn && (<Button
        onClick={() => navigate("/submit-content")}
        className="block mx-auto bg-[#FF5C35] hover:bg-[#ff3c00] text-white font-semibold rounded-full px-6 py-2 mb-6"
      >
        Submit Content
      </Button>)}
     

      {/* Category Filter Buttons */}
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

      {/* Dynamic Cards Grid */}
      <section className="py-8 sm:py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* If no data available */}
          {visibleItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                {searchTerm
                  ? "No items found matching your search."
                  : "No items found in this category."}
              </p>
            </div>
          ) : (
            <>
              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
              gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
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

              {/* Optional "Load More" (for later) */}
              {filteredData.length > visibleItems.length && (
                <div className="text-center">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base"
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                  >
                    {isLoadingMore ? "Loading..." : "Load More"}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Modal for card details */}
      <Modal item={selectedItem} isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default ExplorePage;
