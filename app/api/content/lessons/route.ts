import { NextResponse } from "next/server";
import { lessonRepository } from "@/lib/content/lessonRepository";
import { SubjectType } from "@/lib/types/common";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");
    const subject = searchParams.get("subject");

    if (id) {
      const lesson = lessonRepository.getLessonById(id);
      return NextResponse.json({ lesson });
    }

    if (slug) {
      const lesson = lessonRepository.getLessonBySlug(slug);
      return NextResponse.json({ lesson });
    }

    if (subject && subject !== "All") {
      const lessons = lessonRepository.getLessonsBySubject(subject as SubjectType);
      return NextResponse.json({ lessons });
    }

    const lessons = lessonRepository.getAllLessons();
    return NextResponse.json({ lessons });
  } catch (error) {
    console.error("[API /api/content/lessons] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch lesson content" },
      { status: 500 }
    );
  }
}

