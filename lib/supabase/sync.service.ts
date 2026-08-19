"use client";
/**
 * sync.service.ts
 * Dual-Channel Bidirectional sync for ALL student application data.
 *
 * Synchronizes:
 *   1. PYQ Question Attempts
 *   2. CBT Full Mock Test Results & Diagnostics
 *   3. Daily / Topic Practice Evaluations & Answers
 *   4. Smart Lessons Progress & Completion
 *   5. Starred / Bookmarked Questions (PYQs & Practice)
 *   6. Diagnostic Assessment Results & Strengths/Weaknesses
 *   7. Roadmap Calendar & Signup Milestones
 *   8. Onboarding Selections (Target College, Year, Exam)
 *   9. User Profile, Display Name & SciPrep PRO Status
 */

import { supabase } from "@/lib/supabase/client";
import { STORAGE_KEYS } from "@/lib/services/progressOrchestrator.service";
import { broadcastProgressUpdate } from "@/lib/services/progressOrchestrator.service";

// ── Helpers ──────────────────────────────────────────────────────────────────

function safeGet<T>(key: string, def: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : def;
  } catch {
    return def;
  }
}

function safeSet(key: string, value: unknown) {
  try {
    localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
  } catch {
    // storage quota exceeded — ignore
  }
}

function getUserEmail(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("nest_user_email") || null;
}

async function getUserId(): Promise<string | null> {
  try {
    const { data } = await supabase.auth.getUser();
    if (data?.user?.id) return data.user.id;
    const { data: sessionData } = await supabase.auth.getSession();
    return sessionData?.session?.user?.id ?? null;
  } catch {
    return null;
  }
}

export function clearLocalProgress(): void {
  if (typeof window === "undefined") return;
  const keys = [
    STORAGE_KEYS.LESSON_PROGRESS,
    STORAGE_KEYS.MOCK_ATTEMPTS,
    STORAGE_KEYS.PYQ_ATTEMPTS,
    STORAGE_KEYS.PYQ_BOOKMARKS,
    STORAGE_KEYS.PRACTICE_EVALS,
    STORAGE_KEYS.PRACTICE_ANSWERS,
    STORAGE_KEYS.PRACTICE_BOOKMARKS,
    STORAGE_KEYS.ASSESSMENT_RESULT,
    "nest_smartprep_signup_date",
    "nest-smartprep-onboarding",
    "nest_target_exam",
    "nest_target_score",
    "nest_user_target",
  ];
  keys.forEach((k) => {
    try {
      localStorage.removeItem(k);
    } catch {}
  });
}

// ── PUSH (local → Supabase & API) ───────────────────────────────────────────

export async function pushLessonProgress(): Promise<void> {
  const uid = await getUserId();
  const email = getUserEmail();
  if (!uid && !email) return;

  const store = safeGet<Record<string, { completed?: boolean; progressPercent?: number; title?: string; updatedAt?: string }>>(
    STORAGE_KEYS.LESSON_PROGRESS, {}
  );

  const rows = Object.entries(store).map(([key, val]) => ({
    user_id: uid,
    email: email,
    lesson_key: key,
    title: val.title ?? key,
    is_completed: val.completed ?? false,
    progress_percentage: val.progressPercent ?? 0,
    last_studied_at: val.updatedAt ?? new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));

  if (rows.length === 0) return;

  try {
    await supabase
      .from("user_progress")
      .upsert(rows, { onConflict: "user_id,lesson_key", ignoreDuplicates: false });
  } catch (e) {
    console.warn("[Sync] user_progress error:", e);
  }

  fetch("/api/sync", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      userId: uid,
      type: "BULK_SYNC",
      payload: { lessonProgress: store },
    }),
  }).catch(() => {});
}

export async function pushPYQAttempt(
  questionKey: string,
  payload: { isCorrect: boolean; selectedOption?: string; subject?: string; topic?: string }
): Promise<void> {
  const uid = await getUserId();
  const email = getUserEmail();
  if (!uid && !email) return;

  try {
    await supabase
      .from("question_attempts")
      .upsert({
        user_id: uid,
        email: email,
        question_key: questionKey,
        is_correct: payload.isCorrect,
        selected_option: payload.selectedOption ?? null,
        subject: payload.subject ?? null,
        topic: payload.topic ?? null,
        source: "pyq",
        mode: "PYQ",
        attempted_at: new Date().toISOString(),
      }, { onConflict: "user_id,question_key", ignoreDuplicates: false });
  } catch (e) {
    console.warn("[Sync] question_attempts error:", e);
  }

  fetch("/api/sync", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      userId: uid,
      type: "PYQ_ATTEMPT",
      payload: { questionKey, ...payload },
    }),
  }).catch(() => {});
}

export async function pushPracticeAttempt(
  questionKey: string,
  payload: { isCorrect: boolean; selectedOption?: string; subject?: string; topic?: string }
): Promise<void> {
  const uid = await getUserId();
  const email = getUserEmail();
  if (!uid && !email) return;

  try {
    await supabase
      .from("question_attempts")
      .upsert({
        user_id: uid,
        email: email,
        question_key: questionKey,
        is_correct: payload.isCorrect,
        selected_option: payload.selectedOption ?? null,
        subject: payload.subject ?? null,
        topic: payload.topic ?? null,
        source: "practice",
        mode: "PRACTICE",
        attempted_at: new Date().toISOString(),
      }, { onConflict: "user_id,question_key", ignoreDuplicates: false });
  } catch (e) {
    console.warn("[Sync] practice question_attempts error:", e);
  }

  fetch("/api/sync", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      userId: uid,
      type: "PRACTICE_ATTEMPT",
      payload: { questionKey, ...payload },
    }),
  }).catch(() => {});
}

export async function pushMockAttempt(attemptId: string): Promise<void> {
  const uid = await getUserId();
  const email = getUserEmail();
  if (!uid && !email) return;

  const store = safeGet<Record<string, {
    id?: string; title?: string; nestMeritScore?: number; rawScore?: number;
    evalMarks?: number; evalScore?: number; totalMarks?: number; accuracy?: number; percentile?: number;
    completedAt?: string; subjectBreakdown?: unknown; questionResults?: unknown;
  }>>(STORAGE_KEYS.MOCK_ATTEMPTS, {});

  const attempt = store[attemptId];
  if (!attempt) return;

  const title = attempt.title ?? attempt.id ?? attemptId;

  try {
    await supabase
      .from("mock_test_attempts")
      .upsert({
        user_id: uid,
        email: email,
        title: title,
        score: attempt.nestMeritScore ?? attempt.evalScore ?? attempt.rawScore ?? 0,
        total_marks: attempt.evalMarks ?? attempt.totalMarks ?? 180,
        accuracy_percentage: attempt.accuracy ?? 0,
        nest_merit_score: attempt.nestMeritScore ?? attempt.evalScore ?? 0,
        percentile: attempt.percentile ?? 0,
        subject_breakdown: attempt.subjectBreakdown ?? null,
        question_results: attempt.questionResults ?? null,
        status: "COMPLETED",
        completed_at: attempt.completedAt ?? new Date().toISOString(),
      }, { onConflict: "user_id,title", ignoreDuplicates: false });
  } catch (e) {
    console.warn("[Sync] mock_test_attempts error:", e);
  }

  fetch("/api/sync", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      userId: uid,
      type: "MOCK_ATTEMPT",
      payload: {
        title,
        score: attempt.nestMeritScore ?? attempt.evalScore ?? attempt.rawScore ?? 0,
        totalMarks: attempt.evalMarks ?? attempt.totalMarks ?? 180,
        accuracy: attempt.accuracy ?? 0,
        nestMeritScore: attempt.nestMeritScore ?? attempt.evalScore ?? 0,
        percentile: attempt.percentile ?? 0,
        subjectBreakdown: attempt.subjectBreakdown ?? null,
        questionResults: attempt.questionResults ?? null,
        completedAt: attempt.completedAt ?? new Date().toISOString(),
      },
    }),
  }).catch(() => {});
}

export async function pushBookmarks(): Promise<void> {
  const uid = await getUserId();
  const email = getUserEmail();
  if (!uid && !email) return;

  const pyqBookmarks = safeGet<string[]>(STORAGE_KEYS.PYQ_BOOKMARKS, []);
  const practiceBookmarks = safeGet<string[]>(STORAGE_KEYS.PRACTICE_BOOKMARKS, []);

  const rows = [
    ...pyqBookmarks.map((qId) => ({
      user_id: uid,
      email: email,
      question_key: qId,
      source: "pyq",
      created_at: new Date().toISOString(),
    })),
    ...practiceBookmarks.map((qId) => ({
      user_id: uid,
      email: email,
      question_key: qId,
      source: "practice",
      created_at: new Date().toISOString(),
    })),
  ];

  if (rows.length === 0) return;

  try {
    await supabase
      .from("bookmarks")
      .upsert(rows, { onConflict: "user_id,question_key", ignoreDuplicates: false });
  } catch (e) {
    console.warn("[Sync] bookmarks error:", e);
  }
}

export async function pushAllLocalData(): Promise<void> {
  const uid = await getUserId();
  const email = getUserEmail();
  if (!uid && !email) return;

  const pyqStore = safeGet<Record<string, any>>(STORAGE_KEYS.PYQ_ATTEMPTS, {});
  const practiceStore = safeGet<Record<string, any>>(STORAGE_KEYS.PRACTICE_EVALS, {});
  const mockStore = safeGet<Record<string, any>>(STORAGE_KEYS.MOCK_ATTEMPTS, {});
  const lessonStore = safeGet<Record<string, any>>(STORAGE_KEYS.LESSON_PROGRESS, {});
  const assessmentResult = safeGet<any>(STORAGE_KEYS.ASSESSMENT_RESULT, null);
  const onboardingData = safeGet<any>("nest-smartprep-onboarding", null);

  const userName = localStorage.getItem("nest_user_name") || localStorage.getItem("currentUser") || null;
  const targetExam = localStorage.getItem("nest_target_exam") || "NEST 2026";
  const targetScore = Number(localStorage.getItem("nest_target_score")) || 150;
  const targetCollege = localStorage.getItem("nest_user_target") || "NISER Bhubaneswar";
  const isPro = localStorage.getItem("nest_user_is_pro") === "true";

  // 1. Bulk Sync via Server API (handles all data types reliably)
  fetch("/api/sync", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      userId: uid,
      type: "BULK_SYNC",
      payload: {
        pyqAttempts: pyqStore,
        practiceEvals: practiceStore,
        mockAttempts: mockStore,
        lessonProgress: lessonStore,
        assessmentResults: assessmentResult,
        onboardingData: onboardingData,
        userName,
        targetExam,
        targetScore,
        targetCollege,
        isPro,
      },
    }),
  }).catch(() => {});

  // 2. Direct Supabase Client Push
  const pyqRows = Object.entries(pyqStore).map(([key, val]) => ({
    user_id: uid,
    email: email,
    question_key: key,
    is_correct: !!val.isCorrect,
    selected_option: val.selectedOption ?? null,
    subject: val.subject ?? null,
    topic: val.topic ?? null,
    source: "pyq",
    mode: "PYQ",
    attempted_at: val.attemptedAt ?? new Date().toISOString(),
  }));
  if (pyqRows.length > 0) {
    try {
      await supabase.from("question_attempts").upsert(pyqRows, { onConflict: "user_id,question_key" });
    } catch {}
  }

  const mockRows = Object.entries(mockStore).map(([id, attempt]) => ({
    user_id: uid,
    email: email,
    title: attempt.title ?? attempt.id ?? id,
    score: attempt.nestMeritScore ?? attempt.evalScore ?? attempt.rawScore ?? 0,
    total_marks: attempt.evalMarks ?? attempt.totalMarks ?? 180,
    accuracy_percentage: attempt.accuracy ?? 0,
    nest_merit_score: attempt.nestMeritScore ?? attempt.evalScore ?? 0,
    percentile: attempt.percentile ?? 0,
    subject_breakdown: attempt.subjectBreakdown ?? null,
    question_results: attempt.questionResults ?? null,
    status: "COMPLETED",
    completed_at: attempt.completedAt ?? new Date().toISOString(),
  }));
  if (mockRows.length > 0) {
    try {
      await supabase.from("mock_test_attempts").upsert(mockRows, { onConflict: "user_id,title" });
    } catch {}
  }

  await pushBookmarks();
}

// ── PULL (Supabase & API → localStorage) ────────────────────────────────────

export async function pullAllAndRestore(clearExisting: boolean = false): Promise<void> {
  const uid = await getUserId();
  const email = getUserEmail();
  if (!uid && !email) return;

  if (clearExisting) {
    clearLocalProgress();
  }

  try {
    // 1. Fetch from comprehensive server API
    const res = await fetch(`/api/sync?email=${encodeURIComponent(email || "")}&userId=${encodeURIComponent(uid || "")}`);
    const json = await res.json();

    if (json.success && json.data) {
      const {
        lessonProgress,
        pyqAttempts,
        practiceEvals,
        practiceAnswers,
        mockAttempts,
        pyqBookmarks,
        practiceBookmarks,
        userSettings,
        profile,
        onboardingData,
        assessmentResults,
      } = json.data;

      // Restore Lessons
      if (Object.keys(lessonProgress || {}).length > 0) {
        const local = safeGet<Record<string, any>>(STORAGE_KEYS.LESSON_PROGRESS, {});
        safeSet(STORAGE_KEYS.LESSON_PROGRESS, { ...local, ...lessonProgress });
      }

      // Restore PYQs
      if (Object.keys(pyqAttempts || {}).length > 0) {
        const local = safeGet<Record<string, any>>(STORAGE_KEYS.PYQ_ATTEMPTS, {});
        safeSet(STORAGE_KEYS.PYQ_ATTEMPTS, { ...local, ...pyqAttempts });
      }

      // Restore Practice
      if (Object.keys(practiceEvals || {}).length > 0) {
        const local = safeGet<Record<string, any>>(STORAGE_KEYS.PRACTICE_EVALS, {});
        safeSet(STORAGE_KEYS.PRACTICE_EVALS, { ...local, ...practiceEvals });
      }
      if (Object.keys(practiceAnswers || {}).length > 0) {
        const local = safeGet<Record<string, any>>(STORAGE_KEYS.PRACTICE_ANSWERS, {});
        safeSet(STORAGE_KEYS.PRACTICE_ANSWERS, { ...local, ...practiceAnswers });
      }

      // Restore Mocks
      if (Object.keys(mockAttempts || {}).length > 0) {
        const local = safeGet<Record<string, any>>(STORAGE_KEYS.MOCK_ATTEMPTS, {});
        safeSet(STORAGE_KEYS.MOCK_ATTEMPTS, { ...local, ...mockAttempts });
      }

      // Restore Bookmarks
      if (Array.isArray(pyqBookmarks) && pyqBookmarks.length > 0) {
        safeSet(STORAGE_KEYS.PYQ_BOOKMARKS, pyqBookmarks);
      }
      if (Array.isArray(practiceBookmarks) && practiceBookmarks.length > 0) {
        safeSet(STORAGE_KEYS.PRACTICE_BOOKMARKS, practiceBookmarks);
      }

      // Restore Assessment
      if (assessmentResults) {
        safeSet(STORAGE_KEYS.ASSESSMENT_RESULT, assessmentResults);
      }

      // Restore Onboarding
      if (onboardingData) {
        safeSet("nest-smartprep-onboarding", onboardingData);
      }

      // Restore User Settings & Profile
      if (userSettings) {
        if (userSettings.name) {
          localStorage.setItem("nest_user_name", userSettings.name);
          localStorage.setItem("currentUser", userSettings.name);
        }
        if (userSettings.target_exam) localStorage.setItem("nest_target_exam", userSettings.target_exam);
        if (userSettings.target_score) localStorage.setItem("nest_target_score", String(userSettings.target_score));
        if (userSettings.target_college) localStorage.setItem("nest_user_target", userSettings.target_college);
        if (userSettings.is_pro) localStorage.setItem("nest_user_is_pro", "true");
      }

      if (profile) {
        if (profile.full_name) {
          localStorage.setItem("nest_user_name", profile.full_name);
          localStorage.setItem("currentUser", profile.full_name);
        }
        if (profile.is_pro) localStorage.setItem("nest_user_is_pro", "true");
      }
    }
  } catch (err) {
    console.warn("[Sync] Server API pull warning:", err);
  }

  broadcastProgressUpdate();
}
