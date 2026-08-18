"use client";

import React from "react";
import { Sparkles, AlertTriangle, CheckCircle2, ShieldCheck, HelpCircle, Layers, ArrowDown } from "lucide-react";

export const PropertiesOfLifeDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border border-indigo-100/90 p-6 sm:p-10 shadow-md space-y-8 select-none">
      
      {/* ════════════ ROOT NODE (TOP LEVEL) ════════════ */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-[#4F46E5] border border-indigo-200 shadow-2xs flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
          NEST / INBO CLASSIFICATION TREE
        </span>
        <div className="p-5 rounded-2xl bg-white border border-indigo-200/90 shadow-sm w-full space-y-1.5 group hover:border-[#4F46E5] transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            PROPERTIES OF LIFE
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Evaluated via Thermodynamic, Cellular &amp; Evolutionary Criteria
          </p>
        </div>
      </div>

      {/* ════════════ VISUAL SVG FLOWCHART CONNECTORS ════════════ */}
      <div className="w-full flex justify-center -my-2 select-none pointer-events-none">
        <svg
          className="w-full max-w-3xl h-16 text-indigo-400"
          viewBox="0 0 800 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top vertical line from root */}
          <line x1="400" y1="0" x2="400" y2="35" stroke="currentColor" strokeWidth="3" strokeDasharray="none" />
          
          {/* Horizontal branching bar */}
          <line x1="200" y1="35" x2="600" y2="35" stroke="currentColor" strokeWidth="3" />
          
          {/* Left vertical branch down to Characteristic Features */}
          <line x1="200" y1="35" x2="200" y2="70" stroke="currentColor" strokeWidth="3" />
          <polygon points="194,68 206,68 200,78" fill="currentColor" />

          {/* Right vertical branch down to Defining Properties */}
          <line x1="600" y1="35" x2="600" y2="70" stroke="currentColor" strokeWidth="3" />
          <polygon points="594,68 606,68 600,78" fill="currentColor" />
        </svg>
      </div>

      {/* ════════════ 2 BRANCH CHILD CARDS (BOTTOM LEVEL) ════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        
        {/* BRANCH 1: CHARACTERISTIC FEATURES */}
        <div className="rounded-2xl bg-white border-2 border-amber-200/90 p-5 sm:p-6 shadow-sm space-y-4 hover:border-amber-400 hover:shadow-md transition-all">
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-amber-100">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center font-black">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h5 className="text-base font-black text-slate-900">
                  CHARACTERISTIC FEATURES
                </h5>
                <span className="text-[11px] font-bold text-amber-700 block">
                  Non-Defining Attributes
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-200">
              NOT DEFINING
            </span>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 text-xs font-semibold text-amber-950 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Rule:</strong> Fails if exceptions exist in living entities <strong className="text-amber-800 underline decoration-amber-400">OR</strong> present in non-living matter.
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {/* Item 1 */}
            <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200 flex items-start gap-3 hover:bg-amber-50/40 transition-colors">
              <div className="h-6 w-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-extrabold">
                1
              </div>
              <div className="space-y-1">
                <h6 className="text-xs sm:text-sm font-black text-slate-900">
                  Growth <span className="text-[10px] font-bold text-slate-500">(Intrinsic vs. Extrinsic)</span>
                </h6>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Extrinsic accretion occurs in non-living objects (mountains, sand dunes). Intrinsic growth is sync&apos;d with reproduction in unicellular organisms.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200 flex items-start gap-3 hover:bg-amber-50/40 transition-colors">
              <div className="h-6 w-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-extrabold">
                2
              </div>
              <div className="space-y-1">
                <h6 className="text-xs sm:text-sm font-black text-slate-900">
                  Reproduction <span className="text-[10px] font-bold text-slate-500">(Sterility Exceptions)</span>
                </h6>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Sterile living exceptions exist (Mules, Hinnies, Worker Bees, Infertile couples).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BRANCH 2: DEFINING PROPERTIES */}
        <div className="rounded-2xl bg-white border-2 border-emerald-200/90 p-5 sm:p-6 shadow-sm space-y-4 hover:border-emerald-400 hover:shadow-md transition-all">
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-emerald-100">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-black">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h5 className="text-base font-black text-slate-900">
                  DEFINING PROPERTIES
                </h5>
                <span className="text-[11px] font-bold text-emerald-700 block">
                  Absolute Universal Criteria
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
              DEFINING
            </span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs font-semibold text-emerald-950 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Rule:</strong> Present in <strong className="text-emerald-900 underline decoration-emerald-400">ALL</strong> living organisms &amp; <strong className="text-emerald-900 underline decoration-emerald-400">NEVER</strong> present in non-living objects.
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {/* Item 1 */}
            <div className="p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-100 flex items-start gap-3 hover:bg-emerald-50/70 transition-colors">
              <div className="h-6 w-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-extrabold shadow-2xs">
                ✓
              </div>
              <div className="space-y-1">
                <h6 className="text-xs sm:text-sm font-black text-slate-900">
                  Cellular Organization
                </h6>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Membrane-bound cellular boundary maintaining localized low entropy via energy expenditure.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-100 flex items-start gap-3 hover:bg-emerald-50/70 transition-colors">
              <div className="h-6 w-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-extrabold shadow-2xs">
                ✓
              </div>
              <div className="space-y-1">
                <h6 className="text-xs sm:text-sm font-black text-slate-900">
                  Metabolism <span className="text-[10px] font-bold text-emerald-700">(In-Vivo Systems)</span>
                </h6>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Sum total of all chemical reactions. In-vitro reactions are living reactions, but the cell-free tube itself is not an organism.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-100 flex items-start gap-3 hover:bg-emerald-50/70 transition-colors">
              <div className="h-6 w-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-extrabold shadow-2xs">
                ✓
              </div>
              <div className="space-y-1">
                <h6 className="text-xs sm:text-sm font-black text-slate-900">
                  Consciousness &amp; Response to Stimuli
                </h6>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Universal environmental sensing &amp; photoperiodic response across all taxa. (Self-consciousness is limited to humans).
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Summary Bar */}
      <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between gap-4 text-xs font-extrabold text-[#4F46E5]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#4F46E5]" />
          <span>NEST Exam Key Tip: Verify BOTH universal presence &amp; non-living absence before declaring a property as defining!</span>
        </div>
      </div>
    </div>
  );
};
