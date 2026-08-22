'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  Bot,
  Trophy,
  Zap,
  BookMarked,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Target,
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';

interface WhyChooseUsProps {
  onOpenTrial: () => void;
  onOpenEnroll: () => void;
}

export function WhyChooseUs({ onOpenTrial, onOpenEnroll }: WhyChooseUsProps) {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: FileText,
      title: 'High-Yield Smart Notes & Mindmaps',
      tag: 'Zero Fluff Revision',
      desc: 'Crystal-clear, color-coded Smart Notes for PCMB. Includes Organic chemistry reaction roadmaps, formula cheat sheets, NCERT extract summaries, and dedicated Biology notes for PCM students.',
      badge: '400+ Smart Sheets',
      color: 'from-indigo-500 to-cyan-500',
    },
    {
      icon: Trophy,
      title: 'Real TCS-iON CBT Mode Full Mocks',
      tag: 'Exact Exam Simulation',
      desc: 'The exact visual layout, countdown timer mechanics, question palette (Answered / Review / Unvisited), and sectional cutoff scoring used in official NEST examination centers.',
      badge: '100% Real Software',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: Bot,
      title: '24/7 AI Science Mentor',
      tag: 'Instant Doubts Solver',
      desc: 'Stuck on a tricky rotational mechanics derivation or organic stereochemistry mechanism at 2 AM? Get instant, first-principles explanations, formula recall, and step-by-step reasoning in under 2 seconds.',
      badge: 'Always Available',
      color: 'from-cyan-500 to-teal-500',
    },
    {
      icon: Zap,
      title: 'Quick Mocks (15/30 Min Sprints)',
      tag: 'Speed & Accuracy Training',
      desc: 'Bite-sized rapid test sprints designed for daily practice between study sessions. Perfect for eliminating negative marking, improving question selection, and building sharp exam reflexes.',
      badge: 'Daily Sprints',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Layers,
      title: '250+ Chapter-wise & Topic Mocks',
      tag: 'Granular Mastery',
      desc: 'Test your understanding right after finishing a topic with targeted chapter-wise tests. Progress from foundational concept checks to high-rigor NEST-level multi-concept problems.',
      badge: 'PCMB All Chapters',
      color: 'from-emerald-500 to-cyan-500',
    },
    {
      icon: BookMarked,
      title: '15+ Years Solved NEST PYQ Archive',
      tag: 'Verified Answer Keys',
      desc: 'Complete collection of past 15-year NEST papers with thoroughly verified step-by-step logic, difficulty classifications, and high-frequency recurring patterns for NISER and CEBS.',
      badge: '15-Year Solved',
      color: 'from-rose-500 to-pink-500',
    },
  ];

  return (
    <section id="why-us" className="py-24 relative overflow-hidden bg-[#0A0A0F]/90">
      {/* Background glow lines */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Pitch & Comparison Table */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-4">
                <Target className="w-3.5 h-3.5 text-cyan-400" />
                <span>The SciPrep NEST Precision Advantage</span>
              </div>

              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mb-5">
                Stop wasting hours on passive video lectures.{' '}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Practice is what cracks NISER & CEBS (NEST).
                </span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                NEST demands <strong className="text-white">deep analytical problem solving</strong>, SMAS sectional cutoff clearance, and high speed. Our self-paced toolkit pairs high-yield Smart Notes with exact TCS-iON CBT Mocks and a 24/7 AI Mentor.
              </p>

              <div className="flex items-center gap-4">
                <button
                  onClick={onOpenTrial}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>Try Free NEST CBT Mock & Smart Notes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Comparison Card: SciPrep vs Conventional Coaching */}
            <div className="glass-panel p-5 rounded-3xl border border-white/10 shadow-xl bg-[#12121A]">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between">
                <span>Active Practice vs Passive Watching</span>
                <span className="text-indigo-400 font-semibold">Head-to-Head</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/5 font-semibold">
                  <span className="text-slate-400">Traditional 3-Hr Lectures</span>
                  <span className="text-indigo-300 font-bold">SciPrep NEST</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/5 text-[11px]">
                  <div className="flex items-start gap-1.5 text-slate-400">
                    <XCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span>Passive watching, low retention</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold text-white">Active CBT Testing & Smart Notes</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/5 text-[11px]">
                  <div className="flex items-start gap-1.5 text-slate-400">
                    <XCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span>Waiting days for doubt clearance</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold text-white">Instant 24/7 AI Science Mentor</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="flex items-start gap-1.5 text-slate-400">
                    <XCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span>Generic JEE/NEET questions</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold text-white">100% Real NEST Past Papers & Cutoff Drills</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Feature Cards List */}
          <div className="lg:col-span-7 space-y-4">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              const isSelected = activeFeature === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  onClick={() => setActiveFeature(idx)}
                  className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'glass-card bg-[#1A1A2E]/90 border-indigo-500/50 shadow-xl shadow-indigo-500/10 translate-x-1'
                      : 'bg-[#12121A]/60 hover:bg-[#1A1A2E]/50 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} p-0.5 flex-shrink-0 shadow-md`}
                    >
                      <div className="w-full h-full bg-[#0A0A0F] rounded-[14px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
                        <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                          {feature.title}
                        </h3>
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/5 text-indigo-300 border border-white/10">
                          {feature.badge}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                        {feature.desc}
                      </p>

                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="pt-3 border-t border-white/10 flex items-center justify-between text-xs"
                        >
                          <span className="text-cyan-400 font-semibold flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5" /> Included in all 2026 Achiever test suites
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenTrial();
                            }}
                            className="text-white hover:text-indigo-300 font-semibold underline cursor-pointer"
                          >
                            Explore Free Demo →
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
