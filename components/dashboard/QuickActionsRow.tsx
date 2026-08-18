"use client";

import * as React from "react";
import { Play, FileText, Edit3, Target, BarChart2, ArrowRight } from "lucide-react";

interface QuickActionsRowProps {
  onNavigate?: (section: string) => void;
}

export function QuickActionsRow({ onNavigate }: QuickActionsRowProps) {
  const actions = [
    {
      id: "smart-lessons",
      title: "Smart Lessons",
      description: "Learn concepts with focused lessons",
      cta: "Browse Lessons",
      bgColor: "bg-[#6366F1]",
      textColor: "text-[#4F46E5]",
      icon: Play,
    },
    {
      id: "pyqs",
      title: "PYQs",
      description: "Practice previous year questions",
      cta: "Explore PYQs",
      bgColor: "bg-[#10B981]",
      textColor: "text-emerald-600",
      icon: FileText,
    },
    {
      id: "practice",
      title: "Practice",
      description: "Solve questions by topic and difficulty",
      cta: "Start Practice",
      bgColor: "bg-[#F59E0B]",
      textColor: "text-amber-600",
      icon: Edit3,
    },
    {
      id: "mock-tests",
      title: "Mock Tests",
      description: "Take full length mock tests",
      cta: "Take Mock",
      bgColor: "bg-[#EF4444]",
      textColor: "text-rose-600",
      icon: Target,
    },
    {
      id: "performance",
      title: "Performance",
      description: "Analyze your performance",
      cta: "View Performance",
      bgColor: "bg-[#3B82F6]",
      textColor: "text-blue-600",
      icon: BarChart2,
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-gray-900">Quick Actions</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <div
              suppressHydrationWarning
              key={act.id}
              onClick={() => onNavigate && onNavigate(act.id)}
              className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs hover:shadow-md hover:border-gray-300 transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className={`h-10 w-10 rounded-xl ${act.bgColor} text-white flex items-center justify-center shadow-xs`}>
                  <Icon className="h-5 w-5 fill-white/20" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#4F46E5] transition-colors">
                    {act.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-tight mt-0.5 line-clamp-2">
                    {act.description}
                  </p>
                </div>
              </div>

              <div className={`text-[11px] font-bold ${act.textColor} flex items-center gap-1 group-hover:translate-x-0.5 transition-transform`}>
                <span>{act.cta}</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
