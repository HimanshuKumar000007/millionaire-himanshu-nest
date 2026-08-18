"use client";
import * as React from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface CommonMistakeBlockProps {
  content: { title?: string; mistake: string; correction: string };
}

export function CommonMistakeBlock({ content }: CommonMistakeBlockProps) {
  const title = content.title || "COMMON MISTAKE";

  return (
    <div className="rounded-2xl border-l-4 border-l-red-400 bg-red-50 p-6 space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="h-7 w-7 rounded-lg bg-red-200/70 flex items-center justify-center shrink-0">
          <AlertTriangle className="h-4 w-4 text-red-600" />
        </div>
        <span className="text-[12px] font-bold text-red-800 uppercase tracking-widest">{title}</span>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <span className="mt-1 h-6 w-6 rounded-full bg-red-100 border border-red-200 flex items-center justify-center shrink-0 text-red-500 text-[11px] font-bold">✕</span>
          <p className="text-[16px] text-gray-800 leading-[1.75]">{content.mistake}</p>
        </div>
        <div className="flex items-start gap-3 bg-white/60 rounded-xl p-4 border border-red-100">
          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <span className="text-[13px] font-semibold text-emerald-700 block mb-1">Correct approach</span>
            <p className="text-[16px] text-gray-700 leading-[1.75]">{content.correction}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
