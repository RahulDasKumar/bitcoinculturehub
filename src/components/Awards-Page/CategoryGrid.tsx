import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryCard } from "./CategoryCard";
import { categories } from "./CategoryCard";

export const CategoryGrid = () => {
  const [sortBy, setSortBy] = useState("most-nominations");

  const sortedCategories = [...categories].sort((a, b) => {
    if (sortBy === "most-nominations") return b.nominationCount - a.nominationCount;
    if (sortBy === "alphabetical") return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <section id="categories" className="bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-display uppercase mb-3 tracking-tight">
              Award Categories
            </h2>
            <p className="text-base text-muted-foreground max-w-xl">
              Explore all 21 categories and discover the nominees shaping Bitcoin culture.
            </p>
          </div>
          
          {/* Sort Control */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[200px] h-11 bg-card border-border">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="most-nominations">Most Nominations</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {sortedCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
