import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Tag } from "lucide-react";
import { useBlogs } from "../context/BlogContext";
import { CATEGORIES } from "../data/initialBlogs";
import { BlogGrid } from "../components/BlogGrid";
import { EmptyState } from "../components/EmptyState";

export function Category() {
  const { category: catParam } = useParams();
  const { blogs } = useBlogs();

  // Find category metadata
  const currentCategory = useMemo(() => {
    const formatted = (catParam || "").toLowerCase().replace(/-/g, " ");
    return (
      CATEGORIES.find(
        (c) =>
          c.id.toLowerCase() === (catParam || "").toLowerCase() ||
          c.name.toLowerCase() === formatted
      ) || {
        id: catParam,
        name: formatted.charAt(0).toUpperCase() + formatted.slice(1),
        description: `Explore insightful stories and perspectives in ${formatted}.`
      }
    );
  }, [catParam]);

  // Filter published blogs
  const categoryBlogs = useMemo(() => {
    const targetName = currentCategory.name.toLowerCase();
    return blogs.filter(
      (b) =>
        b.status === "published" &&
        b.category.toLowerCase() === targetName
    );
  }, [blogs, currentCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">
      {/* Back button */}
      <div>
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-secondary hover:text-ink-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Categories</span>
        </Link>
      </div>

      {/* Category Editorial Hero Banner */}
      <div className="bg-ink-surface border border-ink-border rounded-card p-6 sm:p-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-ink-accent mb-3">
          <Tag className="w-3.5 h-3.5" />
          <span>Curated Discipline</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-ink-primary font-normal leading-tight mb-3">
          {currentCategory.name}
        </h1>
        <p className="text-base text-ink-secondary leading-relaxed max-w-2xl font-normal">
          {currentCategory.description}
        </p>

        {/* Other category pills */}
        <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-ink-border">
          {CATEGORIES.filter((c) => c.id !== "all" && c.id !== currentCategory.id).map(
            (c) => (
              <Link
                key={c.id}
                to={`/category/${c.id}`}
                className="px-3 py-1 bg-white hover:bg-[#EBEBE8] border border-ink-border rounded-full text-xs font-medium text-ink-secondary hover:text-ink-primary transition-colors"
              >
                {c.name}
              </Link>
            )
          )}
        </div>
      </div>

      {/* Grid or Empty */}
      {categoryBlogs.length > 0 ? (
        <div>
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-ink-border text-xs text-ink-muted">
            <span>
              Showing {categoryBlogs.length}{" "}
              {categoryBlogs.length === 1 ? "story" : "stories"} in{" "}
              {currentCategory.name}
            </span>
          </div>
          <BlogGrid blogs={categoryBlogs} columns="three" />
        </div>
      ) : (
        <EmptyState
          icon="book"
          title={`No stories in ${currentCategory.name} yet`}
          description="Check back soon or publish an article in this discipline today!"
          actionLabel="Write for this Category"
          actionLink="/create"
        />
      )}
    </div>
  );
}
