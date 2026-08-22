"use client";

import * as React from "react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, ShieldCheck, Clock, Target, CheckCircle2, TrendingUp } from "lucide-react";
import { motion, useInView, type Variants } from "motion/react";

interface FinalCTAProps {
  onOpenAssessment: () => void;
}

const featurePills = [
  { icon: ShieldCheck, label: "Free Diagnostic", color: "text-emerald-400" },
  { icon: Clock, label: "15 Minutes", color: "text-indigo-400" },
  { icon: Target, label: "SMAS Best-3 Score", color: "text-violet-400" },
];

export function FinalCTA({ onOpenAssessment }: FinalCTAProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const words = "Stop guessing. Start preparing with a plan.".split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.065, delayChildren: 0.2 } },
  };
  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 14, stiffness: 100 } },
  };

  return (
    <section ref={ref} className="relative py-24 sm:py-32 bg-slate-950 text-white overflow-hidden">
      {/* Background blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
          backgroundSize: "36px 36px"
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-indigo-600/15 rounded-full blur-[90px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider"
        >
          Begin Your NEST 2027 Journey
        </motion.div>

        <motion.h2
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight flex flex-wrap justify-center gap-x-3 gap-y-1"
        >
          {words.map((word, i) => (
            <motion.span key={i} variants={wordVariants} className="inline-block">{word}</motion.span>
          ))}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Take the free SciPrep diagnostic assessment and immediately uncover your subject strengths, conceptual blind spots, and target NISER cutoff gap.
        </motion.p>

        {/* Live Mini Preview Assessment Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="max-w-md mx-auto p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-left space-y-3"
        >
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-bold flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Instant Diagnostic Report Includes:
            </span>
            <span className="text-emerald-400 font-mono font-bold">100% Free</span>
          </div>
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
              <span>Full 4-Subject Sectional Readiness Breakdown</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
              <span>Biggest Opportunity Topic &amp; Targeted PYQ Plan</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
              <span>SMAS Best-3 Cutoff Benchmark for NISER / CEBS</span>
            </div>
          </div>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.75 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {featurePills.map((pill, i) => {
            const Icon = pill.icon;
            return (
              <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
                <Icon className={`h-3.5 w-3.5 ${pill.color}`} />
                {pill.label}
              </div>
            );
          })}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <Button
            onClick={onOpenAssessment}
            size="xl"
            className="relative w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white border-0 shadow-lg shadow-indigo-500/25 rounded-xl font-bold text-base transition-all group"
          >
            Start Free Diagnostic Assessment
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <a href="#how-it-works" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="xl"
              className="w-full sm:w-auto bg-white/5 border-white/15 text-white hover:bg-white/10 hover:border-white/25 rounded-xl font-semibold text-base transition-all backdrop-blur-sm group"
            >
              <Compass className="mr-2 h-5 w-5 text-indigo-400 group-hover:rotate-45 transition-transform duration-300" />
              Explore SciPrep Method
            </Button>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.95 }}
          className="text-xs text-slate-500 font-medium"
        >
          Free to start • No credit card required • Immediate score report
        </motion.p>
      </div>
    </section>
  );
}
