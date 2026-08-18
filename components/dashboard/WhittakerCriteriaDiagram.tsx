"use client";

import React from "react";
import { Sparkles, Cpu, Layers, Utensils, HeartHandshake, GitCommit } from "lucide-react";

export const WhittakerCriteriaDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border border-indigo-100/90 p-6 sm:p-8 shadow-md space-y-8 select-none">
      
      {/* ROOT NODE (TOP LEVEL) */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200 shadow-2xs flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          WHITTAKER&apos;S 5 CRITERIA
        </span>
        <div className="p-5 rounded-2xl bg-white border border-indigo-200/90 shadow-sm w-full space-y-1.5 group hover:border-[#4F46E5] transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            WHITTAKER&apos;S FIVE CLASSIFICATION CRITERIA
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            The five fundamental biological criteria used by Robert H. Whittaker (1969)
          </p>
        </div>
      </div>

      {/* 5 BRANCH GRID CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
        
        {/* CRITERION 1 */}
        <div className="rounded-2xl bg-white border-2 border-indigo-200/90 p-4 shadow-2xs space-y-2.5 hover:border-indigo-400 transition-all">
          <div className="flex items-center gap-2 pb-2 border-b border-indigo-100">
            <div className="h-7 w-7 rounded-lg bg-indigo-50 text-[#4F46E5] flex items-center justify-center font-black">
              <Cpu className="h-3.5 w-3.5" />
            </div>
            <h5 className="text-xs font-black text-slate-900 leading-tight">
              1. Cell Structure
            </h5>
          </div>
          <span className="inline-block px-2 py-0.5 rounded text-[9px] font-black bg-indigo-100 text-indigo-800">
            Complexity
          </span>
          <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
            Prokaryotic (lacking nuclear membrane &amp; organelles) vs. Eukaryotic.
          </p>
        </div>

        {/* CRITERION 2 */}
        <div className="rounded-2xl bg-white border-2 border-purple-200/90 p-4 shadow-2xs space-y-2.5 hover:border-purple-400 transition-all">
          <div className="flex items-center gap-2 pb-2 border-b border-purple-100">
            <div className="h-7 w-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-black">
              <Layers className="h-3.5 w-3.5" />
            </div>
            <h5 className="text-xs font-black text-slate-900 leading-tight">
              2. Body Complexity
            </h5>
          </div>
          <span className="inline-block px-2 py-0.5 rounded text-[9px] font-black bg-purple-100 text-purple-800">
            Organization
          </span>
          <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
            Unicellular vs. Multicellular / Tissue-level / Organ-system level.
          </p>
        </div>

        {/* CRITERION 3 */}
        <div className="rounded-2xl bg-white border-2 border-emerald-200/90 p-4 shadow-2xs space-y-2.5 hover:border-emerald-400 transition-all">
          <div className="flex items-center gap-2 pb-2 border-b border-emerald-100">
            <div className="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
              <Utensils className="h-3.5 w-3.5" />
            </div>
            <h5 className="text-xs font-black text-slate-900 leading-tight">
              3. Nutrition Mode
            </h5>
          </div>
          <span className="inline-block px-2 py-0.5 rounded text-[9px] font-black bg-emerald-100 text-emerald-800">
            Metabolic
          </span>
          <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
            Holophytic (Plantae), Absorptive Saprotrophic (Fungi), Holozoic (Animalia).
          </p>
        </div>

        {/* CRITERION 4 */}
        <div className="rounded-2xl bg-white border-2 border-rose-200/90 p-4 shadow-2xs space-y-2.5 hover:border-rose-400 transition-all">
          <div className="flex items-center gap-2 pb-2 border-b border-rose-100">
            <div className="h-7 w-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-black">
              <HeartHandshake className="h-3.5 w-3.5" />
            </div>
            <h5 className="text-xs font-black text-slate-900 leading-tight">
              4. Reproduction
            </h5>
          </div>
          <span className="inline-block px-2 py-0.5 rounded text-[9px] font-black bg-rose-100 text-rose-800">
            Strategy
          </span>
          <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
            Asexual division, vegetative propagation, or complex sexual cycles.
          </p>
        </div>

        {/* CRITERION 5 */}
        <div className="rounded-2xl bg-white border-2 border-amber-200/90 p-4 shadow-2xs space-y-2.5 hover:border-amber-400 transition-all">
          <div className="flex items-center gap-2 pb-2 border-b border-amber-100">
            <div className="h-7 w-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-black">
              <GitCommit className="h-3.5 w-3.5" />
            </div>
            <h5 className="text-xs font-black text-slate-900 leading-tight">
              5. Phylogeny
            </h5>
          </div>
          <span className="inline-block px-2 py-0.5 rounded text-[9px] font-black bg-amber-100 text-amber-800">
            Evolutionary
          </span>
          <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
            Inferred lines of common ancestry based on comparative morphology and fossils.
          </p>
        </div>

      </div>

      {/* Bottom Key Takeaway Bar */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex items-center justify-between gap-4 text-xs font-extrabold text-amber-950">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Whittaker&apos;s primary distinction between Eukaryotes (Fungi, Plantae, Animalia) is based on NUTRITION (Absorptive vs Photosynthetic vs Ingestive).</span>
        </div>
      </div>
    </div>
  );
};
