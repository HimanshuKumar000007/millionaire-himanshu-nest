"use client";
import * as React from "react";

interface HeadingBlockProps {
  content: { level: 2 | 3 | 4; text: string; anchorId?: string };
}

export function HeadingBlock({ content }: HeadingBlockProps) {
  const { level, text, anchorId } = content;
  const id = anchorId || text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  if (level === 2) {
    return (
      <h2
        id={id}
        className="text-xl sm:text-2xl font-black text-[#4F46E5] leading-snug tracking-tight mt-10 mb-4 scroll-mt-24"
      >
        {text}
      </h2>
    );
  }
  if (level === 3) {
    return (
      <h3
        id={id}
        className="text-lg font-black text-gray-900 leading-snug mt-8 mb-3 scroll-mt-24"
      >
        {text}
      </h3>
    );
  }
  return (
    <h4
      id={id}
      className="text-base font-bold text-gray-800 leading-snug mt-6 mb-2 scroll-mt-24"
    >
      {text}
    </h4>
  );
}
