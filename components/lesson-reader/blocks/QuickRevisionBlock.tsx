"use client";
import * as React from "react";
import { RotateCcw } from "lucide-react";

interface QuickRevisionBlockProps {
  content: { title?: string; points: string[] };
}

export function QuickRevisionBlock({ content }: QuickRevisionBlockProps) {
  const title = content.title || "QUICK REVISION";

  return (
    <div className="rounded-2xl bg-gray-50 border border-dashed border-gray-300 p-6 space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="h-7 w-7 rounded-lg bg-gray-200 flex items-center justify-center shrink-0">
          <RotateCcw className="h-4 w-4 text-gray-600" />
        </div>
        <span className="text-[12px] font-bold text-gray-600 uppercase tracking-widest">{title}</span>
      </div>
      <ul className="space-y-3">
        {content.points.map((point, i) => (
          <li key={i} className="flex items-start gap-3 text-[16px] text-gray-700 leading-[1.75]">
            <span className="mt-1 h-5 w-5 rounded-full border-2 border-emerald-400 bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-600 text-[10px] font-bold">✓</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
