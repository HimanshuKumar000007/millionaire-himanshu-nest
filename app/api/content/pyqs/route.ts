import { NextResponse } from "next/server";
import { pyqRepository } from "@/lib/content/pyqRepository";
import { SubjectType } from "@/lib/types/common";
import { ExamType } from "@/lib/types/content";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const subject = searchParams.get("subject");
    const yearStr = searchParams.get("year");
    const topic = searchParams.get("topic");
    const exam = searchParams.get("exam");

    if (id) {
      const pyq = pyqRepository.getPYQById(id);
      return NextResponse.json({ pyq });
    }

    const year = yearStr && !isNaN(parseInt(yearStr, 10)) ? parseInt(yearStr, 10) : null;

    if (subject && subject !== "All" && year) {
      const pyqs = pyqRepository.getPYQsBySubjectAndYear(subject as SubjectType, year);
      return NextResponse.json({ pyqs });
    }

    if (subject && topic) {
      const pyqs = pyqRepository.getPYQsByTopic(subject as SubjectType, topic);
      return NextResponse.json({ pyqs });
    }

    if (subject && subject !== "All") {
      const pyqs = pyqRepository.getPYQsBySubject(subject as SubjectType);
      return NextResponse.json({ pyqs });
    }

    if (year) {
      const pyqs = pyqRepository.getPYQsByYear(year);
      return NextResponse.json({ pyqs });
    }

    if (exam) {
      const pyqs = pyqRepository.getPYQsByExam(exam as ExamType);
      return NextResponse.json({ pyqs });
    }

    const pyqs = pyqRepository.getAllPYQs();
    return NextResponse.json({ pyqs });
  } catch (error) {
    console.error("[API /api/content/pyqs] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch PYQ content" },
      { status: 500 }
    );
  }
}

