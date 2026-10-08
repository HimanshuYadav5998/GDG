import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useBlogs } from "../context/BlogContext";

export function LikeButton({ blogId, count, showCount = true, className = "", size = "md" }) {
  const { likedPosts, toggleLike, blogs } = useBlogs();
  const isLiked = likedPosts.includes(blogId);

  // Fallback to real blog likes count if not passed directly
  const blog = blogs.find((b) => b.id === blogId);
  const displayCount = count !== undefined ? count : blog?.likes || 0;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(blogId);
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.05 }}
      onClick={handleClick}
      aria-label={isLiked ? "Unlike article" : "Like article"}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-colors text-xs font-medium select-none ${
        isLiked
          ? "text-red-600 bg-red-50 hover:bg-red-100"
          : "text-ink-secondary hover:text-ink-primary hover:bg-ink-surface"
      } ${className}`}
    >
      <motion.div
        animate={isLiked ? { scale: [1, 1.35, 1] } : { scale: 1 }}
        transition={{ duration: 0.28, type: "spring", stiffness: 500, damping: 15 }}
      >
        <Heart
          className={`${iconSizes[size] || iconSizes.md} transition-colors ${
            isLiked ? "fill-current text-red-600" : ""
          }`}
        />
      </motion.div>
      {showCount && <span className="tabular-nums font-medium">{displayCount}</span>}
    </motion.button>
  );
}
