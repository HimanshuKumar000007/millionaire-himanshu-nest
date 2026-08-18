"use client";
import * as React from "react";
import { Bookmark, Sparkles } from "lucide-react";

interface TakeawayBlockProps {
  title?: string;
  text: string;
}

export function TakeawayBlock({ title = "Key Takeaway", text }: TakeawayBlockProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-indigo-50/90 via-indigo-50/60 to-purple-50/80 border-l-4 border-l-indigo-600 border border-indigo-100 p-5 sm:p-6 space-y-2 relative overflow-hidden my-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
            <Bookmark className="h-3.5 w-3.5" />
          </div>
          <span className="text-xs font-black text-indigo-700 uppercase tracking-wider">
            {title}
          </span>
        </div>
        <span className="text-2xl font-serif text-indigo-300 leading-none select-none">“</span>
      </div>
      <p className="text-sm font-semibold text-gray-800 leading-relaxed pl-8">
        {text}
      </p>
    </div>
  );
}
