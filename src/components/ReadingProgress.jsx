import React, { useState, useEffect } from "react";

export function ReadingProgress({ targetRef }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      let totalHeight;
      let currentProgress;

      if (targetRef && targetRef.current) {
        const element = targetRef.current;
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementHeight = rect.height;
        const scrolled = window.scrollY - elementTop;

        totalHeight = elementHeight - window.innerHeight;
        currentProgress = (scrolled / totalHeight) * 100;
      } else {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        currentProgress = (window.scrollY / docHeight) * 100;
      }

      setProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [targetRef]);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none">
      <div
        className="h-full bg-ink-accent transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
