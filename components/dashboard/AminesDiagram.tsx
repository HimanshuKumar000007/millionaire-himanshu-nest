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
  Shapes,
} from "lucide-react";

// ============================================================================
// 1. DATA: 10 NEST MISCONCEPTIONS & TRAPS
// ============================================================================
interface Misconception {
  id: string;
  trap: string;
  reality: string;
  tip: string;
}

const amineTraps: Misconception[] = [
  {
    id: "t1",
    trap: "Aniline is a stronger base than methylamine because of its aromatic ring.",
    reality: "Aniline (pKb = 9.38) is 10⁶x WEAKER than Methylamine (pKb = 3.38) because nitrogen lone pair delocalizes into the aromatic ring across 5 resonance structures.",
    tip: "Delocalization reduces lone pair availability for protonation.",
  },
  {
    id: "t2",
    trap: "In aqueous solution, basicity order for methyl-substituted amines is 3° > 2° > 1°.",
    reality: "Aqueous basicity order for methyl-substituted amines is 2° > 1° > 3° > NH₃ (Order: 213) due to hydration and steric hindrance.",
    tip: "Ethyl-substituted amine order is 2° > 3° > 1° > NH₃ (Order: 231).",
  },
  {
    id: "t3",
    trap: "Gabriel Phthalimide synthesis can be used to prepare Aniline.",
    reality: "Gabriel synthesis CANNOT prepare Aniline because aryl halides do not undergo S_N2 nucleophilic substitution with the phthalimide anion.",
    tip: "Gabriel synthesis is strictly limited to 1° aliphatic amines.",
  },
  {
    id: "t4",
    trap: "Hofmann Bromamide Degradation produces an amine with the same number of carbon atoms.",
    reality: "Hofmann degradation produces a 1° amine with ONE CARBON LESS than the starting primary amide (R-CONH₂ ──► R-NH₂ + CO₃²⁻).",
    tip: "Consumes exactly 4 moles of NaOH per mole of amide.",
  },
  {
    id: "t5",
    trap: "Direct nitration of aniline yields strictly ortho and para products.",
    reality: "Direct nitration yields 47% META product because strong acid protonates aniline to form the -I/-M Anilinium ion (Ph-NH₃⁺).",
    tip: "Protect -NH₂ by acetylation to Acetanilide (Ph-NHCOCH₃) to get pure p-nitroaniline.",
  },
  {
    id: "t6",
    trap: "Primary, secondary, and tertiary amines all form soluble products in Hinsberg test.",
    reality: "1° amine product is soluble in aqueous NaOH; 2° amine product is insoluble in NaOH; 3° amine does not react.",
    tip: "Used to separate and distinguish mixtures of 1°, 2°, and 3° amines.",
  },
  {
    id: "t7",
    trap: "Azo coupling of diazonium salt with phenol is carried out in strongly acidic medium.",
    reality: "Coupling with Phenol requires FAINTLY BASIC medium (pH 9–10) to form reactive phenoxide ion. Coupling with Aniline requires acidic medium (pH 4–5).",
    tip: "Phenol = pH 9–10 (Orange Dye); Aniline = pH 4–5 (Yellow Dye).",
  },
  {
    id: "t8",
    trap: "Aliphatic diazonium salts are stable at 0°C like arenediazonium salts.",
    reality: "Aliphatic diazonium salts are extremely unstable and break down spontaneously at 0°C to release N₂ gas and a mixture of alcohols/alkenes.",
    tip: "Resonance delocalization stabilizes arenediazonium salts at 0–5°C.",
  },
  {
    id: "t9",
    trap: "Aniline undergoes smooth Friedel-Crafts alkylation in the presence of AlCl₃.",
    reality: "Aniline FAILS Friedel-Crafts reactions because basic -NH₂ reacts with Lewis acid AlCl₃ to form a deactivating salt complex (Ph-NH₂⁺-AlCl₃⁻).",
    tip: "Lewis acid catalyst is deactivated by coordinate covalent binding with amino group.",
  },
  {
    id: "t10",
    trap: "Carbylamine test is positive for all primary, secondary, and tertiary amines.",
    reality: "Carbylamine test is positive ONLY for PRIMARY (1°) amines (both aliphatic and aromatic) forming foul-smelling isocyanides (R-NC).",
    tip: "Active electrophile in carbylamine test is Dichlorocarbene (:CCl₂).",
  },
];

// ============================================================================
// 2. DATA: MASTER GLOSSARY (43 DEFINITIONS)
// ============================================================================
interface GlossaryTerm {
  term: string;
  definition: string;
  category: "Structure & Basicity" | "Preparations & Reactions" | "Diazonium & Dyes" | "Diagnostic Tests & Bio";
}

const masterGlossary: GlossaryTerm[] = [
  { term: "Acrosin", definition: "A serine protease in the sperm acrosome that digests a path through the Zona Pellucida.", category: "Diagnostic Tests & Bio" },
  { term: "Adrenaline (Epinephrine)", definition: "A sympathomimetic catecholamine hormone derived from L-Tyrosine containing a secondary amine group.", category: "Diagnostic Tests & Bio" },
  { term: "Azo Dye", definition: "An intensely colored organic compound featuring an extended conjugated -N=N- linkage between two aromatic rings.", category: "Diazonium & Dyes" },
  { term: "Balz-Schiemann Reaction", definition: "Synthesis of aryl fluorides by thermal decomposition of arenediazonium fluoroborates (Ar-N₂⁺BF₄⁻ ──[Δ]──► Ar-F + N₂ + BF₃).", category: "Diazonium & Dyes" },
  { term: "Basicity Constant (K_b)", definition: "Equilibrium constant quantifying the base strength of an amine in water (pK_b = -log₁₀ K_b; smaller pK_b = stronger base).", category: "Structure & Basicity" },
  { term: "Blood-Testis Barrier (BTB)", definition: "Occluding tight junctions between Sertoli cells isolating haploid germ cells from immunity.", category: "Diagnostic Tests & Bio" },
  { term: "Carbylamine Test", definition: "Diagnostic test for 1° amines using CHCl₃ + KOH (Δ) to form foul-smelling isocyanides (R-NC); active electrophile is :CCl₂.", category: "Diagnostic Tests & Bio" },
  { term: "Chondrocyte", definition: "A mature cartilage cell embedded within a lacuna of chondroitin sulfate matrix.", category: "Diagnostic Tests & Bio" },
  { term: "Clathrin", definition: "A triskelion protein coat driving coated vesicle endocytosis.", category: "Diagnostic Tests & Bio" },
  { term: "Conjugate Base", definition: "The species remaining after an acid donates a proton (Acid ──► CB + H⁺).", category: "Structure & Basicity" },
  { term: "Cumene", definition: "Isopropylbenzene, the primary feedstock for industrial phenol and acetone production.", category: "Preparations & Reactions" },
  { term: "Diazotization", definition: "Formation of arenediazonium salts by reacting 1° aromatic amines with HNO₂ (NaNO₂ + HCl) at 0–5°C (273–278 K).", category: "Diazonium & Dyes" },
  { term: "Dichlorocarbene (:CCl₂)", definition: "Neutral 6-electron reactive intermediate serving as electrophile in Carbylamine and Reimer-Tiemann reactions.", category: "Preparations & Reactions" },
  { term: "G-Protein", definition: "A membrane-bound GTP-binding regulatory protein coupling receptors to second messengers.", category: "Diagnostic Tests & Bio" },
  { term: "Gabriel Phthalimide Synthesis", definition: "Synthetic route producing pure 1° aliphatic amines from potassium phthalimide and alkyl halides via S_N2 displacement.", category: "Preparations & Reactions" },
  { term: "Gattermann Reaction", definition: "Synthesis of aryl halides by reacting arenediazonium salts with fine Copper powder and HX (Cu / HCl or Cu / HBr).", category: "Diazonium & Dyes" },
  { term: "Gilman Reagent", definition: "Lithium dialkylcuprate (R₂CuLi) used in Corey-House alkane coupling.", category: "Preparations & Reactions" },
  { term: "Hinsberg Reagent", definition: "Benzenesulfonyl chloride (Ph-SO₂Cl) used to differentiate and separate 1°, 2°, and 3° amines.", category: "Diagnostic Tests & Bio" },
  { term: "Hofmann Bromamide Degradation", definition: "Conversion of primary amides (R-CONH₂) to 1° amines (R-NH₂) with one carbon less using Br₂ + 4 NaOH via isocyanate intermediate.", category: "Preparations & Reactions" },
  { term: "Homolytic Fission", definition: "Symmetrical bond cleavage where each fragment retains one bonding electron, forming free radicals.", category: "Preparations & Reactions" },
  { term: "Isocyanate (R-N=C=O)", definition: "Reactive intermediate in the Hofmann bromamide degradation pathway formed via 1,2-alkyl shift to electron-deficient nitrogen.", category: "Preparations & Reactions" },
  { term: "Kharasch Effect", definition: "Free-radical anti-Markovnikov addition of HBr across alkenes in the presence of organic peroxides.", category: "Preparations & Reactions" },
  { term: "Liebermann Nitroso Test", definition: "Diagnostic test for 2° amines forming yellow oily insoluble N-nitrosamines upon reaction with HNO₂.", category: "Diagnostic Tests & Bio" },
  { term: "Mendius Reduction", definition: "Reduction of nitriles (R-CN) to primary amines (R-CH₂NH₂) using Sodium and Ethanol (Na / EtOH).", category: "Preparations & Reactions" },
  { term: "Meso Compound", definition: "An optically inactive molecule containing chiral centers that possesses an internal plane of symmetry.", category: "Structure & Basicity" },
  { term: "Nissl's Granules", definition: "RER and free ribosome aggregates in neuron cytons that synthesize proteins.", category: "Diagnostic Tests & Bio" },
  { term: "Nitrenes", definition: "Neutral 6-electron reactive monovalent nitrogen intermediates (R-N̈:).", category: "Preparations & Reactions" },
  { term: "Nitriles", definition: "Organic compounds containing a -C≡N functional group.", category: "Preparations & Reactions" },
  { term: "Nitrolic Acid", definition: "Soluble red complex formed when 1° nitroalkanes react with HNO₂ in the Victor Meyer test.", category: "Diagnostic Tests & Bio" },
  { term: "Ortho-Effect (Anilines)", definition: "Steric and electronic phenomenon making almost all o-substituted anilines weaker bases than aniline.", category: "Structure & Basicity" },
  { term: "Pyramidal Inversion", definition: "Rapid umbrella-like inversion of nitrogen lone pairs in 3° amines (Ea ≈ 25 kJ/mol, 10¹¹ s⁻¹) preventing optical resolution.", category: "Structure & Basicity" },
  { term: "Quaternary Ammonium Salt", definition: "Nitrogen compound bearing four alkyl groups (N⁺R₄ X⁻) that lacks a lone pair and preserves chirality.", category: "Structure & Basicity" },
  { term: "Richmond-Lang Effect", definition: "Delay of leaf senescence induced by cytokinin application.", category: "Diagnostic Tests & Bio" },
  { term: "Sandmeyer Reaction", definition: "Synthesis of aryl halides or nitriles using arenediazonium salts and cuprous salts (Cu₂X₂ / HX).", category: "Diazonium & Dyes" },
  { term: "Schiff Base", definition: "An imine (>C=N-R) formed by nucleophilic condensation of an aldehyde or ketone with a primary amine.", category: "Preparations & Reactions" },
  { term: "Secondary Amine", definition: "An amine wherein nitrogen is bound to two alkyl or aryl groups (R₂NH).", category: "Structure & Basicity" },
  { term: "Sulfanilic Acid", definition: "4-Aminobenzenesulfonic acid, existing as an internal dipolar Zwitterion (⁺H₃N-C₆H₄-SO₃⁻).", category: "Preparations & Reactions" },
  { term: "Sustentacular Cells (Sertoli)", definition: "Pyramidal nurse cells in seminiferous tubules supporting spermatogenesis.", category: "Diagnostic Tests & Bio" },
  { term: "Tollens' Reagent", definition: "Ammoniacal silver nitrate solution ([Ag(NH₃)₂]⁺) reduced to a silver mirror by aldehydes.", category: "Diagnostic Tests & Bio" },
  { term: "Tröger's Base", definition: "A rigid chiral bridged amine that cannot undergo pyramidal inversion due to ring strain, resolvable into enantiomers.", category: "Structure & Basicity" },
  { term: "Victor Meyer Test", definition: "Colorimetric test distinguishing 1° (Red), 2° (Blue), and 3° (Colorless) nitroalkanes/alcohols.", category: "Diagnostic Tests & Bio" },
  { term: "Wheland Intermediate", definition: "Resonance-stabilized non-aromatic cyclohexadienyl cation intermediate formed in S_EAr reactions.", category: "Preparations & Reactions" },
  { term: "Zwitterion", definition: "A dipolar internal molecule carrying equal positive and negative formal charges with net zero charge.", category: "Structure & Basicity" },
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
    question: "An unknown primary amide X (C₅H₉NO) is subjected to the Hofmann Bromamide Degradation reaction using Br₂ and aqueous KOH. The resulting primary amine Y is isolated and subjected to the Hinsberg test, forming a sulfonamide derivative that is completely SOLUBLE in aqueous NaOH. When amine Y is treated with HNO₂ at 0–5°C, it liberates N₂ gas ↑ and yields an optically active 2° alcohol Z. What is the structural formula of original amide X?",
    options: [
      { key: "A", text: "Pentanamide (CH₃CH₂CH₂CH₂CONH₂)" },
      { key: "B", text: "2-Methylbutanamide (CH₃CH₂CH(CH₃)CONH₂)" },
      { key: "C", text: "2,2-Dimethylpropanamide ((CH₃)₃C-CONH₂)" },
      { key: "D", text: "Benzamide (C₆H₅CONH₂)" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "1. Amide X (C₅H₉NO) undergoes Hofmann degradation to yield 1° amine Y with one carbon less (C₄H₁₁N). 2. 1° amine Y with HNO₂ yields an optically active 2° alcohol Z (C₄H₁₀O). 3. The only optically active 2° four-carbon alcohol is Butan-2-ol (CH₃-C*H(OH)-CH₂CH₃). 4. Amine Y yielding Butan-2-ol must be sec-butylamine (CH₃CH₂CH(CH₃)NH₂). 5. The parent amide X containing 1 extra carbon is 2-Methylbutanamide (CH₃CH₂CH(CH₃)CONH₂).",
  },
  {
    id: 2,
    part: "A",
    question: "Arrange the following methyl-substituted amine species in order of INCREASING basic strength (pK_b sequence) in AQUEOUS solution: 1: NH₃ (Ammonia), 2: CH₃NH₂ (Methylamine), 3: (CH₃)₂NH (Dimethylamine), 4: (CH₃)₃N (Trimethylamine)",
    options: [
      { key: "A", text: "1 < 4 < 2 < 3" },
      { key: "B", text: "3 < 2 < 4 < 1" },
      { key: "C", text: "1 < 2 < 3 < 4" },
      { key: "D", text: "4 < 3 < 2 < 1" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "In aqueous solution, basicity of methyl-substituted amines follows the 213 Order: (CH₃)₂NH (2°) > CH₃NH₂ (1°) > (CH₃)₃N (3°) > NH₃. Therefore, in order of INCREASING basic strength (weakest to strongest): NH₃ (1) < (CH₃)₃N (4) < CH₃NH₂ (2) < (CH₃)₂NH (3), which corresponds to 1 < 4 < 2 < 3.",
  },
  {
    id: 3,
    part: "A",
    question: "Why does direct nitration of Aniline with concentrated HNO₃ / H₂SO₄ mixture at 288 K yield an unusually high proportion (47% yield) of m-nitroaniline, alongside p-nitroaniline (51%) and o-nitroaniline (2%)?",
    options: [
      { key: "A", text: "Nitric acid acts as a strong reducing agent that cleaves the benzene ring." },
      { key: "B", text: "In strongly acidic medium, basic aniline is protonated to form the Anilinium ion (Ph-NH₃⁺), which is a powerful -I / -M meta-director." },
      { key: "C", text: "The -NH₂ group undergoes 1,2-methyl shift during nitration." },
      { key: "D", text: "m-nitroaniline is formed by a free radical pathway." },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "In the strongly acidic nitrating mixture (H₂SO₄), the basic amino group of aniline accepts a proton to form the Anilinium Ion (Ph-NH₃⁺). The positive charge on nitrogen makes the anilinium ion a powerful -I / -M Meta-Director, directing incoming nitronium ions (NO₂⁺) to the meta position (47%).",
  },
  {
    id: 4,
    part: "A",
    question: "What is the active electrophilic species involved in the Carbylamine Test when a primary amine (1°) is heated with Chloroform (CHCl₃) and alcoholic KOH?",
    options: [
      { key: "A", text: "Nitronium Ion (NO₂⁺)" },
      { key: "B", text: "Dichlorocarbene (:CCl₂)" },
      { key: "C", text: "Trichloromethyl carbanion (:CCl₃⁻)" },
      { key: "D", text: "Carbonium ion (CH₃⁺)" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Base (OH⁻) abstracts an acidic proton from CHCl₃ to yield the trichloromethyl anion (:CCl₃⁻), which undergoes α-elimination of Cl⁻ to generate the neutral 6-electron electrophile Dichlorocarbene (:CCl₂). The 1° amine lone pair attacks :CCl₂, eventually yielding the foul-smelling Isocyanide (R-NC).",
  },
  {
    id: 5,
    part: "A",
    question: "Benzenediazonium chloride (Ph-N₂⁺Cl⁻) is coupled with Phenol (Ph-OH) in aqueous medium at pH 9–10. What is the chemical structure, color, and name of the resulting azo dye product?",
    options: [
      { key: "A", text: "p-Aminoazobenzene; Yellow dye" },
      { key: "B", text: "p-Hydroxyazobenzene; Orange dye" },
      { key: "C", text: "o-Nitroazobenzene; Red dye" },
      { key: "D", text: "Aniline black; Dark brown precipitate" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Coupling of benzenediazonium cation with Phenol in faintly basic medium (pH 9–10, which converts phenol to the reactive phenoxide ion) occurs at the para-position to yield p-Hydroxyazobenzene, which is an Orange Azo Dye.",
  },
  {
    id: 6,
    part: "A",
    question: "What reagent is used in the Balz-Schiemann reaction to convert Benzenediazonium chloride into Fluorobenzene (Ph-F)?",
    options: [
      { key: "A", text: "Cu₂F₂ / HF" },
      { key: "B", text: "Fluoroboric Acid (HBF₄) followed by thermal decomposition (Δ)" },
      { key: "C", text: "NaF / DMSO" },
      { key: "D", text: "AgF in ethanol" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "In the Balz-Schiemann Reaction, benzenediazonium chloride is reacted with Fluoroboric Acid (HBF₄) to precipitate benzenediazonium fluoroborate (Ph-N₂⁺BF₄⁻), which is isolated, dried, and heated gently (Δ) to undergo nitrogen loss yielding Fluorobenzene (Ph-F) + N₂ ↑ + BF₃.",
  },
  {
    id: 7,
    part: "A",
    question: "An unknown amine Z (C₃H₉N) reacts with Benzenesulfonyl chloride (Hinsberg Reagent) to form a solid derivative that is completely INSOLUBLE in aqueous NaOH solution. What is the structural formula of amine Z?",
    options: [
      { key: "A", text: "Propan-1-amine (CH₃CH₂CH₂NH₂)" },
      { key: "B", text: "N-Methylethanamine (CH₃NH-CH₂CH₃)" },
      { key: "C", text: "N,N-Dimethylmethanamine ((CH₃)₃N)" },
      { key: "D", text: "Propan-2-amine" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "1° amines react with Hinsberg reagent to form N-alkylbenzenesulfonamides containing acidic N-H, making them soluble in NaOH. 2° amines react to form N,N-dialkylbenzenesulfonamides lacking N-H, making them INSOLUBLE in NaOH. 3° amines do not react. Among C₃H₉N isomers, N-Methylethanamine (CH₃NH-CH₂CH₃) is a Secondary (2°) amine, so its Hinsberg derivative is insoluble in NaOH.",
  },
  {
    id: 8,
    part: "A",
    question: "What organic product is formed when Benzenediazonium chloride (Ph-N₂⁺Cl⁻) is treated with Hypophosphorous Acid (H₃PO₂) in the presence of Cuprous ions?",
    options: [
      { key: "A", text: "Phenol (Ph-OH)" },
      { key: "B", text: "Benzene (C₆H₆)" },
      { key: "C", text: "Phenylhydrazine (Ph-NH-NH₂)" },
      { key: "D", text: "Chlorobenzene (Ph-Cl)" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Hypophosphorous acid (H₃PO₂) (or ethanol) acts as a mild reducing agent that replaces the diazonium group (-N₂⁺Cl⁻) with hydrogen, converting benzenediazonium chloride into Benzene (C₆H₆): Ph-N₂⁺Cl⁻ + H₃PO₂ + H₂O ──► C₆H₆ + N₂ ↑ + H₃PO₃ + HCl.",
  },
  {
    id: 9,
    part: "A",
    question: "Why can unsymmetrically substituted tertiary amines (N R₁ R₂ R₃) NOT be resolved into optically active enantiomers at room temperature, despite possessing a chiral sp³-hybridized nitrogen atom?",
    options: [
      { key: "A", text: "They undergo rapid S_N2 inversion with atmospheric oxygen." },
      { key: "B", text: "They undergo rapid Pyramidal Inversion (Umbrella Inversion) at room temperature via a planar sp² transition state (E_a ≈ 25 kJ/mol), causing complete racemization." },
      { key: "C", text: "Tertiary amines are planar molecules with a 120° bond angle." },
      { key: "D", text: "Nitrogen atoms undergo radioactive decay." },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "The nitrogen lone pair in tertiary amines undergoes rapid Pyramidal (Umbrella) Inversion at room temperature (10¹¹ times/sec) through a low-energy planar sp² transition state (E_a ≈ 25 kJ/mol). This rapid oscillation continuously interconverts the two enantiomeric pyramid forms, causing spontaneous complete racemization.",
  },
  {
    id: 10,
    part: "A",
    question: "How many total moles of NaOH are consumed per mole of primary amide during the Hofmann Bromamide Degradation reaction?",
    options: [
      { key: "A", text: "1 mole" },
      { key: "B", text: "2 moles" },
      { key: "C", text: "4 moles" },
      { key: "D", text: "6 moles" },
    ],
    correctKeys: ["C"],
    type: "single",
    explanation: "The balanced equation for Hofmann Bromamide degradation is: R-CONH₂ + Br₂ + 4 NaOH ──► R-NH₂ + Na₂CO₃ + 2 NaBr + 2 H₂O. Exactly 4 moles of NaOH are consumed per mole of amide.",
  },
  {
    id: 11,
    part: "B",
    question: "Which of the following primary amines CANNOT be synthesized using the Gabriel Phthalimide Synthesis? (Select all that apply)",
    options: [
      { key: "A", text: "Aniline (C₆H₅NH₂)" },
      { key: "B", text: "p-Toluidine (CH₃-C₆H₄-NH₂)" },
      { key: "C", text: "Ethylamine (C₂H₅NH₂)" },
      { key: "D", text: "Methylamine (CH₃NH₂)" },
    ],
    correctKeys: ["A", "B"],
    type: "multi",
    explanation: "• A and B are correct: Aromatic 1° amines (Aniline, p-toluidine) CANNOT be prepared by Gabriel synthesis because aryl halides (Ar-X) do not undergo S_N2 nucleophilic substitution with the potassium phthalimide anion. • C and D are incorrect: Ethylamine and Methylamine are aliphatic 1° amines and are prepared in high purity by Gabriel synthesis.",
  },
  {
    id: 12,
    part: "B",
    question: "Select the valid statements regarding the basicity of Anilines and substituted Anilines: (Select all that apply)",
    options: [
      { key: "A", text: "Aniline (pK_b = 9.38) is a much weaker base than Ammonia (pK_b = 4.75) due to +M resonance delocalization of the nitrogen lone pair into the aromatic ring." },
      { key: "B", text: "Electron-donating groups (+M / +I: -OCH₃, -CH₃) at the para-position INCREASE the basic strength of aniline." },
      { key: "C", text: "Almost all ortho-substituted anilines are WEAKER bases than Aniline due to the Ortho-Effect." },
      { key: "D", text: "Anilinium ion (Ph-NH₃⁺) is more resonance-stabilized than neutral Aniline." },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: Lone pair delocalization weakens aniline basicity; +M/+I groups increase basicity; o-substituted anilines show the Ortho-Effect (weaker base). • D is incorrect: Neutral Aniline is stabilized by 5 canonical structures, whereas the Anilinium ion is stabilized by only 2 canonical structures (delocalization is blocked because nitrogen has no free lone pair).",
  },
  {
    id: 13,
    part: "B",
    question: "Which of the following chemical reactions convert a primary Amide (R-CONH₂) or Nitrile (R-CN) into a Primary Amine (1°) WITHOUT changing the total number of carbon atoms? (Select all that apply)",
    options: [
      { key: "A", text: "Reduction of R-CONH₂ using LiAlH₄ in dry ether" },
      { key: "B", text: "Reduction of R-CN using LiAlH₄ or Na / EtOH (Mendius Reduction)" },
      { key: "C", text: "Hofmann Bromamide Degradation of R-CONH₂ using Br₂ / NaOH" },
      { key: "D", text: "Hydrolysis of R-CN with dilute HCl" },
    ],
    correctKeys: ["A", "B"],
    type: "multi",
    explanation: "• A and B are correct: Reduction of amides (RCONH₂ ──► RCH₂NH₂) and nitriles (RCN ──► RCH₂NH₂) retains the exact original carbon count. • C is incorrect: Hofmann bromamide degradation LOSES 1 carbon atom (RCONH₂ ──► RNH₂). • D is incorrect: Hydrolysis of nitriles yields a Carboxylic Acid (RCOOH), NOT an amine.",
  },
  {
    id: 14,
    part: "B",
    question: "Select the correct statements regarding the Sandmeyer and Gattermann reactions of Arenediazonium Salts: (Select all that apply)",
    options: [
      { key: "A", text: "Sandmeyer reaction utilizes Cuprous salts (Cu₂Cl₂ / HCl or Cu₂Br₂ / HBr) to replace -N₂⁺ with halogens." },
      { key: "B", text: "Gattermann reaction utilizes fine Copper powder in the presence of HX (Cu / HCl or Cu / HBr)." },
      { key: "C", text: "Sandmeyer reactions generally yield higher percentage product recoveries than Gattermann reactions." },
      { key: "D", text: "Both reactions proceed via an S_N2 backside inversion mechanism on the benzene ring." },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: Sandmeyer uses Cu₂X₂ (higher yield); Gattermann uses Cu powder/HX. • D is incorrect: Both reactions proceed via Aryl Free Radical intermediates (Ar•), NOT S_N2 backside inversion.",
  },
  {
    id: 15,
    part: "B",
    question: "Which of the following tests can be used to distinguish Primary (1°) Aliphatic Amines from Secondary (2°) Aliphatic Amines? (Select all that apply)",
    options: [
      { key: "A", text: "Carbylamine Test (CHCl₃ + alc. KOH, Δ)" },
      { key: "B", text: "Reaction with Nitrous Acid (HNO₂ at 0–5°C) releasing N₂ gas" },
      { key: "C", text: "Solubility of Benzenesulfonamide derivative in aqueous NaOH (Hinsberg Test)" },
      { key: "D", text: "Biuret Test" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: 1° amines give foul-smelling isocyanides in carbylamine test, release N₂ gas with HNO₂, and form NaOH-soluble Hinsberg derivatives. 2° amines fail carbylamine, form yellow nitrosamines with HNO₂, and form NaOH-insoluble Hinsberg derivatives. • D is incorrect: Biuret test is used to detect peptide bonds in proteins, NOT simple amines.",
  },
  {
    id: 16,
    part: "B",
    question: "Select the correct options regarding the Azo Coupling reactions of Benzenediazonium Chloride (Ph-N₂⁺Cl⁻): (Select all that apply)",
    options: [
      { key: "A", text: "Coupling with Phenol is performed in weakly basic medium (pH 9–10) to form p-Hydroxyazobenzene (Orange Dye)." },
      { key: "B", text: "Coupling with Aniline is performed in weakly acidic medium (pH 4–5) to form p-Aminoazobenzene (Yellow Dye)." },
      { key: "C", text: "The diazonium cation (Ph-N₂⁺) acts as a weak electrophile attacking the para-position of activated aromatic rings." },
      { key: "D", text: "Azo coupling destroys the aromaticity of both benzene rings permanently." },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: Phenol couples at pH 9–10 (orange dye); Aniline couples at pH 4–5 (yellow dye); Ph-N₂⁺ acts as an electrophile in S_EAr. • D is incorrect: Azo coupling PRESERVES the aromaticity of both benzene rings, generating extended conjugated π-systems that absorb visible light.",
  },
  {
    id: 17,
    part: "B",
    question: "Which of the following reagents can reduce Nitrobenzene (C₆H₅NO₂) into Aniline (C₆H₅NH₂)? (Select all that apply)",
    options: [
      { key: "A", text: "Fe + Concentrated HCl" },
      { key: "B", text: "Sn + Concentrated HCl" },
      { key: "C", text: "H₂ gas in the presence of Raney Nickel or Palladium catalyst" },
      { key: "D", text: "NaOH + Glucose" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: Fe/HCl, Sn/HCl, and catalytic hydrogenation (H₂/Ni or Pd) efficiently reduce nitro groups to primary aromatic amines. (Fe/HCl is preferred industrially because FeCl₂ formed hydrolyzes to release HCl, minimizing required acid).",
  },
  {
    id: 18,
    part: "B",
    question: "Select the correct options regarding Quaternary Ammonium Salts (N⁺ R₁ R₂ R₃ R₄ X⁻): (Select all that apply)",
    options: [
      { key: "A", text: "The central nitrogen atom is sp³-hybridized and lacks a non-bonding lone pair." },
      { key: "B", text: "Unsymmetrically substituted quaternary ammonium cations (N⁺ R₁ R₂ R₃ R₄) are CHIRAL and can be resolved into optically active enantiomers." },
      { key: "C", text: "They do not undergo pyramidal inversion at room temperature." },
      { key: "D", text: "They react rapidly with Hinsberg reagent to form soluble nitrosamines." },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: 4° ammonium salts have no lone pair, cannot undergo pyramidal inversion, and are chiral when 4 different R-groups are attached. • D is incorrect: Quaternary ammonium salts do NOT react with Hinsberg reagent (Ph-SO₂Cl).",
  },
  {
    id: 19,
    part: "B",
    question: "Which of the following functional groups exert a META-DIRECTING DEACTIVATING influence during electrophilic aromatic substitution of anilines or substituted benzenes? (Select all that apply)",
    options: [
      { key: "A", text: "Anilinium ion (-NH₃⁺)" },
      { key: "B", text: "Nitro group (-NO₂)" },
      { key: "C", text: "Cyano group (-CN)" },
      { key: "D", text: "Phenolic Hydroxyl group (-OH)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: -NH₃⁺, -NO₂, and -CN are powerful -I/-M groups that deactivate the ring and direct electrophiles to the meta position. • D is incorrect: -OH is a powerful +M Ortho/Para-directing Activator.",
  },
  {
    id: 20,
    part: "B",
    question: "Select the correct statements regarding the physical and chemical properties of Sulfanilic Acid: (Select all that apply)",
    options: [
      { key: "A", text: "It is prepared by heating Aniline with concentrated H₂SO₄ at 453–473 K." },
      { key: "B", text: "It exists as a dipolar internal Zwitterion (⁺H₃N-C₆H₄-SO₃⁻)." },
      { key: "C", text: "The Zwitterionic form contains an acidic -SO₃⁻ group and a basic -NH₃⁺ group." },
      { key: "D", text: "It is insoluble in organic solvents but soluble in aqueous strong bases (NaOH)." },
    ],
    correctKeys: ["A", "B", "D"],
    type: "multi",
    explanation: "• A, B, D are correct: Sulfanilic acid is prepared at 453–473 K, forms a Zwitterion, is insoluble in organic solvents, and dissolves in NaOH (forming sodium sulfanilate salt). • C is incorrect: In the Zwitterion ⁺H₃N-C₆H₄-SO₃⁻, the -NH₃⁺ group is ACIDIC (proton donor) and the -SO₃⁻ group is BASIC (proton acceptor).",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
type Tab = "geometry-inversion" | "basicity-trends" | "aniline-ortho-effect" | "synthesis-routes" | "diagnostic-tests" | "aniline-reactions" | "diazonium-transformations" | "azo-coupling" | "traps" | "glossary" | "selftest";

export const AminesDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("geometry-inversion");
  const [activeTrapId, setActiveTrapId] = useState<string | null>(null);

  // Basicity Simulator State
  const [alkylType, setAlkylType] = useState<"methyl" | "ethyl">("methyl");

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
    { id: "geometry-inversion", label: "Geometry & Inversion", icon: <Atom className="w-3.5 h-3.5 shrink-0" /> },
    { id: "basicity-trends", label: "Basicity Trends", icon: <Scale className="w-3.5 h-3.5 shrink-0" /> },
    { id: "aniline-ortho-effect", label: "Aniline & Ortho-Effect", icon: <Layers className="w-3.5 h-3.5 shrink-0" /> },
    { id: "synthesis-routes", label: "Gabriel & Hofmann", icon: <Split className="w-3.5 h-3.5 shrink-0" /> },
    { id: "diagnostic-tests", label: "Hinsberg & Carbylamine", icon: <Pipette className="w-3.5 h-3.5 shrink-0" /> },
    { id: "aniline-reactions", label: "Nitration & Zwitterion", icon: <Flame className="w-3.5 h-3.5 shrink-0" /> },
    { id: "diazonium-transformations", label: "Diazonium Matrix", icon: <FlaskConical className="w-3.5 h-3.5 shrink-0" /> },
    { id: "azo-coupling", label: "Azo Dyes Coupling", icon: <Palette className="w-3.5 h-3.5 shrink-0" /> },
    { id: "traps", label: "10 NEST Traps", icon: <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> },
    { id: "glossary", label: "Master Glossary", icon: <BookOpen className="w-3.5 h-3.5 shrink-0" /> },
    { id: "selftest", label: "NEST 20-Q Test", icon: <Award className="w-3.5 h-3.5 shrink-0" /> },
  ];

  return (
    <div className="my-4 sm:my-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-slate-50 to-indigo-50/20 border border-slate-200/90 p-2.5 sm:p-7 shadow-xs space-y-4 sm:space-y-6 select-none w-full">

      {/* HEADER */}
      <div className="flex flex-col items-center text-center space-y-2.5 max-w-2xl mx-auto w-full">
        <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-900 border border-indigo-200 shadow-2xs flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-indigo-600" />
          CHEMISTRY INTERACTIVE MODULE — AMINES &amp; DIAZONIUM SALTS (CLASS XII / UNIT XVIII)
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <Atom className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 shrink-0" />
            AMINES &amp; DIAZONIUM SALTS: UMBRELLA INVERSION, BASICITY 213/231, HOFMANN, HINSBERG &amp; AZO DYES
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            Pyramidal Inversion (10¹¹ s⁻¹) · Gabriel &amp; Hofmann Bromamide · Hinsberg Test · Aniline 47% Meta-Nitration · Balz-Schiemann &amp; Azo Coupling
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

      {/* TAB 1: GEOMETRY & UMBRELLA INVERSION */}
      {activeTab === "geometry-inversion" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Atom className="w-4 h-4 text-indigo-600 shrink-0" />
              Nitrogen Pyramidal Geometry, Umbrella Inversion Dynamics, &amp; Chirality
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-black text-slate-900 uppercase">Pyramidal Inversion Dynamics</span>
                <p className="text-slate-800 font-semibold">• <strong>Geometry:</strong> sp³ distorted pyramidal with lone pair (108° bond angle in Me₃N).</p>
                <p className="text-slate-800 font-semibold">• <strong>Umbrella Oscillation:</strong> Interconverts pyramid configurations via a planar sp² transition state.</p>
                <p className="text-slate-800 font-semibold">• <strong>Barrier &amp; Frequency:</strong> ΔE° ≈ 25 kJ/mol (6 kcal/mol); occurs 10¹¹ times/second at 298 K.</p>
                <p className="text-rose-900 font-bold">• <strong>Outcome:</strong> Unsymmetrical 3° amines (NR₁R₂R₃) undergo complete spontaneous racemization (CANNOT be resolved!).</p>
              </div>
              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1.5">
                <span className="font-black text-indigo-950 uppercase">Chiral Exceptions (Resolvable)</span>
                <p className="text-indigo-900 font-semibold">• <strong>1. Quaternary Ammonium Salts (N⁺R₁R₂R₃R₄ X⁻):</strong> Lack a non-bonding lone pair; rigid sp³ tetrahedral geometry preserves optical activity!</p>
                <p className="text-indigo-900 font-semibold">• <strong>2. Rigid / Bridged Amines (Tröger's Base):</strong> Bridgehead ring strain prevents planar sp² transition state; resolvable into stable d- and l-enantiomers.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BASICITY TRENDS */}
      {activeTab === "basicity-trends" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-600 shrink-0" />
              Gas Phase vs Aqueous Phase Basicity Trends &amp; Simulator
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 uppercase block">Gas Phase Basicity (Pure +I Effect)</span>
                <p className="text-emerald-800 font-bold font-mono text-xs">3° Amine (R₃N) &gt; 2° Amine (R₂NH) &gt; 1° Amine (RNH₂) &gt; NH₃</p>
                <p className="text-slate-700 font-semibold">In gas phase, cation stability is dictated solely by inductive (+I) charge dispersal by alkyl groups.</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="font-black text-emerald-950 uppercase block">Aqueous Phase Basicity (Interplay of 3 Factors)</span>
                <p className="text-emerald-900 font-semibold">• <strong>+I Effect:</strong> 3° &gt; 2° &gt; 1° &gt; NH₃</p>
                <p className="text-emerald-900 font-semibold">• <strong>Hydration Energy (H-Bonding):</strong> RNH₃⁺ &gt; R₂NH₂⁺ &gt; R₃NH⁺</p>
                <p className="text-emerald-900 font-semibold">• <strong>Steric Hindrance:</strong> Bulky alkyls hinder proton approach.</p>
              </div>
            </div>

            {/* Interactive Simulator */}
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 space-y-2 text-[10px]">
              <div className="flex items-center justify-between">
                <span className="font-black text-indigo-950 uppercase tracking-wide">Interactive Aqueous Basicity Simulator</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setAlkylType("methyl")}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all ${
                      alkylType === "methyl" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-700 border-slate-200"
                    }`}
                  >
                    Methyl Substitution (213)
                  </button>
                  <button
                    onClick={() => setAlkylType("ethyl")}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all ${
                      alkylType === "ethyl" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-700 border-slate-200"
                    }`}
                  >
                    Ethyl Substitution (231)
                  </button>
                </div>
              </div>

              {alkylType === "methyl" ? (
                <div className="p-3 rounded-lg bg-white border border-indigo-200 space-y-1">
                  <span className="font-bold text-indigo-900 block text-xs">Methyl Group Sequence (Order: 213):</span>
                  <p className="text-indigo-950 font-black font-mono text-xs">(CH₃)₂NH (2°) &gt; CH₃NH₂ (1°) &gt; (CH₃)₃N (3°) &gt; NH₃</p>
                  <p className="text-slate-700 font-semibold text-xs leading-relaxed">
                    Hydration effect dominates over inductive effect for trimethylamine because 3 methyl groups cause steric crowding and leave only 1 H-bonding site on (CH₃)₃NH⁺.
                  </p>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-white border border-indigo-200 space-y-1">
                  <span className="font-bold text-indigo-900 block text-xs">Ethyl Group Sequence (Order: 231):</span>
                  <p className="text-indigo-950 font-black font-mono text-xs">(C₂H₅)₂NH (2°) &gt; (C₂H₅)₃N (3°) &gt; C₂H₅NH₂ (1°) &gt; NH₃</p>
                  <p className="text-slate-700 font-semibold text-xs leading-relaxed">
                    Stronger +I inductive effect of ethyl groups outweighs hydration loss in triethylamine relative to ethylamine.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ANILINE RESONANCE & ORTHO-EFFECT */}
      {activeTab === "aniline-ortho-effect" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600 shrink-0" />
              Aniline Resonance Delocalization (pK_b = 9.38) &amp; The Ortho-Effect
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1">
                <span className="font-black text-purple-950 block uppercase">Aniline Resonance Weakening</span>
                <p className="text-purple-900 font-semibold">• <strong>Basicity:</strong> Aniline (pKb = 9.38) is 10⁶x WEAKER than NH₃ (pKb = 4.75) and aliphatic amines (pKa ≈ 3–4).</p>
                <p className="text-purple-900 font-semibold">• <strong>Cause:</strong> Lone pair delocalizes into aromatic π-system across 5 canonical structures.</p>
                <p className="text-purple-900 font-semibold">• Protonated anilinium ion (Ph-NH₃⁺) has only 2 canonical structures, making protonation unfavorable.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                <span className="font-black text-amber-950 block uppercase">The Aniline Ortho-Effect</span>
                <p className="text-amber-900 font-bold font-mono">p-Toluidine &gt; m-Toluidine &gt; Aniline &gt; o-Toluidine</p>
                <p className="text-amber-900 font-bold font-mono">p-Nitroaniline &gt; m-Nitroaniline &gt; Aniline &gt; o-Nitroaniline</p>
                <p className="text-amber-900 font-semibold">• Almost ALL o-substituted anilines are <strong>WEAKER BASES than Aniline</strong> regardless of electronic nature (+I, -I, +M, -M) due to steric hindrance to protonation.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GABRIEL PHTHALIMIDE & HOFMANN BROMAMIDE */}
      {activeTab === "synthesis-routes" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Split className="w-4 h-4 text-blue-600 shrink-0" />
              Gabriel Phthalimide &amp; Hofmann Bromamide Degradation Reactions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
                <span className="font-black text-blue-950 block uppercase">Gabriel Phthalimide Synthesis</span>
                <p className="text-blue-900 font-semibold">• Phthalimide + KOH ──► Potassium Phthalimide ──[R-X (S_N2)]──► N-Alkylphthalimide ──[NaOH]──► Pure 1° Aliphatic Amine.</p>
                <p className="text-rose-900 font-bold">• <strong>CRITICAL LIMITATION:</strong> Aniline CANNOT be synthesized because aryl halides (Ar-X) fail S_N2 substitution with phthalimide anion!</p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="font-black text-emerald-950 block uppercase">Hofmann Bromamide Degradation</span>
                <p className="text-emerald-950 font-bold font-mono">R-CONH₂ + Br₂ + 4NaOH ──► R-NH₂ + Na₂CO₃ + 2NaBr + 2H₂O</p>
                <p className="text-emerald-900 font-semibold">• Produces a 1° amine with <strong>ONE LESS CARBON</strong>.</p>
                <p className="text-emerald-900 font-semibold">• Proceeds via N-bromoamide ──► Acyl Nitrene ──► 1,2-Alkyl Shift to Isocyanate (R-N=C=O) ──► Hydrolysis.</p>
                <p className="text-emerald-900 font-semibold">• Retention of configuration at migrating chiral center.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: DIAGNOSTIC TESTS */}
      {activeTab === "diagnostic-tests" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Pipette className="w-4 h-4 text-purple-600 shrink-0" />
              Diagnostic Identification Tests (1°, 2°, 3° Discrimination Matrix)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[10px]">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 block uppercase">1. Hinsberg Test (Ph-SO₂Cl)</span>
                <p className="text-slate-800 font-semibold">• <strong>1° Amine:</strong> Soluble in NaOH (contains acidic N-H).</p>
                <p className="text-slate-800 font-semibold">• <strong>2° Amine:</strong> Insoluble in NaOH (lacks acidic N-H).</p>
                <p className="text-slate-800 font-semibold">• <strong>3° Amine:</strong> Does not react.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1">
                <span className="font-black text-rose-950 block uppercase">2. Carbylamine Test (CHCl₃ + KOH)</span>
                <p className="text-rose-900 font-semibold">• <strong>1° Amines Only:</strong> Foul-smelling Isocyanides (R-NC).</p>
                <p className="text-rose-900 font-semibold">• <strong>Active Electrophile:</strong> Dichlorocarbene (:CCl₂).</p>
                <p className="text-rose-900 font-semibold">• 2° &amp; 3° Amines: Negative (No reaction).</p>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1">
                <span className="font-black text-indigo-950 block uppercase">3. Nitrous Acid Test (0–5°C)</span>
                <p className="text-indigo-900 font-semibold">• <strong>1° Aliphatic:</strong> N₂ gas ↑ + Alcohols.</p>
                <p className="text-indigo-900 font-semibold">• <strong>1° Aromatic:</strong> Stable arenediazonium salt (Ar-N₂⁺Cl⁻).</p>
                <p className="text-indigo-900 font-semibold">• <strong>2° Amine:</strong> Yellow oily N-nitrosamine (R₂N-N=O).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: ANILINE REACTIONS & SULFANILIC ACID */}
      {activeTab === "aniline-reactions" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-600 shrink-0" />
              Direct Bromination, Acetanilide Protection, Meta-Nitration, &amp; Sulfanilic Zwitterion
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 block uppercase">Protection &amp; Nitration Anomaly</span>
                <p className="text-slate-800 font-semibold">• <strong>Direct Bromination:</strong> Ph-NH₂ + Br₂/H₂O ──► <strong>2,4,6-Tribromoaniline ↓ (White Ppt)</strong>.</p>
                <p className="text-slate-800 font-semibold">• <strong>Acetylation:</strong> Protects as Acetanilide (Ph-NHCOCH₃) to yield 4-bromoaniline after bromination &amp; hydrolysis.</p>
                <p className="text-rose-950 font-bold">• <strong>Direct Nitration (288 K):</strong> 51% p-Nitro + <strong>47% m-Nitro</strong> + 2% o-Nitro due to protonation to the -I/-M Anilinium Ion (Ph-NH₃⁺)!</p>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1">
                <span className="font-black text-purple-950 block uppercase">Sulfanilic Acid &amp; Friedel-Crafts Failure</span>
                <p className="text-purple-900 font-semibold">• <strong>Sulfanilic Acid:</strong> Ph-NH₂ + H₂SO₄ (453–473 K) ──► <strong>⁺H₃N-C₆H₄-SO₃⁻ (Dipolar Zwitterion)</strong>.</p>
                <p className="text-purple-900 font-semibold">• Insoluble in organic solvents; soluble in aqueous NaOH.</p>
                <p className="text-purple-950 font-bold">• <strong>Friedel-Crafts Failure:</strong> Aniline FAILS alkylation/acylation because -NH₂ binds Lewis acid AlCl₃ forming a deactivating complex.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: DIAZONIUM MATRIX */}
      {activeTab === "diazonium-transformations" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-emerald-600 shrink-0" />
              Arenediazonium Salts: Diazotization, Sandmeyer vs Gattermann, &amp; Displacement Matrix
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 block uppercase">Diazotization &amp; Sandmeyer</span>
                <p className="text-slate-800 font-semibold">• <strong>Diazotization:</strong> Ar-NH₂ + NaNO₂ + 2HCl (0–5°C) ──► Ar-N₂⁺Cl⁻ + NaCl + 2H₂O.</p>
                <p className="text-slate-800 font-semibold">• <strong>Sandmeyer:</strong> Cu₂X₂/HX for Cl, Br, CN (Superior yields!).</p>
                <p className="text-slate-800 font-semibold">• <strong>Gattermann:</strong> Fine Cu powder / HX.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="font-black text-emerald-950 block uppercase">Displacement Reactions</span>
                <p className="text-emerald-900 font-semibold">• <strong>Iodine (KI, Warm):</strong> Ar-N₂⁺Cl⁻ + KI ──► <strong>Ar-I</strong> + N₂ ↑.</p>
                <p className="text-emerald-900 font-semibold">• <strong>Balz-Schiemann (HBF₄, Δ):</strong> Ar-N₂⁺BF₄⁻ ──[Δ]──► <strong>Ar-F</strong> + N₂ ↑ + BF₃.</p>
                <p className="text-emerald-900 font-semibold">• <strong>Reduction to Benzene:</strong> H₃PO₂ or Ethanol ──► <strong>Ar-H (Benzene)</strong> + N₂ ↑.</p>
                <p className="text-emerald-900 font-semibold">• <strong>Hydrolysis to Phenol:</strong> Warm H₂O (283 K) ──► <strong>Ar-OH</strong> + N₂ ↑ + HCl.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: AZO DYES COUPLING */}
      {activeTab === "azo-coupling" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Palette className="w-4 h-4 text-indigo-600 shrink-0" />
              Azo Dye Coupling Reactions (pH Optimization &amp; Color Matrix)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-300 space-y-1.5">
                <span className="font-black text-amber-950 block uppercase text-xs">Coupling with Phenol (Orange Dye)</span>
                <p className="text-amber-900 font-bold font-mono">Ph-N₂⁺Cl⁻ + Ph-OH ──[pH 9–10]──► p-Hydroxyazobenzene (Orange Dye)</p>
                <p className="text-amber-800 font-semibold">• Medium: Weakly basic (pH 9–10) to generate reactive phenoxide anion (Ph-O⁻).</p>
                <p className="text-amber-800 font-semibold">• Preserves aromaticity of both benzene rings; extended conjugated π-system absorbs visible light.</p>
              </div>
              <div className="p-3 rounded-xl bg-yellow-50/70 border border-yellow-300 space-y-1.5">
                <span className="font-black text-yellow-950 block uppercase text-xs">Coupling with Aniline (Yellow Dye)</span>
                <p className="text-yellow-900 font-bold font-mono">Ph-N₂⁺Cl⁻ + Ph-NH₂ ──[pH 4–5]──► p-Aminoazobenzene (Yellow Dye)</p>
                <p className="text-yellow-800 font-semibold">• Medium: Weakly acidic (pH 4–5) to prevent diazonium decomposition while maintaining unprotonated aniline nucleophile.</p>
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
              All 10 High-Yield NEST Amines &amp; Diazonium Misconceptions &amp; Traps
            </h4>
            <div className="space-y-2">
              {amineTraps.map((trap) => {
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
                placeholder="Search amine & diazonium terms..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {["All", "Structure & Basicity", "Preparations & Reactions", "Diazonium & Dyes", "Diagnostic Tests & Bio"].map((cat) => (
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

      {/* TAB 11: NEST 20-Q SELF-TEST */}
      {activeTab === "selftest" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          {score !== null ? (
            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center space-y-3">
              <Award className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-indigo-500" />
              <h4 className="text-xl sm:text-2xl font-black text-slate-900">Your Score: {score} / {mcqData.length}</h4>
              <p className="text-sm font-semibold text-slate-600">
                {score >= 17 ? "Outstanding! Mastery level for NEST & IChO Amines and Diazonium Salts Module." : score >= 12 ? "Good performance — review incorrect explanations." : "Needs practice — revisit earlier tabs and retake."}
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
                      <span className="text-[9px] font-black uppercase tracking-wider text-indigo-700">Detailed Solution &amp; Mechanistic Explanation</span>
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
                    <button onClick={computeScore} className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-black hover:bg-indigo-700 transition-all flex items-center gap-1.5">
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

export default AminesDiagram;
