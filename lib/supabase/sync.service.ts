"use client";
/**
 * sync.service.ts
 * Bidirectional sync between localStorage and Supabase.
 *
 * Strategy:
 *   - WRITE: every local write also fires a background Supabase upsert (fire-and-forget).
 *   - RESTORE: on login, pull all Supabase rows and merge into localStorage (remote wins on conflict).
 *   - OFFLINE: if Supabase is unreachable, local data remains authoritative.
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

async function getUserId(): Promise<string | null> {
  try {
    const { data } = await supabase.auth.getUser();
    return data?.user?.id ?? null;
  } catch {
    return null;
  }
}

// ── PUSH (local → Supabase) ──────────────────────────────────────────────────

export async function pushLessonProgress(): Promise<void> {
  const uid = await getUserId();
  if (!uid) return;

  const store = safeGet<Record<string, { completed?: boolean; progressPercent?: number; title?: string; updatedAt?: string }>>(
    STORAGE_KEYS.LESSON_PROGRESS, {}
  );

  const rows = Object.entries(store).map(([key, val]) => ({
    user_id: uid,
    lesson_key: key,
    title: val.title ?? key,
    is_completed: val.completed ?? false,
    progress_percentage: val.progressPercent ?? 0,
    last_studied_at: val.updatedAt ?? new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));

  if (rows.length === 0) return;

  // Upsert on (user_id, lesson_key)
  await supabase
    .from("user_progress")
    .upsert(rows, { onConflict: "user_id,lesson_key", ignoreDuplicates: false })
    .then(({ error }) => {
      if (error) console.warn("[Sync] lesson push failed:", error.message);
    });
}

export async function pushPYQAttempt(
  questionKey: string,
  payload: { isCorrect: boolean; selectedOption?: string; subject?: string; topic?: string }
): Promise<void> {
  const uid = await getUserId();
  if (!uid) return;

  await supabase
    .from("question_attempts")
    .upsert({
      user_id: uid,
      question_key: questionKey,
      question_id: "00000000-0000-0000-0000-000000000000", // placeholder when no UUID
      is_correct: payload.isCorrect,
      selected_option: payload.selectedOption ?? null,
      subject: payload.subject ?? null,
      topic: payload.topic ?? null,
      source: "pyq",
      mode: "PYQ",
      attempted_at: new Date().toISOString(),
    }, { onConflict: "user_id,question_key", ignoreDuplicates: false })
    .then(({ error }) => {
      if (error) console.warn("[Sync] PYQ push failed:", error.message);
    });
}

export async function pushPracticeAttempt(
  questionKey: string,
  payload: { isCorrect: boolean; selectedOption?: string; subject?: string; topic?: string }
): Promise<void> {
  const uid = await getUserId();
  if (!uid) return;

  await supabase
    .from("question_attempts")
    .upsert({
      user_id: uid,
      question_key: questionKey,
      question_id: "00000000-0000-0000-0000-000000000000",
      is_correct: payload.isCorrect,
      selected_option: payload.selectedOption ?? null,
      subject: payload.subject ?? null,
      topic: payload.topic ?? null,
      source: "practice",
      mode: "PRACTICE",
      attempted_at: new Date().toISOString(),
    }, { onConflict: "user_id,question_key", ignoreDuplicates: false })
    .then(({ error }) => {
      if (error) console.warn("[Sync] practice push failed:", error.message);
    });
}

export async function pushMockAttempt(attemptId: string): Promise<void> {
  const uid = await getUserId();
  if (!uid) return;

  const store = safeGet<Record<string, {
    id?: string; title?: string; nestMeritScore?: number; rawScore?: number;
    evalMarks?: number; evalScore?: number; totalMarks?: number; accuracy?: number; percentile?: number;
    completedAt?: string; subjectBreakdown?: unknown; questionResults?: unknown;
  }>>(STORAGE_KEYS.MOCK_ATTEMPTS, {});

  const attempt = store[attemptId];
  if (!attempt) return;

  await supabase
    .from("mock_test_attempts")
    .upsert({
      user_id: uid,
      mock_test_id: "00000000-0000-0000-0000-000000000000",
      title: attempt.title ?? attempt.id ?? attemptId,
      score: attempt.nestMeritScore ?? attempt.evalScore ?? attempt.rawScore ?? 0,
      total_marks: attempt.evalMarks ?? attempt.totalMarks ?? 180,
      accuracy_percentage: attempt.accuracy ?? 0,
      nest_merit_score: attempt.nestMeritScore ?? attempt.evalScore ?? 0,
      percentile: attempt.percentile ?? 0,
      subject_breakdown: attempt.subjectBreakdown ?? null,
      question_results: attempt.questionResults ?? null,
      status: "COMPLETED",
      completed_at: attempt.completedAt ?? new Date().toISOString(),
    }, { onConflict: "user_id,title", ignoreDuplicates: false })
    .then(({ error }) => {
      if (error) console.warn("[Sync] mock push failed:", error.message);
    });
}

export async function pushBookmarks(): Promise<void> {
  const uid = await getUserId();
  if (!uid) return;

  const pyqBookmarks = safeGet<string[]>(STORAGE_KEYS.PYQ_BOOKMARKS, []);
  const practiceBookmarks = safeGet<string[]>(STORAGE_KEYS.PRACTICE_BOOKMARKS, []);

  const rows: Array<{ user_id: string; question_key: string; source: string }> = [];
  pyqBookmarks.forEach((key) => {
    rows.push({ user_id: uid, question_key: key, source: "pyq" });
  });
  practiceBookmarks.forEach((key) => {
    rows.push({ user_id: uid, question_key: key, source: "practice" });
  });

  if (rows.length === 0) return;

  await supabase
    .from("bookmarks")
    .upsert(rows, { onConflict: "user_id,question_key", ignoreDuplicates: false })
    .then(({ error }) => {
      if (error) console.warn("[Sync] bookmarks push failed:", error.message);
    });
}

export async function pushSettings(): Promise<void> {
  const uid = await getUserId();
  if (!uid) return;

  const name = localStorage.getItem("nest_user_name") ?? "";
  const email = localStorage.getItem("nest_user_email") ?? "";
  const isPro = localStorage.getItem("nest_user_is_pro") === "true";
  const signupDate = localStorage.getItem("nest_smartprep_signup_date") ?? new Date().toISOString();

  await supabase
    .from("user_settings")
    .upsert({ user_id: uid, name, email, is_pro: isPro, signup_date: signupDate, updated_at: new Date().toISOString() })
    .then(({ error }) => {
      if (error) console.warn("[Sync] settings push failed:", error.message);
    });
}

/**
 * Pushes all local storage data to Supabase in bulk.
 */
export async function pushAllLocalData(): Promise<void> {
  const uid = await getUserId();
  if (!uid) return;

  // Push lessons
  await pushLessonProgress();

  // Push PYQ attempts
  const pyqStore = safeGet<Record<string, { isCorrect: boolean; selectedOption?: string; subject?: string; topic?: string }>>(
    STORAGE_KEYS.PYQ_ATTEMPTS, {}
  );
  const pyqRows = Object.entries(pyqStore).map(([key, val]) => ({
    user_id: uid,
    question_key: key,
    question_id: "00000000-0000-0000-0000-000000000000",
    is_correct: val.isCorrect,
    selected_option: val.selectedOption ?? null,
    subject: val.subject ?? null,
    topic: val.topic ?? null,
    source: "pyq",
    mode: "PYQ",
    attempted_at: new Date().toISOString(),
  }));
  if (pyqRows.length > 0) {
    await supabase.from("question_attempts").upsert(pyqRows, { onConflict: "user_id,question_key" });
  }

  // Push Practice evaluations
  const practiceStore = safeGet<Record<string, { isCorrect: boolean; selectedOption?: string; subject?: string; topic?: string }>>(
    STORAGE_KEYS.PRACTICE_EVALS, {}
  );
  const practiceRows = Object.entries(practiceStore).map(([key, val]) => ({
    user_id: uid,
    question_key: key,
    question_id: "00000000-0000-0000-0000-000000000000",
    is_correct: val.isCorrect,
    selected_option: val.selectedOption ?? null,
    subject: val.subject ?? null,
    topic: val.topic ?? null,
    source: "practice",
    mode: "PRACTICE",
    attempted_at: new Date().toISOString(),
  }));
  if (practiceRows.length > 0) {
    await supabase.from("question_attempts").upsert(practiceRows, { onConflict: "user_id,question_key" });
  }

  // Push Mock attempts
  const mockStore = safeGet<Record<string, any>>(STORAGE_KEYS.MOCK_ATTEMPTS, {});
  const mockRows = Object.entries(mockStore).map(([id, attempt]) => ({
    user_id: uid,
    mock_test_id: "00000000-0000-0000-0000-000000000000",
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
    await supabase.from("mock_test_attempts").upsert(mockRows, { onConflict: "user_id,title" });
  }

  // Push Bookmarks & Settings
  await pushBookmarks();
  await pushSettings();
}

// ── PULL (Supabase → localStorage) ──────────────────────────────────────────

export async function pullAllAndRestore(): Promise<void> {
  const uid = await getUserId();
  if (!uid) return;

  await Promise.all([
    pullLessonProgress(uid),
    pullPYQAttempts(uid),
    pullPracticeAttempts(uid),
    pullMockAttempts(uid),
    pullBookmarks(uid),
    pullSettings(uid),
  ]);

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
    .select("name, email, is_pro, signup_date")
    .eq("user_id", uid)
    .single();

  if (error || !data) return;

  if (data.name) localStorage.setItem("nest_user_name", data.name);
  if (data.email) localStorage.setItem("nest_user_email", data.email);
  localStorage.setItem("nest_user_is_pro", String(data.is_pro));
  if (data.signup_date) localStorage.setItem("nest_smartprep_signup_date", data.signup_date);
}
