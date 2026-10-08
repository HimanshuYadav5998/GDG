import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./Button";

export function ErrorState({
  title = "Something went wrong.",
  message = "We couldn't load this content. Please check your connection or try again.",
  onRetry
}) {
  return (
    <div className="py-20 px-4 text-center max-w-md mx-auto">
      <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
        <AlertCircle className="w-6 h-6 stroke-[1.7]" />
      </div>

      <h3 className="font-serif text-2xl text-ink-primary mb-2 font-normal">
        {title}
      </h3>

      <p className="text-sm text-ink-secondary leading-relaxed mb-6 font-normal">
        {message}
      </p>

      {onRetry && (
        <Button variant="secondary" onClick={onRetry} className="inline-flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </Button>
      )}
    </div>
  );
}
