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
} from "lucide-react";

// ============================================================================
// 1. DATA: LE CHATELIER'S PERTURBATION RESPONSES
// ============================================================================
interface LeChatelierRow {
  factor: string;
  shift: string;
  cause: string;
  effectOnK: string;
}

const leChatelierMatrix: LeChatelierRow[] = [
  { factor: "Increase [Reactant]", shift: "Forward (Right)", cause: "Decreases Q below K (Q < K)", effectOnK: "Unchanged" },
  { factor: "Increase [Product]", shift: "Backward (Left)", cause: "Increases Q above K (Q > K)", effectOnK: "Unchanged" },
  { factor: "Increase Total Pressure (P)", shift: "Shifts toward fewer gaseous moles (Δn_g)", cause: "Decreases system volume to lower total gas moles", effectOnK: "Unchanged" },
  { factor: "Increase Temperature (T)", shift: "Shifts in Endothermic direction (ΔH > 0)", cause: "System absorbs added thermal heat", effectOnK: "ALTERS K (K ↑ for Endo, K ↓ for Exo)" },
  { factor: "Addition of Inert Gas (at Const V)", shift: "NO SHIFT", cause: "Partial pressures (P_i) of reacting gases remain constant", effectOnK: "Unchanged" },
  { factor: "Addition of Inert Gas (at Const P)", shift: "Shifts toward greater gaseous moles (Δn_g > 0)", cause: "Total volume V expands, lowering partial pressures of reactants/products", effectOnK: "Unchanged" },
  { factor: "Addition of Catalyst", shift: "NO SHIFT", cause: "Lowers activation energy ΔE_a equally for both forward and reverse paths", effectOnK: "Unchanged (Reaches equilibrium faster)" },
];

// ============================================================================
// 2. DATA: SALT HYDROLYSIS & pH FORMULAS
// ============================================================================
interface HydrolysisRow {
  category: string;
  ion: string;
  kh: string;
  h: string;
  concentrationTerm: string;
  phFormula: string;
  nature: string;
}

const hydrolysisMatrix: HydrolysisRow[] = [
  { category: "1. SA + SB (NaCl, KNO₃)", ion: "None", kh: "No Hydrolysis", h: "h = 0", concentrationTerm: "[H⁺] = 10⁻⁷ M", phFormula: "pH = 1/2 pK_w = 7.00", nature: "Neutral" },
  { category: "2. WA + SB (CH₃COONa, NaCN)", ion: "Anion (A⁻)", kh: "K_h = K_w / K_a", h: "h = √(K_w / (K_a C))", concentrationTerm: "[OH⁻] = C h = √((K_w C)/K_a)", phFormula: "pH = 1/2 [pK_w + pK_a + log₁₀ C]", nature: "Alkaline (pH > 7)" },
  { category: "3. SA + WB (NH₄Cl, FeCl₃)", ion: "Cation (B⁺)", kh: "K_h = K_w / K_b", h: "h = √(K_w / (K_b C))", concentrationTerm: "[H⁺] = C h = √((K_w C)/K_b)", phFormula: "pH = 1/2 [pK_w - pK_b - log₁₀ C]", nature: "Acidic (pH < 7)" },
  { category: "4. WA + WB (CH₃COONH₄)", ion: "Cation & Anion", kh: "K_h = K_w / (K_a K_b)", h: "h = √(K_w / (K_a K_b)) (No C!)", concentrationTerm: "[H⁺] = √((K_w K_a)/K_b)", phFormula: "pH = 1/2 [pK_w + pK_a - pK_b]", nature: "Concentration-Independent!" },
];

// ============================================================================
// 3. DATA: SOLUBILITY PRODUCT RELATIONSHIPS
// ============================================================================
interface KspRow {
  saltType: string;
  stoichiometry: string;
  kspExpression: string;
  solubilityS: string;
  examples: string;
}

const kspMatrix: KspRow[] = [
  { saltType: "Binary Salt (AB)", stoichiometry: "AB ⇌ A⁺ + B⁻", kspExpression: "K_sp = S²", solubilityS: "S = √(K_sp)", examples: "AgCl, AgBr, BaSO₄, CaCO₃" },
  { saltType: "Ternary Salt (AB₂)", stoichiometry: "AB₂ ⇌ A²⁺ + 2 B⁻", kspExpression: "K_sp = 4S³", solubilityS: "S = (K_sp / 4)^(1/3)", examples: "CaF₂, PbI₂, Ag₂CrO₄, Mg(OH)₂" },
  { saltType: "Quaternary Salt (AB₃)", stoichiometry: "AB₃ ⇌ A³⁺ + 3 B⁻", kspExpression: "K_sp = 27S⁴", solubilityS: "S = (K_sp / 27)^(1/4)", examples: "Al(OH)₃, Fe(OH)₃, Ag₃PO₄" },
  { saltType: "Binary-Ternary (A₂B₃)", stoichiometry: "A₂B₃ ⇌ 2 A³⁺ + 3 B²⁻", kspExpression: "K_sp = 108S⁵", solubilityS: "S = (K_sp / 108)^(1/5)", examples: "Bi₂S₃, As₂S₃, Ca₃(PO₄)₂" },
];

// ============================================================================
// 4. DATA: NEST MISCONCEPTIONS & TRAPS
// ============================================================================
interface Misconception {
  id: string;
  trap: string;
  reality: string;
  tip: string;
}

const equilibriumTraps: Misconception[] = [
  { id: "t1", trap: "A catalyst increases the value of the equilibrium constant K_eq.", reality: "A catalyst does NOT alter K_eq or the position of equilibrium. It accelerates both forward and reverse rates equally by lowering ΔE_a.", tip: "K_eq is altered strictly by Temperature (T)." },
  { id: "t2", trap: "Adding an inert gas at constant volume shifts equilibrium toward more gas moles.", reality: "Adding an inert gas at constant volume has ZERO effect on equilibrium because partial pressures of reacting gases remain unchanged.", tip: "Shift occurs only if added at constant pressure." },
  { id: "t3", trap: "A solution with pH = 6.5 is always acidic regardless of temperature.", reality: "Water at 60°C has K_w ≈ 10⁻¹³, so neutral [H⁺] = √10⁻¹³ ⟹ Neutral pH = 6.5 (Water remains neutral because [H⁺] = [OH⁻]).", tip: "pH < 7 is not acidic if T ≠ 25°C; compare [H⁺] to [OH⁻]." },
  { id: "t4", trap: "Salt of weak acid and weak base (CH₃COONH₄) pH depends on its concentration.", reality: "pH = 1/2 [pK_w + pK_a - pK_b] is COMPLETELY INDEPENDENT of concentration C.", tip: "Hydrolysis degree h = √(K_w / (K_a K_b)) lacks C." },
  { id: "t5", trap: "A buffer solution resists pH change indefinitely no matter how much strong acid is added.", reality: "Buffers have a finite Buffer Capacity. Adding acid beyond the buffer capacity destroys the buffer.", tip: "Effective buffer range is pK_a ± 1." },
  { id: "t6", trap: "The concentration of solid reactants appears in the K_c expression.", reality: "Pure solids and liquids have constant active mass (activity = 1.0) and are excluded from K_c.", tip: "K_c for CaCO₃(s) ⇌ CaO(s) + CO₂(g) is simply [CO₂]." },
  { id: "t7", trap: "The solubility of AgCl is the same in pure water as in 0.1 M NaCl solution.", reality: "Solubility of AgCl is drastically reduced in NaCl due to the Common Ion Effect (Cl⁻).", tip: "K_sp = [S_new][0.1 + S_new] ≈ 0.1 S_new." },
  { id: "t8", trap: "In a polyprotic acid like H₃PO₄, K_a1 = K_a2 = K_a3.", reality: "K_a1 ≫ K_a2 ≫ K_a3 because removing a positive proton from a negative anion is electrostatically difficult.", tip: "For diprotic acids, [A²⁻] ≈ K_a2." },
  { id: "t9", trap: "When Q_sp = K_sp, precipitation occurs immediately.", reality: "At Q_sp = K_sp, the solution is saturated at dynamic equilibrium. Precipitation occurs ONLY when Q_sp > K_sp.", tip: "Q_sp > K_sp is the supersaturation condition." },
  { id: "t10", trap: "A Lewis acid must contain an ionizable Hydrogen atom.", reality: "Lewis acids are electron-pair acceptors (e.g., BF₃, AlCl₃, Fe³⁺) and need not contain Hydrogen.", tip: "Brønsted acids require protons; Lewis acids require electron vacancies." },
];

// ============================================================================
// 5. DATA: MASTER GLOSSARY (30 DEFINITIONS)
// ============================================================================
interface GlossaryTerm {
  term: string;
  definition: string;
  category: "Chemical Equilibrium" | "Le Chatelier & van 't Hoff" | "Ionic Equilibrium & pH" | "Buffer Solutions & Hydrolysis" | "Solubility Product & Qualitative Analysis";
}

const masterGlossary: GlossaryTerm[] = [
  { term: "Acidic Buffer", definition: "A solution containing a weak acid and its conjugate base salt that maintains pH < 7.", category: "Buffer Solutions & Hydrolysis" },
  { term: "Amphoteric / Amphiprotic Species", definition: "A molecule or ion capable of acting as both a Brønsted acid (proton donor) and base (proton acceptor) (e.g., H₂O, HCO₃⁻, HSO₄⁻).", category: "Ionic Equilibrium & pH" },
  { term: "Anionic Hydrolysis", definition: "Reaction of a weak acid anion with water to produce OH⁻ ions, yielding an alkaline solution (pH > 7).", category: "Buffer Solutions & Hydrolysis" },
  { term: "Arrhenius Acid", definition: "A substance that produces hydrogen ions (H⁺) in aqueous solution.", category: "Ionic Equilibrium & pH" },
  { term: "Basic Buffer", definition: "A solution containing a weak base and its conjugate acid salt that maintains pH > 7.", category: "Buffer Solutions & Hydrolysis" },
  { term: "Brønsted-Lowry Base", definition: "A species capable of accepting a proton (H⁺).", category: "Ionic Equilibrium & pH" },
  { term: "Buffer Capacity", definition: "The quantity of strong acid or base required to change the pH of 1 Liter of buffer solution by 1.0 unit.", category: "Buffer Solutions & Hydrolysis" },
  { term: "Cationic Hydrolysis", definition: "Reaction of a weak base cation with water to produce H⁺ ions, yielding an acidic solution (pH < 7).", category: "Buffer Solutions & Hydrolysis" },
  { term: "Common Ion Effect", definition: "The reduction in degree of ionization or solubility of a weak electrolyte upon adding a strong electrolyte containing a common ion.", category: "Solubility Product & Qualitative Analysis" },
  { term: "Conjugate Acid-Base Pair", definition: "Two chemical species differing from each other strictly by a single proton (H⁺).", category: "Ionic Equilibrium & pH" },
  { term: "Degree of Ionization (α)", definition: "The fraction of total electrolyte molecules that ionize in solution (α = Molecules Ionized / Total Molecules Initial).", category: "Ionic Equilibrium & pH" },
  { term: "Dynamic Equilibrium", definition: "A state where forward and reverse reaction rates are equal (r_f = r_b), keeping macroscopic concentrations constant.", category: "Chemical Equilibrium" },
  { term: "Equilibrium Constant (K_c / K_p)", definition: "The ratio of product concentrations/pressures to reactant concentrations/pressures raised to stoichiometric powers.", category: "Chemical Equilibrium" },
  { term: "Guldberg-Waage Law", definition: "The Law of Mass Action stating reaction rate is proportional to active masses of reactants.", category: "Chemical Equilibrium" },
  { term: "Henderson-Hasselbalch Equation", definition: "Equation relating buffer pH to pK_a and logarithmic salt-to-acid ratio: pH = pK_a + log([Salt]/[Acid]).", category: "Buffer Solutions & Hydrolysis" },
  { term: "Ionic Product of Water (K_w)", definition: "Auto-ionization constant of water: K_w = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 25°C.", category: "Ionic Equilibrium & pH" },
  { term: "Ionic Product (Q_sp)", definition: "Product of ion concentrations in solution raised to stoichiometric powers at any non-equilibrium state.", category: "Solubility Product & Qualitative Analysis" },
  { term: "Isotonic Solution", definition: "Solutions possessing identical osmotic pressure and effective solute concentrations.", category: "Ionic Equilibrium & pH" },
  { term: "Le Chatelier's Principle", definition: "Principle stating a system shifts to counteract applied perturbations in T, P, V, or concentration.", category: "Le Chatelier & van 't Hoff" },
  { term: "Lewis Acid", definition: "An electron-pair acceptor possessing a vacant atomic orbital (e.g., BF₃, AlCl₃, Fe³⁺).", category: "Ionic Equilibrium & pH" },
  { term: "Lewis Base", definition: "An electron-pair donor possessing a non-bonding lone pair (e.g., NH₃, H₂O, CN⁻).", category: "Ionic Equilibrium & pH" },
  { term: "Ostwald's Dilution Law", definition: "Law stating degree of ionization (α = √(K_a / C)) of a weak electrolyte increases with dilution.", category: "Ionic Equilibrium & pH" },
  { term: "pH", definition: "The negative logarithm (base 10) of hydrogen ion activity/concentration: pH = -log₁₀[H⁺].", category: "Ionic Equilibrium & pH" },
  { term: "Polyprotic Acid", definition: "An acid capable of donating more than one proton per molecule in sequential dissociation steps (e.g., H₃PO₄).", category: "Ionic Equilibrium & pH" },
  { term: "Reaction Quotient (Q)", definition: "Concentration/pressure ratio calculated using current non-equilibrium values: Q < K (right), Q > K (left).", category: "Chemical Equilibrium" },
  { term: "Salting Out", definition: "Precipitation of a protein or organic compound from aqueous solution by adding a high concentration of neutral salt.", category: "Solubility Product & Qualitative Analysis" },
  { term: "Solubility Product (K_sp)", definition: "The equilibrium constant for the dissolution of a sparingly soluble salt in a saturated aqueous solution.", category: "Solubility Product & Qualitative Analysis" },
  { term: "Van 't Hoff Equation", definition: "Thermodynamic equation describing temperature dependence of equilibrium constant: d(ln K)/dT = ΔH° / (RT²).", category: "Le Chatelier & van 't Hoff" },
];

// ============================================================================
// 6. DATA: ALL 20 NEST ASSESSMENT QUESTIONS (MATCHING USER TEXT)
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
    question: "For the gaseous reversible synthesis of Ammonia: N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g), the equilibrium constant K_p = 1.44 × 10⁻⁵ bar⁻² at 500 K. What is the value of K_c for this reaction at 500 K in M⁻²? (R = 0.08314 bar·L/mol·K)",
    options: [
      { key: "A", text: "K_c = 2.45 × 10⁻² M⁻²" },
      { key: "B", text: "K_c = 1.44 × 10⁻⁵ M⁻²" },
      { key: "C", text: "K_c = 8.46 × 10⁻⁹ M⁻²" },
      { key: "D", text: "K_c = 0.0245 M⁻²" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "1. K_p = K_c (RT)^Δn_g ⟹ K_c = K_p (RT)^(-Δn_g). 2. Δn_g = 2 - (1 + 3) = -2. 3. RT = 0.08314 × 500 = 41.57 bar·L/mol. 4. K_c = (1.44 × 10⁻⁵) × (41.57)² = (1.44 × 10⁻⁵) × (1728.06) = 0.02488 M⁻² ≈ 2.45 × 10⁻² M⁻².",
  },
  {
    id: 2,
    part: "A",
    question: "At 25°C, the standard Gibbs free energy of formation of NO₂(g) is +51.3 kJ/mol and for N₂O₄(g) is +97.8 kJ/mol. What is the value of K_p at 298 K for the equilibrium reaction: 2 NO₂(g) ⇌ N₂O₄(g)? (R = 8.314 J/mol·K)",
    options: [
      { key: "A", text: "K_p = 6.93 bar⁻¹" },
      { key: "B", text: "K_p = 0.144 bar⁻¹" },
      { key: "C", text: "K_p = 1.00 bar⁻¹" },
      { key: "D", text: "K_p = 48.2 bar⁻¹" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "1. Δ_r G° = Δ_f G°(N₂O₄) - 2 Δ_f G°(NO₂) = 97.8 - 2(51.3) = 97.8 - 102.6 = -4.8 kJ/mol = -4800 J/mol. 2. ln K_p = -(-4800) / (8.314 × 298.15) = 1.936 ⟹ K_p = e^1.936 = 6.93 bar⁻¹.",
  },
  {
    id: 3,
    part: "A",
    question: "A 0.10 M aqueous solution of a weak monoprotic acid HA is 1.34% ionized at 25°C. What is the ionization constant (K_a) of this acid and the pH of the solution?",
    options: [
      { key: "A", text: "K_a = 1.8 × 10⁻⁵; pH = 2.87" },
      { key: "B", text: "K_a = 1.8 × 10⁻⁴; pH = 1.00" },
      { key: "C", text: "K_a = 1.34 × 10⁻³; pH = 3.50" },
      { key: "D", text: "K_a = 2.5 × 10⁻⁶; pH = 4.20" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "1. α = 1.34% = 0.0134. 2. K_a ≈ C α² = 0.10 × (0.0134)² = 1.795 × 10⁻⁵ ≈ 1.8 × 10⁻⁵. 3. [H⁺] = C α = 0.10 × 0.0134 = 1.34 × 10⁻³ M. 4. pH = -log₁₀(1.34 × 10⁻³) = 3 - 0.127 = 2.873 ≈ 2.87.",
  },
  {
    id: 4,
    part: "A",
    question: "Calculate the exact pH at 25°C of a 0.05 M aqueous solution of Sodium Acetate (CH₃COONa), given that the acid dissociation constant of Acetic acid is K_a = 1.8 × 10⁻⁵ and K_w = 1.0 × 10⁻¹⁴.",
    options: [
      { key: "A", text: "pH = 8.72" },
      { key: "B", text: "pH = 5.28" },
      { key: "C", text: "pH = 7.00" },
      { key: "D", text: "pH = 9.25" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "1. Salt of Weak Acid + Strong Base ⟹ Anionic hydrolysis. 2. pH = 1/2 [pK_w + pK_a + log₁₀ C] = 1/2 [14.00 + 4.745 + log₁₀(0.05)] = 1/2 [14.00 + 4.745 - 1.301] = 1/2 [17.444] = 8.722 ≈ 8.72.",
  },
  {
    id: 5,
    part: "A",
    question: "What is the pH of a buffer solution prepared by mixing 500 mL of 0.20 M CH₃COOH (pK_a = 4.74) with 500 mL of 0.10 M CH₃COONa?",
    options: [
      { key: "A", text: "pH = 4.44" },
      { key: "B", text: "pH = 5.04" },
      { key: "C", text: "pH = 4.74" },
      { key: "D", text: "pH = 3.74" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "1. Final concentrations in 1000 mL: [Acid] = 0.10 M, [Salt] = 0.05 M. 2. Henderson-Hasselbalch: pH = pK_a + log₁₀([Salt]/[Acid]) = 4.74 + log₁₀(0.05/0.10) = 4.74 + log₁₀(0.50) = 4.74 - 0.301 = 4.439 ≈ 4.44.",
  },
  {
    id: 6,
    part: "A",
    question: "At 25°C, the solubility product of Barium Sulfate (BaSO₄) is K_sp = 1.1 × 10⁻¹⁰. What is the molar solubility (S) of BaSO₄ in a 0.10 M aqueous solution of Sodium Sulfate (Na₂SO₄)?",
    options: [
      { key: "A", text: "S = 1.1 × 10⁻⁹ M" },
      { key: "B", text: "S = 1.05 × 10⁻⁵ M" },
      { key: "C", text: "S = 1.1 × 10⁻⁸ M" },
      { key: "D", text: "S = 2.2 × 10⁻¹⁰ M" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "In 0.10 M Na₂SO₄, [SO₄²⁻] ≈ 0.10 M (common ion). K_sp = [Ba²⁺][SO₄²⁻] = S × 0.10 = 1.1 × 10⁻¹⁰ ⟹ S = 1.1 × 10⁻¹⁰ / 0.10 = 1.1 × 10⁻⁹ M.",
  },
  {
    id: 7,
    part: "A",
    question: "For the thermal decomposition of Solid Ammonium Carbamate: NH₂COONH₄(s) ⇌ 2 NH₃(g) + CO₂(g), the total equilibrium pressure of the system at 300 K is 0.30 bar. What is the value of the equilibrium constant K_p in bar³?",
    options: [
      { key: "A", text: "K_p = 4.0 × 10⁻³ bar³" },
      { key: "B", text: "K_p = 1.08 × 10⁻² bar³" },
      { key: "C", text: "K_p = 2.7 × 10⁻³ bar³" },
      { key: "D", text: "K_p = 0.027 bar³" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "1. P_NH₃ = 2/3 P_total = 2/3(0.30) = 0.20 bar; P_CO₂ = 1/3 P_total = 1/3(0.30) = 0.10 bar. 2. K_p = (P_NH₃)² (P_CO₂) = (0.20)²(0.10) = 0.04 × 0.10 = 0.0040 bar³ = 4.0 × 10⁻³ bar³.",
  },
  {
    id: 8,
    part: "A",
    question: "What is the exact pH of a 1.0 × 10⁻⁸ M aqueous solution of Hydrochloric Acid (HCl) at 25°C, taking into account the auto-ionization of water?",
    options: [
      { key: "A", text: "pH = 8.00" },
      { key: "B", text: "pH = 6.96" },
      { key: "C", text: "pH = 7.00" },
      { key: "D", text: "pH = 6.00" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "1. Total [H⁺] = (10⁻⁸ + x) M. K_w = (10⁻⁸ + x)x = 10⁻¹⁴ ⟹ x² + 10⁻⁸ x - 10⁻¹⁴ = 0. 2. Solving quadratic: x = 9.61 × 10⁻⁸ M. 3. Total [H⁺] = 10⁻⁸ + 9.61 × 10⁻⁸ = 1.061 × 10⁻⁷ M ⟹ pH = -log₁₀(1.061 × 10⁻⁷) = 6.97 ≈ 6.96 (Acidic, <7!).",
  },
  {
    id: 9,
    part: "A",
    question: "Which of the following species represents a Lewis Acid that lacks an ionizable hydrogen atom?",
    options: [
      { key: "A", text: "BF₃" },
      { key: "B", text: "NH₃" },
      { key: "C", text: "CH₃COOH" },
      { key: "D", text: "OH⁻" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "BF₃ has an incomplete octet (6 valence e⁻ around Boron) with a vacant 2p-orbital. It acts as an electron-pair acceptor (Lewis Acid) without containing any hydrogen atoms.",
  },
  {
    id: 10,
    part: "A",
    question: "What is the solubility product (K_sp) expression for the sparingly soluble salt Calcium Phosphate Ca₃(PO₄)₂ in terms of its molar solubility S?",
    options: [
      { key: "A", text: "K_sp = 108 S⁵" },
      { key: "B", text: "K_sp = 27 S⁴" },
      { key: "C", text: "K_sp = 4 S³" },
      { key: "D", text: "K_sp = 6 S⁵" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "Ca₃(PO₄)₂ ⇌ 3 Ca²⁺ + 2 PO₄³⁻. [Ca²⁺] = 3S, [PO₄³⁻] = 2S. K_sp = (3S)³(2S)² = (27 S³)(4 S²) = 108 S⁵.",
  },
  {
    id: 11,
    part: "B",
    question: "Which of the following perturbations will cause a FORWARD SHIFT (toward products) for the exothermic gaseous synthesis of Ammonia: N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g) (Δ_r H° = -92 kJ/mol)? (Select all that apply)",
    options: [
      { key: "A", text: "Increasing the total system pressure by decreasing container volume" },
      { key: "B", text: "Lowering the reaction temperature" },
      { key: "C", text: "Continuously removing NH₃(g) product from the reactor" },
      { key: "D", text: "Adding an inert Argon gas at constant total volume" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A is correct: Δn_g = -2. Increasing pressure shifts to fewer gas moles (Forward). • B is correct: Exothermic (ΔH < 0); lowering T shifts forward. • C is correct: Removing product lowers Q below K. • D is incorrect: Inert gas at const V has zero effect.",
  },
  {
    id: 12,
    part: "B",
    question: "Select the correct options regarding Brønsted-Lowry Conjugate Acid-Base Pairs: (Select all that apply)",
    options: [
      { key: "A", text: "A conjugate acid-base pair differs strictly by a single proton (H⁺)" },
      { key: "B", text: "The conjugate base of a strong acid (e.g., Cl⁻ from HCl) is extremely weak" },
      { key: "C", text: "The conjugate acid of the amphiprotic bicarbonate ion (HCO₃⁻) is Carbonic Acid (H₂CO₃)" },
      { key: "D", text: "The conjugate base of the amphiprotic bicarbonate ion (HCO₃⁻) is Carbonate ion (CO₃²⁻)" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four statements accurately reflect Brønsted-Lowry acid-base pair definitions and amphiprotic transformations.",
  },
  {
    id: 13,
    part: "B",
    question: "Which of the following aqueous salt solutions will undergo HYDROLYSIS to produce a solution with pH > 7.0 at 25°C? (Select all that apply)",
    options: [
      { key: "A", text: "Sodium Acetate (CH₃COONa)" },
      { key: "B", text: "Potassium Cyanide (KCN)" },
      { key: "C", text: "Ammonium Chloride (NH₄Cl)" },
      { key: "D", text: "Sodium Carbonate (Na₂CO₃)" },
    ],
    correctKeys: ["A", "B", "D"],
    type: "multi",
    explanation: "• A, B, D are salts of Weak Acids and Strong Bases; their anions undergo anionic hydrolysis to yield OH⁻ (pH > 7). • C (NH₄Cl) is a salt of SA + WB producing acidic pH < 7.",
  },
  {
    id: 14,
    part: "B",
    question: "Select the valid options regarding Buffer Solutions and the Henderson-Hasselbalch equation: (Select all that apply)",
    options: [
      { key: "A", text: "An acidic buffer consists of a mixture of a weak acid and its salt with a strong base (e.g., CH₃COOH + CH₃COONa)" },
      { key: "B", text: "Maximum buffer capacity occurs when [Salt] = [Acid], at which point pH = pK_a" },
      { key: "C", text: "The effective buffering range of an acidic buffer is pK_a ± 1" },
      { key: "D", text: "Adding large volumes of pure water to a buffer solution permanently destroys its pH value" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct. • D is incorrect: Diluting a buffer changes [Salt] and [Acid] equally, so [Salt]/[Acid] remains constant, preserving the pH.",
  },
  {
    id: 15,
    part: "B",
    question: "Which of the following qualitative analysis group separations utilize the Common Ion Effect to control ion concentrations? (Select all that apply)",
    options: [
      { key: "A", text: "Group II cations (Cu²⁺, Pb²⁺, Cd²⁺) precipitated by H₂S in the presence of dilute HCl" },
      { key: "B", text: "Group IV cations (Zn²⁺, Mn²⁺, Ni²⁺) precipitated by H₂S in the presence of NH₄OH" },
      { key: "C", text: "Group I cations (Ag⁺, Pb²⁺) precipitated as chlorides using HCl" },
      { key: "D", text: "Group III cations (Fe³⁺, Al³⁺) precipitated as hydroxides using NH₄OH + NH₄Cl" },
    ],
    correctKeys: ["A", "B", "D"],
    type: "multi",
    explanation: "• A is correct (HCl suppresses H₂S via H⁺). • B is correct (NH₄OH drives H₂S ionization to precipitate Group IV). • D is correct (NH₄Cl suppresses NH₄OH via NH₄⁺ to precipitate Group III).",
  },
  {
    id: 16,
    part: "B",
    question: "Select the correct statements regarding the Temperature Dependence of Equilibrium Constants: (Select all that apply)",
    options: [
      { key: "A", text: "The van 't Hoff equation is ln(K₂/K₁) = (Δ_r H°/R) (1/T₁ - 1/T₂)" },
      { key: "B", text: "For an endothermic reaction (Δ_r H° > 0), K increases as temperature increases" },
      { key: "C", text: "For an exothermic reaction (Δ_r H° < 0), K decreases as temperature increases" },
      { key: "D", text: "Catalysts increase K at high temperatures and decrease K at low temperatures" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct. • D is incorrect: Catalysts NEVER alter K at any temperature.",
  },
  {
    id: 17,
    part: "B",
    question: "Which of the following diprotic or triprotic acid solutions exhibit successive ionization behavior where K_a1 ≫ K_a2 ≫ K_a3? (Select all that apply)",
    options: [
      { key: "A", text: "Phosphoric Acid (H₃PO₄)" },
      { key: "B", text: "Sulfurous Acid (H₂SO₃)" },
      { key: "C", text: "Carbonic Acid (H₂CO₃)" },
      { key: "D", text: "Hydrochloric Acid (HCl)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are polyprotic acids with K_a1 ≫ K_a2 ≫ K_a3. • D (HCl) is a monoprotic acid.",
  },
  {
    id: 18,
    part: "B",
    question: "Select the correct options regarding the solubility product (K_sp) and precipitation of sparingly soluble salts: (Select all that apply)",
    options: [
      { key: "A", text: "For Ag₂CrO₄, K_sp = 4 S³" },
      { key: "B", text: "For Al(OH)₃, K_sp = 27 S⁴" },
      { key: "C", text: "Precipitation occurs when the Ionic Product Q_sp > K_sp" },
      { key: "D", text: "Addition of a common ion increases the molar solubility S of a sparingly soluble salt" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct. • D is incorrect: Addition of a common ion DECREASES (suppresses) the molar solubility S.",
  },
  {
    id: 19,
    part: "B",
    question: "Which of the following species function as LEWIS BASES (electron-pair donors)? (Select all that apply)",
    options: [
      { key: "A", text: "Ammonia (NH₃)" },
      { key: "B", text: "Water (H₂O)" },
      { key: "C", text: "Cyanide anion (CN⁻)" },
      { key: "D", text: "Boron Trifluoride (BF₃)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C possess non-bonding lone pairs and act as Lewis bases. • D (BF₃) has an incomplete octet and acts as a Lewis Acid.",
  },
  {
    id: 20,
    part: "B",
    question: "Select the correct statements regarding the pH scale and auto-ionization of water: (Select all that apply)",
    options: [
      { key: "A", text: "pH = -log₁₀ [H⁺] and pOH = -log₁₀ [OH⁻]" },
      { key: "B", text: "At 25°C, pH + pOH = 14.00" },
      { key: "C", text: "As temperature increases above 25°C, K_w increases, so the pH of pure neutral water drops below 7.0" },
      { key: "D", text: "Pure water at 60°C (pH ≈ 6.5) is acidic because [H⁺] > [OH⁻]" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct. • D is incorrect: Pure water at 60°C is STILL NEUTRAL because [H⁺] = [OH⁻]. Neutrality means [H⁺] = [OH⁻], NOT strictly pH = 7.0.",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
type Tab = "mass-action" | "thermo" | "le-chatelier" | "ostwald" | "polyprotic" | "hydrolysis" | "buffers" | "ksp" | "traps" | "glossary" | "selftest";

export const EquilibriumDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("mass-action");
  const [activeTrapId, setActiveTrapId] = useState<string | null>(null);

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
    { id: "mass-action", label: "Mass Action & K_p/K_c", icon: <Scale className="w-3.5 h-3.5 shrink-0" /> },
    { id: "thermo", label: "Thermodynamics & van 't Hoff", icon: <Flame className="w-3.5 h-3.5 shrink-0" /> },
    { id: "le-chatelier", label: "Le Chatelier Shifts", icon: <Split className="w-3.5 h-3.5 shrink-0" /> },
    { id: "ostwald", label: "Ostwald & Acid-Base", icon: <Beaker className="w-3.5 h-3.5 shrink-0" /> },
    { id: "polyprotic", label: "Water K_w & Polyprotic", icon: <Activity className="w-3.5 h-3.5 shrink-0" /> },
    { id: "hydrolysis", label: "Salt Hydrolysis", icon: <Droplets className="w-3.5 h-3.5 shrink-0" /> },
    { id: "buffers", label: "Buffers & Henderson", icon: <Shield className="w-3.5 h-3.5 shrink-0" /> },
    { id: "ksp", label: "K_sp & Qualitative Groups", icon: <Boxes className="w-3.5 h-3.5 shrink-0" /> },
    { id: "traps", label: "10 NEST Traps", icon: <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> },
    { id: "glossary", label: "Master Glossary", icon: <BookOpen className="w-3.5 h-3.5 shrink-0" /> },
    { id: "selftest", label: "NEST 20-Q Test", icon: <Award className="w-3.5 h-3.5 shrink-0" /> },
  ];

  return (
    <div className="my-4 sm:my-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-slate-50 to-emerald-50/20 border border-slate-200/90 p-2.5 sm:p-7 shadow-xs space-y-4 sm:space-y-6 select-none w-full">

      {/* HEADER */}
      <div className="flex flex-col items-center text-center space-y-2.5 max-w-2xl mx-auto w-full">
        <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-200 shadow-2xs flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          CHEMISTRY INTERACTIVE MODULE — CHAPTER 6
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 shrink-0" />
            EQUILIBRIUM – CHEMICAL AND IONIC
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            Mass Action · van 't Hoff Isochore · Le Chatelier Matrix · Ostwald Dilution · Water Autoprotolysis · Salt Hydrolysis · Henderson Buffers · K_sp Qualitative Groups · NEST 20-Q Module
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

      {/* TAB 1: MASS ACTION & KP/KC */}
      {activeTab === "mass-action" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-600 shrink-0" />
              Dynamic Equilibrium Kinetics &amp; The Law of Mass Action
            </h4>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <code className="text-xs sm:text-sm font-mono font-black text-emerald-950 block">K_p = K_c (RT)^Δn_g  |  K_p = K_x (P_total)^Δn_g</code>
              <code className="text-xs font-mono font-bold text-emerald-800 block mt-1">Heterogeneous Rule: Pure solids &amp; liquids have activity = 1.0 (Excluded from K)</code>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Δn_g = 0</span>
                <code className="text-[10px] font-mono font-bold text-emerald-700 block">K_p = K_c = K_x (Dimensionless)</code>
                <p className="text-[10px] text-slate-600">e.g., H₂ + I₂ ⇌ 2 HI</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Δn_g &gt; 0</span>
                <code className="text-[10px] font-mono font-bold text-emerald-700 block">K_p &gt; K_c (Units: bar^Δn_g)</code>
                <p className="text-[10px] text-slate-600">e.g., PCl₅ ⇌ PCl₃ + Cl₂</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Δn_g &lt; 0</span>
                <code className="text-[10px] font-mono font-bold text-emerald-700 block">K_p &lt; K_c</code>
                <p className="text-[10px] text-slate-600">e.g., N₂ + 3 H₂ ⇌ 2 NH₃</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: THERMO & VAN 'T HOFF */}
      {activeTab === "thermo" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-600 shrink-0" />
              Thermodynamics of Equilibrium (Δ_r G°) &amp; van 't Hoff Equation
            </h4>
            <div className="p-3 rounded-xl bg-orange-50 border border-orange-200">
              <code className="text-xs sm:text-sm font-mono font-black text-orange-950 block">Δ_r G° = -RT ln K = -2.303 RT log₁₀ K  |  K = e^(-Δ_r G° / RT)</code>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Δ_r G° &lt; 0 ⟹ K &gt; 1</span>
                <p className="text-[10px] text-slate-700 font-semibold">Products favored at equilibrium (Exergonic).</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Δ_r G° = 0 ⟹ K = 1</span>
                <p className="text-[10px] text-slate-700 font-semibold">Reactants and products present in equal ratio.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Δ_r G° &gt; 0 ⟹ K &lt; 1</span>
                <p className="text-[10px] text-slate-700 font-semibold">Reactants favored at equilibrium (Endergonic).</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-black text-slate-900 block">van 't Hoff Temperature Isochore</span>
              <code className="text-xs font-mono font-black text-indigo-900 block">log₁₀(K₂ / K₁) = (Δ_r H° / 2.303 R) [ (T₂ - T₁) / (T₁ T₂) ]</code>
              <p className="text-[10px] text-slate-600 mt-1">Endothermic (ΔH &gt; 0) ⟹ K increases with T. Exothermic (ΔH &lt; 0) ⟹ K decreases with T.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LE CHATELIER SHIFTS */}
      {activeTab === "le-chatelier" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Split className="w-4 h-4 text-indigo-600 shrink-0" />
              Le Chatelier's Principle Perturbation Matrix
            </h4>
            <div className="space-y-1.5">
              {leChatelierMatrix.map((row, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 gap-1 text-[10px]">
                  <div className="sm:w-1/4">
                    <span className="font-bold text-slate-900">{row.factor}</span>
                  </div>
                  <div className="sm:w-1/3">
                    <span className="font-black text-indigo-800">{row.shift}</span>
                  </div>
                  <div className="sm:w-5/12 sm:text-right text-slate-600 font-semibold">
                    {row.cause} | <span className="font-bold text-slate-800">{row.effectOnK}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: OSTWALD & ACID-BASE */}
      {activeTab === "ostwald" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Beaker className="w-4 h-4 text-teal-600 shrink-0" />
              Acid-Base Theories &amp; Ostwald's Dilution Law
            </h4>
            <div className="p-3 rounded-xl bg-teal-50 border border-teal-200">
              <code className="text-xs sm:text-sm font-mono font-black text-teal-950 block">Ostwald's Law: α = √(K_a / C)  |  [H⁺] = Cα = √(K_a C)  |  pH = 1/2 [pK_a - log₁₀ C]</code>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Arrhenius</span>
                <p className="text-[10px] text-slate-700">H⁺ in water (Acid) / OH⁻ in water (Base).</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Brønsted-Lowry</span>
                <p className="text-[10px] text-slate-700">Proton H⁺ Donor (Acid) / Acceptor (Base). Conjugate pairs!</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Lewis</span>
                <p className="text-[10px] text-slate-700">Electron-Pair Acceptor (Acid, BF₃) / Donor (Base, NH₃).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: WATER KW & POLYPROTIC */}
      {activeTab === "polyprotic" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-600 shrink-0" />
              Autoprotolysis of Water (K_w) &amp; Polyprotic Acids
            </h4>
            <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200">
              <code className="text-xs sm:text-sm font-mono font-black text-cyan-950 block">K_w = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 25°C  |  pH + pOH = 14.00</code>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Temperature Dependence of K_w</span>
                <p className="text-[10px] text-slate-700 font-semibold">
                  Endothermic autoionization ⟹ At 60°C, K_w ≈ 10⁻¹³ ⟹ Neutral pH = 6.5 (Water remains strictly neutral because [H⁺] = [OH⁻]!).
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Polyprotic Acids (H₃PO₄, H₂A)</span>
                <code className="text-[10px] font-mono font-bold text-cyan-800 block">K_a1 ≫ K_a2 ≫ K_a3  |  [A²⁻] ≈ K_a2</code>
                <p className="text-[10px] text-slate-700 font-semibold">Divalent anion concentration is independent of initial concentration C!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: SALT HYDROLYSIS */}
      {activeTab === "hydrolysis" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-emerald-600 shrink-0" />
              Salt Hydrolysis Comprehensive Derivation Matrix
            </h4>
            <div className="space-y-1.5">
              {hydrolysisMatrix.map((h, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900">{h.category}</span>
                    <span className="font-mono font-black text-emerald-700">{h.phFormula}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-600 font-semibold">
                    <span>Hydrolyzing Ion: {h.ion}</span>
                    <span className="font-mono text-indigo-700">{h.kh}</span>
                    <span className="font-bold text-slate-800">{h.nature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: BUFFERS & HENDERSON */}
      {activeTab === "buffers" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-600 shrink-0" />
              Buffer Solutions &amp; Henderson-Hasselbalch Equations
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                <span className="text-xs font-black text-purple-950 block">Acidic Buffer (CH₃COOH + CH₃COONa)</span>
                <code className="text-xs font-mono font-black text-purple-900 block">pH = pK_a + log₁₀([Salt] / [Acid])</code>
                <p className="text-[10px] text-slate-700 font-semibold">Max capacity at [Salt] = [Acid] ⟹ pH = pK_a. Range: pK_a ± 1.</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                <span className="text-xs font-black text-purple-950 block">Basic Buffer (NH₄OH + NH₄Cl)</span>
                <code className="text-xs font-mono font-black text-purple-900 block">pOH = pK_b + log₁₀([Salt] / [Base]) ⟹ pH = 14 - pOH</code>
                <p className="text-[10px] text-slate-700 font-semibold">Max capacity at [Salt] = [Base] ⟹ pOH = pK_b.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: KSP & QUALITATIVE GROUPS */}
      {activeTab === "ksp" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Boxes className="w-4 h-4 text-amber-600 shrink-0" />
              Solubility Product (K_sp) &amp; Qualitative Group Separations
            </h4>
            <div className="space-y-1.5">
              {kspMatrix.map((k, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 gap-1 text-[10px]">
                  <span className="font-black text-slate-900 sm:w-1/4">{k.saltType}</span>
                  <code className="font-mono font-black text-amber-800 sm:w-1/4">{k.kspExpression}</code>
                  <code className="font-mono font-bold text-indigo-700 sm:w-1/4">{k.solubilityS}</code>
                  <span className="text-slate-600 sm:w-1/4 sm:text-right font-semibold">{k.examples}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Group II Separation (Cu²⁺, Pb²⁺, Cd²⁺)</span>
                <p className="text-[10px] text-slate-700 font-semibold">Reagent: H₂S + dilute HCl. HCl common ion H⁺ keeps [S²⁻] LOW to precipitate only small-K_sp Group II sulfides.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Group IV Separation (Zn²⁺, Mn²⁺, Ni²⁺)</span>
                <p className="text-[10px] text-slate-700 font-semibold">Reagent: H₂S + NH₄OH + NH₄Cl. NH₄OH neutralizes H⁺ to make [S²⁻] HIGH, precipitating larger-K_sp Group IV sulfides.</p>
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
              All 10 High-Yield NEST Equilibrium Misconceptions &amp; Traps
            </h4>
            <div className="space-y-2">
              {equilibriumTraps.map((trap) => {
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
                          <span className="text-[9px] font-black uppercase text-amber-700 tracking-wider block">Chemical Reality</span>
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
                placeholder="Search 30 equilibrium glossary terms..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {["All", "Chemical Equilibrium", "Le Chatelier & van 't Hoff", "Ionic Equilibrium & pH", "Buffer Solutions & Hydrolysis", "Solubility Product & Qualitative Analysis"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGlossaryCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                    glossaryCategory === cat ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
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
                {score >= 17 ? "Outstanding! Mastery level for NEST & IChO Equilibrium." : score >= 12 ? "Good performance — review incorrect explanations." : "Needs practice — revisit earlier tabs and retake."}
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
                        testPartFilter === part ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-600 border-slate-200"
                      }`}
                    >
                      {part === "ALL" ? "All 20 Questions" : part === "A" ? "Part A (Single MCQ)" : "Part B (Multi MSQ)"}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="flex-1 sm:w-36 h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${((currentQ + 1) / mcqData.length) * 100}%` }} />
                  </div>
                  <span className="text-[10px] font-black text-slate-700">Q{currentQ + 1} of {mcqData.length}</span>
                </div>
              </div>

              <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    {currentMCQ.id}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-slate-100 text-slate-700">
                        Part {currentMCQ.part}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                        currentMCQ.type === "multi" ? "bg-purple-100 text-purple-800" : "bg-emerald-100 text-emerald-800"
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
                      bg = "bg-emerald-50 border-emerald-400";
                    }

                    return (
                      <button key={opt.key} onClick={() => toggleAnswer(currentQ, opt.key, currentMCQ.type)} className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl border-2 text-left transition-all ${bg}`}>
                        <span className={`w-5 h-5 rounded shrink-0 border-2 flex items-center justify-center text-[10px] font-black transition-all ${
                          isSubmitted && isCorrect ? "bg-emerald-600 border-emerald-600 text-white" : isSubmitted && isSelected && !isCorrect ? "bg-rose-600 border-rose-600 text-white" : isSelected ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300 text-slate-500"
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
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="text-[9px] font-black uppercase tracking-wider text-emerald-700">Detailed Solution &amp; Math Explanation</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 leading-relaxed">{currentMCQ.explanation}</p>
                  </div>
                )}

                <div className="flex items-center gap-2 flex-wrap">
                  {!submitted[currentQ] ? (
                    <button onClick={() => submitAnswer(currentQ)} disabled={!(selectedAnswers[currentQ]?.length)} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-black hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all">Submit Answer</button>
                  ) : null}
                  {currentQ < mcqData.length - 1 && (
                    <button onClick={() => setCurrentQ((q) => q + 1)} className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-black hover:bg-slate-700 transition-all flex items-center gap-1.5">
                      Next Question <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {currentQ === mcqData.length - 1 && submitted[currentQ] && (
                    <button onClick={computeScore} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-black hover:bg-emerald-700 transition-all flex items-center gap-1.5">
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
                      i === currentQ ? "bg-emerald-600 text-white border-emerald-600" : isDone ? isCorrect ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-rose-100 text-rose-800 border-rose-300" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
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

export default EquilibriumDiagram;
