"use client";

import * as React from "react";
import { NestDashboardSummary } from "@/lib/types/dashboard";
import { PenTool, FileCode2, Award, Target, LineChart } from "lucide-react";

interface QuickStatsProps {
  stats: NestDashboardSummary["quickStats"];
}

export function QuickStats({ stats }: QuickStatsProps) {
  const items = [
    {
      label:   "Questions Solved",
      value:   stats.questionsSolved.toLocaleString(),
      icon:    PenTool,
      subtext: stats.questionsSolved > 0 ? "Across 4 subjects" : "Start practicing to track this",
    },
    {
      label:   "PYQs Completed",
      value:   stats.pyqsCompleted.toLocaleString(),
      icon:    FileCode2,
      subtext: stats.pyqsCompleted > 0
        ? `${stats.pyqsCompleted} past paper question${stats.pyqsCompleted !== 1 ? "s" : ""} solved`
        : "No PYQs attempted yet",
    },
    {
      label:   "Mock Tests",
      value:   `${stats.mocksCompleted} Mock${stats.mocksCompleted !== 1 ? "s" : ""}`,
      icon:    Award,
      subtext: stats.mocksCompleted > 0 ? "Full length diagnostic" : "No mocks taken yet",
    },
    {
      label:   "Average Accuracy",
      value:   stats.averageAccuracy > 0 ? `${stats.averageAccuracy}%` : "—",
      icon:    Target,
      subtext: stats.averageAccuracy > 0 ? "High-yield consistency" : "Solve questions to see accuracy",
    },
    {
      label:   "Study Progress",
      value:   `${stats.studyProgress}%`,
      icon:    LineChart,
      subtext: stats.studyProgress > 0 ? "Readiness score" : "Begin studying to track progress",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className={`bg-white p-4 rounded-xl border border-gray-200/90 shadow-xs space-y-1 hover:border-indigo-200 transition-colors ${
              idx === 4 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                {item.label}
              </span>
              <Icon className="h-4 w-4 text-[#4F46E5]" />
            </div>

            <div className="text-xl sm:text-2xl font-black text-[#111827] tracking-tight">
              {item.value}
            </div>

            <div className="text-[10px] text-gray-400 font-medium">
              {item.subtext}
            </div>
          </div>
        );
      })}
    </div>
  );
}
