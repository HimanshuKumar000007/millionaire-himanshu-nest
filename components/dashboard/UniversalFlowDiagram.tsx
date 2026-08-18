"use client";

import React from "react";
import { ArrowRight, CheckCircle2, Sparkles, Zap, GitCommit, Layers, ArrowDown } from "lucide-react";
import { renderFormattedDiagramText } from "@/lib/utils/formatDiagramText";

export interface FlowStep {
  id?: string;
  stepNumber?: number | string;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeVariant?: "indigo" | "purple" | "emerald" | "amber" | "rose" | "cyan";
  items?: string[];
  note?: string;
}

export interface UniversalFlowData {
  badgeText?: string;
  title: string;
  subtitle?: string;
  steps: FlowStep[];
  takeawayText?: string;
}

export interface UniversalFlowDiagramProps {
  data?: UniversalFlowData;
  badgeText?: string;
  title?: string;
  subtitle?: string;
  steps?: FlowStep[];
  takeawayText?: string;
  asciiText?: string;
}

const colorMap = {
  indigo: {
    border: "border-indigo-200 hover:border-indigo-400",
    badge: "bg-indigo-100 text-indigo-800",
    bg: "bg-white",
    stepNum: "bg-indigo-600 text-white",
    arrow: "text-indigo-400",
  },
  purple: {
    border: "border-purple-200 hover:border-purple-400",
    badge: "bg-purple-100 text-purple-800",
    bg: "bg-white",
    stepNum: "bg-purple-600 text-white",
    arrow: "text-purple-400",
  },
  emerald: {
    border: "border-emerald-200 hover:border-emerald-400",
    badge: "bg-emerald-100 text-emerald-800",
    bg: "bg-white",
    stepNum: "bg-emerald-600 text-white",
    arrow: "text-emerald-400",
  },
  amber: {
    border: "border-amber-200 hover:border-amber-400",
    badge: "bg-amber-100 text-amber-800",
    bg: "bg-white",
    stepNum: "bg-amber-600 text-white",
    arrow: "text-amber-400",
  },
  rose: {
    border: "border-rose-200 hover:border-rose-400",
    badge: "bg-rose-100 text-rose-800",
    bg: "bg-white",
    stepNum: "bg-rose-600 text-white",
    arrow: "text-rose-400",
  },
  cyan: {
    border: "border-cyan-200 hover:border-cyan-400",
    badge: "bg-cyan-100 text-cyan-800",
    bg: "bg-white",
    stepNum: "bg-cyan-600 text-white",
    arrow: "text-cyan-400",
  },
};

const defaultVariants: ("indigo" | "purple" | "emerald" | "amber" | "rose" | "cyan")[] = [
  "indigo",
  "purple",
  "emerald",
  "amber",
  "rose",
  "cyan",
];

/**
 * Intelligent ASCII flow parser for horizontal chains, numbered stages, and arrow sequences
 */
export function parseAsciiToFlow(ascii: string): UniversalFlowData | null {
  if (!ascii) return null;
  const hasFlowSymbols =
    ascii.includes("──►") ||
    ascii.includes("-->") ||
    ascii.includes("->") ||
    ascii.includes("◄──") ||
    ascii.includes("Stage 0:") ||
    ascii.includes("Stage I:") ||
    (ascii.includes("[") && ascii.includes("]") && (ascii.includes("│") || ascii.includes("|") || ascii.includes("↓"))) ||
    /^\s*\d+\.\s+[A-Za-z]/m.test(ascii);

  if (!hasFlowSymbols) return null;

  try {
    const rawLines = ascii.split("\n");
    const lines = rawLines.map((l) => l.trimEnd()).filter((l) => l.trim().length > 0);
    if (lines.length === 0) return null;

    const title = lines[0].replace(/[│|┌┐└┘\+─\-\[\]▼v┴┬┼]/g, "").trim() || "PROCESS PIPELINE";
    const bodyLines = lines.slice(1);
    const steps: FlowStep[] = [];

    // Case A: Bracketed Flow: [ Node Title ] (Subtitle/Notes) separated by │ or | or ↓
    const bracketMatches: { title: string; note?: string }[] = [];
    const bracketRegex = /\[\s*([^\]]+?)\s*\](?:\s*\(([^\)]+?)\))?/;

    bodyLines.forEach((line) => {
      const match = line.match(bracketRegex);
      if (match) {
        bracketMatches.push({
          title: match[1].trim(),
          note: match[2] ? match[2].trim() : undefined,
        });
      }
    });

    if (bracketMatches.length >= 2) {
      const flowSteps: FlowStep[] = bracketMatches.map((bm, idx) => ({
        stepNumber: idx + 1,
        title: bm.title,
        note: bm.note,
        badgeVariant: defaultVariants[idx % defaultVariants.length],
      }));

      return {
        badgeText: "FLORAL ARCHITECTURE FLOW",
        title,
        steps: flowSteps,
      };
    }

    // Case B: Numbered comparison lines (e.g. 1. F+ x F- CROSS, 2. Hfr x F- CROSS)
    let currentStep: FlowStep | null = null;
    let stepCount = 1;

    bodyLines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed === "│" || trimmed === "|" || trimmed === "↓") return;

      const numMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);

      if (numMatch) {
        if (currentStep) steps.push(currentStep);
        currentStep = {
          stepNumber: numMatch[1],
          title: numMatch[2].trim(),
          badgeVariant: defaultVariants[(stepCount - 1) % defaultVariants.length],
          items: [],
        };
        stepCount++;
        return;
      }

      // Stage I:, Stage II:, etc.
      const stageMatch = trimmed.match(/^(Stage\s+[0-9IVXLCDM]+):\s*([^─\-►>]+)(?:[─\-►>]+)(.+)$/i);
      if (stageMatch) {
        steps.push({
          stepNumber: stageMatch[1].trim(),
          title: stageMatch[2].trim(),
          note: stageMatch[3].trim(),
          badgeVariant: defaultVariants[steps.length % defaultVariants.length],
        });
        return;
      }

      if (currentStep) {
        const cleanLine = trimmed.replace(/^[─\-►◄\s]+/, "").trim();
        if (cleanLine.length > 2) {
          currentStep.items = currentStep.items || [];
          currentStep.items.push(cleanLine);
        }
      }
    });

    if (currentStep) steps.push(currentStep);

    // Case C: Single line horizontal chain with ──► (e.g. A ──► B ──► C)
    if (steps.length === 0) {
      const fullText = bodyLines.join(" ");
      const rawSegments = fullText.split(/[─\-]{2,}►|-->|->/);
      if (rawSegments.length >= 2) {
        rawSegments.forEach((seg, idx) => {
          const clean = seg.replace(/[│|┌┐└┘\+─\-\[\]▼v┴┬┼]/g, "").trim();
          if (clean.length > 1) {
            steps.push({
              stepNumber: idx + 1,
              title: clean,
              badgeVariant: defaultVariants[idx % defaultVariants.length],
            });
          }
        });
      }
    }

    if (steps.length >= 2) {
      return {
        badgeText: "SEQUENTIAL MECHANISM",
        title,
        steps,
      };
    }
  } catch {
    return null;
  }

  return null;
}

export const UniversalFlowDiagram: React.FC<UniversalFlowDiagramProps> = (props) => {
  let flowData: UniversalFlowData | null = props.data || null;

  if (!flowData && props.title && props.steps) {
    flowData = {
      badgeText: props.badgeText,
      title: props.title,
      subtitle: props.subtitle,
      steps: props.steps,
      takeawayText: props.takeawayText,
    };
  }

  if (!flowData && props.asciiText) {
    flowData = parseAsciiToFlow(props.asciiText);
  }

  if (!flowData || !flowData.steps || flowData.steps.length === 0) {
    return null;
  }

  const { badgeText = "PROCESS SEQUENCE", title, subtitle, steps, takeawayText } = flowData;

  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border border-indigo-100/90 p-6 sm:p-8 shadow-md space-y-6 select-none">
      
      {/* Top Header Card */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-[#4F46E5] border border-indigo-200 shadow-2xs flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
          {badgeText}
        </span>
        <div className="p-5 rounded-2xl bg-white border border-indigo-200/90 shadow-sm w-full space-y-1.5 group hover:border-[#4F46E5] transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            {renderFormattedDiagramText(title)}
          </h4>
          {subtitle && (
            <p className="text-xs sm:text-sm font-semibold text-slate-600">
              {renderFormattedDiagramText(subtitle)}
            </p>
          )}
        </div>
      </div>

      {/* Steps Pipeline */}
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const vKey = step.badgeVariant || defaultVariants[idx % defaultVariants.length];
          const cTheme = colorMap[vKey] || colorMap.indigo;

          return (
            <div key={idx} className="relative">
              <div
                className={`p-5 rounded-2xl border-2 ${cTheme.border} ${cTheme.bg} shadow-2xs space-y-3 hover:shadow-md transition-all`}
              >
                <div className="flex items-center justify-between gap-3 pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    {step.stepNumber && (
                      <span
                        className={`h-7 w-7 rounded-xl font-black text-xs flex items-center justify-center shadow-xs shrink-0 ${cTheme.stepNum}`}
                      >
                        {step.stepNumber}
                      </span>
                    )}
                    <div>
                      <h5 className="text-sm font-black text-slate-900 leading-tight">
                        {renderFormattedDiagramText(step.title)}
                      </h5>
                      {step.subtitle && (
                        <span className="text-[10px] sm:text-[11px] font-bold text-gray-500 block leading-tight mt-0.5">
                          {renderFormattedDiagramText(step.subtitle)}
                        </span>
                      )}
                    </div>
                  </div>
                  {step.badge && (
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-black shrink-0 ${cTheme.badge}`}>
                      {step.badge}
                    </span>
                  )}
                </div>

                {/* Items */}
                {step.items && step.items.length > 0 && (
                  <div className="space-y-1.5 text-xs font-medium">
                    {step.items.map((it, itIdx) => (
                      <div
                        key={itIdx}
                        className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold leading-snug"
                      >
                        {renderFormattedDiagramText(it)}
                      </div>
                    ))}
                  </div>
                )}

                {/* Note */}
                {step.note && (
                  <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                    {renderFormattedDiagramText(step.note)}
                  </p>
                )}
              </div>

              {/* Connecting Down Arrow between cards */}
              {idx < steps.length - 1 && (
                <div className="flex justify-center my-1.5 text-indigo-400">
                  <ArrowDown className="w-5 h-5 animate-bounce" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Takeaway */}
      {takeawayText && (
        <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between gap-4 text-xs font-extrabold text-[#4F46E5]">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#4F46E5] shrink-0" />
            <span>{renderFormattedDiagramText(takeawayText)}</span>
          </div>
        </div>
      )}
    </div>
  );
};
