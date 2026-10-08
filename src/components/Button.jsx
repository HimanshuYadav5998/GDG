import React from "react";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  onClick,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const variants = {
    primary:
      "bg-ink-primary text-white hover:bg-black focus-visible:ring-ink-primary shadow-sm",
    accent:
      "bg-ink-accent text-white hover:bg-ink-accentHover focus-visible:ring-ink-accent shadow-sm",
    secondary:
      "bg-ink-surface text-ink-primary hover:bg-[#EBEBE8] border border-ink-border focus-visible:ring-ink-primary",
    outline:
      "bg-transparent text-ink-primary hover:bg-ink-surface border border-ink-border hover:border-[#D0D0CB] focus-visible:ring-ink-primary",
    ghost:
      "bg-transparent text-ink-secondary hover:text-ink-primary hover:bg-ink-surface focus-visible:ring-ink-primary",
    danger:
      "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 focus-visible:ring-red-500",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2 gap-2",
    lg: "text-base px-5 py-2.5 gap-2.5",
    icon: "p-2 aspect-square",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${
        sizes[size] || sizes.md
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
