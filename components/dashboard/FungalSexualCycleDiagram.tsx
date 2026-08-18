"use client";

import React from "react";
import { Sparkles, GitBranch, ArrowRight, ArrowDown, Activity, Layers, Atom } from "lucide-react";

export const FungalSexualCycleDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-purple-50/20 to-slate-50 border border-purple-100/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200 shadow-2xs flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-purple-600" />
          EUMYCOTA REPRODUCTIVE LIFECYCLE
        </span>
        <div className="p-5 rounded-2xl bg-white border border-purple-200/90 shadow-sm w-full space-y-1.5 group hover:border-purple-400 transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            STAGES OF THE FUNGAL SEXUAL CYCLE
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Sequential Progression: Plasmogamy $\rightarrow$ Dikaryophase $(n+n) \rightarrow$ Karyogamy $(2n) \rightarrow$ Meiosis $(n)$
          </p>
        </div>
      </div>

      {/* 4 Step Sequential Chain */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stage 1: Plasmogamy */}
        <div className="p-4 rounded-2xl bg-white border-2 border-indigo-200 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-100 text-indigo-800">
                Phase 1
              </span>
              <span className="text-[10px] font-black text-indigo-600">Haploid (n)</span>
            </div>
            <h5 className="text-sm font-black text-slate-900">PLASMOGAMY</h5>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Fusion of cytoplasm/protoplasts between two compatible mating strains (+ and -).
            </p>
          </div>
          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 p-1.5 rounded-lg text-center">
            Cytoplasmic Fusion
          </span>
        </div>

        {/* Stage 2: Dikaryophase */}
        <div className="p-4 rounded-2xl bg-white border-2 border-purple-300 shadow-2xs space-y-3 flex flex-col justify-between bg-gradient-to-b from-purple-50/40 to-white">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-purple-200">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-200 text-purple-900">
                Phase 2
              </span>
              <span className="text-[10px] font-black text-purple-700">Dikaryon (n + n)</span>
            </div>
            <h5 className="text-sm font-black text-purple-950">DIKARYOPHASE</h5>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Two unfused haploid nuclei coexist and divide synchronously per cell (Ascomycetes &amp; Basidiomycetes).
            </p>
          </div>
          <span className="text-[10px] font-bold text-purple-800 bg-purple-100 p-1.5 rounded-lg text-center">
            Extended in Higher Fungi
          </span>
        </div>

        {/* Stage 3: Karyogamy */}
        <div className="p-4 rounded-2xl bg-white border-2 border-rose-200 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-rose-100">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-100 text-rose-800">
                Phase 3
              </span>
              <span className="text-[10px] font-black text-rose-600">Diploid (2n)</span>
            </div>
            <h5 className="text-sm font-black text-slate-900">KARYOGAMY</h5>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Fusion of the two haploid nuclei forming a transient diploid zygote nucleus $(2n)$.
            </p>
          </div>
          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 p-1.5 rounded-lg text-center">
            Nuclear Fusion
          </span>
        </div>

        {/* Stage 4: Meiosis */}
        <div className="p-4 rounded-2xl bg-white border-2 border-emerald-200 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800">
                Phase 4
              </span>
              <span className="text-[10px] font-black text-emerald-600">Haploid Spores (n)</span>
            </div>
            <h5 className="text-sm font-black text-slate-900">MEIOSIS</h5>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Reduction division of the zygote restoring the haploid chromosome number $(n)$ into sexual spores.
            </p>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 p-1.5 rounded-lg text-center">
            Restores (n) Generation
          </span>
        </div>

      </div>

      {/* Bottom Takeaway */}
      <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-100 flex items-center justify-between gap-4 text-xs font-extrabold text-purple-950">
        <div className="flex items-center gap-2">
          <Atom className="w-4 h-4 text-purple-600 shrink-0" />
          <span>Key Rule: Lower fungi (Phycomycetes) undergo immediate Karyogamy without a dikaryophase, whereas Ascomycetes &amp; Basidiomycetes show a distinct (n + n) stage!</span>
        </div>
      </div>

    </div>
  );
};
