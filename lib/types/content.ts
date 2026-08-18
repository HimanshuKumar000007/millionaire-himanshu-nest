import { SubjectType } from "./common";

export type ExamType = "NEST" | "IISER_IAT";
export type QuestionType = "MCQ" | "MSQ" | "Numerical";
export type DifficultyLevel = "Core Foundation" | "High-Yield" | "Advanced";
export type ContentStatus = "published" | "draft" | "archived";

export interface BaseContentMetadata {
  id: string; // Permanent stable ID e.g. "phy-kinematics-001"
  exam: ExamType;
  subject: SubjectType;
  topic: string;
  subtopic?: string;
  difficulty: DifficultyLevel;
  status: ContentStatus;
  version?: number;
  source?: string; // e.g. "development-example", "official-nest-2024"
  createdAt?: string;
  updatedAt?: string;
}

export interface QuestionOption {
  id: string; // "a", "b", "c", "d"
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface NumericalRange {
  min: number;
  max: number;
  exactValue?: number;
  tolerance?: number;
}

export interface ContentQuestion extends BaseContentMetadata {
  title?: string;
  questionText: string;
  questionType: QuestionType;
  options?: QuestionOption[]; // Required for MCQ and MSQ
  numericalAnswer?: NumericalRange; // Required for Numerical
  solutionExplanation: string;
  correctAnswer?: string;
  keyFormulae?: string[];
  hints?: string[];
  marks: number; // e.g. +4 for correct
  negativeMarks: number; // e.g. -1 for incorrect
  imageSrc?: string;
  images?: string[];
  isImageBased?: boolean;
}

export interface LessonKeyTerm {
  term: string;
  definition: string;
}

export interface LessonConceptBlock {
  heading?: string;
  title?: string;
  type?: string;
  contentMarkdown?: string;
  content?: string;
  bulletPoints?: string[];
  summaryBox?: { title?: string; takeaway: string };
  listPills?: (string | { title?: string; text: string })[];
  codeSnippet?: string;
  asciiDiagram?: string;
  diagramType?: string;
  diagramData?: any;
  treeData?: any;
  practiceQuestions?: any[];
}

export interface ContentLesson extends BaseContentMetadata {
  slug: string;
  title: string;
  summary: string;
  quickSummary?: string;
  description?: string;
  heroImage?: string;
  coverImage?: string;
  readingTimeMinutes?: number;
  estimatedTimeMinutes?: number;
  keyConcepts?: string[];
  coreConcepts?: string[];
  importantPoints?: string[];
  nestFocus?: string;
  pyqFocus?: string;
  commonMistakes?: string[];
  quickRevision?: string[];
  keyTerms?: LessonKeyTerm[];
  conceptBreakdown: LessonConceptBlock[];
  contentMarkdown?: string;
  order?: number;
  unit?: string;
  unitNumber?: number;
  chapter?: string;
  chapterNumber?: number;
  chapterSlug?: string;
  classLevel?: string;
  topics?: string[];
  images?: any[];
}

export interface ChapterSectionItem {
  id: string;
  sectionNumber: number;
  title: string;
  topic: string;
  readingTimeMinutes: number;
  quickSummary?: string;
  keyConcepts?: string[];
  importantPoints?: string[];
  nestFocus?: string;
  pyqFocus?: string;
  commonMistakes?: string[];
  quickRevision?: string[];
  keyTerms?: LessonKeyTerm[];
  conceptBreakdown: LessonConceptBlock[];
  images?: any[];
}

export interface ChapterNextReference {
  slug: string;
  title: string;
  chapterNumber: number;
  subject: SubjectType;
}

export interface ContentChapterLesson extends BaseContentMetadata {
  type: "chapter-lesson";
  chapterNumber: number;
  chapterSlug: string;
  unit: string;
  unitNumber: number;
  classLevel: string;
  title: string;
  description?: string;
  heroImage?: string;
  coverImage?: string;
  estimatedTotalTimeMinutes: number;
  sections: ChapterSectionItem[];
  chapterCommonMistakes?: string[];
  chapterKeyTerms?: LessonKeyTerm[];
  chapterQuizId?: string;
  questions?: ContentQuestion[];
  nextChapter?: ChapterNextReference | null;
}

export interface ContentPYQItem extends BaseContentMetadata {
  year: number;
  paperName: string;
  section: string;
  questionText: string;
  questionType: QuestionType;
  options?: QuestionOption[];
  numericalAnswer?: NumericalRange;
  correctAnswer?: string; // e.g. "b" for MCQ option id
  solutionExplanation: string;
  keyFormulae?: string[];
  hints?: string[];
  marks: number; // e.g. +4
  negativeMarks: number; // e.g. -1
  question?: ContentQuestion;
}

export interface ContentMockDefinition extends BaseContentMetadata {
  title: string;
  category?: "Full Length" | "Sectional" | "Subject Diagnostic";
  totalMarks: number;
  evalMarks?: number;
  totalQuestions: number;
  durationMinutes: number;
  instructions?: string[];
  questionIds?: string[];
  questions?: ContentQuestion[];
}

export interface ResolvedContentMock extends ContentMockDefinition {
  questions: ContentQuestion[];
}

export interface SyllabusChapterItem {
  chapterNumber: number;
  chapterTitle: string;
  slug: string;
  topics: string[];
}

export interface SyllabusUnitItem {
  unitNumber: number | string;
  unitTitle: string;
  classLevel: "Class XI" | "Class XII" | string;
  chapters: SyllabusChapterItem[];
}

export interface SyllabusSubjectData {
  exam: string;
  subject: SubjectType;
  version: string;
  units: SyllabusUnitItem[];
}

export interface FlatSyllabusChapter {
  id: string;
  subject: SubjectType;
  classLevel: string;
  unitNumber: number | string;
  unitTitle: string;
  chapterNumber: number;
  chapterTitle: string;
  slug: string;
  topics: string[];
}

export interface GroupedSyllabusUnit {
  id: string;
  subject: SubjectType;
  classLevel: string;
  unitNumber: number | string;
  unitTitle: string;
  chapters: FlatSyllabusChapter[];
}

export interface ContentValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
