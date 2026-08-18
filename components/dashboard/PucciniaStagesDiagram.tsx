"use client";

import React from "react";
import { Sparkles, Leaf, Wheat, ArrowRight, ShieldAlert, Layers } from "lucide-react";

export const PucciniaStagesDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-amber-50/20 to-slate-50 border border-amber-200/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200 shadow-2xs flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-amber-600" />
          HETEROECIOUS MACROCYCLIC RUST CYCLE
        </span>
        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm w-full space-y-1.5 group hover:border-amber-400 transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            THE FIVE SPORE STAGES OF PUCCINIA GRAMINIS
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Black Stem Rust of Wheat Alternating Between Primary Host (Wheat) &amp; Alternate Host (Barberry)
          </p>
        </div>
      </div>

      {/* 5 Stages List */}
      <div className="space-y-3">
        
        {/* Stage 0: Pycniospores */}
        <div className="p-4 rounded-2xl bg-white border-2 border-amber-200 shadow-2xs space-y-1 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-100 text-amber-800">
                Stage 0 (n)
              </span>
              <h5 className="text-xs sm:text-sm font-black text-slate-900">
                Pycniospores (Spermatia)
              </h5>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Upper surface of <strong>Barberry (*Berberis*)</strong> leaf. Acts as male gametes for spermatization (dikaryotization).
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
            <Leaf className="w-3.5 h-3.5 text-amber-600" />
            <span>Barberry (Upper)</span>
          </div>
        </div>

        {/* Stage I: Aeciospores */}
        <div className="p-4 rounded-2xl bg-white border-2 border-orange-200 shadow-2xs space-y-1 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-orange-100 text-orange-800">
                Stage I (n + n)
              </span>
              <h5 className="text-xs sm:text-sm font-black text-slate-900">
                Aeciospores (Aecidiospores)
              </h5>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Lower surface of <strong>Barberry</strong> leaf cup. Binucleate dikaryotic spores wind-blown to infect <strong>Wheat</strong>.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-orange-800 bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-200">
            <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
            <span>Barberry $\rightarrow$ Wheat</span>
          </div>
        </div>

        {/* Stage II: Urediniospores */}
        <div className="p-4 rounded-2xl bg-white border-2 border-rose-200 shadow-2xs space-y-1 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-100 text-rose-800">
                Stage II (n + n)
              </span>
              <h5 className="text-xs sm:text-sm font-black text-slate-900">
                Urediniospores (Repeating Spores)
              </h5>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Brown rust pustules on <strong>Wheat leaves/stems</strong> (Summer). Spreads epidemically from wheat plant to wheat plant.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-rose-800 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200">
            <Wheat className="w-3.5 h-3.5 text-rose-600" />
            <span>Wheat (Repeating)</span>
          </div>
        </div>

        {/* Stage III: Teliospores */}
        <div className="p-4 rounded-2xl bg-white border-2 border-slate-300 shadow-2xs space-y-1 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-slate-200 text-slate-800">
                Stage III (n+n $\rightarrow$ 2n)
              </span>
              <h5 className="text-xs sm:text-sm font-black text-slate-900">
                Teliospores (Teleutospores / Black Rust)
              </h5>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              2-celled, thick-walled black resting spores on <strong>Wheat stems</strong> (Autumn). Overwinters in soil; karyogamy occurs here.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            <Wheat className="w-3.5 h-3.5 text-slate-600" />
            <span>Wheat (Overwintering)</span>
          </div>
        </div>

        {/* Stage IV: Basidiospores */}
        <div className="p-4 rounded-2xl bg-white border-2 border-emerald-200 shadow-2xs space-y-1 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800">
                Stage IV (n)
              </span>
              <h5 className="text-xs sm:text-sm font-black text-slate-900">
                Basidiospores (Sporidia)
              </h5>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Formed exogenously on promycelium in soil after meiosis. Inoculates <strong>Barberry</strong> to restart cycle (cannot infect wheat).
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
            <span>Soil $\rightarrow$ Barberry</span>
          </div>
        </div>

      </div>

      {/* Takeaway */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center justify-between gap-4 text-xs font-extrabold text-amber-950">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Mnemonic: 0 (Pycnio) &amp; I (Aecio) on Barberry; II (Uredinio) &amp; III (Telio) on Wheat; IV (Basidio) in soil infecting Barberry!</span>
        </div>
      </div>

    </div>
  );
};
