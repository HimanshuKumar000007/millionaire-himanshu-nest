"use client";
import * as React from "react";
import { Lightbulb } from "lucide-react";

interface QuickSummaryBlockProps {
  content: { text: string };
}

export function QuickSummaryBlock({ content }: QuickSummaryBlockProps) {
  if (!content.text?.trim()) return null;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-amber-50 via-amber-50/70 to-indigo-50/50 border border-amber-200/80 p-7 space-y-3">
      <div className="flex items-center gap-2.5">
        <div className="h-7 w-7 rounded-lg bg-amber-200/60 flex items-center justify-center shrink-0">
          <Lightbulb className="h-4 w-4 text-amber-700" />
        </div>
        <span className="text-[13px] font-bold text-amber-800 uppercase tracking-widest">Quick Summary</span>
      </div>
      <p className="text-[17px] text-gray-800 leading-[1.75] font-medium">{content.text}</p>
    </div>
  );
}
