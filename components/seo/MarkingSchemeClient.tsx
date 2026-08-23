"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Calculator, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  ChevronDown, 
  TrendingUp,
  ShieldCheck,
  Zap,
  Target,
  MinusCircle,
  PlusCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getToken } from "@/lib/auth/authGuard";

interface FAQItem {
  question: string;
  answer: string;
}

interface MarkingSchemeClientProps {
  faqs: FAQItem[];
}

export function MarkingSchemeClient({ faqs }: MarkingSchemeClientProps) {
  const router = useRouter();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Interactive Calculator State
  const [category, setCategory] = useState<"General" | "OBC" | "SC/ST">("General");
  
  // Sectional inputs [Single Correct Correct, Single Correct Wrong, Multi Correct Correct]
  const [scores, setScores] = useState({
    physics: { singleCorrect: 9, singleWrong: 2, multiCorrect: 4 },
    chemistry: { singleCorrect: 8, singleWrong: 3, multiCorrect: 3 },
    mathematics: { singleCorrect: 7, singleWrong: 2, multiCorrect: 3 },
    biology: { singleCorrect: 4, singleWrong: 1, multiCorrect: 1 },
  });

  const handleScoreChange = (
    subject: keyof typeof scores,
    field: "singleCorrect" | "singleWrong" | "multiCorrect",
    value: number
  ) => {
    const val = Math.max(0, Math.min(12, value));
    setScores((prev) => ({
      ...prev,
      [subject]: {
        ...prev[subject],
        [field]: val,
      },
    }));
  };

  // Calculations
  const calculatedData = useMemo(() => {
    const smasThreshold = category === "General" ? 6.0 : category === "OBC" ? 5.4 : 3.0;

    const calcSubject = (sub: { singleCorrect: number; singleWrong: number; multiCorrect: number }) => {
      // Single correct: +3, -1
      const singleScore = sub.singleCorrect * 3 - sub.singleWrong * 1;
      // Multi correct: +4, 0
      const multiScore = sub.multiCorrect * 4;
      const totalScore = Math.max(0, singleScore + multiScore);
      const negativeMarks = sub.singleWrong * 1;
      const passedSmas = totalScore >= smasThreshold;
      return { totalScore, singleScore, multiScore, negativeMarks, passedSmas };
    };

    const phy = calcSubject(scores.physics);
    const chem = calcSubject(scores.chemistry);
    const math = calcSubject(scores.mathematics);
    const bio = calcSubject(scores.biology);

    const subjectScores = [
      { name: "Physics", ...phy },
      { name: "Chemistry", ...chem },
      { name: "Mathematics", ...math },
      { name: "Biology", ...bio },
    ];

    // Total Negative penalty across paper
    const totalNegativeLost = phy.negativeMarks + chem.negativeMarks + math.negativeMarks + bio.negativeMarks;

    // Sort to find Best 3 subjects
    const sorted = [...subjectScores].sort((a, b) => b.totalScore - a.totalScore);
    const best3 = sorted.slice(0, 3);
    const best3Score = best3.reduce((acc, curr) => acc + curr.totalScore, 0);

    const allSmasCleared = phy.passedSmas && chem.passedSmas && math.passedSmas && bio.passedSmas;

    // Admission Chance estimate
    let admissionStatus = "Unlikely (Below Cutoff)";
    let badgeColor = "bg-rose-50 text-rose-700 border-rose-200";
    let estPercentile = "50-70%";

    if (!allSmasCleared) {
      admissionStatus = "Disqualified (Missed Sectional SMAS)";
      badgeColor = "bg-rose-50 text-rose-700 border-rose-200";
      estPercentile = "N/A";
    } else if (best3Score >= 120) {
      admissionStatus = "Guaranteed Safe NISER & CEBS (AIR 1–250)";
      badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
      estPercentile = "99.0%–99.9%";
    } else if (best3Score >= 95) {
      admissionStatus = "High Probability for NISER / CEBS";
      badgeColor = "bg-indigo-50 text-indigo-700 border-indigo-200";
      estPercentile = "94.0%–98.5%";
    } else if (best3Score >= 75) {
      admissionStatus = "Borderline / Counseling Round 2 Eligible";
      badgeColor = "bg-amber-50 text-amber-700 border-amber-200";
      estPercentile = "85.0%–93.0%";
    }

    return {
      phy,
      chem,
      math,
      bio,
      subjectScores,
      best3,
      best3Score,
      totalNegativeLost,
      allSmasCleared,
      admissionStatus,
      badgeColor,
      estPercentile,
      smasThreshold,
    };
  }, [scores, category]);

  const handleLaunchSimulator = () => {
    const token = getToken();
    if (token) {
      router.push("/dashboard?tab=mocks");
    } else {
      router.push("/login?mode=signup&redirect=%2Fdashboard%3Ftab%3Dmocks");
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-12 overflow-hidden bg-gradient-to-b from-indigo-50/60 via-slate-50 to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>Official NEST Examination Evaluation Guide</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.14]">
            Does NEST Have Negative Marking?{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Marking Scheme & SMAS Rules
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Understand exactly how marks are awarded in Single Correct (+3, -1) and Multiple Correct (+4, 0) questions. Calculate your evaluated score out of 180 and ensure you clear the <strong>Section-wise Minimum Admissible Score (SMAS)</strong> in all four subjects.
          </p>

          {/* Quick Summary Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4 text-left">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 mt-0.5">
                <PlusCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Single Correct (MCQ)</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5"><strong className="text-emerald-600">+3 Marks</strong> for correct, <strong className="text-rose-600">-1 Mark</strong> penalty</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 mt-0.5">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Multiple Correct (MSQ)</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5"><strong className="text-emerald-600">+4 Marks</strong> for all correct, <strong className="text-slate-700">0 Penalty (No Negative)</strong></div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-50 text-purple-600 mt-0.5">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Merit Rank Basis</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Evaluated out of <strong className="text-indigo-600">180 Marks</strong> (Best 3 Subjects)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive NEST Score & SMAS Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
            <Calculator className="h-3.5 w-3.5 text-indigo-600" />
            Interactive Score Predictor
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Calculate Your NEST Score & Sectional SMAS Standing
          </h2>
          <p className="text-sm text-slate-500">
            Enter your question attempts below to see how negative marks impact your total out of 180.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
          {/* Category Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-sm font-bold text-slate-900 block">Select Reservation Category:</span>
              <span className="text-xs text-slate-500">Adjusts Section-wise SMAS cutoff threshold (~{calculatedData.smasThreshold} Marks).</span>
            </div>
            <div className="flex items-center gap-2">
              {(["General", "OBC", "SC/ST"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    category === cat
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(["physics", "chemistry", "mathematics", "biology"] as const).map((subKey) => {
              const subName = subKey.charAt(0).toUpperCase() + subKey.slice(1);
              const subData = scores[subKey];
              const result = calculatedData[subKey === "physics" ? "phy" : subKey === "chemistry" ? "chem" : subKey === "mathematics" ? "math" : "bio"];

              return (
                <div
                  key={subKey}
                  className="rounded-2xl border border-slate-200 p-5 bg-slate-50/50 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-base">{subName}</h4>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          result.passedSmas
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {result.passedSmas ? "SMAS Safe" : "Fails SMAS"}
                      </span>
                    </div>

                    {/* Single Correct Inputs */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 font-medium">Single Correct (+3):</span>
                        <input
                          type="number"
                          min={0}
                          max={12}
                          value={subData.singleCorrect}
                          onChange={(e) => handleScoreChange(subKey, "singleCorrect", parseInt(e.target.value) || 0)}
                          className="w-16 px-2 py-1 bg-white border border-slate-200 rounded-lg text-center font-bold text-slate-900 text-xs"
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-rose-600 font-medium">Single Wrong (-1):</span>
                        <input
                          type="number"
                          min={0}
                          max={12}
                          value={subData.singleWrong}
                          onChange={(e) => handleScoreChange(subKey, "singleWrong", parseInt(e.target.value) || 0)}
                          className="w-16 px-2 py-1 bg-white border border-rose-200 rounded-lg text-center font-bold text-rose-600 text-xs"
                        />
                      </div>

                      {/* Multi Correct */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-indigo-600 font-medium">Multi Correct (+4, 0):</span>
                        <input
                          type="number"
                          min={0}
                          max={5}
                          value={subData.multiCorrect}
                          onChange={(e) => handleScoreChange(subKey, "multiCorrect", parseInt(e.target.value) || 0)}
                          className="w-16 px-2 py-1 bg-white border border-indigo-200 rounded-lg text-center font-bold text-indigo-700 text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section Result Footer */}
                  <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500">Section Total:</span>
                    <span className="text-base font-black text-slate-900">{result.totalScore} / 60</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Results Summary Box */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">Best 3 Score (Merit)</div>
                <div className="text-4xl font-black text-white mt-1">{calculatedData.best3Score} <span className="text-base text-slate-400 font-medium">/ 180</span></div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs text-rose-300 font-semibold uppercase tracking-wider">Negative Penalty Lost</div>
                <div className="text-4xl font-black text-rose-400 mt-1">-{calculatedData.totalNegativeLost} <span className="text-base text-rose-300 font-medium">Marks</span></div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">Predicted Percentile</div>
                <div className="text-3xl font-black text-emerald-400 mt-1">{calculatedData.estPercentile}</div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">SMAS Clearance</div>
                <div className="text-lg font-bold text-white mt-2 flex items-center justify-center gap-1.5">
                  {calculatedData.allSmasCleared ? (
                    <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> All 4 Passed</span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1"><XCircle className="h-4 w-4" /> Missing Cutoff</span>
                  )}
                </div>
              </div>
            </div>

            {/* Admission Status Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white/10 border border-white/15">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-indigo-200 font-medium">Predicted Admission Standing:</div>
                  <div className="text-base font-bold text-white">{calculatedData.admissionStatus}</div>
                </div>
              </div>

              <Button
                onClick={handleLaunchSimulator}
                className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-6 py-2.5 rounded-xl text-xs shrink-0"
              >
                Practice in CBT Simulator
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Official Marking Scheme Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            NEST Marking Scheme Comparison Table
          </h2>
          <p className="text-sm text-slate-500">
            Clear contrast between single-choice negative penalties and multi-choice safe marking.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Section Type</th>
                  <th className="px-6 py-4">Question Type</th>
                  <th className="px-6 py-4">Correct Marks</th>
                  <th className="px-6 py-4">Negative Penalty</th>
                  <th className="px-6 py-4">Unattempted</th>
                  <th className="px-6 py-4">Exam Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">Section 1</td>
                  <td className="px-6 py-4">Single Correct Option (MCQ)</td>
                  <td className="px-6 py-4 font-bold text-emerald-600">+3 Marks</td>
                  <td className="px-6 py-4 font-bold text-rose-600">-1 Mark Penalty</td>
                  <td className="px-6 py-4">0 Marks</td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-700">Only attempt when 100% confident or after eliminating 2 options.</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">Section 2</td>
                  <td className="px-6 py-4">Multiple Correct Options (MSQ)</td>
                  <td className="px-6 py-4 font-bold text-emerald-600">+4 Marks</td>
                  <td className="px-6 py-4 font-bold text-slate-800">0 Marks (No Negative)</td>
                  <td className="px-6 py-4">0 Marks</td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-700">Zero penalty risk! Attempt every question after careful verification.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500">
            Official guidelines on negative marking, SMAS sectional cutoffs, and percentile formulas.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-indigo-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Test Yourself with Authentic NEST Negative Marking
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Experience the real 3.5-hour CBT interface with automatic SMAS tracking, instant negative mark loss analytics, and topic mastery recommendations.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                onClick={handleLaunchSimulator}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-indigo-600/30 text-sm"
              >
                Launch Free Mock Test
              </Button>
              <Link
                href="/login?mode=signup"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all text-center"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
