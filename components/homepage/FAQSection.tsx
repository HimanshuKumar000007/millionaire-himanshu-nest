"use client";

import * as React from "react";
import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does SciPrep Academy compare to traditional offline coachings for IISER & NEST?",
    answer:
      "Traditional coachings focus heavily on JEE Advanced/NEET rote methods and generic lectures. SciPrep is custom-architected specifically for the research-tier pure science entrances (IAT, NEST, ISI & CMI). We provide self-paced high-yield Smart Notes, 100% exact TCS-iON CBT simulations, and an instant 24/7 AI Science Mentor for round-the-clock derivations and doubts.",
  },
  {
    question: "Is the CBT mock test software exactly like the actual TCS-iON examination interface?",
    answer:
      "Yes! Our test player replicates the official TCS-iON interface used in real IAT (IISER Aptitude Test) and NEST exam centers, including exact question palette statuses (Answered, Not Answered, Marked for Review), countdown timer behavior, section-switching rules, and SMAS / negative-marking calculations.",
  },
  {
    question: "How does the 24/7 AI Science Mentor work?",
    answer:
      "The 24/7 AI Mentor is specialized in pure PCMB science concepts. You can type any tricky derivation, reaction mechanism, or calculus proof and receive first-principles step-by-step logic in under 1.5 seconds without waiting days for offline doubt classes.",
  },
  {
    question: "Can PCM students crack Biology in IAT and NEST using Smart Notes?",
    answer:
      "Absolutely. Over 65% of our top rankers are PCM students who used our dedicated 'High-Yield Biology for Math Students' smart sheets and NCERT extracts to add 40–50+ marks in under 3 months.",
  },
  {
    question: "Are past 15+ years PYQs with step-by-step verified solutions included?",
    answer:
      "Yes! All past papers for IAT (2017–2025), NEST (2010–2025), ISI UGA/UGB, CMI, and KVPY are included with verified LaTeX solutions, step-by-step logic, and topic classifications.",
  },
  {
    question: "What is the validity period of the study packages?",
    answer:
      "All full packages are valid until the completion of the 2026/2027 entrance examinations and counseling cycles. Smart Notes & PYQ Vault comes with lifetime PDF access.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#07080F] relative overflow-hidden border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F1326] border border-indigo-500/25 text-xs font-semibold text-slate-300 shadow-sm">
            <HelpCircle className="h-3.5 w-3.5 text-indigo-400" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Everything you need to know about preparing for IISER, NISER, ISI &amp; CMI with SciPrep Academy.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? "bg-[#0D1022] border-indigo-500/40 shadow-lg"
                    : "bg-[#0A0C18] border-slate-800/80 hover:border-slate-700"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "bg-indigo-600 text-white rotate-180"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
