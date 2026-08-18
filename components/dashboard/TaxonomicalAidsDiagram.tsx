"use client";

import React from "react";
import { Sparkles, Archive, Trees, BookOpen } from "lucide-react";

export const TaxonomicalAidsDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border border-indigo-100/90 p-6 sm:p-8 shadow-md space-y-8 select-none">
      
      {/* ROOT NODE */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-[#4F46E5] border border-indigo-200 shadow-2xs flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
          IDENTIFICATION &amp; CLASSIFICATION REPOSITORIES
        </span>
        <div className="p-5 rounded-2xl bg-white border border-indigo-200/90 shadow-sm w-full space-y-1.5 group hover:border-[#4F46E5] transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            TAXONOMICAL AIDS
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Biological Repositories, Collections &amp; Reference Literature
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
          <line x1="133" y1="35" x2="667" y2="35" stroke="currentColor" strokeWidth="3" />
          <line x1="133" y1="35" x2="133" y2="70" stroke="currentColor" strokeWidth="3" />
          <polygon points="127,68 139,68 133,78" fill="currentColor" />
          <line x1="400" y1="35" x2="400" y2="70" stroke="currentColor" strokeWidth="3" />
          <polygon points="394,68 406,68 400,78" fill="currentColor" />
          <line x1="667" y1="35" x2="667" y2="70" stroke="currentColor" strokeWidth="3" />
          <polygon points="661,68 673,68 667,78" fill="currentColor" />
        </svg>
      </div>

      {/* 3 BRANCH CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
        
        {/* PRESERVED COLLECTIONS */}
        <div className="rounded-2xl bg-white border-2 border-indigo-200/90 p-5 shadow-sm space-y-3 hover:border-indigo-400 transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2.5 border-b border-indigo-100">
              <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-200 text-[#4F46E5] flex items-center justify-center font-black">
                <Archive className="h-4 w-4" />
              </div>
              <div>
                <h5 className="text-sm font-black text-slate-900">PRESERVED COLLECTIONS</h5>
                <span className="text-[10px] font-bold text-indigo-600 block">Dried or Chemical Media</span>
              </div>
            </div>

            <ul className="text-xs text-slate-600 space-y-2 font-medium">
              <li className="p-2 rounded-xl bg-indigo-50/50 border border-indigo-100">
                <strong className="text-slate-900 block">Herbarium</strong>
                <span>Sheets (29&times;41.5 cm) with label (7&times;12 cm) at bottom right. No plant height!</span>
              </li>
              <li className="p-2 rounded-xl bg-indigo-50/50 border border-indigo-100">
                <strong className="text-slate-900 block">Museums</strong>
                <span>Jars (10% Formalin, 70% Ethanol), insect pinning, taxidermy, skeletons.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* LIVING COLLECTIONS */}
        <div className="rounded-2xl bg-white border-2 border-emerald-200/90 p-5 shadow-sm space-y-3 hover:border-emerald-400 transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2.5 border-b border-emerald-100">
              <div className="h-8 w-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-black">
                <Trees className="h-4 w-4" />
              </div>
              <div>
                <h5 className="text-sm font-black text-slate-900">LIVING COLLECTIONS</h5>
                <span className="text-[10px] font-bold text-emerald-600 block">Ex-situ Conservation</span>
              </div>
            </div>

            <ul className="text-xs text-slate-600 space-y-2 font-medium">
              <li className="p-2 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <strong className="text-slate-900 block">Botanical Gardens</strong>
                <span>Royal Botanic Gardens Kew (&gt;7M sheets), AJC Bose Garden (Great Banyan Tree &gt;3600 prop roots).</span>
              </li>
              <li className="p-2 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <strong className="text-slate-900 block">Zoological Parks</strong>
                <span>Simulated natural habitats for live animal study and ex-situ conservation.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* IDENTIFICATION LITERATURE */}
        <div className="rounded-2xl bg-white border-2 border-purple-200/90 p-5 shadow-sm space-y-3 hover:border-purple-400 transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2.5 border-b border-purple-100">
              <div className="h-8 w-8 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center font-black">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <h5 className="text-sm font-black text-slate-900">IDENTIFICATION LITERATURE</h5>
                <span className="text-[10px] font-bold text-purple-600 block">Analytical Documentation</span>
              </div>
            </div>

            <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                <span>Taxonomic Keys (Couplets &amp; Leads)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                <span>Flora (Habitat &amp; Distribution Index)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                <span>Manuals (Area Identification Keys)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                <span>Monographs (Info on ANY ONE TAXON)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                <span>Catalogues (Alphabetical Register)</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
