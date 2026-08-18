"use client";

import React from "react";
import { Sparkles, RefreshCw, XCircle } from "lucide-react";

export const RingSpeciesDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border border-indigo-100/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-indigo-100">
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-[#4F46E5] border border-indigo-200 flex items-center gap-1.5 w-fit">
            <Sparkles className="w-3 h-3 text-[#4F46E5]" />
            EVOLUTIONARY EXCEPTION MODEL
          </span>
          <h4 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            RING SPECIES MODEL
          </h4>
          <p className="text-xs text-slate-600 font-medium">
            Continuous gene flow around a geographic barrier leading to reproductive isolation at overlap.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-indigo-100 shadow-2xs space-y-6">
        {/* Top Ancestral Population */}
        <div className="flex justify-center">
          <div className="px-4 py-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-center">
            <span className="text-xs font-black text-indigo-950 block">Population A</span>
            <span className="text-[10px] font-bold text-indigo-700">(Original Ancestral Interbreeding Population)</span>
          </div>
        </div>

        {/* Ring Branching Visualization */}
        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto text-center relative">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-black text-slate-900 block">Population B</span>
            <span className="text-[10px] font-semibold text-slate-600">Western Flank Migration</span>
            <div className="text-indigo-500 font-black text-xs">↓</div>
            <span className="text-xs font-black text-slate-900 block pt-1">Population D</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-black text-slate-900 block">Population C</span>
            <span className="text-[10px] font-semibold text-slate-600">Eastern Flank Migration</span>
            <div className="text-indigo-500 font-black text-xs">↓</div>
            <span className="text-xs font-black text-slate-900 block pt-1">Population E</span>
          </div>
        </div>

        {/* Terminal Overlap Conflict */}
        <div className="max-w-md mx-auto p-4 rounded-xl bg-rose-50 border-2 border-rose-200 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-rose-700 font-black text-xs sm:text-sm">
            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Terminal Overlap: Pop X &amp; Pop Y</span>
          </div>
          <p className="text-xs font-extrabold text-rose-900">
            REPRODUCTIVELY ISOLATED — CANNOT INTERBREED!
          </p>
          <p className="text-[11px] font-medium text-slate-600">
            Examples: <em>Ensatina eschscholtzii</em> salamanders in California &amp; <em>Larus</em> gulls around the Arctic Circle.
          </p>
        </div>
      </div>
    </div>
  );
};
