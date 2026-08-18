import { contentRepository } from "./contentRepository";
import { questionRepository } from "./questionRepository";
import { lessonRepository } from "./lessonRepository";
import { pyqRepository } from "./pyqRepository";
import { mockRepository } from "./mockRepository";
import {
  ContentQuestion,
  ContentLesson,
  ContentPYQItem,
  ContentMockDefinition,
  ContentValidationResult,
} from "@/lib/types/content";

export interface ContentQAResult {
  passed: boolean;
  totalErrors: number;
  totalWarnings: number;
  summary: {
    questions: Record<string, number>;
    lessons: Record<string, number>;
    pyqs: Record<string, number>;
    mocks: Record<string, number>;
    developmentExamples: {
      questions: number;
      lessons: number;
      pyqs: number;
      mocks: number;
    };
    productionItems: {
      questions: number;
      lessons: number;
      pyqs: number;
      mocks: number;
    };
  };
  errors: string[];
  warnings: string[];
}

export class ContentQAService {
  public validateAllContent(): ContentQAResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Summary counters
    const summary = {
      questions: {} as Record<string, number>,
      lessons: {} as Record<string, number>,
      pyqs: {} as Record<string, number>,
      mocks: {} as Record<string, number>,
      developmentExamples: {
        questions: 0,
        lessons: 0,
        pyqs: 0,
        mocks: 0,
      },
      productionItems: {
        questions: 0,
        lessons: 0,
        pyqs: 0,
        mocks: 0,
      },
    };

    const allIds = new Map<string, string>(); // ID -> Source File / Entity Type

    // 1. Validate Questions
    const questions = questionRepository.getAllQuestions();
    for (const q of questions) {
      const subjKey = q.subject || "Unknown";
      summary.questions[subjKey] = (summary.questions[subjKey] || 0) + 1;

      if (q.source === "development-example") {
        summary.developmentExamples.questions++;
      } else {
        summary.productionItems.questions++;
      }

      // Check ID uniqueness
      if (allIds.has(q.id)) {
        errors.push(`Duplicate Question ID '${q.id}' found in repository (conflicts with ${allIds.get(q.id)}).`);
      } else {
        allIds.set(q.id, `Question: ${q.subject}`);
      }

      // Question schema checks
      const qRes = contentRepository.validateQuestion(q);
      if (!qRes.isValid) {
        qRes.errors.forEach((err) => errors.push(`Question '${q.id}': ${err}`));
      }
      qRes.warnings.forEach((warn) => warnings.push(`Question '${q.id}': ${warn}`));

      // Specific Question Type Checks
      if (q.questionType === "MCQ") {
        if (!q.options || q.options.length < 2) {
          errors.push(`MCQ Question '${q.id}' must have at least 2 options.`);
        } else {
          const correctOpts = q.options.filter((o) => o.isCorrect === true);
          if (correctOpts.length !== 1 && !q.correctAnswer) {
            errors.push(`MCQ Question '${q.id}' must have exactly one correct option (found ${correctOpts.length}).`);
          }
        }
      } else if (q.questionType === "MSQ") {
        if (!q.options || q.options.length < 2) {
          errors.push(`MSQ Question '${q.id}' must have at least 2 options.`);
        } else {
          const correctOpts = q.options.filter((o) => o.isCorrect === true);
          if (correctOpts.length < 1) {
            errors.push(`MSQ Question '${q.id}' must have at least one correct option.`);
          }
        }
      } else if (q.questionType === "Numerical") {
        if (!q.numericalAnswer) {
          errors.push(`Numerical Question '${q.id}' missing 'numericalAnswer' bounds object.`);
        } else if (q.numericalAnswer.min > q.numericalAnswer.max) {
          errors.push(`Numerical Question '${q.id}' has invalid range: min (${q.numericalAnswer.min}) > max (${q.numericalAnswer.max}).`);
        }
      }
    }

    // 2. Validate Lessons
    const lessons = lessonRepository.getAllLessons();
    const lessonSlugs = new Set<string>();

    for (const l of lessons) {
      const subjKey = l.subject || "Unknown";
      summary.lessons[subjKey] = (summary.lessons[subjKey] || 0) + 1;

      if (l.source === "development-example") {
        summary.developmentExamples.lessons++;
      } else {
        summary.productionItems.lessons++;
      }

      if (allIds.has(l.id)) {
        errors.push(`Duplicate Lesson ID '${l.id}' found in repository (conflicts with ${allIds.get(l.id)}).`);
      } else {
        allIds.set(l.id, `Lesson: ${l.subject}`);
      }

      if (lessonSlugs.has(l.slug)) {
        errors.push(`Duplicate Lesson slug '${l.slug}' found in lesson '${l.id}'.`);
      } else {
        lessonSlugs.add(l.slug);
      }

      // Lesson required fields
      if (!l.title || l.title.trim() === "") errors.push(`Lesson '${l.id}' missing title.`);
      const summaryText = l.quickSummary || l.summary;
      if (!summaryText || summaryText.trim() === "") errors.push(`Lesson '${l.id}' missing quickSummary / summary.`);
      if (!l.conceptBreakdown || l.conceptBreakdown.length === 0) errors.push(`Lesson '${l.id}' has empty conceptBreakdown.`);
    }

    // 3. Validate PYQs
    const pyqs = pyqRepository.getAllPYQs();
    for (const pyq of pyqs) {
      const subjKey = pyq.subject || "Unknown";
      summary.pyqs[subjKey] = (summary.pyqs[subjKey] || 0) + 1;

      if (pyq.source === "development-example") {
        summary.developmentExamples.pyqs++;
      } else {
        summary.productionItems.pyqs++;
      }

      if (allIds.has(pyq.id)) {
        errors.push(`Duplicate PYQ ID '${pyq.id}' found in repository (conflicts with ${allIds.get(pyq.id)}).`);
      } else {
        allIds.set(pyq.id, `PYQ: ${pyq.subject}`);
      }

      if (!pyq.year || pyq.year < 2000 || pyq.year > 2030) {
        errors.push(`PYQ '${pyq.id}' has invalid exam year (${pyq.year}).`);
      }
      if (!pyq.solutionExplanation || pyq.solutionExplanation.trim() === "") {
        errors.push(`PYQ '${pyq.id}' missing solutionExplanation.`);
      }
    }

    // 4. Validate Mocks & Cross-References
    const mocks = mockRepository.getAllMockDefinitions();
    for (const m of mocks) {
      const examKey = m.exam || "Unknown";
      summary.mocks[examKey] = (summary.mocks[examKey] || 0) + 1;

      if (m.source === "development-example") {
        summary.developmentExamples.mocks++;
      } else {
        summary.productionItems.mocks++;
      }

      if (allIds.has(m.id)) {
        errors.push(`Duplicate Mock ID '${m.id}' found in repository (conflicts with ${allIds.get(m.id)}).`);
      } else {
        allIds.set(m.id, `Mock: ${m.exam}`);
      }

      if (!m.durationMinutes || m.durationMinutes <= 0) {
        errors.push(`Mock '${m.id}' has invalid durationMinutes (${m.durationMinutes}).`);
      }

      const hasDirectQuestions = Array.isArray(m.questions) && m.questions.length > 0;
      const hasQuestionIds = Array.isArray(m.questionIds) && m.questionIds.length > 0;

      if (!hasDirectQuestions && !hasQuestionIds) {
        errors.push(`Mock '${m.id}' has neither questions nor questionIds array.`);
      } else if (hasDirectQuestions) {
        if (m.questions!.length !== m.totalQuestions) {
          errors.push(`Mock '${m.id}' totalQuestions count mismatch: declared ${m.totalQuestions}, found ${m.questions!.length} embedded questions.`);
        }
        const seenInMock = new Set<string>();
        for (const q of m.questions!) {
          if (seenInMock.has(q.id)) {
            errors.push(`Mock '${m.id}' contains duplicate embedded question '${q.id}'.`);
          } else {
            seenInMock.add(q.id);
          }
          if (!q.questionText || q.questionText.trim() === "") {
            errors.push(`Mock '${m.id}' question '${q.id}' has empty questionText.`);
          }
        }
      } else if (hasQuestionIds) {
        // Calculated count check
        if (m.questionIds!.length !== m.totalQuestions) {
          errors.push(`Mock '${m.id}' totalQuestions count mismatch: declared ${m.totalQuestions}, found ${m.questionIds!.length} questionIds.`);
        }

        // Duplicate check inside single mock
        const seenInMock = new Set<string>();
        for (const qId of m.questionIds!) {
          if (seenInMock.has(qId)) {
            errors.push(`Mock '${m.id}' contains duplicate question reference '${qId}'.`);
          } else {
            seenInMock.add(qId);
          }

          // Cross-reference existence check
          const resolvedQ = questionRepository.getQuestionById(qId);
          if (!resolvedQ) {
            errors.push(`Mock '${m.id}' references non-existent question ID '${qId}'.`);
          }
        }
      }
    }

    // 5. Validate Syllabus Hierarchy
    const subjects = ["physics", "chemistry", "biology", "mathematics"];
      const chapterSlugs = new Set<string>();

      for (const subj of subjects) {
        const syllabus = contentRepository.loadJsonFile<any>(`${subj}/topics/syllabus.json`);
        if (!syllabus) {
          errors.push(`Missing syllabus.json for subject '${subj}'.`);
          continue;
        }

        if (syllabus.exam !== "NEST") {
          errors.push(`Syllabus '${subj}' has invalid exam '${syllabus.exam}' (expected NEST).`);
        }

        if (!syllabus.units || !Array.isArray(syllabus.units) || syllabus.units.length === 0) {
          errors.push(`Syllabus '${subj}' missing units array or units are empty.`);
          continue;
        }

        for (const unit of syllabus.units) {
          if (!unit.unitTitle) errors.push(`Syllabus '${subj}' Unit ${unit.unitNumber} missing unitTitle.`);
          if (!unit.chapters || !Array.isArray(unit.chapters) || unit.chapters.length === 0) {
            errors.push(`Syllabus '${subj}' Unit ${unit.unitNumber} has empty chapters array.`);
            continue;
          }

          for (const ch of unit.chapters) {
            if (!ch.slug) {
              errors.push(`Syllabus '${subj}' Chapter ${ch.chapterNumber} '${ch.chapterTitle}' missing slug.`);
            } else if (chapterSlugs.has(ch.slug)) {
              errors.push(`Duplicate chapter slug '${ch.slug}' in ${subj} syllabus.`);
            } else {
              chapterSlugs.add(ch.slug);
            }

            if (!ch.topics || ch.topics.length === 0) {
              errors.push(`Syllabus '${subj}' Chapter ${ch.chapterNumber} '${ch.chapterTitle}' has empty topics list.`);
            }
          }
        }
      }

    const totalErrors = errors.length;
    const totalWarnings = warnings.length;

    return {
      passed: totalErrors === 0,
      totalErrors,
      totalWarnings,
      summary,
      errors,
      warnings,
    };
  }
}

export const contentQAService = new ContentQAService();
