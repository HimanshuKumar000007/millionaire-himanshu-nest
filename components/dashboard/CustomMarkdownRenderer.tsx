"use client";

import React, { useState } from "react";
import { Code as CodeIcon, Download, Copy, Check, ChevronUp, CheckCircle2, Lightbulb, BarChart3 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { PropertiesOfLifeDiagram } from "./PropertiesOfLifeDiagram";
import { BiodiversityScaleDiagram } from "./BiodiversityScaleDiagram";
import { ThreeDomainTreeDiagram } from "./ThreeDomainTreeDiagram";
import { MembraneLipidDiagram } from "./MembraneLipidDiagram";
import { ReproductiveIsolationDiagram } from "./ReproductiveIsolationDiagram";
import { RingSpeciesDiagram } from "./RingSpeciesDiagram";
import { TaxonomicHierarchyDiagram } from "./TaxonomicHierarchyDiagram";
import { TautonymValidityDiagram } from "./TautonymValidityDiagram";
import { NomenclaturalTypesDiagram } from "./NomenclaturalTypesDiagram";
import { TaxonomicalAidsDiagram } from "./TaxonomicalAidsDiagram";
import { TaxonomicKeysDiagram } from "./TaxonomicKeysDiagram";
import { TaxonomicLiteratureDiagram } from "./TaxonomicLiteratureDiagram";
import { HistoricalSystemsDiagram } from "./HistoricalSystemsDiagram";
import { WhittakerCriteriaDiagram } from "./WhittakerCriteriaDiagram";
import { UniversalTreeDiagram, parseAsciiToTree } from "./UniversalTreeDiagram";
import { UniversalFlowDiagram, parseAsciiToFlow } from "./UniversalFlowDiagram";
import { UniversalAnatomyDiagram, parseAsciiToAnatomy } from "./UniversalAnatomyDiagram";
import { UniversalPathwayDiagram, parseAsciiToPathway } from "./UniversalPathwayDiagram";
import { CyanobacteriaDiagram } from "./CyanobacteriaDiagram";
import { GramStainingFlowDiagram } from "./GramStainingFlowDiagram";
import { BacterialEnvelopeDiagram } from "./BacterialEnvelopeDiagram";
import { PlasmodiumLifeCycleDiagram } from "./PlasmodiumLifeCycleDiagram";
import { BacterialConjugationDiagram } from "./BacterialConjugationDiagram";
import { FungalSexualCycleDiagram } from "./FungalSexualCycleDiagram";
import { ClampConnectionDiagram } from "./ClampConnectionDiagram";
import { AscomyceteSporeDiagram } from "./AscomyceteSporeDiagram";
import { PucciniaStagesDiagram } from "./PucciniaStagesDiagram";
import { VirusDiscoveryMilestonesDiagram } from "./VirusDiscoveryMilestonesDiagram";
import { ViralCyclesDiagram } from "./ViralCyclesDiagram";
import { BacteriophageStructureDiagram } from "./BacteriophageStructureDiagram";
import { LichenReproductiveUnitsDiagram } from "./LichenReproductiveUnitsDiagram";
import { DoliporeSeptumDiagram } from "./DoliporeSeptumDiagram";
import { extractTextContent } from "@/lib/utils/formatDiagramText";

/**
 * Preprocess string to automatically enclose LaTeX math formulas and scientific symbols
 * (e.g. (\Psi_p), \Psi_s, \Psi_w, \Delta G^\circ, \lambda_{\text{max}}, \omega_0, \hbar, etc.)
 * in math delimiters so they render with crisp KaTeX typography.
 */
function preprocessMathContent(text: string): string {
  if (!text) return "";

  // 1. Preserve all markdown images and links with temporary placeholders so URLs are never corrupted
  const preservedBlocks: string[] = [];
  const placeholderPrefix = "___PRESERVED_MD_BLOCK_";

  let sanitized = text.replace(/!\[.*?\]\(.*?\)|\[.*?\]\(.*?\)/g, (match) => {
    const idx = preservedBlocks.length;
    preservedBlocks.push(match);
    return `${placeholderPrefix}${idx}___`;
  });

  // 2. Preserve existing LaTeX math blocks ($...$ and $$...$$)
  const preservedMath: string[] = [];
  const mathPlaceholderPrefix = "___PRESERVED_MATH_BLOCK_";
  sanitized = sanitized.replace(/\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$/g, (match) => {
    const idx = preservedMath.length;
    preservedMath.push(match);
    return `${mathPlaceholderPrefix}${idx}___`;
  });

  // 3. Greek Unicode characters mapping
  const greekUnicodeMap: Record<string, string> = {
    'Ψ': '\\Psi', 'ψ': '\\psi', 'Δ': '\\Delta', 'λ': '\\lambda', 'μ': '\\mu',
    'θ': '\\theta', 'π': '\\pi', 'σ': '\\sigma', 'ω': '\\omega', 'Ω': '\\Omega',
    'ε': '\\epsilon', 'ρ': '\\rho', 'τ': '\\tau', 'φ': '\\phi', 'Φ': '\\Phi',
    'α': '\\alpha', 'β': '\\beta', 'γ': '\\gamma', 'Γ': '\\Gamma', 'η': '\\eta',
    'κ': '\\kappa', 'ν': '\\nu', 'ς': '\\sigma', 'χ': '\\chi', 'ζ': '\\zeta',
    'ħ': '\\hbar', 'Å': '\\text{Å}'
  };

  // Convert (Ψ_p), Ψp, Ψ_w, Ψs, etc. specifically for plant biology & physical chemistry
  sanitized = sanitized.replace(/\(?\b([Ψψ])\s*[_]?\s*([pswmPSWM])\b\)?/g, (_match, sym, sub) => {
    const lsym = greekUnicodeMap[sym] || '\\Psi';
    return `$(${lsym}_{${sub.toLowerCase()}})$`;
  });

  // 4. Auto-wrap unwrapped LaTeX macros: e.g. (\Psi_p), \Psi_p, \frac{a}{b}, \sqrt{x}, \Delta G, etc.
  const allLatexMacros = [
    'Psi', 'psi', 'Phi', 'phi', 'Omega', 'omega', 'Delta', 'delta', 'Sigma', 'sigma',
    'Lambda', 'lambda', 'Theta', 'theta', 'Gamma', 'gamma', 'alpha', 'beta', 'mu', 'nu',
    'tau', 'rho', 'epsilon', 'varepsilon', 'eta', 'zeta', 'kappa', 'chi', 'xi', 'Xi',
    'hbar', 'nabla', 'partial', 'sum', 'prod', 'int', 'oint', 'lim', 'frac', 'sqrt',
    'times', 'cdot', 'pm', 'mp', 'approx', 'neq', 'leq', 'geq', 'infty', 'to',
    'rightarrow', 'leftarrow', 'leftrightarrow', 'rightleftharpoons', 'ln', 'log', 'exp',
    'sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'vec', 'hat', 'dot', 'ddot', 'bar', 'text'
  ].join('|');

  const unescapedLatexPattern = new RegExp(
    `(\\(?\\\\(?:${allLatexMacros})(?:\\{[^{}]*\\}|_[a-zA-Z0-9{}]+|\\^[a-zA-Z0-9{}]+|\\([a-zA-Z0-9{}]*\\)|[a-zA-Z0-9_\\^\\{\\}\\\\+\\-*\\/=\\s])*\\)?)`,
    'g'
  );

  sanitized = sanitized.replace(unescapedLatexPattern, (match) => {
    const trimmed = match.trim();
    if (!trimmed || trimmed.startsWith(placeholderPrefix) || trimmed.startsWith(mathPlaceholderPrefix)) {
      return match;
    }
    return `$${trimmed}$`;
  });

  // 5. Restore preserved math blocks and images/links
  preservedMath.forEach((block, idx) => {
    sanitized = sanitized.replace(`${mathPlaceholderPrefix}${idx}___`, block);
  });

  preservedBlocks.forEach((block, idx) => {
    sanitized = sanitized.replace(`${placeholderPrefix}${idx}___`, block);
  });

  return sanitized;
}

/**
 * Custom Code & ASCII Diagram Component (`pre` and `code` Override)
 * Renders triple backtick blocks and ASCII diagrams with:
 * - Header bar: Code icon, label, Download text button, Copy button, Collapse/Expand toggle.
 * - Container: Dark background, font-mono, whitespace-pre, overflow-x-auto for pixel-perfect ASCII grid alignment.
 */
export const CustomCodeBlock = ({ children, rawCode }: { children?: React.ReactNode; rawCode?: string }) => {
  const [copied, setCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const codeText = rawCode || extractTextContent(children);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code text", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([codeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "diagram-code.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderHighlightedCode = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lIdx) => {
      const parts = line.split(/(\bOF\b|\bOR\b|\bALL\b|\bin\b|\bIn-vivo\b|\bSystems\b|Consciousness & Self-Regulation)/g);
      return (
        <React.Fragment key={lIdx}>
          {parts.map((part, pIdx) => {
            if (part === "OF" || part === "OR" || part === "ALL" || part === "in" || part === "In-vivo") {
              return <span key={pIdx} className="text-red-400 font-bold">{part}</span>;
            }
            if (part === "Systems" || part === "Consciousness & Self-Regulation") {
              return <span key={pIdx} className="text-sky-400 font-bold">{part}</span>;
            }
            return <span key={pIdx} className="text-zinc-300">{part}</span>;
          })}
          {lIdx < lines.length - 1 ? "\n" : ""}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="my-6 rounded-xl border border-zinc-800 bg-[#0c0c0e] overflow-hidden shadow-lg">
      {/* Header Bar */}
      <div className="flex items-center justify-between bg-[#18181b] px-4 py-2 border-b border-zinc-800 text-zinc-400 text-xs font-mono select-none">
        <div className="flex items-center gap-2">
          <CodeIcon className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-zinc-300">Code</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownload}
            className="p-1 rounded hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
            title="Download Diagram (.txt)"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
            title="Copy Code"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-sans font-bold">Copied!</span>
              </>
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
            title={isCollapsed ? "Expand Diagram" : "Collapse Diagram"}
          >
            <ChevronUp className={`w-4 h-4 transition-transform duration-200 ${isCollapsed ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {/* Code Body */}
      {!isCollapsed && (
        <div className="p-4 sm:p-5 overflow-x-auto bg-[#0c0c0e] font-mono text-xs sm:text-sm leading-relaxed whitespace-pre select-text">
          <code>{renderHighlightedCode(codeText)}</code>
        </div>
      )}
    </div>
  );
};

/**
 * Custom Callout Component (`blockquote` Override)
 * Renders blockquotes with a 4px vertical indigo accent bar, generous padding, soft indigo tint, and clean typography.
 */
export const CustomBlockquote = ({ children }: { children: React.ReactNode }) => {
  return (
    <blockquote className="my-4 border-l-4 border-[#4F46E5] bg-indigo-50/30 dark:bg-indigo-950/20 pl-4 pr-3 py-3 rounded-r-lg text-slate-800 dark:text-slate-200 font-normal leading-relaxed text-sm sm:text-base shadow-2xs">
      {children}
    </blockquote>
  );
};

/**
 * Custom Pill List Item (`ul` / `li` Override)
 */
export const CustomListItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-3 sm:p-3.5 my-2 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 shadow-2xs">
      <div className="h-5 w-5 rounded-full bg-indigo-100 text-[#4F46E5] flex items-center justify-center shrink-0 mt-0.5">
        <CheckCircle2 className="h-4 w-4" />
      </div>
      <div className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed flex-1">
        {children}
      </div>
    </div>
  );
};

/**
 * Custom Table Component (`table` Override)
 * Renders tables inside a rounded card with a dark header toolbar, sticky headers, and alternating row highlights.
 */
export const CustomTable = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="my-4 rounded-2xl bg-white border border-slate-200 shadow-2xs overflow-hidden">
      {/* Top Header Toolbar for Table */}
      <div className="bg-slate-900 px-3.5 py-2 border-b border-slate-800 flex items-center justify-between text-white text-xs font-mono select-none">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-extrabold text-slate-100 uppercase tracking-wider text-[11px]">Observation &amp; Data Table</span>
        </div>
        <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-md text-slate-300 font-sans font-bold">
          Data Matrix
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm text-left border-collapse">
          {children}
        </table>
      </div>
    </div>
  );
};

/**
 * Yellow Quick Section Summary Box Component
 */
export const YellowSummaryBox = ({ children, title = "QUICK SECTION SUMMARY" }: { children: React.ReactNode; title?: string }) => {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF0] border border-[#FDE047] flex items-start gap-3 shadow-2xs my-4">
      <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
        <Lightbulb className="h-4 w-4 fill-amber-500/20" />
      </div>
      <div className="flex-1">
        <h5 className="text-xs font-black text-amber-950 uppercase tracking-wider">
          {title}
        </h5>
        <div className="text-xs sm:text-sm font-semibold text-amber-900 leading-relaxed mt-0.5">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Normalizes bullet points (•) into standard markdown list items (- ) so that
 * ReactMarkdown parses them into proper lists, keeping all KaTeX math formulas intact.
 */
function normalizeMarkdownContent(text: string): string {
  if (!text) return "";
  const withLists = text.replace(/(^|\n)\s*•\s+/g, "$1- ");
  return preprocessMathContent(withLists);
}

/**
 * Main MarkdownContent Component with Custom Component Overrides
 */
export const MarkdownContent = ({ content, compact = false }: { content: string; compact?: boolean }) => {
  if (!content) return null;
  const processedContent = normalizeMarkdownContent(content);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        pre({ children }: any) {
          const codeStr = extractTextContent(children);

          if (codeStr.includes("PROPERTIES OF LIFE") || codeStr.includes("CHARACTERISTIC FEATURES") || codeStr.includes("DEFINING PROPERTIES")) {
            return <PropertiesOfLifeDiagram />;
          }

          if (codeStr.includes("LEVELS OF DIVERSITY MEASUREMENT") || (codeStr.includes("ALPHA") && codeStr.includes("BETA") && codeStr.includes("GAMMA"))) {
            return <BiodiversityScaleDiagram />;
          }

          if (
            codeStr.includes("CYANOBACTERIA ULTRASTRUCTURE") ||
            codeStr.includes("HETEROCYST CELL") ||
            (codeStr.includes("Gelatinous Mucilage Sheath") && codeStr.includes("Thylakoid Membrane"))
          ) {
            return <CyanobacteriaDiagram />;
          }

          if (
            codeStr.includes("GRAM STAINING MECHANISM") ||
            (codeStr.includes("Crystal Violet") && codeStr.includes("Safranin Counterstain"))
          ) {
            return <GramStainingFlowDiagram />;
          }

          if (
            codeStr.includes("GRAM-POSITIVE ENVELOPE") ||
            codeStr.includes("GRAM-NEGATIVE ENVELOPE") ||
            (codeStr.includes("Thick Peptidoglycan") && codeStr.includes("Lipopolysaccharide"))
          ) {
            return <BacterialEnvelopeDiagram />;
          }

          if (
            codeStr.includes("PLASMODIUM LIFE CYCLE") ||
            (codeStr.includes("HUMAN HOST") && codeStr.includes("MOSQUITO") && codeStr.includes("SPOROZOITES"))
          ) {
            return <PlasmodiumLifeCycleDiagram />;
          }

          if (codeStr.includes("HISTORICAL SYSTEMS OF CLASSIFICATION") || codeStr.includes("TWO-KINGDOM SYSTEM") || (codeStr.includes("Linnaeus") && codeStr.includes("THREE-DOMAIN"))) {
            return <HistoricalSystemsDiagram />;
          }

          if (codeStr.includes("WHITTAKER'S FIVE CLASSIFICATION CRITERIA") || codeStr.includes("WHITTAKER'S FIVE CRITERIA") || (codeStr.includes("Cellular Complexity") && codeStr.includes("Nutritional Pattern"))) {
            return <WhittakerCriteriaDiagram />;
          }

          if (codeStr.includes("UNIVERSAL ANCESTOR") || codeStr.includes("LUCA") || codeStr.includes("Domain BACTERIA")) {
            return <ThreeDomainTreeDiagram />;
          }

          if (codeStr.includes("MEMBRANE LIPID BIOCHEMISTRY") || codeStr.includes("D-Glycerol-3-Phosphate")) {
            return <MembraneLipidDiagram />;
          }

          if (codeStr.includes("REPRODUCTIVE ISOLATION") || codeStr.includes("PRE-ZYGOTIC ISOLATION") || codeStr.includes("POST-ZYGOTIC ISOLATION")) {
            return <ReproductiveIsolationDiagram />;
          }

          if (codeStr.includes("RING SPECIES MODEL") || codeStr.includes("Terminal Pop X")) {
            return <RingSpeciesDiagram />;
          }

          if (codeStr.includes("TAXONOMIC HIERARCHY") || codeStr.includes("TRENDS MOVING DOWN")) {
            return <TaxonomicHierarchyDiagram />;
          }

          if (codeStr.includes("TAUTONYM VALIDITY") || codeStr.includes("ICZN") || codeStr.includes("ICNafp")) {
            return <TautonymValidityDiagram />;
          }

          if (codeStr.includes("NOMENCLATURAL TYPE SPECIMENS") || codeStr.includes("HOLOTYPE") || codeStr.includes("ISOTYPE")) {
            return <NomenclaturalTypesDiagram />;
          }

          if (codeStr.includes("TAXONOMICAL AIDS") || codeStr.includes("PRESERVED COLLECTIONS")) {
            return <TaxonomicalAidsDiagram />;
          }

          if (
            codeStr.includes("CONJUGATION MECHANISMS") ||
            (codeStr.includes("F⁺ × F⁻") && codeStr.includes("Hfr × F⁻")) ||
            (codeStr.includes("F+ x F-") && codeStr.includes("Hfr x F-"))
          ) {
            return <BacterialConjugationDiagram />;
          }

          if (
            codeStr.includes("STAGES OF FUNGAL SEXUAL CYCLE") ||
            codeStr.includes("STAGES OF THE FUNGAL SEXUAL CYCLE") ||
            (codeStr.includes("PLASMOGAMY") && codeStr.includes("DIKARYOPHASE") && codeStr.includes("KARYOGAMY"))
          ) {
            return <FungalSexualCycleDiagram />;
          }

          if (
            codeStr.includes("CLAMP CONNECTION DYNAMICS") ||
            codeStr.includes("Backward Loop Hook") ||
            (codeStr.includes("Nucleus A Divides into Clamp") && codeStr.includes("Nucleus B"))
          ) {
            return <ClampConnectionDiagram />;
          }

          if (
            codeStr.includes("ASCOMYCETE SPORE FORMATION") ||
            (codeStr.includes("Ascogenous Hypha") && codeStr.includes("8 Endogenous ASCOSPORES"))
          ) {
            return <AscomyceteSporeDiagram />;
          }

          if (
            codeStr.includes("THE FIVE SPORE STAGES OF PUCCINIA") ||
            codeStr.includes("SPORE STAGES OF PUCCINIA") ||
            (codeStr.includes("Pycniospores") && codeStr.includes("Urediniospores") && codeStr.includes("Teliospores"))
          ) {
            return <PucciniaStagesDiagram />;
          }

          if (
            codeStr.includes("VIRUS DISCOVERY MILESTONES") ||
            (codeStr.includes("Ivanowsky") && codeStr.includes("Beijerinck") && codeStr.includes("Stanley"))
          ) {
            return <VirusDiscoveryMilestonesDiagram />;
          }

          if (
            codeStr.includes("LYTIC vs. LYSOGENIC") ||
            codeStr.includes("LYTIC vs LYSOGENIC") ||
            (codeStr.includes("LYTIC PATHWAY") && codeStr.includes("LYSOGENIC PATHWAY"))
          ) {
            return <ViralCyclesDiagram />;
          }

          if (
            codeStr.includes("BACTERIOPHAGE STRUCTURAL ARCHITECTURE") ||
            codeStr.includes("BACTERIOPHAGE ULTRASTRUCTURE") ||
            (codeStr.includes("Icosahedral Head") && codeStr.includes("Contractile Sheath") && codeStr.includes("Tail Fibers"))
          ) {
            return <BacteriophageStructureDiagram />;
          }

          if (
            codeStr.includes("LICHEN REPRODUCTIVE UNITS") ||
            (codeStr.includes("SOREDIA") && codeStr.includes("ISIDIA"))
          ) {
            return <LichenReproductiveUnitsDiagram />;
          }

          if (
            codeStr.includes("DOLIPORE SEPTUM ARCHITECTURE") ||
            (codeStr.includes("Parenthosome Cap") && codeStr.includes("Hyphal"))
          ) {
            return <DoliporeSeptumDiagram />;
          }

          if (codeStr.includes("TAXONOMIC LITERATURE") || codeStr.includes("MONOGRAPH")) {
            return <TaxonomicLiteratureDiagram />;
          }

          // Universal Multi-Compartment / Pathway / Z-Scheme fallback
          const parsedPathway = parseAsciiToPathway(codeStr);
          if (parsedPathway && ((parsedPathway.compartments && parsedPathway.compartments.length >= 2) || (parsedPathway.steps && parsedPathway.steps.length >= 2) || parsedPathway.equation)) {
            return <UniversalPathwayDiagram data={parsedPathway} />;
          }

          // Universal ASCII Tree Parser fallback for ANY branching flowchart
          const parsedTree = parseAsciiToTree(codeStr);
          if (parsedTree && parsedTree.branches && parsedTree.branches.length >= 2) {
            return <UniversalTreeDiagram data={parsedTree} />;
          }

          // Universal ASCII Process Flow fallback for ANY sequential pipeline
          const parsedFlow = parseAsciiToFlow(codeStr);
          if (parsedFlow && parsedFlow.steps && parsedFlow.steps.length >= 2) {
            return <UniversalFlowDiagram data={parsedFlow} />;
          }

          // Universal ASCII Stacked Anatomy / Cross-Section fallback
          const parsedAnatomy = parseAsciiToAnatomy(codeStr);
          if (parsedAnatomy && parsedAnatomy.layers && parsedAnatomy.layers.length >= 2) {
            return <UniversalAnatomyDiagram data={parsedAnatomy} />;
          }

          return <CustomCodeBlock rawCode={codeStr.trim()}>{children}</CustomCodeBlock>;
        },
        code({ inline, children, ...props }: any) {
          if (inline) {
            return (
              <code className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono text-xs font-bold border border-indigo-100" {...props}>
                {children}
              </code>
            );
          }
          const codeStr = extractTextContent(children);
          if (codeStr.includes("PROPERTIES OF LIFE") || codeStr.includes("CHARACTERISTIC FEATURES") || codeStr.includes("DEFINING PROPERTIES")) {
            return <PropertiesOfLifeDiagram />;
          }
          if (codeStr.includes("LEVELS OF DIVERSITY MEASUREMENT") || (codeStr.includes("ALPHA") && codeStr.includes("BETA") && codeStr.includes("GAMMA"))) {
            return <BiodiversityScaleDiagram />;
          }
          if (
            codeStr.includes("CYANOBACTERIA ULTRASTRUCTURE") ||
            codeStr.includes("HETEROCYST CELL") ||
            (codeStr.includes("Gelatinous Mucilage Sheath") && codeStr.includes("Thylakoid Membrane"))
          ) {
            return <CyanobacteriaDiagram />;
          }
          if (
            codeStr.includes("GRAM STAINING MECHANISM") ||
            (codeStr.includes("Crystal Violet") && codeStr.includes("Safranin Counterstain"))
          ) {
            return <GramStainingFlowDiagram />;
          }
          if (
            codeStr.includes("GRAM-POSITIVE ENVELOPE") ||
            codeStr.includes("GRAM-NEGATIVE ENVELOPE") ||
            (codeStr.includes("Thick Peptidoglycan") && codeStr.includes("Lipopolysaccharide"))
          ) {
            return <BacterialEnvelopeDiagram />;
          }
          if (
            codeStr.includes("PLASMODIUM LIFE CYCLE") ||
            (codeStr.includes("HUMAN HOST") && codeStr.includes("MOSQUITO") && codeStr.includes("SPOROZOITES"))
          ) {
            return <PlasmodiumLifeCycleDiagram />;
          }
          if (codeStr.includes("HISTORICAL SYSTEMS OF CLASSIFICATION") || codeStr.includes("TWO-KINGDOM SYSTEM") || (codeStr.includes("Linnaeus") && codeStr.includes("THREE-DOMAIN"))) {
            return <HistoricalSystemsDiagram />;
          }
          if (codeStr.includes("WHITTAKER'S FIVE CLASSIFICATION CRITERIA") || codeStr.includes("WHITTAKER'S FIVE CRITERIA") || (codeStr.includes("Cellular Complexity") && codeStr.includes("Nutritional Pattern"))) {
            return <WhittakerCriteriaDiagram />;
          }
          if (codeStr.includes("UNIVERSAL ANCESTOR") || codeStr.includes("LUCA") || codeStr.includes("Domain BACTERIA")) {
            return <ThreeDomainTreeDiagram />;
          }
          if (codeStr.includes("MEMBRANE LIPID BIOCHEMISTRY") || codeStr.includes("D-Glycerol-3-Phosphate")) {
            return <MembraneLipidDiagram />;
          }
          if (codeStr.includes("REPRODUCTIVE ISOLATION") || codeStr.includes("PRE-ZYGOTIC ISOLATION") || codeStr.includes("POST-ZYGOTIC ISOLATION")) {
            return <ReproductiveIsolationDiagram />;
          }
          if (codeStr.includes("RING SPECIES MODEL") || codeStr.includes("Terminal Pop X")) {
            return <RingSpeciesDiagram />;
          }
          if (codeStr.includes("TAXONOMIC HIERARCHY") || codeStr.includes("TRENDS MOVING DOWN")) {
            return <TaxonomicHierarchyDiagram />;
          }
          if (codeStr.includes("TAUTONYM VALIDITY") || codeStr.includes("ICZN") || codeStr.includes("ICNafp")) {
            return <TautonymValidityDiagram />;
          }
          if (codeStr.includes("NOMENCLATURAL TYPE SPECIMENS") || codeStr.includes("HOLOTYPE") || codeStr.includes("ISOTYPE")) {
            return <NomenclaturalTypesDiagram />;
          }
          if (codeStr.includes("TAXONOMICAL AIDS") || codeStr.includes("PRESERVED COLLECTIONS")) {
            return <TaxonomicalAidsDiagram />;
          }
          if (
            codeStr.includes("CONJUGATION MECHANISMS") ||
            (codeStr.includes("F⁺ × F⁻") && codeStr.includes("Hfr × F⁻")) ||
            (codeStr.includes("F+ x F-") && codeStr.includes("Hfr x F-"))
          ) {
            return <BacterialConjugationDiagram />;
          }
          if (
            codeStr.includes("STAGES OF FUNGAL SEXUAL CYCLE") ||
            codeStr.includes("STAGES OF THE FUNGAL SEXUAL CYCLE") ||
            (codeStr.includes("PLASMOGAMY") && codeStr.includes("DIKARYOPHASE") && codeStr.includes("KARYOGAMY"))
          ) {
            return <FungalSexualCycleDiagram />;
          }
          if (
            codeStr.includes("CLAMP CONNECTION DYNAMICS") ||
            codeStr.includes("Backward Loop Hook") ||
            (codeStr.includes("Nucleus A Divides into Clamp") && codeStr.includes("Nucleus B"))
          ) {
            return <ClampConnectionDiagram />;
          }
          if (
            codeStr.includes("ASCOMYCETE SPORE FORMATION") ||
            (codeStr.includes("Ascogenous Hypha") && codeStr.includes("8 Endogenous ASCOSPORES"))
          ) {
            return <AscomyceteSporeDiagram />;
          }
          if (
            codeStr.includes("THE FIVE SPORE STAGES OF PUCCINIA") ||
            codeStr.includes("SPORE STAGES OF PUCCINIA") ||
            (codeStr.includes("Pycniospores") && codeStr.includes("Urediniospores") && codeStr.includes("Teliospores"))
          ) {
            return <PucciniaStagesDiagram />;
          }
          if (
            codeStr.includes("VIRUS DISCOVERY MILESTONES") ||
            (codeStr.includes("Ivanowsky") && codeStr.includes("Beijerinck") && codeStr.includes("Stanley"))
          ) {
            return <VirusDiscoveryMilestonesDiagram />;
          }
          if (
            codeStr.includes("LYTIC vs. LYSOGENIC") ||
            codeStr.includes("LYTIC vs LYSOGENIC") ||
            (codeStr.includes("LYTIC PATHWAY") && codeStr.includes("LYSOGENIC PATHWAY"))
          ) {
            return <ViralCyclesDiagram />;
          }
          if (
            codeStr.includes("BACTERIOPHAGE STRUCTURAL ARCHITECTURE") ||
            codeStr.includes("BACTERIOPHAGE ULTRASTRUCTURE") ||
            (codeStr.includes("Icosahedral Head") && codeStr.includes("Contractile Sheath") && codeStr.includes("Tail Fibers"))
          ) {
            return <BacteriophageStructureDiagram />;
          }
          if (
            codeStr.includes("LICHEN REPRODUCTIVE UNITS") ||
            (codeStr.includes("SOREDIA") && codeStr.includes("ISIDIA"))
          ) {
            return <LichenReproductiveUnitsDiagram />;
          }
          if (
            codeStr.includes("DOLIPORE SEPTUM ARCHITECTURE") ||
            (codeStr.includes("Parenthosome Cap") && codeStr.includes("Hyphal"))
          ) {
            return <DoliporeSeptumDiagram />;
          }
          if (codeStr.includes("TAXONOMIC LITERATURE") || codeStr.includes("MONOGRAPH")) {
            return <TaxonomicLiteratureDiagram />;
          }

          // Universal Multi-Compartment / Pathway / Z-Scheme fallback
          const parsedInlinePathway = parseAsciiToPathway(codeStr);
          if (parsedInlinePathway && ((parsedInlinePathway.compartments && parsedInlinePathway.compartments.length >= 2) || (parsedInlinePathway.steps && parsedInlinePathway.steps.length >= 2) || parsedInlinePathway.equation)) {
            return <UniversalPathwayDiagram data={parsedInlinePathway} />;
          }

          // Universal ASCII Tree Parser fallback for ANY branching flowchart
          const parsedInlineTree = parseAsciiToTree(codeStr);
          if (parsedInlineTree && parsedInlineTree.branches && parsedInlineTree.branches.length >= 2) {
            return <UniversalTreeDiagram data={parsedInlineTree} />;
          }

          // Universal ASCII Process Flow fallback for ANY sequential pipeline
          const parsedInlineFlow = parseAsciiToFlow(codeStr);
          if (parsedInlineFlow && parsedInlineFlow.steps && parsedInlineFlow.steps.length >= 2) {
            return <UniversalFlowDiagram data={parsedInlineFlow} />;
          }

          // Universal ASCII Stacked Anatomy / Cross-Section fallback
          const parsedInlineAnatomy = parseAsciiToAnatomy(codeStr);
          if (parsedInlineAnatomy && parsedInlineAnatomy.layers && parsedInlineAnatomy.layers.length >= 2) {
            return <UniversalAnatomyDiagram data={parsedInlineAnatomy} />;
          }

          return <CustomCodeBlock rawCode={codeStr.trim()}>{children}</CustomCodeBlock>;
        },
        blockquote({ children }: any) {
          const childText = extractTextContent(children);

          if (
            childText.includes("[!SUMMARY]") ||
            childText.includes("QUICK SECTION SUMMARY") ||
            childText.includes("Quick Section Summary")
          ) {
            const cleanText = childText
              .replace(/\[!SUMMARY\]/gi, "")
              .replace(/QUICK SECTION SUMMARY BOX/gi, "")
              .replace(/QUICK SECTION SUMMARY/gi, "")
              .replace(/\*\*/g, "")
              .trim();
            return <YellowSummaryBox>{cleanText || children}</YellowSummaryBox>;
          }

          return <CustomBlockquote>{children}</CustomBlockquote>;
        },
        ul({ children }: any) {
          return <div className="space-y-2 my-3">{children}</div>;
        },
        li({ children }: any) {
          return <CustomListItem>{children}</CustomListItem>;
        },
        table({ children }: any) {
          return <CustomTable>{children}</CustomTable>;
        },
        thead({ children }: any) {
          return (
            <thead className="bg-slate-900 text-white font-extrabold border-b border-slate-800 shadow-2xs">
              {children}
            </thead>
          );
        },
        th({ children }: any) {
          return <th className="px-3.5 sm:px-4 py-2.5 font-black text-white uppercase tracking-wider text-[11px] sm:text-xs border-r border-slate-800 last:border-r-0">{children}</th>;
        },
        td({ children }: any) {
          return (
            <td className="px-3.5 sm:px-4 py-2.5 font-medium text-slate-800 leading-relaxed border-t border-slate-200 border-r border-slate-100 last:border-r-0 hover:bg-slate-50/60 transition-colors">
              {children}
            </td>
          );
        },
        p({ children }: any) {
          return (
            <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed my-3">
              {children}
            </p>
          );
        },
        img({ src, alt, ...props }: any) {
          if (!src) return null;
          const isOpt = compact || (alt && /option|choice|opt/i.test(alt));

          return (
            <span className={`${isOpt ? "my-1.5" : "my-4"} flex flex-col items-center justify-center block`}>
              <img
                src={src}
                alt={alt || "Diagram"}
                className={`${
                  isOpt
                    ? "max-h-24 sm:max-h-28 md:max-h-32 w-auto max-w-[260px] rounded-xl object-contain border border-gray-200 bg-white p-1.5 shadow-2xs"
                    : "max-h-[300px] sm:max-h-[360px] w-auto max-w-full rounded-2xl object-contain border border-gray-200 shadow-2xs bg-white p-2"
                } transition-all hover:shadow-md`}
                loading="eager"
                decoding="async"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.includes("cloudinary.com")) {
                    const match = target.src.match(/nest_pyqs\/([^/]+)\/([^/?#]+)/);
                    if (match) {
                      target.src = `/images/pyqs/${match[1]}/${match[2]}`;
                    } else {
                      const parts = target.src.split("/");
                      const filename = parts[parts.length - 1];
                      target.src = `/images/pyqs/2023_s1/${filename}`;
                    }
                  }
                }}
                {...props}
              />
              {alt && !isOpt && alt !== "Figure" && alt !== "Diagram" && (
                <span className="text-[11px] font-semibold text-gray-500 mt-1.5 text-center">
                  {alt}
                </span>
              )}
            </span>
          );
        }
      }}
    >
      {processedContent}
    </ReactMarkdown>
  );
};

export { MarkdownContent as CustomMarkdownRenderer };
export default MarkdownContent;


