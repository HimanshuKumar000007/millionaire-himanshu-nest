"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, BookOpen, PenTool, BarChart3, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";

const steps = [
  {
    num: "01",
    id: "assess",
    title: "ASSESS",
    icon: Target,
    tagline: "Know Your Baseline",
    desc: "Take diagnostic assessments to pinpoint exact strengths and weak spots across Physics, Chemistry, Biology and Mathematics.",
    detail: "Identifies whether you need concept reinforcement in Mechanics or speed practice in Inorganic Chemistry before wasting hours on familiar topics.",
  },
  {
    num: "02",
    id: "understand",
    title: "UNDERSTAND",
    icon: BookOpen,
    tagline: "Focused Smart Lessons",
    desc: "Master high-yield NEST concepts through concise 15-minute lessons stripped of unnecessary clutter.",
    detail: "Clear explanations linked directly to NEST question patterns, important formulas, and common trap options.",
  },
  {
    num: "03",
    id: "practice",
    title: "PRACTICE",
    icon: PenTool,
    tagline: "Authentic NEST PYQs",
    desc: "Solve previous year questions with step-by-step concept breakdowns, difficulty tagging, and performance insight.",
    detail: "Practice in an exam-like interface with options to mark for review, view hints, or test topic mastery.",
  },
  {
    num: "04",
    id: "analyze",
    title: "ANALYZE",
    icon: BarChart3,
    tagline: "Performance Analytics",
    desc: "Review speed, time per question, subject accuracy, and topic-level readiness index after every test.",
    detail: "Clear visual metrics revealing whether you lost marks due to time pressure or conceptual gaps.",
  },
  {
    num: "05",
    id: "improve",
    title: "IMPROVE",
    icon: TrendingUp,
    tagline: "Targeted Revision",
    desc: "Receive auto-generated priority revisions and targeted question drills to convert weak topics into strong suits.",
    detail: "Your preparation path updates continuously as you improve high-priority weak areas.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function PreparationSystem() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white border-b border-gray-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-5">
            The SciPrep Method
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-slate-950 tracking-tight leading-tight max-w-3xl mx-auto">
            A smarter system for NEST preparation.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-normal">
            SciPrep connects learning, practice, and performance into one focused preparation experience.
          </p>
        </motion.div>

        {/* Step selector */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-2.5 mb-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <motion.button
                key={step.id}
                variants={itemVariants}
                onClick={() => setActiveStep(idx)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                  isSelected
                    ? "bg-indigo-50 border-indigo-500/60 ring-1 ring-indigo-400/30 shadow-sm"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-mono font-bold ${isSelected ? "text-indigo-600" : "text-slate-400"}`}>
                    {step.num}
                  </span>
                  <div className={`p-1.5 rounded-lg transition-colors ${isSelected ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                </div>
                <h4 className={`text-[11px] font-black tracking-wide ${isSelected ? "text-slate-900" : "text-slate-600"}`}>
                  {step.title}
                </h4>
                <span className="text-[10px] text-slate-400 block truncate mt-0.5 font-medium">
                  {step.tagline}
                </span>
                {idx < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-300 z-10 h-3.5 w-3.5" />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Detail card */}
        <Card className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-2xl shadow-xl overflow-hidden border-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-indigo-500/30 text-indigo-200 border-indigo-400/40 text-xs">
                    Step {steps[activeStep].num} of 05
                  </Badge>
                  <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest">
                    {steps[activeStep].title} PHASE
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {steps[activeStep].tagline}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  {steps[activeStep].desc}
                </p>
                <div className="flex items-start gap-2 text-xs text-indigo-200 bg-white/8 p-3.5 rounded-xl border border-white/10">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white">SciPrep Insight:</strong> {steps[activeStep].detail}</span>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 text-center space-y-2 min-w-[180px]">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-black"
                >
                  {steps[activeStep].num}
                </motion.div>
                <span className="text-xs font-black text-white uppercase tracking-wider">{steps[activeStep].title}</span>
                <span className="text-[11px] text-indigo-300">Continuous Improvement Loop</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </Card>
      </div>
    </section>
  );
}
