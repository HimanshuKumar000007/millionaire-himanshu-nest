"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScientificBackground } from "@/components/shared/ScientificBackground";
import { ArrowRight, Sparkles, TrendingUp, AlertTriangle, Target, Activity, ShieldCheck, Compass, Star, Users, Zap } from "lucide-react";
import { motion, useInView } from "motion/react";

interface HeroProps {
  onOpenAssessment: () => void;
}

const avatarColors = ["bg-indigo-500", "bg-purple-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500"];

export function Hero({ onOpenAssessment }: HeroProps) {
  const [activeSubject, setActiveSubject] = useState<"Physics" | "Chemistry" | "Biology" | "Mathematics">("Physics");
  const [missionTasks, setMissionTasks] = useState([
    { id: 1, title: "Physics — Wave Optics Revision", done: true },
    { id: 2, title: "Solve 15 NEST Biology PYQs", done: false },
    { id: 3, title: "Chemistry Mock Diagnostic", done: false },
  ]);

  const subjectData = {
    Physics: { score: 82, color: "bg-indigo-500", bar: "from-indigo-500 to-indigo-400", status: "Strong Concept Mastery", weakTopic: "Rotational Dynamics" },
    Chemistry: { score: 75, color: "bg-blue-500", bar: "from-blue-500 to-cyan-400", status: "On Track", weakTopic: "Electrochemistry" },
    Biology: { score: 69, color: "bg-emerald-500", bar: "from-emerald-500 to-teal-400", status: "Needs Priority Focus", weakTopic: "Cellular Respiration" },
    Mathematics: { score: 77, color: "bg-purple-500", bar: "from-purple-500 to-violet-400", status: "Good Accuracy", weakTopic: "Definite Integrals" },
  };

  const toggleTask = (id: number) => {
    setMissionTasks(tasks =>
      tasks.map(t => t.id === id ? { ...t, done: !t.done } : t)
    );
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [displayScore, setDisplayScore] = useState(0);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    // Animate readiness score
    let start = 0;
    const end = 74;
    const duration = 1500;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setDisplayScore(Math.floor(easeProgress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    // Animate student count
    const countEnd = 2400;
    const countDuration = 2000;
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

      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-purple-600/6 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Hero Text */}
          <div className="lg:col-span-6 space-y-7 text-left">

            {/* Announcement badge */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: -10, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2.5 pl-1 pr-3.5 py-1 rounded-full bg-white border border-indigo-100 shadow-sm shadow-indigo-900/5 text-xs font-semibold cursor-default"
            >
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[11px] font-black uppercase tracking-wide">
                <Sparkles className="h-3 w-3 text-indigo-200" /> NEST 2026
              </span>
              <span className="text-gray-600">India&apos;s #1 Focused Preparation Platform</span>
            </motion.div>

            {/* H1 — Editorial Scale */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
              className="text-5xl sm:text-6xl lg:text-[64px] font-black tracking-[-0.03em] text-slate-950 leading-[1.06]"
            >
              Prepare Smarter.{" "}
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600">
                Crack NEST.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg font-normal"
            >
              A precision preparation platform for NEST aspirants — combining smart lessons, PYQs, realistic 180-mark mock tests, and SMAS-aware performance analytics.
            </motion.p>

            {/* Social proof bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-3"
            >
              {/* Avatar stack */}
              <div className="flex -space-x-2">
                {avatarColors.map((color, i) => (
                  <div
                    key={i}
                    className={`h-7 w-7 rounded-full ${color} border-2 border-white flex items-center justify-center text-[10px] text-white font-black shadow-sm`}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="text-xs font-semibold text-slate-600">
                <span className="font-black text-slate-900">{studentCount.toLocaleString()}+</span> NEST aspirants preparing
              </div>
              <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                4.9 / 5
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
            >
              <div className="relative w-full sm:w-auto group">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 opacity-60 blur group-hover:opacity-90 transition-opacity duration-300" />
                <Button
                  onClick={onOpenAssessment}
                  size="xl"
                  className="relative w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30 text-base font-bold transition-all group"
                >
                  <Zap className="mr-2 h-4 w-4 text-indigo-200" />
                  Start Free Assessment
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <a href="#how-it-works" className="block w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="xl"
                  className="w-full sm:w-auto border-gray-200/80 text-gray-700 hover:bg-gray-50 hover:border-gray-300 text-base font-semibold transition-all bg-white/60 backdrop-blur-sm"
                >
                  <Compass className="mr-2 h-4 w-4 text-indigo-500" />
                  Explore NEST Prep
                </Button>
              </a>
            </motion.div>

            {/* Micro trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-1 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-semibold text-slate-500"
            >
              <span className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors cursor-default">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Free to start
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors cursor-default">
                <Target className="h-3.5 w-3.5 text-indigo-500" /> Personalized roadmap
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors cursor-default">
                <Users className="h-3.5 w-3.5 text-purple-500" /> Built for NISER & CEBS
              </span>
            </motion.div>
          </div>

          {/* Right Column: Interactive Product Visualization Frame */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ duration: 0.75, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-6 relative"
          >
            {/* Ambient glow ring */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-purple-500/15 to-emerald-500/20 blur-2xl pointer-events-none" />

            {/* Main Dashboard Frame */}
            <div className="relative mx-auto max-w-lg lg:max-w-none rounded-2xl border border-gray-200/80 bg-white/95 backdrop-blur-sm p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.1),0_4px_20px_rgba(79,70,229,0.1)] ring-1 ring-gray-900/5">

              {/* Browser Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100/80">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="text-xs font-mono text-gray-400 ml-2">app.sciprep.in/readiness</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-700">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </div>
              </div>

              {/* Inner Dashboard Content */}
              <div className="space-y-4">

                {/* Score Header Widget */}
                <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl p-4 sm:p-5 flex items-center justify-between shadow-lg overflow-hidden group">
                  {/* Subtle grid texture */}
                  <div className="absolute inset-0 opacity-[0.04]" style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
                    backgroundSize: "20px 20px"
                  }} />
                  {/* Glow orb */}
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-indigo-500/25 rounded-full blur-2xl pointer-events-none" />

                  <div className="relative z-10">
                    <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-widest block mb-1">
                      NEST Readiness Index
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-4xl font-black tracking-tight tabular-nums">{displayScore}</span>
                      <span className="text-xs font-mono text-indigo-300">/ 100</span>
                      <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <TrendingUp className="h-3 w-3 mr-1" /> On Track
                      </span>
                    </div>
                  </div>
                  <div className="hidden sm:block text-right relative z-10">
                    <span className="text-[10px] text-indigo-300 block font-semibold uppercase tracking-wider">Target Seat</span>
                    <span className="text-sm font-black text-white">NISER / CEBS</span>
                  </div>
                </div>

                {/* Subject Readiness Progress Bars */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                    <span>Subject Readiness Breakdown</span>
                    <span className="text-gray-400 text-[11px] font-normal">Click to inspect</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {(Object.keys(subjectData) as Array<keyof typeof subjectData>).map((subj, index) => {
                      const data = subjectData[subj];
                      const isSelected = activeSubject === subj;
                      return (
                        <div
                          key={subj}
                          onClick={() => setActiveSubject(subj)}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer group ${
                            isSelected
                              ? "bg-indigo-50/80 border-indigo-200/80 ring-1 ring-indigo-200/60 shadow-sm"
                              : "bg-gray-50/80 border-gray-100 hover:bg-white hover:border-indigo-100/80 hover:shadow-sm"
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-semibold mb-2">
                            <span className={`font-bold transition-colors ${isSelected ? "text-indigo-900" : "text-gray-800 group-hover:text-indigo-700"}`}>{subj}</span>
                            <span className="text-indigo-700 font-black font-mono tabular-nums">{data.score}%</span>
                          </div>
                          <div className="w-full bg-gray-200/70 h-1.5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: "0%" }}
                              animate={isInView ? { width: `${data.score}%` } : { width: "0%" }}
                              transition={{ duration: 1, delay: 0.6 + (index * 0.1), ease: "easeOut" }}
                              className={`h-full bg-gradient-to-r ${data.bar} rounded-full`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Today's Mission Checklist */}
                <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-gray-800 flex items-center gap-1.5">
                      <Target className="h-3.5 w-3.5 text-indigo-600" /> Today&apos;s Mission
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 bg-white border border-gray-100 px-2 py-0.5 rounded-full">
                      {missionTasks.filter(t => t.done).length} / {missionTasks.length} done
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {missionTasks.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => toggleTask(t.id)}
                        className="flex items-center gap-2.5 text-xs bg-white p-2.5 rounded-lg border border-gray-100/80 cursor-pointer hover:border-indigo-200 hover:shadow-sm transition-all group"
                      >
                        <div className={`h-3.5 w-3.5 rounded flex items-center justify-center border transition-all shrink-0 ${t.done ? "bg-indigo-600 border-indigo-600" : "border-gray-300 group-hover:border-indigo-400"}`}>
                          {t.done && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span className={`transition-colors leading-tight ${t.done ? "line-through text-gray-400" : "font-medium text-gray-800 group-hover:text-indigo-900"}`}>
                          {t.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Micro Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="absolute -top-4 -right-2 sm:-right-6 bg-white border border-gray-200 shadow-lg rounded-xl p-2.5 flex items-center gap-2 text-xs font-bold text-emerald-700 hover:scale-105 transition-transform cursor-default"
            >
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>+8% Physics Accuracy</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="absolute -bottom-4 -left-2 sm:-left-6 bg-white border border-amber-200 shadow-lg rounded-xl p-2.5 flex items-center gap-2 text-xs font-bold text-amber-800 hover:scale-105 transition-transform cursor-default"
            >
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
              <span>Weak: {subjectData[activeSubject].weakTopic}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="absolute top-1/2 -right-4 sm:-right-8 hidden md:flex bg-slate-900 text-white border border-slate-700 shadow-xl rounded-xl p-2.5 items-center gap-2 text-xs font-bold hover:scale-105 transition-transform cursor-default"
            >
              <Activity className="h-3.5 w-3.5 text-indigo-400" />
              <span>Mock Accuracy 81%</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
