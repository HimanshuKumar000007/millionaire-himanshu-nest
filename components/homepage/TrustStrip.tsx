"use client";

import * as React from "react";
import { useRef } from "react";
import { useInView } from "motion/react";

const stats = [
  { number: "2,400+", label: "Active Aspirants", sub: "preparing for NEST 2026" },
  { number: "9", label: "Subject Masterclasses", sub: "Physics · Chem · Bio · Math" },
  { number: "2018–2025", label: "PYQ Archive", sub: "8 years of solved papers" },
  { number: "180-Mark", label: "CBT Simulator", sub: "Best-3 SMAS evaluation" },
];

const ticker = [
  "NEST-Focused Preparation",
  "Physics",
  "Chemistry",
  "Biology",
  "Mathematics",
  "PYQ Practice",
  "Mock Tests",
  "SMAS Analytics",
  "NISER Bhubaneswar",
  "UM-DAE CEBS Mumbai",
];

export function TrustStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-slate-950 text-white py-12 sm:py-16 overflow-hidden relative">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
        backgroundSize: "40px 40px"
      }} />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-indigo-600/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Stat numbers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-10 border-b border-white/[0.08]">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center sm:text-left transition-all duration-700 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white tabular-nums leading-none mb-1">
                {stat.number}
              </div>
              <div className="text-sm font-bold text-slate-200 leading-snug">{stat.label}</div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Scrolling ticker */}
        <div className="relative mt-8 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="flex">
            <div
              className="flex whitespace-nowrap gap-6 pr-6"
              style={{ animation: "scrollLeft 30s linear infinite" }}
            >
              {[...ticker, ...ticker].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] px-3.5 py-1.5 rounded-full text-slate-300 text-[12px] font-semibold hover:bg-white/10 hover:text-white transition-colors cursor-default"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
