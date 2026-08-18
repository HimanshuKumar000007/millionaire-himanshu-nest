"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  Search,
  Sparkles,
  ArrowLeft,
  Calendar,
  PlayCircle,
  X,
  Check,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  Flag,
  Trash2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  BarChart3,
  BookOpen,
  Filter,
  CheckSquare,
  CircleDot,
  Maximize2,
  ShieldCheck,
  ExternalLink,
  Target,
  Zap,
  TrendingDown,
  XCircle,
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ContentMockDefinition,
  ResolvedContentMock,
  ContentQuestion,
} from "@/lib/types/content";
import { SubjectType } from "@/lib/types/common";
import { questionEvaluationService } from "@/lib/services/questionEvaluation.service";
import { broadcastProgressUpdate } from "@/lib/services/progressOrchestrator.service";
import { pushMockAttempt } from "@/lib/supabase/sync.service";
import { CustomMarkdownRenderer } from "@/components/dashboard/CustomMarkdownRenderer";

interface MockTestsViewProps {
  onBackToDashboard: () => void;
  onStartAssessment?: () => void;
  onNavigateToLesson?: (chapterSlug?: string) => void;
}

// CBT Question Status
type QuestionStatus =
  | "not_visited"
  | "not_answered"
  | "answered"
  | "marked_for_review"
  | "answered_and_marked";

export function MockTestsView({
  onBackToDashboard,
  onStartAssessment,
  onNavigateToLesson,
}: MockTestsViewProps) {
  const [mocks, setMocks] = useState<ContentMockDefinition[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("ALL");

  // Active mock execution state
  const [activeMock, setActiveMock] = useState<ResolvedContentMock | null>(null);
  const [isStartingMock, setIsStartingMock] = useState<boolean>(false);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [activeSubject, setActiveSubject] = useState<SubjectType>("Physics");
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState<boolean>(false);
  
  // Question states and answers
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [questionStatuses, setQuestionStatuses] = useState<Record<string, QuestionStatus>>({});
  const [visitedQuestions, setVisitedQuestions] = useState<Set<string>>(new Set());
  
  // Timer & submission
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [totalDurationSeconds, setTotalDurationSeconds] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  // Review filters after submission
  const [reviewFilter, setReviewFilter] = useState<"ALL" | "CORRECT" | "INCORRECT" | "UNATTEMPTED">("ALL");
  const [reviewSubjectFilter, setReviewSubjectFilter] = useState<string>("ALL");

  // Attempt results: mockId -> attempt summary
  const [attemptsMap, setAttemptsMap] = useState<Record<string, any>>({});

  useEffect(() => {
    try {
      const savedAttempts = localStorage.getItem("nest_smartprep_mock_attempts");
      if (savedAttempts) setAttemptsMap(JSON.parse(savedAttempts));
    } catch (e) {
      console.warn("Failed loading mock attempts:", e);
    }
  }, []);

  const fetchMocks = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/content/mocks");
      if (res.ok) {
        const data = await res.json();
        setMocks(data.mocks || []);
      }
    } catch (err) {
      console.error("[MockTestsView] Error fetching mocks:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMocks();
  }, [fetchMocks]);

  // Group questions by subject
  const subjectGroups = useMemo(() => {
    if (!activeMock) return {} as Record<SubjectType, ContentQuestion[]>;
    const groups: Record<SubjectType, ContentQuestion[]> = {
      Physics: [],
      Chemistry: [],
      Mathematics: [],
      Biology: [],
    };
    activeMock.questions.forEach((q) => {
      const subj = (q.subject || "Physics") as SubjectType;
      if (!groups[subj]) groups[subj] = [];
      groups[subj].push(q);
    });
    return groups;
  }, [activeMock]);

  // Available subjects with at least 1 question
  const availableSubjects = useMemo(() => {
    return (["Physics", "Chemistry", "Mathematics", "Biology"] as SubjectType[]).filter(
      (s) => subjectGroups[s] && subjectGroups[s].length > 0
    );
  }, [subjectGroups]);

  // Launch mock test in full CBT mode
  const handleStartMock = async (mockId: string) => {
    try {
      setIsStartingMock(true);
      const res = await fetch(`/api/content/mocks?id=${mockId}&resolve=true`);
      if (res.ok) {
        const data = await res.json();
        const resolved: ResolvedContentMock = data.mock;

        setActiveMock(resolved);
        setCurrentQIndex(0);
        setUserAnswers({});
        setIsSubmitted(false);
        setShowSubmitModal(false);
        setReviewFilter("ALL");
        setReviewSubjectFilter("ALL");

        const initialStatuses: Record<string, QuestionStatus> = {};
        resolved.questions.forEach((q, idx) => {
          initialStatuses[q.id] = idx === 0 ? "not_answered" : "not_visited";
        });
        setQuestionStatuses(initialStatuses);
        setVisitedQuestions(new Set([resolved.questions[0]?.id]));

        if (resolved.questions[0]?.subject) {
          setActiveSubject(resolved.questions[0].subject as SubjectType);
        }

        const durSecs = (resolved.durationMinutes || 180) * 60;
        setTimerSeconds(durSecs);
        setTotalDurationSeconds(durSecs);
      }
    } catch (e) {
      console.error("Error launching mock test:", e);
    } finally {
      setIsStartingMock(false);
    }
  };

  // Switch to a question and mark it visited
  const navigateToQuestion = (index: number) => {
    if (!activeMock || index < 0 || index >= activeMock.questions.length) return;
    const targetQ = activeMock.questions[index];
    const currentQ = activeMock.questions[currentQIndex];

    if (currentQ && !isSubmitted) {
      const currentAns = userAnswers[currentQ.id];
      const hasAns =
        currentAns !== undefined &&
        currentAns !== null &&
        currentAns !== "" &&
        (!Array.isArray(currentAns) || currentAns.length > 0);

      const currStatus = questionStatuses[currentQ.id] || "not_visited";
      if (!hasAns && currStatus !== "marked_for_review") {
        setQuestionStatuses((prev) => ({ ...prev, [currentQ.id]: "not_answered" }));
      }
    }

    setCurrentQIndex(index);
    if (targetQ.subject) {
      setActiveSubject(targetQ.subject as SubjectType);
    }

    setVisitedQuestions((prev) => new Set(prev).add(targetQ.id));

    const targetAns = userAnswers[targetQ.id];
    const hasTargetAns =
      targetAns !== undefined &&
      targetAns !== null &&
      targetAns !== "" &&
      (!Array.isArray(targetAns) || targetAns.length > 0);

    const targetStatus = questionStatuses[targetQ.id];
    if (!hasTargetAns && targetStatus === "not_visited") {
      setQuestionStatuses((prev) => ({ ...prev, [targetQ.id]: "not_answered" }));
    }
  };

  // Jump to first question of selected subject
  const handleSubjectTabClick = (subj: SubjectType) => {
    setActiveSubject(subj);
    if (!activeMock) return;
    const firstIdx = activeMock.questions.findIndex((q) => q.subject === subj);
    if (firstIdx !== -1) {
      navigateToQuestion(firstIdx);
    }
  };

  // Finish and score test (with NEST Best 3 of 4 evaluation)
  const handleFinishMock = useCallback(
    (isAutoSubmit = false) => {
      if (!activeMock || isSubmitted) return;

      let rawTotalScore = 0;
      let totalCorrect = 0;
      let totalIncorrect = 0;
      let totalAttempted = 0;
      let marksGained = 0;
      let marksLost = 0;

      const subjectBreakdown: Record<
        SubjectType,
        {
          score: number;
          maxMarks: number;
          correct: number;
          incorrect: number;
          unattempted: number;
          total: number;
          smasCutoff: number;
          clearedSmas: boolean;
        }
      > = {
        Physics: { score: 0, maxMarks: 0, correct: 0, incorrect: 0, unattempted: 0, total: 0, smasCutoff: 10, clearedSmas: false },
        Chemistry: { score: 0, maxMarks: 0, correct: 0, incorrect: 0, unattempted: 0, total: 0, smasCutoff: 10, clearedSmas: false },
        Mathematics: { score: 0, maxMarks: 0, correct: 0, incorrect: 0, unattempted: 0, total: 0, smasCutoff: 10, clearedSmas: false },
        Biology: { score: 0, maxMarks: 0, correct: 0, incorrect: 0, unattempted: 0, total: 0, smasCutoff: 10, clearedSmas: false },
      };

      const questionResults: Record<string, any> = {};
      const weakTopicsMap = new Map<string, { topic: string; subject: string; mistakes: number }>();

      activeMock.questions.forEach((q) => {
        const subj = (q.subject || "Physics") as SubjectType;
        const ans = userAnswers[q.id];
        const result = questionEvaluationService.evaluate(q, ans);

        const hasAns =
          ans !== undefined &&
          ans !== null &&
          ans !== "" &&
          (!Array.isArray(ans) || ans.length > 0);

        questionResults[q.id] = {
          ...result,
          isAttempted: hasAns,
          userAnswer: hasAns ? ans : null,
          subject: subj,
          topic: q.topic || "General",
        };

        if (!subjectBreakdown[subj]) {
          subjectBreakdown[subj] = { score: 0, maxMarks: 0, correct: 0, incorrect: 0, unattempted: 0, total: 0, smasCutoff: 10, clearedSmas: false };
        }

        subjectBreakdown[subj].total += 1;
        subjectBreakdown[subj].maxMarks += q.marks || 4;

        if (hasAns) {
          totalAttempted++;
          if (result.isCorrect) {
            totalCorrect++;
            subjectBreakdown[subj].correct += 1;
            marksGained += q.marks || 4;
          } else {
            totalIncorrect++;
            subjectBreakdown[subj].incorrect += 1;
            marksLost += q.negativeMarks || 1;

            // Track weak topic
            const topicKey = `${subj}: ${q.topic}`;
            const existing = weakTopicsMap.get(topicKey) || { topic: q.topic, subject: subj, mistakes: 0 };
            existing.mistakes += 1;
            weakTopicsMap.set(topicKey, existing);
          }
        } else {
          subjectBreakdown[subj].unattempted += 1;
        }

        subjectBreakdown[subj].score += result.score;
        rawTotalScore += result.score;
      });

      // Calculate SMAS (Section-wise Minimum Admissible Score)
      Object.keys(subjectBreakdown).forEach((subjKey) => {
        const stats = subjectBreakdown[subjKey as SubjectType];
        // Standard SMAS cutoff is ~20% of section marks
        stats.smasCutoff = Math.round(stats.maxMarks * 0.2);
        stats.clearedSmas = stats.score >= stats.smasCutoff;
      });

      // NEST Merit Scoring: Best 3 of 4 Sections (180 Marks total)
      const subjectScoresList = Object.entries(subjectBreakdown)
        .filter(([_, stats]) => stats.total > 0)
        .map(([subj, stats]) => ({ subject: subj as SubjectType, score: stats.score }))
        .sort((a, b) => b.score - a.score);

      const best3Scores = subjectScoresList.slice(0, 3);
      const nestMeritScore = best3Scores.reduce((acc, curr) => acc + curr.score, 0);

      const evalScore = nestMeritScore;
      const evalMax = activeMock.evalMarks || 180;

      // NEST-specific Rank & Percentile Prediction
      const scorePct = (evalScore / evalMax) * 100;
      let predictedPercentile = 75.0;
      let predictedRankRange = "AIR 1500 - 3000";
      let masQualified = false;
      let targetInstitution = "NISER / CEBS";

      if (scorePct >= 76) {
        predictedPercentile = 99.5;
        predictedRankRange = "AIR 1 - 50 (Top Tier NISER Bhubaneswar)";
        masQualified = true;
        targetInstitution = "NISER Bhubaneswar & UM-DAE CEBS";
      } else if (scorePct >= 62) {
        predictedPercentile = 97.8;
        predictedRankRange = "AIR 51 - 250 (Strong NISER/CEBS Chance)";
        masQualified = true;
        targetInstitution = "NISER / UM-DAE CEBS";
      } else if (scorePct >= 48) {
        predictedPercentile = 92.0;
        predictedRankRange = "AIR 251 - 650 (Safe CEBS Mumbai)";
        masQualified = true;
        targetInstitution = "UM-DAE CEBS Mumbai";
      } else if (scorePct >= 35) {
        predictedPercentile = 83.0;
        predictedRankRange = "AIR 651 - 1500 (MAS Qualified)";
        masQualified = true;
        targetInstitution = "Waitlist / Special Rounds";
      } else {
        predictedPercentile = Math.max(45, Math.round(scorePct * 1.5));
        predictedRankRange = "AIR 1500+ (Needs Improvement)";
        masQualified = false;
        targetInstitution = "Re-attempt & Strengthen Weak Areas";
      }

      const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
      const timeSpentSeconds = totalDurationSeconds - timerSeconds;

      const attemptData = {
        mockId: activeMock.id,
        exam: activeMock.exam || "NEST",
        title: activeMock.title,
        isNest: true,
        rawScore: Math.round(rawTotalScore * 10) / 10,
        evalScore: Math.round(evalScore * 10) / 10,
        nestMeritScore: Math.round(nestMeritScore * 10) / 10,
        totalMarks: activeMock.totalMarks,
        evalMarks: evalMax,
        accuracy,
        correctCount: totalCorrect,
        incorrectCount: totalIncorrect,
        attemptedCount: totalAttempted,
        totalQuestions: activeMock.questions.length,
        marksGained,
        marksLost,
        predictedPercentile,
        predictedRankRange,
        targetInstitution,
        masQualified,
        subjectBreakdown,
        best3Subjects: best3Scores.map((s) => s.subject),
        weakTopics: Array.from(weakTopicsMap.values()).sort((a, b) => b.mistakes - a.mistakes),
        timeSpentSeconds,
        completedAt: new Date().toISOString(),
        questionResults,
      };

      const nextAttemptsMap = {
        ...attemptsMap,
        [activeMock.id]: attemptData,
      };

      setAttemptsMap(nextAttemptsMap);
      setIsSubmitted(true);
      setShowSubmitModal(false);

      try {
        localStorage.setItem("nest_smartprep_mock_attempts", JSON.stringify(nextAttemptsMap));
        broadcastProgressUpdate();
        pushMockAttempt(activeMock.id).catch(() => {});
      } catch (e) {
        console.warn("Failed saving mock attempt:", e);
      }
    },
    [activeMock, isSubmitted, userAnswers, attemptsMap, timerSeconds, totalDurationSeconds]
  );

  // Live timer effect
  useEffect(() => {
    if (!activeMock || isSubmitted || timerSeconds <= 0) return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinishMock(true); // auto submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeMock, isSubmitted, timerSeconds, handleFinishMock]);

  // Answer handler
  const handleAnswerSelect = (qId: string, qType: string, val: any) => {
    if (isSubmitted) return;

    if (qType === "MSQ") {
      const current = Array.isArray(userAnswers[qId]) ? [...userAnswers[qId]] : [];
      const idx = current.indexOf(val);
      if (idx >= 0) current.splice(idx, 1);
      else current.push(val);

      setUserAnswers((prev) => ({ ...prev, [qId]: current }));
    } else {
      setUserAnswers((prev) => ({ ...prev, [qId]: val }));
    }
  };

  // CBT Actions
  const handleSaveAndNext = () => {
    if (!activeMock) return;
    const currentQ = activeMock.questions[currentQIndex];
    const ans = userAnswers[currentQ.id];
    const hasAns =
      ans !== undefined &&
      ans !== null &&
      ans !== "" &&
      (!Array.isArray(ans) || ans.length > 0);

    setQuestionStatuses((prev) => ({
      ...prev,
      [currentQ.id]: hasAns ? "answered" : "not_answered",
    }));

    if (currentQIndex < activeMock.questions.length - 1) {
      navigateToQuestion(currentQIndex + 1);
    }
  };

  const handleMarkForReviewAndNext = () => {
    if (!activeMock) return;
    const currentQ = activeMock.questions[currentQIndex];
    const ans = userAnswers[currentQ.id];
    const hasAns =
      ans !== undefined &&
      ans !== null &&
      ans !== "" &&
      (!Array.isArray(ans) || ans.length > 0);

    setQuestionStatuses((prev) => ({
      ...prev,
      [currentQ.id]: hasAns ? "answered_and_marked" : "marked_for_review",
    }));

    if (currentQIndex < activeMock.questions.length - 1) {
      navigateToQuestion(currentQIndex + 1);
    }
  };

  const handleClearResponse = () => {
    if (!activeMock || isSubmitted) return;
    const currentQ = activeMock.questions[currentQIndex];
    const nextAnswers = { ...userAnswers };
    delete nextAnswers[currentQ.id];
    setUserAnswers(nextAnswers);

    setQuestionStatuses((prev) => ({
      ...prev,
      [currentQ.id]: "not_answered",
    }));
  };

  const formatTimer = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) {
      return `${h}h ${m.toString().padStart(2, "0")}m ${s.toString().padStart(2, "0")}s`;
    }
    return `${m.toString().padStart(2, "0")}m ${s.toString().padStart(2, "0")}s`;
  };

  // Palette Status Counts
  const paletteStats = useMemo(() => {
    let answered = 0;
    let notAnswered = 0;
    let marked = 0;
    let answeredAndMarked = 0;
    let notVisited = 0;

    if (!activeMock) return { answered, notAnswered, marked, answeredAndMarked, notVisited };

    activeMock.questions.forEach((q) => {
      const status = questionStatuses[q.id] || "not_visited";
      if (status === "answered") answered++;
      else if (status === "not_answered") notAnswered++;
      else if (status === "marked_for_review") marked++;
      else if (status === "answered_and_marked") answeredAndMarked++;
      else notVisited++;
    });

    return { answered, notAnswered, marked, answeredAndMarked, notVisited };
  }, [activeMock, questionStatuses]);

  // Filtered mock catalog (Only official NEST mock tests, excluding standalone PYQ papers)
  const filteredMocks = useMemo(() => {
    return mocks.filter((m) => {
      const isNest = m.exam === "NEST" || !m.exam;
      const isPyq = m.id.includes("pyq") || (m.category && String(m.category).toLowerCase().includes("pyq"));
      if (isPyq || !isNest) return false;

      const matchesSearch =
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.id.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesCategory = true;
      if (selectedCategoryFilter === "Full Length") {
        matchesCategory = m.category === "Full Length" || !m.category;
      } else if (selectedCategoryFilter === "Diagnostic") {
        matchesCategory = m.title.toLowerCase().includes("diagnostic") || m.category === "Subject Diagnostic";
      }

      return matchesSearch && matchesCategory;
    });
  }, [mocks, searchQuery, selectedCategoryFilter]);

  // Current question data
  const currentQ: ContentQuestion | undefined = activeMock?.questions[currentQIndex];
  const currentAttempt = activeMock ? attemptsMap[activeMock.id] : null;

  // =========================================================================
  // VIEW 1: MOCK TEST CATALOG / LOBBY
  // =========================================================================
  if (!activeMock) {
    return (
      <div className="space-y-6">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBackToDashboard}
                className="h-8 px-2 text-gray-500 hover:text-gray-900 font-bold text-xs"
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Dashboard
              </Button>

              <span className="text-gray-300">|</span>

              <Badge
                variant="outline"
                className="bg-amber-50 text-amber-800 border-amber-200 font-black px-2.5 py-0.5 rounded-lg text-[10px]"
              >
                <Sparkles className="h-3 w-3 mr-1 text-amber-600" /> Official Mock Series
              </Badge>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              NEST Full Mock Series <Award className="h-6 w-6 text-amber-600" />
            </h1>
            <p className="text-xs text-gray-500 font-medium max-w-2xl">
              Authentic Computer-Based Test (CBT) environment featuring 4 subject sections, official NEST marking (+3/-1 for Single Choice, +4 for Multi-Choice with partial marking), and official NEST Best-3-of-4 Merit Scoring (/180 Marks).
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-100 text-center">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Available</span>
              <span className="text-lg font-black text-gray-900">{filteredMocks.length}</span>
            </div>
            <div className="bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-100 text-center">
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider block">Attempted</span>
              <span className="text-lg font-black text-emerald-700">{Object.keys(attemptsMap).length}</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
            {["ALL", "Full Length", "Diagnostic"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedCategoryFilter(filter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all shrink-0 ${
                  selectedCategoryFilter === filter
                    ? "bg-gray-900 text-white shadow-xs"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {filter === "ALL" ? "All Mock Tests" : filter === "Full Length" ? "Full Length" : "Diagnostic"}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search NEST mock tests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-medium"
            />
          </div>
        </div>

        {/* Mock Tests Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs space-y-4 animate-pulse">
                <div className="h-4 w-24 bg-gray-100 rounded-md" />
                <div className="h-6 w-3/4 bg-gray-200 rounded-md" />
                <div className="h-12 w-full bg-gray-100 rounded-md" />
              </div>
            ))}
          </div>
        ) : filteredMocks.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-4 shadow-2xs">
            <div className="h-14 w-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto text-amber-600">
              <Award className="h-7 w-7" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-base font-extrabold text-gray-900">
                No NEST mock tests found matching your filter
              </h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Check back soon or explore official previous year questions in the PYQ module.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMocks.map((mock) => {
              const attempt = attemptsMap[mock.id];

              return (
                <div
                  key={mock.id}
                  className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs hover:shadow-md hover:border-amber-200 transition-all duration-200 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Badge
                          variant="outline"
                          className="text-[10px] font-black bg-amber-50 text-amber-800 border-amber-200 px-2 py-0.5 rounded-md uppercase"
                        >
                          {mock.exam || "NEST"}
                        </Badge>
                        <span className="text-[10px] font-bold text-gray-500 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">
                          {mock.category || "Full Length"}
                        </span>
                      </div>

                      {attempt ? (
                        <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Score: {attempt.nestMeritScore || attempt.rawScore}/{attempt.evalMarks || attempt.totalMarks}
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">
                          Unattempted
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-sm font-extrabold text-gray-900 group-hover:text-amber-600 transition-colors leading-snug">
                        {mock.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-500 mt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gray-400" /> {mock.durationMinutes || 210} mins
                        </span>
                        <span>•</span>
                        <span>{mock.totalQuestions || 80} Questions</span>
                        <span>•</span>
                        <span className="text-gray-700 font-extrabold">{mock.evalMarks || 180} Marks (Best 3)</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-gray-50/80 border border-gray-100 text-[11px] text-gray-600 space-y-1">
                      <div className="flex items-center justify-between font-semibold">
                        <span>Pattern:</span>
                        <span className="text-gray-900 font-bold">
                          80 Questions (20×4 PCMB)
                        </span>
                      </div>
                      <div className="flex items-center justify-between font-semibold">
                        <span>Evaluation:</span>
                        <span className="text-indigo-600 font-bold">
                          Best 3 of 4 Subjects (/180 Marks)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      disabled={isStartingMock}
                      onClick={() => handleStartMock(mock.id)}
                      className="w-full h-9 bg-gray-900 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                    >
                      {attempt ? (
                        <>Re-take CBT Mock <RotateCcw className="h-3.5 w-3.5" /></>
                      ) : (
                        <>Launch CBT Mock <PlayCircle className="h-3.5 w-3.5" /></>
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: POST-EXAM COMPREHENSIVE RESULT SCREEN & DIAGNOSTICS
  // =========================================================================
  if (isSubmitted && currentAttempt) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto pb-16">
        {/* 1. Scorecard Top Banner with Percentile & Rank Bracket */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[10px] font-black">
                  <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-600" /> Exam Finished
                </Badge>
                <span className="text-xs text-gray-400 font-bold">•</span>
                <span className="text-xs font-extrabold text-gray-600">{activeMock.title}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Mock Test Scorecard & Performance Analysis
              </h1>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStartMock(activeMock.id)}
                className="h-9 text-xs font-bold rounded-xl border-gray-200"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1 text-gray-600" /> Re-take Test
              </Button>
              <Button
                size="sm"
                onClick={() => setActiveMock(null)}
                className="h-9 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Back to Mock Tests
              </Button>
            </div>
          </div>

          {/* Primary Merit & Predicted Rank Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Main Score Block */}
            <div className="md:col-span-1 p-6 rounded-3xl bg-gradient-to-br from-indigo-900 to-indigo-950 text-white shadow-xl shadow-indigo-950/10 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block">
                  NEST Evaluated Merit Score
                </span>
                <div className="text-4xl font-black text-white mt-1 flex items-baseline gap-1">
                  {currentAttempt.evalScore ?? currentAttempt.nestMeritScore}
                  <span className="text-base font-bold text-indigo-300">/ {currentAttempt.evalMarks || 180}</span>
                </div>
                <span className="text-[11px] font-semibold text-indigo-200 mt-1 block">
                  Sum of Best 3 Subjects (Lowest Subject Dropped)
                </span>
              </div>

              <div className="pt-3 border-t border-indigo-800/80 flex items-center justify-between text-xs font-bold text-indigo-100">
                <span>Raw 4-Subject Score:</span>
                <span className="text-white font-black">{currentAttempt.rawScore} / {currentAttempt.totalMarks}</span>
              </div>
            </div>

            {/* Rank Predictor & Percentile */}
            <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider block">
                    Predicted AIR Rank
                  </span>
                  <div className="text-base sm:text-lg font-black text-amber-950 mt-1 leading-tight">
                    {currentAttempt.predictedRankRange}
                  </div>
                </div>
                <div className="text-[10px] font-bold text-amber-700 mt-2">
                  Target: {currentAttempt.targetInstitution}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider block">
                    Estimated Percentile
                  </span>
                  <div className="text-2xl font-black text-emerald-950 mt-1">
                    {currentAttempt.predictedPercentile}%ile
                  </div>
                </div>
                <div className="text-[10px] font-bold text-emerald-700 mt-2">
                  Top NEST Merit Bracket
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 col-span-2 sm:col-span-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black text-indigo-800 uppercase tracking-wider block">
                    Counselling Eligibility
                  </span>
                  <div className="text-sm font-black text-indigo-950 mt-1 flex items-center gap-1.5">
                    {currentAttempt.masQualified ? (
                      <>
                        <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>Qualified</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                        <span>Borderline</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-[10px] font-bold text-indigo-700 mt-2">
                  NISER / CEBS Central Counselling
                </div>
              </div>

              {/* Accuracy & Time Row */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-between">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                  Accuracy Rate
                </span>
                <div className="text-2xl font-black text-gray-900 mt-1">
                  {currentAttempt.accuracy}%
                </div>
                <div className="text-[10px] font-bold text-gray-500 mt-1">
                  {currentAttempt.correctCount} / {currentAttempt.attemptedCount} attempted
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-between">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                  Marks Breakdown
                </span>
                <div className="text-xs font-bold space-y-0.5 mt-1">
                  <div className="text-emerald-700 font-extrabold">+{currentAttempt.marksGained} Gained</div>
                  <div className="text-red-600 font-extrabold">-{currentAttempt.marksLost} Lost (Penalty)</div>
                </div>
                <div className="text-[10px] font-semibold text-gray-400 mt-1">
                  Net effect
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-between">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                  Time Spent
                </span>
                <div className="text-lg font-black text-gray-900 mt-1">
                  {formatTimer(currentAttempt.timeSpentSeconds)}
                </div>
                <div className="text-[10px] font-bold text-gray-500 mt-1">
                  Speed: ~{Math.round((currentAttempt.timeSpentSeconds / (currentAttempt.attemptedCount || 1)) / 6) / 10} min/Q
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Sectional Performance Matrix & Cutoff Status */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-gray-900 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-indigo-600" />
                {currentAttempt.isNest
                  ? "Section-wise Performance & SMAS Cutoff Status"
                  : "Section-wise Performance & Subject Breakdown (15 Qs Each)"}
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                {currentAttempt.isNest
                  ? "Official Section-wise Minimum Admissible Score (SMAS) tracking across all 4 subjects."
                  : "Cumulative scoring across Physics, Chemistry, Mathematics, and Biology (60 marks per section)."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
            {(["Physics", "Chemistry", "Mathematics", "Biology"] as SubjectType[]).map((subj) => {
              const stats = currentAttempt.subjectBreakdown?.[subj];
              if (!stats || stats.total === 0) return null;
              const isBest3 = currentAttempt.best3Subjects?.includes(subj);

              return (
                <div
                  key={subj}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                    isBest3 || !currentAttempt.isNest
                      ? "bg-white border-indigo-200 shadow-xs ring-2 ring-indigo-500/10"
                      : "bg-gray-50/70 border-gray-200 opacity-75"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-gray-900">{subj}</span>
                      {currentAttempt.isNest ? (
                        isBest3 ? (
                          <span className="text-[9px] font-black bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded-md">
                            ⭐ Best 3 (Evaluated)
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-md">
                            Excluded Lowest
                          </span>
                        )
                      ) : (
                        <span className="text-[9px] font-black bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md">
                          ✓ Evaluated (15 Qs)
                        </span>
                      )}
                    </div>

                    <div className="text-2xl font-black text-gray-900 mt-2">
                      {stats.score} <span className="text-xs text-gray-400 font-normal">/ {stats.maxMarks}</span>
                    </div>

                    {/* SMAS status */}
                    <div className="mt-2 flex items-center gap-1.5">
                      {stats.clearedSmas ? (
                        <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> SMAS Cleared ({stats.smasCutoff}+)
                        </span>
                      ) : (
                        <span className="text-[10px] font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> Missed SMAS ({stats.smasCutoff})
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-gray-100 text-[11px] font-semibold text-gray-600">
                    <div className="flex justify-between">
                      <span className="text-emerald-700">✓ Correct (+marks):</span>
                      <span className="font-bold text-gray-900">{stats.correct}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">✗ Incorrect (-penalty):</span>
                      <span className="font-bold text-gray-900">{stats.incorrect}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">○ Unattempted:</span>
                      <span className="font-bold text-gray-900">{stats.unattempted}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Identified Weak Areas & Remediation Bridge */}
        {currentAttempt.weakTopics && currentAttempt.weakTopics.length > 0 && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-black text-gray-900 flex items-center gap-2">
                  <Target className="h-4 w-4 text-red-500" /> Target Weak Areas Identified for Review
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  Topics where errors occurred. Click to immediately revise the corresponding Smart Lesson.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
              {currentAttempt.weakTopics.map((w: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-red-50/50 border border-red-100 flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-extrabold text-red-700 bg-red-100/80 px-2 py-0.5 rounded-md">
                      {w.subject} • {w.mistakes} {w.mistakes === 1 ? "Error" : "Errors"}
                    </span>
                    <h4 className="text-xs font-black text-gray-900 leading-snug">
                      {w.topic}
                    </h4>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (onNavigateToLesson) {
                        onNavigateToLesson();
                      } else {
                        onBackToDashboard();
                      }
                    }}
                    className="h-7 text-[10px] font-extrabold bg-white hover:bg-red-50 text-red-700 border-red-200 rounded-lg px-2 shrink-0 shadow-2xs"
                  >
                    Revise <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Detailed Step-by-Step Solutions & Solutions Explorer */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-2xs space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
            <div>
              <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-amber-600" /> Interactive Solution & Formula Explorer
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Step-by-step mathematical reasoning, key equations, and trap explanations for every question.
              </p>
            </div>

            {/* Dual Filter Suite */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Subject Filter */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                {["ALL", "Physics", "Chemistry", "Mathematics", "Biology"].map((subj) => (
                  <button
                    key={subj}
                    onClick={() => setReviewSubjectFilter(subj)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all ${
                      reviewSubjectFilter === subj
                        ? "bg-white text-gray-900 shadow-2xs"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {subj}
                  </button>
                ))}
              </div>

              {/* Status Outcome Filter */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                {[
                  { id: "ALL", label: "All Qs" },
                  { id: "CORRECT", label: "Correct" },
                  { id: "INCORRECT", label: "Incorrect" },
                  { id: "UNATTEMPTED", label: "Unattempted" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setReviewFilter(tab.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all ${
                      reviewFilter === tab.id
                        ? "bg-gray-900 text-white shadow-2xs"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Questions review list */}
          <div className="space-y-6 pt-1">
            {activeMock.questions
              .filter((q) => {
                const res = currentAttempt.questionResults?.[q.id];
                const ans = userAnswers[q.id];
                const hasAns =
                  ans !== undefined &&
                  ans !== null &&
                  ans !== "" &&
                  (!Array.isArray(ans) || ans.length > 0);

                const matchesSubject =
                  reviewSubjectFilter === "ALL" || q.subject === reviewSubjectFilter;

                let matchesOutcome = true;
                if (reviewFilter === "CORRECT") matchesOutcome = res?.isCorrect === true;
                else if (reviewFilter === "INCORRECT") matchesOutcome = hasAns && res?.isCorrect === false;
                else if (reviewFilter === "UNATTEMPTED") matchesOutcome = !hasAns;

                return matchesSubject && matchesOutcome;
              })
              .map((q, idx) => {
                const res = currentAttempt.questionResults?.[q.id];
                const userAns = userAnswers[q.id];
                const hasAns =
                  userAns !== undefined &&
                  userAns !== null &&
                  userAns !== "" &&
                  (!Array.isArray(userAns) || userAns.length > 0);

                return (
                  <div
                    key={q.id}
                    className="p-6 rounded-3xl border border-gray-200 bg-white space-y-4 shadow-2xs"
                  >
                    {/* Header Strip */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-gray-900 bg-gray-100 px-2.5 py-0.5 rounded-lg">
                          Q{idx + 1}
                        </span>
                        <span className="font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-100">
                          {q.subject} • {q.topic} {q.subtopic ? `› ${q.subtopic}` : ""}
                        </span>
                        <span className="text-gray-400 uppercase text-[10px] font-bold">
                          {q.questionType}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {res?.isCorrect ? (
                          <Badge className="bg-emerald-50 text-emerald-800 border-emerald-200 font-bold text-[10px]">
                            + {res.score} Marks (Correct)
                          </Badge>
                        ) : hasAns ? (
                          <Badge className="bg-red-50 text-red-700 border-red-200 font-bold text-[10px]">
                            {res?.score ?? -1} Marks (Incorrect Penalty)
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-400 text-[10px]">
                            0 Marks (Unattempted)
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Question text with KaTeX LaTeX math */}
                    <div className="text-sm font-semibold text-gray-900 leading-relaxed p-4 rounded-2xl bg-gray-50/70 border border-gray-100">
                      <CustomMarkdownRenderer content={q.questionText} />
                    </div>

                    {/* Question Diagram / Image */}
                    {(q.imageSrc || (q.images && q.images.length > 0)) && (
                      <div className="p-3 sm:p-4 rounded-2xl bg-white border border-gray-200 flex flex-col items-center justify-center space-y-3 shadow-2xs">
                        {q.images && q.images.length > 0 ? (
                          q.images.map((imgSrc: string, imgIdx: number) => (
                            <img
                              key={imgIdx}
                              src={imgSrc}
                              alt={`Question Diagram ${imgIdx + 1}`}
                              className="max-h-[260px] sm:max-h-[320px] w-auto max-w-full rounded-xl object-contain shadow-xs border border-gray-100 p-1"
                              onError={(e) => {
                                const target = e.currentTarget;
                                if (target.src.includes("cloudinary.com")) {
                                  const match = target.src.match(/nest_pyqs\/([^/]+)\/([^/?#]+)/);
                                  if (match) {
                                    target.src = `/images/pyqs/${match[1]}/${match[2]}`;
                                  }
                                }
                              }}
                            />
                          ))
                        ) : (
                          <img
                            src={q.imageSrc}
                            alt="Question Diagram"
                            className="max-h-[260px] sm:max-h-[320px] w-auto max-w-full rounded-xl object-contain shadow-xs border border-gray-100 p-1"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (target.src.includes("cloudinary.com")) {
                                const match = target.src.match(/nest_pyqs\/([^/]+)\/([^/?#]+)/);
                                if (match) {
                                  target.src = `/images/pyqs/${match[1]}/${match[2]}`;
                                }
                              }
                            }}
                          />
                        )}
                      </div>
                    )}

                    {/* Options list */}
                    {q.options && q.options.length > 0 && (
                      <div className="space-y-2">
                        {q.options.map((opt) => {
                          const isUserSelected =
                            q.questionType === "MSQ"
                              ? Array.isArray(userAns) && userAns.includes(opt.id)
                              : userAns === opt.id;
                          const isCorrectOpt = opt.isCorrect === true;

                          let optStyle = "border-gray-200 bg-white text-gray-700";
                          if (isCorrectOpt) {
                            optStyle = "border-emerald-500 bg-emerald-50/80 text-emerald-950 font-bold ring-2 ring-emerald-500/20";
                          } else if (isUserSelected && !isCorrectOpt) {
                            optStyle = "border-red-400 bg-red-50/80 text-red-950 font-bold ring-2 ring-red-400/20";
                          }

                          return (
                            <div
                              key={opt.id}
                              className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs transition-all ${optStyle}`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`h-6 w-6 rounded-lg font-black text-xs uppercase flex items-center justify-center shrink-0 ${
                                  isCorrectOpt
                                    ? "bg-emerald-600 text-white"
                                    : isUserSelected
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-100 text-gray-700"
                                }`}>
                                  {opt.id}
                                </span>
                                <div>
                                  <CustomMarkdownRenderer content={opt.text} />
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {isCorrectOpt && (
                                  <span className="text-[10px] font-black text-emerald-700 bg-white px-2.5 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1 shadow-2xs">
                                    <CheckCircle2 className="h-3 w-3" /> Correct Choice
                                  </span>
                                )}
                                {isUserSelected && !isCorrectOpt && (
                                  <span className="text-[10px] font-black text-red-600 bg-white px-2.5 py-0.5 rounded-md border border-red-200 flex items-center gap-1 shadow-2xs">
                                    <XCircle className="h-3 w-3" /> Your Selection
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Numerical Solution Info */}
                    {q.questionType === "Numerical" && q.numericalAnswer && (
                      <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-semibold flex items-center justify-between">
                        <div>
                          <span>Accepted Range: </span>
                          <strong className="text-gray-900 font-mono">[{q.numericalAnswer.min} to {q.numericalAnswer.max}]</strong>
                        </div>
                        <div>
                          <span>Your Input: </span>
                          <strong className="text-gray-900 font-mono">{userAns !== undefined ? userAns : "None"}</strong>
                        </div>
                      </div>
                    )}

                    {/* Step-by-Step Solution with Key Formulas */}
                    <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-indigo-950 flex items-center gap-1.5">
                          <HelpCircle className="h-4 w-4 text-indigo-600" /> Step-by-Step Mathematical Derivation & Concept:
                        </span>
                      </div>

                      <div className="text-xs text-indigo-950 leading-relaxed font-medium">
                        <CustomMarkdownRenderer content={q.solutionExplanation} />
                      </div>

                      {/* Key Formulae tags */}
                      {q.keyFormulae && q.keyFormulae.length > 0 && (
                        <div className="pt-2 border-t border-indigo-100/80 flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-black text-indigo-800 uppercase tracking-wider">
                            Key Formulae:
                          </span>
                          {q.keyFormulae.map((f, fIdx) => (
                            <span
                              key={fIdx}
                              className="text-[11px] font-mono font-bold bg-white text-indigo-900 px-2 py-0.5 rounded-md border border-indigo-200 shadow-2xs"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: ACTIVE FULL-SCREEN CBT EXAM WORKSPACE
  // =========================================================================
  return (
    <div className="fixed inset-0 z-50 bg-[#F4F6F9] flex flex-col font-sans text-gray-900 overflow-hidden select-none">
      {/* 1. CBT Top Header Bar */}
      <header className="h-13 sm:h-14 bg-white border-b border-gray-200 px-3 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs z-20">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
            NEST
          </div>
          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm font-black text-gray-900 leading-tight truncate max-w-[130px] xs:max-w-[200px] sm:max-w-none">
              {activeMock.title}
            </h1>
            <span className="text-[10px] font-semibold text-gray-400 hidden sm:inline">
              Candidate: <strong>Ankit Kumar</strong> • Official NEST CBT Engine
            </span>
          </div>
        </div>

        {/* Center/Right: Mobile Palette Trigger, Timer & Action */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Mobile Question Palette Button */}
          <button
            onClick={() => setIsMobilePaletteOpen(true)}
            className="md:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-[11px] font-black transition-all"
          >
            <LayoutGrid className="h-3.5 w-3.5 text-indigo-600" />
            <span>Palette</span>
          </button>

          {/* Timer Clock */}
          <div
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl border flex items-center gap-1 sm:gap-2 font-mono font-black text-[11px] sm:text-xs transition-all ${
              timerSeconds < 600
                ? "bg-red-50 text-red-700 border-red-200 animate-pulse"
                : "bg-amber-50 text-amber-900 border-amber-200"
            }`}
          >
            <Clock className="h-3.5 w-3.5 text-amber-600 shrink-0" />
            <span>{formatTimer(timerSeconds)}</span>
          </div>

          {/* Submit Test Button */}
          <Button
            size="sm"
            onClick={() => setShowSubmitModal(true)}
            className="h-8 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] sm:text-xs rounded-xl px-2.5 sm:px-4 shadow-xs"
          >
            <span>Submit</span>
            <Check className="ml-1 h-3.5 w-3.5 hidden sm:inline" />
          </Button>
        </div>
      </header>

      {/* 2. CBT Section Navigation Bar */}
      <div className="h-10 sm:h-11 bg-white border-b border-gray-200 px-3 sm:px-6 flex items-center gap-1.5 sm:gap-2 overflow-x-auto shrink-0 scrollbar-none">
        <span className="text-[10px] sm:text-[11px] font-black text-gray-400 uppercase tracking-wider mr-1 shrink-0">
          Sections:
        </span>
        {availableSubjects.map((subj) => {
          const questionsInSubj = subjectGroups[subj] || [];
          const answeredInSubj = questionsInSubj.filter((q) => {
            const status = questionStatuses[q.id];
            return status === "answered" || status === "answered_and_marked";
          }).length;

          const isActive = activeSubject === subj;

          return (
            <button
              key={subj}
              onClick={() => handleSubjectTabClick(subj)}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center gap-1.5 shrink-0 ${
                isActive
                  ? "bg-gray-900 text-white shadow-xs"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              <span>{subj}</span>
              <span
                className={`text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-md ${
                  isActive ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                {answeredInSubj}/{questionsInSubj.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Main CBT Examination Split Body */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Column: Active Question Workspace */}
        {currentQ && (
          <div className="flex-1 flex flex-col h-full overflow-hidden bg-white md:border-r border-gray-200">
            {/* Scrollable Question Content Area */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-6">
              <div className="space-y-4 sm:space-y-5 max-w-4xl w-full mx-auto pb-4">
                {/* Question Header Strip */}
                <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="h-6 px-2 sm:px-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-black text-[11px] sm:text-xs flex items-center justify-center">
                      Q{currentQIndex + 1}
                    </span>
                    <span className="text-[11px] sm:text-xs font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 sm:px-2.5 py-0.5 rounded-md truncate max-w-[150px] sm:max-w-none">
                      {currentQ.subject} • {currentQ.topic}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold">
                    <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 sm:px-2 py-0.5 rounded-md">
                      +{currentQ.marks || 4} / -{currentQ.negativeMarks || 1}
                    </span>
                    <span className="text-gray-500 bg-gray-50 border border-gray-200 px-1.5 sm:px-2 py-0.5 rounded-md uppercase text-[9px] sm:text-[10px]">
                      {currentQ.questionType}
                    </span>
                  </div>
                </div>

                {/* Question Text Area */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm font-semibold text-gray-900 leading-relaxed overflow-x-auto">
                  <CustomMarkdownRenderer content={currentQ.questionText} />
                </div>

                {/* Question Diagram / Image */}
                {(currentQ.imageSrc || (currentQ.images && currentQ.images.length > 0)) && (
                  <div className="p-3 sm:p-4 rounded-2xl bg-white border border-gray-200 flex flex-col items-center justify-center space-y-3 shadow-2xs">
                    {currentQ.images && currentQ.images.length > 0 ? (
                      currentQ.images.map((imgSrc: string, imgIdx: number) => (
                        <img
                          key={imgIdx}
                          src={imgSrc}
                          alt={`Question Diagram ${imgIdx + 1}`}
                          className="max-h-[320px] sm:max-h-[400px] w-auto max-w-full rounded-xl object-contain shadow-xs border border-gray-100 p-1"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (target.src.includes("cloudinary.com")) {
                              const match = target.src.match(/nest_pyqs\/([^/]+)\/([^/?#]+)/);
                              if (match) {
                                target.src = `/images/pyqs/${match[1]}/${match[2]}`;
                              }
                            }
                          }}
                        />
                      ))
                    ) : (
                      <img
                        src={currentQ.imageSrc}
                        alt="Question Diagram"
                        className="max-h-[320px] sm:max-h-[400px] w-auto max-w-full rounded-xl object-contain shadow-xs border border-gray-100 p-1"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src.includes("cloudinary.com")) {
                            const match = target.src.match(/nest_pyqs\/([^/]+)\/([^/?#]+)/);
                            if (match) {
                              target.src = `/images/pyqs/${match[1]}/${match[2]}`;
                            }
                          }
                        }}
                      />
                    )}
                  </div>
                )}

                {/* Options Selector Area */}
                {currentQ.questionType === "MCQ" && currentQ.options && (
                  <div className="space-y-2 sm:space-y-2.5">
                    {currentQ.options.map((opt) => {
                      const isSelected = userAnswers[currentQ.id] === opt.id;

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleAnswerSelect(currentQ.id, "MCQ", opt.id)}
                          className={`w-full text-left p-3 sm:p-3.5 rounded-2xl border transition-all flex items-center justify-between text-xs ${
                            isSelected
                              ? "bg-amber-50 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-500/20 shadow-xs"
                              : "bg-white border-gray-200 text-gray-800 hover:border-amber-300 hover:bg-gray-50/50"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
                            <span
                              className={`h-6 w-6 rounded-lg font-black text-xs uppercase flex items-center justify-center shrink-0 transition-all ${
                                isSelected
                                  ? "bg-amber-600 text-white"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {opt.id}
                            </span>
                            <div className="font-medium text-xs sm:text-sm overflow-x-auto">
                              <CustomMarkdownRenderer content={opt.text} compact />
                            </div>
                          </div>
                          <CircleDot
                            className={`h-4 w-4 shrink-0 ${
                              isSelected ? "text-amber-600" : "text-gray-300"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentQ.questionType === "MSQ" && currentQ.options && (
                  <div className="space-y-2 sm:space-y-2.5">
                    <div className="text-[10px] sm:text-[11px] font-bold text-amber-700 bg-amber-50 p-2 sm:p-2.5 rounded-xl border border-amber-200">
                      💡 Multiple choices may be correct. Select all options that apply.
                    </div>
                    {currentQ.options.map((opt) => {
                      const list: string[] = Array.isArray(userAnswers[currentQ.id])
                        ? userAnswers[currentQ.id]
                        : [];
                      const isSelected = list.includes(opt.id);

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleAnswerSelect(currentQ.id, "MSQ", opt.id)}
                          className={`w-full text-left p-3 sm:p-3.5 rounded-2xl border transition-all flex items-center justify-between text-xs ${
                            isSelected
                              ? "bg-amber-50 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-500/20 shadow-xs"
                              : "bg-white border-gray-200 text-gray-800 hover:border-amber-300 hover:bg-gray-50/50"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
                            <span
                              className={`h-6 w-6 rounded-lg font-black text-xs uppercase flex items-center justify-center shrink-0 transition-all ${
                                isSelected
                                  ? "bg-amber-600 text-white"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {opt.id}
                            </span>
                            <div className="font-medium text-xs sm:text-sm overflow-x-auto">
                              <CustomMarkdownRenderer content={opt.text} />
                            </div>
                          </div>
                          <div
                            className={`h-4 w-4 rounded border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "bg-amber-600 border-amber-600 text-white"
                                : "border-gray-300"
                            }`}
                          >
                            {isSelected && <Check className="h-3 w-3" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentQ.questionType === "Numerical" && (
                  <div className="space-y-3 bg-gray-50 p-4 sm:p-5 rounded-2xl border border-gray-200">
                    <span className="text-xs font-black text-gray-800 block">
                      Enter Numeric Answer:
                    </span>
                    <input
                      type="number"
                      step="any"
                      placeholder="e.g. 3.14"
                      value={userAnswers[currentQ.id] || ""}
                      onChange={(e) =>
                        handleAnswerSelect(currentQ.id, "Numerical", e.target.value)
                      }
                      className="w-full sm:w-72 px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-mono font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Static / Pinned Bottom CBT Action Toolbar */}
            <div className="p-2.5 sm:px-6 sm:py-3.5 bg-white border-t border-gray-200 flex items-center justify-between gap-1.5 sm:gap-2 shrink-0 shadow-xs z-10">
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearResponse}
                  className="h-9 text-[11px] sm:text-xs font-bold rounded-xl text-gray-600 hover:text-red-600 border-gray-200 px-2 sm:px-3"
                >
                  <Trash2 className="h-3.5 w-3.5 sm:mr-1 text-gray-500" />
                  <span className="hidden sm:inline">Clear Response</span>
                  <span className="sm:hidden">Clear</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkForReviewAndNext}
                  className="h-9 text-[11px] sm:text-xs font-bold rounded-xl bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100 px-2 sm:px-3"
                >
                  <Flag className="h-3.5 w-3.5 sm:mr-1 text-purple-600" />
                  <span className="hidden sm:inline">Mark for Review & Next</span>
                  <span className="sm:hidden">Review</span>
                </Button>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentQIndex === 0}
                  onClick={() => navigateToQuestion(currentQIndex - 1)}
                  className="h-9 text-[11px] sm:text-xs font-bold rounded-xl px-2.5 sm:px-3"
                >
                  <ChevronLeft className="h-4 w-4 sm:mr-0.5" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>

                <Button
                  size="sm"
                  onClick={handleSaveAndNext}
                  className="h-9 bg-gray-900 hover:bg-amber-600 text-white font-black text-[11px] sm:text-xs rounded-xl px-3 sm:px-5 shadow-xs transition-all shrink-0"
                >
                  <span>Save & Next</span>
                  <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Right Column: Desktop Question Palette & Status Summary */}
        <div className="hidden md:flex w-80 bg-[#FAFBFD] border-l border-gray-200 p-4 flex-col justify-between overflow-y-auto shrink-0">
          <div className="space-y-4">
            {/* Status Legend Box */}
            <div className="p-3.5 rounded-2xl bg-white border border-gray-200 shadow-2xs space-y-2.5">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                CBT Status Legend
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-md bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                    {paletteStats.answered}
                  </span>
                  <span className="text-gray-700">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-md bg-red-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                    {paletteStats.notAnswered}
                  </span>
                  <span className="text-gray-700">Not Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-md bg-purple-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                    {paletteStats.marked}
                  </span>
                  <span className="text-gray-700">Marked Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-md bg-purple-600 text-white relative flex items-center justify-center text-[10px] font-black shrink-0">
                    {paletteStats.answeredAndMarked}
                    <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 border border-white" />
                  </span>
                  <span className="text-gray-700">Ans & Marked</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <span className="h-5 w-5 rounded-md bg-white border border-gray-300 text-gray-500 flex items-center justify-center text-[10px] font-black shrink-0">
                    {paletteStats.notVisited}
                  </span>
                  <span className="text-gray-700">Not Visited</span>
                </div>
              </div>
            </div>

            {/* Question Palette Grid for Active Subject */}
            <div className="p-3.5 rounded-2xl bg-white border border-gray-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-gray-900">
                  {activeSubject} Palette
                </span>
                <span className="text-[10px] font-bold text-gray-400">
                  {subjectGroups[activeSubject]?.length || 0} Questions
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {activeMock.questions.map((q, idx) => {
                  if (q.subject !== activeSubject) return null;
                  const isCurrent = idx === currentQIndex;
                  const status = questionStatuses[q.id] || "not_visited";

                  let btnStyle = "bg-white border-gray-300 text-gray-600 hover:bg-gray-100";
                  if (status === "answered") {
                    btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-2xs";
                  } else if (status === "not_answered") {
                    btnStyle = "bg-red-500 text-white border-red-600 shadow-2xs";
                  } else if (status === "marked_for_review") {
                    btnStyle = "bg-purple-600 text-white border-purple-700 shadow-2xs";
                  } else if (status === "answered_and_marked") {
                    btnStyle = "bg-purple-600 text-white border-purple-700 shadow-2xs ring-2 ring-emerald-400";
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => navigateToQuestion(idx)}
                      className={`h-8 rounded-xl text-xs font-black transition-all relative flex items-center justify-center border ${btnStyle} ${
                        isCurrent ? "ring-3 ring-amber-500 scale-105 z-10" : ""
                      }`}
                    >
                      {idx + 1}
                      {status === "answered_and_marked" && (
                        <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 border border-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Submit Block */}
          <div className="pt-4 border-t border-gray-200">
            <Button
              onClick={() => setShowSubmitModal(true)}
              className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-xs"
            >
              Submit Final Test <Check className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Up Question Palette Drawer */}
      {isMobilePaletteOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs md:hidden flex flex-col justify-end animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Drawer Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                  <LayoutGrid className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900">Question Palette</h3>
                  <span className="text-[11px] text-gray-500 font-semibold">
                    {activeSubject} Section ({subjectGroups[activeSubject]?.length || 0} Questions)
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsMobilePaletteOpen(false)}
                className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Subject Filter Pills inside Mobile Drawer */}
            <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none bg-gray-50">
              {availableSubjects.map((subj) => {
                const isActive = activeSubject === subj;
                return (
                  <button
                    key={subj}
                    onClick={() => handleSubjectTabClick(subj)}
                    className={`px-3 py-1 rounded-xl text-xs font-black shrink-0 transition-all ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-600 border border-gray-200"
                    }`}
                  >
                    {subj}
                  </button>
                );
              })}
            </div>

            {/* Drawer Body */}
            <div className="p-4 overflow-y-auto space-y-4">
              {/* Legend Box */}
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 grid grid-cols-2 gap-2 text-[11px] font-bold">
                <div className="flex items-center gap-1.5">
                  <span className="h-4.5 w-4.5 rounded bg-emerald-500 text-white flex items-center justify-center text-[9px] font-black shrink-0">
                    {paletteStats.answered}
                  </span>
                  <span className="text-gray-700">Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-4.5 w-4.5 rounded bg-red-500 text-white flex items-center justify-center text-[9px] font-black shrink-0">
                    {paletteStats.notAnswered}
                  </span>
                  <span className="text-gray-700">Not Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-4.5 w-4.5 rounded bg-purple-600 text-white flex items-center justify-center text-[9px] font-black shrink-0">
                    {paletteStats.marked}
                  </span>
                  <span className="text-gray-700">Marked Review</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-4.5 w-4.5 rounded bg-purple-600 text-white relative flex items-center justify-center text-[9px] font-black shrink-0">
                    {paletteStats.answeredAndMarked}
                    <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 border border-white" />
                  </span>
                  <span className="text-gray-700">Ans & Marked</span>
                </div>
              </div>

              {/* Mobile Palette Grid */}
              <div className="grid grid-cols-5 gap-2">
                {activeMock.questions.map((q, idx) => {
                  if (q.subject !== activeSubject) return null;
                  const isCurrent = idx === currentQIndex;
                  const status = questionStatuses[q.id] || "not_visited";

                  let btnStyle = "bg-white border-gray-300 text-gray-600 hover:bg-gray-100";
                  if (status === "answered") {
                    btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-2xs";
                  } else if (status === "not_answered") {
                    btnStyle = "bg-red-500 text-white border-red-600 shadow-2xs";
                  } else if (status === "marked_for_review") {
                    btnStyle = "bg-purple-600 text-white border-purple-700 shadow-2xs";
                  } else if (status === "answered_and_marked") {
                    btnStyle = "bg-purple-600 text-white border-purple-700 shadow-2xs ring-2 ring-emerald-400";
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        navigateToQuestion(idx);
                        setIsMobilePaletteOpen(false);
                      }}
                      className={`h-9 rounded-xl text-xs font-black transition-all relative flex items-center justify-center border ${btnStyle} ${
                        isCurrent ? "ring-3 ring-amber-500 scale-105 z-10" : ""
                      }`}
                    >
                      {idx + 1}
                      {status === "answered_and_marked" && (
                        <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 border border-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Confirmation Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-70 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-100">
              <AlertCircle className="h-6 w-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-black text-gray-900">
                Are you ready to submit your test?
              </h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                You have answered <strong>{paletteStats.answered + paletteStats.answeredAndMarked}</strong> out of{" "}
                <strong>{activeMock.questions.length}</strong> questions.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-xs font-semibold text-gray-700 space-y-1.5">
              <div className="flex justify-between">
                <span>Answered Questions:</span>
                <span className="font-black text-emerald-700">
                  {paletteStats.answered + paletteStats.answeredAndMarked}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Marked for Review:</span>
                <span className="font-black text-purple-700">
                  {paletteStats.marked + paletteStats.answeredAndMarked}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Unattempted / Unvisited:</span>
                <span className="font-black text-gray-500">
                  {paletteStats.notAnswered + paletteStats.notVisited}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 h-9 rounded-xl text-xs font-bold"
              >
                Continue Test
              </Button>
              <Button
                onClick={() => handleFinishMock(false)}
                className="flex-1 h-9 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black"
              >
                Yes, Submit Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
