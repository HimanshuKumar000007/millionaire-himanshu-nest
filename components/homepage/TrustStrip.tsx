"use client";

import * as React from "react";
import { Atom, BookCheck, Shield, Award, Cpu, FileText, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

const trustPillars = [
  { label: "NEST-Focused Preparation", icon: Award },
  { label: "Physics", icon: Atom },
  { label: "Chemistry", icon: Cpu },
  { label: "Biology", icon: Shield },
  { label: "Mathematics", icon: BookCheck },
  { label: "PYQ Practice", icon: FileText },
  { label: "Mock Tests", icon: CheckCircle },
];

export function TrustStrip() {
  const items = [...trustPillars, ...trustPillars];

  return (
    <section className="w-full py-8 overflow-hidden bg-white border-y border-gray-100 relative">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <div className="flex">
        <motion.div
          className="flex whitespace-nowrap gap-8 pr-8"
          animate={{ x: [0, "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          {items.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2 bg-indigo-50/50 px-4 py-2 rounded-full border border-indigo-100 text-indigo-900 cursor-pointer hover:bg-indigo-100 transition-colors"
              >
                <Icon className="w-4 h-4 text-indigo-600" />
                <span className="font-semibold text-sm">{pillar.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
