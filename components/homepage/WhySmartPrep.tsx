"use client";

import * as React from "react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Target, Sliders, LineChart, Repeat } from "lucide-react";

const pillars = [
  {
    title: "Focused",
    desc: "Only the high-yield resources that directly help you prepare for NEST, with no distracting content filler.",
    icon: Target,
  },
  {
    title: "Personalized",
    desc: "Your preparation path adapts dynamically to your real diagnostic test performance and subject accuracy.",
    icon: Sliders,
  },
  {
    title: "Measurable",
    desc: "See exact changes in your readiness index, speed efficiency, and accuracy across every topic.",
    icon: LineChart,
  },
  {
    title: "Practical",
    desc: "A proven four-step loop: Learn concept → Practice PYQ → Analyze errors → Improve readiness.",
    icon: Repeat,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function WhySmartPrep() {
  return (
    <section className="py-16 sm:py-24 bg-[#F7F8FC] border-b border-gray-200/80 relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-50/40 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            badge="Why SciPrep"
            badgeVariant="default"
            title="Built for focused preparation, not content overload."
            subtitle="Everything you need to prepare systematically for NISER & CEBS entrance examinations."
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {pillars.map((pil) => {
            const Icon = pil.icon;
            return (
              <motion.div key={pil.title} variants={itemVariants}>
                <Card className="bg-white border-gray-200 p-6 space-y-4 hover:border-indigo-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group h-full">
                  <div className="h-11 w-11 rounded-xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center group-hover:bg-[#4F46E5] group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="h-5 w-5" />
                  </div>

                  <CardTitle className="text-xl font-extrabold text-[#111827]">
                    {pil.title}
                  </CardTitle>

                  <CardContent className="p-0 text-sm text-[#6B7280] leading-relaxed font-normal">
                    {pil.desc}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
