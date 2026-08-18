"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Layers,
  Scale,
  Award,
  BookOpen,
  ChevronRight,
  ChevronDown,
  RotateCcw,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Flame,
  Radio,
  Eye,
  Compass,
  Activity,
  Maximize2,
  Grid,
  Shield,
  Zap,
  ArrowRight,
  TrendingUp,
  Droplets,
  Wind,
  Gauge,
  Thermometer,
  Boxes,
  Split,
  TestTube,
  Beaker,
  ZapOff,
  RefreshCw,
  Atom,
  Binary,
  Microscope,
  Pipette,
  FlaskConical,
  CircleDot,
  Dna,
  Timer,
  Clock,
  ZapIcon,
} from "lucide-react";

// ============================================================================
// 1. DATA: 10 NEST KINETICS MISCONCEPTIONS & TRAPS
// ============================================================================
interface Misconception {
  id: string;
  trap: string;
  reality: string;
  tip: string;
}

const kineticsTraps: Misconception[] = [
  { id: "t1", trap: "The half-life (t_1/2) of a zero-order reaction is independent of initial concentration.", reality: "Zero-order half-life t_1/2 = [A]₀ / (2k) is DIRECTLY PROPORTIONAL to [A]₀. Only first-order t_1/2 = 0.693/k is independent of [A]₀.", tip: "Zero-order: higher initial concentration takes longer to halve." },
  { id: "t2", trap: "A catalyst increases the rate of reaction by increasing the collision frequency Z_AB.", reality: "A catalyst works by LOWERING the Activation Energy (E_a), providing an alternate reaction pathway with a lower energy barrier.", tip: "Collision frequency Z_AB is virtually unchanged by a catalyst." },
  { id: "t3", trap: "Molecularity of a reaction can be zero, fractional, or negative.", reality: "Molecularity MUST be a positive integer (1, 2, or 3). Only Reaction Order can be zero, fractional, or negative.", tip: "Molecularity > 3 is practically impossible due to low 3-body collision probabilities." },
  { id: "t4", trap: "A second-order rate constant has the units s⁻¹.", reality: "Units of k for second-order are M⁻¹·s⁻¹ or L·mol⁻¹·s⁻¹. The unit s⁻¹ applies strictly to FIRST-ORDER reactions.", tip: "Units of k = (M)^(1-n) · s⁻¹." },
  { id: "t5", trap: "In an exothermic reaction, the activation energy of the forward reaction (E_a,f) is zero.", reality: "E_a,f is ALWAYS strictly positive (E_a > 0). In exothermic reactions, E_a,f < E_a,b, but E_a,f is never zero.", tip: "ΔH = E_a,f - E_a,b < 0." },
  { id: "t6", trap: "Doubling concentration doubles the rate of a first-order reaction, so t_1/2 doubles.", reality: "Doubling [A]₀ doubles the reaction rate, but t_1/2 remains completely UNCHANGED (t_1/2 = 0.693/k has no [A]₀ term).", tip: "Rate changes with [A], but half-life is invariant." },
  { id: "t7", trap: "The rate law can be deduced directly from the stoichiometric coefficients of a balanced overall equation.", reality: "The rate law is an EXPERIMENTALLY determined expression. Stoichiometry gives rate laws ONLY for elementary single steps.", tip: "Never assume exponents match overall balanced coefficients!" },
  { id: "t8", trap: "Radioactive decay follows zero-order kinetics.", reality: "All natural and artificial nuclear decay processes strictly follow FIRST-ORDER kinetics (λ = 0.693 / t_1/2).", tip: "Activity A = λN = -dN/dt." },
  { id: "t9", trap: "A catalyst changes the value of Δ_r H and Δ_r G° for a reaction.", reality: "A catalyst alters only the reaction pathway and activation energy. Thermodynamic state functions (ΔH, ΔG°, K_eq) remain completely unchanged.", tip: "Catalysts change path functions, not state functions." },
  { id: "t10", trap: "The slope of an Arrhenius plot (ln k vs 1/T) is equal to -E_a.", reality: "The slope of an ln k vs 1/T plot is -E_a / R (or -E_a / (2.303 R) for log₁₀ k vs 1/T).", tip: "E_a = -Slope × R (or -Slope × 2.303 R)." },
];

// ============================================================================
// 2. DATA: MASTER GLOSSARY (22 DEFINITIONS)
// ============================================================================
interface GlossaryTerm {
  term: string;
  definition: string;
  category: "Rate Laws & Order" | "Integrated Kinetics" | "Arrhenius & Catalysis" | "Collision Theory";
}

const masterGlossary: GlossaryTerm[] = [
  { term: "Activated Complex (Transition State)", definition: "An unstable, high-energy intermediate configuration formed during collision that decomposes into products or reactants.", category: "Arrhenius & Catalysis" },
  { term: "Activation Energy (E_a)", definition: "The minimum excess kinetic energy required by colliding reactant molecules to reach the transition state barrier (E_a = E_Threshold - E_Reactants).", category: "Arrhenius & Catalysis" },
  { term: "Arrhenius Equation", definition: "Fundamental relation k = A · e^(-E_a / RT), quantifying the exponential temperature dependence of rate constant k.", category: "Arrhenius & Catalysis" },
  { term: "Average Rate (r_avg)", definition: "The change in reactant or product molar concentration divided by the finite time interval elapsed (r_avg = -Δ[A]/Δt = +Δ[C]/Δt).", category: "Rate Laws & Order" },
  { term: "Catalyst", definition: "A substance that increases reaction rate by providing an alternate pathway with lower activation energy (E_a), without undergoing permanent chemical change.", category: "Arrhenius & Catalysis" },
  { term: "Collision Frequency (Z_AB)", definition: "The total number of bimolecular collisions occurring per unit volume per second in a reaction mixture.", category: "Collision Theory" },
  { term: "Elementary Reaction", definition: "A chemical reaction that occurs in a single microscopic step without forming stable intermediates.", category: "Rate Laws & Order" },
  { term: "First-Order Reaction", definition: "A reaction whose rate is directly proportional to the first power of reactant concentration (Rate = k[A], t_1/2 = 0.693/k).", category: "Integrated Kinetics" },
  { term: "Half-Life (t_1/2)", definition: "The time required for reactant concentration to decrease to exactly half of its initial value.", category: "Integrated Kinetics" },
  { term: "Instantaneous Rate (r_inst)", definition: "The reaction rate at a specific infinitesimal instant in time (r_inst = -d[A]/dt = +d[C]/dt as dt ──► 0).", category: "Rate Laws & Order" },
  { term: "Integrated Rate Law", definition: "A mathematical equation expressing reactant concentration as an explicit continuous function of time.", category: "Integrated Kinetics" },
  { term: "Molecularity", definition: "The exact number of reacting species (atoms, ions, molecules) colliding simultaneously in an elementary step (1, 2, or 3).", category: "Rate Laws & Order" },
  { term: "Order of Reaction (n)", definition: "The sum of exponents (n = x + y) of concentration terms in the experimentally determined rate law (Rate = k [A]^x [B]^y).", category: "Rate Laws & Order" },
  { term: "Pre-Exponential Factor (A)", definition: "The frequency factor in the Arrhenius equation representing total collision frequency and orientation probability.", category: "Arrhenius & Catalysis" },
  { term: "Pseudo-First-Order Reaction", definition: "A higher-order reaction that follows first-order kinetics because one reactant is present in large excess (e.g., cane sugar inversion).", category: "Integrated Kinetics" },
  { term: "Rate Constant (Specific Reaction Rate, k)", definition: "The proportionality constant in the rate law representing reaction rate when all reactant concentrations equal 1.0 M.", category: "Rate Laws & Order" },
  { term: "Rate Law", definition: "The experimentally determined mathematical equation relating reaction rate to molar concentrations of reactants raised to empirical powers.", category: "Rate Laws & Order" },
  { term: "Steric Factor (P)", definition: "A probability factor (P ≤ 1) in collision theory accounting for the proper 3D spatial alignment of molecules during collision.", category: "Collision Theory" },
  { term: "Temperature Coefficient (TC)", definition: "The ratio of rate constants at two temperatures differing by 10°C (TC = k_(T+10) / k_T ≈ 2 to 3).", category: "Arrhenius & Catalysis" },
  { term: "Threshold Energy (E_T)", definition: "The minimum total energy colliding molecules must possess to undergo an effective chemical reaction (E_T = E_Reactants + E_a).", category: "Collision Theory" },
  { term: "Zero-Order Reaction", definition: "A reaction whose rate is completely independent of reactant concentration (Rate = k, [A]_t = [A]₀ - kt, t_1/2 = [A]₀ / 2k).", category: "Integrated Kinetics" },
  { term: "Radioactive Decay Law", definition: "The spontaneous nuclear decay process following first-order kinetics with decay constant λ = 0.693 / t_1/2.", category: "Integrated Kinetics" },
];

// ============================================================================
// 3. DATA: ALL 20 NEST ASSESSMENT QUESTIONS
// ============================================================================
interface MCQOption {
  key: string;
  text: string;
}

interface MCQ {
  id: number;
  part: "A" | "B";
  question: string;
  options: MCQOption[];
  correctKeys: string[];
  type: "single" | "multi";
  explanation: string;
}

const mcqData: MCQ[] = [
  {
    id: 1,
    part: "A",
    question: "For the thermal decomposition of 1.0 mole of Dinitrogen Pentoxide gas: 2N₂O₅(g) ──► 4NO₂(g) + O₂(g), the rate of disappearance of N₂O₅ is measured as 2.4 × 10⁻⁴ mol·L⁻¹·s⁻¹ at a given instant. What is the overall Rate of Reaction and the rate of appearance of Nitrogen Dioxide (NO₂), respectively?",
    options: [
      { key: "A", text: "Rate = 2.4 × 10⁻⁴ M·s⁻¹; d[NO₂]/dt = 2.4 × 10⁻⁴ M·s⁻¹" },
      { key: "B", text: "Rate = 1.2 × 10⁻⁴ M·s⁻¹; d[NO₂]/dt = 4.8 × 10⁻⁴ M·s⁻¹" },
      { key: "C", text: "Rate = 4.8 × 10⁻⁴ M·s⁻¹; d[NO₂]/dt = 1.2 × 10⁻⁴ M·s⁻¹" },
      { key: "D", text: "Rate = 1.2 × 10⁻⁴ M·s⁻¹; d[NO₂]/dt = 2.4 × 10⁻⁴ M·s⁻¹" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Overall Rate = (1/2) × (2.4 × 10⁻⁴) = 1.2 × 10⁻⁴ M·s⁻¹. Rate of appearance of NO₂ = 4 × (Overall Rate) = 4 × (1.2 × 10⁻⁴) = 4.8 × 10⁻⁴ M·s⁻¹.",
  },
  {
    id: 2,
    part: "A",
    question: "A first-order reaction A ──► Products has a rate constant k = 3.465 × 10⁻³ s⁻¹. How long will it take for the initial concentration [A]₀ = 0.80 M to decrease to [A]_t = 0.05 M?",
    options: [
      { key: "A", text: "200 seconds" },
      { key: "B", text: "400 seconds" },
      { key: "C", text: "800 seconds" },
      { key: "D", text: "100 seconds" },
    ],
    correctKeys: ["C"],
    type: "single",
    explanation: "t_1/2 = 0.693 / (3.465 × 10⁻³) = 200 s. 0.80 ──► 0.40 ──► 0.20 ──► 0.10 ──► 0.05 requires 4 half-lives. Total time = 4 × 200 = 800 s.",
  },
  {
    id: 3,
    part: "A",
    question: "For a zero-order reaction A ──► Products with initial concentration [A]₀ = 0.50 M, the reaction is 50% complete in 25 minutes. What is the rate constant k and the time required for 80% completion (t_80%)?",
    options: [
      { key: "A", text: "k = 0.010 M·min⁻¹; t_80% = 40 minutes" },
      { key: "B", text: "k = 0.020 M·min⁻¹; t_80% = 50 minutes" },
      { key: "C", text: "k = 0.010 M·min⁻¹; t_80% = 80 minutes" },
      { key: "D", text: "k = 0.005 M·min⁻¹; t_80% = 100 minutes" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "t_1/2 = [A]₀ / (2k) ⟹ 25 = 0.50 / (2k) ⟹ k = 0.010 M·min⁻¹. At 80% completion, amount reacted = 0.40 M. t_80% = 0.40 / 0.010 = 40 minutes.",
  },
  {
    id: 4,
    part: "A",
    question: "The rate constants of a certain chemical reaction are k₁ = 1.0 × 10⁻³ s⁻¹ at 300 K and k₂ = 8.0 × 10⁻³ s⁻¹ at 330 K. What is the activation energy (E_a) of this reaction in kJ/mol? (R = 8.314 J/mol·K, log₁₀ 2 = 0.301, log₁₀ 8 = 0.903)",
    options: [
      { key: "A", text: "E_a = 57.6 kJ/mol" },
      { key: "B", text: "E_a = 28.8 kJ/mol" },
      { key: "C", text: "E_a = 115.2 kJ/mol" },
      { key: "D", text: "E_a = 14.4 kJ/mol" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "log₁₀(8) = (E_a / (2.303 × 8.314)) × (30 / (300 × 330)) ⟹ 0.903 = (E_a / 19.147) × (1 / 3300) ⟹ E_a = 0.903 × 19.147 × 3300 = 57056 J/mol ≈ 57.6 kJ/mol.",
  },
  {
    id: 5,
    part: "A",
    question: "For the gas-phase first-order decomposition reaction: A(g) ──► 2B(g) + C(g), the initial pressure of A(g) is P₀ = 100 mmHg. After 20 minutes, the total system pressure becomes P_t = 220 mmHg. What is the first-order rate constant k in min⁻¹?",
    options: [
      { key: "A", text: "k = 0.0458 min⁻¹" },
      { key: "B", text: "k = 0.0230 min⁻¹" },
      { key: "C", text: "k = 0.0916 min⁻¹" },
      { key: "D", text: "k = 0.0115 min⁻¹" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "P_t = P₀ + 2x ⟹ 220 = 100 + 2x ⟹ x = 60 mmHg. P_A = 100 - 60 = 40 mmHg. k = (2.303 / 20) log₁₀(100 / 40) = (2.303 / 20) × 0.3979 = 0.0458 min⁻¹.",
  },
  {
    id: 6,
    part: "A",
    question: "For a multi-step complex reaction A + 2B ──► C, experimental initial rate data yields the following matrix: Exp 1: [A] = 0.1 M, [B] = 0.1 M ⟹ Rate = 2.0 × 10⁻³ M/s; Exp 2: [A] = 0.2 M, [B] = 0.1 M ⟹ Rate = 4.0 × 10⁻³ M/s; Exp 3: [A] = 0.2 M, [B] = 0.3 M ⟹ Rate = 3.6 × 10⁻² M/s. What is the Rate Law, overall reaction order (n), and specific rate constant k?",
    options: [
      { key: "A", text: "Rate = k [A] [B]²; n = 3; k = 2.0 M⁻²·s⁻¹" },
      { key: "B", text: "Rate = k [A]² [B]; n = 3; k = 1.0 M⁻²·s⁻¹" },
      { key: "C", text: "Rate = k [A] [B]; n = 2; k = 0.2 M⁻¹·s⁻¹" },
      { key: "D", text: "Rate = k [B]²; n = 2; k = 2.0 M⁻¹·s⁻¹" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "Exp 2/1 gives 2^x = 2 ⟹ x=1. Exp 3/2 gives 3^y = 9 ⟹ y=2. Overall order n = 1+2 = 3. k = (2.0 × 10⁻³) / (0.1 × (0.1)²) = 2.0 M⁻²·s⁻¹.",
  },
  {
    id: 7,
    part: "A",
    question: "The activation energy of an uncatalyzed reaction is E_a = 83.14 kJ/mol at 300 K. Addition of a specific biological catalyst provides a new reaction pathway that lowers the activation energy to E_a' = 48.72 kJ/mol. By what factor (k_cat / k_uncat) is the reaction rate accelerated at 300 K? (R = 8.314 J/mol·K, e¹³·⁸ ≈ 10⁶)",
    options: [
      { key: "A", text: "Accelerated by a factor of 100" },
      { key: "B", text: "Accelerated by a factor of 10,000" },
      { key: "C", text: "Accelerated by a factor of 1,000,000 (10⁶)" },
      { key: "D", text: "Rate remains unchanged" },
    ],
    correctKeys: ["C"],
    type: "single",
    explanation: "ΔE_a = 83.14 - 48.72 = 34.42 kJ/mol = 34420 J/mol. RT = 8.314 × 300 = 2494.2 J/mol. Exponent = 34420 / 2494.2 = 13.8. Acceleration factor = e¹³·⁸ ≈ 10⁶ (1 Million times faster!).",
  },
  {
    id: 8,
    part: "A",
    question: "A nuclear medical isotope ¹³¹I used for thyroid carcinoma treatment undergoes first-order radioactive decay with a half-life t_1/2 = 8.0 days. What fraction of the original radioactive ¹³¹I sample remains active in a patient after 32 days?",
    options: [
      { key: "A", text: "1/4 (25%)" },
      { key: "B", text: "1/8 (12.5%)" },
      { key: "C", text: "1/16 (6.25%)" },
      { key: "D", text: "1/32 (3.125%)" },
    ],
    correctKeys: ["C"],
    type: "single",
    explanation: "n = 32 / 8.0 = 4 half-lives. Fraction remaining = (1/2)⁴ = 1/16 = 6.25%.",
  },
  {
    id: 9,
    part: "A",
    question: "For an elementary reversible reaction A ⇌ B, the forward activation energy is E_a,f = 45.0 kJ/mol and the backward activation energy is E_a,b = 70.0 kJ/mol. What is the standard reaction enthalpy (Δ_r H°) and thermodynamic nature of the forward reaction?",
    options: [
      { key: "A", text: "Δ_r H° = +25.0 kJ/mol; Endothermic" },
      { key: "B", text: "Δ_r H° = -25.0 kJ/mol; Exothermic" },
      { key: "C", text: "Δ_r H° = -115.0 kJ/mol; Exothermic" },
      { key: "D", text: "Δ_r H° = +115.0 kJ/mol; Endothermic" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Δ_r H° = E_a,f - E_a,b = 45.0 - 70.0 = -25.0 kJ/mol. Negative ΔH indicates an Exothermic reaction.",
  },
  {
    id: 10,
    part: "A",
    question: "For an n-th order chemical reaction, how does the half-life (t_1/2) scale with initial reactant concentration [A]₀?",
    options: [
      { key: "A", text: "t_1/2 ∝ [A]₀ⁿ" },
      { key: "B", text: "t_1/2 ∝ [A]₀^(1-n)" },
      { key: "C", text: "t_1/2 ∝ [A]₀^(n-1)" },
      { key: "D", text: "t_1/2 ∝ 1 / [A]₀^(1-n)" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "General formula: t_1/2 ∝ 1 / [A]₀^(n-1) = [A]₀^(1-n). (n=0 ⟹ t_1/2 ∝ [A]₀; n=1 ⟹ independent; n=2 ⟹ 1/[A]₀).",
  },
  {
    id: 11,
    part: "B",
    question: "Which of the following statements correctly characterize a ZERO-ORDER reaction (A ──► Products)? (Select all that apply)",
    options: [
      { key: "A", text: "The reaction rate is completely independent of reactant concentration ([A]_t = [A]₀ - kt)" },
      { key: "B", text: "The half-life (t_1/2 = [A]₀ / 2k) is directly proportional to initial concentration [A]₀" },
      { key: "C", text: "The time required for 100% completion is t_100% = 2 × t_1/2" },
      { key: "D", text: "The units of the rate constant k are s⁻¹" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: Zero-order rate is constant (k), integrated law [A]_t = [A]₀ - kt, t_1/2 = [A]₀ / 2k, and total completion t_100% = [A]₀ / k = 2 t_1/2. • D is incorrect: Units of k for zero-order are M·s⁻¹ or mol·L⁻¹·s⁻¹.",
  },
  {
    id: 12,
    part: "B",
    question: "Select the valid statements regarding FIRST-ORDER reaction kinetics (A ──► Products): (Select all that apply)",
    options: [
      { key: "A", text: "The half-life (t_1/2 = 0.693 / k) is completely independent of initial concentration [A]₀" },
      { key: "B", text: "A plot of ln [A]_t versus time t yields a straight line with slope equal to -k" },
      { key: "C", text: "The time required for 75% completion (t_75%) is equal to two half-lives (2 × t_1/2)" },
      { key: "D", text: "A first-order reaction reaches 100% completion in time t = 2/k" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: t_1/2 is independent of [A]₀; ln[A]_t = ln[A]₀ - kt has slope -k; t_75% = 2 t_1/2. • D is incorrect: A first-order reaction approaches 100% completion asymptotically (t_100% = ∞).",
  },
  {
    id: 13,
    part: "B",
    question: "Which of the following chemical reactions represent PSEUDO-FIRST-ORDER systems? (Select all that apply)",
    options: [
      { key: "A", text: "Acid-catalyzed inversion of cane sugar: C₁₂H₂₂O₁₁ + H₂O (Excess) ──[H⁺]──► Glucose + Fructose" },
      { key: "B", text: "Acidic hydrolysis of ethyl acetate: CH₃COOC₂H₅ + H₂O (Excess) ──[H⁺]──► CH₃COOH + C₂H₅OH" },
      { key: "C", text: "Radioactive decay of Radium-226" },
      { key: "D", text: "Alkaline saponification of ethyl acetate: CH₃COOC₂H₅ + NaOH ──► CH₃COONa + C₂H₅OH" },
    ],
    correctKeys: ["A", "B"],
    type: "multi",
    explanation: "• A and B are correct: Sugar inversion and acid ester hydrolysis are pseudo-first-order reactions because water is present in massive excess, keeping its concentration constant. • C is a true first-order reaction. • D is a true second-order reaction.",
  },
  {
    id: 14,
    part: "B",
    question: "Select the correct options regarding the Arrhenius Equation (k = A e^(-E_a / RT)): (Select all that apply)",
    options: [
      { key: "A", text: "The pre-exponential factor A has the same units as the rate constant k" },
      { key: "B", text: "The term e^(-E_a / RT) represents the fraction of molecules possessing kinetic energy ≥ E_a" },
      { key: "C", text: "Plotting log₁₀ k versus 1/T gives a straight line with slope equal to -E_a / (2.303 R)" },
      { key: "D", text: "Higher activation energy (E_a) means the rate constant k is extremely sensitive to temperature changes" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four options represent accurate physical and mathematical properties of the Arrhenius equation.",
  },
  {
    id: 15,
    part: "B",
    question: "Which of the following statements regarding Catalysts and Reaction Kinetics are TRUE? (Select all that apply)",
    options: [
      { key: "A", text: "A catalyst lowers the activation energy of both forward (E_a,f) and backward (E_a,b) reactions by the exact same amount" },
      { key: "B", text: "A catalyst increases the rate of reaction without altering the standard reaction enthalpy (Δ_r H°)" },
      { key: "C", text: "A catalyst increases the value of the equilibrium constant (K_eq) to favor product formation" },
      { key: "D", text: "A catalyst speeds up both forward and reverse reaction rates equally" },
    ],
    correctKeys: ["A", "B", "D"],
    type: "multi",
    explanation: "• A, B, D are correct: A catalyst lowers E_a equally in both directions, accelerates forward and reverse rates equally, and leaves Δ_r H° and Δ_r G° unchanged. • C is incorrect: A catalyst NEVER changes K_eq; it merely decreases the time required to reach equilibrium.",
  },
  {
    id: 16,
    part: "B",
    question: "Select the correct options regarding Collision Theory of chemical reactions: (Select all that apply)",
    options: [
      { key: "A", text: "Reaction rate depends on the product of collision frequency (Z_AB), Boltzmann factor (e^(-E_a / RT)), and steric factor (P)" },
      { key: "B", text: "Collisions are effective only if colliding species possess energy ≥ Threshold Energy (E_T) AND proper spatial orientation" },
      { key: "C", text: "The steric factor P accounts for the 3D spatial alignment of reacting molecules during collision" },
      { key: "D", text: "All molecular collisions result in product formation" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: Rate = P · Z_AB · e^(-E_a/RT); effective collisions require E ≥ E_T and correct steric orientation P. • D is incorrect: Most collisions are ineffective because molecules lack sufficient activation energy or proper spatial alignment.",
  },
  {
    id: 17,
    part: "B",
    question: "Which of the following units represent valid rate constant (k) units for a SECOND-ORDER reaction? (Select all that apply)",
    options: [
      { key: "A", text: "L·mol⁻¹·s⁻¹" },
      { key: "B", text: "M⁻¹·s⁻¹" },
      { key: "C", text: "atm⁻¹·s⁻¹" },
      { key: "D", text: "mol·L⁻¹·s⁻¹" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• Units of k = (M)^(1-n) · s⁻¹. For n=2 ⟹ (M)⁻¹·s⁻¹ = L·mol⁻¹·s⁻¹ or M⁻¹·s⁻¹. For gas-phase, atm⁻¹·s⁻¹. • D is incorrect: mol·L⁻¹·s⁻¹ is the unit for a zero-order reaction.",
  },
  {
    id: 18,
    part: "B",
    question: "For an elementary trimolecular reaction 2A + B ──► C, which of the following statements are correct? (Select all that apply)",
    options: [
      { key: "A", text: "The molecularity of the reaction is equal to 3" },
      { key: "B", text: "The overall order of the reaction is equal to 3 (Rate = k [A]² [B])" },
      { key: "C", text: "The probability of simultaneous 3-body collision is very low, making such reactions rare" },
      { key: "D", text: "Molecularity can be deduced directly from the balanced elementary equation" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four options represent accurate facts for elementary reactions (2+1=3 molecularity and order, low 3-body collision probability).",
  },
  {
    id: 19,
    part: "B",
    question: "Select the valid statements regarding the Temperature Coefficient (TC) of a chemical reaction: (Select all that apply)",
    options: [
      { key: "A", text: "TC = k_(T+10) / k_T ≈ 2 to 3" },
      { key: "B", text: "Increasing temperature increases the fraction of molecules possessing energy ≥ E_a (represented by the area under the Maxwell-Boltzmann curve beyond E_a)" },
      { key: "C", text: "The temperature coefficient implies that average kinetic energy doubles with every 10°C rise" },
      { key: "D", text: "The primary reason for rate acceleration with temperature is the dramatic increase in the fraction of effective collisions (e^(-E_a/RT))" },
    ],
    correctKeys: ["A", "B", "D"],
    type: "multi",
    explanation: "• A, B, D are correct: TC ≈ 2–3; T rise increases the fraction of molecules with E ≥ E_a (the Boltzmann factor increases exponentially). • C is incorrect: Average kinetic energy (E_k = (3/2)RT) is proportional to absolute T (K). A 10°C rise from 300 K to 310 K increases average E_k by only ~3.3%, NOT 100%! The rate doubles because the fraction of molecules crossing E_a increases dramatically.",
  },
  {
    id: 20,
    part: "B",
    question: "Which of the following mathematical relationships are correct for a FIRST-ORDER reaction (A ──► Products)? (Select all that apply)",
    options: [
      { key: "A", text: "[A]_t = [A]₀ e^(-kt)" },
      { key: "B", text: "t_1/2 = 0.693 / k" },
      { key: "C", text: "t_99.9% ≈ 10 × t_1/2" },
      { key: "D", text: "log₁₀([A]₀ / [A]_t) = kt / 2.303" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four options represent mathematically exact equations and relationships for first-order reaction kinetics (t_99.9% = (2.303/k) log(1000) = (2.303 × 3)/k = 6.909/k ≈ 10 × 0.693/k = 10 t_1/2).",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
type Tab = "reaction-rates" | "order-molecularity" | "zero-order" | "first-order" | "gas-pseudo" | "arrhenius" | "energy-catalysis" | "collision-theory" | "traps" | "glossary" | "selftest";

export const ChemicalKineticsDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("reaction-rates");
  const [activeTrapId, setActiveTrapId] = useState<string | null>(null);

  // Arrhenius Live Calculator State
  const [calcEa, setCalcEa] = useState<number>(50.0); // in kJ/mol
  const [calcT1, setCalcT1] = useState<number>(300); // in K
  const [calcT2, setCalcT2] = useState<number>(310); // in K

  const calcRateRatio = () => {
    if (calcT1 <= 0 || calcT2 <= 0 || calcEa <= 0) return "Invalid";
    const R = 8.314;
    const eaJoules = calcEa * 1000;
    const exponent = (eaJoules / R) * (1 / calcT1 - 1 / calcT2);
    const ratio = Math.exp(exponent);
    return ratio.toFixed(3);
  };

  // Glossary filter state
  const [glossarySearch, setGlossarySearch] = useState("");
  const [glossaryCategory, setGlossaryCategory] = useState<string>("All");

  // Self-test state
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string[]>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState<number | null>(null);
  const [testPartFilter, setTestPartFilter] = useState<"ALL" | "A" | "B">("ALL");

  const currentMCQ = mcqData[currentQ];

  const filteredGlossary = masterGlossary.filter((item) => {
    const matchesSearch = item.term.toLowerCase().includes(glossarySearch.toLowerCase()) || item.definition.toLowerCase().includes(glossarySearch.toLowerCase());
    const matchesCategory = glossaryCategory === "All" || item.category === glossaryCategory;
    return matchesSearch && matchesCategory;
  });

  function toggleAnswer(qIndex: number, key: string, type: "single" | "multi") {
    if (submitted[qIndex]) return;
    setSelectedAnswers((prev) => {
      const current = prev[qIndex] || [];
      if (type === "single") return { ...prev, [qIndex]: [key] };
      if (current.includes(key)) return { ...prev, [qIndex]: current.filter((k) => k !== key) };
      return { ...prev, [qIndex]: [...current, key] };
    });
  }

  function submitAnswer(qIndex: number) {
    setSubmitted((prev) => ({ ...prev, [qIndex]: true }));
  }

  function computeScore() {
    let correct = 0;
    mcqData.forEach((q, i) => {
      const sel = selectedAnswers[i] || [];
      if (sel.length === q.correctKeys.length && q.correctKeys.every((k) => sel.includes(k))) correct++;
    });
    setScore(correct);
  }

  function resetSelfTest() {
    setSelectedAnswers({});
    setSubmitted({});
    setScore(null);
    setCurrentQ(0);
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "reaction-rates", label: "Rates & Stoichiometry", icon: <Clock className="w-3.5 h-3.5 shrink-0" /> },
    { id: "order-molecularity", label: "Order & Molecularity", icon: <Grid className="w-3.5 h-3.5 shrink-0" /> },
    { id: "zero-order", label: "Zero-Order Kinetics", icon: <Timer className="w-3.5 h-3.5 shrink-0" /> },
    { id: "first-order", label: "First-Order & Nuclear", icon: <Activity className="w-3.5 h-3.5 shrink-0" /> },
    { id: "gas-pseudo", label: "Gas & Pseudo-1st", icon: <Wind className="w-3.5 h-3.5 shrink-0" /> },
    { id: "arrhenius", label: "Arrhenius & Temp", icon: <Thermometer className="w-3.5 h-3.5 shrink-0" /> },
    { id: "energy-catalysis", label: "Energy & Catalysis", icon: <TrendingUp className="w-3.5 h-3.5 shrink-0" /> },
    { id: "collision-theory", label: "Collision Theory", icon: <ZapIcon className="w-3.5 h-3.5 shrink-0" /> },
    { id: "traps", label: "10 NEST Traps", icon: <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> },
    { id: "glossary", label: "Master Glossary", icon: <BookOpen className="w-3.5 h-3.5 shrink-0" /> },
    { id: "selftest", label: "NEST 20-Q Test", icon: <Award className="w-3.5 h-3.5 shrink-0" /> },
  ];

  return (
    <div className="my-4 sm:my-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-slate-50 to-amber-50/20 border border-slate-200/90 p-2.5 sm:p-7 shadow-xs space-y-4 sm:space-y-6 select-none w-full">

      {/* HEADER */}
      <div className="flex flex-col items-center text-center space-y-2.5 max-w-2xl mx-auto w-full">
        <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200 shadow-2xs flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-600" />
          CHEMISTRY INTERACTIVE MODULE — CHEMICAL KINETICS (CLASS XII / UNIT XII)
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 shrink-0" />
            CHEMICAL KINETICS: RATES, INTEGRATED LAWS, &amp; CATALYSIS
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            Rate Normalization · Order vs Molecularity · Zero &amp; First-Order Integrated Equations · Gas-Phase Kinetics · Arrhenius Equation &amp; Activation Energy · Potential Energy Profiles &amp; Collision Theory
          </p>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-slate-100/90 rounded-xl sm:rounded-2xl border border-slate-200 w-full max-w-5xl mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
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

      {/* TAB 1: RATES & STOICHIOMETRY */}
      {activeTab === "reaction-rates" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              Reaction Rates: Average vs. Instantaneous &amp; Stoichiometric Normalization
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[10px]">
                <span className="font-black text-slate-900 uppercase">Rate Definitions</span>
                <p className="font-mono text-slate-800 font-bold">• Average Rate: r_avg = -Δ[A]/Δt = +Δ[B]/Δt</p>
                <p className="font-mono text-slate-800 font-bold">• Instantaneous Rate: r_inst = -d[A]/dt = +d[B]/dt</p>
                <p className="text-slate-600 font-semibold">Instantaneous rate is the negative tangent slope to the concentration-time curve as dt ──► 0.</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5 text-[10px]">
                <span className="font-black text-amber-950 uppercase">Stoichiometric Normalization</span>
                <p className="font-mono text-amber-900 font-bold">a A + b B ──► c C + d D</p>
                <p className="font-mono text-amber-900 font-bold">Rate = -(1/a) d[A]/dt = +(1/c) d[C]/dt</p>
                <p className="text-amber-800 font-semibold">• Rate of disappearance of A = a × (Overall Rate)</p>
                <p className="text-amber-800 font-semibold">• Rate of appearance of C = c × (Overall Rate)</p>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200 text-[10px] space-y-1">
              <span className="font-black text-indigo-950 block">Classic Example: 2N₂O₅(g) ──► 4NO₂(g) + O₂(g)</span>
              <p className="text-indigo-900 font-semibold">If rate of disappearance of N₂O₅ is 2.4 × 10⁻⁴ M/s, then Overall Rate = 1.2 × 10⁻⁴ M/s and rate of appearance of NO₂ = 4.8 × 10⁻⁴ M/s.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORDER & MOLECULARITY */}
      {activeTab === "order-molecularity" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Grid className="w-4 h-4 text-indigo-600 shrink-0" />
              Rate Law, Reaction Order, &amp; Molecularity
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[10px]">
                <span className="font-black text-slate-900 uppercase">Reaction Order (n = x + y)</span>
                <p className="font-mono text-slate-800 font-bold">Rate = k [A]^x [B]^y</p>
                <p className="text-slate-700 font-semibold">• <strong>Experimental quantity</strong> deduced from initial rates.</p>
                <p className="text-slate-700 font-semibold">• Can be zero, integer (1, 2, 3), fraction (1/2, 3/2), or negative.</p>
                <p className="text-slate-700 font-semibold">• Applies to both elementary and complex multi-step reactions.</p>
              </div>
              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1.5 text-[10px]">
                <span className="font-black text-indigo-950 uppercase">Molecularity</span>
                <p className="font-mono text-indigo-900 font-bold">Colliding species in an Elementary Step</p>
                <p className="text-indigo-900 font-semibold">• <strong>Theoretical integer</strong>: 1 (unimolecular), 2 (bimolecular), 3 (trimolecular).</p>
                <p className="text-indigo-900 font-semibold">• Cannot be zero, fractional, or negative.</p>
                <p className="text-indigo-900 font-semibold">• Meaningless for overall complex reactions.</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1 text-[10px]">
              <span className="font-black text-purple-950 block">Units of Rate Constant: (M)^(1-n) · s⁻¹</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <div className="p-1.5 rounded bg-white border border-purple-200 text-center font-mono font-bold">n=0: M·s⁻¹</div>
                <div className="p-1.5 rounded bg-white border border-purple-200 text-center font-mono font-bold">n=1: s⁻¹</div>
                <div className="p-1.5 rounded bg-white border border-purple-200 text-center font-mono font-bold">n=2: M⁻¹·s⁻¹</div>
                <div className="p-1.5 rounded bg-white border border-purple-200 text-center font-mono font-bold">n=3: M⁻²·s⁻¹</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ZERO-ORDER KINETICS */}
      {activeTab === "zero-order" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Timer className="w-4 h-4 text-emerald-600 shrink-0" />
              Zero-Order Reaction Kinetics &amp; Half-Life Mechanics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[10px]">
                <span className="font-black text-slate-900 uppercase">Integrated Rate Equations</span>
                <p className="font-mono text-slate-800 font-bold">Differential: -d[A]/dt = k [A]⁰ = k</p>
                <p className="font-mono text-emerald-900 font-bold">Integrated: [A]_t = [A]₀ - k t</p>
                <p className="font-mono text-emerald-900 font-bold">k = ([A]₀ - [A]_t) / t</p>
                <p className="text-slate-600 font-semibold">• [A]_t vs t plot: Straight line with slope = -k, intercept = [A]₀.</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5 text-[10px]">
                <span className="font-black text-emerald-950 uppercase">Half-Life &amp; Completion Time</span>
                <p className="font-mono text-emerald-900 font-bold">t_1/2 = [A]₀ / (2k)  ⟹  t_1/2 ∝ [A]₀</p>
                <p className="font-mono text-emerald-900 font-bold">t_100% = [A]₀ / k = 2 × t_1/2</p>
                <p className="text-emerald-950 font-bold">• Zero-order half-life is PROPORTIONAL to initial concentration!</p>
                <p className="text-emerald-800 font-semibold">• Classic Examples: 2NH₃(g) on hot Pt, enzyme saturation ([S] ≫ K_m), H₂ + Cl₂ over water.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FIRST-ORDER & NUCLEAR */}
      {activeTab === "first-order" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600 shrink-0" />
              First-Order Reaction Kinetics &amp; Radioactivity Parallelism
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[10px]">
                <span className="font-black text-slate-900 uppercase">Integrated Equations &amp; Decay</span>
                <p className="font-mono text-slate-800 font-bold">Differential: -d[A]/dt = k [A]</p>
                <p className="font-mono text-blue-900 font-bold">Integrated: k = (2.303 / t) log₁₀([A]₀ / [A]_t)</p>
                <p className="font-mono text-blue-900 font-bold">Exponential: [A]_t = [A]₀ e^(-kt)</p>
                <p className="text-slate-600 font-semibold">• log₁₀[A]_t vs t plot: Straight line with slope = -k / 2.303.</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1.5 text-[10px]">
                <span className="font-black text-blue-950 uppercase">Half-Life &amp; Fractional Timelines</span>
                <p className="font-mono text-blue-900 font-bold">t_1/2 = ln 2 / k = 0.693 / k  (INDEPENDENT of [A]₀!)</p>
                <p className="text-blue-900 font-semibold">• t_75% = 2 × t_1/2  (75% complete)</p>
                <p className="text-blue-900 font-semibold">• t_87.5% = 3 × t_1/2  (87.5% complete)</p>
                <p className="text-blue-900 font-semibold">• t_99.9% ≈ 10 × t_1/2  (99.9% complete)</p>
                <p className="text-blue-950 font-bold">• Radioactive Decay: All nuclear decays follow λ = 0.693 / t_1/2.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: GAS & PSEUDO-FIRST-ORDER */}
      {activeTab === "gas-pseudo" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Wind className="w-4 h-4 text-teal-600 shrink-0" />
              Gas-Phase First-Order Kinetics &amp; Pseudo-First-Order Systems
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200 space-y-1.5 text-[10px]">
                <span className="font-black text-teal-950 uppercase block">Gas-Phase Total Pressure Kinetics</span>
                <p className="font-mono font-bold text-teal-900">A(g) ──► B(g) + C(g)</p>
                <p className="font-mono font-bold text-teal-900">P_t = P₀ + x  ⟹  P_A = 2P₀ - P_t</p>
                <p className="font-mono font-bold text-teal-900">k = (2.303 / t) log₁₀ [ P₀ / (2P₀ - P_t) ]</p>
                <p className="text-teal-800">For A(g) ──► 2B(g) + C(g): P_A = P₀ - x where x = (P_t - P₀)/2.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[10px]">
                <span className="font-black text-slate-900 uppercase block">Pseudo-First-Order Systems</span>
                <p className="text-slate-800 font-bold">• Inversion of Cane Sugar (H₂O excess):</p>
                <p className="font-mono text-slate-800">C₁₂H₂₂O₁₁ + H₂O ──[H⁺]──► C₆H₁₂O₆ + C₆H₁₂O₆</p>
                <p className="font-mono text-slate-800">k = (2.303 / t) log₁₀ [ (r₀ - r_∞) / (r_t - r_∞) ]</p>
                <p className="text-slate-700 font-semibold">• Acidic ester hydrolysis is pseudo-1st-order; Alkaline saponification is TRUE 2nd-order.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: ARRHENIUS & TEMPERATURE */}
      {activeTab === "arrhenius" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-rose-600 shrink-0" />
              Arrhenius Equation, Temperature Coefficient, &amp; Activation Energy
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[10px]">
                <span className="font-black text-slate-900 uppercase">The Arrhenius Equation</span>
                <p className="font-mono font-bold text-rose-900">k = A e^(-E_a / RT)</p>
                <p className="font-mono text-rose-900">log₁₀ k = log₁₀ A - E_a / (2.303 R T)</p>
                <p className="text-slate-600 font-semibold">• Slope of log₁₀ k vs 1/T: -E_a / (2.303 R).</p>
                <p className="text-slate-600 font-semibold">• Temperature Coefficient: TC = k_(T+10) / k_T ≈ 2 to 3.</p>
              </div>
              <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1.5 text-[10px]">
                <span className="font-black text-rose-950 uppercase">Two-Temperature Equation</span>
                <p className="font-mono font-bold text-rose-900">log₁₀(k₂ / k₁) = (E_a / 2.303 R) × [ (T₂ - T₁) / (T₁ T₂) ]</p>
                <p className="text-rose-950 font-bold">• Fraction of effective collisions: e^(-E_a / RT) (Boltzmann Factor).</p>
                <p className="text-rose-800 font-semibold">T rise increases rate by expanding the Boltzmann tail crossing E_a.</p>
              </div>
            </div>

            {/* Live Arrhenius Calculator */}
            <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 space-y-2 text-[10px]">
              <span className="font-black text-rose-950 uppercase tracking-wider block">Live Arrhenius Rate Acceleration Calculator</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="text-[9px] font-bold text-slate-700 block">Activation Energy E_a (kJ/mol):</label>
                  <input
                    type="number"
                    step="5"
                    value={calcEa}
                    onChange={(e) => setCalcEa(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 rounded bg-white border border-slate-300 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-700 block">Initial Temp T₁ (K):</label>
                  <input
                    type="number"
                    step="5"
                    value={calcT1}
                    onChange={(e) => setCalcT1(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 rounded bg-white border border-slate-300 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-700 block">Final Temp T₂ (K):</label>
                  <input
                    type="number"
                    step="5"
                    value={calcT2}
                    onChange={(e) => setCalcT2(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 rounded bg-white border border-slate-300 font-bold text-slate-900"
                  />
                </div>
              </div>
              <div className="p-2 rounded bg-white border border-rose-300 flex items-center justify-between">
                <span className="font-bold text-rose-950">Calculated Rate Acceleration Factor (k₂ / k₁):</span>
                <span className="font-mono font-black text-rose-900 text-xs">{calcRateRatio()} × Faster</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: ENERGY PROFILES & CATALYSIS */}
      {activeTab === "energy-catalysis" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-600 shrink-0" />
              Potential Energy Reaction Profiles &amp; Catalysis Mechanics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[10px]">
                <span className="font-black text-slate-900 uppercase">Reaction Enthalpy Relation</span>
                <p className="font-mono font-bold text-slate-800">Δ_r H = E_a,f - E_a,b</p>
                <p className="text-slate-700 font-semibold">• <strong>Exothermic (ΔH &lt; 0):</strong> E_a,f &lt; E_a,b</p>
                <p className="text-slate-700 font-semibold">• <strong>Endothermic (ΔH &gt; 0):</strong> E_a,f &gt; E_a,b</p>
                <p className="text-slate-600 font-semibold">Threshold Energy = E_Reactants + E_a,f</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5 text-[10px]">
                <span className="font-black text-amber-950 uppercase">Catalytic Invariance Rules</span>
                <p className="text-amber-900 font-semibold">1. Lowers E_a,f and E_a,b by the EXACT same amount (ΔE_a).</p>
                <p className="text-amber-900 font-semibold">2. Does NOT alter Δ_r H or Δ_r G° (State functions are invariant).</p>
                <p className="text-amber-900 font-semibold">3. Does NOT alter Equilibrium Constant (K_eq); simply reaches equilibrium faster.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: COLLISION THEORY & n-TH ORDER */}
      {activeTab === "collision-theory" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <ZapIcon className="w-4 h-4 text-indigo-600 shrink-0" />
              Collision Theory &amp; General n-th Order Scaling
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1.5 text-[10px]">
                <span className="font-black text-indigo-950 uppercase block">Collision Theory Criteria</span>
                <p className="font-mono font-bold text-indigo-900">Rate = P · Z_AB · e^(-E_a / RT)</p>
                <p className="text-indigo-900 font-semibold">• <strong>Energy Criterion:</strong> E ≥ E_Threshold (Boltzmann factor e^(-E_a/RT)).</p>
                <p className="text-indigo-900 font-semibold">• <strong>Orientation Criterion:</strong> Steric factor P ≤ 1 accounts for 3D alignment.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[10px]">
                <span className="font-black text-slate-900 uppercase block">General n-th Order Half-Life</span>
                <p className="font-mono font-bold text-slate-900">t_1/2 ∝ [A]₀^(1-n)</p>
                <p className="text-slate-700">• n=0: t_1/2 ∝ [A]₀¹ (Directly proportional)</p>
                <p className="text-slate-700">• n=1: t_1/2 ∝ [A]₀⁰ (Independent of [A]₀)</p>
                <p className="text-slate-700">• n=2: t_1/2 ∝ [A]₀⁻¹ (Inversely proportional)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: TRAPS */}
      {activeTab === "traps" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-amber-300 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              All 10 High-Yield NEST Chemical Kinetics Misconceptions &amp; Traps
            </h4>
            <div className="space-y-2">
              {kineticsTraps.map((trap) => {
                const isOpen = activeTrapId === trap.id;
                return (
                  <div key={trap.id} className={`rounded-xl border transition-all ${isOpen ? "bg-amber-50 border-amber-300" : "bg-slate-50 border-slate-200"}`}>
                    <button
                      className="w-full flex items-center justify-between gap-2 p-2.5 text-left"
                      onClick={() => setActiveTrapId(isOpen ? null : trap.id)}
                    >
                      <span className="text-xs font-bold text-slate-800 italic">{trap.trap}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-500 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="px-2.5 pb-2.5 space-y-1.5">
                        <div className="p-2 rounded-lg bg-white border border-amber-200">
                          <span className="text-[9px] font-black uppercase text-amber-700 tracking-wider block">Kinetic Reality</span>
                          <p className="text-xs font-bold text-amber-950">{trap.reality}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-200">
                          <span className="text-[9px] font-black uppercase text-indigo-700 tracking-wider block">Exam Tip</span>
                          <p className="text-xs font-bold text-indigo-950">{trap.tip}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 10: MASTER GLOSSARY */}
      {activeTab === "glossary" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search chemical kinetics terms..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {["All", "Rate Laws & Order", "Integrated Kinetics", "Arrhenius & Catalysis", "Collision Theory"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGlossaryCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                    glossaryCategory === cat ? "bg-amber-600 text-white border-amber-600" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {filteredGlossary.map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 shadow-2xs">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-black text-slate-900">{item.term}</h5>
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-slate-100 text-slate-600">{item.category}</span>
                </div>
                <p className="text-xs font-semibold text-slate-700 leading-relaxed">{item.definition}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 11: NEST 20-Q SELF-TEST */}
      {activeTab === "selftest" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          {score !== null ? (
            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center space-y-3">
              <Award className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-amber-500" />
              <h4 className="text-xl sm:text-2xl font-black text-slate-900">Your Score: {score} / {mcqData.length}</h4>
              <p className="text-sm font-semibold text-slate-600">
                {score >= 17 ? "Outstanding! Mastery level for NEST & IChO Chemical Kinetics Module." : score >= 12 ? "Good performance — review incorrect explanations." : "Needs practice — revisit earlier tabs and retake."}
              </p>
              <button onClick={resetSelfTest} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-black hover:bg-slate-700 transition-all">
                <RotateCcw className="w-3.5 h-3.5" /> Retake Assessment
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wide">Filter:</span>
                  {(["ALL", "A", "B"] as const).map((part) => (
                    <button
                      key={part}
                      onClick={() => setTestPartFilter(part)}
                      className={`px-2 py-0.5 rounded text-[10px] font-black border transition-all ${
                        testPartFilter === part ? "bg-amber-600 text-white border-amber-600" : "bg-white text-slate-600 border-slate-200"
                      }`}
                    >
                      {part === "ALL" ? "All 20 Questions" : part === "A" ? "Part A (Single MCQ)" : "Part B (Multi MSQ)"}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="flex-1 sm:w-36 h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full rounded-full bg-amber-500 transition-all duration-500" style={{ width: `${((currentQ + 1) / mcqData.length) * 100}%` }} />
                  </div>
                  <span className="text-[10px] font-black text-slate-700">Q{currentQ + 1} of {mcqData.length}</span>
                </div>
              </div>

              <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    {currentMCQ.id}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-slate-100 text-slate-700">
                        Part {currentMCQ.part}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                        currentMCQ.type === "multi" ? "bg-purple-100 text-purple-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {currentMCQ.type === "multi" ? "Multi-Select MSQ (One or more correct)" : "Single-Correct MCQ"}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">{currentMCQ.question}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {currentMCQ.options.map((opt) => {
                    const isSelected = (selectedAnswers[currentQ] || []).includes(opt.key);
                    const isSubmitted = submitted[currentQ];
                    const isCorrect = currentMCQ.correctKeys.includes(opt.key);

                    let bg = "bg-white border-slate-200 hover:border-slate-300";
                    if (isSubmitted) {
                      if (isCorrect) bg = "bg-emerald-50 border-emerald-400";
                      else if (isSelected && !isCorrect) bg = "bg-rose-50 border-rose-400";
                    } else if (isSelected) {
                      bg = "bg-amber-50 border-amber-400";
                    }

                    return (
                      <button key={opt.key} onClick={() => toggleAnswer(currentQ, opt.key, currentMCQ.type)} className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl border-2 text-left transition-all ${bg}`}>
                        <span className={`w-5 h-5 rounded shrink-0 border-2 flex items-center justify-center text-[10px] font-black transition-all ${
                          isSubmitted && isCorrect ? "bg-emerald-600 border-emerald-600 text-white" : isSubmitted && isSelected && !isCorrect ? "bg-rose-600 border-rose-600 text-white" : isSelected ? "bg-amber-600 border-amber-600 text-white" : "border-slate-300 text-slate-500"
                        }`}>
                          {isSubmitted && isCorrect ? "✓" : isSubmitted && isSelected && !isCorrect ? "✗" : opt.key}
                        </span>
                        <span className="text-xs font-semibold text-slate-800 leading-relaxed">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {submitted[currentQ] && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="text-[9px] font-black uppercase tracking-wider text-amber-700">Detailed Solution &amp; Kinetic Explanation</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 leading-relaxed">{currentMCQ.explanation}</p>
                  </div>
                )}

                <div className="flex items-center gap-2 flex-wrap">
                  {!submitted[currentQ] ? (
                    <button onClick={() => submitAnswer(currentQ)} disabled={!(selectedAnswers[currentQ]?.length)} className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-black hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all">Submit Answer</button>
                  ) : null}
                  {currentQ < mcqData.length - 1 && (
                    <button onClick={() => setCurrentQ((q) => q + 1)} className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-black hover:bg-slate-700 transition-all flex items-center gap-1.5">
                      Next Question <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {currentQ === mcqData.length - 1 && submitted[currentQ] && (
                    <button onClick={computeScore} className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-black hover:bg-amber-700 transition-all flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" /> See Final Score
                    </button>
                  )}
                  {currentQ > 0 && (
                    <button onClick={() => setCurrentQ((q) => q - 1)} className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-black hover:bg-slate-200 transition-all">Back</button>
                  )}
                </div>
              </div>

              {/* Question Navigator */}
              <div className="flex flex-wrap gap-1.5">
                {mcqData.map((q, i) => {
                  const isDone = submitted[i];
                  const sel = selectedAnswers[i] || [];
                  const isCorrect = isDone && sel.length === q.correctKeys.length && q.correctKeys.every(k => sel.includes(k));
                  return (
                    <button key={i} onClick={() => setCurrentQ(i)} className={`w-7 h-7 rounded-lg text-[10px] font-black border transition-all ${
                      i === currentQ ? "bg-amber-600 text-white border-amber-600" : isDone ? isCorrect ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-rose-100 text-rose-800 border-rose-300" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                    }`}>{i + 1}</button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChemicalKineticsDiagram;
