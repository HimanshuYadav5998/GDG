import React from "react";
import { CATEGORIES } from "../data/initialBlogs";

export function CategoryFilter({ selectedCategory = "all", onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
      {CATEGORIES.map((cat) => {
        const isActive =
          selectedCategory.toLowerCase() === cat.id ||
          selectedCategory.toLowerCase() === cat.name.toLowerCase();

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-all duration-200 select-none ${
              isActive
                ? "bg-ink-primary text-white shadow-sm"
                : "bg-ink-surface text-ink-secondary hover:text-ink-primary hover:bg-[#EBEBE8] border border-transparent"
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
