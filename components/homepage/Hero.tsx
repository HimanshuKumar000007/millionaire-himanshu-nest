"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScientificBackground } from "@/components/shared/ScientificBackground";
import { ArrowRight, Sparkles, TrendingUp, AlertTriangle, Target, Activity, ShieldCheck, Compass } from "lucide-react";
import { motion, useInView } from "motion/react";

interface HeroProps {
  onOpenAssessment: () => void;
}

export function Hero({ onOpenAssessment }: HeroProps) {
  const [activeSubject, setActiveSubject] = useState<"Physics" | "Chemistry" | "Biology" | "Mathematics">("Physics");
  const [missionTasks, setMissionTasks] = useState([
    { id: 1, title: "Physics — Wave Optics Revision", done: true },
    { id: 2, title: "Solve 15 NEST Biology PYQs", done: false },
    { id: 3, title: "Chemistry Mock Diagnostic", done: false },
  ]);

  const subjectData = {
    Physics: { score: 82, color: "bg-indigo-600", status: "Strong Concept Mastery", weakTopic: "Rotational Dynamics" },
    Chemistry: { score: 75, color: "bg-blue-600", status: "On Track", weakTopic: "Electrochemistry" },
    Biology: { score: 69, color: "bg-emerald-600", status: "Needs Priority Focus", weakTopic: "Cellular Respiration" },
    Mathematics: { score: 77, color: "bg-purple-600", status: "Good Accuracy", weakTopic: "Definite Integrals" },
  };

  const toggleTask = (id: number) => {
    setMissionTasks(tasks =>
      tasks.map(t => t.id === id ? { ...t, done: !t.done } : t)
    );
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = 74;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutQuart)
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      setDisplayScore(Math.floor(easeProgress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView]);

  return (
    <section ref={sectionRef} className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      <ScientificBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: -10, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[#4F46E5] text-xs font-bold tracking-wide uppercase shadow-sm shadow-indigo-900/5 hover:shadow-md transition-shadow cursor-default"
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              <span>NEST Preparation • From the Creators of IISER SmartPrep</span>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight text-[#111827] leading-[1.12]"
            >
              Prepare Smarter. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#3730A3]">
                Get Ready for NEST.
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-xl font-normal"
            >
              A focused preparation platform for NEST aspirants — combining smart lessons, PYQs, realistic mock tests, and performance insights to help you prepare with direction.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1"
            >
              <Button
                onClick={onOpenAssessment}
                size="xl"
                className="bg-[#4F46E5] hover:bg-[#3730A3] hover:scale-[1.02] text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 text-base font-bold transition-all group"
              >
                Start Free Assessment
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <a href="#how-it-works" className="block w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="xl"
                  className="w-full sm:w-auto border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm text-base font-semibold transition-all"
                >
                  <Compass className="mr-2 h-4 w-4 text-indigo-600" />
                  Explore NEST Prep
                </Button>
              </a>
            </motion.div>

            {/* Micro assurance */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-semibold text-[#6B7280]"
            >
              <span className="flex items-center gap-1.5 text-gray-700 cursor-default hover:text-indigo-600 transition-colors">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> Free to start
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1.5 text-gray-700 cursor-default hover:text-indigo-600 transition-colors">
                <Target className="h-4 w-4 text-indigo-600" /> Personalized preparation
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1.5 text-gray-700 cursor-default hover:text-indigo-600 transition-colors">
                Built for serious aspirants
              </span>
            </motion.div>
          </div>

          {/* Right Column: Interactive Product Visualization Frame */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 40, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-6 relative"
          >
            {/* Subtle Rotating Gradient Ring */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 opacity-20 blur-xl animate-spin" style={{ animationDuration: '30s' }} />
            
            {/* Main Dashboard Frame */}
            <div className="relative mx-auto max-w-lg lg:max-w-none rounded-2xl border border-gray-200/80 bg-white/95 backdrop-blur-sm p-5 sm:p-6 shadow-2xl shadow-indigo-950/10 ring-1 ring-gray-900/5 transition-all hover:shadow-indigo-950/15">
              
              {/* Browser Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400 hover:scale-110 transition-transform cursor-pointer" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400 hover:scale-110 transition-transform cursor-pointer" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 hover:scale-110 transition-transform cursor-pointer" />
                  </div>
                  <span className="text-xs font-mono text-gray-400 ml-2">app.sciprep.in/readiness</span>
                </div>
                <Badge variant="success" className="text-[11px] font-mono animate-pulse">
                  Live Sync
                </Badge>
              </div>

              {/* Inner Dashboard Content */}
              <div className="space-y-5">
                
                {/* Score Header Widget */}
                <div className="relative bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-xl p-4 sm:p-5 flex items-center justify-between shadow-inner group overflow-hidden hover:shadow-indigo-500/20 transition-shadow">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <span className="text-xs font-semibold text-indigo-200 uppercase tracking-wider block">
                      Your NEST Readiness Index
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums">{displayScore}</span>
                      <span className="text-xs font-mono text-indigo-200">/ 100</span>
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <TrendingUp className="h-3 w-3 mr-1" /> On Track
                      </span>
                    </div>
                  </div>
                  <div className="hidden sm:block text-right relative z-10">
                    <span className="text-[11px] text-indigo-200 block">Target Seat</span>
                    <span className="text-xs font-bold text-white">NISER / CEBS Candidate</span>
                  </div>
                </div>

                {/* Subject Readiness Progress Bars */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                    <span>Subject Readiness Breakdown</span>
                    <span className="text-gray-400 text-[11px] font-normal">Click subject to inspect</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {(Object.keys(subjectData) as Array<keyof typeof subjectData>).map((subj, index) => {
                      const data = subjectData[subj];
                      const isSelected = activeSubject === subj;
                      return (
                        <div
                          key={subj}
                          onClick={() => setActiveSubject(subj)}
                          className={`p-2.5 rounded-lg border transition-all cursor-pointer group ${
                            isSelected
                              ? "bg-indigo-50/60 border-indigo-200 ring-1 ring-indigo-200 shadow-sm"
                              : "bg-gray-50/70 border-gray-100 hover:bg-gray-100/80 hover:border-indigo-100"
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                            <span className={`font-bold transition-colors ${isSelected ? 'text-indigo-900' : 'text-gray-900 group-hover:text-indigo-700'}`}>{subj}</span>
                            <span className="text-indigo-900 font-mono font-bold tabular-nums">{data.score}%</span>
                          </div>
                          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: "0%" }}
                              animate={isInView ? { width: `${data.score}%` } : { width: "0%" }}
                              transition={{ duration: 1, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
                              className={`h-full ${data.color} rounded-full`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Today's Mission Checklist */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 space-y-2 hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                      <Target className="h-3.5 w-3.5 text-[#4F46E5]" /> Today&apos;s Mission
                    </span>
                    <span className="text-[10px] font-mono text-gray-500 tabular-nums">{missionTasks.filter(t => t.done).length} / {missionTasks.length} Tasks</span>
                  </div>

                  <div className="space-y-1.5">
                    {missionTasks.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => toggleTask(t.id)}
                        className="flex items-center gap-2.5 text-xs text-gray-700 bg-white p-2 rounded-lg border border-gray-100 cursor-pointer hover:border-indigo-200 hover:shadow-sm transition-all group"
                      >
                        <div className={`h-3.5 w-3.5 rounded flex items-center justify-center border transition-colors ${t.done ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 group-hover:border-indigo-400'}`}>
                          {t.done && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span className={`transition-colors ${t.done ? "line-through text-gray-400" : "font-medium text-gray-800 group-hover:text-indigo-900"}`}>
                          {t.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subtle Floating Badges around Frame */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -top-4 -right-2 sm:-right-6 bg-white border border-gray-200 shadow-lg shadow-emerald-900/5 rounded-xl p-2.5 flex items-center gap-2 text-xs font-bold text-emerald-700 hover:scale-105 transition-transform cursor-default" 
              >
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>+8% Physics Accuracy</span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="absolute -bottom-4 -left-2 sm:-left-6 bg-white border border-amber-200 shadow-lg shadow-amber-900/5 rounded-xl p-2.5 flex items-center gap-2 text-xs font-bold text-amber-800 hover:scale-105 transition-transform cursor-default"
              >
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span>Weak Topic: {subjectData[activeSubject].weakTopic}</span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="absolute top-1/2 -right-4 sm:-right-8 hidden md:flex bg-slate-900 text-white border border-slate-700 shadow-xl shadow-slate-900/20 rounded-xl p-2.5 items-center gap-2 text-xs font-bold hover:scale-105 transition-transform cursor-default"
              >
                <Activity className="h-4 w-4 text-indigo-400" />
                <span>Mock Accuracy 81%</span>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
