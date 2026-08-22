"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScientificBackground } from "@/components/shared/ScientificBackground";
import { ArrowRight, TrendingUp, AlertTriangle, Target, Activity, ShieldCheck, Compass, Star, Users } from "lucide-react";
import { motion, useInView } from "motion/react";

interface HeroProps {
  onOpenAssessment: () => void;
}

const avatarInitials = ["A", "R", "S", "P", "M"];
const avatarColors = ["bg-indigo-500", "bg-violet-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500"];

export function Hero({ onOpenAssessment }: HeroProps) {
  const [activeSubject, setActiveSubject] = useState<"Physics" | "Chemistry" | "Biology" | "Mathematics">("Physics");
  const [missionTasks, setMissionTasks] = useState([
    { id: 1, title: "Physics — Wave Optics Revision", done: true },
    { id: 2, title: "Solve 15 NEST Biology PYQs", done: false },
    { id: 3, title: "Chemistry Mock Diagnostic", done: false },
  ]);

  const subjectData = {
    Physics: { score: 82, bar: "from-indigo-500 to-indigo-400", weakTopic: "Rotational Dynamics" },
    Chemistry: { score: 75, bar: "from-blue-500 to-cyan-400", weakTopic: "Electrochemistry" },
    Biology: { score: 69, bar: "from-emerald-500 to-teal-400", weakTopic: "Cellular Respiration" },
    Mathematics: { score: 77, bar: "from-purple-500 to-violet-400", weakTopic: "Definite Integrals" },
  };

  const toggleTask = (id: number) => {
    setMissionTasks(tasks => tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [displayScore, setDisplayScore] = useState(0);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = 74;
    const duration = 1400;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setDisplayScore(Math.floor(easeProgress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    const countEnd = 2400;
    const countDuration = 1800;
    const countStart = performance.now();
    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - countStart;
      const progress = Math.min(elapsed / countDuration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setStudentCount(Math.floor(easeProgress * countEnd));
      if (progress < 1) requestAnimationFrame(animateCount);
    };
    requestAnimationFrame(animateCount);
  }, [isInView]);

  return (
    <section ref={sectionRef} className="relative pt-8 pb-16 md:pt-14 md:pb-28 overflow-hidden">
      <ScientificBackground />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[15%] w-[500px] h-[500px] bg-indigo-500/6 rounded-full blur-[100px]" />
        <div className="absolute bottom-[0%] right-[5%] w-[350px] h-[350px] bg-violet-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* Left Column */}
          <div className="lg:col-span-6 space-y-7 text-left">

            {/* Eyebrow badge */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="inline-flex items-center gap-2 pl-1 pr-3.5 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-semibold cursor-default"
            >
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wide">
                NEST 2027
              </span>
              <span className="text-slate-600">India&apos;s focused NEST preparation platform</span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ y: 24, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
              className="text-5xl sm:text-6xl lg:text-[68px] font-black tracking-[-0.04em] text-slate-950 leading-[1.04]"
            >
              Know Where
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                You Stand in NEST.
              </span>
            </motion.h1>

            {/* Supporting copy */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }}
              className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-lg font-normal"
            >
              SciPrep combines focused NEST lessons, authentic PYQs, realistic 180-mark mock tests, and performance analytics into one structured preparation system.
            </motion.p>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.28 }}
              className="flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {avatarInitials.map((init, i) => (
                  <div key={i} className={`h-7 w-7 rounded-full ${avatarColors[i]} border-2 border-white flex items-center justify-center text-[10px] text-white font-black shadow-sm`}>
                    {init}
                  </div>
                ))}
              </div>
              <div className="text-xs font-medium text-slate-500">
                <span className="font-black text-slate-900">{studentCount.toLocaleString()}+</span> aspirants preparing
              </div>
              <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                4.9
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ y: 18, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.55, delay: 0.32, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <Button
                onClick={onOpenAssessment}
                size="xl"
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/30 text-base font-bold transition-all group"
              >
                Start Free Assessment
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <a href="#how-it-works" className="block w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="xl"
                  className="w-full sm:w-auto border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 text-base font-semibold transition-all bg-white/70"
                >
                  <Compass className="mr-2 h-4 w-4 text-indigo-500" />
                  Explore NEST Prep
                </Button>
              </a>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-y-1.5 gap-x-5 text-xs font-medium text-slate-500"
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Free to start
              </span>
              <span className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-indigo-500" /> Personalized preparation
              </span>
              <span className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-violet-500" /> Built specifically for NEST
              </span>
            </motion.div>
          </div>

          {/* Right Column: High-Impact Simplified Product Mockup */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="lg:col-span-6 relative"
          >
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-indigo-500/15 via-violet-500/10 to-emerald-500/10 blur-2xl pointer-events-none" />

            {/* Main Mockup Card Container */}
            <div className="relative mx-auto max-w-lg lg:max-w-none rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-6 sm:p-7 shadow-[0_20px_50px_rgba(15,23,42,0.08),0_4px_16px_rgba(79,70,229,0.06)] ring-1 ring-slate-900/5 transition-all">

              {/* Browser Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 ml-2">app.sciprep.in/readiness</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    SMAS Active
                  </span>
                </div>
              </div>

              {/* Dashboard Content Grid */}
              <div className="space-y-4">

                {/* Primary Hero Score Widget */}
                <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 sm:p-6 flex items-center justify-between overflow-hidden shadow-md">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="relative z-10 space-y-1">
                    <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block">
                      NEST Readiness Index
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-black text-white tracking-tight tabular-nums">
                        {displayScore}
                      </span>
                      <span className="text-sm font-bold text-indigo-300">/ 100</span>
                      <span className="text-xs text-emerald-400 font-bold ml-2 inline-flex items-center">
                        <TrendingUp className="h-3.5 w-3.5 mr-1" /> On Track
                      </span>
                    </div>
                  </div>

                  <div className="hidden sm:block text-right relative z-10">
                    <div className="text-[11px] text-indigo-300 font-semibold uppercase tracking-wider">Target Admission</div>
                    <div className="text-base font-extrabold text-white">NISER &amp; CEBS 2027</div>
                    <div className="text-xs text-emerald-400 font-bold mt-0.5">Top 5% Benchmark</div>
                  </div>
                </div>

                {/* 2 Focused Subject Metric Bars */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Subject Telemetry</span>
                    <span className="text-slate-400 text-[11px] font-medium">Best-3 Evaluation</span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-indigo-600" />
                          Physics — Wave Optics &amp; Mechanics
                        </span>
                        <span className="font-mono text-indigo-600 font-black">82%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={isInView ? { width: "82%" } : { width: "0%" }}
                          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                          className="h-full bg-indigo-600 rounded-full"
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-rose-500" />
                          Biology — Cell Biology &amp; Genetics
                        </span>
                        <span className="font-mono text-rose-600 font-black">69%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={isInView ? { width: "69%" } : { width: "0%" }}
                          transition={{ duration: 1, delay: 0.55, ease: "easeOut" }}
                          className="h-full bg-rose-500 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Priority Action Card */}
                <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100/90 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                      <Target className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-indigo-600 block">Immediate Focus</span>
                      <span className="font-bold text-slate-900">Solve 15 NEST Biology PYQs</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-200">
                    +6 pts gain
                  </span>
                </div>

              </div>

            </div>

            {/* Subtle Floating Micro Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -top-3 -right-2 sm:-right-4 bg-white border border-slate-200 shadow-md rounded-xl p-2.5 flex items-center gap-2 text-xs font-bold text-emerald-800"
            >
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>+8% Physics Accuracy</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="absolute -bottom-3 -left-2 sm:-left-4 bg-white border border-slate-200 shadow-md rounded-xl p-2.5 flex items-center gap-2 text-xs font-bold text-slate-800"
            >
              <Activity className="h-3.5 w-3.5 text-indigo-600" />
              <span>180-Mark CBT Format</span>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
