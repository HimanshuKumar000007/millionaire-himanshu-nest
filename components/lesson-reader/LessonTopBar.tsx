"use client";
import * as React from "react";
import { ArrowLeft, X } from "lucide-react";
import { ContentLesson } from "@/lib/types/content";

interface LessonTopBarProps {
  lesson: ContentLesson;
  readingProgress: number;
  isCompleted: boolean;
  onClose: () => void;
}

export function LessonTopBar({ lesson, readingProgress, isCompleted, onClose }: LessonTopBarProps) {
  const progressColor = isCompleted ? "bg-emerald-500" : "bg-indigo-500";

  const crumbs = [
    lesson.subject,
    lesson.classLevel,
    lesson.unit ? lesson.unit.split("—")[0]?.trim() || lesson.unit : null,
    lesson.chapter,
  ].filter(Boolean) as string[];

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shrink-0 shadow-sm">
      <div className="h-16 px-5 flex items-center justify-between gap-6">

        {/* Left: Back button */}
        <button
          suppressHydrationWarning
          onClick={onClose}
          className="flex items-center gap-2 text-[13px] font-semibold text-gray-500 hover:text-indigo-600 transition-colors group shrink-0"
          aria-label="Back to Smart Lessons"
        >
          <span className="flex items-center justify-center h-8 w-8 rounded-lg bg-gray-100 group-hover:bg-indigo-50 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </span>
          <span className="hidden sm:block">Back</span>
        </button>

        {/* Center: Breadcrumb */}
        <nav aria-label="Lesson breadcrumb" className="hidden md:flex items-center gap-2 min-w-0 flex-1 justify-center">
          {crumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <span className="text-gray-300 text-[13px]">/</span>
              )}
              <span
                className={`text-[13px] truncate max-w-[150px] ${
                  i === crumbs.length - 1
                    ? "font-semibold text-gray-800"
                    : "text-gray-500 font-normal"
                }`}
              >
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </nav>

        {/* Mobile: title */}
        <p className="md:hidden text-[14px] font-semibold text-gray-800 truncate flex-1 text-center">
          {lesson.title}
        </p>

        {/* Right: Progress % + Close */}
        <div className="flex items-center gap-3 shrink-0">
          {isCompleted ? (
            <span className="hidden sm:flex items-center gap-1.5 text-[12px] font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              ✓ Complete
            </span>
          ) : (
            <span className="hidden sm:block text-[13px] font-semibold text-gray-500">
              {readingProgress}%
            </span>
          )}
          <button
            suppressHydrationWarning
            onClick={onClose}
            className="flex items-center justify-center h-8 w-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="Close lesson reader"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Progress line */}
      <div className="h-[3px] bg-gray-100">
        <div
          className={`h-full ${progressColor} transition-all duration-500 ease-out`}
          style={{ width: `${isCompleted ? 100 : readingProgress}%` }}
          role="progressbar"
          aria-valuenow={readingProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </header>
  );
}
