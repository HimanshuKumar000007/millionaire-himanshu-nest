"use client";

import * as React from "react";
import { Play, FileText, Target, RotateCcw } from "lucide-react";

interface PreparationProgress {
  overallProgress: number;
  conceptMastery: number;
  pyqCoverage: number;
  practiceMastery: number;
  mockPrep: number;
  revisionProgress: number;
}

interface YourProgressCardProps {
  progress?: PreparationProgress;
}

export function YourProgressCard({ progress }: YourProgressCardProps) {
  const conceptVal = progress?.conceptMastery ?? 0;
  const pyqVal = progress?.pyqCoverage ?? 0;
  const mockVal = progress?.mockPrep ?? 0;
  const revVal = progress?.revisionProgress ?? 0;

  const items = [
    {
      id: "concept-mastery",
      label: "Concept Mastery",
      value: conceptVal,
      status: conceptVal >= 70
        ? "Good Progress"
        : conceptVal > 0
        ? "Keep Studying"
        : "Start Smart Lessons",
      bgColor: "bg-[#6366F1]",
      barColor: "bg-[#6366F1]",
      icon: Play,
    },
    {
      id: "pyq-coverage",
      label: "PYQ Coverage",
      value: pyqVal,
      status: pyqVal >= 50
        ? "Keep Practicing"
        : pyqVal > 0
        ? "In Progress"
        : "Start High-Yield PYQs",
      bgColor: "bg-[#10B981]",
      barColor: "bg-[#10B981]",
      icon: FileText,
    },
    {
      id: "mock-tests",
      label: "Mock Tests",
      value: mockVal,
      status: mockVal >= 60
        ? "Exam Ready"
        : mockVal > 0
        ? "Review Solutions"
        : "Take NEST Mock 01",
      bgColor: "bg-[#EF4444]",
      barColor: "bg-[#EF4444]",
      icon: Target,
    },
    {
      id: "revision",
      label: "Revision",
      value: revVal,
      status: revVal >= 50
        ? "Stay Consistent"
        : revVal > 0
        ? "Revising Concepts"
        : "Bookmark & Revise",
      bgColor: "bg-[#3B82F6]",
      barColor: "bg-[#3B82F6]",
      icon: RotateCcw,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs space-y-4">
      <h3 className="text-sm font-bold text-gray-900">Your Progress</h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bg-gray-50/60 rounded-xl p-3.5 border border-gray-100 space-y-3"
            >
              <div className="flex items-center gap-2">
                <div className={`h-7 w-7 rounded-lg ${item.bgColor} text-white flex items-center justify-center shrink-0`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-bold text-gray-800 truncate">
                  {item.label}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline justify-end">
                  <span className="text-sm font-black text-gray-900">
                    {item.value}%
                  </span>
                </div>
                {/* Track & Bar */}
                <div className="h-1.5 w-full bg-gray-200/80 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.barColor} rounded-full transition-all duration-500`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>

              <p className="text-[11px] font-medium text-gray-500">
                {item.status}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
