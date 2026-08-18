"use client";
import * as React from "react";
import { CheckCircle2, Lock, PlayCircle, Circle, BookOpen } from "lucide-react";
import { SidebarLesson, LessonNavStatus } from "@/lib/types/lesson-reader";
import { ContentLesson } from "@/lib/types/content";

interface LessonSidebarProps {
  currentLesson: ContentLesson;
  chapterLessons: SidebarLesson[];
  onNavigateLesson?: (lessonId: string) => void;
}

export function LessonSidebar({ currentLesson, chapterLessons, onNavigateLesson }: LessonSidebarProps) {
  const chapterTitle = currentLesson.chapter || "Chapter";
  const chapterNumber = currentLesson.chapterNumber;
  const completedCount = chapterLessons.filter((l) => l.status === "completed").length;

  return (
    <aside
      className="hidden lg:flex flex-col w-[300px] shrink-0 bg-gray-50/80 border-r border-gray-200 overflow-y-auto"
      aria-label="Lesson navigation"
    >
      {/* Chapter header */}
      <div className="px-6 py-6 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-9 w-9 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
            <BookOpen className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider mb-0.5">
              {chapterNumber ? `Chapter ${chapterNumber}` : "Chapter"}
            </p>
            <h2 className="text-[14px] font-bold text-gray-900 leading-snug truncate">
              {chapterTitle}
            </h2>
          </div>
        </div>

        {chapterLessons.length > 0 && (
          <div className="space-y-2">
            {/* Progress bar */}
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-gray-500 font-medium">{completedCount} of {chapterLessons.length} complete</span>
              <span className="text-indigo-600 font-semibold">
                {Math.round((completedCount / chapterLessons.length) * 100)}%
              </span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / chapterLessons.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Lesson list */}
      <nav className="flex-1 p-3">
        {chapterLessons.length === 0 ? (
          <div className="mx-1 my-1 px-4 py-3 rounded-xl bg-indigo-50 border-l-[3px] border-indigo-500">
            <div className="flex items-center gap-3">
              <PlayCircle className="h-5 w-5 text-indigo-600 shrink-0" />
              <div>
                <span className="text-[14px] font-semibold text-indigo-900 block leading-snug">
                  {currentLesson.title}
                </span>
                {currentLesson.estimatedTimeMinutes && (
                  <span className="text-[12px] text-indigo-500">
                    ~{currentLesson.estimatedTimeMinutes} min
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <ul className="space-y-1">
            {chapterLessons.map((lesson, i) => {
              const isCurrent = lesson.id === currentLesson.id;
              const isLocked = lesson.status === "locked";
              const isCompleted = lesson.status === "completed";
              const isClickable = !isLocked && !isCurrent;

              return (
                <li key={lesson.id}>
                  <button
                    suppressHydrationWarning
                    onClick={() => isClickable && onNavigateLesson?.(lesson.id)}
                    disabled={isLocked}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`
                      w-full text-left px-4 py-3 rounded-xl transition-all duration-150
                      flex items-start gap-3
                      ${isCurrent
                        ? "bg-indigo-600 shadow-md"
                        : isCompleted
                        ? "bg-white border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/40 cursor-pointer"
                        : isClickable
                        ? "hover:bg-white hover:border hover:border-gray-200 cursor-pointer"
                        : "opacity-50 cursor-not-allowed"
                      }
                    `}
                  >
                    {/* Status icon */}
                    <div className="shrink-0 mt-0.5">
                      {isCurrent ? (
                        <PlayCircle className="h-5 w-5 text-white" />
                      ) : isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      ) : isLocked ? (
                        <Lock className="h-4 w-4 text-gray-300 mt-0.5" />
                      ) : (
                        <span className="flex items-center justify-center h-5 w-5 rounded-full border-2 border-gray-300 text-[10px] font-bold text-gray-400">
                          {String(lesson.order || i + 1)}
                        </span>
                      )}
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <span className={`text-[14px] block leading-snug ${
                        isCurrent
                          ? "font-semibold text-white"
                          : isCompleted
                          ? "font-medium text-gray-700"
                          : "font-medium text-gray-600"
                      }`}>
                        {lesson.title}
                      </span>
                      {lesson.estimatedMinutes && (
                        <span className={`text-[12px] mt-0.5 block ${
                          isCurrent ? "text-indigo-200" : "text-gray-400"
                        }`}>
                          ~{lesson.estimatedMinutes} min
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </aside>
  );
}
