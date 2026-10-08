import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Sparkles, TrendingUp } from "lucide-react";
import { useBlogs } from "../context/BlogContext";
import { FeaturedCard } from "../components/FeaturedCard";
import { BlogCard } from "../components/BlogCard";
import { BlogGrid } from "../components/BlogGrid";
import { Button } from "../components/Button";
import { CATEGORIES } from "../data/initialBlogs";

export function Home() {
  const { blogs } = useBlogs();

  // Published blogs
  const publishedBlogs = blogs.filter((b) => b.status === "published");

  // Hero article (featured flag or most viewed)
  const heroArticle = publishedBlogs.find((b) => b.featured) || publishedBlogs[0];

  // Latest stories (excluding hero)
  const remainingBlogs = publishedBlogs.filter((b) => b.id !== heroArticle?.id);
  const latestStories = remainingBlogs.slice(0, 3);

  // Editorial Grid stories
  const gridStories = remainingBlogs.slice(3, 7);

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* Top Welcome / Mission statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-ink-border">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink-accent mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Independent Editorial Platform</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ink-primary font-normal leading-[1.1] max-w-3xl">
              Ideas, systems & perspectives worth reading.
            </h1>
          </div>
          <p className="text-sm sm:text-base text-ink-secondary max-w-sm leading-relaxed font-normal">
            A quiet space for deep thinking on technology, design, and culture. No algorithmic hysteria.
          </p>
        </div>
      </section>

      {/* 1. HERO SECTION: Large featured article */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {heroArticle && <FeaturedCard blog={heroArticle} />}
      </section>

      {/* 2. LATEST STORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-ink-border">
          <div className="flex items-center gap-2.5">
            <TrendingUp className="w-5 h-5 text-ink-accent" />
            <h2 className="font-serif text-2xl sm:text-3xl text-ink-primary font-normal">
              Latest Stories
            </h2>
          </div>
          <Link
            to="/explore"
            className="text-xs font-semibold uppercase tracking-wider text-ink-secondary hover:text-ink-primary inline-flex items-center gap-1.5 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <BlogGrid blogs={latestStories} columns="three" />
      </section>

      {/* 3. CATEGORY DISCOVERY MARQUEE / CAROUSEL STRIP */}
      <section className="bg-ink-surface py-12 border-y border-ink-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl text-ink-primary mb-2 font-normal">
              Explore by Discipline
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary">
              Browse perspectives curated across software craftsmanship, humane interfaces, and machine cognition.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="group p-4 bg-white border border-ink-border rounded-lg text-center hover:border-ink-primary hover:shadow-subtle transition-all duration-200 flex flex-col justify-center"
              >
                <span className="text-xs font-semibold text-ink-primary group-hover:text-ink-accent transition-colors block truncate">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED EDITORIAL GRID SECTION */}
      {gridStories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-ink-border">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-ink-primary" />
              <h2 className="font-serif text-2xl sm:text-3xl text-ink-primary font-normal">
                Curated Architecture & Culture
              </h2>
            </div>
            <Link
              to="/explore"
              className="text-xs font-semibold uppercase tracking-wider text-ink-secondary hover:text-ink-primary inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Editorial Grid: Top item horizontal, bottom 3 vertical */}
          <div className="space-y-8">
            {gridStories[0] && (
              <BlogCard blog={gridStories[0]} layout="horizontal" />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {gridStories.slice(1).map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. EDITORIAL MANIFESTO CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-ink-surface border border-ink-border rounded-card p-8 sm:p-14 text-center max-w-4xl mx-auto relative overflow-hidden">
          <span className="text-[11px] font-bold uppercase tracking-widest text-ink-accent block mb-3">
            Open Publication
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-ink-primary font-normal leading-tight mb-4">
            Have an idea, architectural breakdown, or essay to share?
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary max-w-xl mx-auto leading-relaxed mb-8">
            Inkly provides a distraction-free canvas for developers and designers to publish high-signal long-form essays.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/create">
              <Button variant="accent" size="lg">
                Start Writing Today
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">
                Read Our Standards
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
