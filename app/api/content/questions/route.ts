import { NextResponse } from "next/server";
import { questionRepository } from "@/lib/content/questionRepository";
import { SubjectType } from "@/lib/types/common";
import { DifficultyLevel, QuestionType } from "@/lib/types/content";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const subject = searchParams.get("subject");
    const topic = searchParams.get("topic");
    const difficulty = searchParams.get("difficulty");
    const type = searchParams.get("type");

    if (id) {
      const question = questionRepository.getQuestionById(id);
      return NextResponse.json({ question });
    }

    if (subject && topic) {
      const questions = questionRepository.getQuestionsByTopic(
        subject as SubjectType,
        topic
      );
      return NextResponse.json({ questions });
    }

    if (subject && subject !== "All") {
      const questions = questionRepository.getQuestionsBySubject(
        subject as SubjectType
      );
      return NextResponse.json({ questions });
    }

    if (difficulty) {
      const questions = questionRepository.getQuestionsByDifficulty(
        difficulty as DifficultyLevel
      );
      return NextResponse.json({ questions });
    }

    if (type) {
      const questions = questionRepository.getQuestionsByType(
        type as QuestionType
      );
      return NextResponse.json({ questions });
    }

    const questions = questionRepository.getAllQuestions();
    return NextResponse.json({ questions });
  } catch (error) {
    console.error("[API /api/content/questions] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch question content" },
      { status: 500 }
    );
  }
}

