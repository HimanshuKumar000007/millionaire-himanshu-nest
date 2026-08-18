"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, PenTool, Target, FileCode2 } from "lucide-react";

interface PracticeOverviewProps {
  practice?: {
    pyqsCompleted: number;
    pyqsTotal: number;
    pyqAccuracy: number;
    practiceSolved: number;
    practiceAccuracy: number;
    mocksCompleted: number;
    mockAvgScore: number;
  };
  onNavigate?: (section: string) => void;
}

export function PracticeOverview({ practice, onNavigate }: PracticeOverviewProps) {
  const pyqsCompleted = practice?.pyqsCompleted || 0;
  const pyqsTotal = practice?.pyqsTotal || 500;
  const pyqAccuracy = practice?.pyqAccuracy || 0;
  const practiceSolved = practice?.practiceSolved || 0;
  const practiceAccuracy = practice?.practiceAccuracy || 0;
  const mocksCompleted = practice?.mocksCompleted || 0;
  const mockAvgScore = practice?.mockAvgScore || 0;

  const pyqPercent = Math.min(100, Math.round((pyqsCompleted / (pyqsTotal || 1)) * 100));

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-extrabold text-gray-900">Practice & Question Modules</h3>
          <p className="text-[11px] text-gray-500 font-medium">
            Track your question solving performance across PYQs, Diagnostic Drills, and Full Mocks.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* PYQs Card */}
        <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <FileCode2 className="h-4 w-4 text-[#4F46E5]" /> PYQs Module
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-indigo-50 text-[#4F46E5]">
                {pyqPercent}% Done
              </span>
            </div>

            <div>
              <div className="text-2xl font-black text-gray-900 tracking-tight">
                {pyqsCompleted} <span className="text-sm font-normal text-gray-400">/ {pyqsTotal}</span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium">Previous Year Questions Solved</p>
            </div>

            <div className="space-y-1.5">
              <div className="h-1.5 w-full bg-gray-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4F46E5] rounded-full transition-all duration-500"
                  style={{ width: `${pyqPercent}%` }}
                />
              </div>

              <div className="text-[11px] text-gray-500 font-semibold flex justify-between">
                <span>PYQ Accuracy:</span>
                <span className="font-mono font-bold text-gray-900">{pyqAccuracy}%</span>
              </div>
            </div>
          </div>

          <Button
            onClick={() => onNavigate && onNavigate("pyqs")}
            className="w-full h-8 bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-all"
          >
            Continue PYQs <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Practice Questions Card */}
        <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <PenTool className="h-4 w-4 text-emerald-600" /> Practice Bank
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-50 text-emerald-600">
                Active
              </span>
            </div>

            <div>
              <div className="text-2xl font-black text-gray-900 tracking-tight">
                {practiceSolved.toLocaleString()}{" "}
                <span className="text-sm font-normal text-gray-400">Solved</span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium">High-yield question bank</p>
            </div>

            <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100 flex items-center justify-between text-xs font-bold text-emerald-900">
              <span>Overall Accuracy</span>
              <span className="font-mono text-sm font-black text-emerald-700">{practiceAccuracy}%</span>
            </div>
          </div>

          <Button
            onClick={() => onNavigate && onNavigate("practice")}
            variant="outline"
            className="w-full h-8 bg-white text-xs font-bold text-gray-800 hover:text-[#4F46E5] hover:bg-indigo-50/50 border-gray-200/80 rounded-xl shadow-2xs transition-all"
          >
            Practice More <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Mock Tests Card */}
        <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <Target className="h-4 w-4 text-rose-500" /> Mock Exams
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-rose-50 text-rose-600">
                Official Pattern
              </span>
            </div>

            <div>
              <div className="text-2xl font-black text-gray-900 tracking-tight">
                {mocksCompleted} <span className="text-sm font-normal text-gray-400">Completed</span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium">Full length & subject diagnostic mocks</p>
            </div>

            <div className="bg-rose-50/60 p-2.5 rounded-xl border border-rose-100 flex items-center justify-between text-xs font-bold text-rose-900">
              <span>Average Mock Score</span>
              <span className="font-mono text-sm font-black text-rose-700">{mockAvgScore} / 240</span>
            </div>
          </div>

          <Button
            onClick={() => onNavigate && onNavigate("mock-tests")}
            variant="outline"
            className="w-full h-8 bg-white text-xs font-bold text-gray-800 hover:text-rose-600 hover:bg-rose-50/50 border-gray-200/80 rounded-xl shadow-2xs transition-all"
          >
            Take Mock Exam <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
