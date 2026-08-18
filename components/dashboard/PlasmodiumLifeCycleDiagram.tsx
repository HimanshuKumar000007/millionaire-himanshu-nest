"use client";

import React from "react";
import { Sparkles, User, Bug, ArrowDown, Activity, Flame, ShieldAlert } from "lucide-react";

export const PlasmodiumLifeCycleDiagram: React.FC = () => {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-rose-50/20 to-slate-50 border border-rose-100/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200 shadow-2xs flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-rose-600" />
          DIGENETIC PARASITIC LIFE CYCLE
        </span>
        <div className="p-5 rounded-2xl bg-white border border-rose-200/90 shadow-sm w-full space-y-1.5 group hover:border-rose-400 transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            PLASMODIUM LIFE CYCLE (Malaria Parasite)
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Alternation of Generations between Human Host (Asexual) &amp; Female Anopheles Mosquito (Sexual)
          </p>
        </div>
      </div>

      {/* 2 Host Side-by-Side Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Human Host (Intermediate) */}
        <div className="rounded-2xl bg-white border-2 border-rose-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-rose-100">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center font-black">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-sm font-black text-slate-900">Human Host</h5>
                  <span className="text-[10px] font-bold text-rose-600">Intermediate Host • Asexual Phase</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-100 text-rose-800">
                Schizogony
              </span>
            </div>

            {/* Progression Steps */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-100 flex items-start gap-2">
                <span className="h-5 w-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center shrink-0 text-[10px] font-bold">1</span>
                <div>
                  <span className="font-bold text-rose-950">Infection via Mosquito Bite:</span>
                  <p className="text-[11px] text-slate-600">Infective <strong>Sporozoites</strong> inoculated into bloodstream with saliva.</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
                <span className="h-5 w-5 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center shrink-0 text-[10px] font-bold">2</span>
                <div>
                  <span className="font-bold text-slate-900">Liver Stage (Exo-erythrocytic):</span>
                  <p className="text-[11px] text-slate-600">Sporozoites invade hepatocytes $\rightarrow$ multiply into Merozoites via Schizogony.</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-2">
                <span className="h-5 w-5 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 text-[10px] font-bold">3</span>
                <div>
                  <span className="font-bold text-amber-950">RBC Stage (Erythrocytic Cycle):</span>
                  <p className="text-[11px] text-slate-600">Merozoite $\rightarrow$ Trophozoite $\rightarrow$ Schizont $\rightarrow$ RBC lysis $\rightarrow$ releases <strong>Hemozoin toxin</strong> (cyclical chills/fever).</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200 flex items-start gap-2">
                <span className="h-5 w-5 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center shrink-0 text-[10px] font-bold">4</span>
                <div>
                  <span className="font-bold text-purple-950">Gametocytogenesis:</span>
                  <p className="text-[11px] text-slate-600">Some merozoites differentiate into $\delta$ micro- and $\gamma$ macrogametocytes.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-rose-50/80 border border-rose-100 text-xs font-bold text-rose-950 text-center">
            Site of Pathogenic Symptoms &amp; Hemozoin Release
          </div>
        </div>

        {/* Mosquito Host (Definitive) */}
        <div className="rounded-2xl bg-white border-2 border-emerald-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-black">
                  <Bug className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-sm font-black text-slate-900">Female Anopheles</h5>
                  <span className="text-[10px] font-bold text-emerald-600">Definitive Host • Sexual Phase</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800">
                Sporogony
              </span>
            </div>

            {/* Progression Steps */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-2">
                <span className="h-5 w-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center shrink-0 text-[10px] font-bold">1</span>
                <div>
                  <span className="font-bold text-emerald-950">Blood Meal Ingestion:</span>
                  <p className="text-[11px] text-slate-600">Mosquito feeds on infected human, ingesting mature gametocytes.</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200 flex items-start gap-2">
                <span className="h-5 w-5 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center shrink-0 text-[10px] font-bold">2</span>
                <div>
                  <span className="font-bold text-indigo-950">Syngamy &amp; Fertilization:</span>
                  <p className="text-[11px] text-slate-600">Occurs in mosquito midgut/stomach lumen $\rightarrow$ forms motile diploid <strong>Ookinete</strong>.</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-cyan-50/70 border border-cyan-200 flex items-start gap-2">
                <span className="h-5 w-5 rounded-full bg-cyan-200 text-cyan-800 flex items-center justify-center shrink-0 text-[10px] font-bold">3</span>
                <div>
                  <span className="font-bold text-cyan-950">Oocyst Encystment:</span>
                  <p className="text-[11px] text-slate-600">Ookinete penetrates stomach wall $\rightarrow$ develops into encysted Oocyst.</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-2">
                <span className="h-5 w-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center shrink-0 text-[10px] font-bold">4</span>
                <div>
                  <span className="font-bold text-emerald-950">Sporogony:</span>
                  <p className="text-[11px] text-slate-600">Oocyst bursts, releasing thousands of <strong>Sporozoites</strong> that migrate to salivary glands.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-100 text-xs font-bold text-emerald-950 text-center">
            Site of Sexual Fertilization &amp; Vector Transmission
          </div>
        </div>

      </div>

      {/* Takeaway */}
      <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 flex items-center justify-between gap-4 text-xs font-extrabold text-rose-950">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
          <span>High-Yield NEST Trap: Human is the INTERMEDIATE host (asexual schizogony); Female Anopheles is the DEFINITIVE host (sexual syngamy &amp; sporogony)!</span>
        </div>
      </div>

    </div>
  );
};
