"use client";

import * as React from "react";
import { Compass, ArrowRight, Target } from "lucide-react";

interface NextMilestoneCardProps {
  onViewRoadmap?: () => void;
  milestoneText?: string;
  ctaText?: string;
}

export function NextMilestoneCard({
  onViewRoadmap,
  milestoneText,
  ctaText = "View Roadmap",
}: NextMilestoneCardProps) {
  const hasData = !!milestoneText && milestoneText !== "Complete Diagnostic Assessment";
  const displayText = milestoneText ?? "Complete your diagnostic assessment to unlock your personalized roadmap.";

  return (
    <div className="bg-gradient-to-r from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] rounded-2xl border border-amber-200/90 p-5 shadow-2xs relative overflow-hidden min-h-[160px] flex flex-col justify-between">
      {/* Content */}
      <div className="z-10 max-w-[220px] space-y-2">
        <div className="flex items-center gap-1.5 text-amber-900 font-extrabold text-xs">
          <div className="h-6 w-6 rounded-lg bg-amber-500/20 text-amber-800 flex items-center justify-center">
            {hasData ? <Compass className="h-3.5 w-3.5" /> : <Target className="h-3.5 w-3.5" />}
          </div>
          <span>{hasData ? "Your Next Milestone" : "Get Started"}</span>
        </div>

        <p className="text-xs font-semibold text-amber-950/80 leading-relaxed">
          {displayText}
        </p>

        <button suppressHydrationWarning
          onClick={onViewRoadmap}
          className="mt-2 bg-white/90 hover:bg-white text-gray-800 border border-amber-200/90 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all shadow-2xs inline-flex items-center gap-1"
        >
          <span>{ctaText}</span>
          <ArrowRight className="h-3 w-3 text-amber-700" />
        </button>
      </div>

      {/* Mountain & Red Flag Vector Illustration */}
      <div className="absolute right-0 bottom-0 w-36 h-28 pointer-events-none z-0 opacity-90">
        <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Back Mountain */}
          <path d="M70 120 L115 50 L160 120 Z" fill="#F59E0B" fillOpacity="0.4" />
          {/* Main Peak Mountain */}
          <path d="M10 120 L80 30 L150 120 Z" fill="#F97316" />
          {/* Shaded Side */}
          <path d="M80 30 L150 120 L80 120 Z" fill="#EA580C" />
          {/* Foreground Hill */}
          <path d="M-10 120 C30 90 90 95 130 120 Z" fill="#10B981" fillOpacity="0.85" />
          {/* Flag Pole */}
          <line x1="80" y1="30" x2="80" y2="12" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
          <path d="M80 12 L100 18 L80 24 Z" fill="#EF4444" />
        </svg>
      </div>
    </div>
  );
}
