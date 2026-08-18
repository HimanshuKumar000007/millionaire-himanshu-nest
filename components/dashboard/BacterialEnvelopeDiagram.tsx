"use client";

import React from "react";
import { Sparkles, Layers, ShieldCheck, AlertCircle } from "lucide-react";

export const BacterialEnvelopeDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border border-indigo-100/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-[#4F46E5] border border-indigo-200 shadow-2xs flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#4F46E5]" />
          PROKARYOTIC CELL ENVELOPE COMPARISON
        </span>
        <div className="p-5 rounded-2xl bg-white border border-indigo-200/90 shadow-sm w-full space-y-1.5 group hover:border-[#4F46E5] transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            GRAM-POSITIVE vs. GRAM-NEGATIVE CELL ENVELOPES
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Comparative Ultrastructure, Peptidoglycan Wall Architecture &amp; Membrane Topology
          </p>
        </div>
      </div>

      {/* Side-by-Side Envelope Stacks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Gram-Positive Envelope */}
        <div className="rounded-2xl bg-white border-2 border-indigo-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-indigo-100">
              <div>
                <h5 className="text-sm font-black text-slate-900">Gram-Positive Envelope</h5>
                <span className="text-[10px] font-bold text-indigo-600">Single Membrane + Thick Wall</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-100 text-indigo-800">
                2 Basal Rings (S, M)
              </span>
            </div>

            {/* Cross Section Layers */}
            <div className="space-y-2 text-xs">
              <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 space-y-1">
                <div className="flex items-center justify-between font-black text-indigo-950">
                  <span>1. Thick Peptidoglycan (Murein)</span>
                  <span className="text-[10px] bg-white px-1.5 py-0.5 rounded text-indigo-700">20–80 nm</span>
                </div>
                <p className="text-[11px] font-medium text-slate-600">
                  Consists of up to 40 layers of cross-linked NAG-NAM. Contains <strong>Teichoic &amp; Lipoteichoic acids</strong> for surface charge and antigenicity.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between font-black text-slate-900">
                  <span>2. Plasma Membrane (Inner)</span>
                  <span className="text-[10px] bg-white px-1.5 py-0.5 rounded text-slate-600">Phospholipid Bilayer</span>
                </div>
                <p className="text-[11px] font-medium text-slate-600">
                  Selectively permeable lipid bilayer lacking sterols.
                </p>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs font-bold text-indigo-950 text-center">
            Retains Crystal Violet • Highly Penicillin Sensitive
          </div>
        </div>

        {/* Gram-Negative Envelope */}
        <div className="rounded-2xl bg-white border-2 border-rose-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-rose-100">
              <div>
                <h5 className="text-sm font-black text-slate-900">Gram-Negative Envelope</h5>
                <span className="text-[10px] font-bold text-rose-600">Dual Membrane + Periplasm</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-100 text-rose-800">
                4 Basal Rings (L, P, S, M)
              </span>
            </div>

            {/* Cross Section Layers */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-rose-50/90 border border-rose-200 space-y-1">
                <div className="flex items-center justify-between font-black text-rose-950">
                  <span>1. Outer Membrane (LPS)</span>
                  <span className="text-[10px] bg-white px-1.5 py-0.5 rounded text-rose-700">Endotoxin</span>
                </div>
                <p className="text-[11px] font-medium text-slate-600">
                  Asymmetric bilayer rich in <strong>Lipopolysaccharide (Lipid A + O-Antigen)</strong> and porin channels.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                <div className="flex items-center justify-between font-black text-amber-950">
                  <span>2. Periplasmic Space + Thin Peptidoglycan</span>
                  <span className="text-[10px] bg-white px-1.5 py-0.5 rounded text-amber-700">2–7 nm</span>
                </div>
                <p className="text-[11px] font-medium text-slate-600">
                  Contains digestive enzymes, binding proteins, and 1–2 sparse sheets of peptidoglycan.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between font-black text-slate-900">
                  <span>3. Plasma Membrane (Inner)</span>
                  <span className="text-[10px] bg-white px-1.5 py-0.5 rounded text-slate-600">Phospholipid Bilayer</span>
                </div>
                <p className="text-[11px] font-medium text-slate-600">
                  Houses respiratory and active transport electron transport chains.
                </p>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-100 text-xs font-bold text-rose-950 text-center">
            Decolorized by Alcohol • Safranin Pink/Red
          </div>
        </div>

      </div>

    </div>
  );
};
