export type DashboardSection =
  | "dashboard"
  | "smart-lessons"
  | "pyqs"
  | "mock-tests"
  | "performance"
  | "weak-areas"
  | "roadmap"
  | "practice"
  | "planner"
  | "topic-tests"
  | "settings"
  | "profile"
  | "subscription";

export interface SubjectScore {
  subject: "Physics" | "Chemistry" | "Biology" | "Mathematics";
  score: number;
  status: "Strong" | "Good" | "Needs Focus";
  accuracy: number;
  questionsAttempted: number;
  trend: number;
  topicsCompleted: number;
  totalTopics: number;
}

export interface WeakArea {
  id: string;
  subject: "Physics" | "Chemistry" | "Biology" | "Mathematics";
  topic: string;
  accuracy: number;
  priority: "High Priority" | "Needs Attention";
  recommendedAction: string;
  actionType: "lesson" | "pyq" | "practice";
}

export interface PerformancePoint {
  label: string;
  readiness: number;
  mockScore: number;
  accuracy: number;
}

export interface Recommendation {
  id: string;
  type: "lesson" | "pyq" | "mock";
  title: string;
  subject: "Physics" | "Chemistry" | "Biology" | "Mathematics" | "General";
  reason: string;
  ctaText: string;
  link: string;
}

export interface MockHistoryItem {
  id?: string;
  name: string;
  mockName?: string;
  score: number;
  accuracy: number;
  date: string;
  percentile: number;
  status: string;
}

export interface MockPerformanceSummary {
  averageScore: number;
  highestScore: number;
  bestScore?: number;
  averageAccuracy?: number;
  attemptRate?: number;
  totalMocks: number;
  completedMocks: number;
  avgPercentile: number;
  physicsAvg: number;
  chemAvg: number;
  bioAvg: number;
  mathAvg: number;
  history?: MockHistoryItem[];
}

export interface PreparationProgress {
  overallProgress: number;
  conceptMastery: number;
  pyqCoverage: number;
  practiceMastery: number;
  mockPrep: number;
  revisionProgress: number;
}

export interface SyllabusCoverage {
  subject: "Physics" | "Chemistry" | "Biology" | "Mathematics";
  completedTopics: number;
  totalTopics: number;
  percentage: number;
}

export interface RecentActivityItem {
  id: string;
  title: string;
  time: string;
  type: "lesson" | "pyq" | "mock" | "practice";
  score?: string;
  isScore?: boolean;
  iconBg: string;
}

export interface ContinueLearningItem {
  id: string;
  badge: string;
  badgeBg: string;
  title: string;
  subtitle: string;
  progress: number;
  progressText: string;
  buttonText: string;
  buttonStyle: string;
  route: DashboardSection;
}

export interface RoadmapSummary {
  currentStage: string;
  overallProgress: number;
  nextMilestone: string;
  stages: {
    name: string;
    status: "completed" | "current" | "upcoming";
  }[];
}

export interface NestDashboardSummary {
  hasCompletedAssessment: boolean;
  readinessScore: number;
  status: "On Track" | "Needs Attention" | "Critical Focus" | "Needs Acceleration";
  scoreTrend: number;
  strongestSubject: string;
  focusSubject: string;
  quickStats: {
    questionsSolved: number;
    pyqsCompleted: number;
    totalPyqs: number;
    mocksCompleted: number;
    averageAccuracy: number;
    studyProgress: number;
  };
  subjects: SubjectScore[];
  weakAreas: WeakArea[];
  performanceTrend: PerformancePoint[];
  recentActivities: RecentActivityItem[];
  continueLearning: ContinueLearningItem[];
  practice: {
    pyqsCompleted: number;
    pyqsTotal: number;
    pyqAccuracy: number;
    practiceSolved: number;
    practiceAccuracy: number;
    mocksCompleted: number;
    mockAvgScore: number;
  };
  mockPerformance: MockPerformanceSummary;
  preparationProgress: PreparationProgress;
  syllabusCoverage: SyllabusCoverage[];
  recommendations: Recommendation[];
  roadmap: RoadmapSummary;
}

// --- Strongly-typed storage record interfaces --------------------------------

/** Lesson progress record stored in localStorage */
export interface LessonRecord {
  progressPercent: number;
  completed: boolean;
  updatedAt?: string;
  title?: string;
  subject?: string;
}

/** Subject breakdown data within a mock attempt */
export interface MockSubjectBreakdown {
  score: number;
  maxMarks: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  percentage: number;
}

/** Completed mock attempt record stored in localStorage */
export interface MockAttempt {
  id?: string;
  mockId?: string;
  title?: string;
  nestMeritScore?: number;
  rawScore?: number;
  evalMarks?: number;
  totalMarks?: number;
  accuracy?: number;
  completedAt?: string;
  percentile?: number;
  totalQuestions?: number;
  totalAttempted?: number;
  totalCorrect?: number;
  totalIncorrect?: number;
  isPYQ?: boolean;
  questionResults?: Record<string, unknown>;
  subjectBreakdown?: Record<string, MockSubjectBreakdown>;
}

/** PYQ attempt record stored in localStorage */
export interface PYQAttempt {
  id?: string;
  selectedOption?: string;
  isCorrect: boolean;
  score: number;
  answeredAt?: string;
  completedAt?: string;
  subject?: string;
  topic?: string;
  mockId?: string;
}

/** Practice evaluation record stored in localStorage */
export interface PracticeEval {
  isCorrect: boolean;
  score: number;
  evaluatedAt?: string;
  completedAt?: string;
  updatedAt?: string;
  subject?: string;
  topic?: string;
}
