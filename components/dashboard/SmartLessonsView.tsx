"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Search,
  PlayCircle,
  ArrowLeft,
  Check,
  Flame,
  ChevronDown,
  ChevronUp,
  Info,
  Zap,
  FolderTree,
  LayoutGrid,
  BookMarked,
  Lock,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { isPro } from "@/lib/auth/authGuard";
import { UpgradeModal } from "@/components/shared/UpgradeModal";
import { SubjectScore } from "@/lib/types/dashboard";
import {
  ContentLesson,
  FlatSyllabusChapter,
  GroupedSyllabusUnit,
} from "@/lib/types/content";
import { lessonProgressService, StudentLessonProgress } from "@/lib/services/lessonProgress.service";
import { LessonReaderErrorBoundary } from "@/components/lesson-reader/LessonReaderErrorBoundary";
import { SidebarLesson } from "@/lib/types/lesson-reader";

import { SmartChapterLessonReader } from "@/components/dashboard/SmartChapterLessonReader";
import SetsMathematicsPremium from "@/components/dashboard/SetsMathematicsPremium";
import RelationsAndFunctionsDiagram from "@/components/dashboard/RelationsAndFunctionsDiagram";

interface SmartLessonsViewProps {
  subjects?: SubjectScore[];
  onBackToDashboard: () => void;
  onStartAssessment?: () => void;
}

export function SmartLessonsView({
  onBackToDashboard,
}: SmartLessonsViewProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("All Statuses");
  const [viewMode, setViewMode] = useState<"units" | "flat">("units");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({});
  const [activeLesson, setActiveLesson] = useState<ContentLesson | null>(null);
  const [activeChapterSlug, setActiveChapterSlug] = useState<string | null>(null);
  const [activeChapterSubject, setActiveChapterSubject] = useState<string>("Biology");

  const [syllabusChapters, setSyllabusChapters] = useState<FlatSyllabusChapter[]>([]);
  const [syllabusUnits, setSyllabusUnits] = useState<GroupedSyllabusUnit[]>([]);
  const [lessons, setLessons] = useState<ContentLesson[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, StudentLessonProgress>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  // SciPrep PRO Gating State
  const [isProUser, setIsProUser] = useState<boolean>(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState<boolean>(false);
  const [upgradeContext, setUpgradeContext] = useState<{ title: string; desc: string }>({
    title: "Unlock Full Smart Lessons Archive",
    desc: "Free tier includes 1 Free Smart Lesson per subject. Upgrade to SciPrep PRO to unlock all 100+ chapter smart notes, high-yield interactive diagrams, and concept quizzes."
  });

  useEffect(() => {
    setIsProUser(isPro());
    const handlePlanUpdate = () => {
      setIsProUser(isPro());
    };
    window.addEventListener("nest_plan_updated", handlePlanUpdate);
    return () => window.removeEventListener("nest_plan_updated", handlePlanUpdate);
  }, []);

  const refreshProgressOnly = useCallback(() => {
    const loadedProgress = lessonProgressService.getAllLessonProgress();
    setProgressMap(loadedProgress);
  }, []);

  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [syllabusRes, lessonsRes] = await Promise.all([
        fetch("/api/content/syllabus"),
        fetch("/api/content/lessons"),
      ]);

      if (syllabusRes.ok) {
        const data = await syllabusRes.json();
        setSyllabusChapters(data.syllabus || []);
        setSyllabusUnits(data.units || []);

        // Expand first unit by default for quick access
        if (data.units && data.units.length > 0) {
          setExpandedUnits({ [data.units[0].id]: true });
        }
      } else {
        setNoticeMessage("Unable to load NEST syllabus structure. Please refresh the page.");
      }

      if (lessonsRes.ok) {
        const data = await lessonsRes.json();
        setLessons(data.lessons || []);
      }
    } catch (err) {
      console.error("[SmartLessonsView] Error fetching data:", err);
      setNoticeMessage("Error connecting to NEST content API. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
    refreshProgressOnly();
  }, [refreshProgressOnly]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Helper to find all populated lesson content modules matching a syllabus chapter
  const findAllMatchingLessons = (chapter: FlatSyllabusChapter): ContentLesson[] => {
    return lessons
      .filter(
        (l) =>
          (l.chapterSlug && l.chapterSlug.toLowerCase() === chapter.slug.toLowerCase()) ||
          (l.slug && l.slug.toLowerCase() === chapter.slug.toLowerCase()) ||
          (l.chapter && l.chapter.toLowerCase() === chapter.chapterTitle.toLowerCase()) ||
          (l.topic && l.topic.toLowerCase() === chapter.chapterTitle.toLowerCase())
      )
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  };

  const findMatchingLesson = (chapter: FlatSyllabusChapter): ContentLesson | null => {
    if (
      chapter.slug === "sets" ||
      (chapter.subject.toLowerCase() === "mathematics" && chapter.chapterNumber === 1 && chapter.classLevel === "Class XI")
    ) {
      return {
        id: "math-sets-chapter-001",
        chapterNumber: 1,
        unitNumber: 1,
        slug: "sets",
        chapterSlug: "sets",
        title: "Sets",
        topic: "Axiomatic Foundations & Set Representations",
        subject: "Mathematics",
        classLevel: "Class XI",
        status: "published",
        estimatedTimeMinutes: 45,
        quickSummary: "From Zermelo-Fraenkel foundations to the Principle of Inclusion-Exclusion.",
      } as any;
    }
    if (
      chapter.slug === "relations-and-functions" ||
      chapter.slug === "relations-functions" ||
      (chapter.subject.toLowerCase() === "mathematics" && chapter.chapterNumber === 2 && chapter.classLevel === "Class XI")
    ) {
      return {
        id: "math-relations-functions-chapter-002",
        chapterNumber: 2,
        unitNumber: 1,
        slug: "relations-and-functions",
        chapterSlug: "relations-and-functions",
        title: "Relations and Functions",
        topic: "Cartesian Products & Binary Relations",
        subject: "Mathematics",
        classLevel: "Class XI",
        status: "published",
        estimatedTimeMinutes: 45,
        quickSummary: "From Kuratowski pairs to domain, range, and standard function catalogs.",
      } as any;
    }
    const all = findAllMatchingLessons(chapter);
    return all.length > 0 ? all[0] : null;
  };

  // Filter syllabus chapters
  const filteredChapters = syllabusChapters.filter((chapter) => {
    const matchesSubject =
      selectedSubject === "All" || chapter.subject.toLowerCase() === selectedSubject.toLowerCase();

    const matchingLesson = findMatchingLesson(chapter);
    const p = matchingLesson ? progressMap[matchingLesson.id] : null;
    const isCompleted = p?.completed || (p?.progressPercent || 0) >= 100;
    const isInProgress = p && p.progressPercent > 0 && !isCompleted;
    const isNotStarted = !p || p.progressPercent === 0;

    let matchesStatus = true;
    if (selectedStatusFilter === "Class XI") matchesStatus = chapter.classLevel === "Class XI";
    else if (selectedStatusFilter === "Class XII") matchesStatus = chapter.classLevel === "Class XII";
    else if (selectedStatusFilter === "Ready Lessons") matchesStatus = matchingLesson !== null;
    else if (selectedStatusFilter === "Completed") matchesStatus = isCompleted;
    else if (selectedStatusFilter === "In Progress") matchesStatus = Boolean(isInProgress);
    else if (selectedStatusFilter === "Not Started") matchesStatus = Boolean(isNotStarted);

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      chapter.chapterTitle.toLowerCase().includes(query) ||
      chapter.unitTitle.toLowerCase().includes(query) ||
      chapter.subject.toLowerCase().includes(query) ||
      chapter.classLevel.toLowerCase().includes(query) ||
      chapter.topics.some((t) => t.toLowerCase().includes(query));

    return matchesSubject && matchesStatus && matchesSearch;
  });

  // Group filtered chapters by Unit
  const filteredUnits = syllabusUnits
    .map((unit) => {
      const unitChapters = unit.chapters.filter((ch) =>
        filteredChapters.some((fc) => fc.id === ch.id)
      );
      return { ...unit, chapters: unitChapters };
    })
    .filter((unit) => unit.chapters.length > 0);

  const getSubjectBadgeStyle = (subj: string) => {
    switch (subj.toLowerCase()) {
      case "physics":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";
      case "chemistry":
        return "bg-indigo-50 text-[#4F46E5] border-indigo-200";
      case "biology":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "mathematics":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getProgressStatus = (chapter: FlatSyllabusChapter) => {
    const matchingLesson = findMatchingLesson(chapter);
    if (!matchingLesson) {
      return { status: "Coming Soon", percent: 0, completed: false, hasContent: false, matchingLesson: null };
    }

    const p = progressMap[matchingLesson.id];
    if (!p || p.progressPercent === 0) {
      return { status: "Not Started", percent: 0, completed: false, hasContent: true, matchingLesson };
    }
    if (p.completed || p.progressPercent >= 100) {
      return { status: "Completed", percent: 100, completed: true, hasContent: true, matchingLesson };
    }
    return { status: "In Progress", percent: p.progressPercent, completed: false, hasContent: true, matchingLesson };
  };

  const totalSyllabusChapters = syllabusChapters.length;
  const readyLessonsCount = syllabusChapters.filter((c) => findMatchingLesson(c) !== null).length;

  const completedLessonsCount = useMemo(() => {
    const fromChapters = syllabusChapters.filter((c) => {
      const matchingLesson = findMatchingLesson(c);
      const prog =
        (matchingLesson && progressMap[matchingLesson.id]) ||
        (c.slug && progressMap[c.slug]) ||
        (matchingLesson?.chapterSlug && progressMap[matchingLesson.chapterSlug]) ||
        null;
      if (!prog || typeof prog !== "object") return false;
      return prog.completed === true || (prog.progressPercent ?? 0) >= 100;
    }).length;

    const fromDirectMap = Object.values(progressMap).filter(
      (p) => p && typeof p === "object" && (p.completed === true || (p.progressPercent ?? 0) >= 100)
    ).length;

    return Math.max(fromChapters, fromDirectMap);
  }, [syllabusChapters, progressMap]);

  // Diagnostic priority chapter (e.g. Chapter 1 in Biology or first filtered chapter)
  const diagnosticChapter =
    syllabusChapters.find((c) => c.subject === "Biology" && c.chapterNumber === 1) ||
    filteredChapters[0] ||
    syllabusChapters[0];

  const isChapterFree = (chapter: FlatSyllabusChapter) => {
    return Number(chapter.unitNumber) === 1 && Number(chapter.chapterNumber) === 1 && chapter.classLevel === "Class XI";
  };

  const handleStartChapter = (chapter: FlatSyllabusChapter, forceLock?: boolean) => {
    const isLocked = forceLock ?? (!isProUser && !isChapterFree(chapter));

    if (isLocked) {
      setUpgradeContext({
        title: `Unlock Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle}`,
        desc: `Only Unit 1 Chapter 1 is available on the Free plan. Upgrade to SciPrep PRO to unlock "${chapter.chapterTitle}" (${chapter.subject} • ${chapter.classLevel}) and all 100+ chapter smart notes, diagrams, and quizzes.`
      });
      setUpgradeModalOpen(true);
      return;
    }

    const matchingLesson = findMatchingLesson(chapter);
    const targetSlug = chapter.slug || matchingLesson?.chapterSlug || matchingLesson?.slug;

    if (targetSlug) {
      setActiveChapterSubject(chapter.subject || matchingLesson?.subject || "Biology");
      setActiveChapterSlug(targetSlug);
      return;
    }

    if (matchingLesson) {
      setActiveLesson(matchingLesson);
    } else {
      setNoticeMessage(
        `Detailed lesson content for "${chapter.chapterTitle}" (${chapter.subject} • ${chapter.classLevel}) is being prepared according to the NEST 2026 syllabus structure.`
      );
      setTimeout(() => setNoticeMessage(null), 5000);
    }
  };

  const toggleUnitExpand = (unitId: string) => {
    setExpandedUnits((prev) => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  // Render Single Unified Chapter Reader if active
  if (activeChapterSlug) {
    return (
      <SmartChapterLessonReader
        chapterSlug={activeChapterSlug}
        subject={activeChapterSubject}
        onClose={() => setActiveChapterSlug(null)}
        onProgressUpdate={refreshProgressOnly}
      />
    );
  }

  // If a lesson is active, render the Topic View UI directly
  if (activeLesson) {
    const chapterModules = lessons
      .filter((l) =>
        l.chapterSlug && activeLesson.chapterSlug
          ? l.chapterSlug.toLowerCase() === activeLesson.chapterSlug.toLowerCase()
          : l.subject === activeLesson.subject && l.classLevel === activeLesson.classLevel
      )
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return (
      <LessonReaderErrorBoundary
        lesson={activeLesson}
        chapterLessons={chapterModules.map((l): SidebarLesson => {
          const prog = progressMap[l.id];
          return {
            id: l.id,
            title: l.title || l.chapter || "",
            order: l.order ?? 1,
            estimatedMinutes: l.estimatedTimeMinutes || l.readingTimeMinutes,
            status:
              l.id === activeLesson.id
                ? "current"
                : prog?.completed || (prog?.progressPercent ?? 0) >= 100
                ? "completed"
                : "available",
          };
        })}
        onClose={() => setActiveLesson(null)}
        onProgressUpdate={refreshData}
        onNavigateLesson={(lessonId) => {
          const target = lessons.find((l) => l.id === lessonId);
          if (target) setActiveLesson(target);
        }}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Notice Alert Box */}
      {noticeMessage && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center justify-between shadow-2xs animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-amber-600 shrink-0" />
            <span>{noticeMessage}</span>
          </div>
          <button suppressHydrationWarning
            onClick={() => setNoticeMessage(null)}
            className="text-amber-600 hover:text-amber-800 text-xs font-extrabold ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Header Card */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-gray-100 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#4F46E5]">
                <BookOpen className="h-4 w-4" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Smart Lessons Hub
              </h1>
              <Badge variant="outline" className="bg-indigo-50 text-[#4F46E5] border-indigo-100 font-extrabold px-2.5 py-0.5 rounded-md text-[10px]">
                NEST High-Yield
              </Badge>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Concept modules with diagnostic breakdowns, formula blueprints, and targeted practice for NISER & UM-DAE CEBS syllabus.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onBackToDashboard}
            className="self-start sm:self-center h-9 px-3.5 text-gray-700 hover:bg-gray-50 border-gray-200 font-bold text-xs rounded-xl"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5" /> Back to Dashboard
          </Button>
        </div>

        {/* 4 Stat Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Card 1 */}
          <div className="bg-[#F9FAFB] p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-0.5">
                TOTAL MODULES
              </span>
              <span className="text-lg font-black text-gray-900">{totalSyllabusChapters} Topics</span>
            </div>
            <div className="h-9 w-9 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center text-indigo-500 shadow-2xs">
              <BookOpen className="h-4.5 w-4.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider block mb-0.5">
                LESSONS COMPLETED
              </span>
              <span className="text-lg font-black text-emerald-800">{completedLessonsCount} Completed</span>
            </div>
            <div className="h-9 w-9 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-2xs">
              <CheckCircle2 className="h-4.5 w-4.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black text-rose-600 uppercase tracking-wider block mb-0.5">
                SYLLABUS SCOPE
              </span>
              <span className="text-lg font-black text-rose-800">4 Subjects</span>
            </div>
            <div className="h-9 w-9 rounded-xl bg-white border border-rose-200 flex items-center justify-center text-rose-500 shadow-2xs">
              <Flame className="h-4.5 w-4.5" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-indigo-50/40 p-4 rounded-2xl border border-indigo-100/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black text-[#4F46E5] uppercase tracking-wider block mb-0.5">
                AVG STUDY TIME
              </span>
              <span className="text-lg font-black text-indigo-950">~15 min / lesson</span>
            </div>
            <div className="h-9 w-9 rounded-xl bg-white border border-indigo-200 flex items-center justify-center text-[#4F46E5] shadow-2xs">
              <Clock className="h-4.5 w-4.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostic Priority Card Section */}
      {diagnosticChapter && (
        <div className="bg-[#F5F3FF] border border-[#DDD6FE] p-5 sm:p-6 rounded-3xl shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-[#4F46E5] text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-md flex items-center gap-1">
                <Zap className="h-3 w-3" /> Diagnostic Priority #1
              </Badge>
              <Badge variant="outline" className="bg-white text-gray-700 border-indigo-200 font-extrabold text-[10px] px-2.5 py-0.5 rounded-md">
                {diagnosticChapter.subject}
              </Badge>
              <span className="text-[11px] font-extrabold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                Recommended for NEST 2026 Core Foundation
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-gray-900">
              Chapter {diagnosticChapter.chapterNumber}: {diagnosticChapter.chapterTitle}
            </h3>

            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Key concepts: {diagnosticChapter.topics.slice(0, 3).join(" • ")}
            </p>
          </div>

          <Button
            onClick={() => handleStartChapter(diagnosticChapter)}
            className="shrink-0 h-10 px-5 bg-[#4F46E5] hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-xs transition-all"
          >
            Start Smart Lesson <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Filter, View Switcher & Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
        {/* Subject Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {["All", "Physics", "Chemistry", "Biology", "Mathematics"].map((subj) => {
            const isSelected = selectedSubject.toLowerCase() === subj.toLowerCase();
            return (
              <button suppressHydrationWarning
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all shrink-0 ${
                  isSelected
                    ? "bg-[#4F46E5] text-white shadow-xs"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {subj}
              </button>
            );
          })}
        </div>

        {/* Right Search Input, View Mode Toggle & Status Filter */}
        <div className="flex flex-wrap md:flex-nowrap items-center gap-2.5 w-full md:w-auto">
          {/* View Mode Toggle Switcher */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button suppressHydrationWarning
              onClick={() => setViewMode("units")}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                viewMode === "units"
                  ? "bg-white text-gray-900 shadow-2xs border border-gray-200"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              title="Group chapters neatly by syllabus units"
            >
              <FolderTree className="h-3.5 w-3.5 text-[#4F46E5]" />
              <span>By Units</span>
            </button>
            <button suppressHydrationWarning
              onClick={() => setViewMode("flat")}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                viewMode === "flat"
                  ? "bg-white text-gray-900 shadow-2xs border border-gray-200"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              title="Display all chapters in a flat list"
            >
              <LayoutGrid className="h-3.5 w-3.5 text-gray-500" />
              <span>All Chapters</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input suppressHydrationWarning
              type="text"
              placeholder="Search topics or concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] font-medium"
            />
          </div>

          {/* Status / Class Filter Dropdown */}
          <div className="relative shrink-0">
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-200 rounded-xl pl-3 pr-8 py-1.5 text-xs text-gray-700 font-bold focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 cursor-pointer"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Class XI">Class XI</option>
              <option value="Class XII">Class XII</option>
              <option value="Ready Lessons">Lessons Ready</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Not Started">Not Started</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs space-y-4 animate-pulse">
              <div className="h-4 w-28 bg-gray-100 rounded-md" />
              <div className="h-5 w-3/4 bg-gray-200 rounded-md" />
              <div className="h-10 w-full bg-gray-100 rounded-md" />
              <div className="h-9 w-full bg-gray-200 rounded-xl" />
            </div>
          ))}
        </div>
      ) : filteredChapters.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-4 shadow-2xs">
          <div className="h-14 w-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto text-gray-400">
            <BookOpen className="h-7 w-7" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-base font-extrabold text-gray-900">
              No Syllabus Chapters Found
            </h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              No chapters match your filter criteria for <strong>{selectedSubject}</strong> ({selectedStatusFilter}). Try clearing your search query or changing filters.
            </p>
          </div>
        </div>
      ) : viewMode === "units" ? (
        /* MODE 1: Grouped Unit Cards with Accordion Expanders */
        <div className="space-y-5">
          {filteredUnits.map((unit) => {
            const isExpanded = expandedUnits[unit.id] ?? false;
            const readyInUnit = unit.chapters.filter((c) => findMatchingLesson(c) !== null).length;

            return (
              <div
                key={unit.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-2xs overflow-hidden transition-all duration-200"
              >
                {/* Unit Header Bar (Clickable to Expand/Collapse) */}
                <div
                  onClick={() => toggleUnitExpand(unit.id)}
                  className="p-5 sm:p-6 bg-gradient-to-r from-gray-50/80 via-white to-gray-50/50 hover:bg-gray-100/50 cursor-pointer flex items-center justify-between gap-4 border-b border-gray-100"
                >
                  <div className="space-y-1 max-w-3xl">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border ${getSubjectBadgeStyle(
                          unit.subject
                        )}`}
                      >
                        {unit.subject} • {unit.classLevel}
                      </span>
                      <span className="text-[11px] font-extrabold text-[#4F46E5] bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <BookMarked className="h-3 w-3" /> Unit {unit.unitNumber}
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">
                      Unit {unit.unitNumber} — {unit.unitTitle}
                    </h2>

                    <div className="flex items-center gap-3 text-xs text-gray-500 font-semibold pt-0.5">
                      <span>{unit.chapters.length} Chapters</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {readyInUnit} {readyInUnit === 1 ? "Lesson Ready" : "Lessons Ready"}
                      </span>
                    </div>
                  </div>

                  {/* Expand Chevron Icon Button */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline text-xs font-bold text-gray-500">
                      {isExpanded ? "Hide Chapters" : "View Chapters"}
                    </span>
                    <div className="h-9 w-9 rounded-xl bg-white border border-gray-200 shadow-2xs flex items-center justify-center text-gray-600">
                      {isExpanded ? (
                        <ChevronUp className="h-4.5 w-4.5 text-[#4F46E5]" />
                      ) : (
                        <ChevronDown className="h-4.5 w-4.5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Unit Chapters Grid */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 bg-gray-50/40 border-t border-gray-100/60">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {unit.chapters.map((chapter) => {
                        const matchingModules = findAllMatchingLessons(chapter);
                        const { status, percent, completed, hasContent } = getProgressStatus(chapter);
                        const isFree = isChapterFree(chapter);
                        const isLocked = !isProUser && !isFree;

                        return (
                          <div
                            key={chapter.id}
                            className={`bg-white rounded-2xl p-5 border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group ${
                              isLocked
                                ? "border-amber-200/80 bg-gradient-to-b from-white to-amber-50/20"
                                : "border-gray-100"
                            }`}
                          >
                            <div className="space-y-3">
                              {/* Chapter Header */}
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">
                                  Chapter {chapter.chapterNumber}
                                </span>

                                {isLocked ? (
                                  <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-[9px] px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                                    <Lock className="h-2.5 w-2.5" /> PRO LESSON
                                  </Badge>
                                ) : isFree ? (
                                  <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold text-[9px] px-2 py-0.5 rounded-md">
                                    FREE SAMPLE
                                  </Badge>
                                ) : !hasContent ? (
                                  <span className="text-[9px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-md border border-amber-200">
                                    Coming Soon
                                  </span>
                                ) : completed ? (
                                  <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3" /> Completed
                                  </span>
                                ) : (
                                  <span className="text-[9px] bg-indigo-50 text-[#4F46E5] font-bold px-2 py-0.5 rounded-md border border-indigo-200">
                                    {chapter.slug ? "Complete Chapter Lesson" : matchingModules.length > 1 ? `${matchingModules.length} Modules Ready` : "Ready to Read"}
                                  </span>
                                )}
                              </div>

                              {/* Title */}
                              <h3 className="text-sm sm:text-base font-black text-gray-900 group-hover:text-[#4F46E5] transition-colors leading-snug">
                                {chapter.chapterTitle}
                              </h3>

                              {/* Unified Chapter Experience Sub-header */}
                              {(chapter.slug || matchingModules.length > 0) && (
                                <div className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-50/80 to-purple-50/60 border border-indigo-100/80 space-y-1">
                                  <div className="flex items-center justify-between text-[10px] font-black text-[#4F46E5]">
                                    <span>{matchingModules.length > 0 ? `${matchingModules.length} Sections` : "Unified Module"} • NEST Level</span>
                                    <span className="text-purple-700 bg-white px-1.5 py-0.5 rounded shadow-2xs font-extrabold">Practice &amp; Quiz Included</span>
                                  </div>
                                </div>
                              )}

                              {/* Topics */}
                              {chapter.topics && chapter.topics.length > 0 && (
                                <div className="space-y-1 pt-0.5">
                                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">
                                    Syllabus Topics
                                  </span>
                                  <div className="flex flex-wrap gap-1">
                                    {chapter.topics.slice(0, 3).map((topicItem, idx) => (
                                      <span
                                        key={idx}
                                        className="text-[10px] font-semibold text-gray-600 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100"
                                      >
                                        {topicItem}
                                      </span>
                                    ))}
                                    {chapter.topics.length > 3 && (
                                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md">
                                        +{chapter.topics.length - 3} more
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Progress bar */}
                              {percent > 0 && (
                                <div className="space-y-1 pt-1">
                                  <div className="flex justify-between text-[10px] font-bold text-gray-500">
                                    <span>Progress</span>
                                    <span>{percent}%</span>
                                  </div>
                                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full ${
                                        completed ? "bg-emerald-500" : "bg-[#4F46E5]"
                                      } rounded-full transition-all duration-500`}
                                      style={{ width: `${percent}%` }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Button */}
                            <div className="pt-2">
                              {isLocked ? (
                                <Button
                                  onClick={() => handleStartChapter(chapter, true)}
                                  className="w-full h-9 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                  <Lock className="h-3.5 w-3.5" />
                                  <span>Unlock Chapter with PRO 👑</span>
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => handleStartChapter(chapter, false)}
                                  className={`w-full h-9 font-bold text-xs rounded-xl shadow-2xs transition-all ${
                                    !hasContent
                                      ? "bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200"
                                      : "bg-[#4F46E5] hover:bg-indigo-700 text-white cursor-pointer"
                                  }`}
                                >
                                  {hasContent ? (
                                    completed ? (
                                      <>Review Lesson <Check className="ml-1.5 h-3.5 w-3.5" /></>
                                    ) : status === "In Progress" ? (
                                      <>Resume Smart Lesson <PlayCircle className="ml-1.5 h-3.5 w-3.5" /></>
                                    ) : (
                                      <>Start Smart Lesson <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></>
                                    )
                                  ) : (
                                    <>Coming Soon — Content Being Prepared</>
                                  )}
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* MODE 2: Flat List of All Chapter Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredChapters.map((chapter) => {
            const matchingModules = findAllMatchingLessons(chapter);
            const { status, percent, completed, hasContent } = getProgressStatus(chapter);
            const isFree = isChapterFree(chapter);
            const isLocked = !isProUser && !isFree;

            return (
              <div
                key={chapter.id}
                className={`bg-white rounded-3xl p-6 border shadow-2xs transition-all duration-200 flex flex-col justify-between space-y-5 group ${
                  isLocked
                    ? "border-amber-200/80 bg-gradient-to-b from-white to-amber-50/20 hover:border-amber-300"
                    : "border-gray-100 hover:shadow-md"
                }`}
              >
                <div className="space-y-3.5">
                  {/* Top Metadata Header: Subject Pill + Unit Title */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border shrink-0 ${getSubjectBadgeStyle(
                          chapter.subject
                        )}`}
                      >
                        {chapter.subject}
                      </span>
                      <span className="text-[11px] font-semibold text-gray-400 truncate">
                        {chapter.classLevel} • Unit {chapter.unitNumber}: {chapter.unitTitle}
                      </span>
                    </div>

                    {isLocked ? (
                      <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-[9px] px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                        <Lock className="h-2.5 w-2.5" /> PRO LESSON
                      </Badge>
                    ) : isFree ? (
                      <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold text-[9px] px-2 py-0.5 rounded-md">
                        FREE SAMPLE
                      </Badge>
                    ) : !hasContent ? (
                      <span className="text-[9px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-md border border-amber-200 shrink-0">
                        Coming Soon
                      </span>
                    ) : (
                      <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                        Free Note
                      </span>
                    )}
                  </div>

                  {/* Chapter Title */}
                  <div>
                    <h3 className={`text-base font-black transition-colors leading-snug ${
                      isLocked ? "text-gray-800 group-hover:text-amber-600" : "text-gray-900 group-hover:text-[#4F46E5]"
                    }`}>
                      {chapter.chapterTitle}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-400" /> ~15 min
                      </span>
                      <span>•</span>
                      <span className="text-gray-500 font-extrabold">High-Yield</span>
                      <span>•</span>
                      <span className="text-indigo-600 font-bold">Chapter {chapter.chapterNumber}</span>
                    </div>
                  </div>

                  {/* Smart Lesson Modules Chips */}
                  {matchingModules.length > 0 && (
                    <div className="space-y-1.5 pt-1 border-t border-gray-100">
                      <span className="text-[9px] font-black text-[#4F46E5] uppercase tracking-wider block">
                        Available Smart Lesson Modules ({matchingModules.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {matchingModules.map((m, mIdx) => (
                          <button
                            key={m.id}
                            suppressHydrationWarning
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isLocked) {
                                handleStartChapter(chapter, true);
                                return;
                              }
                              if (m.chapterSlug) {
                                setActiveChapterSubject(m.subject || chapter.subject);
                                setActiveChapterSlug(m.chapterSlug);
                              } else {
                                setActiveLesson(m);
                              }
                            }}
                            className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-indigo-50/90 hover:bg-[#4F46E5] text-indigo-900 hover:text-white border border-indigo-100 transition-all shadow-2xs text-left"
                            title={`Open Module ${m.order || mIdx + 1}: ${m.title}`}
                          >
                            M{m.order || mIdx + 1}: {m.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Syllabus Topics as Core Concepts Covered Chips */}
                  {chapter.topics && chapter.topics.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                        CORE CONCEPTS COVERED
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {chapter.topics.slice(0, 4).map((topicItem, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold text-gray-600 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100"
                          >
                            {topicItem}
                          </span>
                        ))}
                        {chapter.topics.length > 4 && (
                          <span className="text-[10px] font-extrabold text-[#4F46E5] bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100">
                            +{chapter.topics.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Progress Line */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-[10px] font-bold text-gray-500">
                      <span>Progress</span>
                      <span>{percent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          completed ? "bg-emerald-500" : percent > 0 ? "bg-rose-500" : "bg-gray-200"
                        } rounded-full transition-all duration-500`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-2">
                  {isLocked ? (
                    <Button
                      onClick={() => handleStartChapter(chapter, true)}
                      className="w-full h-10 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Lock className="h-3.5 w-3.5" />
                      <span>Unlock Chapter with PRO 👑</span>
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleStartChapter(chapter, false)}
                      className={`w-full h-10 font-bold text-xs rounded-xl shadow-2xs transition-all ${
                        !hasContent
                          ? "bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200"
                          : "bg-[#4F46E5] hover:bg-indigo-700 text-white"
                      }`}
                    >
                      {hasContent ? (
                        completed ? (
                          <>Review Lesson <Check className="ml-1.5 h-3.5 w-3.5" /></>
                        ) : status === "In Progress" ? (
                          <>Resume Smart Lesson <PlayCircle className="ml-1.5 h-3.5 w-3.5" /></>
                        ) : (
                          <>Start Smart Lesson <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></>
                        )
                      ) : (
                        <>Coming Soon — Content Being Prepared</>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Global Upgrade Paywall Modal */}
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        featureTitle={upgradeContext.title}
        featureDescription={upgradeContext.desc}
      />
    </div>
  );
}
