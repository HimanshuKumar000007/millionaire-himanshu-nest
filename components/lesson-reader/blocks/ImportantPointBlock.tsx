"use client";
import * as React from "react";
import { AlertTriangle, Star } from "lucide-react";

interface ImportantPointBlockProps {
  content: { title?: string; body: string; icon?: "alert" | "star" | "none" };
}

export function ImportantPointBlock({ content }: ImportantPointBlockProps) {
  const title = content.title || "IMPORTANT";
  const icon = content.icon ?? "alert";

  return (
    <div className="rounded-2xl border-l-4 border-l-amber-400 bg-amber-50 p-6 space-y-3">
      <div className="flex items-center gap-2.5">
        {icon === "alert" && (
          <div className="h-7 w-7 rounded-lg bg-amber-200/70 flex items-center justify-center shrink-0">
            <AlertTriangle className="h-4 w-4 text-amber-700" />
          </div>
        )}
        {icon === "star" && (
          <div className="h-7 w-7 rounded-lg bg-amber-200/70 flex items-center justify-center shrink-0">
            <Star className="h-4 w-4 text-amber-700" />
          </div>
        )}
        <span className="text-[12px] font-bold text-amber-800 uppercase tracking-widest">{title}</span>
      </div>
      <div
        className="text-[16px] leading-[1.75] text-gray-800 [&_strong]:font-semibold [&_ul]:mt-3 [&_ul]:pl-5 [&_ul]:list-disc [&_ul]:space-y-1.5"
        dangerouslySetInnerHTML={{ __html: content.body }}
      />
    </div>
  );
}
