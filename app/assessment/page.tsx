"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Clock,
  Award,
  Sparkles,
  BookOpen,
  Target,
  FlaskConical,
  RotateCcw,
  UserCheck,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useOnboardingStore } from "@/lib/store/useOnboardingStore";
import { pushAllLocalData } from "@/lib/supabase/sync.service";
import { getToken } from "@/lib/auth/authGuard";

interface Question {
  id: number;
  subject: "Physics" | "Chemistry" | "Biology" | "Mathematics";
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: 1,
    subject: "Physics",
    topic: "Mechanics & Gravitation",
    question:
      "A satellite orbits Earth in a circular path of radius R with period T. If its orbital radius is increased to 4R, what is its new orbital period according to Kepler's laws?",
    options: ["2 T", "4 T", "8 T", "16 T"],
    correctIndex: 2,
    explanation:
      "According to Kepler's Third Law (T² ∝ R³), T₂/T₁ = (R₂/R₁)^(3/2) = 4^(3/2) = 8. Hence, the new period is 8T.",
  },
  {
    id: 2,
    subject: "Chemistry",
    topic: "Chemical Thermodynamics",
    question:
      "Which thermodynamic condition strictly guarantees a spontaneous reaction at all temperatures?",
    options: [
      "ΔH < 0 (exothermic) and ΔS > 0 (increased entropy)",
      "ΔH > 0 (endothermic) and ΔS < 0 (decreased entropy)",
      "ΔH < 0 and ΔS < 0 at low temperatures",
      "ΔH > 0 and ΔS > 0 at high temperatures",
    ],
    correctIndex: 0,
    explanation:
      "From Gibbs Free Energy ΔG = ΔH - TΔS, when ΔH < 0 and ΔS > 0, ΔG is strictly negative for all absolute temperatures T > 0.",
  },
  {
    id: 3,
    subject: "Biology",
    topic: "Cell Biology & Genetics",
    question:
      "Which eukaryotic cellular component will remain unaffected if cycloheximide selectively inhibits 80S cytosolic ribosomal translation?",
    options: [
      "Rough Endoplasmic Reticulum protein synthesis",
      "Free cytosolic enzyme synthesis",
      "Mitochondrial matrix protein translation (utilizing 70S ribosomes)",
      "Nuclear pore complex translation",
    ],
    correctIndex: 2,
    explanation:
      "Mitochondrial matrix translation utilizes 70S ribosomes (prokaryotic endosymbiotic lineage) and is unaffected by 80S cytosolic inhibitors like cycloheximide.",
  },
  {
    id: 4,
    subject: "Mathematics",
    topic: "Calculus & Limits",
    question:
      "What is the value of the limit lim (x → 0) of (1 - cos(3x)) / x²?",
    options: ["3/2", "3", "9/2", "9"],
    correctIndex: 2,
    explanation:
      "Using standard limit lim (x→0) (1-cos(kx))/x² = k²/2. Here k=3, so the result is 3²/2 = 9/2.",
  },
];

export default function AssessmentPage() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useOnboardingStore();

  React.useEffect(() => {
    const token = getToken();
    if (!token) {
      window.location.replace("/login?mode=signup&redirect=%2Fassessment");
    }
  }, []);

  const [currentStep, setCurrentStep] = useState<"intro" | "quiz" | "report">("intro");
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes

  const handleStartQuiz = () => {
    setCurrentStep("quiz");
  };

  const handleSelectOption = (qId: number, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
  };

  const handleNext = () => {
    if (currentQIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      const correct = ASSESSMENT_QUESTIONS.reduce((acc, q) => {
        return answers[q.id] === q.correctIndex ? acc + 1 : acc;
      }, 0);
      const accPct = Math.round((correct / ASSESSMENT_QUESTIONS.length) * 100);
      const resultPayload = {
        correctCount: correct,
        totalQuestions: ASSESSMENT_QUESTIONS.length,
        accuracy: accPct,
        answers,
        completedAt: new Date().toISOString(),
      };
      try {
        localStorage.setItem("nest_smartprep_assessment_results", JSON.stringify(resultPayload));
        pushAllLocalData().catch(() => {});
      } catch {}
      setCurrentStep("report");
    }
  };

  const handleReset = () => {
    setCurrentStep("intro");
    setCurrentQIndex(0);
    setAnswers({});
  };

  // Calculate score
  const correctCount = ASSESSMENT_QUESTIONS.reduce((acc, q) => {
    return answers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const accuracy = Math.round((correctCount / ASSESSMENT_QUESTIONS.length) * 100);

  return (
    <div className="min-h-screen bg-[#F7F8FC] flex flex-col justify-between text-[#111827]">
      {/* Header */}
      <header className="w-full max-[#7xl] mx-auto px-4 sm:px-6 lg:px-8 py-5 border-b border-gray-200/80 bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-900">
              <FlaskConical className="h-3.5 w-3.5 text-[#4F46E5]" />
              <span>Exam Track: <strong>NEST 2027</strong></span>
            </div>

            {isLoggedIn && user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 bg-gray-100 px-3 py-1.5 rounded-lg">
                  <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  className="text-xs text-gray-500 hover:text-red-600 font-semibold transition-colors flex items-center gap-1"
                >
                  <LogOut className="h-3.5 w-3.5" /> Logout
                </button>
              </div>
            ) : (
              <Link href="/signup">
                <Button size="sm" variant="outline">
                  Create Account
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {currentStep === "intro" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 bg-white p-6 sm:p-10 rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/50"
          >
            <div className="text-center space-y-3">
              <Badge variant="default" className="px-3.5 py-1 text-xs">
                <Sparkles className="h-3.5 w-3.5 mr-1" /> NEST Official Pattern Diagnostic
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">
                Welcome to Your NEST Diagnostic Assessment
              </h1>
              <p className="text-sm sm:text-base text-[#6B7280] max-w-xl mx-auto">
                Evaluate your foundational mastery in Physics, Chemistry, Biology, and Mathematics with authentic NEST-style questions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 text-center space-y-1">
                <Clock className="h-5 w-5 text-[#4F46E5] mx-auto" />
                <span className="text-xs text-gray-500 font-semibold block">Duration</span>
                <span className="text-sm font-black text-gray-900">3–5 Minutes</span>
              </div>
              <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 text-center space-y-1">
                <Target className="h-5 w-5 text-[#4F46E5] mx-auto" />
                <span className="text-xs text-gray-500 font-semibold block">Questions</span>
                <span className="text-sm font-black text-gray-900">4 High-Yield Problems</span>
              </div>
              <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 text-center space-y-1">
                <Award className="h-5 w-5 text-[#4F46E5] mx-auto" />
                <span className="text-xs text-gray-500 font-semibold block">Outcome</span>
                <span className="text-sm font-black text-gray-900">Personalized Readiness Index</span>
              </div>
            </div>

            <div className="space-y-3 bg-[#F7F8FC] p-4 rounded-xl border border-gray-200/80 text-xs text-gray-700">
              <p className="font-bold uppercase tracking-wider text-gray-900">
                What this diagnostic measures:
              </p>
              <ul className="space-y-2 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  Conceptual accuracy in multi-subject science topics.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  Speed and question-solving efficiency for NEST 2027.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  Targeted recommendation of Smart Lessons for your weak spots.
                </li>
              </ul>
            </div>

            <Button
              onClick={handleStartQuiz}
              size="xl"
              className="w-full bg-[#4F46E5] hover:bg-[#3730A3] text-white font-bold text-base shadow-lg shadow-indigo-500/20"
            >
              Start Free Assessment <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        )}

        {currentStep === "quiz" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/50"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] block">
                  {ASSESSMENT_QUESTIONS[currentQIndex].subject} — {ASSESSMENT_QUESTIONS[currentQIndex].topic}
                </span>
                <span className="text-xs text-[#6B7280]">
                  Question {currentQIndex + 1} of {ASSESSMENT_QUESTIONS.length}
                </span>
              </div>
              <Badge variant="secondary" className="font-mono text-xs">
                NEST Diagnostic
              </Badge>
            </div>

            <Progress
              value={((currentQIndex + 1) / ASSESSMENT_QUESTIONS.length) * 100}
              className="h-2"
            />

            {/* Question Box */}
            <div className="space-y-5 pt-2">
              <h2 className="text-lg sm:text-xl font-bold text-[#111827] leading-relaxed">
                {ASSESSMENT_QUESTIONS[currentQIndex].question}
              </h2>

              <div className="space-y-3">
                {ASSESSMENT_QUESTIONS[currentQIndex].options.map((opt, idx) => {
                  const qId = ASSESSMENT_QUESTIONS[currentQIndex].id;
                  const isSelected = answers[qId] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(qId, idx)}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium border transition-all flex items-center justify-between ${
                        isSelected
                          ? "border-[#4F46E5] bg-indigo-50/80 text-indigo-950 font-bold shadow-xs ring-1 ring-[#4F46E5]"
                          : "border-gray-200 bg-white hover:bg-gray-50 text-gray-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                            isSelected ? "bg-[#4F46E5] text-white" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="h-5 w-5 text-[#4F46E5]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                onClick={handleReset}
                className="text-xs text-gray-500 hover:text-gray-800 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Restart
              </button>

              <Button
                onClick={handleNext}
                disabled={answers[ASSESSMENT_QUESTIONS[currentQIndex].id] === undefined}
                size="lg"
                className="bg-[#4F46E5] hover:bg-[#3730A3]"
              >
                {currentQIndex === ASSESSMENT_QUESTIONS.length - 1 ? "Submit Diagnostic" : "Next Question"}{" "}
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {currentStep === "report" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 bg-white p-6 sm:p-10 rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/50 text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-[#4F46E5] ring-8 ring-indigo-50/50">
              <Award className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <Badge variant="success" className="px-3.5 py-1 text-xs">
                Diagnostic Analysis Complete
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-black text-[#111827]">
                Your NEST Readiness Index: {accuracy >= 75 ? "78 / 100 (Strong Foundation)" : "62 / 100 (Developing)"}
              </h1>
              <p className="text-sm text-[#6B7280] max-w-md mx-auto">
                Hello {user?.name || "Aspirant"}, here is your diagnostic breakdown across Physics, Chemistry, Biology & Math.
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 bg-[#F7F8FC] p-4 rounded-xl border border-gray-200/80">
              <div>
                <span className="text-xs text-gray-500 font-semibold block">Questions Solved</span>
                <span className="text-xl font-black text-gray-900">{correctCount} / {ASSESSMENT_QUESTIONS.length}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 font-semibold block">Overall Accuracy</span>
                <span className="text-xl font-black text-emerald-600">{accuracy}%</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 font-semibold block">Target College</span>
                <span className="text-xs font-bold text-indigo-700 block mt-1">NISER / CEBS</span>
              </div>
            </div>

            {/* Detailed Answers Breakdown */}
            <div className="text-left space-y-3">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Question Performance & Concept Analysis
              </h3>
              <div className="space-y-3">
                {ASSESSMENT_QUESTIONS.map((q) => {
                  const isCorrect = answers[q.id] === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-xl border border-gray-200/80 bg-white space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#4F46E5]">{q.subject} — {q.topic}</span>
                        {isCorrect ? (
                          <Badge variant="success">Correct (+4)</Badge>
                        ) : (
                          <Badge variant="danger">Review Needed</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-800 font-medium">{q.question}</p>
                      <p className="text-xs text-gray-500 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                        <strong>Explanation:</strong> {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Steps CTA */}
            <div className="pt-4 space-y-3">
              <Link href="/">
                <Button size="xl" className="w-full bg-[#4F46E5] hover:bg-[#3730A3] text-white font-bold text-base shadow-lg shadow-indigo-500/20">
                  Explore NEST Smart Lessons & PYQs <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-xs text-gray-500">
                Your preparation profile has been saved for NEST 2027.
              </p>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-gray-400 border-t border-gray-200/60 bg-white/50">
        <p>© 2026 SciPrep. Official Entrance Screening Test Companion.</p>
      </footer>
    </div>
  );
}
