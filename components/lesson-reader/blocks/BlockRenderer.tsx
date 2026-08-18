"use client";
/**
 * BlockRenderer.tsx
 *
 * Maps the existing ContentLesson JSON fields to the new block component system.
 * Backward compatible: handles markdown tables, takeaway blocks, concept grids,
 * and image collages.
 */
import * as React from "react";
import { ContentLesson, LessonConceptBlock } from "@/lib/types/content";
import { LessonBlock } from "@/lib/types/lesson-reader";

import { TextBlock } from "./TextBlock";
import { HeadingBlock } from "./HeadingBlock";
import { ImportantPointBlock } from "./ImportantPointBlock";
import { NestFocusBlock } from "./NestFocusBlock";
import { PyqFocusBlock } from "./PyqFocusBlock";
import { CommonMistakeBlock } from "./CommonMistakeBlock";
import { ExampleBlock } from "./ExampleBlock";
import { DefinitionBlock } from "./DefinitionBlock";
import { QuickRevisionBlock } from "./QuickRevisionBlock";
import { KeyTermsBlock } from "./KeyTermsBlock";
import { CalloutBlock } from "./CalloutBlock";
import { ComparisonBlock } from "./ComparisonBlock";
import { QuickSummaryBlock } from "./QuickSummaryBlock";
import { TakeawayBlock } from "./TakeawayBlock";
import { ConceptGridBlock } from "./ConceptGridBlock";
import { ImageGridBlock } from "./ImageGridBlock";

// ─── Markdown Table Parser ────────────────────────────────────────────────────

function parseMarkdownTable(md: string): { headers: string[]; rows: string[][] } | null {
  const lines = md.trim().split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) return null;

  const isRow = (line: string) => line.startsWith("|") && line.endsWith("|");
  const isSep = (line: string) => /^\|[-|\s:]+\|$/.test(line);

  if (!isRow(lines[0])) return null;

  const parseCells = (line: string) =>
    line.slice(1, -1).split("|").map((c) => c.trim());

  const headers = parseCells(lines[0]);
  let dataLines = lines.slice(1);
  if (dataLines.length > 0 && isSep(dataLines[0])) {
    dataLines = dataLines.slice(1);
  }

  const rows = dataLines.filter(isRow).map(parseCells);
  if (rows.length === 0) return null;

  return { headers, rows };
}

// ─── Main block router ────────────────────────────────────────────────────────

function SingleBlock({ block }: { block: LessonBlock }): React.ReactNode {
  const content = block.content as any;

  switch (block.type) {
    case "text":
      return <TextBlock content={content} />;

    case "heading":
      return <HeadingBlock content={content} />;

    case "quick_summary":
      return <QuickSummaryBlock content={content} />;

    case "important_point":
      return <ImportantPointBlock content={content} />;

    case "definition":
      return <DefinitionBlock content={content} />;

    case "example":
      return <ExampleBlock content={content} />;

    case "comparison":
      return <ComparisonBlock content={content} />;

    case "nest_focus":
      return <NestFocusBlock content={content} />;

    case "pyq_focus":
      return <PyqFocusBlock content={content} />;

    case "common_mistake":
      return <CommonMistakeBlock content={content} />;

    case "quick_revision":
      return <QuickRevisionBlock content={content} />;

    case "key_terms":
      return <KeyTermsBlock content={content} />;

    case "callout":
      return <CalloutBlock content={content} />;

    case "takeaway":
      return <TakeawayBlock title={content.title} text={content.text} />;

    case "concept_grid":
      return <ConceptGridBlock items={content.items} />;

    case "image_grid":
      return <ImageGridBlock images={content.images} caption={content.caption} />;

    default:
      if (content?.html || content?.text) {
        return <TextBlock content={content} />;
      }
      return null;
  }
}

// ─── Lesson → Blocks Mapper ───────────────────────────────────────────────────

export function lessonToBlocks(lesson: ContentLesson): LessonBlock[] {
  const blocks: LessonBlock[] = [];
  let order = 0;

  const push = (type: string, content: unknown) => {
    blocks.push({ id: `block-${order}`, type: type as any, order: order++, content });
  };

  // 1. Quick Summary
  const summary = lesson.quickSummary || lesson.summary;
  if (summary) push("quick_summary", { text: summary });

  // 2. Concept Breakdown — ordered content blocks
  if (lesson.conceptBreakdown && lesson.conceptBreakdown.length > 0) {
    for (const cb of lesson.conceptBreakdown) {
      const headingText = cb.heading || cb.title;
      if (headingText) {
        push("heading", {
          level: 2,
          text: headingText,
          anchorId: `heading-${headingText.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`,
        });
      }

      // Content (text or table)
      const raw = cb.contentMarkdown || cb.content || "";
      if (raw.trim()) {
        if (raw.includes("|") && raw.includes("---")) {
          const parsed = parseMarkdownTable(raw);
          if (parsed) {
            push("comparison", { headers: parsed.headers, rows: parsed.rows });
          } else {
            const html = raw.split(/\n\n+/).map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`).join("");
            push("text", { html });
          }
        } else {
          if (cb.type === "definition" && headingText) {
            push("definition", { term: headingText, definition: raw });
          } else {
            const html = raw.split(/\n\n+/).map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`).join("");
            push("text", { html });
          }
        }
      }

      // Bullet points
      if (cb.bulletPoints && cb.bulletPoints.length > 0) {
        const html = `<ul>${cb.bulletPoints.map((b) => `<li>${b}</li>`).join("")}</ul>`;
        push("text", { html });
      }

      // Takeaway inside concept breakdown
      if ((cb as any).takeaway) {
        push("takeaway", { title: "Key Takeaway", text: (cb as any).takeaway });
      }

      // Concept Grid inside concept breakdown (e.g. 3 levels of biodiversity)
      if ((cb as any).conceptGrid) {
        push("concept_grid", { items: (cb as any).conceptGrid });
      }

      // Image Grid inside concept breakdown
      if ((cb as any).imageGrid || (cb as any).images) {
        push("image_grid", {
          images: (cb as any).images,
          caption: (cb as any).caption,
        });
      }
    }
  }

  // Add default Takeaway if available
  if ((lesson as any).takeaway) {
    push("takeaway", { title: "Key Takeaway", text: (lesson as any).takeaway });
  }

  // 3. Important Points
  if (lesson.importantPoints && lesson.importantPoints.length > 0) {
    for (const ip of lesson.importantPoints) {
      push("important_point", { body: ip });
    }
  }

  // 4. NEST Focus
  if (lesson.nestFocus) {
    push("nest_focus", { points: [lesson.nestFocus] });
  }

  // 5. Common Mistakes
  if (lesson.commonMistakes && lesson.commonMistakes.length > 0) {
    for (const cm of lesson.commonMistakes) {
      const parts = cm.split(/\. (?=[A-Z])/);
      push("common_mistake", {
        mistake: parts[0] ? parts[0] + "." : cm,
        correction: parts.slice(1).join(". ") || "Refer to the concept above for the correct understanding.",
      });
    }
  }

  // 6. PYQ Focus
  if (lesson.pyqFocus) {
    push("pyq_focus", { description: lesson.pyqFocus, pyqs: [] });
  }

  // 7. Quick Revision
  if (lesson.quickRevision && lesson.quickRevision.length > 0) {
    push("quick_revision", { points: lesson.quickRevision });
  }

  // 8. Key Terms
  if (lesson.keyTerms && lesson.keyTerms.length > 0) {
    push("key_terms", { terms: lesson.keyTerms });
  }

  return blocks;
}

// ─── BlockRenderer Component ──────────────────────────────────────────────────

interface BlockRendererProps {
  lesson: ContentLesson;
}

export function BlockRenderer({ lesson }: BlockRendererProps) {
  const blocks = lessonToBlocks(lesson);

  return (
    <div suppressHydrationWarning className="space-y-8">
      {blocks.map((block) => {
        const node = SingleBlock({ block });
        if (!node) return null;
        return (
          <div key={block.id} id={block.metadata?.anchorId}>
            {node}
          </div>
        );
      })}
    </div>
  );
}
