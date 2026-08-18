"use client";

import React from "react";
import { Sparkles, Calendar, UserCheck, ShieldCheck, Microscope } from "lucide-react";

export const VirusDiscoveryMilestonesDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border border-indigo-100/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-[#4F46E5] border border-indigo-200 shadow-2xs flex items-center gap-1.5">
          <Microscope className="w-3.5 h-3.5 text-[#4F46E5]" />
          VIROLOGY HISTORICAL TIMELINE
        </span>
        <div className="p-5 rounded-2xl bg-white border border-indigo-200/90 shadow-sm w-full space-y-1.5 group hover:border-[#4F46E5] transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            VIRUS DISCOVERY MILESTONES
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Pioneering Discoveries Establishing the Non-Cellular Nature of Infectious Particles
          </p>
        </div>
      </div>

      {/* 3 Milestone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Dmitri Ivanowsky */}
        <div className="p-5 rounded-2xl bg-white border-2 border-indigo-200 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-indigo-100 text-indigo-800">
                1892
              </span>
              <span className="text-[10px] font-bold text-slate-500">Filterability</span>
            </div>
            <h5 className="text-sm font-black text-slate-900">
              Dmitri Ivanowsky
            </h5>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Discovered that tobacco mosaic disease extract passed through <strong>Chamberland porcelain bacteria-proof filters</strong>, proving the causal pathogen was smaller than bacteria.
            </p>
          </div>
          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 p-2 rounded-xl text-center">
            Proved Filterable Agent
          </span>
        </div>

        {/* M.W. Beijerinck */}
        <div className="p-5 rounded-2xl bg-white border-2 border-purple-200 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-purple-100">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-purple-100 text-purple-800">
                1898
              </span>
              <span className="text-[10px] font-bold text-slate-500">Living Fluid</span>
            </div>
            <h5 className="text-sm font-black text-slate-900">
              M.W. Beijerinck
            </h5>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Demonstrated that filtered sap could infect healthy plants in series. Coined the famous phrase: <em>&quot;Contagium vivum fluidum&quot;</em> (Infectious living fluid).
            </p>
          </div>
          <span className="text-[10px] font-bold text-purple-700 bg-purple-50 p-2 rounded-xl text-center">
            &quot;Contagium Vivum Fluidum&quot;
          </span>
        </div>

        {/* W.M. Stanley */}
        <div className="p-5 rounded-2xl bg-white border-2 border-emerald-200 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800">
                1935
              </span>
              <span className="text-[10px] font-bold text-slate-500">Nobel Prize</span>
            </div>
            <h5 className="text-sm font-black text-slate-900">
              Wendell Stanley
            </h5>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              First to <strong>crystallize Tobacco Mosaic Virus (TMV)</strong>. Proved that virions are composed largely of nucleoprotein complexes that remain infectious after crystallization.
            </p>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 p-2 rounded-xl text-center">
            Crystallized TMV Protein
          </span>
        </div>

      </div>

    </div>
  );
};
