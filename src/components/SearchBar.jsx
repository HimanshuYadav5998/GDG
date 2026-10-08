import React from "react";
import { Search, X } from "lucide-react";

export function SearchBar({
  value,
  onChange,
  placeholder = "Search stories, authors, categories, tags...",
  className = "",
  autoFocus = false
}) {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search className="absolute left-4 w-4 h-4 text-ink-muted pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full pl-11 pr-10 py-3 text-sm bg-white border border-ink-border rounded-lg text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-ink-primary focus:ring-1 focus:ring-ink-primary transition-all duration-200"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3.5 p-1 text-ink-muted hover:text-ink-primary transition-colors rounded-full"
          aria-label="Clear search query"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
