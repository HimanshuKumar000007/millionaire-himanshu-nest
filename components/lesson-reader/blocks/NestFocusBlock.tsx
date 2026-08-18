"use client";
import * as React from "react";
import { Target } from "lucide-react";

interface NestFocusBlockProps {
  content: { title?: string; points: string[]; takeaway?: string };
}

export function NestFocusBlock({ content }: NestFocusBlockProps) {
  const title = content.title || "NEST FOCUS";

  return (
    <div className="rounded-2xl border-l-4 border-l-blue-500 bg-blue-50 p-6 space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="h-7 w-7 rounded-lg bg-blue-200/70 flex items-center justify-center shrink-0">
          <Target className="h-4 w-4 text-blue-700" />
        </div>
        <span className="text-[12px] font-bold text-blue-800 uppercase tracking-widest">{title}</span>
      </div>
      <ul className="space-y-3">
        {content.points.map((point, i) => (
          <li key={i} className="flex items-start gap-3 text-[16px] text-gray-800 leading-[1.75]">
            <span className="mt-2 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      {content.takeaway && (
        <p className="text-[15px] text-gray-600 italic border-t border-blue-200/70 pt-4 leading-relaxed">
          {content.takeaway}
        </p>
      )}
    </div>
  );
}
