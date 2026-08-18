import { DashboardSection } from "./dashboard";

export interface DashboardAIInsight {
  headline: string;
  summary: string;
  strongestSubject: string;
  focusSubject: string;
  recommendedAction: string;
  recommendedRoute: DashboardSection;
  reason: string;
  isFallback?: boolean;
}

export interface MockAIAnalysis {
  headline: string;
  overallAssessment: string;
  strengthHighlight: string;
  weaknessHighlight: string;
  timeManagementInsight: string;
  actionPlan: string[];
  recommendedFocusTopic: string;
  isFallback?: boolean;
}
