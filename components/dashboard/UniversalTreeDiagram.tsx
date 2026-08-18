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
  BookOpen,
  Info,
} from "lucide-react";
import { renderFormattedDiagramText } from "@/lib/utils/formatDiagramText";

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

export interface UniversalTreeData {
  badgeText?: string;
  title: string;
  subtitle?: string;
  branches: TreeBranchCard[];
  takeawayText?: string;
}

export interface UniversalTreeDiagramProps {
  data?: UniversalTreeData;
  badgeText?: string;
  title?: string;
  subtitle?: string;
  branches?: TreeBranchCard[];
  takeawayText?: string;
  asciiText?: string;
}

const colorMap = {
  indigo: {
    border: "border-indigo-200/90 hover:border-indigo-400",
    bgBadge: "bg-indigo-100 text-indigo-800",
    iconBg: "bg-indigo-50 border-indigo-200 text-[#4F46E5]",
    itemBg: "bg-indigo-50/50 border-indigo-100 text-indigo-950",
    footerBg: "bg-indigo-50/70 border-indigo-100 text-indigo-950",
  },
  purple: {
    border: "border-purple-200/90 hover:border-purple-400",
    bgBadge: "bg-purple-100 text-purple-800",
    iconBg: "bg-purple-50 border-purple-200 text-purple-600",
    itemBg: "bg-purple-50/60 border-purple-100 text-purple-950",
    footerBg: "bg-purple-50/70 border-purple-100 text-purple-950",
  },
  emerald: {
    border: "border-emerald-200/90 hover:border-emerald-400",
    bgBadge: "bg-emerald-100 text-emerald-800",
    iconBg: "bg-emerald-50 border-emerald-200 text-emerald-600",
    itemBg: "bg-emerald-50/60 border-emerald-100 text-emerald-950",
    footerBg: "bg-emerald-50/70 border-emerald-100 text-emerald-950",
  },
  amber: {
    border: "border-amber-200/90 hover:border-amber-400",
    bgBadge: "bg-amber-100 text-amber-800",
    iconBg: "bg-amber-50 border-amber-200 text-amber-600",
    itemBg: "bg-amber-50/60 border-amber-100 text-amber-950",
    footerBg: "bg-amber-50/70 border-amber-100 text-amber-950",
  },
  rose: {
    border: "border-rose-200/90 hover:border-rose-400",
    bgBadge: "bg-rose-100 text-rose-800",
    iconBg: "bg-rose-50 border-rose-200 text-rose-600",
    itemBg: "bg-rose-50/60 border-rose-100 text-rose-950",
    footerBg: "bg-rose-50/70 border-rose-100 text-rose-950",
  },
  blue: {
    border: "border-sky-200/90 hover:border-sky-400",
    bgBadge: "bg-sky-100 text-sky-800",
    iconBg: "bg-sky-50 border-sky-200 text-sky-600",
    itemBg: "bg-sky-50/60 border-sky-100 text-sky-950",
    footerBg: "bg-sky-50/70 border-sky-100 text-sky-950",
  },
  slate: {
    border: "border-slate-200 hover:border-slate-400",
    bgBadge: "bg-slate-100 text-slate-800",
    iconBg: "bg-slate-50 border-slate-200 text-slate-600",
    itemBg: "bg-slate-50 border-slate-100 text-slate-900",
    footerBg: "bg-slate-100 text-slate-800",
  },
};

const defaultColors: ("indigo" | "purple" | "emerald" | "amber" | "rose" | "blue")[] = [
  "indigo",
  "purple",
  "emerald",
  "amber",
  "rose",
  "blue",
];

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
    case "bookopen":
    case "book":
      return <BookOpen className="h-4 w-4" />;
    case "info":
      return <Info className="h-4 w-4" />;
    default:
      return <GitBranch className="h-4 w-4" />;
  }
}

/**
 * Parses raw ASCII flowchart trees into structured tree data
 */
export function parseAsciiToTree(ascii: string): UniversalTreeData | null {
  if (!ascii) return null;
  const hasTreeChars =
    ascii.includes("│") ||
    ascii.includes("├──") ||
    ascii.includes("┌") ||
    ascii.includes("▼") ||
    (ascii.includes("+") && ascii.includes("-") && (ascii.includes("|") || ascii.includes("v")));

  if (!hasTreeChars) return null;

  try {
    const rawLines = ascii.split("\n");
    const lines = rawLines.map((l) => l.trimEnd());
    if (lines.length < 3) return null;

    let title = lines[0].replace(/[│|┌┐└┘\+─\[\]▼v┴┬┼├┤=~•]/g, "").trim() || "CLASSIFICATION ARCHITECTURE";
    let subtitle: string | undefined = undefined;

    // Check for side-by-side multiple ASCII boxes (e.g. ┌──────┐ ... ┌──────┐)
    const boxTopLineIdx = lines.findIndex((l) => {
      const matches = l.match(/┌[─\-]+┐/g);
      return matches && matches.length >= 2;
    });

    if (boxTopLineIdx !== -1) {
      title = lines[0].replace(/[│|┌┐└┘\+─\[\]▼v┴┬┼├┤=~•]/g, "").trim() || "ANATOMICAL ARCHITECTURES";
      const boxTopLine = lines[boxTopLineIdx];
      const boxRanges: { start: number; end: number; center: number }[] = [];
      const boxTopRegex = /┌[─\-]+┐/g;
      let bMatch;
      while ((bMatch = boxTopRegex.exec(boxTopLine)) !== null) {
        const start = bMatch.index;
        const end = start + bMatch[0].length;
        boxRanges.push({ start, end, center: Math.floor((start + end) / 2) });
      }

      if (boxRanges.length >= 2) {
        const getBoxIndex = (pos: number, width = 1) => {
          const center = pos + Math.floor(width / 2);
          for (let i = 0; i < boxRanges.length; i++) {
            const br = boxRanges[i];
            if (pos >= br.start - 8 && pos <= br.end + 8) {
              return i;
            }
          }
          let best = 0;
          let minDist = Infinity;
          boxRanges.forEach((br, idx) => {
            const dist = Math.abs(center - br.center);
            if (dist < minDist) {
              minDist = dist;
              best = idx;
            }
          });
          return best;
        };

        const headerLines = lines.slice(1, boxTopLineIdx).filter((l) => l.trim().length > 0);
        const boxTitles: string[] = boxRanges.map(() => "");
        const boxSubtitles: string[] = boxRanges.map(() => "");

        headerLines.forEach((hLine) => {
          const chunks = hLine.split(/\s{2,}/);
          let curSearch = 0;
          chunks.forEach((chunk) => {
            const trimmed = chunk.trim();
            if (!trimmed) return;
            const pos = hLine.indexOf(trimmed, curSearch);
            curSearch = pos + trimmed.length;

            const bIdx = getBoxIndex(pos, trimmed.length);

            if (trimmed.startsWith("(") && trimmed.endsWith(")")) {
              const sub = trimmed.slice(1, -1).trim();
              boxSubtitles[bIdx] += (boxSubtitles[bIdx] ? " • " : "") + sub;
            } else {
              boxTitles[bIdx] += (boxTitles[bIdx] ? " " : "") + trimmed;
            }
          });
        });

        const boxLines = lines.slice(boxTopLineIdx + 1);
        const boxItems: { text: string }[][] = boxRanges.map(() => []);
        const currentLayerText: string[] = boxRanges.map(() => "");

        boxLines.forEach((bLine) => {
          if (!bLine.trim()) return;

          boxRanges.forEach((br, idx) => {
            const nextStart = idx + 1 < boxRanges.length ? boxRanges[idx + 1].start : bLine.length;
            const slice = bLine.substring(Math.max(0, br.start), Math.min(bLine.length, nextStart));
            const isDivider = /[├└][─\-]+[┤┘]/.test(slice.substring(0, br.end - br.start + 1)) || /^[│|\s]*[─\-]+[│|\s]*$/.test(slice.substring(0, br.end - br.start + 1));

            if (isDivider) {
              if (currentLayerText[idx].trim()) {
                boxItems[idx].push({ text: `• ${currentLayerText[idx].trim()}` });
                currentLayerText[idx] = "";
              }
            } else {
              const cleanText = slice.replace(/[│|┌┐└┘\+─\[\]]/g, " ").replace(/\s+/g, " ").trim();
              if (cleanText) {
                currentLayerText[idx] += (currentLayerText[idx] ? " " : "") + cleanText;
              }
            }
          });
        });

        boxRanges.forEach((_, idx) => {
          if (currentLayerText[idx].trim()) {
            boxItems[idx].push({ text: `• ${currentLayerText[idx].trim()}` });
          }
        });

        const branches: TreeBranchCard[] = boxRanges.map((_, idx) => {
          const rawTitle = boxTitles[idx] || `Structure ${idx + 1}`;
          const subtitle = boxSubtitles[idx] || undefined;
          let icon = "Layers";
          const tLower = rawTitle.toLowerCase();
          if (tLower.includes("diploblastic") || tLower.includes("acoelomate") || tLower.includes("cell")) {
            icon = "Dna";
          } else if (tLower.includes("triploblastic") || tLower.includes("eucoelomate")) {
            icon = "ShieldCheck";
          } else if (tLower.includes("pseudocoelomate")) {
            icon = "TreePine";
          }

          return {
            title: rawTitle,
            subtitle,
            accentColor: defaultColors[idx % defaultColors.length],
            iconName: icon,
            items: boxItems[idx],
          };
        });

        return {
          badgeText: "ANATOMICAL ARCHITECTURES",
          title,
          branches,
        };
      }
    }

    // 1. Check for Multi-Block Grid (e.g. PLACENTATION ARCHITECTURES with 2 rows of 3 columns)
    const allCapsHeaderIndices: number[] = [];
    lines.forEach((l, idx) => {
      if (idx === 0) return;
      const parts = l.split(/\s{3,}/).map((p) => p.trim()).filter((p) => p.length >= 3);
      if (parts.length >= 2 && parts.every((p) => /^[A-Z0-9\s\-_/()]+$/.test(p) && /[A-Z]{3,}/.test(p))) {
        allCapsHeaderIndices.push(idx);
      }
    });

    if (allCapsHeaderIndices.length >= 1) {
      const branches: TreeBranchCard[] = [];

      for (let b = 0; b < allCapsHeaderIndices.length; b++) {
        const hIdx = allCapsHeaderIndices[b];
        const nextHIdx = b + 1 < allCapsHeaderIndices.length ? allCapsHeaderIndices[b + 1] : lines.length;
        const hLine = lines[hIdx];

        const parts = hLine.split(/\s{3,}/).map((p) => p.trim()).filter((p) => p.length >= 3);
        const colStarts: number[] = [];
        let curSearch = 0;
        parts.forEach((p) => {
          const start = hLine.indexOf(p, curSearch);
          colStarts.push(start);
          curSearch = start + p.length;
        });

        const colRanges: { start: number; end: number; center: number }[] = [];
        for (let c = 0; c < colStarts.length; c++) {
          const center = colStarts[c];
          const start = c === 0 ? 0 : Math.floor((colStarts[c - 1] + center) / 2);
          const end = c === colStarts.length - 1 ? 9999 : Math.floor((center + colStarts[c + 1]) / 2);
          colRanges.push({ start, end, center });
        }

        const getColIdx = (pos: number) => {
          for (let i = 0; i < colRanges.length; i++) {
            if (pos >= colRanges[i].start && pos < colRanges[i].end) return i;
          }
          return 0;
        };

        const blockBranches: TreeBranchCard[] = parts.map((p, idx) => ({
          title: p,
          accentColor: defaultColors[(branches.length + idx) % defaultColors.length],
          iconName: "Layers",
          items: [],
        }));

        const sectionLines = lines.slice(hIdx + 1, nextHIdx).filter((l) => l.trim().length > 0);
        const colNotes: string[] = parts.map(() => "");

        sectionLines.forEach((sLine) => {
          const tokens: { text: string; pos: number }[] = [];
          const lineParts = sLine.split(/(?=[├└])/);
          let offset = 0;
          lineParts.forEach((lp) => {
            if (!lp.trim()) {
              offset += lp.length;
              return;
            }
            const lpTrimmed = lp.trim();
            const start = sLine.indexOf(lpTrimmed, offset);
            offset = start + lpTrimmed.length;

            const sub = lpTrimmed.split(/\s{2,}/);
            let subOff = start;
            sub.forEach((s) => {
              const sTrim = s.trim();
              if (!sTrim) return;
              const pos = sLine.indexOf(sTrim, subOff);
              subOff = pos + sTrim.length;
              tokens.push({ text: sTrim, pos });
            });
          });

          tokens.forEach(({ text, pos }) => {
            const cIdx = getColIdx(pos);

            if (text.startsWith("(") && text.endsWith(")")) {
              const sub = text.slice(1, -1).trim();
              if (!blockBranches[cIdx].subtitle) {
                blockBranches[cIdx].subtitle = sub;
                return;
              }
            }

            const clean = text.replace(/^[├└\|\+\\\/─\-\s]+/, "").replace(/[\s─\-│|]+$/, "").replace(/[│|]/g, "").trim();
            if (clean.startsWith("*") || text.includes("└──") || text.includes("├──")) {
              if (clean.length >= 2) {
                blockBranches[cIdx].items = blockBranches[cIdx].items || [];
                blockBranches[cIdx].items!.push({ text: `• ${clean}` });
              }
            } else if (clean.length >= 3 && /[a-zA-Z]/.test(clean)) {
              colNotes[cIdx] += (colNotes[cIdx] ? " " : "") + clean;
            }
          });
        });

        parts.forEach((_, idx) => {
          if (colNotes[idx]) {
            blockBranches[idx].note = colNotes[idx];
          }
        });

        branches.push(...blockBranches);
      }

      if (branches.length >= 2) {
        return {
          badgeText: "COMPARATIVE ARCHITECTURE",
          title,
          branches,
        };
      }
    }

    // 2. Check for Direct Side-by-Side Tree (e.g. COMPARISON OF PHOTOSYNTHETIC STEMS, OVARY INSERTION ARCHITECTURE)
    const firstDirectItemLineIdx = lines.findIndex((l, idx) => idx > 0 && (l.includes("├──") || l.includes("└──") || l.includes("|--")));
    const arrowLineIdx = lines.findIndex((l) => l.includes("▼") || (/[v]/.test(l) && l.includes("  ")));
    const splitLineIdx = lines.findIndex((l) => (l.includes("┌") || l.includes("+")) && (l.includes("┬") || l.includes("┼") || l.includes("┐") || l.includes("-")));

    if (arrowLineIdx === -1 && splitLineIdx === -1 && firstDirectItemLineIdx !== -1) {
      const headerLines = lines.slice(1, firstDirectItemLineIdx).filter((l) => l.trim().length > 0);
      if (headerLines.length > 0) {
        const topHLine = headerLines[0];
        const hParts = topHLine.split(/\s{3,}/).map((p) => p.trim()).filter((p) => p.length >= 3);
        if (hParts.length >= 2) {
          const colStarts: number[] = [];
          let curSearch = 0;
          hParts.forEach((p) => {
            const start = topHLine.indexOf(p, curSearch);
            colStarts.push(start);
            curSearch = start + p.length;
          });

          const colRanges: { start: number; end: number; center: number }[] = [];
          for (let c = 0; c < colStarts.length; c++) {
            const center = colStarts[c];
            const start = c === 0 ? 0 : Math.floor((colStarts[c - 1] + center) / 2);
            const end = c === colStarts.length - 1 ? 9999 : Math.floor((center + colStarts[c + 1]) / 2);
            colRanges.push({ start, end, center });
          }

          const getColIdx = (pos: number) => {
            for (let i = 0; i < colRanges.length; i++) {
              if (pos >= colRanges[i].start && pos < colRanges[i].end) return i;
            }
            return 0;
          };

          const branches: TreeBranchCard[] = hParts.map((p, idx) => ({
            title: p.replace(/[│|┌┐└┘\+─\[\]▼v┴┬┼]/g, "").trim(),
            accentColor: defaultColors[idx % defaultColors.length],
            iconName: "Layers",
            items: [],
          }));

          const contentLines = lines.slice(firstDirectItemLineIdx);
          const activeItemTexts: string[] = hParts.map(() => "");

          contentLines.forEach((cLine) => {
            if (!cLine.trim()) return;

            const tokens: { text: string; pos: number; hasBranchSym: boolean }[] = [];
            const lineParts = cLine.split(/(?=[├└])/);
            let offset = 0;

            lineParts.forEach((lp) => {
              if (!lp.trim()) {
                offset += lp.length;
                return;
              }
              const lpTrimmed = lp.trim();
              const start = cLine.indexOf(lpTrimmed, offset);
              offset = start + lpTrimmed.length;

              const hasBranchSym = /^[├└]/.test(lpTrimmed);

              const sub = lpTrimmed.split(/\s{2,}/);
              let subOff = start;
              sub.forEach((s) => {
                const sTrim = s.trim();
                if (!sTrim) return;
                const pos = cLine.indexOf(sTrim, subOff);
                subOff = pos + sTrim.length;
                tokens.push({ text: sTrim, pos, hasBranchSym: hasBranchSym && pos === start });
              });
            });

            tokens.forEach(({ text, pos, hasBranchSym }) => {
              const cIdx = getColIdx(pos);

              if (text.startsWith("(") && text.endsWith(")")) {
                const sub = text.slice(1, -1).trim();
                if (!branches[cIdx].subtitle) {
                  branches[cIdx].subtitle = sub;
                  return;
                }
              }

              const clean = text.replace(/^[├└\|\+\\\/─\-\s]+/, "").replace(/[\s─\-│|]+$/, "").replace(/[│|]/g, "").trim();

              if (hasBranchSym) {
                if (activeItemTexts[cIdx]) {
                  branches[cIdx].items!.push({ text: `• ${activeItemTexts[cIdx]}` });
                }
                activeItemTexts[cIdx] = clean;
              } else if (clean.length >= 2 && /[a-zA-Z]/.test(clean)) {
                if (activeItemTexts[cIdx]) {
                  activeItemTexts[cIdx] += " " + clean;
                } else {
                  activeItemTexts[cIdx] = clean;
                }
              }
            });
          });

          hParts.forEach((_, idx) => {
            if (activeItemTexts[idx]) {
              branches[idx].items!.push({ text: `• ${activeItemTexts[idx]}` });
            }
          });

          if (branches.length >= 2) {
            return {
              badgeText: "COMPARATIVE CLASSIFICATION",
              title,
              branches,
            };
          }
        }
      }
    }

    // 3. Find Root Title (lines before connector symbols)
    const connectorIdx = lines.findIndex((l) =>
      /[│|┌\+▼v]/.test(l) && (l.includes("──") || l.includes("--") || l.includes("│") || l.includes("|") || l.includes("┴") || l.includes("┬"))
    );

    if (connectorIdx > 0) {
      const topLines = lines.slice(0, connectorIdx).filter((l) => l.trim().length > 0);
      if (topLines.length > 0) {
        title = topLines[0].trim();
        if (topLines.length > 1) {
          subtitle = topLines.slice(1).join(" ").trim();
        }
      }
    }

    // 4. Find Arrow Line (containing ▼ or v) or split line (containing ┌ ... ┬ ... ┐)
    const colStarts: number[] = [];

    if (arrowLineIdx !== -1) {
      const arrowLine = lines[arrowLineIdx];
      const arrowRegex = /[▼v]/g;
      let arrowMatch;
      while ((arrowMatch = arrowRegex.exec(arrowLine)) !== null) {
        colStarts.push(arrowMatch.index);
      }
    }

    if (colStarts.length < 2 && splitLineIdx !== -1) {
      const splitLine = lines[splitLineIdx];
      const splitRegex = /[┌┬┼┐\+]/g;
      let splitMatch;
      while ((splitMatch = splitRegex.exec(splitLine)) !== null) {
        colStarts.push(splitMatch.index);
      }
    }

    const startBranchIdx = Math.max(arrowLineIdx, splitLineIdx);
    if (startBranchIdx === -1) return null;

    // Find the first line with branch items (├── or └──)
    let firstItemLineIdx = lines.findIndex((l, idx) => idx > startBranchIdx && (l.includes("├──") || l.includes("└──") || l.includes("|--")));
    if (firstItemLineIdx === -1) {
      firstItemLineIdx = lines.length;
    }

    // Header lines are between startBranchIdx and firstItemLineIdx
    const headerLines = lines.slice(startBranchIdx + 1, firstItemLineIdx).filter((l) => l.trim().length > 0);
    if (headerLines.length === 0) return null;

    // If colStarts not found from symbols, find from the first header line words
    if (colStarts.length < 2) {
      const firstHLine = headerLines[0];
      const hParts = firstHLine
        .split(/\s{3,}/)
        .map((p) => p.trim())
        .filter((p) => /[a-zA-Z]{2,}/.test(p));
      let curSearch = 0;
      hParts.forEach((p) => {
        const start = firstHLine.indexOf(p, curSearch);
        colStarts.push(start);
        curSearch = start + p.length;
      });
    }

    if (colStarts.length < 2) return null;

    // Sort and deduplicate colStarts
    colStarts.sort((a, b) => a - b);

    // Define column boundaries
    const colRanges: { start: number; end: number; center: number }[] = [];
    for (let c = 0; c < colStarts.length; c++) {
      const center = colStarts[c];
      const start = c === 0 ? 0 : Math.floor((colStarts[c - 1] + center) / 2);
      const end = c === colStarts.length - 1 ? 9999 : Math.floor((center + colStarts[c + 1]) / 2);
      colRanges.push({ start, end, center });
    }

    // Helper to find column index for a given horizontal position
    const getColumnIndex = (pos: number) => {
      for (let idx = 0; idx < colRanges.length; idx++) {
        if (pos >= colRanges[idx].start && pos < colRanges[idx].end) {
          return idx;
        }
      }
      let bestCol = 0;
      let minDist = Infinity;
      colRanges.forEach((cr, idx) => {
        const dist = Math.abs(pos - cr.center);
        if (dist < minDist) {
          minDist = dist;
          bestCol = idx;
        }
      });
      return bestCol;
    };

    // Extract multi-line Column Titles and Subtitles
    const colTitles: string[] = colRanges.map(() => "");
    const colSubtitles: string[] = colRanges.map(() => "");
    headerLines.forEach((hLine) => {
      const regex = /\S(?:.*?\S)?(?=\s{2,}|$)/g;
      let m;
      while ((m = regex.exec(hLine)) !== null) {
        const text = m[0].trim();
        const pos = m.index;
        if (!text || /[│|┌┐└┘\+─\[\]▼┴┬┼├┤=~•]/.test(text)) continue;

        const bestCol = getColumnIndex(pos);
        if (text.startsWith("(") && text.endsWith(")")) {
          const sub = text.slice(1, -1).trim();
          colSubtitles[bestCol] += (colSubtitles[bestCol] ? " • " : "") + sub;
        } else {
          colTitles[bestCol] += (colTitles[bestCol] ? " " : "") + text;
        }
      }
    });

    // Build branch cards
    const branches: TreeBranchCard[] = colTitles.map((cTitle, idx) => {
      let cleanTitle = cTitle.replace(/[│|┌┐└┘\+─\[\]▼┴┬┼]/g, "").trim() || `Branch ${idx + 1}`;
      let subtitle = colSubtitles[idx] || undefined;

      // Extract trailing (Parenthetical) subtitle if present in title
      const parenMatch = cleanTitle.match(/^(.+?)\s*\(([^()]+)\)$/);
      if (parenMatch) {
        cleanTitle = parenMatch[1].trim();
        subtitle = subtitle ? `${subtitle} • ${parenMatch[2].trim()}` : parenMatch[2].trim();
      }

      let icon = "GitBranch";
      const tLower = cleanTitle.toLowerCase();
      if (tLower.includes("archaea") || tLower.includes("bacteria") || tLower.includes("germ") || tLower.includes("cellular") || tLower.includes("prokaryote") || tLower.includes("microtubule") || tLower.includes("microfilament") || tLower.includes("filament")) {
        icon = "Layers";
      } else if (tLower.includes("symmetry") || tLower.includes("coelom") || tLower.includes("organ") || tLower.includes("tissue") || tLower.includes("protist")) {
        icon = "Layers";
      } else if (tLower.includes("embryonic") || tLower.includes("development") || tLower.includes("level") || tLower.includes("plant") || tLower.includes("algae")) {
        icon = "TreePine";
      } else if (tLower.includes("schizo") || tLower.includes("radial") || tLower.includes("bilateral") || tLower.includes("animal") || tLower.includes("fungi")) {
        icon = "ShieldCheck";
      }

      return {
        title: cleanTitle,
        subtitle,
        accentColor: defaultColors[idx % defaultColors.length],
        iconName: icon,
        items: [],
      };
    });

    // Extract content items across all remaining lines
    const contentLines = lines.slice(firstItemLineIdx);
    contentLines.forEach((line) => {
      if (!line.trim()) return;

      const itemTokens: { text: string; pos: number }[] = [];
      
      // Split on ├ or └ boundaries
      const parts = line.split(/(?=[├└])/);
      let offset = 0;
      parts.forEach((p) => {
        if (!p.trim()) {
          offset += p.length;
          return;
        }
        const pTrimmed = p.trim();
        const start = line.indexOf(pTrimmed, offset);
        offset = start + pTrimmed.length;

        // Sub-split by multiple spaces
        const sub = pTrimmed.split(/\s{2,}/);
        let subOff = start;
        sub.forEach((s) => {
          const sTrim = s.trim();
          if (!sTrim) return;
          const pos = line.indexOf(sTrim, subOff);
          subOff = pos + sTrim.length;
          itemTokens.push({ text: sTrim, pos });
        });
      });

      itemTokens.forEach(({ text, pos }) => {
        const bestCol = getColumnIndex(pos);

        // Subtitle / Note e.g. (Schizo/Entero)
        if (text.startsWith("(") && text.endsWith(")")) {
          const sub = text.slice(1, -1).trim();
          if (!branches[bestCol].subtitle) {
            branches[bestCol].subtitle = sub;
            return;
          }
        }

        // Clean tree branch symbols (├──, └──, |--, \--, |, L, etc.)
        const cleaned = text
          .replace(/^[├└\|\+\\\/─\-\s]+/, "")
          .replace(/[\s─\-│|]+$/, "")
          .replace(/[│|]/g, "")
          .trim();

        if (cleaned.length >= 2 && /[a-zA-Z]/.test(cleaned)) {
          branches[bestCol].items = branches[bestCol].items || [];
          branches[bestCol].items!.push({ text: `• ${cleaned}` });
        }
      });
    });

    const validBranches = branches.filter((b) => b.title && b.title.length >= 2);

    if (validBranches.length >= 2) {
      return {
        badgeText: "CLASSIFICATION STRUCTURE",
        title: title || "CLASSIFICATION SYSTEM",
        subtitle,
        branches: validBranches,
      };
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * UniversalTreeDiagram
 * 
 * The single master component that renders branching trees, flowcharts, 
 * and hierarchy progressions across all past, present, and future chapter notes.
 */
export const UniversalTreeDiagram: React.FC<UniversalTreeDiagramProps> = (props) => {
  let treeData: UniversalTreeData | null = props.data || null;

  if (!treeData && props.title && props.branches) {
    treeData = {
      badgeText: props.badgeText,
      title: props.title,
      subtitle: props.subtitle,
      branches: props.branches,
      takeawayText: props.takeawayText,
    };
  }

  if (!treeData && props.asciiText) {
    treeData = parseAsciiToTree(props.asciiText);
  }

  if (!treeData || !treeData.branches || treeData.branches.length === 0) {
    return null;
  }

  const { badgeText = "CLASSIFICATION ARCHITECTURE", title, subtitle, branches, takeawayText } = treeData;
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
      
      {/* ════════════ TOP ROOT NODE ════════════ */}
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

      {/* ════════════ DYNAMIC SVG CONNECTORS ════════════ */}
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
          const colorKey = b.accentColor || defaultColors[idx % defaultColors.length];
          const cTheme = colorMap[colorKey] || colorMap.indigo;

          return (
            <div
              key={idx}
              className={`rounded-2xl bg-white border-2 ${cTheme.border} p-5 shadow-sm space-y-3 hover:shadow-md transition-all flex flex-col justify-between`}
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-gray-100">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className={`h-8 w-8 rounded-xl border flex items-center justify-center font-black shrink-0 ${cTheme.iconBg}`}>
                      {renderIcon(b.iconName)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h5 className="text-xs sm:text-sm font-black text-slate-900 leading-snug tracking-tight">
                        {renderFormattedDiagramText(b.title)}
                      </h5>
                      {b.subtitle && (
                        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 block leading-tight mt-0.5">
                          {renderFormattedDiagramText(b.subtitle)}
                        </span>
                      )}
                    </div>
                  </div>
                  {b.badge && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black shrink-0 ${cTheme.bgBadge}`}>
                      {b.badge}
                    </span>
                  )}
                </div>

                {/* Items */}
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
                          <span className="leading-snug break-words">{renderFormattedDiagramText(itText)}</span>
                          {itBadge && (
                            <span className="text-[9px] bg-white px-1.5 py-0.5 rounded shadow-2xs font-bold shrink-0 ml-2">
                              {itBadge}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Note */}
                {b.note && (
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed pt-1">
                    {renderFormattedDiagramText(b.note)}
                  </p>
                )}
              </div>

              {/* Footer */}
              {b.footer && (
                <div className={`p-2.5 rounded-xl border text-[11px] font-bold text-center mt-3 ${cTheme.footerBg}`}>
                  {renderFormattedDiagramText(b.footer)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ════════════ BOTTOM TAKEAWAY ════════════ */}
      {takeawayText && (
        <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between gap-4 text-xs font-extrabold text-[#4F46E5]">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-[#4F46E5] shrink-0" />
            <span>{renderFormattedDiagramText(takeawayText)}</span>
          </div>
        </div>
      )}
    </div>
  );
};
