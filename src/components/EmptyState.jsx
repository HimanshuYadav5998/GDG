import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Search, Bookmark, FileText, Sparkles } from "lucide-react";
import { Button } from "./Button";

export function EmptyState({
  icon = "book",
  title = "No stories found",
  description = "There are no articles matching your criteria.",
  actionLabel,
  actionLink,
  onAction,
  className = ""
}) {
  const icons = {
    book: BookOpen,
    search: Search,
    bookmark: Bookmark,
    file: FileText,
    sparkle: Sparkles,
  };

  const IconComponent = icons[icon] || BookOpen;

  return (
    <div className={`text-center py-16 px-4 max-w-md mx-auto ${className}`}>
      <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-ink-surface border border-ink-border flex items-center justify-center text-ink-secondary">
        <IconComponent className="w-6 h-6 stroke-[1.5]" />
      </div>

      <h3 className="font-serif text-2xl text-ink-primary mb-2.5 font-normal">
        {title}
      </h3>

      <p className="text-sm text-ink-secondary leading-relaxed mb-6 font-normal">
        {description}
      </p>

      {actionLabel && (
        <div>
          {actionLink ? (
            <Link to={actionLink}>
              <Button variant="primary">{actionLabel}</Button>
            </Link>
          ) : (
            <Button variant="primary" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
