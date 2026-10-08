import React from "react";
import { Link } from "react-router-dom";
import { Bookmark, Sparkles } from "lucide-react";
import { useBlogs } from "../context/BlogContext";
import { BlogGrid } from "../components/BlogGrid";
import { EmptyState } from "../components/EmptyState";

export function Bookmarks() {
  const { blogs, bookmarks } = useBlogs();

  // Find bookmarked blogs
  const bookmarkedBlogs = blogs.filter((b) => bookmarks.includes(b.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-ink-accent mb-3">
          <Bookmark className="w-3.5 h-3.5 fill-current" />
          <span>Personal Reading List</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-ink-primary font-normal leading-tight mb-3">
          Saved Stories
        </h1>
        <p className="text-base text-ink-secondary leading-relaxed font-normal">
          Essays, tutorials, and perspectives you've bookmarked for careful reading.
        </p>
      </div>

      {bookmarkedBlogs.length > 0 ? (
        <div>
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-ink-border text-xs text-ink-muted">
            <span>
              {bookmarkedBlogs.length} {bookmarkedBlogs.length === 1 ? "story" : "stories"} saved for later
            </span>
          </div>
          <BlogGrid blogs={bookmarkedBlogs} columns="three" />
        </div>
      ) : (
        <EmptyState
          icon="bookmark"
          title="Your reading list is empty."
          description="Save articles you want to read later by clicking the bookmark icon on any card or story page."
          actionLabel="Explore Stories"
          actionLink="/explore"
        />
      )}
    </div>
  );
}
