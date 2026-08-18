"use client";

import React from "react";
import { Sparkles, GitBranch, ArrowRight, RefreshCw, Layers } from "lucide-react";

export const ClampConnectionDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border border-indigo-100/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-[#4F46E5] border border-indigo-200 shadow-2xs flex items-center gap-1.5">
          <RefreshCw className="w-3.5 h-3.5 text-[#4F46E5]" />
          BASIDIOMYCETE HYPHAL CYTOLOGY
        </span>
        <div className="p-5 rounded-2xl bg-white border border-indigo-200/90 shadow-sm w-full space-y-1.5 group hover:border-[#4F46E5] transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            CLAMP CONNECTION DYNAMICS
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Hook Bypass Structure Ensuring Equal Segregation of Dikaryotic Nuclei $(n + n)$
          </p>
        </div>
      </div>

      {/* 3 Step Stage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Step 1 */}
        <div className="p-4 rounded-2xl bg-white border-2 border-indigo-200 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-100 text-indigo-800">
                Step 1
              </span>
              <span className="text-[10px] font-bold text-indigo-600">Hook Emergence</span>
            </div>
            <h5 className="text-xs sm:text-sm font-black text-slate-900">
              Backward Clamp Formation
            </h5>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              A lateral pouch (clamp hook) arches backward between the two nuclei (A and B). Synchronous mitosis begins.
            </p>
          </div>
          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 p-1.5 rounded-lg text-center">
            Synchronous Nuclear Division
          </span>
        </div>

        {/* Step 2 */}
        <div className="p-4 rounded-2xl bg-white border-2 border-purple-200 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-purple-100">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-100 text-purple-800">
                Step 2
              </span>
              <span className="text-[10px] font-bold text-purple-600">Nuclear Migration</span>
            </div>
            <h5 className="text-xs sm:text-sm font-black text-slate-900">
              Differential Migration
            </h5>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              One daughter of <strong>Nucleus A</strong> migrates into the clamp pouch; <strong>Nucleus B</strong> divides along the main hyphal axis.
            </p>
          </div>
          <span className="text-[10px] font-bold text-purple-700 bg-purple-50 p-1.5 rounded-lg text-center">
            Pouch Traps Nucleus A
          </span>
        </div>

        {/* Step 3 */}
        <div className="p-4 rounded-2xl bg-white border-2 border-emerald-200 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800">
                Step 3
              </span>
              <span className="text-[10px] font-bold text-emerald-600">Dikaryon Restored</span>
            </div>
            <h5 className="text-xs sm:text-sm font-black text-slate-900">
              Septation &amp; Fusion
            </h5>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Septa form across the clamp base and main axis. Clamp fuses to sub-apical cell, restoring $(A + B)$ dikaryon in both cells.
            </p>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 p-1.5 rounded-lg text-center">
            Both Sister Cells are (n + n)
          </span>
        </div>

      </div>

      {/* Takeaway */}
      <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between gap-4 text-xs font-extrabold text-[#4F46E5]">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-[#4F46E5] shrink-0" />
          <span>NEST Concept: Clamp connections are exclusive to Basidiomycetes and function as a mechanical safeguard to perpetuate the dikaryotic phase!</span>
        </div>
      </div>

    </div>
  );
};
