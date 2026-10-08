import React from "react";
import { BlogCard } from "./BlogCard";
import { SkeletonCard } from "./SkeletonCard";

export function BlogGrid({
  blogs = [],
  isLoading = false,
  emptyMessage = "No stories found.",
  skeletonCount = 6,
  columns = "three" // 'two' | 'three' | 'four'
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return null;
  }

  const columnStyles = {
    two: "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8",
    three: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8",
    four: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
  };

  return (
    <div className={columnStyles[columns] || columnStyles.three}>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
