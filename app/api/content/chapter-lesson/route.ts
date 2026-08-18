import { NextResponse } from "next/server";
import { lessonRepository } from "@/lib/content/lessonRepository";
import { SubjectType } from "@/lib/types/common";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("chapterSlug") || searchParams.get("slug") || "the-living-world";
    const subject = (searchParams.get("subject") as SubjectType) || "Biology";

    const chapterLesson = lessonRepository.getChapterLesson(slug, subject);
    if (!chapterLesson) {
      return NextResponse.json({ error: `Chapter lesson '${slug}' not found` }, { status: 404 });
    }

    return NextResponse.json({ chapterLesson });
  } catch (error) {
    console.error("[API /api/content/chapter-lesson] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch chapter lesson content" },
      { status: 500 }
    );
  }
}

