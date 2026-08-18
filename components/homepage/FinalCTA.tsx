"use client";

import * as React from "react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScientificBackground } from "@/components/shared/ScientificBackground";
import { ArrowRight, Sparkles, Compass, ShieldCheck } from "lucide-react";
import { motion, useInView, type Variants } from "motion/react";

interface FinalCTAProps {
  onOpenAssessment: () => void;
}

export function FinalCTA({ onOpenAssessment }: FinalCTAProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const headingText = "Your NEST preparation starts with knowing where you stand.";
  const words = headingText.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
  };

  return (
    <section ref={ref} className="relative py-20 sm:py-28 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white overflow-hidden">
      <ScientificBackground />
      
      {/* Animated Orbs */}
      <motion.div 
        animate={{ y: [0, -30, 0], opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }} 
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ y: [0, 40, 0], opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }} 
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-indigo-200 border border-white/10 text-xs font-bold uppercase tracking-wider shadow-lg shadow-indigo-900/50 backdrop-blur-sm"
        >
          <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          </motion.div>
          <span>Start Free Today</span>
        </motion.div>

        <motion.h2 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight flex flex-wrap justify-center gap-x-2.5 gap-y-1"
        >
          {words.map((word, i) => (
            <motion.span key={i} variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Take the free assessment and discover what you should focus on next to build a confident, high-scoring preparation strategy.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative"
        >
          <div className="relative w-full sm:w-auto">
            {/* Animated Glow behind button */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute inset-0 bg-indigo-500/40 rounded-full blur-xl z-0"
            />
            <Button 
              onClick={onOpenAssessment} 
              size="xl" 
              className="relative w-full sm:w-auto z-10 bg-[#4F46E5] hover:bg-[#3730A3] text-white border-0 shadow-lg shadow-indigo-500/30 rounded-xl font-bold text-base transition-all group"
            >
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
              className="w-full sm:w-auto relative z-10 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 rounded-xl font-semibold text-base transition-all group backdrop-blur-sm"
            >
              <Compass className="mr-2 h-5 w-5 text-indigo-300 group-hover:rotate-45 transition-transform duration-300" /> Explore SciPrep
            </Button>
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 font-medium"
        >
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" /> No credit card required
          </span>
          <span className="hidden sm:inline">•</span>
          <span>Takes less than 3 minutes</span>
          <span className="hidden sm:inline">•</span>
          <span>Personalized NEST diagnostic score</span>
        </motion.div>
      </div>
    </section>
  );
}
