"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Target, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { DashboardAIInsight } from "@/lib/types/ai";
import { DashboardSection } from "@/lib/types/dashboard";
import { Button } from "@/components/ui/button";

interface SmartPrepAIInsightProps {
  onNavigate?: (section: DashboardSection) => void;
}

export function SmartPrepAIInsight({ onNavigate }: SmartPrepAIInsightProps) {
  const [insight, setInsight] = useState<DashboardAIInsight | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchAIInsight = React.useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await fetch("/api/ai/dashboard-insight");
      if (!res.ok) throw new Error("Failed to fetch insight");
      const data = await res.json();
      if (data.success && data.insight) {
        setInsight(data.insight);
      } else {
        throw new Error("Invalid response format");
      }
    } catch {
      setIsError(true);
      // Fallback deterministic insight
      setInsight({
        headline: "Focus on your high-priority weak topics",
        summary: "Target Cell Biology and Organic Chemistry PYQs to boost your overall accuracy across NEST subjects.",
        strongestSubject: "Physics",
        focusSubject: "Biology",
        recommendedAction: "Practice Biology Questions",
        recommendedRoute: "practice",
        reason: "Targeting your focus area builds consistency.",
        isFallback: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAIInsight();
  }, [fetchAIInsight]);

  return (
    <div className="bg-gradient-to-r from-[#F5F3FF] via-[#EEF2FF] to-[#FAF5FF] rounded-2xl border border-indigo-200/90 p-5 sm:p-6 shadow-xs relative overflow-hidden space-y-4">
      {/* Top Header Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-[#4F46E5] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-xs font-black text-gray-900 tracking-wide uppercase">
            ✦ SciPrep AI Insight
          </span>
        </div>

        {insight?.isFallback && (
          <span className="text-[10px] font-bold text-gray-500 bg-white/80 px-2 py-0.5 rounded-md border border-gray-200">
            Offline Mode
          </span>
        )}
      </div>

      {isLoading ? (
        /* Skeleton Loading State */
        <div className="space-y-3 animate-pulse py-2">
          <div className="h-5 bg-indigo-200/60 rounded-md w-3/4" />
          <div className="h-4 bg-indigo-100/70 rounded-md w-full" />
          <div className="h-4 bg-indigo-100/70 rounded-md w-5/6" />
          <div className="h-8 bg-indigo-200/40 rounded-xl w-40 mt-2" />
        </div>
      ) : isError && !insight ? (
        /* Error State */
        <div className="flex items-center justify-between py-2 text-xs text-rose-600 font-medium">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>AI insight temporarily unavailable.</span>
          </div>
          <button suppressHydrationWarning
            onClick={fetchAIInsight}
            className="text-[#4F46E5] hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="h-3 w-3" /> Try Again
          </button>
        </div>
      ) : (
        /* Active AI Insight Content */
        <div className="space-y-4">
          <div className="space-y-1.5">
            <h3 className="text-sm sm:text-base font-black text-gray-900 tracking-tight leading-snug">
              {insight?.headline}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
              {insight?.summary}
            </p>
          </div>

          {/* Subject Metrics Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {insight?.strongestSubject && insight.strongestSubject !== "—" && (
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                <span>Strongest: {insight.strongestSubject}</span>
              </div>
            )}

            {insight?.focusSubject && insight.focusSubject !== "—" && (
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                <Target className="h-3.5 w-3.5 text-amber-600" />
                <span>Focus Area: {insight.focusSubject}</span>
              </div>
            )}
          </div>

          {/* Action CTA Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-indigo-100/80">
            <div className="text-xs text-gray-500 font-medium">
              <span className="font-bold text-gray-700">Recommended Next Step: </span>
              {insight?.recommendedAction}
            </div>

            <Button
              onClick={() => onNavigate && onNavigate(insight?.recommendedRoute || "practice")}
              size="sm"
              className="bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold text-xs h-9 px-4 rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>Start Recommended Practice</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
