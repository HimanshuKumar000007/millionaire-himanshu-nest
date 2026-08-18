"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Compass,
  CheckCircle2,
  Circle,
  Clock,
  ArrowLeft,
  ArrowRight,
  Target,
  Flame,
  BookOpen,
  Sparkles,
  Award,
  Calendar,
  ChevronDown,
  ChevronUp,
  Layers,
  Zap,
  ShieldCheck,
  Brain,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RoadmapSummary } from "@/lib/types/dashboard";

interface RoadmapViewProps {
  roadmap: RoadmapSummary;
  onBackToDashboard: () => void;
  onNavigateToSection?: (section: string) => void;
}

export interface DetailedStage {
  id: number;
  phaseNumber: string;
  name: string;
  subtitle: string;
  status: "completed" | "current" | "upcoming";
  timeframe: string;
  progressPercent: number;
  subjectFocus: ("Physics" | "Chemistry" | "Biology" | "Mathematics")[];
  milestoneGoal: string;
  tasks: {
    id: string;
    title: string;
    completed: boolean;
    type: "diagnostic" | "lesson" | "pyq" | "mock" | "revision" | "practice";
    targetSection?: string;
  }[];
  keyTakeaway: string;
}

// ─── Dynamic phase schedule helper ───────────────────────────────────────────
const EXAM_DATE = new Date("2027-06-06T09:00:00+05:30");

/** Weights of phase 1–5 (phase 6 is always fixed 7-day sprint) */
const PHASE_WEIGHTS = [4, 11, 11, 8, 6]; // weeks
const TOTAL_WEIGHT = PHASE_WEIGHTS.reduce((a, b) => a + b, 0); // 40 weeks
const SPRINT_DAYS = 7;

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function fmtRange(start: Date, end: Date, suffix: string): string {
  const s = start.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const e = end.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  return `${s} – ${e} · ${suffix}`;
}

function deriveStatus(
  today: Date,
  start: Date,
  end: Date
): { status: "completed" | "current" | "upcoming"; progressPercent: number } {
  if (today >= end) return { status: "completed", progressPercent: 100 };
  if (today < start) return { status: "upcoming", progressPercent: 0 };
  const elapsed = today.getTime() - start.getTime();
  const total = end.getTime() - start.getTime();
  const pct = Math.min(99, Math.round((elapsed / total) * 100));
  return { status: "current", progressPercent: pct };
}

/** Build the 6 phase date boundaries from a signupDate */
function buildPhaseDates(signupDate: Date): { start: Date; end: Date }[] {
  const sprintStart = addDays(EXAM_DATE, -SPRINT_DAYS);
  const availableMs = sprintStart.getTime() - signupDate.getTime();
  const availableDays = Math.max(0, Math.round(availableMs / 86400000));

  // Distribute days proportionally across phases 1–5
  const phaseDays = PHASE_WEIGHTS.map((w) =>
    Math.max(7, Math.round((w / TOTAL_WEIGHT) * availableDays))
  );

  const dates: { start: Date; end: Date }[] = [];
  let cursor = new Date(signupDate);
  for (let i = 0; i < 5; i++) {
    const start = new Date(cursor);
    const end = addDays(cursor, phaseDays[i]);
    dates.push({ start, end });
    cursor = new Date(end);
  }
  // Phase 6: always the last 7 days
  dates.push({ start: sprintStart, end: EXAM_DATE });
  return dates;
}

function weekLabel(start: Date, end: Date): string {
  const days = Math.round((end.getTime() - start.getTime()) / 86400000);
  const weeks = Math.round(days / 7);
  return weeks >= 2 ? `${weeks} weeks` : `${days} days`;
}

/** Static content for each phase — only dates/status are dynamic */
const PHASE_CONTENT = [
  {
    id: 1, phaseNumber: "Phase 1",
    name: "Diagnostic Baseline & Study Architecture",
    subtitle: "Map your exact starting point across all 4 subjects. Build your personalised daily schedule, identify your 3 biggest weak areas, and target what actually gets asked in NEST.",
    subjectFocus: ["Physics", "Chemistry", "Biology", "Mathematics"] as const,
    milestoneGoal: "Complete full diagnostic, score ≥ 40% on each subject, identify top 3 weak chapters per subject",
    tasks: [
      { id: "p1-1", title: "Attempt a timed 2022 NEST Session 1 paper (68 Qs, 180 min, +3/−1) to get real baseline score", type: "mock" as const, targetSection: "mock-tests" },
      { id: "p1-2", title: "Analyse subject-wise hit rate: Biology, Chemistry, Physics, Maths — note every wrong topic", type: "diagnostic" as const, targetSection: "performance" },
      { id: "p1-3", title: "List exactly 3 chapters per subject you got 0–1 correct on — these are your Phase 2 priority topics", type: "diagnostic" as const, targetSection: "performance" },
      { id: "p1-4", title: "Build a daily study timetable: 6–7 hrs/day, each subject rotating every 2 days with PYQ slots", type: "lesson" as const, targetSection: "dashboard" },
      { id: "p1-5", title: "Solve 2025 NEST full paper to see latest pattern shift and question style", type: "pyq" as const, targetSection: "pyqs" },
    ],
    keyTakeawayUpcoming: "📋 Start here: Attempt a real NEST paper under timed conditions before doing anything else.",
    keyTakeawayCurrent: "🔵 In progress: Focus on accurate self-assessment — honesty now saves weeks later.",
    keyTakeawayCompleted: "✅ Baseline pinpointed. You know exactly which chapters cost you marks — the rest is execution.",
  },
  {
    id: 2, phaseNumber: "Phase 2",
    name: "Deep NCERT + NEST-Level Concept Mastery",
    subtitle: "Build exam-level understanding of every high-frequency NEST topic. NEST tests deeply on NCERT Biology, Class 11–12 Physics formulas, Organic Chemistry mechanisms, and Calculus. No shortcuts — genuine understanding only.",
    subjectFocus: ["Biology", "Chemistry", "Physics", "Mathematics"] as const,
    milestoneGoal: "Cover all 4 subjects' NEST-relevant NCERT chapters with concept notes; score >60% on subject-wise practice sets",
    tasks: [
      { id: "p2-1", title: "Biology: NCERT Class 11 (Ch 1–22) + Class 12 (Ch 1–16) — read every line, diagram, and exception", type: "lesson" as const, targetSection: "smart-lessons" },
      { id: "p2-2", title: "Chemistry: Mole concept, Atomic structure, Chemical bonding, Equilibrium, Organic mechanisms (IUPAC + reactions)", type: "lesson" as const, targetSection: "smart-lessons" },
      { id: "p2-3", title: "Physics: Kinematics, NLM, Work-Energy, Gravitation, SHM, Electrostatics, Current Electricity, Optics — derive each key formula", type: "lesson" as const, targetSection: "smart-lessons" },
      { id: "p2-4", title: "Mathematics: Sets/Relations, Functions, Limits, Differentiation, Integration, Matrices, Probability — solve 15 Qs per chapter", type: "practice" as const, targetSection: "practice" },
      { id: "p2-5", title: "After every chapter: solve all NEST PYQs from that chapter (2018–2025) — minimum 5 Qs/topic", type: "pyq" as const, targetSection: "pyqs" },
      { id: "p2-6", title: "Weekly mini-test: 20 Qs per subject (mixed) on Sunday to track retention — target >60%", type: "mock" as const, targetSection: "mock-tests" },
    ],
    keyTakeawayUpcoming: "📚 Ahead: Deep NCERT reading phase — this is where Rank <10 is quietly won.",
    keyTakeawayCurrent: "🔵 Active: Read every line, every diagram, every exception. NEST doesn't skip footnotes.",
    keyTakeawayCompleted: "✅ Strong conceptual foundation built. NEST rewards deep NCERT reading — you've done the work others skip.",
  },
  {
    id: 3, phaseNumber: "Phase 3",
    name: "PYQ Mastery & Weak Area Elimination",
    subtitle: "Solve every single NEST PYQ from 2018–2025 (400+ questions). Analyse every wrong answer at the concept level — not just the answer key. Build accuracy to >80% on Bio and Chem.",
    subjectFocus: ["Biology", "Chemistry", "Physics", "Mathematics"] as const,
    milestoneGoal: "Solve 100% of 2018–2025 NEST PYQs; achieve >80% accuracy in Biology & Chemistry, >70% in Physics & Maths",
    tasks: [
      { id: "p3-1", title: "NEST 2018 full paper → analyse every wrong answer concept-by-concept, not just mark the answer", type: "pyq" as const, targetSection: "pyqs" },
      { id: "p3-2", title: "NEST 2019 full paper → focus on Bio genetics, Chemistry equilibrium, Physics electricity pattern shifts", type: "pyq" as const, targetSection: "pyqs" },
      { id: "p3-3", title: "NEST 2020 S1 + S2 → note that S2 has harder Chemistry — extra time on p-block and coordination", type: "pyq" as const, targetSection: "pyqs" },
      { id: "p3-4", title: "NEST 2022 S1 + S2 → complete CBT mode simulation, map where you lost time vs where you guessed", type: "mock" as const, targetSection: "mock-tests" },
      { id: "p3-5", title: "NEST 2024 S1 + S2 + 2025 → latest pattern; more application-based, graph-reading, assertion-reason Bio Qs", type: "pyq" as const, targetSection: "pyqs" },
      { id: "p3-6", title: "Remake your mistake list → for each wrong answer, reread the NCERT paragraph, solve 3 similar Qs", type: "practice" as const, targetSection: "practice" },
      { id: "p3-7", title: "Target chapters: Plant Kingdom, Molecular Basis of Inheritance, Thermodynamics, Organic Mechanisms — 40 Qs each", type: "practice" as const, targetSection: "practice" },
    ],
    keyTakeawayUpcoming: "📝 Coming up: PYQ phase — 400+ questions, zero excuses. Every wrong answer is a free mark next time.",
    keyTakeawayCurrent: "🔵 Active: Prioritise quality of analysis over speed — every wrong Q is a free mark next time.",
    keyTakeawayCompleted: "✅ PYQ bank cleared. You now know every trick, pattern, and trap NEST has ever set.",
  },
  {
    id: 4, phaseNumber: "Phase 4",
    name: "Full-Length Mock Exam Series (Timed CBT)",
    subtitle: "Simulate the real NEST exam in full 180-minute blocks — same timing, same marking scheme (+3/−1), same CBT interface. 6 full mocks total. Analyse every result to fix time management, guessing strategy, and section ordering.",
    subjectFocus: ["Physics", "Chemistry", "Biology", "Mathematics"] as const,
    milestoneGoal: "Complete 6 timed full-length CBT mocks; improve from baseline score by +25 marks; achieve >75% overall accuracy",
    tasks: [
      { id: "p4-1", title: "Mock 1 (NEST 2023 CBT): Cold attempt, no preparation break. Score target: 120+. Record time per question.", type: "mock" as const, targetSection: "mock-tests" },
      { id: "p4-2", title: "Mock 1 Analysis (2 hrs): Map which subject, which chapter, which question type you lose most marks — fix 1 chapter", type: "diagnostic" as const, targetSection: "performance" },
      { id: "p4-3", title: "Mock 2 (NEST 2024 S1): Apply new strategy — attempt Biology first (fastest scoring), then Chem, then Physics, Maths last", type: "mock" as const, targetSection: "mock-tests" },
      { id: "p4-4", title: "Mock 3 & 4: Focus on negative marking discipline — skip any Q where confidence < 60%, never random guess", type: "mock" as const, targetSection: "mock-tests" },
      { id: "p4-5", title: "Mock 5 & 6: Full speed runs — target completing 60/68 Qs in 160 min, 20 min review buffer at end", type: "mock" as const, targetSection: "mock-tests" },
      { id: "p4-6", title: "Build personal 'skip list': the 5 question types you will always skip first to save time", type: "practice" as const, targetSection: "practice" },
    ],
    keyTakeawayUpcoming: "⏱ Upcoming: 6 real mocks will do more than 100 hours of passive revision. Treat each like the real exam.",
    keyTakeawayCurrent: "🔵 Active: After each mock, spend 2 hours on analysis — not more practice.",
    keyTakeawayCompleted: "✅ Mock series done. Time allocation and negative marking strategy locked in.",
  },
  {
    id: 5, phaseNumber: "Phase 5",
    name: "Rapid Revision, Formula Recall & Concept Reinforcement",
    subtitle: "Compress everything you know into quick-access memory. Make tight one-page summaries for each high-yield chapter. Drill formula recall daily. Re-attempt your personal mistake log one final time. No new topics — only sharpen what you know.",
    subjectFocus: ["Biology", "Chemistry", "Physics", "Mathematics"] as const,
    milestoneGoal: "Complete 4-subject one-page summary sheets; achieve >85% on 30-question chapter-wise timed tests; clear mistake log",
    tasks: [
      { id: "p5-1", title: "Biology: 1-page summary per chapter (diagrams, exceptions, NCERT tables) for top 12 high-frequency chapters", type: "revision" as const, targetSection: "smart-lessons" },
      { id: "p5-2", title: "Chemistry: Formula sheet — reaction conditions, mechanisms, reagents for all Organic + key inorganic reactions", type: "revision" as const, targetSection: "smart-lessons" },
      { id: "p5-3", title: "Physics: Derivation recall — write out 20 key formulae from memory every morning for 2 weeks straight", type: "revision" as const, targetSection: "smart-lessons" },
      { id: "p5-4", title: "Mathematics: Solve 15 integration and 10 probability questions daily for 2 weeks — clock each one", type: "practice" as const, targetSection: "practice" },
      { id: "p5-5", title: "Reopen your Phase 3 mistake list — reattempt every question you got wrong in PYQs. Target 100% on second attempt.", type: "revision" as const, targetSection: "weak-areas" },
      { id: "p5-6", title: "2 timed sectional tests per week: 17 Qs per subject, 45 min each — target >85% accuracy on each", type: "mock" as const, targetSection: "mock-tests" },
    ],
    keyTakeawayUpcoming: "📖 Upcoming: Revision is active recall, not re-reading. Flashcards, write from memory, timed drills only.",
    keyTakeawayCurrent: "🔵 Active: Revision is not re-reading — it's active recall. Write formulae from memory daily.",
    keyTakeawayCompleted: "✅ Revision complete. Everything important is in sharp, accessible memory.",
  },
  {
    id: 6, phaseNumber: "Phase 6",
    name: "Exam Sprint: Final 7 Days Before June 6",
    subtitle: "Nothing new. Protect your mental energy. Eat, sleep, and keep your mind sharp. Light revision only — one chapter per day maximum. Arrive at the centre calm, confident, and prepared.",
    subjectFocus: ["Biology", "Chemistry", "Physics", "Mathematics"] as const,
    milestoneGoal: "Arrive at exam with full mental energy, sharp recall, and zero anxiety — strategy locked and ready",
    tasks: [
      { id: "p6-1", title: "Day −7 to −4: Light daily revision — one subject per day, only from summary sheets (no heavy problem-solving)", type: "revision" as const, targetSection: "smart-lessons" },
      { id: "p6-2", title: "Day −3: Final short mock — 30 Qs, 45 min, mixed subjects. Don't over-analyse. Just check your speed is intact.", type: "mock" as const, targetSection: "mock-tests" },
      { id: "p6-3", title: "Day −2: Rest day. No studying. Walk, sleep 8 hrs, eat well. Mental recovery is performance.", type: "revision" as const, targetSection: "dashboard" },
      { id: "p6-4", title: "Day −1 (June 5): Skim biology diagrams + Chemistry reaction conditions only. Pack documents, reach venue by 8:45 AM.", type: "revision" as const, targetSection: "dashboard" },
      { id: "p6-5", title: "June 6 — NEST 2027: Attempt Biology first (17 Qs, ~30 min). Then Chemistry. Physics next. Maths last. Skip and return. Never guess blind.", type: "mock" as const, targetSection: "mock-tests" },
    ],
    keyTakeawayUpcoming: "🎯 Final sprint: The exam is won in the 280+ days before it. Stay disciplined — June 6 is yours.",
    keyTakeawayCurrent: "🔵 Sprint mode: Only light revision. Sleep 8 hrs. Your brain needs recovery to perform.",
    keyTakeawayCompleted: "✅ NEST 2027 complete. You gave it everything.",
  },
] as const;


export function RoadmapView({
  roadmap,
  onBackToDashboard,
  onNavigateToSection,
}: RoadmapViewProps) {
  const [activeSubjectFilter, setActiveSubjectFilter] = useState<string>("All");

  // ── Read or create signup date from localStorage ──────────────────────────
  const [signupDate, setSignupDate] = useState<Date>(() => new Date());

  useEffect(() => {
    const STORAGE_KEY = "nest_smartprep_signup_date";
    let stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      stored = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, stored);
    }
    setSignupDate(new Date(stored));
  }, []);

  // ── Build dynamic phase schedule ──────────────────────────────────────────
  const detailedStages = useMemo<DetailedStage[]>(() => {
    const today = new Date();
    const phaseDates = buildPhaseDates(signupDate);

    return PHASE_CONTENT.map((content, i) => {
      const { start, end } = phaseDates[i];
      const { status, progressPercent } = deriveStatus(today, start, end);
      const label = i < 5 ? weekLabel(start, end) : "7 days";
      const suffix =
        status === "completed" ? "COMPLETED" :
        status === "current"   ? "ACTIVE" :
                                 "UPCOMING";
      const timeframe = fmtRange(start, end, suffix + ` · ${label}`);

      const keyTakeaway =
        status === "completed" ? content.keyTakeawayCompleted :
        status === "current"   ? content.keyTakeawayCurrent :
                                 content.keyTakeawayUpcoming;

      return {
        id: content.id,
        phaseNumber: content.phaseNumber,
        name: content.name,
        subtitle: content.subtitle,
        status,
        timeframe,
        progressPercent,
        subjectFocus: [...content.subjectFocus],
        milestoneGoal: content.milestoneGoal,
        tasks: content.tasks.map((t) => ({ ...t, completed: status === "completed" })),
        keyTakeaway,
      };
    });
  }, [signupDate]);

  // ── Auto-expand the active (current) phase, fall back to phase 1 ──────────
  const defaultExpand = useMemo(() => {
    const cur = detailedStages.find((s) => s.status === "current");
    return cur ? cur.id : 1;
  }, [detailedStages]);

  const [expandedStageId, setExpandedStageId] = useState<number>(defaultExpand);

  useEffect(() => {
    setExpandedStageId(defaultExpand);
  }, [defaultExpand]);

  const toggleStage = (id: number) => {
    setExpandedStageId(expandedStageId === id ? 0 : id);
  };

  // ── Countdown ─────────────────────────────────────────────────────────────
  const now = new Date();
  const diffTime = EXAM_DATE.getTime() - now.getTime();
  const daysToExam = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-indigo-50 text-[#4F46E5] border border-indigo-100">
                <Compass className="h-4 w-4" />
              </span>
              <h1 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                NEST 2027 Preparation Strategic Roadmap
              </h1>
              <Badge variant="outline" className="text-[10px] bg-indigo-50 text-[#4F46E5] border-indigo-100/80 font-extrabold px-2 py-0.5 rounded-md">
                Exam: 6 June 2027
              </Badge>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Customized 6-phase milestone journey designed to maximize your NEST score and NISER / CEBS merit rank.
            </p>
          </div>

          <Button
            size="sm"
            onClick={onBackToDashboard}
            variant="outline"
            className="w-full sm:w-auto h-8 bg-white border-gray-200/80 hover:bg-gray-50 text-xs font-bold text-gray-700 shadow-2xs rounded-xl self-start sm:self-center shrink-0"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Dashboard
          </Button>
        </div>

        {/* 4 KPI Callout Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100/80 space-y-0.5">
            <span className="text-[10px] font-extrabold text-indigo-800 uppercase tracking-wider block">
              Overall Completion
            </span>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-[#4F46E5]">{roadmap.overallProgress}%</span>
              <CheckCircle2 className="h-4 w-4 text-indigo-600 opacity-80" />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100/80 space-y-0.5">
            <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider block">
              Current Active Phase
            </span>
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-emerald-900">Phase 3 of 6</span>
              <Zap className="h-4 w-4 text-emerald-600 opacity-80" />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-100/80 space-y-0.5">
            <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider block">
              Days to Exam (6 June 2027)
            </span>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-amber-900">{daysToExam} Days</span>
              <Calendar className="h-4 w-4 text-amber-600 opacity-80" />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-100/80 space-y-0.5">
            <span className="text-[10px] font-extrabold text-purple-800 uppercase tracking-wider block">
              Target NISER Rank
            </span>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-purple-900">&lt; 10 AIR</span>
              <Award className="h-4 w-4 text-purple-600 opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Stepper Visual Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2">
          <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-[#4F46E5]" /> 6-Phase Milestone Journey Overview
          </span>
          <span className="text-xs font-bold text-indigo-600">
            {(() => {
              const cur = detailedStages.find((s) => s.status === "current");
              return cur
                ? `${cur.phaseNumber} Active · ${cur.name}`
                : "All phases scheduled to June 6, 2027";
            })()}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {detailedStages.map((stg) => {
            const isCompleted = stg.status === "completed";
            const isCurrent = stg.status === "current";

            return (
              <button suppressHydrationWarning
                key={stg.id}
                onClick={() => setExpandedStageId(stg.id)}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between space-y-2 text-xs transition-all ${
                  expandedStageId === stg.id
                    ? "ring-2 ring-[#4F46E5] bg-indigo-50/90 border-indigo-200 shadow-2xs"
                    : isCurrent
                    ? "bg-indigo-50/50 border-indigo-200/80 hover:bg-indigo-50"
                    : isCompleted
                    ? "bg-emerald-50/40 border-emerald-100 hover:bg-emerald-50/80"
                    : "bg-gray-50/50 border-gray-100 hover:bg-gray-100/60 opacity-70"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-gray-400">{stg.phaseNumber}</span>
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  ) : isCurrent ? (
                    <span className="h-2 w-2 rounded-full bg-[#4F46E5] animate-ping" />
                  ) : (
                    <Circle className="h-3.5 w-3.5 text-gray-300" />
                  )}
                </div>

                <div>
                  <span className={`font-extrabold block text-xs line-clamp-1 ${isCurrent ? "text-[#4F46E5]" : "text-gray-900"}`}>
                    {stg.name}
                  </span>
                  <span className="text-[9px] text-gray-500 font-semibold capitalize block mt-0.5">
                    {stg.status === "current" ? "Active" : stg.status}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Phase Cards Accordion */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900">
            Detailed Phase Objectives & Action Checklist
          </h2>
          <p className="text-[11px] text-gray-500 font-medium">
            Click any phase to expand tasks and access modules.
          </p>
        </div>

        {detailedStages.map((stage) => {
          const isExpanded = expandedStageId === stage.id;
          const isCompleted = stage.status === "completed";
          const isCurrent = stage.status === "current";

          return (
            <div
              key={stage.id}
              className={`bg-white rounded-2xl border transition-all shadow-2xs overflow-hidden ${
                isCurrent
                  ? "border-indigo-200 ring-1 ring-indigo-500/10"
                  : isCompleted
                  ? "border-gray-200/90"
                  : "border-gray-200/70 opacity-90"
              }`}
            >
              {/* Header Bar */}
              <div
                onClick={() => toggleStage(stage.id)}
                className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-gray-50/80 transition-colors ${
                  isExpanded ? "border-b border-gray-100 bg-gray-50/40" : ""
                }`}
              >
                <div className="flex items-start sm:items-center gap-3">
                  <span
                    className={`p-2 rounded-xl text-xs font-black shrink-0 ${
                      isCompleted
                        ? "bg-emerald-100 text-emerald-800"
                        : isCurrent
                        ? "bg-[#4F46E5] text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    0{stage.id}
                  </span>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-xs font-extrabold text-[#4F46E5]">
                        {stage.phaseNumber}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs font-bold text-gray-500">
                        {stage.timeframe}
                      </span>
                      {isCurrent && (
                        <Badge variant="outline" className="text-[9px] bg-indigo-50 text-[#4F46E5] border-indigo-200 font-black px-2 py-0.2">
                          ACTIVE PHASE
                        </Badge>
                      )}
                      {isCompleted && (
                        <Badge variant="outline" className="text-[9px] bg-emerald-50 text-emerald-700 border-emerald-200 font-bold px-2 py-0.2">
                          COMPLETED
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-gray-900">
                      {stage.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-gray-900">
                      {stage.progressPercent}%
                    </span>
                    <span className="text-[10px] text-gray-400 block font-medium">
                      Phase Progress
                    </span>
                  </div>

                  <button suppressHydrationWarning className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Expanded Body */}
              {isExpanded && (
                <div className="p-5 sm:p-6 space-y-5 bg-white">
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    {stage.subtitle}
                  </p>

                  {/* Milestone Goal Box */}
                  <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-[#4F46E5] shrink-0" />
                      <span className="font-extrabold text-indigo-950">
                        Milestone Objective: {stage.milestoneGoal}
                      </span>
                    </div>
                  </div>

                  {/* Tasks List */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">
                      Phase Action Items & Modules
                    </span>

                    <div className="space-y-2">
                      {stage.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="p-3 rounded-xl border border-gray-100 bg-gray-50/50 flex items-center justify-between gap-3 text-xs hover:border-gray-200 transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            {task.completed ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                            ) : (
                              <Circle className="h-4 w-4 text-gray-300 shrink-0" />
                            )}
                            <span className={`font-semibold ${task.completed ? "text-gray-500 line-through" : "text-gray-900"}`}>
                              {task.title}
                            </span>
                          </div>

                          {task.targetSection && (
                            <Button
                              onClick={() => onNavigateToSection && onNavigateToSection(task.targetSection!)}
                              variant="ghost"
                              size="sm"
                              className="h-7 text-[11px] font-bold text-[#4F46E5] hover:bg-indigo-50 hover:text-indigo-700 rounded-lg px-2.5 shrink-0"
                            >
                              Go to Module →
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Takeaway / Status Footer */}
                  <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-gray-600 font-medium">
                      <Brain className="h-4 w-4 text-indigo-600 shrink-0" />
                      <span>{stage.keyTakeaway}</span>
                    </div>

                    {isCurrent && (
                      <Button
                        onClick={() => {
                          const firstTask = stage.tasks.find((t) => !t.completed && t.targetSection);
                          onNavigateToSection && onNavigateToSection(firstTask?.targetSection ?? "smart-lessons");
                        }}
                        className="h-8 bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-2xs shrink-0"
                      >
                        Continue {stage.phaseNumber} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
