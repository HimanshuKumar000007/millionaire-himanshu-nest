"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Activity, ArrowRight, AlertTriangle, ChevronRight } from "lucide-react";
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
  const [selectedSubject, setSelectedSubject] = useState<"Physics" | "Chemistry" | "Biology" | "Mathematics">("Biology");

  const subjectDetails = {
    Physics: {
      readiness: 82,
      status: "On Track",
      color: "indigo",
      opportunity: "Physics — Work, Energy & Power",
      priority: "Medium",
      topics: [
        { name: "Units and Measurements", accuracy: 88, status: "Mastered" },
        { name: "Motion in a Straight Line", accuracy: 84, status: "Mastered" },
        { name: "Laws of Motion", accuracy: 79, status: "Good" },
        { name: "Work, Energy and Power", accuracy: 64, status: "Priority Review" },
      ]
    },
    Chemistry: {
      readiness: 75,
      status: "On Track",
      color: "blue",
      opportunity: "Physical Chemistry — Chemical Thermodynamics",
      priority: "Medium",
      topics: [
        { name: "Some Basic Concepts of Chemistry", accuracy: 82, status: "Mastered" },
        { name: "Structure of Atom", accuracy: 78, status: "Good" },
        { name: "Classification of Elements", accuracy: 73, status: "Good" },
        { name: "Chemical Thermodynamics", accuracy: 61, status: "Priority Review" },
      ]
    },
    Biology: {
      readiness: 69,
      status: "Needs Focus",
      color: "emerald",
      opportunity: "Biology — Biological Classification",
      priority: "High",
      topics: [
        { name: "The Living World", accuracy: 76, status: "Good" },
        { name: "Biological Classification", accuracy: 72, status: "Good" },
        { name: "Plant Kingdom", accuracy: 66, status: "Needs Practice" },
        { name: "Animal Kingdom", accuracy: 58, status: "Priority Focus" },
      ]
    },
    Mathematics: {
      readiness: 77,
      status: "On Track",
      color: "purple",
      opportunity: "Calculus — Limits and Derivatives",
      priority: "Medium",
      topics: [
        { name: "Sets and Functions", accuracy: 85, status: "Mastered" },
        { name: "Complex Numbers and Quadratic Equations", accuracy: 81, status: "Mastered" },
        { name: "Permutations and Combinations", accuracy: 74, status: "Good" },
        { name: "Limits and Derivatives", accuracy: 63, status: "Priority Review" },
      ]
    }
  };

  const currentData = subjectDetails[selectedSubject];

  return (
    <section className="py-16 sm:py-24 bg-[#F7F8FC] border-b border-gray-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Readiness Analytics"
          badgeVariant="default"
          title="Know where you stand before exam day."
          subtitle="SciPrep doesn't just show your score. It tells you what to do next — turning diagnostic telemetry into targeted preparation steps."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Overall Readiness Overview Widget */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6"
          >
            <Card className="p-6 sm:p-7 bg-white border-gray-200 shadow-md transition-all hover:shadow-lg">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  OVERALL NEST READINESS
                </span>
                <Badge variant="success" className="px-2.5 py-1">
                  <Activity className="h-3 w-3 mr-1" /> On Track
                </Badge>
              </div>

              <div className="py-6 text-center space-y-2">
                <div className="inline-flex items-baseline justify-center gap-1.5">
                  <span className="text-5xl sm:text-6xl font-black tracking-tight text-[#111827]">
                    <Counter from={0} to={74} duration={2} />
                  </span>
                  <span className="text-lg font-bold text-gray-400">/ 100</span>
                </div>
                <p className="text-xs font-semibold text-[#6B7280]">
                  Target Readiness Range: 75+ for High NISER/CEBS Qualification
                </p>
              </div>

              {/* Subject Readiness Progress Bars */}
              <div className="space-y-3.5 pt-2 border-t border-gray-100">
                {(Object.keys(subjectDetails) as Array<keyof typeof subjectDetails>).map((subj) => {
                  const data = subjectDetails[subj];
                  const isSelected = selectedSubject === subj;
                  return (
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      key={subj}
                      onClick={() => setSelectedSubject(subj)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-indigo-50/80 border-[#4F46E5] ring-1 ring-indigo-500/30"
                          : "bg-gray-50/80 border-gray-100 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-gray-800 mb-1.5">
                        <span className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full transition-colors ${isSelected ? "bg-[#4F46E5]" : "bg-gray-400"}`} />
                          {subj}
                        </span>
                        <span className="font-mono text-gray-900"><Counter from={0} to={data.readiness} />%</span>
                      </div>
                      <AnimatedProgress value={data.readiness} className="h-2" />
                    </motion.div>
                  );
                })}
              </div>

              {/* Biggest Opportunity Highlight Box */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="mt-6 p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                    </motion.div>
                    Biggest Opportunity
                  </span>
                  <Badge variant="warning" className="text-[10px]">
                    Priority: High
                  </Badge>
                </div>
                <p className="text-sm font-extrabold text-amber-950">
                  {currentData.opportunity}
                </p>
                <button
                  onClick={onOpenAssessment}
                  className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 pt-1 transition-colors"
                >
                  Review Topic Diagnostics <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            </Card>
          </motion.div>

          {/* Right Column: Deep Topic Inspector for Selected Subject */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <Card className="p-6 sm:p-7 bg-white border-gray-200 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="text-xs font-bold">
                      {selectedSubject} Analysis
                    </Badge>
                    <span className="text-xs text-gray-400 font-mono">
                      {currentData.readiness}% Subject Readiness
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#111827] mt-1">
                    Topic Level Accuracy & Readiness
                  </h3>
                </div>

                {/* Subject Switch Tabs */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  {(Object.keys(subjectDetails) as Array<keyof typeof subjectDetails>).map((subj) => (
                    <button
                      key={subj}
                      onClick={() => setSelectedSubject(subj)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                        selectedSubject === subj
                          ? "bg-white text-[#4F46E5] shadow-2xs"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {subj.substring(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topics Breakdown List */}
              <div className="py-4 space-y-3 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  {currentData.topics.map((tp, idx) => (
                    <motion.div
                      key={tp.name + selectedSubject}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="p-4 rounded-xl border border-gray-100 bg-[#F7F8FC] hover:bg-white hover:border-gray-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs hover:shadow-sm group cursor-pointer"
                    >
                      <div className="space-y-1">
                        <span className="text-sm font-bold text-[#111827] block group-hover:text-[#4F46E5] transition-colors">
                          {tp.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <AnimatedProgress value={tp.accuracy} className="h-1.5 w-32" />
                          <span className="text-xs font-mono font-bold text-gray-700">
                            {tp.accuracy}% Accuracy
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            tp.accuracy >= 80
                              ? "success"
                              : tp.accuracy >= 70
                              ? "default"
                              : "warning"
                          }
                          className="text-xs"
                        >
                          {tp.status}
                        </Badge>
                        <button
                          onClick={onOpenAssessment}
                          className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:text-[#4F46E5] hover:border-indigo-200 transition-colors"
                          title="Practice Topic"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* CTA footer */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-500 font-medium">
                  Calibrated against 8 years of official NEST SMAS cutoff benchmarks.
                </span>
                <Button onClick={onOpenAssessment} size="sm" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-xs">
                  See My Readiness Index <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
