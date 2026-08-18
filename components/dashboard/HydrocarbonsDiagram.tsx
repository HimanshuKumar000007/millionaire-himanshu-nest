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
// 1. DATA: ALKANE SYNTHETIC ROUTES
// ============================================================================
interface SyntheticRoute {
  name: string;
  reaction: string;
  mechanism: string;
  scope: string;
}

const alkaneSynthesisMatrix: SyntheticRoute[] = [
  { name: "Wurtz Reaction", reaction: "2 RX + 2 Na ──[dry ether]──► R-R + 2 NaX", mechanism: "Free radical (R•) or organosodium (RNa) intermediate", scope: "Symmetrical alkanes with even carbon count; cross-Wurtz gives messy mixture; Methane CANNOT be prepared" },
  { name: "Kolbe's Electrolysis", reaction: "2 RCOOK(aq) + 2 H₂O ──[Electrolysis]──► R-R + 2 CO₂ + H₂ + 2 KOH", mechanism: "Anodic free radical decarboxylation: RCOO⁻ → R• + CO₂ → R-R", scope: "Anode: R-R + CO₂; Cathode: H₂ gas (pH rises around cathode); Methane cannot be prepared" },
  { name: "Corey-House Synthesis", reaction: "R₂CuLi + R'X ──► R-R' + RCu + LiX", mechanism: "Nucleophilic coupling via Lithium Dialkylcuprate (Gilman Reagent)", scope: "Excellent for unsymmetrical alkanes; R'X must be 1° or methyl halide" },
  { name: "Decarboxylation", reaction: "RCOONa + NaOH ──[CaO, Δ]──► R-H + Na₂CO₃", mechanism: "Carbanion intermediate via soda-lime (NaOH : CaO = 3:1)", scope: "Yields alkane with ONE carbon less than parent carboxylic acid" },
];

// ============================================================================
// 2. DATA: ALKENE HYDRATION MATRIX
// ============================================================================
interface HydrationRoute {
  method: string;
  reagents: string;
  regiochemistry: string;
  stereochemistry: string;
  rearrangement: string;
}

const hydrationMatrix: HydrationRoute[] = [
  { method: "Acid-Catalyzed Hydration", reagents: "dil. H₂SO₄ / H₂O (H⁺ / H₂O)", regiochemistry: "Markovnikov addition", stereochemistry: "Non-stereospecific (planar carbocation)", rearrangement: "Prone to 1,2-hydride / methyl carbocation shifts" },
  { method: "Oxymercuration-Demercuration (OMDM)", reagents: "1. Hg(OAc)₂, H₂O; 2. NaBH₄", regiochemistry: "Markovnikov addition", stereochemistry: "Anti-addition (via cyclic mercurinium ion)", rearrangement: "NO rearrangements (clean Markovnikov alcohol)" },
  { method: "Hydroboration-Oxidation (HBO)", reagents: "1. BH₃·THF; 2. H₂O₂, OH⁻", regiochemistry: "Anti-Markovnikov addition", stereochemistry: "Syn-addition of H and OH to same face", rearrangement: "NO rearrangements (clean Anti-Markovnikov alcohol)" },
];

// ============================================================================
// 3. DATA: S_EAr REACTION PROFILES
// ============================================================================
interface SEArProfile {
  reaction: string;
  reagents: string;
  electrophile: string;
  product: string;
}

const searMatrix: SEArProfile[] = [
  { reaction: "Nitration", reagents: "Conc. HNO₃ + Conc. H₂SO₄ (1:2 ratio)", electrophile: "Nitronium Ion (NO₂⁺)", product: "Nitrobenzene (C₆H₅NO₂)" },
  { reaction: "Halogenation", reagents: "X₂ + Anhydrous FeX₃ / AlX₃ (X = Cl, Br)", electrophile: "Halonium Ion (Cl⁺ / Br⁺)", product: "Halobenzene (C₆H₅X)" },
  { reaction: "Sulfonation", reagents: "Fuming H₂SO₄ (Oleum = H₂SO₄ + SO₃)", electrophile: "Neutral Sulfur Trioxide (SO₃)", product: "Benzenesulfonic Acid (C₆H₅SO₃H)" },
  { reaction: "Friedel-Crafts Alkylation", reagents: "RX + Anhydrous AlCl₃", electrophile: "Carbocation (R⁺, prone to 1,2-shifts!)", product: "Alkylbenzene (e.g., 1-chloropropane yields Cumene)" },
  { reaction: "Friedel-Crafts Acylation", reagents: "RCOCl + Anhydrous AlCl₃", electrophile: "Acylium Ion (R-C⁺=O, NO shifts!)", product: "Acylbenzene / Aromatic Ketone (C₆H₅COR)" },
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

const hydrocarbonTraps: Misconception[] = [
  { id: "t1", trap: "The Kharasch peroxide effect applies to HCl, HBr, and HI additions.", reality: "The Peroxide Effect applies STRICTLY to HBr. HCl (H-Cl bond too strong, 431 kJ/mol) and HI (I• forms I₂ instead) fail.", tip: "HCl + peroxide still gives Markovnikov addition!" },
  { id: "t2", trap: "Halogens (Cl, Br) on benzene are meta-directing because they are deactivating.", reality: "Halogens are DEACTIVATING (due to strong -I effect) BUT ORTHO/PARA-DIRECTING (due to +M resonance stabilization of o,p-arenium ions).", tip: "The Halogen Anomaly is a favorite NEST exception." },
  { id: "t3", trap: "Friedel-Crafts alkylation of benzene with 1-chloropropane yields 1-phenylpropane as the major product.", reality: "1-chloropropane generates a 1° carbocation that undergoes a 1,2-hydride shift to form a 2° carbocation, yielding Isopropylbenzene (Cumene).", tip: "Always check for carbocation rearrangements in FC alkylation." },
  { id: "t4", trap: "Cyclooctatetraene (COT, 8π e⁻) is an anti-aromatic planar molecule.", reality: "COT assumes a non-planar TUB CONFORMATION, rendering it NON-AROMATIC rather than anti-aromatic.", tip: "Non-planarity allows COT to avoid anti-aromatic instability." },
  { id: "t5", trap: "Ethyne reacts with Tollens' reagent, but 2-butyne also forms a white precipitate.", reality: "ONLY TERMINAL ALKYNES (R-C≡C-H) react with Tollens' / Fehling's reagents. 2-butyne is an internal alkyne and gives NO reaction.", tip: "Use Tollens' test to distinguish terminal from internal alkynes." },
  { id: "t6", trap: "Staggered conformation of ethane is less stable than the eclipsed conformation due to steric strain.", reality: "Staggered conformation is 12.5 kJ/mol (3.0 kcal/mol) MORE STABLE than eclipsed due to minimal torsional strain.", tip: "Dihedral angle θ = 60° for staggered; θ = 0° for eclipsed." },
  { id: "t7", trap: "Ozonolysis of an alkene followed by Zn/H₂O yields carboxylic acids.", reality: "Zn/H₂O is REDUCTIVE ozonolysis yielding ALDEHYDES and KETONES. Oxidative ozonolysis (H₂O₂) yields carboxylic acids.", tip: "Zinc destroys H₂O₂ to prevent over-oxidation of aldehydes." },
  { id: "t8", trap: "In hydroboration-oxidation (HBO), H₂O adds via Markovnikov orientation.", reality: "HBO produces ANTI-MARKOVNIKOV, SYN-ADDITION of water across the double bond.", tip: "OMDM gives Markovnikov addition without rearrangement." },
  { id: "t9", trap: "Benzene undergoes electrophilic addition reactions like alkenes.", reality: "Benzene undergoes ELECTROPHILIC AROMATIC SUBSTITUTION (S_EAr) to preserve its 150.6 kJ/mol resonance stabilization.", tip: "Addition destroys aromaticity and requires extreme conditions." },
  { id: "t10", trap: "Bromination of 2-methylpropane (3°-H) and chlorination yield identical product ratios.", reality: "Bromine is HIGHLY SELECTIVE (3° : 1° = 1600 : 1), giving >99% 3°-bromo product. Chlorine is unselective (3° : 1° = 5 : 1).", tip: "Bromination strictly obeys radical stability (Hammond postulate)." },
];

// ============================================================================
// 5. DATA: MASTER GLOSSARY (43 DEFINITIONS)
// ============================================================================
interface GlossaryTerm {
  term: string;
  definition: string;
  category: "Alkanes & Conformations" | "Alkenes & Additions" | "Alkynes & Acidity" | "Aromaticity & S_EAr";
}

const masterGlossary: GlossaryTerm[] = [
  { term: "Anti-Aromaticity", definition: "Cyclic, planar, fully conjugated systems possessing 4n π-electrons that are extraordinarily unstable.", category: "Aromaticity & S_EAr" },
  { term: "Arenium Ion (Wheland Intermediate)", definition: "The non-aromatic, resonance-stabilized carbocation (σ-complex) formed during S_EAr reactions.", category: "Aromaticity & S_EAr" },
  { term: "Aromaticity", definition: "Property of cyclic, planar, conjugated systems with (4n+2) π-electrons exhibiting high resonance energy (150.6 kJ/mol in benzene).", category: "Aromaticity & S_EAr" },
  { term: "Baeyer’s Reagent", definition: "Cold, dilute 1% alkaline KMnO₄ solution used to test for unsaturation by forming cis-1,2-diols (purple disappears, brown MnO₂ forms).", category: "Alkenes & Additions" },
  { term: "Birch Reduction", definition: "Reduction of alkynes using Na or Li in liquid NH₃ to yield trans-alkenes via radical-anion anti-addition.", category: "Alkynes & Acidity" },
  { term: "Cahn-Ingold-Prelog (CIP) Rules", definition: "Priority rules based on atomic number used to assign E/Z configuration to alkenes.", category: "Alkenes & Additions" },
  { term: "Catenation", definition: "The self-linking ability of carbon atoms to form stable covalent chains and rings.", category: "Alkanes & Conformations" },
  { term: "Corey-House Synthesis", definition: "Coupling reaction of lithium dialkylcuprate (Gilman reagent R₂CuLi) with alkyl halides to form unsymmetrical alkanes.", category: "Alkanes & Conformations" },
  { term: "Dihedral Angle (θ)", definition: "The angle between two intersecting planes defined by H-C-C-H bonds in a Newman projection (60° staggered, 0° eclipsed).", category: "Alkanes & Conformations" },
  { term: "Electrophilic Addition (A_E)", definition: "Reaction mechanism where an electrophile adds across a π-bond to form a saturated product (Markovnikov rule).", category: "Alkenes & Additions" },
  { term: "Electrophilic Aromatic Substitution (S_EAr)", definition: "Reaction mechanism where an electrophile replaces a hydrogen on an aromatic ring, preserving aromaticity.", category: "Aromaticity & S_EAr" },
  { term: "Friedel-Crafts Alkylation", definition: "S_EAr reaction introducing an alkyl group onto benzene using RX + AlCl₃ (prone to carbocation 1,2-shifts).", category: "Aromaticity & S_EAr" },
  { term: "Friedel-Crafts Acylation", definition: "S_EAr reaction introducing an acyl group onto benzene using RCOCl + AlCl₃ via an acylium ion (no rearrangements).", category: "Aromaticity & S_EAr" },
  { term: "Gilman Reagent", definition: "Lithium dialkylcuprate (R₂CuLi) used in Corey-House alkane synthesis.", category: "Alkanes & Conformations" },
  { term: "Halogen Anomaly", definition: "Unique electronic behavior of halogens on benzene: strongly deactivating by -I effect yet ortho/para-directing by +M resonance.", category: "Aromaticity & S_EAr" },
  { term: "Hammond Postulate", definition: "Principle stating that the transition state of an endothermic step resembles the product, explaining high bromination selectivity.", category: "Alkanes & Conformations" },
  { term: "Hückel’s Rule", definition: "Rule stating that cyclic, planar, conjugated systems with (4n+2) π-electrons (n=0,1,2..) possess aromatic stability.", category: "Aromaticity & S_EAr" },
  { term: "Hydroboration-Oxidation (HBO)", definition: "Two-step reaction adding water across alkenes in an Anti-Markovnikov, Syn-addition manner without rearrangements.", category: "Alkenes & Additions" },
  { term: "Kharasch Effect (Peroxide Effect)", definition: "Anti-Markovnikov addition of HBr to alkenes in the presence of peroxides via a free-radical chain mechanism (fails for HCl/HI).", category: "Alkenes & Additions" },
  { term: "Kolbe’s Electrolysis", definition: "Anodic decarboxylative dimerization of aqueous carboxylate salts yielding alkanes + CO₂ at the anode and H₂ at the cathode.", category: "Alkanes & Conformations" },
  { term: "Kucherov Hydration", definition: "Hydration of alkynes using 1% HgSO₄ / 40% H₂SO₄ to form enols that tautomerize to ketones (ethyne yields acetaldehyde).", category: "Alkynes & Acidity" },
  { term: "Lindlar’s Catalyst", definition: "Pd/CaCO₃ poisoned with lead acetate or quinoline; reduces alkynes stereospecifically to cis-alkenes.", category: "Alkynes & Acidity" },
  { term: "Markovnikov’s Rule", definition: "Rule stating that during electrophilic addition of H-X to an unsymmetrical alkene, H⁺ adds to the carbon with more hydrogens.", category: "Alkenes & Additions" },
  { term: "Oxymercuration-Demercuration (OMDM)", definition: "Two-step reaction adding water across alkenes in a Markovnikov orientation WITHOUT rearrangements via a cyclic mercurinium ion.", category: "Alkenes & Additions" },
  { term: "Ozonolysis", definition: "Cleavage of C=C or C≡C bonds using ozone (O₃) followed by reductive (Zn/H₂O) or oxidative (H₂O₂) hydrolysis.", category: "Alkenes & Additions" },
  { term: "Polycyclic Aromatic Hydrocarbons (PAHs)", definition: "Carcinogenic pollutants composed of multiple fused benzene rings (e.g., 3,4-benzopyrene) forming reactive diolepoxides.", category: "Aromaticity & S_EAr" },
  { term: "Saytzeff (Zaitsev) Rule", definition: "Elimination rule stating that the major product is the more substituted, highly alkylated, thermodynamically stable alkene.", category: "Alkenes & Additions" },
  { term: "Staggered Conformation", definition: "The lowest energy, most stable conformer of ethane with θ = 60° (12.5 kJ/mol lower than eclipsed).", category: "Alkanes & Conformations" },
  { term: "Terminal Alkyne Acidity", definition: "Acidity of sp-hybridized C-H bonds (pKa ≈ 25, 50% s-character) reacting with NaNH₂, Tollens' reagent, and ammoniacal Cu₂Cl₂.", category: "Alkynes & Acidity" },
  { term: "Torsional Strain", definition: "Repulsive electrostatic strain between electron clouds of overlapping adjacent bonds (maximum at θ = 0° in eclipsed ethane).", category: "Alkanes & Conformations" },
  { term: "Wurtz Reaction", definition: "Coupling of two alkyl halide molecules using metallic sodium in dry ether to form symmetrical alkanes.", category: "Alkanes & Conformations" },
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
    question: "An unknown gaseous hydrocarbon X (M_B = 54 g/mol) reacts with excess Hydrogen gas in the presence of Nickel catalyst at 180°C to form n-butane (C₄H₁₀). When X is treated with ammoniacal Silver Nitrate solution (Tollens' Reagent), a bright White Precipitate forms immediately. What is the precise IUPAC name and structure of hydrocarbon X?",
    options: [
      { key: "A", text: "1,3-Butadiene (CH₂=CH-CH=CH₂)" },
      { key: "B", text: "1-Butyne (HC≡C-CH₂CH₃)" },
      { key: "C", text: "2-Butyne (CH₃-C≡C-CH₃)" },
      { key: "D", text: "Cyclobutene" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Molar mass of C₄H₆ is 54 g/mol. Hydrogenation yields n-butane. White precipitate with Tollens' confirms terminal alkyne (1-butyne). 2-butyne is internal and gives no ppt.",
  },
  {
    id: 2,
    part: "A",
    question: "When 3-methyl-1-butene ((CH₃)₂CH-CH=CH₂) is reacted with concentrated aqueous Hydrochloric Acid (HCl), two alkyl chloride products are formed. What is the structural formula of the MAJOR product, and what mechanistic step accounts for its formation?",
    options: [
      { key: "A", text: "2-chloro-3-methylbutane; direct Markovnikov addition" },
      { key: "B", text: "2-chloro-2-methylbutane; 1,2-hydride shift forming a more stable 3° carbocation" },
      { key: "C", text: "1-chloro-3-methylbutane; Anti-Markovnikov radical addition" },
      { key: "D", text: "1,3-dichlorobutane; electrophilic substitution" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "H⁺ addition forms 2° carbocation (CH₃)₂CH-C⁺H-CH₃, which undergoes an immediate 1,2-hydride shift to form the stable 3° cation (CH₃)₂C⁺-CH₂CH₃ prior to Cl⁻ attack.",
  },
  {
    id: 3,
    part: "A",
    question: "A sample of 2-butene is subjected to Reductive Ozonolysis (1. O₃; 2. Zn/H₂O). The resulting organic product is isolated and treated with Fehling's solution, producing a bright red precipitate of Cu₂O. How many total moles of Acetaldehyde (CH₃CHO) are formed per mole of 2-butene?",
    options: [
      { key: "A", text: "1 mole" },
      { key: "B", text: "2 moles" },
      { key: "C", text: "3 moles" },
      { key: "D", text: "0 moles (yields Acetone)" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Reductive ozonolysis of symmetrical 2-butene (CH₃-CH=CH-CH₃) cleaves the double bond into exactly 2 moles of Acetaldehyde (CH₃CHO).",
  },
  {
    id: 4,
    part: "A",
    question: "What is the major product obtained when 1-bromopropane is treated with Lithium metal in dry ether, followed by reaction with Cuprous Iodide (CuI), and subsequent coupling with 1-bromobutane (Corey-House Synthesis)?",
    options: [
      { key: "A", text: "n-Hexane" },
      { key: "B", text: "n-Heptane" },
      { key: "C", text: "2-Methylpentane" },
      { key: "D", text: "n-Octane" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Propyl Gilman reagent (C₃H₇)₂CuLi couples with 1-bromobutane (C₄H₉Br) to yield n-heptane (C₇H₁₆, 3+4=7 carbons).",
  },
  {
    id: 5,
    part: "A",
    question: "Why does Chlorination of Isobutane ((CH₃)₃CH) at 25°C yield 63% of 1-chloro-2-methylpropane (1°-chloride) and 37% of 2-chloro-2-methylpropane (3°-chloride), despite the 3° radical being thermodynamically much more stable than the 1° radical?",
    options: [
      { key: "A", text: "Chlorine is completely non-selective and reacts only at carbon 1." },
      { key: "B", text: "The statistical probability factor (9 × 1°-H vs 1 × 3°-H) partially offsets the higher relative reactivity ratio (5.0 : 1.0) of 3°-H." },
      { key: "C", text: "1°-chloride undergoes rapid rearrangement into 3°-chloride." },
      { key: "D", text: "Isobutane lacks a tertiary carbon atom." },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Amount of 1° = 9 × 1.0 = 9.0 (64.3%); Amount of 3° = 1 × 5.0 = 5.0 (35.7%). The 9:1 abundance of 1°-H dominates product distribution.",
  },
  {
    id: 6,
    part: "A",
    question: "Which of the following cyclic hydrocarbon systems satisfies Hückel's (4n+2) π-electron rule and is classified as strictly AROMATIC?",
    options: [
      { key: "A", text: "Cyclobutadiene" },
      { key: "B", text: "Cyclooctatetraene (COT in planar form)" },
      { key: "C", text: "Cyclopentadienyl Anion (C₅H₅⁻)" },
      { key: "D", text: "Cycloheptatrienyl Cation (Tropylium ion) with 8π e⁻" },
    ],
    correctKeys: ["C"],
    type: "single",
    explanation: "Cyclopentadienyl anion is planar, fully conjugated, and has 6 π-electrons (4 from double bonds + 2 from carbanion lone pair), obeying 4n+2 for n=1.",
  },
  {
    id: 7,
    part: "A",
    question: "What is the active electrophile generated during the Nitration of Benzene using a 1:2 mixture of concentrated Nitric Acid (HNO₃) and concentrated Sulfuric Acid (H₂SO₄)?",
    options: [
      { key: "A", text: "Nitrite ion (NO₂⁻)" },
      { key: "B", text: "Nitronium Ion (NO₂⁺)" },
      { key: "C", text: "Nitrosonium Ion (NO⁺)" },
      { key: "D", text: "Nitrate radical (NO₃•)" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "HNO₃ + 2H₂SO₄ ⇌ NO₂⁺ + H₃O⁺ + 2HSO₄⁻. The active electrophile is the Nitronium Ion (NO₂⁺).",
  },
  {
    id: 8,
    part: "A",
    question: "Why do Chlorobenzene and Fluorobenzene undergo Electrophilic Aromatic Substitution (S_EAr) predominantly at the Ortho and Para positions, yet react at a SLOWER overall rate than unsubstituted Benzene?",
    options: [
      { key: "A", text: "Halogens are electron-donating by +I effect and electron-withdrawing by -M effect." },
      { key: "B", text: "Halogens exhibit a strong electron-withdrawing -I effect that deactivates the ring overall, but their +M resonance effect selectively stabilizes o,p-arenium intermediates." },
      { key: "C", text: "Halogens form 3d hyperconjugative bonds with the benzene ring." },
      { key: "D", text: "Halogens convert S_EAr into a free radical addition." },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "The Halogen Anomaly: Strong -I effect withdraws electron density (deactivates ring, slower rate), but +M lone pair resonance selectively stabilizes o,p-arenium ions.",
  },
  {
    id: 9,
    part: "A",
    question: "What stereospecific addition product is obtained when trans-2-butene is reacted with Bromine in Carbon Tetrachloride (Br₂ / CCl₄)?",
    options: [
      { key: "A", text: "(2R, 3R)-2,3-dibromobutane only" },
      { key: "B", text: "meso-2,3-dibromobutane" },
      { key: "C", text: "Equimolar racemic mixture of (2R,3R) and (2S,3S)-2,3-dibromobutane" },
      { key: "D", text: "1,2-dibromobutane" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Anti-addition of Br₂ across trans-2-butene produces the symmetrical, optically inactive meso-2,3-dibromobutane (TAM rule: Trans + Anti = Meso).",
  },
  {
    id: 10,
    part: "A",
    question: "Hydroboration-Oxidation (1. BH₃·THF; 2. H₂O₂, OH⁻) of 1-methylcyclopentene yields which specific stereoisomeric alcohol?",
    options: [
      { key: "A", text: "trans-2-methylcyclopentanol (Anti-Markovnikov, Syn-addition)" },
      { key: "B", text: "cis-2-methylcyclopentanol (Markovnikov, Anti-addition)" },
      { key: "C", text: "1-methylcyclopentanol (Markovnikov product)" },
      { key: "D", text: "1-hydroxy-1-methylcyclopentane" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "HBO gives Anti-Markovnikov regioselectivity (-OH at C-2) and Syn-addition of H and OH, forcing -CH₃ and -OH into a trans configuration.",
  },
  {
    id: 11,
    part: "B",
    question: "Which of the following methods can be used to synthesize n-Butane (C₄H₁₀)? (Select all that apply)",
    options: [
      { key: "A", text: "Wurtz reaction of Ethyl bromide (C₂H₅Br + Na/dry ether)" },
      { key: "B", text: "Kolbe's electrolysis of aqueous Sodium Propionate (C₂H₅COONa)" },
      { key: "C", text: "Corey-House coupling of Ethyl lithium dialkylcuprate with Ethyl bromide" },
      { key: "D", text: "Decarboxylation of Sodium Pentanoate with Soda-lime (NaOH/CaO, Δ)" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four methods yield n-butane cleanly: Wurtz (2×2=4), Kolbe (2×2=4), Corey-House (2+2=4), Decarboxylation (5-1=4).",
  },
  {
    id: 12,
    part: "B",
    question: "Select the valid statements regarding the Conformations of Ethane (C₂H₆): (Select all that apply)",
    options: [
      { key: "A", text: "The Staggered conformation (θ = 60°) is 12.5 kJ/mol lower in energy than the Eclipsed conformation (θ = 0°)" },
      { key: "B", text: "The Eclipsed conformation experiences severe Torsional Strain due to repulsive interactions between overlapping C-H electron pairs" },
      { key: "C", text: "The energy barrier of 12.5 kJ/mol allows rapid, continuous rotation around the C-C single bond at room temperature" },
      { key: "D", text: "The Eclipsed conformation is optically active and can be resolved into enantiomers" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct. • D is incorrect: Eclipsed ethane has symmetry planes and is achiral.",
  },
  {
    id: 13,
    part: "B",
    question: "Which of the following chemical reagents or reaction conditions convert Propyne (CH₃-C≡CH) into Propanone (Acetone, CH₃COCH₃)? (Select all that apply)",
    options: [
      { key: "A", text: "Kucherov Hydration (1% HgSO₄ / 40% H₂SO₄, 60°C)" },
      { key: "B", text: "Hydroboration-Oxidation using BH₃·THF followed by alkaline H₂O₂" },
      { key: "C", text: "Cold, 1% alkaline KMnO₄ solution" },
      { key: "D", text: "Addition of H₂O in the presence of H₂SO₄ followed by tautomerism" },
    ],
    correctKeys: ["A", "D"],
    type: "multi",
    explanation: "• A and D yield acetone via Markovnikov enol tautomerism. • B (HBO) yields propanal (Anti-Markovnikov). • C oxidizes propyne to pyruvic acid.",
  },
  {
    id: 14,
    part: "B",
    question: "Select the correct options regarding Electrophilic Aromatic Substitution (S_EAr) reactions of Benzene: (Select all that apply)",
    options: [
      { key: "A", text: "The rate-determining step is the attack of the electrophile (E⁺) to form a non-aromatic Arenium ion (σ-complex)" },
      { key: "B", text: "Nitration utilizes NO₂⁺ (Nitronium ion) generated by conc. HNO₃ + H₂SO₄" },
      { key: "C", text: "Friedel-Crafts alkylation with 1-chlorobutane undergoes carbocation rearrangement to yield 2-phenylbutane as the major product" },
      { key: "D", text: "Sulfonation utilizes neutral SO₃ as the active electrophile" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four statements accurately represent S_EAr rate-limiting steps, electrophile identities, and carbocation rearrangement behavior.",
  },
  {
    id: 15,
    part: "B",
    question: "Which of the following functional groups exert an Ortho/Para-directing ACTIVATING influence on an aromatic ring during S_EAr reactions? (Select all that apply)",
    options: [
      { key: "A", text: "Phenolic Hydroxyl group (-OH)" },
      { key: "B", text: "Amino group (-NH₂)" },
      { key: "C", text: "Methyl group (-CH₃) via Hyperconjugation" },
      { key: "D", text: "Nitro group (-NO₂)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A (+M), B (+M), and C (+I/hyperconjugation) are activating o,p-directors. • D (-NO₂) is a deactivating meta-director.",
  },
  {
    id: 16,
    part: "B",
    question: "Select the correct options regarding the stereospecific reduction of Alkynes: (Select all that apply)",
    options: [
      { key: "A", text: "Reduction of 2-butyne using Lindlar's catalyst (Pd/CaCO₃/quinoline) yields cis-2-butene" },
      { key: "B", text: "Birch reduction of 2-butyne using Na or Li in liquid NH₃ yields trans-2-butene" },
      { key: "C", text: "Complete catalytic hydrogenation of 2-butyne using H₂/Pt yields n-butane" },
      { key: "D", text: "Birch reduction produces cis-alkenes via a cyclic syn-transition state" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct. • D is incorrect: Birch reduction produces trans-alkenes via radical-anion anti-addition.",
  },
  {
    id: 17,
    part: "B",
    question: "Which of the following structural systems obey Hückel's Rule (4n+2 π e⁻) and are classified as AROMATIC? (Select all that apply)",
    options: [
      { key: "A", text: "Benzene (6π e⁻)" },
      { key: "B", text: "Tropylium Cation (C₇H₇⁺, 6π e⁻)" },
      { key: "C", text: "Naphthalene (10π e⁻)" },
      { key: "D", text: "Cyclobutadiene (4π e⁻)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A (6π), B (6π), and C (10π) obey 4n+2 (Aromatic). • D (4π) obeys 4n (Anti-aromatic).",
  },
  {
    id: 18,
    part: "B",
    question: "Select the correct options regarding Ozonolysis of Alkenes: (Select all that apply)",
    options: [
      { key: "A", text: "Reductive ozonolysis (O₃ followed by Zn/H₂O) converts alkenes to aldehydes and ketones" },
      { key: "B", text: "Oxidative ozonolysis (O₃ followed by H₂O₂) converts aldehydes (RCHO) into carboxylic acids (RCOOH)" },
      { key: "C", text: "Ozonolysis of 2,3-dimethyl-2-butene yields two moles of Acetone ((CH₃)₂C=O)" },
      { key: "D", text: "Zinc in reductive ozonolysis functions to destroy H₂O₂ and prevent over-oxidation of aldehydes" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four statements accurately represent reductive vs oxidative ozonolysis products and zinc's chemical role.",
  },
  {
    id: 19,
    part: "B",
    question: "Which of the following chemical tests can successfully distinguish Terminal Alkynes (R-C≡C-H) from Internal Alkynes (R-C≡C-R')? (Select all that apply)",
    options: [
      { key: "A", text: "Reaction with Tollens' Reagent (Ammoniacal AgNO₃) yielding a White Precipitate" },
      { key: "B", text: "Reaction with Fehling's Solution / Ammoniacal Cu₂Cl₂ yielding a Red Precipitate" },
      { key: "C", text: "Reaction with metallic Sodium (Na) releasing H₂ gas" },
      { key: "D", text: "Decolorization of Bromine in CCl₄" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are diagnostic tests for acidic terminal sp-C-H protons. • D is incorrect: both terminal and internal alkynes decolorize Br₂/CCl₄.",
  },
  {
    id: 20,
    part: "B",
    question: "Select the correct statements regarding the Free Radical Halogenation of Alkanes: (Select all that apply)",
    options: [
      { key: "A", text: "Bromination is highly selective for 3° carbon centers compared to chlorination" },
      { key: "B", text: "The rate-determining step in halogenation is the hydrogen abstraction step by the halogen radical (X• + R-H → HX + R•)" },
      { key: "C", text: "Iodination is reversible and requires an oxidizing agent (HNO₃ or HIO₃) to destroy HI" },
      { key: "D", text: "Fluorination is extremely slow and endothermic at all stages" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct. • D is incorrect: Fluorination is explosively fast and highly exothermic.",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
type Tab = "conformations" | "halogenation" | "alkane-synth" | "alkene-ez" | "alkene-addition" | "ozonolysis" | "alkynes" | "aromaticity-sear" | "traps" | "glossary" | "selftest";

export const HydrocarbonsDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("conformations");
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
    { id: "conformations", label: "Ethane Conformations", icon: <Compass className="w-3.5 h-3.5 shrink-0" /> },
    { id: "halogenation", label: "Radical Halogenation", icon: <Flame className="w-3.5 h-3.5 shrink-0" /> },
    { id: "alkane-synth", label: "Alkane Synthesis", icon: <Boxes className="w-3.5 h-3.5 shrink-0" /> },
    { id: "alkene-ez", label: "E/Z & Elimination", icon: <Split className="w-3.5 h-3.5 shrink-0" /> },
    { id: "alkene-addition", label: "Markovnikov & HBO", icon: <Droplets className="w-3.5 h-3.5 shrink-0" /> },
    { id: "ozonolysis", label: "Ozonolysis & Diols", icon: <FlaskConical className="w-3.5 h-3.5 shrink-0" /> },
    { id: "alkynes", label: "Alkynes & Tests", icon: <Pipette className="w-3.5 h-3.5 shrink-0" /> },
    { id: "aromaticity-sear", label: "Aromaticity & S_EAr", icon: <CircleDot className="w-3.5 h-3.5 shrink-0" /> },
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
          CHEMISTRY INTERACTIVE MODULE — CHAPTER 9
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <Atom className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 shrink-0" />
            HYDROCARBONS (ALKANES, ALKENES, ALKYNES, &amp; ARENES)
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            Ethane Conformations · Radical Halogenation Selectivity · Markovnikov &amp; Kharasch Effect · OMDM &amp; HBO Hydrations · Ozonolysis · Terminal Alkyne Tests · Hückel Aromaticity · S_EAr Halogen Anomaly
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

      {/* TAB 1: CONFORMATIONS */}
      {activeTab === "conformations" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-600 shrink-0" />
              Ethane Conformational Spectrum &amp; Torsional Strain Dynamics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5 text-[10px]">
                <div className="flex items-center justify-between">
                  <span className="font-black text-emerald-950 uppercase block">Staggered Conformation</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-950 font-black text-[9px]">MORE STABLE</span>
                </div>
                <p className="text-emerald-900 font-semibold">• Dihedral Angle (θ) = 60° (D_3d symmetry)</p>
                <p className="text-emerald-900 font-semibold">• Maximum spatial distance between adjacent C-H bonds</p>
                <p className="text-emerald-900 font-bold">• 12.5 kJ/mol (3.0 kcal/mol) lower in energy than eclipsed!</p>
              </div>
              <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1.5 text-[10px]">
                <div className="flex items-center justify-between">
                  <span className="font-black text-rose-950 uppercase block">Eclipsed Conformation</span>
                  <span className="px-1.5 py-0.5 rounded bg-rose-200 text-rose-950 font-black text-[9px]">LESS STABLE</span>
                </div>
                <p className="text-rose-900 font-semibold">• Dihedral Angle (θ) = 0°</p>
                <p className="text-rose-900 font-semibold">• Overlapping C-H bonding electron pairs</p>
                <p className="text-rose-900 font-bold">• Maximum Torsional Strain (12.5 kJ/mol energy barrier)</p>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] space-y-1">
              <span className="font-black text-slate-900 block">Thermal Rotation Dynamics:</span>
              <p className="text-slate-700 font-semibold">
                The 12.5 kJ/mol barrier is easily overcome by thermal energy at room temperature (RT ≈ 2.5 kJ/mol), allowing rapid rotation (10¹¹ rotations/second). Ethane conformers cannot be isolated at room temperature.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HALOGENATION */}
      {activeTab === "halogenation" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-600 shrink-0" />
              Free Radical Halogenation: Mechanism &amp; Selectivity Ratios
            </h4>
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1 text-[10px]">
              <span className="font-black text-amber-950 block">3-Step Chain Mechanism:</span>
              <code className="font-mono text-amber-900 block font-bold">1. Initiation: X₂ ──[hν / Δ]──► 2 X• (Homolytic fission)</code>
              <code className="font-mono text-amber-900 block font-bold">2. Propagation: X• + R-H ──► R• + HX (Rate-determining) | R• + X₂ ──► R-X + X•</code>
              <code className="font-mono text-amber-900 block font-bold">3. Termination: 2 R• ──► R-R | 2 X• ──► X₂ | R• + X• ──► R-X</code>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                <span className="font-black text-slate-900 block">Chlorination at 25°C (Low Selectivity)</span>
                <p className="font-mono font-bold text-slate-800">3° : 2° : 1° = 5.0 : 3.8 : 1.0</p>
                <p className="text-slate-600">Isobutane yields 63% 1°-chloride (9 × 1.0) and 37% 3°-chloride (1 × 5.0) due to statistical abundance of 1°-H.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1 text-[10px]">
                <span className="font-black text-purple-950 block">Bromination at 127°C (High Selectivity)</span>
                <p className="font-mono font-bold text-purple-900">3° : 2° : 1° = 1600 : 82 : 1.0</p>
                <p className="text-purple-800">Hammond Postulate: Endothermic step has late transition state, giving &gt;99% 3°-bromide!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ALKANE SYNTHESIS */}
      {activeTab === "alkane-synth" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Boxes className="w-4 h-4 text-indigo-600 shrink-0" />
              Core Synthetic Routes for Alkanes
            </h4>
            <div className="space-y-2">
              {alkaneSynthesisMatrix.map((route, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900">{route.name}</span>
                    <span className="font-mono font-black text-indigo-800">{route.reaction}</span>
                  </div>
                  <p className="text-slate-600 font-semibold">{route.mechanism}</p>
                  <p className="text-emerald-800 font-bold">Scope: {route.scope}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: E/Z & ELIMINATION */}
      {activeTab === "alkene-ez" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Split className="w-4 h-4 text-teal-600 shrink-0" />
              Alkene Double Bond Geometry (E/Z) &amp; Elimination Regioselectivity
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200 space-y-1 text-[10px]">
                <span className="font-black text-teal-950 block">CIP E/Z Nomenclature</span>
                <p className="text-teal-900">Priority assigned by Atomic Number: -I &gt; -Br &gt; -Cl &gt; -OH &gt; -NH₂ &gt; -CH₃ &gt; -H</p>
                <p className="text-teal-900 font-bold">• (Z)-Isomer (Zusammen): High-priority groups on SAME side.</p>
                <p className="text-teal-900 font-bold">• (E)-Isomer (Entgegen): High-priority groups on OPPOSITE sides.</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1 text-[10px]">
                <span className="font-black text-amber-950 block">Elimination: Saytzeff vs Hofmann</span>
                <p className="text-amber-900"><strong>Saytzeff (Zaitsev):</strong> More substituted, stable alkene (more α-H). Favored by small bases (EtO⁻) and good leaving groups (I⁻, Br⁻).</p>
                <p className="text-amber-900"><strong>Hofmann:</strong> Less substituted alkene. Favored by bulky bases (t-BuO⁻) or poor leaving groups (-N⁺R₃, F⁻).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MARKOVNIKOV & HBO */}
      {activeTab === "alkene-addition" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-600 shrink-0" />
              Electrophilic Additions (A_E) &amp; Alkene Hydration Matrix
            </h4>
            <div className="space-y-2">
              {hydrationMatrix.map((item, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900">{item.method}</span>
                    <span className="font-bold text-blue-700">{item.regiochemistry}</span>
                  </div>
                  <p className="text-slate-600 font-semibold">Reagents: {item.reagents} · Stereochemistry: {item.stereochemistry}</p>
                  <p className="text-purple-800 font-bold">{item.rearrangement}</p>
                </div>
              ))}
            </div>
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-[10px] space-y-1">
              <span className="font-black text-rose-950 block">⚠️ CRITICAL TRAP: Kharasch Peroxide Effect (HBr ONLY)</span>
              <p className="text-rose-900 font-semibold">
                Peroxides initiate Anti-Markovnikov addition via Br• radicals for HBr ONLY. HCl fails because H-Cl is too strong (431 kJ/mol); HI fails because I• radicals dimerize into I₂.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: OZONOLYSIS & DIOLS */}
      {activeTab === "ozonolysis" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-purple-600 shrink-0" />
              Ozonolysis Cleavage &amp; Stereospecific Halogen Additions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                <span className="font-black text-slate-900 block">Reductive vs Oxidative Ozonolysis</span>
                <p className="text-slate-700"><strong>Reductive (O₃ ; Zn/H₂O):</strong> Cleaves C=C into Aldehydes (RCHO) and Ketones (R₂CO). Zn destroys H₂O₂.</p>
                <p className="text-slate-700"><strong>Oxidative (O₃ ; H₂O₂):</strong> Aldehydes oxidized to Carboxylic Acids (RCOOH).</p>
              </div>
              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1 text-[10px]">
                <span className="font-black text-indigo-950 block">Stereospecific Br₂ Anti-Addition (TAM / CAR)</span>
                <p className="text-indigo-900 font-bold">• trans-2-butene + Anti Br₂ ──► meso-2,3-dibromobutane (Optically inactive!)</p>
                <p className="text-indigo-900 font-bold">• cis-2-butene + Anti Br₂   ──► (±) racemic-2,3-dibromobutane (dl-pair)</p>
                <p className="text-indigo-800">Baeyer's Reagent (cold alk. KMnO₄) gives Syn-Dihydroxylation (cis-1,2-diols).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: ALKYNES & TESTS */}
      {activeTab === "alkynes" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Pipette className="w-4 h-4 text-rose-600 shrink-0" />
              Terminal Alkyne Acidity, Diagnostic Tests, &amp; Kucherov Hydration
            </h4>
            <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1.5 text-[10px]">
              <span className="font-black text-rose-950 block">Terminal Acidity &amp; Diagnostic Heavy Metal Precipitates:</span>
              <p className="text-rose-900 font-semibold">• <strong>Tollens' Test:</strong> R-C≡C-H + [Ag(NH₃)₂]⁺ ──► R-C≡C-Ag ↓ (White Precipitate)</p>
              <p className="text-rose-900 font-semibold">• <strong>Fehling's / Cu₂Cl₂ Test:</strong> R-C≡C-H + Cu₂Cl₂ + 2 NH₄OH ──► R-C≡C-Cu ↓ (Red Precipitate)</p>
              <p className="text-rose-950 font-bold">Internal alkynes (R-C≡C-R') lack terminal sp-H and give NO precipitate!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                <span className="font-black text-slate-900 block">Kucherov Hydration (HgSO₄/H₂SO₄)</span>
                <p className="text-slate-700">R-C≡C-H + H₂O ──► [Enol] ──► Ketone (R-CO-CH₃). Acetylene (HC≡CH) yields Acetaldehyde.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1 text-[10px]">
                <span className="font-black text-emerald-950 block">Stereospecific Reductions</span>
                <p className="text-emerald-900 font-bold">• Lindlar's Catalyst (Pd/CaCO₃/quinoline) ──► cis-alkene (Syn)</p>
                <p className="text-emerald-900 font-bold">• Birch Reduction (Na / Li in liq. NH₃) ──► trans-alkene (Anti)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: AROMATICITY & S_EAr */}
      {activeTab === "aromaticity-sear" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <CircleDot className="w-4 h-4 text-emerald-600 shrink-0" />
              Hückel Aromaticity, S_EAr Mechanisms, &amp; The Halogen Anomaly
            </h4>
            <div className="space-y-1.5">
              {searMatrix.map((item, i) => (
                <div key={i} className="p-2 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5 text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900">{item.reaction}</span>
                    <span className="font-mono font-bold text-emerald-800">E⁺: {item.electrophile}</span>
                  </div>
                  <p className="text-slate-600">Reagents: {item.reagents} ──► Product: {item.product}</p>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1 text-[10px]">
              <span className="font-black text-amber-950 block">The Halogen Anomaly (F, Cl, Br, I):</span>
              <p className="text-amber-900 font-semibold">
                Halogens possess a strong electron-withdrawing -I effect (deactivates ring overall, slower rate than benzene) paired with a weak +M resonance effect that selectively stabilizes o,p-arenium ions. <strong>Halogens are Ortho/Para-Directing BUT DEACTIVATING!</strong>
              </p>
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
              All 10 High-Yield NEST Hydrocarbon Misconceptions &amp; Traps
            </h4>
            <div className="space-y-2">
              {hydrocarbonTraps.map((trap) => {
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
                placeholder="Search hydrocarbon glossary terms..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {["All", "Alkanes & Conformations", "Alkenes & Additions", "Alkynes & Acidity", "Aromaticity & S_EAr"].map((cat) => (
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
                {score >= 17 ? "Outstanding! Mastery level for NEST & IChO Hydrocarbons Module." : score >= 12 ? "Good performance — review incorrect explanations." : "Needs practice — revisit earlier tabs and retake."}
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
                      <span className="text-[9px] font-black uppercase tracking-wider text-emerald-700">Detailed Solution &amp; Mechanism Explanation</span>
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

export default HydrocarbonsDiagram;
