import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Share2, ArrowLeft, Clock, Eye, Sparkles } from "lucide-react";
import { useBlogs } from "../context/BlogContext";
import { useToast } from "../context/ToastContext";
import { formatDate } from "../utils/formatDate";
import { getRelatedBlogs } from "../utils/blogUtils";
import { ReadingProgress } from "../components/ReadingProgress";
import { BookmarkButton } from "../components/BookmarkButton";
import { LikeButton } from "../components/LikeButton";
import { CommentSection } from "../components/CommentSection";
import { BlogCard } from "../components/BlogCard";
import { EmptyState } from "../components/EmptyState";

// Helper to render markdown-formatted content nicely
function EditorialContent({ content }) {
  if (!content) return null;

  const lines = content.split("\n");
  const elements = [];
  let inCodeBlock = false;
  let codeBuffer = [];
  let codeLang = "";

  lines.forEach((line, index) => {
    // Code block toggle
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <div key={`code-${index}`} className="my-6 rounded-lg overflow-hidden border border-ink-border">
            <div className="bg-[#242424] px-4 py-1.5 text-[11px] font-mono text-[#A0A0A0] flex justify-between items-center">
              <span>{codeLang || "code"}</span>
            </div>
            <pre className="p-4 bg-[#181818] text-[#F3F3F3] text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed m-0">
              <code>{codeBuffer.join("\n")}</code>
            </pre>
          </div>
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeLang = line.replace("```", "").trim();
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    // Headings
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={index} className="font-serif text-2xl sm:text-3xl text-ink-primary font-normal mt-10 mb-4 pt-4 border-t border-ink-border/50">
          {line.replace("## ", "")}
        </h2>
      );
      return;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={index} className="font-serif text-xl sm:text-2xl text-ink-primary font-normal mt-8 mb-3">
          {line.replace("### ", "")}
        </h3>
      );
      return;
    }

    // Blockquotes
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={index} className="border-l-2 border-ink-accent pl-5 my-6 italic text-lg sm:text-xl text-[#3A3A3A] font-serif">
          {line.replace("> ", "").replace(/"/g, "")}
        </blockquote>
      );
      return;
    }

    // List items
    if (line.startsWith("* ") || line.startsWith("- ")) {
      elements.push(
        <li key={index} className="ml-5 list-disc text-base sm:text-lg text-[#2A2A2A] leading-relaxed my-1.5">
          {line.replace(/^(\*|-)\s+/, "")}
        </li>
      );
      return;
    }

    // Regular paragraphs
    if (line.trim().length > 0) {
      elements.push(
        <p key={index} className="text-base sm:text-lg text-[#2A2A2A] leading-[1.8] my-5 font-normal">
          {line}
        </p>
      );
    }
  });

  return <div className="editorial-prose">{elements}</div>;
}

export function BlogDetails() {
  const { slug } = useParams();
  const { blogs, getBlogBySlug, incrementViews } = useBlogs();
  const { showToast } = useToast();
  const articleRef = useRef(null);

  const blog = getBlogBySlug(slug);

  // Increment view count on mount
  useEffect(() => {
    if (blog?.id) {
      incrementViews(blog.id);
      window.scrollTo(0, 0);
    }
  }, [slug]);

  // Handle Share / copy link
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Article link copied to clipboard!");
    } else {
      showToast("Link copied!");
    }
  };

  // If blog does not exist: Section 30 Unavailable Blog State
  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <EmptyState
          icon="file"
          title="Article unavailable"
          description="This story may have been removed, drafted, or is no longer available at this address."
          actionLabel="Explore Other Stories"
          actionLink="/explore"
        />
      </div>
    );
  }

  const relatedBlogs = getRelatedBlogs(blogs, blog, 3);

  return (
    <div className="relative">
      {/* Scroll Reading Progress Bar */}
      <ReadingProgress targetRef={articleRef} />

      {/* Article Container */}
      <article ref={articleRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-secondary hover:text-ink-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Stories</span>
          </Link>
        </div>

        {/* Category Pill */}
        <div className="mb-4">
          <Link
            to={`/category/${blog.category.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-xs font-bold uppercase tracking-widest text-ink-accent hover:underline"
          >
            {blog.category}
          </Link>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.25rem] text-ink-primary font-normal leading-[1.15] mb-6">
          {blog.title}
        </h1>

        {/* Subtitle / Excerpt */}
        <p className="text-lg sm:text-xl text-ink-secondary leading-relaxed font-normal mb-8 max-w-2xl">
          {blog.excerpt}
        </p>

        {/* Author & Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-ink-border mb-8">
          <div className="flex items-center gap-3.5">
            <img
              src={blog.author?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"}
              alt={blog.author?.name}
              className="w-11 h-11 rounded-full object-cover border border-ink-border"
            />
            <div>
              <h4 className="text-sm font-semibold text-ink-primary">
                {blog.author?.name}
              </h4>
              <p className="text-xs text-ink-muted flex items-center gap-2">
                <span>{formatDate(blog.publishedAt)}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {blog.readingTime}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {blog.views || 0} views
                </span>
              </p>
            </div>
          </div>

          {/* Social Share / Desktop quick actions */}
          <div className="flex items-center gap-2">
            <LikeButton blogId={blog.id} count={blog.likes} />
            <BookmarkButton blogId={blog.id} />
            <button
              onClick={handleShare}
              className="p-2 text-ink-secondary hover:text-ink-primary hover:bg-ink-surface rounded-full transition-colors"
              title="Share story"
              aria-label="Share story"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Large Cover Image */}
        <div className="w-full aspect-[16/9] overflow-hidden rounded-card bg-ink-surface border border-ink-border mb-12 shadow-subtle">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content (constrained to 760px for optical readability) */}
        <div className="max-w-[760px] mx-auto">
          <EditorialContent content={blog.content} />

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="pt-8 mt-12 border-t border-ink-border flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted mr-2">
                Tagged in:
              </span>
              {blog.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/explore?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-ink-surface text-ink-secondary hover:text-ink-primary hover:bg-[#EBEBE8] rounded-full text-xs font-medium border border-ink-border transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Bottom Interactive Engagement Bar */}
          <div className="mt-8 p-6 bg-ink-surface rounded-card border border-ink-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LikeButton blogId={blog.id} count={blog.likes} size="lg" />
              <BookmarkButton blogId={blog.id} size="lg" />
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-ink-border text-xs font-semibold text-ink-primary hover:bg-ink-surface transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Article</span>
            </button>
          </div>

          {/* Author Bio Card */}
          <div className="mt-12 p-6 sm:p-8 bg-white border border-ink-border rounded-card flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={blog.author?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
              alt={blog.author?.name}
              className="w-16 h-16 rounded-full object-cover border border-ink-border flex-shrink-0"
            />
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-accent">
                  Written by
                </span>
              </div>
              <h4 className="font-serif text-xl font-normal text-ink-primary">
                {blog.author?.name}
              </h4>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {blog.author?.bio || "Contributor at Inkly, writing on engineering, user experience, and modern web platforms."}
              </p>
            </div>
          </div>

          {/* Comments Section */}
          <CommentSection blogId={blog.id} />
        </div>
      </article>

      {/* Related Articles Section (Section 14) */}
      {relatedBlogs.length > 0 && (
        <section className="bg-ink-surface py-16 border-t border-ink-border mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-ink-border">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-ink-accent" />
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ink-primary">
                  You May Also Like
                </h3>
              </div>
              <Link
                to={`/category/${blog.category.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xs font-semibold uppercase tracking-wider text-ink-secondary hover:text-ink-primary"
              >
                More in {blog.category} →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedBlogs.map((relBlog) => (
                <BlogCard key={relBlog.id} blog={relBlog} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
