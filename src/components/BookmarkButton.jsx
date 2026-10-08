import React from "react";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { useBlogs } from "../context/BlogContext";

export function BookmarkButton({ blogId, className = "", size = "md" }) {
  const { bookmarks, toggleBookmark } = useBlogs();
  const isBookmarked = bookmarks.includes(blogId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(blogId);
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.08 }}
      onClick={handleClick}
      aria-label={isBookmarked ? "Remove bookmark" : "Save article to bookmarks"}
      className={`p-2 rounded-full transition-colors flex items-center justify-center ${
        isBookmarked
          ? "text-ink-accent bg-ink-accentSoft hover:bg-orange-100"
          : "text-ink-secondary hover:text-ink-primary hover:bg-ink-surface"
      } ${className}`}
    >
      <motion.div
        animate={isBookmarked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <Bookmark
          className={`${iconSizes[size] || iconSizes.md} ${
            isBookmarked ? "fill-current" : ""
          }`}
        />
      </motion.div>
    </motion.button>
  );
}
