import { ContentQuestion, ContentPYQItem } from "@/lib/types/content";

export interface QuestionEvaluationResult {
  isCorrect: boolean;
  score: number;
  explanation: string;
  correctAnswerSummary: string;
}

export class QuestionEvaluationService {
  public evaluate(
    question: ContentQuestion | ContentPYQItem,
    userAnswer: any
  ): QuestionEvaluationResult {
    const marks = question.marks || 4;
    const negativeMarks = question.negativeMarks !== undefined ? question.negativeMarks : 1;
    const explanation = question.solutionExplanation || "No explanation provided.";

    if (userAnswer === null || userAnswer === undefined || userAnswer === "") {
      return {
        isCorrect: false,
        score: 0,
        explanation,
        correctAnswerSummary: "Unattempted",
      };
    }

    const type = question.questionType || "MCQ";

    // 1. MCQ Evaluation
    if (type === "MCQ") {
      const selectedId = String(userAnswer).toLowerCase().trim();
      let isCorrect = false;
      let correctOptionText = "";

      if (question.options && question.options.length > 0) {
        const chosen = question.options.find(
          (o) => o.id.toLowerCase().trim() === selectedId
        );
        isCorrect = chosen?.isCorrect === true;
        const correctOpt = question.options.find((o) => o.isCorrect === true);
        correctOptionText = correctOpt ? `Option (${correctOpt.id.toUpperCase()}) ${correctOpt.text}` : `Option (${selectedId.toUpperCase()})`;
      } else if (question.correctAnswer) {
        isCorrect = question.correctAnswer.toLowerCase().trim() === selectedId;
        correctOptionText = `Option (${question.correctAnswer.toUpperCase()})`;
      }

      return {
        isCorrect,
        score: isCorrect ? marks : -negativeMarks,
        explanation,
        correctAnswerSummary: correctOptionText,
      };
    }

    // 2. MSQ Evaluation
    if (type === "MSQ") {
      const selectedIds = Array.isArray(userAnswer)
        ? userAnswer.map((a) => String(a).toLowerCase().trim())
        : [String(userAnswer).toLowerCase().trim()];

      let isCorrect = false;
      let correctOptionText = "";

      if (question.options && question.options.length > 0) {
        const correctIds = question.options
          .filter((o) => o.isCorrect === true)
          .map((o) => o.id.toLowerCase().trim());

        const selectedSet = new Set(selectedIds);
        const correctSet = new Set(correctIds);

        // Exact match required
        isCorrect =
          selectedSet.size === correctSet.size &&
          [...selectedSet].every((id) => correctSet.has(id));

        correctOptionText = `Options: ${correctIds.map((id) => id.toUpperCase()).join(", ")}`;
      }

      return {
        isCorrect,
        score: isCorrect ? marks : -negativeMarks,
        explanation,
        correctAnswerSummary: correctOptionText,
      };
    }

    // 3. Numerical Evaluation
    if (type === "Numerical") {
      const numVal = parseFloat(userAnswer);
      let isCorrect = false;
      let summary = "";

      if (isNaN(numVal)) {
        return {
          isCorrect: false,
          score: -negativeMarks,
          explanation,
          correctAnswerSummary: "Invalid numeric input",
        };
      }

      const numAns = question.numericalAnswer;
      if (numAns) {
        isCorrect = numVal >= numAns.min && numVal <= numAns.max;
        summary = `Expected Range: [${numAns.min}, ${numAns.max}]` + (numAns.exactValue !== undefined ? ` (Exact: ${numAns.exactValue})` : "");
      }

      return {
        isCorrect,
        score: isCorrect ? marks : -negativeMarks,
        explanation,
        correctAnswerSummary: summary,
      };
    }

    return {
      isCorrect: false,
      score: -negativeMarks,
      explanation,
      correctAnswerSummary: "Unknown question type",
    };
  }
}

export const questionEvaluationService = new QuestionEvaluationService();
