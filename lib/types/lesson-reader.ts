/**
 * lib/types/lesson-reader.ts
 * Type definitions for the Premium Smart Lesson Reader block system.
 * These extend (not replace) the existing ContentLesson type.
 */

// ─── Block Types ─────────────────────────────────────────────────────────────

export type BlockType =
  | "text"
  | "heading"
  | "important_point"
  | "definition"
  | "example"
  | "comparison"
  | "formula"
  | "nest_focus"
  | "pyq_focus"
  | "common_mistake"
  | "quick_revision"
  | "key_terms"
  | "callout"
  | "quick_summary"
  | "question_preview"
  | "takeaway"
  | "concept_grid"
  | "image_grid";

export interface LessonBlock {
  id: string;
  type: BlockType;
  order: number;
  content: unknown;
  metadata?: {
    anchorId?: string;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
  };
}

// ─── Block Content Payloads ───────────────────────────────────────────────────

export interface TextBlockContent {
  html: string;
}

export interface HeadingBlockContent {
  level: 2 | 3 | 4;
  text: string;
  anchorId?: string;
}

export interface ImportantPointBlockContent {
  title?: string;
  body: string;
  icon?: "alert" | "star" | "none";
}

export interface DefinitionBlockContent {
  term: string;
  definition: string;
  pronunciation?: string;
  partOfSpeech?: string;
}

export interface ExampleBlockContent {
  title?: string;
  body: string;
  solution?: string;
}

export interface ComparisonBlockContent {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface FormulaBlockContent {
  formula: string;
  variables?: { symbol: string; meaning: string }[];
  explanation?: string;
}

export interface NestFocusBlockContent {
  title?: string;
  points: string[];
  takeaway?: string;
}

export interface PyqFocusBlockContent {
  title?: string;
  description: string;
  pyqs?: {
    year: number;
    question: string;
    reference?: string;
  }[];
}

export interface CommonMistakeBlockContent {
  title?: string;
  mistake: string;
  correction: string;
}

export interface QuickRevisionBlockContent {
  title?: string;
  points: string[];
}

export interface KeyTermsBlockContent {
  terms: { term: string; definition: string }[];
}

export type CalloutVariant = "info" | "success" | "warning" | "tip";
export interface CalloutBlockContent {
  variant: CalloutVariant;
  title?: string;
  body: string;
}

export interface QuickSummaryBlockContent {
  text: string;
}

export interface QuestionPreviewBlockContent {
  question: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
}

// ─── Sidebar / Navigation Types ───────────────────────────────────────────────

export type LessonNavStatus = "locked" | "available" | "completed" | "current";

export interface SidebarLesson {
  id: string;
  title: string;
  order: number;
  estimatedMinutes?: number;
  status: LessonNavStatus;
}

export interface LessonReaderProps {
  lesson: import("@/lib/types/content").ContentLesson;
  /** All lessons in the same chapter (for sidebar navigation) */
  chapterLessons?: SidebarLesson[];
  onClose: () => void;
  onProgressUpdate?: () => void;
  onNavigateLesson?: (lessonId: string) => void;
}
