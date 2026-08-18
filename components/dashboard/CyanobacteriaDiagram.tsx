"use client";

import React from "react";
import { Sparkles, ShieldCheck, Sun, Layers, Atom, Zap } from "lucide-react";

export const CyanobacteriaDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-cyan-50/20 to-slate-50 border border-cyan-100/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      
      {/* Top Header Card */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-100 text-cyan-800 border border-cyan-200 shadow-2xs flex items-center gap-1.5">
          <Sun className="w-3.5 h-3.5 text-cyan-600" />
          OXYGENIC PHOTOSYNTHETIC PROKARYOTE
        </span>
        <div className="p-5 rounded-2xl bg-white border border-cyan-200/90 shadow-sm w-full space-y-1.5 group hover:border-cyan-400 transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            CYANOBACTERIA ULTRASTRUCTURE
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Blue-Green Algae (BGA) Cell Envelope &amp; Specialized Diazotrophic Heterocyst
          </p>
        </div>
      </div>

      {/* Main Structural Cross-Section Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left Column: Vegetative Cell Structure (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-white border-2 border-cyan-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-cyan-100">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-600 flex items-center justify-center font-black">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-sm font-black text-slate-900">
                    Vegetative Cell Envelope &amp; Thylakoids
                  </h5>
                  <span className="text-[10px] font-bold text-cyan-600 block">
                    Oxygenic Photosynthetic Machinery
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-cyan-100 text-cyan-800">
                Gram-Negative
              </span>
            </div>

            {/* Nested Structural Layers */}
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-cyan-50/70 border border-cyan-100 space-y-1">
                <span className="text-xs font-black text-cyan-950 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-cyan-500"></span>
                  1. Gelatinous Mucilage Sheath
                </span>
                <p className="text-[11px] font-medium text-slate-600 pl-3.5">
                  Outer pectic-polysaccharide layer preventing desiccation and facilitating colony adhesion.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-1">
                <span className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  2. Thylakoid Membrane System
                </span>
                <p className="text-[11px] font-medium text-slate-600 pl-3.5">
                  Unstacked peripheral lamellae containing <strong>Chlorophyll a</strong> and phycobilisomes (Phycocyanin: blue, Phycoerythrin: red).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-slate-500"></span>
                  3. Cytoplasmic Inclusions &amp; Gas Vacuoles
                </span>
                <p className="text-[11px] font-medium text-slate-600 pl-3.5">
                  Cyanophycean starch granules, lipid droplets, carboxysomes (RuBisCO), and pseudovacuoles for buoyancy.
                </p>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-cyan-50/80 border border-cyan-200 text-xs font-bold text-cyan-950 text-center">
            Performs Oxygenic Photosynthesis (PS-I + PS-II Active)
          </div>
        </div>

        {/* Right Column: Specialized Heterocyst Cell (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-white border-2 border-amber-300 p-5 shadow-2xs space-y-4 flex flex-col justify-between bg-gradient-to-b from-amber-50/30 to-white">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-amber-200">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center font-black">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-sm font-black text-amber-950">
                    Heterocyst (N₂-Fixation)
                  </h5>
                  <span className="text-[10px] font-bold text-amber-700 block">
                    Anaerobic Diazotrophic Cell
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-200 text-amber-900">
                Oxygen-Shielded
              </span>
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Specialized cell designed to protect the oxygen-sensitive <strong>Nitrogenase enzyme complex</strong>:
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                  1
                </div>
                <span className="text-amber-950 font-bold">
                  Thick Cell Wall: 3-layered glycolipid coat impermeable to O₂ gas diffusion.
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-rose-50/80 border border-rose-200 flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                  2
                </div>
                <span className="text-rose-950 font-bold">
                  PS-II ABSENT: No photolysis of water; zero O₂ generated internally.
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                  3
                </div>
                <span className="text-emerald-950 font-bold">
                  Active Nitrogenase: Catalyzes N₂ + 8H⁺ + 8e⁻ + 16ATP → 2NH₃ + H₂.
                </span>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-100/90 border border-amber-300 text-xs font-bold text-amber-950 text-center">
            Microaerophilic Microenvironment for Nitrogen Fixation
          </div>
        </div>

      </div>

      {/* Bottom Takeaway Bar */}
      <div className="p-4 rounded-2xl bg-cyan-50/80 border border-cyan-200 flex items-center justify-between gap-4 text-xs font-extrabold text-cyan-950">
        <div className="flex items-center gap-2">
          <Atom className="w-4 h-4 text-cyan-600 shrink-0" />
          <span>NEST Rule: Heterocysts have PS-I only (generate ATP via cyclic photophosphorylation) but LACK PS-II to prevent oxygen inactivation of nitrogenase!</span>
        </div>
      </div>

    </div>
  );
};
