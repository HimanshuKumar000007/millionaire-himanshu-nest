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
  ArrowLeft,
  CheckCircle2, 
  XCircle,
  Clock, 
  Atom, 
  FlaskConical, 
  Dna, 
  Sigma, 
  Flame, 
  ChevronDown, 
  HelpCircle,
  BarChart3,
  Layers,
  Award,
  Check,
  RotateCcw,
  Bookmark,
  Share2,
  PlayCircle
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

interface FeaturedQuestion {
  id: string;
  subject: "Biology" | "Physics" | "Chemistry" | "Mathematics";
  chapter: string;
  year: string;
  shift: string;
  difficulty: "High-Yield" | "Challenging" | "Moderate";
  marking: string;
  question: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
  formulaOrConcept: string;
}

const FEATURED_QUESTIONS: FeaturedQuestion[] = [
  // Biology
  {
    id: "bio-1",
    subject: "Biology",
    chapter: "Cell Biology & Biomolecules",
    year: "NEST 2024",
    shift: "Shift 1",
    difficulty: "High-Yield",
    marking: "+3 / -1 (Single Correct)",
    question: "Analyze the molecular organization of biological macromolecules. Which of the following accurately differentiates the structural hierarchy between DNA double helix, alpha-helical peptide, and IgG antibody domains?",
    options: [
      { id: "a", text: "DNA – double helix; Protein – secondary alpha-helix; IgG Antibody – multi-domain quaternary", isCorrect: true },
      { id: "b", text: "DNA – primary; Protein – tertiary; IgG Antibody – secondary", isCorrect: false },
      { id: "c", text: "DNA – tertiary; Protein – primary; IgG Antibody – linear", isCorrect: false },
      { id: "d", text: "DNA – quaternary; Protein – primary; IgG Antibody – tertiary", isCorrect: false },
    ],
    explanation: "The DNA B-form double helix involves two antiparallel polynucleotide strands. Alpha-helices represent secondary protein structure stabilized by intrachain hydrogen bonds. IgG antibodies consist of 4 polypeptide chains (2 heavy, 2 light) linked by disulfide bonds, constituting quaternary structural organization.",
    formulaOrConcept: "Hierarchy: Primary (sequence) → Secondary (alpha/beta) → Tertiary (3D folding) → Quaternary (multi-subunit)",
  },
  {
    id: "bio-2",
    subject: "Biology",
    chapter: "Genetics & Molecular Inheritance",
    year: "NEST 2025",
    shift: "Shift 1",
    difficulty: "Challenging",
    marking: "+3 / -1 (Single Correct)",
    question: "In an E. coli lac operon, if a mutation in the lacI gene produces a super-repressor (Iˢ) that cannot bind allolactose/inducer, what will be the phenotype of β-galactosidase expression in the presence and absence of lactose?",
    options: [
      { id: "a", text: "Constitutively ON in both presence and absence of lactose", isCorrect: false },
      { id: "b", text: "Constitutively OFF (uninducible) in both presence and absence of lactose", isCorrect: true },
      { id: "c", text: "Inducible only when glucose is absent", isCorrect: false },
      { id: "d", text: "Expressed normally upon lactose addition", isCorrect: false },
    ],
    explanation: "A super-repressor mutation (Iˢ) alters the inducer-binding site on the repressor protein without affecting its operator-binding domain. As a result, allolactose cannot bind to release the repressor from the operator (lacO), keeping the lac operon permanently repressed (constitutively OFF) regardless of lactose concentration.",
    formulaOrConcept: "lac operon negative regulation: Inducer + Repressor ⇋ Inactive Complex. (Iˢ cannot form complex).",
  },
  {
    id: "bio-3",
    subject: "Biology",
    chapter: "Plant Physiology & Photosynthesis",
    year: "NEST 2023",
    shift: "Shift 1",
    difficulty: "Moderate",
    marking: "+3 / -1 (Single Correct)",
    question: "In C4 photosynthetic plants such as Maize, which of the following is the primary CO₂ acceptor in mesophyll cells, and which enzyme catalyzes the initial carboxylation reaction?",
    options: [
      { id: "a", text: "Ribulose-1,5-bisphosphate (RuBP) & RuBisCO", isCorrect: false },
      { id: "b", text: "Phosphoenolpyruvate (PEP) & PEP Carboxylase", isCorrect: true },
      { id: "c", text: "Oxaloacetic acid (OAA) & Malate Dehydrogenase", isCorrect: false },
      { id: "d", text: "3-Phosphoglyceric acid (PGA) & Aldolase", isCorrect: false },
    ],
    explanation: "In C4 plants, initial CO₂ fixation occurs in mesophyll cells where PEP (Phosphoenolpyruvate, 3C) acts as the primary CO₂ acceptor, catalyzed by PEP Carboxylase (PEPcase) to form Oxaloacetic acid (OAA, 4C). PEPcase has zero oxygenase activity, preventing photorespiration.",
    formulaOrConcept: "Kranz Anatomy: Mesophyll (PEP + CO₂ → OAA) → Bundle Sheath (RuBisCO + CO₂ → C3 cycle)",
  },

  // Physics
  {
    id: "phy-1",
    subject: "Physics",
    chapter: "Rotational Dynamics & Rigid Bodies",
    year: "NEST 2024",
    shift: "Shift 1",
    difficulty: "High-Yield",
    marking: "+3 / -1 (Single Correct)",
    question: "A solid cylinder and a thin-walled hollow sphere of the same mass M and radius R are released simultaneously from rest from the top of an inclined plane of inclination θ. Assuming pure rolling without slipping, which object reaches the bottom first, and what is the ratio of their linear accelerations a_cyl / a_sphere?",
    options: [
      { id: "a", text: "Solid cylinder reaches first; a_cyl / a_sphere = 1.11 (10/9)", isCorrect: true },
      { id: "b", text: "Hollow sphere reaches first; a_cyl / a_sphere = 0.90 (9/10)", isCorrect: false },
      { id: "c", text: "Both reach simultaneously; a_cyl / a_sphere = 1.00", isCorrect: false },
      { id: "d", text: "Solid cylinder reaches first; a_cyl / a_sphere = 1.25 (5/4)", isCorrect: false },
    ],
    explanation: "For pure rolling on an incline: a = g·sin(θ) / [1 + I/(MR²)]. For solid cylinder, I = (1/2)MR² ⇒ a_cyl = (2/3)g·sin(θ) ≈ 0.667 g·sin(θ). For thin hollow sphere, I = (2/3)MR² ⇒ a_sphere = (3/5)g·sin(θ) = 0.600 g·sin(θ). Since a_cyl > a_sphere, the cylinder accelerates faster with acceleration ratio (2/3) / (3/5) = 10/9 ≈ 1.11.",
    formulaOrConcept: "a = g·sin(θ) / [1 + k²/R²] where k is radius of gyration.",
  },
  {
    id: "phy-2",
    subject: "Physics",
    chapter: "Wave Optics & Interference",
    year: "NEST 2023",
    shift: "Shift 1",
    difficulty: "High-Yield",
    marking: "+3 / -1 (Single Correct)",
    question: "In a standard Young's double slit experiment with monochromatic light of wavelength λ, the intensity at the central maximum is I₀. What is the intensity on the screen at a point where the optical path difference between the interfering waves is Δx = λ / 6?",
    options: [
      { id: "a", text: "I₀ / 2", isCorrect: false },
      { id: "b", text: "3 I₀ / 4 (0.75 I₀)", isCorrect: true },
      { id: "c", text: "I₀ / 4", isCorrect: false },
      { id: "d", text: "√3 I₀ / 2", isCorrect: false },
    ],
    explanation: "Phase difference φ = (2π/λ) · Δx = (2π/λ) · (λ/6) = π/3 = 60°. The interference intensity formula gives: I = I₀ · cos²(φ/2) = I₀ · cos²(30°) = I₀ · (√3/2)² = (3/4) I₀ = 0.75 I₀.",
    formulaOrConcept: "I = I₀ cos²(φ/2), with φ = (2π/λ) · Δx",
  },
  {
    id: "phy-3",
    subject: "Physics",
    chapter: "Thermodynamics & Kinetic Theory",
    year: "NEST 2025",
    shift: "Shift 1",
    difficulty: "Moderate",
    marking: "+3 / -1 (Single Correct)",
    question: "One mole of an ideal diatomic gas (γ = 7/5) undergoes a reversible adiabatic expansion from volume V₁ to V₂ = 32 V₁. If the initial temperature was T₁ = 600 K, what is the final temperature T₂ of the gas?",
    options: [
      { id: "a", text: "150 K", isCorrect: true },
      { id: "b", text: "300 K", isCorrect: false },
      { id: "c", text: "75 K", isCorrect: false },
      { id: "d", text: "200 K", isCorrect: false },
    ],
    explanation: "For a reversible adiabatic process: T₁·V₁^(γ-1) = T₂·V₂^(γ-1). For diatomic gas, γ - 1 = (7/5) - 1 = 2/5. Therefore: T₂ = T₁ · (V₁/V₂)^(2/5) = 600 · (1/32)^(2/5) = 600 · (1/2⁵)^(2/5) = 600 · (1/4) = 150 K.",
    formulaOrConcept: "T · V^(γ-1) = constant",
  },

  // Chemistry
  {
    id: "chem-1",
    subject: "Chemistry",
    chapter: "Electrochemistry & Nernst Equation",
    year: "NEST 2024",
    shift: "Shift 2",
    difficulty: "High-Yield",
    marking: "+3 / -1 (Single Correct)",
    question: "Consider the galvanic cell: Zn(s) | Zn²⁺(0.01 M) || Cu²⁺(1.0 M) | Cu(s) at 298 K. Given E°_cell = 1.10 V and 2.303 RT/F = 0.0591 V, what is the actual EMF of the cell (E_cell)?",
    options: [
      { id: "a", text: "1.10 V", isCorrect: false },
      { id: "b", text: "1.159 V", isCorrect: true },
      { id: "c", text: "1.041 V", isCorrect: false },
      { id: "d", text: "1.218 V", isCorrect: false },
    ],
    explanation: "The cell reaction is Zn(s) + Cu²⁺(aq) ⇋ Zn²⁺(aq) + Cu(s), with n = 2. Reaction quotient Q = [Zn²⁺]/[Cu²⁺] = 10⁻²/1 = 10⁻². By Nernst equation: E_cell = E°_cell - (0.0591/2) · log(10⁻²) = 1.10 - (0.0591/2) · (-2) = 1.10 + 0.0591 = 1.1591 V.",
    formulaOrConcept: "E_cell = E°_cell - (0.0591/n) · log(Q)",
  },
  {
    id: "chem-2",
    subject: "Chemistry",
    chapter: "Coordination Compounds & Crystal Field Theory",
    year: "NEST 2023",
    shift: "Shift 1",
    difficulty: "High-Yield",
    marking: "+3 / -1 (Single Correct)",
    question: "For the octahedral complex [Fe(CN)₆]³⁻, what is the oxidation state of iron, its electronic configuration in crystal field splitting (t₂g^p eg^q), and its spin-only magnetic moment (μ_s)?",
    options: [
      { id: "a", text: "Fe³⁺, t₂g⁵ eg⁰, μ_s = 1.73 BM (Low Spin)", isCorrect: true },
      { id: "b", text: "Fe²⁺, t₂g⁶ eg⁰, μ_s = 0 BM (Diamagnetic)", isCorrect: false },
      { id: "c", text: "Fe³⁺, t₂g³ eg², μ_s = 5.92 BM (High Spin)", isCorrect: false },
      { id: "d", text: "Fe²⁺, t₂g⁴ eg², μ_s = 4.90 BM (Paramagnetic)", isCorrect: false },
    ],
    explanation: "Iron is in +3 oxidation state (3d⁵). Cyanide (CN⁻) is a strong field ligand producing high crystal field splitting (Δo > P). Electrons pair in t₂g orbitals giving configuration t₂g⁵ eg⁰. With n = 1 unpaired electron, spin-only magnetic moment μ_s = √[1(1+2)] = √3 ≈ 1.73 BM.",
    formulaOrConcept: "μ_s = √[n(n+2)] BM (Bohr Magnetons)",
  },
  {
    id: "chem-3",
    subject: "Chemistry",
    chapter: "Organic Reaction Mechanisms",
    year: "NEST 2025",
    shift: "Shift 1",
    difficulty: "Moderate",
    marking: "+3 / -1 (Single Correct)",
    question: "When Benzaldehyde reacts with concentrated aqueous NaOH (50%) at room temperature, it undergoes a disproportionation (Cannizzaro Reaction). What are the two organic products formed?",
    options: [
      { id: "a", text: "Benzyl alcohol & Sodium benzoate", isCorrect: true },
      { id: "b", text: "Benzoin & Hydrobenzoin", isCorrect: false },
      { id: "c", text: "Cinnamic acid & Benzophenone", isCorrect: false },
      { id: "d", text: "Benzoic acid & Toluene", isCorrect: false },
    ],
    explanation: "Benzaldehyde lacks α-hydrogen atoms. In the presence of strong concentrated base, one molecule is reduced to Benzyl alcohol (C₆H₅CH₂OH) while another molecule is oxidized to Sodium benzoate (C₆H₅COONa).",
    formulaOrConcept: "Cannizzaro: 2 RCHO + OH⁻ → RCH₂OH + RCOO⁻",
  },

  // Mathematics
  {
    id: "math-1",
    subject: "Mathematics",
    chapter: "Definite Integrals & Calculus",
    year: "NEST 2024",
    shift: "Shift 1",
    difficulty: "High-Yield",
    marking: "+3 / -1 (Single Correct)",
    question: "Evaluate the definite integral: I = ∫[0 to π/2] (√sin(x)) / (√sin(x) + √cos(x)) dx.",
    options: [
      { id: "a", text: "π / 4", isCorrect: true },
      { id: "b", text: "π / 2", isCorrect: false },
      { id: "c", text: "0", isCorrect: false },
      { id: "d", text: "π", isCorrect: false },
    ],
    explanation: "Using King's property ∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx: I = ∫[0 to π/2] (√cos(x)) / (√cos(x) + √sin(x)) dx. Adding both equations: 2I = ∫[0 to π/2] 1 dx = π/2 ⇒ I = π/4.",
    formulaOrConcept: "King's Rule: ∫[0 to a] f(x) dx = ∫[0 to a] f(a-x) dx",
  },
  {
    id: "math-2",
    subject: "Mathematics",
    chapter: "Vectors & 3D Geometry",
    year: "NEST 2023",
    shift: "Shift 1",
    difficulty: "Challenging",
    marking: "+3 / -1 (Single Correct)",
    question: "If vectors a⃗ = 2î - ĵ + k̂, b⃗ = î + 2ĵ - 3k̂, and c⃗ = 3î + pĵ + 5k̂ are coplanar, what is the value of scalar p?",
    options: [
      { id: "a", text: "-4", isCorrect: true },
      { id: "b", text: "2", isCorrect: false },
      { id: "c", text: "-1", isCorrect: false },
      { id: "d", text: "6", isCorrect: false },
    ],
    explanation: "For coplanar vectors, scalar triple product [a⃗ b⃗ c⃗] = 0. Setting the determinant |(2, -1, 1), (1, 2, -3), (3, p, 5)| = 0: 2(10 + 3p) - (-1)(5 + 9) + 1(p - 6) = 0 ⇒ 20 + 6p + 14 + p - 6 = 0 ⇒ 7p + 28 = 0 ⇒ p = -4.",
    formulaOrConcept: "Coplanar Condition: [a⃗ b⃗ c⃗] = 0",
  },
  {
    id: "math-3",
    subject: "Mathematics",
    chapter: "Optimization & Derivatives",
    year: "NEST 2025",
    shift: "Shift 1",
    difficulty: "Moderate",
    marking: "+3 / -1 (Single Correct)",
    question: "Find the absolute maximum value of the function f(x) = sin(x) + cos(x) in the closed interval [0, π].",
    options: [
      { id: "a", text: "√2 at x = π/4", isCorrect: true },
      { id: "b", text: "1 at x = 0", isCorrect: false },
      { id: "c", text: "2 at x = π/2", isCorrect: false },
      { id: "d", text: "√3 at x = π/3", isCorrect: false },
    ],
    explanation: "f(x) = √2 · [(1/√2)sin(x) + (1/√2)cos(x)] = √2 · sin(x + π/4). The maximum value of the sine function is 1, which occurs when x + π/4 = π/2 ⇒ x = π/4. The maximum value is √2 ≈ 1.414.",
    formulaOrConcept: "A·sin(x) + B·cos(x) has maximum value √(A² + B²)",
  },
];

const CHAPTERS_DATABASE = [
  // Physics
  { id: "phy-1", subject: "Physics", name: "Rotational Dynamics & Rigid Bodies", questionCount: 28, weightage: "High", avgMarks: "8–12 Marks" },
  { id: "phy-2", subject: "Physics", name: "Wave Optics & Interference", questionCount: 24, weightage: "High", avgMarks: "6–9 Marks" },
  { id: "phy-3", subject: "Physics", name: "Thermodynamics & Kinetic Theory", questionCount: 26, weightage: "High", avgMarks: "7–10 Marks" },
  { id: "phy-4", subject: "Physics", name: "Electrodynamics & Magnetism", questionCount: 32, weightage: "High", avgMarks: "9–14 Marks" },
  { id: "phy-5", subject: "Physics", name: "Ray Optics & Optical Instruments", questionCount: 19, weightage: "Medium", avgMarks: "4–6 Marks" },
  { id: "phy-6", subject: "Physics", name: "Modern Physics & Nuclear Physics", questionCount: 22, weightage: "Medium", avgMarks: "6–8 Marks" },

  // Chemistry
  { id: "chem-1", subject: "Chemistry", name: "Chemical Thermodynamics", questionCount: 30, weightage: "High", avgMarks: "8–12 Marks" },
  { id: "chem-2", subject: "Chemistry", name: "Electrochemistry & Nernst Eq.", questionCount: 27, weightage: "High", avgMarks: "7–10 Marks" },
  { id: "chem-3", subject: "Chemistry", name: "Coordination Compounds (CFT)", questionCount: 26, weightage: "High", avgMarks: "7–10 Marks" },
  { id: "chem-4", subject: "Chemistry", name: "Organic Reaction Mechanisms", questionCount: 35, weightage: "High", avgMarks: "10–14 Marks" },
  { id: "chem-5", subject: "Chemistry", name: "Chemical Kinetics & Rate Laws", questionCount: 21, weightage: "Medium", avgMarks: "5–8 Marks" },
  { id: "chem-6", subject: "Chemistry", name: "p-Block & d/f-Block Elements", questionCount: 25, weightage: "Medium", avgMarks: "6–9 Marks" },

  // Mathematics
  { id: "math-1", subject: "Mathematics", name: "Definite Integrals & Calculus", questionCount: 34, weightage: "High", avgMarks: "10–14 Marks" },
  { id: "math-2", subject: "Mathematics", name: "Differential Calculus & Limits", questionCount: 31, weightage: "High", avgMarks: "9–12 Marks" },
  { id: "math-3", subject: "Mathematics", name: "Vectors & 3D Geometry", questionCount: 28, weightage: "High", avgMarks: "8–11 Marks" },
  { id: "math-4", subject: "Mathematics", name: "Matrices & Determinants", questionCount: 23, weightage: "Medium", avgMarks: "6–9 Marks" },
  { id: "math-5", subject: "Mathematics", name: "Permutations & Probability", questionCount: 25, weightage: "High", avgMarks: "7–10 Marks" },
  { id: "math-6", subject: "Mathematics", name: "Complex Numbers & De Moivre", questionCount: 20, weightage: "Medium", avgMarks: "5–8 Marks" },

  // Biology
  { id: "bio-1", subject: "Biology", name: "Genetics & Molecular Basis", questionCount: 36, weightage: "High", avgMarks: "12–16 Marks" },
  { id: "bio-2", subject: "Biology", name: "Cell Biology & Biomolecules", questionCount: 29, weightage: "High", avgMarks: "8–12 Marks" },
  { id: "bio-3", subject: "Biology", name: "Plant Physiology & Photosynthesis", questionCount: 27, weightage: "High", avgMarks: "7–11 Marks" },
  { id: "bio-4", subject: "Biology", name: "Ecology & Ecosystem Dynamics", questionCount: 24, weightage: "High", avgMarks: "6–10 Marks" },
  { id: "bio-5", subject: "Biology", name: "Biotechnology Principles", questionCount: 22, weightage: "Medium", avgMarks: "6–9 Marks" },
  { id: "bio-6", subject: "Biology", name: "Human Physiology & Neural", questionCount: 26, weightage: "Medium", avgMarks: "7–10 Marks" },
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
  const [activeSubject, setActiveSubject] = useState<"Biology" | "Physics" | "Chemistry" | "Mathematics">("Biology");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [chapterSearch, setChapterSearch] = useState("");

  // Questions for active subject
  const subjectQuestions = FEATURED_QUESTIONS.filter((q) => q.subject === activeSubject);
  const currentQ = subjectQuestions[currentQuestionIndex] || subjectQuestions[0];

  const handleSubjectChange = (subject: "Biology" | "Physics" | "Chemistry" | "Mathematics") => {
    setActiveSubject(subject);
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setShowExplanation(false);
    setIsBookmarked(false);
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOptionId(optionId);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < subjectQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setShowExplanation(false);
      setIsBookmarked(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setSelectedOptionId(null);
      setShowExplanation(false);
      setIsBookmarked(false);
    }
  };

  const handleResetQuestion = () => {
    setSelectedOptionId(null);
    setShowExplanation(false);
  };

  const handleLaunchCbt = (subject?: string) => {
    const token = getToken();
    const destination = subject ? `/dashboard?tab=pyqs&subject=${encodeURIComponent(subject)}` : "/dashboard?tab=pyqs";
    if (token) {
      router.push(destination);
    } else {
      router.push(`/login?mode=signup&redirect=${encodeURIComponent(destination)}`);
    }
  };

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case "Physics":
        return <Atom className="h-4 w-4 text-indigo-600" />;
      case "Chemistry":
        return <FlaskConical className="h-4 w-4 text-cyan-600" />;
      case "Mathematics":
        return <Sigma className="h-4 w-4 text-purple-600" />;
      case "Biology":
        return <Dna className="h-4 w-4 text-emerald-600" />;
      default:
        return <BookOpen className="h-4 w-4 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Top Banner */}
      <section className="relative pt-12 pb-8 overflow-hidden bg-gradient-to-b from-indigo-50/70 via-slate-50 to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>Interactive Chapter-Wise PYQ Solving Interface</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.15]">
            NEST PYQ{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Chapter Wise
            </span>{" "}
            Question Player & Solutions
          </h1>

          <p className="text-base text-slate-600 max-w-2xl mx-auto font-normal">
            Directly test yourself on official NISER & CEBS past questions with verified step-by-step solutions, marking telemetry, and chapter weightage insights.
          </p>

          {/* Subject Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 pt-3 flex-wrap">
            {(["Biology", "Physics", "Chemistry", "Mathematics"] as const).map((sub) => (
              <button
                key={sub}
                onClick={() => handleSubjectChange(sub)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeSubject === sub
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-105"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {getSubjectIcon(sub)}
                <span>{sub} PYQs</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Interactive Question Player */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
          {/* Question Card Top Bar */}
          <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/80 text-indigo-700 text-xs font-black">
                {currentQ.year} • {currentQ.shift}
              </span>
              <span className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-full">
                {currentQ.chapter}
              </span>
              <span className="hidden sm:inline-flex text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                {currentQ.marking}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  isBookmarked
                    ? "bg-amber-50 border-amber-300 text-amber-600"
                    : "bg-white border-slate-200 text-slate-500 hover:text-slate-900"
                }`}
                title="Bookmark Question"
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-amber-500 text-amber-500" : ""}`} />
              </button>
              <span className="font-bold text-slate-500">
                Question {currentQuestionIndex + 1} of {subjectQuestions.length}
              </span>
            </div>
          </div>

          {/* Question Content Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Question Text */}
            <div className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
              <span className="font-bold text-indigo-600 mr-2">Q{currentQuestionIndex + 1}.</span>
              {currentQ.question}
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOptionId === option.id;
                const isAnswered = selectedOptionId !== null;
                const isCorrect = option.isCorrect;

                let optionStyles = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300";
                
                if (isAnswered) {
                  if (isCorrect) {
                    optionStyles = "bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500";
                  } else if (isSelected && !isCorrect) {
                    optionStyles = "bg-rose-50 border-rose-500 text-rose-950 font-semibold ring-1 ring-rose-500";
                  } else {
                    optionStyles = "bg-slate-50/50 border-slate-200 text-slate-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => !isAnswered && handleOptionSelect(option.id)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-start justify-between gap-3 cursor-pointer ${optionStyles}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`h-6 w-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                        isAnswered && isCorrect
                          ? "bg-emerald-600 text-white"
                          : isAnswered && isSelected && !isCorrect
                          ? "bg-rose-600 text-white"
                          : "bg-white border border-slate-200 text-slate-600"
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-snug mt-0.5">{option.text}</span>
                    </div>

                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer & Explanation Box */}
            {showExplanation && (
              <div className="p-5 sm:p-6 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Verified Official Solution & Breakdown</span>
                  </div>
                  <button
                    onClick={handleResetQuestion}
                    className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="h-3 w-3" /> Re-try
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {currentQ.explanation}
                </p>

                {currentQ.formulaOrConcept && (
                  <div className="pt-2 border-t border-indigo-100/80 text-xs font-medium text-indigo-950 flex items-center gap-2">
                    <span className="font-bold text-indigo-600">Core Rule:</span>
                    <code>{currentQ.formulaOrConcept}</code>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Question Card Footer Navigation */}
          <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className="rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Previous
            </Button>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleLaunchCbt(activeSubject)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold px-4 py-2 flex items-center gap-1.5 shadow-sm shadow-indigo-200"
              >
                <PlayCircle className="h-4 w-4" />
                <span>Launch Full {activeSubject} CBT Mock</span>
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === subjectQuestions.length - 1}
              className="rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              Next <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Chapter Directory Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-slate-900">All NEST Chapters in Question Bank</h2>
            <p className="text-xs text-slate-500">Sorted by high exam weightage and SMAS importance</p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search chapters..."
              value={chapterSearch}
              onChange={(e) => setChapterSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHAPTERS_DATABASE.filter(
            (c) =>
              (c.subject === activeSubject || !activeSubject) &&
              c.name.toLowerCase().includes(chapterSearch.toLowerCase())
          ).map((chapter) => (
            <div
              key={chapter.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getSubjectIcon(chapter.subject)}
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {chapter.subject}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                    🔥 {chapter.weightage}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base">{chapter.name}</h3>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span><strong>{chapter.questionCount}</strong> PYQs Available</span>
                  <span>•</span>
                  <span className="text-emerald-600 font-semibold">{chapter.avgMarks}/yr</span>
                </div>
              </div>

              <Button
                onClick={() => handleLaunchCbt(chapter.subject)}
                className="w-full bg-slate-900 hover:bg-indigo-600 text-white rounded-xl py-2 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <span>Solve in CBT Simulator</span>
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Year-Wise Paper Archive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Complete NEST Year-Wise Official Papers (2018–2025)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Launch entire 3.5-hour official CBT simulator exams with automatic SMAS scorecards.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-600">
              <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Paper Year</th>
                  <th className="px-6 py-4">Shift Details</th>
                  <th className="px-6 py-4">Questions</th>
                  <th className="px-6 py-4">Evaluation Marks</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Practice</th>
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
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <Check className="h-3 w-3" /> {paper.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        size="sm"
                        onClick={() => handleLaunchCbt()}
                        className="bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
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

      {/* Final CTA Banner */}
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
                onClick={() => handleLaunchCbt()}
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
