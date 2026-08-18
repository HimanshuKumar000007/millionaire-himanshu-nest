"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, ArrowRight, Compass, Flag } from "lucide-react";
import { RoadmapSummary } from "@/lib/types/dashboard";

interface RoadmapPreviewProps {
  roadmap: RoadmapSummary;
  onViewFull?: () => void;
}

export function RoadmapPreview({ roadmap, onViewFull }: RoadmapPreviewProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Compass className="h-4 w-4 text-[#4F46E5]" /> NEST Preparation Roadmap
          </h3>
          <p className="text-[11px] text-gray-500 font-medium">
            Structured exam milestone track from diagnostic to exam day.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xl font-black text-gray-900">{roadmap.overallProgress}%</span>
          <span className="text-[10px] text-gray-400 block font-extrabold uppercase">Milestones Complete</span>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
        {roadmap.stages.map((stage, idx) => {
          const isCompleted = stage.status === "completed";
          const isCurrent = stage.status === "current";

          return (
            <div
              key={stage.name}
              className={`p-3 rounded-xl border flex flex-col justify-between space-y-2 text-xs transition-all ${
                isCurrent
                  ? "bg-indigo-50/80 border-indigo-200 ring-2 ring-indigo-500/20"
                  : isCompleted
                  ? "bg-emerald-50/50 border-emerald-100/80"
                  : "bg-gray-50/50 border-gray-100 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400">0{idx + 1}</span>
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                ) : isCurrent ? (
                  <span className="h-2 w-2 rounded-full bg-[#4F46E5] animate-ping" />
                ) : (
                  <Circle className="h-3.5 w-3.5 text-gray-300" />
                )}
              </div>

              <div>
                <span className={`font-extrabold block text-xs ${isCurrent ? "text-[#4F46E5]" : "text-gray-900"}`}>
                  {stage.name}
                </span>
                <span className="text-[9px] text-gray-500 font-semibold capitalize">
                  {stage.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Milestone Callout + CTA */}
      <div className="p-3.5 rounded-xl bg-gray-50/60 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#4F46E5]">
            <Flag className="h-3.5 w-3.5" />
            <span>Next Milestone Target</span>
          </div>
          <p className="text-xs text-gray-700 font-medium">
            {roadmap.nextMilestone}
          </p>
        </div>

        <Button
          onClick={onViewFull}
          variant="outline"
          size="sm"
          className="w-full sm:w-auto h-8 bg-white text-xs font-bold text-[#4F46E5] border-gray-200/80 hover:bg-indigo-50/50 rounded-xl shadow-2xs shrink-0 transition-all"
        >
          View Full Roadmap <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
