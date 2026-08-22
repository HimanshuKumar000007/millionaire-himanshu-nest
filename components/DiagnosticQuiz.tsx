'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Trophy,
  ArrowRight,
  RotateCcw,
  Zap,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizQuestion {
  subject: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: QuizQuestion[] = [
  {
    subject: 'Physics (Electromagnetism & Relativity)',
    question:
      'A charged particle moves with constant velocity v parallel to a current-carrying wire. In the rest frame of the particle, what force acts on it?',
    options: [
      'Pure magnetic Lorentz force (q v × B)',
      'Pure electrostatic force due to relativistic length contraction of charge densities',
      'Both equal magnetic and electric forces',
      'Zero net force because the wire is neutral in all reference frames',
    ],
    correct: 1,
    explanation:
      'In the particle rest frame (v=0), magnetic force is zero. Due to special relativity length contraction, the linear charge densities of moving and stationary charges in the wire become unequal, creating a purely electrostatic force!',
  },
  {
    subject: 'Chemistry (Physical & Organic)',
    question:
      'Which of the following compounds exhibits the highest rate of aromatic electrophilic substitution (nitration)?',
    options: [
      'Nitrobenzene',
      'Chlorobenzene',
      'Anisole (Methoxybenzene)',
      'Benzaldehyde',
    ],
    correct: 2,
    explanation:
      'The methoxy group (-OCH₃) in anisole is a strong activating group via +M resonance donation into the benzene ring, vastly accelerating electrophilic substitution at ortho/para positions.',
  },
  {
    subject: 'Mathematics / Biology (Analytical Aptitude)',
    question:
      'In a double-stranded DNA molecule with 2,000 base pairs, if Guanine constitutes 30% of the total nitrogenous bases, what is the total number of Thymine nucleotides present?',
    options: ['400', '600', '800', '1,200'],
    correct: 2,
    explanation:
      'Total nucleotides = 2,000 × 2 = 4,000. By Chargaff’s rule: %G = %C = 30%, so G+C = 60%. Therefore, A+T = 40%, which means %T = 20%. Total Thymine = 20% of 4,000 = 800.',
  },
];

interface DiagnosticQuizProps {
  onOpenEnroll: () => void;
  onOpenTrial: () => void;
}

export function DiagnosticQuiz({ onOpenEnroll, onOpenTrial }: DiagnosticQuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([null, null, null]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleSelectOption = (optIdx: number) => {
    if (selectedAnswers[currentIdx] !== null) return; // already answered

    const newAnswers = [...selectedAnswers];
    newAnswers[currentIdx] = optIdx;
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);

    // If correct on final question, trigger confetti
    if (optIdx === questions[currentIdx].correct && currentIdx === questions.length - 1) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setQuizFinished(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswers([null, null, null]);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  const score = selectedAnswers.reduce<number>((acc, ans, idx) => {
    return ans === questions[idx].correct ? acc + 1 : acc;
  }, 0);

  return (
    <section id="quiz" className="py-20 relative overflow-hidden bg-[#0E0E17]/80 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-3">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            Instant Science Diagnostic Mini-Check
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight mb-2">
            Test Your <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">NEST (NISER / CEBS) Intuition</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            3 curated high-concept benchmark problems to evaluate your scientific analytical readiness for NEST.
          </p>
        </div>

        {/* Quiz Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl bg-[#12121A]">
          {!quizFinished ? (
            <div>
              {/* Progress & Subject */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5 text-xs">
                <span className="font-bold text-indigo-300 uppercase tracking-wider">
                  {questions[currentIdx].subject}
                </span>
                <span className="text-slate-400 font-semibold">
                  Question {currentIdx + 1} of {questions.length}
                </span>
              </div>

              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-bold text-white mb-6 leading-relaxed">
                {questions[currentIdx].question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {questions[currentIdx].options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentIdx] === idx;
                  const isCorrect = idx === questions[currentIdx].correct;
                  const answered = selectedAnswers[currentIdx] !== null;

                  let btnStyle = 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/5';
                  if (answered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-500/20 text-rose-300 border-rose-500/50';
                    } else {
                      btnStyle = 'bg-white/5 text-slate-500 border-white/5 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={answered}
                      className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start justify-between gap-3 cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-black/40 flex items-center justify-center font-bold text-xs flex-shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {answered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      )}
                      {answered && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-slate-200 mb-6 space-y-1.5"
                  >
                    <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Concept Explanation:
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {questions[currentIdx].explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next Button */}
              {selectedAnswers[currentIdx] !== null && (
                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/30"
                  >
                    <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'View Projected Rank'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Result Evaluation Screen */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-500 mx-auto flex items-center justify-center text-white mb-4 shadow-xl">
                <Trophy className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-bold text-white mb-1 font-heading">
                Diagnostic Score: {score} / 3 Correct
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
                {score === 3
                  ? 'Outstanding scientific intuition! You are on track for a Top 100 AIR in NEST (NISER & CEBS).'
                  : score === 2
                  ? 'Strong foundational grip! Polishing multi-concept chemistry & physics questions will push you into top NISER rank ranges.'
                  : 'Good effort! Focused concept-building and SMAS cutoff practice will help you build momentum for NEST.'}
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 max-w-sm mx-auto mb-6 text-xs text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated NEST Percentile:</span>
                  <span className="font-bold text-cyan-300">
                    {score === 3 ? '99.6%' : score === 2 ? '94.8%' : '83.2%'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Institute Allotment:</span>
                  <span className="font-bold text-emerald-400">
                    {score === 3 ? 'NISER Bhubaneswar (Top Rank)' : score === 2 ? 'UM-DAE CEBS Mumbai' : 'NISER / CEBS Merit List'}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="px-4 py-2 rounded-xl glass-panel text-xs text-slate-300 hover:text-white flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retry Quiz
                </button>
                <button
                  onClick={onOpenTrial}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-600/30"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  Get Full 60-Question Free Mock
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
