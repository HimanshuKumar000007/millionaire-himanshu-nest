"use client";

import * as React from "react";
import { motion, type Variants } from "motion/react";
import { Target, Sliders, LineChart, Repeat, ArrowRight, Zap, CheckCircle2, TrendingUp, Compass } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function WhySmartPrep() {
  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-slate-200/80 relative overflow-hidden">
      {/* Blueprint grid background */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "linear-gradient(rgba(15,23,42,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,.4) 1px,transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Compass className="h-3.5 w-3.5 text-indigo-600" /> Why SciPrep
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-slate-950 tracking-tight leading-tight max-w-3xl mx-auto">
            Built for serious scientific aspirants,
            <br />
            <span className="text-slate-500 font-medium">not generic coaching clutter.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Every feature is calibrated specifically for the 180-mark, best-3 SMAS evaluation of NISER Bhubaneswar &amp; UM-DAE CEBS Mumbai.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Bento Card 1: Focused (7 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-7">
            <Card className="bg-white border-slate-200 p-7 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300 h-full flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    <Target className="h-5 w-5" />
                  </div>
                  <Badge variant="default" className="text-[11px] font-bold bg-slate-100 text-slate-700 border-slate-200">
                    Zero Fluff Philosophy
                  </Badge>
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Focused Only on High-Yield NEST Topics</h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-lg">
                  Standard coaching dumps hundreds of hours of JEE/NEET content. SciPrep is custom-architected around actual NEST syllabus weightages, conceptual depth, and official NISER question styles.
                </p>
              </div>

              {/* Mini visual telemetry widget */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>Curriculum Relevance Ratio</span>
                  <span className="font-mono text-indigo-600 font-bold">100% NEST-Specific</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex">
                  <div className="h-full bg-indigo-600 rounded-l-full w-[88%]" />
                  <div className="h-full bg-emerald-500 rounded-r-full w-[12%]" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-indigo-600" /> Pure Sciences Concept Core</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Authentic PYQ Drill</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Bento Card 2: Personalized (5 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-5">
            <Card className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white border-0 p-7 rounded-2xl shadow-md h-full flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-xl bg-white/10 text-indigo-300 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                    <Sliders className="h-5 w-5" />
                  </div>
                  <Badge variant="default" className="text-[10px] font-mono bg-indigo-500/30 text-indigo-200 border-indigo-400/40">
                    SMAS ADAPTIVE
                  </Badge>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">Adaptive Study Path</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  Your preparation route automatically updates based on your real sectional scores, pinpointing your exact high-leverage weak spots.
                </p>
              </div>

              <div className="mt-6 p-3.5 rounded-xl bg-white/8 border border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-400" />
                  <span className="text-slate-200 font-medium">Predicted Index Gain</span>
                </div>
                <span className="font-mono font-black text-emerald-400 text-sm bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                  +14 pts / 30 days
                </span>
              </div>
            </Card>
          </motion.div>

          {/* Bento Card 3: Measurable (5 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-5">
            <Card className="bg-white border-slate-200 p-7 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300 h-full flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    <LineChart className="h-5 w-5" />
                  </div>
                  <Badge variant="default" className="text-[10px] font-mono bg-emerald-50 text-emerald-800 border-emerald-200">
                    DIAGNOSTIC TELEMETRY
                  </Badge>
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Deep Diagnostic Metrics</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Track speed-efficiency, question accuracy, time distribution, and topic mastery across all 4 subjects to prevent surprise drop-offs on exam day.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Avg Pace</span>
                  <span className="text-base font-black text-slate-900">2.4 min / Q</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Accuracy</span>
                  <span className="text-base font-black text-emerald-600">84.2%</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Bento Card 4: Practical (7 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-7">
            <Card className="bg-white border-slate-200 p-7 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300 h-full flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                    <Repeat className="h-5 w-5" />
                  </div>
                  <Badge variant="default" className="text-[11px] font-bold bg-amber-50 text-amber-800 border-amber-200">
                    The 4-Step Loop
                  </Badge>
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Practical 4-Step Mastery Cycle</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A closed-loop learning protocol engineered for long-term retention in scientific competitive exams:
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100">
                {[
                  { step: "01", title: "Learn", sub: "15-min Module" },
                  { step: "02", title: "Practice", sub: "Real PYQs" },
                  { step: "03", title: "Diagnose", sub: "Error Map" },
                  { step: "04", title: "Retest", sub: "Timed Mock" },
                ].map((s) => (
                  <div key={s.step} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-left">
                    <span className="text-[10px] font-mono font-bold text-indigo-600">{s.step}</span>
                    <span className="text-xs font-black text-slate-800 block mt-0.5">{s.title}</span>
                    <span className="text-[10px] text-slate-400 block">{s.sub}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
