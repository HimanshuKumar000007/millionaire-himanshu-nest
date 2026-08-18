"use client";
/**
 * LessonReader.tsx
 *
 * Topic View UI/UX — Premium In-Dashboard Reading Experience.
 * Matching reference screenshot exactly:
 * - Integrated seamlessly into main DashboardShell (Left Dashboard Sidebar remains visible)
 * - Breadcrumb navigation at top
 * - 2-Column Grid (8 cols reading paper, 4 cols outline & quick actions sidebar)
 * - Rich visual blocks (Takeaway quote box, 3-column concept cards, bullet checkmarks)
 */

import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { ContentLesson } from "@/lib/types/content";
import { SidebarLesson, LessonReaderProps } from "@/lib/types/lesson-reader";
import { lessonProgressService } from "@/lib/services/lessonProgress.service";

import { LessonHeader } from "./LessonHeader";
import { LessonNavigation } from "./LessonNavigation";
import { LessonRightSidebar } from "./LessonRightSidebar";
import { BlockRenderer } from "./blocks/BlockRenderer";
import { ScrollToTop } from "./ui/ScrollToTop";

export function LessonReader({
  lesson,
  chapterLessons = [],
  onClose,
  onProgressUpdate,
  onNavigateLesson,
}: LessonReaderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Load existing progress
  useEffect(() => {
    const saved = lessonProgressService.getLessonProgress(lesson.id);
    setReadingProgress(saved.progressPercent);
    setIsCompleted(saved.completed);

    if (saved.progressPercent < 10 && !saved.completed) {
      const updated = lessonProgressService.saveLessonProgress(lesson.id, 10, false);
      setReadingProgress(updated.progressPercent);
      onProgressUpdate?.();
    }
  }, [lesson.id, onProgressUpdate]);

  // Scroll tracking
  const lastSavedRef = useRef(0);
  const handleScroll = useCallback(() => {
    const el = window;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollHeight <= 0) return;

    const pct = Math.min(100, Math.max(0, Math.round((scrollTop / scrollHeight) * 100)));
    setReadingProgress((prev) => Math.max(prev, pct));

    if (pct >= 90 && !isCompleted) {
      lessonProgressService.saveLessonProgress(lesson.id, pct, false);
      lastSavedRef.current = pct;
      onProgressUpdate?.();
    }

    if (pct - lastSavedRef.current >= 10) {
      lessonProgressService.saveLessonProgress(lesson.id, pct, false);
      lastSavedRef.current = pct;
      onProgressUpdate?.();
    }
  }, [lesson.id, isCompleted, onProgressUpdate]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  // Mark Complete handler
  const handleMarkComplete = () => {
    lessonProgressService.saveLessonProgress(lesson.id, 100, true);
    setReadingProgress(100);
    setIsCompleted(true);
    onProgressUpdate?.();
  };

  return (
    <div suppressHydrationWarning className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      {/* Top Breadcrumb Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-gray-500 pb-1">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <button
            suppressHydrationWarning
            onClick={onClose}
            className="hover:text-indigo-600 transition-colors shrink-0"
          >
            Smart Lessons
          </button>
          <span>&gt;</span>
          <span className="text-gray-600 shrink-0">{lesson.subject || "Biology"}</span>
          {lesson.chapter && (
            <>
              <span>&gt;</span>
              <span className="text-gray-600 shrink-0">{lesson.chapter}</span>
            </>
          )}
          <span>&gt;</span>
          {chapterLessons.length > 1 ? (
            <select
              value={lesson.id}
              onChange={(e) => onNavigateLesson?.(e.target.value)}
              className="bg-indigo-50 hover:bg-indigo-100 text-[#4F46E5] border border-indigo-200 font-extrabold text-xs rounded-xl px-3 py-1 cursor-pointer focus:outline-none shadow-2xs transition-colors"
            >
              {chapterLessons.map((cl, idx) => (
                <option key={cl.id} value={cl.id}>
                  Module {cl.order || idx + 1}: {cl.title}
                </option>
              ))}
            </select>
          ) : (
            <span className="text-gray-900 font-extrabold truncate max-w-[200px] sm:max-w-none">
              {lesson.title || lesson.chapter}
            </span>
          )}
        </div>
      </div>

      {/* Main 2-Column Grid (Reading Paper Left 8 cols | Sidebar Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Main Reading Card */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-2xs space-y-8">
          {/* Lesson Header */}
          <LessonHeader
            lesson={lesson}
            readingProgress={readingProgress}
            isCompleted={isCompleted}
            onBack={onClose}
            onMarkComplete={handleMarkComplete}
          />

          {/* Lesson Content Blocks */}
          <article id="lesson-content" className="space-y-8">
            <BlockRenderer lesson={lesson} />
          </article>

          {/* Bottom Navigation Bar */}
          <LessonNavigation
            chapterLessons={chapterLessons}
            currentLessonId={lesson.id}
            isCompleted={isCompleted}
            onMarkComplete={handleMarkComplete}
            onNavigateLesson={onNavigateLesson}
            onClose={onClose}
          />
        </div>

        {/* Right Column (4 cols): Outline, Quick Actions, Need Help */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          <LessonRightSidebar
            lesson={lesson}
            readingProgress={readingProgress}
            isCompleted={isCompleted}
            onNavigateToQuiz={() => alert("Practice quiz for this lesson will open!")}
            onDownloadNotes={() => alert("Downloading PDF Summary...")}
            onReportIssue={() => alert("Report issue form opened!")}
            onAskDoubt={() => alert("Doubt assistant opened!")}
          />
        </div>
      </div>

      {/* Scroll to Top helper */}
      <ScrollToTop scrollContainerRef={{ current: null }} />
    </div>
  );
}
