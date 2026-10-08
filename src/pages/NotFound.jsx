import React from "react";
import { Link } from "react-router-dom";
import { Compass, Home } from "lucide-react";
import { Button } from "../components/Button";

export function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 sm:py-32 text-center space-y-6">
      <span className="font-serif text-8xl sm:text-9xl text-ink-muted/30 select-none font-normal block tracking-tight">
        404
      </span>

      <div className="space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl text-ink-primary font-normal">
          This page wandered off.
        </h1>
        <p className="text-base text-ink-secondary max-w-md mx-auto leading-relaxed">
          The article or resource you're looking for doesn't exist or has been relocated to another archive.
        </p>
      </div>

      <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
        <Link to="/">
          <Button variant="primary" className="gap-2">
            <Home className="w-4 h-4" />
            <span>Back Home</span>
          </Button>
        </Link>
        <Link to="/explore">
          <Button variant="outline" className="gap-2">
            <Compass className="w-4 h-4" />
            <span>Explore Stories</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
