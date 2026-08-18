"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileCode2, Award, Sparkles, ArrowRight } from "lucide-react";
import { Recommendation, DashboardSection } from "@/lib/types/dashboard";

interface RecommendationsProps {
  recommendations: Recommendation[];
  onCtaClick?: (rec: Recommendation) => void;
  onNavigate?: (sec: DashboardSection) => void;
}

export function Recommendations({ recommendations, onCtaClick }: RecommendationsProps) {
  const getIcon = (type: Recommendation["type"]) => {
    switch (type) {
      case "lesson":
        return BookOpen;
      case "pyq":
        return FileCode2;
      case "mock":
        return Award;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs space-y-4">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-gray-900">
            Recommended For You
          </h3>
          <Badge variant="outline" className="text-[10px] bg-indigo-50 text-[#4F46E5] border-indigo-100 font-extrabold px-2 py-0.5 rounded-md">
            Data-Driven
          </Badge>
        </div>
        <p className="text-[11px] text-gray-500 font-medium">
          Personalized actions generated from your recent performance and accuracy metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {recommendations.map((rec) => {
          const Icon = getIcon(rec.type);
          return (
            <div
              key={rec.id}
              className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 flex flex-col justify-between space-y-4 hover:border-indigo-200 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#4F46E5] bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100/80 flex items-center gap-1">
                    <Icon className="h-3 w-3" />
                    Recommended {rec.type}
                  </span>
                  <span className="text-xs font-bold text-gray-500">{rec.subject}</span>
                </div>

                <h4 className="text-sm font-extrabold text-gray-900 leading-snug">
                  {rec.title}
                </h4>

                <p className="text-[11px] text-gray-500 leading-relaxed font-medium bg-white/80 p-3 rounded-xl border border-gray-100">
                  <span className="font-bold text-gray-700">Reason:</span> {rec.reason}
                </p>
              </div>

              <Button
                onClick={() => onCtaClick && onCtaClick(rec)}
                className="w-full h-8 bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-all"
              >
                {rec.ctaText}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
