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
  Compass,
  Grid,
} from "lucide-react";

// ============================================================================
// 1. DATA: STANDARD FUNCTIONS & TOPOLOGY
// ============================================================================
interface StandardFunction {
  id: string;
  name: string;
  formula: string;
  domain: string;
  range: string;
  properties: string;
  identities: string[];
}

const standardFunctions: StandardFunction[] = [
  {
    id: "identity",
    name: "Identity Function",
    formula: "f(x) = x",
    domain: "ℝ",
    range: "ℝ",
    properties: "Passes through origin at 45° angle. Strictly increasing, bijective.",
    identities: ["f(x + y) = f(x) + f(y)", "f(kx) = kf(x)", "f(f(x)) = x (Self-Inverse)"],
  },
  {
    id: "constant",
    name: "Constant Function",
    formula: "f(x) = c",
    domain: "ℝ",
    range: "{c}",
    properties: "Horizontal straight line parallel to x-axis at height y = c.",
    identities: ["f(x) = f(y) ∀ x, y", "Slope m = 0", "Non-injective if |Dom| > 1"],
  },
  {
    id: "modulus",
    name: "Modulus (Absolute Value) Function",
    formula: "f(x) = |x| = { x if x ≥ 0, -x if x < 0 }",
    domain: "ℝ",
    range: "[0, ∞)",
    properties: "V-shaped graph symmetrical about y-axis. Continuous on ℝ, non-differentiable at x = 0.",
    identities: ["|x| = √(x²)", "|x| ≤ a ⟺ -a ≤ x ≤ a (a > 0)", "||x| - |y|| ≤ |x ± y| ≤ |x| + |y|"],
  },
  {
    id: "signum",
    name: "Signum Function",
    formula: "f(x) = sgn(x) = { 1 (x > 0), 0 (x = 0), -1 (x < 0) }",
    domain: "ℝ",
    range: "{-1, 0, 1}",
    properties: "Stepwise graph with jump discontinuity at x = 0. Extract the sign of real numbers.",
    identities: ["sgn(x) = |x|/x (x ≠ 0)", "sgn(xy) = sgn(x) · sgn(y)", "sgn(x)² = 1 (x ≠ 0), 0 (x = 0)"],
  },
  {
    id: "gif",
    name: "Greatest Integer Function (⌊x⌋ / Floor)",
    formula: "f(x) = ⌊x⌋ = n ⟺ n ≤ x < n + 1 (n ∈ ℤ)",
    domain: "ℝ",
    range: "ℤ",
    properties: "Step/staircase graph. Jump discontinuities at every integer x = n ∈ ℤ.",
    identities: ["x - 1 < ⌊x⌋ ≤ x", "⌊x + k⌋ = ⌊x⌋ + k (k ∈ ℤ)", "⌊x⌋ + ⌊-x⌋ = 0 (x ∈ ℤ) or -1 (x ∉ ℤ)", "Hermite: ∑ ⌊x + k/n⌋ = ⌊nx⌋"],
  },
  {
    id: "fractional",
    name: "Fractional Part Function ({x})",
    formula: "f(x) = {x} = x - ⌊x⌋",
    domain: "ℝ",
    range: "[0, 1)",
    properties: "Sawtooth waveform. Periodic function with fundamental period T = 1.",
    identities: ["{x + k} = {x} (k ∈ ℤ)", "{x} + {-x} = 0 (x ∈ ℤ) or 1 (x ∉ ℤ)", "0 ≤ {x} < 1"],
  },
  {
    id: "exponential",
    name: "Exponential Function",
    formula: "f(x) = aˣ (a > 0, a ≠ 1)",
    domain: "ℝ",
    range: "(0, ∞)",
    properties: "Asymptotic to negative x-axis (for a > 1). Strictly increasing if a > 1; decreasing if 0 < a < 1.",
    identities: ["aˣ⁺ʸ = aˣ · aʸ", "(aˣ)ʸ = aˣʸ", "Inverse of logₐ(x)"],
  },
  {
    id: "logarithmic",
    name: "Logarithmic Function",
    formula: "f(x) = logₐ(x) (a > 0, a ≠ 1, x > 0)",
    domain: "(0, ∞)",
    range: "ℝ",
    properties: "Asymptotic to y-axis. Reflection of aˣ across y = x.",
    identities: ["logₐ(xy) = logₐ(x) + logₐ(y)", "logₐ(xʸ) = y · logₐ(x)", "logₐ(x) = ln(x) / ln(a)"],
  },
];

// ============================================================================
// 2. DATA: CARTESIAN PRODUCT IDENTITIES
// ============================================================================
interface ProductIdentity {
  name: string;
  formula: string;
  notes: string;
}

const productIdentities: ProductIdentity[] = [
  { name: "Non-Commutativity", formula: "A × B ≠ B × A", notes: "Order matters in ordered pairs (unless A = B or either set is empty)." },
  { name: "Distributivity over Union", formula: "A × (B ∪ C) = (A × B) ∪ (A × C)", notes: "Cartesian product distributes linearly over set union." },
  { name: "Distributivity over Intersection", formula: "A × (B ∩ C) = (A × B) ∩ (A × C)", notes: "Cartesian product distributes cleanly over intersection." },
  { name: "Distributivity over Difference", formula: "A × (B \\ C) = (A × B) \\ (A × C)", notes: "Product distributes over relative complement." },
  { name: "Intersection of Products", formula: "(A × B) ∩ (C × D) = (A ∩ C) × (B ∩ D)", notes: "Crucial identity for coordinate-wise overlap evaluations." },
  { name: "Complement Identity", formula: "(A × B)′ = (A′ × B′) ∪ (A′ × B) ∪ (A × B′)", notes: "Complement in universe U × U splits into three disjoint regions." },
];

// ============================================================================
// 3. DATA: NEST MISCONCEPTIONS & TRAPS (7 TRAPS)
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
    trap: "The range of √(f(x)) can include negative numbers.",
    reality: "The principal square root √y is non-negative by definition (√y ≥ 0).",
    fix: "Rng(√(f(x))) ⊆ [0, ∞). Never write √16 = ±4; √16 = +4.",
    example: "If f(x) = √(9 - x²), then Rng(f) = [0, 3], NOT [-3, 3].",
  },
  {
    id: "t2",
    trap: "The equation f(x) = √(x²) simplifies directly to x.",
    reality: "√(x²) = |x| by definition. For negative numbers, √(x²) = -x.",
    fix: "Always write √(x²) = |x| = { x if x ≥ 0, -x if x < 0 }.",
    example: "√((-5)²) = √25 = +5 = -(-5) = |-5|.",
  },
  {
    id: "t3",
    trap: "For composite functions, Dom(g ∘ f) is simply equal to Dom(f).",
    reality: "False! Dom(g ∘ f) ⊆ Dom(f). You must explicitly exclude x ∈ Dom(f) where f(x) ∉ Dom(g).",
    fix: "Dom(g ∘ f) = { x ∈ Dom(f) | f(x) ∈ Dom(g) }.",
    example: "Let f(x) = x - 2, g(x) = √x ⟹ (g ∘ f)(x) = √(x - 2). Dom(f) = ℝ, but Dom(g ∘ f) = [2, ∞).",
  },
  {
    id: "t4",
    trap: "Greatest integer function ⌊x⌋ is continuous everywhere.",
    reality: "⌊x⌋ has jump discontinuities at every integer x = n ∈ ℤ.",
    fix: "lim_{x → n⁻} ⌊x⌋ = n - 1 ≠ lim_{x → n⁺} ⌊x⌋ = n.",
    example: "At x = 2: lim_{x → 2⁻} ⌊x⌋ = 1, while ⌊2⌋ = 2. Jump discontinuity of magnitude 1.",
  },
  {
    id: "t5",
    trap: "The domain of f(x) = logₐ(g(x)) requires g(x) ≥ 0.",
    reality: "Logarithms require strictly positive arguments: g(x) > 0.",
    fix: "g(x) = 0 makes logₐ(0) undefined (-∞). Strict inequality is mandatory.",
    example: "f(x) = ln(x - 3) has Dom = (3, ∞), NOT [3, ∞).",
  },
  {
    id: "t6",
    trap: "sgn(x)² = 1 for all x ∈ ℝ.",
    reality: "sgn(x)² = 1 for x ≠ 0, but sgn(0)² = 0² = 0.",
    fix: "Always isolate and check the boundary case x = 0 when simplifying signum expressions.",
    example: "sgn(x)² = { 1 if x ≠ 0, 0 if x = 0 }.",
  },
  {
    id: "t7",
    trap: "The relation x² + y² = r² represents a single real function y = f(x).",
    reality: "False! It fails the vertical line test (e.g. x = 0 ⟹ y = ±r).",
    fix: "It decomposes into two distinct functional branches: y = +√(r² - x²) and y = -√(r² - x²).",
    example: "A vertical line x = 0 intersects the circle at both (0, r) and (0, -r).",
  },
];

// ============================================================================
// 4. DATA: MASTER GLOSSARY (20 TERMS)
// ============================================================================
interface GlossaryTerm {
  term: string;
  category: "Cartesian & Relations" | "Function Basics" | "Special Functions" | "Advanced Methods";
  definition: string;
  formula?: string;
}

const masterGlossary: GlossaryTerm[] = [
  { term: "Abscissa", category: "Cartesian & Relations", definition: "The x-coordinate (first component) of an ordered pair in the Cartesian plane." },
  { term: "Ordered Pair (a, b)", category: "Cartesian & Relations", definition: "A pair of objects where coordinate order is fixed and enforced: (a, b) = (c, d) ⟺ a = c and b = d.", formula: "(a, b) ≡ {{a}, {a, b}}" },
  { term: "Kuratowski Pair", category: "Cartesian & Relations", definition: "Axiomatic set-theoretic formulation of an ordered pair using nested sets to identify 1st and 2nd elements." },
  { term: "Cartesian Product (A × B)", category: "Cartesian & Relations", definition: "Set of all ordered pairs (a, b) with a ∈ A and b ∈ B. Cardinality is |A| · |B|.", formula: "{(a, b) | a ∈ A, b ∈ B}" },
  { term: "Binary Relation (R)", category: "Cartesian & Relations", definition: "Any arbitrary subset of the Cartesian product A × B. Total relations = 2^(|A||B|).", formula: "R ⊆ A × B" },
  { term: "Domain (Dom)", category: "Function Basics", definition: "The set of all valid input values x for which a relation or function produces a well-defined output.", formula: "{a ∈ A | ∃b ∈ B, (a, b) ∈ R}" },
  { term: "Range (Rng)", category: "Function Basics", definition: "The set of all actual output values attained by a function. Rng(f) ⊆ Codomain.", formula: "{b ∈ B | ∃a ∈ A, (a, b) ∈ R}" },
  { term: "Codomain", category: "Function Basics", definition: "The designated target set B in a function f: A → B. Range is always a subset of Codomain." },
  { term: "Inverse Relation (R⁻¹)", category: "Cartesian & Relations", definition: "Relation obtained by swapping ordered pair coordinates: R⁻¹ = {(b, a) | (a, b) ∈ R}.", formula: "Dom(R⁻¹) = Rng(R)" },
  { term: "Totality Axiom", category: "Function Basics", definition: "Condition that every element in domain A must possess an assigned image in target set B.", formula: "∀x ∈ A, ∃y ∈ B, (x, y) ∈ f" },
  { term: "Single-Valuedness", category: "Function Basics", definition: "Condition that no element in domain A may map to more than one output in set B." },
  { term: "Vertical Line Test", category: "Function Basics", definition: "Geometric test: a curve represents a function iff every vertical line intersects it at most once." },
  { term: "Modulus Function (|x|)", category: "Special Functions", definition: "Absolute value function mapping real numbers to non-negative distance from origin.", formula: "|x| = √(x²)" },
  { term: "Signum Function (sgn(x))", category: "Special Functions", definition: "Function extracting the sign of real numbers: +1 for positive, 0 for zero, -1 for negative." },
  { term: "Floor Function (⌊x⌋)", category: "Special Functions", definition: "Greatest integer less than or equal to x. Floor step function.", formula: "⌊x⌋ = n ⟺ n ≤ x < n + 1" },
  { term: "Fractional Part ({x})", category: "Special Functions", definition: "Periodic sawtooth function defined as x - ⌊x⌋, with range [0, 1) and period T = 1.", formula: "{x} = x - ⌊x⌋" },
  { term: "Composite Function (g ∘ f)", category: "Advanced Methods", definition: "Function obtained by chaining two mappings: (g ∘ f)(x) = g(f(x)).", formula: "Dom(g ∘ f) = {x ∈ Dom(f) | f(x) ∈ Dom(g)}" },
  { term: "Involution", category: "Advanced Methods", definition: "A function that is its own inverse, satisfying f(f(x)) = x for all x in its domain." },
  { term: "Monotonicity", category: "Advanced Methods", definition: "Property of a function being strictly increasing or strictly decreasing across an interval." },
  { term: "Hermite's Identity", category: "Special Functions", definition: "Floor summation theorem: ∑_{k=0}^{n-1} ⌊x + k/n⌋ = ⌊nx⌋ for all n ∈ ℕ." },
];

// ============================================================================
// 5. DATA: 20 NEST QUESTIONS (10 PART A MCQs + 10 PART B MSQs)
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
    question: "Find the complete domain of the real-valued function: f(x) = √[ log₀.₅ ( ⌊x² - 3x + 3⌋ ) ] where ⌊·⌋ denotes the greatest integer function.",
    options: [
      { key: "A", text: "((3 - √5)/2, 1] ∪ [2, (3 + √5)/2)" },
      { key: "B", text: "(1, 2)" },
      { key: "C", text: "[0, 3]" },
      { key: "D", text: "(0, 3) \\ {1, 2}" },
    ],
    correctKeys: ["A"],
    explanation: "1. For square root: log₀.₅(⌊x² - 3x + 3⌋) ≥ 0.\n2. Since base 0.5 < 1, inequality reverses: 0 < ⌊x² - 3x + 3⌋ ≤ (0.5)⁰ = 1.\n3. Since ⌊·⌋ ∈ ℤ, the only integer in (0, 1] is 1 ⟹ ⌊x² - 3x + 3⌋ = 1.\n4. By floor definition: 1 ≤ x² - 3x + 3 < 2.\n5. Left inequality: x² - 3x + 2 ≥ 0 ⟺ (x - 1)(x - 2) ≥ 0 ⟺ x ∈ (-∞, 1] ∪ [2, ∞).\n6. Right inequality: x² - 3x + 1 < 0 ⟺ x ∈ ((3 - √5)/2, (3 + √5)/2).\n7. Intersecting both gives ((3 - √5)/2, 1] ∪ [2, (3 + √5)/2).",
  },
  {
    id: 2,
    part: "A",
    type: "single",
    question: "Find the exact range of the real function: f(x) = (x² - x + 1) / (x² + x + 1), for all x ∈ ℝ.",
    options: [
      { key: "A", text: "[1/3, 3]" },
      { key: "B", text: "(1/3, 3)" },
      { key: "C", text: "[0, ∞)" },
      { key: "D", text: "[1/2, 2]" },
    ],
    correctKeys: ["A"],
    explanation: "1. Let y = (x² - x + 1)/(x² + x + 1). Since denominator > 0, cross-multiply: (y - 1)x² + (y + 1)x + (y - 1) = 0.\n2. If y = 1 ⟹ 2x = 0 ⟹ x = 0 (Valid, 1 ∈ Rng).\n3. If y ≠ 1, since x ∈ ℝ, discriminant D ≥ 0: (y + 1)² - 4(y - 1)² ≥ 0 ⟺ -3y² + 10y - 3 ≥ 0 ⟺ 3y² - 10y + 3 ≤ 0 ⟺ (3y - 1)(y - 3) ≤ 0 ⟹ y ∈ [1/3, 3].",
  },
  {
    id: 3,
    part: "A",
    type: "single",
    question: "Let f(x) = { 1 + x (x < 0), x² - 1 (x ≥ 0) } and g(x) = { √(-x) (x < 0), x + 1 (x ≥ 0) }. Find the explicit piecewise formula for (g ∘ f)(x).",
    options: [
      { key: "A", text: "(g ∘ f)(x) = { √(-1-x) (x < -1), 2 + x (-1 ≤ x < 0), x² (x ≥ 0) }" },
      { key: "B", text: "(g ∘ f)(x) = { 2 + x (x < 0), x² (x ≥ 0) }" },
      { key: "C", text: "(g ∘ f)(x) = { √(1-x²) (-1 ≤ x < 1), x² + 1 (x ≥ 1) }" },
      { key: "D", text: "(g ∘ f)(x) = { √(-1-x) (x < -1), 2 + x (-1 ≤ x < 0), √(1-x²) (0 ≤ x < 1), x² (x ≥ 1) }" },
    ],
    correctKeys: ["D"],
    explanation: "Evaluate g(f(x)) on sub-branches:\n1. For x < 0 ⟹ f(x) = 1 + x:\n   - If 1 + x < 0 ⟺ x < -1 ⟹ g(f(x)) = √(-(1+x)) = √(-1-x).\n   - If 1 + x ≥ 0 ⟺ -1 ≤ x < 0 ⟹ g(f(x)) = (1+x) + 1 = 2 + x.\n2. For x ≥ 0 ⟹ f(x) = x² - 1:\n   - If x² - 1 < 0 ⟺ 0 ≤ x < 1 ⟹ g(f(x)) = √(-(x²-1)) = √(1-x²).\n   - If x² - 1 ≥ 0 ⟺ x ≥ 1 ⟹ g(f(x)) = (x² - 1) + 1 = x².\nCombining all 4 gives Option D.",
  },
  {
    id: 4,
    part: "A",
    type: "single",
    question: "Solve for all real numbers x ∈ ℝ satisfying: ⌊x⌋ + ⌊x + 1/3⌋ + ⌊x + 2/3⌋ = 5.",
    options: [
      { key: "A", text: "x ∈ [5/3, 2)" },
      { key: "B", text: "x ∈ [5/3, 6/3)" },
      { key: "C", text: "x ∈ [5, 6)" },
      { key: "D", text: "x ∈ [5/3, 7/3)" },
    ],
    correctKeys: ["A"],
    explanation: "1. Apply Hermite's Identity for n = 3: ⌊x⌋ + ⌊x + 1/3⌋ + ⌊x + 2/3⌋ = ⌊3x⌋.\n2. The equation becomes ⌊3x⌋ = 5.\n3. By floor definition: 5 ≤ 3x < 6 ⟺ 5/3 ≤ x < 2 ⟺ x ∈ [5/3, 2).",
  },
  {
    id: 5,
    part: "A",
    type: "single",
    question: "Let A and B be two finite sets such that |A| = 4, |B| = 5, and |A ∩ B| = 2. What is the cardinality of (A × B) ∩ (B × A)?",
    options: [
      { key: "A", text: "20" },
      { key: "B", text: "10" },
      { key: "C", text: "4" },
      { key: "D", text: "2" },
    ],
    correctKeys: ["C"],
    explanation: "1. Cartesian product intersection identity: (A × B) ∩ (B × A) = (A ∩ B) × (B ∩ A) = (A ∩ B) × (A ∩ B).\n2. Cardinality: |(A ∩ B) × (A ∩ B)| = |A ∩ B|² = 2² = 4.",
  },
  {
    id: 6,
    part: "A",
    type: "single",
    question: "Find the complete domain of the function: f(x) = 1 / √({x} - ⌊x⌋) where ⌊·⌋ is GIF and {·} is Fractional Part.",
    options: [
      { key: "A", text: "(0, 1)" },
      { key: "B", text: "(0, ∞) \\ ℤ" },
      { key: "C", text: "∅" },
      { key: "D", text: "ℝ \\ ℤ" },
    ],
    correctKeys: ["A"],
    explanation: "1. Radical in denominator requires {x} - ⌊x⌋ > 0 ⟺ {x} > ⌊x⌋.\n2. Range of {x} ∈ [0, 1) and ⌊x⌋ ∈ ℤ.\n3. If x ≥ 1 ⟹ ⌊x⌋ ≥ 1 > {x}, so {x} - ⌊x⌋ < 0.\n4. If x ∈ (0, 1) ⟹ ⌊x⌋ = 0 and {x} = x > 0 ⟹ {x} - 0 = x > 0 (Valid!).\n5. Thus Dom(f) = (0, 1).",
  },
  {
    id: 7,
    part: "A",
    type: "single",
    question: "Let f(x) = x / √(1 + x²). Find the explicit formula for the n-fold composite function (f ∘ f ∘ ... ∘ f)(x) (n times).",
    options: [
      { key: "A", text: "x / √(1 + nx²)" },
      { key: "B", text: "x / √(n + x²)" },
      { key: "C", text: "nx / √(1 + x²)" },
      { key: "D", text: "x / (1 + nx²)" },
    ],
    correctKeys: ["A"],
    explanation: "1. f₂(x) = f(f(x)) = (x/√(1+x²)) / √(1 + x²/(1+x²)) = x / √(1 + 2x²).\n2. By mathematical induction, fₙ(x) = x / √(1 + nx²).",
  },
  {
    id: 8,
    part: "A",
    type: "single",
    question: "Find the range of the hyperbolic tangent function f(x) = (eˣ - e⁻ˣ)/(eˣ + e⁻ˣ) = tanh(x) for x ∈ ℝ.",
    options: [
      { key: "A", text: "[-1, 1]" },
      { key: "B", text: "(-1, 1)" },
      { key: "C", text: "(0, 1)" },
      { key: "D", text: "(-∞, ∞)" },
    ],
    correctKeys: ["B"],
    explanation: "1. Rewrite f(x) = 1 - 2/(e²ˣ + 1).\n2. As x → -∞, e²ˣ → 0 ⟹ f(x) → -1.\n3. As x → ∞, e²ˣ → ∞ ⟹ f(x) → 1.\n4. Since f is continuous and strictly increasing, Rng(f) = (-1, 1).",
  },
  {
    id: 9,
    part: "A",
    type: "single",
    question: "Find the domain of the function f(x) = √(|x - 1| - |x - 3| - 1).",
    options: [
      { key: "A", text: "[2, ∞)" },
      { key: "B", text: "[2.5, ∞)" },
      { key: "C", text: "(-∞, 2]" },
      { key: "D", text: "[1, 3]" },
    ],
    correctKeys: ["B"],
    explanation: "1. Radical requires |x - 1| - |x - 3| ≥ 1.\n2. Critical points x = 1, x = 3:\n   - For x < 1: -(x-1) - (-(x-3)) = -2 ≥ 1 (False).\n   - For 1 ≤ x ≤ 3: (x-1) + (x-3) = 2x - 4 ≥ 1 ⟹ x ≥ 2.5 ⟹ x ∈ [2.5, 3].\n   - For x > 3: (x-1) - (x-3) = 2 ≥ 1 (Always True) ⟹ x ∈ (3, ∞).\n3. Union gives [2.5, ∞).",
  },
  {
    id: 10,
    part: "A",
    type: "single",
    question: "Let A = {1, 2, 3, 4} and B = {a, b, c}. What is the total number of RELATIONS from A to B that contain at least two ordered pairs?",
    options: [
      { key: "A", text: "2¹² - 13 = 4083" },
      { key: "B", text: "2¹² - 12 = 4084" },
      { key: "C", text: "2¹² - 1 = 4095" },
      { key: "D", text: "4096" },
    ],
    correctKeys: ["A"],
    explanation: "1. |A × B| = 4 × 3 = 12.\n2. Total relations = 2¹² = 4096.\n3. Relations with 0 pairs: C(12, 0) = 1.\n4. Relations with 1 pair: C(12, 1) = 12.\n5. Relations with ≥ 2 pairs: 4096 - 1 - 12 = 4083 = 2¹² - 13.",
  },
  {
    id: 11,
    part: "B",
    type: "multi",
    question: "Which of the following set identities involving Cartesian Products are ALWAYS VALID for arbitrary sets A, B, C, D?",
    options: [
      { key: "A", text: "(A ∩ B) × (C ∩ D) = (A × C) ∩ (B × D)" },
      { key: "B", text: "(A ∪ B) × C = (A × C) ∪ (B × C)" },
      { key: "C", text: "A × (B \\ C) = (A × B) \\ (A × C)" },
      { key: "D", text: "(A × B)′ = A′ × B′" },
    ],
    correctKeys: ["A", "B", "C"],
    explanation: "A, B, C are standard valid identities for Cartesian products. D is false: (A × B)′ = (A′ × U) ∪ (U × B′) ≠ A′ × B′.",
  },
  {
    id: 12,
    part: "B",
    type: "multi",
    question: "Select the CORRECT operational properties of the Greatest Integer Function (⌊x⌋) and Fractional Part Function ({x}):",
    options: [
      { key: "A", text: "⌊x + k⌋ = ⌊x⌋ + k for all k ∈ ℤ" },
      { key: "B", text: "⌊x⌋ + ⌊-x⌋ = 0 if x ∈ ℤ, and -1 if x ∉ ℤ" },
      { key: "C", text: "{x} + {-x} = 0 if x ∈ ℤ, and 1 if x ∉ ℤ" },
      { key: "D", text: "⌊2x⌋ = ⌊x⌋ + ⌊x + 1/2⌋ for all x ∈ ℝ" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    explanation: "All four identities (A, B, C, D) are fundamental properties of GIF and fractional part (D is Hermite's identity for n = 2).",
  },
  {
    id: 13,
    part: "B",
    type: "multi",
    question: "Let f(x) = 1 / (1 - x). Which of the following statements regarding its composite iterations f₂(x) = (f ∘ f)(x) and f₃(x) = (f ∘ f ∘ f)(x) are CORRECT?",
    options: [
      { key: "A", text: "f₂(x) = (x - 1)/x with domain ℝ \\ {0, 1}" },
      { key: "B", text: "f₃(x) = x with domain ℝ \\ {0, 1}" },
      { key: "C", text: "f(x) is an involution (f₂(x) = x)" },
      { key: "D", text: "f₃(x) acts as the identity mapping on its domain" },
    ],
    correctKeys: ["A", "B", "D"],
    explanation: "1. f₂(x) = 1/(1 - 1/(1-x)) = (x-1)/x, defined on ℝ \\ {0, 1}. (A is True).\n2. f₃(x) = 1/(1 - (x-1)/x) = x, defined on ℝ \\ {0, 1}. (B and D are True).\n3. C is false because f₂(x) ≠ x; f is periodic with period 3.",
  },
  {
    id: 14,
    part: "B",
    type: "multi",
    question: "Select the CORRECT statements regarding the function f(x) = sgn(x² - 4x + 3):",
    options: [
      { key: "A", text: "Dom(f) = ℝ" },
      { key: "B", text: "Rng(f) = {-1, 0, 1}" },
      { key: "C", text: "f(x) = 0 for x ∈ {1, 3}" },
      { key: "D", text: "f(x) = -1 for x ∈ (1, 3)" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    explanation: "Quadratic argument g(x) = (x - 1)(x - 3). g(x) = 0 at x = 1, 3 ⟹ f(x) = 0. g(x) < 0 on (1, 3) ⟹ f(x) = -1. g(x) > 0 outside [1, 3] ⟹ f(x) = 1. All 4 options are correct.",
  },
  {
    id: 15,
    part: "B",
    type: "multi",
    question: "Consider the functional equation f(x) + f(1 / (1 - x)) = x for all x ∈ ℝ \\ {0, 1}. Which of the following assertions are CORRECT?",
    options: [
      { key: "A", text: "f(2) = 1/2" },
      { key: "B", text: "f(x) = (x³ - x + 1) / (2x(x - 1))" },
      { key: "C", text: "f(1/2) = 7/4" },
      { key: "D", text: "Dom(f) = ℝ \\ {0, 1}" },
    ],
    correctKeys: ["B", "D"],
    explanation: "By cyclical substitution x → 1/(1-x) → (x-1)/x, we obtain f(x) = (x³ - x + 1)/(2x(x - 1)). f(2) = 7/4 (A is false), f(1/2) = -5/4 (C is false). B and D are true.",
  },
  {
    id: 16,
    part: "B",
    type: "multi",
    question: "Which of the following functions have a domain equal to ALL REAL NUMBERS ℝ?",
    options: [
      { key: "A", text: "f(x) = √(x² + 1)" },
      { key: "B", text: "f(x) = 1 / (x² + 4)" },
      { key: "C", text: "f(x) = ln(x² + 1)" },
      { key: "D", text: "f(x) = |x - 3| + |x + 2|" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    explanation: "All four expressions (A, B, C, D) are defined for every real number x ∈ ℝ without any denominator singularities or non-positive logarithmic/radical constraints.",
  },
  {
    id: 17,
    part: "B",
    type: "multi",
    question: "Let A = {1, 2, 3} and B = {2, 4}. Which of the following ordered pairs belong to (A × B) \\ (B × A)?",
    options: [
      { key: "A", text: "(1, 2)" },
      { key: "B", text: "(3, 4)" },
      { key: "C", text: "(2, 2)" },
      { key: "D", text: "(1, 4)" },
    ],
    correctKeys: ["A", "B", "D"],
    explanation: "A × B = {(1,2), (1,4), (2,2), (2,4), (3,2), (3,4)}. (A × B) ∩ (B × A) = {(2,2)}. Difference leaves {(1,2), (1,4), (2,4), (3,2), (3,4)}. (2,2) is excluded.",
  },
  {
    id: 18,
    part: "B",
    type: "multi",
    question: "Select the CORRECT statements regarding the range of real functions:",
    options: [
      { key: "A", text: "Rng(sin(x)/x) = [-1, 1]" },
      { key: "B", text: "Rng(cos² x - 4 cos x + 5) = [2, 10]" },
      { key: "C", text: "Rng(x / (1 + x²)) = [-1/2, 1/2]" },
      { key: "D", text: "Rng(2^(x² + 1)) = [2, ∞)" },
    ],
    correctKeys: ["B", "C", "D"],
    explanation: "B: t = cos x ∈ [-1, 1] ⟹ (t-2)² + 1 ∈ [2, 10] (True). C: y(1+x²) = x ⟹ D = 1 - 4y² ≥ 0 ⟹ y ∈ [-1/2, 1/2] (True). D: x² + 1 ≥ 1 ⟹ 2^(x²+1) ∈ [2, ∞) (True). A is false.",
  },
  {
    id: 19,
    part: "B",
    type: "multi",
    question: "Let R = {(x, y) ∈ ℕ × ℕ | 2x + 3y = 18}. Which of the following assertions regarding R are CORRECT?",
    options: [
      { key: "A", text: "R = {(3, 4), (6, 2)}" },
      { key: "B", text: "Dom(R) = {3, 6}" },
      { key: "C", text: "Rng(R) = {2, 4}" },
      { key: "D", text: "R⁻¹ = {(4, 3), (2, 6)}" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    explanation: "For x, y ∈ ℕ: 2x = 3(6-y) ⟹ y ∈ {2, 4}. When y=2 ⟹ x=6; when y=4 ⟹ x=3. Thus R = {(3,4), (6,2)}, Dom = {3,6}, Rng = {2,4}, R⁻¹ = {(4,3), (2,6)}.",
  },
  {
    id: 20,
    part: "B",
    type: "multi",
    question: "Which of the following functions satisfy the functional identity f(f(x)) = x for all x in their respective domains (Involutions)?",
    options: [
      { key: "A", text: "f(x) = -x" },
      { key: "B", text: "f(x) = 1/x" },
      { key: "C", text: "f(x) = (1 - x)/(1 + x)" },
      { key: "D", text: "f(x) = √(1 - x²) for x ∈ [0, 1]" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    explanation: "All four functions satisfy f(f(x)) = x: A: -(-x) = x; B: 1/(1/x) = x; C: (1 - (1-x)/(1+x)) / (1 + (1-x)/(1+x)) = 2x/2 = x; D: √(1 - (1-x²)) = √(x²) = x for x ≥ 0.",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
type Tab = "cartesian" | "relations" | "functions" | "catalog" | "domainrange" | "composition" | "traps" | "glossary" | "selftest";

interface RelationsAndFunctionsDiagramProps {
  onClose?: () => void;
}

export default function RelationsAndFunctionsDiagram({ onClose }: RelationsAndFunctionsDiagramProps) {
  const [activeTab, setActiveTab] = useState<Tab>("cartesian");

  // Tab 1 state: Cartesian Product Generator
  const [setAInput, setSetAInput] = useState<string>("1, 2, 3");
  const [setBInput, setSetBInput] = useState<string>("a, b");

  // Tab 2 state: Interactive Relation Mapper
  const [activeRelationPairs, setActiveRelationPairs] = useState<string[]>(["(1, a)", "(2, b)", "(3, a)"]);

  // Tab 3 state: Function Formalism Tester
  const [funcMapping, setFuncMapping] = useState<Record<string, string>>({ "1": "a", "2": "b", "3": "c" });

  // Tab 4 state: Standard Functions
  const [selectedFuncId, setSelectedFuncId] = useState<string>("modulus");

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

  // Bookmark state
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // Computed Cartesian Product
  const cartesianData = useMemo(() => {
    const listA = setAInput.split(",").map((s) => s.trim()).filter((s) => s.length > 0).slice(0, 4);
    const listB = setBInput.split(",").map((s) => s.trim()).filter((s) => s.length > 0).slice(0, 4);
    const pairs: string[] = [];
    listA.forEach((a) => {
      listB.forEach((b) => {
        pairs.push(`(${a}, ${b})`);
      });
    });
    return { listA, listB, totalCount: pairs.length, pairs };
  }, [setAInput, setBInput]);

  // Computed Domain & Range of Selected Relation
  const relationData = useMemo(() => {
    const dom = new Set<string>();
    const rng = new Set<string>();
    const inv: string[] = [];
    activeRelationPairs.forEach((p) => {
      const match = p.match(/\((.+),\s*(.+)\)/);
      if (match) {
        dom.add(match[1]);
        rng.add(match[2]);
        inv.push(`(${match[2]}, ${match[1]})`);
      }
    });
    return {
      domain: Array.from(dom),
      range: Array.from(rng),
      inverse: inv,
      count: activeRelationPairs.length,
    };
  }, [activeRelationPairs]);

  function toggleRelationPair(pair: string) {
    setActiveRelationPairs((prev) =>
      prev.includes(pair) ? prev.filter((p) => p !== pair) : [...prev, pair]
    );
  }

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

  const selectedFunc = standardFunctions.find((f) => f.id === selectedFuncId)!;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "cartesian", label: "Cartesian Products", icon: <Grid className="w-3.5 h-3.5 shrink-0" /> },
    { id: "relations", label: "Binary Relations", icon: <Activity className="w-3.5 h-3.5 shrink-0" /> },
    { id: "functions", label: "Function Formalism", icon: <Sparkles className="w-3.5 h-3.5 shrink-0" /> },
    { id: "catalog", label: "Master Functions & Graphs", icon: <Compass className="w-3.5 h-3.5 shrink-0" /> },
    { id: "domainrange", label: "Domain & Range Toolkit", icon: <Calculator className="w-3.5 h-3.5 shrink-0" /> },
    { id: "composition", label: "Composition & Algebra", icon: <Zap className="w-3.5 h-3.5 shrink-0" /> },
    { id: "traps", label: "NEST Traps (7)", icon: <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> },
    { id: "glossary", label: "Master Glossary (20)", icon: <BookOpen className="w-3.5 h-3.5 shrink-0" /> },
    { id: "selftest", label: "NEST 20-Q Test", icon: <Award className="w-3.5 h-3.5 shrink-0" /> },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full select-none">
      {/* ═══════════════════════════════════════════════════════════════════
          TOP BREADCRUMB & HEADER BAR
         ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-between bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 overflow-x-auto scrollbar-none">
          <span className="text-[#4F46E5] font-black">Mathematics</span>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-300" />
          <span>Class XI</span>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-300" />
          <span className="text-gray-900 font-extrabold whitespace-nowrap">Unit 1 — Sets and Functions</span>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-300" />
          <span className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-black whitespace-nowrap">Chapter 2: Relations and Functions</span>
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
          CHAPTER HERO BANNER
         ═══════════════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-gray-200/80 shadow-2xs space-y-6">
        <div className="space-y-4 pb-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Left Content */}
            <div className="flex-1 space-y-3.5">
              <div>
                <span className="text-[11px] font-black text-[#4F46E5] bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-lg uppercase tracking-wider">
                  CHAPTER 2 · CLASS XI MATHEMATICS
                </span>
              </div>

              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
                  Relations &amp; Functions
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
                Master Kuratowski ordered pairs (a, b) ≡ {"{{a}, {a, b}}"}, Cartesian products A × B, total relations 2ᵐⁿ, structural function axioms (totality &amp; single-valuedness), vertical line test, standard real functions (Modulus, Signum, GIF, Fractional Part, Logarithms), systematic domain &amp; range toolkits, composite algebra (g ∘ f)(x), and 20 NEST examination questions.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-1 text-xs font-extrabold text-gray-600">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-indigo-500" />
                  <span>9 Core Sections</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-indigo-500" />
                  <span>40 min comprehensive</span>
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
            TAB 1: CARTESIAN PRODUCTS
           ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "cartesian" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-purple-50/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-100/80">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-purple-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                  1
                </span>
                <div>
                  <h3 className="text-base font-black text-gray-900">Cartesian Products &amp; Ordered Pairs</h3>
                  <p className="text-[11px] text-gray-500 font-semibold">Kuratowski Construction · Cardinality Rule |A × B| = mn · Higher Dimensions · Algebraic Identities</p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-lg">
                Section 1 of 9
              </span>
            </div>

            {/* Concept Card 1.1: Kuratowski Definition */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-dashed border-gray-200">
                <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-100 text-[#4F46E5] flex items-center justify-center shrink-0">
                  <Flame className="h-4 w-4 fill-indigo-500/20" />
                </div>
                <h4 className="text-base font-black text-[#4F46E5] tracking-tight">
                  1.1 Formal Definition of Ordered Pairs &amp; Kuratowski Set Construction
                </h4>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                An <strong className="text-indigo-900">Ordered Pair</strong> (a, b) is a pair of objects where the order of appearance is significant. Unlike an unordered set {"{a, b}"} where {"{a, b} = {b, a}"}, an ordered pair obeys:
              </p>

              <div className="p-3 rounded-xl bg-indigo-50/80 border border-indigo-200 text-center">
                <span className="font-mono text-xs sm:text-sm font-black text-indigo-950">
                  (a, b) = (c, d) ⟺ a = c and b = d
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 font-mono text-xs">
                <span className="text-indigo-300 font-bold block uppercase text-[10px] tracking-wider font-sans">
                  Axiomatic Definition (Kuratowski, 1921)
                </span>
                <p className="text-slate-200 font-bold text-sm">
                  (a, b) ≡ {"{" + "{" + "a" + "}" + ", " + "{" + "a, b" + "}" + "}"}
                </p>
                <p className="text-slate-400 text-[11px] leading-relaxed pt-1">
                  • The singleton {"{a}"} unambiguously identifies the 1st element 'a'.<br />
                  • The unordered pair {"{a, b}"} identifies the 2nd element 'b' via relative complement {"{a, b} \\ {a}"}.
                </p>
              </div>
            </div>

            {/* Interactive Cartesian Product Generator */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-dashed border-gray-200">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-100 text-[#4F46E5] flex items-center justify-center shrink-0">
                    <Grid className="h-4 w-4" />
                  </div>
                  <h4 className="text-base font-black text-[#4F46E5] tracking-tight">
                    1.2 Live Cartesian Product Generator: A × B
                  </h4>
                </div>
                <span className="text-xs font-mono font-black text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                  |A × B| = {cartesianData.totalCount} Pairs
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Set A Elements (comma-separated):</label>
                  <input
                    type="text"
                    value={setAInput}
                    onChange={(e) => setSetAInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Set B Elements (comma-separated):</label>
                  <input
                    type="text"
                    value={setBInput}
                    onChange={(e) => setSetBInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 text-white space-y-2">
                <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2">
                  <span className="text-indigo-300 font-bold">A × B = {"{" + cartesianData.pairs.join(", ") + "}"}</span>
                  <span className="text-slate-400">|A|·|B| = {cartesianData.listA.length} × {cartesianData.listB.length} = {cartesianData.totalCount}</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {cartesianData.pairs.map((p, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-indigo-200"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Master Table of Cartesian Identities */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-dashed border-gray-200">
                <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-100 text-[#4F46E5] flex items-center justify-center shrink-0">
                  <Scale className="h-4 w-4" />
                </div>
                <h4 className="text-base font-black text-[#4F46E5] tracking-tight">
                  1.3 Algebraic Identities of Cartesian Products
                </h4>
              </div>

              <div className="rounded-2xl border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100/80 border-b border-slate-200 font-black text-slate-900 uppercase text-[10px] tracking-wider">
                        <th className="p-3">Property / Identity</th>
                        <th className="p-3">Mathematical Formulation</th>
                        <th className="p-3">Operational Significance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {productIdentities.map((item, idx) => (
                        <tr key={idx} className="hover:bg-indigo-50/30 transition-colors">
                          <td className="p-3 font-bold text-slate-950">{item.name}</td>
                          <td className="p-3 font-mono font-bold text-indigo-900">{item.formula}</td>
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
            TAB 2: BINARY RELATIONS
           ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "relations" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-purple-50/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-100/80">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-purple-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                  2
                </span>
                <div>
                  <h3 className="text-base font-black text-gray-900">Theory of Binary Relations</h3>
                  <p className="text-[11px] text-gray-500 font-semibold">Domain · Range · Codomain · 2ᵐⁿ Total Relations · Inverse Relation R⁻¹</p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-lg">
                Section 2 of 9
              </span>
            </div>

            {/* Relation Anatomy */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-dashed border-gray-200">
                <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-100 text-[#4F46E5] flex items-center justify-center shrink-0">
                  <Activity className="h-4 w-4" />
                </div>
                <h4 className="text-base font-black text-[#4F46E5] tracking-tight">
                  2.1 Anatomy of a Binary Relation: R ⊆ A × B
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-800 block">Domain, Dom(R)</span>
                  <p className="text-xs font-semibold text-slate-800">
                    Set of all 1st coordinates: {"{a ∈ A | ∃b ∈ B, (a, b) ∈ R}"}. Notice Dom(R) ⊆ A.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">Range, Rng(R)</span>
                  <p className="text-xs font-semibold text-slate-800">
                    Set of all 2nd coordinates: {"{b ∈ B | ∃a ∈ A, (a, b) ∈ R}"}. Notice Rng(R) ⊆ B.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-800 block">Codomain</span>
                  <p className="text-xs font-semibold text-slate-800">
                    The entire target set B. Range is always a subset of Codomain (Rng(R) ⊆ B).
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wider block">
                  Total Number of Relations: 2ᵐⁿ
                </span>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  If |A| = m and |B| = n, then |A × B| = mn. Since any subset of A × B is a relation, total relations = 2ᵐⁿ, and non-empty relations = 2ᵐⁿ - 1.
                </p>
              </div>
            </div>

            {/* Interactive Relation Builder & Inverse */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-dashed border-gray-200">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-100 text-[#4F46E5] flex items-center justify-center shrink-0">
                    <Zap className="h-4 w-4" />
                  </div>
                  <h4 className="text-base font-black text-[#4F46E5] tracking-tight">
                    2.2 Interactive Relation Builder &amp; Inverse Relation R⁻¹
                  </h4>
                </div>
                <span className="text-xs font-mono font-black text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                  {relationData.count} Pairs Active
                </span>
              </div>

              <p className="text-xs text-slate-600 font-medium">
                Click any ordered pair from A × B (where A = {"{1, 2, 3}"}, B = {"{a, b, c}"}) to toggle its inclusion in relation R:
              </p>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {["(1, a)", "(1, b)", "(1, c)", "(2, a)", "(2, b)", "(2, c)", "(3, a)", "(3, b)", "(3, c)"].map((pair) => {
                  const isActive = activeRelationPairs.includes(pair);
                  return (
                    <button
                      key={pair}
                      onClick={() => toggleRelationPair(pair)}
                      className={`p-2 rounded-xl text-xs font-mono font-bold border transition-all text-center ${
                        isActive
                          ? "bg-indigo-950 text-white border-indigo-500 shadow-xs"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {pair}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-900 text-white space-y-1">
                  <span className="text-[10px] font-mono text-indigo-300 uppercase block font-bold">Domain Dom(R)</span>
                  <span className="text-sm font-mono font-black">
                    {relationData.domain.length > 0 ? "{" + relationData.domain.join(", ") + "}" : "∅"}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 text-white space-y-1">
                  <span className="text-[10px] font-mono text-emerald-300 uppercase block font-bold">Range Rng(R)</span>
                  <span className="text-sm font-mono font-black">
                    {relationData.range.length > 0 ? "{" + relationData.range.join(", ") + "}" : "∅"}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 text-white space-y-1">
                  <span className="text-[10px] font-mono text-purple-300 uppercase block font-bold">Inverse R⁻¹</span>
                  <span className="text-sm font-mono font-black">
                    {relationData.inverse.length > 0 ? "{" + relationData.inverse.join(", ") + "}" : "∅"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TAB 3: FUNCTION FORMALISM
           ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "functions" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-purple-50/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-100/80">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-purple-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                  3
                </span>
                <div>
                  <h3 className="text-base font-black text-gray-900">Mathematical Formalism of Functions</h3>
                  <p className="text-[11px] text-gray-500 font-semibold">Totality Axiom · Single-Valuedness · Vertical Line Test · Arrow Mappings</p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-lg">
                Section 3 of 9
              </span>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-dashed border-gray-200">
                <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-100 text-[#4F46E5] flex items-center justify-center shrink-0">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h4 className="text-base font-black text-[#4F46E5] tracking-tight">
                  3.1 The Two Non-Negotiable Structural Axioms of Functions
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                    1. Existence of Image (Totality)
                  </span>
                  <p className="text-xs font-semibold text-slate-800">
                    Every element $x \in A$ must have an assigned image in $B$: $\forall x \in A, \exists y \in B$ such that $(x, y) \in f$. Zero orphans allowed in domain.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-800 block">
                    2. Uniqueness of Image (Single-Valuedness)
                  </span>
                  <p className="text-xs font-semibold text-slate-800">
                    No element $x \in A$ can map to multiple outputs: if $(x, y_1) \in f$ and $(x, y_2) \in f$, then $y_1 = y_2$. Zero bifurcations from domain elements.
                  </p>
                </div>
              </div>

              {/* Vertical Line Test Simulator */}
              <div className="p-4 rounded-xl bg-slate-950 text-white space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-indigo-300 font-bold uppercase tracking-wider">
                    Geometric Criterion: The Vertical Line Test
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">1 Intersection = Valid Function</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-center">
                    <span className="text-xs font-bold text-emerald-400">Valid Function: Parabola y = x²</span>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Every vertical line $x = c$ cuts the parabola at exactly one point $(c, c^2)$.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-center">
                    <span className="text-xs font-bold text-rose-400">Invalid: Circle x² + y² = r²</span>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Vertical line $x = 0$ cuts at two points $(0, r)$ and $(0, -r)$, violating single-valuedness.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TAB 4: MASTER CATALOG OF STANDARD FUNCTIONS
           ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "catalog" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-purple-50/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-100/80">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-purple-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                  4
                </span>
                <div>
                  <h3 className="text-base font-black text-gray-900">Master Catalog of Real Functions &amp; Graphs</h3>
                  <p className="text-[11px] text-gray-500 font-semibold">Modulus · Signum · Floor (GIF) · Fractional Part · Exponential &amp; Logarithm</p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-lg">
                Section 4 of 9
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {standardFunctions.map((func) => (
                <button
                  key={func.id}
                  onClick={() => setSelectedFuncId(func.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedFuncId === func.id
                      ? "bg-indigo-950 text-white border-indigo-500 shadow-xs"
                      : "bg-white text-slate-800 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className="text-xs font-black block">{func.name}</span>
                  <span className={`text-[10px] font-mono block ${selectedFuncId === func.id ? "text-indigo-200" : "text-slate-500"}`}>
                    {func.formula.split("=")[1] || func.formula}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Function Details */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-dashed border-gray-200">
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">{selectedFunc.name}</h4>
                  <code className="text-xs font-mono font-bold text-indigo-700">{selectedFunc.formula}</code>
                </div>
                <div className="flex gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-900 font-bold">
                    Dom: {selectedFunc.domain}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
                    Rng: {selectedFunc.range}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {selectedFunc.properties}
              </p>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 font-mono text-xs text-slate-900">
                <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wider font-sans block">
                  Core Mathematical Identities
                </span>
                {selectedFunc.identities.map((id, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span>{id}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TAB 5: DOMAIN & RANGE TOOLKIT
           ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "domainrange" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-purple-50/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-100/80">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-purple-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                  5
                </span>
                <div>
                  <h3 className="text-base font-black text-gray-900">Advanced Domain &amp; Range Determination Methods</h3>
                  <p className="text-[11px] text-gray-500 font-semibold">Denominator · Radical · Logarithm · Algebraic Inversion · Quadratic Discriminant D ≥ 0</p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-lg">
                Section 5 of 9
              </span>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-black uppercase text-indigo-700 block">Denominator Rule</span>
                  <code className="text-xs font-mono font-bold text-slate-900">P(x) / Q(x)</code>
                  <p className="text-[11px] text-slate-600">Require Q(x) ≠ 0. Exclude roots of Q(x).</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-black uppercase text-emerald-700 block">Radical Rule</span>
                  <code className="text-xs font-mono font-bold text-slate-900">√(g(x))</code>
                  <p className="text-[11px] text-slate-600">Require g(x) ≥ 0 for even radical indices.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-black uppercase text-amber-700 block">Logarithmic Rule</span>
                  <code className="text-xs font-mono font-bold text-slate-900">log_b(a)</code>
                  <p className="text-[11px] text-slate-600">Require a(x) &gt; 0, b(x) &gt; 0, and b(x) ≠ 1.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-black uppercase text-purple-700 block">Inverse Trig Rule</span>
                  <code className="text-xs font-mono font-bold text-slate-900">sin⁻¹[g(x)]</code>
                  <p className="text-[11px] text-slate-600">Require -1 ≤ g(x) ≤ 1 for sin⁻¹ and cos⁻¹.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
                <span className="text-xs font-bold text-indigo-300 block uppercase tracking-wider">
                  4-Tier Range Determination Toolkit
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-800 space-y-1">
                    <span className="text-indigo-300 font-bold">1. Algebraic Inversion (x in terms of y):</span>
                    <p className="text-slate-300">Express $x = g(y)$, then find the valid domain for $y$.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-800 space-y-1">
                    <span className="text-emerald-300 font-bold">2. Quadratic Discriminant (D ≥ 0):</span>
                    <p className="text-slate-300">For y = (ax² + bx + c) / (dx² + ex + f), rearrange into quadratic in x and set D ≥ 0.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-800 space-y-1">
                    <span className="text-amber-300 font-bold">3. Calculus Monotonicity:</span>
                    <p className="text-slate-300">Continuous monotonic function on [a, b] has Rng = [min(f), max(f)].</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-800 space-y-1">
                    <span className="text-purple-300 font-bold">4. AM-GM Inequality:</span>
                    <p className="text-slate-300">For positive expressions x + 1/x ≥ 2√(x · 1/x) = 2.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TAB 6: COMPOSITION & ALGEBRA
           ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "composition" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-purple-50/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-100/80">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-purple-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                  6
                </span>
                <div>
                  <h3 className="text-base font-black text-gray-900">Algebra &amp; Composition of Functions</h3>
                  <p className="text-[11px] text-gray-500 font-semibold">Pointwise Operations · (g ∘ f)(x) = g(f(x)) · Rigorous Domain Rule · Piecewise Algorithm</p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-lg">
                Section 6 of 9
              </span>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 font-mono text-xs text-slate-900">
                  <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wider font-sans block">Pointwise Operations</span>
                  <p>(f ± g)(x) = f(x) ± g(x), Dom: D₁ ∩ D₂</p>
                  <p>(f · g)(x) = f(x) · g(x), Dom: D₁ ∩ D₂</p>
                  <p>(f / g)(x) = f(x) / g(x), Dom: (D₁ ∩ D₂) \ {"{x | g(x) = 0}"}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-indigo-50/80 border border-indigo-200 space-y-1 font-mono text-xs text-indigo-950">
                  <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wider font-sans block">Composite Function Domain Rule</span>
                  <p>(g ∘ f)(x) = g(f(x))</p>
                  <p className="font-bold">Dom(g ∘ f) = {"{x ∈ Dom(f) | f(x) ∈ Dom(g)}"}</p>
                  <p className="text-[10px] text-indigo-600 font-sans">Never assume Dom(g ∘ f) equals Dom(f)!</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 text-white space-y-2 text-xs">
                <span className="text-indigo-300 font-bold block uppercase tracking-wider">
                  Piecewise Composition Step-by-Step Algorithm
                </span>
                <p className="text-slate-300 leading-relaxed">
                  When composing piecewise functions f and g, split into separate sub-cases for each branch of f(x) and restrict by compound condition: x ∈ Dom(f) ∧ f(x) ∈ Branch Domain of g.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TAB 7: NEST TRAPS (7 TRAPS)
           ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "traps" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-purple-50/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-100/80">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-purple-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                  7
                </span>
                <div>
                  <h3 className="text-base font-black text-gray-900">7 High-Yield NEST &amp; IISER Examination Traps</h3>
                  <p className="text-[11px] text-gray-500 font-semibold">Principal Square Roots · √(x²) = |x| · Composite Domains · GIF Jump Discontinuities</p>
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
            TAB 8: MASTER GLOSSARY (20 TERMS)
           ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "glossary" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-purple-50/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-100/80">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-purple-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                  8
                </span>
                <div>
                  <h3 className="text-base font-black text-gray-900">Master Glossary for Relations &amp; Functions</h3>
                  <p className="text-[11px] text-gray-500 font-semibold">20 Key Terms · Rigorous Definitions · Searchable Reference</p>
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
                  {["All", "Cartesian & Relations", "Function Basics", "Special Functions", "Advanced Methods"].map((cat) => (
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
                      <p className="text-xs text-slate-700 font-medium leading-relaxed whitespace-pre-line">
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
