"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  ArrowRight,
  AlertTriangle,
  ChevronRight,
  Target,
  Sparkles,
  TrendingUp,
  BookOpen,
  Compass,
} from "lucide-react";
import { motion, useInView, animate, AnimatePresence } from "motion/react";

interface ReadinessSectionProps {
  onOpenAssessment: () => void;
}

function Counter({ from, to, duration = 1.5 }: { from: number; to: number; duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const node = nodeRef.current;
    if (node) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.round(value).toString();
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView]);

  return <span ref={nodeRef}>{from}</span>;
}

function AnimatedProgress({ value, className }: { value: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 1.2,
        ease: "easeOut",
        onUpdate: (v) => setCurrentValue(v),
      });
      return controls.stop;
    }
  }, [inView, value]);

  return (
    <div ref={ref} className="w-full">
      <Progress value={currentValue} className={className} />
    </div>
  );
}

export function ReadinessSection({ onOpenAssessment }: ReadinessSectionProps) {
  const [selectedSubject, setSelectedSubject] = useState<
    "Physics" | "Chemistry" | "Biology" | "Mathematics"
  >("Biology");

  const subjectDetails = {
    Physics: {
      readiness: 82,
      status: "Safe SMAS",
      barColor: "bg-indigo-600",
      pillBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
      opportunity: "Work, Energy & Power — Rotational Dynamics",
      expectedBoost: "+6 pts",
      priority: "Medium",
      topics: [
        { name: "Units & Dimensional Analysis", accuracy: 88, weightage: "High", status: "Mastered" },
        { name: "Kinematics & Motion in 2D", accuracy: 84, weightage: "Core", status: "Mastered" },
        { name: "Laws of Motion & Friction", accuracy: 79, weightage: "High", status: "Good" },
        { name: "Work, Energy & Power", accuracy: 64, weightage: "High Weightage", status: "Priority Review" },
      ],
    },
    Chemistry: {
      readiness: 75,
      status: "Safe SMAS",
      barColor: "bg-cyan-600",
      pillBg: "bg-cyan-50 text-cyan-800 border-cyan-200",
      opportunity: "Physical Chemistry — Chemical Thermodynamics",
      expectedBoost: "+5 pts",
      priority: "Medium",
      topics: [
        { name: "Mole Concept & Stoichiometry", accuracy: 82, weightage: "Core", status: "Mastered" },
        { name: "Structure of Atom & Orbitals", accuracy: 78, weightage: "High", status: "Good" },
        { name: "Periodic Trends & Bonding", accuracy: 73, weightage: "High", status: "Good" },
        { name: "Chemical Thermodynamics", accuracy: 61, weightage: "High Weightage", status: "Priority Review" },
      ],
    },
    Biology: {
      readiness: 69,
      status: "Needs Focus",
      barColor: "bg-rose-500",
      pillBg: "bg-rose-50 text-rose-800 border-rose-200",
      opportunity: "Biological Classification & Linkage Genetics",
      expectedBoost: "+8 pts",
      priority: "High",
      topics: [
        { name: "The Living World & Taxonomy", accuracy: 76, weightage: "Core", status: "Good" },
        { name: "Biological Classification", accuracy: 72, weightage: "High", status: "Good" },
        { name: "Plant Kingdom & Morpho", accuracy: 66, weightage: "High Weightage", status: "Needs Practice" },
        { name: "Animal Kingdom & Cell Cycle", accuracy: 58, weightage: "High Weightage", status: "Priority Focus" },
      ],
    },
    Mathematics: {
      readiness: 77,
      status: "Safe SMAS",
      barColor: "bg-violet-600",
      pillBg: "bg-violet-50 text-violet-800 border-violet-200",
      opportunity: "Calculus — Limits & Definite Integrals",
      expectedBoost: "+6 pts",
      priority: "Medium",
      topics: [
        { name: "Sets, Relations & Functions", accuracy: 85, weightage: "Core", status: "Mastered" },
        { name: "Complex Numbers & Quadratics", accuracy: 81, weightage: "High", status: "Mastered" },
        { name: "Permutations & Combinations", accuracy: 74, weightage: "High", status: "Good" },
        { name: "Limits, Continuity & Derivatives", accuracy: 63, weightage: "High Weightage", status: "Priority Review" },
      ],
    },
  };

  const currentData = subjectDetails[selectedSubject];

  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-slate-200/80 overflow-hidden relative">
      {/* Blueprint grid texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,.4) 1px,transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Activity className="h-3.5 w-3.5 text-indigo-600" /> Readiness Analytics &amp; SMAS Diagnostics
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-slate-950 tracking-tight leading-tight max-w-3xl mx-auto">
            Know exactly where you stand,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              long before exam day.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            SciPrep doesn&apos;t just show a raw score. It analyzes your diagnostic telemetry against official NISER &amp; CEBS cutoff thresholds, showing you what to improve next.
          </p>
        </motion.div>

        {/* 2-Column Diagnostic Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Overall Readiness & Subject Matrix (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6"
          >
            <Card className="p-6 sm:p-7 bg-white border-slate-200/90 shadow-sm rounded-3xl space-y-6 hover:shadow-md transition-all">
              
              {/* Overall Index Banner */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  OVERALL NEST READINESS
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  On Track (Top 5%)
                </span>
              </div>

              {/* Gauge Score Display */}
              <div className="py-2 text-center space-y-2">
                <div className="inline-flex items-baseline justify-center gap-1.5">
                  <span className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900 tabular-nums">
                    <Counter from={0} to={74} duration={1.8} />
                  </span>
                  <span className="text-xl font-bold text-slate-400">/ 100</span>
                </div>
                <p className="text-xs font-semibold text-slate-500 max-w-xs mx-auto">
                  Target Readiness Range: <strong className="text-slate-800">75+</strong> for High NISER / CEBS Qualification
                </p>
              </div>

              {/* 4 Interactive Subject Selectors */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Subject Readiness Matrix</span>
                  <span className="text-[11px] text-slate-400 font-normal">Click to inspect topics</span>
                </div>

                {(Object.keys(subjectDetails) as Array<keyof typeof subjectDetails>).map((subj) => {
                  const data = subjectDetails[subj];
                  const isSelected = selectedSubject === subj;
                  return (
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      key={subj}
                      onClick={() => setSelectedSubject(subj)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs"
                          : "bg-slate-50/80 border-slate-100 hover:bg-white hover:border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                        <span className="flex items-center gap-2">
                          <span className={`h-2.5 w-2.5 rounded-full ${data.barColor}`} />
                          <span className={isSelected ? "text-indigo-950 font-black" : "text-slate-700"}>
                            {subj}
                          </span>
                        </span>
                        <div className="flex items-center gap-2 font-mono">
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">
                            {data.status}
                          </span>
                          <span className="font-black text-slate-900">
                            <Counter from={0} to={data.readiness} />%
                          </span>
                        </div>
                      </div>
                      <AnimatedProgress value={data.readiness} className="h-1.5" />
                    </motion.div>
                  );
                })}
              </div>

              {/* Biggest Opportunity Box */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="mt-4 p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 space-y-2 transition-all shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    Highest Leverage Opportunity
                  </span>
                  <span className="text-[10px] font-bold bg-amber-200/60 text-amber-900 px-2 py-0.5 rounded-md">
                    Priority: High
                  </span>
                </div>
                <p className="text-sm font-extrabold text-amber-950">
                  {currentData.opportunity}
                </p>
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-amber-800 font-medium">
                    Expected Delta: <strong className="text-emerald-700 font-mono font-bold">{currentData.expectedBoost}</strong>
                  </span>
                  <button
                    onClick={onOpenAssessment}
                    className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    Open Diagnostic <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            </Card>
          </motion.div>

          {/* Right Column: Deep Topic Inspector (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-7 space-y-6"
          >
            <Card className="p-6 sm:p-8 bg-white border-slate-200/90 shadow-sm rounded-3xl space-y-6">
              
              {/* Subject Inspector Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="text-xs font-bold bg-indigo-600 text-white">
                      {selectedSubject} Analysis
                    </Badge>
                    <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {currentData.readiness}% Subject Readiness
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">
                    Topic Level Accuracy &amp; Weightage
                  </h3>
                </div>

                {/* Filter Pill Tabs */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  {(Object.keys(subjectDetails) as Array<keyof typeof subjectDetails>).map((subj) => (
                    <button
                      key={subj}
                      onClick={() => setSelectedSubject(subj)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        selectedSubject === subj
                          ? "bg-white text-indigo-700 shadow-2xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {subj.substring(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topics Breakdown List */}
              <div className="py-2 space-y-3 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  {currentData.topics.map((tp, idx) => (
                    <motion.div
                      key={tp.name + selectedSubject}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="p-4 rounded-2xl border border-slate-100 bg-slate-50/80 hover:bg-white hover:border-slate-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs group"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-slate-900 block group-hover:text-indigo-600 transition-colors">
                            {tp.name}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                            {tp.weightage}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                tp.accuracy >= 80
                                  ? "bg-emerald-500"
                                  : tp.accuracy >= 70
                                  ? "bg-indigo-600"
                                  : "bg-amber-500"
                              } rounded-full`}
                              style={{ width: `${tp.accuracy}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-700">
                            {tp.accuracy}% Accuracy
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Badge
                          variant={
                            tp.accuracy >= 80
                              ? "success"
                              : tp.accuracy >= 70
                              ? "default"
                              : "warning"
                          }
                          className="text-xs font-bold"
                        >
                          {tp.status}
                        </Badge>
                        <button
                          onClick={onOpenAssessment}
                          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-sm transition-all cursor-pointer"
                          title="Practice Topic PYQs"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Actionable Footer */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500 font-medium">
                  Calibrated against 8 years of official NEST SMAS cutoff benchmarks.
                </span>
                <Button
                  onClick={onOpenAssessment}
                  size="default"
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-md px-5"
                >
                  See My Readiness Index <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
