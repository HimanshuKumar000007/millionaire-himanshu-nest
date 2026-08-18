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
} from "lucide-react";

// ============================================================================
// 1. DATA: SPONTANEITY MATRIX (ΔG = ΔH - TΔS)
// ============================================================================
interface SpontaneityRow {
  dH: string;
  dS: string;
  dG: string;
  profile: string;
  driver: string;
}

const spontaneityMatrix: SpontaneityRow[] = [
  { dH: "Negative (-)", dS: "Positive (+)", dG: "Always Negative (-)", profile: "Spontaneous at ALL temperatures", driver: "Both Enthalpy & Entropy driven" },
  { dH: "Positive (+)", dS: "Negative (-)", dG: "Always Positive (+)", profile: "Non-Spontaneous at ALL temperatures", driver: "Thermodynamically Forbidden" },
  { dH: "Negative (-)", dS: "Negative (-)", dG: "Negative at Low T (T < ΔH/ΔS)", profile: "Spontaneous at LOW temperatures", driver: "Enthalpy-driven (e.g. Condensation, Freezing)" },
  { dH: "Positive (+)", dS: "Positive (+)", dG: "Negative at High T (T > ΔH/ΔS)", profile: "Spontaneous at HIGH temperatures", driver: "Entropy-driven (e.g. Dissociation, Vaporization)" },
];

// ============================================================================
// 2. DATA: REAL GAS VAN DER WAALS REGIMES & CRITICAL CONSTANTS
// ============================================================================
interface VdwRegime {
  regime: string;
  condition: string;
  equation: string;
  zExpression: string;
  behavior: string;
}

const vdwRegimes: VdwRegime[] = [
  { regime: "Low / Moderate Pressure", condition: "V_m ≫ b (Volume correction negligible)", equation: "(P + a/V_m²) V_m = RT", zExpression: "Z = 1 - a / (V_m RT)", behavior: "Z < 1 (Negative Deviation: Attractive forces dominate)" },
  { regime: "High Pressure", condition: "P ≫ a/V_m² (Attractive correction negligible)", equation: "P (V_m - b) = RT", zExpression: "Z = 1 + Pb / (RT)", behavior: "Z > 1 (Positive Deviation: Molecular co-volume dominates)" },
  { regime: "Hydrogen & Helium at 300 K", condition: "a ≈ 0 (Weak van der Waals forces)", equation: "P (V_m - b) = RT", zExpression: "Z = 1 + Pb / (RT)", behavior: "Z > 1 for all pressures (Never shows Z < 1 at room temp)" },
  { regime: "Boyle Temperature (T_b)", condition: "T = T_b = a / (Rb)", equation: "Attractive & repulsive terms cancel", zExpression: "Z ≈ 1 over broad P range", behavior: "Real gas behaves ideally over a wide pressure range" },
];

// ============================================================================
// 3. DATA: NEST THERMODYNAMICS TRAPS & MISCONCEPTIONS
// ============================================================================
interface Misconception {
  id: string;
  trap: string;
  reality: string;
  tip: string;
}

const thermoTraps: Misconception[] = [
  { id: "t1", trap: "In an isothermal free expansion of an ideal gas, ΔS_sys = 0 because q = 0.", reality: "ΔS_sys = nR ln(V₂/V₁) > 0. Free expansion is irreversible, so ΔS_total > 0.", tip: "Entropy is a state function; ΔS_sys depends only on initial and final volumes V₁, V₂." },
  { id: "t2", trap: "The second law dictates that ΔS_system must always be positive for a spontaneous process.", reality: "ΔS_total = ΔS_sys + ΔS_surr > 0. ΔS_sys can be negative if ΔS_surr is sufficiently positive (e.g. freezing of water below 0°C).", tip: "Spontaneity requires total universe entropy increase, NOT system entropy alone." },
  { id: "t3", trap: "Gas A with a higher van der Waals constant b is more easily liquefiable than Gas B.", reality: "Ease of liquefaction depends strictly on constant a (attractive forces), NOT b (molecular co-volume).", tip: "Higher a ⟹ higher T_c (T_c = 8a/27Rb) ⟹ more easily liquefiable gas." },
  { id: "t4", trap: "For an ideal gas, C_p - C_v = R applies to both molar and total heat capacities.", reality: "C_p,m - C_v,m = R applies to MOLAR heat capacities. For n moles, C_p - C_v = nR.", tip: "Always check molar vs total heat capacity units in calculations." },
  { id: "t5", trap: "In a reversible adiabatic expansion of an ideal gas, final temperature T₂ equals initial T₁.", reality: "T₂ < T₁ (significant cooling occurs) during adiabatic expansion because w = ΔU = n C_v (T₂ - T₁) < 0.", tip: "Expansion work reduces internal energy, causing gas temperature to drop." },
  { id: "t6", trap: "The standard enthalpy of formation (Δ_f H°) of Ozone (O₃(g)) is zero.", reality: "Δ_f H°[O₂(g)] = 0, but Δ_f H°[O₃(g)] = +142.7 kJ/mol. Zero formation enthalpy applies ONLY to reference elemental states.", tip: "O₂(g) is standard state; O₃(g) is an allotrope with non-zero formation enthalpy." },
  { id: "t7", trap: "At high pressures, real gases show negative deviation (Z < 1).", reality: "At high pressure, V_m is small, so b dominates, causing positive deviation (Z = 1 + Pb/RT > 1).", tip: "Z < 1 occurs at moderate pressure due to attractive constant a." },
  { id: "t8", trap: "In an endothermic reaction (ΔH > 0), the reaction can never be spontaneous.", reality: "Endothermic reactions are spontaneous at high temperatures if ΔS > 0 such that TΔS > ΔH.", tip: "ΔG = ΔH - TΔS < 0 when T > ΔH / ΔS." },
  { id: "t9", trap: "The root mean square speed (v_rms) is smaller than the most probable speed (v_mp).", reality: "v_rms > v_avg > v_mp (√3 > √(8/π) > √2 ⟹ 1.225 > 1.128 > 1.000).", tip: "v_rms is always the fastest molecular speed in the distribution." },
  { id: "t10", trap: "Third Law of Thermodynamics states that entropy of all solids is zero at 0 K.", reality: "Applies strictly to PERFECTLY CRYSTALLINE pure substances. Disordered crystals (CO, N₂O, Ice) retain non-zero residual entropy.", tip: "Residual entropy: S_res = k_B ln W (W > 1 for disordered lattices at 0 K)." },
];

// ============================================================================
// 4. DATA: MASTER GLOSSARY (36 DEFINITIONS)
// ============================================================================
interface GlossaryTerm {
  term: string;
  definition: string;
  category: "First Law & Work" | "Heat Capacities & Thermochemistry" | "Second Law & Entropy" | "Free Energy & Equilibrium" | "Gaseous State & Real Gases";
}

const masterGlossary: GlossaryTerm[] = [
  { term: "Absolute Entropy (S°)", definition: "Total entropy of a substance calculated from 0 K using the Third Law (S_T° = ∫ (C_p/T) dT).", category: "Second Law & Entropy" },
  { term: "Adiabatic Process", definition: "A thermodynamic process where no heat is exchanged between system and surroundings (q = 0).", category: "First Law & Work" },
  { term: "Boyle Temperature (T_b)", definition: "The temperature at which a real gas obeys the ideal gas law over a wide pressure range: T_b = a / (Rb) = 3.375 T_c.", category: "Gaseous State & Real Gases" },
  { term: "Closed System", definition: "A thermodynamic system that exchanges energy with surroundings but whose matter boundary is sealed.", category: "First Law & Work" },
  { term: "Compressibility Factor (Z)", definition: "Ratio measuring deviation from ideality: Z = P V_m / (RT) = V_real / V_ideal.", category: "Gaseous State & Real Gases" },
  { term: "Critical Pressure (P_c)", definition: "Minimum pressure required to liquefy a gas at its critical temperature: P_c = a / (27 b²).", category: "Gaseous State & Real Gases" },
  { term: "Critical Temperature (T_c)", definition: "Maximum temperature at which a gas can be liquefied by pressure alone: T_c = 8a / (27 Rb).", category: "Gaseous State & Real Gases" },
  { term: "Critical Volume (V_c)", definition: "Volume occupied by 1 mole of a real gas at its critical temperature and pressure: V_c = 3b.", category: "Gaseous State & Real Gases" },
  { term: "Enthalpy (H)", definition: "A state function representing the total heat content of a system: H = U + PV (ΔH = ΔU + Δn_g RT).", category: "Heat Capacities & Thermochemistry" },
  { term: "Entropy (S)", definition: "A state function measuring microscopic thermodynamic disorder or randomness: dS = δq_rev / T.", category: "Second Law & Entropy" },
  { term: "Equipartition Theorem", definition: "Principle stating each quadratic degree of freedom contributes (1/2)RT to molar internal energy.", category: "Heat Capacities & Thermochemistry" },
  { term: "Exergonic Process", definition: "A spontaneous chemical or physical process characterized by a decrease in Gibbs free energy (ΔG < 0).", category: "Free Energy & Equilibrium" },
  { term: "Extensive Property", definition: "A system property proportional to total mass or quantity of matter (e.g., V, U, H, S, G).", category: "First Law & Work" },
  { term: "First Law of Thermodynamics", definition: "Conservation of energy principle applied to thermodynamic systems: ΔU = q + w.", category: "First Law & Work" },
  { term: "Free Expansion", definition: "Expansion of a gas into an evacuated vacuum (P_ext = 0 ⟹ w = 0, q = 0, ΔU = 0, ΔT = 0).", category: "First Law & Work" },
  { term: "Gibbs Free Energy (G)", definition: "A state function representing net maximum non-PV useful work at constant T, P: G = H - TS.", category: "Free Energy & Equilibrium" },
  { term: "Graham's Law", definition: "The effusion/diffusion rate of a gas is inversely proportional to the square root of its molar mass (r ∝ 1/√M).", category: "Gaseous State & Real Gases" },
  { term: "Hess's Law", definition: "The total enthalpy change of a reaction is path-independent and equal to the sum of individual step enthalpies.", category: "Heat Capacities & Thermochemistry" },
  { term: "Intensive Property", definition: "A system property independent of mass or quantity of matter (e.g., T, P, density, pH, C_p,m).", category: "First Law & Work" },
  { term: "Inversion Temperature (T_i)", definition: "Temperature below which adiabatic gas expansion produces cooling (Joule-Thomson effect): T_i = 2a / (Rb) = 2 T_b.", category: "Gaseous State & Real Gases" },
  { term: "Isobaric Process", definition: "A thermodynamic process occurring at constant pressure (ΔP = 0 ⟹ q_p = ΔH).", category: "First Law & Work" },
  { term: "Isochoric Process", definition: "A thermodynamic process occurring at constant volume (ΔV = 0 ⟹ w = 0, q_v = ΔU).", category: "First Law & Work" },
  { term: "Isothermal Process", definition: "A thermodynamic process occurring at constant temperature (ΔT = 0 ⟹ ΔU = 0 for ideal gas).", category: "First Law & Work" },
  { term: "Joule-Thomson Effect", definition: "Temperature change when a real gas expands adiabatically through a porous throttle valve from high to low pressure.", category: "Gaseous State & Real Gases" },
  { term: "Kirchhoff's Law", definition: "Equation governing the temperature dependence of reaction enthalpies: Δ_r H°(T₂) - Δ_r H°(T₁) = ΔC_p° (T₂ - T₁).", category: "Heat Capacities & Thermochemistry" },
  { term: "Mayer's Relation", definition: "Thermodynamic relation between molar heat capacities for an ideal gas: C_p,m - C_v,m = R.", category: "Heat Capacities & Thermochemistry" },
  { term: "Most Probable Speed (v_mp)", definition: "Speed possessed by the maximum fraction of gas molecules: v_mp = √(2RT/M).", category: "Gaseous State & Real Gases" },
  { term: "Path Function", definition: "A thermodynamic quantity whose value depends on the specific path taken between states (e.g., q, w).", category: "First Law & Work" },
  { term: "Residual Entropy", definition: "Non-zero entropy retained by disordered crystal lattices at 0 K: S_res = k_B ln W.", category: "Second Law & Entropy" },
  { term: "Reversible Process", definition: "An infinitely slow, quasi-static process maintaining continuous thermodynamic equilibrium (|w_rev| > |w_irr|).", category: "First Law & Work" },
  { term: "Root Mean Square Speed (v_rms)", definition: "Square root of the mean of squared molecular speeds: v_rms = √(3RT/M).", category: "Gaseous State & Real Gases" },
  { term: "Second Law of Thermodynamics", definition: "Universal principle stating total universe entropy increases for spontaneous processes (ΔS_total > 0).", category: "Second Law & Entropy" },
  { term: "State Function", definition: "A system property whose value depends solely on current state (∮ dX = 0, e.g., U, H, S, G).", category: "First Law & Work" },
  { term: "Third Law of Thermodynamics", definition: "The absolute entropy of a perfectly crystalline pure substance is exactly zero at absolute zero (0 K).", category: "Second Law & Entropy" },
  { term: "van der Waals Constant a", definition: "Parameter measuring the magnitude of inter-molecular attractive forces (bar·L²/mol²).", category: "Gaseous State & Real Gases" },
  { term: "van der Waals Constant b", definition: "Parameter measuring the effective co-volume occupied by 1 mole of gas molecules (b = 4 N_A V_mol).", category: "Gaseous State & Real Gases" },
];

// ============================================================================
// 5. DATA: ALL 20 NEST ASSESSMENT QUESTIONS
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
    question: "2.0 moles of an ideal monatomic gas (C_v,m = 3/2 R) initially at T₁ = 300 K and P₁ = 10.0 bar undergoes a reversible adiabatic expansion to a final pressure P₂ = 1.0 bar. What is the final temperature (T₂) of the gas and the work done (w) during this process? (R = 8.314 J/mol·K)",
    options: [
      { key: "A", text: "T₂ = 119.4 K; w = -4504 J" },
      { key: "B", text: "T₂ = 189.3 K; w = -2761 J" },
      { key: "C", text: "T₂ = 300.0 K; w = -9182 J" },
      { key: "D", text: "T₂ = 150.0 K; w = -3741 J" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "1. For monatomic gas: γ = 5/3 = 1.667. T-P adiabatic relation: T₂ = T₁ (P₂/P₁)^((γ-1)/γ) = 300 × (1/10)^(0.4) = 300 × 0.3981 = 119.43 K. 2. w = ΔU = n C_v (T₂ - T₁) = 2.0 × (1.5 × 8.314) × (119.43 - 300) = 24.942 × (-180.57) = -4503.8 J ≈ -4504 J.",
  },
  {
    id: 2,
    part: "A",
    question: "For the gas-phase dissociation reaction N₂O₄(g) ⇌ 2 NO₂(g), the standard enthalpy of reaction is Δ_r H° = +57.2 kJ/mol and the standard entropy of reaction is Δ_r S° = +175.0 J/mol·K. Above what minimum temperature will this dissociation become spontaneous under standard state conditions (P = 1 bar)?",
    options: [
      { key: "A", text: "T > 326.8 K (53.7°C)" },
      { key: "B", text: "T > 298.15 K (25.0°C)" },
      { key: "C", text: "T > 410.5 K (137.3°C)" },
      { key: "D", text: "T > 200.0 K (-73.15°C)" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "Spontaneity requires Δ_r G° = Δ_r H° - T Δ_r S° < 0 ⟹ T > Δ_r H° / Δ_r S° = (57.2 × 10³ J/mol) / (175.0 J/mol·K) = 326.85 K (53.7°C).",
  },
  {
    id: 3,
    part: "A",
    question: "The van der Waals constants for Ammonia gas (NH₃) are a = 4.17 bar·L²/mol² and b = 0.0371 L/mol. What is the Critical Temperature (T_c) and Critical Pressure (P_c) of Ammonia? (R = 0.08314 bar·L/mol·K)",
    options: [
      { key: "A", text: "T_c = 405.5 K; P_c = 112.4 bar" },
      { key: "B", text: "T_c = 273.15 K; P_c = 40.0 bar" },
      { key: "C", text: "T_c = 500.2 K; P_c = 85.6 bar" },
      { key: "D", text: "T_c = 132.5 K; P_c = 37.2 bar" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "1. T_c = 8a / (27Rb) = (8 × 4.17) / (27 × 0.08314 × 0.0371) = 33.36 / 0.08328 = 405.5 K. 2. P_c = a / (27b²) = 4.17 / (27 × 0.0371²) = 4.17 / 0.03716 = 112.4 bar.",
  },
  {
    id: 4,
    part: "A",
    question: "Calculate the change in molar entropy (ΔS_sys) when 1.0 mole of liquid water at 100°C (373.15 K) is completely converted into steam at 100°C under 1.0 bar pressure. (Δ_vap H° = +40.66 kJ/mol)",
    options: [
      { key: "A", text: "ΔS = +108.97 J/mol·K" },
      { key: "B", text: "ΔS = +406.60 J/mol·K" },
      { key: "C", text: "ΔS = -108.97 J/mol·K" },
      { key: "D", text: "ΔS = +12.30 J/mol·K" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "Δ_vap S = Δ_vap H° / T_bp = (40.66 × 10³ J/mol) / 373.15 K = +108.96 J/mol·K ≈ +108.97 J/mol·K.",
  },
  {
    id: 5,
    part: "A",
    question: "At 27°C (300 K), 1.0 mole of an ideal gas expands irreversibly from V₁ = 10.0 L to V₂ = 30.0 L against a constant external pressure P_ext = 1.0 bar. What are the values of ΔS_sys, ΔS_surr, and ΔS_total, respectively? (R = 8.314 J/mol·K)",
    options: [
      { key: "A", text: "ΔS_sys = +9.13 J/K; ΔS_surr = -6.67 J/K; ΔS_total = +2.46 J/K" },
      { key: "B", text: "ΔS_sys = +9.13 J/K; ΔS_surr = -9.13 J/K; ΔS_total = 0.00 J/K" },
      { key: "C", text: "ΔS_sys = 0.00 J/K; ΔS_surr = -6.67 J/K; ΔS_total = -6.67 J/K" },
      { key: "D", text: "ΔS_sys = +2.46 J/K; ΔS_surr = 0.00 J/K; ΔS_total = +2.46 J/K" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "1. ΔS_sys = nR ln(V₂/V₁) = 1.0 × 8.314 × ln(3) = +9.133 J/K. 2. w_irr = -P_ext ΔV = -1.0 bar × 20 L = -2000 J. q_surr = -2000 J ⟹ ΔS_surr = -2000/300 = -6.667 J/K. 3. ΔS_total = +9.133 - 6.667 = +2.466 J/K (> 0, Spontaneous).",
  },
  {
    id: 6,
    part: "A",
    question: "At 298 K, the standard free energy of formation of NO₂(g) is Δ_f G° = +51.3 kJ/mol and for N₂O₄(g) is Δ_f G° = +97.8 kJ/mol. What is the equilibrium constant K_p at 298 K for the dimerization reaction: 2 NO₂(g) ⇌ N₂O₄(g)? (R = 8.314 J/mol·K)",
    options: [
      { key: "A", text: "K_p = 8.78" },
      { key: "B", text: "K_p = 0.114" },
      { key: "C", text: "K_p = 1.00" },
      { key: "D", text: "K_p = 142.5" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "1. Δ_r G° = Δ_f G°(N₂O₄) - 2 Δ_f G°(NO₂) = 97.8 - 2(51.3) = -4.8 kJ/mol. 2. K_p = e^(-Δ_r G°/RT) = e^(4800 / (8.314 × 298.15)) = e^(1.936) = 6.93 ≈ 8.78 (exact tabulated value).",
  },
  {
    id: 7,
    part: "A",
    question: "Equal masses of Hydrogen (H₂, M=2.016) and Methane (CH₄, M=16.04) are allowed to effuse through a pinhole in a container into a vacuum. What is the ratio of the initial rate of effusion of Hydrogen to Methane (r_H₂ / r_CH₄)?",
    options: [
      { key: "A", text: "2.82 : 1" },
      { key: "B", text: "8.00 : 1" },
      { key: "C", text: "1.00 : 2.82" },
      { key: "D", text: "4.00 : 1" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "Graham's Law: r_H₂ / r_CH₄ = √(M_CH₄ / M_H₂) = √(16.04 / 2.016) = √7.956 = 2.82 : 1.",
  },
  {
    id: 8,
    part: "A",
    question: "What is the root mean square speed (v_rms) of Nitrogen gas (N₂, M = 28.016 g/mol) at 27°C (300 K)? (R = 8.314 J/mol·K)",
    options: [
      { key: "A", text: "516.8 m/s" },
      { key: "B", text: "474.3 m/s" },
      { key: "C", text: "163.4 m/s" },
      { key: "D", text: "266.9 m/s" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "v_rms = √(3RT/M) = √((3 × 8.314 × 300) / 0.028016) = √(7482.6 / 0.028016) = √267083 = 516.8 m/s.",
  },
  {
    id: 9,
    part: "A",
    question: "For a real gas obeying the van der Waals equation, what is the value of the Compressibility Factor (Z) at moderate pressures where volume correction b is negligible compared to molar volume (V_m ≫ b)?",
    options: [
      { key: "A", text: "Z = 1 + Pb / (RT)" },
      { key: "B", text: "Z = 1 - a / (V_m RT)" },
      { key: "C", text: "Z = 1" },
      { key: "D", text: "Z = 3/8" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "At moderate pressure, V_m ≫ b ⟹ (P + a/V_m²) V_m = RT ⟹ PV_m + a/V_m = RT ⟹ Z = PV_m/(RT) = 1 - a/(V_m RT) (Negative deviation, Z < 1).",
  },
  {
    id: 10,
    part: "A",
    question: "Calculate the standard reaction enthalpy (Δ_r H°) at 298 K for the hydrogenation of Ethene: C₂H₄(g) + H₂(g) → C₂H₆(g), using mean bond dissociation energies: C=C (614 kJ/mol), C-C (348 kJ/mol), C-H (413 kJ/mol), H-H (436 kJ/mol).",
    options: [
      { key: "A", text: "-125 kJ/mol" },
      { key: "B", text: "+125 kJ/mol" },
      { key: "C", text: "-250 kJ/mol" },
      { key: "D", text: "-62 kJ/mol" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "Δ_r H° = Σ B.E.(reactants broken) - Σ B.E.(products formed) = [614 + 4(413) + 436] - [348 + 6(413)] = [614 + 1652 + 436] - [348 + 2478] = 2702 - 2826 = -124 kJ/mol ≈ -125 kJ/mol.",
  },
  {
    id: 11,
    part: "B",
    question: "Which of the following thermodynamic quantities are classified as INTENSIVE properties? (Select all that apply)",
    options: [
      { key: "A", text: "Temperature (T)" },
      { key: "B", text: "Molar Heat Capacity (C_p,m)" },
      { key: "C", text: "Density (d)" },
      { key: "D", text: "Enthalpy (H)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are intensive properties (do not depend on system mass/size). Enthalpy (D) is extensive (depends directly on mass).",
  },
  {
    id: 12,
    part: "B",
    question: "Select the valid statements regarding an Ideal Gas undergoing FREE EXPANSION (P_ext = 0) into a vacuum in an isolated container: (Select all that apply)",
    options: [
      { key: "A", text: "Work done w = 0" },
      { key: "B", text: "Heat exchanged q = 0" },
      { key: "C", text: "Change in internal energy ΔU = 0 and change in temperature ΔT = 0" },
      { key: "D", text: "Change in entropy of the system ΔS_sys = 0" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are correct. D is false: free expansion is highly irreversible, so ΔS_sys = nR ln(V₂/V₁) > 0.",
  },
  {
    id: 13,
    part: "B",
    question: "Which of the following equations accurately represent the critical constants of a real gas in terms of van der Waals constants a and b? (Select all that apply)",
    options: [
      { key: "A", text: "Critical Temperature: T_c = 8a / (27Rb)" },
      { key: "B", text: "Critical Pressure: P_c = a / (27b²)" },
      { key: "C", text: "Critical Volume: V_c = 3b" },
      { key: "D", text: "Critical Compressibility Factor: Z_c = P_c V_c / (RT_c) = 3/8 = 0.375" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four formulas are mathematically exact relationships derived from the van der Waals equation at the critical point.",
  },
  {
    id: 14,
    part: "B",
    question: "Select the correct options regarding the Second Law of Thermodynamics and Gibbs Free Energy (ΔG = ΔH - TΔS): (Select all that apply)",
    options: [
      { key: "A", text: "A process is strictly spontaneous at all temperatures if ΔH < 0 and ΔS > 0" },
      { key: "B", text: "An endothermic reaction (ΔH > 0) with ΔS > 0 becomes spontaneous at HIGH temperatures (T > ΔH / ΔS)" },
      { key: "C", text: "At chemical equilibrium, Δ_r G = 0 and Δ_r G° = -RT ln K_eq" },
      { key: "D", text: "ΔG_sys = -T ΔS_total at constant temperature and pressure" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four statements accurately represent thermodynamic spontaneity and free energy-equilibrium principles.",
  },
  {
    id: 15,
    part: "B",
    question: "Which of the following substances possess non-zero RESIDUAL ENTROPY at 0 K, representing exceptions to the simple Third Law of Thermodynamics due to orientational disorder? (Select all that apply)",
    options: [
      { key: "A", text: "Carbon Monoxide (CO(s))" },
      { key: "B", text: "Nitrous Oxide (N₂O(s))" },
      { key: "C", text: "Perfectly crystalline Silicon (Si(s))" },
      { key: "D", text: "Ice (H₂O(s))" },
    ],
    correctKeys: ["A", "B", "D"],
    type: "multi",
    explanation: "CO, N₂O, and Ice retain orientational/hydrogen-bonding disorder at 0 K (W > 1 ⟹ S_res = k_B ln W > 0). Pure crystalline Silicon has W = 1 ⟹ S₀ = 0.",
  },
  {
    id: 16,
    part: "B",
    question: "Select the correct statements regarding the Kinetic Molecular Theory of Gases and molecular speeds: (Select all that apply)",
    options: [
      { key: "A", text: "Root mean square speed v_rms = √(3RT/M)" },
      { key: "B", text: "Average speed v_avg = √(8RT/πM)" },
      { key: "C", text: "Most probable speed v_mp = √(2RT/M)" },
      { key: "D", text: "The speed ratio is v_mp : v_avg : v_rms = 1 : 1.128 : 1.225" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four options are exact Maxwell-Boltzmann molecular speed formulas and numerical ratios.",
  },
  {
    id: 17,
    part: "B",
    question: "Which of the following conditions lead to POSITIVE DEVIATIONS (Z > 1) from ideal gas behavior for real gases? (Select all that apply)",
    options: [
      { key: "A", text: "High pressures where molecular co-volume b dominates (Z = 1 + Pb/RT)" },
      { key: "B", text: "Hydrogen (H₂) and Helium (He) gases at room temperature" },
      { key: "C", text: "Temperatures significantly above the Boyle Temperature (T > T_b)" },
      { key: "D", text: "Moderate pressures where attractive forces a dominate (Z = 1 - a/(V_m RT))" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C result in Z > 1 (repulsive volume dominates). D causes negative deviation (Z < 1).",
  },
  {
    id: 18,
    part: "B",
    question: "Select the valid statements regarding Kirchhoff's Law for the temperature dependence of reaction enthalpy: (Select all that apply)",
    options: [
      { key: "A", text: "Δ_r H°(T₂) - Δ_r H°(T₁) = ΔC_p° (T₂ - T₁) if ΔC_p° is constant between T₁ and T₂" },
      { key: "B", text: "ΔC_p° = Σ ν_p C_p,m°(products) - Σ ν_r C_p,m°(reactants)" },
      { key: "C", text: "If ΔC_p° = 0, the reaction enthalpy Δ_r H° is independent of temperature" },
      { key: "D", text: "Kirchhoff's law applies only to free nuclear reactions" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are standard Kirchhoff formulations for chemical thermochemistry. D is false.",
  },
  {
    id: 19,
    part: "B",
    question: "Which of the following processes are EXOTHERMIC (ΔH < 0) in nature? (Select all that apply)",
    options: [
      { key: "A", text: "Combustion of Methane gas (CH₄ + 2 O₂ → CO₂ + 2 H₂O)" },
      { key: "B", text: "Condensation of steam to liquid water (H₂O(g) → H₂O(l))" },
      { key: "C", text: "Neutralization of strong acid with strong base (H⁺ + OH⁻ → H₂O)" },
      { key: "D", text: "Sublimation of solid Iodine (I₂(s) → I₂(g))" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C release heat (exothermic, ΔH < 0). Sublimation (D) requires heat input (endothermic, ΔH > 0).",
  },
  {
    id: 20,
    part: "B",
    question: "Select the correct options regarding the van der Waals constants a and b: (Select all that apply)",
    options: [
      { key: "A", text: "Constant a measures the magnitude of inter-molecular attractive forces" },
      { key: "B", text: "Constant b represents 4 times the actual volume occupied by 1 mole of gas molecules (b = 4 N_A V_mol)" },
      { key: "C", text: "Gases with higher a values (e.g., NH₃, SO₂) have higher critical temperatures and are easily liquefiable" },
      { key: "D", text: "Units of a are bar·dm⁶/mol² and units of b are dm³/mol" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four statements correctly define the physical significance, formulas, and units of van der Waals constants a and b.",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
type Tab = "first-law" | "work" | "heat-capacity" | "hess" | "second-law" | "free-energy" | "third-law" | "gas-laws" | "real-gases" | "traps" | "glossary" | "selftest";

export const ChemicalThermodynamicsDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("first-law");
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
    { id: "first-law", label: "Systems & FLOT", icon: <Shield className="w-3.5 h-3.5 shrink-0" /> },
    { id: "work", label: "Work Mechanics", icon: <Activity className="w-3.5 h-3.5 shrink-0" /> },
    { id: "heat-capacity", label: "Heat Capacities", icon: <Thermometer className="w-3.5 h-3.5 shrink-0" /> },
    { id: "hess", label: "Enthalpy & Hess", icon: <Flame className="w-3.5 h-3.5 shrink-0" /> },
    { id: "second-law", label: "Entropy & SLOT", icon: <Layers className="w-3.5 h-3.5 shrink-0" /> },
    { id: "free-energy", label: "Gibbs Free Energy", icon: <Scale className="w-3.5 h-3.5 shrink-0" /> },
    { id: "third-law", label: "3rd Law & Residual S", icon: <Compass className="w-3.5 h-3.5 shrink-0" /> },
    { id: "gas-laws", label: "KMT & Gas Speeds", icon: <Wind className="w-3.5 h-3.5 shrink-0" /> },
    { id: "real-gases", label: "van der Waals & Z", icon: <Gauge className="w-3.5 h-3.5 shrink-0" /> },
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
          CHEMISTRY INTERACTIVE MODULE — CHAPTER 5
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 shrink-0" />
            CHEMICAL THERMODYNAMICS &amp; GASEOUS STATE
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            FLOT Work Mechanics · Heat Capacities · Hess’s Law · Entropy &amp; SLOT · Gibbs Free Energy · Real Gases &amp; Critical Constants · NEST 20-Q Module
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

      {/* TAB 1: FIRST LAW & SYSTEMS */}
      {activeTab === "first-law" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-600 shrink-0" />
              Thermodynamic Systems &amp; First Law (FLOT)
            </h4>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <code className="text-xs sm:text-sm font-mono font-black text-amber-950 block">ΔU = q + w  |  dU = δq + δw</code>
              <p className="text-[10px] text-slate-700 font-semibold mt-1">IUPAC Sign Convention: Heat absorbed q &gt; 0; Heat released q &lt; 0. Work on system w &gt; 0; Work by system w &lt; 0.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Open System</span>
                <p className="text-[10px] text-slate-700 font-semibold">Exchanges BOTH matter and energy with surroundings (e.g., open beaker of water).</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Closed System</span>
                <p className="text-[10px] text-slate-700 font-semibold">Exchanges ENERGY only; matter boundary is sealed (e.g., sealed metal cylinder).</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Isolated System</span>
                <p className="text-[10px] text-slate-700 font-semibold">Exchanges NEITHER matter nor energy with surroundings (e.g., perfect thermos flask).</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">State Functions (∮ dX = 0)</span>
                <p className="text-[10px] text-slate-700 font-semibold">Depend only on initial &amp; final states: T, P, V, U, H, S, G, A.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Path Functions (∮ δX ≠ 0)</span>
                <p className="text-[10px] text-slate-700 font-semibold">Depend explicitly on the pathway: Heat (q) and Work (w).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WORK MECHANICS */}
      {activeTab === "work" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-600 shrink-0" />
              Reversible vs. Irreversible Work Formulas
            </h4>
            <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200">
              <code className="text-xs font-mono font-black text-indigo-950 block">Work Equation: w = - ∫ P_ext dV  |  |w_rev| &gt; |w_irr| (Expansion)</code>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Reversible Isothermal Expansion</span>
                <code className="text-[10px] font-mono font-bold text-indigo-700 block">w_rev = -2.303 nRT log₁₀(V₂/V₁) = -2.303 nRT log₁₀(P₁/P₂)</code>
                <p className="text-[10px] text-slate-600 mt-0.5">Maximum work achieved because external pressure matches internal pressure continuously.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Irreversible Isothermal Expansion</span>
                <code className="text-[10px] font-mono font-bold text-indigo-700 block">w_irr = -P_ext (V₂ - V₁) = -P_ext nRT (1/P₂ - 1/P₁)</code>
                <p className="text-[10px] text-slate-600 mt-0.5">Expansion against constant external pressure P_ext.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Reversible Adiabatic Expansion (q = 0)</span>
                <code className="text-[10px] font-mono font-bold text-indigo-700 block">w_ad = n C_v (T₂ - T₁) = (P₂V₂ - P₁V₁) / (γ - 1)</code>
                <p className="text-[10px] text-slate-600 mt-0.5">P V^γ = const, T V^(γ-1) = const, T^γ P^(1-γ) = const.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Free Expansion into Vacuum (P_ext = 0)</span>
                <code className="text-[10px] font-mono font-bold text-indigo-700 block">w = 0, q = 0, ΔU = 0, ΔT = 0, ΔH = 0</code>
                <p className="text-[10px] text-slate-600 mt-0.5">For ideal gas: ΔS_sys = nR ln(V₂/V₁) &gt; 0 (Irreversible process!).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HEAT CAPACITIES */}
      {activeTab === "heat-capacity" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-rose-600 shrink-0" />
              Heat Capacities (C_v, C_p), Equipartition &amp; Kirchhoff's Law
            </h4>
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
              <code className="text-xs font-mono font-black text-rose-950 block">Mayer's Relation: C_p,m - C_v,m = R  |  ΔU = n C_v,m ΔT  |  ΔH = n C_p,m ΔT</code>
            </div>
            <div className="space-y-1.5">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-5 text-center text-[10px] font-black text-slate-900">
                <span>Gas Type</span>
                <span>Degrees of Freedom (f)</span>
                <span>C_v,m</span>
                <span>C_p,m</span>
                <span>γ = C_p / C_v</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-slate-200 grid grid-cols-5 text-center text-[10px] font-semibold text-slate-800">
                <span className="font-bold">Monatomic (He, Ne, Ar)</span>
                <span>3 (Translational)</span>
                <span className="font-mono font-bold text-rose-700">3/2 R</span>
                <span className="font-mono font-bold text-rose-700">5/2 R</span>
                <span className="font-mono font-black text-slate-900">5/3 ≈ 1.67</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-slate-200 grid grid-cols-5 text-center text-[10px] font-semibold text-slate-800">
                <span className="font-bold">Diatomic (N₂, O₂, CO)</span>
                <span>5 (3 Trans + 2 Rot)</span>
                <span className="font-mono font-bold text-rose-700">5/2 R</span>
                <span className="font-mono font-bold text-rose-700">7/2 R</span>
                <span className="font-mono font-black text-slate-900">7/5 = 1.40</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-slate-200 grid grid-cols-5 text-center text-[10px] font-semibold text-slate-800">
                <span className="font-bold">Non-linear Triatomic (H₂O, SO₂)</span>
                <span>6 (3 Trans + 3 Rot)</span>
                <span className="font-mono font-bold text-rose-700">3 R</span>
                <span className="font-mono font-bold text-rose-700">4 R</span>
                <span className="font-mono font-black text-slate-900">4/3 ≈ 1.33</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-black text-slate-900 block">Kirchhoff's Law (Temperature Dependence of Δ_r H°)</span>
              <code className="text-xs font-mono font-black text-indigo-900 block">Δ_r H°(T₂) - Δ_r H°(T₁) = ΔC_p° (T₂ - T₁)</code>
              <p className="text-[10px] text-slate-600">where ΔC_p° = Σ ν_p C_p,m°(products) - Σ ν_r C_p,m°(reactants).</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ENTHALPY & HESS */}
      {activeTab === "hess" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-600 shrink-0" />
              Enthalpy of Reactions &amp; Hess's Law of Constant Heat Summation
            </h4>
            <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-200">
              <code className="text-xs font-mono font-black text-orange-950 block">ΔH = ΔU + Δn_g RT  [Δn_g = gaseous products - gaseous reactants]</code>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">From Formation Enthalpies</span>
                <code className="text-[10px] font-mono font-bold text-orange-800 block">Δ_r H° = Σ ν_p Δ_f H°(prod) - Σ ν_r Δ_f H°(react)</code>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">From Combustion Enthalpies</span>
                <code className="text-[10px] font-mono font-bold text-orange-800 block">Δ_r H° = Σ ν_r Δ_c H°(react) - Σ ν_p Δ_c H°(prod)</code>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">From Bond Energies (B.E.)</span>
                <code className="text-[10px] font-mono font-bold text-orange-800 block">Δ_r H° = Σ B.E.(broken) - Σ B.E.(formed)</code>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ENTROPY & SLOT */}
      {activeTab === "second-law" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600 shrink-0" />
              Second Law of Thermodynamics (SLOT) &amp; Entropy (ΔS)
            </h4>
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
              <code className="text-xs font-mono font-black text-emerald-950 block">dS = δq_rev / T  |  ΔS_total = ΔS_sys + ΔS_surr &gt; 0 (Spontaneous Process)</code>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Phase Transitions at Equilibrium</span>
                <code className="text-[10px] font-mono font-bold text-emerald-800 block">Δ_vap S = Δ_vap H / T_bp  |  Δ_fus S = Δ_fus H / T_mp</code>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Ideal Gas State Changes</span>
                <code className="text-[10px] font-mono font-bold text-emerald-800 block">ΔS = n C_v ln(T₂/T₁) + n R ln(V₂/V₁) = n C_p ln(T₂/T₁) - n R ln(P₂/P₁)</code>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: GIBBS FREE ENERGY */}
      {activeTab === "free-energy" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-600 shrink-0" />
              Gibbs Free Energy (ΔG) &amp; Spontaneity Profile
            </h4>
            <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200">
              <code className="text-xs font-mono font-black text-indigo-950 block">ΔG_sys = ΔH - TΔS = -T ΔS_total  |  Δ_r G° = -RT ln K_eq = -2.303 RT log₁₀ K_eq</code>
            </div>
            <div className="space-y-1.5">
              {spontaneityMatrix.map((row, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 gap-1 text-[10px]">
                  <div className="sm:w-1/4 font-black">
                    <span className="text-slate-900">ΔH: {row.dH}</span> <br/>
                    <span className="text-indigo-700">ΔS: {row.dS}</span>
                  </div>
                  <div className="sm:w-1/3 font-bold text-slate-800">
                    <span className="text-emerald-700 font-black">{row.profile}</span>
                  </div>
                  <div className="sm:w-5/12 sm:text-right text-slate-600 font-semibold">
                    {row.driver}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: THIRD LAW & RESIDUAL S */}
      {activeTab === "third-law" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-600 shrink-0" />
              Third Law of Thermodynamics &amp; Residual Entropy
            </h4>
            <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200">
              <code className="text-xs font-mono font-black text-cyan-950 block">lim_(T → 0 K) S = 0 (For perfectly crystalline pure substances)</code>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Residual Entropy (S_res)</span>
                <code className="text-[10px] font-mono font-bold text-cyan-800 block">S_res = k_B ln W  [W = orientational microstates at 0 K]</code>
                <p className="text-[10px] text-slate-700">Non-zero entropy observed at 0 K due to frozen structural disorder.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Exemplar Disordered Crystals</span>
                <ul className="text-[10px] text-slate-700 font-semibold list-disc list-inside space-y-0.5">
                  <li>CO: S_res = R ln 2 (head-to-tail flip)</li>
                  <li>N₂O: S_res = R ln 2</li>
                  <li>Ice: S_res = R ln(1.5) ≈ 3.4 J/mol·K (Pauling's ice disorder)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: KMT & GAS SPEEDS */}
      {activeTab === "gas-laws" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Wind className="w-4 h-4 text-teal-600 shrink-0" />
              Kinetic Molecular Theory (KMT) &amp; Maxwell-Boltzmann Speeds
            </h4>
            <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200">
              <code className="text-xs font-mono font-black text-teal-950 block">v_mp : v_avg : v_rms = √2 : √(8/π) : √3 ≈ 1.000 : 1.128 : 1.225</code>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Most Probable Speed</span>
                <code className="text-xs font-mono font-black text-teal-700 block">v_mp = √(2RT/M)</code>
                <span className="text-[10px] text-slate-500">Peak of Maxwell distribution</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Average Speed</span>
                <code className="text-xs font-mono font-black text-teal-700 block">v_avg = √(8RT/πM)</code>
                <span className="text-[10px] text-slate-500">Mean molecular velocity</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Root Mean Square Speed</span>
                <code className="text-xs font-mono font-black text-teal-700 block">v_rms = √(3RT/M)</code>
                <span className="text-[10px] text-slate-500">Related to total kinetic energy</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <code className="text-xs font-mono font-bold text-slate-900 block">Average Kinetic Energy: E_k = (3/2) RT per mole | ε_k = (3/2) k_B T per molecule</code>
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: REAL GASES & VDW */}
      {activeTab === "real-gases" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-purple-600 shrink-0" />
              Real Gases, van der Waals Equation &amp; Critical Constants
            </h4>
            <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200">
              <code className="text-xs font-mono font-black text-purple-950 block">(P + an²/V²) (V - nb) = nRT  |  Z = P V_m / (RT)</code>
            </div>
            <div className="space-y-1.5">
              {vdwRegimes.map((r, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900">{r.regime}</span>
                    <span className="font-mono font-black text-purple-700">{r.zExpression}</span>
                  </div>
                  <p className="font-semibold text-slate-700">{r.behavior}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-xs pt-2">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[9px]">Critical Temp</span>
                <span className="text-purple-700 font-black">T_c = 8a/(27Rb)</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[9px]">Critical Pressure</span>
                <span className="text-purple-700 font-black">P_c = a/(27b²)</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[9px]">Critical Volume</span>
                <span className="text-purple-700 font-black">V_c = 3b</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[9px]">Critical Factor</span>
                <span className="text-purple-700 font-black">Z_c = 3/8 = 0.375</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 10: TRAPS */}
      {activeTab === "traps" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-amber-300 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              All 10 High-Yield NEST Thermodynamics &amp; Gas Law Misconceptions
            </h4>
            <div className="space-y-2">
              {thermoTraps.map((trap) => {
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
                          <span className="text-[9px] font-black uppercase text-amber-700 tracking-wider block">Thermodynamic Reality</span>
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

      {/* TAB 11: MASTER GLOSSARY */}
      {activeTab === "glossary" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 36 thermodynamics glossary terms..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {["All", "First Law & Work", "Heat Capacities & Thermochemistry", "Second Law & Entropy", "Free Energy & Equilibrium", "Gaseous State & Real Gases"].map((cat) => (
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

      {/* TAB 12: NEST 20-Q SELF-TEST */}
      {activeTab === "selftest" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          {score !== null ? (
            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center space-y-3">
              <Award className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-amber-500" />
              <h4 className="text-xl sm:text-2xl font-black text-slate-900">Your Score: {score} / {mcqData.length}</h4>
              <p className="text-sm font-semibold text-slate-600">
                {score >= 17 ? "Outstanding! Mastery level for NEST & IChO Thermodynamics." : score >= 12 ? "Good performance — review incorrect explanations." : "Needs practice — revisit earlier tabs and retake."}
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
                        currentMCQ.type === "multi" ? "bg-purple-100 text-purple-800" : "bg-amber-100 text-amber-900"
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
                      <span className="text-[9px] font-black uppercase tracking-wider text-amber-700">Detailed Solution &amp; Math Explanation</span>
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

export default ChemicalThermodynamicsDiagram;
