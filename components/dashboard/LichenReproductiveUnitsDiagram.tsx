"use client";

import React from "react";
import { Sparkles, Wind, Layers, ArrowRight, ShieldCheck, Leaf } from "lucide-react";

export const LichenReproductiveUnitsDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-emerald-50/20 to-slate-50 border border-emerald-100/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs flex items-center gap-1.5">
          <Leaf className="w-3.5 h-3.5 text-emerald-600" />
          VEGETATIVE PROPAGATION PROPAGULES
        </span>
        <div className="p-5 rounded-2xl bg-white border border-emerald-200/90 shadow-sm w-full space-y-1.5 group hover:border-emerald-400 transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            LICHEN REPRODUCTIVE UNITS
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Specialized Symbiotic Propagules Dispersing Both Mycobiont (Fungus) &amp; Phycobiont (Alga) Together
          </p>
        </div>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Soredia */}
        <div className="rounded-2xl bg-white border-2 border-emerald-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-black">
                  <Wind className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-sm font-black text-slate-900">SOREDIA</h5>
                  <span className="text-[10px] font-bold text-emerald-600">Microscopic Powder Dust</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800">
                Wind Dispersed
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-1">
                <span className="font-bold text-emerald-950 block">Ultrastructure:</span>
                <p className="text-[11px] text-slate-600">
                  Microscopic clusters of one or a few <strong>algal/cyanobacterial cells</strong> closely entangled in a meshwork of <strong>fungal hyphae</strong>.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Release &amp; Ecology:</span>
                <p className="text-[11px] text-slate-600">
                  Erupt from localized pustules (Soralia) on the upper cortex and are effortlessly transported as fine powdery dust by air currents.
                </p>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-100 text-xs font-bold text-emerald-950 text-center">
            Pustule Eruption (Soralia) • Long-Distance Wind Dispersal
          </div>
        </div>

        {/* Isidia */}
        <div className="rounded-2xl bg-white border-2 border-indigo-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-indigo-100">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-200 text-[#4F46E5] flex items-center justify-center font-black">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-sm font-black text-slate-900">ISIDIA</h5>
                  <span className="text-[10px] font-bold text-indigo-600">Corticated Columnar Outgrowths</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-100 text-indigo-800">
                Mechanical Breakage
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-1">
                <span className="font-bold text-indigo-950 block">Ultrastructure:</span>
                <p className="text-[11px] text-slate-600">
                  Cylindrical, coral-like, or branched macroscopic outgrowths of the thallus covered by an <strong>intact upper fungal cortex</strong> containing internal algal and fungal layers.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Dual Function:</span>
                <p className="text-[11px] text-slate-600">
                  Increases photosynthetic surface area when attached; breaks off mechanically (animals/raindrops) to initiate new lichen thalli.
                </p>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-indigo-50/80 border border-indigo-100 text-xs font-bold text-indigo-950 text-center">
            Corticated Columnar Stalks • Photosynthetic + Propagation
          </div>
        </div>

      </div>

      {/* Takeaway */}
      <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between gap-4 text-xs font-extrabold text-emerald-950">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>NEST Concept: Both Soredia and Isidia contain BOTH symbiotic partners (alga + fungus), ensuring immediate co-germination of a new lichen thallus!</span>
        </div>
      </div>

    </div>
  );
};
