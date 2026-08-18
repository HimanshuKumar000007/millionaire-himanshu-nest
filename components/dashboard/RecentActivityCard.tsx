"use client";

import * as React from "react";
import { FileText, Play, Target, Edit3, CheckCircle2, ArrowRight, Clock } from "lucide-react";
import { RecentActivityItem } from "@/lib/types/dashboard";

interface RecentActivityCardProps {
  onViewAll?: () => void;
  activities?: RecentActivityItem[];
}

export function RecentActivityCard({ onViewAll, activities = [] }: RecentActivityCardProps) {
  const hasActivity = activities.length > 0;

  const iconMap: Record<string, React.ElementType> = {
    pyq: FileText,
    lesson: Play,
    mock: Target,
    practice: Edit3,
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">Recent Activity</h3>
        <button suppressHydrationWarning
          onClick={onViewAll}
          className="text-xs font-bold text-[#4F46E5] hover:underline flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      {hasActivity ? (
        <div className="space-y-3">
          {activities.slice(0, 4).map((act) => {
            const Icon = iconMap[act.type] ?? FileText;
            return (
              <div
                key={act.id}
                className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-xl ${act.iconBg} flex items-center justify-center shrink-0`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 leading-tight">{act.title}</h4>
                    <p className="text-[10px] text-gray-400 font-medium mt-0.5">{act.time}</p>
                  </div>
                </div>

                {act.isScore && act.score ? (
                  <span className="text-xs font-black text-gray-900 shrink-0">{act.score}</span>
                ) : (
                  <div className="shrink-0 text-emerald-500">
                    <CheckCircle2 className="h-4 w-4 fill-emerald-100" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
          <div className="h-12 w-12 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Clock className="h-6 w-6 text-gray-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-700">No activity yet</p>
            <p className="text-[11px] text-gray-400 font-medium mt-0.5">
              Start a lesson, PYQ, or mock test to see your activity here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
