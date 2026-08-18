"use client";

import React from "react";
import { Sparkles, MapPin, Compass, Globe2, Layers } from "lucide-react";

export const BiodiversityScaleDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border border-indigo-100/90 p-6 sm:p-8 shadow-md space-y-8 select-none">
      
      {/* ════════════ ROOT NODE (TOP LEVEL) ════════════ */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-[#4F46E5] border border-indigo-200 shadow-2xs flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
          WHITTAKER&apos;S SPATIAL METRICS
        </span>
        <div className="p-5 rounded-2xl bg-white border border-indigo-200/90 shadow-sm w-full space-y-1.5 group hover:border-[#4F46E5] transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            LEVELS OF DIVERSITY MEASUREMENT
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Categorized across spatial &amp; geographic scales by Ecologist Robert H. Whittaker
          </p>
        </div>
      </div>

      {/* ════════════ VISUAL SVG FLOWCHART CONNECTORS (3-WAY BRANCH) ════════════ */}
      <div className="w-full flex justify-center -my-2 select-none pointer-events-none">
        <svg
          className="w-full max-w-4xl h-16 text-indigo-400"
          viewBox="0 0 900 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top vertical line from root */}
          <line x1="450" y1="0" x2="450" y2="35" stroke="currentColor" strokeWidth="3" />
          
          {/* Horizontal branching bar spanning left, center, right */}
          <line x1="150" y1="35" x2="750" y2="35" stroke="currentColor" strokeWidth="3" />
          
          {/* Left vertical branch (Alpha) */}
          <line x1="150" y1="35" x2="150" y2="70" stroke="currentColor" strokeWidth="3" />
          <polygon points="144,68 156,68 150,78" fill="currentColor" />

          {/* Center vertical branch (Beta) */}
          <line x1="450" y1="35" x2="450" y2="70" stroke="currentColor" strokeWidth="3" />
          <polygon points="444,68 456,68 450,78" fill="currentColor" />

          {/* Right vertical branch (Gamma) */}
          <line x1="750" y1="35" x2="750" y2="70" stroke="currentColor" strokeWidth="3" />
          <polygon points="744,68 756,68 750,78" fill="currentColor" />
        </svg>
      </div>

      {/* ════════════ 3 BRANCH CHILD CARDS ════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
        
        {/* BRANCH 1: ALPHA DIVERSITY */}
        <div className="rounded-2xl bg-white border-2 border-indigo-200/90 p-5 shadow-sm space-y-3 hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-indigo-100">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-200 text-[#4F46E5] flex items-center justify-center font-black">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-sm font-black text-slate-900">
                    ALPHA (&alpha;)
                  </h5>
                  <span className="text-[10px] font-bold text-indigo-600 block">
                    Local Community
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-100 text-indigo-800">
                &alpha; = S
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Species richness within a single homogeneous local community or habitat.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs font-bold text-indigo-950 text-center">
            Formula: &alpha; = S (Species Count)
          </div>
        </div>

        {/* BRANCH 2: BETA DIVERSITY */}
        <div className="rounded-2xl bg-white border-2 border-purple-200/90 p-5 shadow-sm space-y-3 hover:border-purple-400 hover:shadow-md transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-purple-100">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center font-black">
                  <Compass className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-sm font-black text-slate-900">
                    BETA (&beta;)
                  </h5>
                  <span className="text-[10px] font-bold text-purple-600 block">
                    Species Turnover
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-100 text-purple-800">
                Turnover Rate
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Species turnover or change in composition between two adjacent ecosystems.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100 text-xs font-bold text-purple-950 text-center">
            Formula: &beta; = S<sub>total</sub> / &alpha;<sub>mean</sub>
          </div>
        </div>

        {/* BRANCH 3: GAMMA DIVERSITY */}
        <div className="rounded-2xl bg-white border-2 border-emerald-200/90 p-5 shadow-sm space-y-3 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-black">
                  <Globe2 className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-sm font-black text-slate-900">
                    GAMMA (&gamma;)
                  </h5>
                  <span className="text-[10px] font-bold text-emerald-600 block">
                    Regional Scale
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800">
                Landscape
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Overall species diversity across an entire landscape, regional geographic scale, or biome.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs font-bold text-emerald-950 text-center">
            Formula: &gamma; &approx; &alpha;<sub>mean</sub> &times; &beta;
          </div>
        </div>

      </div>

      {/* Bottom Key Takeaway Bar */}
      <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between gap-4 text-xs font-extrabold text-[#4F46E5]">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#4F46E5]" />
          <span>NEST Concept: Alpha = Local | Beta = Ecosystem Turnover | Gamma = Biome/Regional Scale</span>
        </div>
      </div>
    </div>
  );
};
