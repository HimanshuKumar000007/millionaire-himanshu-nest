"use client";

import { motion, type Variants } from "motion/react";
import { Layers, HelpCircle, Shuffle } from "lucide-react";

const problems = [
  {
    num: "01",
    title: "Too Much Content",
    description: "Books, videos, questions, notes — but no clear priority on what actually matters for NEST. Students often study hard in the wrong direction.",
    icon: Layers,
  },
  {
    num: "02",
    title: "No Clear Readiness",
    description: "A single test score alone doesn't tell you where your concept gaps are or what to improve next. You need SMAS-aware sectional diagnostics.",
    icon: HelpCircle,
  },
  {
    num: "03",
    title: "Random Practice",
    description: "Solving hundreds of unorganized questions rarely improves speed or accuracy. Structured PYQ practice tied to syllabus chapters does.",
    icon: Shuffle,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.16 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function ProblemSection() {
  return (
    <section className="py-20 sm:py-28 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[350px] bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider">
            The Preparation Challenge
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Most students don&apos;t need more content.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
              They need a better system.
            </span>
          </h2>
          <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
            The problem isn&apos;t a lack of resources. It&apos;s the absence of a clear, performance-driven preparation structure.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {problems.map((prob, i) => {
            const Icon = prob.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 sm:p-7 hover:-translate-y-1 transition-all duration-300 cursor-default group"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-black font-mono uppercase tracking-wider text-slate-500 bg-slate-700/60 border border-slate-600/60 px-2.5 py-1 rounded-md">
                    {prob.num}
                  </span>
                  <div className="h-9 w-9 rounded-xl bg-slate-700/60 border border-slate-600/40 flex items-center justify-center text-slate-400 group-hover:text-slate-200 transition-colors">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                </div>
                <h3 className="text-xl font-black text-white tracking-tight mb-2">{prob.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-normal">{prob.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
