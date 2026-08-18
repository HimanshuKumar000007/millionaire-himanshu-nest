"use client";

import React from "react";
import { Sparkles, Dna, ShieldCheck, Flame } from "lucide-react";

export const MembraneLipidDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border border-indigo-100/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-indigo-100">
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-[#4F46E5] border border-indigo-200 flex items-center gap-1.5 w-fit">
            <Sparkles className="w-3 h-3 text-[#4F46E5]" />
            BIOCHEMICAL COMPARISON MATRIX
          </span>
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            MEMBRANE LIPID BIOCHEMISTRY
          </h4>
          <p className="text-xs sm:text-sm font-medium text-slate-600">
            D-Glycerol Ester vs. L-Glycerol Ether Linkages &amp; Hydrocarbon Architecture
          </p>
        </div>
      </div>

      {/* 2 Column Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: BACTERIA / EUKARYA */}
        <div className="rounded-2xl bg-white border-2 border-indigo-200 p-5 space-y-4 shadow-2xs hover:border-indigo-400 transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center font-black">
                <Dna className="w-4 h-4" />
              </div>
              <h5 className="text-sm sm:text-base font-black text-slate-900">
                BACTERIA / EUKARYA
              </h5>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-100 text-indigo-800">
              ESTER LINKAGE
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 space-y-1.5">
              <span className="text-[10px] font-extrabold text-indigo-600 block uppercase">1. Glycerol Stereochemistry</span>
              <div className="font-bold text-slate-900">D-Glycerol-3-Phosphate</div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-indigo-950 space-y-1.5">
              <span className="text-[10px] font-extrabold text-[#4F46E5] block uppercase">2. Chemical Bond</span>
              <div className="font-extrabold text-slate-900 flex items-center gap-2">
                <span>[Ester Linkage]</span>
                <span className="text-xs text-indigo-600 font-mono">O=C─O─CH₂</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 space-y-1.5">
              <span className="text-[10px] font-extrabold text-indigo-600 block uppercase">3. Hydrocarbon Chain</span>
              <div className="font-bold text-slate-900">Unbranched Fatty Acids (Straight Chain)</div>
            </div>
          </div>
        </div>

        {/* Right Column: ARCHAEA */}
        <div className="rounded-2xl bg-white border-2 border-emerald-200 p-5 space-y-4 shadow-2xs hover:border-emerald-400 transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
                <Flame className="w-4 h-4" />
              </div>
              <h5 className="text-sm sm:text-base font-black text-slate-900">
                ARCHAEA
              </h5>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800">
              ETHER LINKAGE
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 space-y-1.5">
              <span className="text-[10px] font-extrabold text-emerald-600 block uppercase">1. Glycerol Stereochemistry</span>
              <div className="font-bold text-slate-900">L-Glycerol-1-Phosphate</div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-emerald-950 space-y-1.5">
              <span className="text-[10px] font-extrabold text-emerald-700 block uppercase">2. Chemical Bond</span>
              <div className="font-extrabold text-slate-900 flex items-center gap-2">
                <span>[Ether Linkage]</span>
                <span className="text-xs text-emerald-700 font-mono">O─CH₂</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 space-y-1.5">
              <span className="text-[10px] font-extrabold text-emerald-600 block uppercase">3. Hydrocarbon Chain</span>
              <div className="font-bold text-slate-900">Branched Isoprenoids (Phytanyl Chains)</div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Key Note */}
      <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100 flex items-center gap-3 text-xs font-extrabold text-emerald-900">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Thermal Stability Advantage: Ether-linked isoprenoid monolayer tetraethers allow hyperthermophilic Archaea to survive high temperatures (up to 121&deg;C) without membrane detachment.</span>
      </div>
    </div>
  );
};
