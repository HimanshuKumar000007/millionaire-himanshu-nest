"use client";

import React from "react";
import { Sparkles, ArrowDown, ArrowUp, Layers } from "lucide-react";

export const TaxonomicHierarchyDiagram: React.FC = () => {
  const ranks = [
    { rank: "Kingdom", level: "Highest Inclusivity", count: "Broadest", bg: "bg-indigo-900 text-white" },
    { rank: "Phylum / Division", level: "Major Body Plans", count: "Very High", bg: "bg-indigo-800 text-white" },
    { rank: "Class", level: "Major Evolutionary Traits", count: "High", bg: "bg-indigo-700 text-white" },
    { rank: "Order", level: "Related Families", count: "Moderate", bg: "bg-indigo-600 text-white" },
    { rank: "Family", level: "Related Genera", count: "Specific", bg: "bg-indigo-500 text-white" },
    { rank: "Genus", level: "Closely Related Species", count: "Very Specific", bg: "bg-indigo-600 text-white" },
    { rank: "Species", level: "Interbreeding Unit", count: "Maximum Shared Traits", bg: "bg-[#4F46E5] text-white" },
  ];

  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border border-indigo-100/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-indigo-100">
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-[#4F46E5] border border-indigo-200 flex items-center gap-1.5 w-fit">
            <Sparkles className="w-3 h-3 text-[#4F46E5]" />
            MANDATORY LINNAEAN HIERARCHY
          </span>
          <h4 className="text-xl font-black text-slate-900 tracking-tight">
            TAXONOMIC HIERARCHY ARCHITECTURE
          </h4>
          <p className="text-xs text-slate-600 font-medium">
            Category (Abstract Rank) vs. Taxon (Concrete Biological Entity)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Side Trends: Moving Down */}
        <div className="md:col-span-4 space-y-3 p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100">
          <div className="flex items-center gap-2 text-xs font-black text-[#4F46E5]">
            <ArrowDown className="w-4 h-4 text-[#4F46E5]" />
            <span>TRENDS MOVING DOWN (Kingdom &rarr; Species)</span>
          </div>
          <ul className="text-xs space-y-2 font-semibold text-slate-700">
            <li className="p-2.5 rounded-xl bg-white border border-indigo-100 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span><strong>Increasing Specificity</strong></span>
            </li>
            <li className="p-2.5 rounded-xl bg-white border border-indigo-100 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span><strong>Increasing Shared Traits</strong></span>
            </li>
            <li className="p-2.5 rounded-xl bg-white border border-indigo-100 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span><strong>Increasing Diagnostic Precision</strong></span>
            </li>
            <li className="p-2.5 rounded-xl bg-white border border-indigo-100 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-500"></span>
              <span><strong>Decreasing Inclusivity</strong></span>
            </li>
            <li className="p-2.5 rounded-xl bg-white border border-indigo-100 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-500"></span>
              <span><strong>Decreasing Organism Count</strong></span>
            </li>
          </ul>
        </div>

        {/* Right Side Stacked Pyramidal Ranks */}
        <div className="md:col-span-8 space-y-2">
          {ranks.map((r, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl flex items-center justify-between font-mono text-xs shadow-2xs ${r.bg} transition-all hover:scale-[1.01]`}
            >
              <span className="font-extrabold uppercase tracking-wider text-sm">{r.rank}</span>
              <div className="flex items-center gap-4 text-[11px] font-sans">
                <span className="font-semibold text-white/90">{r.level}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 font-black text-white">{r.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
