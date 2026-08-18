"use client";

import React from "react";
import { Sparkles, Dna, ArrowRight, CheckCircle2, ShieldAlert, Cpu } from "lucide-react";

export const BacterialConjugationDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border border-indigo-100/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-[#4F46E5] border border-indigo-200 shadow-2xs flex items-center gap-1.5">
          <Dna className="w-3.5 h-3.5 text-[#4F46E5]" />
          PARASEXUAL HORIZONTAL GENE TRANSFER
        </span>
        <div className="p-5 rounded-2xl bg-white border border-indigo-200/90 shadow-sm w-full space-y-1.5 group hover:border-[#4F46E5] transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            CONJUGATION MECHANISMS (Lederberg &amp; Tatum, 1946)
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Physical Contact &amp; Sex Pilus Mediated DNA Transfer via Fertility (F) Plasmids
          </p>
        </div>
      </div>

      {/* 2 Cross Schemes Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. F+ x F- Cross */}
        <div className="rounded-2xl bg-white border-2 border-indigo-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-indigo-100">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
                  1
                </span>
                <h5 className="text-sm font-black text-slate-900">F⁺ × F⁻ CROSS</h5>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-100 text-indigo-800">
                Autonomous Plasmid
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-1">
                <span className="font-bold text-indigo-950 block">Parent Genotypes:</span>
                <p className="text-[11px] text-slate-600">
                  <strong>F⁺ Donor</strong> (F-plasmid free in cytoplasm) + <strong>F⁻ Recipient</strong> (lacks F-plasmid).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Transfer Mechanism:</span>
                <p className="text-[11px] text-slate-600">
                  Rolling circle replication passes one single strand of the F-plasmid across the conjugation tube.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-950 block">Final Progeny Outcome:</span>
                <p className="text-[11px] font-bold text-emerald-900">
                  ──► BOTH CELLS BECOME F⁺ (Recipient converted to F⁺ donor).
                </p>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-950 text-center">
            Zero bacterial chromosome transferred • 100% F⁺ Conversion
          </div>
        </div>

        {/* 2. Hfr x F- Cross */}
        <div className="rounded-2xl bg-white border-2 border-purple-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-purple-100">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center">
                  2
                </span>
                <h5 className="text-sm font-black text-slate-900">Hfr × F⁻ CROSS</h5>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-100 text-purple-800">
                Integrated Episome
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 space-y-1">
                <span className="font-bold text-purple-950 block">Parent Genotypes:</span>
                <p className="text-[11px] text-slate-600">
                  <strong>Hfr Donor</strong> (F-factor integrated into chromosome as episome) + <strong>F⁻ Recipient</strong>.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Transfer Mechanism:</span>
                <p className="text-[11px] text-slate-600">
                  Origin of transfer (oriT) initiates linear chromosome copy transfer into recipient.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <span className="font-bold text-amber-950 block">Final Progeny Outcome:</span>
                <p className="text-[11px] font-bold text-amber-900">
                  ──► High chromosomal recombination; Recipient REMAINS F⁻ (conjugation tube breaks before trailing F-factor enters).
                </p>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-100 text-xs font-bold text-purple-950 text-center">
            High Recombination Rate • Recipient Remains F⁻
          </div>
        </div>

      </div>

      {/* Takeaway */}
      <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between gap-4 text-xs font-extrabold text-[#4F46E5]">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#4F46E5] shrink-0" />
          <span>NEST Rule: Hfr cell transfers chromosomal genes 1000× more frequently than F⁺, but recipient stays F⁻ unless the entire chromosome is transferred!</span>
        </div>
      </div>

    </div>
  );
};
