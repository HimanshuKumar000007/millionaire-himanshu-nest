"use client";

import React from "react";
import {
  Sparkles,
  TreePine,
  Layers,
  Dna,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  GitBranch,
  Cpu,
  Utensils,
  HeartHandshake,
  HelpCircle,
} from "lucide-react";

export interface TreeBranchItem {
  text: string;
  badge?: string;
  subtext?: string;
}

export interface TreeBranchCard {
  id?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeVariant?: "indigo" | "purple" | "emerald" | "amber" | "rose" | "blue" | "slate";
  iconName?: string;
  items?: (string | TreeBranchItem)[];
  note?: string;
  footer?: string;
  accentColor?: "indigo" | "purple" | "emerald" | "amber" | "rose" | "blue" | "slate";
}

export interface ReusableBranchingTreeDiagramProps {
  badgeText?: string;
  title: string;
  subtitle?: string;
  branches: TreeBranchCard[];
  takeawayText?: string;
}

const colorMap = {
  indigo: {
    border: "border-indigo-200/90 hover:border-indigo-400",
    bgBadge: "bg-indigo-100 text-indigo-800",
    iconBg: "bg-indigo-50 border-indigo-200 text-[#4F46E5]",
    itemBg: "bg-indigo-50/50 border-indigo-100 text-indigo-950",
    footerBg: "bg-indigo-50/70 border-indigo-100 text-indigo-950",
    dot: "bg-indigo-500",
  },
  purple: {
    border: "border-purple-200/90 hover:border-purple-400",
    bgBadge: "bg-purple-100 text-purple-800",
    iconBg: "bg-purple-50 border-purple-200 text-purple-600",
    itemBg: "bg-purple-50/60 border-purple-100 text-purple-950",
    footerBg: "bg-purple-50/70 border-purple-100 text-purple-950",
    dot: "bg-purple-500",
  },
  emerald: {
    border: "border-emerald-200/90 hover:border-emerald-400",
    bgBadge: "bg-emerald-100 text-emerald-800",
    iconBg: "bg-emerald-50 border-emerald-200 text-emerald-600",
    itemBg: "bg-emerald-50/60 border-emerald-100 text-emerald-950",
    footerBg: "bg-emerald-50/70 border-emerald-100 text-emerald-950",
    dot: "bg-emerald-500",
  },
  amber: {
    border: "border-amber-200/90 hover:border-amber-400",
    bgBadge: "bg-amber-100 text-amber-800",
    iconBg: "bg-amber-50 border-amber-200 text-amber-600",
    itemBg: "bg-amber-50/60 border-amber-100 text-amber-950",
    footerBg: "bg-amber-50/70 border-amber-100 text-amber-950",
    dot: "bg-amber-500",
  },
  rose: {
    border: "border-rose-200/90 hover:border-rose-400",
    bgBadge: "bg-rose-100 text-rose-800",
    iconBg: "bg-rose-50 border-rose-200 text-rose-600",
    itemBg: "bg-rose-50/60 border-rose-100 text-rose-950",
    footerBg: "bg-rose-50/70 border-rose-100 text-rose-950",
    dot: "bg-rose-500",
  },
  blue: {
    border: "border-sky-200/90 hover:border-sky-400",
    bgBadge: "bg-sky-100 text-sky-800",
    iconBg: "bg-sky-50 border-sky-200 text-sky-600",
    itemBg: "bg-sky-50/60 border-sky-100 text-sky-950",
    footerBg: "bg-sky-50/70 border-sky-100 text-sky-950",
    dot: "bg-sky-500",
  },
  slate: {
    border: "border-slate-200 hover:border-slate-400",
    bgBadge: "bg-slate-100 text-slate-800",
    iconBg: "bg-slate-50 border-slate-200 text-slate-600",
    itemBg: "bg-slate-50 border-slate-100 text-slate-900",
    footerBg: "bg-slate-100 text-slate-800",
    dot: "bg-slate-500",
  },
};

function renderIcon(name?: string) {
  switch (name?.toLowerCase()) {
    case "treepine":
    case "tree":
      return <TreePine className="h-4 w-4" />;
    case "layers":
      return <Layers className="h-4 w-4" />;
    case "dna":
      return <Dna className="h-4 w-4" />;
    case "shieldcheck":
    case "shield":
      return <ShieldCheck className="h-4 w-4" />;
    case "alerttriangle":
    case "alert":
      return <AlertTriangle className="h-4 w-4" />;
    case "checkcircle2":
    case "check":
      return <CheckCircle2 className="h-4 w-4" />;
    case "cpu":
      return <Cpu className="h-4 w-4" />;
    case "utensils":
      return <Utensils className="h-4 w-4" />;
    case "hearthandshake":
      return <HeartHandshake className="h-4 w-4" />;
    case "sparkles":
      return <Sparkles className="h-4 w-4" />;
    default:
      return <GitBranch className="h-4 w-4" />;
  }
}

export const ReusableBranchingTreeDiagram: React.FC<ReusableBranchingTreeDiagramProps> = ({
  badgeText = "CLASSIFICATION ARCHITECTURE",
  title,
  subtitle,
  branches,
  takeawayText,
}) => {
  const branchCount = branches.length;

  const gridColsClass =
    branchCount === 2
      ? "grid-cols-1 md:grid-cols-2"
      : branchCount === 3
      ? "grid-cols-1 md:grid-cols-3"
      : branchCount === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5";

  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border border-indigo-100/90 p-6 sm:p-8 shadow-md space-y-8 select-none">
      {/* ════════════ TOP ROOT CARD ════════════ */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-[#4F46E5] border border-indigo-200 shadow-2xs flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
          {badgeText}
        </span>
        <div className="p-5 rounded-2xl bg-white border border-indigo-200/90 shadow-sm w-full space-y-1.5 group hover:border-[#4F46E5] transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            {title}
          </h4>
          {subtitle && (
            <p className="text-xs sm:text-sm font-semibold text-slate-600">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* ════════════ SVG FLOWCHART CONNECTORS ════════════ */}
      <div className="w-full flex justify-center -my-2 select-none pointer-events-none">
        {branchCount === 2 ? (
          <svg className="w-full max-w-2xl h-16 text-indigo-400" viewBox="0 0 600 70" fill="none">
            <line x1="300" y1="0" x2="300" y2="30" stroke="currentColor" strokeWidth="3" />
            <line x1="150" y1="30" x2="450" y2="30" stroke="currentColor" strokeWidth="3" />
            <line x1="150" y1="30" x2="150" y2="60" stroke="currentColor" strokeWidth="3" />
            <polygon points="144,58 156,58 150,68" fill="currentColor" />
            <line x1="450" y1="30" x2="450" y2="60" stroke="currentColor" strokeWidth="3" />
            <polygon points="444,58 456,58 450,68" fill="currentColor" />
          </svg>
        ) : branchCount === 3 ? (
          <svg className="w-full max-w-4xl h-16 text-indigo-400" viewBox="0 0 900 80" fill="none">
            <line x1="450" y1="0" x2="450" y2="35" stroke="currentColor" strokeWidth="3" />
            <line x1="150" y1="35" x2="750" y2="35" stroke="currentColor" strokeWidth="3" />
            <line x1="150" y1="35" x2="150" y2="70" stroke="currentColor" strokeWidth="3" />
            <polygon points="144,68 156,68 150,78" fill="currentColor" />
            <line x1="450" y1="35" x2="450" y2="70" stroke="currentColor" strokeWidth="3" />
            <polygon points="444,68 456,68 450,78" fill="currentColor" />
            <line x1="750" y1="35" x2="750" y2="70" stroke="currentColor" strokeWidth="3" />
            <polygon points="744,68 756,68 750,78" fill="currentColor" />
          </svg>
        ) : (
          <svg className="w-full max-w-5xl h-16 text-indigo-400" viewBox="0 0 1000 80" fill="none">
            <line x1="500" y1="0" x2="500" y2="35" stroke="currentColor" strokeWidth="3" />
            <line x1="120" y1="35" x2="880" y2="35" stroke="currentColor" strokeWidth="3" />
            {branches.map((_, i) => {
              const x = 120 + (i * 760) / (branchCount - 1);
              return (
                <React.Fragment key={i}>
                  <line x1={x} y1="35" x2={x} y2="70" stroke="currentColor" strokeWidth="3" />
                  <polygon points={`${x - 6},68 ${x + 6},68 ${x},78`} fill="currentColor" />
                </React.Fragment>
              );
            })}
          </svg>
        )}
      </div>

      {/* ════════════ BRANCH CARDS GRID ════════════ */}
      <div className={`grid ${gridColsClass} gap-5 relative`}>
        {branches.map((b, idx) => {
          const cTheme = colorMap[b.accentColor || (idx === 0 ? "indigo" : idx === 1 ? "purple" : "emerald")];

          return (
            <div
              key={idx}
              className={`rounded-2xl bg-white border-2 ${cTheme.border} p-5 shadow-sm space-y-3 hover:shadow-md transition-all flex flex-col justify-between`}
            >
              <div className="space-y-3">
                {/* Branch Header */}
                <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className={`h-8 w-8 rounded-xl border flex items-center justify-center font-black ${cTheme.iconBg}`}>
                      {renderIcon(b.iconName)}
                    </div>
                    <div>
                      <h5 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                        {b.title}
                      </h5>
                      {b.subtitle && (
                        <span className="text-[10px] font-bold text-gray-500 block">
                          {b.subtitle}
                        </span>
                      )}
                    </div>
                  </div>
                  {b.badge && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${cTheme.bgBadge}`}>
                      {b.badge}
                    </span>
                  )}
                </div>

                {/* Items List */}
                {b.items && b.items.length > 0 && (
                  <div className="space-y-1.5 text-xs font-medium">
                    {b.items.map((item, itIdx) => {
                      const isObj = typeof item !== "string";
                      const itText = isObj ? (item as TreeBranchItem).text : (item as string);
                      const itBadge = isObj ? (item as TreeBranchItem).badge : null;

                      return (
                        <div
                          key={itIdx}
                          className={`p-2 rounded-xl border flex items-center justify-between font-bold ${cTheme.itemBg}`}
                        >
                          <span>{itText}</span>
                          {itBadge && (
                            <span className="text-[9px] bg-white px-1.5 py-0.5 rounded shadow-2xs font-bold">
                              {itBadge}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Explanatory Note */}
                {b.note && (
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed pt-1">
                    {b.note}
                  </p>
                )}
              </div>

              {/* Bottom Footer Label */}
              {b.footer && (
                <div className={`p-2.5 rounded-xl border text-[11px] font-bold text-center mt-3 ${cTheme.footerBg}`}>
                  {b.footer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ════════════ OPTIONAL BOTTOM TAKEAWAY ════════════ */}
      {takeawayText && (
        <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between gap-4 text-xs font-extrabold text-[#4F46E5]">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-[#4F46E5] shrink-0" />
            <span>{takeawayText}</span>
          </div>
        </div>
      )}
    </div>
  );
};
