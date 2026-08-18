"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ContentChapterLesson,
} from "@/lib/types/content";
import { questionEvaluationService } from "@/lib/services/questionEvaluation.service";
import { lessonProgressService } from "@/lib/services/lessonProgress.service";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  X, BookOpen, Clock, CheckCircle2, Lightbulb, Flame, HelpCircle, Check,
  Award, AlertTriangle, Zap, BookMarked, ArrowRight, ArrowLeft, RotateCcw,
  ChevronRight, Target, FileText, MessageSquare, AlertCircle, Search, ClipboardList,
  TrendingUp, BrainCircuit, Timer, Minimize2,
  Maximize2, Bookmark, BookmarkCheck, BarChart3, Circle, CircleDot, Trophy,
} from "lucide-react";
import {
  CustomCodeBlock,
  CustomBlockquote,
  CustomListItem,
  CustomTable,
  MarkdownContent,
} from "@/components/dashboard/CustomMarkdownRenderer";
import { DiagramRenderer } from "@/components/dashboard/DiagramRenderer";
import SetsMathematicsPremium from "@/components/dashboard/SetsMathematicsPremium";

/* ─────────────────────────────────────────────────────────── */
interface SmartChapterLessonReaderProps {
  chapterSlug?: string;
  subject?: string;
  onClose: () => void;
  onProgressUpdate?: () => void;
  onNavigateChapter?: (nextSlug: string, nextSubject: string) => void;
}

type ViewState = "overview" | "reading" | "quiz" | "results";

interface QuizResults {
  totalScore: number;
  maxMarks: number;
  accuracy: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  topicPerformance: TopicPerformance[];
  timeTaken?: number;
}

interface TopicPerformance {
  topic: string;
  total: number;
  correct: number;
  accuracy: number;
  isWeak: boolean;
}

const SECTION_OFFSET = 120;
const QUIZ_TRANSITION_DURATION = 350;
const STAGGER_DELAY = 80;

/* ─── Skeleton ─── */
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] rounded-xl ${className}`} style={{ animation: "shimmer 1.5s infinite" }} />
  );
}

/* ─── Circular Progress ─── */
function CircularProgress({ percentage, size = 120, strokeWidth = 8, color = "#4F46E5", children }: { percentage: number; size?: number; strokeWidth?: number; color?: string; children?: React.ReactNode }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" className="text-gray-100" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={strokeWidth} fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

/* ─── Confetti ─── */
function ConfettiBurst({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * 360;
        const color = ["#4F46E5", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6", "#3B82F6"][i % 6];
        return (
          <div key={i} className="absolute w-3 h-3 rounded-sm" style={{
            backgroundColor: color, animation: `confetti-burst 1.2s ease-out forwards`,
            animationDelay: `${i * 30}ms`, transform: `rotate(${angle}deg) translateY(-20px)`, transformOrigin: "center", opacity: 0,
          }} />
        );
      })}
    </div>
  );
}

/* ─── Square Icon for MSQ ─── */
function Square({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>;
}

/* ═══════════════════════════════════════════════════════════ */
/* MAIN COMPONENT: MASTER CHAPTER LESSON RENDERER              */
/* ═══════════════════════════════════════════════════════════ */
export function SmartChapterLessonReader({
  chapterSlug = "the-living-world",
  subject = "Biology",
  onClose,
  onProgressUpdate,
  onNavigateChapter,
}: SmartChapterLessonReaderProps) {
  const [chapterLesson, setChapterLesson] = useState<ContentChapterLesson | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewState, setViewState] = useState<ViewState>("reading");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [readSections, setReadSections] = useState<Record<string, boolean>>({});
  const [chapterProgress, setChapterProgress] = useState<number>(0);
  const [bookmarkedSections, setBookmarkedSections] = useState<Record<string, boolean>>({});
  const [showSectionNav, setShowSectionNav] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionObserverRef = useRef<IntersectionObserver | null>(null);
  const progressDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, any>>({});
  const [practiceRevealed, setPracticeRevealed] = useState<Record<string, boolean>>({});
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [quizStartTime, setQuizStartTime] = useState<number>(0);
  const [quizTimer, setQuizTimer] = useState<number>(0);
  const [showQuizOverview, setShowQuizOverview] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [nextChapterModal, setNextChapterModal] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handlePracticeOptionSelect = (qId: string, optionId: string, isMSQ = false) => {
    setPracticeAnswers((prev) => {
      if (isMSQ) {
        const current = Array.isArray(prev[qId]) ? prev[qId] : [];
        const exists = current.includes(optionId);
        const updated = exists ? current.filter((id: string) => id !== optionId) : [...current, optionId];
        return { ...prev, [qId]: updated };
      }
      return { ...prev, [qId]: optionId };
    });
  };

  const handleTogglePracticeReveal = (qId: string) => {
    setPracticeRevealed((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  /* ── Load Data ── */
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true); setError(null);
        const res = await fetch(`/api/content/chapter-lesson?slug=${chapterSlug}&subject=${subject}`);
        if (!res.ok) throw new Error(`Failed to load (${res.status})`);
        const data = await res.json();
        if (data.chapterLesson) {
          setChapterLesson(data.chapterLesson);
          if (data.chapterLesson.sections.length > 0) {
            const firstId = data.chapterLesson.sections[0].id;
            setActiveSectionId(firstId);
            setReadSections({ [firstId]: true });
          }
          const stored = lessonProgressService.getLessonProgress(data.chapterLesson.id);
          const initialPct = stored.progressPercent || Math.round((1 / (data.chapterLesson.sections.length || 1)) * 100);
          setChapterProgress(initialPct);
        } else { setError("Chapter lesson not found."); }
      } catch (err: any) { setError(err.message || "An unexpected error occurred."); }
      finally { setTimeout(() => setIsLoading(false), 300); }
    }
    loadData();
  }, [chapterSlug, subject]);

  /* ── Intersection Observer ── */
  useEffect(() => {
    if (viewState !== "reading" || !chapterLesson || isLoading) return;
    sectionObserverRef.current?.disconnect();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("data-section-id");
          if (sectionId) {
            setActiveSectionId(sectionId);
            setReadSections((prev) => {
              if (prev[sectionId]) return prev;
              const updated = { ...prev, [sectionId]: true };
              const count = Object.keys(updated).length;
              const percent = Math.min(100, Math.round((count / (chapterLesson.sections.length || 1)) * 100));
              setChapterProgress((prevP) => Math.max(prevP, percent));
              // Debounced save — max 1 write per 300ms to avoid flooding localStorage on fast scroll
              if (progressDebounceRef.current) clearTimeout(progressDebounceRef.current);
              progressDebounceRef.current = setTimeout(() => {
                lessonProgressService.saveLessonProgress(chapterLesson.id, percent, percent >= 100);
              }, 300);
              setTimeout(() => {
                onProgressUpdate?.();
              }, 0);
              return updated;
            });
          }
        }
      });
    }, { rootMargin: `-${SECTION_OFFSET}px 0px -60% 0px`, threshold: 0 });
    chapterLesson.sections.forEach((sec) => {
      const el = document.getElementById(`section-${sec.id}`);
      if (el) observer.observe(el);
    });
    sectionObserverRef.current = observer;
    return () => observer.disconnect();
  }, [viewState, chapterLesson, isLoading, onProgressUpdate]);

  /* ── Keyboard Shortcuts ── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && viewState === "reading") onClose();
      if (viewState === "quiz" && !quizSubmitted) {
        if (e.key === "ArrowRight" && currentQuizIdx < (chapterLesson?.questions?.length || 0) - 1) {
          setCurrentQuizIdx((i) => Math.min((chapterLesson?.questions?.length || 1) - 1, i + 1));
        }
        if (e.key === "ArrowLeft" && currentQuizIdx > 0) {
          setCurrentQuizIdx((i) => Math.max(0, i - 1));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewState, currentQuizIdx, quizSubmitted, chapterLesson, onClose]);

  /* ── Quiz Timer ── */
  useEffect(() => {
    if (viewState !== "quiz" || quizSubmitted) return;
    const interval = setInterval(() => setQuizTimer(Math.floor((Date.now() - quizStartTime) / 1000)), 1000);
    return () => clearInterval(interval);
  }, [viewState, quizSubmitted, quizStartTime]);

  /* ── Handlers ── */
  const handleJumpToSection = useCallback((secId: string) => {
    setActiveSectionId(secId);
    const el = document.getElementById(`section-${secId}`);
    if (el) { const y = el.getBoundingClientRect().top + window.scrollY - SECTION_OFFSET; window.scrollTo({ top: y, behavior: "smooth" }); }
  }, []);

  const handleViewTransition = useCallback((newView: ViewState) => {
    setIsTransitioning(true);
    setTimeout(() => { setViewState(newView); window.scrollTo({ top: 0, behavior: "smooth" }); setTimeout(() => setIsTransitioning(false), 50); }, QUIZ_TRANSITION_DURATION);
  }, []);

  const handleStartQuiz = useCallback(() => {
    setUserAnswers({}); setCurrentQuizIdx(0); setQuizSubmitted(false); setQuizResults(null);
    setFlaggedQuestions({}); setQuizStartTime(Date.now()); setQuizTimer(0); handleViewTransition("quiz");
  }, [handleViewTransition]);

  const handleQuizNavigate = useCallback((direction: number) => {
    setCurrentQuizIdx((i) => { const max = (chapterLesson?.questions?.length || 1) - 1; return Math.max(0, Math.min(max, i + direction)); });
  }, [chapterLesson]);

  const handleSelectOption = useCallback((qId: string, optionId: string, isMSQ = false) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => {
      if (isMSQ) { const currentArr = Array.isArray(prev[qId]) ? prev[qId] : []; const exists = currentArr.includes(optionId); const updated = exists ? currentArr.filter((id: string) => id !== optionId) : [...currentArr, optionId]; return { ...prev, [qId]: updated }; }
      return { ...prev, [qId]: optionId };
    });
  }, [quizSubmitted]);

  const toggleFlagQuestion = useCallback((qId: string) => { setFlaggedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] })); }, []);
  const toggleBookmark = useCallback((secId: string) => { setBookmarkedSections((prev) => ({ ...prev, [secId]: !prev[secId] })); }, []);

  const handleSubmitQuiz = useCallback(() => {
    if (!chapterLesson?.questions) return;
    const questions = chapterLesson.questions;
    let totalScore = 0, correctCount = 0, incorrectCount = 0, unattemptedCount = 0;
    const topicStats: Record<string, { total: number; correct: number; score: number }> = {};
    questions.forEach((q) => {
      const ans = userAnswers[q.id];
      const evalRes = questionEvaluationService.evaluate(q, ans);
      totalScore += evalRes.score;
      if (ans === undefined || ans === null || ans === "" || (Array.isArray(ans) && ans.length === 0)) unattemptedCount++;
      else if (evalRes.isCorrect) correctCount++;
      else incorrectCount++;
      const topic = q.topic || "Core Concept";
      if (!topicStats[topic]) topicStats[topic] = { total: 0, correct: 0, score: 0 };
      topicStats[topic].total += 1; topicStats[topic].score += evalRes.score;
      if (evalRes.isCorrect) topicStats[topic].correct += 1;
    });
    const maxMarks = questions.length * 4;
    const attemptedCount = correctCount + incorrectCount;
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const timeTaken = Math.floor((Date.now() - quizStartTime) / 1000);
    const computedTopicPerformance = Object.entries(topicStats).map(([topic, stat]) => ({
      topic, total: stat.total, correct: stat.correct,
      accuracy: Math.round((stat.correct / stat.total) * 100),
      isWeak: Math.round((stat.correct / stat.total) * 100) < 70,
    }));
    setQuizResults({ totalScore, maxMarks, accuracy, correctCount, incorrectCount, unattemptedCount, topicPerformance: computedTopicPerformance, timeTaken });
    setQuizSubmitted(true); setShowCelebration(true); setTimeout(() => setShowCelebration(false), 2500);
    handleViewTransition("results");
    lessonProgressService.saveLessonProgress(chapterLesson.id, 100, true);
    setTimeout(() => {
      onProgressUpdate?.();
    }, 0);
  }, [chapterLesson, userAnswers, quizStartTime, handleViewTransition, onProgressUpdate]);

  const sectionsCount = chapterLesson?.sections?.length || 0;
  const questionsCount = chapterLesson?.questions?.length || 0;
  const readCount = Object.keys(readSections).length;
  const currentQuestion = chapterLesson?.questions?.[currentQuizIdx];
  const isCurrentMSQ = currentQuestion?.questionType === "MSQ";
  const answeredCount = Object.keys(userAnswers).filter((k) => { const v = userAnswers[k]; return v !== undefined && v !== null && v !== "" && (!Array.isArray(v) || v.length > 0); }).length;
  const formatTime = (seconds: number) => { const m = Math.floor(seconds / 60); const s = seconds % 60; return `${m}:${s.toString().padStart(2, "0")}`; };

  /* ════════════════════════════════════════════════════════ */
  /* RENDER: LOADING STATE                                   */
  /* ════════════════════════════════════════════════════════ */
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
        <div className="flex items-center gap-2 pb-2">
          <Skeleton className="h-4 w-24" /><Skeleton className="h-4 w-4" /><Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-4" /><Skeleton className="h-4 w-48" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-2xs space-y-6">
              <div className="space-y-4 pb-6 border-b border-gray-100">
                <div className="flex gap-2"><Skeleton className="h-5 w-20" /><Skeleton className="h-5 w-16" /><Skeleton className="h-5 w-24" /></div>
                <Skeleton className="h-4 w-32" /><Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" /><Skeleton className="h-2.5 w-full mt-4" />
              </div>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4 pb-8 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3"><Skeleton className="h-8 w-8 rounded-xl" /><div className="space-y-2 flex-1"><Skeleton className="h-5 w-48" /><Skeleton className="h-3 w-32" /></div></div>
                  <Skeleton className="h-24 w-full" />
                  <div className="grid grid-cols-2 gap-3"><Skeleton className="h-16 w-full" /><Skeleton className="h-16 w-full" /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-2xs space-y-4">
              <Skeleton className="h-5 w-32" /><Skeleton className="h-2 w-full" />
              <div className="space-y-3">{Array.from({ length: 6 }).map((_, i) => (<div key={i} className="flex items-center gap-3"><Skeleton className="h-6 w-6 rounded-full" /><Skeleton className="h-4 w-full" /></div>))}</div>
            </div>
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-6 space-y-4"><Skeleton className="h-5 w-32 bg-white/20" /><Skeleton className="h-10 w-full bg-white/20" /></div>
          </div>
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════ */
  /* RENDER: ERROR STATE                                     */
  /* ════════════════════════════════════════════════════════ */
  if (error || !chapterLesson) {
    return (
      <div className="max-w-xl mx-auto py-20 animate-in fade-in zoom-in-95 duration-300">
        <div className="bg-white rounded-3xl p-8 border border-gray-200 text-center space-y-5 shadow-2xl">
          <div className="h-16 w-16 rounded-3xl bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto"><AlertTriangle className="h-8 w-8 text-rose-500" /></div>
          <div className="space-y-2"><h3 className="text-lg font-black text-gray-900">Unable to Load Chapter</h3><p className="text-sm text-gray-500 font-medium leading-relaxed">{error || "Chapter lesson content could not be found."}</p></div>
          <div className="flex gap-3">
            <Button onClick={() => window.location.reload()} variant="outline" className="flex-1 h-11 text-xs font-bold rounded-xl border-gray-200"><RotateCcw className="h-4 w-4 mr-2" /> Retry</Button>
            <Button onClick={onClose} className="flex-1 h-11 bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold rounded-xl text-xs">Return to Dashboard</Button>
          </div>
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════ */
  /* RENDER: MAIN MASTER LESSON RENDERER                     */
  /* ════════════════════════════════════════════════════════ */
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500 relative">
      {/* Top Progress Bar */}
      {viewState === "reading" && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-100">
          <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 transition-all duration-500 ease-out" style={{ width: `${chapterProgress}%` }} />
        </div>
      )}
      <ConfettiBurst active={showCelebration} />

      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-gray-500 pb-1 border-b border-gray-100">
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          <button onClick={onClose} className="hover:text-indigo-600 transition-colors shrink-0 flex items-center gap-1.5 font-bold text-gray-600 group">
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" /><span>Smart Lessons</span>
          </button>
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <span className="text-gray-600 shrink-0">{chapterLesson.subject}</span>
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <span className="text-gray-600 shrink-0">{chapterLesson.classLevel}</span>
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <span className="text-gray-600 shrink-0">{chapterLesson.unit}</span>
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <span className="text-gray-900 font-black truncate max-w-[220px] sm:max-w-none">Ch. {chapterLesson.chapterNumber}: {chapterLesson.title}</span>
        </div>
        <div className="flex items-center gap-3">
          {viewState === "reading" && (
            <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">
              <BarChart3 className="h-3.5 w-3.5 text-[#4F46E5]" /><span className="text-[11px] font-extrabold text-[#4F46E5]">{chapterProgress}% Complete</span>
            </div>
          )}
          {viewState === "quiz" && (
            <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
              <Timer className="h-3.5 w-3.5 text-amber-600" /><span className="text-[11px] font-extrabold text-amber-700">{formatTime(quizTimer)}</span>
            </div>
          )}
          <Button variant="outline" size="sm" onClick={onClose} className="h-8 text-xs font-bold rounded-xl px-3 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors"><X className="h-3.5 w-3.5 mr-1" /> Exit</Button>
        </div>
      </div>

      {/* Main Grid — Responsive 2-Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN */}
        <div className={`xl:col-span-8 col-span-12 space-y-6 transition-all duration-300 ${isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>

          {/* ═══════ VIEW: READING ═══════ */}
          {viewState === "reading" && (
            <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 border border-gray-200/80 shadow-2xs space-y-6 sm:space-y-8">
              
              {/* Header */}
              <div className="space-y-4 pb-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  {/* Left Column Content */}
                  <div className="flex-1 space-y-3.5">
                    <div>
                      <span className="text-[11px] font-black text-[#4F46E5] bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-lg uppercase tracking-wider">
                        CHAPTER {chapterLesson.chapterNumber || 1}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
                        {chapterLesson.title}
                      </h1>
                      <span className="text-gray-300 text-2xl font-light">|</span>
                      <button
                        onClick={() => toggleBookmark(chapterLesson.id || `chapter-${chapterLesson.chapterNumber}`)}
                        className="p-1 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-indigo-600 transition-colors"
                        title="Bookmark Chapter"
                      >
                        <Bookmark className={`h-5 w-5 sm:h-6 sm:w-6 ${bookmarkedSections[chapterLesson.id || `chapter-${chapterLesson.chapterNumber}`] ? "fill-indigo-600 text-indigo-600" : ""}`} />
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed max-w-2xl">
                      {chapterLesson.description || "Core module with complete high-yield section breakdown, concepts, and practice."}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs font-extrabold text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4 text-gray-400" />
                        <span>{sectionsCount} Sections</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{chapterLesson.estimatedTotalTimeMinutes || chapterLesson.sections.reduce((acc, s) => acc + (s.readingTimeMinutes || 0), 0) || 25} min read</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                        <span>{questionsCount} Quiz Questions</span>
                      </div>

                      <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full text-xs font-black">
                        <RotateCcw className="h-3.5 w-3.5 text-emerald-600" />
                        <span>NCERT Based</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column Illustration */}
                  {chapterLesson.heroImage && (
                    <div className="shrink-0 w-44 sm:w-56 h-44 sm:h-56 relative flex items-center justify-center self-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={chapterLesson.heroImage}
                        alt={`${chapterLesson.title} Illustration`}
                        className="w-full h-full object-contain drop-shadow-md rounded-2xl"
                      />
                    </div>
                  )}
                </div>

                {/* Overall Reading Progress Bar */}
                <div className="space-y-1.5 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-xs font-bold text-gray-600">
                    <span className="flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5 text-indigo-500" /> Reading Progress ({readCount} of {sectionsCount} Sections)</span>
                    <span className="text-[#4F46E5] font-black">{chapterProgress}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full transition-all duration-700 ease-out relative" style={{ width: `${chapterProgress}%` }}>
                      {chapterProgress >= 100 && <div className="absolute inset-0 bg-white/30 animate-pulse" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Section Nav */}
              {showSectionNav && (
                <div className="sticky top-4 z-30 bg-white/95 backdrop-blur-xl p-3 rounded-2xl border border-indigo-100 shadow-lg flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider shrink-0 mr-1">Jump:</span>
                  {chapterLesson.sections.map((sec, idx) => {
                    const isActive = activeSectionId === sec.id;
                    const isRead = readSections[sec.id];
                    return (
                      <button key={sec.id} onClick={() => handleJumpToSection(sec.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 hover:scale-105 active:scale-95 ${
                          isActive ? "bg-[#4F46E5] text-white shadow-md ring-2 ring-indigo-200" : isRead ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100" : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                        }`}>
                        <span className="text-[10px] font-black opacity-80">{idx + 1}.</span>
                        <span className="max-w-[100px] truncate">{sec.title}</span>
                        {isRead && !isActive && <Check className="h-3 w-3 text-emerald-600" />}
                      </button>
                    );
                  })}
                  <button onClick={() => setShowSectionNav(false)} className="ml-auto p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 shrink-0" title="Hide navigation"><Minimize2 className="h-3.5 w-3.5" /></button>
                </div>
              )}
              {!showSectionNav && (
                <button onClick={() => setShowSectionNav(true)} className="sticky top-4 z-30 bg-white/95 backdrop-blur-xl p-2 rounded-xl border border-indigo-100 shadow-md text-indigo-600 hover:bg-indigo-50 transition-colors"><Maximize2 className="h-4 w-4" /></button>
              )}

              {/* Sections Content */}
              <div className="space-y-12" ref={contentRef}>
                {chapterLesson.sections.map((sec, secIdx) => {
                  const isBookmarked = bookmarkedSections[sec.id];
                  return (
                    <section key={sec.id} id={`section-${sec.id}`} data-section-id={sec.id} className="space-y-6 pt-4 border-b border-gray-100 pb-12 last:border-b-0 scroll-mt-32" style={{ animationDelay: `${secIdx * STAGGER_DELAY}ms` }}>
                      
                      {/* Section Header */}
                      <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-purple-50/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-100/80 group">
                        <div className="flex items-center gap-3">
                          <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-purple-600 text-white text-xs font-black flex items-center justify-center shadow-md">{secIdx + 1}</span>
                          <div>
                            <h3 className="text-base font-black text-gray-900">{sec.title}</h3>
                            <p className="text-[11px] text-gray-500 font-semibold">{sec.topic}{sec.readingTimeMinutes ? ` • ${sec.readingTimeMinutes} min read` : ""}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => toggleBookmark(sec.id)} className={`p-2 rounded-xl transition-all hover:scale-110 active:scale-95 ${isBookmarked ? "bg-amber-50 text-amber-500 border border-amber-200" : "bg-white text-gray-400 border border-gray-200 hover:text-amber-500"}`} title={isBookmarked ? "Remove bookmark" : "Bookmark section"}>
                            {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                          </button>
                          <Badge variant="outline" className="text-[10px] bg-white text-indigo-700 border-indigo-200 font-extrabold">{secIdx + 1} / {sectionsCount}</Badge>
                        </div>
                      </div>

                      {/* Concept Breakdown Card — Pure Textbook Learning Content */}
                      {sec.conceptBreakdown && sec.conceptBreakdown.length > 0 && (
                        <div className="space-y-4 sm:space-y-6">
                          {sec.conceptBreakdown.map((block, bIdx) => {
                            const rawHeading = block.heading || block.title || `Concept ${bIdx + 1}`;
                            const cleanHeading = rawHeading.replace(/^Card\s+\d+(\.\d+)?:?\s*/i, "").trim();
                            const content = block.contentMarkdown || block.content || "";

                            return (
                              <React.Fragment key={bIdx}>
                                <div className="bg-white p-3.5 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-200/80 shadow-2xs space-y-4 sm:space-y-6">
                                  {/* Header Bar */}
                                  <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-dashed border-gray-200">
                                    <div className="flex items-center gap-2.5 sm:gap-3">
                                      <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl bg-indigo-50 border border-indigo-100 text-[#4F46E5] flex items-center justify-center shrink-0">
                                        <Flame className="h-4.5 w-4.5 sm:h-5 sm:w-5 fill-indigo-500/20" />
                                      </div>
                                      <h3 className="text-base sm:text-xl font-black text-[#4F46E5] tracking-tight">
                                        {secIdx + 1}.{bIdx + 1} {cleanHeading}
                                      </h3>
                                    </div>

                                    <button
                                      onClick={() => toggleBookmark(`concept-${sec.id}-${bIdx}`)}
                                      className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-indigo-50/60 border border-indigo-100 text-[#4F46E5] flex items-center justify-center hover:bg-indigo-100 transition-colors"
                                      title="Bookmark Concept"
                                    >
                                      <Bookmark className={`h-4 w-4 sm:h-4.5 sm:w-4.5 ${bookmarkedSections[`concept-${sec.id}-${bIdx}`] ? "fill-[#4F46E5]" : ""}`} />
                                    </button>
                                  </div>

                                  {/* Custom Summary Highlight Box inside Block */}
                                  {block.summaryBox && (
                                    <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#FFFDF0] border border-[#FDE047] flex items-start gap-2.5 sm:gap-3 shadow-2xs">
                                      <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                                        <Lightbulb className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-500/20" />
                                      </div>
                                      <div>
                                        <h5 className="text-xs font-black text-amber-950 uppercase tracking-wider">
                                          {block.summaryBox.title || "Key Takeaway"}
                                        </h5>
                                        <p className="text-xs sm:text-sm font-semibold text-amber-900 leading-relaxed mt-0.5">
                                          {block.summaryBox.takeaway}
                                        </p>
                                      </div>
                                    </div>
                                  )}

                                  {/* Universal Text, Markdown, Math & Table Renderer */}
                                  {content && (
                                    <div className="space-y-4">
                                      <MarkdownContent content={content} />
                                    </div>
                                  )}

                                  {/* Interactive Checkmark List Pills */}
                                  {Array.isArray(block.listPills) && block.listPills.length > 0 && (
                                    <div className="space-y-3 pt-2">
                                      {block.listPills.map((pill: any, pIdx: number) => {
                                        const pillTitle = typeof pill === "string" ? "" : pill.title;
                                        const pillText = typeof pill === "string" ? pill : pill.text;
                                        return (
                                          <CustomListItem key={pIdx}>
                                            {pillTitle && (
                                              <span className="font-black text-[#4F46E5] block mb-0.5">
                                                {pillTitle}
                                              </span>
                                            )}
                                            <span>{pillText}</span>
                                          </CustomListItem>
                                        );
                                      })}
                                    </div>
                                  )}

                                  {/* Visual Diagram Dispatcher Component */}
                                  {(block.codeSnippet || block.asciiDiagram || block.diagramType || block.treeData || block.diagramData) && (
                                    <DiagramRenderer
                                      diagramType={block.diagramType}
                                      diagramData={block.diagramData}
                                      treeData={block.treeData}
                                      codeSnippet={block.codeSnippet}
                                      asciiDiagram={block.asciiDiagram}
                                    />
                                  )}

                                  {/* Interactive Self-Assessment Practice Questions (e.g. in Practice Section) */}
                                  {Array.isArray(block.practiceQuestions) && block.practiceQuestions.length > 0 && (
                                    <div className="space-y-6 pt-4 border-t border-gray-100">
                                      <div className="flex items-center gap-2.5">
                                        <Badge className="bg-[#4F46E5] text-white font-extrabold text-[11px] px-3 py-1 rounded-lg">
                                          Self-Assessment Module
                                        </Badge>
                                        <span className="text-xs text-gray-500 font-bold">
                                          Instant Answer Reveal &amp; Explanations
                                        </span>
                                      </div>

                                      <div className="space-y-6">
                                        {block.practiceQuestions.map((pq: any, pqIdx: number) => {
                                          const isMSQ = pq.questionType === "MSQ";
                                          const selected = practiceAnswers[pq.id];
                                          const isRevealed = practiceRevealed[pq.id];

                                          return (
                                            <div key={pq.id || pqIdx} className="p-5 sm:p-6 rounded-2xl bg-gray-50/80 border border-gray-200/90 space-y-4 shadow-2xs">
                                              <div className="flex items-center justify-between gap-2">
                                                <Badge variant="outline" className="bg-white text-indigo-700 border-indigo-200 text-[10px] font-black">
                                                  {pq.questionType} • Question {pqIdx + 1}
                                                </Badge>
                                                <span className="text-[11px] font-extrabold text-gray-400">NEST Standard</span>
                                              </div>

                                              <p className="text-xs sm:text-sm font-black text-gray-900 leading-relaxed whitespace-pre-line">
                                                {pq.questionText}
                                              </p>

                                              <div className="space-y-2 pt-1">
                                                {pq.options.map((opt: any) => {
                                                  const isOptSelected = isMSQ
                                                    ? Array.isArray(selected) && selected.includes(opt.id)
                                                    : selected === opt.id;

                                                  return (
                                                    <button
                                                      key={opt.id}
                                                      onClick={() => handlePracticeOptionSelect(pq.id, opt.id, isMSQ)}
                                                      className={`w-full p-3.5 rounded-xl text-left border text-xs sm:text-sm font-semibold transition-all flex items-start gap-3 ${
                                                        isOptSelected
                                                          ? "bg-[#EEF2FF] border-[#4F46E5] text-[#4F46E5] font-bold shadow-2xs"
                                                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                                                      }`}
                                                    >
                                                      <span className={`h-5 w-5 rounded-md text-[10px] font-extrabold flex items-center justify-center shrink-0 mt-0.5 ${
                                                        isOptSelected ? "bg-[#4F46E5] text-white" : "bg-gray-100 text-gray-600"
                                                      }`}>
                                                        {isMSQ ? (isOptSelected ? "✓" : "□") : opt.id.toUpperCase()}
                                                      </span>
                                                      <span>{opt.text}</span>
                                                    </button>
                                                  );
                                                })}
                                              </div>

                                              <div className="pt-2 flex items-center justify-between gap-3">
                                                <Button
                                                  size="sm"
                                                  onClick={() => handleTogglePracticeReveal(pq.id)}
                                                  className="h-9 bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold text-xs rounded-xl px-4 shadow-2xs"
                                                >
                                                  {isRevealed ? "Hide Explanation" : "Check Answer & Explanation"}
                                                </Button>
                                              </div>

                                              {isRevealed && (
                                                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs font-semibold text-emerald-950 animate-in fade-in">
                                                  <div className="flex items-center gap-2 text-emerald-800 font-black">
                                                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                                    <span>Correct Answer: {Array.isArray(pq.correctAnswer) ? pq.correctAnswer.join(", ").toUpperCase() : pq.correctAnswer.toUpperCase()}</span>
                                                  </div>
                                                  <p className="leading-relaxed whitespace-pre-line text-emerald-900 font-medium pt-1">
                                                    {pq.explanation}
                                                  </p>
                                                </div>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}

                                  {/* Bullet Points if Array */}
                                  {Array.isArray(block.bulletPoints) && block.bulletPoints.length > 0 && (
                                    <div className="space-y-2 pt-2">
                                      {block.bulletPoints.map((bp: string, bpIdx: number) => (
                                        <div key={bpIdx} className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50/80 border border-gray-100">
                                          <div className="h-5 w-5 rounded-full bg-indigo-100 text-[#4F46E5] flex items-center justify-center shrink-0 mt-0.5">
                                            <Check className="h-3.5 w-3.5 stroke-[3]" />
                                          </div>
                                          <p className="text-xs sm:text-sm text-gray-800 font-semibold leading-relaxed">{bp}</p>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </React.Fragment>
                            );
                          })}
                        </div>
                      )}

                      {/* Images */}
                      {sec.images && sec.images.length > 0 && (
                        <div className="space-y-3">
                          {sec.images.map((img: any, imgIdx: number) => (
                            <div key={imgIdx} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col items-center text-center space-y-2 hover:shadow-md transition-shadow">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={img.src} alt={img.alt || "Diagram"} className="max-h-64 object-contain rounded-xl bg-white" loading="lazy" />
                              {img.caption && <p className="text-[11px] font-semibold text-gray-500 italic">{img.caption}</p>}
                            </div>
                          ))}
                        </div>
                      )}
                    </section>
                  );
                })}

                {/* ═══════ CHAPTER-LEVEL COMMON MISTAKES & MISCONCEPTIONS ═══════ */}
                {chapterLesson.chapterCommonMistakes && chapterLesson.chapterCommonMistakes.length > 0 && (
                  <section id="section-chapter-common-mistakes" className="space-y-4 pt-6 border-t border-gray-200">
                    <div className="p-6 sm:p-7 rounded-3xl bg-[#FEF2F2]/80 border border-rose-200/90 space-y-4 shadow-2xs relative overflow-hidden">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 shadow-2xs">
                          <AlertTriangle className="h-5 w-5 stroke-[2.5]" />
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-black text-rose-950 tracking-tight">
                            Chapter {chapterLesson.chapterNumber || 1} — Common Mistakes &amp; Misconceptions
                          </h4>
                          <p className="text-xs text-rose-700 font-semibold">
                            High-yield pitfalls to avoid in NEST MCQs, MSQs, and statement evaluation questions
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                        {chapterLesson.chapterCommonMistakes.map((mistake: string, mIdx: number) => (
                          <div
                            key={mIdx}
                            className="bg-white p-4 rounded-2xl border border-rose-100 flex items-start gap-3 text-xs text-rose-950 font-semibold leading-relaxed shadow-2xs hover:shadow-xs transition-all"
                          >
                            <div className="h-5 w-5 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs font-bold text-[10px]">
                              ✕
                            </div>
                            <span className="flex-1">{mistake}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* ═══════ CHAPTER-LEVEL KEY TERMS GLOSSARY ═══════ */}
                {chapterLesson.chapterKeyTerms && chapterLesson.chapterKeyTerms.length > 0 && (
                  <section id="section-chapter-key-terms" className="space-y-4 pt-4">
                    <div className="p-6 sm:p-7 rounded-3xl bg-white border border-gray-200/90 space-y-5 shadow-2xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-[#4F46E5] flex items-center justify-center shrink-0 shadow-2xs">
                            <BookMarked className="h-5 w-5 stroke-[2.5]" />
                          </div>
                          <div>
                            <h4 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">
                              Chapter {chapterLesson.chapterNumber || 1} — Key Terms Glossary
                            </h4>
                            <p className="text-xs text-gray-500 font-semibold">
                              Complete master glossary for {chapterLesson.title} terminology
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs bg-indigo-50 text-[#4F46E5] border-indigo-100 font-black self-start sm:self-center">
                          {chapterLesson.chapterKeyTerms.length} Master Terms
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {chapterLesson.chapterKeyTerms.map((kt: { term: string; definition: string }, kIdx: number) => {
                          const themes = [
                            { bg: "bg-purple-50/70", border: "border-purple-100", title: "text-purple-800", icon: BookOpen },
                            { bg: "bg-emerald-50/70", border: "border-emerald-100", title: "text-emerald-800", icon: Zap },
                            { bg: "bg-amber-50/70", border: "border-amber-100", title: "text-amber-800", icon: BookMarked },
                            { bg: "bg-blue-50/70", border: "border-blue-100", title: "text-blue-800", icon: BrainCircuit },
                          ];
                          const theme = themes[kIdx % themes.length];
                          const IconComp = theme.icon;

                          return (
                            <div
                              key={kIdx}
                              className={`p-4 rounded-2xl ${theme.bg} border ${theme.border} space-y-2 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-all`}
                            >
                              <div className="flex items-center justify-between">
                                <h5 className={`text-xs font-black ${theme.title}`}>
                                  {kt.term}
                                </h5>
                                <IconComp className={`h-4 w-4 ${theme.title} opacity-70`} />
                              </div>
                              <p className="text-[11px] text-gray-700 font-medium leading-relaxed">
                                {kt.definition}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                )}
              </div>

              {/* Completion Banner */}
              <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white space-y-4 text-center shadow-xl relative overflow-hidden group">
                <div className="relative z-10 space-y-4">
                  <div className="h-14 w-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-white group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black uppercase tracking-tight">Chapter Learning Complete</h3>
                    <p className="text-xs text-emerald-100 font-medium max-w-md mx-auto">You have covered all <strong>{sectionsCount}</strong> core sections for <strong>Chapter {chapterLesson.chapterNumber} {chapterLesson.title}</strong>. Test your mastery with the official Chapter Quiz.</p>
                  </div>
                  <Button onClick={handleStartQuiz} className="h-12 bg-white hover:bg-emerald-50 text-emerald-900 font-black text-xs rounded-2xl px-8 shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95">
                    <Zap className="h-4 w-4 mr-2" />Start Chapter Quiz ({questionsCount} Questions)<ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* ═══════ VIEW: QUIZ ═══════ */}
          {viewState === "quiz" && chapterLesson.questions && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-2xs space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <Badge variant="outline" className="text-[10px] bg-indigo-50 text-[#4F46E5] border-indigo-100 font-black mb-1">
                    <Target className="h-3 w-3 mr-1 inline" />Chapter {chapterLesson.chapterNumber} Quiz
                  </Badge>
                  <h3 className="text-base font-black text-gray-900">Question {currentQuizIdx + 1} of {questionsCount}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">+4 / -1</span>
                  <button onClick={() => setShowQuizOverview(!showQuizOverview)} className="p-2 rounded-xl bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-colors" title="Question Overview">
                    <BarChart3 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold text-gray-500">
                  <span>{answeredCount} of {questionsCount} answered</span>
                  <span>{Math.round(((currentQuizIdx + 1) / (questionsCount || 1)) * 100)}% complete</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#4F46E5] to-purple-600 rounded-full transition-all duration-500 ease-out" style={{ width: `${((currentQuizIdx + 1) / (questionsCount || 1)) * 100}%` }} />
                </div>
              </div>

              {showQuizOverview && (
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 grid grid-cols-5 sm:grid-cols-10 gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {chapterLesson.questions.map((q, idx) => {
                    const hasAnswer = userAnswers[q.id] !== undefined && userAnswers[q.id] !== null && userAnswers[q.id] !== "";
                    const isFlagged = flaggedQuestions[q.id];
                    const isCurrent = idx === currentQuizIdx;
                    return (
                      <button key={q.id} onClick={() => setCurrentQuizIdx(idx)}
                        className={`h-9 rounded-xl text-xs font-black transition-all hover:scale-110 active:scale-95 ${
                          isCurrent ? "bg-[#4F46E5] text-white shadow-md" : hasAnswer ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : isFlagged ? "bg-amber-100 text-amber-700 border border-amber-200" : "bg-white text-gray-500 border border-gray-200"
                        }`}>
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              )}

              {currentQuestion && (
                <div className="space-y-5 py-2 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider">Topic: <strong className="text-indigo-600">{currentQuestion.topic}</strong></span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] font-extrabold bg-gray-50 text-gray-700">{currentQuestion.questionType} {currentQuestion.difficulty}</Badge>
                      <button onClick={() => toggleFlagQuestion(currentQuestion.id)} className={`p-1.5 rounded-lg transition-colors ${flaggedQuestions[currentQuestion.id] ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-400 hover:text-amber-500"}`} title="Flag for review">
                        <Bookmark className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-gray-50/50 border border-gray-100">
                    <p className="text-sm sm:text-base font-bold text-gray-900 leading-relaxed whitespace-pre-line">{currentQuestion.questionText}</p>
                  </div>

                  {isCurrentMSQ && (
                    <div className="flex items-center gap-2 text-[11px] font-extrabold text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                      <AlertCircle className="h-4 w-4 shrink-0" />Select ALL correct options. Multiple options may be correct.
                    </div>
                  )}

                  <div className="space-y-3 pt-2">
                    {currentQuestion.options?.map((opt) => {
                      const isSelected = isCurrentMSQ
                        ? Array.isArray(userAnswers[currentQuestion.id]) && userAnswers[currentQuestion.id].includes(opt.id)
                        : userAnswers[currentQuestion.id] === opt.id;
                      return (
                        <button key={opt.id} onClick={() => handleSelectOption(currentQuestion.id, opt.id, isCurrentMSQ)}
                          className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex items-start gap-3 group hover:shadow-md ${
                            isSelected ? "bg-[#EEF2FF] border-[#4F46E5] text-[#4F46E5] font-bold shadow-sm" : "bg-white border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50/80"
                          }`}>
                          <span className={`h-7 w-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 mt-0.5 transition-all ${isSelected ? "bg-[#4F46E5] text-white scale-110" : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"}`}>
                            {isCurrentMSQ ? (isSelected ? <Check className="h-4 w-4" /> : <Square className="h-4 w-4" />) : (isSelected ? <CircleDot className="h-4 w-4" /> : <Circle className="h-4 w-4" />)}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold leading-relaxed pt-0.5">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                <Button variant="outline" disabled={currentQuizIdx === 0} onClick={() => handleQuizNavigate(-1)} className="h-10 text-xs font-bold rounded-xl disabled:opacity-40">
                  <ArrowLeft className="h-4 w-4 mr-1.5" /> Previous
                </Button>
                <div className="flex items-center gap-1.5">
                  {chapterLesson.questions.map((_, idx) => (
                    <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentQuizIdx ? "w-6 bg-[#4F46E5]" : idx < currentQuizIdx ? "w-1.5 bg-indigo-300" : "w-1.5 bg-gray-200"}`} />
                  ))}
                </div>
                {currentQuizIdx < questionsCount - 1 ? (
                  <Button onClick={() => handleQuizNavigate(1)} className="h-10 bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold text-xs rounded-xl px-5 shadow-sm hover:shadow-md transition-all">
                    Next <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmitQuiz} className="h-10 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl px-6 shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95">
                    Submit Quiz <CheckCircle2 className="h-4 w-4 ml-1.5" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* ═══════ VIEW: RESULTS ═══════ */}
          {viewState === "results" && quizResults && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-2xs space-y-6">
              {/* Results Hero */}
              <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl space-y-5 shadow-xl text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.3),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(79,70,229,0.3),transparent_50%)]" />
                <div className="relative z-10 flex flex-col items-center space-y-4">
                  <div className="h-14 w-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                    <Trophy className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <Badge variant="outline" className="text-[10px] bg-white/10 text-indigo-200 border-white/20 font-black">Chapter {chapterLesson.chapterNumber} Quiz Performance</Badge>
                    <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">{chapterLesson.title}</h2>
                  </div>
                  <CircularProgress percentage={Math.round((quizResults.totalScore / (quizResults.maxMarks || 1)) * 100)} size={140} strokeWidth={10} color={quizResults.accuracy >= 70 ? "#10B981" : quizResults.accuracy >= 40 ? "#F59E0B" : "#EF4444"}>
                    <div className="text-center">
                      <span className="text-3xl font-black text-white">{quizResults.totalScore}</span>
                      <span className="text-sm text-indigo-200 block">/ {quizResults.maxMarks}</span>
                    </div>
                  </CircularProgress>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl w-full pt-2">
                    <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-2xl border border-white/15 text-center hover:bg-white/15 transition-colors">
                      <span className="text-[10px] font-black text-indigo-200 uppercase tracking-wider block">Accuracy</span>
                      <span className={`text-xl font-black ${quizResults.accuracy >= 70 ? "text-emerald-300" : "text-amber-300"}`}>{quizResults.accuracy}%</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-2xl border border-white/15 text-center hover:bg-white/15 transition-colors">
                      <span className="text-[10px] font-black text-indigo-200 uppercase tracking-wider block">Correct</span>
                      <span className="text-xl font-black text-emerald-400">{quizResults.correctCount}</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-2xl border border-white/15 text-center hover:bg-white/15 transition-colors">
                      <span className="text-[10px] font-black text-indigo-200 uppercase tracking-wider block">Incorrect</span>
                      <span className="text-xl font-black text-rose-300">{quizResults.incorrectCount}</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-2xl border border-white/15 text-center hover:bg-white/15 transition-colors">
                      <span className="text-[10px] font-black text-indigo-200 uppercase tracking-wider block">Time</span>
                      <span className="text-xl font-black text-white">{formatTime(quizResults.timeTaken || 0)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Message */}
              <div className={`p-4 rounded-2xl border text-center space-y-1 ${quizResults.accuracy >= 80 ? "bg-emerald-50 border-emerald-200 text-emerald-900" : quizResults.accuracy >= 60 ? "bg-amber-50 border-amber-200 text-amber-900" : "bg-rose-50 border-rose-200 text-rose-900"}`}>
                <p className="text-sm font-black">
                  {quizResults.accuracy >= 80 ? "Outstanding! You have mastered this chapter." : quizResults.accuracy >= 60 ? "Good effort! Review the weak topics below." : "Keep learning! Re-read the chapter and try again."}
                </p>
              </div>

              {/* Topic Breakdown */}
              <div className="space-y-3 bg-slate-50 p-6 rounded-3xl border border-gray-200/80">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider flex items-center gap-2"><Target className="h-4 w-4 text-[#4F46E5]" /> Topic Performance Breakdown</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quizResults.topicPerformance.map((tp, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-gray-900">{tp.topic}</h4>
                        <span className={`text-xs font-black ${tp.accuracy >= 70 ? "text-emerald-600" : "text-rose-600"}`}>{tp.accuracy}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-1000 ease-out ${tp.accuracy >= 70 ? "bg-emerald-500" : tp.accuracy >= 40 ? "bg-amber-500" : "bg-rose-500"}`} style={{ width: `${tp.accuracy}%`, transitionDelay: `${idx * 100}ms` }} />
                      </div>
                      <p className="text-[10px] text-gray-500 font-medium">{tp.correct} of {tp.total} correct</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weak Topics */}
              {quizResults.topicPerformance.some((tp) => tp.isWeak) && (
                <div className="p-5 rounded-3xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-rose-950"><AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" /> Topics Needing Review</div>
                  <div className="flex flex-wrap gap-2">
                    {quizResults.topicPerformance.filter((tp) => tp.isWeak).map((tp, idx) => (
                      <span key={idx} className="text-xs font-extrabold text-rose-900 bg-white border border-rose-200 px-3 py-1 rounded-xl">{tp.topic} ({tp.accuracy}% Accuracy)</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="outline" onClick={() => { setViewState("reading"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="h-10 text-xs font-bold rounded-xl"><RotateCcw className="h-4 w-4 mr-1.5" /> Re-read Chapter</Button>
                  <Button variant="outline" onClick={() => handleStartQuiz()} className="h-10 text-xs font-bold rounded-xl text-indigo-700 border-indigo-200 bg-indigo-50/50">Retake Quiz</Button>
                </div>
                {chapterLesson.nextChapter ? (
                  <Button onClick={() => setNextChapterModal(true)} className="h-11 bg-[#4F46E5] hover:bg-indigo-700 text-white font-black text-xs rounded-xl px-6 shadow-md transition-all flex items-center gap-2 hover:scale-105 active:scale-95">
                    <span>Continue to Chapter {chapterLesson.nextChapter.chapterNumber}: {chapterLesson.nextChapter.title}</span><ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={onClose} className="h-11 bg-[#4F46E5] hover:bg-indigo-700 text-white font-black text-xs rounded-xl px-6 shadow-md transition-all flex items-center gap-2 hover:scale-105 active:scale-95">
                    <span>Return to Smart Lessons</span><CheckCircle2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {nextChapterModal && chapterLesson.nextChapter && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-2 animate-in fade-in">
                  <p className="text-xs font-bold text-amber-900">
                    Chapter {chapterLesson.nextChapter.chapterNumber}: {chapterLesson.nextChapter.title} is coming next in your NEST syllabus plan!
                  </p>
                  <Button size="sm" onClick={() => setNextChapterModal(false)} className="h-8 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg px-4">Close Notification</Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN — SIDEBAR (Hidden on Half-Screen PC / <1280px screens) */}
        <div className="hidden xl:block xl:col-span-4 space-y-6">

          {/* Chapter Outline */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-2xs space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-gray-900">Chapter Outline</h3>
              <span className="text-xs font-bold text-indigo-600">{readCount} / {sectionsCount} Read</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-600">Chapter Reading Progress</span>
                <span className="font-extrabold text-indigo-600">{chapterProgress}%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full transition-all duration-500" style={{ width: `${chapterProgress}%` }} />
              </div>
            </div>
            <div className="relative pl-3 space-y-3.5 before:absolute before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-100">
              {chapterLesson.sections.map((sec, idx) => {
                const isActive = activeSectionId === sec.id;
                const isRead = readSections[sec.id];
                return (
                  <button key={sec.id} onClick={() => { if (viewState !== "reading") setViewState("reading"); handleJumpToSection(sec.id); }} className="relative w-full flex items-start gap-3.5 text-left group">
                    <div className={`relative z-10 flex items-center justify-center h-6 w-6 rounded-full text-xs font-extrabold shrink-0 transition-all ${
                      isRead ? "bg-emerald-500 text-white shadow-xs" : isActive ? "bg-indigo-600 text-white ring-4 ring-indigo-50" : "bg-gray-100 text-gray-500"
                    }`}>
                      {isRead ? <CheckCircle2 className="h-4 w-4" /> : <span>{idx + 1}</span>}
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <span className={`text-xs font-bold block leading-snug transition-colors ${isActive ? "text-indigo-600 font-black" : isRead ? "text-gray-900 group-hover:text-indigo-600" : "text-gray-600 group-hover:text-gray-900"}`}>
                        {idx + 1}. {sec.title}
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium block mt-0.5">{sec.readingTimeMinutes} mins</span>
                    </div>
                    {isRead && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quiz CTA */}
          <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-6 text-white space-y-4 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 space-y-1">
              <span className="text-[10px] font-black text-indigo-200 uppercase tracking-wider block">Assessment</span>
              <h4 className="text-base font-black text-white leading-tight">Chapter {chapterLesson.chapterNumber} Quiz</h4>
              <p className="text-xs text-indigo-100/90 font-medium">{questionsCount} NEST-pattern questions (+4 / -1 marking)</p>
            </div>
            <Button onClick={handleStartQuiz} className="w-full h-10 bg-white hover:bg-indigo-50 text-indigo-950 font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95">
              <span>{viewState === "quiz" ? "Resume Quiz" : "Take Chapter Quiz"}</span><ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-2xs space-y-4">
            <h3 className="text-base font-extrabold text-gray-900">Quick Actions</h3>
            <div className="space-y-2">
              <button onClick={() => window.print()} className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gray-50/80 hover:bg-indigo-50/60 border border-gray-100 hover:border-indigo-100 transition-all group text-left">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-indigo-100/70 border border-indigo-200/60 flex items-center justify-center text-indigo-600 shrink-0"><FileText className="h-4.5 w-4.5" /></div>
                  <div>
                    <span className="text-xs font-extrabold text-gray-900 group-hover:text-indigo-600 block leading-tight">Print / Export Chapter</span>
                    <span className="text-[11px] text-gray-400 font-medium block">Save complete chapter PDF</span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
              <button onClick={onClose} className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gray-50/80 hover:bg-indigo-50/60 border border-gray-100 hover:border-indigo-100 transition-all group text-left">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-indigo-100/70 border border-indigo-200/60 flex items-center justify-center text-indigo-600 shrink-0"><BookOpen className="h-4.5 w-4.5" /></div>
                  <div>
                    <span className="text-xs font-extrabold text-gray-900 group-hover:text-indigo-600 block leading-tight">Return to Smart Lessons</span>
                    <span className="text-[11px] text-gray-400 font-medium block">Browse all NEST chapters</span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            </div>
          </div>

          {/* Need Help */}
          <div className="bg-gradient-to-br from-indigo-50/90 via-indigo-50/50 to-purple-50/80 rounded-3xl p-6 border border-indigo-100/80 shadow-2xs space-y-3 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-100/50 rounded-full" />
            <div className="space-y-1 relative z-10">
              <h4 className="text-sm font-extrabold text-gray-900">Need Help?</h4>
              <p className="text-xs text-gray-500 font-medium">Struggling with {chapterLesson.title}?</p>
            </div>
            <button onClick={() => alert(`SciPrep AI Doubt Assistant is available 24/7 for ${chapterLesson.title} concepts.`)} className="relative z-10 w-full py-2.5 px-4 rounded-xl bg-white hover:bg-indigo-50 border border-indigo-200 text-indigo-600 font-extrabold text-xs flex items-center justify-center gap-2 shadow-2xs transition-all hover:scale-105 active:scale-95">
              <MessageSquare className="h-3.5 w-3.5 text-indigo-600" /><span>Ask AI Doubt Assistant</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
