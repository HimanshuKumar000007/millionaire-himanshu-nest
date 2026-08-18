"use client";
import * as React from "react";
import { Dna, Dog, Trees, Sparkles, Layers, Box } from "lucide-react";

export interface ConceptCardItem {
  title: string;
  description: string;
  example?: string;
  iconType?: "dna" | "species" | "ecosystem" | "default";
}

interface ConceptGridBlockProps {
  items: ConceptCardItem[];
}

const iconMap = {
  dna: { icon: Dna, bg: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  species: { icon: Dog, bg: "bg-blue-50 text-blue-600 border-blue-100" },
  ecosystem: { icon: Trees, bg: "bg-amber-50 text-amber-600 border-amber-100" },
  default: { icon: Layers, bg: "bg-indigo-50 text-indigo-600 border-indigo-100" },
};

export function ConceptGridBlock({ items }: ConceptGridBlockProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
      {items.map((item, idx) => {
        const type = item.iconType || (idx === 0 ? "dna" : idx === 1 ? "species" : idx === 2 ? "ecosystem" : "default");
        const cfg = iconMap[type] || iconMap.default;
        const Icon = cfg.icon;

        return (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-2xs space-y-3 flex flex-col justify-between hover:border-indigo-200 hover:shadow-xs transition-all"
          >
            <div className="space-y-3">
              {/* Icon Box */}
              <div className={`h-10 w-10 rounded-xl border flex items-center justify-center ${cfg.bg}`}>
                <Icon className="h-5 w-5" />
              </div>

              {/* Title */}
              <h4 className="text-sm font-black text-gray-900 leading-snug">
                {item.title}
              </h4>

              {/* Description */}
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Example */}
            {item.example && (
              <div className="pt-2 border-t border-gray-100">
                <span className="text-[11px] font-bold text-gray-800 block">
                  Example: <span className="text-gray-500 font-normal">{item.example}</span>
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
