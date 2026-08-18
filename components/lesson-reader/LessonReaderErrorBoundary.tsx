"use client";
/**
 * LessonReaderWrapper.tsx
 * Error boundary wrapper around the new LessonReader.
 * Catches render errors gracefully without crashing the whole dashboard.
 */
import * as React from "react";
import { ContentLesson } from "@/lib/types/content";
import { SidebarLesson } from "@/lib/types/lesson-reader";

interface Props {
  lesson: ContentLesson;
  chapterLessons?: SidebarLesson[];
  onClose: () => void;
  onProgressUpdate?: () => void;
  onNavigateLesson?: (lessonId: string) => void;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

import { LessonReader } from "./LessonReader";

export class LessonReaderErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[LessonReader] Crash:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          {/* Top bar */}
          <header className="h-16 px-6 border-b border-gray-200 flex items-center justify-between shrink-0 shadow-sm">
            <span className="text-[15px] font-bold text-gray-800">
              {this.props.lesson?.title ?? "Lesson Reader"}
            </span>
            <button
              suppressHydrationWarning
              onClick={this.props.onClose}
              className="flex items-center justify-center h-8 w-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
            >
              ✕
            </button>
          </header>

          {/* Error message */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-md text-center space-y-4">
              <div className="text-4xl">📚</div>
              <h2 className="text-[20px] font-bold text-gray-900">
                Lesson couldn&apos;t load
              </h2>
              <p className="text-[15px] text-gray-500 leading-relaxed">
                There was a problem rendering this lesson. The content file may be in an unexpected format.
              </p>
              {process.env.NODE_ENV === "development" && (
                <code className="block text-[12px] bg-red-50 text-red-700 p-3 rounded-xl text-left break-words">
                  {this.state.errorMessage}
                </code>
              )}
              <button
                suppressHydrationWarning
                onClick={this.props.onClose}
                className="mt-4 px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors text-[14px]"
              >
                Back to Lessons
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <LessonReader
        lesson={this.props.lesson}
        chapterLessons={this.props.chapterLessons}
        onClose={this.props.onClose}
        onProgressUpdate={this.props.onProgressUpdate}
        onNavigateLesson={this.props.onNavigateLesson}
      />
    );
  }
}
