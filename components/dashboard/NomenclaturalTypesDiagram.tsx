"use client";

import React from "react";
import { Sparkles, FileCheck2, BookmarkCheck, History, RefreshCw, Layers } from "lucide-react";

export const NomenclaturalTypesDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border border-indigo-100/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-indigo-100">
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-[#4F46E5] border border-indigo-200 flex items-center gap-1.5 w-fit">
            <Sparkles className="w-3 h-3 text-[#4F46E5]" />
            HERBARIUM &amp; MUSEUM ARCHIVE TYPES
          </span>
          <h4 className="text-xl font-black text-slate-900 tracking-tight">
            NOMENCLATURAL TYPE SPECIMEN SYSTEM
          </h4>
          <p className="text-xs text-slate-600 font-medium">
            Physical specimens anchoring scientific species descriptions in official repositories
          </p>
        </div>
      </div>

      {/* 2-Tier Specimen Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* HOLOTYPE */}
        <div className="p-4 rounded-2xl bg-indigo-50/80 border-2 border-indigo-200 space-y-2 hover:border-indigo-400 transition-all">
          <div className="flex items-center justify-between">
            <h5 className="text-sm font-black text-indigo-950">HOLOTYPE</h5>
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-200 text-indigo-900">PRIMARY</span>
          </div>
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            The single physical specimen designated by the original author as the official nomenclatural reference.
          </p>
        </div>

        {/* ISOTYPE */}
        <div className="p-4 rounded-2xl bg-purple-50/80 border-2 border-purple-200 space-y-2 hover:border-purple-400 transition-all">
          <div className="flex items-center justify-between">
            <h5 className="text-sm font-black text-purple-950">ISOTYPE</h5>
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-200 text-purple-900">DUPLICATE</span>
          </div>
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            Exact duplicate of the holotype collected from the same plant/population at the same time by the same collector.
          </p>
        </div>

        {/* PARATYPE */}
        <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <h5 className="text-sm font-black text-slate-900">PARATYPE</h5>
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-slate-200 text-slate-800">CITED</span>
          </div>
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            Any specimen cited in the original species protologue/description other than the holotype or isotype.
          </p>
        </div>

        {/* LECTOTYPE */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-200 space-y-2 hover:border-amber-400 transition-all">
          <div className="flex items-center justify-between">
            <h5 className="text-sm font-black text-amber-950">LECTOTYPE</h5>
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-200 text-amber-900">SELECTED</span>
          </div>
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            Specimen chosen from original material to serve as type when no holotype was assigned or if original was lost.
          </p>
        </div>

        {/* NEOTYPE */}
        <div className="p-4 rounded-2xl bg-rose-50/80 border-2 border-rose-200 space-y-2 hover:border-rose-400 transition-all">
          <div className="flex items-center justify-between">
            <h5 className="text-sm font-black text-rose-950">NEOTYPE</h5>
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-200 text-rose-900">REPLACEMENT</span>
          </div>
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            New replacement specimen designated when ALL original material (holotype, isotypes, syntypes) is lost or destroyed.
          </p>
        </div>

        {/* SYNTYPE */}
        <div className="p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-200 space-y-2 hover:border-emerald-400 transition-all">
          <div className="flex items-center justify-between">
            <h5 className="text-sm font-black text-emerald-950">SYNTYPE</h5>
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-200 text-emerald-900">CO-TYPES</span>
          </div>
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            Any one of two or more specimens cited by an author when no single holotype was designated in original publication.
          </p>
        </div>
      </div>
    </div>
  );
};
