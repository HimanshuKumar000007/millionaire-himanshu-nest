"use client";

import React from "react";
import { Sparkles, Layers, ShieldCheck, Microscope } from "lucide-react";

export const DoliporeSeptumDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-purple-50/20 to-slate-50 border border-purple-100/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200 shadow-2xs flex items-center gap-1.5">
          <Microscope className="w-3.5 h-3.5 text-purple-600" />
          BASIDIOMYCETE SEPTAL ULTRASTRUCTURE
        </span>
        <div className="p-5 rounded-2xl bg-white border border-purple-200/90 shadow-sm w-full space-y-1.5 group hover:border-purple-400 transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            DOLIPORE SEPTUM &amp; PARENTHOSOME CAP
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Specialized Barrel-Shaped Septal Swelling with Perforated Endoplasmic Reticulum Caps
          </p>
        </div>
      </div>

      {/* Cross Section Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Dolipore Swelling */}
        <div className="rounded-2xl bg-white border-2 border-purple-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-purple-100">
              <h5 className="text-sm font-black text-slate-900">Dolipore Swelling</h5>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-100 text-purple-800">
                Barrel Pore
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 space-y-1">
                <span className="font-bold text-purple-950 block">Structure:</span>
                <p className="text-[11px] text-slate-600">
                  The central hyphal cross-wall broadens into a distinct, barrel-shaped annulus around the pore opening.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Function:</span>
                <p className="text-[11px] text-slate-600">
                  Permits cytoplasmic streaming, small organelles, and nutrients to flow while mechanically restricting the passage of major nuclei between compartments.
                </p>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-purple-50/80 border border-purple-100 text-xs font-bold text-purple-950 text-center">
            Selective Organelle &amp; Cytoplasm Flow
          </div>
        </div>

        {/* Parenthosome Caps */}
        <div className="rounded-2xl bg-white border-2 border-indigo-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-indigo-100">
              <h5 className="text-sm font-black text-slate-900">Parenthosome Membrane Caps</h5>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-100 text-indigo-800">
                Curved Hoods
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-1">
                <span className="font-bold text-indigo-950 block">Origin:</span>
                <p className="text-[11px] text-slate-600">
                  Derived from modified endoplasmic reticulum (ER); forms curved, perforated dome-like caps over both sides of the dolipore.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Contrast:</span>
                <p className="text-[11px] text-slate-600">
                  Ascomycetes possess simple pores regulated by <strong>Woronin Bodies</strong>; Basidiomycetes uniquely feature dolipore septa with <strong>Parenthosomes</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-indigo-50/80 border border-indigo-100 text-xs font-bold text-indigo-950 text-center">
            Modified ER Domes Covering Septal Aperture
          </div>
        </div>

      </div>

    </div>
  );
};
