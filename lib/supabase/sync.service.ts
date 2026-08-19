"use client";
/**
 * sync.service.ts
 * Dual-Channel Bidirectional sync between localStorage, Next.js /api/sync, and Supabase.
 *
 * Strategy:
 *   - WRITE: every local write fires a background Supabase client upsert AND /api/sync POST.
 *   - RESTORE: on login/mount, pull all Supabase rows via /api/sync + Supabase client and merge into localStorage.
 *   - IDENTIFIER: synchronizes by authenticated User ID and Account Email so all devices (PC, Phone, Tablet) match 100%.
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
    localStorage.setItem(key, JSON.stringify(value));
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

  // 1. Direct Supabase
  try {
    await supabase
      .from("user_progress")
      .upsert(rows, { onConflict: "user_id,lesson_key", ignoreDuplicates: false });
  } catch (e) {
    console.warn("[Sync] user_progress error:", e);
  }

  // 2. Server API
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

  // 1. Direct Supabase
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

  // 2. Server API
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

  // 1. Direct Supabase
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

  // 2. Server API
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

  // 1. Direct Supabase
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

  // 2. Server API
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

export async function pushSettings(): Promise<void> {
  const uid = await getUserId();
  const email = getUserEmail();
  if (!uid && !email) return;

  const targetExam = "NEST 2026";
  const targetScore = 150;
  const isPro = localStorage.getItem("nest_user_is_pro") === "true";

  try {
    await supabase
      .from("user_settings")
      .upsert({
        user_id: uid,
        email: email,
        target_exam: targetExam,
        target_score: targetScore,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id", ignoreDuplicates: false });

    if (isPro && uid) {
      await supabase
        .from("profiles")
        .update({ is_pro: true })
        .eq("id", uid);
    }
  } catch (e) {
    console.warn("[Sync] settings error:", e);
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

  // Call Server API for Bulk Sync
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
      },
    }),
  }).catch(() => {});

  // Also push via direct Supabase Client
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
  await pushSettings();
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
    // 1. Fetch from high-reliability server API
    const res = await fetch(`/api/sync?email=${encodeURIComponent(email || "")}&userId=${encodeURIComponent(uid || "")}`);
    const json = await res.json();

    if (json.success && json.data) {
      const { lessonProgress, pyqAttempts, practiceEvals, mockAttempts, pyqBookmarks, practiceBookmarks } = json.data;

      if (Object.keys(lessonProgress || {}).length > 0) {
        const local = safeGet<Record<string, any>>(STORAGE_KEYS.LESSON_PROGRESS, {});
        safeSet(STORAGE_KEYS.LESSON_PROGRESS, { ...local, ...lessonProgress });
      }

      if (Object.keys(pyqAttempts || {}).length > 0) {
        const local = safeGet<Record<string, any>>(STORAGE_KEYS.PYQ_ATTEMPTS, {});
        safeSet(STORAGE_KEYS.PYQ_ATTEMPTS, { ...local, ...pyqAttempts });
      }

      if (Object.keys(practiceEvals || {}).length > 0) {
        const local = safeGet<Record<string, any>>(STORAGE_KEYS.PRACTICE_EVALS, {});
        safeSet(STORAGE_KEYS.PRACTICE_EVALS, { ...local, ...practiceEvals });
      }

      if (Object.keys(mockAttempts || {}).length > 0) {
        const local = safeGet<Record<string, any>>(STORAGE_KEYS.MOCK_ATTEMPTS, {});
        safeSet(STORAGE_KEYS.MOCK_ATTEMPTS, { ...local, ...mockAttempts });
      }

      if (Array.isArray(pyqBookmarks) && pyqBookmarks.length > 0) {
        safeSet(STORAGE_KEYS.PYQ_BOOKMARKS, pyqBookmarks);
      }

      if (Array.isArray(practiceBookmarks) && practiceBookmarks.length > 0) {
        safeSet(STORAGE_KEYS.PRACTICE_BOOKMARKS, practiceBookmarks);
      }
    }
  } catch (err) {
    console.warn("[Sync] Server API pull warning:", err);
  }

  // 2. Also run direct Supabase queries if user id is available
  if (uid) {
    await Promise.all([
      pullLessonProgress(uid),
      pullPYQAttempts(uid),
      pullPracticeAttempts(uid),
      pullMockAttempts(uid),
      pullBookmarks(uid),
      pullSettings(uid),
    ]).catch(() => {});
  }

  broadcastProgressUpdate();
}

async function pullLessonProgress(uid: string) {
  const { data, error } = await supabase
    .from("user_progress")
    .select("lesson_key, is_completed, progress_percentage, title, last_studied_at")
    .eq("user_id", uid)
    .not("lesson_key", "is", null);

  if (error || !data?.length) return;

  const local = safeGet<Record<string, unknown>>(STORAGE_KEYS.LESSON_PROGRESS, {});
  data.forEach((row) => {
    if (!row.lesson_key) return;
    local[row.lesson_key] = {
      completed: row.is_completed,
      progressPercent: row.progress_percentage,
      title: row.title,
      updatedAt: row.last_studied_at,
    };
  });
  safeSet(STORAGE_KEYS.LESSON_PROGRESS, local);
}

async function pullPYQAttempts(uid: string) {
  const { data, error } = await supabase
    .from("question_attempts")
    .select("question_key, is_correct, selected_option, subject, topic, attempted_at")
    .eq("user_id", uid)
    .eq("source", "pyq")
    .not("question_key", "is", null);

  if (error || !data?.length) return;

  const local = safeGet<Record<string, unknown>>(STORAGE_KEYS.PYQ_ATTEMPTS, {});
  data.forEach((row) => {
    if (!row.question_key) return;
    local[row.question_key] = {
      isCorrect: row.is_correct,
      selectedOption: row.selected_option,
      score: row.is_correct ? 3 : -1,
      subject: row.subject,
      topic: row.topic,
      attemptedAt: row.attempted_at,
    };
  });
  safeSet(STORAGE_KEYS.PYQ_ATTEMPTS, local);
}

async function pullPracticeAttempts(uid: string) {
  const { data, error } = await supabase
    .from("question_attempts")
    .select("question_key, is_correct, selected_option, subject, topic, attempted_at")
    .eq("user_id", uid)
    .eq("source", "practice")
    .not("question_key", "is", null);

  if (error || !data?.length) return;

  const local = safeGet<Record<string, unknown>>(STORAGE_KEYS.PRACTICE_EVALS, {});
  data.forEach((row) => {
    if (!row.question_key) return;
    local[row.question_key] = {
      isCorrect: row.is_correct,
      selectedOption: row.selected_option,
      subject: row.subject,
      topic: row.topic,
      attemptedAt: row.attempted_at,
    };
  });
  safeSet(STORAGE_KEYS.PRACTICE_EVALS, local);
}

async function pullMockAttempts(uid: string) {
  const { data, error } = await supabase
    .from("mock_test_attempts")
    .select("title, score, total_marks, accuracy_percentage, nest_merit_score, percentile, subject_breakdown, question_results, completed_at")
    .eq("user_id", uid)
    .eq("status", "COMPLETED")
    .not("title", "is", null);

  if (error || !data?.length) return;

  const local = safeGet<Record<string, unknown>>(STORAGE_KEYS.MOCK_ATTEMPTS, {});
  data.forEach((row) => {
    if (!row.title) return;
    local[row.title] = {
      id: row.title,
      title: row.title,
      nestMeritScore: row.nest_merit_score,
      rawScore: row.score,
      evalMarks: row.total_marks,
      accuracy: row.accuracy_percentage,
      percentile: row.percentile,
      subjectBreakdown: row.subject_breakdown,
      questionResults: row.question_results,
      completedAt: row.completed_at,
    };
  });
  safeSet(STORAGE_KEYS.MOCK_ATTEMPTS, local);
}

async function pullBookmarks(uid: string) {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("question_key, source")
    .eq("user_id", uid)
    .not("question_key", "is", null);

  if (error || !data?.length) return;

  const pyqBookmarks: string[] = [];
  const practiceBookmarks: string[] = [];

  data.forEach((row) => {
    if (!row.question_key) return;
    if (row.source === "practice") {
      practiceBookmarks.push(row.question_key);
    } else {
      pyqBookmarks.push(row.question_key);
    }
  });

  if (pyqBookmarks.length > 0) safeSet(STORAGE_KEYS.PYQ_BOOKMARKS, pyqBookmarks);
  if (practiceBookmarks.length > 0) safeSet(STORAGE_KEYS.PRACTICE_BOOKMARKS, practiceBookmarks);
}

async function pullSettings(uid: string) {
  const { data, error } = await supabase
    .from("user_settings")
    .select("target_exam, target_score")
    .eq("user_id", uid)
    .maybeSingle();

  if (error || !data) return;

  if (typeof window !== "undefined") {
    if (data.target_exam) localStorage.setItem("nest_target_exam", data.target_exam);
    if (data.target_score) localStorage.setItem("nest_target_score", String(data.target_score));
  }
}
