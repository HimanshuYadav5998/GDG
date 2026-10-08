import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookmarkButton } from "./BookmarkButton";
import { LikeButton } from "./LikeButton";
import { formatDate } from "../utils/formatDate";

export function BlogCard({ blog, layout = "vertical" }) {
  if (!blog) return null;

  const isHorizontal = layout === "horizontal";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative bg-white border border-ink-border rounded-card overflow-hidden hover:border-[#D0D0CB] hover:shadow-elevated transition-all duration-300 flex ${
        isHorizontal ? "flex-col sm:flex-row items-stretch" : "flex-col"
      }`}
    >
      {/* Cover Image Container */}
      <Link
        to={`/blog/${blog.slug}`}
        className={`relative overflow-hidden bg-ink-surface block ${
          isHorizontal
            ? "sm:w-2/5 aspect-[16/10] sm:aspect-auto"
            : "w-full aspect-[16/10]"
        }`}
      >
        <img
          src={blog.coverImage}
          alt={blog.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Subtle top overlay for badge legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
        <div>
          {/* Category & Status */}
          <div className="flex items-center justify-between mb-2.5">
            <Link
              to={`/category/${blog.category.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-[11px] font-semibold tracking-wider uppercase text-ink-accent hover:text-ink-accentHover transition-colors"
            >
              {blog.category}
            </Link>
            <div className="flex items-center gap-1.5">
              {blog.status === "draft" && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                  Draft
                </span>
              )}
              <BookmarkButton blogId={blog.id} size="sm" />
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-normal leading-tight text-ink-primary group-hover:text-ink-accent transition-colors duration-200 line-clamp-2 mb-2.5">
            <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-ink-secondary leading-relaxed line-clamp-2 mb-4 font-normal">
            {blog.excerpt}
          </p>
        </div>

        {/* Card Footer: Author + Metadata + Engagement */}
        <div className="pt-4 mt-auto border-t border-ink-border/70 flex items-center justify-between text-xs text-ink-muted">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <img
              src={blog.author?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"}
              alt={blog.author?.name}
              className="w-6 h-6 rounded-full object-cover border border-ink-border flex-shrink-0"
            />
            <div className="truncate">
              <span className="font-medium text-ink-primary truncate block hover:underline">
                {blog.author?.name}
              </span>
              <span className="text-[11px] text-ink-muted">
                {formatDate(blog.publishedAt)} · {blog.readingTime}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <LikeButton blogId={blog.id} count={blog.likes} size="sm" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
