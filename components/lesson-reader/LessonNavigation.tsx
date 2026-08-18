"use client";
import * as React from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { SidebarLesson } from "@/lib/types/lesson-reader";

interface LessonNavigationProps {
  chapterLessons: SidebarLesson[];
  currentLessonId: string;
  isCompleted: boolean;
  onMarkComplete: () => void;
  onNavigateLesson?: (lessonId: string) => void;
  onClose?: () => void;
}

export function LessonNavigation({
  chapterLessons,
  currentLessonId,
  isCompleted,
  onNavigateLesson,
  onClose,
}: LessonNavigationProps) {
  const currentIndex = chapterLessons.findIndex((l) => l.id === currentLessonId);
  const prevLesson = currentIndex > 0 ? chapterLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < chapterLessons.length - 1 ? chapterLessons[currentIndex + 1] : null;
  const currentNum = currentIndex >= 0 ? currentIndex + 1 : 1;
  const totalNum = chapterLessons.length || 1;

  return (
    <div className="pt-6 border-t border-gray-100 flex items-center justify-between gap-4 mt-10">
      {/* Previous Lesson Button */}
      {prevLesson ? (
        <button
          suppressHydrationWarning
          onClick={() => onNavigateLesson?.(prevLesson.id)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-extrabold text-xs transition-all shadow-2xs"
        >
          <ArrowLeft className="h-4 w-4 text-gray-500" />
          <span>Previous Lesson</span>
        </button>
      ) : (
        <button
          suppressHydrationWarning
          onClick={onClose}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-extrabold text-xs transition-all shadow-2xs"
        >
          <ArrowLeft className="h-4 w-4 text-gray-500" />
          <span>Back to Smart Lessons</span>
        </button>
      )}

      {/* Center Lesson Count */}
      <span className="text-xs font-bold text-gray-500 hidden sm:inline-block">
        Lesson {currentNum} of {totalNum}
      </span>

      {/* Next Lesson Button */}
      {nextLesson ? (
        <button
          suppressHydrationWarning
          onClick={() => onNavigateLesson?.(nextLesson.id)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-indigo-700 text-white font-extrabold text-xs transition-all shadow-xs"
        >
          <span>Next: {nextLesson.title}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      ) : (
        <button
          suppressHydrationWarning
          onClick={onClose}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-indigo-700 text-white font-extrabold text-xs transition-all shadow-xs"
        >
          <span>Complete Chapter</span>
          <CheckCircle2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
