'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Sparkles, MessageCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'all' | 'eligibility' | 'pcmb' | 'features';
}

const faqs: FAQItem[] = [
  {
    category: 'features',
    question: 'Why does SciPrep provide Smart Notes & CBT Mocks instead of live lectures?',
    answer:
      'The NEST entrance exam is not cracked by passively watching 3-hour video streams. It demands rigorous active recall, high-speed multi-concept problem solving, and intensive exam simulation. SciPrep provides concise, high-yield Smart Notes for rapid concept revision, full-length TCS-iON CBT Mocks, Quick Mocks (15/30 mins), Chapter-wise Mocks, 15-Year NEST PYQs, and an instant 24/7 AI Science Mentor for round-the-clock doubts.',
  },
  {
    category: 'pcmb',
    question: 'I had PCM in 11th & 12th. Can I crack NEST (NISER & CEBS) without Biology background?',
    answer:
      'Yes, absolutely! In NEST, your overall ranking is calculated from your top 3 subject scores (Physics, Chemistry, and Math/Bio), while requiring basic SMAS sectional cutoff clearance across all sections. SciPrep includes dedicated "High-Yield Biology Smart Notes & Chapter Mocks for Math Students", breaking down high-frequency NCERT genetics, physiology, and cell biology concepts to easily clear SMAS cutoff and secure a top NISER rank.',
  },
  {
    category: 'features',
    question: 'How does the 24/7 AI Science Mentor work?',
    answer:
      'Our AI Mentor is specialized in Physics, Chemistry, Mathematics, and Biology for NEST and science competitions. You can ask any question, formula derivation, mechanism step, or NEST PYQ problem at any time of day or night. It returns verified first-principles step-by-step logic and formula references in under 2 seconds.',
  },
  {
    category: 'features',
    question: 'What is the difference between CBT Full Mocks, Quick Mocks, and Chapter Mocks?',
    answer:
      'CBT Full Mocks are exact full-length simulations on the TCS-iON replica software with authentic NEST negative marking. Chapter-wise Mocks allow you to test your mastery immediately after reviewing a topic Smart Note. Quick Mocks are 15-to-30-minute rapid test sprints designed to build speed and eliminate negative marking.',
  },
  {
    category: 'eligibility',
    question: 'What is the exact eligibility criteria for NEST 2026/2027?',
    answer:
      'For NEST (NISER Bhubaneswar & UM-DAE CEBS Mumbai): Candidates must have passed Class 12 with at least three subjects among Biology, Chemistry, Mathematics, and Physics with a minimum 60% aggregate (55% for SC/ST/PwD) and born on or after August 1, 2005 (with category relaxations).',
  },
  {
    category: 'pcmb',
    question: 'How does NEST scoring and SMAS/MAS cutoffs work?',
    answer:
      'In NEST, the question paper comprises 4 sections: Biology, Chemistry, Mathematics, and Physics. To qualify for the merit list, you must clear the Section-wise Minimum Admissible Score (SMAS) in all 4 subjects, while your overall rank score is computed from your BEST 3 subjects (total 150/180 marks). Our CBT Mocks simulate this exact scoring algorithm.',
  },
  {
    category: 'features',
    question: 'What is the 7-day refund policy?',
    answer:
      'We offer an unconditional 7-day money-back guarantee. If you explore our Smart Notes, take the CBT Mocks, and feel the self-paced preparation ecosystem is not the right fit for you, simply message support within 7 days of purchase for a 100% full refund with zero questions asked.',
  },
];

interface FAQProps {
  onOpenTrial: () => void;
}

export function FAQ({ onOpenTrial }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [category, setCategory] = useState<'all' | 'eligibility' | 'pcmb' | 'features'>('all');

  const filteredFaqs = faqs.filter((f) => {
    if (category === 'all') return true;
    return f.category === category;
  });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-[#0A0A0F]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            Clear Answers for Aspirants & Parents
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4">
            Questions? <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Answered.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Everything you need to know about our Smart Notes, CBT Mocks, Quick Drills, PYQs, and 24/7 AI Mentor.
          </p>

          {/* Category Filter */}
          <div className="mt-6 inline-flex p-1 rounded-2xl bg-[#12121A] border border-white/10 flex-wrap justify-center">
            {[
              { id: 'all', label: 'All FAQs' },
              { id: 'features', label: 'Smart Notes & CBT Mocks' },
              { id: 'pcmb', label: 'PCMB & Biology Strategy' },
              { id: 'eligibility', label: 'Exam Pattern & Cutoffs' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setCategory(cat.id as any);
                  setOpenIndex(null);
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  category === cat.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-card border border-white/10 overflow-hidden bg-[#12121A]/80 transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-white/5 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-indigo-500/20 text-indigo-300' : 'text-slate-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 text-center p-6 rounded-3xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Have a specific question about your subject roadmap?</div>
              <div className="text-xs text-slate-400">Speak directly with a NISER / CEBS academic mentor.</div>
            </div>
          </div>

          <button
            onClick={onOpenTrial}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition-all cursor-pointer whitespace-nowrap"
          >
            Chat with Academic Counselor
          </button>
        </div>

      </div>
    </section>
  );
}
