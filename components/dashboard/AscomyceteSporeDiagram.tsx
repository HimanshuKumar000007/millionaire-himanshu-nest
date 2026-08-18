"use client";

import React from "react";
import { Sparkles, Dna, ArrowRight, Layers, CheckCircle2, ShieldAlert } from "lucide-react";

export const AscomyceteSporeDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border border-indigo-100/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-[#4F46E5] border border-indigo-200 shadow-2xs flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#4F46E5]" />
          ASCOGENESIS &amp; SPORULATION
        </span>
        <div className="p-5 rounded-2xl bg-white border border-indigo-200/90 shadow-sm w-full space-y-1.5 group hover:border-[#4F46E5] transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            ASCOMYCETE SPORE FORMATION
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Karyogamy in Ascus Initial $\rightarrow$ 1 Meiosis + 1 Mitosis $\rightarrow$ 8 Endogenous Ascospores
          </p>
        </div>
      </div>

      {/* 4 Step Sequential Process */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Step 1: Karyogamy */}
        <div className="p-4 rounded-2xl bg-white border-2 border-indigo-200 shadow-2xs space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-100 text-indigo-800">
                1. Karyogamy
              </span>
              <span className="text-[10px] font-black text-indigo-600">Diploid (2n)</span>
            </div>
            <h5 className="text-xs font-black text-slate-900">Ascus Initial Cell</h5>
            <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
              Dikaryotic ascogenous hypha tip (crozier) undergoes nuclear fusion forming a diploid zygote nucleus $(2n)$.
            </p>
          </div>
          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 p-1 rounded-lg text-center">
            Zygote (2n)
          </span>
        </div>

        {/* Step 2: Meiosis */}
        <div className="p-4 rounded-2xl bg-white border-2 border-purple-200 shadow-2xs space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-purple-100">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-100 text-purple-800">
                2. Meiosis
              </span>
              <span className="text-[10px] font-black text-purple-600">Meiotic (n)</span>
            </div>
            <h5 className="text-xs font-black text-slate-900">4 Haploid Nuclei</h5>
            <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
              Diploid zygotic nucleus undergoes Meiosis I &amp; II, generating <strong>4 haploid nuclei $(n)$</strong>.
            </p>
          </div>
          <span className="text-[10px] font-bold text-purple-700 bg-purple-50 p-1 rounded-lg text-center">
            4 Nuclei (n)
          </span>
        </div>

        {/* Step 3: Mitosis */}
        <div className="p-4 rounded-2xl bg-white border-2 border-amber-200 shadow-2xs space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-amber-100">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-100 text-amber-800">
                3. Mitosis
              </span>
              <span className="text-[10px] font-black text-amber-600">1 Equational Round</span>
            </div>
            <h5 className="text-xs font-black text-slate-900">8 Haploid Nuclei</h5>
            <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
              Each of the 4 haploid nuclei divides once mitotically, producing <strong>8 haploid daughter nuclei</strong>.
            </p>
          </div>
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 p-1 rounded-lg text-center">
            8 Nuclei (n)
          </span>
        </div>

        {/* Step 4: Spore Cleavage */}
        <div className="p-4 rounded-2xl bg-white border-2 border-emerald-200 shadow-2xs space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800">
                4. Free Cell Cleavage
              </span>
              <span className="text-[10px] font-black text-emerald-600">Endogenous</span>
            </div>
            <h5 className="text-xs font-black text-slate-900">8 ASCOSPORES</h5>
            <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
              Cytoplasm condenses around each nucleus forming wall coats inside the sac-like <strong>Ascus</strong>.
            </p>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 p-1 rounded-lg text-center">
            8 Endogenous Spores / Ascus
          </span>
        </div>

      </div>

      {/* Takeaway */}
      <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between gap-4 text-xs font-extrabold text-[#4F46E5]">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#4F46E5] shrink-0" />
          <span>High-Yield Contrast: Ascomycetes form 8 ENDOGENOUS ascospores per ascus; Basidiomycetes form 4 EXOGENOUS basidiospores per basidium!</span>
        </div>
      </div>

    </div>
  );
};
