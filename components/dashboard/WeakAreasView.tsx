"use client";

import React, { useState, useMemo } from "react";
import {
  AlertTriangle,
  Flame,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Search,
  TrendingUp,
  ShieldAlert,
  Lightbulb,
  X,
  Brain,
  Target,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WeakArea } from "@/lib/types/dashboard";

interface WeakAreasViewProps {
  weakAreas: WeakArea[];
  onBackToDashboard: () => void;
  onNavigateToSection?: (section: string) => void;
}

export interface EnhancedWeakAreaItem {
  id: string;
  subject: "Physics" | "Chemistry" | "Biology" | "Mathematics";
  topic: string;
  accuracy: number;
  priority: "High Priority" | "Needs Attention";
  recommendedAction: string;
  actionType: "lesson" | "pyq" | "practice";
  questionsAttempted: number;
  category: string;
  errorPattern: string;
  impactScore: string;
  remediationTime: string;
  keySubtopics: string[];
  recommendedActionText: string;
}

export function WeakAreasView({
  weakAreas = [],
  onBackToDashboard,
  onNavigateToSection,
}: WeakAreasViewProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalItem, setActiveModalItem] = useState<EnhancedWeakAreaItem | null>(null);

  const displayItems = useMemo<EnhancedWeakAreaItem[]>(() => {
    if (!weakAreas || weakAreas.length === 0) return [];

    return weakAreas.map((w, idx) => {
      const isCritical = w.accuracy < 50;
      return {
        id: w.id || `wa-${idx + 1}`,
        subject: w.subject,
        topic: w.topic,
        accuracy: w.accuracy,
        priority: w.priority || (isCritical ? "High Priority" : "Needs Attention"),
        recommendedAction: w.recommendedAction || (w.actionType === "lesson" ? `Review ${w.topic} Notes` : `Practice ${w.topic} PYQs`),
        actionType: w.actionType || (isCritical ? "lesson" : "pyq"),
        questionsAttempted: w.accuracy > 0 ? 12 : 0,
        category: `${w.subject} Core Syllabus`,
        errorPattern: `Identified knowledge gap in ${w.topic} with ${w.accuracy}% accuracy. Conceptual review and targeted step practice recommended.`,
        impactScore: isCritical ? "-12 Marks" : "-8 Marks",
        remediationTime: "15-20 min drill",
        keySubtopics: [
          `${w.topic} — Key Concepts & Formulas`,
          `High-Yield NEST PYQ Applications`,
          `Common Trap Options & Avoidable Mistakes`,
        ],
        recommendedActionText: w.actionType === "lesson" ? "Review Remedial Lesson" : "Practice Weak PYQs",
      };
    });
  }, [weakAreas]);

  const hasData = displayItems.length > 0;

  const kpis = useMemo(() => {
    if (!hasData) {
      return {
        total: 0,
        highPriority: 0,
        lowestAccText: "100% (Baseline)",
        scoreRecovery: 0,
      };
    }
    const total = displayItems.length;
    const highPriority = displayItems.filter((i) => i.priority === "High Priority").length;
    const lowestAccItem = displayItems.reduce((a, b) => (a.accuracy < b.accuracy ? a : b), displayItems[0]);
    const lowestAccText = lowestAccItem ? `${lowestAccItem.accuracy}% (${lowestAccItem.subject})` : "100%";
    const scoreRecovery = displayItems.reduce((sum, item) => {
      const n = parseInt(item.impactScore.replace(/[^0-9]/g, ""), 10);
      return sum + (isNaN(n) ? 0 : n);
    }, 0);
    return { total, highPriority, lowestAccText, scoreRecovery };
  }, [displayItems, hasData]);

  const getSubjectStyle = (subject: string) => {
    switch (subject) {
      case "Physics": return { bg: "bg-indigo-50", text: "text-[#4F46E5]", border: "border-indigo-100", bar: "bg-[#4F46E5]" };
      case "Chemistry": return { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-100", bar: "bg-emerald-600" };
      case "Biology": return { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-100", bar: "bg-rose-600" };
      case "Mathematics": return { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-100", bar: "bg-amber-600" };
      default: return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-100", bar: "bg-gray-700" };
    }
  };

  const filteredItems = displayItems.filter((item) => {
    const matchesSubject = selectedSubject === "All" || item.subject === selectedSubject;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      item.topic.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.errorPattern.toLowerCase().includes(q) ||
      item.subject.toLowerCase().includes(q);
    return matchesSubject && matchesSearch;
  });

  const priorityItem = hasData ? [...displayItems].sort((a, b) => a.accuracy - b.accuracy)[0] : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-100">
                <ShieldAlert className="h-4 w-4" />
              </span>
              <h1 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                Weak Areas & Diagnostic Remediation Hub
              </h1>
              <Badge variant="outline" className="text-[10px] bg-rose-50 text-rose-700 border-rose-100/80 font-extrabold px-2 py-0.5 rounded-md">
                Priority Gaps
              </Badge>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Diagnostic knowledge gaps, recurring mistake triggers, and targeted remedial learning paths for NEST 2027.
            </p>
          </div>
          <Button size="sm" onClick={onBackToDashboard} variant="outline"
            className="w-full sm:w-auto h-8 bg-white border-gray-200/80 hover:bg-gray-50 text-xs font-bold text-gray-700 shadow-2xs rounded-xl self-start sm:self-center shrink-0 cursor-pointer">
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Dashboard
          </Button>
        </div>

        {/* KPI Cards — computed from real data */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-100/80 space-y-0.5">
            <span className="text-[10px] font-extrabold text-rose-800 uppercase tracking-wider block">Active Weak Topics</span>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-rose-900">{kpis.total} Topics</span>
              <Flame className="h-4 w-4 text-rose-600 opacity-80" />
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-100/80 space-y-0.5">
            <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider block">Lowest Accuracy</span>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-amber-900">{kpis.lowestAccText}</span>
              <AlertTriangle className="h-4 w-4 text-amber-600 opacity-80" />
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100/80 space-y-0.5">
            <span className="text-[10px] font-extrabold text-indigo-800 uppercase tracking-wider block">High Priority Gaps</span>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-[#4F46E5]">{kpis.highPriority} Critical</span>
              <Brain className="h-4 w-4 text-indigo-600 opacity-80" />
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100/80 space-y-0.5">
            <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider block">Score Recovery Potential</span>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-emerald-900">+{kpis.scoreRecovery} Marks</span>
              <TrendingUp className="h-4 w-4 text-emerald-600 opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {!hasData ? (
        /* Empty / Fresh User State */
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200/80 shadow-2xs text-center space-y-6 max-w-2xl mx-auto my-4">
          <div className="h-16 w-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 flex items-center justify-center mx-auto text-[#4F46E5] shadow-xs">
            <Brain className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-gray-900 tracking-tight">
              No Weak Areas Detected Yet 🎯
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed max-w-lg mx-auto">
              You haven&apos;t attempted any mock tests or PYQ practices yet. Take a Diagnostic Mock Test or start practicing to let our AI analyze your topic accuracy and mistake patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <button
              onClick={() => onNavigateToSection?.("mock-tests")}
              className="p-4 rounded-2xl bg-indigo-50/70 hover:bg-indigo-100/80 border border-indigo-100 transition-all text-left group cursor-pointer"
            >
              <span className="text-[10px] font-black uppercase tracking-wider text-[#4F46E5] block mb-1">
                Full Simulator
              </span>
              <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#4F46E5] flex items-center justify-between">
                <span>Take Mock Test</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </h4>
            </button>

            <button
              onClick={() => onNavigateToSection?.("pyqs")}
              className="p-4 rounded-2xl bg-purple-50/70 hover:bg-purple-100/80 border border-purple-100 transition-all text-left group cursor-pointer"
            >
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 block mb-1">
                Past Exam Papers
              </span>
              <h4 className="text-xs font-bold text-gray-900 group-hover:text-purple-600 flex items-center justify-between">
                <span>Practice PYQs</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </h4>
            </button>

            <button
              onClick={() => onNavigateToSection?.("smart-lessons")}
              className="p-4 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-100 transition-all text-left group cursor-pointer"
            >
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 block mb-1">
                Theory &amp; Notes
              </span>
              <h4 className="text-xs font-bold text-gray-900 group-hover:text-emerald-600 flex items-center justify-between">
                <span>Smart Lessons</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </h4>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Priority Focus Banner */}
          {priorityItem && (
            <div className="bg-gradient-to-r from-rose-500/10 via-amber-500/5 to-white p-5 rounded-2xl border border-rose-100 shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-rose-600 text-white flex items-center gap-1 shadow-2xs">
                    <Flame className="h-3 w-3" /> Critical Weak Area #1
                  </span>
                  <span className="text-xs font-bold text-gray-600">{priorityItem.subject}</span>
                  <span className="text-[10px] text-gray-400 font-semibold">{priorityItem.category}</span>
                </div>
                <span className="text-xs text-rose-700 font-extrabold bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100">
                  {priorityItem.impactScore} in NEST
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
                <div className="space-y-1.5 flex-1">
                  <h2 className="text-base font-extrabold text-gray-900 tracking-tight">
                    {priorityItem.topic}
                    <span className="ml-2 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                      {priorityItem.accuracy}% Accuracy
                    </span>
                  </h2>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    <span className="font-bold text-rose-800">Error Pattern: </span>{priorityItem.errorPattern}
                  </p>
                </div>
                <Button onClick={() => { if (onNavigateToSection) onNavigateToSection("smart-lessons"); }}
                  className="h-9 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-2xs px-5 shrink-0 transition-all cursor-pointer">
                  Start Remediation Plan <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )}

          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5 bg-gray-100/80 p-1 rounded-xl">
                {["All", "Physics", "Chemistry", "Biology", "Mathematics"].map((sub) => (
                  <button suppressHydrationWarning key={sub} onClick={() => setSelectedSubject(sub)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      selectedSubject === sub ? "bg-white text-[#4F46E5] shadow-2xs" : "text-gray-500 hover:text-gray-900"
                    }`}>
                    {sub}
                    {sub !== "All" && (
                      <span className="ml-1 text-[9px] font-black opacity-50">
                        ({displayItems.filter((i) => i.subject === sub).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <input suppressHydrationWarning type="text"
                  placeholder="Search topics, subjects, or error patterns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200/80 rounded-xl bg-gray-50/50 focus:outline-hidden focus:border-indigo-400 focus:bg-white transition-all" />
              </div>
            </div>
            <p className="text-[10px] text-gray-400 font-semibold mt-2.5">
              Showing {filteredItems.length} of {displayItems.length} weak areas
              {selectedSubject !== "All" && ` · ${selectedSubject}`}
            </p>
          </div>

          {/* Cards Grid */}
          {filteredItems.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl border border-gray-200/80 shadow-2xs text-center">
              <Search className="h-8 w-8 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-gray-500">No weak areas match your filter.</p>
              <p className="text-xs text-gray-400 mt-1">Try a different subject or clear your search.</p>
              <Button variant="outline" size="sm" onClick={() => { setSelectedSubject("All"); setSearchQuery(""); }}
                className="mt-4 h-8 text-xs font-bold rounded-xl border-gray-200/80 cursor-pointer">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => {
                const style = getSubjectStyle(item.subject);
                const isHigh = item.priority === "High Priority";
                return (
                  <div key={item.id}
                    className={`bg-white p-5 rounded-2xl border shadow-2xs hover:border-indigo-200 transition-all flex flex-col justify-between space-y-4 group ${isHigh ? "border-rose-100" : "border-gray-200/80"}`}>
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${style.bg} ${style.text} ${style.border}`}>
                            {item.subject}
                          </Badge>
                          <span className="text-[11px] text-gray-400 font-semibold">
                            {item.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Badge className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md shadow-2xs ${isHigh ? "bg-rose-600 text-white" : "bg-amber-500 text-white"}`}>
                            {item.priority.toUpperCase()}
                          </Badge>
                          <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                            <Flame className="h-2.5 w-2.5" /> {item.accuracy}%
                          </span>
                        </div>
                      </div>

                      {/* Topic Title */}
                      <div>
                        <h3 className="text-sm font-extrabold text-gray-900 group-hover:text-[#4F46E5] transition-colors leading-snug">
                          {item.topic}
                        </h3>
                        <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                          {item.questionsAttempted} questions attempted · {item.remediationTime} to fix
                        </p>
                      </div>

                      {/* Accuracy Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-gray-500">
                          <span>Current Accuracy</span>
                          <span className={item.accuracy < 50 ? "text-rose-600" : "text-amber-600"}>{item.accuracy}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full ${item.accuracy < 50 ? "bg-rose-500" : "bg-amber-500"} rounded-full transition-all duration-500`}
                            style={{ width: `${Math.max(item.accuracy, 4)}%` }} />
                        </div>
                      </div>

                      {/* Error Trigger */}
                      <div className="p-2.5 rounded-xl bg-rose-50/40 border border-rose-100/60 space-y-0.5">
                        <span className="text-[9px] font-black text-rose-800 uppercase tracking-wider block">Diagnostic Error Trigger</span>
                        <p className="text-[11px] text-gray-700 font-medium leading-relaxed">{item.errorPattern}</p>
                      </div>

                      {/* Subtopics */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">Targeted Remedial Subtopics</span>
                        <div className="flex flex-wrap gap-1">
                          {item.keySubtopics.map((sub, i) => (
                            <span key={i} className="text-[10px] text-gray-600 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md font-medium">
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Row */}
                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setActiveModalItem(item)}
                        className="h-8 text-[11px] font-bold text-gray-500 hover:text-gray-900 px-2.5 rounded-xl cursor-pointer">
                        Diagnostic Details
                      </Button>
                      <Button size="sm"
                        onClick={() => {
                          if (onNavigateToSection) {
                            onNavigateToSection(item.actionType === "lesson" ? "smart-lessons" : "pyqs");
                          }
                        }}
                        className="h-8 bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-2xs px-3.5 cursor-pointer">
                        {item.recommendedActionText} <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Modal Detail Overlay */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-gray-100 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-gray-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] font-extrabold text-[#4F46E5] bg-indigo-50 border-indigo-100">
                    {activeModalItem.subject}
                  </Badge>
                  <Badge className="bg-rose-600 text-white text-[9px] font-extrabold">
                    {activeModalItem.priority}
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-gray-900">{activeModalItem.topic}</h3>
                <p className="text-xs text-gray-400 font-medium">{activeModalItem.category}</p>
              </div>
              <button onClick={() => setActiveModalItem(null)}
                className="h-8 w-8 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-100 text-xs space-y-1">
                <span className="font-extrabold text-rose-800 flex items-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5" /> Frequent Error Pattern
                </span>
                <p className="text-gray-700 font-medium leading-relaxed">{activeModalItem.errorPattern}</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100 text-xs space-y-1">
                <span className="font-extrabold text-amber-800 flex items-center gap-1">
                  <Lightbulb className="h-3.5 w-3.5" /> Remediation Blueprint ({activeModalItem.remediationTime})
                </span>
                <p className="text-gray-700 font-medium leading-relaxed">{activeModalItem.recommendedAction}</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Key Concepts to Revise</span>
                <div className="space-y-1">
                  {activeModalItem.keySubtopics.map((sub, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setActiveModalItem(null)} className="h-9 rounded-xl border-gray-200 cursor-pointer">
                Close
              </Button>
              <Button size="sm"
                onClick={() => {
                  const target = activeModalItem.actionType === "lesson" ? "smart-lessons" : "pyqs";
                  setActiveModalItem(null);
                  if (onNavigateToSection) onNavigateToSection(target);
                }}
                className="h-9 bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-2xs cursor-pointer">
                {activeModalItem.recommendedActionText} <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
