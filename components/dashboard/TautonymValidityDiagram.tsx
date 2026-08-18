"use client";

import React from "react";
import { Sparkles, CheckCircle2, XCircle } from "lucide-react";

export const TautonymValidityDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border border-indigo-100/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-indigo-100">
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-[#4F46E5] border border-indigo-200 flex items-center gap-1.5 w-fit">
            <Sparkles className="w-3 h-3 text-[#4F46E5]" />
            CODE REGULATION RULE
          </span>
          <h4 className="text-xl font-black text-slate-900 tracking-tight">
            TAUTONYM VALIDITY MATRIX
          </h4>
          <p className="text-xs text-slate-600 font-medium">
            Generic Name and Specific Epithet identical in spelling (e.g. <em>Gorilla gorilla</em>)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ZOOLOGY (ICZN) */}
        <div className="p-5 rounded-2xl bg-white border-2 border-emerald-200 shadow-2xs space-y-3 hover:border-emerald-400 transition-all">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h5 className="text-base font-black text-slate-900">ZOOLOGY (ICZN)</h5>
            </div>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800">
              VALID / PERMITTED
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Tautonyms are validly published and common in animal nomenclature.
          </p>

          <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-100 text-xs font-mono text-emerald-950 space-y-1">
            <span className="font-extrabold text-emerald-900 block text-[10px] uppercase font-sans">Valid Zoological Examples:</span>
            <div>• <em>Panthera panthera</em></div>
            <div>• <em>Naja naja</em> (Indian Cobra)</div>
            <div>• <em>Gorilla gorilla</em> (Western Gorilla)</div>
            <div>• <em>Rattus rattus</em> (Black Rat)</div>
          </div>
        </div>

        {/* BOTANY (ICNafp) */}
        <div className="p-5 rounded-2xl bg-white border-2 border-rose-200 shadow-2xs space-y-3 hover:border-rose-400 transition-all">
          <div className="flex items-center justify-between pb-2 border-b border-rose-100">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-rose-600" />
              <h5 className="text-base font-black text-slate-900">BOTANY (ICNafp)</h5>
            </div>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-rose-100 text-rose-800">
              STRICTLY FORBIDDEN
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Tautonyms are strictly forbidden under plant/fungal nomenclature rules.
          </p>

          <div className="p-3 rounded-xl bg-rose-50/80 border border-rose-100 text-xs font-mono text-rose-950 space-y-1">
            <span className="font-extrabold text-rose-900 block text-[10px] uppercase font-sans">Forbidden Botanical Examples:</span>
            <div>• <em>Rosa rosa</em> <span className="text-rose-600 font-sans font-bold">(INVALID)</span></div>
            <div>• <em>Malus malus</em> <span className="text-rose-600 font-sans font-bold">(INVALID)</span></div>
            <div>• <em>Linaria linaria</em> <span className="text-rose-600 font-sans font-bold">(REJECTED)</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
