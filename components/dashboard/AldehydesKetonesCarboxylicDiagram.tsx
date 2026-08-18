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

const carbonylTraps: Misconception[] = [
  {
    id: "t1",
    trap: "Sodium Borohydride (NaBH₄) reduces carboxylic acids and esters to primary alcohols.",
    reality: "NaBH₄ is a mild reducing agent and CANNOT reduce carboxylic acids or esters. LiAlH₄ or B₂H₆ is strictly required.",
    tip: "NaBH₄ selectively reduces aldehydes, ketones, and acid chlorides only.",
  },
  {
    id: "t2",
    trap: "Benzaldehyde reduces Fehling's solution to give a brick-red precipitate.",
    reality: "Benzaldehyde (and aromatic aldehydes in general) FAILS to reduce Fehling's or Benedict's solution due to resonance deactivation.",
    tip: "Tollens' reagent reduces both aliphatic and aromatic aldehydes.",
  },
  {
    id: "t3",
    trap: "In semicarbazide (H₂N-NH-CONH₂), both -NH₂ groups act as nucleophiles.",
    reality: "Only the -NH₂ attached to -NH- is nucleophilic. The other -NH₂ is conjugated with the C=O group via resonance.",
    tip: "Resonance delocalizes the lone pair on the amide -NH₂, rendering it non-nucleophilic.",
  },
  {
    id: "t4",
    trap: "In a crossed Cannizzaro reaction between PhCHO and HCHO, Benzaldehyde is oxidized to Benzoate.",
    reality: "Formaldehyde (HCHO) is EXCLUSIVELY OXIDIZED to Formate (HCOO⁻) because nucleophilic addition occurs faster on HCHO.",
    tip: "Formaldehyde is oxidized; Benzaldehyde is reduced to Benzyl Alcohol.",
  },
  {
    id: "t5",
    trap: "Clemmensen reduction (Zn-Hg/HCl) can be used for compounds containing alcohol or ether groups.",
    reality: "Clemmensen uses concentrated HCl which cleaves acid-sensitive groups (-OH, ethers, alkenes). Use Wolff-Kishner instead!",
    tip: "Clemmensen = Acidic medium; Wolff-Kishner = Basic medium.",
  },
  {
    id: "t6",
    trap: "Formic acid (HCOOH) gives a negative Tollens' test because it is a carboxylic acid.",
    reality: "HCOOH contains an aldehyde moiety (H-C(=O)OH) and gives a POSITIVE Tollens' and Fehling's test!",
    tip: "Formic acid is oxidized to CO₂ + H₂O by Tollens' and Fehling's reagents.",
  },
  {
    id: "t7",
    trap: "The HVZ reaction can convert Trimethylacetic acid into an α-bromo acid.",
    reality: "Trimethylacetic acid (CH₃)₃C-COOH lacks α-hydrogens and FAILS the HVZ reaction.",
    tip: "HVZ reaction strictly requires at least one α-hydrogen.",
  },
  {
    id: "t8",
    trap: "All o-substituted benzoic acids are weaker acids than benzoic acid due to steric hindrance.",
    reality: "Almost ALL o-substituted benzoic acids are STRONGER ACIDS than Benzoic Acid (Ortho-Effect).",
    tip: "Steric Inhibition of Resonance (SIR) forces -COOH out of plane, stabilizing carboxylate.",
  },
  {
    id: "t9",
    trap: "Popoff's rule states the keto group stays with the larger alkyl group during ketone oxidation.",
    reality: "Popoff's rule states the keto group stays preferentially with the SMALLER alkyl group.",
    tip: "CH₃COCH₂CH₂CH₃ ──► CH₃COOH + CH₃CH₂COOH.",
  },
  {
    id: "t10",
    trap: "Aldol condensation occurs in aldehydes lacking α-hydrogens.",
    reality: "Aldol requires AT LEAST ONE α-hydrogen. Aldehydes lacking α-H undergo the Cannizzaro reaction.",
    tip: "Aldol = HAS α-H; Cannizzaro = LACKS α-H.",
  },
];

// ============================================================================
// 2. DATA: MASTER GLOSSARY (28 DEFINITIONS)
// ============================================================================
interface GlossaryTerm {
  term: string;
  definition: string;
  category: "Carbonyls & Addition" | "Enolate Chemistry" | "Oxidation & Reduction" | "Carboxylic & Derivatives";
}

const masterGlossary: GlossaryTerm[] = [
  { term: "Acetal", definition: "A geminal di-ether [>C(OR')₂] produced by nucleophilic addition of two alcohol equivalents to an aldehyde in dry HCl.", category: "Carbonyls & Addition" },
  { term: "Aldol Condensation", definition: "Base-catalyzed self-condensation of carbonyls possessing α-hydrogens forming β-hydroxy carbonyls which dehydrate to α,β-unsaturated products.", category: "Enolate Chemistry" },
  { term: "Ammoniacal Silver Nitrate (Tollens' Reagent)", definition: "[Ag(NH₃)₂]⁺, a mild oxidizing agent reduced by all aldehydes to metallic silver (silver mirror).", category: "Oxidation & Reduction" },
  { term: "Brady’s Reagent (2,4-DNP)", definition: "2,4-Dinitrophenylhydrazine in methanol/acid; forms yellow/orange/red precipitates with all carbonyl compounds.", category: "Carbonyls & Addition" },
  { term: "Bürgi-Dunitz Angle", definition: "The specific 107° angle of approach for nucleophilic attack on a planar sp² carbonyl carbon.", category: "Carbonyls & Addition" },
  { term: "Cannizzaro Reaction", definition: "Base-catalyzed self-redox disproportionation of aldehydes lacking α-hydrogens into an alcohol and carboxylate salt.", category: "Enolate Chemistry" },
  { term: "Carboxylate Anion", definition: "The resonance-stabilized anion (R-COO⁻) produced by deprotonation of a carboxylic acid.", category: "Carboxylic & Derivatives" },
  { term: "Claisen-Schmidt Reaction", definition: "A crossed aldol condensation between an aromatic aldehyde lacking α-H and an aliphatic carbonyl.", category: "Enolate Chemistry" },
  { term: "Clemmensen Reduction", definition: "Deoxygenation of aldehydes/ketones to hydrocarbons (>C=O ➔ >CH₂) using Zn-Hg and concentrated HCl.", category: "Oxidation & Reduction" },
  { term: "DIBAL-H", definition: "Diisobutylaluminium hydride; a bulky reducing agent that selectively reduces nitriles and esters to aldehydes at -78°C.", category: "Carbonyls & Addition" },
  { term: "Enolate Anion", definition: "The resonance-stabilized carbanion (>C⁻-C=O ↔ >C=C-O⁻) formed by deprotonating an α-hydrogen.", category: "Enolate Chemistry" },
  { term: "Fischer Esterification", definition: "Acid-catalyzed reversible condensation of a carboxylic acid and alcohol yielding an ester and water.", category: "Carboxylic & Derivatives" },
  { term: "Etard Reaction", definition: "Oxidation of toluene to benzaldehyde using chromyl chloride (CrO₂Cl₂) in CS₂.", category: "Carbonyls & Addition" },
  { term: "Fehling’s Solution", definition: "A mixture of aqueous CuSO₄ (Fehling A) and alkaline Na-K tartrate (Fehling B) reduced to red Cu₂O by aliphatic aldehydes.", category: "Oxidation & Reduction" },
  { term: "Gattermann-Koch Reaction", definition: "Formylation of benzene using CO + HCl in the presence of AlCl₃/CuCl to yield benzaldehyde.", category: "Carbonyls & Addition" },
  { term: "Hell-Volhard-Zelinsky (HVZ) Reaction", definition: "Selective α-halogenation of carboxylic acids possessing α-hydrogens using X₂ / Red P.", category: "Carboxylic & Derivatives" },
  { term: "Iodoform Test", definition: "Diagnostic yellow precipitate test (CHI₃) for methyl ketones (CH₃CO-) and secondary methyl carbinols.", category: "Enolate Chemistry" },
  { term: "Kolbe's Electrolysis", definition: "Anodic decarboxylative coupling of carboxylate salts yielding symmetrical alkanes and CO₂.", category: "Carboxylic & Derivatives" },
  { term: "Ortho-Effect", definition: "The dramatic increase in acidity displayed by o-substituted benzoic acids relative to benzoic acid due to SIR.", category: "Carboxylic & Derivatives" },
  { term: "Popoff’s Rule", definition: "Rule governing harsh oxidative cleavage of unsymmetrical ketones, dictating >C=O remains with the smaller alkyl group.", category: "Oxidation & Reduction" },
  { term: "Rosenmund Reduction", definition: "Catalytic reduction of acid chlorides to aldehydes using H₂, Pd/BaSO₄ poisoned with sulfur/quinoline.", category: "Carbonyls & Addition" },
  { term: "Semicarbazone", definition: "The condensation product (>C=N-NH-CONH₂) formed by reacting a carbonyl with semicarbazide.", category: "Carbonyls & Addition" },
  { term: "Stephen Reaction", definition: "Reduction of nitriles to aldehydes using SnCl₂ + HCl followed by hydrolysis.", category: "Carbonyls & Addition" },
  { term: "Wolff-Kishner Reduction", definition: "Deoxygenation of carbonyls to hydrocarbons using NH₂NH₂ / KOH in ethylene glycol under basic conditions.", category: "Oxidation & Reduction" },
  { term: "Cyanohydrin", definition: "A compound containing both a hydroxyl (-OH) and cyano (-CN) group on the same carbon atom [>C(OH)CN].", category: "Carbonyls & Addition" },
  { term: "Oxime", definition: "The condensation product (>C=N-OH) formed by reacting a carbonyl compound with hydroxylamine.", category: "Carbonyls & Addition" },
  { term: "Hydrazone", definition: "The condensation product (>C=N-NH₂) formed by reacting a carbonyl compound with hydrazine.", category: "Carbonyls & Addition" },
  { term: "Soda-Lime Decarboxylation", definition: "Thermal reaction of sodium carboxylate with NaOH/CaO yielding an alkane with one carbon less.", category: "Carboxylic & Derivatives" },
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
    question: "An unknown organic compound X (C₈H₈O) gives a positive 2,4-DNP test forming an orange precipitate. Compound X reduces Tollens' reagent to form a silver mirror and gives a positive Iodoform test yielding yellow CHI₃ ↓. Upon treatment with dilute NaOH, compound X undergoes a self-condensation reaction. What is the structural identity of X?",
    options: [
      { key: "A", text: "Acetophenone (C₆H₅COCH₃)" },
      { key: "B", text: "2-Methylbenzaldehyde" },
      { key: "C", text: "2-Phenylacetaldehyde (C₆H₅CH₂CHO)" },
      { key: "D", text: "4-Methylbenzaldehyde" },
    ],
    correctKeys: ["C"],
    type: "single",
    explanation: "1. Positive 2,4-DNP confirms aldehyde or ketone. 2. Reduces Tollens' reagent ⟹ MUST be an ALDEHYDE (eliminating Acetophenone). 3. 2-Phenylacetaldehyde (C₆H₅CH₂CHO) contains α-hydrogens, undergoes Aldol self-condensation, and reduces Tollens' reagent.",
  },
  {
    id: 2,
    part: "A",
    question: "What is the major organic product obtained when Benzaldehyde (C₆H₅CHO) is reacted with Formaldehyde (HCHO) in the presence of concentrated 50% NaOH solution (Crossed Cannizzaro Reaction)?",
    options: [
      { key: "A", text: "Benzyl alcohol + Sodium formate" },
      { key: "B", text: "Sodium benzoate + Methanol" },
      { key: "C", text: "Benzyl alcohol + Methanol" },
      { key: "D", text: "Sodium benzoate + Sodium formate" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "In a Crossed Cannizzaro reaction between Benzaldehyde and Formaldehyde, nucleophilic attack of OH⁻ occurs preferentially at the more electrophilic formaldehyde carbon (HCHO). Hydride transfer reduces Benzaldehyde to Benzyl Alcohol (C₆H₅CH₂OH), while Formaldehyde is oxidized to Sodium Formate (HCOONa).",
  },
  {
    id: 3,
    part: "A",
    question: "An ester E (C₄H₈O₂) is treated with 1 equivalent of Diisobutylaluminium hydride (DIBAL-H) in dry toluene at -78°C, followed by aqueous workup. What organic products are formed from this selective reduction?",
    options: [
      { key: "A", text: "Two moles of Ethanol" },
      { key: "B", text: "An Aldehyde and an Alcohol" },
      { key: "C", text: "Two moles of Carboxylic Acid" },
      { key: "D", text: "A 3° Alcohol and a Ketone" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "DIBAL-H at low temperatures (-78°C) selectively reduces esters (RCOOR') to Aldehydes (RCHO) and Alcohols (R'OH) without over-reducing the aldehyde.",
  },
  {
    id: 4,
    part: "A",
    question: "Arrange the following carboxylic acids in order of INCREASING Acidic Strength (lowest acidity to highest acidity): 1: Acetic Acid (CH₃COOH), 2: Formic Acid (HCOOH), 3: Fluoroacetic Acid (FCH₂COOH), 4: Trichloroacetic Acid (CCl₃COOH)",
    options: [
      { key: "A", text: "1 < 2 < 3 < 4" },
      { key: "B", text: "2 < 1 < 3 < 4" },
      { key: "C", text: "4 < 3 < 2 < 1" },
      { key: "D", text: "1 < 3 < 2 < 4" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "• +I methyl group in Acetic acid decreases acidity (CH₃COOH < HCOOH). • -I fluorine increases acidity (FCH₂COOH > HCOOH). • Three -Cl groups in CCl₃COOH exert a massive -I effect. Increasing order: 1 < 2 < 3 < 4.",
  },
  {
    id: 5,
    part: "A",
    question: "When Propanoic Acid (CH₃CH₂COOH) is treated with Red Phosphorus and Br₂ followed by addition of water (Hell-Volhard-Zelinsky / HVZ Reaction), what is the structural formula of the final organic product?",
    options: [
      { key: "A", text: "CH₃CH₂COBr" },
      { key: "B", text: "CH₃CH(Br)COOH (2-Bromopropanoic acid)" },
      { key: "C", text: "BrCH₂CH₂COOH (3-Bromopropanoic acid)" },
      { key: "D", text: "CH₃C(Br)₂COOH" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "The HVZ reaction selectively halogenates the α-carbon of carboxylic acids possessing α-hydrogens. Propanoic acid has 2 α-hydrogens at C-2, yielding 2-Bromopropanoic acid [CH₃CH(Br)COOH].",
  },
  {
    id: 6,
    part: "A",
    question: "Which of the following acid derivatives undergoes nucleophilic acyl substitution at the FASTEST intrinsic rate when reacted with water (H₂O)?",
    options: [
      { key: "A", text: "Acetamide (CH₃CONH₂)" },
      { key: "B", text: "Ethyl Acetate (CH₃COOCH₂CH₃)" },
      { key: "C", text: "Acetic Anhydride ((CH₃CO)₂O)" },
      { key: "D", text: "Acetyl Chloride (CH₃COCl)" },
    ],
    correctKeys: ["D"],
    type: "single",
    explanation: "Reactivity depends on leaving group stability (Cl⁻ > RCOO⁻ > RO⁻ > NH₂⁻) and carbonyl electrophilicity. Acetyl Chloride contains the best leaving group (Cl⁻) and reacts fastest.",
  },
  {
    id: 7,
    part: "A",
    question: "What is the major product obtained when Pentan-3-one (CH₃CH₂COCH₂CH₃) is treated with Hydrazine (NH₂NH₂) followed by heating with KOH in Ethylene Glycol solvent at 180°C (Wolff-Kishner Reduction)?",
    options: [
      { key: "A", text: "Pentan-3-ol" },
      { key: "B", text: "n-Pentane (CH₃CH₂CH₂CH₂CH₃)" },
      { key: "C", text: "Pent-2-ene" },
      { key: "D", text: "Pentanoic acid" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "The Wolff-Kishner Reduction (NH₂NH₂ / KOH, ethylene glycol, Δ) completely deoxygenates carbonyl groups (>C=O) into methylene groups (>CH₂), producing n-Pentane.",
  },
  {
    id: 8,
    part: "A",
    question: "A student mixes Benzaldehyde (C₆H₅CHO) and Propanal (CH₃CH₂CHO) in dilute NaOH solution and heats the mixture (Claisen-Schmidt Crossed Aldol). What is the IUPAC name of the major dehydrated cross-aldol condensation product?",
    options: [
      { key: "A", text: "2-Methyl-3-phenylprop-2-enal" },
      { key: "B", text: "3-Phenylprop-2-enal (Cinnamaldehyde)" },
      { key: "C", text: "1-Phenylbut-2-en-1-one" },
      { key: "D", text: "3-Methyl-3-phenylpropanal" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "Enolate generates at the α-carbon of Propanal (CH₃-C̄H-CHO) and attacks Benzaldehyde. Dehydration yields 2-Methyl-3-phenylprop-2-enal [C₆H₅-CH=C(CH₃)-CHO].",
  },
  {
    id: 9,
    part: "A",
    question: "Why does Semicarbazide (H₂N⁽¹⁾-NH-CO-NH₂⁽²⁾) react with aldehydes to form semicarbazones using ONLY the NH₂⁽¹⁾ group, while the NH₂⁽²⁾ group remains completely unreactive?",
    options: [
      { key: "A", text: "NH₂⁽²⁾ is sterically blocked by two phenyl rings." },
      { key: "B", text: "Lone pair electrons on NH₂⁽²⁾ are delocalized into the adjacent carbonyl group via resonance (H₂N-C(=O)-NH₂ ⟷ H₂N-C(O⁻)=NH₂⁺), making them non-nucleophilic." },
      { key: "C", text: "NH₂⁽¹⁾ is an acidic group." },
      { key: "D", text: "NH₂⁽²⁾ undergoes immediate oxidation to N₂ gas." },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Electrons on NH₂⁽²⁾ are conjugated with the carbonyl C=O group through resonance and are delocalized, making them non-nucleophilic. NH₂⁽¹⁾ retains its localized lone pair.",
  },
  {
    id: 10,
    part: "A",
    question: "What organic acid is produced when a Grignard reagent, Methylmagnesium bromide (CH₃MgBr), is reacted with Solid Carbon Dioxide (Dry Ice) in dry ether, followed by acidic hydrolysis (H₃O⁺)?",
    options: [
      { key: "A", text: "Formic Acid (HCOOH)" },
      { key: "B", text: "Acetic Acid (CH₃COOH)" },
      { key: "C", text: "Propanoic Acid (CH₃CH₂COOH)" },
      { key: "D", text: "Oxalic Acid ((COOH)₂)" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Nucleophilic attack of CH₃⁻ from Grignard onto electrophilic CO₂ yields CH₃-COOMgBr, which upon acidic hydrolysis gives Acetic Acid (CH₃COOH).",
  },
  {
    id: 11,
    part: "B",
    question: "Which of the following aldehydes/ketones will undergo a CANNIZZARO REACTION when treated with concentrated 50% NaOH solution? (Select all that apply)",
    options: [
      { key: "A", text: "Formaldehyde (HCHO)" },
      { key: "B", text: "Benzaldehyde (C₆H₅CHO)" },
      { key: "C", text: "2,2-Dimethylpropanal / Trimethylacetaldehyde ((CH₃)₃C-CHO)" },
      { key: "D", text: "Acetaldehyde (CH₃CHO)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: HCHO, PhCHO, and (CH₃)₃C-CHO LACK α-hydrogens and undergo Cannizzaro self-redox. • D has 3 α-H and undergoes Aldol condensation instead.",
  },
  {
    id: 12,
    part: "B",
    question: "Select the correct statements regarding Tollens' and Fehling's diagnostic tests: (Select all that apply)",
    options: [
      { key: "A", text: "Tollens' reagent ([Ag(NH₃)₂]⁺) oxidizes both aliphatic and aromatic aldehydes to carboxylates, forming a silver mirror (Ag⁰ ↓)." },
      { key: "B", text: "Fehling's solution (Cu²⁺ tartrate complex) oxidizes ALIPHATIC aldehydes to give a red precipitate of Cu₂O ↓." },
      { key: "C", text: "Aromatic aldehydes like Benzaldehyde reduce Tollens' reagent but FAIL to reduce Fehling's solution." },
      { key: "D", text: "Ketones readily reduce both Tollens' and Fehling's reagents under mild conditions." },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: Tollens' oxidizes both aliphatic and aromatic aldehydes; Fehling's oxidizes only aliphatic aldehydes. • D is false: Simple ketones resist oxidation and give negative tests.",
  },
  {
    id: 13,
    part: "B",
    question: "Which of the following reagents can be used to perform a DEOXYGENATION REDUCTION of a carbonyl group (>C=O ──► >CH₂)? (Select all that apply)",
    options: [
      { key: "A", text: "Zn-Hg / conc. HCl (Clemmensen Reduction)" },
      { key: "B", text: "NH₂NH₂ / KOH in Ethylene Glycol, Δ (Wolff-Kishner Reduction)" },
      { key: "C", text: "LiAlH₄ in dry ether" },
      { key: "D", text: "PCC in CH₂Cl₂" },
    ],
    correctKeys: ["A", "B"],
    type: "multi",
    explanation: "• A and B are correct: Clemmensen (Zn-Hg/HCl) and Wolff-Kishner (NH₂NH₂/KOH) convert >C=O into >CH₂. • LiAlH₄ reduces to alcohol; PCC is an oxidant.",
  },
  {
    id: 14,
    part: "B",
    question: "Select the valid statements regarding the Acidity of Carboxylic Acids: (Select all that apply)",
    options: [
      { key: "A", text: "Carboxylic acids are stronger acids than phenols because the negative charge on carboxylate (R-COO⁻) is delocalized equally over two electronegative oxygen atoms." },
      { key: "B", text: "Electron-withdrawing groups (-I / -M) like -NO₂, -F, -Cl increase carboxylic acid strength." },
      { key: "C", text: "Almost all o-substituted benzoic acids are stronger acids than benzoic acid due to the Ortho-Effect." },
      { key: "D", text: "Acetic acid (CH₃COOH) is a stronger acid than Formic acid (HCOOH)." },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: Carboxylate resonance over 2 oxygens, EWGs increase acidity, and o-substituted benzoic acids show the Ortho-Effect. • D is false: Formic acid (pKa 3.75) is stronger than Acetic acid (pKa 4.76).",
  },
  {
    id: 15,
    part: "B",
    question: "Which of the following compounds will give a POSITIVE IODOFORM TEST (CHI₃ ↓ yellow precipitate) when treated with Iodine and aqueous NaOH? (Select all that apply)",
    options: [
      { key: "A", text: "Acetaldehyde (CH₃CHO)" },
      { key: "B", text: "Acetone (CH₃COCH₃)" },
      { key: "C", text: "Acetophenone (C₆H₅COCH₃)" },
      { key: "D", text: "Benzophenone (C₆H₅COC₆H₅)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: Acetaldehyde, Acetone, and Acetophenone contain the required CH₃CO- group. • D lacks a methyl group attached to carbonyl.",
  },
  {
    id: 16,
    part: "B",
    question: "Which of the following specific methods can be used to synthesize BENZALDEHYDE (C₆H₅CHO)? (Select all that apply)",
    options: [
      { key: "A", text: "Etard Reaction (Toluene + CrO₂Cl₂ in CS₂ followed by H₃O⁺)" },
      { key: "B", text: "Gattermann-Koch Reaction (Benzene + CO + HCl in anhyd. AlCl₃ / CuCl)" },
      { key: "C", text: "Rosenmund Reduction of Benzoyl Chloride (C₆H₅COCl + H₂ / Pd-BaSO₄)" },
      { key: "D", text: "Reimer-Tiemann Reaction of Phenol" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are valid syntheses of Benzaldehyde. • D yields Salicylaldehyde (2-hydroxybenzaldehyde), not benzaldehyde.",
  },
  {
    id: 17,
    part: "B",
    question: "Select the correct options regarding the Hell-Volhard-Zelinsky (HVZ) Reaction: (Select all that apply)",
    options: [
      { key: "A", text: "Converts carboxylic acids possessing α-hydrogens into α-halo carboxylic acids." },
      { key: "B", text: "Uses Chlorine or Bromine in the presence of Red Phosphorus (X₂ / Red P) followed by water." },
      { key: "C", text: "Formic Acid (HCOOH) and Trimethylacetic acid (CH₃)₃C-COOH FAIL the HVZ reaction." },
      { key: "D", text: "It operates via an enol/acid halide intermediate." },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four options are correct facts regarding the HVZ α-halogenation reaction and its requirement for α-hydrogens.",
  },
  {
    id: 18,
    part: "B",
    question: "Which of the following acid derivatives undergo conversion back to the parent Carboxylic Acid (RCOOH) upon nucleophilic acyl substitution / hydrolysis with water? (Select all that apply)",
    options: [
      { key: "A", text: "Acyl Chlorides (RCOCl)" },
      { key: "B", text: "Acid Anhydrides ((RCO)₂O)" },
      { key: "C", text: "Esters (RCOOR')" },
      { key: "D", text: "Amides (RCONH₂)" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four major acid derivatives (acyl chlorides, anhydrides, esters, amides) undergo hydrolysis (H₃O⁺) to regenerate the parent Carboxylic Acid (RCOOH).",
  },
  {
    id: 19,
    part: "B",
    question: "Select the correct statements regarding the reactivity of Carbonyls toward Nucleophilic Addition (A_N): (Select all that apply)",
    options: [
      { key: "A", text: "Aldehydes are generally more reactive than Ketones due to steric and electronic factors." },
      { key: "B", text: "Formaldehyde (HCHO) is the most reactive simple carbonyl compound." },
      { key: "C", text: "Electron-withdrawing groups (-I / -M) on an aromatic ring increase the reactivity of benzaldehydes toward nucleophiles." },
      { key: "D", text: "Propanone (Acetone) is more reactive than Ethanal (Acetaldehyde)." },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: Aldehydes > Ketones; HCHO is most reactive; -I/-M groups increase carbonyl electrophilicity. • D is false: Ethanal (aldehyde) is MORE reactive than Propanone (ketone).",
  },
  {
    id: 20,
    part: "B",
    question: "Which of the following reagents can be used to convert an Acid Chloride (RCOCl) into a Ketone (R-CO-R')? (Select all that apply)",
    options: [
      { key: "A", text: "Dialkylcadmium (R'₂Cd)" },
      { key: "B", text: "Lithium Dialkylcuprate / Gilman Reagent (R'₂CuLi)" },
      { key: "C", text: "Grignard Reagent (R'MgX) in controlled 1:1 stoichiometric ratio under controlled conditions" },
      { key: "D", text: "Concentrated NaOH (Cannizzaro)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: Dialkylcadmium (R'₂Cd), Gilman reagents (R'₂CuLi), and controlled Grignard reagents convert acid chlorides into ketones. • D hydrolyzes acid chlorides to carboxylate salts.",
  },
]

// ============================================================================
// MAIN COMPONENT
// ============================================================================
type Tab = "carbonyl-reactivity" | "synthesis-matrix" | "nucleophilic-addition" | "ammonia-derivatives" | "alpha-hydrogens" | "reductions-oxidations" | "carboxylic-acidity-inspector" | "acid-derivatives-hvz" | "traps" | "glossary" | "selftest";

export const AldehydesKetonesCarboxylicDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("carbonyl-reactivity");
  const [activeTrapId, setActiveTrapId] = useState<string | null>(null);

  // Interactive Acidity Inspector state
  const [selectedAcid, setSelectedAcid] = useState<string>("cf3cooh");
  const acidSpectrum: Record<string, { name: string; formula: string; pka: string; reason: string; type: "EWG" | "Neutral" | "EDG" }> = {
    cf3cooh: { name: "Trifluoroacetic Acid", formula: "CF₃COOH", pka: "0.23", reason: "Three highly electronegative -F atoms exert massive -I inductive electron withdrawal, dispersing carboxylate negative charge.", type: "EWG" },
    ccl3cooh: { name: "Trichloroacetic Acid", formula: "CCl₃COOH", pka: "0.65", reason: "Three -Cl atoms exert strong -I effect, heavily stabilizing the trichloroacetate anion.", type: "EWG" },
    chcl2cooh: { name: "Dichloroacetic Acid", formula: "CHCl₂COOH", pka: "1.29", reason: "Two -Cl atoms stabilize the conjugate base via -I inductive effect.", type: "EWG" },
    fch2cooh: { name: "Fluoroacetic Acid", formula: "FCH₂COOH", pka: "2.59", reason: "Single -F atom provides stronger inductive withdrawal than -Cl due to higher electronegativity (χ = 4.0 vs 3.0).", type: "EWG" },
    clch2cooh: { name: "Chloroacetic Acid", formula: "ClCH₂COOH", pka: "2.87", reason: "Single -Cl atom provides moderate -I stabilization to the chloroacetate anion.", type: "EWG" },
    hcooh: { name: "Formic Acid (Methanoic)", formula: "HCOOH", pka: "3.75", reason: "Lacks +I alkyl groups. Conjugate formate anion is more stable than acetate.", type: "Neutral" },
    ch3cooh: { name: "Acetic Acid (Ethanoic)", formula: "CH₃COOH", pka: "4.76", reason: "+I electron-donating methyl group concentrates negative charge on carboxylate, destabilizing the anion and decreasing acidity.", type: "EDG" },
    o_nitrobenzoic: { name: "o-Nitrobenzoic Acid", formula: "o-NO₂-C₆H₄-COOH", pka: "2.17", reason: "Dramatic Ortho-Effect: Steric Inhibition of Resonance (SIR) forces -COOH out of plane, maximizing carboxylate resonance over two oxygens.", type: "EWG" },
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
    { id: "carbonyl-reactivity", label: "Polarity & Reactivity", icon: <Atom className="w-3.5 h-3.5 shrink-0" /> },
    { id: "synthesis-matrix", label: "Synthesis Matrix", icon: <Layers className="w-3.5 h-3.5 shrink-0" /> },
    { id: "nucleophilic-addition", label: "A_N & Protect. Acetals", icon: <FlaskConical className="w-3.5 h-3.5 shrink-0" /> },
    { id: "ammonia-derivatives", label: "Ammonia & 2,4-DNP", icon: <Pipette className="w-3.5 h-3.5 shrink-0" /> },
    { id: "alpha-hydrogens", label: "Aldol & Cannizzaro", icon: <Split className="w-3.5 h-3.5 shrink-0" /> },
    { id: "reductions-oxidations", label: "Reductions & Oxidations", icon: <Flame className="w-3.5 h-3.5 shrink-0" /> },
    { id: "carboxylic-acidity-inspector", label: "Acidity & Ortho-Effect", icon: <Scale className="w-3.5 h-3.5 shrink-0" /> },
    { id: "acid-derivatives-hvz", label: "Derivatives & HVZ", icon: <Shield className="w-3.5 h-3.5 shrink-0" /> },
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
          CHEMISTRY INTERACTIVE MODULE — ALDEHYDES, KETONES &amp; CARBOXYLIC ACIDS (CLASS XII / UNIT XVII)
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 shrink-0" />
            ALDEHYDES, KETONES &amp; CARBOXYLIC ACIDS: A_N, ALDOL, CANNIZZARO, TOLLENS, ACIDITY &amp; HVZ
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            Bürgi-Dunitz Angle (107°) · 2,4-DNP &amp; Semicarbazide Trap · Clemmensen vs Wolff-Kishner · Popoff's Rule · Ortho-Effect &amp; HVZ α-Halogenation
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

      {/* TAB 1: CARBONYL POLARITY & REACTIVITY */}
      {activeTab === "carbonyl-reactivity" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Atom className="w-4 h-4 text-emerald-600 shrink-0" />
              Carbonyl Geometry, Bürgi-Dunitz Angle, &amp; Nucleophilic Addition Hierarchy
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-black text-slate-900 uppercase">Carbonyl Structure &amp; Bürgi-Dunitz Approach</span>
                <p className="text-slate-800 font-semibold">• <strong>Geometry:</strong> sp² planar, 120° bond angles with polarized Cδ+=Oδ- bond (χ = 3.5 vs 2.5).</p>
                <p className="text-slate-800 font-semibold">• <strong>Bürgi-Dunitz Angle:</strong> Nucleophile attacks at <strong>107°</strong> relative to C=O to maximize HOMO-LUMO π* overlap.</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                <span className="font-black text-emerald-950 uppercase">Reactivity Order (A_N)</span>
                <p className="text-emerald-900 font-bold font-mono">HCHO &gt; RCHO &gt; ArCHO &gt; R-CO-R &gt; Ar-CO-R &gt; Ar-CO-Ar</p>
                <p className="text-emerald-800 font-semibold">• <strong>Steric:</strong> Ketones have 2 bulky groups blocking approach.</p>
                <p className="text-emerald-800 font-semibold">• <strong>Electronic:</strong> +I alkyls reduce δ+ charge; aromatic +M resonance deactivates carbonyl.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SYNTHESIS MATRIX */}
      {activeTab === "synthesis-matrix" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600 shrink-0" />
              Name Reactions for Aldehyde &amp; Ketone Synthesis Matrix
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[10px]">
              <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
                <span className="font-black text-blue-950 block uppercase">Aldehyde Syntheses</span>
                <p className="text-blue-900 font-semibold">• <strong>Rosenmund:</strong> RCOCl + H₂ ──[Pd/BaSO₄, S]──► RCHO (Formaldehyde cannot be made!).</p>
                <p className="text-blue-900 font-semibold">• <strong>Stephen:</strong> R-CN + SnCl₂ + HCl ──► Imine ──[H₃O⁺]──► RCHO.</p>
                <p className="text-blue-900 font-semibold">• <strong>DIBAL-H (-78°C):</strong> Selectively reduces Esters &amp; Nitriles to Aldehydes (leaves C=C intact!).</p>
                <p className="text-blue-900 font-semibold">• <strong>Etard:</strong> Toluene + CrO₂Cl₂/CS₂ ──► Complex ──► Benzaldehyde.</p>
                <p className="text-blue-900 font-semibold">• <strong>Gattermann-Koch:</strong> Benzene + CO + HCl ──[AlCl₃/CuCl]──► Benzaldehyde.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1">
                <span className="font-black text-purple-950 block uppercase">Ketone Syntheses</span>
                <p className="text-purple-900 font-semibold">• <strong>Dialkylcadmium Route:</strong> 2 RCOCl + R'₂Cd ──► 2 R-CO-R' + CdCl₂ (Organocadmium is mild; does NOT react with ketones!).</p>
                <p className="text-purple-900 font-semibold">• <strong>Grignard Nitrile Route:</strong> R-CN + R'MgX ──► Imine Salt ──[H₃O⁺]──► Ketone (R-CO-R').</p>
                <p className="text-purple-900 font-semibold">• <strong>Friedel-Crafts Acylation:</strong> Ar-H + RCOCl ──[AlCl₃]──► Ar-CO-R.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NUCLEOPHILIC ADDITION & PROTECTING ACETALS */}
      {activeTab === "nucleophilic-addition" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-emerald-600 shrink-0" />
              Two-Step Nucleophilic Addition, Bisulfite Purification, &amp; Cyclic Acetals
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 block uppercase">Mechanism &amp; Bisulfite Purification</span>
                <p className="text-slate-800 font-semibold">• <strong>Step 1 (Slow RDS):</strong> Nu⁻ attacks sp² carbon ──► Tetrahedral sp³ alkoxide.</p>
                <p className="text-slate-800 font-semibold">• <strong>Step 2 (Fast):</strong> Protonation of alkoxide ──► Neutral addition product.</p>
                <p className="text-slate-800 font-semibold">• <strong>NaHSO₃ Addition:</strong> Forms water-soluble white crystalline adduct with ALL aldehydes and methyl ketones (regenerated by acid/base for purification!).</p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="font-black text-emerald-950 block uppercase">Cyclic Acetal Protecting Groups</span>
                <p className="text-emerald-900 font-semibold">• Carbonyl + Ethylene Glycol (dry HCl) ──► <strong>Cyclic 1,3-Dioxolane</strong> + H₂O.</p>
                <p className="text-emerald-900 font-semibold">• <strong>Inert To:</strong> Strong bases, Grignard reagents, and LiAlH₄.</p>
                <p className="text-emerald-950 font-bold">• <strong>Deprotection:</strong> Mild aqueous acid (H₃O⁺) regenerates original carbonyl cleanly.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AMMONIA DERIVATIVES & 2,4-DNP */}
      {activeTab === "ammonia-derivatives" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Pipette className="w-4 h-4 text-purple-600 shrink-0" />
              Ammonia Derivatives (pH ~3.5), Brady's 2,4-DNP Reagent, &amp; Semicarbazide Trap
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 block uppercase">Condensation Matrix (&gt;C=O + H₂N-Z ──► &gt;C=N-Z)</span>
                <p className="text-slate-800 font-semibold">• Hydroxylamine (H₂N-OH) ──► <strong>Oxime</strong> (&gt;C=N-OH).</p>
                <p className="text-slate-800 font-semibold">• Hydrazine (H₂N-NH₂) ──► <strong>Hydrazone</strong> (&gt;C=N-NH₂).</p>
                <p className="text-slate-800 font-semibold">• 2,4-DNP (Brady's Reagent) ──► <strong>Yellow/Orange/Red Hydrazone Ppt</strong> (Universal test for carbonyls!).</p>
                <p className="text-slate-800 font-semibold">• Semicarbazide (H₂N-NH-CONH₂) ──► <strong>Semicarbazone</strong>.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                <span className="font-black text-amber-950 block uppercase">The Semicarbazide Nucleophilicity Trap</span>
                <p className="text-amber-900 font-semibold">• Formula: H₂N⁽¹⁾-NH-CO-NH₂⁽²⁾.</p>
                <p className="text-amber-900 font-semibold">• <strong>NH₂⁽¹⁾ (Hydrazine end):</strong> Isolated lone pair ──► <strong>Nucleophilic</strong> (reacts with C=O).</p>
                <p className="text-amber-950 font-bold">• <strong>NH₂⁽²⁾ (Amide end):</strong> Lone pair delocalized into C=O via resonance (H₂N-C(=O)-NH₂ ⟷ H₂N-C(O⁻)=NH₂⁺) ──► <strong>NON-NUCLEOPHILIC!</strong></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ALDOL & CANNIZZARO */}
      {activeTab === "alpha-hydrogens" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Split className="w-4 h-4 text-emerald-600 shrink-0" />
              Reactions of α-Hydrogens: Aldol, Claisen-Schmidt, Cannizzaro, &amp; Iodoform
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="font-black text-emerald-950 block uppercase">HAS α-Hydrogen (n ≥ 1) ──► Aldol &amp; Iodoform</span>
                <p className="text-emerald-900 font-semibold">• <strong>Aldol (dil. NaOH):</strong> 2 CH₃CHO ──► CH₃-CH(OH)-CH₂-CHO ──[Δ, -H₂O]──► <strong>Crotonaldehyde</strong> (CH₃-CH=CH-CHO).</p>
                <p className="text-emerald-900 font-semibold">• <strong>Claisen-Schmidt:</strong> PhCHO + CH₃CHO ──► <strong>Cinnamaldehyde</strong> (PhCH=CH-CHO).</p>
                <p className="text-emerald-900 font-semibold">• <strong>Iodoform (I₂ + NaOH):</strong> CH₃CO- or CH₃CH(OH)- ──► <strong>CHI₃ ↓ Yellow Ppt</strong>.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1">
                <span className="font-black text-purple-950 block uppercase">LACKS α-Hydrogen (n = 0) ──► Cannizzaro</span>
                <p className="text-purple-900 font-semibold">• <strong>Cannizzaro (conc. 50% NaOH):</strong> 2 HCHO ──► CH₃OH + HCOOK.</p>
                <p className="text-purple-900 font-semibold">• 2 PhCHO ──► PhCH₂OH (Benzyl alcohol) + PhCOONa (Sodium benzoate).</p>
                <p className="text-purple-950 font-bold">• <strong>Crossed Cannizzaro:</strong> PhCHO + HCHO ──► PhCH₂OH + <strong>HCOONa (HCHO is exclusively oxidized!)</strong>.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: REDUCTIONS & OXIDATIONS */}
      {activeTab === "reductions-oxidations" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-600 shrink-0" />
              Deoxygenations (Clemmensen vs Wolff-Kishner), Tollens, Fehling, &amp; Popoff's Rule
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 block uppercase">Deoxygenation Reductions (&gt;C=O ──► &gt;CH₂)</span>
                <p className="text-slate-800 font-semibold">• <strong>Clemmensen:</strong> Zn-Hg / conc. HCl (ACIDIC; avoid for acid-sensitive -OH, ethers, alkenes).</p>
                <p className="text-slate-800 font-semibold">• <strong>Wolff-Kishner:</strong> NH₂NH₂ / KOH in ethylene glycol (BASIC; avoid for base-sensitive halides, esters).</p>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1">
                <span className="font-black text-rose-950 block uppercase">Oxidations &amp; Popoff's Rule</span>
                <p className="text-rose-900 font-semibold">• <strong>Tollens' Test:</strong> Ammoniacal AgNO₃ ──► Oxidizes BOTH Aliphatic &amp; Aromatic aldehydes to Silver Mirror (2 Ag⁰ ↓).</p>
                <p className="text-rose-900 font-semibold">• <strong>Fehling's Test:</strong> Cu²⁺ tartrate ──► Oxidizes <strong>ALIPHATIC Aldehydes ONLY</strong> to Red Cu₂O ↓ (PhCHO fails!).</p>
                <p className="text-rose-950 font-bold">• <strong>Popoff's Rule:</strong> Harsh ketone cleavage keeps &gt;C=O preferentially with the <strong>smaller alkyl group</strong>.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: CARBOXYLIC ACID ACIDITY & ORTHO-EFFECT */}
      {activeTab === "carboxylic-acidity-inspector" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-600 shrink-0" />
              Carboxylic Acid Acidity, Inductive Modulation, &amp; The Ortho-Effect
            </h4>
            <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200 text-[10px] space-y-1">
              <span className="font-black text-indigo-950 block">Acidity Hierarchy: Carboxylic Acids (pKa 4–5) &gt; Phenols (pKa 10) &gt; Alcohols (pKa 16)</span>
              <p className="text-indigo-900 font-semibold">• Carboxylate anion (R-COO⁻) delocalizes negative charge EQUALLY over TWO electronegative Oxygen atoms.</p>
            </div>

            {/* Interactive Inductive Acidity Inspector */}
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-300 space-y-2 text-[10px]">
              <span className="font-black text-indigo-950 uppercase tracking-wider block">Interactive Inductive Acidity Inspector</span>
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(acidSpectrum).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedAcid(key)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                      selectedAcid === key ? "bg-indigo-600 text-white border-indigo-600 shadow-xs" : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {acidSpectrum[key].name.split(" ")[0]}
                  </button>
                ))}
              </div>
              <div className="p-3 rounded-lg bg-white border border-indigo-300 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{acidSpectrum[selectedAcid].name} ({acidSpectrum[selectedAcid].formula})</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-indigo-100 text-indigo-900">
                    pKa ≈ {acidSpectrum[selectedAcid].pka} ({acidSpectrum[selectedAcid].type})
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-700 leading-relaxed">{acidSpectrum[selectedAcid].reason}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: DERIVATIVES & HVZ */}
      {activeTab === "acid-derivatives-hvz" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
              Acid Derivative Reactivity Hierarchy, Decarboxylation &amp; The HVZ Reaction
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 block uppercase">Acid Derivative Reactivity</span>
                <p className="text-slate-900 font-bold font-mono">Acyl Chloride &gt; Acid Anhydride &gt; Ester &gt; Amide</p>
                <p className="text-slate-800 font-semibold">• <strong>SOCl₂ Advantage:</strong> RCOOH + SOCl₂ ──► RCOCl + SO₂ ↑ + HCl ↑ (Gaseous byproducts escape!).</p>
                <p className="text-slate-800 font-semibold">• <strong>Soda-Lime:</strong> RCOONa + NaOH ──[CaO, Δ]──► R-H (Alkane with 1 less carbon).</p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="font-black text-emerald-950 block uppercase">Hell-Volhard-Zelinsky (HVZ) Reaction</span>
                <p className="text-emerald-900 font-semibold">• R-CH₂-COOH + X₂ ──[1. Red P, 2. H₂O]──► <strong>R-CH(X)-COOH (α-Halo Acid)</strong> + HX.</p>
                <p className="text-emerald-900 font-semibold">• Operates via acid halide enol intermediate.</p>
                <p className="text-emerald-950 font-bold">• <strong>Constraint:</strong> Formic acid (HCOOH) and Trimethylacetic acid ((CH₃)₃C-COOH) FAIL the HVZ reaction (lack α-H!).</p>
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
              All 10 High-Yield NEST Carbonyl &amp; Carboxylic Acid Misconceptions &amp; Traps
            </h4>
            <div className="space-y-2">
              {carbonylTraps.map((trap) => {
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
                placeholder="Search carbonyl & carboxylic acid terms..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {["All", "Carbonyls & Addition", "Enolate Chemistry", "Oxidation & Reduction", "Carboxylic & Derivatives"].map((cat) => (
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
              <Award className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-emerald-500" />
              <h4 className="text-xl sm:text-2xl font-black text-slate-900">Your Score: {score} / {mcqData.length}</h4>
              <p className="text-sm font-semibold text-slate-600">
                {score >= 17 ? "Outstanding! Mastery level for NEST & IChO Aldehydes, Ketones & Carboxylic Acids Module." : score >= 12 ? "Good performance — review incorrect explanations." : "Needs practice — revisit earlier tabs and retake."}
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
                      <span className="text-[9px] font-black uppercase tracking-wider text-emerald-700">Detailed Solution &amp; Mechanistic Explanation</span>
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

export default AldehydesKetonesCarboxylicDiagram;
