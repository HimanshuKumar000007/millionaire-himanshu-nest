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

const defaultWeakItems: EnhancedWeakAreaItem[] = [
  {
    id: "wa-1",
    topic: "The Living World",
    subject: "Biology",
    accuracy: 54,
    priority: "High Priority",
    recommendedAction: "Review Characteristics of Life & Taxonomical Hierarchy",
    questionsAttempted: 24,
    actionType: "lesson",
    category: "Diversity of Living Organisms",
    errorPattern:
      "Frequent confusion between taxonomical hierarchy rankings (Order vs Family) and formatting rules for binomial nomenclature (italics, author citation).",
    impactScore: "-12 Marks",
    remediationTime: "14 min module",
    keySubtopics: [
      "Characteristics of Life & Living",
      "Three Domains of Life (Woese system)",
      "Taxonomical Hierarchy — Kingdom to Species",
      "Binomial Nomenclature Rules (ICBN)",
    ],
    recommendedActionText: "Review Remedial Lesson",
  },
  {
    id: "wa-2",
    topic: "Plant Kingdom",
    subject: "Biology",
    accuracy: 59,
    priority: "High Priority",
    recommendedAction: "Revise Alternation of Generations & Plant Group Distinctions",
    questionsAttempted: 41,
    actionType: "lesson",
    category: "Diversity of Living Organisms",
    errorPattern:
      "Confusion between haplontic, diplontic, and haplo-diplontic life cycles across plant groups. Misidentifying characteristic features of Cycas vs Pinus vs angiosperms.",
    impactScore: "-10 Marks",
    remediationTime: "25 min module",
    keySubtopics: [
      "Algae — Green, Red, Brown & Economic Importance",
      "Bryophytes vs Pteridophytes — Key Differences",
      "Alternation of Generations — Gametophyte vs Sporophyte",
      "Gymnosperms & Angiosperms — Distinguishing Features",
    ],
    recommendedActionText: "Review Remedial Lesson",
  },
  {
    id: "wa-3",
    topic: "Molecular Basis of Inheritance",
    subject: "Biology",
    accuracy: 57,
    priority: "High Priority",
    recommendedAction: "Revise DNA Replication Steps, Transcription & Translation Machinery",
    questionsAttempted: 47,
    actionType: "pyq",
    category: "Genetics & Evolution",
    errorPattern:
      "Mixing up enzymes in DNA replication (primase, helicase, ligase roles). Errors identifying template vs coding strand during transcription, and confusing codons/anticodons.",
    impactScore: "-12 Marks",
    remediationTime: "35 min PYQ drill",
    keySubtopics: [
      "DNA Replication — Enzymes, Okazaki Fragments, Primer",
      "Transcription — Template Strand, RNA Polymerase, mRNA",
      "Translation — Ribosomes, tRNA, Codon-Anticodon Pairing",
      "Lac Operon — Inducible Gene Regulation Mechanism",
    ],
    recommendedActionText: "Practice Weak PYQs",
  },
  {
    id: "wa-4",
    topic: "Some Basic Concepts of Chemistry",
    subject: "Chemistry",
    accuracy: 61,
    priority: "High Priority",
    recommendedAction: "Practice Mole Concept & Stoichiometric Calculation PYQs",
    questionsAttempted: 38,
    actionType: "pyq",
    category: "Physical Chemistry",
    errorPattern:
      "Misapplying molar volume vs empirical formula calculations under STP conditions. Confusing limiting reagent identification in multi-step reactions.",
    impactScore: "-10 Marks",
    remediationTime: "30 min PYQ drill",
    keySubtopics: [
      "Mole Concept & Molar Mass",
      "Empirical & Molecular Formula Determination",
      "Limiting Reagent & Percentage Yield Calculations",
      "Stoichiometric Ratios in Chemical Equations",
    ],
    recommendedActionText: "Practice Weak PYQs",
  },
  {
    id: "wa-5",
    topic: "Chemical Equilibrium",
    subject: "Chemistry",
    accuracy: 63,
    priority: "Needs Attention",
    recommendedAction: "Practice Le Chatelier Principle & Equilibrium Constant Calculations",
    questionsAttempted: 34,
    actionType: "pyq",
    category: "Physical Chemistry",
    errorPattern:
      "Incorrect application of Le Chatelier's principle when multiple stresses (temperature + pressure) are applied simultaneously. Errors in Kc vs Kp expressions for heterogeneous equilibria.",
    impactScore: "-8 Marks",
    remediationTime: "28 min PYQ drill",
    keySubtopics: [
      "Kc & Kp Expressions — Homogeneous vs Heterogeneous",
      "Le Chatelier's Principle — Temp, Pressure, Concentration",
      "Degree of Dissociation & Equilibrium Calculations",
      "Buffer Solutions & Henderson-Hasselbalch Equation",
    ],
    recommendedActionText: "Practice Weak PYQs",
  },
  {
    id: "wa-6",
    topic: "Units and Measurements",
    subject: "Physics",
    accuracy: 65,
    priority: "Needs Attention",
    recommendedAction: "Review Dimensional Analysis & Significant Figures Blueprint",
    questionsAttempted: 31,
    actionType: "lesson",
    category: "Physical World & Measurement",
    errorPattern:
      "Errors in SI unit conversion for derived quantities (e.g., pressure in Pascal, torque in N·m). Incorrect rounding with significant figures in multi-step calculations.",
    impactScore: "-8 Marks",
    remediationTime: "20 min module",
    keySubtopics: [
      "SI Base Units & Derived Units",
      "Dimensional Analysis — Formula Verification",
      "Significant Figures in Arithmetic",
      "Measurement Errors — Absolute, Relative & Percentage",
    ],
    recommendedActionText: "Review Remedial Lesson",
  },
  {
    id: "wa-7",
    topic: "Motion in a Straight Line",
    subject: "Physics",
    accuracy: 68,
    priority: "Needs Attention",
    recommendedAction: "Solve Kinematic Equations & Velocity-Time Graph Drills",
    questionsAttempted: 22,
    actionType: "practice",
    category: "Kinematics",
    errorPattern:
      "Incorrect sign conventions for acceleration in free-fall problems. Misreading slope vs area under v-t and x-t graphs to extract physical quantities.",
    impactScore: "-6 Marks",
    remediationTime: "15 min drill",
    keySubtopics: [
      "Instantaneous vs Average Velocity & Acceleration",
      "Uniformly Accelerated Motion — 3 Kinematic Equations",
      "Free Fall & Sign Convention for g",
      "Position-Time & Velocity-Time Graph Interpretation",
    ],
    recommendedActionText: "Solve Diagnostic Drill",
  },
  {
    id: "wa-8",
    topic: "Sets, Relations and Functions",
    subject: "Mathematics",
    accuracy: 67,
    priority: "Needs Attention",
    recommendedAction: "Practice Composition of Functions & Domain/Range PYQs",
    questionsAttempted: 29,
    actionType: "pyq",
    category: "Algebra & Functions",
    errorPattern:
      "Errors in computing composition of functions (fog vs gof) and incorrect identification of domain/range for composite and inverse functions.",
    impactScore: "-6 Marks",
    remediationTime: "25 min PYQ drill",
    keySubtopics: [
      "Types of Relations — Equivalence, Reflexive, Transitive",
      "Composition of Functions (fog, gof)",
      "Invertible Functions & Inverse Function Domain",
      "Venn Diagrams — Union, Intersection, Complement",
    ],
    recommendedActionText: "Practice Weak PYQs",
  },
];

export function WeakAreasView({
  weakAreas,
  onBackToDashboard,
  onNavigateToSection,
}: WeakAreasViewProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalItem, setActiveModalItem] = useState<EnhancedWeakAreaItem | null>(null);

  const displayItems = useMemo(() => {
    if (!weakAreas || weakAreas.length === 0) return defaultWeakItems;

    return weakAreas.map((w, idx) => {
      const match = defaultWeakItems.find(
        (d) => d.topic.toLowerCase() === w.topic.toLowerCase() || d.subject === w.subject
      );

      return {
        id: w.id || `wa-${idx + 1}`,
        subject: w.subject,
        topic: w.topic,
        accuracy: w.accuracy,
        priority: w.priority,
        recommendedAction: w.recommendedAction,
        actionType: w.actionType,
        questionsAttempted: match?.questionsAttempted ?? (w.accuracy > 0 ? 12 : 0),
        category: match?.category ?? `${w.subject} Core`,
        errorPattern: match?.errorPattern ?? `Needs targeted conceptual revision in ${w.topic} to boost NEST score.`,
        impactScore: match?.impactScore ?? "-8 Marks",
        remediationTime: match?.remediationTime ?? "20 min drill",
        keySubtopics: match?.keySubtopics ?? [
          `${w.topic} — Key Concepts & Formulas`,
          `High-Yield NEST PYQ Applications`,
          `Common Trap Options & Avoidable Mistakes`,
        ],
        recommendedActionText: w.actionType === "lesson" ? "Review Remedial Lesson" : "Practice Weak PYQs",
      };
    });
  }, [weakAreas]);

  const kpis = useMemo(() => {
    const total = displayItems.length;
    const highPriority = displayItems.filter((i) => i.priority === "High Priority").length;
    const lowestAccItem = displayItems.reduce((a, b) => (a.accuracy < b.accuracy ? a : b), displayItems[0]);
    const scoreRecovery = displayItems.reduce((sum, item) => {
      const n = parseInt(item.impactScore.replace(/[^0-9]/g, ""), 10);
      return sum + (isNaN(n) ? 0 : n);
    }, 0);
    return { total, highPriority, lowestAccItem, scoreRecovery };
  }, [displayItems]);

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

  const priorityItem = [...displayItems].sort((a, b) => a.accuracy - b.accuracy)[0];

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
            className="w-full sm:w-auto h-8 bg-white border-gray-200/80 hover:bg-gray-50 text-xs font-bold text-gray-700 shadow-2xs rounded-xl self-start sm:self-center shrink-0">
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
              <span className="text-lg font-black text-amber-900">{kpis.lowestAccItem?.accuracy}% ({kpis.lowestAccItem?.subject})</span>
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
              className="h-9 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-2xs px-5 shrink-0 transition-all">
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
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
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
            className="mt-4 h-8 text-xs font-bold rounded-xl border-gray-200/80">
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
                      <span className="text-[11px] font-semibold text-gray-400">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {isHigh && (
                        <span className="text-[9px] font-extrabold bg-rose-600 text-white px-1.5 py-0.5 rounded-md">HIGH PRIORITY</span>
                      )}
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                        item.accuracy < 60 ? "bg-rose-50 text-rose-700 border-rose-100"
                        : item.accuracy < 70 ? "bg-amber-50 text-amber-700 border-amber-100"
                        : "bg-yellow-50 text-yellow-700 border-yellow-100"
                      }`}>
                        <Flame className="h-3 w-3" /> {item.accuracy}%
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-sm font-extrabold text-gray-900 group-hover:text-[#4F46E5] transition-colors leading-snug">{item.topic}</h3>
                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                      {item.questionsAttempted} questions attempted · {item.remediationTime} to fix
                    </p>
                  </div>

                  {/* Accuracy Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-gray-400">
                      <span>Current Accuracy</span>
                      <span className={item.accuracy < 65 ? "text-rose-600" : "text-amber-600"}>{item.accuracy}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${item.accuracy < 60 ? "bg-rose-500" : item.accuracy < 70 ? "bg-amber-500" : "bg-yellow-500"}`}
                        style={{ width: `${item.accuracy}%` }}
                      />
                    </div>
                  </div>

                  {/* Error Pattern */}
                  <div className="bg-rose-50/50 p-3 rounded-xl border border-rose-100/70 space-y-1">
                    <span className="text-[10px] font-extrabold text-rose-800 uppercase tracking-wider block">Diagnostic Error Trigger</span>
                    <p className="text-xs text-rose-950 font-medium leading-relaxed">{item.errorPattern}</p>
                  </div>

                  {/* Subtopics */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Targeted Remedial Subtopics</span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.keySubtopics.map((sub, i) => (
                        <span key={i} className="text-[10px] font-medium text-gray-600 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">{sub}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <Button onClick={() => setActiveModalItem(item)} variant="outline" className="flex-1 h-8 text-xs font-bold border-gray-200/80 hover:bg-gray-50 rounded-xl">
                    Diagnostic Details
                  </Button>
                  <Button onClick={() => {
                    if (onNavigateToSection) {
                      if (item.actionType === "lesson") onNavigateToSection("smart-lessons");
                      else if (item.actionType === "pyq") onNavigateToSection("pyqs");
                      else onNavigateToSection("practice");
                    }
                  }} className="flex-1 h-8 bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-all">
                    {item.recommendedActionText} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-5 border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${getSubjectStyle(activeModalItem.subject).bg} ${getSubjectStyle(activeModalItem.subject).text} ${getSubjectStyle(activeModalItem.subject).border}`}>
                    {activeModalItem.subject}
                  </Badge>
                  <span className="text-xs font-bold text-gray-400">{activeModalItem.category}</span>
                  <span className="text-[10px] font-extrabold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                    {activeModalItem.impactScore} in NEST
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-gray-900">{activeModalItem.topic}</h3>
                <p className="text-[11px] text-gray-400 font-medium">
                  {activeModalItem.questionsAttempted} questions attempted · {activeModalItem.accuracy}% accuracy
                </p>
              </div>
              <button suppressHydrationWarning onClick={() => setActiveModalItem(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-100 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                  <Lightbulb className="h-4 w-4 text-rose-600" />
                  <span>Diagnostic Error Cause</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed font-medium">{activeModalItem.errorPattern}</p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-900 block">Remediation Action Steps:</span>
                <ul className="space-y-1.5">
                  {activeModalItem.keySubtopics.map((sub, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-700 font-medium bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-px" />
                      <span>Master <span className="font-bold text-gray-900">{sub}</span> — revise concept, then solve 10 targeted questions</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between text-xs font-semibold text-indigo-950">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#4F46E5]" />
                  <span>Estimated Remediation: {activeModalItem.remediationTime}</span>
                </div>
                <span className="font-extrabold text-[#4F46E5]">{activeModalItem.impactScore} in NEST</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
              <Button variant="outline" size="sm" onClick={() => setActiveModalItem(null)} className="h-9 text-xs font-bold rounded-xl">Close</Button>
              <Button size="sm" onClick={() => {
                setActiveModalItem(null);
                if (onNavigateToSection) {
                  if (activeModalItem.actionType === "lesson") onNavigateToSection("smart-lessons");
                  else if (activeModalItem.actionType === "pyq") onNavigateToSection("pyqs");
                  else onNavigateToSection("practice");
                }
              }} className="h-9 bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-2xs px-5">
                Start Remedial Session →
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
