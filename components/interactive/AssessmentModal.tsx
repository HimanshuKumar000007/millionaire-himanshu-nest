"use client";

import * as React from "react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, CheckCircle2, AlertCircle, RefreshCw, Sparkles, BookOpen, Target, Award } from "lucide-react";

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Question {
  id: number;
  subject: "Physics" | "Chemistry" | "Biology" | "Mathematics";
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 1,
    subject: "Physics",
    topic: "Mechanics & Gravitation",
    question: "A satellite orbits Earth in a circular path of radius R with period T. If its orbital radius is increased to 4R, what is the new orbital period?",
    options: ["2 T", "4 T", "8 T", "16 T"],
    correctIndex: 2,
    explanation: "According to Kepler's Third Law (T² ∝ R³), T₂/T₁ = (R₂/R₁)^(3/2) = 4^(3/2) = 8. Hence, the new period is 8T.",
  },
  {
    id: 2,
    subject: "Chemistry",
    topic: "Thermodynamics & Equilibrium",
    question: "Which of the following conditions guarantees a spontaneous reaction at all temperatures?",
    options: [
      "ΔH < 0 and ΔS > 0",
      "ΔH > 0 and ΔS < 0",
      "ΔH < 0 and ΔS < 0",
      "ΔH > 0 and ΔS > 0"
    ],
    correctIndex: 0,
    explanation: "From ΔG = ΔH - TΔS, when enthalpy is exothermic (ΔH < 0) and entropy increases (ΔS > 0), ΔG is strictly negative for all positive absolute temperatures T.",
  },
  {
    id: 3,
    subject: "Biology",
    topic: "Cell Biology & Molecular Genetics",
    question: "Which organelle contains its own circular DNA and 70S ribosomes, supporting the endosymbiotic theory?",
    options: ["Golgi Body", "Mitochondria", "Endoplasmic Reticulum", "Lysosome"],
    correctIndex: 1,
    explanation: "Mitochondria (and chloroplasts) possess circular prokaryotic-like DNA and 70S ribosomes, replicating independently inside eukaryotic host cells.",
  },
];

export function AssessmentModal({ isOpen, onClose }: AssessmentModalProps) {
  const [step, setStep] = useState<"intro" | "questions" | "result">("intro");
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [targetStream, setTargetStream] = useState<string>("PCB");
  const [aspirantClass, setAspirantClass] = useState<string>("Class 12");

  const handleStart = () => {
    setStep("questions");
    setCurrentQIndex(0);
    setSelectedAnswers([]);
  };

  const handleSelectOption = (optionIdx: number) => {
    const updated = [...selectedAnswers];
    updated[currentQIndex] = optionIdx;
    setSelectedAnswers(updated);
  };

  const handleNextQuestion = () => {
    if (currentQIndex < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      setStep("result");
    }
  };

  const resetAssessment = () => {
    setStep("intro");
    setCurrentQIndex(0);
    setSelectedAnswers([]);
  };

  // Calculate score
  const correctCount = selectedAnswers.reduce((acc, ansIdx, qIdx) => {
    return ansIdx === SAMPLE_QUESTIONS[qIdx].correctIndex ? acc + 1 : acc;
  }, 0);

  const scorePercentage = Math.round((correctCount / SAMPLE_QUESTIONS.length) * 100);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-xl">
      {step === "intro" && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <Badge variant="default" className="px-3 py-1">
              <Sparkles className="h-3.5 w-3.5 mr-1" /> NEST Diagnostic Readiness Test
            </Badge>
            <h2 className="text-2xl font-extrabold text-[#111827]">
              Start Your Free NEST Assessment
            </h2>
            <p className="text-sm text-[#6B7280]">
              Evaluate your current concept grasp across key NEST topics in under 3 minutes.
            </p>
          </div>

          <div className="bg-[#F7F8FC] p-4 rounded-xl border border-gray-100 space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                Your Academic Year
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Class 11", "Class 12", "Dropper / Gap Year"].map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setAspirantClass(cls)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                      aspirantClass === cls
                        ? "bg-[#4F46E5] text-white border-[#4F46E5]"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                Subject Combination Preference
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "PCMB", label: "PCMB (All 4)" },
                  { id: "PCB", label: "PCB Focus" },
                  { id: "PCM", label: "PCM Focus" },
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setTargetStream(st.id)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                      targetStream === st.id
                        ? "bg-[#4F46E5] text-white border-[#4F46E5]"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-[#6B7280] bg-indigo-50/60 p-3 rounded-lg border border-indigo-100/80">
            <div className="flex items-center gap-2 text-indigo-900 font-semibold">
              <CheckCircle2 className="h-4 w-4 text-indigo-600" />
              Instant readiness score computation
            </div>
            <div className="flex items-center gap-2 text-indigo-900 font-semibold">
              <CheckCircle2 className="h-4 w-4 text-indigo-600" />
              Identify concept gaps in Mechanics, Thermodynamics & Cell Biology
            </div>
          </div>

          <Button onClick={handleStart} className="w-full" size="lg">
            Begin 3-Minute Diagnostic <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {step === "questions" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
                {SAMPLE_QUESTIONS[currentQIndex].subject} — {SAMPLE_QUESTIONS[currentQIndex].topic}
              </span>
              <p className="text-xs text-[#6B7280]">Question {currentQIndex + 1} of {SAMPLE_QUESTIONS.length}</p>
            </div>
            <Badge variant="secondary">
              Diagnostic Mode
            </Badge>
          </div>

          <Progress value={((currentQIndex + 1) / SAMPLE_QUESTIONS.length) * 100} className="h-1.5" />

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[#111827] leading-snug">
              {SAMPLE_QUESTIONS[currentQIndex].question}
            </h3>

            <div className="space-y-2.5">
              {SAMPLE_QUESTIONS[currentQIndex].options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQIndex] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 rounded-xl text-sm font-medium border transition-all flex items-center justify-between ${
                      isSelected
                        ? "border-[#4F46E5] bg-indigo-50/70 text-indigo-950 shadow-xs"
                        : "border-gray-200 bg-white hover:bg-gray-50 text-gray-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                        isSelected ? "bg-[#4F46E5] text-white" : "bg-gray-100 text-gray-600"
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="h-4 w-4 text-[#4F46E5]" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={resetAssessment}
              className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" /> Restart
            </button>
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQIndex] === undefined}
              size="default"
            >
              {currentQIndex === SAMPLE_QUESTIONS.length - 1 ? "Submit Assessment" : "Next Question"} <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === "result" && (
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-[#4F46E5] ring-8 ring-indigo-50/50">
            <Award className="h-8 w-8" />
          </div>

          <div className="space-y-1">
            <Badge variant="success" className="px-3 py-1">
              Assessment Completed
            </Badge>
            <h2 className="text-2xl font-extrabold text-[#111827]">
              Your Initial NEST Readiness: {scorePercentage >= 66 ? "74/100 (On Track)" : "58/100 (Building Foundation)"}
            </h2>
            <p className="text-sm text-[#6B7280]">
              Based on your sample diagnostic performance in {aspirantClass} ({targetStream})
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 bg-[#F7F8FC] p-4 rounded-xl border border-gray-100">
            <div className="text-center">
              <span className="text-xs text-[#6B7280] font-medium block">Score</span>
              <span className="text-lg font-bold text-[#111827]">{correctCount} / {SAMPLE_QUESTIONS.length}</span>
            </div>
            <div className="text-center">
              <span className="text-xs text-[#6B7280] font-medium block">Accuracy</span>
              <span className="text-lg font-bold text-emerald-600">{scorePercentage}%</span>
            </div>
            <div className="text-center">
              <span className="text-xs text-[#6B7280] font-medium block">Priority Action</span>
              <span className="text-xs font-bold text-indigo-600 block truncate">Mechanics Revision</span>
            </div>
          </div>

          {/* Question Review Breakdown */}
          <div className="text-left space-y-2">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Diagnostic Breakdown
            </h4>
            <div className="space-y-2 text-xs">
              {SAMPLE_QUESTIONS.map((q, idx) => {
                const isCorrect = selectedAnswers[idx] === q.correctIndex;
                return (
                  <div key={q.id} className="p-3 rounded-lg border border-gray-100 bg-white flex items-start justify-between gap-3">
                    <div>
                      <span className="font-semibold text-gray-900 block">{q.subject}: {q.topic}</span>
                      <p className="text-gray-500 mt-0.5 line-clamp-1">{q.explanation}</p>
                    </div>
                    {isCorrect ? (
                      <Badge variant="success" className="shrink-0">Correct</Badge>
                    ) : (
                      <Badge variant="danger" className="shrink-0">Needs Practice</Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <Button
              onClick={() => {
                onClose();
                resetAssessment();
              }}
              className="w-full"
              size="lg"
            >
              Access Full SciPrep Program <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-xs text-[#6B7280]">
              Save your diagnostic score & start step-by-step preparation with Smart Lessons & PYQs.
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
