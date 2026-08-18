import { NextResponse } from "next/server";
import { mockRepository } from "@/lib/content/mockRepository";
import { ExamType } from "@/lib/types/content";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const exam = searchParams.get("exam");
    const resolve = searchParams.get("resolve");

    if (id) {
      if (resolve === "true" || resolve === "1") {
        const resolvedMock = mockRepository.resolveMockWithQuestions(id);
        if (!resolvedMock) {
          return NextResponse.json({ error: "Mock not found or invalid" }, { status: 404 });
        }
        return NextResponse.json({ mock: resolvedMock });
      }

      const mock = mockRepository.getMockDefinitionById(id);
      if (!mock) {
        return NextResponse.json({ error: "Mock not found" }, { status: 404 });
      }
      return NextResponse.json({ mock });
    }

    if (exam) {
      const mocks = mockRepository.getMocksByExam(exam as ExamType);
      return NextResponse.json({ mocks });
    }

    const mocks = mockRepository.getAllMockDefinitions();
    return NextResponse.json({ mocks });
  } catch (error) {
    console.error("[API /api/content/mocks] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch mock definitions" },
      { status: 500 }
    );
  }
}

