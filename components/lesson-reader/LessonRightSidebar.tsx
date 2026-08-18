"use client";
import * as React from "react";
import { useState } from "react";
import {
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  FileText,
  HelpCircle as QuestionIcon,
  AlertCircle,
  MessageSquare,
  Sparkles,
  Bookmark,
} from "lucide-react";
import { ContentLesson } from "@/lib/types/content";

interface LessonRightSidebarProps {
  lesson: ContentLesson;
  readingProgress: number;
  isCompleted: boolean;
  onNavigateToQuiz?: () => void;
  onDownloadNotes?: () => void;
  onReportIssue?: () => void;
  onAskDoubt?: () => void;
}

export function LessonRightSidebar({
  lesson,
  readingProgress,
  isCompleted,
  onNavigateToQuiz,
  onDownloadNotes,
  onReportIssue,
  onAskDoubt,
}: LessonRightSidebarProps) {
  // Extract topics from concept breakdown or lesson.topics
  const breakdown = lesson.conceptBreakdown || [];

  const topics = breakdown.length > 0
    ? breakdown.map((cb, idx) => ({
        id: `heading-${(cb.heading || cb.title || "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`,
        title: cb.heading || cb.title || `Topic ${idx + 1}`,
        time: `${Math.max(2, Math.round((lesson.estimatedTimeMinutes || 15) / Math.max(1, breakdown.length)))} min`,
        completed: isCompleted || ((idx + 1) / breakdown.length) * 100 <= readingProgress,
      }))
    : (lesson.topics || []).map((t, idx) => ({
        id: `topic-${idx}`,
        title: t,
        time: "3 min",
        completed: isCompleted || ((idx + 1) / (lesson.topics?.length || 1)) * 100 <= readingProgress,
      }));

  const completedCount = topics.filter((t) => t.completed).length;
  const totalCount = topics.length;
  const outlinePercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Lesson Outline Card */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-2xs space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-gray-900">Lesson Outline</h3>
          <span className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer">
            Expand All
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-gray-600">
              {completedCount} / {totalCount} Topics Completed
            </span>
            <span className="font-extrabold text-indigo-600">{outlinePercent}%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${outlinePercent}%` }}
            />
          </div>
        </div>

        {/* Timeline Topic Items */}
        <div className="relative pl-3 space-y-4 before:absolute before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-100">
          {topics.map((t, idx) => (
            <button
              key={idx}
              suppressHydrationWarning
              onClick={() => scrollToHeading(t.id)}
              className="relative w-full flex items-start gap-3.5 text-left group"
            >
              {/* Number/Check Circle */}
              <div
                className={`relative z-10 flex items-center justify-center h-6 w-6 rounded-full text-xs font-extrabold shrink-0 transition-all ${
                  t.completed
                    ? "bg-emerald-500 text-white shadow-2xs"
                    : "bg-indigo-600 text-white ring-4 ring-indigo-50"
                }`}
              >
                {t.completed ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>

              {/* Title & Time */}
              <div className="min-w-0 flex-1 pt-0.5">
                <span
                  className={`text-xs font-bold block leading-snug transition-colors ${
                    t.completed
                      ? "text-gray-900 group-hover:text-indigo-600"
                      : "text-indigo-600 font-extrabold"
                  }`}
                >
                  {idx + 1}. {t.title}
                </span>
                <span className="text-[11px] text-gray-400 font-medium block mt-0.5">
                  {t.time}
                </span>
              </div>

              {/* Status Indicator */}
              {t.completed && (
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-1" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Quick Actions Card */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-2xs space-y-4">
        <h3 className="text-base font-extrabold text-gray-900">Quick Actions</h3>

        <div className="space-y-2">
          {/* Action 1: Take Quiz */}
          <button
            suppressHydrationWarning
            onClick={onNavigateToQuiz}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gray-50/80 hover:bg-indigo-50/60 border border-gray-100 hover:border-indigo-100 transition-all group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-indigo-100/70 border border-indigo-200/60 flex items-center justify-center text-indigo-600 shrink-0">
                <QuestionIcon className="h-4.5 w-4.5" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-gray-900 group-hover:text-indigo-600 block leading-tight">
                  Take Quiz (10 Questions)
                </span>
                <span className="text-[11px] text-gray-400 font-medium block">
                  Test your understanding
                </span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>

          {/* Action 2: Download Notes */}
          <button
            suppressHydrationWarning
            onClick={onDownloadNotes}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gray-50/80 hover:bg-indigo-50/60 border border-gray-100 hover:border-indigo-100 transition-all group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-indigo-100/70 border border-indigo-200/60 flex items-center justify-center text-indigo-600 shrink-0">
                <FileText className="h-4.5 w-4.5" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-gray-900 group-hover:text-indigo-600 block leading-tight">
                  Download Notes
                </span>
                <span className="text-[11px] text-gray-400 font-medium block">
                  PDF Summary
                </span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>

          {/* Action 3: Report an Issue */}
          <button
            suppressHydrationWarning
            onClick={onReportIssue}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gray-50/80 hover:bg-rose-50/60 border border-gray-100 hover:border-rose-100 transition-all group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100/70 border border-rose-200/60 flex items-center justify-center text-rose-600 shrink-0">
                <AlertCircle className="h-4.5 w-4.5" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-gray-900 group-hover:text-rose-600 block leading-tight">
                  Report an Issue
                </span>
                <span className="text-[11px] text-gray-400 font-medium block">
                  Spotted an error?
                </span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>
        </div>
      </div>

      {/* 3. Need Help / Ask Doubt Card */}
      <div className="bg-gradient-to-br from-indigo-50/90 via-indigo-50/50 to-purple-50/80 rounded-3xl p-6 border border-indigo-100/80 shadow-2xs space-y-3 relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <h4 className="text-sm font-extrabold text-gray-900">Need Help?</h4>
          <p className="text-xs text-gray-500 font-medium">Struggling with this topic?</p>
        </div>

        <button
          suppressHydrationWarning
          onClick={onAskDoubt}
          className="relative z-10 w-full py-2.5 px-4 rounded-xl bg-white hover:bg-indigo-50 border border-indigo-200 text-indigo-600 font-extrabold text-xs flex items-center justify-center gap-2 shadow-2xs transition-all"
        >
          <MessageSquare className="h-3.5 w-3.5 text-indigo-600" />
          <span>Ask Doubt</span>
        </button>

        {/* Decorative chat bubbles background */}
        <div className="absolute right-3 bottom-2 opacity-15 pointer-events-none text-indigo-600">
          <MessageSquare className="h-20 w-20" />
        </div>
      </div>
    </div>
  );
}
