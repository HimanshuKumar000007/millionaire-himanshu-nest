"use client";

import React from "react";
import { Sparkles, Book, FileText, Layers, List } from "lucide-react";

export const TaxonomicLiteratureDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border border-indigo-100/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-indigo-100">
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-[#4F46E5] border border-indigo-200 flex items-center gap-1.5 w-fit">
            <Sparkles className="w-3 h-3 text-[#4F46E5]" />
            SPECIALIZED PUBLICATION MATRIX
          </span>
          <h4 className="text-xl font-black text-slate-900 tracking-tight">
            TAXONOMIC LITERATURE CLASSIFICATION
          </h4>
          <p className="text-xs text-slate-600 font-medium">
            Published reference tools for plant/animal identification and distribution
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* FLORA */}
        <div className="p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-200 space-y-2 hover:border-emerald-400 transition-all flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Book className="w-4 h-4 text-emerald-700" />
              <h5 className="text-sm font-black text-emerald-950">FLORA</h5>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Provides actual account of habitat, distribution, and seasonal occurrence of plant species in a specific geographic area.
            </p>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-200 text-emerald-900 w-fit">HABITAT INDEX</span>
        </div>

        {/* MANUAL */}
        <div className="p-4 rounded-2xl bg-indigo-50/80 border-2 border-indigo-200 space-y-2 hover:border-indigo-400 transition-all flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#4F46E5]" />
              <h5 className="text-sm font-black text-indigo-950">MANUAL</h5>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Practical handbook providing identification keys and diagnostic names of species found in a given area.
            </p>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-200 text-indigo-900 w-fit">AREA KEYS</span>
        </div>

        {/* MONOGRAPH */}
        <div className="p-4 rounded-2xl bg-purple-50/80 border-2 border-purple-200 space-y-2 hover:border-purple-400 transition-all flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-700" />
              <h5 className="text-sm font-black text-purple-950">MONOGRAPH</h5>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Comprehensive publication containing exhaustive information on <strong>ANY ONE TAXON</strong> (e.g. Solanaceae or Pinus).
            </p>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-200 text-purple-900 w-fit">ONE TAXON</span>
        </div>

        {/* CATALOGUE */}
        <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2 hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <List className="w-4 h-4 text-slate-700" />
              <h5 className="text-sm font-black text-slate-900">CATALOGUE</h5>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Alphabetical or systematic register listing all species recorded in a territory with full citations.
            </p>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-slate-200 text-slate-800 w-fit">ALPHABETICAL LIST</span>
        </div>
      </div>
    </div>
  );
};
