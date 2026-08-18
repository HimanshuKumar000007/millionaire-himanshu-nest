"use client";
import * as React from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ExampleBlockProps {
  content: { title?: string; body: string; solution?: string };
}

export function ExampleBlock({ content }: ExampleBlockProps) {
  const [solutionOpen, setSolutionOpen] = useState(false);
  const title = content.title || "EXAMPLE";

  return (
    <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{title}</span>
      </div>
      <div className="p-5 space-y-3">
        <div
          className="text-[15px] text-gray-700 leading-relaxed [&_strong]:font-semibold [&_ul]:mt-2 [&_ul]:pl-4 [&_ul]:list-disc"
          dangerouslySetInnerHTML={{ __html: content.body }}
        />

        {content.solution && (
          <div className="pt-2">
            <button
              suppressHydrationWarning
              onClick={() => setSolutionOpen(!solutionOpen)}
              className="flex items-center gap-1.5 text-[13px] font-semibold text-[#4F46E5] hover:text-indigo-700 transition-colors"
              aria-expanded={solutionOpen}
            >
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${solutionOpen ? "rotate-180" : ""}`}
              />
              {solutionOpen ? "Hide Solution" : "Show Solution"}
            </button>

            {solutionOpen && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div
                  className="text-[15px] text-gray-700 leading-relaxed [&_strong]:font-semibold"
                  dangerouslySetInnerHTML={{ __html: content.solution }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
