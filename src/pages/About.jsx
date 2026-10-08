import React from "react";
import { Link } from "react-router-dom";
import { Feather, Heart, Shield, Sparkles, Terminal, Code2 } from "lucide-react";
import { Button } from "../components/Button";

export function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Editorial Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-ink-accent">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Editorial Manifesto</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ink-primary font-normal leading-[1.1]">
          A quiet harbor for deliberate long-form craft.
        </h1>
        <p className="text-lg sm:text-xl text-ink-secondary leading-relaxed font-normal pt-2">
          Inkly was conceived as an antidote to the fragmentation of modern digital reading. We believe software engineering and digital design deserve the care, typography, and cadence of classic literary periodicals.
        </p>
      </div>

      {/* Photography Banner */}
      <div className="w-full aspect-[21/9] rounded-card overflow-hidden border border-ink-border shadow-subtle">
        <img
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=80"
          alt="Desk with notebooks and typing equipment"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Pillars Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        <div className="p-6 bg-ink-surface border border-ink-border rounded-card space-y-3">
          <Feather className="w-6 h-6 text-ink-accent" />
          <h3 className="font-serif text-xl font-normal text-ink-primary">
            Substance over Clickbait
          </h3>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            No manufactured urgency or algorithmic sensationalism. Every piece is measured by its conceptual depth and technical precision.
          </p>
        </div>

        <div className="p-6 bg-ink-surface border border-ink-border rounded-card space-y-3">
          <Heart className="w-6 h-6 text-ink-accent" />
          <h3 className="font-serif text-xl font-normal text-ink-primary">
            Humane Design
          </h3>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            Light theme only. Generous optical margins, high contrast scales, tactile spring animations, and zero distracting popovers.
          </p>
        </div>

        <div className="p-6 bg-ink-surface border border-ink-border rounded-card space-y-3">
          <Shield className="w-6 h-6 text-ink-accent" />
          <h3 className="font-serif text-xl font-normal text-ink-primary">
            Open & Resilient
          </h3>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            Built with React 19, Vite, Tailwind CSS, and local persistence. Designed to transition smoothly into distributed APIs.
          </p>
        </div>
      </div>

      {/* Project & GDG Context Section */}
      <div className="p-8 sm:p-10 bg-white border border-ink-border rounded-card space-y-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-primary">
          <Code2 className="w-4 h-4 text-ink-accent" />
          <span>GDG Recruitment Task Specification</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-ink-primary">
          Crafted with care by Himanshu Yadav
        </h2>
        <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
          This platform was developed as a production-quality frontend recruitment submission for the <strong>Google Developer Groups (GDG)</strong> core team. It fulfills all specified editorial design requirements, complete CRUD operations, optimistic reactivity, responsive layouts across 375px to 1440px+, and client-side persistence.
        </p>
        <div className="pt-4 flex flex-wrap gap-4">
          <Link to="/explore">
            <Button variant="primary">Explore Published Stories</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline">View Management Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
