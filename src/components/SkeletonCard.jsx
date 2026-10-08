import React from "react";

export function SkeletonCard() {
  return (
    <div className="bg-white border border-ink-border rounded-card overflow-hidden flex flex-col animate-pulse">
      {/* Cover Image Skeleton */}
      <div className="w-full aspect-[16/10] bg-[#EDEDEA]" />

      {/* Body Skeleton */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4">
        <div>
          {/* Category pill */}
          <div className="h-3.5 bg-[#EDEDEA] rounded w-20 mb-3" />

          {/* Title lines */}
          <div className="h-6 bg-[#EDEDEA] rounded w-4/5 mb-2" />
          <div className="h-6 bg-[#EDEDEA] rounded w-2/3 mb-4" />

          {/* Excerpt lines */}
          <div className="h-3.5 bg-[#F2F2EF] rounded w-full mb-1.5" />
          <div className="h-3.5 bg-[#F2F2EF] rounded w-5/6" />
        </div>

        {/* Footer Skeleton */}
        <div className="pt-4 border-t border-ink-border/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#EDEDEA]" />
            <div className="space-y-1">
              <div className="h-3 bg-[#EDEDEA] rounded w-20" />
              <div className="h-2.5 bg-[#F2F2EF] rounded w-16" />
            </div>
          </div>
          <div className="h-5 bg-[#EDEDEA] rounded-full w-10" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonArticle() {
  return (
    <div className="max-w-[760px] mx-auto animate-pulse space-y-6 py-8">
      <div className="h-4 bg-[#EDEDEA] rounded w-24 mb-4" />
      <div className="h-10 sm:h-12 bg-[#EDEDEA] rounded w-11/12" />
      <div className="h-10 sm:h-12 bg-[#EDEDEA] rounded w-3/4 mb-6" />
      <div className="h-5 bg-[#F2F2EF] rounded w-full" />
      <div className="h-5 bg-[#F2F2EF] rounded w-5/6 mb-8" />

      {/* Author info */}
      <div className="flex items-center gap-4 py-4 border-y border-ink-border">
        <div className="w-12 h-12 rounded-full bg-[#EDEDEA]" />
        <div className="space-y-2">
          <div className="h-4 bg-[#EDEDEA] rounded w-32" />
          <div className="h-3 bg-[#F2F2EF] rounded w-24" />
        </div>
      </div>

      {/* Cover image */}
      <div className="w-full aspect-[16/9] bg-[#EDEDEA] rounded-card my-8" />

      {/* Content paragraphs */}
      <div className="space-y-3 pt-4">
        <div className="h-4 bg-[#F2F2EF] rounded w-full" />
        <div className="h-4 bg-[#F2F2EF] rounded w-full" />
        <div className="h-4 bg-[#F2F2EF] rounded w-4/5" />
      </div>
      <div className="space-y-3 pt-4">
        <div className="h-4 bg-[#F2F2EF] rounded w-full" />
        <div className="h-4 bg-[#F2F2EF] rounded w-11/12" />
        <div className="h-4 bg-[#F2F2EF] rounded w-3/4" />
      </div>
    </div>
  );
}
