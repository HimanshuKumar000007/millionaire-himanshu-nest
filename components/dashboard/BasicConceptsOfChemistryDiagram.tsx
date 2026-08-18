"use client";

import React, { useState } from "react";
import {
  FlaskConical,
  Atom,
  Calculator,
  Layers,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  BookOpen,
  Scale,
  Flame,
  Beaker,
  Microscope,
  TrendingUp,
  BarChart3,
  ChevronRight,
  ChevronDown,
  RotateCcw,
  Zap,
  Award,
  Search,
  Check,
} from "lucide-react";

// ============================================================================
// 1. DATA: LAWS OF CHEMICAL COMBINATION
// ============================================================================
interface Law {
  id: string;
  name: string;
  formulator: string;
  year: string;
  postulate: string;
  formula: string;
  exception: string;
  color: "indigo" | "purple" | "emerald" | "amber" | "rose";
}

const chemicalLaws: Law[] = [
  {
    id: "conservation",
    name: "Law of Conservation of Mass",
    formulator: "Antoine Lavoisier",
    year: "1789",
    postulate: "In any physical or chemical change, total mass of reactants equals total mass of products.",
    formula: "Σ m(reactants) = Σ m(products)",
    exception: "Nuclear Reactions: mass converts to energy via ΔE = Δm·c², causing a measurable mass defect (Δm).",
    color: "indigo",
  },
  {
    id: "definite",
    name: "Law of Definite / Constant Proportions",
    formulator: "Joseph Proust",
    year: "1799",
    postulate: "A pure compound always contains its elements in the exact same fixed proportion by mass, regardless of origin or method of preparation.",
    formula: "m_A / m_B = Constant",
    exception: "1. Isotopic Variation: ¹²C vs ¹⁴C in CO₂ alters mass ratios. 2. Non-Stoichiometric Berthollides: Fe₀.₉₅O and Cu₁.₈S exhibit variable cation-vacancy lattice ratios.",
    color: "purple",
  },
  {
    id: "multiple",
    name: "Law of Multiple Proportions",
    formulator: "John Dalton",
    year: "1803",
    postulate: "When two elements form more than one compound, the different masses of one element combining with a fixed mass of the other are in a simple whole-number ratio.",
    formula: "m_B1 : m_B2 : m_B3 = n₁ : n₂ : n₃",
    exception: "Fails for complex organic polymers (e.g., C₂₀H₄₂ vs C₂₁H₄₄) where mass ratios yield large, non-simple numbers.",
    color: "emerald",
  },
  {
    id: "reciprocal",
    name: "Law of Reciprocal Proportions",
    formulator: "Jeremias Richter",
    year: "1792",
    postulate: "The ratio of masses of two elements A and B combining separately with a fixed mass of C is either identical to or a simple multiple of their direct combination mass ratio.",
    formula: "(m_A/m_C) / (m_B/m_C) = k × (m_A/m_B)_direct",
    exception: "Fails when elements exhibit multiple oxidation states when combining with C (e.g., SO₂ vs SO₃).",
    color: "amber",
  },
  {
    id: "gaylussac",
    name: "Gay-Lussac's Law of Combining Volumes",
    formulator: "Joseph Louis Gay-Lussac",
    year: "1808",
    postulate: "Gases react at constant T and P in volumes bearing simple whole-number ratios to each other and to gaseous products.",
    formula: "V(R1) : V(R2) : V(P) = a : b : c",
    exception: "Valid strictly for ideal gases. Real gases deviate due to non-ideal compressibility factors (Z ≠ 1).",
    color: "rose",
  },
];

// ============================================================================
// 2. DATA: STP CONDITIONS
// ============================================================================
interface STPEntry {
  label: string;
  T: string;
  P: string;
  Vm: string;
  badge: string;
  highlight: boolean;
}

const stpData: STPEntry[] = [
  { label: "IUPAC Current STP", T: "273.15 K (0°C)", P: "1.0 bar (10⁵ Pa)", Vm: "22.7109 L/mol = 22.71 dm³/mol", badge: "Since 1982", highlight: true },
  { label: "Old Classical STP", T: "273.15 K (0°C)", P: "1.0 atm (101.325 kPa)", Vm: "22.414 L/mol = 22.4 dm³/mol", badge: "Pre-1982", highlight: false },
  { label: "SATP (Standard Ambient T & P)", T: "298.15 K (25°C)", P: "1.0 bar", Vm: "24.789 L/mol", badge: "Room Temp", highlight: false },
];

// ============================================================================
// 3. DATA: CONCENTRATION TERMS
// ============================================================================
interface ConcentrationTerm {
  id: string;
  name: string;
  symbol: string;
  formula: string;
  units: string;
  tempDependence: "independent" | "dependent";
  notes: string;
}

const concentrationTerms: ConcentrationTerm[] = [
  { id: "ww", name: "Mass Percentage", symbol: "% w/w", formula: "[w_B / (w_A + w_B)] × 100", units: "Dimensionless (%)", tempDependence: "independent", notes: "Most temperature-stable expression; mass is invariant." },
  { id: "vv", name: "Volume Percentage", symbol: "% v/v", formula: "[V_B / (V_A + V_B)] × 100", units: "Dimensionless (%)", tempDependence: "dependent", notes: "Temperature-dependent due to volumetric expansion." },
  { id: "wv", name: "Mass by Volume", symbol: "% w/v", formula: "[w_B(g) / V_soln(mL)] × 100", units: "g/dL or %", tempDependence: "dependent", notes: "Common in clinical/pharmacy formulations; temperature-dependent." },
  { id: "ppm", name: "Parts Per Million", symbol: "ppm", formula: "(w_B / w_total) × 10⁶", units: "ppm", tempDependence: "independent", notes: "w/w ppm is T-independent; v/v ppm is T-dependent. Used for trace pollutants." },
  { id: "mf", name: "Mole Fraction", symbol: "x_B", formula: "n_B / (n_A + n_B)", units: "Dimensionless", tempDependence: "independent", notes: "Sum of all mole fractions in a mixture always equals 1: x_A + x_B = 1." },
  { id: "molarity", name: "Molarity", symbol: "M", formula: "n_B / V_soln(L) = (w_B × 1000) / (M_B × V_soln(mL))", units: "mol/L (M)", tempDependence: "dependent", notes: "Decreases as temperature increases due to solvent thermal expansion (V ∝ T)." },
  { id: "molality", name: "Molality", symbol: "m", formula: "n_B / w_A(kg) = (w_B × 1000) / (M_B × w_A(g))", units: "mol/kg (m)", tempDependence: "independent", notes: "Preferred for colligative property derivations (ΔT_b, ΔT_f); completely T-independent." },
  { id: "normality", name: "Normality", symbol: "N", formula: "Gram Equivalents of B / V_soln(L) = M × n-factor", units: "eq/L (N)", tempDependence: "dependent", notes: "Depends on reaction context (acidity, basicity, or redox electron transfer n-factor)." },
];

// ============================================================================
// 4. DATA: NEST MISCONCEPTIONS & TRAPS (10 TRAPS)
// ============================================================================
interface Misconception {
  id: string;
  trap: string;
  reality: string;
  tip: string;
}

const nestTraps: Misconception[] = [
  { id: "t1", trap: "Molarity of a solution remains constant as temperature changes.", reality: "Molarity DECREASES as temperature increases because solution volume expands (V ∝ T) while solute moles stay invariant (M = n/V).", tip: "Molality (m) and Mole Fraction (x) are mass-based and strictly temperature-independent." },
  { id: "t2", trap: "At STP, 1 mole of any ideal gas occupies exactly 22.4 Liters.", reality: "At current IUPAC STP (0°C, 1.0 bar), V_m = 22.71 L/mol. The 22.414 L value applies only to the legacy pre-1982 STP (1.0 atm = 1.01325 bar).", tip: "Check question framing: 1 bar → 22.71 L/mol; 1 atm → 22.414 L/mol." },
  { id: "t3", trap: "The limiting reagent is always the reactant present in the smallest initial mass or moles.", reality: "The limiting reagent depends strictly on initial moles divided by stoichiometric coefficients (n_i / coeff), NOT raw mass or moles alone.", tip: "Always divide initial moles by balanced equation coefficients before comparing." },
  { id: "t4", trap: "Vapor Density is equal to Molar Mass.", reality: "Molar Mass = 2 × Vapor Density. Vapor Density (VD) is the relative density compared to H₂ (M_H₂ = 2.016 g/mol).", tip: "VD = M_gas / 2 → M = 2 × VD." },
  { id: "t5", trap: "1 amu is equal to the exact mass of one hydrogen atom.", reality: "1 u (or 1 Da) is defined strictly as 1/12th the mass of a single neutral ¹²C atom (1.66054 × 10⁻²⁴ g). A hydrogen atom mass is 1.0078 u.", tip: "The ¹²C isotope standard was internationally adopted in 1961." },
  { id: "t6", trap: "Law of Definite Proportions holds for non-stoichiometric Berthollide compounds.", reality: "Berthollide compounds like Wüstite (Fe₀.₉₅O) and Cu₁.₈S violate Proust's Law due to variable crystal lattice defect vacancies.", tip: "Proust's Law holds strictly for stoichiometric Daltoides." },
  { id: "t7", trap: "When equal volumes of 1 M HCl and 1 M H₂SO₄ are mixed, the mixture [H⁺] is 1 M.", reality: "1 M H₂SO₄ produces 2 M H⁺ (dibasic). The mixed [H⁺] = [1(1) + 2(1)] / (1 + 1) = 3 / 2 = 1.5 M.", tip: "Always account for the acid/base n-factor (H₂SO₄ → 2H⁺, n=2)." },
  { id: "t8", trap: "Equal masses of O₂ and N₂ contain equal numbers of molecules.", reality: "Moles differ because molar masses differ (M_O₂ = 32 g/mol, M_N₂ = 28 g/mol). Since n = w/M, n_N₂ > n_O₂ for equal mass w.", tip: "Equal moles or equal gas volumes (at same T, P) contain equal molecules (Avogadro)." },
  { id: "t9", trap: "Empirical formula mass is always equal to molecular mass.", reality: "Empirical formula mass equals molecular mass ONLY when n = 1. In general, Molecular Mass = n × (Empirical Formula Mass), where n is an integer.", tip: "n = Molar Mass / Empirical Formula Mass (n = 1, 2, 3...)." },
  { id: "t10", trap: "The unit of Molality is moles per liter of solution.", reality: "Molality is moles of solute per KILOGRAM OF SOLVENT (mol/kg). Molarity is moles per liter of solution (mol/L).", tip: "Denominator in molality is mass of pure solvent in kg, not solution volume." },
];

// ============================================================================
// 5. DATA: MASTER GLOSSARY (42 DEFINITIONS)
// ============================================================================
interface GlossaryTerm {
  term: string;
  definition: string;
  category: "Stoichiometry" | "Solutions" | "Gas Laws & Eudiometry" | "Atomic Scale & Principles" | "Analytical & General";
}

const masterGlossary: GlossaryTerm[] = [
  { term: "Absolute Zero", definition: "0 K = -273.15°C, the theoretical thermodynamic temperature at which all classical molecular translational kinetic energy ceases.", category: "Gas Laws & Eudiometry" },
  { term: "Accuracy", definition: "The closeness of agreement between a single measured value and the true accepted reference value.", category: "Analytical & General" },
  { term: "Aliquot", definition: "A measured exact sub-sample volume taken from a larger homogeneous liquid mixture.", category: "Analytical & General" },
  { term: "Amorphous Solid", definition: "A non-crystalline solid lacking long-range three-dimensional translational periodic order (e.g., glass, polymers).", category: "Analytical & General" },
  { term: "Anode (+)", definition: "The positive electrode in an electrolytic/electrochemical cell toward which negatively charged anions migrate.", category: "Analytical & General" },
  { term: "Average Atomic Mass (Ā)", definition: "The abundance-weighted average of isotopic masses: Ā = Σ (f_i · A_i) = Σ (%_i · A_i) / 100.", category: "Atomic Scale & Principles" },
  { term: "Avogadro's Constant (N_A)", definition: "Exactly 6.02214076 × 10²³ elementary entities per mole (SI 2019 redefinition standard).", category: "Atomic Scale & Principles" },
  { term: "Berthollides", definition: "Non-stoichiometric chemical compounds exhibiting variable elemental mass ratios due to lattice vacancies (e.g., Fe₀.₉₅O).", category: "Stoichiometry" },
  { term: "Boyle's Temperature (T_b)", definition: "The characteristic temperature at which a real gas behaves ideally over an extended pressure range (Z ≈ 1).", category: "Gas Laws & Eudiometry" },
  { term: "Carat", definition: "Unit of gold purity (24 carat = 100% pure gold) or gemstone mass (1 carat = 200 mg = 0.2 g).", category: "Analytical & General" },
  { term: "Concentration", definition: "Quantitative measure of the amount of solute dissolved in a specified volume of solution or mass of solvent.", category: "Solutions" },
  { term: "Dalton (Da / u)", definition: "Unified atomic mass unit defined as 1/12th the rest mass of an unbound neutral ¹²C atom ≈ 1.66054 × 10⁻²⁴ g = 1/N_A g.", category: "Atomic Scale & Principles" },
  { term: "Daltoides", definition: "Stoichiometric chemical compounds that strictly obey the classical Law of Definite Proportions.", category: "Stoichiometry" },
  { term: "Density (d)", definition: "Mass per unit volume (d = m / V), commonly expressed in g/cm³, g/mL, or kg/m³.", category: "Analytical & General" },
  { term: "Dilution Law", definition: "M₁V₁ = M₂V₂ and N₁V₁ = N₂V₂, reflecting the invariance of solute moles upon adding pure solvent.", category: "Solutions" },
  { term: "Dulong-Petit Law", definition: "Empirical rule: Approximate Atomic Mass × Specific Heat (cal/g·°C) ≈ 6.4 for solid heavy metals.", category: "Atomic Scale & Principles" },
  { term: "Elution", definition: "The chromatographic process of extracting an adsorbed solute from an adsorbent stationary phase using a suitable solvent.", category: "Analytical & General" },
  { term: "Empirical Formula (EF)", definition: "The simplest whole-number ratio of atoms of each element present in a chemical compound.", category: "Stoichiometry" },
  { term: "Equivalent Mass", definition: "Mass of a substance combining with or displacing 1.008 g H, 8.00 g O, or 35.45 g Cl (Eq Mass = Molar Mass / n-factor).", category: "Solutions" },
  { term: "Eudiometry", definition: "Quantitative gas-phase analytical method evaluating molecular formulas and gas compositions via explosion and selective absorption.", category: "Gas Laws & Eudiometry" },
  { term: "Formality (F)", definition: "Concentration expressed as gram-formula-weights of an ionic solute per liter of solution (used for ionic compounds).", category: "Solutions" },
  { term: "Gay-Lussac's Law", definition: "Reacting gas volumes at identical T and P combine in simple whole-number ratios with each other and gaseous products.", category: "Gas Laws & Eudiometry" },
  { term: "Gram Atomic Mass (GAM)", definition: "The mass in grams of one mole (6.022 × 10²³) of neutral atoms of an element.", category: "Atomic Scale & Principles" },
  { term: "Gram Molecular Mass (GMM)", definition: "The mass in grams of one mole (6.022 × 10²³) of covalent molecules of a substance.", category: "Atomic Scale & Principles" },
  { term: "Isotopes", definition: "Atoms of the same element containing identical atomic numbers (Z) but differing mass numbers (A) due to neutron variance.", category: "Atomic Scale & Principles" },
  { term: "Limiting Reagent (LR)", definition: "The reactant completely consumed first in a chemical reaction, setting the theoretical upper limit on product yield.", category: "Stoichiometry" },
  { term: "Mass Defect (Δm)", definition: "The mass difference between constituent nucleons and the bound nucleus, released as binding energy (ΔE = Δm·c²).", category: "Atomic Scale & Principles" },
  { term: "Molar Mass (M)", definition: "The mass in grams of one mole of a chemical entity (g/mol).", category: "Stoichiometry" },
  { term: "Molarity (M)", definition: "Moles of solute dissolved per liter of solution (mol/L); temperature-dependent.", category: "Solutions" },
  { term: "Molality (m)", definition: "Moles of solute dissolved per kilogram of solvent (mol/kg); strictly temperature-independent.", category: "Solutions" },
  { term: "Mole (mol)", definition: "SI base unit containing exactly 6.02214076 × 10²³ elementary entities.", category: "Atomic Scale & Principles" },
  { term: "Mole Fraction (x_i)", definition: "Dimensionless ratio of moles of a specific component to total moles in a mixture (Σ x_i = 1).", category: "Solutions" },
  { term: "Molecular Formula (MF)", definition: "The formula expressing the actual number of atoms of each element in a single molecule: MF = (EF)_n.", category: "Stoichiometry" },
  { term: "Normality (N)", definition: "Gram equivalents of solute dissolved per liter of solution: N = M × n-factor (eq/L).", category: "Solutions" },
  { term: "Parts Per Million (ppm)", definition: "Ratio of solute mass to total mass multiplied by 10⁶: ppm = (w_solute / w_total) × 10⁶.", category: "Solutions" },
  { term: "Percentage Purity", definition: "(Mass of pure reactive component / Total mass of impure sample) × 100.", category: "Stoichiometry" },
  { term: "Percentage Yield", definition: "(Actual experimental product yield / Theoretical stoichiometric yield) × 100.", category: "Stoichiometry" },
  { term: "Precision", definition: "The closeness of agreement among independent repeated measurements of the same quantity under identical conditions.", category: "Analytical & General" },
  { term: "Specific Gravity", definition: "Dimensionless ratio of the density of a substance to the density of pure water at 4°C (1.000 g/cm³).", category: "Analytical & General" },
  { term: "Stoichiometry", definition: "Quantitative mathematical study of reactants and products in a balanced chemical transformation.", category: "Stoichiometry" },
  { term: "Sublimation", definition: "Direct phase transition from solid phase to gas phase without passing through an intermediate liquid state.", category: "Analytical & General" },
  { term: "Vapor Density (VD)", definition: "Ratio of gas density to Hydrogen gas density at identical T and P: VD = M_gas / 2.016 → M ≈ 2 × VD.", category: "Gas Laws & Eudiometry" },
];

// ============================================================================
// 6. DATA: EUDIOMETRY ABSORBERS
// ============================================================================
interface Absorber {
  gas: string;
  formula: string;
  absorber: string;
}

const eudiometryAbsorbers: Absorber[] = [
  { gas: "Carbon Dioxide & Sulfur Dioxide", formula: "CO₂, SO₂", absorber: "Concentrated KOH solution (Ascharite)" },
  { gas: "Oxygen", formula: "O₂", absorber: "Alkaline Pyrogallol solution" },
  { gas: "Water Vapor", formula: "H₂O", absorber: "Anhydrous CaCl₂ / Mg(ClO₄)₂ / P₄O₁₀ / Conc. H₂SO₄" },
  { gas: "Carbon Monoxide", formula: "CO", absorber: "Ammoniacal Cuprous Chloride (Cu₂Cl₂)" },
  { gas: "Ozone", formula: "O₃", absorber: "Turpentine Oil / Cinnamon Oil" },
  { gas: "Nitrogen Dioxide", formula: "NO₂", absorber: "Water (H₂O)" },
  { gas: "Ammonia", formula: "NH₃", absorber: "Dilute Acid / Water" },
];

// ============================================================================
// 7. DATA: ALL 20 NEST HIGH-RIGOR ASSESSMENT QUESTIONS
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
    question: "An inorganic salt of a trivalent metal M (A_M ≈ unknown) contains 38.0% chlorine by mass. If the specific heat capacity of the solid metal M is 0.052 cal/g·°C, what is the exact atomic mass of metal M according to the Dulong-Petit Law?",
    options: [
      { key: "A", text: "52.00 g/mol" },
      { key: "B", text: "173.28 g/mol" },
      { key: "C", text: "86.64 g/mol" },
      { key: "D", text: "27.00 g/mol" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "1. Approx. Atomic Mass = 6.4 / Specific Heat = 6.4 / 0.052 ≈ 123.08 g/mol. 2. In metal chloride MCl₃: 38.0g Cl combines with 62.0g M. Equivalent Mass = (62.0 / 38.0) × 35.45 = 57.83 g/eq. 3. Valency = 123.08 / 57.83 = 2.13 ≈ 3 (trivalent metal). 4. Exact Atomic Mass = Equivalent Mass × Valency = 57.83 × 3 = 173.49 g/mol ≈ 173.28 g/mol.",
  },
  {
    id: 2,
    part: "A",
    question: "A concentrated aqueous solution of Sulfuric Acid (H₂SO₄, M_B = 98.08 g/mol) has a density of 1.84 g/mL and contains 98.0% H₂SO₄ by mass (% w/w). What is the Molarity (M) and Molality (m) of this acid solution, respectively?",
    options: [
      { key: "A", text: "M = 18.40 M; m = 500.00 m" },
      { key: "B", text: "M = 9.20 M; m = 250.00 m" },
      { key: "C", text: "M = 18.40 M; m = 250.00 m" },
      { key: "D", text: "M = 36.80 M; m = 500.00 m" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "1. Molarity = (% w/w × d × 10) / M_B = (98.0 × 1.84 × 10) / 98.08 = 18.38 M ≈ 18.40 M. 2. In 100g solution: w_B = 98.0g H₂SO₄, w_A = 2.0g H₂O = 0.002 kg. Solute moles = 98.0 / 98.08 = 0.9992 mol. Molality = 0.9992 / 0.002 = 499.6 m ≈ 500.00 m.",
  },
  {
    id: 3,
    part: "A",
    question: "When 100 mL of 0.2 M Ba(OH)₂ is mixed with 100 mL of 0.3 M H₃PO₄, a precipitate of Barium Phosphate Ba₃(PO₄)₂ (M_B = 601.9 g/mol) forms. Assuming complete precipitation, what mass of Ba₃(PO₄)₂ is formed, and which reactant acts as the limiting reagent?",
    options: [
      { key: "A", text: "4.01 g; Ba(OH)₂ is the Limiting Reagent" },
      { key: "B", text: "6.02 g; H₃PO₄ is the Limiting Reagent" },
      { key: "C", text: "12.04 g; Ba(OH)₂ is the Limiting Reagent" },
      { key: "D", text: "2.01 g; Both reactants are stoichiometric" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "1. Balanced Equation: 3 Ba(OH)₂ + 2 H₃PO₄ → Ba₃(PO₄)₂↓ + 6 H₂O. 2. Initial Moles: n(Ba(OH)₂) = 0.100 × 0.2 = 0.020 mol; n(H₃PO₄) = 0.100 × 0.3 = 0.030 mol. 3. Stoichiometric Ratios: Ba(OH)₂ = 0.020/3 = 0.00667; H₃PO₄ = 0.030/2 = 0.0150. Since 0.00667 < 0.0150, Ba(OH)₂ is LR. 4. Moles precipitate = 0.020 / 3 = 0.00667 mol. Mass = 0.00667 × 601.9 = 4.01 g.",
  },
  {
    id: 4,
    part: "A",
    question: "Complete combustion of 10 mL of a gaseous hydrocarbon CₓHᵧ requires 65 mL of pure O₂ gas for complete oxidation. After cooling to room temperature, the residual gas volume shrinks by 40 mL upon passage through a concentrated KOH tube. What is the molecular formula of the hydrocarbon?",
    options: [
      { key: "A", text: "C₃H₈" },
      { key: "B", text: "C₄H₁₀" },
      { key: "C", text: "C₄H₈" },
      { key: "D", text: "C₃H₆" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "1. Eudiometric combustion: CₓHᵧ + (x + y/4) O₂ → x CO₂ + (y/2) H₂O(l). 2. CO₂ volume = contraction with KOH = 40 mL. For 10 mL hydrocarbon: 10x = 40 → x = 4. 3. O₂ consumed: 10(x + y/4) = 65 → 4 + y/4 = 6.5 → y/4 = 2.5 → y = 10. 4. Molecular formula is C₄H₁₀ (Butane).",
  },
  {
    id: 5,
    part: "A",
    question: "A sample of hydrated Magnesium Sulfate MgSO₄·xH₂O weighing 12.32 g is heated strongly until all water of crystallization is driven off, leaving an anhydrous residue of MgSO₄ (M_B = 120.37 g/mol) weighing 6.02 g. What is the value of x in the hydrated formula?",
    options: [
      { key: "A", text: "x = 5" },
      { key: "B", text: "x = 7" },
      { key: "C", text: "x = 2" },
      { key: "D", text: "x = 10" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "1. Mass of anhydrous MgSO₄ = 6.02 g; Mass of water lost = 12.32 - 6.02 = 6.30 g. 2. n(MgSO₄) = 6.02 / 120.37 = 0.0500 mol. 3. n(H₂O) = 6.30 / 18.015 = 0.3500 mol. 4. x = n(H₂O) / n(MgSO₄) = 0.3500 / 0.0500 = 7. Formula is MgSO₄·7H₂O (Epsom Salt).",
  },
  {
    id: 6,
    part: "A",
    question: "What is the mole fraction of solute (x_B) in a 2.5 m aqueous solution of Sodium Chloride (NaCl)?",
    options: [
      { key: "A", text: "0.043" },
      { key: "B", text: "0.025" },
      { key: "C", text: "0.086" },
      { key: "D", text: "0.100" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "1. In 2.5 m solution: 2.5 mol NaCl dissolved in 1000g H₂O. 2. Moles of H₂O = 1000 / 18.015 = 55.51 mol. 3. x_B = n_B / (n_A + n_B) = 2.5 / (55.51 + 2.5) = 2.5 / 58.01 = 0.0431 ≈ 0.043.",
  },
  {
    id: 7,
    part: "A",
    question: "Equal masses of methane gas (CH₄, M = 16) and oxygen gas (O₂, M = 32) are mixed in an evacuated rigid vessel at 27°C. What is the mole fraction of methane (x_CH₄) and the average molar mass (M̄) of the gas mixture?",
    options: [
      { key: "A", text: "x_CH₄ = 0.67; M̄ = 21.33 g/mol" },
      { key: "B", text: "x_CH₄ = 0.50; M̄ = 24.00 g/mol" },
      { key: "C", text: "x_CH₄ = 0.33; M̄ = 26.67 g/mol" },
      { key: "D", text: "x_CH₄ = 0.75; M̄ = 20.00 g/mol" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "1. Let mass w = 32g for each gas. n(CH₄) = 32/16 = 2 mol; n(O₂) = 32/32 = 1 mol. Total moles = 3 mol. 2. x(CH₄) = 2/3 = 0.667 ≈ 0.67. 3. M̄ = (2/3 × 16) + (1/3 × 32) = 64/3 = 21.33 g/mol.",
  },
  {
    id: 8,
    part: "A",
    question: "A pure metallic element X forms two distinct oxides: Oxide 1 contains 50.0% metal X by mass, while Oxide 2 contains 40.0% metal X by mass. What is the simple whole-number mass ratio of Oxygen combined with a fixed mass of metal X across these two oxides, demonstrating the Law of Multiple Proportions?",
    options: [
      { key: "A", text: "1 : 2" },
      { key: "B", text: "2 : 3" },
      { key: "C", text: "3 : 4" },
      { key: "D", text: "1 : 3" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "1. In Oxide 1: 50g X + 50g O → Oxygen per 1g X = 50/50 = 1.0g. 2. In Oxide 2: 40g X + 60g O → Oxygen per 1g X = 60/40 = 1.5g. 3. Mass Ratio = 1.0 : 1.5 = 2 : 3. This integer ratio confirms Dalton's Law of Multiple Proportions.",
  },
  {
    id: 9,
    part: "A",
    question: "What is the Normality (N) of a 0.25 M aqueous solution of Phosphoric Acid (H₃PO₄) when used in a neutralization reaction where it is completely converted to Phosphate ions (PO₄³⁻)?",
    options: [
      { key: "A", text: "0.25 N" },
      { key: "B", text: "0.50 N" },
      { key: "C", text: "0.75 N" },
      { key: "D", text: "1.00 N" },
    ],
    correctKeys: ["C"],
    type: "single",
    explanation: "1. H₃PO₄ is a tribasic acid releasing 3 H⁺ ions upon complete neutralization: n-factor (basicity) = 3. 2. N = M × n-factor = 0.25 M × 3 = 0.75 N.",
  },
  {
    id: 10,
    part: "A",
    question: "At 25°C, a 1.00 L flask contains 0.10 moles of an ideal gas at pressure P. If the volume is halved to 0.50 L and the absolute temperature is doubled to 596.3 K, what is the new pressure (P₂) in terms of original pressure P?",
    options: [
      { key: "A", text: "P₂ = P" },
      { key: "B", text: "P₂ = 2P" },
      { key: "C", text: "P₂ = 4P" },
      { key: "D", text: "P₂ = 8P" },
    ],
    correctKeys: ["C"],
    type: "single",
    explanation: "1. Combined Gas Law: (P₁V₁)/T₁ = (P₂V₂)/T₂. 2. P₂ = P₁ × (V₁/V₂) × (T₂/T₁) = P × (1.00/0.50) × (2) = P × 2 × 2 = 4P.",
  },
  {
    id: 11,
    part: "B",
    question: "Which of the following concentration expressions are strictly INDEPENDENT of temperature changes?",
    options: [
      { key: "A", text: "Molality (m)" },
      { key: "B", text: "Mole Fraction (x_i)" },
      { key: "C", text: "Mass Percentage (% w/w)" },
      { key: "D", text: "Molarity (M)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are mass-based expressions (mass is temperature-invariant). D (Molarity) is volume-based (V ∝ T), which expands/contracts with temperature.",
  },
  {
    id: 12,
    part: "B",
    question: "Which of the following chemical systems or compounds represent EXCEPTIONS to Proust's Law of Definite Proportions?",
    options: [
      { key: "A", text: "Wüstite (Fe₀.₉₅O) featuring non-stoichiometric cation vacancies" },
      { key: "B", text: "Carbon Dioxide (CO₂) synthesized using pure ¹²C vs radioactive ¹⁴C isotopes" },
      { key: "C", text: "Pure synthesized Water (H₂O) prepared by burning H₂ in O₂" },
      { key: "D", text: "Cuprous sulfide (Cu₁.₈S) exhibiting variable lattice stoichiometry" },
    ],
    correctKeys: ["A", "B", "D"],
    type: "multi",
    explanation: "A & D are non-stoichiometric Berthollide compounds violating Proust's law. B alters mass % because isotopes have different atomic masses. C is stoichiometric pure water which always obeys Proust's Law (1:8 mass ratio).",
  },
  {
    id: 13,
    part: "B",
    question: "Select the correct options regarding Avogadro's Number (N_A = 6.022 × 10²³) and molar quantities:",
    options: [
      { key: "A", text: "1 mole of H₂O(l) contains 6.022 × 10²³ molecules and occupies 18.0 mL volume at 4°C" },
      { key: "B", text: "1 mole of O₂(g) at IUPAC STP (0°C, 1 bar) occupies 22.71 L" },
      { key: "C", text: "1 mole of K₄[Fe(CN)₆] contains 6 moles of Carbon atoms and 6 N_A Nitrogen atoms" },
      { key: "D", text: "1 amu is equal to the exact reciprocal of Avogadro's number in grams (1/N_A g)" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four options are fundamental, rigorous relationships based on the 2019 SI redefined Avogadro constant and chemical stoichiometry.",
  },
  {
    id: 14,
    part: "B",
    question: "Which of the following chemical absorbers correctly match their target gases in Eudiometric Gas Analysis?",
    options: [
      { key: "A", text: "Concentrated KOH solution → Absorbs CO₂ and SO₂" },
      { key: "B", text: "Alkaline Pyrogallol solution → Absorbs O₂" },
      { key: "C", text: "Turpentine Oil → Absorbs Ozone (O₃)" },
      { key: "D", text: "Anhydrous CaCl₂ → Absorbs Water Vapor (H₂O)" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four selective chemical absorbers are standard classical eudiometry reagents matched with their target absorbate gases.",
  },
  {
    id: 15,
    part: "B",
    question: "Select the valid statements regarding n-factor (valence factor) calculations for chemical species:",
    options: [
      { key: "A", text: "For KMnO₄ in strongly acidic medium: n-factor = 5 (MnO₄⁻ + 5e⁻ → Mn²⁺)" },
      { key: "B", text: "For KMnO₄ in neutral/faintly alkaline medium: n-factor = 3 (MnO₄⁻ + 3e⁻ → MnO₂)" },
      { key: "C", text: "For K₂Cr₂O₇ in acidic medium: n-factor = 6 (Cr₂O₇²⁻ + 6e⁻ → 2Cr³⁺)" },
      { key: "D", text: "For Sodium Carbonate (Na₂CO₃) in complete acid neutralization: n-factor = 2" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four statements are mathematically and chemically accurate for volumetric equivalence and redox normality calculations.",
  },
  {
    id: 16,
    part: "B",
    question: "Which of the following statements regarding the Dulong-Petit Law are TRUE?",
    options: [
      { key: "A", text: "It applies strictly to solid metallic elements" },
      { key: "B", text: "The product of approximate atomic mass and specific heat (cal/g·°C) is approximately 6.4" },
      { key: "C", text: "It fails for light non-metallic elements like Beryllium, Boron, Carbon, and Silicon" },
      { key: "D", text: "It can be used to determine the exact atomic mass directly without equivalent mass data" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are true. D is false: Dulong-Petit gives only an APPROXIMATE atomic mass. Exact mass requires combining it with equivalent mass to deduce integer valency (Exact AM = Eq Mass × Valency).",
  },
  {
    id: 17,
    part: "B",
    question: "A 0.1 M aqueous solution of Glucose (C₆H₁₂O₆) and a 0.1 M aqueous solution of Urea (NH₂CONH₂) are prepared at 25°C. Which of the following physical properties are IDENTICAL for both solutions?",
    options: [
      { key: "A", text: "Molarity (0.1 M)" },
      { key: "B", text: "Total number of dissolved solute particles per liter" },
      { key: "C", text: "Mass percentage (% w/w) of solute" },
      { key: "D", text: "Osmotic Pressure (Π = C R T)" },
    ],
    correctKeys: ["A", "B", "D"],
    type: "multi",
    explanation: "A, B, D are correct: both are non-electrolytes (van 't Hoff i=1) with identical molarity (0.1 mol/L) and osmotic pressure. C is incorrect because molar masses differ (Glucose=180 g/mol vs Urea=60 g/mol), leading to different mass percentages.",
  },
  {
    id: 18,
    part: "B",
    question: "Select the correct statements regarding Limiting Reagents (LR) in chemical reactions:",
    options: [
      { key: "A", text: "The LR is always completely consumed at 100% reaction completion" },
      { key: "B", text: "Theoretical product yield is calculated based exclusively on the stoichiometry of the LR" },
      { key: "C", text: "The LR can be identified by finding the reactant with the minimum value of (Initial Moles / Stoichiometric Coefficient)" },
      { key: "D", text: "The LR is always the reactant with the highest molar mass" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are correct: LR is completely consumed, governs theoretical yield, and is identified by min(n_i / coeff). D is false: LR depends on stoichiometric ratio, not molar mass.",
  },
  {
    id: 19,
    part: "B",
    question: "Which of the following gas samples contain the EXACT SAME total number of atoms as 16.0 g of Oxygen gas (O₂, M=32)?",
    options: [
      { key: "A", text: "14.0 g of Nitrogen gas (N₂, M=28)" },
      { key: "B", text: "22.4 L of Helium gas (He, M=4) at old STP" },
      { key: "C", text: "11.2 L of Carbon Dioxide (CO₂, M=44) at old STP" },
      { key: "D", text: "16.0 g of Ozone gas (O₃, M=48)" },
    ],
    correctKeys: ["A", "B", "D"],
    type: "multi",
    explanation: "16.0g O₂ = 0.5 mol O₂ = 1.0 mol atoms = 1.0 N_A atoms. A: 14g N₂ = 0.5 mol N₂ = 1.0 N_A atoms (CORRECT). B: 22.4 L He = 1.0 mol He (monoatomic) = 1.0 N_A atoms (CORRECT). C: 11.2 L CO₂ = 0.5 mol CO₂ = 1.5 N_A atoms (Incorrect). D: 16g O₃ = (16/48) mol O₃ = 1/3 × 3 = 1.0 N_A atoms (CORRECT).",
  },
  {
    id: 20,
    part: "B",
    question: "Select the correct options regarding the combustion analysis of an organic hydrocarbon CₓHᵧ:",
    options: [
      { key: "A", text: "Water produced by combustion is absorbed by anhydrous CaCl₂ or Mg(ClO₄)₂" },
      { key: "B", text: "Carbon dioxide produced is absorbed by concentrated KOH solution" },
      { key: "C", text: "Contraction in gas volume upon adding KOH equals the volume of CO₂ gas produced" },
      { key: "D", text: "Nitrogen in the compound is absorbed by pyrogallol" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are correct: CaCl₂ absorbs H₂O, KOH absorbs CO₂, and the volume reduction with KOH equals V_CO₂. D is incorrect: Pyrogallol absorbs Oxygen (O₂), NOT Nitrogen (N₂).",
  },
];

// ============================================================================
// COLOR STYLES
// ============================================================================
const colorStyles = {
  indigo: { badge: "bg-indigo-100 text-indigo-800 border-indigo-200", border: "border-indigo-200 hover:border-indigo-400", activeBg: "bg-indigo-950 text-white border-indigo-500", text: "text-indigo-700", header: "bg-indigo-50 border-indigo-200" },
  purple: { badge: "bg-purple-100 text-purple-800 border-purple-200", border: "border-purple-200 hover:border-purple-400", activeBg: "bg-purple-950 text-white border-purple-500", text: "text-purple-700", header: "bg-purple-50 border-purple-200" },
  emerald: { badge: "bg-emerald-100 text-emerald-800 border-emerald-200", border: "border-emerald-200 hover:border-emerald-400", activeBg: "bg-emerald-950 text-white border-emerald-500", text: "text-emerald-700", header: "bg-emerald-50 border-emerald-200" },
  amber: { badge: "bg-amber-100 text-amber-800 border-amber-200", border: "border-amber-200 hover:border-amber-400", activeBg: "bg-amber-950 text-white border-amber-500", text: "text-amber-700", header: "bg-amber-50 border-amber-200" },
  rose: { badge: "bg-rose-100 text-rose-800 border-rose-200", border: "border-rose-200 hover:border-rose-400", activeBg: "bg-rose-950 text-white border-rose-500", text: "text-rose-700", header: "bg-rose-50 border-rose-200" },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
type Tab = "laws" | "mole" | "concentration" | "stoichiometry" | "eudiometry" | "glossary" | "selftest";

export const BasicConceptsOfChemistryDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("laws");
  const [activeLawId, setActiveLawId] = useState<string>("conservation");
  const [activeConcentrationId, setActiveConcentrationId] = useState<string>("molarity");
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

  const activeLaw = chemicalLaws.find((l) => l.id === activeLawId)!;
  const activeTerm = concentrationTerms.find((t) => t.id === activeConcentrationId)!;
  const currentMCQ = mcqData[currentQ];

  const filteredQuestions = mcqData.filter((q) => {
    if (testPartFilter === "A") return q.part === "A";
    if (testPartFilter === "B") return q.part === "B";
    return true;
  });

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
    { id: "laws", label: "Chemical Laws", icon: <Scale className="w-3.5 h-3.5 shrink-0" /> },
    { id: "mole", label: "Mole & STP", icon: <Atom className="w-3.5 h-3.5 shrink-0" /> },
    { id: "concentration", label: "Concentration", icon: <Beaker className="w-3.5 h-3.5 shrink-0" /> },
    { id: "stoichiometry", label: "Stoichiometry", icon: <Calculator className="w-3.5 h-3.5 shrink-0" /> },
    { id: "eudiometry", label: "Eudiometry", icon: <Flame className="w-3.5 h-3.5 shrink-0" /> },
    { id: "glossary", label: "Master Glossary", icon: <BookOpen className="w-3.5 h-3.5 shrink-0" /> },
    { id: "selftest", label: "NEST 20-Q Test", icon: <Award className="w-3.5 h-3.5 shrink-0" /> },
  ];

  return (
    <div className="my-4 sm:my-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-slate-50 to-cyan-50/20 border border-slate-200/90 p-2.5 sm:p-7 shadow-xs space-y-4 sm:space-y-6 select-none w-full">

      {/* HEADER */}
      <div className="flex flex-col items-center text-center space-y-2.5 max-w-2xl mx-auto w-full">
        <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-100 text-cyan-800 border border-cyan-200 shadow-2xs flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-cyan-600" />
          CHEMISTRY INTERACTIVE MODULE — CHAPTER 1
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 shrink-0" />
            SOME BASIC CONCEPTS OF CHEMISTRY
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            Laws of Chemical Combination · Mole Concept · Concentration · Stoichiometry · Eudiometry · Master Glossary · NEST 20-Q Module
          </p>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-slate-100/90 rounded-xl sm:rounded-2xl border border-slate-200 w-full max-w-4xl mx-auto">
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

      {/* TAB 1: LAWS */}
      {activeTab === "laws" && (
        <div className="space-y-4 sm:space-y-5 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-1.5 sm:gap-2 max-w-4xl mx-auto w-full">
            {chemicalLaws.map((law) => {
              const c = colorStyles[law.color];
              const isActive = activeLawId === law.id;
              return (
                <button
                  key={law.id}
                  onClick={() => setActiveLawId(law.id)}
                  className={`p-2.5 rounded-xl border-2 text-left transition-all space-y-0.5 ${
                    isActive ? c.activeBg : `bg-white ${c.border}`
                  }`}
                >
                  <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-wider block ${isActive ? "text-white/70" : c.text}`}>
                    {law.formulator.split(" ").at(-1)}, {law.year}
                  </span>
                  <span className={`text-[10px] sm:text-xs font-black leading-tight block ${isActive ? "text-white" : "text-slate-900"}`}>
                    {law.name.replace("Law of ", "")}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4 max-w-4xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className={`px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-wider border ${colorStyles[activeLaw.color].badge}`}>
                  {activeLaw.formulator} — {activeLaw.year}
                </span>
                <h4 className="text-base sm:text-xl font-black text-slate-900 tracking-tight mt-1">{activeLaw.name}</h4>
              </div>
              <div className="sm:text-right">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase">Mathematical Form</span>
                <code className={`text-xs sm:text-sm font-mono font-black ${colorStyles[activeLaw.color].text}`}>{activeLaw.formula}</code>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-slate-600 block">Core Postulate</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">{activeLaw.postulate}</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 space-y-1">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-amber-800">Advanced Exceptions & Limitations</span>
              </div>
              <p className="text-xs font-bold text-amber-950 leading-relaxed">{activeLaw.exception}</p>
            </div>
          </div>
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-cyan-200 shadow-2xs space-y-2.5 max-w-4xl mx-auto w-full">
            <div className="flex items-center gap-2">
              <Atom className="w-4 h-4 text-cyan-600 shrink-0" />
              <h4 className="text-sm sm:text-base font-black text-slate-900">Avogadro's Hypothesis (1811)</h4>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
              Equal volumes of all gases under identical conditions of temperature and pressure contain an equal number of molecules:
              <span className="font-mono font-black text-cyan-700"> V ∝ n (at constant T, P)</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200">
                <span className="text-[9px] font-black uppercase tracking-wider text-cyan-700 block">Atom</span>
                <p className="text-xs font-semibold text-slate-800">Smallest particle of an element taking part in a reaction that may or may not exist independently.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200">
                <span className="text-[9px] font-black uppercase tracking-wider text-cyan-700 block">Molecule</span>
                <p className="text-xs font-semibold text-slate-800">Smallest particle of an element or compound capable of independent existence.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MOLE AND STP */}
      {activeTab === "mole" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <Microscope className="w-4 h-4 text-indigo-600 shrink-0" />
              <h4 className="text-sm sm:text-base font-black text-slate-900">The Unified Atomic Mass Unit (u / Da)</h4>
            </div>
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200">
              <code className="text-xs sm:text-sm font-mono font-black text-indigo-900 leading-loose block">1 u = 1 Da = (1/12) × mass of one neutral ¹²C atom</code>
              <code className="text-xs sm:text-sm font-mono font-black text-indigo-900 leading-loose block">≈ 1.66054 × 10⁻²⁴ g = 1.66054 × 10⁻²⁷ kg = 1/N_A g</code>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[9px] font-black uppercase text-slate-600 tracking-wider block">Relative Atomic Mass (A_r)</span>
                <code className="text-xs font-mono font-black text-slate-900">A_r = avg mass of 1 atom / (1/12 × mass of ¹²C)</code>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[9px] font-black uppercase text-slate-600 tracking-wider block">Average Atomic Mass (Ā)</span>
                <code className="text-xs font-mono font-black text-slate-900">Ā = Σ (f_i × A_i) = Σ(%_i × A_i) / 100</code>
              </div>
            </div>
          </div>
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-600 shrink-0" />
              <h4 className="text-sm sm:text-base font-black text-slate-900">Dulong-Petit Law (Heavy Solid Metals)</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                <code className="text-xs font-mono font-black text-amber-900 block">Approx. Atomic Mass × Sp. Heat (cal/g·°C) ≈ 6.4</code>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                <code className="text-xs font-mono font-black text-amber-900 block">Approx. Atomic Mass × Sp. Heat (J/g·K) ≈ 26.8</code>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <code className="text-xs font-mono font-black text-slate-900 block">Valency = Approx. A.M. / Equiv. Mass (round to nearest integer)</code>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <code className="text-xs font-mono font-black text-slate-900 block">Exact Atomic Mass = Equiv. Mass × Valency</code>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
              <p className="text-xs font-bold text-rose-900">⚠ Warning: Fails for light elements Be, B, C, Si. Only approximate — exact mass requires valency deduction.</p>
            </div>
          </div>
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-600 shrink-0" />
              <h4 className="text-sm sm:text-base font-black text-slate-900">The Mole — SI Base Unit (Since 2019: Exactly 6.02214076 × 10²³)</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { label: "Mass Interconversion", formula: "n = w / M", sub: "w = mass (g), M = molar mass (g/mol)", color: "indigo" },
                { label: "Particle Count", formula: "n = N / N_A", sub: "N = count, N_A = 6.022 × 10²³", color: "purple" },
                { label: "Gas Molar Volume", formula: "n = V_STP / V_m", sub: "V_m = 22.71 L at IUPAC STP", color: "emerald" },
              ].map((item) => {
                const c = colorStyles[item.color as keyof typeof colorStyles];
                return (
                  <div key={item.label} className={`p-3 rounded-xl border ${c.header} space-y-1 text-center`}>
                    <span className={`text-[9px] font-black uppercase tracking-wider block ${c.text}`}>{item.label}</span>
                    <code className="text-sm sm:text-base font-mono font-black text-slate-900 block">{item.formula}</code>
                    <p className="text-[10px] text-slate-600 font-semibold">{item.sub}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-slate-600 shrink-0" />
              STP Conditions & Molar Volumes (V_m)
            </h4>
            <div className="space-y-2">
              {stpData.map((s) => (
                <div key={s.label} className={`p-3 rounded-xl border ${s.highlight ? "bg-cyan-50 border-cyan-300" : "bg-slate-50 border-slate-200"} flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4`}>
                  <div className="flex items-center gap-2">
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${s.highlight ? "bg-cyan-600 text-white" : "bg-slate-200 text-slate-700"}`}>{s.badge}</span>
                    <span className="text-xs font-black text-slate-900">{s.label}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 sm:ml-auto">
                    <span className="text-[10px] font-semibold text-slate-600">T: <span className="text-slate-900 font-black">{s.T}</span></span>
                    <span className="text-[10px] font-semibold text-slate-600">P: <span className="text-slate-900 font-black">{s.P}</span></span>
                    <code className={`text-xs font-mono font-black ${s.highlight ? "text-cyan-700" : "text-slate-700"}`}>{s.Vm}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-purple-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900">Vapor Density (VD) Mechanics</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                <span className="text-[9px] font-black uppercase text-purple-700 tracking-wider block">Definition</span>
                <code className="text-xs font-mono font-black text-slate-900">VD = d_gas / d_H₂ = M_gas / 2.016</code>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                <span className="text-[9px] font-black uppercase text-purple-700 tracking-wider block">NEST Golden Relation</span>
                <code className="text-xs font-mono font-black text-slate-900">M ≈ 2 × VD</code>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[9px] font-black uppercase text-slate-600 tracking-wider block">Average Molar Mass of Gas Mixtures</span>
              <code className="text-xs font-mono font-black text-slate-900">M̄ = Σ(n_i M_i) / Σn_i = Σ(V_i M_i) / ΣV_i = Σ(x_i M_i)</code>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CONCENTRATION */}
      {activeTab === "concentration" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-black text-emerald-900 uppercase tracking-wide">Temperature-INDEPENDENT (Mass-Based)</span>
              </div>
              {concentrationTerms.filter(t => t.tempDependence === "independent").map(t => (
                <div key={t.id} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-xs font-bold text-emerald-900">{t.name} ({t.symbol})</span>
                </div>
              ))}
            </div>
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
              <div className="flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="text-xs font-black text-rose-900 uppercase tracking-wide">Temperature-DEPENDENT (Volume-Based)</span>
              </div>
              {concentrationTerms.filter(t => t.tempDependence === "dependent").map(t => (
                <div key={t.id} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                  <span className="text-xs font-bold text-rose-900">{t.name} ({t.symbol})</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
            {concentrationTerms.map((term) => {
              const isActive = activeConcentrationId === term.id;
              const isIndep = term.tempDependence === "independent";
              return (
                <button
                  key={term.id}
                  onClick={() => setActiveConcentrationId(term.id)}
                  className={`p-2 rounded-xl border-2 text-center text-[10px] sm:text-xs font-black transition-all ${
                    isActive
                      ? isIndep ? "bg-emerald-950 text-white border-emerald-500" : "bg-rose-950 text-white border-rose-500"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className="font-mono text-xs block">{term.symbol}</span>
                  <span className="text-[9px] font-semibold block mt-0.5">{term.name}</span>
                </button>
              );
            })}
          </div>
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border ${
                  activeTerm.tempDependence === "independent" ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-rose-100 text-rose-800 border-rose-200"
                }`}>
                  {activeTerm.tempDependence === "independent" ? "T-Independent" : "T-Dependent"}
                </span>
                <h4 className="text-base sm:text-xl font-black text-slate-900 mt-1">{activeTerm.name} ({activeTerm.symbol})</h4>
              </div>
              <span className="text-xs font-black text-slate-500">{activeTerm.units}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-600 block">Formula</span>
              <code className="text-xs sm:text-sm font-mono font-black text-slate-900">{activeTerm.formula}</code>
            </div>
            <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200">
              <span className="text-[9px] font-black uppercase tracking-wider text-cyan-700 block">NEST Notes</span>
              <p className="text-xs font-bold text-cyan-950">{activeTerm.notes}</p>
            </div>
          </div>
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-indigo-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-600 shrink-0" />
              Key Interconversion Formulas & Dilution Laws
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: "m from x_B", formula: "m = (x_B / x_A) × (1000 / M_A)" },
                { label: "x_B from m", formula: "x_B = m / (m + 1000/M_A)" },
                { label: "m from M & d", formula: "m = (1000 · M) / (1000 · d − M · M_B)" },
                { label: "M from %w/w & d", formula: "M = (%w/w × d × 10) / M_B" },
                { label: "M from x_B & d", formula: "M = (1000 · d · x_B) / (x_A M_A + x_B M_B)" },
                { label: "Dilution & Mixing Laws", formula: "M₁V₁ = M₂V₂  and  M_mix = Σ(M_i V_i) / ΣV_i" },
              ].map((item) => (
                <div key={item.label} className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 space-y-0.5">
                  <span className="text-[9px] font-black uppercase tracking-wider text-indigo-700">{item.label}</span>
                  <code className="text-xs font-mono font-black text-slate-900 block">{item.formula}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: STOICHIOMETRY */}
      {activeTab === "stoichiometry" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-600 shrink-0" />
              Stoichiometric Conversion Bridge
            </h4>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 overflow-x-auto pb-1">
              {[
                { step: "Mass Reactant A (g)", sub: "Given mass w_A" },
                { step: "Moles A", sub: "n_A = w_A / M_A" },
                { step: "Moles B", sub: "n_B = n_A × (b/a)" },
                { step: "Mass Product B (g)", sub: "w_B = n_B × M_B" },
              ].map((item, i, arr) => (
                <React.Fragment key={item.step}>
                  <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center min-w-[110px]">
                    <span className="text-xs font-black text-emerald-900 block">{item.step}</span>
                    <code className="text-[9px] sm:text-[10px] font-mono font-semibold text-emerald-700">{item.sub}</code>
                  </div>
                  {i < arr.length - 1 && <ChevronRight className="w-5 h-5 text-slate-400 shrink-0 rotate-90 sm:rotate-0" />}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-rose-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900">Limiting Reagent (LR) Selection Protocol</h4>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-600">Balanced Reaction: a A + b B → c C + d D</p>
            <div className="space-y-2">
              {[
                { step: "1", action: "Calculate initial moles available for each reactant (n_A and n_B)." },
                { step: "2", action: "Divide moles available by stoichiometric coefficients: n_A/a and n_B/b." },
                { step: "3", action: "Compare ratios: the reactant with the MINIMUM ratio is the Limiting Reagent (LR)." },
              ].map((item) => (
                <div key={item.step} className="flex gap-3 items-start p-2.5 rounded-xl bg-rose-50 border border-rose-200">
                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[9px] font-black flex items-center justify-center shrink-0 mt-0.5">{item.step}</span>
                  <p className="text-xs font-bold text-rose-950">{item.action}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-rose-100 border border-rose-300 text-center">
                <code className="text-xs font-mono font-black text-rose-900">n_A/a &lt; n_B/b</code>
                <p className="text-[9px] font-bold text-rose-900 mt-0.5">→ A is Limiting Reagent</p>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-100 border border-rose-300 text-center">
                <code className="text-xs font-mono font-black text-rose-900">n_B/b &lt; n_A/a</code>
                <p className="text-[9px] font-bold text-rose-900 mt-0.5">→ B is Limiting Reagent</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-center">
                <code className="text-xs font-mono font-black text-slate-700">n_A/a = n_B/b</code>
                <p className="text-[9px] font-bold text-slate-700 mt-0.5">→ Stoichiometric (both consumed)</p>
              </div>
            </div>
          </div>
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900">Reaction Yields & Sample Purity</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <span className="text-[9px] font-black uppercase text-amber-700 tracking-wider block">% Yield</span>
                <code className="text-xs font-mono font-black text-slate-900">% Yield = (Actual Experimental Yield / Theoretical Yield) × 100</code>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <span className="text-[9px] font-black uppercase text-amber-700 tracking-wider block">% Purity</span>
                <code className="text-xs font-mono font-black text-slate-900">% Purity = (Mass Pure Reactive Component / Mass Impure Sample) × 100</code>
              </div>
            </div>
          </div>
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900">Combustion Analysis & Absorption Train</h4>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <code className="text-[10px] sm:text-xs font-mono font-black text-slate-900 block">CₓHᵧO_z + (x + y/4 − z/2) O₂ → x CO₂(g) + (y/2) H₂O(l)</code>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200">
                <span className="text-[9px] font-black uppercase text-cyan-700 tracking-wider block">Absorber 1 (Water)</span>
                <p className="text-xs font-semibold text-slate-800">Anhydrous CaCl₂ or Mg(ClO₄)₂ absorbs H₂O → % H = (2/18) × (m_H₂O / m_sample) × 100</p>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200">
                <span className="text-[9px] font-black uppercase text-cyan-700 tracking-wider block">Absorber 2 (Carbon Dioxide)</span>
                <p className="text-xs font-semibold text-slate-800">Concentrated KOH solution absorbs CO₂ → % C = (12/44) × (m_CO₂ / m_sample) × 100</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-1 text-[9px] font-bold text-slate-700 flex-wrap">
              {["Elemental Mass %", "Relative Mole Ratio", "Simple Whole-Number Ratio", "Empirical Formula (EF)", "n = M/EFM", "Molecular Formula = (EF)_n"].map((step, i, arr) => (
                <React.Fragment key={step}>
                  <span className="px-2 py-1 rounded-lg bg-slate-100 border border-slate-200">{step}</span>
                  {i < arr.length - 1 && <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: EUDIOMETRY */}
      {activeTab === "eudiometry" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
              <span className="font-black text-slate-900">Eudiometry</span> is the quantitative gas-phase analytical technique analyzing gas combustion contractions and selective volume absorptions.
            </p>
          </div>
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Beaker className="w-4 h-4 text-cyan-600 shrink-0" />
              Selective Chemical Absorbers Reference
            </h4>
            <div className="space-y-1.5">
              {eudiometryAbsorbers.map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-0 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 sm:w-1/2">
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-black bg-cyan-100 text-cyan-800 font-mono">{item.formula}</span>
                    <span className="text-xs font-bold text-slate-800">{item.gas}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:block" />
                  <span className="text-xs font-black text-cyan-800 sm:w-1/2 sm:pl-2">{item.absorber}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900">General Hydrocarbon Combustion & Contractions</h4>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <code className="text-xs sm:text-sm font-mono font-black text-amber-900 block leading-loose">CₓHᵧ(g) + (x + y/4) O₂(g) → x CO₂(g) + (y/2) H₂O(l)</code>
              <code className="text-xs font-mono font-semibold text-amber-800 block mt-1">1 Vol  :  (x + y/4) Vol  :  x Vol  :  0 Vol (liquid)</code>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-600 block">Contraction ΔV₁ upon Combustion</span>
                <code className="text-xs font-mono font-black text-slate-900">ΔV₁ = 1 + y/4 Volumes</code>
                <p className="text-[10px] text-slate-600 font-semibold">(Reactants − Products, H₂O condenses to liquid)</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-600 block">Contraction ΔV₂ upon KOH Addition</span>
                <code className="text-xs font-mono font-black text-slate-900">ΔV₂ = x Volumes (= V_CO₂)</code>
                <p className="text-[10px] text-slate-600 font-semibold">(Directly reveals Carbon atom count x)</p>
              </div>
            </div>
          </div>
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-amber-300 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              All 10 High-Yield NEST Misconceptions & Traps
            </h4>
            <div className="space-y-2">
              {nestTraps.map((trap) => {
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
                        <div className="p-2 rounded-lg bg-cyan-50 border border-cyan-200">
                          <span className="text-[9px] font-black uppercase text-cyan-700 tracking-wider block">Exam Tip</span>
                          <p className="text-xs font-bold text-cyan-950">{trap.tip}</p>
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

      {/* TAB 6: MASTER GLOSSARY */}
      {activeTab === "glossary" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 42 glossary terms..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {["All", "Stoichiometry", "Solutions", "Gas Laws & Eudiometry", "Atomic Scale & Principles", "Analytical & General"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGlossaryCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                    glossaryCategory === cat ? "bg-cyan-600 text-white border-cyan-600" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
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

      {/* TAB 7: NEST 20-Q SELF-TEST */}
      {activeTab === "selftest" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          {score !== null ? (
            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center space-y-3">
              <Award className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-amber-500" />
              <h4 className="text-xl sm:text-2xl font-black text-slate-900">Your Score: {score} / {mcqData.length}</h4>
              <p className="text-sm font-semibold text-slate-600">
                {score >= 17 ? "Outstanding! Mastery level for NEST & IChO." : score >= 12 ? "Good performance — review incorrect explanations." : "Needs practice — revisit earlier tabs and retake."}
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
                        testPartFilter === part ? "bg-cyan-600 text-white border-cyan-600" : "bg-white text-slate-600 border-slate-200"
                      }`}
                    >
                      {part === "ALL" ? "All 20 Questions" : part === "A" ? "Part A (Single MCQ)" : "Part B (Multi MSQ)"}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="flex-1 sm:w-36 h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full rounded-full bg-cyan-500 transition-all duration-500" style={{ width: `${((currentQ + 1) / mcqData.length) * 100}%` }} />
                  </div>
                  <span className="text-[10px] font-black text-slate-700">Q{currentQ + 1} of {mcqData.length}</span>
                </div>
              </div>

              <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    {currentMCQ.id}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-slate-100 text-slate-700">
                        Part {currentMCQ.part}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                        currentMCQ.type === "multi" ? "bg-purple-100 text-purple-800" : "bg-indigo-100 text-indigo-800"
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
                      bg = "bg-cyan-50 border-cyan-400";
                    }

                    return (
                      <button key={opt.key} onClick={() => toggleAnswer(currentQ, opt.key, currentMCQ.type)} className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl border-2 text-left transition-all ${bg}`}>
                        <span className={`w-5 h-5 rounded shrink-0 border-2 flex items-center justify-center text-[10px] font-black transition-all ${
                          isSubmitted && isCorrect ? "bg-emerald-600 border-emerald-600 text-white" : isSubmitted && isSelected && !isCorrect ? "bg-rose-600 border-rose-600 text-white" : isSelected ? "bg-cyan-600 border-cyan-600 text-white" : "border-slate-300 text-slate-500"
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
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span className="text-[9px] font-black uppercase tracking-wider text-indigo-700">Detailed Solution & Math Explanation</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 leading-relaxed">{currentMCQ.explanation}</p>
                  </div>
                )}

                <div className="flex items-center gap-2 flex-wrap">
                  {!submitted[currentQ] ? (
                    <button onClick={() => submitAnswer(currentQ)} disabled={!(selectedAnswers[currentQ]?.length)} className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-black hover:bg-cyan-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all">Submit Answer</button>
                  ) : null}
                  {currentQ < mcqData.length - 1 && (
                    <button onClick={() => setCurrentQ((q) => q + 1)} className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-black hover:bg-slate-700 transition-all flex items-center gap-1.5">
                      Next Question <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {currentQ === mcqData.length - 1 && submitted[currentQ] && (
                    <button onClick={computeScore} className="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-black hover:bg-amber-600 transition-all flex items-center gap-1.5">
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
                      i === currentQ ? "bg-cyan-600 text-white border-cyan-600" : isDone ? isCorrect ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-rose-100 text-rose-800 border-rose-300" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
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

export default BasicConceptsOfChemistryDiagram;
