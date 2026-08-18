"use client";

import React from "react";
import { Sparkles, Zap, ShieldAlert, Layers, RefreshCw } from "lucide-react";

export const ViralCyclesDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border border-indigo-100/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-[#4F46E5] border border-indigo-200 shadow-2xs flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-[#4F46E5]" />
          BACTERIOPHAGE MULTIPLICATION PATHWAYS
        </span>
        <div className="p-5 rounded-2xl bg-white border border-indigo-200/90 shadow-sm w-full space-y-1.5 group hover:border-[#4F46E5] transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            LYTIC vs. LYSOGENIC VIRAL LIFE CYCLES
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Virulent Phage Destruction (T4) vs. Temperate Phage Integration (Lambda λ)
          </p>
        </div>
      </div>

      {/* Common Entry Stage */}
      <div className="max-w-md mx-auto p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Initial Attachment</span>
        <h5 className="text-xs font-black text-slate-900">Adsorption &amp; Genome Injection</h5>
        <p className="text-[11px] text-slate-600 font-medium">Tail fibers bind bacterial LPS/receptors; lysozyme punctures wall for DNA injection.</p>
      </div>

      {/* 2 Pathways Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Lytic Pathway */}
        <div className="rounded-2xl bg-white border-2 border-rose-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-rose-100">
              <div>
                <h5 className="text-sm font-black text-slate-900">LYTIC CYCLE</h5>
                <span className="text-[10px] font-bold text-rose-600">Virulent Phage (e.g., T4)</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-100 text-rose-800">
                Host Lysis
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-100 space-y-0.5">
                <span className="font-bold text-rose-950 block">1. Host Takeover:</span>
                <p className="text-[11px] text-slate-600">Bacterial chromosome degraded; host machinery hijacked.</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="font-bold text-slate-900 block">2. Biosynthesis:</span>
                <p className="text-[11px] text-slate-600">Viral transcription &amp; translation produce hundreds of capsomeres.</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="font-bold text-slate-900 block">3. Assembly:</span>
                <p className="text-[11px] text-slate-600">DNA packaged into icosahedral heads; tails attached.</p>
              </div>

              <div className="p-2.5 rounded-xl bg-rose-100/70 border border-rose-200 space-y-0.5">
                <span className="font-bold text-rose-950 block">4. Lysis &amp; Release:</span>
                <p className="text-[11px] text-rose-900 font-bold">Endolysin bursts host wall $\rightarrow$ releases 100–200 progeny virions.</p>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 text-xs font-bold text-rose-950 text-center">
            Immediate Cell Death &amp; Plaque Formation
          </div>
        </div>

        {/* Lysogenic Pathway */}
        <div className="rounded-2xl bg-white border-2 border-indigo-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-indigo-100">
              <div>
                <h5 className="text-sm font-black text-slate-900">LYSOGENIC CYCLE</h5>
                <span className="text-[10px] font-bold text-[#4F46E5]">Temperate Phage (e.g., Lambda λ)</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-100 text-indigo-800">
                Prophage Latency
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-0.5">
                <span className="font-bold text-indigo-950 block">1. Integration:</span>
                <p className="text-[11px] text-slate-600">Phage DNA integrates into circular bacterial chromosome via integrase.</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="font-bold text-slate-900 block">2. Prophage State:</span>
                <p className="text-[11px] text-slate-600">Viral genome remains silent/dormant, controlled by repressor proteins.</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="font-bold text-slate-900 block">3. Host Division:</span>
                <p className="text-[11px] text-slate-600">Replicates passively every time host bacterium divides.</p>
              </div>

              <div className="p-2.5 rounded-xl bg-indigo-100/70 border border-indigo-200 space-y-0.5">
                <span className="font-bold text-indigo-950 block">4. Induction Event:</span>
                <p className="text-[11px] text-indigo-900 font-bold">UV radiation/chemical stress activates RecA $\rightarrow$ excises into lytic cascade.</p>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-950 text-center">
            Stable Symbiosis until Stress-Triggered Induction
          </div>
        </div>

      </div>

    </div>
  );
};
