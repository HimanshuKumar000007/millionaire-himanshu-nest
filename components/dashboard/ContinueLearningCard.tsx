"use client";

import * as React from "react";
import { BookOpen, ArrowRight } from "lucide-react";
import { ContinueLearningItem } from "@/lib/types/dashboard";

interface ContinueLearningCardProps {
  onNavigate?: (section: string) => void;
  items?: ContinueLearningItem[];
}

export function ContinueLearningCard({ onNavigate, items = [] }: ContinueLearningCardProps) {
  const hasItems = items.length > 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs space-y-4 relative">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-gray-900">Continue Learning</h3>
        {hasItems && (
          <button suppressHydrationWarning
            onClick={() => onNavigate?.("smart-lessons")}
            className="text-xs font-bold text-[#4F46E5] hover:underline flex items-center gap-1"
          >
            <span>All Lessons</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        )}
      </div>

      {hasItems ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {items.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-gray-50/50 rounded-xl p-4 border border-gray-100/90 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold ${item.badgeBg}`}>
                  {item.badge}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 leading-snug">{item.title}</h4>
                  <p className="text-[11px] text-gray-400 font-medium">{item.subtitle}</p>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                {item.progress > 0 ? (
                  <div className="space-y-1">
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.badge.toLowerCase().includes("lesson") ? "bg-[#4F46E5]" : "bg-[#10B981]"}`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium block">
                      {item.progressText}
                    </span>
                  </div>
                ) : (
                  <span className="text-[10px] text-gray-400 font-medium block pb-1">
                    {item.progressText}
                  </span>
                )}

                <button suppressHydrationWarning
                  onClick={() => onNavigate?.(item.route)}
                  className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${item.buttonStyle}`}
                >
                  {item.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
          <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-[#4F46E5]" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-700">Nothing in progress yet</p>
            <p className="text-[11px] text-gray-400 font-medium mt-0.5">
              Start a Smart Lesson, PYQ, or Mock Test to see it here.
            </p>
          </div>
          <button suppressHydrationWarning
            onClick={() => onNavigate?.("smart-lessons")}
            className="mt-1 text-xs font-bold text-[#4F46E5] hover:underline flex items-center gap-1"
          >
            Browse Smart Lessons <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}
