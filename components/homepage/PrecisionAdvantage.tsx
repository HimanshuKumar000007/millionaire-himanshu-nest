"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  XCircle,
  CheckCircle2,
  FileText,
  Monitor,
  Bot,
  Zap,
  Layers,
  Archive,
} from "lucide-react";
import { motion } from "motion/react";

interface PrecisionAdvantageProps {
  onOpenAssessment: () => void;
  onExploreDemo?: () => void;
}

export function PrecisionAdvantage({ onOpenAssessment, onExploreDemo }: PrecisionAdvantageProps) {
  const featureList = [
    {
      id: 1,
      title: "High-Yield Smart Notes & Mindmaps",
      badge: "400+ Smart Sheets",
      badgeStyle: "bg-blue-500/10 text-blue-300 border-blue-500/25",
      desc: "Crystal-clear, color-coded Smart Notes for PCMB. Includes Organic chemistry reaction roadmaps, formula cheat sheets, NCERT extract summaries, and dedicated Biology notes for PCM students.",
      icon: FileText,
      iconColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      hasFooter: true,
      footerText: "Included in all 2026 Achiever test suites",
      footerLinkText: "Explore Free Demo →",
    },
    {
      id: 2,
      title: "Real TCS-iON CBT Mode Full Mocks",
      badge: "100% Real Software",
      badgeStyle: "bg-indigo-500/10 text-indigo-300 border-indigo-500/25",
      desc: "The exact visual layout, countdown timer mechanics, question palette (Answered / Review / Unvisited), and sectional cutoff scoring used in official IAT and NEST examination centers.",
      icon: Monitor,
      iconColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      hasFooter: false,
    },
    {
      id: 3,
      title: "24/7 AI Science Mentor",
      badge: "Always Available",
      badgeStyle: "bg-cyan-500/10 text-cyan-300 border-cyan-500/25",
      desc: "Stuck on a tricky rotational mechanics derivation or organic stereochemistry mechanism at 2 AM? Get instant, first-principles explanations, formula recall, and step-by-step reasoning in under 2 seconds.",
      icon: Bot,
      iconColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      hasFooter: false,
    },
    {
      id: 4,
      title: "Quick Mocks (15/30 Min Sprints)",
      badge: "Daily Sprints",
      badgeStyle: "bg-amber-500/10 text-amber-300 border-amber-500/25",
      desc: "Bite-sized rapid test sprints designed for daily practice between study sessions. Perfect for eliminating negative marking, improving question selection, and building sharp exam reflexes.",
      icon: Zap,
      iconColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      hasFooter: false,
    },
    {
      id: 5,
      title: "250+ Chapter-wise & Topic Mocks",
      badge: "PCMB All Chapters",
      badgeStyle: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25",
      desc: "Test your understanding right after finishing a topic with targeted chapter-wise tests. Progress from foundational concept checks to Olympiad-grade multi-correct problems.",
      icon: Layers,
      iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      hasFooter: false,
    },
    {
      id: 6,
      title: "15+ Years Solved PYQ Archive",
      badge: "15-Year Solved",
      badgeStyle: "bg-rose-500/10 text-rose-300 border-rose-500/25",
      desc: "Complete collection of past 15-year IAT, NEST, ISI, CMI, and KVPY papers with thoroughly verified step-by-step logic, difficulty classifications, and high-frequency recurring patterns.",
      icon: Archive,
      iconColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      hasFooter: false,
    },
  ];

  return (
    <section id="why-sciprep" className="py-20 sm:py-28 bg-[#07080F] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left Column (Sticky Advantage Info & Head-to-Head Comparison) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F1326] border border-indigo-500/25 text-xs font-semibold text-slate-300 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-indigo-400" />
              <span>The SciPrep Precision Advantage</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.12]">
              Stop wasting hours on passive video lectures.{" "}
              <span className="bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#38BDF8] bg-clip-text text-transparent">
                Practice is what cracks IISER &amp; NEST.
              </span>
            </h2>

            {/* Paragraph */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Science entrances demand <strong className="text-white font-semibold">deep analytical intuition</strong>, speed under pressure, and active recall. Our self-paced toolkit pairs high-yield Smart Notes with TCS-iON CBT Mocks and a 24/7 AI Mentor.
            </p>

            {/* CTA Button */}
            <div>
              <Button
                onClick={onOpenAssessment}
                size="xl"
                className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-[#4338CA] hover:to-[#6D28D9] text-white shadow-lg shadow-indigo-600/30 text-sm sm:text-base font-bold py-6 px-7 rounded-xl transition-all group cursor-pointer border border-indigo-400/30"
              >
                <Sparkles className="h-4 w-4 mr-2 text-cyan-300" />
                <span>Try Free CBT Mock &amp; Smart Notes</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Head-to-Head Comparison Card */}
            <div className="mt-8 rounded-2xl bg-[#0D1022] border border-slate-800 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-400">
                  ACTIVE PRACTICE VS PASSIVE WATCHING
                </span>
                <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  HEAD-TO-HEAD
                </span>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-2 gap-3 text-xs font-bold text-slate-300 pb-1">
                <span className="text-slate-400">Traditional 3-Hr Lectures</span>
                <span className="text-indigo-300 font-extrabold">SciPrep Academy</span>
              </div>

              {/* Rows */}
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3 py-2 border-t border-slate-800/60">
                  <div className="flex items-start gap-1.5 text-slate-400">
                    <XCircle className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>Passive watching, low retention</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-200 font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Active CBT Testing &amp; Smart Notes</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-2 border-t border-slate-800/60">
                  <div className="flex items-start gap-1.5 text-slate-400">
                    <XCircle className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>Waiting days for doubt clearance</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-200 font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Instant 24/7 AI Science Mentor</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-2 border-t border-slate-800/60">
                  <div className="flex items-start gap-1.5 text-slate-400">
                    <XCircle className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>Generic JEE/NEET questions</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-200 font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>100% Real IAT, NEST, ISI &amp; CMI PYQs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (6 Stacked Feature Cards) */}
          <div id="platform-features" className="lg:col-span-7 space-y-4">
            {featureList.map((f, idx) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="rounded-2xl bg-[#0D1022] border border-slate-800 hover:border-indigo-500/40 p-5 sm:p-6 transition-all hover:bg-[#11152C] shadow-lg group"
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-xl flex items-center justify-center border shrink-0 ${f.iconColor}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">
                        {f.title}
                      </h3>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold border shrink-0 ${f.badgeStyle}`}
                    >
                      {f.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-13 sm:pl-[52px]">
                    {f.desc}
                  </p>

                  {f.hasFooter && (
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs pl-13 sm:pl-[52px]">
                      <span className="flex items-center gap-1 text-cyan-300 font-semibold">
                        <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                        {f.footerText}
                      </span>
                      <button
                        onClick={onExploreDemo || onOpenAssessment}
                        className="text-indigo-300 hover:text-white font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>{f.footerLinkText}</span>
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
