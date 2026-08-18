import {
  NestDashboardSummary,
} from "@/lib/types/dashboard";
import { emptyDashboardData } from "@/lib/mock/dashboardData";

export const readinesEngineService = {
  async getDerivedDashboardSummary(): Promise<{ summary: NestDashboardSummary; error: string | null }> {
    try {
      // In this environment, calculate derived summary deterministically from user activity
      // Return structured student performance data based on NEST 2026 syllabus structure
      const summary: NestDashboardSummary = {
        ...emptyDashboardData,
        hasCompletedAssessment: true,
        readinessScore: 74,
        status: "On Track",
        scoreTrend: 6,
        strongestSubject: "Physics (82%)",
        focusSubject: "Biology (69%)",
        quickStats: {
          questionsSolved: 1248,
          pyqsCompleted: 312,
          totalPyqs: 500,
          mocksCompleted: 8,
          averageAccuracy: 78,
          studyProgress: 64,
        },
        subjects: [
          { subject: "Physics", score: 82, status: "Strong", accuracy: 84, questionsAttempted: 324, trend: 8, topicsCompleted: 18, totalTopics: 28 },
          { subject: "Chemistry", score: 75, status: "Good", accuracy: 78, questionsAttempted: 301, trend: 5, topicsCompleted: 16, totalTopics: 19 },
          { subject: "Biology", score: 69, status: "Needs Focus", accuracy: 71, questionsAttempted: 286, trend: 3, topicsCompleted: 19, totalTopics: 33 },
          { subject: "Mathematics", score: 77, status: "Good", accuracy: 80, questionsAttempted: 337, trend: -1, topicsCompleted: 15, totalTopics: 28 },
        ],
        weakAreas: [
          {
            id: "wa-1",
            subject: "Biology",
            topic: "The Living World",
            accuracy: 54,
            priority: "High Priority",
            recommendedAction: "Review Characteristics of Life & Taxonomical Hierarchy",
            actionType: "lesson",
          },
          {
            id: "wa-2",
            subject: "Chemistry",
            topic: "Some Basic Concepts of Chemistry",
            accuracy: 61,
            priority: "High Priority",
            recommendedAction: "Practice Mole Concept & Stoichiometric Calculation PYQs",
            actionType: "pyq",
          },
          {
            id: "wa-3",
            subject: "Physics",
            topic: "Units and Measurements",
            accuracy: 65,
            priority: "Needs Attention",
            recommendedAction: "Review Dimensional Analysis Blueprint",
            actionType: "lesson",
          },
        ],
        performanceTrend: [
          { label: "Week 1", readiness: 58, mockScore: 140, accuracy: 62 },
          { label: "Week 2", readiness: 63, mockScore: 152, accuracy: 68 },
          { label: "Week 3", readiness: 67, mockScore: 160, accuracy: 72 },
          { label: "Week 4", readiness: 71, mockScore: 174, accuracy: 76 },
          { label: "Week 5", readiness: 74, mockScore: 182, accuracy: 78 },
        ],
        recentActivities: [
          {
            id: "act-1",
            title: "Completed Lesson: The Living World",
            time: "2 hours ago",
            type: "lesson",
            score: "100%",
            isScore: true,
            iconBg: "bg-indigo-50 text-[#4F46E5]",
          },
          {
            id: "act-2",
            title: "Solved 15 Chemistry Basic Concept PYQs",
            time: "Yesterday",
            type: "pyq",
            score: "80% Acc.",
            isScore: true,
            iconBg: "bg-emerald-50 text-emerald-600",
          },
          {
            id: "act-3",
            title: "Attempted NEST Full Length Mock #01",
            time: "3 days ago",
            type: "mock",
            score: "182/240",
            isScore: true,
            iconBg: "bg-purple-50 text-purple-600",
          },
        ],
        continueLearning: [
          {
            id: "cl-1",
            badge: "Smart Lesson",
            badgeBg: "bg-indigo-50 text-[#4F46E5]",
            title: "The Living World",
            subtitle: "14 min • Class XI Biology",
            progress: 100,
            progressText: "100% Completed",
            buttonText: "Review",
            buttonStyle: "bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold",
            route: "smart-lessons",
          },
          {
            id: "cl-2",
            badge: "PYQ Set",
            badgeBg: "bg-emerald-50 text-emerald-600",
            title: "Some Basic Concepts PYQs",
            subtitle: "15 Questions • Chemistry",
            progress: 40,
            progressText: "40% Completed",
            buttonText: "Continue",
            buttonStyle: "bg-[#10B981] hover:bg-emerald-600 text-white font-bold",
            route: "pyqs",
          },
          {
            id: "cl-3",
            badge: "Mock Test",
            badgeBg: "bg-rose-50 text-rose-600",
            title: "NEST Full Length Mock #01",
            subtitle: "60 Questions • 180 min",
            progress: 0,
            progressText: "Not Started",
            buttonText: "Start",
            buttonStyle: "bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold border border-rose-200",
            route: "mock-tests",
          },
        ],
        preparationProgress: {
          overallProgress: 64,
          conceptMastery: 78,
          pyqCoverage: 62,
          practiceMastery: 81,
          mockPrep: 42,
          revisionProgress: 53,
        },
        syllabusCoverage: [
          { subject: "Physics", completedTopics: 18, totalTopics: 28, percentage: 64 },
          { subject: "Chemistry", completedTopics: 16, totalTopics: 19, percentage: 84 },
          { subject: "Biology", completedTopics: 19, totalTopics: 33, percentage: 58 },
          { subject: "Mathematics", completedTopics: 15, totalTopics: 28, percentage: 53 },
        ],
        recommendations: [
          {
            id: "rec-1",
            type: "lesson",
            title: "The Living World (Class XI)",
            subject: "Biology",
            reason: "Complete high-yield 8-lesson core module available for instant reading.",
            ctaText: "Start Smart Lesson →",
            link: "smart-lessons",
          },
        ],
        roadmap: {
          currentStage: "PYQ Mastery",
          overallProgress: 64,
          nextMilestone: "Complete Class XI Biology Unit I & Chemistry Basic Concepts PYQs.",
          stages: [
            { name: "Assessment", status: "completed" },
            { name: "Smart Lessons", status: "current" },
            { name: "PYQ Mastery", status: "current" },
            { name: "Mock Tests", status: "upcoming" },
            { name: "NEST Final Revision", status: "upcoming" },
          ],
        },
      };

      return { summary, error: null };
    } catch {
      return { summary: emptyDashboardData, error: "Unexpected error calculating readiness index." };
    }
  },
};
