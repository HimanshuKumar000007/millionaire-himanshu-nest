"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  PenTool,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Search,
  Filter,
  ArrowLeft,
  Check,
  RotateCcw,
  Bookmark,
  BookmarkCheck,
  HelpCircle,
  Award,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContentQuestion } from "@/lib/types/content";
import { questionEvaluationService } from "@/lib/services/questionEvaluation.service";
import { broadcastProgressUpdate } from "@/lib/services/progressOrchestrator.service";
import { pushPracticeAttempt } from "@/lib/supabase/sync.service";

interface PracticeViewProps {
  onBackToDashboard: () => void;
}

export function PracticeView({ onBackToDashboard }: PracticeViewProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [questions, setQuestions] = useState<ContentQuestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Student answer state per question: questionId -> userAnswer (string | string[])
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  // Student submitted evaluations: questionId -> { isCorrect: boolean, score: number, explanation: string, summary: string }
  const [evaluations, setEvaluations] = useState<Record<string, any>>({});
  // Bookmarks set of question IDs
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  // Load persistent state from localStorage
  useEffect(() => {
    try {
      const savedEvaluations = localStorage.getItem("nest_smartprep_practice_evaluations");
      if (savedEvaluations) setEvaluations(JSON.parse(savedEvaluations));

      const savedAnswers = localStorage.getItem("nest_smartprep_practice_answers");
      if (savedAnswers) setUserAnswers(JSON.parse(savedAnswers));

      const savedBookmarks = localStorage.getItem("nest_smartprep_practice_bookmarks");
      if (savedBookmarks) setBookmarks(new Set(JSON.parse(savedBookmarks)));
    } catch (e) {
      console.warn("[PracticeView] Error loading local state:", e);
    }
  }, []);

  const fetchQuestions = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (selectedSubject !== "All") params.append("subject", selectedSubject);
      if (selectedDifficulty !== "All") params.append("difficulty", selectedDifficulty);
      if (selectedType !== "All") params.append("type", selectedType);

      const res = await fetch(`/api/content/questions?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setQuestions(data.questions || []);
      }
    } catch (err) {
      console.error("[PracticeView] Error fetching questions:", err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedSubject, selectedDifficulty, selectedType]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // Extract unique topics for dropdown
  const availableTopics = Array.from(new Set(questions.map((q) => q.topic))).filter(Boolean);

  // Filtered Questions
  const filteredQuestions = questions.filter((q) => {
    const matchesTopic = selectedTopic === "All" || q.topic.toLowerCase() === selectedTopic.toLowerCase();
    const matchesSearch =
      q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.subtopic && q.subtopic.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTopic && matchesSearch;
  });

  const handleSelectAnswer = (qId: string, qType: string, optionId: string) => {
    if (evaluations[qId]) return; // locked if submitted

    if (qType === "MSQ") {
      const current = Array.isArray(userAnswers[qId]) ? [...userAnswers[qId]] : [];
      const index = current.indexOf(optionId);
      if (index >= 0) {
        current.splice(index, 1);
      } else {
        current.push(optionId);
      }
      const updated = { ...userAnswers, [qId]: current };
      setUserAnswers(updated);
      try {
        localStorage.setItem("nest_smartprep_practice_answers", JSON.stringify(updated));
      } catch (e) {}
    } else {
      const updated = { ...userAnswers, [qId]: optionId };
      setUserAnswers(updated);
      try {
        localStorage.setItem("nest_smartprep_practice_answers", JSON.stringify(updated));
      } catch (e) {}
    }
  };

  const handleNumericalInput = (qId: string, val: string) => {
    if (evaluations[qId]) return;
    const updated = { ...userAnswers, [qId]: val };
    setUserAnswers(updated);
    try {
      localStorage.setItem("nest_smartprep_practice_answers", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleSubmitQuestion = (q: ContentQuestion) => {
    const answer = userAnswers[q.id];
    if (answer === undefined || answer === "") return;

    const result = questionEvaluationService.evaluate(q, answer);

    const updatedEvaluations = {
      ...evaluations,
      [q.id]: result,
    };
    setEvaluations(updatedEvaluations);

    try {
      localStorage.setItem("nest_smartprep_practice_evaluations", JSON.stringify(updatedEvaluations));
      broadcastProgressUpdate();

      // Sync attempt to Supabase
      pushPracticeAttempt(q.id, {
        isCorrect: result.isCorrect,
        selectedOption: typeof answer === "string" ? answer : JSON.stringify(answer),
        subject: q.subject,
        topic: q.topic,
      }).catch(() => {});
    } catch (e) {
      console.warn("Failed to persist evaluation:", e);
    }
  };

  const handleReattempt = (qId: string) => {
    const nextAnswers = { ...userAnswers };
    delete nextAnswers[qId];
    setUserAnswers(nextAnswers);

    const nextEvals = { ...evaluations };
    delete nextEvals[qId];
    setEvaluations(nextEvals);

    try {
      localStorage.setItem("nest_smartprep_practice_answers", JSON.stringify(nextAnswers));
      localStorage.setItem("nest_smartprep_practice_evaluations", JSON.stringify(nextEvals));
      broadcastProgressUpdate();
    } catch (e) {}
  };

  const toggleBookmark = (qId: string) => {
    const next = new Set(bookmarks);
    if (next.has(qId)) {
      next.delete(qId);
    } else {
      next.add(qId);
    }
    setBookmarks(next);
    try {
      localStorage.setItem("nest_smartprep_practice_bookmarks", JSON.stringify(Array.from(next)));
      broadcastProgressUpdate();
    } catch (e) {}
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

  const solvedCount = Object.keys(evaluations).length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
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

            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 font-extrabold px-2.5 py-0.5 rounded-lg text-[10px]">
              <Sparkles className="h-3 w-3 mr-1" /> High-Yield Practice Bank
            </Badge>
          </div>

          <h1 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            NEST Practice Bank <PenTool className="h-5 w-5 text-emerald-600" />
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Solve topic-wise practice questions loaded from file-based repositories with canonical +4/-1 scoring rules.
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-100 text-center">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Available</span>
            <span className="text-base font-black text-gray-900">{questions.length}</span>
          </div>
          <div className="bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-100 text-center">
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider block">Solved</span>
            <span className="text-base font-black text-emerald-700">{solvedCount}</span>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
        {/* Subject Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {["All", "Physics", "Chemistry", "Biology", "Mathematics"].map((subj) => {
            const isSelected = selectedSubject.toLowerCase() === subj.toLowerCase();
            return (
              <button suppressHydrationWarning
                key={subj}
                onClick={() => {
                  setSelectedSubject(subj);
                  setSelectedTopic("All");
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all shrink-0 ${
                  isSelected
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {subj}
              </button>
            );
          })}
        </div>

        {/* Topic, Difficulty & Type Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {availableTopics.length > 0 && (
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-extrabold text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="All">All Topics</option>
              {availableTopics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          )}

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-extrabold text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="All">All Difficulties</option>
            <option value="Core Foundation">Core Foundation</option>
            <option value="High-Yield">High-Yield</option>
            <option value="Advanced">Advanced</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-extrabold text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="All">All Types</option>
            <option value="MCQ">MCQ</option>
            <option value="MSQ">MSQ</option>
            <option value="Numerical">Numerical</option>
          </select>

          <div className="relative w-full md:w-52">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input suppressHydrationWarning
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Questions List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs space-y-4 animate-pulse">
              <div className="h-4 w-32 bg-gray-100 rounded-md" />
              <div className="h-6 w-3/4 bg-gray-200 rounded-md" />
              <div className="h-24 w-full bg-gray-100 rounded-2xl" />
            </div>
          ))}
        </div>
      ) : filteredQuestions.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-4 shadow-2xs">
          <div className="h-14 w-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto text-gray-400">
            <PenTool className="h-7 w-7" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-base font-extrabold text-gray-900">
              Practice questions will appear here as content is added
            </h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              No questions in <code className="text-gray-700 bg-gray-100 px-1 py-0.5 rounded text-[11px]">/content/nest/{selectedSubject.toLowerCase()}/questions/</code> match the selected filters.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredQuestions.map((q) => {
            const answer = userAnswers[q.id];
            const evalResult = evaluations[q.id];
            const isBookmarked = bookmarks.has(q.id);

            return (
              <div
                key={q.id}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs space-y-5 transition-all duration-200"
              >
                {/* Header Metadata */}
                <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg border ${getSubjectBadgeStyle(q.subject)}`}>
                      {q.subject}
                    </span>
                    <span className="text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 px-2.5 py-0.5 rounded-lg">
                      {q.topic}
                    </span>
                    <span className="text-xs font-semibold text-gray-400">
                      {q.difficulty}
                    </span>
                    <span className="text-[10px] bg-purple-50 text-purple-700 font-extrabold px-2 py-0.5 rounded-md border border-purple-200">
                      {q.questionType}
                    </span>
                    {q.source === "development-example" && (
                      <span className="text-[9px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-md border border-amber-200">
                        Dev Example
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button suppressHydrationWarning
                      onClick={() => toggleBookmark(q.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 transition-colors"
                      title={isBookmarked ? "Remove Bookmark" : "Bookmark Question"}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="h-4 w-4 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </button>

                    {evalResult ? (
                      <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
                        evalResult.isCorrect
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {evalResult.isCorrect ? `+${q.marks || 4} Marks` : `-${q.negativeMarks || 1} Mark`}
                      </span>
                    ) : (
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        +4 / -1 Marks
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Text */}
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                    Question ID: <code className="text-gray-600">{q.id}</code>
                  </span>
                  <p className="text-sm font-bold text-gray-900 leading-relaxed">
                    {q.questionText}
                  </p>
                </div>

                {/* Options / Input Field */}
                {q.questionType === "MCQ" && q.options && (
                  <div className="space-y-2">
                    {q.options.map((opt) => {
                      const isSelected = answer === opt.id;
                      let optionStyle = "bg-white border-gray-200 text-gray-800 hover:border-emerald-300";

                      if (evalResult) {
                        if (opt.isCorrect) {
                          optionStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                        } else if (isSelected && !opt.isCorrect) {
                          optionStyle = "bg-red-50 border-red-400 text-red-900 font-bold";
                        } else {
                          optionStyle = "bg-gray-50 border-gray-200 text-gray-400 opacity-60";
                        }
                      } else if (isSelected) {
                        optionStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-500/20";
                      }

                      return (
                        <button suppressHydrationWarning
                          key={opt.id}
                          disabled={!!evalResult}
                          onClick={() => handleSelectAnswer(q.id, "MCQ", opt.id)}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between text-xs ${optionStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="h-6 w-6 rounded-lg bg-gray-100 font-extrabold text-gray-700 flex items-center justify-center text-[11px] uppercase shrink-0">
                              {opt.id}
                            </span>
                            <span className="font-medium leading-relaxed">{opt.text}</span>
                          </div>

                          {evalResult && opt.isCorrect && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {q.questionType === "MSQ" && q.options && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-extrabold text-gray-500 italic block">
                      Select ALL options that apply:
                    </span>
                    {q.options.map((opt) => {
                      const selectedList: string[] = Array.isArray(answer) ? answer : [];
                      const isSelected = selectedList.includes(opt.id);
                      let optionStyle = "bg-white border-gray-200 text-gray-800 hover:border-emerald-300";

                      if (evalResult) {
                        if (opt.isCorrect) {
                          optionStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                        } else if (isSelected && !opt.isCorrect) {
                          optionStyle = "bg-red-50 border-red-400 text-red-900 font-bold";
                        } else {
                          optionStyle = "bg-gray-50 border-gray-200 text-gray-400 opacity-60";
                        }
                      } else if (isSelected) {
                        optionStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-500/20";
                      }

                      return (
                        <button suppressHydrationWarning
                          key={opt.id}
                          disabled={!!evalResult}
                          onClick={() => handleSelectAnswer(q.id, "MSQ", opt.id)}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between text-xs ${optionStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="h-6 w-6 rounded-lg bg-gray-100 font-extrabold text-gray-700 flex items-center justify-center text-[11px] uppercase shrink-0">
                              {opt.id}
                            </span>
                            <span className="font-medium leading-relaxed">{opt.text}</span>
                          </div>

                          <div className={`h-4 w-4 rounded border flex items-center justify-center ${isSelected ? "bg-emerald-600 border-emerald-600 text-white" : "border-gray-300"}`}>
                            {isSelected && <Check className="h-3 w-3" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {q.questionType === "Numerical" && (
                  <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                    <span className="text-xs font-extrabold text-gray-700 block">
                      Enter your numeric answer:
                    </span>
                    <input suppressHydrationWarning
                      type="number"
                      step="any"
                      placeholder="e.g. 3.0 or 0.785"
                      value={answer || ""}
                      disabled={!!evalResult}
                      onChange={(e) => handleNumericalInput(q.id, e.target.value)}
                      className="w-full md:w-64 px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-mono font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                )}

                {/* Solution Explanation (Revealed after evaluation) */}
                {evalResult && (
                  <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 space-y-2 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-xs font-extrabold text-indigo-950">
                      <span className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-indigo-600 shrink-0" />
                        Solution Explanation
                      </span>
                      <span className="text-indigo-700 font-bold">{evalResult.correctAnswerSummary}</span>
                    </div>
                    <p className="text-xs text-indigo-900 font-medium leading-relaxed whitespace-pre-line">
                      {evalResult.explanation}
                    </p>
                    {q.keyFormulae && q.keyFormulae.length > 0 && (
                      <div className="pt-1 flex flex-wrap gap-1.5">
                        {q.keyFormulae.map((f, fIdx) => (
                          <span key={fIdx} className="text-[10px] font-mono font-bold text-indigo-800 bg-white px-2 py-0.5 rounded-md border border-indigo-200">
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Card Action */}
                <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-3">
                  {!evalResult ? (
                    <Button
                      size="sm"
                      disabled={answer === undefined || answer === "" || (Array.isArray(answer) && answer.length === 0)}
                      onClick={() => handleSubmitQuestion(q)}
                      className="h-9 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl px-6 shadow-2xs disabled:opacity-50"
                    >
                      Submit Answer <Check className="ml-1.5 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReattempt(q.id)}
                      className="h-9 text-xs font-bold rounded-xl text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                    >
                      Re-attempt <RotateCcw className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
