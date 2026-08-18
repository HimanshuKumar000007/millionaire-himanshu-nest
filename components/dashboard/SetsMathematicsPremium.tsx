"use client";

import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Scale,
  Layers,
  Activity,
  Calculator,
  Zap,
  AlertTriangle,
  BookOpen,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Search,
  ChevronRight,
  ChevronDown,
  Check,
  ArrowRight,
  ArrowLeft,
  Info,
  HelpCircle,
  Clock,
  Bookmark,
  TrendingUp,
  X,
  Flame,
} from "lucide-react";

// ============================================================================
// 1. DATA: REAL LINE INTERVAL TOPOLOGY
// ============================================================================
interface IntervalType {
  id: string;
  name: string;
  notation: string;
  setBuilder: string;
  leftClosed: boolean;
  rightClosed: boolean;
  bounded: boolean;
  description: string;
}

const intervalTypes: IntervalType[] = [
  { id: "open", name: "Open Interval", notation: "(a, b)", setBuilder: "{x ∈ ℝ | a < x < b}", leftClosed: false, rightClosed: false, bounded: true, description: "Both endpoints are strictly excluded. (a, a) = ∅." },
  { id: "closed", name: "Closed Interval", notation: "[a, b]", setBuilder: "{x ∈ ℝ | a ≤ x ≤ b}", leftClosed: true, rightClosed: true, bounded: true, description: "Both endpoints are included. [a, a] = {a} (singleton)." },
  { id: "left_closed", name: "Left-Closed, Right-Open", notation: "[a, b)", setBuilder: "{x ∈ ℝ | a ≤ x < b}", leftClosed: true, rightClosed: false, bounded: true, description: "Left endpoint a is included; right endpoint b is excluded." },
  { id: "right_closed", name: "Left-Open, Right-Closed", notation: "(a, b]", setBuilder: "{x ∈ ℝ | a < x ≤ b}", leftClosed: false, rightClosed: true, bounded: true, description: "Left endpoint a is excluded; right endpoint b is included." },
  { id: "ray_pos", name: "Unbounded Above", notation: "[a, ∞)", setBuilder: "{x ∈ ℝ | x ≥ a}", leftClosed: true, rightClosed: false, bounded: false, description: "All real numbers greater than or equal to a." },
  { id: "ray_neg", name: "Unbounded Below", notation: "(-∞, b)", setBuilder: "{x ∈ ℝ | x < b}", leftClosed: false, rightClosed: false, bounded: false, description: "All real numbers strictly less than b." },
];

// ============================================================================
// 2. DATA: NUMBER SYSTEM HIERARCHY
// ============================================================================
interface NumberSet {
  symbol: string;
  name: string;
  latex: string;
  definition: string;
  cardinality: string;
  examples: string;
  badgeColor: string;
}

const numberSets: NumberSet[] = [
  { symbol: "ℕ", name: "Natural Numbers", latex: "\\mathbb{N}", definition: "Positive integers {1, 2, 3, ...}", cardinality: "Countably Infinite (ℵ₀)", examples: "1, 2, 42, 100", badgeColor: "bg-blue-100 text-blue-800 border-blue-200" },
  { symbol: "ℤ", name: "Integers", latex: "\\mathbb{Z}", definition: "{..., -2, -1, 0, 1, 2, ...}", cardinality: "Countably Infinite (ℵ₀)", examples: "-5, 0, 17", badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200" },
  { symbol: "ℚ", name: "Rational Numbers", latex: "\\mathbb{Q}", definition: "{p/q | p, q ∈ ℤ, q ≠ 0, gcd(p,q)=1}", cardinality: "Countably Infinite (ℵ₀)", examples: "1/2, -7/3, 0.75", badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  { symbol: "ℝ", name: "Real Numbers", latex: "\\mathbb{R}", definition: "ℚ ∪ 𝕀 (Rationals ∪ Irrationals)", cardinality: "Uncountably Infinite (c = 2^ℵ₀)", examples: "π, √2, e, -1.414", badgeColor: "bg-amber-100 text-amber-800 border-amber-200" },
  { symbol: "ℂ", name: "Complex Numbers", latex: "\\mathbb{C}", definition: "{a + bi | a, b ∈ ℝ, i = √(-1)}", cardinality: "Uncountably Infinite (c)", examples: "3 + 4i, -2i, 5", badgeColor: "bg-purple-100 text-purple-800 border-purple-200" },
];

// ============================================================================
// 3. DATA: SET IDENTITIES
// ============================================================================
interface SetIdentity {
  name: string;
  category: "Foundational" | "Algebraic" | "Complements";
  unionForm: string;
  intersectionForm: string;
  notes: string;
}

const setIdentities: SetIdentity[] = [
  { name: "Idempotent Laws", category: "Foundational", unionForm: "A ∪ A = A", intersectionForm: "A ∩ A = A", notes: "Combining a set with itself yields the exact same set." },
  { name: "Identity Laws", category: "Foundational", unionForm: "A ∪ ∅ = A", intersectionForm: "A ∩ U = A", notes: "∅ is identity for union; U is identity for intersection." },
  { name: "Domination / Annihilation", category: "Foundational", unionForm: "A ∪ U = U", intersectionForm: "A ∩ ∅ = ∅", notes: "U dominates union; ∅ dominates intersection." },
  { name: "Commutative Laws", category: "Algebraic", unionForm: "A ∪ B = B ∪ A", intersectionForm: "A ∩ B = B ∩ A", notes: "Order of operands does not affect outcome." },
  { name: "Associative Laws", category: "Algebraic", unionForm: "(A ∪ B) ∪ C = A ∪ (B ∪ C)", intersectionForm: "(A ∩ B) ∩ C = A ∩ (B ∩ C)", notes: "Grouping of consecutive unions or intersections is invariant." },
  { name: "Distributive Laws", category: "Algebraic", unionForm: "A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)", intersectionForm: "A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)", notes: "Union distributes over intersection and vice versa." },
  { name: "De Morgan's Laws", category: "Complements", unionForm: "(A ∪ B)′ = A′ ∩ B′", intersectionForm: "(A ∩ B)′ = A′ ∪ B′", notes: "Complement flips union to intersection and vice versa." },
  { name: "Absorption Laws", category: "Algebraic", unionForm: "A ∪ (A ∩ B) = A", intersectionForm: "A ∩ (A ∪ B) = A", notes: "Inner subset is completely absorbed by the outer envelope." },
  { name: "Complement Laws", category: "Complements", unionForm: "A ∪ A′ = U", intersectionForm: "A ∩ A′ = ∅", notes: "A set and its complement partition the universe." },
  { name: "Involution / Double Complement", category: "Complements", unionForm: "(A′)′ = A", intersectionForm: "U′ = ∅ and ∅′ = U", notes: "Complement is a self-inverting bijective involution." },
  { name: "Relative Complement Identities", category: "Complements", unionForm: "A \\ B = A ∩ B′", intersectionForm: "A \\ (B ∪ C) = (A \\ B) ∩ (A \\ C)", notes: "Difference with union flips to intersection of differences." },
];

// ============================================================================
// 4. DATA: NEST MISCONCEPTIONS & TRAPS (7 TRAPS)
// ============================================================================
interface Misconception {
  id: string;
  trap: string;
  reality: string;
  fix: string;
  example: string;
}

const nestTraps: Misconception[] = [
  {
    id: "t1",
    trap: "∅, {∅}, and {{}} are identical sets.",
    reality: "∅ is empty (|∅| = 0). {∅} is a singleton (|{∅}| = 1) containing the empty set.",
    fix: "∅ ∈ {∅} is TRUE, but ∅ = {∅} is FALSE. Always check nesting depth of braces.",
    example: "If A = {∅}, then |𝒫(A)| = 2¹ = 2, with 𝒫(A) = {∅, {∅}}.",
  },
  {
    id: "t2",
    trap: "The power set 𝒫(A ∪ B) equals 𝒫(A) ∪ 𝒫(B).",
    reality: "False! 𝒫(A) ∪ 𝒫(B) ⊊ 𝒫(A ∪ B).",
    fix: "Equality holds ONLY if A ⊆ B or B ⊆ A. Note that 𝒫(A ∩ B) = 𝒫(A) ∩ 𝒫(B) IS always true.",
    example: "Let A={1}, B={2} ⟹ {1, 2} ∈ 𝒫(A ∪ B), but {1, 2} ∉ 𝒫(A) ∪ 𝒫(B).",
  },
  {
    id: "t3",
    trap: "Interval (a, a) is a non-empty set.",
    reality: "The open interval (a, a) = {x ∈ ℝ | a < x < a} = ∅.",
    fix: "Closed interval [a, a] = {a} is a singleton set. Open interval (a, a) = ∅.",
    example: "(3, 3) = ∅, while [3, 3] = {3}.",
  },
  {
    id: "t4",
    trap: "If A ∩ B = A ∩ C, then B = C.",
    reality: "False! Cancellation law does not hold for set intersection.",
    fix: "B = C is guaranteed ONLY if BOTH A ∩ B = A ∩ C AND A ∪ B = A ∪ C hold simultaneously.",
    example: "Let A = ∅, B = {1}, C = {2} ⟹ ∅ = ∅, but B ≠ C.",
  },
  {
    id: "t5",
    trap: "The symmetric difference A △ B is non-associative.",
    reality: "False! (A △ B) △ C = A △ (B △ C).",
    fix: "Set symmetric difference forms an Abelian Group (𝒫(U), △) with identity ∅.",
    example: "χ_(A △ B △ C) ≡ χ_A ⊕ χ_B ⊕ χ_C (mod 2), which is completely symmetric.",
  },
  {
    id: "t6",
    trap: "Countable infinity equals uncountably infinite cardinality.",
    reality: "|ℕ| = |ℤ| = |ℚ| = ℵ₀ (Countably Infinite), but |(0, 1)| = |ℝ| = c = 2^ℵ₀ > ℵ₀ (Uncountable).",
    fix: "Cantor's snake diagonal traversal proves ℚ is countable, while diagonal argument proves c > ℵ₀.",
    example: "|ℤ| = |ℕ| = |ℚ| = ℵ₀, while |(0, 1)| = |ℝ| = c = 2^ℵ₀ > ℵ₀.",
  },
  {
    id: "t7",
    trap: "The subset relation A ⊆ B means A is smaller than B.",
    reality: "A ⊆ B permits A = B. Only A ⊊ B guarantees A ≠ B.",
    fix: "In finite sets, A ⊆ B ⟹ |A| ≤ |B|. In infinite sets, proper subsets can have equal cardinality (|2ℕ| = |ℕ| = ℵ₀).",
    example: "The set of even numbers is a proper subset of ℕ, yet both have ℵ₀ elements.",
  },
];

// ============================================================================
// 5. DATA: MASTER GLOSSARY (20 TERMS)
// ============================================================================
interface GlossaryTerm {
  term: string;
  category: "Foundations" | "Set Algebra" | "Topology & Cardinality" | "Advanced";
  definition: string;
  formula?: string;
}

const masterGlossary: GlossaryTerm[] = [
  { term: "Anatomy of a Set", category: "Foundations", definition: "An unordered collection of unique objects defined by an explicit membership criterion." },
  { term: "Antinomy / Paradox", category: "Foundations", definition: "A self-contradictory statement within an axiomatic system (e.g., Russell's Paradox)." },
  { term: "Bijection", category: "Topology & Cardinality", definition: "A one-to-one and onto mapping between two sets establishing cardinal equivalence." },
  { term: "Cardinality (|A|)", category: "Topology & Cardinality", definition: "The total number of elements in a set A. Equals n for finite sets; ℵ₀ for countable; c for continuum." },
  { term: "Cartesian Product (A × B)", category: "Advanced", definition: "The set of all ordered pairs (a, b) such that a ∈ A and b ∈ B. |A × B| = |A| · |B|.", formula: "{(a, b) | a ∈ A, b ∈ B}" },
  { term: "Characteristic Function (χ_A)", category: "Advanced", definition: "An indicator function mapping elements to 1 if x ∈ A and 0 if x ∉ A.", formula: "χ_A: U → {0, 1}" },
  { term: "Complement (A')", category: "Set Algebra", definition: "The set of all elements in the universal set U that do not belong to A.", formula: "{x ∈ U | x ∉ A}" },
  { term: "De Morgan’s Laws", category: "Set Algebra", definition: "Fundamental set identities: (A ∪ B)' = A' ∩ B' and (A ∩ B)' = A' ∪ B'." },
  { term: "Disjoint Sets", category: "Set Algebra", definition: "Sets A and B whose intersection is empty (A ∩ B = ∅)." },
  { term: "Embarrassment of Overcounting", category: "Advanced", definition: "The mathematical driver behind the Principle of Inclusion-Exclusion (PIE)." },
  { term: "Empty Set (∅)", category: "Foundations", definition: "The unique set containing zero elements (|∅| = 0). Vacuously a subset of every set A.", formula: "∀x, x ∉ ∅" },
  { term: "Finite Set", category: "Foundations", definition: "A set whose elements can be placed in bijection with {1, 2, ..., n} for some n ∈ ℕ₀." },
  { term: "Interval", category: "Topology & Cardinality", definition: "A connected subset of real numbers defined by upper and lower boundary points." },
  { term: "Partition of a Set", category: "Set Algebra", definition: "A collection of non-empty mutually disjoint subsets of A whose union equals A." },
  { term: "Power Set (𝒫(A))", category: "Set Algebra", definition: "The set of all subsets of A, having cardinality 2^{|A|}.", formula: "𝒫(A) = {X | X ⊆ A}" },
  { term: "Proper Subset (A ⊊ B)", category: "Foundations", definition: "A subset A of B such that A ≠ B.", formula: "A ⊆ B ∧ A ≠ B" },
  { term: "Set Difference (A \\ B)", category: "Set Algebra", definition: "The set of elements in A that are not in B.", formula: "A ∩ B′" },
  { term: "Symmetric Difference (A △ B)", category: "Set Algebra", definition: "The set of elements in A ∪ B but not in A ∩ B.", formula: "(A \\ B) ∪ (B \\ A)" },
  { term: "Universal Set (U)", category: "Foundations", definition: "The master set containing all objects under consideration in a particular context." },
  { term: "Venn Diagram", category: "Set Algebra", definition: "A visual representation of set operations using overlapping closed planar regions." },
];

// ============================================================================
// 6. DATA: 20 NEST QUESTIONS (10 PART A MCQs + 10 PART B MSQs)
// ============================================================================
interface Question {
  id: number;
  part: "A" | "B";
  type: "single" | "multi";
  question: string;
  options: { key: string; text: string }[];
  correctKeys: string[];
  explanation: string;
}

const questionsData: Question[] = [
  {
    id: 1,
    part: "A",
    type: "single",
    question: "Let A₀ = ∅, and for every integer k ≥ 0, let Aₖ₊₁ = 𝒫(Aₖ), where 𝒫(S) denotes the power set of S. What is the exact value of the cardinality |𝒫(𝒫(A₃))|?",
    options: [
      { key: "A", text: "2¹⁶ = 65,536" },
      { key: "B", text: "2⁴ = 16" },
      { key: "C", text: "2⁶⁵⁵³⁶" },
      { key: "D", text: "2⁸ = 256" },
    ],
    correctKeys: ["A"],
    explanation: "Step-by-step: |A₀| = 0 ⟹ |A₁| = 2⁰ = 1 ⟹ |A₂| = 2¹ = 2 ⟹ |A₃| = 2² = 4. Then |𝒫(A₃)| = 2⁴ = 16. Finally, |𝒫(𝒫(A₃))| = 2¹⁶ = 65,536.",
  },
  {
    id: 2,
    part: "A",
    type: "single",
    question: "In a survey of 100 NISER aspirants, A represents students who solved Physics, B represents Chemistry, and C represents Biology. Given |A| = 75, |B| = 80, and |C| = 85. What is the ABSOLUTE MINIMUM possible value of |A ∩ B ∩ C|?",
    options: [
      { key: "A", text: "35" },
      { key: "B", text: "40" },
      { key: "C", text: "50" },
      { key: "D", text: "60" },
    ],
    correctKeys: ["B"],
    explanation: "By Bonferroni Inequality on complements: failed Physics = 100-75 = 25; failed Chemistry = 100-80 = 20; failed Biology = 100-85 = 15. The maximum number who failed at least one subject is 25 + 20 + 15 = 60. Therefore, the minimum who solved all three is 100 - 60 = 40.",
  },
  {
    id: 3,
    part: "A",
    type: "single",
    question: "Consider the family of intervals Iₙ = (1 - 1/n, 2 + 1/n] for all n ∈ ℕ = {1, 2, 3, ...}. What are the exact sets evaluated by ⋂ₙ₌₁^∞ Iₙ and ⋃ₙ₌₁^∞ Iₙ?",
    options: [
      { key: "A", text: "⋂ Iₙ = [1, 2] and ⋃ Iₙ = (0, 3]" },
      { key: "B", text: "⋂ Iₙ = [1, 2] and ⋃ Iₙ = [0, 3]" },
      { key: "C", text: "⋂ Iₙ = (1, 2] and ⋃ Iₙ = (0, 3]" },
      { key: "D", text: "⋂ Iₙ = [1, 2) and ⋃ Iₙ = [0, 3)" },
    ],
    correctKeys: ["A"],
    explanation: "Nested decreasing sequence: I₁ = (0, 3] contains all subsequent intervals, so the infinite union is I₁ = (0, 3]. In the infinite intersection, 1 - 1/n → 1 from below (so 1 is contained for all n, giving [1) and 2 + 1/n → 2 from above (so any x > 2 is eventually excluded, giving 2]). Thus ⋂ Iₙ = [1, 2].",
  },
  {
    id: 4,
    part: "A",
    type: "single",
    question: "Let A and B be two fixed subsets of universal set U. If X is an unknown set satisfying the symmetric difference equation A △ X = B, express X explicitly in terms of A and B.",
    options: [
      { key: "A", text: "X = A \\ B" },
      { key: "B", text: "X = A ∪ B" },
      { key: "C", text: "X = A △ B" },
      { key: "D", text: "X = A ∩ B′" },
    ],
    correctKeys: ["C"],
    explanation: "(𝒫(U), △) forms an Abelian Group where every element is its own inverse (A △ A = ∅). Applying A △ to both sides: A △ (A △ X) = A △ B ⟹ (A △ A) △ X = A △ B ⟹ ∅ △ X = A △ B ⟹ X = A △ B.",
  },
  {
    id: 5,
    part: "A",
    type: "single",
    question: "Let S = {1, 2, 3, ..., 10}. How many subsets A ⊆ S exist such that A contains at least one even integer?",
    options: [
      { key: "A", text: "1024" },
      { key: "B", text: "992" },
      { key: "C", text: "960" },
      { key: "D", text: "512" },
    ],
    correctKeys: ["B"],
    explanation: "Total subsets of S is 2¹⁰ = 1024. The subsets containing NO even numbers are formed solely from the 5 odd numbers {1, 3, 5, 7, 9}, giving 2⁵ = 32. By complement counting: Subsets with ≥ 1 even integer = 1024 - 32 = 992.",
  },
  {
    id: 6,
    part: "A",
    type: "single",
    question: "Let A = {x ∈ ℝ | |x - 1| + |x - 2| = 1} and B = {x ∈ ℝ | x² - 3x + 2 ≤ 0}. What is the set A △ B?",
    options: [
      { key: "A", text: "[1, 2]" },
      { key: "B", text: "(1, 2)" },
      { key: "C", text: "∅" },
      { key: "D", text: "{1, 2}" },
    ],
    correctKeys: ["C"],
    explanation: "For A: |x-1| + |x-2| = 1 holds identically for all x ∈ [1, 2]. For B: (x-1)(x-2) ≤ 0 holds for x ∈ [1, 2]. Since A = B = [1, 2], their symmetric difference A △ B = (A ∪ B) \\ (A ∩ B) = ∅.",
  },
  {
    id: 7,
    part: "A",
    type: "single",
    question: "Let S be a set with |S| = n. What is the total number of ordered pairs of subsets (A, B) of S such that A ∩ B = ∅?",
    options: [
      { key: "A", text: "2ⁿ" },
      { key: "B", text: "3ⁿ" },
      { key: "C", text: "4ⁿ" },
      { key: "D", text: "3ⁿ - 2ⁿ" },
    ],
    correctKeys: ["B"],
    explanation: "For each of the n elements x ∈ S, since x cannot belong to A ∩ B, there are exactly 3 mutually exclusive choices: (1) x ∈ A \\ B, (2) x ∈ B \\ A, or (3) x ∉ A ∪ B. For n elements: 3 × 3 × ... × 3 = 3ⁿ.",
  },
  {
    id: 8,
    part: "A",
    type: "single",
    question: "If A = {x ∈ ℝ | sin x = 1/2} and B = {x ∈ ℝ | cos x = √3/2}, what is B \\ A?",
    options: [
      { key: "A", text: "{2kπ + π/6 | k ∈ ℤ}" },
      { key: "B", text: "{2kπ - π/6 | k ∈ ℤ}" },
      { key: "C", text: "∅" },
      { key: "D", text: "{kπ + (-1)ᵏπ/6 | k ∈ ℤ}" },
    ],
    correctKeys: ["B"],
    explanation: "A = {2kπ + π/6} ∪ {2kπ + 5π/6}. B = {2kπ + π/6} ∪ {2kπ - π/6}. The set difference B \\ A removes the shared family {2kπ + π/6}, leaving {2kπ - π/6 | k ∈ ℤ} since sin(2kπ - π/6) = -1/2 ≠ 1/2.",
  },
  {
    id: 9,
    part: "A",
    type: "single",
    question: "Which of the following equations correctly expresses the indicator function χ_(A \\ B)(x) in terms of individual indicator functions χ_A(x) and χ_B(x)?",
    options: [
      { key: "A", text: "χ_A(x) - χ_B(x)" },
      { key: "B", text: "χ_A(x)(1 - χ_B(x))" },
      { key: "C", text: "χ_A(x) + χ_B(x) - χ_A(x)χ_B(x)" },
      { key: "D", text: "1 - χ_A(x)χ_B(x)" },
    ],
    correctKeys: ["B"],
    explanation: "A \\ B = A ∩ B′. Thus χ_(A \\ B)(x) = χ_A(x) · χ_B′(x) = χ_A(x)(1 - χ_B(x)).",
  },
  {
    id: 10,
    part: "A",
    type: "single",
    question: "Let A, B, C be finite sets with |A|=20, |B|=28, |C|=30, |A∩B|=10, |B∩C|=12, |C∩A|=8, and |A∩B∩C|=4. How many elements belong to EXACTLY TWO of the three sets?",
    options: [
      { key: "A", text: "18" },
      { key: "B", text: "22" },
      { key: "C", text: "30" },
      { key: "D", text: "14" },
    ],
    correctKeys: ["A"],
    explanation: "Formula: N_exact2 = (|A ∩ B| + |B ∩ C| + |C ∩ A|) - 3|A ∩ B ∩ C| = (10 + 12 + 8) - 3(4) = 30 - 12 = 18.",
  },
  {
    id: 11,
    part: "B",
    type: "multi",
    question: "Which of the following statements regarding the Power Set 𝒫(A) are ALWAYS TRUE for any arbitrary sets A and B?",
    options: [
      { key: "A", text: "𝒫(A ∩ B) = 𝒫(A) ∩ 𝒫(B)" },
      { key: "B", text: "𝒫(A ∪ B) = 𝒫(A) ∪ 𝒫(B)" },
      { key: "C", text: "𝒫(A) ∪ 𝒫(B) ⊆ 𝒫(A ∪ B)" },
      { key: "D", text: "If 𝒫(A) = 𝒫(B), then A = B." },
    ],
    correctKeys: ["A", "C", "D"],
    explanation: "A is true (subsets of A ∩ B are subsets of both A and B). B fails in general (e.g. A={1}, B={2} gives {1,2} ∈ 𝒫(A∪B) but {1,2} ∉ 𝒫(A)∪𝒫(B)). C is always valid. D is true since A ∈ 𝒫(A) = 𝒫(B) ⟹ A ⊆ B and vice-versa.",
  },
  {
    id: 12,
    part: "B",
    type: "multi",
    question: "Let A = {1, 2, {3, 4}, ∅}. Which of the following set-theoretic assertions are CORRECT?",
    options: [
      { key: "A", text: "∅ ∈ A" },
      { key: "B", text: "∅ ⊆ A" },
      { key: "C", text: "{3, 4} ⊆ A" },
      { key: "D", text: "{{3, 4}} ⊆ A" },
    ],
    correctKeys: ["A", "B", "D"],
    explanation: "A is true (∅ is listed as an element). B is true (∅ is a subset of every set). C is false ({3, 4} is an element of A, but 3 ∉ A and 4 ∉ A). D is true (the singleton set containing the element {3, 4} is a subset of A).",
  },
  {
    id: 13,
    part: "B",
    type: "multi",
    question: "Which of the following properties hold true for the Symmetric Difference operation A △ B = (A \\ B) ∪ (B \\ A)?",
    options: [
      { key: "A", text: "A △ B = B △ A (Commutative)" },
      { key: "B", text: "(A △ B) △ C = A △ (B △ C) (Associative)" },
      { key: "C", text: "A ∩ (B △ C) = (A ∩ B) △ (A ∩ C) (Distributive over ∩)" },
      { key: "D", text: "A △ A = A" },
    ],
    correctKeys: ["A", "B", "C"],
    explanation: "A, B, C are correct: (𝒫(U), △) forms an Abelian group where △ is commutative, associative, and distributes over ∩. D is false because A △ A = ∅.",
  },
  {
    id: 14,
    part: "B",
    type: "multi",
    question: "Let A, B ⊆ U. Which of the following conditions are EQUIVALENT to the assertion A ⊆ B?",
    options: [
      { key: "A", text: "A ∩ B′ = ∅" },
      { key: "B", text: "A′ ∪ B = U" },
      { key: "C", text: "A ∪ B = B" },
      { key: "D", text: "A ∩ B = A" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    explanation: "All four conditions (A, B, C, D) are fundamentally equivalent algebraic characterizations of the subset relation A ⊆ B in Boolean set algebra.",
  },
  {
    id: 15,
    part: "B",
    type: "multi",
    question: "Select the CORRECT statements regarding cardinalities of infinite sets:",
    options: [
      { key: "A", text: "The set of all rational numbers ℚ is countably infinite (|ℚ| = |ℕ| = ℵ₀)." },
      { key: "B", text: "The open interval (0, 1) ⊂ ℝ is uncountably infinite (|(0, 1)| = |ℝ| = c)." },
      { key: "C", text: "The set of all integers ℤ has a strictly greater cardinality than ℕ." },
      { key: "D", text: "For any infinite set A, |𝒫(A)| > |A| by Cantor's Theorem." },
    ],
    correctKeys: ["A", "B", "D"],
    explanation: "A is true (Cantor diagonalization). B is true (bijection via tan function). C is false because |ℤ| = |ℕ| = ℵ₀. D is Cantor's fundamental theorem for all sets.",
  },
  {
    id: 16,
    part: "B",
    type: "multi",
    question: "Let A = {x ∈ ℝ | x² - 5x + 6 = 0} and B = {x ∈ ℝ | x³ - 6x² + 11x - 6 = 0}. Which of the following set relationships hold?",
    options: [
      { key: "A", text: "A ⊊ B" },
      { key: "B", text: "A ∩ B = {2, 3}" },
      { key: "C", text: "B \\ A = {1}" },
      { key: "D", text: "A ∪ B = {1, 2, 3}" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    explanation: "A = {2, 3} and B = {1, 2, 3}. Since A is a proper subset of B with element 1 missing in A, all four relationships (A, B, C, D) are correct.",
  },
  {
    id: 17,
    part: "B",
    type: "multi",
    question: "Which of the following statements regarding De Morgan's Laws and Distributive Laws are CORRECT for any sets A, B, C?",
    options: [
      { key: "A", text: "A \\ (B ∪ C) = (A \\ B) ∩ (A \\ C)" },
      { key: "B", text: "A \\ (B ∩ C) = (A \\ B) ∪ (A \\ C)" },
      { key: "C", text: "A ∩ (B \\ C) = (A ∩ B) \\ (A ∩ C)" },
      { key: "D", text: "(A ∪ B ∪ C)′ = A′ ∩ B′ ∩ C′" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    explanation: "All four assertions are valid algebraic theorems: A and B are relative complement De Morgan laws, C is difference distribution, and D is generalized 3-set De Morgan expansion.",
  },
  {
    id: 18,
    part: "B",
    type: "multi",
    question: "For any two finite non-empty sets A and B, which of the following inequalities/equalities regarding cardinalities are ALWAYS VALID?",
    options: [
      { key: "A", text: "max(|A|, |B|) ≤ |A ∪ B| ≤ |A| + |B|" },
      { key: "B", text: "0 ≤ |A ∩ B| ≤ min(|A|, |B|)" },
      { key: "C", text: "|A \\ B| ≥ |A| - |B|" },
      { key: "D", text: "|A △ B| = |A| + |B| - 2|A ∩ B|" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    explanation: "A & B are standard union and intersection bounds. C holds because |A \\ B| = |A| - |A ∩ B| and |A ∩ B| ≤ |B|. D is the exact cardinality formula for symmetric difference.",
  },
  {
    id: 19,
    part: "B",
    type: "multi",
    question: "Let A = [0, 5] and B = (2, 7) be two intervals on the real line ℝ. Which of the following evaluations of set operations are CORRECT?",
    options: [
      { key: "A", text: "A ∪ B = [0, 7)" },
      { key: "B", text: "A ∩ B = (2, 5]" },
      { key: "C", text: "A \\ B = [0, 2]" },
      { key: "D", text: "B \\ A = (5, 7)" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    explanation: "A ∪ B = [0, 7). A ∩ B = (2, 5]. A \\ B contains 2 because 2 ∈ A and 2 ∉ B, yielding [0, 2]. B \\ A excludes 5 because 5 ∈ A, yielding (5, 7). All 4 are correct.",
  },
  {
    id: 20,
    part: "B",
    type: "multi",
    question: "Consider three non-empty sets A, B, C. Which of the following conditions guarantee that A ∩ B ∩ C = ∅?",
    options: [
      { key: "A", text: "A and B are disjoint (A ∩ B = ∅)." },
      { key: "B", text: "A ⊆ B′" },
      { key: "C", text: "|A ∪ B ∪ C| = |A| + |B| + |C| - |A ∩ B| - |B ∩ C| - |C ∩ A|" },
      { key: "D", text: "A ∩ B ⊆ C′" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    explanation: "A and B make the pairwise intersection empty, which eliminates triple intersection. C asserts the PIE triple intersection term is 0. D states that the intersection of A and B lies entirely outside C.",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
type Tab = "foundations" | "classification" | "operations" | "identities" | "pie" | "characteristic" | "traps" | "glossary" | "selftest";

interface SetsMathematicsPremiumProps {
  onClose?: () => void;
}

export default function SetsMathematicsPremium({ onClose }: SetsMathematicsPremiumProps) {
  const [activeTab, setActiveTab] = useState<Tab>("foundations");

  // Tab 1 state: Interval Topology
  const [selectedIntervalId, setSelectedIntervalId] = useState<string>("open");
  const [russellExpanded, setRussellExpanded] = useState<boolean>(false);

  // Tab 2 state: Power set simulator
  const [powerSetInput, setPowerSetInput] = useState<string>("1, 2, 3");

  // Tab 3 state: Venn Diagram
  const [vennMode, setVennMode] = useState<"union" | "intersection" | "diffAB" | "diffBA" | "symDiff" | "compA" | "compB" | "compUnion">("union");

  // Tab 4 state: Identities & Proofs
  const [identityFilter, setIdentityFilter] = useState<string>("All");
  const [deMorganProofExpanded, setDeMorganProofExpanded] = useState<boolean>(false);

  // Tab 5 state: PIE Calculator
  const [pieA, setPieA] = useState<number>(75);
  const [pieB, setPieB] = useState<number>(80);
  const [pieC, setPieC] = useState<number>(85);
  const [pieAB, setPieAB] = useState<number>(60);
  const [pieBC, setPieBC] = useState<number>(68);
  const [pieCA, setPieCA] = useState<number>(64);
  const [pieABC, setPieABC] = useState<number>(50);
  const [pieUniverse, setPieUniverse] = useState<number>(100);

  // Tab 6 state: Characteristic function simulator
  const [elemInA, setElemInA] = useState<boolean>(true);
  const [elemInB, setElemInB] = useState<boolean>(false);
  const [elemInC, setElemInC] = useState<boolean>(true);

  // Tab 7 state: Traps
  const [expandedTrapId, setExpandedTrapId] = useState<string | null>("t1");

  // Tab 8 state: Glossary
  const [glossarySearch, setGlossarySearch] = useState<string>("");
  const [glossaryCategory, setGlossaryCategory] = useState<string>("All");

  // Tab 9 state: Self-Test
  const [currentQ, setCurrentQ] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string[]>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState<number | null>(null);
  const [testFilter, setTestFilter] = useState<"ALL" | "A" | "B">("ALL");

  // Bookmark states
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // Computed Power Set
  const powerSetElements = useMemo(() => {
    const raw = powerSetInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    const unique = Array.from(new Set(raw));
    const capped = unique.slice(0, 5); // cap at 5 for performance & UI clarity

    // generate all subsets
    const n = capped.length;
    const subsets: string[][] = [];
    for (let i = 0; i < 1 << n; i++) {
      const sub: string[] = [];
      for (let j = 0; j < n; j++) {
        if ((i >> j) & 1) sub.push(capped[j]);
      }
      subsets.push(sub);
    }
    // sort subsets by length
    subsets.sort((a, b) => a.length - b.length);
    return { elements: capped, count: subsets.length, subsets };
  }, [powerSetInput]);

  // Computed PIE results
  const pieUnion = useMemo(() => {
    return pieA + pieB + pieC - pieAB - pieBC - pieCA + pieABC;
  }, [pieA, pieB, pieC, pieAB, pieBC, pieCA, pieABC]);

  const pieExact1 = useMemo(() => {
    return pieA + pieB + pieC - 2 * (pieAB + pieBC + pieCA) + 3 * pieABC;
  }, [pieA, pieB, pieC, pieAB, pieBC, pieCA, pieABC]);

  const pieExact2 = useMemo(() => {
    return pieAB + pieBC + pieCA - 3 * pieABC;
  }, [pieAB, pieBC, pieCA, pieABC]);

  const pieAtLeast2 = useMemo(() => {
    return pieAB + pieBC + pieCA - 2 * pieABC;
  }, [pieAB, pieBC, pieCA, pieABC]);

  // Filtered Glossary
  const filteredGlossary = useMemo(() => {
    return masterGlossary.filter((item) => {
      const matchSearch =
        item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
        item.definition.toLowerCase().includes(glossarySearch.toLowerCase()) ||
        (item.formula && item.formula.toLowerCase().includes(glossarySearch.toLowerCase()));
      const matchCategory = glossaryCategory === "All" || item.category === glossaryCategory;
      return matchSearch && matchCategory;
    });
  }, [glossarySearch, glossaryCategory]);

  const activeQuestion = questionsData[currentQ];

  function toggleAnswer(qIndex: number, key: string, type: "single" | "multi") {
    if (submitted[qIndex]) return;
    setSelectedAnswers((prev) => {
      const current = prev[qIndex] || [];
      if (type === "single") {
        return { ...prev, [qIndex]: [key] };
      }
      if (current.includes(key)) {
        return { ...prev, [qIndex]: current.filter((k) => k !== key) };
      }
      return { ...prev, [qIndex]: [...current, key] };
    });
  }

  function submitQuestion(qIndex: number) {
    setSubmitted((prev) => ({ ...prev, [qIndex]: true }));
  }

  function computeTotalScore() {
    let total = 0;
    questionsData.forEach((q, i) => {
      const sel = selectedAnswers[i] || [];
      const isCorrect =
        sel.length === q.correctKeys.length &&
        q.correctKeys.every((k) => sel.includes(k));
      if (isCorrect) total++;
    });
    setScore(total);
  }

  function resetTest() {
    setSelectedAnswers({});
    setSubmitted({});
    setScore(null);
    setCurrentQ(0);
  }

  const selectedInterval = intervalTypes.find((t) => t.id === selectedIntervalId)!;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "foundations", label: "Axioms & Intervals", icon: <Sparkles className="w-3.5 h-3.5 shrink-0" /> },
    { id: "classification", label: "Classification & 𝒫(A)", icon: <Layers className="w-3.5 h-3.5 shrink-0" /> },
    { id: "operations", label: "Venn & Operations", icon: <Activity className="w-3.5 h-3.5 shrink-0" /> },
    { id: "identities", label: "Master Identities", icon: <Scale className="w-3.5 h-3.5 shrink-0" /> },
    { id: "pie", label: "PIE & Cardinality", icon: <Calculator className="w-3.5 h-3.5 shrink-0" /> },
    { id: "characteristic", label: "Indicator Functions", icon: <Zap className="w-3.5 h-3.5 shrink-0" /> },
    { id: "traps", label: "NEST Traps (10)", icon: <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> },
    { id: "glossary", label: "Master Glossary", icon: <BookOpen className="w-3.5 h-3.5 shrink-0" /> },
    { id: "selftest", label: "NEST 20-Q Test", icon: <Award className="w-3.5 h-3.5 shrink-0" /> },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full select-none">
      {/* ═══════════════════════════════════════════════════════════════════
          TOP BREADCRUMB & HEADER BAR (Matching Old Chapter Layout)
         ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-between bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 overflow-x-auto scrollbar-none">
          <span className="text-[#4F46E5] font-black">Mathematics</span>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-300" />
          <span>Class XI</span>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-300" />
          <span className="text-gray-900 font-extrabold whitespace-nowrap">Unit 1 — Sets and Functions</span>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-300" />
          <span className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-black whitespace-nowrap">Chapter 1: Sets</span>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-600 bg-gray-50 border border-gray-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all shrink-0 ml-2"
          >
            <X className="w-3.5 h-3.5" />
            <span>Exit</span>
          </button>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER HERO BANNER (Standardized with Old Chapter Structure)
         ═══════════════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-gray-200/80 shadow-2xs space-y-6">
        <div className="space-y-4 pb-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Left Content */}
            <div className="flex-1 space-y-3.5">
              <div>
                <span className="text-[11px] font-black text-[#4F46E5] bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-lg uppercase tracking-wider">
                  CHAPTER 1 · CLASS XI MATHEMATICS
                </span>
              </div>

              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
                  Sets &amp; Set Theory
                </h1>
                <span className="text-gray-300 text-2xl font-light">|</span>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-indigo-600 transition-colors"
                  title="Bookmark Chapter"
                >
                  <Bookmark className={`h-5 w-5 sm:h-6 sm:w-6 ${isBookmarked ? "fill-indigo-600 text-indigo-600" : ""}`} />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed max-w-3xl">
                Master the axiomatic foundations of naive vs. ZFC set theory, real line interval topology, power set combinatorics, Boolean set algebra, dynamic Venn diagram operations, master table of set identities, Principle of Inclusion-Exclusion (PIE), indicator polynomials, high-yield NEST traps, and 20 examination practice questions.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-1 text-xs font-extrabold text-gray-600">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-indigo-500" />
                  <span>9 Core Sections</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-indigo-500" />
                  <span>35 min comprehensive</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4 text-indigo-500" />
                  <span>20 Practice Questions (10 MCQ + 10 MSQ)</span>
                </div>

                <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full text-xs font-black">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>NEST 2026 &amp; NCERT Aligned</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reading Progress Indicator */}
          <div className="space-y-1.5 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-xs font-bold text-gray-600">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-indigo-500" /> Chapter Coverage &amp; Interactive Navigation
              </span>
              <span className="text-[#4F46E5] font-black">
                {activeTab === "selftest" && score !== null ? `${Math.round((score / 20) * 100)}% Tested` : "Active Module"}
              </span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full w-full" />
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            NAVIGATION TABS (Standardized 9 Tabs Bar)
           ═══════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200 w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-white text-slate-950 shadow-xs border border-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            TAB 1: AXIOMS & INTERVALS
           ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "foundations" && (
          <div className="space-y-6">
            {/* Section Header Bar */}
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-purple-50/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-100/80">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-purple-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                  1
                </span>
                <div>
                  <h3 className="text-base font-black text-gray-900">Axiomatic Foundations &amp; Representations</h3>
                  <p className="text-[11px] text-gray-500 font-semibold">Elementhood · Russell's Paradox · Roster Form · Set-Builder Form</p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-lg">
                Section 1 of 9
              </span>
            </div>

            {/* Concept Card 1.1 */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-dashed border-gray-200">
                <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-100 text-[#4F46E5] flex items-center justify-center shrink-0">
                  <Flame className="h-4 w-4 fill-indigo-500/20" />
                </div>
                <h4 className="text-base font-black text-[#4F46E5] tracking-tight">
                  1.1 Definition of a Set &amp; Elementhood
                </h4>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                A <strong className="text-indigo-900">Set</strong> is a well-defined collection of distinct objects (elements). The phrase <em className="text-slate-900">well-defined</em> guarantees that for any object $x$ and set $A$, the statement $x \in A$ has an invariant truth value (True or False).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[9px] font-black uppercase tracking-wider text-emerald-800 block">Statement: x ∈ A</span>
                  <p className="text-xs font-semibold text-slate-800 mt-1">
                    Element $x$ belongs to set $A$. Truth Value = <strong className="text-emerald-700 font-bold">TRUE</strong>.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                  <span className="text-[9px] font-black uppercase tracking-wider text-rose-800 block">Statement: x ∉ A</span>
                  <p className="text-xs font-semibold text-slate-800 mt-1">
                    Element $x$ does not belong to set $A$. Truth Value = <strong className="text-rose-700 font-bold">FALSE</strong>.
                  </p>
                </div>
              </div>

              {/* Russell's paradox toggle */}
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
                <div
                  onClick={() => setRussellExpanded(!russellExpanded)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-black text-amber-900">Russell's Paradox &amp; ZFC Axiomatic Set Theory</span>
                  </div>
                  <button className="text-amber-800 text-xs font-bold flex items-center gap-1">
                    {russellExpanded ? "Hide Details" : "Explore Paradox"}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${russellExpanded ? "rotate-180" : ""}`} />
                  </button>
                </div>

                {russellExpanded && (
                  <div className="pt-2 text-xs text-amber-950 font-medium space-y-2 border-t border-amber-200">
                    <p>
                      In naive set theory, unrestricted comprehension allowed sets like {"R = {x | x ∉ x}"}. Question: Is R ∈ R?
                    </p>
                    <div className="p-2 rounded bg-white/80 border border-amber-300 font-mono text-[11px] font-bold text-amber-900">
                      R ∈ R ⟺ R ∉ R (Fundamental Contradiction)
                    </div>
                    <p>
                      To resolve this, modern ZFC set theory restricts set formation to well-defined predicates operating strictly on existing sets (Axiom of Specification).
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Concept Card 1.2 */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-dashed border-gray-200">
                <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-100 text-[#4F46E5] flex items-center justify-center shrink-0">
                  <Flame className="h-4 w-4 fill-indigo-500/20" />
                </div>
                <h4 className="text-base font-black text-[#4F46E5] tracking-tight">
                  1.2 Real Line Interval Topology &amp; Visualizer
                </h4>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {intervalTypes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedIntervalId(t.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedIntervalId === t.id
                        ? "bg-indigo-950 text-white border-indigo-500 shadow-xs"
                        : "bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-xs font-black block">{t.notation}</span>
                    <span className={`text-[10px] font-medium block ${selectedIntervalId === t.id ? "text-indigo-200" : "text-slate-500"}`}>
                      {t.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Visual SVG Real Line */}
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-indigo-300">Notation: {selectedInterval.notation}</span>
                  <span className="font-mono text-slate-400">Set-Builder: {selectedInterval.setBuilder}</span>
                </div>

                <div className="py-3">
                  <svg viewBox="0 0 500 70" className="w-full h-16">
                    <line x1="20" y1="35" x2="480" y2="35" stroke="#475569" strokeWidth="2" />
                    <path d="M 20 35 L 30 30 L 30 40 Z" fill="#475569" />
                    <path d="M 480 35 L 470 30 L 470 40 Z" fill="#475569" />

                    <line x1="180" y1="30" x2="180" y2="40" stroke="#64748b" strokeWidth="1.5" />
                    <text x="180" y="55" fill="#94a3b8" fontSize="11" textAnchor="middle" fontFamily="monospace">
                      a (1)
                    </text>

                    <line x1="340" y1="30" x2="340" y2="40" stroke="#64748b" strokeWidth="1.5" />
                    <text x="340" y="55" fill="#94a3b8" fontSize="11" textAnchor="middle" fontFamily="monospace">
                      b (5)
                    </text>

                    {selectedInterval.id === "open" && (
                      <>
                        <line x1="180" y1="35" x2="340" y2="35" stroke="#6366f1" strokeWidth="6" />
                        <circle cx="180" cy="35" r="5" fill="#0f172a" stroke="#6366f1" strokeWidth="2.5" />
                        <circle cx="340" cy="35" r="5" fill="#0f172a" stroke="#6366f1" strokeWidth="2.5" />
                      </>
                    )}
                    {selectedInterval.id === "closed" && (
                      <>
                        <line x1="180" y1="35" x2="340" y2="35" stroke="#10b981" strokeWidth="6" />
                        <circle cx="180" cy="35" r="5" fill="#10b981" />
                        <circle cx="340" cy="35" r="5" fill="#10b981" />
                      </>
                    )}
                    {selectedInterval.id === "left_closed" && (
                      <>
                        <line x1="180" y1="35" x2="340" y2="35" stroke="#3b82f6" strokeWidth="6" />
                        <circle cx="180" cy="35" r="5" fill="#3b82f6" />
                        <circle cx="340" cy="35" r="5" fill="#0f172a" stroke="#3b82f6" strokeWidth="2.5" />
                      </>
                    )}
                    {selectedInterval.id === "right_closed" && (
                      <>
                        <line x1="180" y1="35" x2="340" y2="35" stroke="#f59e0b" strokeWidth="6" />
                        <circle cx="180" cy="35" r="5" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
                        <circle cx="340" cy="35" r="5" fill="#f59e0b" />
                      </>
                    )}
                    {selectedInterval.id === "ray_pos" && (
                      <>
                        <line x1="180" y1="35" x2="475" y2="35" stroke="#ec4899" strokeWidth="6" />
                        <circle cx="180" cy="35" r="5" fill="#ec4899" />
                      </>
                    )}
                    {selectedInterval.id === "ray_neg" && (
                      <>
                        <line x1="25" y1="35" x2="340" y2="35" stroke="#8b5cf6" strokeWidth="6" />
                        <circle cx="340" cy="35" r="5" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2.5" />
                      </>
                    )}
                  </svg>
                </div>
                <p className="text-xs text-slate-300 font-medium">{selectedInterval.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TAB 2: CLASSIFICATION & POWER SETS
           ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "classification" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-purple-50/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-100/80">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-purple-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                  2
                </span>
                <div>
                  <h3 className="text-base font-black text-gray-900">Set Classification &amp; The Power Set 𝒫(A)</h3>
                  <p className="text-[11px] text-gray-500 font-semibold">Number Set Hierarchy · Subset Inclusion · 2ⁿ Combinatorial Subsets</p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-lg">
                Section 2 of 9
              </span>
            </div>

            {/* Number System Hierarchy */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-dashed border-gray-200">
                <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-100 text-[#4F46E5] flex items-center justify-center shrink-0">
                  <Layers className="h-4 w-4" />
                </div>
                <h4 className="text-base font-black text-[#4F46E5] tracking-tight">
                  2.1 Number System Inclusion Chain: ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {numberSets.map((ns) => (
                  <div key={ns.symbol} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${ns.badgeColor}`}>
                      {ns.symbol} — {ns.name}
                    </span>
                    <p className="text-[11px] text-slate-700 font-medium leading-snug">{ns.definition}</p>
                    <div className="text-[9px] font-bold text-slate-500 font-mono">
                      |S| = {ns.cardinality}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Power Set Simulator */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-dashed border-gray-200">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-100 text-[#4F46E5] flex items-center justify-center shrink-0">
                    <Zap className="h-4 w-4" />
                  </div>
                  <h4 className="text-base font-black text-[#4F46E5] tracking-tight">
                    2.2 Interactive Power Set Simulator: |𝒫(A)| = 2ⁿ
                  </h4>
                </div>
                <span className="text-xs font-mono font-black text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                  {powerSetElements.count} Subsets
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Enter Set Elements (comma-separated, max 5 elements):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={powerSetInput}
                    onChange={(e) => setPowerSetInput(e.target.value)}
                    placeholder="e.g. 1, 2, 3"
                    className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 w-full focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={() => setPowerSetInput("x, y, z")}
                    className="px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-[11px] font-bold text-indigo-700 hover:bg-indigo-100 whitespace-nowrap"
                  >
                    Preset {`{x,y,z}`}
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2">
                  <span className="text-indigo-300 font-bold">Set A = {"{" + powerSetElements.elements.join(", ") + "}"}</span>
                  <span className="text-slate-400">Total Subsets = {powerSetElements.count}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-1">
                  {powerSetElements.subsets.map((sub, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-indigo-200"
                    >
                      {sub.length === 0 ? "∅" : "{" + sub.join(", ") + "}"}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wider block">
                  Combinatorial Binary Decision Proof
                </span>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  For a set with n elements, forming any subset involves n independent binary decisions: for each element xᵢ, choose either <strong className="text-slate-900">Include (1)</strong> or <strong className="text-slate-900">Exclude (0)</strong>. Total subsets = 2 × 2 × ... × 2 = 2ⁿ = Σ C(n, k).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TAB 3: VENN & OPERATIONS
           ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "operations" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-purple-50/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-100/80">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-purple-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                  3
                </span>
                <div>
                  <h3 className="text-base font-black text-gray-900">Venn Diagrams &amp; Set Operations</h3>
                  <p className="text-[11px] text-gray-500 font-semibold">Union · Intersection · Difference · Symmetric Difference · Complement</p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-lg">
                Section 3 of 9
              </span>
            </div>

            {/* Venn Explorer */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-dashed border-gray-200">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-100 text-[#4F46E5] flex items-center justify-center shrink-0">
                    <Activity className="h-4 w-4" />
                  </div>
                  <h4 className="text-base font-black text-[#4F46E5] tracking-tight">
                    3.1 Dynamic SVG Venn Diagram Explorer
                  </h4>
                </div>
                <span className="text-xs font-mono font-black text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                  Boolean Set Visualizer
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "union", label: "Union: A ∪ B" },
                  { id: "intersection", label: "Intersection: A ∩ B" },
                  { id: "diffAB", label: "Difference: A \\ B" },
                  { id: "diffBA", label: "Difference: B \\ A" },
                  { id: "symDiff", label: "Symmetric Diff: A △ B" },
                  { id: "compA", label: "Complement: A′" },
                  { id: "compB", label: "Complement: B′" },
                  { id: "compUnion", label: "De Morgan: (A ∪ B)′" },
                ].map((op) => (
                  <button
                    key={op.id}
                    onClick={() => setVennMode(op.id as any)}
                    className={`px-3 py-2 rounded-xl text-xs font-black transition-all border text-center ${
                      vennMode === op.id
                        ? "bg-indigo-950 text-white border-indigo-500 shadow-xs"
                        : "bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {op.label}
                  </button>
                ))}
              </div>

              <div className="p-4 sm:p-6 rounded-2xl bg-slate-950 text-white flex flex-col items-center justify-center space-y-4">
                <svg viewBox="0 0 400 240" className="w-full max-w-md h-52 sm:h-60">
                  <defs>
                    <clipPath id="clipCircleA">
                      <circle cx="160" cy="120" r="75" />
                    </clipPath>
                    <clipPath id="clipCircleB">
                      <circle cx="240" cy="120" r="75" />
                    </clipPath>
                  </defs>

                  <rect
                    x="10"
                    y="10"
                    width="380"
                    height="220"
                    rx="12"
                    fill={vennMode === "compA" || vennMode === "compB" || vennMode === "compUnion" ? "#312e81" : "#0f172a"}
                    stroke="#475569"
                    strokeWidth="2"
                  />
                  <text x="25" y="32" fill="#94a3b8" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
                    Universal Set U
                  </text>

                  <circle
                    cx="160"
                    cy="120"
                    r="75"
                    fill={
                      vennMode === "union" || vennMode === "diffAB" || vennMode === "symDiff"
                        ? "#6366f1"
                        : vennMode === "compB"
                        ? "#4338ca"
                        : "#1e293b"
                    }
                    opacity="0.8"
                  />

                  <circle
                    cx="240"
                    cy="120"
                    r="75"
                    fill={
                      vennMode === "union" || vennMode === "diffBA" || vennMode === "symDiff"
                        ? "#6366f1"
                        : vennMode === "compA"
                        ? "#4338ca"
                        : "#1e293b"
                    }
                    opacity="0.8"
                  />

                  {(vennMode === "union" || vennMode === "intersection") && (
                    <circle
                      cx="160"
                      cy="120"
                      r="75"
                      clipPath="url(#clipCircleB)"
                      fill={vennMode === "intersection" ? "#10b981" : "#4f46e5"}
                    />
                  )}

                  {(vennMode === "diffAB" || vennMode === "diffBA" || vennMode === "symDiff") && (
                    <circle cx="160" cy="120" r="75" clipPath="url(#clipCircleB)" fill="#0f172a" />
                  )}

                  <circle cx="160" cy="120" r="75" fill="none" stroke="#818cf8" strokeWidth="2.5" />
                  <circle cx="240" cy="120" r="75" fill="none" stroke="#38bdf8" strokeWidth="2.5" />

                  <text x="125" y="125" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="sans-serif">
                    A
                  </text>
                  <text x="265" y="125" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="sans-serif">
                    B
                  </text>
                </svg>

                <div className="text-center space-y-1">
                  <div className="font-mono text-sm font-black text-indigo-300">
                    {vennMode === "union" && "A ∪ B = {x ∈ U | x ∈ A ∨ x ∈ B}"}
                    {vennMode === "intersection" && "A ∩ B = {x ∈ U | x ∈ A ∧ x ∈ B}"}
                    {vennMode === "diffAB" && "A \\ B = {x ∈ U | x ∈ A ∧ x ∉ B} = A ∩ B′"}
                    {vennMode === "diffBA" && "B \\ A = {x ∈ U | x ∈ B ∧ x ∉ A} = B ∩ A′"}
                    {vennMode === "symDiff" && "A △ B = (A \\ B) ∪ (B \\ A) = (A ∪ B) \\ (A ∩ B)"}
                    {vennMode === "compA" && "A′ = {x ∈ U | x ∉ A}"}
                    {vennMode === "compB" && "B′ = {x ∈ U | x ∉ B}"}
                    {vennMode === "compUnion" && "(A ∪ B)′ = A′ ∩ B′ (De Morgan's Law)"}
                  </div>
                  <p className="text-xs text-slate-400 font-medium">
                    {vennMode === "symDiff"
                      ? "Elements in either A or B, but strictly excluding common intersection."
                      : "Shaded colored areas represent active elements satisfying the predicate."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TAB 4: MASTER IDENTITIES & PROOFS
           ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "identities" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-purple-50/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-100/80">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-purple-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                  4
                </span>
                <div>
                  <h3 className="text-base font-black text-gray-900">Master Table of Set Identities &amp; Proofs</h3>
                  <p className="text-[11px] text-gray-500 font-semibold">Idempotent · Distributive · De Morgan's Law · Element-Chasing Proofs</p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-lg">
                Section 4 of 9
              </span>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
              <div className="flex flex-wrap items-center gap-1.5 pb-2">
                {["All", "Foundational", "Algebraic", "Complements"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setIdentityFilter(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                      identityFilter === cat
                        ? "bg-indigo-950 text-white border-indigo-500 shadow-2xs"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="rounded-2xl border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100/80 border-b border-slate-200 font-black text-slate-900 uppercase text-[10px] tracking-wider">
                        <th className="p-3">Law Name</th>
                        <th className="p-3">Union Form (∪)</th>
                        <th className="p-3">Intersection Form (∩)</th>
                        <th className="p-3">Operational Principle</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {setIdentities
                        .filter((item) => identityFilter === "All" || item.category === identityFilter)
                        .map((item, idx) => (
                          <tr key={idx} className="hover:bg-indigo-50/30 transition-colors">
                            <td className="p-3 font-bold text-slate-950">
                              {item.name}
                              <span className="block text-[9px] font-bold text-indigo-600 font-sans uppercase mt-0.5">
                                {item.category}
                              </span>
                            </td>
                            <td className="p-3 font-mono font-bold text-indigo-900">{item.unionForm}</td>
                            <td className="p-3 font-mono font-bold text-emerald-900">{item.intersectionForm}</td>
                            <td className="p-3 text-slate-600 text-[11px] leading-snug">{item.notes}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TAB 5: PIE & CARDINALITY CALCULATOR
           ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "pie" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-purple-50/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-100/80">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-purple-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                  5
                </span>
                <div>
                  <h3 className="text-base font-black text-gray-900">Principle of Inclusion-Exclusion (PIE)</h3>
                  <p className="text-[11px] text-gray-500 font-semibold">Cardinality · Exact Partitions · Bonferroni Bounds · 3-Set Calculator</p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-lg">
                Section 5 of 9
              </span>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-600 block">|A| (Set A)</label>
                  <input
                    type="number"
                    value={pieA}
                    onChange={(e) => setPieA(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-600 block">|B| (Set B)</label>
                  <input
                    type="number"
                    value={pieB}
                    onChange={(e) => setPieB(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-600 block">|C| (Set C)</label>
                  <input
                    type="number"
                    value={pieC}
                    onChange={(e) => setPieC(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-indigo-700 block">|A ∩ B ∩ C|</label>
                  <input
                    type="number"
                    value={pieABC}
                    onChange={(e) => setPieABC(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-xs font-mono font-bold text-indigo-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-600 block">|A ∩ B|</label>
                  <input
                    type="number"
                    value={pieAB}
                    onChange={(e) => setPieAB(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-600 block">|B ∩ C|</label>
                  <input
                    type="number"
                    value={pieBC}
                    onChange={(e) => setPieBC(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-600 block">|C ∩ A|</label>
                  <input
                    type="number"
                    value={pieCA}
                    onChange={(e) => setPieCA(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-600 block">|U| (Universe)</label>
                  <input
                    type="number"
                    value={pieUniverse}
                    onChange={(e) => setPieUniverse(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="p-3 rounded-xl bg-indigo-950 text-white text-center space-y-0.5">
                  <span className="text-[9px] font-bold text-indigo-300 uppercase tracking-wider block">Total Union |A∪B∪C|</span>
                  <span className="text-xl font-mono font-black">{pieUnion}</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-center space-y-0.5">
                  <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider block">Exactly 1 Set</span>
                  <span className="text-xl font-mono font-black">{pieExact1}</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-center space-y-0.5">
                  <span className="text-[9px] font-bold text-amber-700 uppercase tracking-wider block">Exactly 2 Sets</span>
                  <span className="text-xl font-mono font-black">{pieExact2}</span>
                </div>
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-950 text-center space-y-0.5">
                  <span className="text-[9px] font-bold text-purple-700 uppercase tracking-wider block">At Least 2 Sets</span>
                  <span className="text-xl font-mono font-black">{pieAtLeast2}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TAB 6: CHARACTERISTIC FUNCTIONS
           ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "characteristic" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-purple-50/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-100/80">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-purple-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                  6
                </span>
                <div>
                  <h3 className="text-base font-black text-gray-900">Characteristic Indicator Functions (χ_A)</h3>
                  <p className="text-[11px] text-gray-500 font-semibold">Boolean Algebra Isomorphism · Indicator Polynomials · Live Truth Evaluator</p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-lg">
                Section 6 of 9
              </span>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 font-mono text-xs text-slate-900">
                  <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wider font-sans block">Elementary Operations</span>
                  <p>Complement: χ_A′ = 1 - χ_A</p>
                  <p>Intersection: χ_(A ∩ B) = χ_A · χ_B</p>
                  <p>Difference: χ_(A \\ B) = χ_A(1 - χ_B)</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 font-mono text-xs text-slate-900">
                  <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wider font-sans block">Compound Operations</span>
                  <p>Union: χ_(A ∪ B) = χ_A + χ_B - χ_A χ_B</p>
                  <p>Symmetric Diff: χ_(A △ B) = χ_A + χ_B - 2χ_A χ_B</p>
                  <p className="text-[10px] text-slate-500 font-sans">Key identity: (χ_A)² = χ_A (idempotent)</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
                <span className="text-xs font-bold text-indigo-300 block uppercase tracking-wider">
                  Live Boolean Truth Evaluator: Test Element Membership
                </span>

                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
                    <input
                      type="checkbox"
                      checked={elemInA}
                      onChange={(e) => setElemInA(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600"
                    />
                    <span>x ∈ A (χ_A = {elemInA ? "1" : "0"})</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
                    <input
                      type="checkbox"
                      checked={elemInB}
                      onChange={(e) => setElemInB(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600"
                    />
                    <span>x ∈ B (χ_B = {elemInB ? "1" : "0"})</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
                    <input
                      type="checkbox"
                      checked={elemInC}
                      onChange={(e) => setElemInC(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600"
                    />
                    <span>x ∈ C (χ_C = {elemInC ? "1" : "0"})</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono">
                  <div className="p-2 rounded bg-slate-800 border border-slate-700 text-center">
                    <span className="text-[10px] text-slate-400 block">χ_(A ∪ B)</span>
                    <span className="text-base font-black text-indigo-300">
                      {elemInA || elemInB ? "1" : "0"}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-slate-800 border border-slate-700 text-center">
                    <span className="text-[10px] text-slate-400 block">χ_(A ∩ B)</span>
                    <span className="text-base font-black text-emerald-300">
                      {elemInA && elemInB ? "1" : "0"}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-slate-800 border border-slate-700 text-center">
                    <span className="text-[10px] text-slate-400 block">χ_(A \\ B)</span>
                    <span className="text-base font-black text-amber-300">
                      {elemInA && !elemInB ? "1" : "0"}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-slate-800 border border-slate-700 text-center">
                    <span className="text-[10px] text-slate-400 block">χ_(A △ B)</span>
                    <span className="text-base font-black text-purple-300">
                      {(elemInA && !elemInB) || (!elemInA && elemInB) ? "1" : "0"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TAB 7: NEST MISCONCEPTIONS & TRAPS
           ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "traps" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-purple-50/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-100/80">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-purple-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                  7
                </span>
                <div>
                  <h3 className="text-base font-black text-gray-900">10 High-Yield NEST &amp; IISER Examination Traps</h3>
                  <p className="text-[11px] text-gray-500 font-semibold">Common Pitfalls · Cancellation Failures · Power Set Non-Distributivity</p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-lg">
                Section 7 of 9
              </span>
            </div>

            <div className="space-y-2.5">
              {nestTraps.map((trap, index) => {
                const isExpanded = expandedTrapId === trap.id;
                return (
                  <div
                    key={trap.id}
                    className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 transition-all"
                  >
                    <div
                      onClick={() => setExpandedTrapId(isExpanded ? null : trap.id)}
                      className="flex items-start justify-between gap-3 cursor-pointer"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-200 shrink-0 mt-0.5">
                          TRAP #{index + 1}
                        </span>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                          "{trap.trap}"
                        </h4>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </div>

                    {isExpanded && (
                      <div className="pt-2 space-y-2.5 text-xs border-t border-slate-100">
                        <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200">
                          <span className="text-[9px] font-black uppercase tracking-wider text-emerald-800 block">Mathematical Reality</span>
                          <p className="text-slate-800 font-semibold mt-0.5">{trap.reality}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div className="p-2.5 rounded-xl bg-indigo-50/80 border border-indigo-200">
                            <span className="text-[9px] font-black uppercase tracking-wider text-indigo-800 block">Exam Strategy &amp; Fix</span>
                            <p className="text-slate-800 font-medium mt-0.5">{trap.fix}</p>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px]">
                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-600 font-sans block">Counterexample</span>
                            <p className="text-slate-900 font-bold mt-0.5">{trap.example}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TAB 8: MASTER GLOSSARY
           ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "glossary" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-purple-50/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-100/80">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-purple-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                  8
                </span>
                <div>
                  <h3 className="text-base font-black text-gray-900">Master Glossary for Set Theory</h3>
                  <p className="text-[11px] text-gray-500 font-semibold">22 Key Definitions · Rigorous Formulae · Searchable Reference</p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-lg">
                Section 8 of 9
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={glossarySearch}
                    onChange={(e) => setGlossarySearch(e.target.value)}
                    placeholder="Search by term name, definition, or formula..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="flex flex-wrap gap-1">
                  {["All", "Foundations", "Set Algebra", "Topology & Cardinality", "Advanced"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setGlossaryCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        glossaryCategory === cat
                          ? "bg-indigo-950 text-white border-indigo-500 shadow-2xs"
                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {filteredGlossary.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-black text-slate-900">{item.term}</span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">{item.definition}</p>
                    {item.formula && (
                      <code className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50/60 px-2 py-0.5 rounded border border-indigo-200 block w-fit">
                        {item.formula}
                      </code>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TAB 9: NEST 20-Q SELF-TEST
           ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "selftest" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-purple-50/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-100/80">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-purple-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                  9
                </span>
                <div>
                  <h3 className="text-base font-black text-gray-900">NEST Examination Self-Assessment Module</h3>
                  <p className="text-[11px] text-gray-500 font-semibold">20 High-Rigor Questions (10 Single Correct + 10 Multiple Correct)</p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-lg">
                Section 9 of 9
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-1.5">
                  {[
                    { id: "ALL", label: "All Questions (20)" },
                    { id: "A", label: "Part A: MCQs (1-10)" },
                    { id: "B", label: "Part B: MSQs (11-20)" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setTestFilter(f.id as any);
                        setCurrentQ(0);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        testFilter === f.id
                          ? "bg-indigo-950 text-white shadow-2xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={resetTest}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                  <button
                    onClick={computeTotalScore}
                    className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-black shadow-xs hover:bg-indigo-700"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Submit &amp; Score</span>
                  </button>
                </div>
              </div>

              {score !== null && (
                <div className="p-4 rounded-2xl bg-indigo-950 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300 block">Assessment Result</span>
                    <h4 className="text-xl font-black">
                      Your Score: {score} / 20 ({Math.round((score / 20) * 100)}%)
                    </h4>
                  </div>
                  <button
                    onClick={resetTest}
                    className="px-4 py-2 rounded-xl bg-white text-indigo-950 text-xs font-black hover:bg-indigo-50"
                  >
                    Retake Assessment
                  </button>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-white border border-slate-200">
                {questionsData.map((q, idx) => {
                  const isSelected = currentQ === idx;
                  const isAnswered = (selectedAnswers[idx] || []).length > 0;
                  const isSub = submitted[idx];
                  const isCorrect =
                    isSub &&
                    (selectedAnswers[idx] || []).length === q.correctKeys.length &&
                    q.correctKeys.every((k) => (selectedAnswers[idx] || []).includes(k));

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQ(idx)}
                      className={`w-8 h-8 rounded-lg text-xs font-black transition-all border ${
                        isSelected
                          ? "ring-2 ring-indigo-600 border-indigo-600"
                          : "border-slate-200"
                      } ${
                        isSub
                          ? isCorrect
                            ? "bg-emerald-500 text-white"
                            : "bg-rose-500 text-white"
                          : isAnswered
                          ? "bg-indigo-100 text-indigo-900"
                          : "bg-slate-50 text-slate-600"
                      }`}
                    >
                      {q.id}
                    </button>
                  );
                })}
              </div>

              {activeQuestion && (
                <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200">
                      Question {activeQuestion.id} of 20 · {activeQuestion.part === "A" ? "Part A: Single Correct (+3 / -1)" : "Part B: Multiple Correct (+4 / 0)"}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 font-mono">
                      {activeQuestion.type === "single" ? "Single Choice" : "Multiple Select"}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                    {activeQuestion.question}
                  </h4>

                  <div className="space-y-2">
                    {activeQuestion.options.map((opt) => {
                      const sel = selectedAnswers[currentQ] || [];
                      const isChecked = sel.includes(opt.key);
                      const isSub = submitted[currentQ];
                      const isCorrectKey = activeQuestion.correctKeys.includes(opt.key);

                      let optStyle = "bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300";
                      if (isChecked) {
                        optStyle = "bg-indigo-50/80 border-indigo-400 text-indigo-950 font-bold";
                      }
                      if (isSub) {
                        if (isCorrectKey) {
                          optStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold";
                        } else if (isChecked && !isCorrectKey) {
                          optStyle = "bg-rose-50 border-rose-500 text-rose-950 font-bold";
                        }
                      }

                      return (
                        <div
                          key={opt.key}
                          onClick={() => toggleAnswer(currentQ, opt.key, activeQuestion.type)}
                          className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${optStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-xs font-black text-slate-800 shrink-0">
                              {opt.key}
                            </span>
                            <span className="text-xs font-medium">{opt.text}</span>
                          </div>
                          {isChecked && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex gap-2">
                      <button
                        disabled={currentQ === 0}
                        onClick={() => setCurrentQ((prev) => Math.max(0, prev - 1))}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-40 hover:bg-slate-50"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Prev</span>
                      </button>
                      <button
                        disabled={currentQ === questionsData.length - 1}
                        onClick={() => setCurrentQ((prev) => Math.min(questionsData.length - 1, prev + 1))}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-40 hover:bg-slate-50"
                      >
                        <span>Next</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {!submitted[currentQ] ? (
                      <button
                        onClick={() => submitQuestion(currentQ)}
                        className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-black shadow-xs hover:bg-indigo-700"
                      >
                        Check Answer
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-slate-500">Graded</span>
                    )}
                  </div>

                  {submitted[currentQ] && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 animate-in fade-in duration-200">
                      <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                        <Info className="w-4 h-4 text-indigo-600" />
                        <span>Correct Answer: {activeQuestion.correctKeys.join(", ")}</span>
                      </div>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        {activeQuestion.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
