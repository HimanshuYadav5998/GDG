import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bookmark,
  PenSquare,
  Menu,
  X,
  LayoutDashboard,
  Compass,
  Grid,
  Info
} from "lucide-react";
import { useBlogs } from "../context/BlogContext";
import { Button } from "./Button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [quickSearch, setQuickSearch] = useState("");

  const { bookmarks, currentUser } = useBlogs();
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowSearchModal(false);
  }, [location.pathname]);

  // Track scroll position for subtle blur and shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Quick search submit
  const handleQuickSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(quickSearch.trim())}`);
      setShowSearchModal(false);
      setQuickSearch("");
    }
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors relative py-1 ${
      isActive
        ? "text-ink-primary font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-ink-accent"
        : "text-ink-secondary hover:text-ink-primary"
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-subtle border-b border-ink-border"
            : "bg-white border-b border-ink-border"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Left: Brand Logo & Desktop Nav Links */}
          <div className="flex items-center gap-8 lg:gap-10">
            <Link to="/" className="flex items-center gap-2 group select-none">
              <span className="font-serif text-2xl sm:text-3xl tracking-tight text-ink-primary font-normal">
                Inkly
              </span>
              <span className="w-2 h-2 rounded-full bg-ink-accent group-hover:scale-125 transition-transform" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <NavLink to="/explore" className={navLinkClass}>
                Explore
              </NavLink>
              <NavLink to="/category/technology" className={navLinkClass}>
                Categories
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </nav>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-ink-secondary hover:text-ink-primary bg-ink-surface hover:bg-[#EBEBE8] border border-ink-border rounded-full transition-all"
              aria-label="Open search dialog"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search stories...</span>
              <kbd className="hidden sm:inline-block text-[10px] bg-white border border-ink-border px-1.5 py-0.5 rounded text-ink-muted">
                /
              </kbd>
            </button>

            {/* Bookmarks link with badge */}
            <Link
              to="/bookmarks"
              className="relative p-2 text-ink-secondary hover:text-ink-primary rounded-full hover:bg-ink-surface transition-colors"
              aria-label="View bookmarks"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarks.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-ink-accent text-white text-[10px] font-bold flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </Link>

            {/* Write CTA button */}
            <Link to="/create" className="hidden sm:block">
              <Button variant="accent" size="sm" className="gap-1.5 shadow-sm">
                <PenSquare className="w-4 h-4" />
                <span>Write</span>
              </Button>
            </Link>

            {/* Dashboard Avatar button */}
            <Link
              to="/dashboard"
              className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-ink-border transition-all"
              aria-label="Open author dashboard"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-ink-border"
              />
            </Link>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-ink-secondary hover:text-ink-primary rounded-md transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden border-t border-ink-border bg-white px-4 pt-3 pb-6 space-y-3 overflow-hidden shadow-dropdown"
            >
              <div className="flex flex-col space-y-1">
                <Link
                  to="/explore"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-ink-primary hover:bg-ink-surface"
                >
                  <Compass className="w-4 h-4 text-ink-secondary" />
                  <span>Explore Stories</span>
                </Link>
                <Link
                  to="/category/technology"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-ink-primary hover:bg-ink-surface"
                >
                  <Grid className="w-4 h-4 text-ink-secondary" />
                  <span>Categories</span>
                </Link>
                <Link
                  to="/bookmarks"
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-ink-primary hover:bg-ink-surface"
                >
                  <div className="flex items-center gap-3">
                    <Bookmark className="w-4 h-4 text-ink-secondary" />
                    <span>Saved Stories</span>
                  </div>
                  {bookmarks.length > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-ink-accentSoft text-ink-accent">
                      {bookmarks.length}
                    </span>
                  )}
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-ink-primary hover:bg-ink-surface"
                >
                  <LayoutDashboard className="w-4 h-4 text-ink-secondary" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/about"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-ink-primary hover:bg-ink-surface"
                >
                  <Info className="w-4 h-4 text-ink-secondary" />
                  <span>About Inkly</span>
                </Link>
              </div>

              <div className="pt-3 border-t border-ink-border">
                <Link to="/create" className="block w-full">
                  <Button variant="accent" className="w-full justify-center gap-2">
                    <PenSquare className="w-4 h-4" />
                    <span>Write a Story</span>
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Quick Search Modal */}
      <AnimatePresence>
        {showSearchModal && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSearchModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-white rounded-card shadow-elevated border border-ink-border overflow-hidden z-10 p-4"
            >
              <form onSubmit={handleQuickSearchSubmit} className="relative">
                <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-ink-muted" />
                <input
                  type="text"
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  placeholder="Search by title, topic, author or keyword..."
                  autoFocus
                  className="w-full pl-11 pr-20 py-3 text-base bg-ink-surface/60 border border-ink-border rounded-lg text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-ink-primary"
                />
                <div className="absolute right-2 top-2 flex items-center gap-1.5">
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-ink-primary text-white text-xs font-medium rounded hover:bg-black"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSearchModal(false)}
                    className="p-1.5 text-ink-muted hover:text-ink-primary rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </form>

              <div className="mt-4 pt-3 border-t border-ink-border text-xs text-ink-muted flex items-center justify-between">
                <span>Popular topics: Technology, Design, AI, React</span>
                <span>Press Enter to search</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
