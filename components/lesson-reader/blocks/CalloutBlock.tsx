"use client";
import * as React from "react";
import { Info, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import type { CalloutVariant } from "@/lib/types/lesson-reader";

interface CalloutBlockProps {
  content: { variant: CalloutVariant; title?: string; body: string };
}

const variantConfig: Record<CalloutVariant, {
  border: string; bg: string; icon: React.ReactNode; titleColor: string;
}> = {
  info: {
    border: "border-l-blue-500",
    bg: "bg-blue-50",
    icon: <Info className="h-4 w-4 text-blue-600" />,
    titleColor: "text-blue-700",
  },
  success: {
    border: "border-l-emerald-500",
    bg: "bg-emerald-50",
    icon: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
    titleColor: "text-emerald-700",
  },
  warning: {
    border: "border-l-amber-400",
    bg: "bg-amber-50",
    icon: <AlertTriangle className="h-4 w-4 text-amber-600" />,
    titleColor: "text-amber-700",
  },
  tip: {
    border: "border-l-violet-400",
    bg: "bg-violet-50",
    icon: <Lightbulb className="h-4 w-4 text-violet-600" />,
    titleColor: "text-violet-700",
  },
};

export function CalloutBlock({ content }: CalloutBlockProps) {
  const cfg = variantConfig[content.variant] || variantConfig.info;

  return (
    <div className={`rounded-xl border-l-4 ${cfg.border} ${cfg.bg} p-5 space-y-2`}>
      {content.title && (
        <div className="flex items-center gap-2">
          {cfg.icon}
          <span className={`text-[11px] font-bold uppercase tracking-wider ${cfg.titleColor}`}>
            {content.title}
          </span>
        </div>
      )}
      <div
        className="text-[15px] text-gray-800 leading-relaxed [&_strong]:font-semibold"
        dangerouslySetInnerHTML={{ __html: content.body }}
      />
    </div>
  );
}
