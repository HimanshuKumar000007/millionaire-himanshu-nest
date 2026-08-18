import { NextResponse } from "next/server";
import { syllabusRepository } from "@/lib/content/syllabusRepository";
import { SubjectType } from "@/lib/types/common";

// Prevent static page-data collection — this route reads from the filesystem
export const dynamic = "force-dynamic";


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get("subject");

    if (subject && subject !== "All") {
      const syllabus = syllabusRepository.getFlatChaptersBySubject(subject as SubjectType);
      const units = syllabusRepository.getAllGroupedUnits().filter(
        (u) => u.subject.toLowerCase() === subject.toLowerCase()
      );
      return NextResponse.json({ syllabus, units });
    }

    const syllabus = syllabusRepository.getAllFlatChapters();
    const units = syllabusRepository.getAllGroupedUnits();
    const subjectsData = syllabusRepository.getAllSyllabusSubjects();

    return NextResponse.json({
      syllabus,
      units,
      subjects: subjectsData,
      totalChapters: syllabus.length,
    });
  } catch (error) {
    console.error("[API /api/content/syllabus] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch syllabus data" },
      { status: 500 }
    );
  }
}
