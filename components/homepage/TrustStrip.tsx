"use client";

import * as React from "react";
import { useRef } from "react";
import { useInView } from "motion/react";

const stats = [
  { number: "2,400+", label: "NEST Aspirants", sub: "actively preparing" },
  { number: "8 Years", label: "PYQ Coverage", sub: "2018 through 2025" },
  { number: "9", label: "Subject Masterclasses", sub: "Physics · Chem · Bio · Math" },
  { number: "180", label: "Mark Simulation", sub: "full CBT-format mock tests" },
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

function StatCounter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const [val, setVal] = React.useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1400;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(easeProgress * to));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, to]);

  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

export function TrustStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-slate-950 text-white py-12 sm:py-16 overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-24 bg-indigo-600/12 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Stat grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-8 border-b border-white/[0.07]">
          <div className="text-center transition-all duration-700">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white tabular-nums leading-none mb-1">
              <StatCounter to={2400} suffix="+" />
            </div>
            <div className="text-sm font-bold text-slate-200">NEST Aspirants</div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">actively preparing</div>
          </div>

          <div className="text-center transition-all duration-700">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white tabular-nums leading-none mb-1">
              <StatCounter to={8} suffix=" Years" />
            </div>
            <div className="text-sm font-bold text-slate-200">PYQ Coverage</div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">2018 through 2025</div>
          </div>

          <div className="text-center transition-all duration-700">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white tabular-nums leading-none mb-1">
              <StatCounter to={9} />
            </div>
            <div className="text-sm font-bold text-slate-200">Subject Masterclasses</div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">Physics · Chem · Bio · Math</div>
          </div>

          <div className="text-center transition-all duration-700">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white tabular-nums leading-none mb-1">
              <StatCounter to={180} />
            </div>
            <div className="text-sm font-bold text-slate-200">Mark Simulation</div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">full CBT-format mock tests</div>
          </div>
        </div>

        {/* Subtitle */}
        <p className={`text-center text-xs text-slate-500 font-medium pt-5 pb-2 transition-all duration-700 ${isInView ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "400ms" }}>
          Focused preparation for NISER &amp; CEBS entrance examinations.
        </p>

        {/* Ticker */}
        <div className="relative mt-2 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="flex">
            <div className="flex whitespace-nowrap gap-5 pr-5" style={{ animation: "scrollLeft 28s linear infinite" }}>
              {[...ticker, ...ticker].map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] px-3 py-1.5 rounded-full text-slate-400 text-[11px] font-medium hover:text-slate-200 transition-colors cursor-default">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes scrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
