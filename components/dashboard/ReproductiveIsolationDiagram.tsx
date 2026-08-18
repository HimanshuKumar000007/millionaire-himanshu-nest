"use client";

import React from "react";
import { Sparkles, ShieldAlert, GitFork, Lock, Ban } from "lucide-react";

export const ReproductiveIsolationDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border border-indigo-100/90 p-6 sm:p-8 shadow-md space-y-8 select-none">
      
      {/* ROOT NODE */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-[#4F46E5] border border-indigo-200 shadow-2xs flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
          SPECIES COHERENCE BARRIERS (RIMs)
        </span>
        <div className="p-5 rounded-2xl bg-white border border-indigo-200/90 shadow-sm w-full space-y-1.5 group hover:border-[#4F46E5] transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            REPRODUCTIVE ISOLATION
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Biological &amp; Genetic Barriers Preventing Interspecific Gene Flow
          </p>
        </div>
      </div>

      {/* SVG TREE CONNECTORS */}
      <div className="w-full flex justify-center -my-2 select-none pointer-events-none">
        <svg
          className="w-full max-w-3xl h-16 text-indigo-400"
          viewBox="0 0 800 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="400" y1="0" x2="400" y2="35" stroke="currentColor" strokeWidth="3" />
          <line x1="200" y1="35" x2="600" y2="35" stroke="currentColor" strokeWidth="3" />
          <line x1="200" y1="35" x2="200" y2="70" stroke="currentColor" strokeWidth="3" />
          <polygon points="194,68 206,68 200,78" fill="currentColor" />
          <line x1="600" y1="35" x2="600" y2="70" stroke="currentColor" strokeWidth="3" />
          <polygon points="594,68 606,68 600,78" fill="currentColor" />
        </svg>
      </div>

      {/* 2 BRANCH CHILD CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        
        {/* PRE-ZYGOTIC ISOLATION */}
        <div className="rounded-2xl bg-white border-2 border-indigo-200/90 p-5 sm:p-6 shadow-sm space-y-4 hover:border-indigo-400 transition-all">
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-indigo-100">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-200 text-[#4F46E5] flex items-center justify-center font-black">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h5 className="text-base font-black text-slate-900">
                  PRE-ZYGOTIC ISOLATION
                </h5>
                <span className="text-[11px] font-bold text-indigo-600 block">
                  Prevents Zygote Formation
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-indigo-100 text-indigo-800">
              BEFORE FERTILIZATION
            </span>
          </div>

          <ul className="space-y-2.5 text-xs font-semibold text-slate-700">
            <li className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-2.5">
              <span className="font-extrabold text-[#4F46E5]">•</span>
              <div>
                <strong className="text-slate-900 block">Habitat / Ecological Isolation</strong>
                <span>Occupying distinct micro-environments in the same geographic region.</span>
              </div>
            </li>
            <li className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-2.5">
              <span className="font-extrabold text-[#4F46E5]">•</span>
              <div>
                <strong className="text-slate-900 block">Temporal Isolation</strong>
                <span>Breeding at different seasons, times of day, or flowering cycles.</span>
              </div>
            </li>
            <li className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-2.5">
              <span className="font-extrabold text-[#4F46E5]">•</span>
              <div>
                <strong className="text-slate-900 block">Behavioral / Ethological Isolation</strong>
                <span>Distinct courtship signals, mating calls, or pheromone bouquets.</span>
              </div>
            </li>
            <li className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-2.5">
              <span className="font-extrabold text-[#4F46E5]">•</span>
              <div>
                <strong className="text-slate-900 block">Mechanical &amp; Gametic Isolation</strong>
                <span>Lock-and-key genitalia mismatch or sperm-egg receptor incompatibility.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* POST-ZYGOTIC ISOLATION */}
        <div className="rounded-2xl bg-white border-2 border-rose-200/90 p-5 sm:p-6 shadow-sm space-y-4 hover:border-rose-400 transition-all">
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-rose-100">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center font-black">
                <Ban className="h-5 w-5" />
              </div>
              <div>
                <h5 className="text-base font-black text-slate-900">
                  POST-ZYGOTIC ISOLATION
                </h5>
                <span className="text-[11px] font-bold text-rose-600 block">
                  Acts After Fertilization
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-rose-100 text-rose-800">
              AFTER FERTILIZATION
            </span>
          </div>

          <ul className="space-y-2.5 text-xs font-semibold text-slate-700">
            <li className="p-3 rounded-xl bg-rose-50/50 border border-rose-100 flex items-start gap-2.5">
              <span className="font-extrabold text-rose-600">•</span>
              <div>
                <strong className="text-slate-900 block">Hybrid Inviability</strong>
                <span>Zygote or embryo fails to complete normal mitotic development.</span>
              </div>
            </li>
            <li className="p-3 rounded-xl bg-rose-50/50 border border-rose-100 flex items-start gap-2.5">
              <span className="font-extrabold text-rose-600">•</span>
              <div>
                <strong className="text-slate-900 block">Hybrid Sterility</strong>
                <span>Hybrid reaches adulthood but cannot produce functional gametes (e.g. Mule, Hinny).</span>
              </div>
            </li>
            <li className="p-3 rounded-xl bg-rose-50/50 border border-rose-100 flex items-start gap-2.5">
              <span className="font-extrabold text-rose-600">•</span>
              <div>
                <strong className="text-slate-900 block">Hybrid Breakdown</strong>
                <span>F₁ hybrids are fertile, but F₂ offspring suffer severe inviability/sterility.</span>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};
