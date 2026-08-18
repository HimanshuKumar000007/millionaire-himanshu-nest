"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, TrendingUp, TrendingDown, BookOpen } from "lucide-react";
import { SubjectScore } from "@/lib/types/dashboard";

interface SubjectPerformanceProps {
  subjects: SubjectScore[];
  onSelectSubject?: (subject: string) => void;
}

export function SubjectPerformance({ subjects, onSelectSubject }: SubjectPerformanceProps) {
  const getBadgeVariant = (status: SubjectScore["status"]) => {
    if (status === "Strong") return "success";
    if (status === "Good") return "secondary";
    return "warning";
  };

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case "Physics":
        return "⚛️";
      case "Chemistry":
        return "🧪";
      case "Biology":
        return "🧬";
      case "Mathematics":
        return "📐";
      default:
        return "📚";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-[#111827] tracking-tight">
            Subject Performance
          </h2>
          <p className="text-xs text-[#6B7280]">
            See how your preparation is progressing across all 4 NEST subjects.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {subjects.map((sub) => {
          const isPositive = sub.trend >= 0;
          return (
            <div
              key={sub.subject}
              className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{getSubjectIcon(sub.subject)}</span>
                  <div>
                    <h3 className="text-base font-extrabold text-[#111827]">
                      {sub.subject}
                    </h3>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {sub.topicsCompleted}/{sub.totalTopics} Topics
                    </span>
                  </div>
                </div>

                <Badge variant={getBadgeVariant(sub.status)} className="text-[10px] font-bold">
                  {sub.status}
                </Badge>
              </div>

              {/* Main Score % */}
              <div className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-[#111827] tracking-tight">
                    {sub.score}%
                  </span>
                  <div
                    className={`flex items-center gap-0.5 text-xs font-bold ${
                      isPositive ? "text-emerald-600" : "text-amber-600"
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="h-3.5 w-[#16A34A]" />
                    ) : (
                      <TrendingDown className="h-3.5 w-[#F59E0B]" />
                    )}
                    <span>{isPositive ? `+${sub.trend}%` : `${sub.trend}%`}</span>
                  </div>
                </div>

                <Progress value={sub.score} className="h-1.5" />
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-gray-100">
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold block">Accuracy</span>
                  <span className="font-mono font-bold text-gray-900">{sub.accuracy}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold block">Questions</span>
                  <span className="font-mono font-bold text-gray-900">{sub.questionsAttempted}</span>
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={() => onSelectSubject && onSelectSubject(sub.subject)}
                variant="outline"
                size="sm"
                className="w-full min-h-[44px] text-xs font-bold text-gray-700 hover:text-[#4F46E5] hover:bg-indigo-50/50 border-gray-200 mt-2"
              >
                View {sub.subject} →
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
