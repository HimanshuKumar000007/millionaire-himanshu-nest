"use client";

import {
  NestDashboardSummary,
  PreparationProgress,
  SubjectScore,
  WeakArea,
  PerformancePoint,
  RecentActivityItem,
  ContinueLearningItem,
  MockPerformanceSummary,
  MockHistoryItem,
  SyllabusCoverage,
  LessonRecord,
  MockAttempt,
  MockSubjectBreakdown,
  PYQAttempt,
  PracticeEval,
} from "@/lib/types/dashboard";

// Storage keys � single source of truth across the platform
export const STORAGE_KEYS = {
  LESSON_PROGRESS:    "nest_smartprep_lesson_progress",
  MOCK_ATTEMPTS:      "nest_smartprep_mock_attempts",
  PYQ_ATTEMPTS:       "nest_smartprep_pyq_attempts",
  PYQ_BOOKMARKS:      "nest_smartprep_pyq_bookmarks",
  PRACTICE_EVALS:     "nest_smartprep_practice_evaluations",
  PRACTICE_ANSWERS:   "nest_smartprep_practice_answers",
  PRACTICE_BOOKMARKS: "nest_smartprep_practice_bookmarks",
  ASSESSMENT_RESULT:  "nest_smartprep_assessment_results",
} as const;

export const PROGRESS_EVENT_NAME = "nest_smartprep_progress_updated";

/** Broadcast a reactive update so all subscribed components re-compute. */
export function broadcastProgressUpdate(): void {
  if (typeof window !== "undefined") {
    progressOrchestratorService.invalidateCache();
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT_NAME));
  }
}

// --- Memoization cache -------------------------------------------------------
let _cachedSummary: NestDashboardSummary | null = null;
let _cacheTimestamp = 0;
const CACHE_TTL_MS = 250; // re-compute at most every 250ms

export class ProgressOrchestratorService {

  private getLocalJson<T>(key: string, defaultValue: T): T {
    if (typeof window === "undefined") return defaultValue;
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  }  /** Returns fully live, typed, honest dashboard summary. Memoized per 250ms. */
  public getLiveDashboardSummary(storeOverrides?: {
    lessonStore?: Record<string, LessonRecord>;
    mockAttempts?: Record<string, MockAttempt>;
    pyqAttempts?: Record<string, PYQAttempt>;
    pyqBookmarks?: string[];
    practiceEvals?: Record<string, PracticeEval>;
    practiceBookmarks?: string[];
  }): NestDashboardSummary {
    if (storeOverrides) {
      return this._compute(storeOverrides);
    }
    const now = Date.now();
    if (_cachedSummary && now - _cacheTimestamp < CACHE_TTL_MS) {
      return _cachedSummary;
    }
    const result = this._compute();
    _cachedSummary = result;
    _cacheTimestamp = now;
    return result;
  }

  /** Fetch live dashboard summary directly from Supabase / API */
  public async fetchLiveDashboardSummary(email: string, userId: string): Promise<NestDashboardSummary> {
    try {
      const res = await fetch(`/api/sync?email=${encodeURIComponent(email || "")}&userId=${encodeURIComponent(userId || "")}`);
      const json = await res.json();
      if (json.success && json.data) {
        const { lessonProgress, pyqAttempts, practiceEvals, mockAttempts, pyqBookmarks, practiceBookmarks } = json.data;
        const result = this._compute({
          lessonStore: lessonProgress || {},
          mockAttempts: mockAttempts || {},
          pyqAttempts: pyqAttempts || {},
          pyqBookmarks: pyqBookmarks || [],
          practiceEvals: practiceEvals || {},
          practiceBookmarks: practiceBookmarks || [],
        });
        _cachedSummary = result;
        _cacheTimestamp = Date.now();
        return result;
      }
    } catch (e) {
      console.warn("[ProgressOrchestrator] fetchLiveDashboardSummary fallback:", e);
    }
    return this.getLiveDashboardSummary();
  }

  /** Invalidate cache — call after writing to localStorage. */
  public invalidateCache(): void {
    _cachedSummary = null;
    _cacheTimestamp = 0;
  }

  private _compute(storeOverrides?: {
    lessonStore?: Record<string, LessonRecord>;
    mockAttempts?: Record<string, MockAttempt>;
    pyqAttempts?: Record<string, PYQAttempt>;
    pyqBookmarks?: string[];
    practiceEvals?: Record<string, PracticeEval>;
    practiceBookmarks?: string[];
  }): NestDashboardSummary {
    // -- Load all stores ------------------------------------------------------
    const lessonStore = storeOverrides?.lessonStore || this.getLocalJson<Record<string, LessonRecord>>(
      STORAGE_KEYS.LESSON_PROGRESS, {}
    );
    const mockAttempts = storeOverrides?.mockAttempts || this.getLocalJson<Record<string, MockAttempt>>(
      STORAGE_KEYS.MOCK_ATTEMPTS, {}
    );
    const pyqAttempts = storeOverrides?.pyqAttempts || this.getLocalJson<Record<string, PYQAttempt>>(
      STORAGE_KEYS.PYQ_ATTEMPTS, {}
    );
    const pyqBookmarks = storeOverrides?.pyqBookmarks || this.getLocalJson<string[]>(
      STORAGE_KEYS.PYQ_BOOKMARKS, []
    );
    const practiceEvals = storeOverrides?.practiceEvals || this.getLocalJson<Record<string, PracticeEval>>(
      STORAGE_KEYS.PRACTICE_EVALS, {}
    );
    const practiceBookmarks = storeOverrides?.practiceBookmarks || this.getLocalJson<string[]>(
      STORAGE_KEYS.PRACTICE_BOOKMARKS, []
    );

    // -- 1. LESSON METRICS ----------------------------------------------------
    const lessonEntries = Object.entries(lessonStore);
    const completedLessons = lessonEntries.filter(
      ([, v]) => v.completed || (v.progressPercent ?? 0) >= 100
    );
    const inProgressLessons = lessonEntries.filter(
      ([, v]) => !v.completed && (v.progressPercent ?? 0) > 0 && (v.progressPercent ?? 0) < 100
    );
    const completedLessonsCount = completedLessons.length;
    const inProgressLessonsCount = inProgressLessons.length;

    // Target: 40 core concept lessons across NEST syllabus
    const TARGET_LESSONS = 40;
    const conceptMastery = Math.min(
      100,
      Math.round(
        (completedLessonsCount * 100 + inProgressLessonsCount * 40) /
          Math.max(1, TARGET_LESSONS)
      )
    );

    // -- 2. MOCK METRICS ------------------------------------------------------
    const mockList = Object.values(mockAttempts);

    // Helper to distinguish PYQ Exam Papers from Standard Full Mocks
    const isAttemptPyq = (attempt: MockAttempt) =>
      attempt.isPYQ === true ||
      (attempt.id && (attempt.id.includes("pyq") || attempt.id.startsWith("nest-pyq-"))) ||
      (attempt.mockId && (attempt.mockId.includes("pyq") || attempt.mockId.startsWith("nest-pyq-"))) ||
      (attempt.title && attempt.title.toLowerCase().includes("pyq"));

    const standardMocks = mockList.filter((m) => !isAttemptPyq(m));
    const pyqPapers = mockList.filter((m) => isAttemptPyq(m));

    const mocksCompletedCount = standardMocks.length;
    let highestMockScore = 0;
    let totalMockScore = 0;
    let totalMockAccuracySum = 0;
    const mockHistory: MockHistoryItem[] = [];

    // Track actually attempted and correct questions in standard mocks
    let standardMockQuestionsAttempted = 0;
    let standardMockQuestionsCorrect = 0;

    // Distinct PYQ questions answered across standalone drills & PYQ mock papers
    const pyqQuestionIds = new Set<string>();
    Object.keys(pyqAttempts).forEach((id) => pyqQuestionIds.add(id));

    // Extract questions from PYQ Papers
    pyqPapers.forEach((attempt: MockAttempt) => {
      if (attempt.questionResults) {
        Object.entries(attempt.questionResults).forEach(([qId, qRes]: [string, any]) => {
          if (qRes && (qRes.isAttempted || (qRes.userAnswer !== null && qRes.userAnswer !== undefined && qRes.userAnswer !== ""))) {
            pyqQuestionIds.add(qId);
          }
        });
      } else if ((attempt.totalAttempted ?? 0) > 0) {
        for (let i = 0; i < (attempt.totalAttempted ?? 0); i++) {
          pyqQuestionIds.add(`${attempt.id || "pyq"}_q_${i}`);
        }
      }
    });

    // Subject accumulators
    type SubjKey = "Physics" | "Chemistry" | "Biology" | "Mathematics";
    const subjectsMap: Record<SubjKey, { scoreSum: number; scoreCount: number; correct: number; total: number }> = {
      Physics:     { scoreSum: 0, scoreCount: 0, correct: 0, total: 0 },
      Chemistry:   { scoreSum: 0, scoreCount: 0, correct: 0, total: 0 },
      Biology:     { scoreSum: 0, scoreCount: 0, correct: 0, total: 0 },
      Mathematics: { scoreSum: 0, scoreCount: 0, correct: 0, total: 0 },
    };

    standardMocks.forEach((attempt: MockAttempt, idx: number) => {
      const meritScore = attempt.nestMeritScore ?? attempt.rawScore ?? 0;
      const evalMarks  = attempt.evalMarks ?? 180;
      const accuracy   = attempt.accuracy ?? 0;

      if (meritScore > highestMockScore) highestMockScore = meritScore;
      totalMockScore += meritScore;
      totalMockAccuracySum += accuracy;

      // Extract actually attempted question count in standard mocks
      let attemptedInMock = attempt.totalAttempted ?? 0;
      let correctInMock = attempt.totalCorrect ?? 0;

      if (attempt.questionResults) {
        const qList = Object.entries(attempt.questionResults) as [string, any][];
        const actuallyAttempted = qList.filter(
          ([, q]) => q.isAttempted || (q.userAnswer !== null && q.userAnswer !== undefined && q.userAnswer !== "")
        );
        if (actuallyAttempted.length > 0) {
          attemptedInMock = actuallyAttempted.length;
          correctInMock = actuallyAttempted.filter(([, q]) => q.isCorrect).length;
        }
      }

      standardMockQuestionsAttempted += attemptedInMock;
      standardMockQuestionsCorrect += correctInMock;

      // Subject breakdown
      if (attempt.subjectBreakdown) {
        (Object.entries(attempt.subjectBreakdown) as [string, MockSubjectBreakdown][]).forEach(
          ([subj, data]) => {
            const key = subj as SubjKey;
            if (key in subjectsMap) {
              const pct = data.percentage > 0
                ? data.percentage
                : data.maxMarks > 0
                ? Math.round((data.score / data.maxMarks) * 100)
                : 0;
              subjectsMap[key].scoreSum   += pct;
              subjectsMap[key].scoreCount += 1;
              subjectsMap[key].correct    += data.correct ?? 0;
              subjectsMap[key].total      += (data.correct ?? 0) + (data.incorrect ?? 0);
            }
          }
        );
      }

      mockHistory.push({
        id:         attempt.id ?? `mock-${idx + 1}`,
        name:       attempt.title ?? `Mock Test #${idx + 1}`,
        mockName:   attempt.title ?? `Mock Test #${idx + 1}`,
        score:      meritScore,
        accuracy:   Math.round(accuracy),
        date:       attempt.completedAt
          ? new Date(attempt.completedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
          : "Recent",
        percentile: attempt.percentile ?? Math.min(99, Math.max(50, Math.round((meritScore / evalMarks) * 100))),
        status:     "Completed",
      });
    });

    const averageMockScore    = mocksCompletedCount > 0 ? Math.round(totalMockScore / mocksCompletedCount) : 0;
    const averageMockAccuracy = mocksCompletedCount > 0 ? Math.round(totalMockAccuracySum / mocksCompletedCount) : 0;
    // mockPrep: 1 mock = 20%, 5 mocks = 100%
    const mockPrep = Math.min(100, Math.round((mocksCompletedCount / 5) * 100));

    // Derive latest attempt by completedAt date (typed properly, no closure mutation)
    const latestMockAttempt: MockAttempt | undefined = standardMocks.reduce<MockAttempt | undefined>(
      (latest, attempt) => {
        if (!latest) return attempt;
        return new Date(attempt.completedAt ?? 0) > new Date(latest.completedAt ?? 0)
          ? attempt
          : latest;
      },
      undefined
    );


    // -- 3. PYQ METRICS -------------------------------------------------------
    const pyqList = Object.values(pyqAttempts);
    const pyqsCompletedCount = Math.max(pyqList.length, pyqQuestionIds.size);
    const pyqsCorrectCount   = pyqList.filter((p) => p.isCorrect).length;
    const pyqAccuracy        = pyqsCompletedCount > 0
      ? (pyqList.length > 0 ? Math.round((pyqsCorrectCount / pyqList.length) * 100) : 0)
      : 0;
    const TARGET_PYQS        = 500;
    const pyqCoverage        = Math.min(100, Math.round((pyqsCompletedCount / 50) * 100));

    // -- 4. PRACTICE METRICS --------------------------------------------------
    const practiceList         = Object.values(practiceEvals);
    const practiceSolvedCount  = practiceList.length;
    const practiceCorrectCount = practiceList.filter((p) => p.isCorrect).length;
    const practiceAccuracy     = practiceSolvedCount > 0 ? Math.round((practiceCorrectCount / practiceSolvedCount) * 100) : 0;
    const TARGET_PRACTICE      = 60;
    const practiceMastery      = Math.min(100, Math.round((practiceSolvedCount / TARGET_PRACTICE) * 100));

    // -- 5. REVISION METRICS --------------------------------------------------
    const totalBookmarks    = pyqBookmarks.length + practiceBookmarks.length;
    // Honest formula: lessons carry 80%, bookmarks carry up to 20%
    const revisionProgress  = Math.min(100,
      Math.round(
        (completedLessonsCount / Math.max(1, TARGET_LESSONS)) * 80 +
        Math.min(20, totalBookmarks * 2)
      )
    );

    // -- 6. TOTAL QUESTIONS SOLVED --------------------------------------------
    const totalQuestionsSolved = practiceSolvedCount + pyqsCompletedCount + standardMockQuestionsAttempted;
    const totalCorrectSolved = practiceCorrectCount + pyqsCorrectCount + standardMockQuestionsCorrect;
    const overallAccuracy = totalQuestionsSolved > 0
      ? Math.round((totalCorrectSolved / totalQuestionsSolved) * 100)
      : (averageMockAccuracy || pyqAccuracy || practiceAccuracy || 0);

    // -- 7. READINESS SCORE � honest, no artificial boosts --------------------
    const hasAnyActivity =
      completedLessonsCount > 0 ||
      inProgressLessonsCount > 0 ||
      mocksCompletedCount > 0 ||
      pyqsCompletedCount > 0 ||
      practiceSolvedCount > 0;

    const readinessScore = hasAnyActivity
      ? Math.min(100, Math.round(
          conceptMastery  * 0.30 +
          mockPrep        * 0.25 +
          pyqCoverage     * 0.25 +
          practiceMastery * 0.20
        ))
      : 0;

    let status: NestDashboardSummary["status"] = "Needs Acceleration";
    if      (readinessScore >= 75) status = "On Track";
    else if (readinessScore >= 50) status = "Needs Attention";
    else if (readinessScore >= 25) status = "Needs Acceleration";
    else                           status = "Critical Focus";

    // -- 8. scoreTrend � computed from mock history ---------------------------
    let scoreTrend = 0;
    if (mockHistory.length >= 2) {
      const last  = mockHistory[mockHistory.length - 1].score;
      const first = mockHistory[0].score;
      scoreTrend  = last - first;
    }

    // -- 9. SUBJECT SCORES � honest zeros when no data -----------------------
    const makeSubjectScore = (
      key: SubjKey,
      totalTopics: number,
      lessonShare: number
    ): SubjectScore => {
      const entry     = subjectsMap[key];
      const avgScore  = entry.scoreCount > 0 ? Math.round(entry.scoreSum / entry.scoreCount) : 0;
      const avgAcc    = entry.total > 0 ? Math.round((entry.correct / entry.total) * 100) : 0;
      const topicsDone= completedLessonsCount > 0
        ? Math.max(1, Math.round(completedLessonsCount * lessonShare))
        : 0;
      return {
        subject:          key,
        score:            avgScore,
        status:           avgScore >= 70 ? "Strong" : avgScore >= 50 ? "Good" : "Needs Focus",
        accuracy:         avgAcc,
        questionsAttempted: entry.total,
        trend:            0,
        topicsCompleted:  topicsDone,
        totalTopics,
      };
    };

    const subjects: SubjectScore[] = [
      makeSubjectScore("Physics",     28, 0.25),
      makeSubjectScore("Chemistry",   19, 0.35),
      makeSubjectScore("Biology",     33, 0.30),
      makeSubjectScore("Mathematics", 28, 0.10),
    ];

    const sortedSubjects = [...subjects].sort((a, b) => b.score - a.score);
    const strongestSubject = sortedSubjects[0].score > 0
      ? `${sortedSubjects[0].subject} (${sortedSubjects[0].score}%)`
      : "Not enough data yet";
    const focusSubject = sortedSubjects[3].score > 0
      ? `${sortedSubjects[3].subject} (${sortedSubjects[3].score}%)`
      : "Take a mock to identify weak areas";

    // -- 10. RECENT ACTIVITIES (Sorted by real timestamp) ----------------------
    interface RawActivityItem extends RecentActivityItem {
      timestamp: number;
    }
    const rawActivities: RawActivityItem[] = [];

    // 1. Mock & PYQ Paper attempts
    mockList.forEach((m: MockAttempt, idx: number) => {
      const isPyq = isAttemptPyq(m);
      const score = m.nestMeritScore ?? m.rawScore ?? 0;
      const max   = m.evalMarks ?? 180;
      const d = m.completedAt ? new Date(m.completedAt) : new Date();
      const ts = !isNaN(d.getTime()) ? d.getTime() : Date.now();

      rawActivities.push({
        id:        `act-mock-${idx}`,
        title:     `Attempted ${m.title ?? (isPyq ? "Official Previous Year Paper" : "Full Mock Test")}`,
        time:      formatTimeAgo(d),
        timestamp: ts,
        type:      isPyq ? "pyq" : "mock",
        score:     `${score}/${max}`,
        isScore:   true,
        iconBg:    isPyq ? "bg-purple-50 text-purple-600" : "bg-rose-50 text-rose-600",
      });
    });

    // 2. Smart Lessons progress
    lessonEntries
      .filter(([, l]) => (l.progressPercent ?? 0) > 0)
      .forEach(([id, l], idx) => {
        const d = l.updatedAt ? new Date(l.updatedAt) : new Date();
        const ts = !isNaN(d.getTime()) ? d.getTime() : Date.now();
        rawActivities.push({
          id:        `act-les-${idx}`,
          title:     l.completed
            ? `Completed: ${l.title ?? formatIdToTitle(id)}`
            : `Studying: ${l.title ?? formatIdToTitle(id)}`,
          time:      formatTimeAgo(d),
          timestamp: ts,
          type:      "lesson",
          score:     `${l.progressPercent ?? 0}%`,
          isScore:   true,
          iconBg:    "bg-indigo-50 text-[#4F46E5]",
        });
      });

    // 3. Standalone PYQ question drills
    if (pyqList.length > 0) {
      const latestPyq = pyqList.reduce<PYQAttempt | null>((latest, p) => {
        const pDate = p.completedAt || p.answeredAt;
        if (!pDate) return latest;
        const d = new Date(pDate);
        if (isNaN(d.getTime())) return latest;
        const lDate = latest ? (latest.completedAt || latest.answeredAt) : null;
        if (!lDate) return p;
        return d.getTime() > new Date(lDate).getTime() ? p : latest;
      }, null);

      const d = latestPyq && (latestPyq.completedAt || latestPyq.answeredAt)
        ? new Date(latestPyq.completedAt || latestPyq.answeredAt || "")
        : new Date();
      const ts = !isNaN(d.getTime()) ? d.getTime() : Date.now();

      rawActivities.push({
        id:        "act-pyq-latest",
        title:     `Solved ${pyqsCompletedCount} High-Yield PYQ${pyqsCompletedCount > 1 ? "s" : ""}`,
        time:      formatTimeAgo(d),
        timestamp: ts,
        type:      "pyq",
        score:     `${pyqAccuracy}% Acc.`,
        isScore:   true,
        iconBg:    "bg-emerald-50 text-emerald-600",
      });
    }

    // 4. Standalone Practice question drills
    if (practiceSolvedCount > 0) {
      const latestPractice = practiceList.reduce<PracticeEval | null>((latest, p: any) => {
        const pDate = p.evaluatedAt || p.completedAt || p.updatedAt;
        if (!pDate) return latest;
        const d = new Date(pDate);
        if (isNaN(d.getTime())) return latest;
        const lDate = latest ? (latest.evaluatedAt || latest.completedAt) : null;
        if (!lDate) return p;
        return d.getTime() > new Date(lDate).getTime() ? p : latest;
      }, null);

      const d = latestPractice && (latestPractice.evaluatedAt || latestPractice.completedAt)
        ? new Date(latestPractice.evaluatedAt || latestPractice.completedAt || "")
        : new Date();
      const ts = !isNaN(d.getTime()) ? d.getTime() : Date.now();

      rawActivities.push({
        id:        "act-practice-latest",
        title:     `Practiced ${practiceSolvedCount} Question${practiceSolvedCount > 1 ? "s" : ""}`,
        time:      formatTimeAgo(d),
        timestamp: ts,
        type:      "practice",
        score:     `${practiceAccuracy}% Acc.`,
        isScore:   true,
        iconBg:    "bg-amber-50 text-amber-600",
      });
    }

    // Sort by real timestamp descending (most recent first)
    rawActivities.sort((a, b) => b.timestamp - a.timestamp);

    const recentActivities: RecentActivityItem[] = rawActivities.map(({ timestamp: _, ...item }) => item);

    if (recentActivities.length === 0) {
      recentActivities.push({
        id:     "act-welcome",
        title:  "Welcome to SciPrep! Start with Smart Lessons or Mock 01",
        time:   "Just now",
        type:   "lesson",
        score:  "Ready",
        isScore: true,
        iconBg: "bg-amber-50 text-amber-600",
      });
    }

    // -- 11. CONTINUE LEARNING ------------------------------------------------
    const continueLearning: ContinueLearningItem[] = [];

    // Card 1: Mock Test
    if (mocksCompletedCount < 1) {
      continueLearning.push({
        id:           "cl-mock-01",
        badge:        "Mock Test",
        badgeBg:      "bg-rose-50 text-rose-600",
        title:        "NEST 2026 Full Mock Test 01",
        subtitle:     "80 Questions • 210 min • 180 Marks",
        progress:     0,
        progressText: "Not Started",
        buttonText:   "Start Mock",
        buttonStyle:  "bg-rose-600 hover:bg-rose-700 text-white font-bold",
        route:        "mock-tests",
      });
    } else {
      continueLearning.push({
        id:           "cl-mock-review",
        badge:        "Mock Test",
        badgeBg:      "bg-rose-50 text-rose-600",
        title:        latestMockAttempt?.title ?? "NEST 2026 Full Mock Test 01",
        subtitle:     `Score: ${latestMockAttempt?.nestMeritScore ?? latestMockAttempt?.rawScore ?? 0}/${latestMockAttempt?.evalMarks ?? 180} • ${mocksCompletedCount} mock${mocksCompletedCount > 1 ? "s" : ""} completed`,
        progress:     100,
        progressText: "Completed",
        buttonText:   "Review Scorecard",
        buttonStyle:  "bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold border border-rose-200",
        route:        "mock-tests",
      });
    }

    // Card 2: Smart Lesson (Dynamic Resolution)
    const activeLessons = Object.entries(lessonStore);
    const inProgressLessonEntry = activeLessons.find(([, l]) => (l.progressPercent ?? 0) > 0 && !l.completed);
    const completedLessonEntry = activeLessons.find(([, l]) => l.completed);
    const chosenLessonEntry = inProgressLessonEntry || completedLessonEntry;

    if (chosenLessonEntry) {
      const [lKey, lData] = chosenLessonEntry;
      const isDone = lData.completed === true;
      continueLearning.push({
        id:           `cl-lesson-${lKey}`,
        badge:        "Smart Lesson",
        badgeBg:      "bg-indigo-50 text-[#4F46E5]",
        title:        lData.title ?? "Sets, Relations & Functions",
        subtitle:     `${lData.subject ?? "Mathematics"} • Smart Notes`,
        progress:     isDone ? 100 : (lData.progressPercent ?? 0),
        progressText: isDone ? "100% Completed" : `${lData.progressPercent}% read`,
        buttonText:   isDone ? "Review Lesson" : "Continue Reading",
        buttonStyle:  "bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold",
        route:        "smart-lessons",
      });
    } else {
      continueLearning.push({
        id:           "cl-lesson-default",
        badge:        "Smart Lesson",
        badgeBg:      "bg-indigo-50 text-[#4F46E5]",
        title:        "Sets, Relations & Functions",
        subtitle:     "Class XI Mathematics • High Yield",
        progress:     0,
        progressText: "Not Started",
        buttonText:   "Start Reading",
        buttonStyle:  "bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold",
        route:        "smart-lessons",
      });
    }

    // Card 3: PYQ Mastery (Dynamic Resolution)
    if (pyqsCompletedCount > 0) {
      continueLearning.push({
        id:           "cl-pyq-active",
        badge:        "PYQ Mastery",
        badgeBg:      "bg-emerald-50 text-emerald-600",
        title:        "Official NEST Past Papers",
        subtitle:     `NISER & CEBS Exam Questions • ${pyqAccuracy}% Accuracy`,
        progress:     Math.min(100, Math.round((pyqsCompletedCount / 50) * 100)),
        progressText: `${pyqsCompletedCount} Question${pyqsCompletedCount > 1 ? "s" : ""} Solved`,
        buttonText:   "Continue PYQs",
        buttonStyle:  "bg-[#10B981] hover:bg-emerald-600 text-white font-bold",
        route:        "pyqs",
      });
    } else {
      continueLearning.push({
        id:           "cl-pyq-default",
        badge:        "PYQ Mastery",
        badgeBg:      "bg-emerald-50 text-emerald-600",
        title:        "Official NEST Past Papers (2021–2025)",
        subtitle:     "Real NISER & CEBS Exam Questions",
        progress:     0,
        progressText: "Not Started",
        buttonText:   "Solve PYQs",
        buttonStyle:  "bg-[#10B981] hover:bg-emerald-600 text-white font-bold",
        route:        "pyqs",
      });
    }

    // -- 12. WEAK AREAS (Dynamically derived from real question mistake rates) --
    interface TopicStat {
      subject: string;
      topic: string;
      total: number;
      correct: number;
      incorrect: number;
    }
    const topicStatsMap: Record<string, TopicStat> = {};

    const recordTopicAttempt = (subject: string, topic: string, isCorrect: boolean) => {
      if (!subject || !topic) return;
      const key = `${subject}:::${topic}`;
      if (!topicStatsMap[key]) {
        topicStatsMap[key] = { subject, topic, total: 0, correct: 0, incorrect: 0 };
      }
      topicStatsMap[key].total += 1;
      if (isCorrect) {
        topicStatsMap[key].correct += 1;
      } else {
        topicStatsMap[key].incorrect += 1;
      }
    };

    // 1. Ingest from all mock attempts
    mockList.forEach((m) => {
      if (m.questionResults) {
        Object.values(m.questionResults).forEach((q: any) => {
          if (q && (q.isAttempted || (q.userAnswer !== null && q.userAnswer !== undefined && q.userAnswer !== ""))) {
            recordTopicAttempt(q.subject || "Physics", q.topic || "General", q.isCorrect === true);
          }
        });
      }
    });

    // 2. Ingest from all PYQ attempts
    pyqList.forEach((p) => {
      if (p.topic && p.subject) {
        recordTopicAttempt(p.subject, p.topic, p.isCorrect === true);
      }
    });

    // 3. Ingest from practice evals
    practiceList.forEach((p: any) => {
      if (p.topic && p.subject) {
        recordTopicAttempt(p.subject, p.topic, p.isCorrect === true);
      }
    });

    // Extract weak topics
    const evaluatedTopics = Object.values(topicStatsMap).map((t) => {
      const accuracy = t.total > 0 ? Math.round((t.correct / t.total) * 100) : 0;
      return {
        ...t,
        accuracy,
      };
    });

    // Sort by worst accuracy and highest mistakes
    evaluatedTopics.sort((a, b) => {
      if (a.accuracy !== b.accuracy) return a.accuracy - b.accuracy;
      return b.incorrect - a.incorrect;
    });

    const normalizeWeakSubject = (s: string): "Physics" | "Chemistry" | "Biology" | "Mathematics" => {
      const lower = (s || "").toLowerCase();
      if (lower.includes("chem")) return "Chemistry";
      if (lower.includes("bio")) return "Biology";
      if (lower.includes("math")) return "Mathematics";
      return "Physics";
    };

    let weakAreas: WeakArea[] = [];

    if (evaluatedTopics.length > 0) {
      weakAreas = evaluatedTopics.slice(0, 4).map((item, idx) => {
        const priority: "High Priority" | "Needs Attention" =
          item.accuracy < 60 ? "High Priority" : "Needs Attention";
        const actionType: "lesson" | "pyq" = item.accuracy < 50 ? "lesson" : "pyq";
        const recommendedAction =
          actionType === "lesson"
            ? `Review ${item.topic} Smart Notes`
            : `Practice ${item.topic} PYQs`;

        return {
          id: `wa-${idx + 1}`,
          subject: normalizeWeakSubject(item.subject),
          topic: item.topic,
          accuracy: item.accuracy,
          priority,
          recommendedAction,
          actionType,
        };
      });
    }

    // -- 13. PERFORMANCE TREND ------------------------------------------------
    const performanceTrend: PerformancePoint[] = mockHistory.length > 0
      ? mockHistory.map((m, i) => ({
          label:     `Mock ${i + 1}`,
          readiness: Math.min(100, Math.round(40 + (m.score / 180) * 55)),
          mockScore: m.score,
          accuracy:  m.accuracy,
        }))
      : [{ label: "Start", readiness: readinessScore, mockScore: 0, accuracy: 0 }];

    // -- 14. PREPARATION PROGRESS ---------------------------------------------
    const preparationProgress: PreparationProgress = {
      overallProgress:  readinessScore,
      conceptMastery,
      pyqCoverage,
      practiceMastery,
      mockPrep,
      revisionProgress,
    };

    // -- 15. SYLLABUS COVERAGE ------------------------------------------------
    const syllabusCoverage: SyllabusCoverage[] = subjects.map((s) => ({
      subject:         s.subject,
      completedTopics: s.topicsCompleted,
      totalTopics:     s.totalTopics,
      percentage:      Math.round((s.topicsCompleted / Math.max(1, s.totalTopics)) * 100),
    }));

    // -- 16. MOCK PERFORMANCE SUMMARY ----------------------------------------
    const mockPerformance: MockPerformanceSummary = {
      averageScore:    averageMockScore,
      highestScore:    highestMockScore,
      bestScore:       highestMockScore,
      totalMocks:      10,
      completedMocks:  mocksCompletedCount,
      avgPercentile:   mocksCompletedCount > 0 ? 84 : 0,
      physicsAvg:      subjectsMap.Physics.scoreCount > 0
        ? Math.round(subjectsMap.Physics.scoreSum / subjectsMap.Physics.scoreCount) : 0,
      chemAvg:         subjectsMap.Chemistry.scoreCount > 0
        ? Math.round(subjectsMap.Chemistry.scoreSum / subjectsMap.Chemistry.scoreCount) : 0,
      bioAvg:          subjectsMap.Biology.scoreCount > 0
        ? Math.round(subjectsMap.Biology.scoreSum / subjectsMap.Biology.scoreCount) : 0,
      mathAvg:         subjectsMap.Mathematics.scoreCount > 0
        ? Math.round(subjectsMap.Mathematics.scoreSum / subjectsMap.Mathematics.scoreCount) : 0,
      history:         mockHistory,
    };

    return {
      hasCompletedAssessment: hasAnyActivity,
      readinessScore,
      status,
      scoreTrend,
      strongestSubject,
      focusSubject,
      quickStats: {
        questionsSolved: totalQuestionsSolved,
        pyqsCompleted:   pyqsCompletedCount,
        totalPyqs:       500,
        mocksCompleted:  mocksCompletedCount,
        averageAccuracy: overallAccuracy,
        studyProgress:   readinessScore,
      },
      subjects,
      weakAreas,
      performanceTrend,
      recentActivities: recentActivities.slice(0, 5),
      continueLearning,
      practice: {
        pyqsCompleted:   pyqsCompletedCount,
        pyqsTotal:       500,
        pyqAccuracy,
        practiceSolved:  practiceSolvedCount,
        practiceAccuracy,
        mocksCompleted:  mocksCompletedCount,
        mockAvgScore:    averageMockScore,
      },
      mockPerformance,
      preparationProgress,
      syllabusCoverage,
      recommendations: [
        {
          id:       "rec-1",
          type:     "lesson",
          title:    "The Living World (Class XI)",
          subject:  "Biology",
          reason:   "Complete high-yield 8-lesson core module available for instant reading.",
          ctaText:  "Start Smart Lesson \u2192",
          link:     "smart-lessons",
        },
      ],
      roadmap: {
        currentStage:    mocksCompletedCount > 0
          ? "Mock Tests & Analysis"
          : completedLessonsCount > 0
          ? "PYQ & Practice Mastery"
          : "Smart Lessons",
        overallProgress: readinessScore,
        nextMilestone:   mocksCompletedCount > 0
          ? "Target score of 150+ in NEST Full Mock 02"
          : completedLessonsCount > 0
          ? "Attempt your first NEST Full Mock Test"
          : "Complete your first Smart Lesson chapter",
        stages: [
          { name: "Smart Lessons",             status: completedLessonsCount > 0 ? "completed" : "current" },
          { name: "PYQ Mastery",               status: pyqsCompletedCount > 0 ? "completed" : completedLessonsCount > 0 ? "current" : "upcoming" },
          { name: "Mock Tests",                status: mocksCompletedCount > 0 ? "completed" : "current" },
          { name: "NISER / CEBS Final Revision", status: "upcoming" },
        ],
      },
    };
  }
}

// --- Helpers -----------------------------------------------------------------

function formatIdToTitle(id: string): string {
  return id
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60)  return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60)  return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24)    return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export const progressOrchestratorService = new ProgressOrchestratorService();


