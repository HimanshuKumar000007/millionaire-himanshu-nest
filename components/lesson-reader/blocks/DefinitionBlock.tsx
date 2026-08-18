"use client";
import * as React from "react";

interface DefinitionBlockProps {
  content: {
    term: string;
    definition: string;
    pronunciation?: string;
    partOfSpeech?: string;
  };
}

export function DefinitionBlock({ content }: DefinitionBlockProps) {
  return (
    <div className="rounded-xl border-l-4 border-l-indigo-400 bg-indigo-50/60 p-5 space-y-2">
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-[18px] font-semibold text-indigo-900 leading-tight">
          {content.term}
        </span>
        {content.pronunciation && (
          <span className="text-[13px] text-gray-500 italic">/{content.pronunciation}/</span>
        )}
        {content.partOfSpeech && (
          <span className="text-[11px] text-gray-400 font-medium">{content.partOfSpeech}</span>
        )}
      </div>
      <p className="text-[15px] text-gray-700 leading-relaxed">{content.definition}</p>
    </div>
  );
}
