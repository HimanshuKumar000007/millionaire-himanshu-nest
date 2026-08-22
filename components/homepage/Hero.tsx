"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Star,
  Bot,
  Trophy,
  TrendingUp,
  LineChart,
} from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onOpenAssessment: () => void;
  onWatchInsights?: () => void;
}

export function Hero({ onOpenAssessment, onWatchInsights }: HeroProps) {
  const handleScrollToPrograms = () => {
    const el = document.getElementById("study-programs");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWatchRankers = () => {
    if (onWatchInsights) {
      onWatchInsights();
    } else {
      const el = document.getElementById("hall-of-fame");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const featurePills = [
    "Smart High-Yield Notes",
    "TCS-iON CBT Full Mocks",
    "15-Min Quick Mocks",
    "Chapter-wise Practice",
    "15+ Years Solved PYQs",
    "24/7 AI Science Mentor",
  ];

  return (
    <section className="relative pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden bg-[#07080F]">
      {/* Dark Scientific Grid Background */}
      <div className="absolute inset-0 bg-dark-grid opacity-35 pointer-events-none" />

      {/* Radial Ambient Glows */}
      <div className="absolute top-1/4 left-1/10 w-[550px] h-[550px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/10 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (Hero Copy & CTAs) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F1326] border border-indigo-500/25 text-xs font-semibold text-slate-300 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="text-slate-300 font-medium">
                2026 Test Series &amp; Smart Notes Live
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-cyan-400 font-bold">100% Real TCS-iON CBT Interface</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black tracking-[-0.03em] text-white leading-[1.08]">
              Master IISER, NEST, ISI &amp; CMI
              <br />
              <span className="bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#38BDF8] bg-clip-text text-transparent">
                with Smart Notes &amp; 24/7 AI Mentor
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-[17px] text-slate-300 leading-relaxed font-normal max-w-2xl">
              Master high-yield science concepts without wasting hours in passive lectures. Prepare
              for <strong className="text-white font-semibold">IISER, NISER, ISI, CMI &amp; IISc</strong> with
              high-yield <strong className="text-white font-semibold">Smart Notes</strong>, exact{" "}
              <strong className="text-white font-semibold">CBT Mode Full Mocks</strong>,{" "}
              <strong className="text-white font-semibold">Quick Mocks</strong>,{" "}
              <strong className="text-white font-semibold">Chapter-wise Mocks</strong>, 15+ years
              solved <strong className="text-white font-semibold">PYQs</strong>, and an instant{" "}
              <strong className="text-cyan-400 font-semibold">24/7 AI Mentor</strong>.
            </p>

            {/* 6 Feature Chips (2 rows x 3) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              {featurePills.map((pill) => (
                <div
                  key={pill}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0F1222]/80 border border-slate-800/90 text-xs font-semibold text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{pill}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button
                onClick={onOpenAssessment}
                size="xl"
                className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-[#4338CA] hover:to-[#6D28D9] text-white shadow-lg shadow-indigo-600/30 text-sm sm:text-base font-bold py-6 px-7 rounded-xl transition-all group cursor-pointer border border-indigo-400/30 hover:scale-[1.01]"
              >
                <Sparkles className="h-4 w-4 mr-2 text-cyan-300" />
                <span>Try Free CBT Mock &amp; Smart Notes</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                onClick={handleWatchRankers}
                variant="outline"
                size="xl"
                className="bg-[#0F1222] hover:bg-[#161B33] text-slate-200 border-slate-800 hover:border-slate-700 text-sm sm:text-base font-semibold py-6 px-6 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Play className="h-4 w-4 text-indigo-400 fill-indigo-400/20" />
                <span>Watch Ranker Insights</span>
              </Button>
            </div>

            {/* Bottom Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm font-black text-white ml-1">4.9/5</span>
                </div>
                <p className="text-[11px] text-slate-400">1,450+ Student Reviews</p>
              </div>

              <div className="space-y-0.5">
                <div className="text-lg font-black text-white">10,000+</div>
                <p className="text-[11px] text-slate-400">Aspirants Practicing</p>
              </div>

              <div className="space-y-0.5">
                <div className="text-lg font-black text-emerald-400">540+</div>
                <p className="text-[11px] text-slate-400">IISER/NISER Selections</p>
              </div>

              <div className="space-y-0.5">
                <div className="text-lg font-black text-cyan-400">24/7</div>
                <p className="text-[11px] text-slate-400">AI Science Mentor</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column (Interactive Visual Telemetry Mockup) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-purple-500/15 to-cyan-500/15 blur-2xl pointer-events-none" />

            <div className="relative space-y-3.5">
              {/* Top Row: AI Mentor Card (Left) & Tanmay Sahoo Card (Right) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                {/* 24/7 AI Mentor Card (7 cols) */}
                <div className="sm:col-span-7 rounded-2xl bg-[#0D1021]/95 border border-indigo-500/25 p-4 space-y-3 shadow-xl backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[10px] font-bold uppercase tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      24/7 AI MENTOR
                    </span>
                    <Bot className="h-4 w-4 text-indigo-400" />
                  </div>

                  <div className="text-xs font-semibold text-slate-200 bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                    &ldquo;Explain photo-electric effect cutoff frequency &amp; work function&rdquo;
                  </div>

                  <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/20 space-y-1.5 text-[11px]">
                    <div className="flex items-center gap-1 text-cyan-300 font-bold text-[10px]">
                      <Sparkles className="h-3 w-3 text-cyan-400" /> Step-by-Step Logic:
                    </div>
                    <p className="font-mono text-slate-300 text-[11px] leading-tight">
                      $E = h\nu = \Phi + K_{`{max}`}$. When $K_{`{max}`} = 0$, threshold frequency $\nu_0 = \Phi / h$.
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] pt-1 text-slate-400 border-t border-slate-800/80">
                    <span>Instant Response Time</span>
                    <span className="text-emerald-400 font-mono font-bold">&lt; 1.2 seconds</span>
                  </div>
                </div>

                {/* Tanmay Sahoo Card (5 cols) */}
                <div className="sm:col-span-5 rounded-2xl bg-[#0D1021]/95 border border-amber-500/25 p-4 space-y-2.5 shadow-xl backdrop-blur-md flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-7 w-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                        <Trophy className="h-3.5 w-3.5" />
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-black uppercase">
                        AIR 3 • NEST
                      </span>
                    </div>

                    <div className="text-xs font-black text-white">Tanmay Sahoo</div>
                    <div className="text-[10px] text-slate-400">NISER Bhubaneswar &apos;25</div>
                  </div>

                  <p className="text-[11px] text-slate-300 italic leading-relaxed border-l-2 border-amber-400/60 pl-2">
                    &ldquo;SciPrep&apos;s CBT Mocks &amp; Smart Notes were identical to the real NEST...&rdquo;
                  </p>
                </div>
              </div>

              {/* Bottom Card: CBT MOCK ANALYTICS with Glowing Trajectory Chart */}
              <div className="rounded-2xl bg-[#0D1021]/95 border border-slate-800 p-5 space-y-4 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      CBT MOCK ANALYTICS
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm font-bold text-white">IAT Full Mock Progression</span>
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                        <TrendingUp className="h-3 w-3" /> +104 Marks
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Target Score</span>
                    <span className="text-sm font-black text-cyan-300">198 / 240</span>
                  </div>
                </div>

                {/* Interactive Glowing Progression Chart */}
                <div className="relative pt-2">
                  <div className="h-36 w-full relative">
                    {/* SVG Graphic with Gradient Fill and Glowing Lines */}
                    <svg viewBox="0 0 400 130" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="blueGlowArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.0" />
                        </linearGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="3" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>

                      {/* Horizontal Grid lines */}
                      <line x1="30" y1="15" x2="385" y2="15" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                      <line x1="30" y1="45" x2="385" y2="45" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                      <line x1="30" y1="75" x2="385" y2="75" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                      <line x1="30" y1="105" x2="385" y2="105" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

                      {/* Y-axis Labels */}
                      <text x="5" y="18" fill="#64748B" fontSize="9" fontFamily="monospace">220</text>
                      <text x="5" y="48" fill="#64748B" fontSize="9" fontFamily="monospace">180</text>
                      <text x="5" y="78" fill="#64748B" fontSize="9" fontFamily="monospace">140</text>
                      <text x="5" y="108" fill="#64748B" fontSize="9" fontFamily="monospace">100</text>

                      {/* AIR 50 Benchmark Line (Dashed Cyan) */}
                      <path
                        d="M 40 45 C 100 42, 200 35, 380 20"
                        fill="none"
                        stroke="#06B6D4"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        opacity="0.7"
                      />

                      {/* User Trajectory Gradient Fill Area */}
                      <path
                        d="M 40 108 C 100 95, 180 75, 260 50 C 320 32, 360 22, 380 18 L 380 120 L 40 120 Z"
                        fill="url(#blueGlowArea)"
                      />

                      {/* User Trajectory Glowing Line */}
                      <path
                        d="M 40 108 C 100 95, 180 75, 260 50 C 320 32, 360 22, 380 18"
                        fill="none"
                        stroke="#38BDF8"
                        strokeWidth="3"
                        filter="url(#glow)"
                      />

                      {/* Target point indicator */}
                      <circle cx="380" cy="18" r="4.5" fill="#38BDF8" className="animate-ping opacity-75" />
                      <circle cx="380" cy="18" r="3.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
                    </svg>

                    {/* X-axis Labels */}
                    <div className="flex justify-between px-7 text-[10px] font-mono text-slate-400 mt-1">
                      <span>W1</span>
                      <span>W3</span>
                      <span>W5</span>
                      <span>W7</span>
                      <span>W9</span>
                      <span>W12</span>
                    </div>
                  </div>
                </div>

                {/* Footer / Legend and Diagnostic Action */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[11px]">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                      <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_6px_#38bdf8]" />
                      Your Trajectory
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                      <span className="h-2 w-2 rounded-full border border-dashed border-cyan-400" />
                      AIR 50 Benchmark
                    </span>
                  </div>

                  <button
                    onClick={onOpenAssessment}
                    className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 font-bold transition-colors cursor-pointer"
                  >
                    <span>Take Free Diagnostic CBT Mock</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
