import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { BookmarkButton } from "./BookmarkButton";
import { LikeButton } from "./LikeButton";
import { formatDate } from "../utils/formatDate";

export function FeaturedCard({ blog }) {
  if (!blog) return null;

  return (
    <article className="group relative bg-white border border-ink-border rounded-card overflow-hidden hover:border-[#D0D0CB] hover:shadow-elevated transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
        {/* Large Media Column */}
        <Link
          to={`/blog/${blog.slug}`}
          className="lg:col-span-7 relative overflow-hidden bg-ink-surface aspect-[16/10] lg:aspect-auto min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] block"
        >
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300" />

          {/* Featured pill badge */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-ink-primary shadow-subtle">
            <Sparkles className="w-3.5 h-3.5 text-ink-accent" />
            <span>Featured Editorial</span>
          </div>
        </Link>

        {/* Content Column */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
          <div>
            {/* Category and Bookmark */}
            <div className="flex items-center justify-between mb-4">
              <Link
                to={`/category/${blog.category.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xs font-bold uppercase tracking-widest text-ink-accent hover:text-ink-accentHover transition-colors"
              >
                {blog.category}
              </Link>
              <BookmarkButton blogId={blog.id} size="md" />
            </div>

            {/* Headline */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight text-ink-primary group-hover:text-ink-accent transition-colors duration-200 mb-4">
              <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
            </h2>

            {/* Excerpt */}
            <p className="text-base text-ink-secondary leading-relaxed mb-6 font-normal">
              {blog.excerpt}
            </p>
          </div>

          {/* Bottom Actions & Author */}
          <div className="pt-6 border-t border-ink-border/80">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <img
                  src={blog.author?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"}
                  alt={blog.author?.name}
                  className="w-9 h-9 rounded-full object-cover border border-ink-border"
                />
                <div>
                  <h4 className="text-sm font-semibold text-ink-primary">
                    {blog.author?.name}
                  </h4>
                  <p className="text-xs text-ink-muted">
                    {formatDate(blog.publishedAt)} · {blog.readingTime}
                  </p>
                </div>
              </div>

              <LikeButton blogId={blog.id} count={blog.likes} />
            </div>

            {/* Read CTA */}
            <Link
              to={`/blog/${blog.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-primary group-hover:text-ink-accent transition-all duration-200"
            >
              <span>Read Article</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-ink-accent" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
