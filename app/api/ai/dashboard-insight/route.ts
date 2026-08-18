import { NextResponse } from "next/server";
import { readinesEngineService } from "@/lib/services/readinessEngine.service";
import { nemotronService } from "@/lib/services/nemotron.service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // 1. Fetch real student dashboard summary
    const { summary, error } = await readinesEngineService.getDerivedDashboardSummary();

    if (error || !summary) {
      const fallback = await nemotronService.generateDashboardInsight({
        ...summary,
        hasCompletedAssessment: false,
      });
      return NextResponse.json({ insight: fallback, success: true });
    }

    // 2. Pass structured performance object to Nemotron service
    const insight = await nemotronService.generateDashboardInsight(summary);

    return NextResponse.json(
      { insight, success: true },
      {
        headers: {
          "Cache-Control": "private, max-age=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (err) {
    console.error("Dashboard AI Insight Route Error:", err);
    // AI failure MUST NEVER break the dashboard
    return NextResponse.json({
      insight: {
        headline: "Focus on your high-priority weak topics",
        summary: "Target The Living World and Some Basic Concepts of Chemistry PYQs to boost your overall accuracy.",
        strongestSubject: "Physics",
        focusSubject: "Biology",
        recommendedAction: "Practice Biology Questions",
        recommendedRoute: "practice",
        reason: "Targeting your focus area builds consistency.",
        isFallback: true,
      },
      success: true,
    });
  }
}

export async function POST() {
  return GET();
}
