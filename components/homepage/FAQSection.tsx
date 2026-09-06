"use client";

import * as React from "react";
import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS_DATA: FAQItem[] = [
  {
    question: "How should I start my NEST 2026/2027 exam preparation?",
    answer:
      "Start by taking the Free 10-Minute Diagnostic Assessment on SciPrep to identify your subject baselines and weak topics across Physics, Chemistry, Biology, and Mathematics. Then follow a 3-step structured cycle: (1) Master high-weightage concept lessons, (2) Solve 2018–2025 official NEST PYQs chapter-wise, and (3) Take full-length 180-mark CBT mock simulations to build stamina and time management.",
  },
  {
    question: "How does the 'Best 3 of 4' subjects scoring rule work in NEST?",
    answer:
      "The NEST question paper contains 4 sections (Physics, Chemistry, Mathematics, Biology) worth 60 marks each (total 240 marks). However, your All India Rank (AIR) and final merit score are evaluated out of 180 marks based strictly on your highest scoring THREE subjects. This allows PCM students to maximize PCM, and PCB students to maximize PCB.",
  },
  {
    question: "What is SMAS in NEST and why is it mandatory to clear?",
    answer:
      "SMAS stands for Section-wise Minimum Admissible Score. It is the mandatory sectional cutoff required in EACH of the four subject sections (typically 4–8 marks out of 60). Even if you score top marks in your 3 primary subjects, you MUST score at least the SMAS threshold in your 4th non-core subject to qualify for the merit list. SciPrep includes dedicated SMAS rescue modules to help you secure 12–15 marks in just 25 minutes.",
  },
  {
    question: "Can PCM or PCB students crack NEST without offline coaching?",
    answer:
      "Yes! Because NEST evaluates first-principles scientific reasoning rather than speed-memorization, students with strong conceptual fundamentals can easily clear NEST through self-study. SciPrep provides complete chapter-wise smart lessons, authentic 2018–2025 verified PYQ solutions, and full-length CBT mock tests designed specifically for NISER and CEBS standards.",
  },
  {
    question: "What score and All India Rank (AIR) are required for NISER and CEBS?",
    answer:
      "For General category admission to NISER Bhubaneswar (evaluated out of 180 marks), a score of 115–135+ marks (AIR 1–250) is typically required. For UM-DAE CEBS Mumbai, a score of 95–115 marks (AIR 250–600) is safe. Reserved categories (OBC-NCL, EWS, SC, ST) have category-wise qualifying thresholds and relaxed SMAS rules.",
  },
  {
    question: "Do NISER and CEBS students receive a monthly stipend or scholarship?",
    answer:
      "Yes! All admitted students to NISER Bhubaneswar and UM-DAE CEBS Mumbai receive the prestigious DISHA / INSPIRE scholarship from the Department of Atomic Energy (DAE), amounting to ₹60,000 per year (₹5,000/month) plus an annual ₹20,000 summer project contingency grant (total ₹80,000/year). Furthermore, students with a CGPA ≥ 7.5 are eligible for direct BARC Scientific Officer personal interviews.",
  },
  {
    question: "Is SciPrep free to use for NEST aspirants?",
    answer:
      "Yes! Any student can sign up for free to take the AI-powered Diagnostic Readiness Assessment, access core syllabus topic guides, and practice select smart lessons and official NEST PYQs. Comprehensive 180-mark CBT mock test series and advanced predictive telemetry are available under SciPrep Pro.",
  },
];

interface FAQSectionProps {
  onOpenAssessment?: () => void;
}

export function FAQSection({ onOpenAssessment }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faqs" className="py-20 bg-white border-t border-slate-200/80 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="h-3.5 w-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Everything You Need to Know About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              NEST Preparation
            </span>
          </h2>
          <p className="text-slate-500 text-base max-w-2xl mx-auto">
            Clear answers to common questions about the NEST exam pattern, SMAS sectional cutoffs, Best-3 scoring rules, and NISER / CEBS admissions.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {FAQS_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? "bg-slate-50/80 border-indigo-200 shadow-sm"
                    : "bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "bg-indigo-600 text-white rotate-180" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-200/60 font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Helper Box */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-indigo-50 via-slate-50 to-violet-50 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base font-bold text-slate-900">Still have questions about NEST?</h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Take our diagnostic test or check our in-depth strategy and cutoff guides.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {onOpenAssessment && (
              <Button
                onClick={onOpenAssessment}
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm font-bold text-xs px-4"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Start Free Test
              </Button>
            )}
            <Link href="/blog" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              Read Prep Guides <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
