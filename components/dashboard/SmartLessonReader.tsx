"use client";

import React, { useState, useEffect } from "react";
import { ContentLesson } from "@/lib/types/content";
import { lessonProgressService } from "@/lib/services/lessonProgress.service";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  X,
  BookOpen,
  Clock,
  CheckCircle2,
  Lightbulb,
  Flame,
  HelpCircle,
  Check,
  Award,
  AlertTriangle,
  Zap,
  BookMarked,
} from "lucide-react";

interface SmartLessonReaderProps {
  lesson: ContentLesson;
  onClose: () => void;
  onProgressUpdate?: () => void;
}

export function SmartLessonReader({
  lesson,
  onClose,
  onProgressUpdate,
}: SmartLessonReaderProps) {
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const displaySummary = lesson.quickSummary || lesson.summary;
  const displayConcepts = lesson.coreConcepts || lesson.keyConcepts || [];
  const displayReadingTime = lesson.estimatedTimeMinutes || lesson.readingTimeMinutes || 15;

  useEffect(() => {
    const existing = lessonProgressService.getLessonProgress(lesson.id);
    setProgressPercent(existing.progressPercent);
    setIsCompleted(existing.completed);

    // Auto update reading progress to at least 25% upon opening
    if (existing.progressPercent < 25 && !existing.completed) {
      const updated = lessonProgressService.saveLessonProgress(lesson.id, 25, false);
      setProgressPercent(updated.progressPercent);
      if (onProgressUpdate) onProgressUpdate();
    }
  }, [lesson.id, onProgressUpdate]);

  const handleMarkComplete = () => {
    const updated = lessonProgressService.saveLessonProgress(lesson.id, 100, true);
    setProgressPercent(100);
    setIsCompleted(true);
    if (onProgressUpdate) onProgressUpdate();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] bg-indigo-50 text-[#4F46E5] border-indigo-100 font-extrabold px-2 py-0.5 rounded-md">
                {lesson.subject}
              </Badge>
              {lesson.classLevel && (
                <span className="text-[10px] font-extrabold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {lesson.classLevel}
                </span>
              )}
              {lesson.chapter && (
                <span className="text-xs font-semibold text-gray-400">{lesson.chapter}</span>
              )}
              {lesson.source === "development-example" && (
                <span className="text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded-md border border-amber-200">
                  Dev Example
                </span>
              )}
            </div>
            <h2 className="text-lg font-black text-gray-900 leading-tight">
              {lesson.title}
            </h2>
          </div>

          <button suppressHydrationWarning
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close lesson"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-1.5 shrink-0">
          <div
            className={`h-full transition-all duration-500 ${
              isCompleted ? "bg-emerald-500" : "bg-[#4F46E5]"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Overview / Quick Summary Box */}
          {displaySummary && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50/80 to-indigo-50/50 border border-amber-200/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-amber-900">
                <Lightbulb className="h-4 w-4 text-amber-600 shrink-0" />
                <span>Quick Summary</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                {displaySummary}
              </p>
            </div>
          )}

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-gray-50 p-3 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2 text-gray-600 font-medium">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>Estimated Reading Time: <strong>{displayReadingTime} mins</strong></span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 font-medium">
              <BookOpen className="h-4 w-4 text-gray-400" />
              <span>Difficulty: <strong className="capitalize">{lesson.difficulty || "core"}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              {isCompleted ? (
                <span className="flex items-center gap-1 text-emerald-700 font-extrabold bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200 text-[11px]">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                </span>
              ) : (
                <span className="text-gray-500 font-bold text-[11px]">
                  Progress: {progressPercent}%
                </span>
              )}
            </div>
          </div>

          {/* Core Concepts Chips */}
          {displayConcepts.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider">
                Core Concepts Covered
              </h3>
              <div className="flex flex-col gap-2">
                {displayConcepts.map((concept, idx) => (
                  <div
                    key={idx}
                    className="text-xs font-semibold text-gray-700 bg-white border border-gray-200 p-2.5 rounded-xl shadow-2xs flex items-start gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{concept}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Concept Breakdown */}
          {lesson.conceptBreakdown && lesson.conceptBreakdown.length > 0 && (
            <div className="space-y-6 pt-2">
              <h3 className="text-sm font-black text-gray-900 border-b border-gray-100 pb-2">
                Concept Breakdown
              </h3>
              {lesson.conceptBreakdown.map((block, idx) => {
                const headingText = block.heading || block.title || `Concept ${idx + 1}`;
                const bodyText = block.contentMarkdown || block.content || "";

                return (
                  <div key={idx} className="space-y-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
                    <div className="flex items-center gap-2">
                      {block.type === "important_fact" && <Flame className="h-4 w-4 text-amber-500 shrink-0" />}
                      {block.type === "comparison" && <BookOpen className="h-4 w-4 text-indigo-500 shrink-0" />}
                      {block.type === "table" && <BookMarked className="h-4 w-4 text-cyan-500 shrink-0" />}
                      <h4 className="text-sm font-extrabold text-[#4F46E5]">
                        {headingText}
                      </h4>
                    </div>
                    <div className="text-xs text-gray-700 leading-relaxed font-medium whitespace-pre-line font-mono sm:font-sans">
                      {bodyText}
                    </div>
                    {block.bulletPoints && block.bulletPoints.length > 0 && (
                      <ul className="space-y-1.5 pl-2">
                        {block.bulletPoints.map((point, pIdx) => (
                          <li key={pIdx} className="text-xs text-gray-600 font-medium flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Important Points Callout */}
          {lesson.importantPoints && lesson.importantPoints.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
                <Award className="h-4 w-4 text-indigo-600 shrink-0" />
                <span>Important High-Yield Points</span>
              </div>
              <ul className="space-y-2">
                {lesson.importantPoints.map((pt, idx) => (
                  <li key={idx} className="text-xs text-slate-700 font-medium flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-100">
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* NEST Focus Callout */}
          {lesson.nestFocus && (
            <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-extrabold text-indigo-950">
                <Flame className="h-4 w-4 text-indigo-600 shrink-0" />
                <span>NEST Exam Focus</span>
              </div>
              <p className="text-xs text-indigo-900 font-medium leading-relaxed">
                {lesson.nestFocus}
              </p>
            </div>
          )}

          {/* Common Mistakes & Misconceptions */}
          {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
            <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-100 space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-rose-950">
                <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
                <span>Common Mistakes & Misconceptions</span>
              </div>
              <ul className="space-y-2">
                {lesson.commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="text-xs text-rose-900 font-medium flex items-start gap-2 bg-white p-2.5 rounded-xl border border-rose-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* PYQ Focus Callout */}
          {lesson.pyqFocus && (
            <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-100 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-extrabold text-purple-950">
                <HelpCircle className="h-4 w-4 text-purple-600 shrink-0" />
                <span>Past Year Question (PYQ) Trends</span>
              </div>
              <p className="text-xs text-purple-900 font-medium leading-relaxed">
                {lesson.pyqFocus}
              </p>
            </div>
          )}

          {/* Quick Revision Checklist */}
          {lesson.quickRevision && lesson.quickRevision.length > 0 && (
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100 space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-950">
                <Zap className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Quick Revision Checklist</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {lesson.quickRevision.map((item, idx) => (
                  <div key={idx} className="text-xs text-emerald-900 font-semibold bg-white p-2 rounded-xl border border-emerald-100 flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Terms Glossary */}
          {lesson.keyTerms && lesson.keyTerms.length > 0 && (
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-gray-900">
                <BookMarked className="h-4 w-4 text-indigo-600 shrink-0" />
                <span>Key Terms & Glossary</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lesson.keyTerms.map((kt, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-gray-200 space-y-1">
                    <h5 className="text-xs font-black text-indigo-600">{kt.term}</h5>
                    <p className="text-[11px] text-gray-600 font-medium leading-normal">{kt.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-9 text-xs font-bold rounded-xl"
          >
            Close Reader
          </Button>

          <Button
            size="sm"
            onClick={handleMarkComplete}
            disabled={isCompleted}
            className={`h-9 font-bold text-xs rounded-xl px-5 transition-all shadow-2xs ${
              isCompleted
                ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-default"
                : "bg-[#4F46E5] hover:bg-indigo-700 text-white"
            }`}
          >
            {isCompleted ? (
              <>
                Completed <CheckCircle2 className="ml-1.5 h-4 w-4" />
              </>
            ) : (
              <>
                Mark as Complete <Check className="ml-1.5 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
