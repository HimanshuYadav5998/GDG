import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { useBlogs } from "../context/BlogContext";

export function Footer() {
  const { resetToSampleData } = useBlogs();

  return (
    <footer className="bg-ink-surface border-t border-ink-border pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-ink-border">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="font-serif text-3xl tracking-tight text-ink-primary font-normal">
                Inkly
              </span>
              <span className="w-2 h-2 rounded-full bg-ink-accent" />
            </Link>
            <p className="text-sm text-ink-secondary max-w-sm leading-relaxed font-normal">
              Stories worth reading. An independent editorial publishing platform curated for inquisitive minds, system architects, and design purists.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white border border-ink-border text-ink-secondary hover:text-ink-primary hover:border-ink-primary transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white border border-ink-border text-ink-secondary hover:text-ink-primary hover:border-ink-primary transition-colors"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white border border-ink-border text-ink-secondary hover:text-ink-primary hover:border-ink-primary transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-ink-primary mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-ink-secondary">
              <li>
                <Link to="/explore" className="hover:text-ink-primary transition-colors">
                  All Stories
                </Link>
              </li>
              <li>
                <Link to="/category/technology" className="hover:text-ink-primary transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/category/design" className="hover:text-ink-primary transition-colors">
                  Design & UX
                </Link>
              </li>
              <li>
                <Link to="/category/ai" className="hover:text-ink-primary transition-colors">
                  Artificial Intelligence
                </Link>
              </li>
              <li>
                <Link to="/category/web-development" className="hover:text-ink-primary transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/category/innovation" className="hover:text-ink-primary transition-colors">
                  Innovation
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-ink-primary mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-ink-secondary">
              <li>
                <Link to="/create" className="hover:text-ink-primary transition-colors flex items-center gap-1">
                  <span>Write a Story</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-ink-primary transition-colors">
                  Author Dashboard
                </Link>
              </li>
              <li>
                <Link to="/bookmarks" className="hover:text-ink-primary transition-colors">
                  Saved Stories
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-ink-primary transition-colors">
                  Editorial Philosophy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-ink-primary mb-4">
              Weekly Dispatch
            </h4>
            <p className="text-xs text-ink-secondary leading-relaxed mb-3">
              Receive a curated selection of our finest long-form essays every Sunday.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing to the Inkly Weekly Dispatch!");
              }}
              className="space-y-2"
            >
              <input
                type="email"
                placeholder="your.email@domain.com"
                required
                className="w-full text-xs px-3 py-2 bg-white border border-ink-border rounded-md text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-ink-primary"
              />
              <button
                type="submit"
                className="w-full py-2 bg-ink-primary text-white text-xs font-medium rounded-md hover:bg-black transition-colors"
              >
                Join 18,000+ Readers
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <p>© 2026 Inkly. Built with craft for GDG Recruitment.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={resetToSampleData}
              className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink-accent transition-colors"
              title="Reset state to sample articles"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Articles</span>
            </button>
            <span>·</span>
            <span>Light Theme Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
