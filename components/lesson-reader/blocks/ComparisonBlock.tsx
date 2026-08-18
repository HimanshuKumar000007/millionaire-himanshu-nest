"use client";
import * as React from "react";

interface ComparisonBlockProps {
  content: { headers: string[]; rows: string[][]; caption?: string };
}

export function ComparisonBlock({ content }: ComparisonBlockProps) {
  if (!content.headers || !content.rows) return null;

  return (
    <div className="space-y-3">
      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-[15px] border-collapse">
            <thead>
              <tr className="bg-gray-900">
                {content.headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-5 py-4 text-left text-[12px] font-bold text-gray-300 uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.rows.map((row, ri) => (
                <tr key={ri} className={`border-t border-gray-100 transition-colors hover:bg-indigo-50/30 ${ri % 2 === 0 ? "bg-white" : "bg-gray-50/60"}`}>
                  {row.map((cell, ci) => (
                    <td key={ci} className={`px-5 py-4 text-gray-700 leading-relaxed ${ci === 0 ? "font-semibold text-gray-900" : ""}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {content.caption && (
        <p className="text-[13px] text-gray-400 text-center px-2 italic">{content.caption}</p>
      )}
    </div>
  );
}
