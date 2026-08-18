"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  FileText,
  CheckCircle2,
  Clock,
  ArrowRight,
  Search,
  Filter,
  Sparkles,
  ArrowLeft,
  Calendar,
  Award,
  PlayCircle,
  X,
  BookOpen,
  Check,
  Flame,
  HelpCircle,
  Bookmark,
  BookmarkCheck,
  RotateCcw,
  Layers,
  GraduationCap,
  ChevronRight,
  TrendingUp,
  BarChart3,
  CheckSquare,
  AlertCircle,
  Target,
  Zap,
  LayoutGrid,
  ChevronLeft,
  CircleDot,
  Flag,
  Trash2,
  XCircle,
  Maximize2,
  ShieldCheck,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContentPYQItem, ContentQuestion, ResolvedContentMock } from "@/lib/types/content";
import { SubjectType } from "@/lib/types/common";
import { questionEvaluationService } from "@/lib/services/questionEvaluation.service";
import { broadcastProgressUpdate } from "@/lib/services/progressOrchestrator.service";
import { pushMockAttempt, pushPYQAttempt } from "@/lib/supabase/sync.service";
import { CustomMarkdownRenderer } from "@/components/dashboard/CustomMarkdownRenderer";

interface PYQModuleViewProps {
  onBackToDashboard: () => void;
  onStartAssessment?: () => void;
}

// Question status type in CBT mode
type QuestionStatus =
  | "not_visited"
  | "not_answered"
  | "answered"
  | "marked_for_review"
  | "answered_and_marked";

// Pre-curated High-Yield NEST Topics for the "Choose Topic" section
interface TopicItem {
  id: string;
  name: string;
  subject: SubjectType;
  unit: string;
  questionCount: number;
  yearsAppeared: number[];
  difficulty: "High-Yield" | "Moderate" | "Advanced";
  iconName: string;
}

const NEST_TOPICS_DATABASE: TopicItem[] = [
  // Physics Topics
  {
    id: "phy-mechanics",
    name: "Mechanics & Rotational Dynamics",
    subject: "Physics",
    unit: "Classical Mechanics",
    questionCount: 48,
    yearsAppeared: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017],
    difficulty: "High-Yield",
    iconName: "Zap",
  },
  {
    id: "phy-electrodynamics",
    name: "Electrostatics & Magnetism",
    subject: "Physics",
    unit: "Electromagnetism",
    questionCount: 42,
    yearsAppeared: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017],
    difficulty: "High-Yield",
    iconName: "Flame",
  },
  {
    id: "phy-optics-waves",
    name: "Wave Optics & Interference",
    subject: "Physics",
    unit: "Optics & Waves",
    questionCount: 36,
    yearsAppeared: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018],
    difficulty: "High-Yield",
    iconName: "Sparkles",
  },
  {
    id: "phy-thermo",
    name: "Thermodynamics & Kinetic Theory",
    subject: "Physics",
    unit: "Thermal Physics",
    questionCount: 34,
    yearsAppeared: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017],
    difficulty: "High-Yield",
    iconName: "Flame",
  },
  {
    id: "phy-modern-physics",
    name: "Modern Physics & Quantum Theory",
    subject: "Physics",
    unit: "Modern Physics",
    questionCount: 30,
    yearsAppeared: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017],
    difficulty: "High-Yield",
    iconName: "Sparkles",
  },

  // Chemistry Topics
  {
    id: "chem-kinetics-eq",
    name: "Chemical Kinetics & Equilibrium",
    subject: "Chemistry",
    unit: "Physical Chemistry",
    questionCount: 45,
    yearsAppeared: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017],
    difficulty: "High-Yield",
    iconName: "Zap",
  },
  {
    id: "chem-bonding-coordination",
    name: "Chemical Bonding & Coordination Compounds",
    subject: "Chemistry",
    unit: "Inorganic Chemistry",
    questionCount: 44,
    yearsAppeared: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017],
    difficulty: "High-Yield",
    iconName: "Sparkles",
  },
  {
    id: "chem-organic-reaction-mech",
    name: "Reaction Mechanisms (SN1/SN2/Elimination)",
    subject: "Chemistry",
    unit: "Organic Chemistry",
    questionCount: 40,
    yearsAppeared: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018],
    difficulty: "High-Yield",
    iconName: "Flame",
  },
  {
    id: "chem-electrochem-solutions",
    name: "Electrochemistry & Colligative Properties",
    subject: "Chemistry",
    unit: "Physical Chemistry",
    questionCount: 38,
    yearsAppeared: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017],
    difficulty: "High-Yield",
    iconName: "Zap",
  },

  // Biology Topics
  {
    id: "bio-genetics-molbio",
    name: "Genetics & Molecular Biology",
    subject: "Biology",
    unit: "Inheritance & Molecular Genetics",
    questionCount: 52,
    yearsAppeared: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017],
    difficulty: "High-Yield",
    iconName: "Sparkles",
  },
  {
    id: "bio-human-physiology",
    name: "Human Physiology & Endocrine Control",
    subject: "Biology",
    unit: "Physiology",
    questionCount: 46,
    yearsAppeared: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017],
    difficulty: "High-Yield",
    iconName: "Flame",
  },
  {
    id: "bio-plant-physio-photosyn",
    name: "Plant Physiology & Photosynthesis",
    subject: "Biology",
    unit: "Plant Biology",
    questionCount: 38,
    yearsAppeared: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018],
    difficulty: "High-Yield",
    iconName: "Zap",
  },
  {
    id: "bio-ecology-biochem",
    name: "Ecology, Enzymes & Cellular Metabolism",
    subject: "Biology",
    unit: "Ecology & Biochemistry",
    questionCount: 42,
    yearsAppeared: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017],
    difficulty: "High-Yield",
    iconName: "Sparkles",
  },

  // Mathematics Topics
  {
    id: "math-calculus",
    name: "Calculus (Limits, Derivatives & Integrals)",
    subject: "Mathematics",
    unit: "Differential & Integral Calculus",
    questionCount: 56,
    yearsAppeared: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017],
    difficulty: "High-Yield",
    iconName: "Zap",
  },
  {
    id: "math-matrices-complex",
    name: "Matrices, Determinants & Complex Numbers",
    subject: "Mathematics",
    unit: "Algebra",
    questionCount: 45,
    yearsAppeared: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017],
    difficulty: "High-Yield",
    iconName: "Sparkles",
  },
  {
    id: "math-prob-combinatorics",
    name: "Probability, Permutations & Combinations",
    subject: "Mathematics",
    unit: "Probability & Discrete Math",
    questionCount: 40,
    yearsAppeared: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017],
    difficulty: "High-Yield",
    iconName: "Flame",
  },
  {
    id: "math-conic-diff-eq",
    name: "Coordinate Geometry & Differential Equations",
    subject: "Mathematics",
    unit: "Geometry & Calculus",
    questionCount: 38,
    yearsAppeared: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017],
    difficulty: "High-Yield",
    iconName: "Zap",
  },
];

// Extract distinct images to guarantee zero duplicate diagram renders
function getDistinctQuestionImages(q: any): string[] {
  if (!q) return [];
  const set = new Set<string>();
  const results: string[] = [];

  const extractKey = (url: string) => {
    const clean = url.split("?")[0].split("#")[0];
    const parts = clean.split("/");
    return parts[parts.length - 1].toLowerCase();
  };

  // If questionText already has an embedded markdown image, do not show separate duplicates
  const hasMarkdownImage = /!\[.*?\]\(.*?\)/.test(q.questionText || "");
  if (hasMarkdownImage) {
    return [];
  }

  const list = [
    ...(Array.isArray(q.images) ? q.images : []),
    ...(q.imageSrc ? [q.imageSrc] : []),
    ...(q.diagramUrl ? [q.diagramUrl] : []),
  ];

  for (const url of list) {
    if (!url || typeof url !== "string") continue;
    const key = extractKey(url);
    if (!set.has(key)) {
      set.add(key);
      results.push(url);
    }
  }
  return results;
}

// Year-Wise Mock Tests 2018 to 2025
interface YearMockItem {
  id: string;
  year: number;
  title: string;
  subtitle: string;
  shift: string;
  totalQuestions: number;
  durationMinutes: number;
  totalMarks: number;
  evalMarks: number;
  markingScheme: string;
  badge: string;
  highYieldTopics: string[];
  mockId?: string;
  formatType: "CBT" | "PDF";
  pdfUrl?: string;
}

const NEST_YEAR_MOCKS_DATABASE: YearMockItem[] = [
  {
    id: "nest-pyq-2025",
    year: 2025,
    title: "NEST 2025 Official Previous Year Paper",
    subtitle: "Authentic NEST 2025 examination questions across all 4 subjects with diagrams",
    shift: "Official Full Paper",
    totalQuestions: 80,
    durationMinutes: 180,
    totalMarks: 240,
    evalMarks: 180,
    markingScheme: "+3 for Correct, -1 for Incorrect (Best 3 of 4 Evaluated)",
    badge: "Official 2025 PYQ",
    highYieldTopics: ["Protein Salt Bridges", "Oxygen Dissociation", "Maltose Linkages", "Internally Tangent Circles"],
    mockId: "nest-pyq-2025",
    formatType: "CBT",
    pdfUrl: "/pdfs/pyqs/nest_2025.pdf",
  },
  {
    id: "nest-pyq-2024-s1",
    year: 2024,
    title: "NEST 2024 (Session 1) Official Paper",
    subtitle: "Authentic Morning Shift paper with detailed conceptual solutions",
    shift: "Session 1 • Shift 1 (Morning)",
    totalQuestions: 80,
    durationMinutes: 180,
    totalMarks: 240,
    evalMarks: 180,
    markingScheme: "+3 for Correct, -1 for Incorrect (Best 3 of 4 Evaluated)",
    badge: "2024 Session 1",
    highYieldTopics: ["Method of Images", "Peroxide Effect", "ABO Genetics", "Definite Integrals"],
    mockId: "nest-pyq-2024-s1",
    formatType: "CBT",
    pdfUrl: "/pdfs/pyqs/nest_2024_s1.pdf",
  },
  {
    id: "nest-pyq-2024-s2",
    year: 2024,
    title: "NEST 2024 (Session 2) Official Paper",
    subtitle: "Authentic Afternoon Shift paper with step-by-step NISER explanations",
    shift: "Session 2 • Shift 2 (Afternoon)",
    totalQuestions: 80,
    durationMinutes: 180,
    totalMarks: 240,
    evalMarks: 180,
    markingScheme: "+3 for Correct, -1 for Incorrect (Best 3 of 4 Evaluated)",
    badge: "2024 Session 2",
    highYieldTopics: ["Cyclohexene Chlorination", "Hofmann Bromamide", "Wheatstone Bridge", "Archaeplastida Plastids"],
    mockId: "nest-pyq-2024-s2",
    formatType: "CBT",
    pdfUrl: "/pdfs/pyqs/nest_2024_s2.pdf",
  },
  {
    id: "nest-pyq-2023-s1",
    year: 2023,
    title: "NEST 2023 (Session 1) Official Paper",
    subtitle: "Authentic Morning Shift paper with complete NISER grading and solutions",
    shift: "Session 1 • Shift 1 (Morning)",
    totalQuestions: 68,
    durationMinutes: 180,
    totalMarks: 204,
    evalMarks: 153,
    markingScheme: "+3 for Correct, -1 for Incorrect (Best 3 of 4 Evaluated)",
    badge: "2023 Session 1",
    highYieldTopics: ["Animal Cladograms", "Pyrophosphoric Acid", "Roots of x^6+x^3-1", "Comet Tidal Gravity"],
    mockId: "nest-pyq-2023-s1",
    formatType: "CBT",
    pdfUrl: "/pdfs/pyqs/nest_2023_s1.pdf",
  },
  {
    id: "nest-pyq-2022-s1",
    year: 2022,
    title: "NEST 2022 (Session 1) Official Paper",
    subtitle: "Authentic Morning Shift paper with in-depth explanations across all 4 subjects",
    shift: "Session 1 • Shift 1 (Morning)",
    totalQuestions: 68,
    durationMinutes: 180,
    totalMarks: 200,
    evalMarks: 150,
    markingScheme: "12 MCQ (+3, -1) & 5 MSQ (+4, 0) per section (Best 3 Evaluated)",
    badge: "2022 Session 1",
    highYieldTopics: ["Restriction Digest Gel", "Aldol Dehydration", "King's Rule Integrals", "Rigid Body Inertia"],
    mockId: "nest-pyq-2022-s1",
    formatType: "CBT",
    pdfUrl: "/pdfs/pyqs/nest_2022_s1.pdf",
  },
  {
    id: "nest-pyq-2022-s2",
    year: 2022,
    title: "NEST 2022 (Session 2) Official Paper",
    subtitle: "Authentic Afternoon Shift paper with NISER evaluation criteria",
    shift: "Session 2 • Shift 2 (Afternoon)",
    totalQuestions: 68,
    durationMinutes: 180,
    totalMarks: 200,
    evalMarks: 150,
    markingScheme: "12 MCQ (+3, -1) & 5 MSQ (+4, 0) per section (Best 3 Evaluated)",
    badge: "2022 Session 2",
    highYieldTopics: ["X-Linked Genetics", "Cannizzaro Reaction", "Orthogonal Matrices", "Angular Momentum Mechanics"],
    mockId: "nest-pyq-2022-s2",
    formatType: "CBT",
    pdfUrl: "/pdfs/pyqs/nest_2022_s2.pdf",
  },
  {
    id: "nest-pyq-2020-s1",
    year: 2020,
    title: "NEST 2020 (Session 1) Official Paper",
    subtitle: "Official PDF Question Paper from NEST 2020 Session 1 Morning Shift",
    shift: "Session 1 • Shift 1 (Morning)",
    totalQuestions: 70,
    durationMinutes: 210,
    totalMarks: 230,
    evalMarks: 180,
    markingScheme: "General (10 Qs, 30M) + Best 3 of 4 Subjects (15 Qs each, 150M) = 180M",
    badge: "Official PDF Archive",
    highYieldTopics: ["Atmospheric CO2 Graphs", "Epistasis Genetics", "Reimer-Tiemann Mechanism", "Rolling Without Slipping"],
    formatType: "PDF",
    pdfUrl: "/pdfs/pyqs/nest_2020_s1.pdf",
  },
  {
    id: "nest-pyq-2020-s2",
    year: 2020,
    title: "NEST 2020 (Session 2) Official Paper",
    subtitle: "Official PDF Question Paper from NEST 2020 Session 2 Afternoon Shift",
    shift: "Session 2 • Shift 2 (Afternoon)",
    totalQuestions: 70,
    durationMinutes: 210,
    totalMarks: 230,
    evalMarks: 180,
    markingScheme: "General (10 Qs, 30M) + Best 3 of 4 Subjects (15 Qs each, 150M) = 180M",
    badge: "Official PDF Archive",
    highYieldTopics: ["Ocean Acidification Passage", "Barr Body Genetics", "Ozonolysis Alkenes", "Capillary Surface Tension"],
    formatType: "PDF",
    pdfUrl: "/pdfs/pyqs/nest_2020_s2.pdf",
  },
  {
    id: "nest-pyq-2019-s1",
    year: 2019,
    title: "NEST 2019 Official Paper",
    subtitle: "Official Master Question Paper with high-yield foundational problems",
    shift: "Official Full Paper",
    totalQuestions: 70,
    durationMinutes: 210,
    totalMarks: 230,
    evalMarks: 180,
    markingScheme: "General (10 Qs, 30M) + Best 3 of 4 Subjects (15 Qs each, 150M) = 180M",
    badge: "Official PDF Archive",
    highYieldTopics: ["Black Hole Lensing Passage", "Lac Operon Regulation", "Aldol/Cannizzaro Carbonyls", "Conservation Linear Momentum"],
    formatType: "PDF",
    pdfUrl: "/pdfs/pyqs/nest_2019.pdf",
  },
  {
    id: "nest-pyq-2018",
    year: 2018,
    title: "NEST 2018 Official Paper",
    subtitle: "Official Master Question Paper from Centre For Excellence In Basic Sciences",
    shift: "Official Full Paper",
    totalQuestions: 70,
    durationMinutes: 210,
    totalMarks: 230,
    evalMarks: 180,
    markingScheme: "General (10 Qs, 30M) + Best 3 of 4 Subjects (15 Qs each, 150M) = 180M",
    badge: "Official PDF Archive",
    highYieldTopics: ["Solar Flare Magnetosphere Passage", "Mannose-6-Phosphate Tagging", "Grignard Carbonyl Addition", "Torricelli Law of Efflux"],
    formatType: "PDF",
    pdfUrl: "/pdfs/pyqs/nest_2018.pdf",
  },
];

export function PYQModuleView({
  onBackToDashboard,
  onStartAssessment,
}: PYQModuleViewProps) {
  // Main view state: "LOBBY" | "CBT_EXAM"
  const [viewState, setViewState] = useState<"LOBBY" | "CBT_EXAM">("LOBBY");

  // Navigation & Filter States
  const [selectedTopicSubject, setSelectedTopicSubject] = useState<string>("All");
  const [topicSearchQuery, setTopicSearchQuery] = useState<string>("");
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"YEAR_MOCKS" | "TOPICS">("YEAR_MOCKS");

  // Topic practice solver state
  const [activeTopic, setActiveTopic] = useState<TopicItem | null>(null);
  const [topicQuestions, setTopicQuestions] = useState<ContentQuestion[]>([]);
  const [activeTopicQIndex, setActiveTopicQIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTopicQSubmitted, setIsTopicQSubmitted] = useState<boolean>(false);
  const [isLoadingTopicQuestions, setIsLoadingTopicQuestions] = useState<boolean>(false);

  // Official PDF Paper Viewer state (for 2018-2021)
  const [activePdfPaper, setActivePdfPaper] = useState<{ title: string; pdfUrl: string; year: number } | null>(null);

  // Native PYQ CBT Exam Simulator State
  const [activeMock, setActiveMock] = useState<ResolvedContentMock | null>(null);
  const [isStartingMock, setIsStartingMock] = useState<boolean>(false);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [activeSubject, setActiveSubject] = useState<SubjectType>("Physics");
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [questionStatuses, setQuestionStatuses] = useState<Record<string, QuestionStatus>>({});
  const [visitedQuestions, setVisitedQuestions] = useState<Set<string>>(new Set());
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [totalDurationSeconds, setTotalDurationSeconds] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<"ALL" | "CORRECT" | "INCORRECT" | "UNATTEMPTED">("ALL");
  const [reviewSubjectFilter, setReviewSubjectFilter] = useState<string>("ALL");

  // Student Attempt State Maps
  const [pyqAttempts, setPyqAttempts] = useState<Record<string, any>>({});
  const [mockAttempts, setMockAttempts] = useState<Record<string, any>>({});
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  // Load saved attempts on mount
  useEffect(() => {
    try {
      const savedPyqAttempts = localStorage.getItem("nest_smartprep_pyq_attempts");
      if (savedPyqAttempts) setPyqAttempts(JSON.parse(savedPyqAttempts));

      const savedMockAttempts = localStorage.getItem("nest_smartprep_mock_attempts");
      if (savedMockAttempts) setMockAttempts(JSON.parse(savedMockAttempts));

      const savedBookmarks = localStorage.getItem("nest_smartprep_pyq_bookmarks");
      if (savedBookmarks) setBookmarks(new Set(JSON.parse(savedBookmarks)));
    } catch (e) {
      console.warn("Failed loading PYQ data:", e);
    }
  }, []);

  // Filtered Topics
  const filteredTopics = useMemo(() => {
    return NEST_TOPICS_DATABASE.filter((t) => {
      const matchesSubject =
        selectedTopicSubject === "All" ||
        t.subject.toLowerCase() === selectedTopicSubject.toLowerCase();
      const matchesSearch =
        t.name.toLowerCase().includes(topicSearchQuery.toLowerCase()) ||
        t.unit.toLowerCase().includes(topicSearchQuery.toLowerCase());
      return matchesSubject && matchesSearch;
    });
  }, [selectedTopicSubject, topicSearchQuery]);

  // Filtered Year Mocks
  const filteredYearMocks = useMemo(() => {
    return NEST_YEAR_MOCKS_DATABASE.filter((m) => {
      if (selectedYearFilter === "All") return true;
      return m.year.toString() === selectedYearFilter;
    });
  }, [selectedYearFilter]);

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

  const availableSubjects = useMemo(() => {
    return (["Physics", "Chemistry", "Mathematics", "Biology"] as SubjectType[]).filter(
      (s) => subjectGroups[s] && subjectGroups[s].length > 0
    );
  }, [subjectGroups]);

  // Launch mock test in true full screen CBT mode
  const handleStartPYQCBT = async (mockId: string) => {
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

        setViewState("CBT_EXAM");
      }
    } catch (e) {
      console.error("Error launching PYQ CBT test:", e);
    } finally {
      setIsStartingMock(false);
    }
  };

  // Switch to a question in CBT
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

  const handleSubjectTabClick = (subj: SubjectType) => {
    setActiveSubject(subj);
    if (!activeMock) return;
    const firstIdx = activeMock.questions.findIndex((q) => q.subject === subj);
    if (firstIdx !== -1) {
      navigateToQuestion(firstIdx);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (viewState !== "CBT_EXAM" || isSubmitted || timerSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinishMock(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [viewState, isSubmitted, timerSeconds]);

  // Answer handler
  const handleSelectOption = (optionId: string) => {
    if (isSubmitted || !activeMock) return;
    const q = activeMock.questions[currentQIndex];
    if (!q) return;

    setUserAnswers((prev) => ({ ...prev, [q.id]: optionId }));
    setQuestionStatuses((prev) => {
      const current = prev[q.id];
      if (current === "marked_for_review" || current === "answered_and_marked") {
        return { ...prev, [q.id]: "answered_and_marked" };
      }
      return { ...prev, [q.id]: "answered" };
    });
  };

  const handleClearResponse = () => {
    if (isSubmitted || !activeMock) return;
    const q = activeMock.questions[currentQIndex];
    if (!q) return;

    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[q.id];
      return next;
    });

    setQuestionStatuses((prev) => ({
      ...prev,
      [q.id]: "not_answered",
    }));
  };

  const handleMarkForReviewAndNext = () => {
    if (isSubmitted || !activeMock) return;
    const q = activeMock.questions[currentQIndex];
    if (!q) return;

    const ans = userAnswers[q.id];
    const hasAns =
      ans !== undefined &&
      ans !== null &&
      ans !== "" &&
      (!Array.isArray(ans) || ans.length > 0);

    setQuestionStatuses((prev) => ({
      ...prev,
      [q.id]: hasAns ? "answered_and_marked" : "marked_for_review",
    }));

    if (currentQIndex < activeMock.questions.length - 1) {
      navigateToQuestion(currentQIndex + 1);
    }
  };

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
        { score: number; maxMarks: number; correct: number; incorrect: number; unattempted: number; total: number }
      > = {
        Physics: { score: 0, maxMarks: 0, correct: 0, incorrect: 0, unattempted: 0, total: 0 },
        Chemistry: { score: 0, maxMarks: 0, correct: 0, incorrect: 0, unattempted: 0, total: 0 },
        Mathematics: { score: 0, maxMarks: 0, correct: 0, incorrect: 0, unattempted: 0, total: 0 },
        Biology: { score: 0, maxMarks: 0, correct: 0, incorrect: 0, unattempted: 0, total: 0 },
      };

      const questionResults: Record<string, any> = {};

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
          subjectBreakdown[subj] = { score: 0, maxMarks: 0, correct: 0, incorrect: 0, unattempted: 0, total: 0 };
        }

        subjectBreakdown[subj].total += 1;
        subjectBreakdown[subj].maxMarks += q.marks || 3;

        if (hasAns) {
          totalAttempted++;
          if (result.isCorrect) {
            totalCorrect++;
            subjectBreakdown[subj].correct += 1;
            marksGained += q.marks || 3;
          } else {
            totalIncorrect++;
            subjectBreakdown[subj].incorrect += 1;
            marksLost += q.negativeMarks || 1;
          }
        } else {
          subjectBreakdown[subj].unattempted += 1;
        }

        subjectBreakdown[subj].score += result.score;
        rawTotalScore += result.score;
      });

      // Best 3 of 4 evaluation for NEST
      const subjectScoresList = Object.entries(subjectBreakdown)
        .filter(([_, stats]) => stats.total > 0)
        .map(([subj, stats]) => ({ subject: subj as SubjectType, score: stats.score }))
        .sort((a, b) => b.score - a.score);

      const best3Scores = subjectScoresList.slice(0, 3);
      const nestMeritScore = best3Scores.reduce((acc, curr) => acc + curr.score, 0);

      const evalScore = nestMeritScore;
      const evalMax = activeMock.evalMarks || 180;
      const scorePct = (evalScore / evalMax) * 100;

      let predictedPercentile = 80.0;
      let predictedRankRange = "AIR 1000 - 2500";
      if (scorePct >= 75) {
        predictedPercentile = 98.5;
        predictedRankRange = "AIR 1 - 100 (NISER Top Tier)";
      } else if (scorePct >= 60) {
        predictedPercentile = 94.0;
        predictedRankRange = "AIR 101 - 500 (CEBS / NISER Confirmed)";
      } else if (scorePct >= 45) {
        predictedPercentile = 85.0;
        predictedRankRange = "AIR 501 - 1500 (Interview Qualified)";
      }

      const attemptSummary = {
        id: activeMock.id,
        mockId: activeMock.id,
        title: activeMock.title,
        mockTitle: activeMock.title,
        completedAt: new Date().toISOString(),
        date: new Date().toISOString(),
        totalScore: rawTotalScore,
        rawScore: rawTotalScore,
        nestMeritScore: evalScore,
        evalScore: evalScore,
        evalMax: evalMax,
        totalAttempted,
        totalCorrect,
        totalIncorrect,
        totalQuestions: activeMock.questions.length,
        marksGained,
        marksLost,
        accuracy: totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0,
        timeSpentSeconds: totalDurationSeconds - timerSeconds,
        subjectBreakdown,
        best3Subjects: best3Scores.map((b) => b.subject),
        predictedPercentile,
        predictedRankRange,
        questionResults,
        isPYQ: true,
      };

      const updatedAttempts = {
        ...mockAttempts,
        [activeMock.id]: attemptSummary,
      };

      // Also record individual attempted questions in pyqAttempts
      const updatedPyqs = { ...pyqAttempts };
      Object.entries(userAnswers).forEach(([qId, ans]) => {
        if (ans !== undefined && ans !== null && ans !== "" && (!Array.isArray(ans) || ans.length > 0)) {
          const q = activeMock.questions.find((item) => item.id === qId);
          const evalRes = questionResults[qId] || (q ? questionEvaluationService.evaluate(q, ans) : { isCorrect: false, score: 0 });
          updatedPyqs[qId] = {
            id: qId,
            selectedOption: typeof ans === "string" ? ans : JSON.stringify(ans),
            isCorrect: evalRes.isCorrect,
            score: evalRes.score,
            subject: q?.subject || "Physics",
            topic: q?.topic || "General",
            mockId: activeMock.id,
            completedAt: new Date().toISOString(),
          };
        }
      });

      setMockAttempts(updatedAttempts);
      setPyqAttempts(updatedPyqs);
      setIsSubmitted(true);
      setShowSubmitModal(false);

      try {
        localStorage.setItem("nest_smartprep_mock_attempts", JSON.stringify(updatedAttempts));
        localStorage.setItem("nest_smartprep_pyq_attempts", JSON.stringify(updatedPyqs));
        broadcastProgressUpdate();
        pushMockAttempt(activeMock.id).catch(() => {});
      } catch (e) {
        console.warn("Failed persisting mock attempt:", e);
      }
    },
    [activeMock, isSubmitted, userAnswers, totalDurationSeconds, timerSeconds, mockAttempts, pyqAttempts]
  );

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

  // Handle Launch Topic Solver (Quick Practice)
  const handleOpenTopicSolver = async (topic: TopicItem) => {
    setActiveTopic(topic);
    setIsLoadingTopicQuestions(true);
    setActiveTopicQIndex(0);
    setSelectedOption(null);
    setIsTopicQSubmitted(false);

    try {
      const res = await fetch(`/api/content/mocks?id=nest-pyq-2025&resolve=true`);
      const res2 = await fetch(`/api/content/mocks?id=nest-pyq-2024-s1&resolve=true`);

      const allQuestions: ContentQuestion[] = [];
      for (const r of [res, res2]) {
        if (r.ok) {
          const d = await r.json();
          if (d.mock && d.mock.questions) {
            allQuestions.push(...d.mock.questions);
          }
        }
      }

      const matching = allQuestions.filter(
        (q) => q.subject.toLowerCase() === topic.subject.toLowerCase()
      );

      setTopicQuestions(matching.length > 0 ? matching : allQuestions.slice(0, 10));
    } catch (e) {
      console.error("Error loading topic questions:", e);
    } finally {
      setIsLoadingTopicQuestions(false);
    }
  };

  const handleSubmitTopicAnswer = () => {
    const currentQ = topicQuestions[activeTopicQIndex];
    if (!currentQ || !selectedOption || isTopicQSubmitted) return;

    let isCorrect = false;
    if (currentQ.options) {
      const opt = currentQ.options.find((o) => o.id === selectedOption);
      isCorrect = opt?.isCorrect === true;
    }

    const score = isCorrect ? 3 : -1;
    const updated = {
      ...pyqAttempts,
      [currentQ.id]: { selectedOption, isCorrect, score },
    };

    setPyqAttempts(updated);
    setIsTopicQSubmitted(true);

    try {
      localStorage.setItem("nest_smartprep_pyq_attempts", JSON.stringify(updated));
      broadcastProgressUpdate();
      pushPYQAttempt(currentQ.id, {
        isCorrect,
        selectedOption,
        subject: currentQ.subject,
        topic: currentQ.topic,
      }).catch(() => {});
    } catch (e) {
      console.warn("Failed saving attempt:", e);
    }
  };

  const getSubjectBadgeStyle = (subj: string) => {
    switch (subj.toLowerCase()) {
      case "physics":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";
      case "chemistry":
        return "bg-[#4F46E5]/10 text-[#4F46E5] border-indigo-200";
      case "biology":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "mathematics":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const totalPYQsCount = NEST_TOPICS_DATABASE.reduce((acc, t) => acc + t.questionCount, 0);
  const solvedCount = Object.keys(pyqAttempts).length;

  // =========================================================================
  // VIEW: FULL SCREEN TRUE CBT EXAM INTERFACE (Takes over the entire viewport)
  // =========================================================================
  if (viewState === "CBT_EXAM" && activeMock) {
    const currentQ = activeMock.questions[currentQIndex];
    const currentAns = userAnswers[currentQ?.id];
    const currentAttempt = mockAttempts[activeMock.id];

    // POST-EXAM SCORECARD & DETAILED REVIEW MODE
    if (isSubmitted && currentAttempt) {
      return (
        <div className="fixed inset-0 z-50 bg-[#F4F6F9] overflow-y-auto font-sans text-gray-900 select-none p-4 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Review Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-[10px] font-black">
                    NEST PYQ CBT SCORECARD
                  </Badge>
                  <span className="text-xs text-gray-400 font-bold">•</span>
                  <span className="text-xs font-extrabold text-gray-600">{activeMock.title}</span>
                </div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                  Exam Scorecard & Best 3 of 4 Analysis
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStartPYQCBT(activeMock.id)}
                  className="h-9 text-xs font-bold rounded-xl border-gray-200"
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1" /> Re-attempt Paper
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setActiveMock(null);
                    setViewState("LOBBY");
                  }}
                  className="h-9 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Back to PYQ Lobby
                </Button>
              </div>
            </div>

            {/* Score Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-900 to-indigo-950 text-white shadow-xl flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-purple-200 uppercase tracking-wider block">
                    NEST Evaluated Merit Score
                  </span>
                  <div className="text-4xl font-black text-white mt-1">
                    {currentAttempt.evalScore} <span className="text-base font-bold text-purple-300">/ {currentAttempt.evalMax}</span>
                  </div>
                  <span className="text-[11px] text-purple-200 mt-1 block font-semibold">
                    Best 3 out of 4 Subjects (Lowest Section Dropped)
                  </span>
                </div>

                <div className="pt-3 border-t border-purple-800/80 flex items-center justify-between text-xs font-bold text-purple-100">
                  <span>Raw 4-Subject Score:</span>
                  <span className="text-white font-black">{currentAttempt.totalScore} / {activeMock.totalMarks}</span>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-gray-200 flex flex-col justify-between shadow-2xs">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Predicted Rank</span>
                <div className="text-lg font-black text-purple-950 mt-1">{currentAttempt.predictedRankRange}</div>
                <div className="text-xs font-bold text-gray-500 mt-2">Percentile: ~{currentAttempt.predictedPercentile}%ile</div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-gray-200 flex flex-col justify-between shadow-2xs">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Accuracy & Time</span>
                <div className="text-2xl font-black text-emerald-600 mt-1">{currentAttempt.accuracy}%</div>
                <div className="text-xs font-bold text-gray-500 mt-1">
                  Time: {formatTimer(currentAttempt.timeSpentSeconds)} ({currentAttempt.totalAttempted} / {currentAttempt.totalQuestions} attempted)
                </div>
              </div>
            </div>

            {/* Subject-Wise Score Breakdown */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
              <h2 className="text-sm font-black text-gray-900 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-purple-600" /> Section-wise Performance & Best 3 Evaluation
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {(["Physics", "Chemistry", "Mathematics", "Biology"] as SubjectType[]).map((subj) => {
                  const stats = currentAttempt.subjectBreakdown?.[subj];
                  if (!stats) return null;
                  const isBest3 = currentAttempt.best3Subjects?.includes(subj);

                  return (
                    <div
                      key={subj}
                      className={`p-4 rounded-2xl border flex flex-col justify-between space-y-2 ${
                        isBest3
                          ? "bg-purple-50/50 border-purple-200 ring-2 ring-purple-500/10"
                          : "bg-gray-50 border-gray-200 opacity-75"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs text-gray-900">{subj}</span>
                        {isBest3 ? (
                          <span className="text-[9px] font-black bg-purple-200 text-purple-900 px-2 py-0.5 rounded-md">
                            ⭐ Best 3
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded-md">
                            Dropped
                          </span>
                        )}
                      </div>
                      <div className="text-lg font-black text-gray-900">{stats.score} Marks</div>
                      <div className="text-[10px] text-gray-500 font-bold">
                        {stats.correct} Correct • {stats.incorrect} Incorrect • {stats.unattempted} Unattempted
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Question Review List */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                <h3 className="text-sm font-black text-gray-900">Question-by-Question Solution Review</h3>
                <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                  {(["ALL", "Physics", "Chemistry", "Mathematics", "Biology"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setReviewSubjectFilter(s)}
                      className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                        reviewSubjectFilter === s
                          ? "bg-purple-600 text-white"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {activeMock.questions
                  .filter((q) => reviewSubjectFilter === "ALL" || q.subject === reviewSubjectFilter)
                  .map((q, idx) => {
                    const ans = userAnswers[q.id];
                    const isCorrect = q.options?.find((o) => o.id === ans)?.isCorrect === true;
                    const hasAns = ans !== undefined && ans !== null && ans !== "";

                    return (
                      <div key={q.id} className="p-5 rounded-2xl border border-gray-200 space-y-3 bg-gray-50/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black bg-gray-200 px-2 py-0.5 rounded-md">Q{idx + 1}</span>
                            <span className="text-xs font-bold text-purple-700">{q.subject} • {q.topic}</span>
                          </div>

                          {hasAns ? (
                            isCorrect ? (
                              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-[10px] font-bold">
                                +3 Correct
                              </Badge>
                            ) : (
                              <Badge className="bg-red-100 text-red-800 border-red-200 text-[10px] font-bold">
                                -1 Incorrect
                              </Badge>
                            )
                          ) : (
                            <Badge variant="outline" className="text-gray-400 text-[10px]">
                              0 Unattempted
                            </Badge>
                          )}
                        </div>

                        <div className="text-xs sm:text-sm font-semibold text-gray-900">
                          <CustomMarkdownRenderer content={q.questionText} />
                        </div>

                        {/* Question Image */}
                        {(() => {
                          const distinctImgs = getDistinctQuestionImages(q);
                          if (distinctImgs.length === 0) return null;
                          return (
                            <div className="p-2.5 sm:p-3.5 rounded-xl bg-white border border-gray-200 flex flex-col items-center justify-center space-y-2">
                              {distinctImgs.map((imgSrc: string, imgIdx: number) => (
                                <img
                                  key={imgIdx}
                                  src={imgSrc}
                                  alt={`Question Diagram ${imgIdx + 1}`}
                                  className="max-h-[260px] w-auto max-w-full rounded-lg object-contain"
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
                              ))}
                            </div>
                          );
                        })()}

                        {/* Options */}
                        <div className="space-y-1.5 pt-1">
                          {q.options?.map((opt) => {
                            const isChosen = ans === opt.id;
                            let style = "bg-white border-gray-200 text-gray-700";
                            if (opt.isCorrect) style = "bg-emerald-50 border-emerald-400 text-emerald-900 font-bold";
                            else if (isChosen && !opt.isCorrect) style = "bg-red-50 border-red-300 text-red-900 font-bold";

                            return (
                              <div key={opt.id} className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${style}`}>
                                <div className="flex items-center gap-2">
                                  <span className="font-black uppercase">{opt.id}.</span>
                                  <CustomMarkdownRenderer content={opt.text} />
                                </div>
                                {opt.isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />}
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation */}
                        {q.solutionExplanation && (
                          <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-950 font-medium">
                            <span className="font-black block mb-1">Step-by-Step Solution:</span>
                            <CustomMarkdownRenderer content={q.solutionExplanation} />
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // ACTIVE CBT EXAMINATION SCREEN (Matches Screenshot Exactly)
    return (
      <div className="fixed inset-0 z-50 bg-[#F4F6F9] flex flex-col font-sans text-gray-900 overflow-hidden select-none">
        {/* 1. CBT Top Header Bar */}
        <header className="h-14 bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs z-20">
          <div className="flex items-center gap-3 min-w-0">
            {/* Orange NEST Exam Icon */}
            <div className="h-8 w-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
              NEST
            </div>
            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm font-black text-gray-900 leading-tight truncate">
                {activeMock.title}
              </h1>
              <span className="text-[10px] font-semibold text-gray-400 hidden sm:inline">
                Candidate: <strong>Ankit Kumar</strong> • Official CBT Engine
              </span>
            </div>
          </div>

          {/* Right Header: Timer Clock + Submit Button + Avatar */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Mobile Palette Trigger */}
            <button
              onClick={() => setIsMobilePaletteOpen(true)}
              className="md:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-[11px] font-black"
            >
              <LayoutGrid className="h-3.5 w-3.5 text-purple-600" />
              <span>Palette</span>
            </button>

            {/* Amber Timer Clock */}
            <div
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-mono font-black text-xs transition-all ${
                timerSeconds < 600
                  ? "bg-red-50 text-red-700 border-red-200 animate-pulse"
                  : "bg-amber-50 text-amber-900 border-amber-200"
              }`}
            >
              <Clock className="h-3.5 w-3.5 text-amber-600 shrink-0" />
              <span>{formatTimer(timerSeconds)}</span>
            </div>

            {/* Green Submit Test Button */}
            <Button
              size="sm"
              onClick={() => setShowSubmitModal(true)}
              className="h-8 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl px-3 sm:px-4 shadow-xs"
            >
              <span>Submit</span>
              <Check className="ml-1 h-3.5 w-3.5 hidden sm:inline" />
            </Button>
          </div>
        </header>

        {/* 2. CBT Section Navigation Bar */}
        <div className="h-11 bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider mr-1 shrink-0">
            SECTIONS:
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-gray-900 text-white shadow-xs"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100"
                }`}
              >
                <span>{subj}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isActive ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {answeredInSubj}/{questionsInSubj.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3. Main Examination Split Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Column: Active Question Workspace */}
          {currentQ && (
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-white md:border-r border-gray-200">
              {/* Scrollable Question Content Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="space-y-4 sm:space-y-5 max-w-4xl w-full mx-auto pb-4">
                  {/* Question Header Strip */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="h-6 px-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-black text-xs flex items-center justify-center">
                        Q{currentQIndex + 1}
                      </span>
                      <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-md truncate">
                        {currentQ.subject} • {currentQ.topic}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold">
                      <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        +{currentQ.marks || 3} / -{currentQ.negativeMarks || 1}
                      </span>
                      <span className="text-gray-500 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md uppercase text-[10px]">
                        {currentQ.questionType}
                      </span>
                    </div>
                  </div>

                  {/* Question Text Area */}
                  <div className="p-4 rounded-2xl bg-gray-50/70 border border-gray-200 text-sm font-semibold text-gray-900 leading-relaxed overflow-x-auto">
                    <CustomMarkdownRenderer content={currentQ.questionText} />
                  </div>

                  {/* Question Diagram / Image */}
                  {(() => {
                    const distinctImgs = getDistinctQuestionImages(currentQ);
                    if (distinctImgs.length === 0) return null;
                    return (
                      <div className="p-3 sm:p-4 rounded-2xl bg-white border border-gray-200 flex flex-col items-center justify-center space-y-3 shadow-2xs">
                        {distinctImgs.map((imgSrc: string, imgIdx: number) => (
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
                        ))}
                      </div>
                    );
                  })()}

                  {/* Options Selector Area */}
                  {currentQ.options && currentQ.options.length > 0 && (
                    <div className="space-y-2.5 pt-1">
                      {currentQ.options.map((opt) => {
                        const isChosen = currentAns === opt.id;

                        return (
                          <div
                            key={opt.id}
                            onClick={() => handleSelectOption(opt.id)}
                            className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between text-xs sm:text-sm font-medium cursor-pointer ${
                              isChosen
                                ? "border-purple-600 bg-purple-50/50 text-purple-950 font-bold ring-2 ring-purple-600/20"
                                : "border-gray-200 bg-white text-gray-800 hover:border-purple-200 hover:bg-gray-50/50"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0 pr-2">
                              <span
                                className={`h-7 w-7 rounded-xl font-black text-xs uppercase flex items-center justify-center shrink-0 transition-all ${
                                  isChosen
                                    ? "bg-purple-600 text-white shadow-xs"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {opt.id}
                              </span>
                              <div className="leading-relaxed">
                                <CustomMarkdownRenderer content={opt.text} compact />
                              </div>
                            </div>

                            <div className="shrink-0 pl-2">
                              <CircleDot
                                className={`h-4 w-4 sm:h-5 sm:w-5 transition-all ${
                                  isChosen ? "text-purple-600 fill-purple-600" : "text-gray-300"
                                }`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Control Bar */}
              <div className="h-14 sm:h-16 bg-white border-t border-gray-200 px-4 sm:px-6 flex items-center justify-between shrink-0 gap-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearResponse}
                    className="h-9 px-3 text-xs font-bold rounded-xl border-gray-200 text-gray-600 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    <span className="hidden sm:inline">Clear Response</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleMarkForReviewAndNext}
                    className="h-9 px-3 text-xs font-bold rounded-xl border-purple-200 text-purple-700 bg-purple-50 hover:bg-purple-100"
                  >
                    <Flag className="h-3.5 w-3.5 mr-1 text-purple-600" />
                    <span className="hidden sm:inline">Mark for Review & Next</span>
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentQIndex === 0}
                    onClick={() => navigateToQuestion(currentQIndex - 1)}
                    className="h-9 px-3 text-xs font-bold rounded-xl border-gray-200"
                  >
                    <ChevronLeft className="h-4 w-4 mr-0.5" />
                    <span className="hidden sm:inline">Previous</span>
                  </Button>

                  <Button
                    size="sm"
                    onClick={handleSaveAndNext}
                    className="h-9 px-4 sm:px-5 bg-gray-900 hover:bg-gray-800 text-white font-extrabold text-xs rounded-xl shadow-xs"
                  >
                    <span>Save & Next</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Right Column: Question Palette (Desktop View) */}
          <div className="hidden md:flex w-72 lg:w-80 flex-col h-full bg-white border-l border-gray-200 shrink-0">
            {/* Legend Area */}
            <div className="p-4 border-b border-gray-100 space-y-2.5">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                CBT STATUS LEGEND
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                    {paletteStats.answered}
                  </span>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-md bg-red-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                    {paletteStats.notAnswered}
                  </span>
                  <span>Not Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-md bg-purple-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                    {paletteStats.marked}
                  </span>
                  <span>Marked Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-md bg-purple-600 text-white relative flex items-center justify-center text-[10px] font-black shrink-0">
                    <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-1 ring-white" />
                    {paletteStats.answeredAndMarked}
                  </span>
                  <span>Ans & Marked</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <span className="h-5 w-5 rounded-md bg-gray-100 text-gray-600 border border-gray-200 flex items-center justify-center text-[10px] font-black shrink-0">
                    {paletteStats.notVisited}
                  </span>
                  <span>Not Visited</span>
                </div>
              </div>
            </div>

            {/* Questions Grid Header */}
            <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs font-black text-gray-900">
              <span>{activeSubject} Palette</span>
              <span className="text-[10px] text-gray-500">{subjectGroups[activeSubject]?.length || 0} Questions</span>
            </div>

            {/* Questions Grid Area */}
            <div className="flex-1 overflow-y-auto p-3.5 scrollbar-thin">
              <div className="grid grid-cols-5 gap-2">
                {activeMock.questions.map((q, idx) => {
                  const isCurrent = idx === currentQIndex;
                  const status = questionStatuses[q.id] || "not_visited";
                  let btnStyle = "bg-white text-gray-700 border-gray-200 hover:border-purple-300";

                  if (status === "answered") {
                    btnStyle = "bg-emerald-600 text-white border-emerald-700 font-black";
                  } else if (status === "not_answered") {
                    btnStyle = "bg-red-500 text-white border-red-600 font-black";
                  } else if (status === "marked_for_review") {
                    btnStyle = "bg-purple-600 text-white border-purple-700 font-black";
                  } else if (status === "answered_and_marked") {
                    btnStyle = "bg-purple-600 text-white border-purple-700 font-black ring-2 ring-emerald-400";
                  }

                  if (isCurrent) {
                    btnStyle += " ring-2 ring-purple-600 ring-offset-1 font-black";
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => navigateToQuestion(idx)}
                      className={`h-9 w-full rounded-xl border text-xs font-bold transition-all flex items-center justify-center cursor-pointer relative ${btnStyle}`}
                    >
                      {idx + 1}
                      {status === "answered_and_marked" && (
                        <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-1 ring-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Final Submit Button */}
            <div className="p-4 border-t border-gray-200">
              <Button
                onClick={() => setShowSubmitModal(true)}
                className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-xs"
              >
                Submit Final Test <Check className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Submit Confirmation Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <h3 className="text-base font-black text-gray-900">Submit Examination</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Are you sure you want to finish your test? Your score will be evaluated according to the official NEST Best 3 of 4 subjects merit policy.
              </p>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-2 text-xs font-bold">
                <div className="flex justify-between text-gray-600">
                  <span>Total Questions:</span>
                  <span className="text-gray-900">{activeMock.questions.length}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Answered:</span>
                  <span>{paletteStats.answered + paletteStats.answeredAndMarked}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Not Answered:</span>
                  <span>{paletteStats.notAnswered}</span>
                </div>
                <div className="flex justify-between text-purple-700">
                  <span>Marked for Review:</span>
                  <span>{paletteStats.marked}</span>
                </div>
                <div className="flex justify-between text-amber-700 pt-1 border-t border-gray-200">
                  <span>Time Remaining:</span>
                  <span className="font-mono">{formatTimer(timerSeconds)}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSubmitModal(false)}
                  className="h-9 text-xs font-bold rounded-xl"
                >
                  Resume Test
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleFinishMock(false)}
                  className="h-9 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl px-5"
                >
                  Confirm Submission
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW: MAIN LOBBY (Choose Topic + Year-Wise Mock Tests)
  // =========================================================================
  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToDashboard}
              className="h-8 px-2 text-gray-500 hover:text-gray-900 font-bold text-xs"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>

            <span className="text-gray-300">|</span>

            <Badge
              variant="outline"
              className="bg-purple-50 text-purple-700 border-purple-100 font-extrabold px-2.5 py-0.5 rounded-lg text-[10px]"
            >
              <Sparkles className="h-3 w-3 mr-1" /> Official NEST PYQ Repository (2017 – 2026)
            </Badge>
          </div>

          <h1 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            Previous Year Questions & Mock Tests <GraduationCap className="h-5 w-5 text-purple-600" />
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Take full-length simulated NEST mock tests from 2018 to 2025 or practice chapter-wise curated previous year questions.
          </p>
        </div>

        {/* Global Stats Counter */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="bg-gray-50 px-3.5 py-2 rounded-2xl border border-gray-100 text-center">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">PYQ Bank</span>
            <span className="text-sm font-black text-gray-900">{totalPYQsCount}+ Qs</span>
          </div>
          <div className="bg-purple-50 px-3.5 py-2 rounded-2xl border border-purple-100 text-center">
            <span className="text-[10px] font-black text-purple-600 uppercase tracking-wider block">Years</span>
            <span className="text-sm font-black text-purple-700">2018 – 2025</span>
          </div>
          <div className="bg-emerald-50 px-3.5 py-2 rounded-2xl border border-emerald-100 text-center">
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider block">Solved</span>
            <span className="text-sm font-black text-emerald-700">{solvedCount}</span>
          </div>
        </div>
      </div>

      {/* Main Section Navigation Switcher */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-2xs">
        <button
          onClick={() => setActiveTab("YEAR_MOCKS")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTab === "YEAR_MOCKS"
              ? "bg-purple-600 text-white shadow-xs"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Calendar className="h-4 w-4" /> 1. Year-Wise Previous Year Papers (2018 – 2025)
        </button>
        <button
          onClick={() => setActiveTab("TOPICS")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTab === "TOPICS"
              ? "bg-purple-600 text-white shadow-xs"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Layers className="h-4 w-4" /> 2. Choose Topic (Chapter-Wise PYQs)
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: YEAR-WISE FULL PAPERS & MOCK TESTS (2018 to 2025)              */}
      {/* ========================================================================= */}
      {activeTab === "YEAR_MOCKS" && (
        <div className="space-y-4">
          {/* Year Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto bg-white p-3.5 rounded-2xl border border-gray-100 shadow-2xs scrollbar-none">
            <span className="text-xs font-black text-gray-400 uppercase tracking-wider mr-2 shrink-0">
              Filter Year:
            </span>
            {["All", "2025", "2024", "2023", "2022", "2020", "2019", "2018"].map((yr) => {
              const isSelected = selectedYearFilter === yr;
              return (
                <button
                  key={yr}
                  onClick={() => setSelectedYearFilter(yr)}
                  className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? "bg-purple-600 text-white shadow-xs"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {yr === "All" ? "All Years (2018-2025)" : yr}
                </button>
              );
            })}
          </div>

          {/* Year Mocks Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredYearMocks.map((mock) => {
              const attempt = mock.mockId ? mockAttempts[mock.mockId] : null;

              return (
                <div
                  key={mock.id}
                  className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs hover:shadow-md hover:border-purple-200 transition-all duration-200 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-black bg-purple-600 text-white px-2.5 py-0.5 rounded-lg shadow-2xs">
                          NEST {mock.year}
                        </span>
                        <span className="text-[10px] font-extrabold bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-lg">
                          {mock.badge}
                        </span>
                      </div>

                      {attempt ? (
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Score: {attempt.evalScore || attempt.totalScore} / 180
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                          Unattempted
                        </span>
                      )}
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-base font-black text-gray-900 group-hover:text-purple-600 transition-colors leading-snug">
                        {mock.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">
                        {mock.subtitle}
                      </p>
                    </div>

                    {/* Test Specs Row */}
                    <div className="grid grid-cols-3 gap-2 py-2 border-y border-gray-50 text-center">
                      <div className="bg-gray-50 p-2 rounded-xl">
                        <span className="text-[9px] font-bold text-gray-400 block uppercase">Questions</span>
                        <span className="text-xs font-black text-gray-900">{mock.totalQuestions} Qs (4 Sec)</span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-xl">
                        <span className="text-[9px] font-bold text-gray-400 block uppercase">Duration</span>
                        <span className="text-xs font-black text-gray-900">{mock.durationMinutes} Mins</span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-xl">
                        <span className="text-[9px] font-bold text-gray-400 block uppercase">Best 3 Score</span>
                        <span className="text-xs font-black text-emerald-600">{mock.evalMarks} Marks</span>
                      </div>
                    </div>

                    {/* High-Yield Topics Covered */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                        High-Yield Topics Tested:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {mock.highYieldTopics.map((top) => (
                          <span key={top} className="text-[10px] font-bold bg-gray-50 text-gray-600 px-2 py-0.5 rounded-md border border-gray-100">
                            {top}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                    {mock.formatType === "CBT" ? (
                      <>
                        <Button
                          disabled={isStartingMock}
                          onClick={() => mock.mockId && handleStartPYQCBT(mock.mockId)}
                          className="flex-1 h-9 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs rounded-xl shadow-2xs cursor-pointer"
                        >
                          <PlayCircle className="mr-1.5 h-4 w-4" /> Start CBT Mock Test
                        </Button>
                        {mock.pdfUrl && (
                          <Button
                            variant="outline"
                            onClick={() => setActivePdfPaper({ title: mock.title, pdfUrl: mock.pdfUrl!, year: mock.year })}
                            className="h-9 font-bold text-xs rounded-xl border-gray-200 hover:bg-gray-50 cursor-pointer text-gray-700"
                          >
                            <FileText className="h-4 w-4 mr-1 text-purple-600" /> PDF
                          </Button>
                        )}
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => setActivePdfPaper({ title: mock.title, pdfUrl: mock.pdfUrl || `/pdfs/pyqs/nest_${mock.year}.pdf`, year: mock.year })}
                          className="flex-1 h-9 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <FileText className="h-4 w-4" /> Open Official PDF Viewer
                        </Button>
                        <a
                          href={mock.pdfUrl || `/pdfs/pyqs/nest_${mock.year}.pdf`}
                          download
                          target="_blank"
                          rel="noreferrer"
                          className="h-9 px-3 font-bold text-xs rounded-xl border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-700 transition-colors"
                        >
                          Download
                        </a>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: CHOOSE TOPIC / CHAPTER-WISE PYQs                               */}
      {/* ========================================================================= */}
      {activeTab === "TOPICS" && (
        <div className="space-y-4">
          {/* Top Filter Bar */}
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
            {/* Subject Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {["All", "Physics", "Chemistry", "Biology", "Mathematics"].map((subj) => {
                const isSelected = selectedTopicSubject.toLowerCase() === subj.toLowerCase();
                return (
                  <button
                    key={subj}
                    onClick={() => setSelectedTopicSubject(subj)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? "bg-purple-600 text-white shadow-xs"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {subj}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search topic or unit..."
                value={topicSearchQuery}
                onChange={(e) => setTopicSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 font-medium"
              />
            </div>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs hover:shadow-md hover:border-purple-200 transition-all duration-200 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg border ${getSubjectBadgeStyle(topic.subject)}`}>
                      {topic.subject}
                    </span>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px] font-bold">
                      {topic.difficulty}
                    </Badge>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      {topic.unit}
                    </span>
                    <h3 className="text-sm font-black text-gray-900 group-hover:text-purple-600 transition-colors mt-0.5 line-clamp-1">
                      {topic.name}
                    </h3>
                  </div>

                  {/* Years Appeared Chips */}
                  <div className="flex flex-wrap gap-1">
                    {topic.yearsAppeared.slice(0, 4).map((yr) => (
                      <span key={yr} className="text-[9px] font-bold bg-gray-50 text-gray-500 border border-gray-100 px-1.5 py-0.5 rounded">
                        {yr}
                      </span>
                    ))}
                    {topic.yearsAppeared.length > 4 && (
                      <span className="text-[9px] font-bold bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded">
                        +{topic.yearsAppeared.length - 4} yrs
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-xs font-black text-gray-700">
                    {topic.questionCount} Questions
                  </span>
                  <Button
                    size="sm"
                    onClick={() => handleOpenTopicSolver(topic)}
                    className="h-8 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-2xs cursor-pointer"
                  >
                    Solve Topic <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOPIC / PYQ QUICK SOLVER MODAL                                            */}
      {/* ========================================================================= */}
      {activeTopic && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${getSubjectBadgeStyle(activeTopic.subject)}`}>
                    {activeTopic.subject}
                  </Badge>
                  <span className="text-xs font-semibold text-gray-400">{activeTopic.unit}</span>
                </div>
                <h3 className="text-sm font-black text-gray-900 leading-snug">
                  {activeTopic.name}
                </h3>
              </div>

              <button
                onClick={() => setActiveTopic(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Question Box & Solver */}
            {isLoadingTopicQuestions ? (
              <div className="p-8 text-center space-y-2">
                <div className="h-6 w-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-bold text-gray-500">Loading questions...</p>
              </div>
            ) : topicQuestions.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <p className="text-xs font-bold text-gray-500">No questions found for this filter.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Question Progress Header */}
                <div className="flex items-center justify-between text-xs font-extrabold text-gray-500">
                  <span>Question {activeTopicQIndex + 1} of {topicQuestions.length}</span>
                  <span className="text-emerald-600">+3 / -1 Marks</span>
                </div>

                {/* Question Text */}
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <CustomMarkdownRenderer
                    content={topicQuestions[activeTopicQIndex]?.questionText || ""}
                  />
                </div>

                {/* Options */}
                {topicQuestions[activeTopicQIndex]?.options && (
                  <div className="space-y-2">
                    {topicQuestions[activeTopicQIndex].options!.map((opt) => {
                      const isSelected = selectedOption === opt.id;
                      let optionStyle = "bg-white border-gray-200 text-gray-800 hover:border-purple-300";

                      if (isTopicQSubmitted) {
                        if (opt.isCorrect) {
                          optionStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                        } else if (isSelected && !opt.isCorrect) {
                          optionStyle = "bg-red-50 border-red-400 text-red-900 font-bold";
                        } else {
                          optionStyle = "bg-gray-50 border-gray-200 text-gray-400 opacity-60";
                        }
                      } else if (isSelected) {
                        optionStyle = "bg-purple-50 border-purple-500 text-purple-900 font-bold ring-2 ring-purple-500/20";
                      }

                      return (
                        <button
                          key={opt.id}
                          disabled={isTopicQSubmitted}
                          onClick={() => setSelectedOption(opt.id)}
                          className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between text-xs ${optionStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="h-5 w-5 rounded bg-gray-100 font-extrabold text-gray-700 flex items-center justify-center text-[10px] uppercase shrink-0">
                              {opt.id}
                            </span>
                            <CustomMarkdownRenderer content={opt.text} />
                          </div>

                          {isTopicQSubmitted && opt.isCorrect && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Solution Explanation */}
                {isTopicQSubmitted && topicQuestions[activeTopicQIndex]?.solutionExplanation && (
                  <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 space-y-2 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-indigo-950">
                      <HelpCircle className="h-4 w-4 text-indigo-600 shrink-0" />
                      <span>Step-by-Step Solution & Key Formulae</span>
                    </div>
                    <div className="text-xs text-indigo-900 leading-relaxed font-medium">
                      <CustomMarkdownRenderer
                        content={topicQuestions[activeTopicQIndex].solutionExplanation!}
                      />
                    </div>
                  </div>
                )}

                {/* Modal Navigation Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={activeTopicQIndex === 0}
                    onClick={() => {
                      setActiveTopicQIndex((prev) => Math.max(0, prev - 1));
                      setSelectedOption(null);
                      setIsTopicQSubmitted(false);
                    }}
                    className="h-9 text-xs font-bold rounded-xl"
                  >
                    Previous
                  </Button>

                  {!isTopicQSubmitted ? (
                    <Button
                      size="sm"
                      disabled={!selectedOption}
                      onClick={handleSubmitTopicAnswer}
                      className="h-9 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl px-6 shadow-2xs disabled:opacity-50"
                    >
                      Submit Answer <Check className="ml-1.5 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => {
                        if (activeTopicQIndex < topicQuestions.length - 1) {
                          setActiveTopicQIndex((prev) => prev + 1);
                          setSelectedOption(null);
                          setIsTopicQSubmitted(false);
                        } else {
                          setActiveTopic(null);
                        }
                      }}
                      className="h-9 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl px-6"
                    >
                      {activeTopicQIndex < topicQuestions.length - 1 ? "Next Question →" : "Done"}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* OFFICIAL PYQ PDF VIEWER MODAL (2018 to 2021 & Archive Papers)            */}
      {/* ========================================================================= */}
      {activePdfPaper && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full h-full flex flex-col overflow-hidden shadow-2xl border border-gray-200">
            {/* Viewer Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-gray-900 text-white border-b border-gray-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white leading-tight">
                    {activePdfPaper.title}
                  </h3>
                  <span className="text-[10px] text-gray-400 font-semibold">
                    Official NISER / UM-DAE CEBS Question Paper Archive
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activePdfPaper.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="h-8 px-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Maximize2 className="h-3.5 w-3.5" /> Full Tab
                </a>
                <a
                  href={activePdfPaper.pdfUrl}
                  download
                  className="h-8 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  Download PDF
                </a>
                <button
                  onClick={() => setActivePdfPaper(null)}
                  className="h-8 w-8 rounded-lg bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white flex items-center justify-center transition-colors ml-1 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Embedded PDF iframe */}
            <div className="flex-1 w-full h-full bg-gray-100 relative">
              <iframe
                src={`${activePdfPaper.pdfUrl}#toolbar=1&navpanes=1`}
                className="w-full h-full border-0"
                title={activePdfPaper.title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
