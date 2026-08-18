"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { SyllabusCoverage as SyllabusCoverageType } from "@/lib/types/dashboard";

interface SyllabusCoverageProps {
  coverage: SyllabusCoverageType[];
  onSelectSubject?: (subject: string) => void;
}

export function SyllabusCoverage({ coverage, onSelectSubject }: SyllabusCoverageProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-1 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-bold text-gray-900">
            Syllabus Coverage
          </h3>
          <p className="text-[11px] text-gray-500 font-medium">
            Academic completion rate for NEST 2027 syllabus.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {coverage.map((item) => (
          <div
            key={item.subject}
            className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/60 space-y-2 hover:border-gray-200/80 transition-colors"
          >
            <div className="flex items-center justify-between text-xs font-bold text-gray-900">
              <span>{item.subject}</span>
              <span className="font-mono text-[#4F46E5]">{item.completedTopics} / {item.totalTopics} Topics ({item.percentage}%)</span>
            </div>

            <Progress value={item.percentage} className="h-2" />

            <div className="flex items-center justify-end">
              <button suppressHydrationWarning
                onClick={() => onSelectSubject && onSelectSubject(item.subject)}
                className="text-[11px] font-bold text-[#4F46E5] hover:underline"
              >
                View Topics →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
