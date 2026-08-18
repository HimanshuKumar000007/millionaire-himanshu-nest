import { NestDashboardSummary } from "@/lib/types/dashboard";
import { DashboardAIInsight, MockAIAnalysis } from "@/lib/types/ai";

const NVIDIA_API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const NEMOTRON_MODEL = "nvidia/nemotron-mini-4b-instruct";

export class NemotronService {
  /**
   * Generates a personalized dashboard insight using NVIDIA Nemotron.
   * If API key is unconfigured, times out, or fails, gracefully returns a deterministic fallback.
   */
  async generateDashboardInsight(summary: NestDashboardSummary): Promise<DashboardAIInsight> {
    // 1. Handle New Users / Unstarted Users without calling AI
    if (!summary.hasCompletedAssessment || summary.quickStats.questionsSolved === 0) {
      return {
        headline: "Start Your NEST 2027 Diagnostic Journey",
        summary: "Complete your free diagnostic assessment or solve a few practice questions so SciPrep AI can analyze your performance across Physics, Chemistry, Biology, and Mathematics.",
        strongestSubject: "—",
        focusSubject: "—",
        recommendedAction: "Start Free Assessment",
        recommendedRoute: "practice",
        reason: "Initial performance data is required to map your personalized preparation track.",
        isFallback: true,
      };
    }

    const apiKey = process.env.NVIDIA_API_KEY;

    // 2. Fallback if NVIDIA API Key is not configured
    if (!apiKey) {
      return this.generateDeterministicFallbackInsight(summary);
    }

    try {
      // Build structured context for Nemotron
      const phyScore = summary.subjects.find((s) => s.subject === "Physics")?.score || 0;
      const cheScore = summary.subjects.find((s) => s.subject === "Chemistry")?.score || 0;
      const bioScore = summary.subjects.find((s) => s.subject === "Biology")?.score || 0;
      const matScore = summary.subjects.find((s) => s.subject === "Mathematics")?.score || 0;

      const topWeakTopic = summary.weakAreas[0]?.topic || "General Problem Solving";
      const topWeakAcc = summary.weakAreas[0]?.accuracy ?? 0;

      const systemPrompt = `You are SciPrep AI, an expert advisor for NEST (National Entrance Screening Test for NISER and CEBS).
Analyze the student's real performance data provided. Output ONLY a valid raw JSON object matching this exact schema:
{
  "headline": "Short punchy insight title (1 sentence)",
  "summary": "Direct, encouraging analysis of their scores highlighting biggest improvement opportunity (2-3 sentences)",
  "strongestSubject": "Name of highest performing subject",
  "focusSubject": "Name of lowest performing subject needing focus",
  "recommendedAction": "Actionable next step",
  "recommendedRoute": "smart-lessons" or "pyqs" or "practice" or "mock-tests",
  "reason": "Clear 1-sentence rationale based on their actual accuracy data"
}

STRICT RULES:
1. DO NOT fabricate any numerical scores, attempts, or rank predictions. Use ONLY the supplied data.
2. DO NOT include markdown code fences or any text outside the JSON object.`;

      const userPrompt = `Student Performance Data:
- Readiness Index: ${summary.readinessScore}/100 (Status: ${summary.status})
- Physics: ${phyScore}%
- Chemistry: ${cheScore}%
- Biology: ${bioScore}%
- Mathematics: ${matScore}%
- Total Questions Solved: ${summary.quickStats.questionsSolved}
- Completed Mocks: ${summary.quickStats.mocksCompleted}
- Overall Accuracy: ${summary.quickStats.averageAccuracy}%
- Highest Priority Weak Topic: "${topWeakTopic}" (Accuracy: ${topWeakAcc}%)`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

      const response = await fetch(NVIDIA_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: NEMOTRON_MODEL,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.3,
          max_tokens: 400,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return this.generateDeterministicFallbackInsight(summary);
      }

      const rawText = await response.text();
      const cleanedJson = rawText.replace(/```json/g, "").replace(/```/g, "").trim();

      const parsedData = JSON.parse(cleanedJson);
      const content = parsedData.choices?.[0]?.message?.content || cleanedJson;
      const parsedInsight = typeof content === "string" ? JSON.parse(content) : content;

      if (
        parsedInsight &&
        typeof parsedInsight.headline === "string" &&
        typeof parsedInsight.summary === "string"
      ) {
        const validRoutes = ["smart-lessons", "pyqs", "practice", "mock-tests"];
        const route = validRoutes.includes(parsedInsight.recommendedRoute)
          ? parsedInsight.recommendedRoute
          : "practice";

        return {
          headline: parsedInsight.headline,
          summary: parsedInsight.summary,
          strongestSubject: parsedInsight.strongestSubject || summary.strongestSubject.split(" ")[0],
          focusSubject: parsedInsight.focusSubject || summary.focusSubject.split(" ")[0],
          recommendedAction: parsedInsight.recommendedAction || "Start Practice Session",
          recommendedRoute: route as DashboardAIInsight["recommendedRoute"],
          reason: parsedInsight.reason || `Based on your recent accuracy metrics in ${summary.focusSubject.split(" ")[0]}.`,
          isFallback: false,
        };
      }

      return this.generateDeterministicFallbackInsight(summary);
    } catch {
      return this.generateDeterministicFallbackInsight(summary);
    }
  }

  /**
   * Generates deep analysis for a completed mock attempt.
   */
  async generateMockAnalysis(mockTitle: string, score: number, totalMarks: number, accuracy: number, timeSpentSec: number): Promise<MockAIAnalysis> {
    const apiKey = process.env.NVIDIA_API_KEY;

    if (!apiKey) {
      return {
        headline: `Analysis for ${mockTitle}`,
        overallAssessment: `You scored ${score}/${totalMarks} with an overall accuracy of ${accuracy}%.`,
        strengthHighlight: accuracy >= 70 ? "Consistent accuracy across attempted sections." : "Completed the full exam duration.",
        weaknessHighlight: accuracy < 60 ? "Focus on reducing negative marks (-1 formula)." : "Time allocation per question.",
        timeManagementInsight: `Average time per question was ${Math.round(timeSpentSec / 60)} minutes.`,
        actionPlan: [
          "Review all incorrect questions in the result breakdown.",
          "Solve 15 targeted PYQs in your lowest scoring section.",
        ],
        recommendedFocusTopic: "Targeted PYQ Revision",
        isFallback: true,
      };
    }

    try {
      const response = await fetch(NVIDIA_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: NEMOTRON_MODEL,
          messages: [
            {
              role: "system",
              content: "You are SciPrep AI. Output ONLY raw valid JSON with keys: headline, overallAssessment, strengthHighlight, weaknessHighlight, timeManagementInsight, actionPlan (array of 2 strings), recommendedFocusTopic.",
            },
            {
              role: "user",
              content: `Mock Test: "${mockTitle}", Score: ${score}/${totalMarks}, Accuracy: ${accuracy}%, Time Spent: ${Math.round(timeSpentSec / 60)} mins.`,
            },
          ],
          temperature: 0.3,
          max_tokens: 500,
        }),
      });

      if (!response.ok) throw new Error("API call failed");

      const rawText = await response.text();
      const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      const content = parsed.choices?.[0]?.message?.content || cleaned;
      const data = typeof content === "string" ? JSON.parse(content) : content;

      return {
        headline: data.headline || `Mock Analysis — ${mockTitle}`,
        overallAssessment: data.overallAssessment || `Achieved ${score}/${totalMarks} (${accuracy}% accuracy).`,
        strengthHighlight: data.strengthHighlight || "Strong performance in core concepts.",
        weaknessHighlight: data.weaknessHighlight || "Target weak topics for score improvement.",
        timeManagementInsight: data.timeManagementInsight || "Pace yourself consistently.",
        actionPlan: Array.isArray(data.actionPlan) ? data.actionPlan : ["Review incorrect answers", "Solve targeted PYQs"],
        recommendedFocusTopic: data.recommendedFocusTopic || "Practice Questions",
        isFallback: false,
      };
    } catch {
      return {
        headline: `Analysis for ${mockTitle}`,
        overallAssessment: `You scored ${score}/${totalMarks} with an overall accuracy of ${accuracy}%.`,
        strengthHighlight: "Completed full test attempt.",
        weaknessHighlight: "Review negative marks from unverified guesses.",
        timeManagementInsight: `Completed in ${Math.round(timeSpentSec / 60)} minutes.`,
        actionPlan: ["Review incorrect answers in test summary", "Practice targeted weak topics"],
        recommendedFocusTopic: "Targeted PYQs",
        isFallback: true,
      };
    }
  }

  /**
   * Deterministic fallback insight generator built from real summary data.
   */
  private generateDeterministicFallbackInsight(summary: NestDashboardSummary): DashboardAIInsight {
    const sortedSubjects = [...summary.subjects].sort((a, b) => b.score - a.score);
    const strongest = sortedSubjects[0]?.subject || "Physics";
    const focus = sortedSubjects[sortedSubjects.length - 1]?.subject || "Biology";
    const focusScore = sortedSubjects[sortedSubjects.length - 1]?.score || 0;

    const topWeak = summary.weakAreas[0];
    const recommendedRoute = topWeak?.actionType === "lesson" ? "smart-lessons" : "practice";

    return {
      headline: `${focus} presents your largest growth opportunity`,
      summary: `Your ${strongest} score is currently your strongest area, while ${focus} is at ${focusScore}%. ${
        topWeak
          ? `Focus next on ${topWeak.topic}, where your accuracy is ${topWeak.accuracy}%.`
          : `Solving 15 targeted practice questions in ${focus} will help elevate your readiness index.`
      }`,
      strongestSubject: strongest,
      focusSubject: focus,
      recommendedAction: topWeak ? topWeak.recommendedAction : `Practice ${focus} Questions`,
      recommendedRoute: recommendedRoute as DashboardAIInsight["recommendedRoute"],
      reason: `Derived from your actual question attempt accuracy in ${focus}.`,
      isFallback: true,
    };
  }
}

export const nemotronService = new NemotronService();
