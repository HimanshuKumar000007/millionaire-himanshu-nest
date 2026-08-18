"use client";

import React, { useState, useMemo } from "react";
import {
  BarChart2,
  Award,
  Clock,
  ArrowLeft,
  CheckCircle2,
  Flame,
  ChevronRight,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PerformancePoint, SubjectScore, WeakArea, PreparationProgress, MockPerformanceSummary } from "@/lib/types/dashboard";
import { PerformanceTrend } from "@/components/dashboard/PerformanceTrend";
import { SubjectPerformance } from "@/components/dashboard/SubjectPerformance";
import { WeakAreas } from "@/components/dashboard/WeakAreas";

interface PerformanceViewProps {
  performanceTrend: PerformancePoint[];
  subjects: SubjectScore[];
  weakAreas: WeakArea[];
  preparationProgress?: PreparationProgress;
  mockPerformance?: MockPerformanceSummary;
  onBackToDashboard: () => void;
  onNavigateToSection?: (section: string) => void;
}

export function PerformanceView({
  performanceTrend,
  subjects,
  weakAreas,
  preparationProgress,
  mockPerformance,
  onBackToDashboard,
  onNavigateToSection,
}: PerformanceViewProps) {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>("All");

  const filteredSubjects = subjects.filter((s) =>
    selectedSubjectFilter === "All" ? true : s.subject === selectedSubjectFilter
  );

  // ── Real KPIs computed from orchestrator data ─────────────────────────────
  const kpis = useMemo(() => {
    // Overall accuracy: weighted average across subjects that have data
    const activeSubjects = subjects.filter((s) => s.questionsAttempted > 0);
    const overallAccuracy = activeSubjects.length > 0
      ? Math.round(activeSubjects.reduce((sum, s) => sum + s.accuracy, 0) / activeSubjects.length)
      : 0;

    // Total questions answered across all subjects
    const totalQs = subjects.reduce((sum, s) => sum + s.questionsAttempted, 0);

    // Estimated percentile from performance trend (last mock) or readiness
    const lastPoint = performanceTrend[performanceTrend.length - 1];
    const estPercentile = lastPoint
      ? Math.min(99, Math.max(1, Math.round(30 + (lastPoint.readiness / 100) * 65)))
      : 0;

    // High-yield mastery = conceptMastery from preparationProgress, or subject score avg
    const mastery = preparationProgress?.conceptMastery
      ?? (subjects.length > 0 ? Math.round(subjects.reduce((s, sub) => s + sub.score, 0) / subjects.length) : 0);

    // Average mock score
    const avgMockScore = mockPerformance?.averageScore ?? 0;
    const totalMocksDone = mockPerformance?.completedMocks ?? 0;

    return { overallAccuracy, totalQs, estPercentile, mastery, avgMockScore, totalMocksDone };
  }, [subjects, performanceTrend, preparationProgress, mockPerformance]);

  const hasData = subjects.some((s) => s.questionsAttempted > 0) || performanceTrend.length > 1;

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-indigo-50 text-[#4F46E5] border border-indigo-100">
                <BarChart2 className="h-4 w-4" />
              </span>
              <h1 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                Diagnostic Performance & Accuracy Analytics
              </h1>
              <Badge variant="outline" className="text-[10px] bg-indigo-50 text-[#4F46E5] border-indigo-100/80 font-extrabold px-2 py-0.5 rounded-md">
                NEST Readiness Metrics
              </Badge>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Comprehensive analytics across accuracy, problem-solving speed, subject mastery, and diagnostic weak areas.
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

        {/* 4 KPI Callout Cards — all values from real orchestrator data */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-gray-50/60 border border-gray-100 space-y-0.5">
            <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider block">
              Overall Accuracy
            </span>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-gray-900">
                {hasData ? `${kpis.overallAccuracy}%` : "—"}
              </span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600 opacity-80" />
            </div>
            <span className="text-[9px] text-gray-400 font-medium">
              {hasData ? `${kpis.totalQs} Qs answered` : "No attempts yet"}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100/80 space-y-0.5">
            <span className="text-[10px] font-extrabold text-indigo-800 uppercase tracking-wider block">
              Mocks Completed
            </span>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-[#4F46E5]">
                {kpis.totalMocksDone > 0 ? `${kpis.totalMocksDone} Done` : "—"}
              </span>
              <Clock className="h-4 w-4 text-indigo-600 opacity-80" />
            </div>
            <span className="text-[9px] text-gray-400 font-medium">
              {kpis.avgMockScore > 0 ? `Avg score: ${kpis.avgMockScore}` : "Target: 6 mocks"}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-100/80 space-y-0.5">
            <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider block">
              Est. Percentile Rank
            </span>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-amber-900">
                {hasData ? `${kpis.estPercentile}th %ile` : "—"}
              </span>
              <Award className="h-4 w-4 text-amber-600 opacity-80" />
            </div>
            <span className="text-[9px] text-gray-400 font-medium">
              {hasData ? "Based on readiness score" : "Attempt a mock to see"}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100/80 space-y-0.5">
            <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider block">
              Concept Mastery
            </span>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-emerald-900">
                {kpis.mastery > 0 ? `${kpis.mastery}%` : "—"}
              </span>
              <Flame className="h-4 w-4 text-emerald-600 opacity-80" />
            </div>
            <span className="text-[9px] text-gray-400 font-medium">
              {kpis.mastery > 0 ? "From lessons completed" : "Complete lessons to track"}
            </span>
          </div>
        </div>

        {/* Empty state nudge when no data */}
        {!hasData && (
          <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100 text-xs text-amber-800 font-medium flex items-center gap-2">
            <Target className="h-4 w-4 shrink-0" />
            <span>Your real performance data will appear here after you attempt mocks, solve PYQs, or complete lessons. Start now to unlock your analytics.</span>
          </div>
        )}
      </div>

      {/* Main Performance Trend Graph */}
      <PerformanceTrend data={performanceTrend} />

      {/* Subject Performance Section */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Subject-Wise Readiness Breakdown
            </h3>
            <p className="text-[11px] text-gray-500 font-medium">
              Diagnostic mastery scores and progress trends for all 4 NISER subject areas.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-gray-100/80 p-1 rounded-xl shrink-0">
            {["All", "Physics", "Chemistry", "Biology", "Mathematics"].map((sub) => (
              <button suppressHydrationWarning
                key={sub}
                onClick={() => setSelectedSubjectFilter(sub)}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                  selectedSubjectFilter === sub
                    ? "bg-white text-[#4F46E5] shadow-2xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        <SubjectPerformance subjects={filteredSubjects} />
      </div>

      {/* Speed & Time Management Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Areas to Improve / Weak Areas */}
        <WeakAreas
          weakAreas={weakAreas}
          onActionClick={(area) => {
            if (onNavigateToSection) {
              if (area.actionType === "lesson") onNavigateToSection("smart-lessons");
              else if (area.actionType === "pyq") onNavigateToSection("pyqs");
              else onNavigateToSection("mock-tests");
            }
          }}
        />

        {/* Speed & Time Benchmark Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="pb-1 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-gray-900">
                  Speed & Time Allocation Benchmark
                </h3>
                <Badge variant="outline" className="text-[10px] bg-indigo-50 text-[#4F46E5] border-indigo-100 font-extrabold px-2 py-0.5 rounded-md">
                  Target: 2.5 min/Q
                </Badge>
              </div>
              <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                Recommended speed allocation based on NEST 3-hour exam pacing.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <div className="p-3 rounded-xl bg-gray-50/70 border border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-extrabold text-gray-900 block">Physics</span>
                  <span className="text-[10px] text-gray-500">Optics & Mechanics</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-extrabold text-[#4F46E5]">2.2 min / Q</span>
                  <span className="text-[10px] text-emerald-600 block font-bold">Optimal</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50/70 border border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-extrabold text-gray-900 block">Chemistry</span>
                  <span className="text-[10px] text-gray-500">Organic & Physical</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-extrabold text-[#4F46E5]">1.5 min / Q</span>
                  <span className="text-[10px] text-emerald-600 block font-bold">Fast Pace</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50/70 border border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-extrabold text-gray-900 block">Biology</span>
                  <span className="text-[10px] text-gray-500">Cell Biology & Genetics</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-extrabold text-[#4F46E5]">1.2 min / Q</span>
                  <span className="text-[10px] text-emerald-600 block font-bold">Fast Pace</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50/70 border border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-extrabold text-gray-900 block">Mathematics</span>
                  <span className="text-[10px] text-gray-500">Calculus & 3D Geometry</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-extrabold text-amber-700">2.6 min / Q</span>
                  <span className="text-[10px] text-amber-600 block font-bold">Needs Speed Practice</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={() => onNavigateToSection && onNavigateToSection("practice")}
            className="w-full h-8 bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-all mt-2"
          >
            Practice Speed Drills <ChevronRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
