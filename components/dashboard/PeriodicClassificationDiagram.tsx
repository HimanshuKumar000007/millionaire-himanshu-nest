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
} from "lucide-react";

// ============================================================================
// 1. DATA: IUPAC SUPERHEAVY ROOTS & HISTORICAL MILESTONES
// ============================================================================
interface HistoricalMilestone {
  scientist: string;
  year: string;
  concept: string;
  significance: string;
  limitation: string;
}

const milestonesData: HistoricalMilestone[] = [
  {
    scientist: "Johann Dobereiner",
    year: "1829",
    concept: "Law of Triads",
    significance: "Atomic mass of middle element equals arithmetic mean of 1st and 3rd (e.g. Li 7, Na 23, K 39).",
    limitation: "Could identify only a few triads; failed for heavier elements.",
  },
  {
    scientist: "John Newlands",
    year: "1865",
    concept: "Law of Octaves",
    significance: "Every 8th element repeats properties of 1st when arranged by atomic mass.",
    limitation: "Applicable only up to Calcium (Z=20); assumed only 56 elements exist.",
  },
  {
    scientist: "Lothar Meyer",
    year: "1869",
    concept: "Atomic Volume Curves",
    significance: "Plotted atomic volume vs atomic mass; alkali metals occupied peaks, halogens ascending slopes.",
    limitation: "Lacked predictive power for unknown elements compared to Mendeleev.",
  },
  {
    scientist: "Dmitri Mendeleev",
    year: "1869",
    concept: "Periodic Law (Atomic Mass)",
    significance: "Properties are periodic functions of atomic mass; predicted Eka-Aluminium (Ga), Eka-Silicon (Ge).",
    limitation: "Anomalous pairs (Ar 39.9 before K 39.1; Te before I); no position for isotopes.",
  },
  {
    scientist: "Henry Moseley",
    year: "1913",
    concept: "Modern Periodic Law (Atomic Number)",
    significance: "√ν = a(Z - b); proved atomic number Z is the fundamental chemical property.",
    limitation: "None — forms the rigorous basis of the Modern Long Form Periodic Table.",
  },
];

interface IupacRoot {
  digit: number;
  root: string;
  abbr: string;
}

const iupacRoots: IupacRoot[] = [
  { digit: 0, root: "nil", abbr: "n" },
  { digit: 1, root: "un", abbr: "u" },
  { digit: 2, root: "bi", abbr: "b" },
  { digit: 3, root: "tri", abbr: "t" },
  { digit: 4, root: "quad", abbr: "q" },
  { digit: 5, root: "pent", abbr: "p" },
  { digit: 6, root: "hex", abbr: "h" },
  { digit: 7, root: "sept", abbr: "s" },
  { digit: 8, root: "oct", abbr: "o" },
  { digit: 9, root: "enn", abbr: "e" },
];

// ============================================================================
// 2. DATA: SLATER RULES & RADII CONVERSIONS
// ============================================================================
interface LanthanidePair {
  p4d: string;
  r4d: string;
  p5d: string;
  r5d: string;
  group: string;
}

const lanthanidePairs: LanthanidePair[] = [
  { p4d: "Zirconium (Zr)", r4d: "1.59 Å", p5d: "Hafnium (Hf)", r5d: "1.59 Å", group: "Group 4" },
  { p4d: "Niobium (Nb)", r4d: "1.46 Å", p5d: "Tantalum (Ta)", r5d: "1.46 Å", group: "Group 5" },
  { p4d: "Molybdenum (Mo)", r4d: "1.39 Å", p5d: "Tungsten (W)", r5d: "1.39 Å", group: "Group 6" },
];

interface PeriodAnomaly {
  period: string;
  order: string;
  anomalies: string[];
}

const periodIEAnomalies: PeriodAnomaly[] = [
  {
    period: "Period 2",
    order: "Li < B < Be < C < O < N < F < Ne",
    anomalies: [
      "IE₁(Be) > IE₁(B): Be (1s² 2s²) has fully-filled 2s subshell & high penetration vs B (2p¹).",
      "IE₁(N) > IE₁(O): N (2p³) possesses stable half-filled subshell with high exchange energy vs O (2p⁴).",
    ],
  },
  {
    period: "Period 3",
    order: "Na < Al < Mg < Si < S < P < Cl < Ar",
    anomalies: [
      "IE₁(Mg) > IE₁(Al): Mg (3s²) has fully-filled 3s subshell vs Al (3p¹).",
      "IE₁(P) > IE₁(S): P (3p³) possesses stable half-filled subshell vs S (3p⁴).",
    ],
  },
  {
    period: "Group 13",
    order: "B (801) > Tl (589) > Ga (579) > Al (577) > In (558 kJ/mol)",
    anomalies: [
      "Ga > Al: Poor shielding of 10 3d-electrons (Scandide contraction) increases Z_eff.",
      "Tl > In: Poor shielding of 14 4f-electrons (Lanthanide contraction) increases Z_eff.",
    ],
  },
  {
    period: "Group 14",
    order: "C > Si > Ge > Pb (715) > Sn (708 kJ/mol)",
    anomalies: [
      "Pb > Sn: 4f¹⁴ Lanthanide contraction increases Z_eff at Lead.",
    ],
  },
];

// ============================================================================
// 3. DATA: NEST MISCONCEPTIONS & TRAPS
// ============================================================================
interface Misconception {
  id: string;
  trap: string;
  reality: string;
  tip: string;
}

const periodicTraps: Misconception[] = [
  { id: "t1", trap: "Fluorine has the most negative electron gain enthalpy (Δ_eg H) among all elements.", reality: "Chlorine (Cl, -349 kJ/mol) has a MORE negative Δ_eg H than Fluorine (F, -328 kJ/mol) due to low inter-electronic repulsion in Cl's larger 3p subshell.", tip: "Fluorine has highest Electronegativity (4.0), NOT highest negative electron gain enthalpy." },
  { id: "t2", trap: "Oxygen has the highest negative electron gain enthalpy in Group 16.", reality: "Oxygen has the LEAST negative Δ_eg H in Group 16 (S > Se > Te > Po > O) due to compact 2p⁴ electron crowding.", tip: "Order: S (-200) > Se (-195) > Te (-190) > Po (-174) > O (-141 kJ/mol)." },
  { id: "t3", trap: "The second electron gain enthalpy (Δ_eg H₂) of Oxygen is exothermic.", reality: "Δ_eg H₂ is ALWAYS ENDOTHERMIC (Δ > 0) for all elements (O⁻ + e⁻ → O²⁻ is +780 kJ/mol) because incoming electron experiences strong electrostatic repulsion from O⁻ anion.", tip: "Second electron gain enthalpy is positive without exception." },
  { id: "t4", trap: "Li⁺ ions move fastest in aqueous solution during electrolysis.", reality: "Li⁺(aq) moves SLOWEST among alkali metals because its tiny gaseous radius gives it the highest charge density, creating the largest hydrated shell.", tip: "Hydrated radius: Li⁺(aq) > Cs⁺(aq); Ionic mobility: Cs⁺(aq) > Li⁺(aq)." },
  { id: "t5", trap: "Gallium has a larger atomic radius than Aluminium.", reality: "r(Ga) < r(Al) (1.35 Å vs 1.43 Å) due to poor shielding of 10 3d-electrons preceding Gallium (Scandide Contraction).", tip: "Group 13 radius order: B < Ga < Al < In ≈ Tl." },
  { id: "t6", trap: "Nitrogen can form NCl₅ like Phosphorus forms PCl₅.", reality: "NCl₅ is IMPOSSIBLE because Nitrogen belongs to Period 2 and lacks vacant d-orbitals (maximum covalency = 4).", tip: "Period 2 elements (B, C, N, O, F) cannot expand octets beyond 8 electrons." },
  { id: "t7", trap: "The atomic radii of 4d and 5d transition elements increase normally down the group.", reality: "4d and 5d elements have almost identical atomic radii (r(Zr) ≈ r(Hf) = 1.59 Å) due to 4f¹⁴ Lanthanide Contraction.", tip: "Zr ≈ Hf, Nb ≈ Ta, Mo ≈ W are classic Lanthanide pairs." },
  { id: "t8", trap: "The first ionization enthalpy of Oxygen is higher than Nitrogen.", reality: "IE₁(N) > IE₁(O) (1402 vs 1314 kJ/mol) because Nitrogen possesses a stable half-filled 2p³ subshell with higher exchange energy.", tip: "Period 2 IE order: Li < B < Be < C < O < N < F < Ne." },
  { id: "t9", trap: "Slater's screening constant σ is identical for 3d and 4s electrons.", reality: "For a 4s electron, 3d electrons act as (n-1) shell contributing 0.85 each. For a 3d electron, other 3d contribute 0.35 each.", tip: "s/p electrons use 0.35/0.85/1.00; d/f electrons use 0.35/1.00." },
  { id: "t10", trap: "Pb⁴⁺ is more stable than Pb²⁺ due to higher oxidation state.", reality: "Pb²⁺ is much more stable than Pb⁴⁺ due to the Inert Pair Effect. PbO₂ acts as a powerful oxidizing agent.", tip: "Lower oxidation states (+1 for Tl, +2 for Pb, +3 for Bi) dominate heavy p-block." },
];

// ============================================================================
// 4. DATA: MASTER GLOSSARY (36 DEFINITIONS)
// ============================================================================
interface GlossaryTerm {
  term: string;
  definition: string;
  category: "Historical & Periodic Law" | "Shielding & Effective Nuclear Charge" | "Atomic & Ionic Radii" | "Ionization & Electron Gain Enthalpy" | "Electronegativity & Chemical Periodicity";
}

const masterGlossary: GlossaryTerm[] = [
  { term: "Actinide Contraction", definition: "The steady decrease in atomic and ionic radii across the 5f actinide series due to poor 5f electron shielding.", category: "Atomic & Ionic Radii" },
  { term: "Allred-Rochow Scale", definition: "An electronegativity scale based on the electrostatic force exerted by Z_eff on a valence electron at the covalent radius: χ = 0.359 (Z_eff / r²) + 0.744.", category: "Electronegativity & Chemical Periodicity" },
  { term: "Amphoteric Oxide", definition: "An oxide that reacts with both acids and bases to yield salts and water (e.g., Al₂O₃, BeO, ZnO, PbO, SnO₂).", category: "Electronegativity & Chemical Periodicity" },
  { term: "Atomic Radius", definition: "Half the distance between the nuclei of two bonded identical atoms in a molecule or metal crystal.", category: "Atomic & Ionic Radii" },
  { term: "Covalent Radius (r_cov)", definition: "Half the equilibrium internuclear distance between two identical single-bonded atoms in a homonuclear molecule.", category: "Atomic & Ionic Radii" },
  { term: "Diagonal Relationship", definition: "The chemical similarity between Period 2 elements (Li, Be, B) and Period 3 elements (Mg, Al, Si) located diagonally to their right.", category: "Electronegativity & Chemical Periodicity" },
  { term: "Effective Nuclear Charge (Z_eff)", definition: "The net positive nuclear charge experienced by an electron after subtracting screening constant σ: Z_eff = Z - σ.", category: "Shielding & Effective Nuclear Charge" },
  { term: "Electron Gain Enthalpy (Δ_eg H)", definition: "The enthalpy change when an electron is added to an isolated neutral gaseous atom to form a univalent negative ion.", category: "Ionization & Electron Gain Enthalpy" },
  { term: "Electronegativity (χ)", definition: "The relative tendency of a bonded atom in a covalent molecule to attract shared electron pairs toward itself.", category: "Electronegativity & Chemical Periodicity" },
  { term: "Eka-Elements", definition: "Elements predicted by Mendeleev prior to discovery: Eka-Aluminium (Gallium), Eka-Silicon (Germanium), Eka-Boron (Scandium).", category: "Historical & Periodic Law" },
  { term: "Hydration Enthalpy (Δ_hyd H)", definition: "The exothermic enthalpy released when 1 mole of gaseous ions undergoes complete hydration in water (Δ_hyd H ∝ z² / r).", category: "Electronegativity & Chemical Periodicity" },
  { term: "Inert Pair Effect", definition: "The reluctance of outer ns² valence electrons to participate in bonding in heavy p-block elements (Tl, Pb, Bi).", category: "Electronegativity & Chemical Periodicity" },
  { term: "Ionization Enthalpy (Δ_i H)", definition: "The minimum energy required to remove the most loosely bound electron from an isolated neutral ground-state gaseous atom.", category: "Ionization & Electron Gain Enthalpy" },
  { term: "Isoelectronic Series", definition: "A series of atoms or ions possessing identical total numbers of electrons (ionic radius r ∝ 1/Z).", category: "Atomic & Ionic Radii" },
  { term: "Lanthanide Contraction", definition: "The steady decrease in atomic and ionic radii across the 4f lanthanides due to poor 4f shielding, making 4d ≈ 5d radii.", category: "Atomic & Ionic Radii" },
  { term: "Lothar Meyer Curve", definition: "A plot of atomic volume vs atomic mass where alkali metals occupy sharp curve peaks.", category: "Historical & Periodic Law" },
  { term: "Metallic Radius (r_met)", definition: "Half the inter-nuclear distance between adjacent metal ions in a metallic crystal lattice.", category: "Atomic & Ionic Radii" },
  { term: "Moseley's Law", definition: "The linear spectroscopic relationship √ν = a(Z - b) establishing atomic number Z as the fundamental periodic variable.", category: "Historical & Periodic Law" },
  { term: "Mulliken Scale", definition: "An electronegativity scale defined as the arithmetic mean of Ionization Energy and Electron Affinity: χ_M = (IE + EA) / 2.", category: "Electronegativity & Chemical Periodicity" },
  { term: "Pauling Scale", definition: "An electronegativity scale based on thermochemical single bond dissociation energy differences: χ_A - χ_B = 0.102 √Δ.", category: "Electronegativity & Chemical Periodicity" },
  { term: "Penetration Power", definition: "The relative proximity of subshell electron wavefunctions to the nucleus (s > p > d > f).", category: "Shielding & Effective Nuclear Charge" },
  { term: "Periodic Law", definition: "The modern principle stating physical and chemical properties of elements are periodic functions of their atomic numbers Z.", category: "Historical & Periodic Law" },
  { term: "Scandide Contraction (d-Block Contraction)", definition: "The radius reduction in post-3d elements (e.g., r(Ga) < r(Al)) due to poor shielding by 10 3d-electrons.", category: "Atomic & Ionic Radii" },
  { term: "Shielding / Screening Constant (σ)", definition: "A measure of inner-shell electron electrostatic repulsion that diminishes nuclear attraction on valence electrons.", category: "Shielding & Effective Nuclear Charge" },
  { term: "Slater's Rules", definition: "Semi-empirical rules calculating the numerical value of screening constant σ for multi-electron atoms.", category: "Shielding & Effective Nuclear Charge" },
  { term: "Van der Waals Radius (r_vdw)", definition: "Half the equilibrium distance between non-bonded adjacent atoms of neighboring molecules in the solid state.", category: "Atomic & Ionic Radii" },
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
    question: "Using Slater's Rules, calculate the exact Effective Nuclear Charge (Z_eff) experienced by a 3d electron in a ground-state neutral Iron atom (Fe, Z = 26, configuration: (1s²)(2s² 2p⁶)(3s² 3p⁶)(3d⁶)(4s²)).",
    options: [
      { key: "A", text: "Z_eff = 6.25" },
      { key: "B", text: "Z_eff = 3.75" },
      { key: "C", text: "Z_eff = 4.35" },
      { key: "D", text: "Z_eff = 7.75" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "1. Grouping: (1s²)(2s² 2p⁶)(3s² 3p⁶)(3d⁶)(4s²). 2. For 3d target electron: 4s² contributes 0.00; other 5 3d-electrons contribute 5 × 0.35 = 1.75; all 18 inner electrons (1s,2s,2p,3s,3p) contribute 18 × 1.00 = 18.00. 3. σ = 1.75 + 18.00 = 19.75. 4. Z_eff = Z - σ = 26 - 19.75 = 6.25.",
  },
  {
    id: 2,
    part: "A",
    question: "Which of the following orders correctly represents the increasing first Ionization Enthalpy (Δ_i H₁) for the Period 2 elements Li, Be, B, C, N, O, F, Ne?",
    options: [
      { key: "A", text: "Li < Be < B < C < N < O < F < Ne" },
      { key: "B", text: "Li < B < Be < C < O < N < F < Ne" },
      { key: "C", text: "Li < B < Be < C < N < O < Ne < F" },
      { key: "D", text: "Be < Li < B < C < O < N < F < Ne" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Across Period 2, two subshell anomalies occur: 1. Be (2s²) > B (2p¹) due to fully-filled 2s penetration. 2. N (2p³) > O (2p⁴) due to stable half-filled 2p³ subshell. Correct sequence: Li < B < Be < C < O < N < F < Ne.",
  },
  {
    id: 3,
    part: "A",
    question: "The single covalent bond dissociation energies for H₂ (H-H), Cl₂ (Cl-Cl), and HCl (H-Cl) are 436 kJ/mol, 242 kJ/mol, and 431 kJ/mol, respectively. Given that the Pauling electronegativity of Hydrogen is χ_H = 2.20, what is the calculated Pauling electronegativity of Chlorine (χ_Cl)?",
    options: [
      { key: "A", text: "χ_Cl = 3.00" },
      { key: "B", text: "χ_Cl = 3.16" },
      { key: "C", text: "χ_Cl = 4.00" },
      { key: "D", text: "χ_Cl = 2.80" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "1. Pauling formula: χ_Cl - χ_H = 0.102 √Δ. 2. Δ = E_HCl - √(E_HH · E_ClCl) = 431 - √(436 × 242) = 431 - 324.83 = 106.17 kJ/mol. 3. χ_Cl - 2.20 = 0.102 × √106.17 = 0.102 × 10.304 = 1.051 → χ_Cl = 2.20 + 1.051 = 3.25 ≈ 3.16 (standard accepted value = 3.16).",
  },
  {
    id: 4,
    part: "A",
    question: "Why does Gallium (Ga, Z=31) possess a smaller atomic radius (1.35 Å) than Aluminium (Al, Z=13, 1.43 Å), violating standard down-the-group periodic expansion?",
    options: [
      { key: "A", text: "4f¹⁴ Lanthanide contraction" },
      { key: "B", text: "Poor shielding of 10 3d-electrons (Scandide Contraction) increasing Z_eff at Gallium" },
      { key: "C", text: "Gallium forms strong metallic pπ-pπ multiple bonds" },
      { key: "D", text: "Relativistic contraction of 4s orbital" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Gallium is preceded by 10 3d-transition elements. Because 3d electrons shield poorly, Z_eff increases sharply at Gallium, pulling its valence shell inward so that r(Ga) < r(Al) (Scandide / d-block contraction).",
  },
  {
    id: 5,
    part: "A",
    question: "Arrange the following group 17 halogen elements in order of increasingly negative (more exothermic) First Electron Gain Enthalpy (Δ_eg H₁): F, Cl, Br, I.",
    options: [
      { key: "A", text: "F < Cl < Br < I (F is most negative)" },
      { key: "B", text: "I < Br < F < Cl (Cl is most negative)" },
      { key: "C", text: "Cl < F < Br < I" },
      { key: "D", text: "I < Br < Cl < F" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Chlorine has the most negative Δ_eg H because Fluorine's small 2p subshell creates strong electron-electron repulsions. Values: Cl (-349) > F (-328) > Br (-325) > I (-295 kJ/mol). Increasing negative order: I < Br < F < Cl.",
  },
  {
    id: 6,
    part: "A",
    question: "What is the systematic IUPAC temporary name and symbol for the superheavy element with atomic number Z = 119?",
    options: [
      { key: "A", text: "Ununseptium (Uus)" },
      { key: "B", text: "Ununennium (Uue)" },
      { key: "C", text: "Ununoctium (Uuo)" },
      { key: "D", text: "Biunennium (Bue)" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Z = 119: 1 (un) + 1 (un) + 9 (enn) + ium = Ununennium (symbol Uue).",
  },
  {
    id: 7,
    part: "A",
    question: "Which of the following gaseous alkali metal cations possesses the largest hydrated ionic radius (r_hyd) and the lowest electrical ionic mobility in aqueous solution?",
    options: [
      { key: "A", text: "Li⁺(aq)" },
      { key: "B", text: "Na⁺(aq)" },
      { key: "C", text: "K⁺(aq)" },
      { key: "D", text: "Cs⁺(aq)" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "Li⁺ has the smallest gaseous radius and highest charge density (z²/r), binding the thickest water hydration shell. Thus Li⁺(aq) has the largest hydrated radius and lowest aqueous mobility.",
  },
  {
    id: 8,
    part: "A",
    question: "Why is the second electron gain enthalpy (Δ_eg H₂) of Oxygen (O⁻(g) + e⁻ → O²⁻(g)) highly endothermic (Δ_eg H₂ = +780 kJ/mol), despite O²⁻ achieving a noble gas configuration (1s² 2s² 2p⁶)?",
    options: [
      { key: "A", text: "O²⁻ lacks nuclear charge Z." },
      { key: "B", text: "Severe electrostatic repulsion between incoming negative electron and already negative O⁻ anion overrides stability gain." },
      { key: "C", text: "Oxygen 2p subshell is too large." },
      { key: "D", text: "Second electron enters 3s subshell." },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Adding an electron to an already negative anion (O⁻) involves strong electrostatic repulsion between like charges. Energy must be supplied externally, making Δ_eg H₂ endothermic (+780 kJ/mol).",
  },
  {
    id: 9,
    part: "A",
    question: "Which heavy p-block lead compound acts as a powerful OXIDIZING AGENT because the +2 oxidation state is much more stable than the +4 state due to the Inert Pair Effect?",
    options: [
      { key: "A", text: "PbCl₂" },
      { key: "B", text: "PbO₂" },
      { key: "C", text: "PbSO₄" },
      { key: "D", text: "PbCO₃" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Due to the Inert Pair Effect, Pb²⁺ is far more stable than Pb⁴⁺. In PbO₂, Lead is in +4 state; it spontaneously reduces to stable Pb²⁺, making PbO₂ a strong oxidizing agent.",
  },
  {
    id: 10,
    part: "A",
    question: "On the Mulliken electronegativity scale, the Ionization Energy (IE) and Electron Affinity (EA) of an element are 11.8 eV and 3.6 eV, respectively. What is the equivalent electronegativity value of this element on the Pauling scale (χ_P)?",
    options: [
      { key: "A", text: "2.75" },
      { key: "B", text: "5.50" },
      { key: "C", text: "4.00" },
      { key: "D", text: "1.50" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "1. χ_M = (IE + EA) / 2 = (11.8 + 3.6) / 2 = 7.70 eV. 2. Convert to Pauling scale: χ_P = χ_M / 2.8 = 7.70 / 2.8 = 2.75.",
  },
  {
    id: 11,
    part: "B",
    question: "Which of the following pairs of elements display almost IDENTICAL covalent/metallic atomic radii due to the Lanthanide Contraction (4f¹⁴ shielding failure)? (Select all that apply)",
    options: [
      { key: "A", text: "Zirconium (Zr_4d) and Hafnium (Hf_5d)" },
      { key: "B", text: "Niobium (Nb_4d) and Tantalum (Ta_5d)" },
      { key: "C", text: "Molybdenum (Mo_4d) and Tungsten (W_5d)" },
      { key: "D", text: "Titanium (Ti_3d) and Zirconium (Zr_4d)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are classic Lanthanide pairs (r(Zr) ≈ r(Hf) = 1.59 Å, r(Nb) ≈ r(Ta) = 1.46 Å, r(Mo) ≈ r(W) = 1.39 Å). D is incorrect because Ti (3d) to Zr (4d) shows normal group expansion.",
  },
  {
    id: 12,
    part: "B",
    question: "Select the correct options regarding Effective Nuclear Charge (Z_eff) and Slater's Rules: (Select all that apply)",
    options: [
      { key: "A", text: "For a 4s valence electron, electrons in (n-1) shell (n=3) contribute 0.85 each to screening constant σ" },
      { key: "B", text: "For a 3d valence electron, electrons in inner shells (n=1, 2) and lower subshells (3s, 3p) contribute 1.00 each to σ" },
      { key: "C", text: "Penetration power and shielding efficiency of subshells follow the order s > p > d > f" },
      { key: "D", text: "Z_eff decreases continuously across a period from left to right" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are accurate Slater rules and subshell properties. D is false: Z_eff INCREASES continuously across a period from left to right.",
  },
  {
    id: 13,
    part: "B",
    question: "Which of the following chemical species are ISOELECTRONIC with the Fluoride anion (F⁻) possessing 10 total electrons? (Select all that apply)",
    options: [
      { key: "A", text: "Oxide ion (O²⁻)" },
      { key: "B", text: "Sodium cation (Na⁺)" },
      { key: "C", text: "Nitride ion (N³⁻)" },
      { key: "D", text: "Chloride ion (Cl⁻)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A (8+2=10), B (11-1=10), and C (7+3=10) are isoelectronic with F⁻ (9+1=10). Cl⁻ (17+1=18) has 18 electrons.",
  },
  {
    id: 14,
    part: "B",
    question: "Select the valid statements regarding the Inert Pair Effect in heavy p-block elements (Tl, Pb, Bi): (Select all that apply)",
    options: [
      { key: "A", text: "Outer 6s² electrons become reluctant to participate in bonding due to poor shielding by 4f¹⁴ and 5d¹⁰ subshells" },
      { key: "B", text: "The +1 oxidation state of Thallium (Tl⁺) is more stable than its +3 oxidation state (Tl³⁺)" },
      { key: "C", text: "The +2 oxidation state of Lead (Pb²⁺) is more stable than its +4 oxidation state (Pb⁴⁺)" },
      { key: "D", text: "Sn²⁺ acts as a powerful oxidizing agent because Sn²⁺ is more stable than Sn⁴⁺" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are true. D is false: for Tin (Sn), Sn⁴⁺ is MORE stable than Sn²⁺; thus Sn²⁺ acts as a reducing agent (oxidizes to Sn⁴⁺).",
  },
  {
    id: 15,
    part: "B",
    question: "Which of the following period 2 and 3 elements exhibit a DIAGONAL RELATIONSHIP with each other due to similar ionic radii and polarising power (Charge/Radius²)? (Select all that apply)",
    options: [
      { key: "A", text: "Lithium (Li) and Magnesium (Mg)" },
      { key: "B", text: "Beryllium (Be) and Aluminium (Al)" },
      { key: "C", text: "Boron (B) and Silicon (Si)" },
      { key: "D", text: "Sodium (Na) and Calcium (Ca)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "The three classic diagonal pairs are Li ~ Mg, Be ~ Al, and B ~ Si. Na and Ca do not form a diagonal relationship.",
  },
  {
    id: 16,
    part: "B",
    question: "Select the correct options regarding the Electronegativity (χ) of elements: (Select all that apply)",
    options: [
      { key: "A", text: "Fluorine (χ = 4.0) is the most electronegative element on the Pauling scale" },
      { key: "B", text: "Oxygen (χ = 3.5) is the second most electronegative element" },
      { key: "C", text: "Nitrogen and Chlorine have almost identical Pauling electronegativities (χ ≈ 3.0)" },
      { key: "D", text: "Electronegativity decreases across a period from left to right" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are true: F (4.0) > O (3.5) > N (3.0) ≈ Cl (3.0). D is false: electronegativity INCREASES across a period from left to right.",
  },
  {
    id: 17,
    part: "B",
    question: "Which of the following elements CANNOT expand their octet beyond 8 valence electrons due to the absence of vacant d-orbitals in their n=2 principal shell? (Select all that apply)",
    options: [
      { key: "A", text: "Nitrogen (N)" },
      { key: "B", text: "Oxygen (O)" },
      { key: "C", text: "Fluorine (F)" },
      { key: "D", text: "Phosphorus (P)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "Period 2 elements (N, O, F) lack 2d subshells, capping maximum covalency at 4. Phosphorus (Period 3) has 3d orbitals and readily expands its octet (PCl₅).",
  },
  {
    id: 18,
    part: "B",
    question: "Select the correct statements regarding First Ionization Enthalpy (Δ_i H₁) trends in Group 13: (Select all that apply)",
    options: [
      { key: "A", text: "Boron (B) has the highest Δ_i H₁ in Group 13" },
      { key: "B", text: "Gallium (Ga) has a higher Δ_i H₁ than Aluminium (Al) due to Scandide contraction" },
      { key: "C", text: "Thallium (Tl) has a higher Δ_i H₁ than Indium (In) due to Lanthanide contraction" },
      { key: "D", text: "Δ_i H₁ decreases monotonically down Group 13 from B to Tl" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are true: B (801) > Tl (589) > Ga (579) > Al (577) > In (558 kJ/mol). D is false: the trend is non-monotonic due to 3d¹⁰ and 4f¹⁴ poor shielding.",
  },
  {
    id: 19,
    part: "B",
    question: "Which of the following oxides are AMPHOTERIC in nature (reacting with both acids and bases)? (Select all that apply)",
    options: [
      { key: "A", text: "Aluminium Oxide (Al₂O₃)" },
      { key: "B", text: "Beryllium Oxide (BeO)" },
      { key: "C", text: "Zinc Oxide (ZnO)" },
      { key: "D", text: "Sodium Oxide (Na₂O)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "Al₂O₃, BeO, ZnO, PbO, and SnO₂ are classic amphoteric oxides. Na₂O is strongly basic.",
  },
  {
    id: 20,
    part: "B",
    question: "Select the valid statements regarding Moseley's X-ray experiment (√ν = a(Z-b)): (Select all that apply)",
    options: [
      { key: "A", text: "It established that Atomic Number (Z) is a more fundamental property of an element than Atomic Mass (A)" },
      { key: "B", text: "The plot of √ν vs Atomic Number Z yields a straight line" },
      { key: "C", text: "It provided the scientific basis for the Modern Periodic Law" },
      { key: "D", text: "It proved that e/m ratio of canal rays is constant for all gases" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are true: Moseley established √ν ∝ Z straight line, proving Z is the core atomic variable. D is false: Moseley's experiment dealt with characteristic X-rays, not canal rays.",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
type Tab = "history" | "slater" | "radii" | "ie" | "electron-gain" | "hydration" | "anomalous" | "traps" | "glossary" | "selftest";

export const PeriodicClassificationDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("history");
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
    { id: "history", label: "History & Moseley", icon: <Layers className="w-3.5 h-3.5 shrink-0" /> },
    { id: "slater", label: "Slater Rules & Z_eff", icon: <Shield className="w-3.5 h-3.5 shrink-0" /> },
    { id: "radii", label: "Radii & Contractions", icon: <Scale className="w-3.5 h-3.5 shrink-0" /> },
    { id: "ie", label: "Ionization Enthalpy", icon: <Zap className="w-3.5 h-3.5 shrink-0" /> },
    { id: "electron-gain", label: "Δ_eg H & Electronegativity", icon: <TrendingUp className="w-3.5 h-3.5 shrink-0" /> },
    { id: "hydration", label: "Hydration & Mobility", icon: <Droplets className="w-3.5 h-3.5 shrink-0" /> },
    { id: "anomalous", label: "Diagonal & Inert Pair", icon: <Grid className="w-3.5 h-3.5 shrink-0" /> },
    { id: "traps", label: "10 NEST Traps", icon: <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> },
    { id: "glossary", label: "Master Glossary", icon: <BookOpen className="w-3.5 h-3.5 shrink-0" /> },
    { id: "selftest", label: "NEST 20-Q Test", icon: <Award className="w-3.5 h-3.5 shrink-0" /> },
  ];

  return (
    <div className="my-4 sm:my-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-slate-50 to-indigo-50/20 border border-slate-200/90 p-2.5 sm:p-7 shadow-xs space-y-4 sm:space-y-6 select-none w-full">

      {/* HEADER */}
      <div className="flex flex-col items-center text-center space-y-2.5 max-w-2xl mx-auto w-full">
        <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200 shadow-2xs flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-indigo-600" />
          CHEMISTRY INTERACTIVE MODULE — CHAPTER 3
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <Grid className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 shrink-0" />
            CLASSIFICATION OF ELEMENTS & PERIODICITY
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            Moseley’s Law · Slater’s Z_eff · Lanthanide/Scandide Contractions · IE Anomalies · Electron Gain Enthalpy · Electronegativity Scales · Inert Pair Effect · NEST 20-Q Module
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

      {/* TAB 1: HISTORY & MOSELEY */}
      {activeTab === "history" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
              Evolution of the Periodic Table
            </h4>
            <div className="space-y-2">
              {milestonesData.map((m) => (
                <div key={m.scientist} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">{m.scientist} ({m.year}) — <span className="text-indigo-700">{m.concept}</span></span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-700">{m.significance}</p>
                  <p className="text-[10px] text-slate-500 font-medium italic">Limitation: {m.limitation}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-indigo-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900">Moseley's Law & Modern Periodic Law (1913)</h4>
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 space-y-1">
              <span className="text-[9px] font-black uppercase text-indigo-800 tracking-wider block">Characteristic X-ray Frequency Equation</span>
              <code className="text-xs sm:text-sm font-mono font-black text-indigo-950 block">√ν = a(Z − b)</code>
              <p className="text-[10px] text-slate-600">Plotting √ν vs Z gives a perfect straight line, proving Atomic Number (Z) is the true fundamental property governing periodicity.</p>
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900">IUPAC Superheavy Nomenclature (Z &gt; 100)</h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {iupacRoots.map((r) => (
                <div key={r.digit} className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="font-mono text-xs font-black text-indigo-700">{r.digit} = {r.root}</span>
                  <span className="text-[9px] text-slate-500 block font-bold">({r.abbr})</span>
                </div>
              ))}
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-cyan-950">
              <span>Z = 104 → <code className="font-mono font-black">Unnilquadium (Unq / Rf)</code></span>
              <span>Z = 118 → <code className="font-mono font-black">Ununoctium (Uuo / Og)</code></span>
              <span>Z = 119 → <code className="font-mono font-black">Ununennium (Uue)</code></span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SLATER RULES */}
      {activeTab === "slater" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
              Effective Nuclear Charge (Z_eff = Z − σ) & Slater's Rules
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-1.5">
                <span className="text-xs font-black text-emerald-950 block">Target Electron in s or p Orbital</span>
                <ul className="text-[10px] space-y-1 text-slate-700 font-semibold list-disc list-inside">
                  <li>Electrons above target: <span className="font-bold text-slate-900">0.00</span></li>
                  <li>Same (ns, np) group: <span className="font-bold text-slate-900">0.35 each</span> (1s = 0.30)</li>
                  <li>(n − 1) shell electrons: <span className="font-bold text-slate-900">0.85 each</span></li>
                  <li>(n − 2) & deeper shells: <span className="font-bold text-slate-900">1.00 each</span></li>
                </ul>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-1.5">
                <span className="text-xs font-black text-emerald-950 block">Target Electron in d or f Orbital</span>
                <ul className="text-[10px] space-y-1 text-slate-700 font-semibold list-disc list-inside">
                  <li>Electrons above target: <span className="font-bold text-slate-900">0.00</span></li>
                  <li>Same (nd) or (nf) group: <span className="font-bold text-slate-900">0.35 each</span></li>
                  <li>All electrons in groups to the left: <span className="font-bold text-slate-900">1.00 each</span></li>
                  <li>Shielding order: <span className="font-bold text-indigo-700">s &gt; p &gt; d &gt; f</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900">Step-by-Step Slater Calculation for 4s in Zinc (Z=30)</h4>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <code className="text-xs font-mono font-bold text-slate-800 block">Zn (Z=30): (1s²)(2s² 2p⁶)(3s² 3p⁶)(3d¹⁰)(4s²)</code>
              <div className="space-y-1 font-mono text-[10px] text-slate-700">
                <div>• Same group (4s): 1 e⁻ × 0.35 = <span className="font-bold">0.35</span></div>
                <div>• (n-1) shell (n=3): 18 e⁻ (3s² 3p⁶ 3d¹⁰) × 0.85 = <span className="font-bold">15.30</span></div>
                <div>• (n-2) & deeper (n=1,2): 10 e⁻ × 1.00 = <span className="font-bold">10.00</span></div>
              </div>
              <div className="p-2 rounded-lg bg-white border border-slate-200 flex items-center justify-between text-xs font-bold">
                <span>Total Screening σ = <code className="text-indigo-700 font-mono font-black">25.65</code></span>
                <span>Z_eff = 30 − 25.65 = <code className="text-emerald-700 font-mono font-black">4.35</code></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RADII & CONTRACTIONS */}
      {activeTab === "radii" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-cyan-600 shrink-0" />
              Atomic Radii Metrics & Periodic Trends
            </h4>
            <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200 text-center">
              <code className="text-xs sm:text-sm font-mono font-black text-cyan-950">r_vdw &gt; r_met &gt; r_cov</code>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[9px] font-black uppercase text-slate-600 tracking-wider block">Covalent Radius</span>
                <p className="text-[10px] text-slate-700 font-semibold">Half internuclear distance between single-bonded identical atoms.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[9px] font-black uppercase text-slate-600 tracking-wider block">Metallic Radius</span>
                <p className="text-[10px] text-slate-700 font-semibold">Half internuclear distance between metal ions in metallic crystal lattice.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[9px] font-black uppercase text-slate-600 tracking-wider block">Van der Waals Radius</span>
                <p className="text-[10px] text-slate-700 font-semibold">Half distance between non-bonded adjacent atoms of neighboring molecules.</p>
              </div>
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-indigo-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900">Lanthanide & Scandide Contractions</h4>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 space-y-1">
                <span className="text-xs font-black text-indigo-950 block">Lanthanide Contraction (4f¹⁴ Shielding Failure)</span>
                <p className="text-[10px] text-slate-700 font-semibold">14 f-electrons shield extremely poorly, pulling 5d valence shell inward. Result: 4d and 5d series share identical atomic radii.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {lanthanidePairs.map((pair) => (
                    <div key={pair.group} className="p-2 rounded-lg bg-white border border-indigo-100 text-center font-mono text-[10px]">
                      <span className="font-bold text-slate-900 block">{pair.p4d} ≈ {pair.p5d}</span>
                      <span className="text-indigo-700 font-bold">{pair.r4d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <span className="text-xs font-black text-amber-950 block">Scandide Contraction (Group 13 Anomaly)</span>
                <code className="text-xs font-mono font-bold text-amber-900 block">B &lt; Ga (1.35 Å) &lt; Al (1.43 Å) &lt; In &lt; Tl</code>
                <p className="text-[10px] text-slate-700 font-semibold">Preceding 10 3d-electrons shield poorly, increasing Z_eff at Gallium and making r(Ga) &lt; r(Al).</p>
              </div>
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900">Isoelectronic Series Radii Trend (r ∝ 1/Z)</h4>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <code className="text-xs sm:text-sm font-mono font-bold text-indigo-900 block">N³⁻ (1.71 Å) &gt; O²⁻ (1.40 Å) &gt; F⁻ (1.33 Å) &gt; Na⁺ (1.02 Å) &gt; Mg²⁺ (0.72 Å) &gt; Al³⁺ (0.54 Å)</code>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: IONIZATION ENTHALPY */}
      {activeTab === "ie" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              Ionization Enthalpy (Δ_i H) & Subshell Anomalies
            </h4>
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
              <code className="text-xs sm:text-sm font-mono font-black text-amber-950 block">X(g) → X⁺(g) + e⁻  [Δ_i H₁ &lt; Δ_i H₂ &lt; Δ_i H₃ &lt; ... &lt; Δ_i H_n]</code>
            </div>
            <div className="space-y-2">
              {periodIEAnomalies.map((a) => (
                <div key={a.period} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">{a.period} Sequence:</span>
                  </div>
                  <code className="text-[11px] font-mono font-bold text-indigo-700 block">{a.order}</code>
                  <div className="space-y-1 pt-1 border-t border-slate-200">
                    {a.anomalies.map((anom, idx) => (
                      <p key={idx} className="text-[10px] text-slate-700 font-semibold">• {anom}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ELECTRON GAIN & ELECTRONEGATIVITY */}
      {activeTab === "electron-gain" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-rose-600 shrink-0" />
              Electron Gain Enthalpy (Δ_eg H) Trends & 2nd Step Endothermicity
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Halogen Δ_eg H Order</span>
                <code className="text-xs font-mono font-black text-indigo-700 block">Cl (-349) &gt; F (-328) &gt; Br (-325) &gt; I (-295 kJ/mol)</code>
                <p className="text-[10px] text-slate-600">Fluorine has compact 2p subshell creating intense electron-electron repulsions.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Group 16 Δ_eg H Order</span>
                <code className="text-xs font-mono font-black text-indigo-700 block">S (-200) &gt; Se (-195) &gt; Te (-190) &gt; Po (-174) &gt; O (-141 kJ/mol)</code>
                <p className="text-[10px] text-slate-600">Oxygen has the least negative Δ_eg H in Group 16.</p>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
              <p className="text-xs font-bold text-rose-950">⚠ Second Electron Gain Enthalpy (Δ_eg H₂) is ALWAYS ENDOTHERMIC without exception (O⁻ + e⁻ → O²⁻ is +780 kJ/mol) due to severe anion-electron electrostatic repulsion.</p>
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900">Electronegativity Scales Comparison</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Pauling Scale</span>
                <code className="text-[10px] font-mono font-bold text-indigo-700 block">χ_A − χ_B = 0.102 √Δ</code>
                <p className="text-[9px] text-slate-600">Based on thermochemical bond dissociation energies. F = 4.0, O = 3.5, N ≈ Cl = 3.0.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Mulliken Scale</span>
                <code className="text-[10px] font-mono font-bold text-indigo-700 block">χ_M = (IE + EA) / 2</code>
                <p className="text-[9px] text-slate-600">χ_P ≈ χ_M / 2.8 = (IE + EA) / 5.6 (in eV) or / 540 (in kJ/mol).</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Allred-Rochow</span>
                <code className="text-[10px] font-mono font-bold text-indigo-700 block">χ = 0.359 (Z_eff/r²) + 0.744</code>
                <p className="text-[9px] text-slate-600">Based on electrostatic force on valence electron.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: HYDRATION & MOBILITY */}
      {activeTab === "hydration" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-cyan-600 shrink-0" />
              Hydration Enthalpy vs Aqueous Ionic Mobility
            </h4>
            <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200 space-y-1">
              <span className="text-[9px] font-black uppercase text-cyan-800 tracking-wider block">Hydration Enthalpy Law</span>
              <code className="text-xs sm:text-sm font-mono font-black text-cyan-950 block">Δ_hyd H ∝ Charge Density ∝ z² / r</code>
            </div>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-xs font-bold text-slate-700">Gaseous Ionic Radii:</span>
                <code className="font-mono text-xs font-black text-slate-900">Li⁺ &lt; Na⁺ &lt; K⁺ &lt; Rb⁺ &lt; Cs⁺</code>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-xs font-bold text-slate-700">Hydration Enthalpy (Δ_hyd H):</span>
                <code className="font-mono text-xs font-black text-indigo-700">Li⁺ &gt; Na⁺ &gt; K⁺ &gt; Rb⁺ &gt; Cs⁺</code>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-xs font-bold text-slate-700">Hydrated Ionic Radii (r_hyd, aq):</span>
                <code className="font-mono text-xs font-black text-rose-700">Li⁺(aq) &gt; Na⁺(aq) &gt; K⁺(aq) &gt; Rb⁺(aq) &gt; Cs⁺(aq)</code>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-xs font-bold text-slate-700">Aqueous Ionic Mobility &amp; Conductance:</span>
                <code className="font-mono text-xs font-black text-emerald-700">Cs⁺(aq) &gt; Rb⁺(aq) &gt; K⁺(aq) &gt; Na⁺(aq) &gt; Li⁺(aq)</code>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-xs font-bold text-slate-800">Physiological Reason: Li⁺ has the smallest gaseous radius, causing highest charge density and binding a giant hydration shell. The large hydrodynamic volume creates massive viscous drag in water, making Li⁺(aq) move slowest.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: ANOMALOUS & INERT PAIR */}
      {activeTab === "anomalous" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Grid className="w-4 h-4 text-purple-600 shrink-0" />
              Anomalous First-Row Behavior &amp; Diagonal Relationships
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">1. Exceptional Small Size</span>
                <p className="text-[10px] text-slate-700 font-semibold">High charge/radius ratio leads to strong covalent character in compounds.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">2. High IE &amp; Electronegativity</span>
                <p className="text-[10px] text-slate-700 font-semibold">Readily forms strong pπ-pπ multiple bonds (C=C, C≡C, N≡N, C=O).</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">3. Absence of d-Orbitals</span>
                <p className="text-[10px] text-slate-700 font-semibold">Maximum covalency = 4. Cannot expand octets (BF₄⁻ exists, but BF₆³⁻ is impossible; NCl₅ cannot exist).</p>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-purple-950">
              <span>Diagonal Pairs:</span>
              <code className="font-mono font-black">Li ~ Mg</code>
              <code className="font-mono font-black">Be ~ Al</code>
              <code className="font-mono font-black">B ~ Si</code>
              <span className="text-[10px] text-purple-800">Arises from identical ionic polarising power (Charge/Radius²).</span>
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900">Inert Pair Effect &amp; Heavy p-Block Oxidation States</h4>
            <p className="text-xs font-semibold text-slate-700 leading-relaxed">
              Poor shielding by intervening 4f¹⁴ and 5d¹⁰ subshells causes outer 6s² electrons to be held tightly by the nucleus, making lower oxidation states (Group state − 2) progressively more stable:
            </p>
            <div className="space-y-1.5 font-mono text-xs">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                <span className="font-bold text-slate-700">Group 13:</span>
                <span className="font-black text-indigo-700">Al³⁺ &gt; Ga³⁺ &gt; In³⁺ &gt; Tl⁺ &gt; Tl³⁺ (Tl⁺ is most stable)</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                <span className="font-bold text-slate-700">Group 14:</span>
                <span className="font-black text-indigo-700">C⁴⁺ &gt; Si⁴⁺ &gt; Ge⁴⁺ &gt; Sn⁴⁺ &gt; Pb²⁺ &gt; Pb⁴⁺ (Pb²⁺ is most stable)</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                <span className="font-bold text-slate-700">Group 15:</span>
                <span className="font-black text-indigo-700">N⁵⁺ &gt; P⁵⁺ &gt; As⁵⁺ &gt; Sb⁵⁺ &gt; Bi³⁺ &gt; Bi⁵⁺ (Bi³⁺ is most stable)</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950">
              Redox Dynamics: PbO₂ (Pb⁴⁺) is a powerful oxidizing agent (readily reduces to Pb²⁺), whereas SnCl₂ (Sn²⁺) is a strong reducing agent (oxidizes to Sn⁴⁺).
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: TRAPS */}
      {activeTab === "traps" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-amber-300 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              All 10 High-Yield NEST Periodic Misconceptions &amp; Traps
            </h4>
            <div className="space-y-2">
              {periodicTraps.map((trap) => {
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

      {/* TAB 9: MASTER GLOSSARY */}
      {activeTab === "glossary" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search periodic table glossary terms..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {["All", "Historical & Periodic Law", "Shielding & Effective Nuclear Charge", "Atomic & Ionic Radii", "Ionization & Electron Gain Enthalpy", "Electronegativity & Chemical Periodicity"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGlossaryCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                    glossaryCategory === cat ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
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

      {/* TAB 10: NEST 20-Q SELF-TEST */}
      {activeTab === "selftest" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          {score !== null ? (
            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center space-y-3">
              <Award className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-amber-500" />
              <h4 className="text-xl sm:text-2xl font-black text-slate-900">Your Score: {score} / {mcqData.length}</h4>
              <p className="text-sm font-semibold text-slate-600">
                {score >= 17 ? "Outstanding! Mastery level for NEST & IChO Periodic Properties." : score >= 12 ? "Good performance — review incorrect explanations." : "Needs practice — revisit earlier tabs and retake."}
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
                        testPartFilter === part ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200"
                      }`}
                    >
                      {part === "ALL" ? "All 20 Questions" : part === "A" ? "Part A (Single MCQ)" : "Part B (Multi MSQ)"}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="flex-1 sm:w-36 h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full rounded-full bg-indigo-500 transition-all duration-500" style={{ width: `${((currentQ + 1) / mcqData.length) * 100}%` }} />
                  </div>
                  <span className="text-[10px] font-black text-slate-700">Q{currentQ + 1} of {mcqData.length}</span>
                </div>
              </div>

              <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
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
                      bg = "bg-indigo-50 border-indigo-400";
                    }

                    return (
                      <button key={opt.key} onClick={() => toggleAnswer(currentQ, opt.key, currentMCQ.type)} className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl border-2 text-left transition-all ${bg}`}>
                        <span className={`w-5 h-5 rounded shrink-0 border-2 flex items-center justify-center text-[10px] font-black transition-all ${
                          isSubmitted && isCorrect ? "bg-emerald-600 border-emerald-600 text-white" : isSubmitted && isSelected && !isCorrect ? "bg-rose-600 border-rose-600 text-white" : isSelected ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300 text-slate-500"
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
                    <button onClick={() => submitAnswer(currentQ)} disabled={!(selectedAnswers[currentQ]?.length)} className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-black hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all">Submit Answer</button>
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
                      i === currentQ ? "bg-indigo-600 text-white border-indigo-600" : isDone ? isCorrect ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-rose-100 text-rose-800 border-rose-300" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
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

export default PeriodicClassificationDiagram;
