"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { SectionHeading } from "@/components/shared/SectionHeading";
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
    desc: "Take diagnostic assessments to pinpoint exact strengths & weak spots across Physics, Chemistry, Biology & Maths.",
    detail: "Identifies whether you need concept reinforcement in Mechanics or speed practice in Inorganic Chemistry before you waste hours on familiar topics.",
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
    tagline: "Curated NEST PYQs",
    desc: "Solve authentic previous year questions with step-by-step concept breakdowns and difficulty tagging.",
    detail: "Practice in actual exam interface mode with options to mark for review, view hint notes, or test topic mastery.",
  },
  {
    num: "04",
    id: "analyze",
    title: "ANALYZE",
    icon: BarChart3,
    tagline: "Performance Analytics",
    desc: "Review speed, time per question, subject accuracy, and topic-level readiness index after every test.",
    detail: "Clear visual metrics revealing whether you lost marks due to speed pressure or conceptual ambiguity.",
  },
  {
    num: "05",
    id: "improve",
    title: "IMPROVE",
    icon: TrendingUp,
    tagline: "Personalized Action",
    desc: "Receive auto-generated priority revisions and targeted question drills to convert weak topics into strong suits.",
    detail: "Dynamic study path that continually updates your readiness score as you conquer high-priority weak areas.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function PreparationSystem() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white border-b border-gray-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            badge="The SciPrep Method"
            title="A smarter system for NEST preparation."
            subtitle="SciPrep connects learning, practice and performance into one focused preparation experience."
          />
        </motion.div>

        {/* Step Flow Indicators */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8"
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
                className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden group ${
                  isSelected
                    ? "bg-indigo-50/80 border-[#4F46E5] ring-2 ring-indigo-500/20 shadow-sm"
                    : "bg-[#F7F8FC] border-gray-200 hover:border-gray-300 hover:bg-gray-100/80"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${isSelected ? "text-[#4F46E5]" : "text-gray-400"}`}>
                    {step.num}
                  </span>
                  <div className={`p-1.5 rounded-lg transition-colors ${isSelected ? "bg-[#4F46E5] text-white" : "bg-gray-200 text-gray-600"}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <h4 className={`text-sm font-extrabold tracking-wide ${isSelected ? "text-[#111827]" : "text-gray-700"}`}>
                  {step.title}
                </h4>
                <span className="text-[11px] text-gray-500 block truncate font-medium">
                  {step.tagline}
                </span>

                {idx < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 text-gray-300 z-10 h-4 w-4" />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Detailed Step Inspector Box */}
        <Card className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-2xl shadow-xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-indigo-500/30 text-indigo-200 border-indigo-400/40">
                    Step {steps[activeStep].num} of 05
                  </Badge>
                  <span className="text-xs font-mono text-indigo-300 uppercase tracking-widest">
                    {steps[activeStep].title} PHASE
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {steps[activeStep].tagline}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {steps[activeStep].desc}
                </p>
                <div className="flex items-start gap-2 text-xs text-indigo-200 bg-white/10 p-3 rounded-xl border border-white/10 mt-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>SciPrep Insight:</strong> {steps[activeStep].detail}</span>
                </div>
              </div>

              <div className="shrink-0 flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 text-center space-y-2 min-w-[200px]">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-12 w-12 rounded-full bg-[#4F46E5] flex items-center justify-center text-white text-xl font-bold"
                >
                  {steps[activeStep].num}
                </motion.div>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {steps[activeStep].title}
                </span>
                <span className="text-[11px] text-indigo-200">
                  Continuous Improvement Loop
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </Card>
      </div>
    </section>
  );
}
