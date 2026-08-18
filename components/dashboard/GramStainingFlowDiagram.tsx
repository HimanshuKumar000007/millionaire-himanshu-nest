"use client";

import React from "react";
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Microscope, Layers } from "lucide-react";

export const GramStainingFlowDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-purple-50/20 to-slate-50 border border-purple-100/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200 shadow-2xs flex items-center gap-1.5">
          <Microscope className="w-3.5 h-3.5 text-purple-600" />
          DIFFERENTIAL STAINING PROTOCOL
        </span>
        <div className="p-5 rounded-2xl bg-white border border-purple-200/90 shadow-sm w-full space-y-1.5 group hover:border-purple-400 transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            GRAM STAINING MECHANISM (Christian Gram, 1884)
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Differentiates Bacterial Cell Walls via Peptidoglycan Density &amp; Lipid Solvent Action
          </p>
        </div>
      </div>

      {/* 4 Step Process Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Step 1: Crystal Violet */}
        <div className="p-4 rounded-2xl bg-white border-2 border-indigo-200 shadow-2xs space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-100 text-indigo-800">
                Step 1 (1 min)
              </span>
              <span className="h-4 w-4 rounded-full bg-indigo-600"></span>
            </div>
            <h5 className="text-xs font-black text-slate-900">Crystal Violet</h5>
            <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
              Primary basic dye. Stains all bacterial protoplasts deep purple/blue.
            </p>
          </div>
          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 p-1.5 rounded-lg text-center">
            All cells: Purple
          </span>
        </div>

        {/* Step 2: Gram's Iodine */}
        <div className="p-4 rounded-2xl bg-white border-2 border-amber-200 shadow-2xs space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-amber-100">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-100 text-amber-800">
                Step 2 (1 min)
              </span>
              <span className="h-4 w-4 rounded-full bg-amber-600"></span>
            </div>
            <h5 className="text-xs font-black text-slate-900">Gram&apos;s Iodine (Mordant)</h5>
            <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
              Forms insoluble CV-Iodine complex inside the peptidoglycan meshwork.
            </p>
          </div>
          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 p-1.5 rounded-lg text-center">
            CV-I Complex Formed
          </span>
        </div>

        {/* Step 3: Decolorizer */}
        <div className="p-4 rounded-2xl bg-white border-2 border-slate-300 shadow-2xs space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-slate-200 text-slate-800">
                Step 3 (10–30 s)
              </span>
              <span className="h-4 w-4 rounded-full bg-slate-400"></span>
            </div>
            <h5 className="text-xs font-black text-slate-900">95% Ethyl Alcohol / Acetone</h5>
            <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
              Dissolves Gram- lipid outer membrane; dehydrates thick Gram+ peptidoglycan pores.
            </p>
          </div>
          <span className="text-[10px] font-bold text-slate-800 bg-slate-100 p-1.5 rounded-lg text-center">
            Gram- loses dye
          </span>
        </div>

        {/* Step 4: Safranin Counterstain */}
        <div className="p-4 rounded-2xl bg-white border-2 border-rose-200 shadow-2xs space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-rose-100">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-100 text-rose-800">
                Step 4 (30–60 s)
              </span>
              <span className="h-4 w-4 rounded-full bg-rose-500"></span>
            </div>
            <h5 className="text-xs font-black text-slate-900">Safranin (Counterstain)</h5>
            <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
              Counterstains decolorized Gram-negative cells pink/red without altering Gram+.
            </p>
          </div>
          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 p-1.5 rounded-lg text-center">
            Gram- : Pink/Red
          </span>
        </div>

      </div>

      {/* Two Outcome Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900 to-purple-900 text-white shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 block">
              Thick Multi-layered Peptidoglycan (20–80 nm)
            </span>
            <h5 className="text-base font-black text-white">
              GRAM-POSITIVE: PURPLE / BLUE
            </h5>
          </div>
          <div className="h-9 w-9 rounded-xl bg-white/20 flex items-center justify-center font-black text-sm">
            G+
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-700 to-pink-700 text-white shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-200 block">
              Thin Peptidoglycan (2–7 nm) + Outer LPS Membrane
            </span>
            <h5 className="text-base font-black text-white">
              GRAM-NEGATIVE: PINK / RED
            </h5>
          </div>
          <div className="h-9 w-9 rounded-xl bg-white/20 flex items-center justify-center font-black text-sm">
            G-
          </div>
        </div>
      </div>

    </div>
  );
};
