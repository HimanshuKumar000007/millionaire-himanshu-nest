"use client";
import * as React from "react";
import { CheckCircle2 } from "lucide-react";

interface TextBlockProps {
  content: { html?: string; text?: string };
}

export function TextBlock({ content }: TextBlockProps) {
  const rawHtml = content.html || content.text || "";
  if (!rawHtml.trim()) return null;

  return (
    <div
      className="
        text-xs sm:text-sm text-gray-700 leading-relaxed font-medium space-y-3
        [&_strong]:font-extrabold [&_strong]:text-gray-900
        [&_em]:italic
        [&_p]:leading-relaxed [&_p]:mb-3
        [&_ul]:space-y-2.5 [&_ul]:my-4 [&_ul]:pl-0 [&_ul]:list-none
        [&_li]:flex [&_li]:items-start [&_li]:gap-2.5 [&_li]:text-xs [&_li]:sm:text-sm [&_li]:text-gray-800 [&_li]:font-medium
        [&_li]:before:content-['✓'] [&_li]:before:inline-flex [&_li]:before:items-center [&_li]:before:justify-center [&_li]:before:h-4 [&_li]:before:w-4 [&_li]:before:rounded-full [&_li]:before:bg-emerald-500 [&_li]:before:text-white [&_li]:before:text-[10px] [&_li]:before:font-black [&_li]:before:shrink-0 [&_li]:before:mt-0.5
      "
      dangerouslySetInnerHTML={{ __html: rawHtml }}
    />
  );
}
