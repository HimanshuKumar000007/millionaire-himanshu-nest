"use client";
import * as React from "react";

interface KeyTermsBlockProps {
  content: { terms: { term: string; definition: string }[] };
}

export function KeyTermsBlock({ content }: KeyTermsBlockProps) {
  if (!content.terms || content.terms.length === 0) return null;
  const useGrid = content.terms.length > 3;

  return (
    <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
        <span className="text-[12px] font-bold text-gray-500 uppercase tracking-widest">Key Terms</span>
        <span className="text-[11px] font-semibold px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full">
          {content.terms.length}
        </span>
      </div>
      <div className={`p-6 ${useGrid ? "grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6" : "space-y-6"}`}>
        {content.terms.map((item, i) => (
          <div key={i} className="space-y-1">
            <dt className="text-[16px] font-bold text-gray-900">{item.term}</dt>
            <dd className="text-[15px] text-gray-600 leading-relaxed">{item.definition}</dd>
          </div>
        ))}
      </div>
    </div>
  );
}
