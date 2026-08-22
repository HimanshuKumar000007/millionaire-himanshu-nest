"use client";

import { motion, type Variants } from "motion/react";
import { Layers, HelpCircle, Shuffle } from "lucide-react";

const problems = [
  {
    num: "01",
    title: "Too Much Content",
    description: "Books, videos, questions, notes — but no clear priority on what actually matters for NEST. Students often study hard in the wrong direction.",
    icon: Layers,
    accent: "from-rose-500/20 to-rose-600/10 border-rose-500/20",
    numColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  },
  {
    num: "02",
    title: "No Clear Readiness",
    description: "A single test score alone doesn't tell you where your concept gaps are or what to improve next. You need SMAS-aware sectional diagnostics.",
    icon: HelpCircle,
    accent: "from-amber-500/20 to-amber-600/10 border-amber-500/20",
    numColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  {
    num: "03",
    title: "Random Practice",
    description: "Solving hundreds of unorganized questions doesn't always improve your speed or accuracy. Structured PYQ practice tied to syllabus chapters does.",
    icon: Shuffle,
    accent: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/20",
    numColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
};

export function ProblemSection() {
  return (
    <section className="py-16 sm:py-24 bg-slate-900 relative overflow-hidden">
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
        backgroundSize: "40px 40px"
      }} />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            ⚡ The Preparation Challenge
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Preparing for NEST shouldn&apos;t mean studying{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
              without direction.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Most students don&apos;t struggle because they lack resources. They struggle because they don&apos;t know what to study next, where they&apos;re weak, or whether their preparation is actually improving.
          </p>
        </motion.div>

        {/* Problem cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
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
                className={`relative rounded-2xl border bg-gradient-to-br ${prob.accent} p-6 sm:p-7 backdrop-blur-sm hover:-translate-y-1 transition-all duration-300 cursor-default group space-y-5 overflow-hidden`}
              >
                {/* Glowing corner */}
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/5 blur-xl pointer-events-none" />

                <div className="flex items-center justify-between">
                  <span className={`text-xs font-black font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border ${prob.numColor}`}>
                    Problem {prob.num}
                  </span>
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:bg-white/10 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">{prob.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-normal">{prob.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
