"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { PreparationProgress as PreparationProgressType } from "@/lib/types/dashboard";

interface PreparationProgressProps {
  progress: PreparationProgressType;
}

export function PreparationProgress({ progress }: PreparationProgressProps) {
  const items = [
    { label: "Concept Mastery", value: progress.conceptMastery, color: "bg-[#4F46E5]" },
    { label: "PYQ Coverage", value: progress.pyqCoverage, color: "bg-indigo-600" },
    { label: "Practice Mastery", value: progress.practiceMastery, color: "bg-emerald-600" },
    { label: "Mock Preparation", value: progress.mockPrep, color: "bg-amber-500" },
    { label: "Revision Progress", value: progress.revisionProgress, color: "bg-sky-600" },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-1 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-bold text-gray-900">
            Preparation Progress
          </h3>
          <p className="text-[11px] text-gray-500 font-medium">
            Comprehensive readiness across learning stages.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xl font-black text-gray-900">{progress.overallProgress}%</span>
          <span className="text-[10px] text-gray-400 block uppercase font-extrabold">Overall Complete</span>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700">
              <span>{item.label}</span>
              <span className="font-mono text-gray-900">{item.value}%</span>
            </div>

            <Progress value={item.value} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
