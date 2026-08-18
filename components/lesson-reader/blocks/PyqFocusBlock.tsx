"use client";
import * as React from "react";
import { BookOpen } from "lucide-react";

interface PyqFocusBlockProps {
  content: {
    title?: string;
    description: string;
    pyqs?: { year: number; question: string; reference?: string }[];
  };
}

export function PyqFocusBlock({ content }: PyqFocusBlockProps) {
  const title = content.title || "PYQ FOCUS";

  return (
    <div className="rounded-2xl border-l-4 border-l-indigo-500 bg-indigo-50 p-6 space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="h-7 w-7 rounded-lg bg-indigo-200/70 flex items-center justify-center shrink-0">
          <BookOpen className="h-4 w-4 text-indigo-700" />
        </div>
        <span className="text-[12px] font-bold text-indigo-800 uppercase tracking-widest">{title}</span>
      </div>

      <p className="text-[16px] text-gray-800 leading-[1.75]">{content.description}</p>

      {content.pyqs && content.pyqs.length > 0 && (
        <div className="space-y-3 pt-1">
          {content.pyqs.map((pyq, i) => (
            <div key={i} className="bg-white/80 rounded-xl p-4 border border-indigo-100 space-y-2">
              <span className="inline-block text-[11px] font-bold px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                {pyq.year}
              </span>
              <p className="text-[15px] text-gray-800 leading-relaxed">{pyq.question}</p>
              {pyq.reference && (
                <p className="text-[13px] text-gray-500">{pyq.reference}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {(!content.pyqs || content.pyqs.length === 0) && (
        <p className="text-[14px] text-gray-500 italic">
          No verified PYQs for this concept yet.
        </p>
      )}
    </div>
  );
}
