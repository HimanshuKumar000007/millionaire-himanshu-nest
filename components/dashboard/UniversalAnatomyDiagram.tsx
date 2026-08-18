"use client";

import React from "react";
import { Layers, ArrowRight, ArrowDown, ShieldCheck, Microscope, Info } from "lucide-react";
import { renderFormattedDiagramText } from "@/lib/utils/formatDiagramText";

export interface AnatomyLayer {
  name: string;
  badge?: string;
  callout?: string;
  subtext?: string;
  accentColor?: "indigo" | "purple" | "emerald" | "amber" | "rose" | "cyan" | "slate";
}

export interface UniversalAnatomyData {
  badgeText?: string;
  title: string;
  subtitle?: string;
  takeawayText?: string;
  layers: AnatomyLayer[];
}

const colorStyles = {
  indigo: {
    badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
    card: "bg-white border-indigo-200 hover:border-indigo-400",
    calloutBg: "bg-indigo-50 border-indigo-200 text-indigo-900",
    dot: "bg-indigo-500",
    arrow: "text-indigo-600",
  },
  purple: {
    badge: "bg-purple-100 text-purple-800 border-purple-200",
    card: "bg-white border-purple-200 hover:border-purple-400",
    calloutBg: "bg-purple-50 border-purple-200 text-purple-900",
    dot: "bg-purple-500",
    arrow: "text-purple-600",
  },
  emerald: {
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    card: "bg-white border-emerald-200 hover:border-emerald-400",
    calloutBg: "bg-emerald-50 border-emerald-200 text-emerald-900",
    dot: "bg-emerald-500",
    arrow: "text-emerald-600",
  },
  amber: {
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    card: "bg-white border-amber-200 hover:border-amber-400",
    calloutBg: "bg-amber-50 border-amber-200 text-amber-900",
    dot: "bg-amber-500",
    arrow: "text-amber-600",
  },
  rose: {
    badge: "bg-rose-100 text-rose-800 border-rose-200",
    card: "bg-white border-rose-200 hover:border-rose-400",
    calloutBg: "bg-rose-50 border-rose-200 text-rose-900",
    dot: "bg-rose-500",
    arrow: "text-rose-600",
  },
  cyan: {
    badge: "bg-cyan-100 text-cyan-800 border-cyan-200",
    card: "bg-white border-cyan-200 hover:border-cyan-400",
    calloutBg: "bg-cyan-50 border-cyan-200 text-cyan-900",
    dot: "bg-cyan-500",
    arrow: "text-cyan-600",
  },
  slate: {
    badge: "bg-slate-100 text-slate-800 border-slate-200",
    card: "bg-white border-slate-200 hover:border-slate-400",
    calloutBg: "bg-slate-50 border-slate-200 text-slate-900",
    dot: "bg-slate-500",
    arrow: "text-slate-600",
  },
};

const defaultColorSequence: ("indigo" | "purple" | "emerald" | "amber" | "rose" | "cyan")[] = [
  "indigo",
  "purple",
  "emerald",
  "amber",
  "cyan",
  "rose",
];

export const UniversalAnatomyDiagram: React.FC<{ data: UniversalAnatomyData }> = ({ data }) => {
  const badgeText = data.badgeText || "ANATOMICAL ARCHITECTURE";
  const layers = data.layers || [];

  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border border-indigo-100/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-2xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-[#4F46E5] border border-indigo-200 shadow-2xs flex items-center gap-1.5">
          <Microscope className="w-3.5 h-3.5 text-[#4F46E5]" />
          {badgeText}
        </span>
        <div className="p-5 rounded-2xl bg-white border border-indigo-200/90 shadow-sm w-full space-y-1.5 group hover:border-[#4F46E5] transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            {renderFormattedDiagramText(data.title)}
          </h4>
          {data.subtitle && (
            <p className="text-xs sm:text-sm font-semibold text-slate-600">
              {renderFormattedDiagramText(data.subtitle)}
            </p>
          )}
        </div>
      </div>

      {/* Vertical Stacked Anatomical Layers */}
      <div className="max-w-2xl mx-auto space-y-3">
        {layers.map((layer, idx) => {
          const colorKey = layer.accentColor || defaultColorSequence[idx % defaultColorSequence.length];
          const st = colorStyles[colorKey] || colorStyles.indigo;
          const layerPos = idx === 0 ? "Apex / Upper" : idx === layers.length - 1 ? "Basal / Lower" : `Zone ${idx + 1}`;

          return (
            <div
              key={idx}
              className={`p-4 sm:p-5 rounded-2xl border-2 shadow-2xs transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${st.card}`}
            >
              {/* Left Layer Name */}
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${st.badge}`}>
                    {layer.badge || layerPos}
                  </span>
                  <h5 className="text-sm sm:text-base font-black text-slate-900">
                    {renderFormattedDiagramText(layer.name)}
                  </h5>
                </div>
                {layer.subtext && (
                  <p className="text-xs text-slate-600 font-medium">
                    {renderFormattedDiagramText(layer.subtext)}
                  </p>
                )}
              </div>

              {/* Right Callout Annotation */}
              {layer.callout && (
                <div className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold ${st.calloutBg}`}>
                  <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${st.arrow}`} />
                  <span>{renderFormattedDiagramText(layer.callout)}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Takeaway Pill */}
      {data.takeawayText && (
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between gap-4 text-xs font-extrabold text-[#4F46E5]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#4F46E5] shrink-0" />
            <span>{renderFormattedDiagramText(data.takeawayText)}</span>
          </div>
        </div>
      )}

    </div>
  );
};

/**
 * Universal ASCII Stacked Anatomy Parser
 * Parses ASCII cross sections, vertical box diagrams, and callout arrows (<--, ←)
 */
export function parseAsciiToAnatomy(ascii: string): UniversalAnatomyData | null {
  if (!ascii) return null;

  const hasAnatomyMarkers =
    ascii.includes("<--") ||
    ascii.includes("←") ||
    ascii.includes("<──") ||
    ascii.includes("-->") ||
    ascii.includes("──►") ||
    (ascii.includes("┌") && ascii.includes("│") && ascii.includes("└"));

  if (!hasAnatomyMarkers) return null;

  try {
    const rawLines = ascii.split("\n");
    const lines = rawLines.map((l) => l.trimEnd()).filter((l) => l.trim().length > 0);
    if (lines.length < 2) return null;

    // 1. Extract Title from first line
    let title = lines[0].replace(/[│|┌┐└┘\+─\[\]▼v┴┬┼├┤=~•]/g, "").trim();
    if (!title || title.length < 3) {
      title = "ANATOMICAL ARCHITECTURE";
    }

    const layers: AnatomyLayer[] = [];

    // Helper to clean box characters
    const cleanBox = (str: string) =>
      str.replace(/[│|┌┐└┘\+─\[\]\/\\_├┤┴┬┼=~•]/g, " ").replace(/\s+/g, " ").trim();

    // Helper to check if a line is purely border
    const isBorderLine = (str: string) => {
      const clean = cleanBox(str);
      return clean.length === 0;
    };

    let hasSeenBorderSinceLastLayer = true;

    // 2. Iterate through lines to extract stacked layers and callout arrows
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];

      // Check if line is purely horizontal box borders (e.g. ├─────────┤ or └─────────┘)
      if (isBorderLine(line)) {
        hasSeenBorderSinceLastLayer = true;
        continue;
      }

      // Check for callout arrow
      const arrowMatch = line.match(/(?:<--|←|<──|-->|──►)\s*(.+)$/);
      const calloutText = arrowMatch ? arrowMatch[1].trim() : "";

      // Extract left/box text
      const leftPart = arrowMatch ? line.substring(0, arrowMatch.index) : line;
      const cleanLeft = cleanBox(leftPart);

      if (calloutText) {
        if (cleanLeft) {
          layers.push({
            name: cleanLeft,
            callout: calloutText,
          });
          hasSeenBorderSinceLastLayer = false;
        } else if (layers.length > 0 && !layers[layers.length - 1].callout) {
          layers[layers.length - 1].callout = calloutText;
        } else {
          layers.push({
            name: calloutText,
          });
          hasSeenBorderSinceLastLayer = false;
        }
      } else if (cleanLeft) {
        if (!hasSeenBorderSinceLastLayer && layers.length > 0) {
          layers[layers.length - 1].name += " " + cleanLeft;
        } else {
          layers.push({
            name: cleanLeft,
          });
          hasSeenBorderSinceLastLayer = false;
        }
      }
    }

    // Filter out empty or non-alphabetic layers
    const validLayers = layers.filter((l) => l.name && l.name.length >= 2 && /[a-zA-Z]/.test(l.name));

    if (validLayers.length >= 2) {
      return {
        badgeText: "ANATOMICAL CROSS-SECTION",
        title,
        layers: validLayers,
      };
    }

    return null;
  } catch (err) {
    return null;
  }
}
