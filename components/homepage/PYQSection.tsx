"use client";

import * as React from "react";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle2, Bookmark, HelpCircle, ArrowRight, RotateCcw, Award } from "lucide-react";

interface PYQSectionProps {
  onOpenAssessment: () => void;
}

export function PYQSection({ onOpenAssessment }: PYQSectionProps) {
  const [selectedSubject, setSelectedSubject] = useState<"Biology" | "Physics" | "Chemistry" | "Mathematics">("Biology");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [markedForReview, setMarkedForReview] = useState(false);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const pyqData = {
    Biology: {
      topic: "Cell Biology & Genetics",
      difficulty: "Medium",
      year: "NEST 2024",
      accuracy: "78%",
      question: "Which of the following cellular structures contains its own circular double-stranded DNA and 70S ribosomes, replicating independently inside eukaryotic host cells?",
      options: [
        "A. Golgi Apparatus & Endoplasmic Reticulum",
        "B. Mitochondria & Chloroplasts",
        "C. Lysosomes & Peroxisomes",
        "D. Nucleolus & Centrosome"
      ],
      correctIndex: 1,
      explanation: "Mitochondria and chloroplasts contain circular prokaryotic-like DNA and 70S ribosomes, supporting the endosymbiotic origin theory."
    },
    Physics: {
      topic: "Optics & Wave Motion",
      difficulty: "Hard",
      year: "NEST 2023",
      accuracy: "71%",
      question: "In a Young's double-slit experiment, if the slit separation is halved and the distance between slits and screen is doubled, what happens to the fringe width?",
      options: [
        "A. Remains unchanged",
        "B. Doubled",
        "C. Quadrupled",
        "D. Halved"
      ],
      correctIndex: 2,
      explanation: "Fringe width β = λD/d. Halving d (d/2) and doubling D (2D) gives β' = λ(2D)/(d/2) = 4 (λD/d) = 4β."
    },
    Chemistry: {
      topic: "Chemical Kinetics & Equilibrium",
      difficulty: "Medium",
      year: "NEST 2024",
      accuracy: "83%",
      question: "For a first-order chemical reaction A → Products, if the initial concentration is doubled, what happens to its half-life (t₁/₂)?",
      options: [
        "A. Doubled",
        "B. Halved",
        "C. Quadrupled",
        "D. Remains unchanged"
      ],
      correctIndex: 3,
      explanation: "For first-order reactions, half-life t₁/₂ = ln(2)/k, which is completely independent of initial reactant concentration."
    },
    Mathematics: {
      topic: "Definite Integrals",
      difficulty: "Hard",
      year: "NEST 2023",
      accuracy: "68%",
      question: "What is the value of the definite integral ∫₋₁¹ x³ · cos(x) dx?",
      options: [
        "A. 0",
        "B. 1",
        "C. 2 π",
        "D. π / 2"
      ],
      correctIndex: 0,
      explanation: "f(x) = x³ cos(x) is an odd function because f(-x) = (-x)³ cos(-x) = -x³ cos(x) = -f(x). The integral of an odd function from -a to +a is 0."
    }
  };

  const currentQ = pyqData[selectedSubject];

  const handleSelect = (idx: number) => {
    setSelectedOption(idx);
    setShowExplanation(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="pyqs" className="py-16 sm:py-24 bg-[#F7F8FC] border-b border-gray-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            badge="Authentic NEST Questions"
            badgeVariant="default"
            title="Practice the questions that matter."
            subtitle="Use previous-year questions to understand patterns, test your concepts, and build exam familiarity."
          />
        </motion.div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          
          {/* Main Question Interface (8 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-8 space-y-4">
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white border-gray-200 shadow-lg p-6 sm:p-8 rounded-2xl transition-all hover:border-indigo-200">
                
                {/* Question Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="font-mono">
                      {currentQ.year}
                    </Badge>
                    <span className="text-xs font-bold text-gray-500 uppercase">
                      {selectedSubject} — Question 14 / 20
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMarkedForReview(!markedForReview)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                        markedForReview
                          ? "bg-amber-50 text-amber-800 border-amber-300 shadow-sm"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <motion.div animate={markedForReview ? { scale: [1, 1.2, 1] } : {}}>
                        <Bookmark className={`h-3.5 w-3.5 ${markedForReview ? "fill-amber-500 text-amber-500" : ""}`} />
                      </motion.div>
                      {markedForReview ? "Marked for Review" : "Mark for Review"}
                    </button>
                  </div>
                </div>

                {/* Subject Selector Tabs */}
                <div className="flex items-center gap-1 my-4 bg-slate-100 p-1 rounded-xl relative">
                  {(Object.keys(pyqData) as Array<keyof typeof pyqData>).map((subj) => (
                    <button
                      key={subj}
                      onClick={() => {
                        setSelectedSubject(subj);
                        setSelectedOption(null);
                        setShowExplanation(false);
                      }}
                      className={`relative flex-1 py-1.5 text-xs font-extrabold rounded-lg transition-all cursor-pointer z-10 ${
                        selectedSubject === subj
                          ? "text-[#4F46E5]"
                          : "text-gray-600 hover:text-gray-900 hover:bg-slate-200/50"
                      }`}
                    >
                      {selectedSubject === subj && (
                        <motion.div
                          layoutId="activeSubject"
                          className="absolute inset-0 bg-white shadow-sm rounded-lg -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      {subj}
                    </button>
                  ))}
                </div>

                {/* Question Stem */}
                <div className="py-2 space-y-4">
                  <AnimatePresence mode="wait">
                    <motion.h3 
                      key={currentQ.question}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="text-base sm:text-lg font-bold text-[#111827] leading-relaxed"
                    >
                      {currentQ.question}
                    </motion.h3>
                  </AnimatePresence>

                  {/* Options List */}
                  <div className="space-y-2.5">
                    {currentQ.options.map((opt, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === currentQ.correctIndex;
                      
                      return (
                        <motion.button
                          key={idx}
                          whileHover={selectedOption === null ? { scale: 1.01, x: 4 } : {}}
                          whileTap={selectedOption === null ? { scale: 0.99 } : {}}
                          onClick={() => selectedOption === null && handleSelect(idx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${
                            selectedOption !== null
                              ? isCorrect
                                ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold shadow-sm"
                                : isSelected
                                ? "bg-rose-50 border-rose-300 text-rose-950 shadow-sm"
                                : "bg-white border-gray-200 text-gray-600 opacity-60"
                              : "bg-white border-gray-200 text-gray-800 hover:bg-indigo-50/30 hover:border-indigo-300 cursor-pointer shadow-sm hover:shadow-md"
                          }`}
                        >
                          <span>{opt}</span>
                          {selectedOption !== null && isCorrect && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Solution Explanation Box */}
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 20 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-950 space-y-1.5 shadow-inner">
                        <span className="font-extrabold uppercase tracking-wider text-[#4F46E5] flex items-center gap-1.5">
                          <HelpCircle className="h-3.5 w-3.5" /> Concept Breakdown & Explanation
                        </span>
                        <p className="leading-relaxed font-medium">
                          {currentQ.explanation}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Question Action Controls */}
                <div className="pt-5 mt-5 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedOption(null);
                      setShowExplanation(false);
                    }}
                    className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors cursor-pointer group"
                  >
                    <RotateCcw className="h-3.5 w-3.5 group-hover:-rotate-90 transition-transform duration-300" /> Reset Options
                  </button>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowExplanation(!showExplanation)}
                      className="transition-all hover:bg-slate-50 cursor-pointer"
                    >
                      <HelpCircle className="h-3.5 w-3.5 mr-1" />
                      {showExplanation ? "Hide Solution" : "Show Solution"}
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={onOpenAssessment} 
                      className="bg-[#4F46E5] hover:bg-[#3730A3] transition-all group cursor-pointer shadow-md hover:shadow-lg"
                    >
                      Next Question 
                      <motion.div animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </motion.div>
                    </Button>
                  </div>
                </div>

              </Card>
            </motion.div>
          </motion.div>

          {/* Side Panel (4 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-4">
            <motion.div 
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              transition={{ duration: 0.3 }}
              className="bg-white border-gray-200 p-6 rounded-2xl shadow-sm space-y-5 transition-all hover:border-indigo-100"
            >
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-500 border-b border-gray-100 pb-3">
                Question Metadata & Analytics
              </h4>

              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="text-gray-400 font-semibold block">Target Topic</span>
                  <span className="text-sm font-bold text-gray-900 transition-colors">{currentQ.topic}</span>
                </div>

                <div>
                  <span className="text-gray-400 font-semibold block">NEST Exam Paper</span>
                  <span className="text-sm font-bold text-gray-900">{currentQ.year} Official Paper</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-gray-500 font-medium">Difficulty Level</span>
                  <motion.div 
                    key={currentQ.difficulty}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.4 }}
                  >
                    <Badge variant={currentQ.difficulty === "Hard" ? "danger" : "warning"} className="shadow-sm">
                      {currentQ.difficulty}
                    </Badge>
                  </motion.div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-gray-500 font-medium">Aspirant Accuracy</span>
                  <span className="font-mono font-bold text-emerald-600 text-sm bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">{currentQ.accuracy}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-gray-100 text-xs text-gray-600 space-y-1 transition-colors hover:bg-gray-50">
                <span className="font-bold text-gray-800 flex items-center gap-1.5"><Award className="h-3.5 w-3.5 text-indigo-500"/> Why Practice PYQs?</span>
                <p>NEST PYQs train you to spot conceptual trick options and manage time effectively under actual exam constraints.</p>
              </div>

              <Button onClick={onOpenAssessment} className="w-full bg-[#4F46E5] hover:bg-[#3730A3] shadow-md hover:shadow-lg transition-all group" size="default">
                Explore All NEST PYQs 
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
