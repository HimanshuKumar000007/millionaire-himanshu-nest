"use client";

import React from "react";
import { Sparkles, Key, CheckCircle2, XCircle } from "lucide-react";

export const TaxonomicKeysDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border border-indigo-100/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-indigo-100">
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-[#4F46E5] border border-indigo-200 flex items-center gap-1.5 w-fit">
            <Sparkles className="w-3 h-3 text-[#4F46E5]" />
            ANALYTICAL IDENTIFICATION TOOL
          </span>
          <h4 className="text-xl font-black text-slate-900 tracking-tight">
            TAXONOMIC DICHOTOMOUS KEYS ARCHITECTURE
          </h4>
          <p className="text-xs text-slate-600 font-medium">
            Analytical devices using contrasting pairs of diagnostic statements
          </p>
        </div>
      </div>

      {/* Diagram Architecture Box */}
      <div className="p-6 rounded-2xl bg-white border border-indigo-100 shadow-2xs space-y-6">
        <div className="flex justify-center">
          <div className="px-5 py-3 rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-center space-y-1">
            <div className="flex items-center justify-center gap-2 text-xs font-black text-[#4F46E5]">
              <Key className="w-4 h-4 text-[#4F46E5]" />
              <span>COUPLET</span>
            </div>
            <p className="text-[11px] font-bold text-slate-700">
              Pair of Contrasting Diagnostic Statements
            </p>
          </div>
        </div>

        {/* 2 Leads Branching */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 hover:border-indigo-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900">STATEMENT 1 (LEAD)</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">ACCEPT</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Accepting Lead 1 resolves to target Taxon or directs to next couplet pair.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 hover:border-indigo-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900">STATEMENT 2 (LEAD)</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">REJECT</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Rejecting Lead 2 eliminates alternative taxa along that diagnostic path.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
