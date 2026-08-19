import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email")?.trim().toLowerCase() || "";
    const userId = searchParams.get("userId")?.trim() || "";

    if (!email && !userId) {
      return NextResponse.json({ success: false, error: "Missing email or userId" }, { status: 400 });
    }

    // 1. Fetch Lessons Progress
    let lessonQuery = supabase.from("user_progress").select("*");
    if (email) lessonQuery = lessonQuery.or(`email.eq.${email},user_id.eq.${userId || "00000000-0000-0000-0000-000000000000"}`);
    else lessonQuery = lessonQuery.eq("user_id", userId);
    const { data: lessonsData } = await lessonQuery;

    const lessonProgress: Record<string, any> = {};
    (lessonsData || []).forEach((row) => {
      if (row.lesson_key) {
        lessonProgress[row.lesson_key] = {
          completed: row.is_completed,
          progressPercent: row.progress_percentage || 0,
          title: row.title || row.lesson_key,
          updatedAt: row.last_studied_at || row.updated_at,
        };
      }
    });

    // 2. Fetch Question Attempts (PYQs & Practice)
    let qQuery = supabase.from("question_attempts").select("*");
    if (email) qQuery = qQuery.or(`email.eq.${email},user_id.eq.${userId || "00000000-0000-0000-0000-000000000000"}`);
    else qQuery = qQuery.eq("user_id", userId);
    const { data: qData } = await qQuery;

    const pyqAttempts: Record<string, any> = {};
    const practiceEvals: Record<string, any> = {};
    const practiceAnswers: Record<string, any> = {};

    (qData || []).forEach((row) => {
      if (!row.question_key) return;
      const item = {
        isCorrect: row.is_correct,
        selectedOption: row.selected_option,
        score: row.is_correct ? 3 : -1,
        subject: row.subject,
        topic: row.topic,
        attemptedAt: row.attempted_at,
      };
      if (row.source === "practice") {
        practiceEvals[row.question_key] = item;
        if (row.selected_option) practiceAnswers[row.question_key] = row.selected_option;
      } else {
        pyqAttempts[row.question_key] = item;
      }
    });

    // 3. Fetch Mock Test Attempts
    let mockQuery = supabase.from("mock_test_attempts").select("*");
    if (email) mockQuery = mockQuery.or(`email.eq.${email},user_id.eq.${userId || "00000000-0000-0000-0000-000000000000"}`);
    else mockQuery = mockQuery.eq("user_id", userId);
    const { data: mockData } = await mockQuery;

    const mockAttempts: Record<string, any> = {};
    (mockData || []).forEach((row) => {
      const mockKey = row.mock_key || row.title || row.id;
      if (!mockKey) return;

      const attemptObj = row.attempt_data || {
        mockId: mockKey,
        id: mockKey,
        title: row.title || mockKey,
        nestMeritScore: Number(row.nest_merit_score ?? row.score ?? 0),
        rawScore: Number(row.score ?? 0),
        evalScore: Number(row.nest_merit_score ?? row.score ?? 0),
        evalMarks: Number(row.total_marks ?? 180),
        totalMarks: Number(row.total_marks ?? 180),
        accuracy: Number(row.accuracy_percentage ?? 0),
        percentile: Number(row.percentile ?? 0),
        subjectBreakdown: row.subject_breakdown,
        questionResults: row.question_results,
        completedAt: row.completed_at || row.created_at,
      };

      mockAttempts[mockKey] = attemptObj;
      if (row.title && row.title !== mockKey) {
        mockAttempts[row.title] = attemptObj;
      }
    });

    // 4. Fetch Bookmarks
    let bQuery = supabase.from("bookmarks").select("*");
    if (email) bQuery = bQuery.or(`email.eq.${email},user_id.eq.${userId || "00000000-0000-0000-0000-000000000000"}`);
    else bQuery = bQuery.eq("user_id", userId);
    const { data: bData } = await bQuery;

    const pyqBookmarks: string[] = [];
    const practiceBookmarks: string[] = [];
    (bData || []).forEach((row) => {
      if (!row.question_key) return;
      if (row.source === "practice") practiceBookmarks.push(row.question_key);
      else pyqBookmarks.push(row.question_key);
    });

    // 5. Fetch Settings, Profile, Onboarding, Assessment & App State
    let sQuery = supabase.from("user_settings").select("*");
    if (email) sQuery = sQuery.or(`email.eq.${email},user_id.eq.${userId || "00000000-0000-0000-0000-000000000000"}`);
    else sQuery = sQuery.eq("user_id", userId);
    const { data: sData } = await sQuery.maybeSingle();

    let pQuery = supabase.from("profiles").select("*");
    if (email) pQuery = pQuery.or(`email.eq.${email},id.eq.${userId || "00000000-0000-0000-0000-000000000000"}`);
    else pQuery = pQuery.eq("id", userId);
    const { data: pData } = await pQuery.maybeSingle();

    return NextResponse.json({
      success: true,
      data: {
        lessonProgress,
        pyqAttempts,
        practiceEvals,
        practiceAnswers,
        mockAttempts,
        pyqBookmarks,
        practiceBookmarks,
        userSettings: sData || null,
        profile: pData || null,
        onboardingData: sData?.onboarding_data || null,
        assessmentResults: sData?.assessment_data || null,
        appState: sData?.app_state || null,
      },
    });
  } catch (error: any) {
    console.error("[API /api/sync GET Error]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email: rawEmail, userId, type, payload } = body;
    const email = rawEmail?.trim().toLowerCase() || null;

    if (!email && !userId) {
      return NextResponse.json({ success: false, error: "Missing email or userId" }, { status: 400 });
    }

    // Resolve user ID if possible
    let resolvedUserId = userId;
    if ((!resolvedUserId || resolvedUserId === "guest") && email) {
      const { data: userRow } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email)
        .maybeSingle();
      if (userRow?.id) {
        resolvedUserId = userRow.id;
      }
    }

    const isValidUUID = typeof resolvedUserId === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(resolvedUserId);
    const safeUserId = isValidUUID ? resolvedUserId : null;

    if (type === "PYQ_ATTEMPT" || type === "PRACTICE_ATTEMPT") {
      const isPractice = type === "PRACTICE_ATTEMPT";
      const { questionKey, isCorrect, selectedOption, subject, topic } = payload || {};
      if (questionKey) {
        await supabase.from("question_attempts").upsert({
          user_id: safeUserId,
          email: email,
          question_key: questionKey,
          is_correct: !!isCorrect,
          selected_option: selectedOption ?? null,
          subject: subject ?? null,
          topic: topic ?? null,
          source: isPractice ? "practice" : "pyq",
          mode: isPractice ? "PRACTICE" : "PYQ",
          attempted_at: new Date().toISOString(),
        }, { onConflict: "user_id,question_key" });
      }
    } else if (type === "MOCK_ATTEMPT") {
      const { mockId, title, score, totalMarks, accuracy, nestMeritScore, percentile, subjectBreakdown, questionResults, completedAt, attemptData } = payload || {};
      const mockKey = mockId || title;
      if (mockKey) {
        await supabase.from("mock_test_attempts").upsert({
          user_id: safeUserId,
          email: email,
          mock_key: mockKey,
          title: title || mockKey,
          score: score ?? nestMeritScore ?? 0,
          total_marks: totalMarks ?? 180,
          accuracy_percentage: accuracy ?? 0,
          nest_merit_score: nestMeritScore ?? score ?? 0,
          percentile: percentile ?? 0,
          subject_breakdown: subjectBreakdown ?? null,
          question_results: questionResults ?? null,
          attempt_data: attemptData ?? payload ?? null,
          status: "COMPLETED",
          completed_at: completedAt ?? new Date().toISOString(),
        }, { onConflict: "user_id,title" });
      }
    } else if (type === "BULK_SYNC") {
      const {
        pyqAttempts = {},
        mockAttempts = {},
        lessonProgress = {},
        practiceEvals = {},
        assessmentResults = null,
        onboardingData = null,
        userSettings = null,
        userName = null,
        targetExam = "NEST 2026",
        targetScore = 150,
        targetCollege = "NISER Bhubaneswar",
        isPro = false,
      } = payload || {};

      // 1. Bulk PYQs
      const pyqRows = Object.entries(pyqAttempts).map(([key, val]: [string, any]) => ({
        user_id: safeUserId,
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
        await supabase.from("question_attempts").upsert(pyqRows, { onConflict: "user_id,question_key" });
      }

      // 2. Bulk Practice
      const practiceRows = Object.entries(practiceEvals).map(([key, val]: [string, any]) => ({
        user_id: safeUserId,
        email: email,
        question_key: key,
        is_correct: !!val.isCorrect,
        selected_option: val.selectedOption ?? null,
        subject: val.subject ?? null,
        topic: val.topic ?? null,
        source: "practice",
        mode: "PRACTICE",
        attempted_at: val.attemptedAt ?? new Date().toISOString(),
      }));
      if (practiceRows.length > 0) {
        await supabase.from("question_attempts").upsert(practiceRows, { onConflict: "user_id,question_key" });
      }

      // 3. Bulk Mocks
      const mockRows = Object.entries(mockAttempts).map(([key, val]: [string, any]) => ({
        user_id: safeUserId,
        email: email,
        mock_key: key,
        title: val.title || key,
        score: val.nestMeritScore ?? val.rawScore ?? val.score ?? 0,
        total_marks: val.evalMarks ?? val.totalMarks ?? 180,
        accuracy_percentage: val.accuracy ?? 0,
        nest_merit_score: val.nestMeritScore ?? val.evalScore ?? 0,
        percentile: val.percentile ?? 0,
        subject_breakdown: val.subjectBreakdown ?? null,
        question_results: val.questionResults ?? null,
        attempt_data: val,
        status: "COMPLETED",
        completed_at: val.completedAt ?? new Date().toISOString(),
      }));
      if (mockRows.length > 0) {
        await supabase.from("mock_test_attempts").upsert(mockRows, { onConflict: "user_id,title" });
      }

      // 4. Bulk Lessons
      const lessonRows = Object.entries(lessonProgress).map(([key, val]: [string, any]) => ({
        user_id: safeUserId,
        email: email,
        lesson_key: key,
        title: val.title ?? key,
        is_completed: val.completed ?? false,
        progress_percentage: val.progressPercent ?? 0,
        last_studied_at: val.updatedAt ?? new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
      if (lessonRows.length > 0) {
        await supabase.from("user_progress").upsert(lessonRows, { onConflict: "user_id,lesson_key" });
      }

      // 5. User Settings, Onboarding, Assessment & App State
      if (safeUserId || email) {
        await supabase.from("user_settings").upsert({
          user_id: safeUserId,
          email: email,
          name: userName ?? undefined,
          target_exam: targetExam,
          target_score: targetScore,
          target_college: targetCollege,
          is_pro: !!isPro,
          onboarding_data: onboardingData,
          assessment_data: assessmentResults,
          app_state: payload,
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" });

        if (safeUserId) {
          await supabase.from("profiles").update({
            full_name: userName ?? undefined,
            is_pro: !!isPro,
            updated_at: new Date().toISOString(),
          }).eq("id", safeUserId);
        }
      }
    }

    return NextResponse.json({ success: true, message: "Synced successfully" });
  } catch (error: any) {
    console.error("[API /api/sync POST Error]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
