"use client";

import { motion } from "motion/react";
import { Layers, HelpCircle, Shuffle } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const problems = [
  {
    num: "01",
    title: "Too Much Content",
    description: "You have books, videos, questions and notes — but no clear priority on what actually matters for NEST.",
    icon: Layers,
  },
  {
    num: "02",
    title: "No Clear Readiness",
    description: "A single test score alone doesn't tell you where your concept gaps are or what you should improve next.",
    icon: HelpCircle,
  },
  {
    num: "03",
    title: "Random Practice",
    description: "Solving hundreds of unorganized questions doesn't always mean improving your speed and conceptual accuracy.",
    icon: Shuffle,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export function ProblemSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#F7F8FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            badge="The NEST Preparation Challenge"
            badgeVariant="warning"
            title="Preparing for NEST shouldn't mean studying without direction."
            subtitle="Most students don't struggle because they lack resources. They struggle because they don't know what to study next, where they're weak, or whether their preparation is actually improving."
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {problems.map((prob, i) => {
            const Icon = prob.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-[0_4px_20px_rgba(49,46,129,0.03)] hover:shadow-[0_8px_30px_rgba(49,46,129,0.08)] hover:-translate-y-1 hover:border-gray-300 transition-all duration-300 cursor-pointer group space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                    Problem {prob.num}
                  </span>
                  <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-gray-700 group-hover:bg-indigo-50 group-hover:text-[#4F46E5] transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="text-xl font-extrabold text-[#111827]">{prob.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{prob.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
