"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, ArrowRight, ShieldCheck, AlertCircle, Award, Target, Zap } from "lucide-react";
import { NestDashboardSummary } from "@/lib/types/dashboard";

interface ReadinessOverviewProps {
  data: NestDashboardSummary;
  onViewDetails?: () => void;
}

export function ReadinessOverview({ data, onViewDetails }: ReadinessOverviewProps) {
  const { readinessScore, status, scoreTrend, subjects, strongestSubject, focusSubject } = data;

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-lg shadow-gray-200/40 p-6 sm:p-8 space-y-6">
      {/* Top Banner Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
        
        {/* Readiness Main Index Score */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              NEST Readiness
            </span>
            <Badge variant="success" className="text-[10px] px-2 py-0.5">
              {status}
            </Badge>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl sm:text-5xl font-black text-[#111827] tracking-tight">
              {readinessScore}
            </span>
            <span className="text-lg font-bold text-gray-400">/ 100</span>

            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>+{scoreTrend} pts</span>
            </div>
          </div>

          <p className="text-xs text-[#6B7280] font-normal max-w-md">
            Calculated from your recent diagnostic, practice PYQs, and mock performance across all 4 subjects.
          </p>
        </div>

        {/* Strongest & Focus Summary Callout */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 bg-slate-50/80 p-4 rounded-xl border border-gray-200/60 md:w-80 shrink-0">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
              Strongest Subject
            </span>
            <span className="text-sm font-black text-gray-900 block truncate">
              {strongestSubject}
            </span>
          </div>

          <div className="space-y-1 border-l border-gray-200 pl-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
              Needs Attention
            </span>
            <span className="text-sm font-black text-gray-900 block truncate">
              {focusSubject}
            </span>
          </div>
        </div>

      </div>

      {/* Readiness Breakdown across Subjects */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
          Subject Mastery Index
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {subjects.map((sub) => (
            <div
              key={sub.subject}
              className="p-4 rounded-xl border border-gray-200/80 bg-[#F7F8FC]/50 space-y-2 hover:border-indigo-200 transition-colors"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-[#111827] flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#4F46E5]" />
                  {sub.subject}
                </span>
                <span className="font-mono font-black text-gray-900">
                  {sub.score}%
                </span>
              </div>

              <Progress value={sub.score} className="h-2" />

              <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium pt-0.5">
                <span>{sub.questionsAttempted} Solved</span>
                <span className={sub.trend >= 0 ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>
                  {sub.trend >= 0 ? `↑ ${sub.trend}%` : `↓ ${Math.abs(sub.trend)}%`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="pt-2 flex items-center justify-between">
        <span className="text-xs text-gray-500 hidden sm:inline">
          Last diagnostic updated 2 hours ago
        </span>
        <Button
          onClick={onViewDetails}
          variant="outline"
          size="sm"
          className="w-full sm:w-auto min-h-[44px] text-xs font-bold text-[#4F46E5] border-indigo-200 hover:bg-indigo-50"
        >
          View Detailed Performance <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
