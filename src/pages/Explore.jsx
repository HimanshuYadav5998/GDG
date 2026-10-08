import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Sparkles } from "lucide-react";
import { useBlogs } from "../context/BlogContext";
import { useDebounce } from "../hooks/useDebounce";
import { filterAndSortBlogs } from "../utils/blogUtils";
import { BlogGrid } from "../components/BlogGrid";
import { SearchBar } from "../components/SearchBar";
import { CategoryFilter } from "../components/CategoryFilter";
import { EmptyState } from "../components/EmptyState";

export function Explore() {
  const { blogs, bookmarks } = useBlogs();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL-driven query state
  const initialCategory = searchParams.get("category") || "all";
  const initialQuery = searchParams.get("q") || "";
  const initialSort = searchParams.get("sort") || "latest";

  const [category, setCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState(initialSort);

  // Debounced search
  const debouncedSearch = useDebounce(searchQuery, 250);

  // Filtered & sorted blogs list
  const filteredBlogs = useMemo(() => {
    return filterAndSortBlogs(blogs, {
      search: debouncedSearch,
      category,
      sort: sortBy,
      bookmarkedIds: bookmarks
    });
  }, [blogs, debouncedSearch, category, sortBy, bookmarks]);

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    const params = new URLSearchParams(searchParams);
    if (newCat === "all") {
      params.delete("category");
    } else {
      params.set("category", newCat);
    }
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setCategory("all");
    setSortBy("latest");
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-ink-accent mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Dispatch Index</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-ink-primary font-normal leading-tight mb-3">
          Explore Stories
        </h1>
        <p className="text-base text-ink-secondary leading-relaxed font-normal">
          Discover ideas, experiences and perspectives curated across contemporary technology and design.
        </p>
      </div>

      {/* Filter & Search Bar Toolbar */}
      <div className="space-y-4 pt-4 border-t border-ink-border">
        {/* Search Bar + Sort */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="flex-1 max-w-xl">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by keywords, tags, or author..."
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <SlidersHorizontal className="w-4 h-4 text-ink-secondary" />
            <span className="text-xs font-medium text-ink-secondary">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-white border border-ink-border rounded-lg px-3 py-2 text-ink-primary font-medium focus:outline-none focus:border-ink-primary"
            >
              <option value="latest">Latest Stories</option>
              <option value="popular">Most Popular (Views)</option>
              <option value="liked">Most Liked</option>
              <option value="bookmarked">Bookmarked</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="pt-2">
          <CategoryFilter
            selectedCategory={category}
            onSelectCategory={handleCategoryChange}
          />
        </div>
      </div>

      {/* Results Count & Active Filter Indicator */}
      <div className="flex items-center justify-between text-xs text-ink-muted border-b border-ink-border pb-4">
        <span>
          Showing <strong className="text-ink-primary">{filteredBlogs.length}</strong> {filteredBlogs.length === 1 ? "story" : "stories"}
          {debouncedSearch && ` for "${debouncedSearch}"`}
          {category !== "all" && ` in ${category}`}
        </span>

        {(debouncedSearch || category !== "all" || sortBy !== "latest") && (
          <button
            onClick={handleClearFilters}
            className="text-ink-accent hover:underline font-semibold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Blog Grid or Empty State */}
      {filteredBlogs.length > 0 ? (
        <BlogGrid blogs={filteredBlogs} columns="three" />
      ) : (
        <EmptyState
          icon="search"
          title="No stories found"
          description="We couldn't find anything matching your search criteria. Try different terms or reset your filters."
          actionLabel="Clear Filters"
          onAction={handleClearFilters}
        />
      )}
    </div>
  );
}
