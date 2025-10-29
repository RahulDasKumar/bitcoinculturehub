// Force-dynamic rendering (Next.js optimization)
export const dynamic = "force-dynamic";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Modal from "./Modal";
import UnifiedCard from "@/components/UnifiedCard";
import { categories, Category, ExploreItem } from "./data";
import { useAdminData } from "@/hooks/useAdminData";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/hooks/use-auth";


const AdminPage = () => {


    const navigate = useNavigate();
    const ADMIN_EMAIL = "dasrkd3@gmail.com";

    const { user, isLoggedIn, login, logout, updateProfile } = useAuthStore();

    const [selectedCategory, setSelectedCategory] = useState<Category>("All");
    const [selectedItem, setSelectedItem] = useState<ExploreItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [visibleItemsSnapshot, setVisibleItemsSnapshot] = useState<ExploreItem[] | null>(null);

    const [skip, setSkip] = useState(0);
    const limit = 10;


    const { data: allItems, loading, error } = useAdminData(skip, limit);


    useEffect(() => {
        // If user is not logged in or not admin
        if (!user || user.email !== ADMIN_EMAIL) {
            navigate("/"); // redirect to homepage
        }
    }, [user, navigate]);

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
                    item.tags.some((tag) => tag.toLowerCase().includes(searchLower))
            );
        }

        return filtered;
    }, [selectedCategory, allItems, searchTerm]);

    // Visible items to render (no pagination yet)
    const visibleItems = filteredData;



    const handleCardClick = (item: ExploreItem) => {
        console.log("🟢 CARD CLICKED:", item.title, item);
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    // Close moda
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



    return (
        <div className="min-h-screen bg-background">
            {/* Header Section */}
            <Header />

           

           
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
                                        isAdmin={true}
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

export default AdminPage;
