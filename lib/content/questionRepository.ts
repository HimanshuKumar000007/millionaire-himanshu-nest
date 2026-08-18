import { contentRepository } from "./contentRepository";
import {
  ContentQuestion,
  DifficultyLevel,
  QuestionType,
} from "@/lib/types/content";
import { SubjectType } from "@/lib/types/common";

export class QuestionRepository {
  /**
   * Loads all file-based questions for NEST across subjects.
   */
  public getAllQuestions(onlyPublished = true): ContentQuestion[] {
    const subjects: SubjectType[] = ["Physics", "Chemistry", "Biology", "Mathematics"];
    const allQuestions: ContentQuestion[] = [];
    const seenIds = new Set<string>();

    for (const subject of subjects) {
      const folderPath = `${subject.toLowerCase()}/questions`;
      const questions = contentRepository.loadAllJsonInDirectory<ContentQuestion>(folderPath);

      for (const q of questions) {
        // Validate question schema & ID uniqueness
        const validation = contentRepository.validateQuestion(q, seenIds);
        if (!validation.isValid) {
          console.warn(`[QuestionRepository] Validation warning for '${q?.id}':`, validation.errors);
          continue;
        }

        seenIds.add(q.id);

        if (!onlyPublished || q.status === "published") {
          allQuestions.push(q);
        }
      }
    }

    return allQuestions;
  }

  /**
   * Retrieves a question by its permanent stable ID (e.g., "phy-kinematics-001").
   */
  public getQuestionById(id: string): ContentQuestion | null {
    const all = this.getAllQuestions(false);
    return all.find((q) => q.id === id) || null;
  }

  /**
   * Retrieves questions filtered by Subject (Physics, Chemistry, Biology, Mathematics).
   */
  public getQuestionsBySubject(subject: SubjectType, onlyPublished = true): ContentQuestion[] {
    const folderPath = `${subject.toLowerCase()}/questions`;
    const questions = contentRepository.loadAllJsonInDirectory<ContentQuestion>(folderPath);
    const seenIds = new Set<string>();
    const validQuestions: ContentQuestion[] = [];

    for (const q of questions) {
      const validation = contentRepository.validateQuestion(q, seenIds);
      if (!validation.isValid) continue;

      seenIds.add(q.id);
      if (!onlyPublished || q.status === "published") {
        validQuestions.push(q);
      }
    }

    return validQuestions;
  }

  /**
   * Retrieves questions filtered by Topic.
   */
  public getQuestionsByTopic(subject: SubjectType, topic: string, onlyPublished = true): ContentQuestion[] {
    const subjectQuestions = this.getQuestionsBySubject(subject, onlyPublished);
    return subjectQuestions.filter(
      (q) => q.topic.toLowerCase().trim() === topic.toLowerCase().trim()
    );
  }

  /**
   * Retrieves questions filtered by Difficulty Level.
   */
  public getQuestionsByDifficulty(difficulty: DifficultyLevel, onlyPublished = true): ContentQuestion[] {
    const all = this.getAllQuestions(onlyPublished);
    return all.filter((q) => q.difficulty === difficulty);
  }

  /**
   * Retrieves questions filtered by Question Type (MCQ, MSQ, Numerical).
   */
  public getQuestionsByType(type: QuestionType, onlyPublished = true): ContentQuestion[] {
    const all = this.getAllQuestions(onlyPublished);
    return all.filter((q) => q.questionType === type);
  }
}

export const questionRepository = new QuestionRepository();
