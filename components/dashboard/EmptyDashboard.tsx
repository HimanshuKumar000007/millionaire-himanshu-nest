"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Award, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

interface EmptyDashboardProps {
  onStartAssessment: () => void;
}

export function EmptyDashboard({ onStartAssessment }: EmptyDashboardProps) {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6">
      {/* Hero Welcome Card */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-8 sm:p-12 text-center space-y-6 shadow-md shadow-gray-200/40">
        <div className="h-16 w-16 bg-indigo-50 text-[#4F46E5] rounded-2xl mx-auto flex items-center justify-center ring-8 ring-indigo-50/50">
          <Award className="h-8 w-8" />
        </div>

        <div className="space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">
            Your NEST preparation profile starts here.
          </h2>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            Complete the free 10-minute diagnostic assessment to unlock your readiness score, subject performance metrics, and data-driven learning roadmap.
          </p>
        </div>

        <div>
          <Button
            onClick={onStartAssessment}
            size="lg"
            className="bg-[#4F46E5] hover:bg-[#3730A3] text-white font-black text-sm px-8 py-3 rounded-xl shadow-lg shadow-indigo-500/20"
          >
            Start Free Assessment →
          </Button>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 font-semibold border-t border-gray-100 max-w-md mx-auto">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> NISER & CEBS Exam Pattern
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Instant Readiness Index
          </span>
        </div>
      </div>

      {/* Empty States Skeleton Preview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60 pointer-events-none">
        <div className="bg-white p-6 rounded-2xl border border-dashed border-gray-300 space-y-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">NEST Readiness</span>
          <div className="text-3xl font-black text-gray-300">— / 100</div>
          <p className="text-xs text-gray-400">Complete assessment to generate score</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-dashed border-gray-300 space-y-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Subject Performance</span>
          <div className="text-3xl font-black text-gray-300">— %</div>
          <p className="text-xs text-gray-400">Complete assessment to analyze subjects</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-dashed border-gray-300 space-y-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Weak Areas</span>
          <div className="text-base font-bold text-gray-300">No diagnostic data yet</div>
          <p className="text-xs text-gray-400">Unlocked after diagnostic assessment</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-dashed border-gray-300 space-y-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Recommendations</span>
          <div className="text-base font-bold text-gray-300">Custom recommendations locked</div>
          <p className="text-xs text-gray-400">Requires diagnostic completion</p>
        </div>
      </div>
    </div>
  );
}
