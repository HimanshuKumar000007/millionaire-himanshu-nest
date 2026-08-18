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
} from "lucide-react";

// ============================================================================
// 1. DATA: IUPAC FUNCTIONAL GROUP PRIORITY HIERARCHY
// ============================================================================
interface PriorityRow {
  group: string;
  formula: string;
  prefix: string;
  suffix: string;
}

const priorityHierarchyMatrix: PriorityRow[] = [
  { group: "Carboxylic Acid", formula: "-COOH", prefix: "Carboxy-", suffix: "-oic acid / -carboxylic acid" },
  { group: "Sulfonic Acid", formula: "-SO₃H", prefix: "Sulfo-", suffix: "-sulfonic acid" },
  { group: "Acid Anhydride", formula: "-(CO)₂O", prefix: "—", suffix: "-oic anhydride" },
  { group: "Ester", formula: "-COOR", prefix: "Alkoxycarbonyl- / Carbalkoxy-", suffix: "-oate / -carboxylate" },
  { group: "Acid Halide", formula: "-COX (X = F, Cl, Br, I)", prefix: "Halocarbonyl- / Haloformyl-", suffix: "-oyl halide" },
  { group: "Amide", formula: "-CONH₂", prefix: "Carbamoyl-", suffix: "-amide / -carboxamide" },
  { group: "Nitrile", formula: "-CN", prefix: "Cyano-", suffix: "-nitrile / -carbonitrile" },
  { group: "Aldehyde", formula: "-CHO", prefix: "Formyl- / Oxo-", suffix: "-al / -carbaldehyde" },
  { group: "Ketone", formula: "-R-CO-R'", prefix: "Oxo- / Keto-", suffix: "-one" },
  { group: "Alcohol", formula: "-OH", prefix: "Hydroxy-", suffix: "-ol" },
  { group: "Thiol", formula: "-SH", prefix: "Mercapto- / Sulfanyl-", suffix: "-thiol" },
  { group: "Amine", formula: "-NH₂", prefix: "Amino-", suffix: "-amine" },
  { group: "Alkene / Alkyne", formula: "-C=C- / -C≡C-", prefix: "—", suffix: "-ene / -yne" },
];

// ============================================================================
// 2. DATA: DISTILLATION VARIANTS
// ============================================================================
interface DistillationRow {
  technique: string;
  principle: string;
  criteria: string;
  examples: string;
}

const distillationMatrix: DistillationRow[] = [
  { technique: "Simple Distillation", principle: "Volatilization followed by condensation", criteria: "Large boiling point difference (ΔT_bp > 25 K)", examples: "Hexane (69°C) and Toluene (111°C); Ether and Toluene" },
  { technique: "Fractional Distillation", principle: "Repeated vaporization-condensation in fractionating column", criteria: "Close boiling points (ΔT_bp < 25 K)", examples: "Crude petroleum refining; Acetone (56°C) and Methyl alcohol (65°C)" },
  { technique: "Steam Distillation", principle: "Immiscible liquid co-distills: P_total = P°_water + P°_organic = 1 atm", criteria: "Steam-volatile and completely water-immiscible (boils <100°C)", examples: "Aniline, Nitrobenzene, Essential oils (Eucalyptus / Rose oil)" },
  { technique: "Vacuum Distillation (Reduced Pressure)", principle: "Lowering external pressure reduces the boiling point", criteria: "Substances decomposing at or below normal boiling points", examples: "Glycerol / Glycerin (normal BP 290°C decomposes; distills safely at 180°C under 12 mmHg)" },
];

// ============================================================================
// 3. DATA: QUANTITATIVE ESTIMATION FORMULAS
// ============================================================================
interface EstimationRow {
  element: string;
  method: string;
  reaction: string;
  formula: string;
}

const quantitativeMatrix: EstimationRow[] = [
  { element: "Carbon (C)", method: "Liebig Combustion", reaction: "C + 2CuO → CO₂ + 2Cu (Absorbed in conc. KOH)", formula: "% C = (12 / 44) × (Mass of CO₂ / Mass of Sample) × 100" },
  { element: "Hydrogen (H)", method: "Liebig Combustion", reaction: "2H + CuO → H₂O + Cu (Absorbed in anhyd. CaCl₂)", formula: "% H = (2 / 18) × (Mass of H₂O / Mass of Sample) × 100" },
  { element: "Nitrogen (N)", method: "Dumas Method", reaction: "Combustion with CuO in CO₂ atmosphere; dry N₂ over conc. KOH", formula: "% N = (28 / 22400) × (V_N2 at STP in mL / Mass of Sample in g) × 100" },
  { element: "Nitrogen (N)", method: "Kjeldahl Method", reaction: "Digestion with H₂SO₄ → (NH₄)₂SO₄ ──[NaOH]──► NH₃ → acid titration", formula: "% N = (1.4 × N_acid × V_acid consumed in mL) / (Mass of Sample in g)" },
  { element: "Halogens (X)", method: "Carius Method", reaction: "Digested with fuming HNO₃ + AgNO₃ → AgX precipitate", formula: "% X = (M_X / M_AgX) × (Mass of AgX / Mass of Sample) × 100" },
  { element: "Sulfur (S)", method: "Carius Method", reaction: "Digested with fuming HNO₃ + BaCl₂ → BaSO₄ precipitate", formula: "% S = (32 / 233.36) × (Mass of BaSO₄ / Mass of Sample) × 100" },
  { element: "Phosphorus (P)", method: "Carius Method", reaction: "Fuming HNO₃ → H₃PO₄ → ignited to Mg₂P₂O₇", formula: "% P = (62 / 222) × (Mass of Mg₂P₂O₇ / Mass of Sample) × 100" },
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

const organicTraps: Misconception[] = [
  { id: "t1", trap: "The Kjeldahl method can estimate nitrogen in Pyridine and Nitrobenzene.", reality: "Kjeldahl FAILS for Pyridine, Nitro (-NO₂), and Azo (-N=N-) compounds because nitrogen does not convert to (NH₄)₂SO₄.", tip: "Use the Dumas Method for pyridine/nitro compounds." },
  { id: "t2", trap: "In 1,2-dichloroethane, the anti-conformer is always more stable than the gauche-conformer.", reality: "In 1,2-fluoroethanol or ethylene glycol, the GAUCHE-conformer is MORE stable than anti due to intramolecular H-bonding.", tip: "The 'Gauche effect' overrides steric repulsions when H-bonding occurs." },
  { id: "t3", trap: "Carbanion stability follows the order 3° > 2° > 1° > CH₃⁻.", reality: "Carbanion stability is REVERSED: CH₃⁻ > 1° > 2° > 3° because +I alkyl groups intensify and destabilize negative charge.", tip: "Carbocation is 3° > 2° > 1°; Carbanion is CH₃⁻ > 1° > 2° > 3°." },
  { id: "t4", trap: "Heat of Hydrogenation increases as alkene stability increases.", reality: "Heat of Hydrogenation (HoH) is INVERSELY PROPORTIONAL to alkene stability. More stable alkenes release LESS heat upon hydrogenation.", tip: "HoH ∝ 1 / (Number of α-Hydrogens)." },
  { id: "t5", trap: "In Steam Distillation, the mixture boils at a temperature higher than 100°C.", reality: "In steam distillation, P_total = P°_water + P°_organic = 1 atm, so the mixture BOILS BELOW 100°C.", tip: "Ideal for heat-sensitive organic liquids immiscible with water." },
  { id: "t6", trap: "Lassaigne's test for Nitrogen in an organic compound containing Sulfur yields a Prussian blue color.", reality: "If N and S are both present, SFE forms NaSCN, yielding a BLOOD-RED color ([Fe(SCN)]²⁺), NOT Prussian blue.", tip: "Prussian blue forms only when Sulfur is absent." },
  { id: "t7", trap: "Resonance structures represent real equilibrating molecules.", reality: "Canonical resonance structures are hypothetical Lewis representations; the real molecule is a single static Resonance Hybrid.", tip: "The resonance hybrid has lower energy than any canonical form." },
  { id: "t8", trap: "Hyperconjugation operates through π-bond framework exclusively.", reality: "Hyperconjugation is No-Bond Resonance involving the delocalization of σ_C-H electrons into adjacent vacant p or π* orbitals.", tip: "Depends on α-hydrogens attached to sp² carbon." },
  { id: "t9", trap: "Carbocations do not undergo structural rearrangements during reactions.", reality: "Carbocations readily undergo 1,2-hydride or 1,2-methyl shifts if a more stable carbocation (1° → 2° → 3°) can be formed.", tip: "Always check for carbocation rearrangements in S_N1 / E1 reactions." },
  { id: "t10", trap: "Ethidium bromide-stained DNA is visible under normal white laboratory light.", reality: "EtBr-stained DNA is invisible under white light; it fluoresces bright orange strictly under Ultraviolet (UV) radiation.", tip: "UV trans-illuminator is mandatory." },
];

// ============================================================================
// 5. DATA: MASTER GLOSSARY (40 DEFINITIONS)
// ============================================================================
interface GlossaryTerm {
  term: string;
  definition: string;
  category: "Nomenclature & Purification" | "Qualitative & Quantitative Analysis" | "Electronic Effects" | "Reactive Intermediates & Mechanisms";
}

const masterGlossary: GlossaryTerm[] = [
  { term: "Adsorption Chromatography", definition: "Separation technique based on differential adsorption of solutes on a stationary solid matrix (TLC, Column).", category: "Nomenclature & Purification" },
  { term: "Ambident Nucleophile", definition: "A nucleophile possessing two different nucleophilic atoms capable of attacking an electrophile (e.g., CN⁻, NO₂⁻).", category: "Reactive Intermediates & Mechanisms" },
  { term: "Anilinium Ion", definition: "Protonated aniline (Ph-NH₃⁺) exhibiting strong -I and -M electronic effects.", category: "Electronic Effects" },
  { term: "Aromaticity (Hückel's Rule)", definition: "Cyclic, planar, fully conjugated systems containing (4n+2) π-electrons exhibiting high resonance stabilization.", category: "Electronic Effects" },
  { term: "Carius Method", definition: "Quantitative elemental estimation technique digesting organic compounds with fuming HNO₃ and AgNO₃ or BaCl₂.", category: "Qualitative & Quantitative Analysis" },
  { term: "Carbocation", definition: "A planar, sp²-hybridized, 6-valence-electron reactive intermediate bearing a positive charge on carbon.", category: "Reactive Intermediates & Mechanisms" },
  { term: "Carbanion", definition: "A pyramidal, sp³-hybridized, 8-valence-electron reactive intermediate bearing a negative charge on carbon.", category: "Reactive Intermediates & Mechanisms" },
  { term: "Chiral Center", definition: "A tetrahedral carbon atom bonded to four morphologically distinct substituents.", category: "Nomenclature & Purification" },
  { term: "Chromatography", definition: "Analytical technique separating components of a mixture between a stationary phase and a mobile phase.", category: "Nomenclature & Purification" },
  { term: "Dumas Method", definition: "Quantitative nitrogen estimation via combustion with CuO in CO₂ atmosphere, collecting dry N₂ gas over KOH at STP.", category: "Qualitative & Quantitative Analysis" },
  { term: "Electromeric Effect (E)", definition: "Temporary complete transfer of a π-electron pair in a multiple bond triggered by an attacking reagent.", category: "Electronic Effects" },
  { term: "Electrophile (E⁺)", definition: "An electron-deficient Lewis acid species that accepts an electron pair from a nucleophile.", category: "Reactive Intermediates & Mechanisms" },
  { term: "Empirical Formula", definition: "The simplest whole-number integer ratio of atoms of each element in a compound.", category: "Qualitative & Quantitative Analysis" },
  { term: "Free Radical", definition: "A neutral, odd-electron (7 valence electrons) reactive intermediate produced by homolytic bond fission.", category: "Reactive Intermediates & Mechanisms" },
  { term: "Heterolytic Fission", definition: "Unsymmetrical bond cleavage where the more electronegative atom retains both bonding electrons.", category: "Reactive Intermediates & Mechanisms" },
  { term: "Homolytic Fission", definition: "Symmetrical bond cleavage where each fragment retains one bonding electron, forming free radicals.", category: "Reactive Intermediates & Mechanisms" },
  { term: "Hyperconjugation", definition: "Delocalization of σ_C-H electrons into adjacent vacant p or π* orbitals (No-Bond Resonance / Nathan-Baker effect).", category: "Electronic Effects" },
  { term: "Inductive Effect (I)", definition: "Permanent, distance-dependent polarisation of σ-bonds along a carbon chain due to electronegativity differences.", category: "Electronic Effects" },
  { term: "Kjeldahl Method", definition: "Quantitative nitrogen estimation digesting compounds with conc. H₂SO₄ → (NH₄)₂SO₄ → NH₃ titration against acid.", category: "Qualitative & Quantitative Analysis" },
  { term: "Lassaigne’s Extract (SFE)", definition: "Sodium fusion extract converting covalently bound N, S, X into ionic sodium salts for qualitative detection.", category: "Qualitative & Quantitative Analysis" },
  { term: "Mesomeric Effect (M)", definition: "Permanent delocalization of π-electrons or lone pairs through a conjugated system (Resonance).", category: "Electronic Effects" },
  { term: "Nucleophile (Nu⁻)", definition: "An electron-rich Lewis base species capable of donating an electron pair to an electrophile.", category: "Reactive Intermediates & Mechanisms" },
  { term: "Partition Chromatography", definition: "Separation technique based on differential partitioning of solutes between two liquid phases (Paper Chromatography).", category: "Nomenclature & Purification" },
  { term: "Prussian Blue", definition: "Ferriferrocyanide complex Fe₄[Fe(CN)₆]₃ formed during Lassaigne's test for Nitrogen.", category: "Qualitative & Quantitative Analysis" },
  { term: "Resonance Hybrid", definition: "The true single spatial structure of a molecule representing a weighted average of all canonical structures.", category: "Electronic Effects" },
  { term: "Retardation Factor (R_f)", definition: "Ratio of distance traveled by solute to distance traveled by solvent front in chromatography.", category: "Nomenclature & Purification" },
  { term: "Steam Distillation", definition: "Purification method for steam-volatile, water-immiscible organic liquids that distill below 100°C.", category: "Nomenclature & Purification" },
  { term: "Tautomerism", definition: "Functional isomerism involving dynamic rapid interconversion of constitutional isomers via proton shift (keto-enol).", category: "Electronic Effects" },
  { term: "Vacuum Distillation", definition: "Distillation under reduced pressure used for liquids that undergo thermal decomposition below their normal boiling point.", category: "Nomenclature & Purification" },
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
    question: "In a quantitative Dumas nitrogen estimation, 0.28 g of a pure organic compound yields 33.6 mL of dry Nitrogen gas (N₂) collected over concentrated KOH solution at STP (0°C, 1 atm). What is the percentage of Nitrogen by mass in the organic compound?",
    options: [
      { key: "A", text: "15.0%" },
      { key: "B", text: "28.0%" },
      { key: "C", text: "12.5%" },
      { key: "D", text: "30.0%" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "% N = (28 / 22400) × (33.6 / 0.28) × 100 = 940.8 / 62.72 = 15.0%.",
  },
  {
    id: 2,
    part: "A",
    question: "During elemental analysis by the Kjeldahl method, 0.50 g of an organic compound is digested with concentrated H₂SO₄. The liberated Ammonia (NH₃) is absorbed in 50.0 mL of 0.10 M H₂SO₄ solution. The unreacted excess H₂SO₄ requires 30.0 mL of 0.10 M NaOH solution for complete neutralization. What is the mass percentage of Nitrogen in the compound?",
    options: [
      { key: "A", text: "19.6%" },
      { key: "B", text: "14.0%" },
      { key: "C", text: "28.0%" },
      { key: "D", text: "7.0%" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "Initial acid meq = 50.0 × 0.10 × 2 = 10.0 meq. Excess neutralized = 30.0 × 0.10 = 3.0 meq. Acid consumed by NH₃ = 7.0 meq. % N = (1.4 × 7.0) / 0.50 = 19.6%.",
  },
  {
    id: 3,
    part: "A",
    question: "Which of the following organic compounds will FAIL to give a positive Nitrogen test during the Kjeldahl estimation method?",
    options: [
      { key: "A", text: "Glycine (H₂N-CH₂-COOH)" },
      { key: "B", text: "Nitrobenzene (Ph-NO₂)" },
      { key: "C", text: "Acetamide (CH₃CONH₂)" },
      { key: "D", text: "Urea (H₂N-CO-NH₂)" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Kjeldahl fails for Nitro (-NO₂), Azo (-N=N-), and ring nitrogen (Pyridine/Pyrrole) because nitrogen is not converted into (NH₄)₂SO₄ during digestion.",
  },
  {
    id: 4,
    part: "A",
    question: "Arrange the following free-radical species in order of INCREASING thermodynamic stability: CH₃•, (CH₃)₂CH•, (CH₃)₃C•, CH₃CH₂•, Ph₃C•.",
    options: [
      { key: "A", text: "Ph₃C• < (CH₃)₃C• < (CH₃)₂CH• < CH₃CH₂• < CH₃•" },
      { key: "B", text: "CH₃• < CH₃CH₂• < (CH₃)₂CH• < (CH₃)₃C• < Ph₃C•" },
      { key: "C", text: "CH₃• < (CH₃)₃C• < Ph₃C• < CH₃CH₂• < (CH₃)₂CH•" },
      { key: "D", text: "(CH₃)₃C• < Ph₃C• < CH₃• < CH₃CH₂• < (CH₃)₂CH•" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Methyl (0 α-H) < 1° Ethyl (3 α-H) < 2° Isopropyl (6 α-H) < 3° tert-Butyl (9 α-H) < Triphenylmethyl (extensive 3-ring resonance).",
  },
  {
    id: 5,
    part: "A",
    question: "What is the correct IUPAC name for the poly-functional organic compound: HO-CH₂-CH(CH₃)-CH₂-CO-CH₂-COOH?",
    options: [
      { key: "A", text: "6-Hydroxy-5-methyl-3-oxohexanoic acid" },
      { key: "B", text: "1-Hydroxy-2-methyl-4-oxohexan-6-oic acid" },
      { key: "C", text: "5-Methyl-6-hydroxy-3-ketohexanoic acid" },
      { key: "D", text: "3-Oxo-5-methyl-6-hydroxyhexanoic acid" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "-COOH is C-1. Chain has 6 carbons (hexanoic acid). C-3 has oxo, C-5 has methyl, C-6 has hydroxy. Alphabetical: Hydroxy (h) before Methyl (m) before Oxo (o) ⟹ 6-Hydroxy-5-methyl-3-oxohexanoic acid.",
  },
  {
    id: 6,
    part: "A",
    question: "What purification technique is used industrially to purify Glycerol (boiling point 290°C) from spent lye in soap manufacturing, given that glycerol decomposes thermally near its normal boiling point?",
    options: [
      { key: "A", text: "Steam Distillation" },
      { key: "B", text: "Fractional Distillation at atmospheric pressure" },
      { key: "C", text: "Distillation under Reduced Pressure (Vacuum Distillation)" },
      { key: "D", text: "Sublimation" },
    ],
    correctKeys: ["C"],
    type: "single",
    explanation: "Vacuum distillation reduces external pressure to 12 mmHg, lowering glycerol's boiling point safely to 180°C without thermal decomposition.",
  },
  {
    id: 7,
    part: "A",
    question: "When Sodium Fusion Extract (SFE) containing BOTH Nitrogen and Sulfur is treated with FeCl₃ solution in acidic medium, a blood-red color appears. What chemical complex is responsible for this blood-red coloration?",
    options: [
      { key: "A", text: "Fe₄[Fe(CN)₆]₃ (Prussian Blue)" },
      { key: "B", text: "[Fe(SCN)]²⁺ (Iron(III) Thiocyanate)" },
      { key: "C", text: "Na₄[Fe(CN)₅NOS] (Sodium Nitroprusside complex)" },
      { key: "D", text: "FeS (Ferrous Sulfide)" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "When N and S are present together, SFE forms NaSCN. Reaction with Fe³⁺ produces the Blood-Red complex [Fe(SCN)]²⁺ (no Prussian blue formed).",
  },
  {
    id: 8,
    part: "A",
    question: "Which of the following alkenes releases the LEAST amount of heat per mole upon complete catalytic hydrogenation (Lowest Heat of Hydrogenation - HoH)?",
    options: [
      { key: "A", text: "Ethene (CH₂=CH₂)" },
      { key: "B", text: "Propene (CH₃CH=CH₂)" },
      { key: "C", text: "trans-2-Butene (CH₃CH=CHCH₃)" },
      { key: "D", text: "2,3-Dimethyl-2-butene ((CH₃)₂C=C(CH₃)₂)" },
    ],
    correctKeys: ["D"],
    type: "single",
    explanation: "Heat of Hydrogenation (HoH) is inversely proportional to alkene stability. 2,3-Dimethyl-2-butene has 12 α-H (most stable alkene by hyperconjugation ⟹ lowest HoH).",
  },
  {
    id: 9,
    part: "A",
    question: "During Carius quantitative estimation of Sulfur, 0.32 g of an organic compound yields 0.466 g of Barium Sulfate (BaSO₄, M = 233.36 g/mol) precipitate. What is the percentage of Sulfur in the compound?",
    options: [
      { key: "A", text: "20.0%" },
      { key: "B", text: "10.0%" },
      { key: "C", text: "32.0%" },
      { key: "D", text: "15.0%" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "% S = (32 / 233.36) × (0.466 / 0.32) × 100 = 0.1371 × 1.45625 × 100 = 20.0%.",
  },
  {
    id: 10,
    part: "A",
    question: "What type of reactive intermediate is generated when Neopentyl chloride undergoes S_N1 solvolysis, and what structural rearrangement occurs immediately prior to nucleophilic attack?",
    options: [
      { key: "A", text: "1° Neopentyl Carbanion ──► No rearrangement" },
      { key: "B", text: "1° Neopentyl Carbocation ──► 1,2-Methyl Shift to form 3° 2-Methyl-2-butyl Carbocation" },
      { key: "C", text: "1° Free Radical ──► 1,2-Hydride Shift" },
      { key: "D", text: "2° Carbocation ──► Ring Expansion" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Ionization forms the unstable 1° neopentyl carbocation (CH₃)₃C-CH₂⁺, which undergoes an immediate 1,2-Methyl Shift to form the stable 3° cation (CH₃)₂C⁺-CH₂CH₃.",
  },
  {
    id: 11,
    part: "B",
    question: "Which of the following electronic displacement effects are PERMANENT effects operating in ground-state organic molecules in the absence of attacking reagents? (Select all that apply)",
    options: [
      { key: "A", text: "Inductive Effect (I)" },
      { key: "B", text: "Resonance / Mesomeric Effect (M / R)" },
      { key: "C", text: "Hyperconjugation (H)" },
      { key: "D", text: "Electromeric Effect (E)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are permanent electronic effects. • D (Electromeric effect) is a TEMPORARY effect operating strictly during reagent attack.",
  },
  {
    id: 12,
    part: "B",
    question: "Select the valid statements regarding Carbocation reactive intermediates: (Select all that apply)",
    options: [
      { key: "A", text: "They possess a positively charged carbon with 6 valence electrons and sp² planar geometry" },
      { key: "B", text: "Their stability order is: Tropylium > Ph₃C⁺ > 3° > 2° > 1° > CH₃⁺" },
      { key: "C", text: "Electron-donating groups (+I, +M, Hyperconjugation) stabilize carbocations" },
      { key: "D", text: "1° and 2° carbocations can undergo 1,2-hydride or 1,2-methyl shifts to yield more stable 3° carbocations" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four statements represent accurate structural, stability, and rearrangement properties of carbocations.",
  },
  {
    id: 13,
    part: "B",
    question: "Which of the following structural groups exhibit an Electron-Withdrawing Inductive Effect (-I Effect)? (Select all that apply)",
    options: [
      { key: "A", text: "-NO₂" },
      { key: "B", text: "-NF₃⁺" },
      { key: "C", text: "-COOH" },
      { key: "D", text: "-C(CH₃)₃" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are electronegative/cationic groups displaying strong -I effects. • D (-C(CH₃)₃) is an electron-donating alkyl group displaying a +I effect.",
  },
  {
    id: 14,
    part: "B",
    question: "Select the correct options regarding Carius quantitative elemental estimation: (Select all that apply)",
    options: [
      { key: "A", text: "Digestion with fuming HNO₃ and AgNO₃ estimates Halogens as AgX precipitates" },
      { key: "B", text: "Digestion with fuming HNO₃ and BaCl₂ estimates Sulfur as BaSO₄ precipitate" },
      { key: "C", text: "Phosphorous is estimated by precipitating as Magnesium Ammonium Phosphate (MgNH₄PO₄) followed by ignition to Mg₂P₂O₇" },
      { key: "D", text: "Carbon and Nitrogen are estimated simultaneously in Carius tubes as CN gas" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct protocols for Carius estimation. • D is incorrect: Carbon is estimated via Liebig combustion; Nitrogen via Dumas/Kjeldahl.",
  },
  {
    id: 15,
    part: "B",
    question: "Which of the following species are classified as ELECTROPHILES (Lewis Acids / Electron-Pair Acceptors)? (Select all that apply)",
    options: [
      { key: "A", text: "Nitronium Ion (NO₂⁺)" },
      { key: "B", text: "Boron Trifluoride (BF₃)" },
      { key: "C", text: "Dichlorocarbene (:CCl₂)" },
      { key: "D", text: "Hydroxide Anion (OH⁻)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A (cation), B (incomplete octet), and C (carbene) are electrophiles (Lewis acids). • D (OH⁻) is an electron-rich Lewis base (Nucleophile).",
  },
  {
    id: 16,
    part: "B",
    question: "Select the valid statements regarding Hyperconjugation (No-Bond Resonance): (Select all that apply)",
    options: [
      { key: "A", text: "It involves delocalization of σ_C-H electrons into adjacent vacant p or π* orbitals" },
      { key: "B", text: "The number of hyperconjugative canonical structures equals the number of α-hydrogens attached to sp² carbon" },
      { key: "C", text: "Hyperconjugation stabilizes carbocations, carbon free radicals, and alkenes" },
      { key: "D", text: "Hyperconjugation operates through a 30 nm solenoid fiber matrix" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct statements regarding hyperconjugation. • D is incorrect: solenoid fibers refer to chromatin packaging in biology.",
  },
  {
    id: 17,
    part: "B",
    question: "Which of the following techniques are based on STEAM DISTILLATION (P_total = P°_water + P°_organic = 1 atm)? (Select all that apply)",
    options: [
      { key: "A", text: "Purification of Aniline from reaction mixtures" },
      { key: "B", text: "Isolation of Nitrobenzene" },
      { key: "C", text: "Extraction of essential oils (Eucalyptus / Rose oil)" },
      { key: "D", text: "Separation of Crude Petroleum fractions" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are steam-volatile and water-immiscible, purified by steam distillation below 100°C. • D is separated by Fractional Distillation.",
  },
  {
    id: 18,
    part: "B",
    question: "Select the correct options regarding IUPAC priority rules for poly-functional compounds: (Select all that apply)",
    options: [
      { key: "A", text: "-COOH has higher priority than -CHO and -OH" },
      { key: "B", text: "-CN (Nitrile) has higher priority than -C=O (Ketone)" },
      { key: "C", text: "Double bonds (-C=C-) have higher priority than triple bonds (-C≡C-) when choosing numbering direction in case of a tie" },
      { key: "D", text: "-OH (Alcohol) has higher priority than -COOH" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct. Priority: -COOH > -CN > -CHO > -CO- > -OH > ene > yne. • D is incorrect: -COOH has the highest priority.",
  },
  {
    id: 19,
    part: "B",
    question: "Which of the following qualitative test observations correctly match their respective elements in Lassaigne’s Sodium Fusion Extract? (Select all that apply)",
    options: [
      { key: "A", text: "Nitrogen → Prussian Blue precipitate (Fe₄[Fe(CN)₆]₃) with FeSO₄ / FeCl₃" },
      { key: "B", text: "Sulfur → Violet/Purple color with Sodium Nitroprusside (Na₄[Fe(CN)₅NOS])" },
      { key: "C", text: "Chlorine → White precipitate (AgCl) soluble in ammonium hydroxide" },
      { key: "D", text: "Iodine → Yellow precipitate (AgI) completely insoluble in ammonium hydroxide" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four options represent accurate qualitative Lassaigne's test reactions for N, S, Cl, and I.",
  },
  {
    id: 20,
    part: "B",
    question: "Select the correct statements regarding Carbanion intermediates (R⁻): (Select all that apply)",
    options: [
      { key: "A", text: "The central carbon is sp³-hybridized with pyramidal geometry carrying a lone pair (unless conjugated)" },
      { key: "B", text: "Carbanion stability order is: Allyl ≈ Benzyl > CH₃⁻ > 1° > 2° > 3°" },
      { key: "C", text: "Electron-withdrawing groups (-I, -M) stabilize carbanions by dispersing negative charge" },
      { key: "D", text: "Carbanions readily undergo 1,2-methyl shifts to form 3° carbanions" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct. • D is incorrect: Carbanions do NOT undergo 1,2-rearrangements (rearrangements are characteristic of carbocations).",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
type Tab = "iupac" | "purification" | "qualitative" | "quantitative" | "electronic" | "alkene-hoh" | "intermediates" | "reagents" | "traps" | "glossary" | "selftest";

export const OrganicChemistryPrinciplesDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("iupac");
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
    { id: "iupac", label: "IUPAC & Priority", icon: <Binary className="w-3.5 h-3.5 shrink-0" /> },
    { id: "purification", label: "Purification & Distillation", icon: <FlaskConical className="w-3.5 h-3.5 shrink-0" /> },
    { id: "qualitative", label: "Lassaigne Tests", icon: <Pipette className="w-3.5 h-3.5 shrink-0" /> },
    { id: "quantitative", label: "Dumas & Kjeldahl", icon: <Scale className="w-3.5 h-3.5 shrink-0" /> },
    { id: "electronic", label: "Inductive & Resonance", icon: <Zap className="w-3.5 h-3.5 shrink-0" /> },
    { id: "alkene-hoh", label: "Hyperconjugation & HoH", icon: <Activity className="w-3.5 h-3.5 shrink-0" /> },
    { id: "intermediates", label: "Intermediates & Shifts", icon: <Boxes className="w-3.5 h-3.5 shrink-0" /> },
    { id: "reagents", label: "Reagents & Mechanisms", icon: <Split className="w-3.5 h-3.5 shrink-0" /> },
    { id: "traps", label: "10 NEST Traps", icon: <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> },
    { id: "glossary", label: "Master Glossary", icon: <BookOpen className="w-3.5 h-3.5 shrink-0" /> },
    { id: "selftest", label: "NEST 20-Q Test", icon: <Award className="w-3.5 h-3.5 shrink-0" /> },
  ];

  return (
    <div className="my-4 sm:my-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-slate-50 to-teal-50/20 border border-slate-200/90 p-2.5 sm:p-7 shadow-xs space-y-4 sm:space-y-6 select-none w-full">

      {/* HEADER */}
      <div className="flex flex-col items-center text-center space-y-2.5 max-w-2xl mx-auto w-full">
        <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-100 text-teal-900 border border-teal-200 shadow-2xs flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-teal-600" />
          CHEMISTRY INTERACTIVE MODULE — CHAPTER 8
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600 shrink-0" />
            ORGANIC CHEMISTRY: BASIC PRINCIPLES &amp; TECHNIQUES
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            IUPAC Priority Hierarchy · Distillation Variants · Lassaigne Fusion Schemes · Dumas &amp; Kjeldahl Nitrogen · Electronic Displacements · Reactive Intermediates · NEST 20-Q Module
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

      {/* TAB 1: IUPAC & PRIORITY */}
      {activeTab === "iupac" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Binary className="w-4 h-4 text-teal-600 shrink-0" />
              IUPAC Name Architecture &amp; Principal Functional Group Priority
            </h4>
            <div className="p-3 rounded-xl bg-teal-50 border border-teal-200">
              <code className="text-xs sm:text-sm font-mono font-black text-teal-950 block">
                [Secondary Prefix] ──► [Primary Prefix] ──► [Root Word] ──► [Primary Suffix] ──► [Secondary Suffix]
              </code>
              <p className="text-[10px] text-teal-800 font-semibold mt-1">
                Substituents (Alphabetical) + Cyclo/Bicyclo + Carbon Chain + -ane/ene/yne + Principal Functional Group
              </p>
            </div>
            <div className="space-y-1.5">
              {priorityHierarchyMatrix.map((row, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 gap-1 text-[10px]">
                  <span className="font-black text-slate-900 sm:w-1/4">{i + 1}. {row.group} ({row.formula})</span>
                  <span className="font-semibold text-purple-700 sm:w-1/4">Prefix: {row.prefix}</span>
                  <span className="font-mono font-bold text-teal-800 sm:w-2/4 sm:text-right">Suffix: {row.suffix}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PURIFICATION & DISTILLATION */}
      {activeTab === "purification" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-indigo-600 shrink-0" />
              Purification Techniques: Distillation Variants &amp; Chromatography
            </h4>
            <div className="space-y-2">
              {distillationMatrix.map((row, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900">{row.technique}</span>
                    <span className="font-bold text-indigo-700">{row.criteria}</span>
                  </div>
                  <p className="text-slate-600 font-semibold">{row.principle}</p>
                  <p className="text-emerald-800 font-bold">Examples: {row.examples}</p>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 space-y-1">
              <span className="text-xs font-black text-indigo-950 block">Retardation Factor (R_f) in Chromatography</span>
              <code className="text-xs font-mono font-black text-indigo-900 block">
                R_f = (Distance travelled by substance from baseline) / (Distance travelled by solvent front)
              </code>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LASSAIGNE TESTS */}
      {activeTab === "qualitative" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Pipette className="w-4 h-4 text-rose-600 shrink-0" />
              Lassaigne’s Sodium Fusion Extract (SFE) Qualitative Tests
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1 text-[10px]">
                <span className="font-black text-blue-950 block">1. Nitrogen Test (Prussian Blue)</span>
                <code className="font-mono text-blue-900 block">6 NaCN + FeSO₄ → Na₄[Fe(CN)₆]</code>
                <code className="font-mono text-blue-900 block">Na₄[Fe(CN)₆] + 4 Fe³⁺ → Fe₄[Fe(CN)₆]₃ ↓ (Prussian Blue)</code>
              </div>
              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1 text-[10px]">
                <span className="font-black text-purple-950 block">2. Sulfur Test (Purple Nitroprusside)</span>
                <code className="font-mono text-purple-900 block">Na₂S + Na₂[Fe(CN)₅NO] → Na₄[Fe(CN)₅NOS] (Purple/Violet)</code>
              </div>
              <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1 text-[10px]">
                <span className="font-black text-rose-950 block">3. Both N &amp; S Present (Blood-Red Complex)</span>
                <code className="font-mono text-rose-900 block">Na + C + N + S → NaSCN</code>
                <code className="font-mono text-rose-900 block">Fe³⁺ + SCN⁻ → [Fe(SCN)]²⁺ (Blood-Red, NO Prussian Blue!)</code>
              </div>
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1 text-[10px]">
                <span className="font-black text-amber-950 block">4. Halogens &amp; Phosphorus</span>
                <p className="text-amber-900 font-semibold">• AgCl (White, soluble in NH₄OH) | AgBr (Pale yellow) | AgI (Yellow, insoluble)</p>
                <p className="text-amber-900 font-semibold">• Phosphorus: Canary Yellow (NH₄)₃PO₄ · 12 MoO₃</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DUMAS & KJELDAHL */}
      {activeTab === "quantitative" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-600 shrink-0" />
              Quantitative Elemental Estimation (Dumas, Kjeldahl, Carius, Liebig)
            </h4>
            <div className="space-y-1.5">
              {quantitativeMatrix.map((row, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900">{row.element} — <span className="text-emerald-700">{row.method}</span></span>
                    <span className="font-mono font-black text-emerald-800">{row.formula}</span>
                  </div>
                  <p className="text-slate-600 font-semibold">{row.reaction}</p>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
              <span className="text-xs font-black text-rose-950 block">⚠️ CRITICAL NEST TRAP: Kjeldahl Method Failure</span>
              <p className="text-[10px] text-rose-900 font-semibold">
                The Kjeldahl method FAILS for Nitro (-NO₂), Azo (-N=N-), and stable heterocyclic ring nitrogen (Pyridine, Quinoline, Pyrrole) because nitrogen is not quantitatively converted to (NH₄)₂SO₄. Use the Dumas method!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: INDUCTIVE & RESONANCE */}
      {activeTab === "electronic" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600 shrink-0" />
              Electronic Displacements: Inductive vs Resonance Effects
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[10px]">
                <span className="font-black text-slate-900 uppercase block">Inductive Effect (I) — σ Framework</span>
                <p className="text-slate-700"><strong>+I Donating:</strong> -O⁻ &gt; -COO⁻ &gt; -C(CH₃)₃ &gt; -CH(CH₃)₂ &gt; -CH₂CH₃ &gt; -CH₃ &gt; -D &gt; -H</p>
                <p className="text-slate-700"><strong>-I Withdrawing:</strong> -NF₃⁺ &gt; -NR₃⁺ &gt; -NH₃⁺ &gt; -NO₂ &gt; -SO₃H &gt; -CN &gt; -CHO &gt; -COOH &gt; -F &gt; -Cl &gt; -Br &gt; -I &gt; -OR &gt; -OH &gt; -Ph &gt; -H</p>
              </div>
              <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1.5 text-[10px]">
                <span className="font-black text-purple-950 uppercase block">Resonance / Mesomeric Effect (M / R)</span>
                <p className="text-purple-900"><strong>+M Donating (via lone pairs):</strong> -O⁻ &gt; -NH₂ &gt; -NHR &gt; -OH &gt; -OR &gt; -NHCOCH₃ &gt; -OCOR &gt; -Ph &gt; -Halogens</p>
                <p className="text-purple-900"><strong>-M Withdrawing (via conjugated π):</strong> -NO₂ &gt; -SO₃H &gt; -CN &gt; -CHO &gt; -COR &gt; -COOH &gt; -COOR</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: HYPERCONJUGATION & HOH */}
      {activeTab === "alkene-hoh" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-600 shrink-0" />
              Hyperconjugation (No-Bond Resonance) &amp; Heat of Hydrogenation (HoH)
            </h4>
            <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200 space-y-1">
              <code className="text-xs sm:text-sm font-mono font-black text-cyan-950 block">
                Canonical Structures = Number of α-Hydrogens (α-H)
              </code>
              <code className="text-xs font-mono font-bold text-cyan-800 block">
                Heat of Hydrogenation (HoH) ∝ 1 / Alkene Stability ∝ 1 / (Number of α-H)
              </code>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
              <span className="font-black text-slate-900 block">Alkene Stability Hierarchy (Decreasing HoH):</span>
              <p className="text-slate-700 font-mono">
                (CH₃)₂C=C(CH₃)₂ (12 α-H) &gt; CH₃CH=C(CH₃)₂ (9 α-H) &gt; (CH₃)₂C=CH₂ (6 α-H) &gt; CH₃CH=CH₂ (3 α-H) &gt; CH₂=CH₂ (0 α-H)
              </p>
              <p className="text-emerald-800 font-bold mt-1">
                2,3-Dimethyl-2-butene has 12 α-H ⟹ Maximum stability ⟹ Lowest Heat of Hydrogenation!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: INTERMEDIATES & SHIFTS */}
      {activeTab === "intermediates" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Boxes className="w-4 h-4 text-purple-600 shrink-0" />
              Reactive Intermediates: Carbocations, Carbanions, &amp; Free Radicals
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200 space-y-1 text-[10px]">
                <span className="font-black text-orange-950 block">Carbocations (R⁺)</span>
                <p className="text-orange-900">6 valence e⁻, sp² planar, Electrophile.</p>
                <code className="font-mono text-orange-950 block font-bold">Tropylium &gt; Ph₃C⁺ &gt; 3° &gt; 2° &gt; 1° &gt; CH₃⁺</code>
                <p className="text-rose-700 font-bold">Undergo 1,2-Hydride / Methyl shifts!</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1 text-[10px]">
                <span className="font-black text-blue-950 block">Carbanions (R⁻)</span>
                <p className="text-blue-900">8 valence e⁻, sp³ pyramidal, Nucleophile.</p>
                <code className="font-mono text-blue-950 block font-bold">CH₃⁻ &gt; 1° &gt; 2° &gt; 3° (Reversed!)</code>
                <p className="text-slate-600">Do NOT undergo 1,2-rearrangements.</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1 text-[10px]">
                <span className="font-black text-emerald-950 block">Free Radicals (R•)</span>
                <p className="text-emerald-900">7 valence e⁻, sp² planar, Paramagnetic.</p>
                <code className="font-mono text-emerald-950 block font-bold">Ph₃C• &gt; 3° &gt; 2° &gt; 1° &gt; CH₃•</code>
                <p className="text-slate-600">Do NOT undergo 1,2-rearrangements.</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[10px]">
              <span className="font-black text-slate-900 block">Neopentyl Carbocation Rearrangement Example:</span>
              <code className="font-mono text-indigo-900 block mt-0.5">
                (CH₃)₃C-CH₂⁺ (1°, Unstable) ──[1,2-CH₃ Shift]──► (CH₃)₂C⁺-CH₂CH₃ (3° 2-Methyl-2-butyl cation, Highly Stable)
              </code>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: REAGENTS & MECHANISMS */}
      {activeTab === "reagents" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Split className="w-4 h-4 text-teal-600 shrink-0" />
              Reagent Taxonomy &amp; 4 Fundamental Organic Reaction Mechanisms
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                <span className="font-black text-slate-900 block">Electrophiles vs Nucleophiles</span>
                <p className="text-slate-700"><strong>Electrophiles (E⁺):</strong> NO₂⁺, BF₃, AlCl₃, SO₃, :CH₂, :CCl₂ (Lewis acids).</p>
                <p className="text-slate-700"><strong>Nucleophiles (Nu⁻):</strong> OH⁻, CN⁻, H₂O, NH₃, R-MgX (Lewis bases).</p>
                <p className="text-teal-800 font-bold">Ambident: CN⁻ (attacks via C or N), NO₂⁻ (attacks via O or N).</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                <span className="font-black text-slate-900 block">4 Reaction Mechanisms</span>
                <p className="text-slate-700">1. <strong>Substitution (S):</strong> S_N1, S_N2, S_EAr.</p>
                <p className="text-slate-700">2. <strong>Addition (A):</strong> Electrophilic (A_E to alkenes), Nucleophilic (A_N to &gt;C=O).</p>
                <p className="text-slate-700">3. <strong>Elimination (E):</strong> E1, E2, E1cB (forms π-bonds).</p>
                <p className="text-slate-700">4. <strong>Rearrangement:</strong> Intramolecular shifts (carbocations).</p>
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
              All 10 High-Yield NEST Organic Chemistry Misconceptions &amp; Traps
            </h4>
            <div className="space-y-2">
              {organicTraps.map((trap) => {
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
                placeholder="Search organic principles glossary terms..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {["All", "Nomenclature & Purification", "Qualitative & Quantitative Analysis", "Electronic Effects", "Reactive Intermediates & Mechanisms"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGlossaryCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                    glossaryCategory === cat ? "bg-teal-600 text-white border-teal-600" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
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
                {score >= 17 ? "Outstanding! Mastery level for NEST & IChO Organic Chemistry Principles." : score >= 12 ? "Good performance — review incorrect explanations." : "Needs practice — revisit earlier tabs and retake."}
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
                        testPartFilter === part ? "bg-teal-600 text-white border-teal-600" : "bg-white text-slate-600 border-slate-200"
                      }`}
                    >
                      {part === "ALL" ? "All 20 Questions" : part === "A" ? "Part A (Single MCQ)" : "Part B (Multi MSQ)"}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="flex-1 sm:w-36 h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full rounded-full bg-teal-500 transition-all duration-500" style={{ width: `${((currentQ + 1) / mcqData.length) * 100}%` }} />
                  </div>
                  <span className="text-[10px] font-black text-slate-700">Q{currentQ + 1} of {mcqData.length}</span>
                </div>
              </div>

              <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    {currentMCQ.id}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-slate-100 text-slate-700">
                        Part {currentMCQ.part}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                        currentMCQ.type === "multi" ? "bg-purple-100 text-purple-800" : "bg-teal-100 text-teal-800"
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
                      bg = "bg-teal-50 border-teal-400";
                    }

                    return (
                      <button key={opt.key} onClick={() => toggleAnswer(currentQ, opt.key, currentMCQ.type)} className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl border-2 text-left transition-all ${bg}`}>
                        <span className={`w-5 h-5 rounded shrink-0 border-2 flex items-center justify-center text-[10px] font-black transition-all ${
                          isSubmitted && isCorrect ? "bg-emerald-600 border-emerald-600 text-white" : isSubmitted && isSelected && !isCorrect ? "bg-rose-600 border-rose-600 text-white" : isSelected ? "bg-teal-600 border-teal-600 text-white" : "border-slate-300 text-slate-500"
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
                      <BookOpen className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span className="text-[9px] font-black uppercase tracking-wider text-teal-700">Detailed Solution &amp; Math Explanation</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 leading-relaxed">{currentMCQ.explanation}</p>
                  </div>
                )}

                <div className="flex items-center gap-2 flex-wrap">
                  {!submitted[currentQ] ? (
                    <button onClick={() => submitAnswer(currentQ)} disabled={!(selectedAnswers[currentQ]?.length)} className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-black hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all">Submit Answer</button>
                  ) : null}
                  {currentQ < mcqData.length - 1 && (
                    <button onClick={() => setCurrentQ((q) => q + 1)} className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-black hover:bg-slate-700 transition-all flex items-center gap-1.5">
                      Next Question <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {currentQ === mcqData.length - 1 && submitted[currentQ] && (
                    <button onClick={computeScore} className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-black hover:bg-teal-700 transition-all flex items-center gap-1.5">
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
                      i === currentQ ? "bg-teal-600 text-white border-teal-600" : isDone ? isCorrect ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-rose-100 text-rose-800 border-rose-300" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
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

export default OrganicChemistryPrinciplesDiagram;
