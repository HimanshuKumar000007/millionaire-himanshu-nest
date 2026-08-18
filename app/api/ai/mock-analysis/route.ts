import { NextRequest, NextResponse } from "next/server";
import { nemotronService } from "@/lib/services/nemotron.service";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      mockTitle = "NEST Full Mock Test",
      score = 76,
      totalMarks = 180,
      accuracy = 78,
      timeSpentSec = 9000,
    } = body;

    const analysis = await nemotronService.generateMockAnalysis(
      mockTitle,
      score,
      totalMarks,
      accuracy,
      timeSpentSec
    );

    return NextResponse.json({ analysis, success: true });
  } catch (err) {
    console.error("Mock Analysis AI Route Error:", err);
    return NextResponse.json({
      analysis: {
        headline: "Mock Test Analysis",
        overallAssessment: "Completed test attempt.",
        strengthHighlight: "Maintained test pacing.",
        weaknessHighlight: "Review negative marks.",
        timeManagementInsight: "Allocated time steadily.",
        actionPlan: ["Review incorrect answers", "Solve targeted PYQs"],
        recommendedFocusTopic: "Targeted PYQs",
        isFallback: true,
      },
      success: true,
    });
  }
}
