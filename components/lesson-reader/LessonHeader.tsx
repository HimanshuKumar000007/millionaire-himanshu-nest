"use client";
import * as React from "react";
import { ArrowLeft, Clock, Zap, Check, CheckCircle2, Bookmark } from "lucide-react";
import { ContentLesson } from "@/lib/types/content";

interface LessonHeaderProps {
  lesson: ContentLesson;
  readingProgress: number;
  isCompleted: boolean;
  onBack: () => void;
  onMarkComplete: () => void;
}

export function LessonHeader({
  lesson,
  readingProgress,
  isCompleted,
  onBack,
  onMarkComplete,
}: LessonHeaderProps) {
  const readingTime = lesson.estimatedTimeMinutes || lesson.readingTimeMinutes || 12;

  return (
    <div className="space-y-6 pb-6 border-b border-gray-100">
      {/* Top Back Link */}
      <div>
        <button
          suppressHydrationWarning
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to {lesson.subject || "Biology"} Lessons</span>
        </button>
      </div>

      {/* Title + Top Right Progress & Mark Complete Widget */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          {lesson.title || lesson.chapter}
        </h1>

        {/* Progress & Mark Complete */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="space-y-1 text-right hidden sm:block min-w-[120px]">
            <div className="flex justify-between text-[11px] font-bold text-gray-500 gap-2">
              <span>Lesson Progress</span>
              <span className="text-emerald-600 font-extrabold">{readingProgress}% Completed</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${readingProgress}%` }}
              />
            </div>
          </div>

          {/* Mark Complete Button */}
          <button
            suppressHydrationWarning
            onClick={onMarkComplete}
            disabled={isCompleted}
            className={`
              flex items-center gap-1.5 text-xs font-extrabold px-4 py-2 rounded-xl transition-all shadow-2xs
              ${isCompleted
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-indigo-200"
              }
            `}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Completed</span>
              </>
            ) : (
              <>
                <Check className="h-3.5 w-3.5 text-indigo-600" />
                <span>Mark as Complete</span>
              </>
            )}
          </button>

          {/* Bookmark Button */}
          <button
            suppressHydrationWarning
            className="h-9 w-9 rounded-xl border border-gray-200 bg-white text-gray-500 hover:text-indigo-600 hover:border-indigo-200 transition-colors flex items-center justify-center shadow-2xs"
            title="Bookmark lesson"
          >
            <Bookmark className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Badges row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center text-[11px] font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
          High Yield
        </span>
        <span className="inline-flex items-center text-[11px] font-extrabold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80">
          NCERT Based
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200/80">
          <Clock className="h-3 w-3 text-gray-400" />
          {readingTime} min
        </span>
      </div>
    </div>
  );
}
