"use client";

import * as React from "react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Compass, ShieldCheck, Zap, Clock, Target } from "lucide-react";
import { motion, useInView, type Variants } from "motion/react";

interface FinalCTAProps {
  onOpenAssessment: () => void;
}

const featurePills = [
  { icon: ShieldCheck, label: "Free to start", color: "text-emerald-400" },
  { icon: Clock, label: "Under 3 minutes", color: "text-indigo-400" },
  { icon: Target, label: "Instant NEST score", color: "text-purple-400" },
];

export function FinalCTA({ onOpenAssessment }: FinalCTAProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const headingText = "Your NEST preparation starts with knowing where you stand.";
  const words = headingText.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
  };

  return (
    <section ref={ref} className="relative py-20 sm:py-32 bg-slate-950 text-white overflow-hidden">
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
        backgroundSize: "40px 40px"
      }} />

      {/* Centered spotlight */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px]" />
      </div>

      {/* Animated orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], opacity: [0.15, 0.3, 0.15], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/5 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 40, 0], opacity: [0.08, 0.2, 0.08], scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider"
        >
          <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          </motion.div>
          <span>Start Free Today — No Credit Card</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight flex flex-wrap justify-center gap-x-3 gap-y-1"
        >
          {words.map((word, i) => (
            <motion.span key={i} variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Take the free assessment and discover what you should focus on next to build a confident, high-scoring NEST preparation strategy — powered by SciPrep&apos;s SMAS-aware analytics.
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {featurePills.map((pill, i) => {
            const Icon = pill.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300"
              >
                <Icon className={`h-3.5 w-3.5 ${pill.color}`} />
                {pill.label}
              </div>
            );
          })}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <div className="relative w-full sm:w-auto group">
            {/* Animated ring pulse */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute -inset-1 bg-indigo-500/30 rounded-2xl blur-md pointer-events-none"
            />
            <Button
              onClick={onOpenAssessment}
              size="xl"
              className="relative w-full sm:w-auto z-10 bg-indigo-600 hover:bg-indigo-500 text-white border-0 shadow-lg shadow-indigo-500/30 rounded-xl font-bold text-base transition-all"
            >
              <Zap className="mr-2 h-5 w-5 text-indigo-200" />
              Start Free Assessment
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.div>
            </Button>
          </div>

          <a href="#how-it-works" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="xl"
              className="w-full sm:w-auto bg-white/5 border-white/15 text-white hover:bg-white/10 hover:border-white/25 rounded-xl font-semibold text-base transition-all backdrop-blur-sm group"
            >
              <Compass className="mr-2 h-5 w-5 text-indigo-400 group-hover:rotate-45 transition-transform duration-300" />
              Explore SciPrep
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
