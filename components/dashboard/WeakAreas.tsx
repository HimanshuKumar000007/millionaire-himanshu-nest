"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight, BookOpen, Target, FileCode2 } from "lucide-react";
import { WeakArea } from "@/lib/types/dashboard";

interface WeakAreasProps {
  weakAreas: WeakArea[];
  onActionClick?: (action: WeakArea) => void;
}

export function WeakAreas({ weakAreas, onActionClick }: WeakAreasProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-1 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-bold text-gray-900">
            Areas to Improve
          </h3>
          <p className="text-[11px] text-gray-500 font-medium">
            High-priority topics where targeted practice yields maximum readiness gains.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {weakAreas.length === 0 ? (
          <div className="p-5 text-center text-xs text-gray-500 bg-gray-50/60 border border-gray-100 rounded-xl font-medium">
            No critical weak areas detected. Complete more PYQs to update insights.
          </div>
        ) : (
          weakAreas.map((area) => (
            <div
              key={area.id}
              className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/60 hover:border-indigo-200/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] font-extrabold text-[#4F46E5] bg-indigo-50 border-indigo-100 px-2 py-0.5 rounded-md">
                    {area.subject}
                  </Badge>
                  <Badge
                    variant={area.priority === "High Priority" ? "danger" : "warning"}
                    className="text-[10px] font-extrabold px-2 py-0.5 rounded-md"
                  >
                    {area.priority}
                  </Badge>
                </div>

                <h4 className="text-xs font-bold text-gray-900 leading-snug">
                  {area.topic}
                </h4>

                <div className="text-[11px] font-medium text-gray-500 flex items-center gap-1.5">
                  <span>Current Accuracy:</span>
                  <span className="font-mono font-bold text-rose-600">{area.accuracy}%</span>
                </div>
              </div>

              <Button
                onClick={() => onActionClick && onActionClick(area)}
                size="sm"
                className="w-full sm:w-auto h-9 bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shrink-0 self-start sm:self-center"
              >
                {area.recommendedAction} <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
