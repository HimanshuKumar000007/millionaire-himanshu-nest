"use client";

import React from "react";
import { Sparkles, Layers, ShieldCheck, Microscope, Cpu } from "lucide-react";

export const BacteriophageStructureDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border border-indigo-100/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-[#4F46E5] border border-indigo-200 shadow-2xs flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-[#4F46E5]" />
          BINAL SYMMETRY VIRION ARCHITECTURE
        </span>
        <div className="p-5 rounded-2xl bg-white border border-indigo-200/90 shadow-sm w-full space-y-1.5 group hover:border-[#4F46E5] transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            T-EVEN BACTERIOPHAGE ULTRASTRUCTURE
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Complex Architecture with Icosahedral Head, Helical Contractile Sheath &amp; Hexagonal Base Plate
          </p>
        </div>
      </div>

      {/* Structural Layers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Head */}
        <div className="p-4 rounded-2xl bg-white border-2 border-indigo-200 shadow-2xs space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-100 text-indigo-800">
              Region 1
            </span>
            <h5 className="text-xs font-black text-slate-900">Icosahedral Head</h5>
            <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
              Prismatic polyhedral capsid containing a tightly condensed copy of <strong>double-stranded DNA (dsDNA)</strong>.
            </p>
          </div>
          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 p-1.5 rounded-lg text-center">
            Houses dsDNA Genome
          </span>
        </div>

        {/* Collar & Neck */}
        <div className="p-4 rounded-2xl bg-white border-2 border-slate-300 shadow-2xs space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-slate-200 text-slate-800">
              Region 2
            </span>
            <h5 className="text-xs font-black text-slate-900">Collar / Neck</h5>
            <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
              Connecting disc-like junction between the icosahedral capsid head and the helical tail.
            </p>
          </div>
          <span className="text-[10px] font-bold text-slate-800 bg-slate-100 p-1.5 rounded-lg text-center">
            Structural Joint
          </span>
        </div>

        {/* Sheath */}
        <div className="p-4 rounded-2xl bg-white border-2 border-purple-200 shadow-2xs space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-100 text-purple-800">
              Region 3
            </span>
            <h5 className="text-xs font-black text-slate-900">Contractile Sheath</h5>
            <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
              Helical protein cylinder surrounding a central hollow tube. Contracts via ATP hydrolysis to inject DNA.
            </p>
          </div>
          <span className="text-[10px] font-bold text-purple-700 bg-purple-50 p-1.5 rounded-lg text-center">
            Injection Mechanism
          </span>
        </div>

        {/* Base Plate & Tail Fibers */}
        <div className="p-4 rounded-2xl bg-white border-2 border-emerald-200 shadow-2xs space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800">
              Region 4
            </span>
            <h5 className="text-xs font-black text-slate-900">Base Plate &amp; Fibers</h5>
            <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
              Hexagonal plate with 6 tail pins and <strong>6 jointed tail fibers</strong> for host LPS recognition and docking.
            </p>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 p-1.5 rounded-lg text-center">
            Host Receptor Docking
          </span>
        </div>

      </div>

    </div>
  );
};
