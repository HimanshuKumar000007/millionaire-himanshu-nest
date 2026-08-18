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
  Magnet,
  Palette,
  Layers3,
} from "lucide-react";

// ============================================================================
// 1. DATA: 10 NEST d- & f-BLOCK MISCONCEPTIONS & TRAPS
// ============================================================================
interface Misconception {
  id: string;
  trap: string;
  reality: string;
  tip: string;
}

const dfBlockTraps: Misconception[] = [
  { id: "t1", trap: "Zinc, Cadmium, and Mercury are typical transition metals.", reality: "Zn, Cd, and Hg are Non-Transition / Pseudo-Transition elements because they possess completely filled d¹⁰ subshells in both their neutral ground state and common oxidation states.", tip: "Group 12 elements have d¹⁰ configurations throughout." },
  { id: "t2", trap: "Manganese exhibits the highest enthalpy of atomization (Δ_a H°) in the 3d series due to 5 unpaired electrons.", reality: "Manganese has an anomalously LOW Δ_a H° (281 kJ/mol) because its stable half-filled 3d⁵ subshell localizes electrons tightly around the nucleus, weakening metallic bonding.", tip: "Vanadium and Chromium have much higher Δ_a H° than Manganese." },
  { id: "t3", trap: "The purple color of KMnO₄ is caused by d-d electronic transitions.", reality: "Permanganate (MnO₄⁻) is a d⁰ system (Mn = +7). Its intense deep purple color is caused by Ligand-to-Metal Charge Transfer (LMCT), where an electron moves transiently from Oxygen 2p to vacant Manganese 3d.", tip: "Cr₂O₇²⁻ orange color is also caused by LMCT (Cr is d⁰)." },
  { id: "t4", trap: "Lu(OH)₃ is more basic than La(OH)₃.", reality: "La(OH)₃ is the MOST basic hydroxide; basicity decreases continuously to Lu(OH)₃ (least basic) due to Lanthanide Contraction increasing the covalent character of Ln-OH bonds.", tip: "Smaller cation radius increases covalent character (Fajans' Rules)." },
  { id: "t5", trap: "Cr²⁺ and Mn³⁺ both have 3d⁴ configuration, so both are oxidizing agents.", reality: "Cr²⁺ is a powerful reducing agent (oxidizes to stable t_2g³ Cr³⁺, E° = -0.41 V); Mn³⁺ is a powerful oxidizing agent (reduces to stable half-filled 3d⁵ Mn²⁺, E° = +1.57 V).", tip: "Cr³⁺ is extra stable due to half-filled t_2g³ set in aqueous solution." },
  { id: "t6", trap: "Actinides show a narrower range of oxidation states than Lanthanides.", reality: "Actinides show a MUCH WIDER range (+3 to +7) because 5f, 6d, and 7s subshells have comparable energy levels, allowing electrons from all three levels to bond.", tip: "Max OS in actinides = +7 in Np and Pu." },
  { id: "t7", trap: "Reaction of KMnO₄ with I⁻ in neutral medium yields Iodine gas (I₂).", reality: "In neutral / faintly alkaline medium (n=3), KMnO₄ oxidizes I⁻ to Iodate (IO₃⁻), NOT I₂. It produces I₂ only in acidic medium (n=5).", tip: "Neutral/Alkaline: MnO₄⁻ + I⁻ + H₂O ──► 2MnO₂ + IO₃⁻." },
  { id: "t8", trap: "The 4d and 5d series transition metals increase normally in size down the group.", reality: "4d and 5d elements have ALMOST IDENTICAL atomic radii (r(Zr) ≈ r(Hf) = 1.59 Å) due to the intervening 4f¹⁴ Lanthanide Contraction.", tip: "Poor shielding of 4f electrons pulls 5d valence electrons inward." },
  { id: "t9", trap: "Ce⁴⁺ is a powerful reducing agent because it achieves 4f⁰.", reality: "Ce⁴⁺ is a powerful OXIDIZING AGENT that readily gains 1 electron to revert to the dominant, thermodynamically favored +3 state (Ce³⁺).", tip: "Eu²⁺ (4f⁷) and Yb²⁺ (4f¹⁴) act as reducing agents." },
  { id: "t10", trap: "Potassium Dichromate (K₂Cr₂O₇) acts as an effective oxidant in alkaline solutions.", reality: "In alkaline solution, Cr₂O₇²⁻ converts reversibly to yellow CrO₄²⁻ without undergoing redox change. It acts as an oxidant ONLY in Acidic medium.", tip: "2CrO₄²⁻ + 2H⁺ ⇌ Cr₂O₇²⁻ + H₂O." },
];

// ============================================================================
// 2. DATA: MASTER GLOSSARY (38 DEFINITIONS)
// ============================================================================
interface GlossaryTerm {
  term: string;
  definition: string;
  category: "3d Physical & Electronic" | "Redox, KMnO₄ & K₂Cr₂O₇" | "Lanthanides (4f Series)" | "Actinides & General Inorganic";
}

const masterGlossary: GlossaryTerm[] = [
  { term: "Actinide Contraction", definition: "The progressive decrease in atomic and ionic radii across the 5f actinide series caused by extremely poor 5f electron electrostatic shielding.", category: "Actinides & General Inorganic" },
  { term: "Actinides", definition: "The 14 inner transition elements from Thorium (Z=90) to Lawrencium (Z=103) filling the 5f subshell ([Rn] 5f^(1-14) 6d^(0-1) 7s²).", category: "Actinides & General Inorganic" },
  { term: "Alloy", definition: "A homogeneous solid-solution mixture of two or more metals formed readily by transition elements due to similar atomic radii (<15% difference).", category: "3d Physical & Electronic" },
  { term: "Amphoteric Oxide", definition: "An oxide that reacts with both acids and bases (e.g., Cr₂O₃, V₂O₅).", category: "Redox, KMnO₄ & K₂Cr₂O₇" },
  { term: "Baeyer's Reagent", definition: "Cold, dilute 1% alkaline KMnO₄ solution (n=3) used as an oxidant and laboratory test for unsaturation.", category: "Redox, KMnO₄ & K₂Cr₂O₇" },
  { term: "Bohr Magneton (BM)", definition: "The fundamental physical unit of magnetic moment (μ_B = eh / (4π m_e) = 9.274 × 10⁻²⁴ J/T).", category: "3d Physical & Electronic" },
  { term: "Charge Transfer Transition (LMCT)", definition: "Electronic transition involving transient transfer of an electron from ligand orbital (O 2p) to empty metal d-orbital, generating intense color (e.g., MnO₄⁻, Cr₂O₇²⁻).", category: "3d Physical & Electronic" },
  { term: "Chromate Ion (CrO₄²⁻)", definition: "A bright yellow, tetrahedral (sp³), d⁰ oxoanion of Chromium (+6) stable in alkaline media (pH > 7).", category: "Redox, KMnO₄ & K₂Cr₂O₇" },
  { term: "Chromite Ore", definition: "FeCr₂O₄, the primary mineral ore roasted with Na₂CO₃ for industrial K₂Cr₂O₇ synthesis.", category: "Redox, KMnO₄ & K₂Cr₂O₇" },
  { term: "d-d Transition", definition: "Promotion of an electron from a lower-energy d-orbital (t_2g) to a higher-energy d-orbital (e_g) within a crystal-field split subshell, producing color in d¹-d⁹ ions.", category: "3d Physical & Electronic" },
  { term: "Diamagnetism", definition: "A magnetic condition where all electrons are paired (n = 0), resulting in weak repulsion by external magnetic fields.", category: "3d Physical & Electronic" },
  { term: "Dichromate Ion (Cr₂O₇²⁻)", definition: "An orange, corner-sharing bitetrahedral oxoanion of Chromium (+6) stable in acidic media with a Cr-O-Cr bridge angle of 126°.", category: "Redox, KMnO₄ & K₂Cr₂O₇" },
  { term: "Disproportionation", definition: "A redox reaction where a single species undergoes simultaneous self-oxidation and self-reduction (e.g., 2Cu⁺ ──► Cu²⁺ + Cu).", category: "Redox, KMnO₄ & K₂Cr₂O₇" },
  { term: "Enthalpy of Atomization (Δ_a H°)", definition: "The enthalpy change required to transform 1 mole of a metallic crystal lattice into free individual gaseous atoms.", category: "3d Physical & Electronic" },
  { term: "Interstitial Compound", definition: "A non-stoichiometric compound formed by trapping small non-metal atoms (H, C, N, B) in transition metal lattice voids (TiC, Fe₃C, VH_0.56).", category: "3d Physical & Electronic" },
  { term: "Lanthanide Contraction", definition: "The steady, progressive decrease in atomic and ionic (Ln³⁺) radii across the 4f series due to extremely poor shielding by 4f electrons.", category: "Lanthanides (4f Series)" },
  { term: "Lanthanides", definition: "The 14 inner transition elements from Cerium (Z=58) to Lutetium (Z=71) progressively filling 4f orbitals ([Xe] 4f^(1-14) 5d^(0-1) 6s²).", category: "Lanthanides (4f Series)" },
  { term: "Manganate Ion (MnO₄²⁻)", definition: "A dark green, paramagnetic (3d¹), tetrahedral oxoanion of Manganese in the +6 oxidation state.", category: "Redox, KMnO₄ & K₂Cr₂O₇" },
  { term: "Mischmetall", definition: "A pyrophoric alloy composed of ≈ 95% lanthanide metals (Ce ≈ 50%), ≈ 5% Fe, and traces of S, C, Ca, used in lighter flints and tracer bullets.", category: "Lanthanides (4f Series)" },
  { term: "Non-Transition (Pseudo-Transition) Element", definition: "Group 12 elements (Zn, Cd, Hg) possessing completely filled d¹⁰ configurations in both ground state and common oxidation states.", category: "3d Physical & Electronic" },
  { term: "Oxocations", definition: "Cations containing oxygen bound covalently to a high oxidation state metal ion (e.g., UO₂²⁺, VO²⁺, TiO²⁺).", category: "Actinides & General Inorganic" },
  { term: "Paramagnetism", definition: "Magnetic attraction into external magnetic fields resulting from the presence of one or more unpaired electrons (μ_s = √(n(n+2))).", category: "3d Physical & Electronic" },
  { term: "Permanganate Ion (MnO₄⁻)", definition: "An intense purple, diamagnetic (3d⁰), tetrahedral oxoanion of Manganese in the +7 oxidation state.", category: "Redox, KMnO₄ & K₂Cr₂O₇" },
  { term: "Pyrolusite Ore", definition: "MnO₂, the primary black mineral ore fused with KOH and air for industrial KMnO₄ synthesis.", category: "Redox, KMnO₄ & K₂Cr₂O₇" },
  { term: "Scandide Contraction", definition: "The radius contraction across 3d post-transition elements (r(Ga) < r(Al)) caused by poor 3d¹⁰ shielding.", category: "3d Physical & Electronic" },
  { term: "Spin-Only Formula", definition: "Equation μ_s = √(n(n+2)) BM calculating spin magnetic moment from unpaired electron count n.", category: "3d Physical & Electronic" },
  { term: "Transition Element", definition: "An element possessing an incompletely filled d-subshell ((n-1)d^(1-9)) in its ground state or any common oxidation state.", category: "3d Physical & Electronic" },
  { term: "Ziegler-Natta Catalyst", definition: "A heterogeneous catalyst complex (TiCl₄ + Al(C₂H₅)₃) used for low-pressure stereospecific polymerization of ethene.", category: "3d Physical & Electronic" },
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
    question: "What is the calculated spin-only magnetic moment (μ_s) in Bohr Magnetons (BM) for a high-spin aqueous complex of Vanadium in its +3 oxidation state (V³⁺, Z=23)?",
    options: [
      { key: "A", text: "μ_s = 1.73 BM" },
      { key: "B", text: "μ_s = 2.83 BM" },
      { key: "C", text: "μ_s = 3.87 BM" },
      { key: "D", text: "μ_s = 4.90 BM" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Neutral V (Z=23): [Ar] 3d³ 4s². V³⁺ ion: [Ar] 3d² 4s⁰ ⟹ n = 2 unpaired electrons. μ_s = √(2(2+2)) = √8 = 2.828 BM ≈ 2.83 BM.",
  },
  {
    id: 2,
    part: "A",
    question: "Although Cu⁺(aq) has a completely filled, stable 3d¹⁰ electronic configuration, it undergoes rapid, spontaneous disproportionation in aqueous solution: 2Cu⁺(aq) ──► Cu²⁺(aq) + Cu(s). What is the primary thermodynamic driving force for this reaction?",
    options: [
      { key: "A", text: "High second ionization enthalpy of Copper" },
      { key: "B", text: "The highly exothermic Hydration Enthalpy of Cu²⁺(aq) (Δ_hyd H = -2121 kJ/mol) which compensates for the second ionization energy" },
      { key: "C", text: "Low lattice energy of metallic Copper" },
      { key: "D", text: "d-d transition stabilization of Cu⁺" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Cu²⁺(aq) releases a massive Hydration Enthalpy (Δ_hyd H = -2121 kJ/mol) in water, far outweighing the 2nd ionization enthalpy (+1958 kJ/mol) and driving spontaneous disproportionation (E° = +0.36 V).",
  },
  {
    id: 3,
    part: "A",
    question: "Potassium Permanganate (KMnO₄) acts as an oxidizing agent across acidic, neutral, and strongly basic media. How many moles of electrons are transferred per mole of KMnO₄ when it oxidizes Potassium Iodide (KI) in a NEUTRAL / FAINTLY ALKALINE solution, and what is the final iodine-containing product formed?",
    options: [
      { key: "A", text: "5 moles of e⁻; Product = I₂" },
      { key: "B", text: "3 moles of e⁻; Product = IO₃⁻ (Iodate)" },
      { key: "C", text: "1 mole of e⁻; Product = IO₄⁻ (Periodate)" },
      { key: "D", text: "2 moles of e⁻; Product = I⁻" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "In neutral/faintly alkaline medium (pH 7-9), MnO₄⁻ (+7) is reduced to MnO₂ (+4) (n=3) and oxidizes I⁻ to Iodate (IO₃⁻): MnO₄⁻ + I⁻ + H₂O ──► 2MnO₂ + IO₃⁻.",
  },
  {
    id: 4,
    part: "A",
    question: "Why does Manganese (Mn, Z=25) display an anomalously LOW Enthalpy of Atomization (Δ_a H° = 281 kJ/mol) compared to its neighbor Vanadium (V, 515 kJ/mol), despite possessing 5 unpaired d-electrons?",
    options: [
      { key: "A", text: "Manganese is a liquid at room temperature." },
      { key: "B", text: "The stable half-filled 3d⁵ subshell tightly localizes electrons, reducing d-d covalent orbital overlap in the metallic crystal lattice." },
      { key: "C", text: "Manganese lacks 4s valence electrons." },
      { key: "D", text: "4f Lanthanide contraction destabilizes the Manganese lattice." },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Mn ([Ar] 3d⁵ 4s²) has a stable half-filled 3d⁵ shell holding d-electrons tightly localized around individual nuclei, weakening inter-atomic covalent overlap and lowering Δ_a H° to 281 kJ/mol.",
  },
  {
    id: 5,
    part: "A",
    question: "A solution of Potassium Chromate (K₂CrO₄, bright yellow) turns deep orange upon the addition of dilute Sulfuric Acid (H₂SO₄). What chemical transformation occurs during this acidification, and what is the oxidation state of Chromium in the orange species?",
    options: [
      { key: "A", text: "Oxidation of Cr(+3) to Cr(+6) forming CrO₃" },
      { key: "B", text: "Conversion of Chromate (CrO₄²⁻) to Dichromate (Cr₂O₇²⁻); Oxidation state remains +6" },
      { key: "C", text: "Reduction of Cr(+6) to Cr(+3) forming green Cr³⁺" },
      { key: "D", text: "Formation of a peroxy complex CrO₅" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "2CrO₄²⁻ (Yellow) + 2H⁺ ⇌ Cr₂O₇²⁻ (Orange) + H₂O. This is an acid-base condensation reaction, not redox; Chromium remains in +6 oxidation state (d⁰).",
  },
  {
    id: 6,
    part: "A",
    question: "Which of the following 4f Lanthanide ions is DIAMAGNETIC (n=0 unpaired electrons) and completely COLORLESS in aqueous solution?",
    options: [
      { key: "A", text: "Eu³⁺ (Z=63)" },
      { key: "B", text: "Gd³⁺ (Z=64)" },
      { key: "C", text: "Lu³⁺ (Z=71)" },
      { key: "D", text: "Ce³⁺ (Z=58)" },
    ],
    correctKeys: ["C"],
    type: "single",
    explanation: "Lu³⁺ is [Xe] 4f¹⁴ (completely filled, n=0 unpaired electrons). It is diamagnetic and colorless (no f-f transitions possible).",
  },
  {
    id: 7,
    part: "A",
    question: "Why do Actinide elements (Th to Lr) display a much WIDER VARIETY of oxidation states (+3, +4, +5, +6, +7) than Lanthanide elements (Ce to Lu)?",
    options: [
      { key: "A", text: "Actinides are non-metallic elements." },
      { key: "B", text: "The energy gap between 5f, 6d, and 7s subshells in actinides is extremely small, allowing electrons from all three subshells to participate in bonding." },
      { key: "C", text: "Lanthanides lack 6s valence electrons." },
      { key: "D", text: "5f subshells shield nuclear charge perfectly." },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "In Actinides, 5f, 6d, and 7s subshells are of comparable energy levels, allowing electrons from all three subshells to participate in bonding (+3 to +7).",
  },
  {
    id: 8,
    part: "A",
    question: "What is the cause of the deep purple color of the Permanganate anion (MnO₄⁻), given that the central Manganese atom is in the +7 oxidation state with a completely empty 3d⁰ subshell?",
    options: [
      { key: "A", text: "d-d electronic transition between split t_2g and e_g orbitals" },
      { key: "B", text: "Ligand-to-Metal Charge Transfer (LMCT) from Oxygen 2p orbitals to vacant Manganese 3d orbitals" },
      { key: "C", text: "f-f orbital transitions" },
      { key: "D", text: "Paramagnetic resonance of unpaired 4s electrons" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Mn⁷⁺ (3d⁰) has zero d-electrons. Its intense purple color arises from Ligand-to-Metal Charge Transfer (LMCT) as electrons promote from O 2p into empty Mn 3d.",
  },
  {
    id: 9,
    part: "A",
    question: "Arranging the hydroxides La(OH)₃, Ce(OH)₃, Gd(OH)₃, and Lu(OH)₃ in order of DECREASING basic strength yields:",
    options: [
      { key: "A", text: "Lu(OH)₃ > Gd(OH)₃ > Ce(OH)₃ > La(OH)₃" },
      { key: "B", text: "La(OH)₃ > Ce(OH)₃ > Gd(OH)₃ > Lu(OH)₃" },
      { key: "C", text: "Gd(OH)₃ > La(OH)₃ > Lu(OH)₃ > Ce(OH)₃" },
      { key: "D", text: "All four hydroxides have identical basicity." },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Lanthanide Contraction decreases cation radius (Lu³⁺ < La³⁺), increasing covalent character (Fajans' Rules) and lowering OH⁻ release: La(OH)₃ > Ce(OH)₃ > Gd(OH)₃ > Lu(OH)₃.",
  },
  {
    id: 10,
    part: "A",
    question: "What alloy composed of ≈ 95% Lanthanide metals (Ce ≈ 50%), ≈ 5% Iron, and traces of S, C, Ca, and Al is used extensively in manufacturing lighter flints and armor-piercing bullets?",
    options: [
      { key: "A", text: "German Silver" },
      { key: "B", text: "Mischmetall" },
      { key: "C", text: "Stainless Steel" },
      { key: "D", text: "Invar" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Mischmetall is a pyrophoric alloy (95% Ln metals, Ce 50%, 5% Fe) producing sparks on friction, used in lighter flints and tracer bullets.",
  },
  {
    id: 11,
    part: "B",
    question: "Which of the following elements are classified as Non-Transition / Pseudo-Transition elements because they possess completely filled d¹⁰ subshells in both their ground state and common oxidation states? (Select all that apply)",
    options: [
      { key: "A", text: "Zinc (Zn, Z=30)" },
      { key: "B", text: "Cadmium (Cd, Z=48)" },
      { key: "C", text: "Mercury (Hg, Z=80)" },
      { key: "D", text: "Copper (Cu, Z=29)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• Zn, Cd, Hg (Group 12) have d¹⁰ configurations in all states and are pseudo-transition elements. • Cu forms Cu²⁺ (3d⁹) and is a true transition element.",
  },
  {
    id: 12,
    part: "B",
    question: "Select the valid statements regarding the Lanthanide Contraction and its chemical consequences: (Select all that apply)",
    options: [
      { key: "A", text: "It results from the poor electrostatic shielding efficiency of 4f electrons." },
      { key: "B", text: "Zirconium (Zr_4d) and Hafnium (Hf_5d) have almost identical atomic radii (≈ 1.59 Å)." },
      { key: "C", text: "The basic strength of lanthanide hydroxides decreases from La(OH)₃ to Lu(OH)₃." },
      { key: "D", text: "Separation of individual lanthanides from natural ores is extremely easy using simple fractional crystallization." },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are accurate. • D is incorrect: Lanthanide separation is extremely difficult due to identical sizes, requiring ion-exchange chromatography.",
  },
  {
    id: 13,
    part: "B",
    question: "Which of the following transition metal ions are COLORLESS in aqueous solution due to the absence of partially filled d-orbitals (d⁰ or d¹⁰)? (Select all that apply)",
    options: [
      { key: "A", text: "Scandium (Sc³⁺, 3d⁰)" },
      { key: "B", text: "Titanium (Ti⁴⁺, 3d⁰)" },
      { key: "C", text: "Zinc (Zn²⁺, 3d¹⁰)" },
      { key: "D", text: "Copper (Cu²⁺, 3d⁹)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• Sc³⁺ (d⁰), Ti⁴⁺ (d⁰), and Zn²⁺ (d¹⁰) lack partially filled d-orbitals and are colorless. • Cu²⁺ (3d⁹) is bright blue.",
  },
  {
    id: 14,
    part: "B",
    question: "Select the correct statements regarding the standard reduction potentials (E°) of 3d transition series metals: (Select all that apply)",
    options: [
      { key: "A", text: "Cr²⁺ (3d⁴) is a strong reducing agent because it oxidizes to Cr³⁺ which has a stable t_2g³ configuration in water." },
      { key: "B", text: "Mn³⁺ (3d⁴) is a strong oxidizing agent because it reduces to Mn²⁺ which has a stable half-filled 3d⁵ configuration." },
      { key: "C", text: "Copper is the only 3d metal with a positive E°_M²⁺/M = +0.34 V, so it does not release H₂ gas from dilute acids." },
      { key: "D", text: "Zn²⁺/Zn has a positive E° = +0.76 V." },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct. • D is false: E°(Zn²⁺/Zn) is negative (-0.76 V).",
  },
  {
    id: 15,
    part: "B",
    question: "Which of the following features characterize Interstitial Compounds formed by transition metals? (Select all that apply)",
    options: [
      { key: "A", text: "Small non-metal atoms (H, C, N, B) occupy interstitial voids in the metal crystal lattice." },
      { key: "B", text: "They are non-stoichiometric compounds (e.g., TiH_1.7, VH_0.56)." },
      { key: "C", text: "They exhibit higher melting points than pure parent metals and extreme hardness." },
      { key: "D", text: "They lose all metallic electrical conductivity and become electrical insulators." },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are accurate. • D is false: Interstitial compounds retain metallic electrical conductivity.",
  },
  {
    id: 16,
    part: "B",
    question: "Select the valid statements regarding Potassium Permanganate (KMnO₄): (Select all that apply)",
    options: [
      { key: "A", text: "Pyrolusite ore (MnO₂) is fused with KOH in the presence of air to yield dark green Manganate (K₂MnO₄)." },
      { key: "B", text: "Manganate ion (MnO₄²⁻) is paramagnetic (3d¹), whereas Permanganate ion (MnO₄⁻) is diamagnetic (3d⁰)." },
      { key: "C", text: "In acidic medium, KMnO₄ acts as an oxidant with n-factor = 5 (MnO₄⁻ ──► Mn²⁺)." },
      { key: "D", text: "In neutral medium, KMnO₄ oxidizes Iodide (I⁻) to Iodine gas (I₂)." },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct. • D is false: In neutral medium, KMnO₄ oxidizes I⁻ to Iodate (IO₃⁻), NOT I₂.",
  },
  {
    id: 17,
    part: "B",
    question: "Which of the following 4f Lanthanide ions exhibit anomalous stability in +2 or +4 oxidation states due to empty (4f⁰), half-filled (4f⁷), or fully-filled (4f¹⁴) subshells? (Select all that apply)",
    options: [
      { key: "A", text: "Ce⁴⁺ (4f⁰)" },
      { key: "B", text: "Eu²⁺ (4f⁷)" },
      { key: "C", text: "Yb²⁺ (4f¹⁴)" },
      { key: "D", text: "Tb⁴⁺ (4f⁷)" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four ions achieve stable f-subshell configurations (Ce⁴⁺: 4f⁰; Eu²⁺: 4f⁷; Yb²⁺: 4f¹⁴; Tb⁴⁺: 4f⁷).",
  },
  {
    id: 18,
    part: "B",
    question: "Select the correct options regarding Potassium Dichromate (K₂Cr₂O₇): (Select all that apply)",
    options: [
      { key: "A", text: "Synthesized from Chromite ore (FeCr₂O₄) by roasting with Na₂CO₃ in air." },
      { key: "B", text: "In aqueous solution, yellow Chromate (CrO₄²⁻) and orange Dichromate (Cr₂O₇²⁻) exist in a pH-dependent equilibrium." },
      { key: "C", text: "In acidic medium, Cr₂O₇²⁻ acts as an oxidant with n-factor = 6, reducing to green Cr³⁺." },
      { key: "D", text: "Na₂Cr₂O₇ is used as a primary volumetric standard in titrations because it is less soluble than K₂Cr₂O₇." },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are accurate. • D is false: K₂Cr₂O₇ is used as the primary standard because Na₂Cr₂O₇ is hygroscopic/deliquescent.",
  },
  {
    id: 19,
    part: "B",
    question: "Which of the following transition metal species contain NO unpaired d-electrons (d⁰ or d¹⁰) yet exist as stable chemical entities? (Select all that apply)",
    options: [
      { key: "A", text: "Scandium ion (Sc³⁺)" },
      { key: "B", text: "Titanium(IV) oxide (TiO₂)" },
      { key: "C", text: "Permanganate ion (MnO₄⁻)" },
      { key: "D", text: "Dichromate ion (Cr₂O₇²⁻)" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four species have central metal atoms in d⁰ electronic configurations.",
  },
  {
    id: 20,
    part: "B",
    question: "Select the correct statements contrasting Actinides (5f) with Lanthanides (4f): (Select all that apply)",
    options: [
      { key: "A", text: "Actinides exhibit a wider range of oxidation states (+3 to +7) than Lanthanides (+3 dominant)." },
      { key: "B", text: "5f electrons exert weaker shielding than 4f electrons, making Actinide contraction larger." },
      { key: "C", text: "All Actinide elements are radioactive." },
      { key: "D", text: "Actinides readily form oxocations such as UO₂²⁺ and NpO₂⁺." },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four statements accurately contrast the properties of 5f actinides with 4f lanthanides.",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
type Tab = "d-block-overview" | "radii-ionization" | "oxidation-redox" | "magnetism-color" | "catalysis-interstitial-alloys" | "dichromate" | "permanganate" | "lanthanides-actinides" | "traps" | "glossary" | "selftest";

export const DAndFBlockDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("d-block-overview");
  const [activeTrapId, setActiveTrapId] = useState<string | null>(null);

  // Magnetic Moment Live Calculator State
  const [calcN, setCalcN] = useState<number>(3); // number of unpaired electrons

  const calcMagneticMoment = () => {
    if (calcN < 0) return "0.00";
    const mu = Math.sqrt(calcN * (calcN + 2));
    return mu.toFixed(2);
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
    { id: "d-block-overview", label: "d-Block & Δ_a H°", icon: <Atom className="w-3.5 h-3.5 shrink-0" /> },
    { id: "radii-ionization", label: "Radii & Ionization", icon: <TrendingUp className="w-3.5 h-3.5 shrink-0" /> },
    { id: "oxidation-redox", label: "Oxidation & Cu⁺", icon: <Gauge className="w-3.5 h-3.5 shrink-0" /> },
    { id: "magnetism-color", label: "Magnetism & LMCT", icon: <Magnet className="w-3.5 h-3.5 shrink-0" /> },
    { id: "catalysis-interstitial-alloys", label: "Catalysis & Alloys", icon: <Boxes className="w-3.5 h-3.5 shrink-0" /> },
    { id: "dichromate", label: "K₂Cr₂O₇ Chemistry", icon: <FlaskConical className="w-3.5 h-3.5 shrink-0" /> },
    { id: "permanganate", label: "KMnO₄ Multi-pH", icon: <Palette className="w-3.5 h-3.5 shrink-0" /> },
    { id: "lanthanides-actinides", label: "4f & 5f Series", icon: <Layers3 className="w-3.5 h-3.5 shrink-0" /> },
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
          CHEMISTRY INTERACTIVE MODULE — d- AND f-BLOCK ELEMENTS (CLASS XII / UNIT XIII)
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <Atom className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 shrink-0" />
            d- AND f-BLOCK ELEMENTS: 3d TRENDS, KMnO₄, K₂Cr₂O₇, &amp; CONTRACTION
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            Electronic Architecture &amp; Δ_a H° · Radii &amp; Ionization Anomalies · Spin-Only Magnetism &amp; LMCT Color · K₂Cr₂O₇ &amp; KMnO₄ Multi-pH Redox · Lanthanide &amp; Actinide Contractions
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

      {/* TAB 1: d-BLOCK & ATOMIZATION */}
      {activeTab === "d-block-overview" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Atom className="w-4 h-4 text-amber-600 shrink-0" />
              d-Block Overview, Electronic Architecture, &amp; Enthalpies of Atomization
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[10px]">
                <span className="font-black text-slate-900 uppercase">d-Block Taxonomy &amp; Exclusions</span>
                <p className="font-mono text-slate-800 font-bold">General: (n-1)d¹⁻¹⁰ ns¹⁻²</p>
                <p className="text-slate-700 font-semibold">• <strong>True Transition:</strong> Incomplete (n-1)d¹⁻⁹ subshells (Sc to Cu).</p>
                <p className="text-slate-700 font-semibold">• <strong>Pseudo-Transition (Group 12):</strong> Zn, Cd, Hg (completely filled d¹⁰ in neutral &amp; all ionic states).</p>
                <p className="text-slate-600 font-semibold">• Anomalies: Cr ([Ar] 3d⁵ 4s¹) &amp; Cu ([Ar] 3d¹⁰ 4s¹).</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5 text-[10px]">
                <span className="font-black text-amber-950 uppercase">Enthalpy of Atomization (Δ_a H°)</span>
                <p className="text-amber-900 font-semibold">High MP &amp; Δ_a H° arise from overlapping ns electrons + covalent (n-1)d overlap.</p>
                <p className="text-amber-950 font-bold">• <strong>The Manganese Anomaly (Mn, 281 kJ/mol):</strong> Stable half-filled 3d⁵ localizes d-electrons tightly, minimizing covalent orbital overlap.</p>
                <p className="text-amber-900 font-semibold">• <strong>Zinc Minimal Δ_a H° (126 kJ/mol):</strong> 0 unpaired d-electrons; bonded purely by weak 4s electrons.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RADII & IONIZATION */}
      {activeTab === "radii-ionization" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600 shrink-0" />
              Atomic Radii Profiles &amp; Ionization Enthalpy Anomalies
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[10px]">
                <span className="font-black text-slate-900 uppercase">3d Series Atomic Radii Trend</span>
                <p className="text-slate-800 font-semibold">• <strong>Sc ──► Cr:</strong> Radii DECREASE (Increasing Z_eff overrides 3d shielding).</p>
                <p className="text-slate-800 font-semibold">• <strong>Mn ──► Ni:</strong> Radii REMAIN FLAT (3d shielding balances increasing Z).</p>
                <p className="text-slate-800 font-semibold">• <strong>Cu ──► Zn:</strong> Radii EXPAND SLIGHTLY (3d¹⁰ inter-electronic repulsions expand cloud).</p>
              </div>
              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1.5 text-[10px]">
                <span className="font-black text-indigo-950 uppercase">Successive Ionization Anomalies</span>
                <p className="text-indigo-900 font-semibold">• <strong>High Δ_i H_2 (Cr &amp; Cu):</strong> Breaks stable half-filled 3d⁵ (Cr⁺) and fully-filled 3d¹⁰ (Cu⁺).</p>
                <p className="text-indigo-900 font-semibold">• <strong>High Δ_i H_3 (Mn &amp; Zn):</strong> Breaks stable half-filled 3d⁵ (Mn²⁺) and fully-filled 3d¹⁰ (Zn²⁺).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: OXIDATION & Cu+ */}
      {activeTab === "oxidation-redox" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-emerald-600 shrink-0" />
              Oxidation State Energetics &amp; Disproportionation of Cu⁺
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[10px]">
                <span className="font-black text-slate-900 uppercase">E°_M³⁺/M²⁺ Redox Analysis</span>
                <p className="font-mono text-emerald-900 font-bold">• Mn³⁺ / Mn²⁺ = +1.57 V: Strong Oxidizing Agent (seeks stable 3d⁵ Mn²⁺).</p>
                <p className="font-mono text-emerald-900 font-bold">• Cr³⁺ / Cr²⁺ = -0.41 V: Strong Reducing Agent (spontaneously oxidizes to stable t_2g³ Cr³⁺).</p>
                <p className="text-slate-600 font-semibold">Max OS in 3d series = +7 (MnO₄⁻); Max OS in periodic table = +8 (OsO₄, RuO₄).</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5 text-[10px]">
                <span className="font-black text-emerald-950 uppercase">Disproportionation of Cu⁺(aq)</span>
                <p className="font-mono font-bold text-emerald-900">2Cu⁺(aq) ──► Cu²⁺(aq) + Cu(s)  (E° = +0.36 V)</p>
                <p className="text-emerald-900 font-semibold">• <strong>Driving Force:</strong> Hydration Enthalpy of Cu²⁺ (-2121 kJ/mol) is far more exothermic than Cu⁺ (-581 kJ/mol).</p>
                <p className="text-emerald-800">This massive hydration release compensates for the 2nd ionization enthalpy (+1958 kJ/mol).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MAGNETISM & LMCT COLOR */}
      {activeTab === "magnetism-color" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Magnet className="w-4 h-4 text-purple-600 shrink-0" />
              Spin-Only Magnetic Moments &amp; Color Mechanisms (d-d vs. LMCT)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                <span className="font-black text-slate-900 uppercase">Spin-Only Magnetic Formula</span>
                <p className="font-mono font-bold text-purple-900">μ_s = √(n(n+2)) BM</p>
                <p className="text-slate-700 font-semibold">• n=1 ⟹ 1.73 BM (Ti³⁺, Cu²⁺) | n=2 ⟹ 2.84 BM (V³⁺, Ni²⁺)</p>
                <p className="text-slate-700 font-semibold">• n=3 ⟹ 3.87 BM (Cr³⁺, Mn⁴⁺) | n=4 ⟹ 4.90 BM (Fe²⁺, Cr²⁺)</p>
                <p className="text-slate-700 font-semibold">• n=5 ⟹ 5.92 BM (Mn²⁺, Fe³⁺)</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1 text-[10px]">
                <span className="font-black text-purple-950 uppercase">d-d Transitions vs. LMCT Color</span>
                <p className="text-purple-900 font-semibold">• <strong>d-d Transitions (d¹-d⁹):</strong> Cu²⁺ (Blue), Cr³⁺ (Green), Fe³⁺ (Yellow).</p>
                <p className="text-purple-950 font-bold">• <strong>LMCT in d⁰ ions:</strong> KMnO₄ (Deep Purple), K₂Cr₂O₇ (Orange).</p>
                <p className="text-purple-800">• <strong>Colorless:</strong> d⁰ (Sc³⁺, Ti⁴⁺, V⁵⁺) &amp; d¹⁰ (Zn²⁺, Cd²⁺, Cu⁺).</p>
              </div>
            </div>

            {/* Live Magnetic Moment Calculator */}
            <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-2 text-[10px]">
              <span className="font-black text-purple-950 uppercase tracking-wider block">Live Spin-Only Magnetic Moment Calculator</span>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-[9px] font-bold text-slate-700 block">Number of Unpaired Electrons (n):</label>
                  <input
                    type="number"
                    min="0"
                    max="7"
                    value={calcN}
                    onChange={(e) => setCalcN(parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-1 rounded bg-white border border-slate-300 font-bold text-slate-900"
                  />
                </div>
                <div className="flex-1 p-2 rounded bg-white border border-purple-300 flex items-center justify-between">
                  <span className="font-bold text-purple-950">Calculated Magnetic Moment (μ_s):</span>
                  <span className="font-mono font-black text-purple-900 text-xs">{calcMagneticMoment()} BM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CATALYSIS, INTERSTITIAL, & ALLOYS */}
      {activeTab === "catalysis-interstitial-alloys" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Boxes className="w-4 h-4 text-blue-600 shrink-0" />
              Catalytic Mechanisms, Interstitial Compounds, &amp; Alloys
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[10px]">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 block">1. Catalytic Ability</span>
                <p className="text-slate-700 font-semibold">• Variable oxidation states form unstable intermediate complexes.</p>
                <p className="text-slate-700 font-semibold">• Examples: V₂O₅ (Contact), Fe (Haber), Raney Ni, TiCl₄ + Al(C₂H₅)₃ (Ziegler-Natta).</p>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
                <span className="font-black text-blue-950 block">2. Interstitial Compounds</span>
                <p className="text-blue-900 font-semibold">• Small atoms (H, C, N, B) trapped in lattice voids (TiC, Fe₃C, VH_0.56).</p>
                <p className="text-blue-950 font-bold">• High MP, extreme hardness, retain metallic conductivity, chemically inert.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1">
                <span className="font-black text-indigo-950 block">3. Alloy Formation</span>
                <p className="text-indigo-900 font-semibold">• Atomic radii differ by &lt;15% (Hume-Rothery rules), allowing lattice substitution.</p>
                <p className="text-indigo-900 font-semibold">• Examples: Brass (Cu-Zn), Bronze (Cu-Sn), Stainless Steel (Fe-Cr-Ni).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: K₂Cr₂O₇ CHEMISTRY */}
      {activeTab === "dichromate" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-amber-600 shrink-0" />
              Potassium Dichromate (K₂Cr₂O₇): Synthesis, pH Equilibrium, &amp; Redox
            </h4>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] space-y-1">
              <span className="font-black text-slate-900 block">Synthesis from Chromite Ore (FeCr₂O₄):</span>
              <p className="font-mono text-slate-800 font-bold">1. 4FeCr₂O₄ + 8Na₂CO₃ + 7O₂ ──► 8Na₂CrO₄ (Yellow) + 2Fe₂O₃ + 8CO₂</p>
              <p className="font-mono text-slate-800 font-bold">2. 2Na₂CrO₄ + H₂SO₄ ──► Na₂Cr₂O₇ (Orange) + Na₂SO₄ + H₂O</p>
              <p className="font-mono text-slate-800 font-bold">3. Na₂Cr₂O₇ + 2KCl ──► K₂Cr₂O₇↓ (Orange crystals) + 2NaCl  (Primary Standard!)</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                <span className="font-black text-amber-950 uppercase block">pH-Dependent Equilibrium</span>
                <p className="font-mono font-bold text-amber-900">2CrO₄²⁻ (Yellow) + 2H⁺ ⇌ Cr₂O₇²⁻ (Orange) + H₂O</p>
                <p className="text-amber-800">• Acid shifts to Orange; Base shifts to Yellow (Cr remains +6).</p>
                <p className="text-amber-800">• Cr₂O₇²⁻ structure: Two corner-sharing tetrahedra, 126° Cr-O-Cr bridge.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 uppercase block">Acidic Oxidizing Action (n = 6)</span>
                <p className="font-mono font-bold text-emerald-900">Cr₂O₇²⁻ + 14H⁺ + 6e⁻ ──► 2Cr³⁺ (Green) + 7H₂O</p>
                <p className="text-slate-700">• 6I⁻ ──► 3I₂  |  6Fe²⁺ ──► 6Fe³⁺</p>
                <p className="text-slate-700">• 3H₂S ──► 3S↓ (Turbidity)  |  3SO₃²⁻ ──► 3SO₄²⁻</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: KMnO₄ MULTI-pH */}
      {activeTab === "permanganate" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Palette className="w-4 h-4 text-purple-600 shrink-0" />
              Potassium Permanganate (KMnO₄): Multi-pH Redox Chemistry
            </h4>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] space-y-1">
              <span className="font-black text-slate-900 block">Synthesis from Pyrolusite (MnO₂):</span>
              <p className="font-mono text-slate-800 font-bold">2MnO₂ + 4KOH + O₂ ──► 2K₂MnO₄ (Dark Green, 3d¹, Paramagnetic) + 2H₂O</p>
              <p className="font-mono text-slate-800 font-bold">3MnO₄²⁻ + 4H⁺ ──► 2MnO₄⁻ (Purple, 3d⁰, Diamagnetic) + MnO₂ + 2H₂O</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px]">
              <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1">
                <span className="font-black text-purple-950 block">1. Acidic Medium (n = 5)</span>
                <p className="font-mono font-bold text-purple-900">MnO₄⁻ + 8H⁺ + 5e⁻ ──► Mn²⁺ + 4H₂O</p>
                <p className="text-purple-800">Mn²⁺ is colorless. (Oxidizes I⁻ ──► I₂).</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                <span className="font-black text-amber-950 block">2. Neutral/Faint Alkaline (n = 3)</span>
                <p className="font-mono font-bold text-amber-900">MnO₄⁻ + 2H₂O + 3e⁻ ──► MnO₂↓ + 4OH⁻</p>
                <p className="text-amber-950 font-bold">I⁻ is oxidized to IO₃⁻ (Iodate!), NOT I₂!</p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="font-black text-emerald-950 block">3. Strongly Basic (n = 1)</span>
                <p className="font-mono font-bold text-emerald-900">MnO₄⁻ + e⁻ ──► MnO₄²⁻ (Green)</p>
                <p className="text-emerald-800">Forms dark green Manganate ion.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: 4f & 5f SERIES */}
      {activeTab === "lanthanides-actinides" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Layers3 className="w-4 h-4 text-teal-600 shrink-0" />
              Lanthanides (4f) vs. Actinides (5f) Comparative Chemistry
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-2.5 rounded-xl bg-teal-50/70 border border-teal-200 space-y-1">
                <span className="font-black text-teal-950 uppercase block">Lanthanides (4f Series, Ce to Lu)</span>
                <p className="font-mono text-teal-900 font-bold">[Xe] 4f¹⁻¹⁴ 5d⁰⁻¹ 6s²  (Dominant OS: +3)</p>
                <p className="text-teal-900 font-semibold">• Ce⁴⁺ (4f⁰) is oxidizing; Eu²⁺ (4f⁷) is reducing.</p>
                <p className="text-teal-900 font-semibold">• Lanthanide Contraction: Zr ≈ Hf (1.59 Å); La(OH)₃ most basic, Lu(OH)₃ least basic.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 uppercase block">Actinides (5f Series, Th to Lr)</span>
                <p className="font-mono text-slate-800 font-bold">[Rn] 5f¹⁻¹⁴ 6d⁰⁻¹ 7s²  (Wide OS: +3 to +7 in Np, Pu)</p>
                <p className="text-slate-700 font-semibold">• Small 5f-6d-7s energy gap allows wide oxidation states.</p>
                <p className="text-slate-700 font-semibold">• ALL Actinides are radioactive; readily form oxocations (UO₂²⁺, NpO₂⁺).</p>
                <p className="text-slate-700 font-semibold">• Actinide Contraction is GREATER than Lanthanide Contraction.</p>
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
              All 10 High-Yield NEST d- and f-Block Misconceptions &amp; Traps
            </h4>
            <div className="space-y-2">
              {dfBlockTraps.map((trap) => {
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
                placeholder="Search d- and f-block terms..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {["All", "3d Physical & Electronic", "Redox, KMnO₄ & K₂Cr₂O₇", "Lanthanides (4f Series)", "Actinides & General Inorganic"].map((cat) => (
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
                {score >= 17 ? "Outstanding! Mastery level for NEST & IChO d- and f-Block Elements Module." : score >= 12 ? "Good performance — review incorrect explanations." : "Needs practice — revisit earlier tabs and retake."}
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
                      <span className="text-[9px] font-black uppercase tracking-wider text-amber-700">Detailed Solution &amp; Inorganic Explanation</span>
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

export default DAndFBlockDiagram;
