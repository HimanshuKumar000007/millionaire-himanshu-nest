"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { MockPerformanceSummary } from "@/lib/types/dashboard";

interface MockPerformanceProps {
  mockData?: MockPerformanceSummary;
  onViewAll?: () => void;
}

export function MockPerformance({ mockData, onViewAll }: MockPerformanceProps) {
  const avgScore = mockData?.averageScore || 0;
  const bestScore = mockData?.highestScore || mockData?.bestScore || 0;
  const avgAccuracy = mockData?.averageAccuracy || 78;
  const attemptRate = mockData?.attemptRate || 92;
  const history = mockData?.history || [];

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-extrabold text-gray-900">
            Mock Test Performance
          </h3>
          <p className="text-[11px] text-gray-500 font-medium">
            Exam-simulation accuracy, timing efficiency, and chronological progress.
          </p>
        </div>

        <Button
          onClick={onViewAll}
          variant="outline"
          size="sm"
          className="w-full sm:w-auto h-8 text-xs font-bold text-[#4F46E5] border-gray-200/80 hover:bg-indigo-50/50 rounded-xl shadow-2xs"
        >
          View All Mock Results <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Metric Callouts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-gray-50/60 border border-gray-100 space-y-0.5">
          <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider block">Average Score</span>
          <span className="text-lg font-black text-gray-900 font-mono">{avgScore} / 240</span>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100/80 space-y-0.5">
          <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider block">Best Score</span>
          <span className="text-lg font-black text-emerald-900 font-mono">{bestScore} / 240</span>
        </div>

        <div className="p-3.5 rounded-xl bg-gray-50/60 border border-gray-100 space-y-0.5">
          <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider block">Average Accuracy</span>
          <span className="text-lg font-black text-gray-900 font-mono">{avgAccuracy}%</span>
        </div>

        <div className="p-3.5 rounded-xl bg-gray-50/60 border border-gray-100 space-y-0.5">
          <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider block">Attempt Rate</span>
          <span className="text-lg font-black text-gray-900 font-mono">{attemptRate}%</span>
        </div>
      </div>

      {/* Recent Mock Table / List */}
      <div className="space-y-2">
        <h4 className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
          Recent Mock History
        </h4>

        <div className="space-y-2">
          {history.length === 0 ? (
            <div className="p-4 text-center text-xs text-gray-500 bg-gray-50/50 rounded-xl border border-gray-100 font-medium">
              No recent mock test attempts found. Complete your first mock to see history!
            </div>
          ) : (
            history.map((mock, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs hover:border-gray-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="h-6 w-6 rounded-lg bg-indigo-50 text-[#4F46E5] flex items-center justify-center font-black text-[10px]">
                    #{idx + 1}
                  </span>
                  <div>
                    <span className="font-bold text-gray-900 block text-xs">{mock.name || mock.mockName || `NEST Mock #${idx + 1}`}</span>
                    <span className="text-[10px] text-gray-400 font-medium">{mock.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-mono font-black text-gray-900 text-xs sm:text-sm block">{mock.score} / 240</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">{mock.accuracy}% Accuracy</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
