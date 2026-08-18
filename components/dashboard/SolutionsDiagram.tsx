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
} from "lucide-react";

// ============================================================================
// 1. DATA: CONCENTRATION INTERCONVERSION MATRIX
// ============================================================================
interface ConcTerm {
  name: string;
  formula: string;
  type: "Temp-Dependent (Volume)" | "Temp-Independent (Mass)";
  units: string;
  note: string;
}

const concMatrix: ConcTerm[] = [
  { name: "Molarity (M)", formula: "M = n_B / V_soln(L)", type: "Temp-Dependent (Volume)", units: "mol/L", note: "Decreases as temperature increases due to liquid thermal expansion" },
  { name: "Molality (m)", formula: "m = n_B / w_A(kg)", type: "Temp-Independent (Mass)", units: "mol/kg", note: "Strictly temperature-invariant; preferred for colligative properties" },
  { name: "Mole Fraction (x_i)", formula: "x_i = n_i / Σ n_total", type: "Temp-Independent (Mass)", units: "Dimensionless", note: "Sum of mole fractions in solution is always 1.0 (x_A + x_B = 1)" },
  { name: "Normality (N)", formula: "N = Equivalents_B / V_soln(L)", type: "Temp-Dependent (Volume)", units: "eq/L", note: "N = M × n-factor (Valency factor / redox change)" },
  { name: "Mass Percentage (% w/w)", formula: "% w/w = (w_B / w_soln) × 100", type: "Temp-Independent (Mass)", units: "%", note: "Temperature-independent mass fraction" },
  { name: "Parts Per Million (ppm)", formula: "ppm = (w_B / w_soln) × 10⁶", type: "Temp-Independent (Mass)", units: "ppm", note: "Used for trace pollutants and water hardness" },
];

// ============================================================================
// 2. DATA: IDEAL VS NON-IDEAL AZEOTROPES
// ============================================================================
interface SolutionDev {
  type: string;
  intermolecular: string;
  thermo: string;
  azeotrope: string;
  examples: string;
}

const deviationMatrix: SolutionDev[] = [
  { type: "Ideal Solution", intermolecular: "A-B = A-A = B-B (Equal forces)", thermo: "Δ_mix H = 0, Δ_mix V = 0, Δ_mix S > 0, Δ_mix G < 0", azeotrope: "No azeotrope formed (separable by fractional distillation)", examples: "Benzene + Toluene; n-Hexane + n-Heptane; Bromoethane + Chloroethane" },
  { type: "Positive Deviation", intermolecular: "A-B < A-A / B-B (Weaker attraction)", thermo: "Δ_mix H > 0 (Endothermic), Δ_mix V > 0 (Expansion), P_total > Ideal", azeotrope: "Minimum Boiling Azeotrope (Boils lower than pure components)", examples: "Ethanol (95.6%) + Water (4.4%) [B.P. = 351.15 K]; Acetone + CS₂" },
  { type: "Negative Deviation", intermolecular: "A-B > A-A / B-B (Stronger attraction / H-bonds)", thermo: "Δ_mix H < 0 (Exothermic), Δ_mix V < 0 (Contraction), P_total < Ideal", azeotrope: "Maximum Boiling Azeotrope (Boils higher than pure components)", examples: "Nitric Acid (68%) + Water (32%) [B.P. = 393.5 K]; Acetone + Chloroform" },
];

// ============================================================================
// 3. DATA: 4 COLLIGATIVE PROPERTIES MATRIX
// ============================================================================
interface ColligativeProp {
  name: string;
  formula: string;
  thermoConstant: string;
  keyApplication: string;
}

const colligativeMatrix: ColligativeProp[] = [
  { name: "Relative Lowering of Vapor Pressure (RLVP)", formula: "(p°_A - p_A) / p°_A = x_B = (w_B × M_A) / (M_B × w_A)", thermoConstant: "None (governed by Raoult's Law)", keyApplication: "Ostwald-Walker dynamic method for molecular mass determination" },
  { name: "Elevation of Boiling Point (ΔT_b)", formula: "ΔT_b = T_b - T°_b = K_b × m = K_b × (w_B × 1000) / (M_B × w_A in g)", thermoConstant: "K_b = (R × M_A × (T°_b)²) / (1000 × Δ_vap H) [K·kg/mol]", keyApplication: "Landsberger / Cottrell ebullioscopy for non-volatile solutes" },
  { name: "Depression of Freezing Point (ΔT_f)", formula: "ΔT_f = T°_f - T_f = K_f × m = K_f × (w_B × 1000) / (M_B × w_A in g)", thermoConstant: "K_f = (R × M_A × (T°_f)²) / (1000 × Δ_fus H) [K·kg/mol]", keyApplication: "Automobile antifreeze (Ethylene glycol); Road de-icing with CaCl₂" },
  { name: "Osmotic Pressure (Π)", formula: "Π = C R T = (w_B × R × T) / (M_B × V in L)", thermoConstant: "R = 0.0821 L·atm/mol·K", keyApplication: "Gold standard for proteins, polymers, and biomolecules at room temp" },
];

// ============================================================================
// 4. DATA: 10 NEST MISCONCEPTIONS & TRAPS
// ============================================================================
interface Misconception {
  id: string;
  trap: string;
  reality: string;
  tip: string;
}

const solutionTraps: Misconception[] = [
  { id: "t1", trap: "Henry's Law constant K_H increases as gas solubility increases.", reality: "Higher K_H indicates LOWER gas solubility at a given partial pressure (x = p / K_H). K_H increases with temperature.", tip: "As T rises, K_H increases and gases escape from water." },
  { id: "t2", trap: "A 95.6% ethanol and 4.4% water mixture can be purified to 100% ethanol by fractional distillation.", reality: "It forms a MINIMUM BOILING AZEOTROPE with identical liquid and vapor compositions (x_i = y_i). Cannot be separated by distillation.", tip: "Azeotropes boil at constant temperature without composition changes." },
  { id: "t3", trap: "Adding a non-volatile solute increases the freezing point of a solvent.", reality: "Non-volatile solutes ALWAYS DEPRESS the freezing point (ΔT_f = T°_f - T_f > 0). Solutions freeze at lower temperatures.", tip: "Freezing point decreases; Boiling point increases." },
  { id: "t4", trap: "The Van 't Hoff factor i for complete ionization of BaCl₂ is 2.", reality: "BaCl₂ → Ba²⁺ + 2Cl⁻ ⟹ n = 3 ions per formula unit. For complete dissociation (α=1.0), i = 3.", tip: "Count ALL cations and anions produced per formula unit." },
  { id: "t5", trap: "0.1 M Glucose, 0.1 M NaCl, and 0.1 M CaCl₂ have identical freezing point depressions.", reality: "Colligative effect ∝ i · C. CaCl₂ (i=3) > NaCl (i=2) > Glucose (i=1). CaCl₂ has the highest ΔT_f and lowest freezing point.", tip: "Multiply molarity by the Van 't Hoff factor i." },
  { id: "t6", trap: "Osmotic pressure can be calculated accurately using molality (m).", reality: "Osmotic pressure is defined using MOLARITY (M / C): Π = i C R T. Molarity is easy to prepare accurately at constant room temperature.", tip: "Π uses molar concentration (mol/L)." },
  { id: "t7", trap: "Reverse Osmosis occurs when applied external pressure is less than osmotic pressure.", reality: "Reverse Osmosis requires applied external pressure GREATER than osmotic pressure (P > Π) to force pure water backward across the SPM.", tip: "P > Π reverses natural osmotic flow." },
  { id: "t8", trap: "Mixing Acetone and Chloroform forms a non-ideal solution with positive deviation.", reality: "Acetone + Chloroform forms intermolecular H-bonds (C-H···O=C), giving NEGATIVE DEVIATION (Δ_mix H < 0, Maximum Boiling Azeotrope).", tip: "New H-bonds mean stronger A-B attraction ⟹ negative deviation." },
  { id: "t9", trap: "Molarity of a solution remains constant when heated from 20°C to 80°C.", reality: "Molarity DECREASES as temperature rises because solution volume expands (M = n/V). Molality and mole fraction remain invariant.", tip: "Volume expands with temperature; mass is invariant." },
  { id: "t10", trap: "Relative Lowering of Vapor Pressure (Δp / p°) is equal to the mole fraction of solvent.", reality: "RLVP is equal to the MOLE FRACTION OF SOLUTE (x_B): (p°_A - p_A) / p°_A = x_B.", tip: "Lowering is caused by solute particles occupying surface sites." },
];

// ============================================================================
// 5. DATA: MASTER GLOSSARY (34 DEFINITIONS)
// ============================================================================
interface GlossaryTerm {
  term: string;
  definition: string;
  category: "Concentration & Henry's Law" | "Raoult's Law & Azeotropes" | "Colligative Properties" | "Van 't Hoff & Tonicity";
}

const masterGlossary: GlossaryTerm[] = [
  { term: "Abnormal Molar Mass", definition: "Experimental molar mass determined via colligative properties that differs from theoretical mass due to solute dissociation (i > 1) or association (i < 1).", category: "Van 't Hoff & Tonicity" },
  { term: "Azeotrope (Constant Boiling Mixture)", definition: "A binary liquid mixture that boils at a constant temperature without changing composition between liquid and vapor phases (x_i = y_i).", category: "Raoult's Law & Azeotropes" },
  { term: "Colligative Property", definition: "A physical property of dilute solutions depending strictly on the number of dissolved solute particles, independent of their chemical nature (RLVP, ΔT_b, ΔT_f, Π).", category: "Colligative Properties" },
  { term: "Crenation", definition: "Shrinkage and crenating of red blood cells placed in a hypertonic solution (Π_soln > Π_cell) as water flows osmotically out.", category: "Van 't Hoff & Tonicity" },
  { term: "Cryoscopic Constant (K_f)", definition: "Molal freezing point depression constant characteristic of a solvent (K_f = R M_A (T°_f)² / (1000 Δ_fus H)).", category: "Colligative Properties" },
  { term: "Decompression Sickness (Bends)", definition: "Painful condition caused by N₂ gas bubble formation in blood capillaries during rapid underwater ascent, prevented by diluting scuba tanks with 11.7% Helium.", category: "Concentration & Henry's Law" },
  { term: "Degree of Association (β)", definition: "The fraction of total solute molecules that associate into dimeric or polymeric complexes in solution (β = 2(1-i) for dimers).", category: "Van 't Hoff & Tonicity" },
  { term: "Degree of Dissociation (α)", definition: "The fraction of total electrolyte molecules that dissociate into free ions in solution (α = (i - 1) / (n - 1)).", category: "Van 't Hoff & Tonicity" },
  { term: "Ebullioscopic Constant (K_b)", definition: "Molal boiling point elevation constant characteristic of a solvent (K_b = R M_A (T°_b)² / (1000 Δ_vap H)).", category: "Colligative Properties" },
  { term: "Eutectic Mixture", definition: "A solid solution mixture of two or more substances that melts simultaneously at a single lowest temperature.", category: "Concentration & Henry's Law" },
  { term: "Hemolysis", definition: "Swelling and osmotic bursting of red blood cells placed in a hypotonic solution (Π_soln < Π_cell) as water flows into the cell.", category: "Van 't Hoff & Tonicity" },
  { term: "Henry’s Law", definition: "Principle stating gas solubility in a liquid is directly proportional to gas partial pressure above the liquid (p = K_H · x).", category: "Concentration & Henry's Law" },
  { term: "Hypertonic Solution", definition: "A solution possessing a higher osmotic pressure than reference cellular fluid (causes cell crenation).", category: "Van 't Hoff & Tonicity" },
  { term: "Hypotonic Solution", definition: "A solution possessing a lower osmotic pressure than reference cellular fluid (causes cell hemolysis).", category: "Van 't Hoff & Tonicity" },
  { term: "Ideal Solution", definition: "A solution obeying Raoult’s Law over the entire concentration range with Δ_mix H = 0 and Δ_mix V = 0.", category: "Raoult's Law & Azeotropes" },
  { term: "Isotonic Solution", definition: "Solutions possessing identical osmotic pressures (Π₁ = Π₂). 0.9% (w/v) NaCl is isotonic with human RBCs.", category: "Van 't Hoff & Tonicity" },
  { term: "Maximum Boiling Azeotrope", definition: "An azeotropic mixture exhibiting negative deviations from Raoult’s Law that boils at a temperature higher than either pure component (68% HNO₃ + 32% H₂O).", category: "Raoult's Law & Azeotropes" },
  { term: "Minimum Boiling Azeotrope", definition: "An azeotropic mixture exhibiting positive deviations from Raoult’s Law that boils at a temperature lower than either pure component (95.6% Ethanol + 4.4% H₂O).", category: "Raoult's Law & Azeotropes" },
  { term: "Molality (m)", definition: "Concentration expressed as moles of solute per kilogram of solvent (mol/kg); strictly temperature-independent.", category: "Concentration & Henry's Law" },
  { term: "Molarity (M)", definition: "Concentration expressed as moles of solute per liter of solution (mol/L); decreases as temperature rises.", category: "Concentration & Henry's Law" },
  { term: "Mole Fraction (x_i)", definition: "Dimensionless ratio of moles of a specific component to total moles in a solution (x_A + x_B = 1).", category: "Concentration & Henry's Law" },
  { term: "Osmosis", definition: "Spontaneous passage of solvent molecules across a semi-permeable membrane into a concentrated solution.", category: "Colligative Properties" },
  { term: "Osmotic Pressure (Π)", definition: "The exact hydrostatic pressure applied to a concentrated solution to prevent inward osmotic solvent flow across an SPM (Π = i C R T).", category: "Colligative Properties" },
  { term: "Raoult’s Law", definition: "Principle stating partial vapor pressure of a volatile component equals pure component vapor pressure multiplied by its mole fraction (p_A = p°_A x_A).", category: "Raoult's Law & Azeotropes" },
  { term: "Relative Lowering of Vapor Pressure (RLVP)", definition: "Ratio of vapor pressure lowering to pure solvent vapor pressure, equal to solute mole fraction (Δp / p° = x_B).", category: "Colligative Properties" },
  { term: "Reverse Osmosis (RO)", definition: "Forced solvent transport backward across an SPM from concentrated solution to pure solvent under external pressure P > Π.", category: "Colligative Properties" },
  { term: "Semi-Permeable Membrane (SPM)", definition: "A membrane permitting passive passage of small solvent molecules while blocking solute particles (e.g., Cellulose Acetate).", category: "Colligative Properties" },
  { term: "Van 't Hoff Factor (i)", definition: "Ratio of observed colligative property to theoretical ideal property (i = Observed / Ideal = M_calc / M_obs).", category: "Van 't Hoff & Tonicity" },
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
    question: "An aqueous solution of a non-volatile non-electrolyte solute is prepared. The solution freezes at -0.372°C. What is the elevation in boiling point (ΔT_b) for this identical solution? (K_f for water = 1.86 K·kg/mol; K_b for water = 0.512 K·kg/mol)",
    options: [
      { key: "A", text: "ΔT_b = 0.1024 K" },
      { key: "B", text: "ΔT_b = 0.3720 K" },
      { key: "C", text: "ΔT_b = 0.0512 K" },
      { key: "D", text: "ΔT_b = 0.2048 K" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "ΔT_f = 0.372 K. Molality m = 0.372 / 1.86 = 0.20 m. ΔT_b = K_b · m = 0.512 × 0.20 = 0.1024 K.",
  },
  {
    id: 2,
    part: "A",
    question: "At 300 K, the vapor pressure of pure liquid Benzene (C₆H₆, M_A = 78 g/mol) is 100 mmHg and pure liquid Toluene (C₇H₈, M_B = 92 g/mol) is 40 mmHg. An ideal solution is prepared by mixing 78 g of Benzene and 92 g of Toluene. What is the mole fraction of Benzene in the EQUILIBRIUM VAPOR PHASE (y_Benzene) above this solution?",
    options: [
      { key: "A", text: "y_Benzene = 0.50" },
      { key: "B", text: "y_Benzene = 0.714" },
      { key: "C", text: "y_Benzene = 0.286" },
      { key: "D", text: "y_Benzene = 0.833" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "n_A = 1.0 mol, n_B = 1.0 mol ⟹ x_A = 0.50, x_B = 0.50. p_A = 50 mmHg, p_B = 20 mmHg. P_total = 70 mmHg. y_A = 50 / 70 = 0.7142 ≈ 0.714.",
  },
  {
    id: 3,
    part: "A",
    question: "A 0.01 M aqueous solution of Potassium Ferricyanide K₃[Fe(CN)₆] exhibits an osmotic pressure of 0.885 atm at 300 K. What is the experimental Van 't Hoff factor (i) and the percentage degree of dissociation (α) of the complex salt? (R = 0.0821 L·atm/mol·K)",
    options: [
      { key: "A", text: "i = 3.59; α = 86.3%" },
      { key: "B", text: "i = 4.00; α = 100.0%" },
      { key: "C", text: "i = 2.50; α = 50.0%" },
      { key: "D", text: "i = 3.00; α = 66.7%" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "Π_ideal = 0.01 × 0.0821 × 300 = 0.2463 atm. i = 0.885 / 0.2463 = 3.593. n = 4. α = (3.593 - 1) / (4 - 1) = 2.593 / 3 = 86.4% ≈ 86.3%.",
  },
  {
    id: 4,
    part: "A",
    question: "Benzoic Acid (C₆H₅COOH, M = 122 g/mol) associates into dimeric molecules when dissolved in non-polar Benzene solvent. If 12.2 g of benzoic acid dissolved in 100 g of benzene depresses the freezing point by 2.60 K, what is the degree of association (β) of benzoic acid? (K_f for benzene = 5.12 K·kg/mol)",
    options: [
      { key: "A", text: "β = 0.492 (49.2%)" },
      { key: "B", text: "β = 0.984 (98.4%)" },
      { key: "C", text: "β = 0.250 (25.0%)" },
      { key: "D", text: "β = 0.750 (75.0%)" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "m = (12.2 / 122) / 0.10 = 1.0 m. ΔT_f,ideal = 5.12 × 1.0 = 5.12 K. i = 2.60 / 5.12 = 0.5078. Dimerization β = 2(1 - i) = 2(1 - 0.5078) = 0.984 (98.4%).",
  },
  {
    id: 5,
    part: "A",
    question: "Henry's Law constant for Nitrogen gas (N₂) in water at 293 K is K_H = 7.64 × 10⁴ bar. If atmospheric air contains 80 mol % N₂ at a total pressure of 1.0 bar, how many millimoles (mmol) of N₂ will dissolve in 10 moles of water at 293 K?",
    options: [
      { key: "A", text: "0.105 mmol" },
      { key: "B", text: "1.05 mmol" },
      { key: "C", text: "0.0105 mmol" },
      { key: "D", text: "7.64 mmol" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "p_N2 = 0.80 bar. x_N2 = 0.80 / (7.64 × 10⁴) = 1.047 × 10⁻⁵. n_N2 = 1.047 × 10⁻⁵ × 10 = 1.047 × 10⁻⁴ mol = 0.1047 mmol ≈ 0.105 mmol.",
  },
  {
    id: 6,
    part: "A",
    question: "What happens to human Red Blood Cells (RBCs) when placed in a 1.5% (w/v) aqueous Sodium Chloride (NaCl) solution?",
    options: [
      { key: "A", text: "The solution is hypotonic; RBCs absorb water and burst (Hemolysis)." },
      { key: "B", text: "The solution is hypertonic; RBCs lose water osmotically and shrink (Crenation)." },
      { key: "C", text: "The solution is isotonic; RBCs remain structurally unchanged." },
      { key: "D", text: "Sodium chloride enters the RBCs by active transport, dissolving the nucleus." },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Human RBCs are isotonic with 0.9% NaCl. 1.5% NaCl is hypertonic, causing water to leave the cell and crenate (shrink).",
  },
  {
    id: 7,
    part: "A",
    question: "An ideal binary liquid solution of A (p°_A = 400 mmHg) and B (p°_B = 600 mmHg) is prepared. If the total vapor pressure of the mixture at equilibrium is P_total = 480 mmHg, what is the mole fraction of component A in the LIQUID phase (x_A) and in the VAPOR phase (y_A)?",
    options: [
      { key: "A", text: "x_A = 0.60; y_A = 0.50" },
      { key: "B", text: "x_A = 0.40; y_A = 0.60" },
      { key: "C", text: "x_A = 0.60; y_A = 0.33" },
      { key: "D", text: "x_A = 0.50; y_A = 0.50" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "480 = 400 x_A + 600(1 - x_A) ⟹ 200 x_A = 120 ⟹ x_A = 0.60. p_A = 240 mmHg. y_A = 240 / 480 = 0.50.",
  },
  {
    id: 8,
    part: "A",
    question: "Which non-ideal binary solution mixture forms a MAXIMUM BOILING AZEOTROPE due to strong negative deviations (Δ_mix H < 0, Δ_mix V < 0) from Raoult's Law?",
    options: [
      { key: "A", text: "Ethanol + Water (95.6% ethanol)" },
      { key: "B", text: "Nitric Acid (68%) + Water (32%)" },
      { key: "C", text: "Acetone + Carbon Disulfide" },
      { key: "D", text: "n-Hexane + n-Heptane" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Nitric acid (68%) + Water (32%) forms strong inter-molecular H-bonds, exhibiting negative deviations and boiling as a Maximum Boiling Azeotrope at 393.5 K.",
  },
  {
    id: 9,
    part: "A",
    question: "What is the approximate freezing point (T_f) of a 0.10 m aqueous solution of Barium Chloride (BaCl₂), assuming complete 100% electrolytic dissociation? (K_f for water = 1.86 K·kg/mol)",
    options: [
      { key: "A", text: "-0.186°C" },
      { key: "B", text: "-0.372°C" },
      { key: "C", text: "-0.558°C" },
      { key: "D", text: "-0.744°C" },
    ],
    correctKeys: ["C"],
    type: "single",
    explanation: "BaCl₂ yields n=3 ions. ΔT_f = 3 × 1.86 × 0.10 = 0.558 K. T_f = 0 - 0.558 = -0.558°C.",
  },
  {
    id: 10,
    part: "A",
    question: "At 27°C (300 K), 36.0 g of Glucose (C₆H₁₂O₆, M = 180 g/mol) is dissolved in water to make 2.0 Liters of solution. What is the Osmotic Pressure (Π) of this solution in atmospheres? (R = 0.0821 L·atm/mol·K)",
    options: [
      { key: "A", text: "Π = 2.46 atm" },
      { key: "B", text: "Π = 1.23 atm" },
      { key: "C", text: "Π = 4.92 atm" },
      { key: "D", text: "Π = 0.61 atm" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "n_B = 36.0 / 180 = 0.20 mol. C = 0.20 / 2.0 = 0.10 M. Π = 0.10 × 0.0821 × 300 = 1.2315 ≈ 1.23 atm.",
  },
  {
    id: 11,
    part: "B",
    question: "Which of the following concentration units are strictly INDEPENDENT of changes in solution temperature? (Select all that apply)",
    options: [
      { key: "A", text: "Molality (m)" },
      { key: "B", text: "Mole Fraction (x_i)" },
      { key: "C", text: "Mass Percentage (% w/w)" },
      { key: "D", text: "Molarity (M)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are mass-based units independent of temperature. • D (Molarity) depends on volume, which expands with temperature.",
  },
  {
    id: 12,
    part: "B",
    question: "Select the valid statements regarding Henry's Law (p = K_H x) for gas solubility in liquids: (Select all that apply)",
    options: [
      { key: "A", text: "The Henry's Law constant K_H increases as temperature increases" },
      { key: "B", text: "Higher K_H values correspond to LOWER gas solubility at a given partial pressure" },
      { key: "C", text: "Deep-sea divers use helium-diluted air tanks to prevent painful N₂ bubble formation ('bends') during ascent" },
      { key: "D", text: "Gas dissolution in liquid is an endothermic process (Δ_sol H > 0)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct. • D is incorrect: Gas dissolution in liquid is EXOTHERMIC (Δ_sol H < 0).",
  },
  {
    id: 13,
    part: "B",
    question: "Which of the following liquid pairs form IDEAL SOLUTIONS obeying Raoult's Law with Δ_mix H = 0 and Δ_mix V = 0? (Select all that apply)",
    options: [
      { key: "A", text: "Benzene and Toluene" },
      { key: "B", text: "n-Hexane and n-Heptane" },
      { key: "C", text: "Bromoethane and Chloroethane" },
      { key: "D", text: "Ethanol and Water" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C form ideal solutions. • D (Ethanol + Water) forms a non-ideal solution with positive deviation.",
  },
  {
    id: 14,
    part: "B",
    question: "Select the correct statements regarding Non-Ideal Solutions displaying POSITIVE DEVIATIONS from Raoult's Law: (Select all that apply)",
    options: [
      { key: "A", text: "Intermolecular adhesive forces A-B are WEAKER than cohesive A-A or B-B forces" },
      { key: "B", text: "Enthalpy of mixing is endothermic (Δ_mix H > 0)" },
      { key: "C", text: "Volume of mixing involves expansion (Δ_mix V > 0)" },
      { key: "D", text: "They form Maximum Boiling Azeotropes" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct. • D is incorrect: Positive deviations form MINIMUM Boiling Azeotropes.",
  },
  {
    id: 15,
    part: "B",
    question: "Which of the following physical properties are classified as COLLIGATIVE PROPERTIES depending strictly on the number of dissolved solute particles? (Select all that apply)",
    options: [
      { key: "A", text: "Relative Lowering of Vapor Pressure (Δp / p°)" },
      { key: "B", text: "Elevation of Boiling Point (ΔT_b)" },
      { key: "C", text: "Osmotic Pressure (Π)" },
      { key: "D", text: "Refractive Index of the solution" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are colligative properties. • D is an intensive property depending on chemical composition.",
  },
  {
    id: 16,
    part: "B",
    question: "Select the correct options regarding the Van 't Hoff factor (i): (Select all that apply)",
    options: [
      { key: "A", text: "For solutes undergoing complete dissociation into n ions, i = n" },
      { key: "B", text: "For solutes undergoing molecular association (dimerization), i < 1.0" },
      { key: "C", text: "The degree of dissociation α is given by α = (i - 1) / (n - 1)" },
      { key: "D", text: "For a non-electrolyte solute like Glucose or Urea, i = 1.0" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four options represent accurate mathematical relationships for the Van 't Hoff factor.",
  },
  {
    id: 17,
    part: "B",
    question: "Which of the following 0.10 M aqueous solutions will exhibit the HIGHEST boiling point elevation (ΔT_b) and LOWEST freezing point (T_f)? (Select all that apply)",
    options: [
      { key: "A", text: "0.10 M Al₂(SO₄)₃ (assuming complete dissociation)" },
      { key: "B", text: "0.10 M K₄[Fe(CN)₆] (assuming complete dissociation)" },
      { key: "C", text: "0.10 M BaCl₂ (assuming complete dissociation)" },
      { key: "D", text: "0.10 M Glucose" },
    ],
    correctKeys: ["A", "B"],
    type: "multi",
    explanation: "• Al₂(SO₄)₃ (n=5) and K₄[Fe(CN)₆] (n=5) both have effective particle concentration = 5 × 0.10 = 0.50 M.",
  },
  {
    id: 18,
    part: "B",
    question: "Select the valid statements regarding Osmosis and Osmotic Pressure (Π): (Select all that apply)",
    options: [
      { key: "A", text: "Solvent molecules spontaneously flow across an SPM from lower solute concentration to higher solute concentration" },
      { key: "B", text: "Osmotic pressure is preferred over freezing point depression for determining the molar mass of delicate biomolecules like proteins" },
      { key: "C", text: "Reverse Osmosis (RO) occurs when applied pressure exceeds osmotic pressure (P > Π), forcing pure water out of saltwater across an SPM" },
      { key: "D", text: "Human Red Blood Cells shrink (crenate) when placed in a 0.2% (w/v) NaCl solution" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct. • D is incorrect: 0.2% NaCl is hypotonic (<0.9%), causing RBCs to swell and burst (Hemolysis), NOT shrink.",
  },
  {
    id: 19,
    part: "B",
    question: "Which of the following pairs of solutions are ISOTONIC (Π₁ = Π₂) with each other at 25°C? (Select all that apply)",
    options: [
      { key: "A", text: "0.10 M Glucose and 0.10 M Urea" },
      { key: "B", text: "0.10 M NaCl (assume i=2) and 0.20 M Glucose (i=1)" },
      { key: "C", text: "0.10 M CaCl₂ (assume i=3) and 0.15 M NaCl (i=2)" },
      { key: "D", text: "0.10 M K₂SO₄ (i=3) and 0.10 M Glucose (i=1)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A (0.10 = 0.10), B (2×0.10 = 0.20 = 1×0.20), and C (3×0.10 = 0.30 = 2×0.15) are all isotonic pairs.",
  },
  {
    id: 20,
    part: "B",
    question: "Select the correct thermodynamic formulas for Ebullioscopic (K_b) and Cryoscopic (K_f) constants: (Select all that apply)",
    options: [
      { key: "A", text: "K_b = (R · M_A · (T°_b)²) / (1000 · Δ_vap H)" },
      { key: "B", text: "K_f = (R · M_A · (T°_f)²) / (1000 · Δ_fus H)" },
      { key: "C", text: "Units of K_b and K_f are K·kg/mol" },
      { key: "D", text: "K_b depends strictly on the nature of the dissolved solute rather than the solvent" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct. • D is incorrect: K_b and K_f depend strictly on the SOLVENT properties.",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
type Tab = "classifications" | "henrys-law" | "raoults-law" | "ideal-azeotropes" | "rlvp-ebullioscopy" | "cryoscopy-antifreeze" | "osmosis-ro" | "vant-hoff" | "traps" | "glossary" | "selftest";

export const SolutionsDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("classifications");
  const [activeTrapId, setActiveTrapId] = useState<string | null>(null);

  // Interconversion Calculator State
  const [calcM, setCalcM] = useState<number>(2.0);
  const [calcD, setCalcD] = useState<number>(1.2);
  const [calcMb, setCalcMb] = useState<number>(60.0); // e.g. Urea or Acetic Acid

  // Calculate molality: m = (1000 * M) / (1000 * d - M * Mb)
  const calcMolality = () => {
    const denominator = 1000 * calcD - calcM * calcMb;
    if (denominator <= 0) return "Invalid Parameters";
    return ((1000 * calcM) / denominator).toFixed(4);
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
    { id: "classifications", label: "Types & Concentration", icon: <Boxes className="w-3.5 h-3.5 shrink-0" /> },
    { id: "henrys-law", label: "Henry's Law", icon: <Wind className="w-3.5 h-3.5 shrink-0" /> },
    { id: "raoults-law", label: "Raoult's Law & Vapour", icon: <Gauge className="w-3.5 h-3.5 shrink-0" /> },
    { id: "ideal-azeotropes", label: "Ideal & Azeotropes", icon: <Split className="w-3.5 h-3.5 shrink-0" /> },
    { id: "rlvp-ebullioscopy", label: "RLVP & Boiling Point", icon: <TrendingUp className="w-3.5 h-3.5 shrink-0" /> },
    { id: "cryoscopy-antifreeze", label: "Freezing & Antifreeze", icon: <Thermometer className="w-3.5 h-3.5 shrink-0" /> },
    { id: "osmosis-ro", label: "Osmosis & RO", icon: <Droplets className="w-3.5 h-3.5 shrink-0" /> },
    { id: "vant-hoff", label: "Van 't Hoff Factor (i)", icon: <Binary className="w-3.5 h-3.5 shrink-0" /> },
    { id: "traps", label: "10 NEST Traps", icon: <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> },
    { id: "glossary", label: "Master Glossary", icon: <BookOpen className="w-3.5 h-3.5 shrink-0" /> },
    { id: "selftest", label: "NEST 20-Q Test", icon: <Award className="w-3.5 h-3.5 shrink-0" /> },
  ];

  return (
    <div className="my-4 sm:my-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-slate-50 to-blue-50/20 border border-slate-200/90 p-2.5 sm:p-7 shadow-xs space-y-4 sm:space-y-6 select-none w-full">

      {/* HEADER */}
      <div className="flex flex-col items-center text-center space-y-2.5 max-w-2xl mx-auto w-full">
        <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-200 shadow-2xs flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-blue-600" />
          CHEMISTRY INTERACTIVE MODULE — SOLUTIONS (CLASS XII / UNIT X)
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 shrink-0" />
            SOLUTIONS: THERMODYNAMICS &amp; COLLIGATIVE PROPERTIES
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            Henry’s Gas Law · Raoult’s Vapour Equilibrium · Dalton Coupling · Azeotropes · 4 Colligative Properties (RLVP, ΔT_b, ΔT_f, Π) · Van ’t Hoff Factor (i) &amp; Abnormal Mass
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

      {/* TAB 1: CLASSIFICATIONS & CONCENTRATION */}
      {activeTab === "classifications" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Boxes className="w-4 h-4 text-blue-600 shrink-0" />
              Solution Classifications &amp; Concentration Interconversions
            </h4>
            <div className="space-y-2">
              {concMatrix.map((item, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5 text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900">{item.name}</span>
                    <span className={`px-1.5 py-0.5 rounded font-black text-[9px] ${
                      item.type.startsWith("Temp-Dependent") ? "bg-rose-100 text-rose-800" : "bg-emerald-100 text-emerald-800"
                    }`}>{item.type}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700">
                    <code className="font-mono font-bold text-blue-900">{item.formula}</code>
                    <span className="font-bold text-slate-500">{item.units}</span>
                  </div>
                  <p className="text-slate-600">{item.note}</p>
                </div>
              ))}
            </div>

            {/* Interactive Interconversion Calculator */}
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2 text-[10px]">
              <span className="font-black text-blue-950 uppercase tracking-wider block">Live Interconversion: Molality (m) from Molarity (M)</span>
              <p className="font-mono text-blue-900 font-bold">Formula: m = (1000 × M) / (1000 × d - M × M_B)</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="text-[9px] font-bold text-slate-700 block">Molarity M (mol/L):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={calcM}
                    onChange={(e) => setCalcM(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 rounded bg-white border border-slate-300 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-700 block">Density d (g/mL):</label>
                  <input
                    type="number"
                    step="0.05"
                    value={calcD}
                    onChange={(e) => setCalcD(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 rounded bg-white border border-slate-300 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-700 block">Solute Molar Mass M_B (g/mol):</label>
                  <input
                    type="number"
                    step="1"
                    value={calcMb}
                    onChange={(e) => setCalcMb(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 rounded bg-white border border-slate-300 font-bold text-slate-900"
                  />
                </div>
              </div>
              <div className="p-2 rounded bg-white border border-blue-300 flex items-center justify-between">
                <span className="font-bold text-blue-950">Calculated Molality (m):</span>
                <span className="font-mono font-black text-blue-900 text-xs">{calcMolality()} mol/kg</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HENRY'S LAW */}
      {activeTab === "henrys-law" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Wind className="w-4 h-4 text-cyan-600 shrink-0" />
              Henry’s Law &amp; Gas-Liquid Solubility Thermodynamics
            </h4>
            <div className="p-3 rounded-xl bg-cyan-50/70 border border-cyan-200 space-y-1.5 text-[10px]">
              <span className="font-black text-cyan-950 block">Mathematical Law: p = K_H · x</span>
              <p className="text-cyan-900 font-semibold">• p = Partial pressure of gas; x = Mole fraction of dissolved gas in liquid.</p>
              <p className="text-cyan-900 font-bold">• Higher K_H indicates LOWER solubility at any given partial pressure!</p>
              <p className="text-cyan-900 font-semibold">• Gas dissolution is EXOTHERMIC (Δ_sol H &lt; 0) ⟹ As T rises, K_H increases and gas solubility decreases.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                <span className="font-black text-slate-900 block">1. Soda / Soft Drinks</span>
                <p className="text-slate-700">Sealed under high pressure to maximize CO₂ dissolution. Effervescence occurs upon opening due to sudden pressure drop.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1 text-[10px]">
                <span className="font-black text-indigo-950 block">2. Scuba Diving &amp; Bends</span>
                <p className="text-indigo-900">High deep-sea pressure dissolves N₂ in blood. Rapid ascent forms painful bubbles. Diluted with 11.7% Helium to prevent bends.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1 text-[10px]">
                <span className="font-black text-amber-950 block">3. Altitude Sickness</span>
                <p className="text-amber-900">Low atmospheric pO₂ at high altitudes leads to low oxygen saturation in blood, causing fatigue and anoxia.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RAOULT'S LAW */}
      {activeTab === "raoults-law" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-indigo-600 shrink-0" />
              Raoult’s Law &amp; Vapour-Phase Dalton Equilibrium
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[10px]">
                <span className="font-black text-slate-900 uppercase block">Liquid Phase Equations</span>
                <p className="font-mono font-bold text-indigo-900">p_A = p°_A · x_A  |  p_B = p°_B · x_B</p>
                <p className="font-mono font-bold text-indigo-900">P_total = p°_A + (p°_B - p°_A) x_B</p>
                <p className="text-slate-600">Total vapor pressure varies linearly with liquid mole fraction.</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1.5 text-[10px]">
                <span className="font-black text-purple-950 uppercase block">Vapour Phase Dalton Coupling</span>
                <p className="font-mono font-bold text-purple-900">y_A = p_A / P_total = (p°_A x_A) / P_total</p>
                <p className="font-mono font-bold text-purple-900">1 / P_total = y_A / p°_A + y_B / p°_B</p>
                <p className="text-purple-800 font-bold">Vapor phase is always richer in the more volatile component!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: IDEAL & AZEOTROPES */}
      {activeTab === "ideal-azeotropes" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Split className="w-4 h-4 text-emerald-600 shrink-0" />
              Ideal vs. Non-Ideal Solutions &amp; Azeotropic Distillation
            </h4>
            <div className="space-y-2">
              {deviationMatrix.map((item, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900">{item.type}</span>
                    <span className="font-bold text-indigo-700">{item.azeotrope}</span>
                  </div>
                  <p className="text-slate-700"><strong>Intermolecular Forces:</strong> {item.intermolecular}</p>
                  <p className="font-mono text-emerald-900 font-bold">Thermo: {item.thermo}</p>
                  <p className="text-slate-600 font-semibold">Examples: {item.examples}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: RLVP & BOILING POINT */}
      {activeTab === "rlvp-ebullioscopy" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-rose-600 shrink-0" />
              Colligative Properties I: RLVP &amp; Boiling Point Elevation
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                <span className="font-black text-slate-900 block">Relative Lowering of Vapor Pressure (RLVP)</span>
                <p className="font-mono font-bold text-rose-900">(p°_A - p_A) / p°_A = x_B = (w_B × M_A) / (M_B × w_A)</p>
                <p className="text-slate-600">Non-volatile solute lowers surface area available for solvent vaporization.</p>
              </div>
              <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1 text-[10px]">
                <span className="font-black text-rose-950 block">Boiling Point Elevation (ΔT_b)</span>
                <p className="font-mono font-bold text-rose-900">ΔT_b = K_b · m = K_b · (w_B × 1000) / (M_B × w_A in g)</p>
                <p className="font-mono text-rose-950 font-bold">K_b = (R · M_A · (T°_b)²) / (1000 · Δ_vap H)</p>
                <p className="text-rose-800">K_b depends strictly on the solvent (units K·kg/mol).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: FREEZING & ANTIFREEZE */}
      {activeTab === "cryoscopy-antifreeze" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-blue-600 shrink-0" />
              Colligative Properties II: Cryoscopy &amp; Antifreeze Mechanics
            </h4>
            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1.5 text-[10px]">
              <span className="font-black text-blue-950 block">Freezing Point Depression (ΔT_f):</span>
              <p className="font-mono font-bold text-blue-900">ΔT_f = T°_f - T_f = K_f · m = K_f · (w_B × 1000) / (M_B × w_A in g)</p>
              <p className="font-mono text-blue-950 font-bold">K_f = (R · M_A · (T°_f)²) / (1000 · Δ_fus H)</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                <span className="font-black text-slate-900 block">Automobile Radiator Antifreeze</span>
                <p className="text-slate-700">35% (v/v) Ethylene Glycol depresses water freezing point to -17.8°C (255.4 K), preventing engine cracking in winter.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1 text-[10px]">
                <span className="font-black text-indigo-950 block">Road De-icing Chemistry</span>
                <p className="text-indigo-900">Spreading CaCl₂ is more effective than NaCl (i = 3 vs i = 2), lowering freezing point further per mole of salt.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: OSMOSIS & RO */}
      {activeTab === "osmosis-ro" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-teal-600 shrink-0" />
              Osmotic Pressure (Π), Cellular Tonicity, &amp; Reverse Osmosis
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1 text-[10px]">
                <span className="font-black text-emerald-950 block">Isotonic (Π₁ = Π₂)</span>
                <p className="text-emerald-900">0.9% (w/v) NaCl is isotonic with human RBCs. No net water movement.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1 text-[10px]">
                <span className="font-black text-rose-950 block">Hypertonic (&gt;0.9% NaCl)</span>
                <p className="text-rose-900">Water flows OUT of cell into solution ⟹ <strong>Crenation / Shrinkage</strong>.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1 text-[10px]">
                <span className="font-black text-blue-950 block">Hypotonic (&lt;0.9% NaCl)</span>
                <p className="text-blue-900">Water flows INTO cell ⟹ <strong>Hemolysis / Osmotic Bursting</strong>.</p>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] space-y-1">
              <span className="font-black text-slate-900 block">Why Osmotic Pressure is Gold Standard for Proteins:</span>
              <p className="text-slate-700">1. Measurable at room temperature (prevents protein thermal denaturation). 2. Magnitude of Π is large and precise even at C ~ 10⁻⁴ M.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: VAN 'T HOFF FACTOR */}
      {activeTab === "vant-hoff" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Binary className="w-4 h-4 text-purple-600 shrink-0" />
              Van ’t Hoff Factor (i) &amp; Degree of Dissociation / Association
            </h4>
            <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1.5 text-[10px]">
              <span className="font-black text-purple-950 block">Definition: i = Observed Property / Calculated Property = M_calc / M_obs</span>
              <p className="text-purple-900 font-semibold">• Modified Equations: Δp/p° = i·x_B  |  ΔT_b = i·K_b·m  |  ΔT_f = i·K_f·m  |  Π = i·C·R·T</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                <span className="font-black text-slate-900 block">1. Dissociation (i &gt; 1)</span>
                <p className="font-mono font-bold text-indigo-900">α = (i - 1) / (n - 1)</p>
                <p className="text-slate-600">e.g., K₄[Fe(CN)₆] gives n = 5 ions ⟹ i = 1 + 4α.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                <span className="font-black text-slate-900 block">2. Association (i &lt; 1)</span>
                <p className="font-mono font-bold text-indigo-900">β = (1 - i)n / (n - 1)</p>
                <p className="text-slate-600">Benzoic acid dimerization in benzene (n=2): β = 2(1 - i) (i ≈ 0.5).</p>
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
              All 10 High-Yield NEST Solutions Misconceptions &amp; Traps
            </h4>
            <div className="space-y-2">
              {solutionTraps.map((trap) => {
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
                          <span className="text-[9px] font-black uppercase text-amber-700 tracking-wider block">Physical Reality</span>
                          <p className="text-xs font-bold text-amber-950">{trap.reality}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                          <span className="text-[9px] font-black uppercase text-blue-700 tracking-wider block">Exam Tip</span>
                          <p className="text-xs font-bold text-blue-950">{trap.tip}</p>
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
                placeholder="Search solution chemistry terms..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {["All", "Concentration & Henry's Law", "Raoult's Law & Azeotropes", "Colligative Properties", "Van 't Hoff & Tonicity"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGlossaryCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                    glossaryCategory === cat ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
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
                {score >= 17 ? "Outstanding! Mastery level for NEST & IChO Solutions Module." : score >= 12 ? "Good performance — review incorrect explanations." : "Needs practice — revisit earlier tabs and retake."}
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
                        testPartFilter === part ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200"
                      }`}
                    >
                      {part === "ALL" ? "All 20 Questions" : part === "A" ? "Part A (Single MCQ)" : "Part B (Multi MSQ)"}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="flex-1 sm:w-36 h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full rounded-full bg-blue-500 transition-all duration-500" style={{ width: `${((currentQ + 1) / mcqData.length) * 100}%` }} />
                  </div>
                  <span className="text-[10px] font-black text-slate-700">Q{currentQ + 1} of {mcqData.length}</span>
                </div>
              </div>

              <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    {currentMCQ.id}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-slate-100 text-slate-700">
                        Part {currentMCQ.part}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                        currentMCQ.type === "multi" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
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
                      bg = "bg-blue-50 border-blue-400";
                    }

                    return (
                      <button key={opt.key} onClick={() => toggleAnswer(currentQ, opt.key, currentMCQ.type)} className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl border-2 text-left transition-all ${bg}`}>
                        <span className={`w-5 h-5 rounded shrink-0 border-2 flex items-center justify-center text-[10px] font-black transition-all ${
                          isSubmitted && isCorrect ? "bg-emerald-600 border-emerald-600 text-white" : isSubmitted && isSelected && !isCorrect ? "bg-rose-600 border-rose-600 text-white" : isSelected ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 text-slate-500"
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
                      <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="text-[9px] font-black uppercase tracking-wider text-blue-700">Detailed Solution &amp; Thermodynamic Explanation</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 leading-relaxed">{currentMCQ.explanation}</p>
                  </div>
                )}

                <div className="flex items-center gap-2 flex-wrap">
                  {!submitted[currentQ] ? (
                    <button onClick={() => submitAnswer(currentQ)} disabled={!(selectedAnswers[currentQ]?.length)} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-black hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all">Submit Answer</button>
                  ) : null}
                  {currentQ < mcqData.length - 1 && (
                    <button onClick={() => setCurrentQ((q) => q + 1)} className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-black hover:bg-slate-700 transition-all flex items-center gap-1.5">
                      Next Question <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {currentQ === mcqData.length - 1 && submitted[currentQ] && (
                    <button onClick={computeScore} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-black hover:bg-blue-700 transition-all flex items-center gap-1.5">
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
                      i === currentQ ? "bg-blue-600 text-white border-blue-600" : isDone ? isCorrect ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-rose-100 text-rose-800 border-rose-300" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
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

export default SolutionsDiagram;
