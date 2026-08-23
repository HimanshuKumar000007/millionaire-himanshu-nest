"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Atom, 
  FlaskConical, 
  Dna, 
  Sigma, 
  Flame, 
  ChevronDown, 
  HelpCircle,
  BarChart3,
  Layers
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getToken } from "@/lib/auth/authGuard";

interface FAQItem {
  question: string;
  answer: string;
}

interface ChapterWisePyqClientProps {
  faqs: FAQItem[];
}

interface ChapterData {
  id: string;
  subject: "Physics" | "Chemistry" | "Mathematics" | "Biology";
  name: string;
  questionCount: number;
  weightage: "High" | "Medium" | "Essential";
  avgMarks: string;
  keyTopics: string[];
}

const CHAPTERS_DATABASE: ChapterData[] = [
  // Physics
  {
    id: "phy-1",
    subject: "Physics",
    name: "Rotational Dynamics & Rigid Bodies",
    questionCount: 28,
    weightage: "High",
    avgMarks: "8–12 Marks/yr",
    keyTopics: ["Moment of Inertia", "Rolling Without Slipping", "Angular Momentum Conservation", "Torque Equilibrium"],
  },
  {
    id: "phy-2",
    subject: "Physics",
    name: "Wave Optics & Interference",
    questionCount: 24,
    weightage: "High",
    avgMarks: "6–9 Marks/yr",
    keyTopics: ["Young's Double Slit Experiment (YDSE)", "Diffraction at Single Slit", "Polarization & Brewster's Law"],
  },
  {
    id: "phy-3",
    subject: "Physics",
    name: "Thermodynamics & Kinetic Theory",
    questionCount: 26,
    weightage: "High",
    avgMarks: "7–10 Marks/yr",
    keyTopics: ["Carnot Cycle & Efficiency", "First & Second Law", "Degrees of Freedom & $C_p/C_v$", "PV/TS Diagrams"],
  },
  {
    id: "phy-4",
    subject: "Physics",
    name: "Electrodynamics & Magnetism",
    questionCount: 32,
    weightage: "High",
    avgMarks: "9–14 Marks/yr",
    keyTopics: ["Gauss's Law & Potentials", "Biot-Savart & Ampere's Law", "Electromagnetic Induction & Faraday's Law"],
  },
  {
    id: "phy-5",
    subject: "Physics",
    name: "Ray Optics & Optical Instruments",
    questionCount: 19,
    weightage: "Medium",
    avgMarks: "4–6 Marks/yr",
    keyTopics: ["Lens-Mirror Combinations", "Total Internal Reflection & Prisms", "Microscopes & Telescopes"],
  },
  {
    id: "phy-6",
    subject: "Physics",
    name: "Modern Physics & Nuclear Physics",
    questionCount: 22,
    weightage: "Medium",
    avgMarks: "6–8 Marks/yr",
    keyTopics: ["Photoelectric Effect", "Bohr Atom & Energy Levels", "Radioactive Decay Law", "Binding Energy Curve"],
  },

  // Chemistry
  {
    id: "chem-1",
    subject: "Chemistry",
    name: "Chemical Thermodynamics & Thermochemistry",
    questionCount: 30,
    weightage: "High",
    avgMarks: "8–12 Marks/yr",
    keyTopics: ["Gibbs Free Energy & Spontaneity", "Enthalpy & Hess's Law", "Entropy Calculations", "Clapeyron Equation"],
  },
  {
    id: "chem-2",
    subject: "Chemistry",
    name: "Electrochemistry & Nernst Equation",
    questionCount: 27,
    weightage: "High",
    avgMarks: "7–10 Marks/yr",
    keyTopics: ["Nernst Equation & Cell Potentials", "Kohlrausch's Law & Conductance", "Faraday's Electrolysis", "Battery Systems"],
  },
  {
    id: "chem-3",
    subject: "Chemistry",
    name: "Coordination Compounds & Crystal Field Theory",
    questionCount: 26,
    weightage: "High",
    avgMarks: "7–10 Marks/yr",
    keyTopics: ["CFT Splitting ($O_h$ and $T_d$)", "Isomerism & Ligand Strength", "Magnetic Moments & Color Theory"],
  },
  {
    id: "chem-4",
    subject: "Chemistry",
    name: "Organic Reaction Mechanisms & Carbonyls",
    questionCount: 35,
    weightage: "High",
    avgMarks: "10–14 Marks/yr",
    keyTopics: ["Aldol, Cannizzaro & Reformatsky", "Electrophilic Aromatic Substitution", "Nucleophilic Addition & Esterification"],
  },
  {
    id: "chem-5",
    subject: "Chemistry",
    name: "Chemical Kinetics & Rate Laws",
    questionCount: 21,
    weightage: "Medium",
    avgMarks: "5–8 Marks/yr",
    keyTopics: ["Arrhenius Activation Energy", "Integrated Rate Equations (0th, 1st, 2nd)", "Steady-State Approximation"],
  },
  {
    id: "chem-6",
    subject: "Chemistry",
    name: "p-Block & d/f-Block Elements",
    questionCount: 25,
    weightage: "Medium",
    avgMarks: "6–9 Marks/yr",
    keyTopics: ["Lanthanoid Contraction", "Oxoacids of Phosphorus & Sulphur", "Interhalogen Compounds", "Variable Oxidation States"],
  },

  // Mathematics
  {
    id: "math-1",
    subject: "Mathematics",
    name: "Definite Integrals & Area Under Curves",
    questionCount: 34,
    weightage: "High",
    avgMarks: "10–14 Marks/yr",
    keyTopics: ["King's Property & Periodic Integrals", "Leibniz Integral Rule", "Bounding Integrals", "Area Between Polar/Cartesian Curves"],
  },
  {
    id: "math-2",
    subject: "Mathematics",
    name: "Differential Calculus & Continuity/Differentiability",
    questionCount: 31,
    weightage: "High",
    avgMarks: "9–12 Marks/yr",
    keyTopics: ["Mean Value Theorems (Rolle's, LMVT, Cauchy)", "Maxima & Minima Optimization", "Limit Evaluations & Series Expansions"],
  },
  {
    id: "math-3",
    subject: "Mathematics",
    name: "Vectors & 3D Geometry",
    questionCount: 28,
    weightage: "High",
    avgMarks: "8–11 Marks/yr",
    keyTopics: ["Vector Triple Product", "Shortest Distance Between Skew Lines", "Plane Equations & Projections"],
  },
  {
    id: "math-4",
    subject: "Mathematics",
    name: "Matrices, Determinants & System of Linear Equations",
    questionCount: 23,
    weightage: "Medium",
    avgMarks: "6–9 Marks/yr",
    keyTopics: ["Cramer's Rule & Consistency", "Properties of Adjoint & Inverse", "Eigenvalues & Characteristic Equation"],
  },
  {
    id: "math-5",
    subject: "Mathematics",
    name: "Permutations, Combinations & Probability",
    questionCount: 25,
    weightage: "High",
    avgMarks: "7–10 Marks/yr",
    keyTopics: ["Bayes' Theorem & Conditional Probability", "Generating Functions & Derangements", "Binomial Probability Distribution"],
  },
  {
    id: "math-6",
    subject: "Mathematics",
    name: "Complex Numbers & De Moivre's Theorem",
    questionCount: 20,
    weightage: "Medium",
    avgMarks: "5–8 Marks/yr",
    keyTopics: ["Roots of Unity ($1^{1/n}$)", "Geometric Loci in Argand Plane", "Triangle Inequality & Modulus Properties"],
  },

  // Biology
  {
    id: "bio-1",
    subject: "Biology",
    name: "Genetics & Molecular Basis of Inheritance",
    questionCount: 36,
    weightage: "High",
    avgMarks: "12–16 Marks/yr",
    keyTopics: ["DNA Replication & Operon Models", "Mendelian Extensions & Pedigree Analysis", "Transcription & Translation Mechanisms"],
  },
  {
    id: "bio-2",
    subject: "Biology",
    name: "Cell Biology & Cell Cycle Regulation",
    questionCount: 29,
    weightage: "High",
    avgMarks: "8–12 Marks/yr",
    keyTopics: ["Mitosis & Meiosis Stages", "Organelle Functions & Protein Sorting", "Membrane Transport & Fluidity"],
  },
  {
    id: "bio-3",
    subject: "Biology",
    name: "Plant Physiology & Photosynthesis",
    questionCount: 27,
    weightage: "High",
    avgMarks: "7–11 Marks/yr",
    keyTopics: ["C3, C4 & CAM Pathways", "Electron Transport Chain & ATP Synthase", "Phytohormones (Auxin, Gibberellin, ABA)"],
  },
  {
    id: "bio-4",
    subject: "Biology",
    name: "Ecology, Ecosystems & Biodiversity",
    questionCount: 24,
    weightage: "High",
    avgMarks: "6–10 Marks/yr",
    keyTopics: ["Population Growth Models (Logistic/Exponential)", "Nutrient Cycles (Carbon, Nitrogen)", "Biomagnification & Trophic Levels"],
  },
  {
    id: "bio-5",
    subject: "Biology",
    name: "Biotechnology: Principles & Applications",
    questionCount: 22,
    weightage: "Medium",
    avgMarks: "6–9 Marks/yr",
    keyTopics: ["Recombinant DNA Technology & Vectors", "PCR & Gel Electrophoresis", "CRISPR & Transgenic Crops"],
  },
  {
    id: "bio-6",
    subject: "Biology",
    name: "Human Physiology & Neural/Endocrine Control",
    questionCount: 26,
    weightage: "Medium",
    avgMarks: "7–10 Marks/yr",
    keyTopics: ["Action Potential & Synaptic Transmission", "Endocrine Feedback Loops", "Kidney Nephron Function & Countercurrent"],
  },
];

const YEAR_PAPERS = [
  { year: "2025", shift: "Shift 1 & 2", totalQs: 68, marks: "240 Marks", status: "Verified Authentic" },
  { year: "2024", shift: "Shift 1 & 2", totalQs: 68, marks: "240 Marks", status: "Verified Authentic" },
  { year: "2023", shift: "Shift 1", totalQs: 68, marks: "240 Marks", status: "Verified Authentic" },
  { year: "2022", shift: "Shift 1 & 2", totalQs: 68, marks: "240 Marks", status: "Verified Authentic" },
  { year: "2020", shift: "Shift 1 & 2", totalQs: 70, marks: "240 Marks", status: "Verified Authentic" },
  { year: "2019", shift: "Single Shift", totalQs: 60, marks: "180 Marks", status: "Verified Authentic" },
  { year: "2018", shift: "Single Shift", totalQs: 60, marks: "180 Marks", status: "Verified Authentic" },
];

export function ChapterWisePyqClient({ faqs }: ChapterWisePyqClientProps) {
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState<"All" | "Physics" | "Chemistry" | "Mathematics" | "Biology">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleStartPractice = (subject?: string) => {
    const token = getToken();
    const destination = subject ? `/dashboard?tab=pyqs&subject=${encodeURIComponent(subject)}` : "/dashboard?tab=pyqs";
    if (token) {
      router.push(destination);
    } else {
      router.push(`/login?mode=signup&redirect=${encodeURIComponent(destination)}`);
    }
  };

  const filteredChapters = CHAPTERS_DATABASE.filter((chapter) => {
    const matchesSubject = selectedSubject === "All" || chapter.subject === selectedSubject;
    const matchesSearch =
      chapter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.keyTopics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesSearch;
  });

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case "Physics":
        return <Atom className="h-5 w-5 text-indigo-600" />;
      case "Chemistry":
        return <FlaskConical className="h-5 w-5 text-cyan-600" />;
      case "Mathematics":
        return <Sigma className="h-5 w-5 text-purple-600" />;
      case "Biology":
        return <Dna className="h-5 w-5 text-emerald-600" />;
      default:
        return <BookOpen className="h-5 w-5 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Header */}
      <section className="relative pt-12 pb-12 overflow-hidden bg-gradient-to-b from-indigo-50/60 via-slate-50 to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>Official NEST 2018–2025 Authentic Question Bank</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.12]">
            NEST PYQ{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Chapter Wise
            </span>{" "}
            Mastery & Solutions
          </h1>

          <p className="text-lg text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Practice every authentic NEST past year question categorized by chapter with step-by-step verified explanations. Identify high-yield patterns, clear your <strong>SMAS sectional cutoffs</strong>, and test yourself under real CBT exam conditions.
          </p>

          {/* Quick Stat Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-center">
              <div className="text-2xl font-black text-indigo-600">550+</div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">Authentic PYQs</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-center">
              <div className="text-2xl font-black text-slate-900">2018–2025</div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">8 Years Covered</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-center">
              <div className="text-2xl font-black text-emerald-600">100%</div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">Verified Solutions</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-center">
              <div className="text-2xl font-black text-purple-600">CBT Mode</div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">Real Test Engine</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Chapter Directory Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Controls: Search Bar & Subject Filter Pills */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
          {/* Subject Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {(["All", "Physics", "Chemistry", "Mathematics", "Biology"] as const).map((subject) => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  selectedSubject === subject
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {subject}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search chapters or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-900"
            />
          </div>
        </div>

        {/* Chapter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChapters.map((chapter) => (
            <div
              key={chapter.id}
              className="group flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200"
            >
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-indigo-50 transition-colors">
                      {getSubjectIcon(chapter.subject)}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {chapter.subject}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      chapter.weightage === "High"
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : chapter.weightage === "Medium"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}
                  >
                    <Flame className="h-3 w-3" />
                    {chapter.weightage} Weightage
                  </span>
                </div>

                {/* Chapter Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {chapter.name}
                </h3>

                {/* Question Count & Average Marks */}
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium pb-2 border-b border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-indigo-500" />
                    <strong className="text-slate-800">{chapter.questionCount} Questions</strong> in Bank
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BarChart3 className="h-3.5 w-3.5 text-emerald-500" />
                    {chapter.avgMarks}
                  </span>
                </div>

                {/* Key Tested Concepts */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Key NEST Focus Topics:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {chapter.keyTopics.map((topic, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-slate-100">
                <Button
                  onClick={() => handleStartPractice(chapter.subject)}
                  className="w-full bg-slate-900 hover:bg-indigo-600 text-white rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-2 group-hover:shadow-sm transition-all"
                >
                  <span>Practice Chapter in CBT Mode</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredChapters.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <HelpCircle className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No matching chapters found</h3>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your search terms or switch subject filters.</p>
          </div>
        )}
      </section>

      {/* Year-Wise Paper Index Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Complete NEST Year-Wise Official Papers (2018–2025)
          </h2>
          <p className="text-sm text-slate-500">
            Practice entire official 3.5-hour mock simulation exams with realistic sectional timers and live score reports.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Exam Year</th>
                  <th className="px-6 py-4">Shift Details</th>
                  <th className="px-6 py-4">Questions</th>
                  <th className="px-6 py-4">Total Marks</th>
                  <th className="px-6 py-4">Dataset Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {YEAR_PAPERS.map((paper, i) => (
                  <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-indigo-600" />
                      NEST {paper.year}
                    </td>
                    <td className="px-6 py-4">{paper.shift}</td>
                    <td className="px-6 py-4">{paper.totalQs} Questions</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{paper.marks}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="h-3 w-3" />
                        {paper.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        size="sm"
                        onClick={() => handleStartPractice()}
                        className="bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all"
                      >
                        Launch Mock
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Frequently Asked Questions on NEST PYQs
          </h2>
          <p className="text-sm text-slate-500">
            Everything you need to know about past year question practice for NISER & CEBS.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-indigo-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Conversion Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/40 text-xs px-3 py-1 font-semibold">
              Ready to Target AIR 1–250?
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Start Solving Chapter-Wise NEST PYQs in CBT Mode
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Get immediate diagnostic feedback on your strong and weak areas, measure your Section-wise SMAS standing, and practice with authentic timers.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                onClick={() => handleStartPractice()}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-indigo-600/30 text-sm"
              >
                Access Free PYQ Bank
              </Button>
              <Link
                href="/login?mode=signup"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all text-center"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
