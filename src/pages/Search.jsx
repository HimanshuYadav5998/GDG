import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon, X, SlidersHorizontal } from "lucide-react";
import { useBlogs } from "../context/BlogContext";
import { useDebounce } from "../hooks/useDebounce";
import { filterAndSortBlogs } from "../utils/blogUtils";
import { BlogGrid } from "../components/BlogGrid";
import { EmptyState } from "../components/EmptyState";

export function Search() {
  const { blogs, bookmarks } = useBlogs();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get("q") || "";
  const [query, setQuery] = useState(queryParam);
  const [sort, setSort] = useState("latest");

  // Keep query state synced with URL param if it changes
  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  const debouncedQuery = useDebounce(query, 250);

  // Sync debounced query to URL query param
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedQuery.trim()) {
      params.set("q", debouncedQuery.trim());
    } else {
      params.delete("q");
    }
    setSearchParams(params, { replace: true });
  }, [debouncedQuery]);

  const searchResults = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    return filterAndSortBlogs(blogs, {
      search: debouncedQuery,
      category: "all",
      sort,
      bookmarkedIds: bookmarks
    });
  }, [blogs, debouncedQuery, sort, bookmarks]);

  const handleClear = () => {
    setQuery("");
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">
      {/* Search Header */}
      <div className="max-w-3xl">
        <h1 className="font-serif text-3xl sm:text-5xl text-ink-primary font-normal leading-tight mb-4">
          Search Stories
        </h1>
        <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
          Search across titles, full article content, tags, topics, and authors.
        </p>
      </div>

      {/* Large Search Input */}
      <div className="relative max-w-3xl">
        <SearchIcon className="absolute left-4 top-4 w-5 h-5 text-ink-muted pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stories, topics, frameworks, authors..."
          autoFocus
          className="w-full pl-12 pr-12 py-3.5 text-base sm:text-lg bg-white border border-ink-border rounded-lg text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-ink-primary focus:ring-1 focus:ring-ink-primary shadow-subtle transition-all"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-4 p-1 text-ink-muted hover:text-ink-primary transition-colors"
            aria-label="Clear search query"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Results Meta & Sort */}
      {debouncedQuery.trim() && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ink-border">
          <div>
            <h2 className="text-sm font-semibold text-ink-primary">
              Search results for "{debouncedQuery}"
            </h2>
            <p className="text-xs text-ink-muted">
              {searchResults.length} {searchResults.length === 1 ? "story" : "stories"} found
            </p>
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-ink-secondary" />
            <span className="text-xs font-medium text-ink-secondary">Sort by:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-xs bg-white border border-ink-border rounded-lg px-3 py-1.5 text-ink-primary font-medium focus:outline-none focus:border-ink-primary"
            >
              <option value="latest">Latest</option>
              <option value="popular">Most Popular</option>
              <option value="liked">Most Liked</option>
              <option value="bookmarked">Bookmarked</option>
            </select>
          </div>
        </div>
      )}

      {/* Content Rendering */}
      {!debouncedQuery.trim() ? (
        <div className="py-16 text-center max-w-md mx-auto text-ink-secondary">
          <p className="text-sm mb-4">
            Type keywords above to discover relevant articles and discussions.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["React", "Design", "TypeScript", "AI", "Architecture", "Productivity"].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-3 py-1 text-xs bg-ink-surface hover:bg-[#EBEBE8] border border-ink-border rounded-full text-ink-primary transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      ) : searchResults.length > 0 ? (
        <BlogGrid blogs={searchResults} columns="three" />
      ) : (
        <EmptyState
          icon="search"
          title="No stories found"
          description={`We couldn't find anything matching "${debouncedQuery}". Try checking for spelling errors or searching with broader terms.`}
          actionLabel="Clear Search"
          onAction={handleClear}
        />
      )}
    </div>
  );
}
