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
  PlusCircle,
  BookOpen,
  Award,
  Layers,
  Percent,
  Clock,
  Flame,
  Scale,
  Compass
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
    let estPercentile = "50–70%";

    if (!allSmasCleared) {
      admissionStatus = "Disqualified (Failed Sectional SMAS in 4th Subject)";
      estPercentile = "Disqualified";
    } else if (best3Score >= 125) {
      admissionStatus = "Guaranteed NISER Bhubaneswar Top Batch (AIR 1–150)";
      estPercentile = "99.2%–99.9%";
    } else if (best3Score >= 105) {
      admissionStatus = "Safe NISER / CEBS Admission (AIR 151–450)";
      estPercentile = "96.5%–99.1%";
    } else if (best3Score >= 85) {
      admissionStatus = "Safe UM-DAE CEBS Mumbai / Round 2 Eligible";
      estPercentile = "90.0%–96.4%";
    } else if (best3Score >= 68) {
      admissionStatus = "Borderline / Waitlist Eligible";
      estPercentile = "80.0%–89.9%";
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
    <div className="space-y-16 pb-24 text-slate-800">
      {/* Hero Header */}
      <section className="relative pt-12 pb-14 overflow-hidden bg-gradient-to-b from-indigo-50/70 via-slate-50 to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span>Official NEST Evaluation & Marking Scheme Handbook</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 max-w-5xl mx-auto leading-[1.12]">
            Does NEST Have Negative Marking?{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600">
              Marking Scheme, SMAS & MAS Guide
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            An authoritative, mathematical breakdown of the <strong>Single Correct (+3, -1)</strong> penalty rules, <strong>Multiple Correct (+4, 0)</strong> risk-free scoring, <strong>Section-wise Minimum Admissible Score (SMAS)</strong> formulas, and the <strong>Best-3 evaluation mechanism (180 Marks)</strong> for NISER & CEBS admissions.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto pt-4 text-left">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 shrink-0">
                <MinusCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Section 1 (MCQ Single)</div>
                <div className="text-xs text-slate-600 mt-0.5"><strong className="text-emerald-600 font-bold">+3 Marks</strong> for correct, <strong className="text-rose-600 font-bold">-1 Mark penalty</strong> for incorrect.</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Section 2 (MSQ Multi)</div>
                <div className="text-xs text-slate-600 mt-0.5"><strong className="text-emerald-600 font-bold">+4 Marks</strong> for all correct, <strong className="text-slate-700 font-bold">0 Negative Penalty</strong> (Zero risk).</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Merit Evaluation</div>
                <div className="text-xs text-slate-600 mt-0.5">Rank evaluated on <strong className="text-indigo-600 font-bold">Best 3 of 4 subjects</strong> out of 180 Marks.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sticky Quick Navigator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column / Table of Contents (Desktop Sticky) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-2">
                Table of Contents
              </span>
              <nav className="space-y-1.5 text-xs font-semibold text-slate-600">
                <a href="#section-architecture" className="block py-1 hover:text-indigo-600 transition-colors">
                  1. Exam Format (240 vs 180 Marks)
                </a>
                <a href="#section-rules" className="block py-1 hover:text-indigo-600 transition-colors">
                  2. Question-Wise Marking Rules
                </a>
                <a href="#section-smas-math" className="block py-1 hover:text-indigo-600 transition-colors">
                  3. SMAS Formula & Historical Data
                </a>
                <a href="#section-mas-percentile" className="block py-1 hover:text-indigo-600 transition-colors">
                  4. MAS & Percentile Computation
                </a>
                <a href="#section-game-theory" className="block py-1 hover:text-indigo-600 transition-colors">
                  5. Guessing Math & Expected Value
                </a>
                <a href="#section-exam-comparison" className="block py-1 hover:text-indigo-600 transition-colors">
                  6. NEST vs JEE vs NEET vs IAT
                </a>
                <a href="#section-simulator" className="block py-1 hover:text-indigo-600 transition-colors">
                  7. Interactive Score Simulator
                </a>
                <a href="#section-strategy" className="block py-1 hover:text-indigo-600 transition-colors">
                  8. Tactical 3.5-Hour Exam Strategy
                </a>
                <a href="#section-faqs" className="block py-1 hover:text-indigo-600 transition-colors">
                  9. Frequently Asked Questions
                </a>
              </nav>

              <div className="pt-4 border-t border-slate-100">
                <Button
                  onClick={handleLaunchSimulator}
                  className="w-full bg-slate-900 hover:bg-indigo-600 text-white rounded-xl py-2 text-xs font-bold"
                >
                  Test on CBT Simulator
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Deep Detailed Master Guide */}
          <div className="lg:col-span-9 space-y-14 leading-relaxed">

            {/* Section 1: The Core Exam Architecture */}
            <section id="section-architecture" className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-indigo-700">
                <Layers className="h-4 w-4 text-indigo-600" />
                <span>Structural Blueprint</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                1. The Core Architecture of NEST: 240 Total Marks vs 180 Evaluated Marks
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                The **National Entrance Screening Test (NEST)** is conducted annually by NISER Bhubaneswar and UM-DAE CEBS Mumbai as a nationwide Computer-Based Test (CBT). Many candidates miscalculate their strategy because they assume all 240 marks count equally toward the final merit rank.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">The Question Paper</span>
                  <div className="text-2xl font-black text-slate-900">240 Total Marks</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Contains 4 compulsory sections: <strong>Physics (60 M)</strong>, <strong>Chemistry (60 M)</strong>, <strong>Mathematics (60 M)</strong>, and <strong>Biology (60 M)</strong>. Duration is <strong>3 Hours 30 Minutes (210 Minutes)</strong>.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2">
                  <span className="text-xs font-bold uppercase text-indigo-600 tracking-wider">The Merit Evaluation</span>
                  <div className="text-2xl font-black text-indigo-900">180 Evaluated Marks</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Your All India Rank (AIR) and percentile are calculated strictly from your <strong>Best 3 Scoring Subjects (3 × 60 = 180 Marks)</strong>, provided you clear the sectional SMAS in all four subjects.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Crucial Warning</strong>: The 4th lowest-scoring subject is NOT ignored during qualification. If you score zero marks in your 4th subject and miss its sectional cutoff (~6 marks), you will be <strong>disqualified from receiving a merit rank entirely</strong>, even if your total in the other three subjects is 165/180!
                </div>
              </div>
            </section>

            {/* Section 2: Question-Wise Marking Rules */}
            <section id="section-rules" className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-purple-700">
                <Scale className="h-4 w-4 text-purple-600" />
                <span>Question Typology</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                2. Question-Wise Marking Rules: Single Correct vs Multiple Correct
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Each of the 4 subject sections in NEST is divided into two distinct question formats with completely different risk profiles:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3.5">Section</th>
                      <th className="px-5 py-3.5">Question Format</th>
                      <th className="px-5 py-3.5">Questions</th>
                      <th className="px-5 py-3.5">Correct Marks</th>
                      <th className="px-5 py-3.5">Negative Penalty</th>
                      <th className="px-5 py-3.5">Penalty Risk</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-5 py-3 font-bold text-slate-900">Section 1</td>
                      <td className="px-5 py-3">Single Choice Correct (MCQ)</td>
                      <td className="px-5 py-3 font-medium text-slate-800">12 Questions</td>
                      <td className="px-5 py-3 font-bold text-emerald-600">+3 Marks</td>
                      <td className="px-5 py-3 font-bold text-rose-600">-1 Mark</td>
                      <td className="px-5 py-3 text-rose-600 font-semibold">High Penalty Risk</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-bold text-slate-900">Section 2</td>
                      <td className="px-5 py-3">Multiple Choice Correct (MSQ)</td>
                      <td className="px-5 py-3 font-medium text-slate-800">5 Questions</td>
                      <td className="px-5 py-3 font-bold text-emerald-600">+4 Marks</td>
                      <td className="px-5 py-3 font-bold text-slate-700">0 Marks (No Negative)</td>
                      <td className="px-5 py-3 text-emerald-600 font-semibold">Zero Penalty Risk</td>
                    </tr>
                    <tr className="bg-slate-50 font-bold">
                      <td className="px-5 py-3.5 text-slate-900" colSpan={2}>Total Per Subject Section</td>
                      <td className="px-5 py-3.5 text-slate-900">17 Questions</td>
                      <td className="px-5 py-3.5 text-indigo-600" colSpan={3}>60 Total Marks per Section</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-3 pt-2 text-xs text-slate-600">
                <p>
                  <strong>How Multiple Correct (MSQ) Works in NEST:</strong> A question may have 1, 2, 3, or all 4 correct options. To earn the full <strong>+4 marks</strong>, you must select ALL correct options and NO incorrect options. If an incorrect option is chosen or only a subset of correct options is selected, you receive <strong>0 marks</strong>. Since there is zero negative deduction, students should never leave Section 2 questions blank after intelligent elimination.
                </p>
              </div>
            </section>

            {/* Section 3: The Mathematical Formula Behind SMAS */}
            <section id="section-smas-math" className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                <Award className="h-4 w-4 text-emerald-600" />
                <span>Mandatory Sectional Cutoffs</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                3. The Section-wise Minimum Admissible Score (SMAS) Formula
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                The SMAS is the mandatory qualifying score required in EACH of the four subject sections (Physics, Chemistry, Mathematics, Biology). It is computed dynamically after all exam sessions are completed using the official Department of Atomic Energy mathematical formula:
              </p>

              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">Official SMAS Formula:</div>
                <div className="text-lg sm:text-xl font-mono font-bold text-slate-100">
                  SMAS (General) = 20% × M_A
                </div>
                <p className="text-xs text-slate-300">
                  Where <strong>M_A</strong> represents the arithmetic mean (average) of the top 100 raw scores in that specific subject section across all shifts in India.
                </p>
                <div className="pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                  <div><strong>General (UR) / EWS:</strong> 20% of M_A</div>
                  <div><strong>OBC-NCL:</strong> 90% of General SMAS (18% of M_A)</div>
                  <div><strong>SC / ST / PwD:</strong> 50% of General SMAS (10% of M_A)</div>
                </div>
              </div>

              {/* Historical SMAS Table */}
              <div className="space-y-2 pt-2">
                <h3 className="text-base font-bold text-slate-900">Historical SMAS Cutoffs (2021–2025)</h3>
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs sm:text-sm text-slate-600">
                    <thead className="bg-slate-50 font-bold text-slate-700 uppercase text-[11px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="px-5 py-3">Year</th>
                        <th className="px-5 py-3">Physics SMAS</th>
                        <th className="px-5 py-3">Chemistry SMAS</th>
                        <th className="px-5 py-3">Mathematics SMAS</th>
                        <th className="px-5 py-3">Biology SMAS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="px-5 py-2.5 font-bold text-slate-900">NEST 2025 (Shift 1)</td>
                        <td className="px-5 py-2.5">6.25 Marks</td>
                        <td className="px-5 py-2.5">7.10 Marks</td>
                        <td className="px-5 py-2.5">5.40 Marks</td>
                        <td className="px-5 py-2.5">6.80 Marks</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-2.5 font-bold text-slate-900">NEST 2024 (Shift 1)</td>
                        <td className="px-5 py-2.5">5.80 Marks</td>
                        <td className="px-5 py-2.5">6.45 Marks</td>
                        <td className="px-5 py-2.5">5.10 Marks</td>
                        <td className="px-5 py-2.5">7.20 Marks</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-2.5 font-bold text-slate-900">NEST 2023 (Shift 1)</td>
                        <td className="px-5 py-2.5">6.12 Marks</td>
                        <td className="px-5 py-2.5">6.80 Marks</td>
                        <td className="px-5 py-2.5">4.90 Marks</td>
                        <td className="px-5 py-2.5">6.40 Marks</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-2.5 font-bold text-slate-900">NEST 2022 (Shift 1)</td>
                        <td className="px-5 py-2.5">5.50 Marks</td>
                        <td className="px-5 py-2.5">5.90 Marks</td>
                        <td className="px-5 py-2.5">4.75 Marks</td>
                        <td className="px-5 py-2.5">6.10 Marks</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Section 4: MAS & Percentile Computation */}
            <section id="section-mas-percentile" className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-purple-700">
                <Percent className="h-4 w-4 text-purple-600" />
                <span>Aggregate Qualification</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                4. Minimum Admissible Score (MAS) & Percentile Formula
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Clearing SMAS in all four subjects makes you eligible for Tier 2 evaluation: the <strong>Overall Minimum Admissible Score (MAS)</strong> across your Best 3 scoring subjects out of 180 Marks:
              </p>

              <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-700">Official MAS Formula:</div>
                <div className="text-lg font-mono font-bold text-indigo-950">
                  MAS (General) = 50% × T_A
                </div>
                <p className="text-xs text-slate-600">
                  Where <strong>T_A</strong> is the average of the top 100 total scores (sum of best three subjects) nationwide. MAS typically ranges around <strong>65–75 marks out of 180</strong> for General/EWS candidates and <strong>35–40 marks</strong> for SC/ST.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="text-base font-bold text-slate-900">Official Percentile Score Formula</h3>
                <p className="text-xs text-slate-600">
                  Percentile score represents the percentage of candidates who scored equal to or lower than you in the exam:
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-800">
                  Percentile (P) = [(N - R) / N] × 100
                </div>
                <p className="text-xs text-slate-500">
                  Where <strong>N</strong> is the total number of candidates appearing in that shift, and <strong>R</strong> is your rank within that shift.
                </p>
              </div>
            </section>

            {/* Section 5: The Game Theory of Guessing */}
            <section id="section-game-theory" className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-rose-700">
                <AlertTriangle className="h-4 w-4 text-rose-600" />
                <span>Probability & Mathematical Risk</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                5. The Game Theory of Guessing: When to Attempt and When to Skip
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                In Section 1 (+3 for correct, -1 for wrong), random blind guessing leads to negative or zero expected yield:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1.5">
                  <strong className="text-rose-950 font-bold block">Blind Guess (4 Options)</strong>
                  <div className="font-mono text-slate-700">Expected Value: (1/4 × +3) + (3/4 × -1) = 0.0</div>
                  <p className="text-slate-500">Zero statistical gain. High risk of losing critical SMAS clearance.</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5">
                  <strong className="text-amber-950 font-bold block">1 Option Eliminated (3 Left)</strong>
                  <div className="font-mono text-slate-700">Expected Value: (1/3 × +3) + (2/3 × -1) = +0.33</div>
                  <p className="text-slate-500">Slight positive expected return. Attempt only in strong subjects.</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                  <strong className="text-emerald-950 font-bold block">2 Options Eliminated (50-50)</strong>
                  <div className="font-mono text-slate-700">Expected Value: (1/2 × +3) + (1/2 × -1) = +1.00</div>
                  <p className="text-slate-500"><strong>Always attempt!</strong> Strong mathematical edge of +1 mark per question.</p>
                </div>
              </div>
            </section>

            {/* Section 6: Exam Comparison Table */}
            <section id="section-exam-comparison" className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                <Scale className="h-4 w-4 text-slate-600" />
                <span>Cross-Examination Benchmark</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                6. NEST vs JEE Advanced vs NEET vs IAT Marking Scheme Comparison
              </h2>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm text-slate-600">
                  <thead className="bg-slate-50 font-bold text-slate-700 uppercase text-[11px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3.5">Parameter</th>
                      <th className="px-5 py-3.5">NEST (NISER/CEBS)</th>
                      <th className="px-5 py-3.5">JEE Advanced</th>
                      <th className="px-5 py-3.5">NEET (UG)</th>
                      <th className="px-5 py-3.5">IISER IAT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-5 py-3 font-semibold text-slate-900">Total Paper Marks</td>
                      <td className="px-5 py-3 font-bold text-indigo-600">240 Marks</td>
                      <td className="px-5 py-3">~360 Marks</td>
                      <td className="px-5 py-3">720 Marks</td>
                      <td className="px-5 py-3">240 Marks</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-semibold text-slate-900">Evaluated Merit Score</td>
                      <td className="px-5 py-3 font-bold text-emerald-600">180 Marks (Best 3)</td>
                      <td className="px-5 py-3">All Subjects</td>
                      <td className="px-5 py-3">All Subjects</td>
                      <td className="px-5 py-3">All Subjects (240)</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-semibold text-slate-900">Single Correct Marking</td>
                      <td className="px-5 py-3">+3 / -1</td>
                      <td className="px-5 py-3">+3 / -1</td>
                      <td className="px-5 py-3">+4 / -1</td>
                      <td className="px-5 py-3">+4 / -1</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-semibold text-slate-900">Multi-Correct (MSQ) Penalty</td>
                      <td className="px-5 py-3 font-bold text-emerald-600">+4 / 0 (Zero Negative)</td>
                      <td className="px-5 py-3 text-rose-600">+4 / -2 (Severe Penalty)</td>
                      <td className="px-5 py-3">No MSQs</td>
                      <td className="px-5 py-3">No MSQs</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-semibold text-slate-900">Mandatory Sectional Cutoff</td>
                      <td className="px-5 py-3 font-bold text-indigo-600">Yes (SMAS in all 4)</td>
                      <td className="px-5 py-3">Yes (~10% per sub)</td>
                      <td className="px-5 py-3 text-slate-400">No</td>
                      <td className="px-5 py-3 text-slate-400">No</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 7: Interactive Score Simulator */}
            <section id="section-simulator" className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
                  <Calculator className="h-3.5 w-3.5 text-indigo-600" />
                  Interactive NEST Score & SMAS Predictor
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  7. Simulate Your NEST Score & Negative Penalty Loss
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Enter your question attempts across Single Choice (+3/-1) and Multi-Choice (+4/0) below:
                </p>
              </div>

              {/* Category Selector */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Select Reservation Category:</span>
                  <span className="text-[11px] text-slate-500">Adjusts Section-wise SMAS cutoff threshold (~{calculatedData.smasThreshold} Marks).</span>
                </div>
                <div className="flex items-center gap-2">
                  {(["General", "OBC", "SC/ST"] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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

              {/* 4 Subject Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {(["physics", "chemistry", "mathematics", "biology"] as const).map((subKey) => {
                  const subName = subKey.charAt(0).toUpperCase() + subKey.slice(1);
                  const subData = scores[subKey];
                  const result = calculatedData[subKey === "physics" ? "phy" : subKey === "chemistry" ? "chem" : subKey === "mathematics" ? "math" : "bio"];

                  return (
                    <div
                      key={subKey}
                      className="rounded-2xl border border-slate-200 p-4 bg-slate-50/60 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-900 text-sm">{subName}</h4>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              result.passedSmas
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-rose-50 text-rose-700 border border-rose-200"
                            }`}
                          >
                            {result.passedSmas ? "SMAS Safe" : "Fails SMAS"}
                          </span>
                        </div>

                        <div className="space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600">Single Correct (+3):</span>
                            <input
                              type="number"
                              min={0}
                              max={12}
                              value={subData.singleCorrect}
                              onChange={(e) => handleScoreChange(subKey, "singleCorrect", parseInt(e.target.value) || 0)}
                              className="w-14 px-2 py-1 bg-white border border-slate-200 rounded-lg text-center font-bold text-slate-900 text-xs"
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-rose-600 font-medium">Single Wrong (-1):</span>
                            <input
                              type="number"
                              min={0}
                              max={12}
                              value={subData.singleWrong}
                              onChange={(e) => handleScoreChange(subKey, "singleWrong", parseInt(e.target.value) || 0)}
                              className="w-14 px-2 py-1 bg-white border border-rose-200 rounded-lg text-center font-bold text-rose-600 text-xs"
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-indigo-600 font-medium">Multi Correct (+4):</span>
                            <input
                              type="number"
                              min={0}
                              max={5}
                              value={subData.multiCorrect}
                              onChange={(e) => handleScoreChange(subKey, "multiCorrect", parseInt(e.target.value) || 0)}
                              className="w-14 px-2 py-1 bg-white border border-indigo-200 rounded-lg text-center font-bold text-indigo-700 text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-500">Section Total:</span>
                        <span className="text-sm font-black text-slate-900">{result.totalScore} / 60</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Simulation Result Box */}
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[11px] text-indigo-300 font-semibold uppercase tracking-wider">Best 3 Score (Rank Basis)</div>
                    <div className="text-3xl font-black text-white mt-1">{calculatedData.best3Score} <span className="text-xs text-slate-400 font-medium">/ 180</span></div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[11px] text-rose-300 font-semibold uppercase tracking-wider">Negative Penalty Lost</div>
                    <div className="text-3xl font-black text-rose-400 mt-1">-{calculatedData.totalNegativeLost} <span className="text-xs text-rose-300 font-medium">Marks</span></div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[11px] text-indigo-300 font-semibold uppercase tracking-wider">Predicted Percentile</div>
                    <div className="text-2xl font-black text-emerald-400 mt-1">{calculatedData.estPercentile}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[11px] text-indigo-300 font-semibold uppercase tracking-wider">SMAS Clearance</div>
                    <div className="text-sm font-bold text-white mt-2 flex items-center justify-center gap-1.5">
                      {calculatedData.allSmasCleared ? (
                        <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> All 4 Subjects Passed</span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1"><XCircle className="h-4 w-4" /> Failed Sectional SMAS</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white/10 border border-white/15">
                  <div>
                    <div className="text-xs text-indigo-200 font-medium">Estimated Admission Standing:</div>
                    <div className="text-base font-bold text-white">{calculatedData.admissionStatus}</div>
                  </div>

                  <Button
                    onClick={handleLaunchSimulator}
                    className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-6 py-2.5 rounded-xl text-xs shrink-0"
                  >
                    Launch Authentic CBT Simulator
                  </Button>
                </div>
              </div>
            </section>

            {/* Section 8: Tactical Exam Strategy */}
            <section id="section-strategy" className="space-y-5 bg-gradient-to-br from-indigo-50 to-slate-50 p-6 sm:p-8 rounded-3xl border border-indigo-100 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-indigo-700">
                <Compass className="h-4 w-4 text-indigo-600" />
                <span>Strategic Roadmap</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                8. The 3.5-Hour Tactical Exam Time Allocation Model
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <div>
                    <strong>Phase 1: Secure SMAS in 4th Subject (First 25–30 Mins)</strong>: Immediately identify and solve 3–4 direct conceptual questions in your weakest subject (e.g. Biology for PCM students, or Math for PCB students) to bank ~10 safe marks and eliminate the SMAS failure risk.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <div>
                    <strong>Phase 2: Maximize Best 3 Subjects (Next 150 Mins)</strong>: Devote 50 minutes each to your 3 primary scoring subjects. Focus on high-accuracy Single Correct MCQs (+3) and solve without careless calculation errors.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <div>
                    <strong>Phase 3: Exploit Risk-Free MSQs & Final Review (Last 30 Mins)</strong>: Attempt all Section 2 Multi-Correct questions (+4/0) using deduction, as there is zero negative deduction penalty.
                  </div>
                </div>
              </div>
            </section>

            {/* Section 9: Detailed FAQs */}
            <section id="section-faqs" className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  9. Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Official evaluation guidelines on negative penalties, multi-correct marking, and SMAS.
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
                      >
                        <span className="text-sm sm:text-base">{faq.question}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-indigo-600" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
