import { contentRepository } from "./contentRepository";
import { questionRepository } from "./questionRepository";
import {
  ContentMockDefinition,
  ResolvedContentMock,
  ExamType,
  ContentQuestion,
} from "@/lib/types/content";

export class MockRepository {
  /**
   * Loads all file-based mock definitions under /content/nest/mocks/nest.
   */
  public getAllMockDefinitions(onlyPublished = true): ContentMockDefinition[] {
    const mocks = contentRepository.loadAllJsonInDirectory<ContentMockDefinition>("mocks/nest");
    return mocks.filter((m) => m && m.id && (!onlyPublished || m.status === "published"));
  }

  /**
   * Retrieves a mock definition by stable ID.
   */
  public getMockDefinitionById(id: string): ContentMockDefinition | null {
    const all = this.getAllMockDefinitions(false);
    return all.find((m) => m.id === id) || null;
  }

  /**
   * Retrieves published mock definitions filtered by exam.
   */
  public getMocksByExam(exam: ExamType, onlyPublished = true): ContentMockDefinition[] {
    const all = this.getAllMockDefinitions(onlyPublished);
    return all.filter((m) => m.exam === exam);
  }

  /**
   * Resolves a mock definition by stable ID and hydrates all question objects.
   */
  public resolveMockWithQuestions(id: string): ResolvedContentMock | null {
    const mockDef = this.getMockDefinitionById(id);
    if (!mockDef) return null;

    // If questions are already directly embedded in the mock JSON definition
    if ((mockDef as any).questions && Array.isArray((mockDef as any).questions) && (mockDef as any).questions.length > 0) {
      return {
        ...mockDef,
        questions: (mockDef as any).questions,
      };
    }

    const resolvedQuestions: ContentQuestion[] = [];
    const missingQuestionIds: string[] = [];

    const questionIds = mockDef.questionIds || [];
    for (const qId of questionIds) {
      const q = questionRepository.getQuestionById(qId);
      if (q) {
        resolvedQuestions.push(q);
      } else {
        missingQuestionIds.push(qId);
      }
    }

    if (missingQuestionIds.length > 0) {
      console.warn(
        `[MockRepository] Mock '${id}' references ${missingQuestionIds.length} missing question IDs:`,
        missingQuestionIds
      );
    }

    return {
      ...mockDef,
      questions: resolvedQuestions,
    };
  }
}

export const mockRepository = new MockRepository();
