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
} from "lucide-react";

// ============================================================================
// 1. DATA: STRUCTURAL ANOMALIES TABLE
// ============================================================================
interface StructuralAnomaly {
  compound: string;
  formula: string;
  formulaON: string;
  trueON: string;
  feature: string;
}

const structuralAnomaliesMatrix: StructuralAnomaly[] = [
  { compound: "Chromium Peroxide", formula: "CrO₅", formulaON: "Cr = +10", trueON: "Cr = +6 (Four O at -1, One O at -2)", feature: "Butterfly structure with 2 peroxy linkages" },
  { compound: "Caro's Acid", formula: "H₂SO₅", formulaON: "S = +8", trueON: "S = +6 (Two O at -1, Three O at -2)", feature: "Monoperoxysulfuric acid with 1 peroxy bond" },
  { compound: "Marshall's Acid", formula: "H₂S₂O₈", formulaON: "S = +7", trueON: "Both S atoms = +6", feature: "Peroxydisulfuric acid with 1 peroxy bridge (-O-O-)" },
  { compound: "Bleaching Powder", formula: "CaOCl₂", formulaON: "Average Cl = 0", trueON: "Cl(+1) in OCl⁻ and Cl(-1) in Cl⁻", feature: "Mixed salt containing Hypochlorite and Chloride" },
  { compound: "Tribromooctaoxide", formula: "Br₃O₈", formulaON: "Average Br = +16/3", trueON: "Two Br(+6) and One Br(+4)", feature: "Terminal Br atoms = +6; Central Br atom = +4" },
  { compound: "Tetrathionate Ion", formula: "S₄O₆²⁻", formulaON: "Average S = +2.5", trueON: "Two S(+5) and Two S(0)", feature: "Central -S(0)-S(0)- linkage; terminal -SO₃⁻ = +5" },
  { compound: "Sodium Thiosulfate", formula: "Na₂S₂O₃", formulaON: "Average S = +2", trueON: "Central S(+5) and Terminal S(-1)", feature: "Central S bonded to 3 oxygens (+5); terminal sulfide (-1)" },
  { compound: "Magnetite", formula: "Fe₃O₄", formulaON: "Average Fe = +8/3", trueON: "One Fe(+2) and Two Fe(+3)", feature: "Mixed stoichiometry oxide (FeO · Fe₂O₃, 1:2 ratio)" },
];

// ============================================================================
// 2. DATA: VARIABLE n-FACTOR MATRIX
// ============================================================================
interface NFactorRow {
  reagent: string;
  medium: string;
  reaction: string;
  nFactor: string;
  emFormula: string;
  emValue: string;
}

const nFactorMatrix: NFactorRow[] = [
  { reagent: "KMnO₄", medium: "Acidic Medium (pH < 7)", reaction: "MnO₄⁻ (+7) + 5e⁻ + 8H⁺ → Mn²⁺ (+2) + 4H₂O", nFactor: "n = 5", emFormula: "M / 5", emValue: "31.61 g/eq" },
  { reagent: "KMnO₄", medium: "Neutral / Faintly Basic (pH 7–9)", reaction: "MnO₄⁻ (+7) + 3e⁻ + 2H₂O → MnO₂ (+4) + 4OH⁻", nFactor: "n = 3", emFormula: "M / 3", emValue: "52.68 g/eq" },
  { reagent: "KMnO₄", medium: "Strongly Basic Medium (pH > 12)", reaction: "MnO₄⁻ (+7) + e⁻ → MnO₄²⁻ (+6)", nFactor: "n = 1", emFormula: "M / 1", emValue: "158.04 g/eq" },
  { reagent: "K₂Cr₂O₇", medium: "Acidic Medium ONLY", reaction: "Cr₂O₇²⁻ (+6) + 14H⁺ + 6e⁻ → 2Cr³⁺ (+3) + 7H₂O", nFactor: "n = 6", emFormula: "M / 6", emValue: "49.03 g/eq" },
  { reagent: "Ferrous Oxalate (FeC₂O₄)", medium: "Acidic (Oxidation to Fe³⁺ + CO₂)", reaction: "Fe²⁺ → Fe³⁺ (n=1) + C₂O₄²⁻ → 2CO₂ (n=2)", nFactor: "n = 3", emFormula: "M / 3", emValue: "47.95 g/eq" },
  { reagent: "Sodium Thiosulfate (Hypo)", medium: "Iodometry (I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻)", reaction: "2S₂O₃²⁻ (+2) → S₄O₆²⁻ (+2.5) + 2e⁻", nFactor: "n = 1", emFormula: "M / 1", emValue: "158.11 g/eq" },
  { reagent: "Ferric Oxalate (Fe₂(C₂O₄)₃)", medium: "Acidic (Reduction to Fe²⁺)", reaction: "2Fe³⁺ (+3) + 2e⁻ → 2Fe²⁺ (+2)", nFactor: "n = 2", emFormula: "M / 2", emValue: "189.9 g/eq" },
  { reagent: "Cuprous Sulfide (Cu₂S)", medium: "Oxidation to Cu²⁺ + SO₂", reaction: "2Cu⁺ → 2Cu²⁺ (n=2) + S²⁻ → SO₂ (n=6)", nFactor: "n = 8", emFormula: "M / 8", emValue: "19.9 g/eq" },
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

const redoxTraps: Misconception[] = [
  { id: "t1", trap: "The oxidation state of Sulfur in Caro's acid (H₂SO₅) is +8.", reality: "Sulfur's maximum oxidation state cannot exceed +6 (its valence group). Structure contains 1 peroxy bond (-O-O-), giving true S = +6.", tip: "Formula summation fails for peroxy compounds; always draw Lewis structure." },
  { id: "t2", trap: "Fluorine can undergo disproportionation in concentrated alkaline solutions.", reality: "Fluorine is the most electronegative element and NEVER exhibits positive oxidation states. It forms OF₂ and cannot disproportionate.", tip: "2F₂ + 2OH⁻ → 2F⁻ + OF₂ + H₂O is a redox reaction, NOT disproportionation." },
  { id: "t3", trap: "Potassium Permanganate (KMnO₄) has an n-factor of 5 in all media.", reality: "n-factor is 5 in Acidic medium (Mn²⁺), 3 in Neutral/Faintly basic medium (MnO₂), and 1 in Strongly basic medium (MnO₄²⁻).", tip: "Always verify the reaction medium / pH condition in the problem stem." },
  { id: "t4", trap: "In Ferrous Oxalate (FeC₂O₄), n-factor is 2 during oxidation to Fe³⁺ and CO₂.", reality: "n-factor is 3 (1 from Fe²⁺ → Fe³⁺ PLUS 2 from C₂O₄²⁻ → 2CO₂).", tip: "Sum the electron changes for ALL elements oxidized within the formula unit." },
  { id: "t5", trap: "Hypo (Na₂S₂O₃) has an n-factor of 2 in iodometric titrations.", reality: "n-factor of Hypo is 1 when converted to tetrathionate (S₄O₆²⁻). Change per mole = 2 S atoms × 0.5 = 1.", tip: "Equivalent Mass of Hypo = Molar Mass (158.11 g/eq)." },
  { id: "t6", trap: "The average oxidation state of iron in Magnetite (Fe₃O₄) is +3.", reality: "Average ON is +8/3. It is a mixed oxide (FeO · Fe₂O₃) containing one Fe²⁺ and two Fe³⁺ ions in 1:2 ratio.", tip: "Fe²⁺ : Fe³⁺ = 1 : 2 in crystal lattice." },
  { id: "t7", trap: "Potassium Dichromate (K₂Cr₂O₇) acts as an effective oxidant in basic medium.", reality: "K₂Cr₂O₇ acts as an oxidant STRICTLY in Acidic medium (n=6). In base, Cr₂O₇²⁻ converts to yellow CrO₄²⁻ without redox change.", tip: "Cr₂O₇²⁻ + 2OH⁻ ⇌ 2CrO₄²⁻ + H₂O is an acid-base equilibrium, not a redox reaction." },
  { id: "t8", trap: "In a neutral compound, the sum of oxidation numbers is equal to N_A.", reality: "Sum of oxidation numbers in any neutral molecule is EXACTLY ZERO (∑ ON = 0). For polyatomic ions, ∑ ON = ionic charge.", tip: "Charge conservation is absolute in oxidation number calculations." },
  { id: "t9", trap: "Comproportionation is identical to disproportionation.", reality: "Comproportionation is the exact REVERSE of disproportionation: two different oxidation states react to form a single intermediate state.", tip: "Example: IO₃⁻(+5) + 5I⁻(-1) + 6H⁺ → 3I₂(0) + 3H₂O." },
  { id: "t10", trap: "Starch indicator turns deep blue at the end point of an iodometric titration.", reality: "The deep blue starch-iodine complex DISAPPEARS (turns colorless) at the end point when all free I₂ is consumed by Hypo.", tip: "Blue appears in iodimetry; blue disappears in iodometry." },
];

// ============================================================================
// 4. DATA: MASTER GLOSSARY (40 DEFINITIONS)
// ============================================================================
interface GlossaryTerm {
  term: string;
  definition: string;
  category: "Fundamental Principles" | "Oxidation States & Peroxides" | "Reaction Classes" | "Equivalence & Titrations";
}

const masterGlossary: GlossaryTerm[] = [
  { term: "Acidic Permanganometry", definition: "Titration using KMnO₄ in H₂SO₄ medium where MnO₄⁻ (+7) reduces to Mn²⁺ (+2) with n-factor = 5.", category: "Equivalence & Titrations" },
  { term: "Alkaline Permanganometry", definition: "Reaction using KMnO₄ in strongly basic medium where MnO₄⁻ (+7) reduces to MnO₄²⁻ (+6) with n-factor = 1.", category: "Equivalence & Titrations" },
  { term: "Anode (+)", definition: "The electrode where oxidation (loss of electrons / de-electronation) occurs in all electrochemical cells.", category: "Fundamental Principles" },
  { term: "Baeyer's Reagent", definition: "Cold, dilute, faintly alkaline KMnO₄ solution (n-factor = 3) used to test for unsaturation (C=C or C≡C).", category: "Equivalence & Titrations" },
  { term: "Bleaching Powder", definition: "CaOCl₂, containing Hypochlorite (Cl = +1) and Chloride (Cl = -1).", category: "Oxidation States & Peroxides" },
  { term: "Caro's Acid", definition: "Peroxymonosulfuric acid (H₂SO₅), featuring one peroxy bond with Sulfur in +6 oxidation state.", category: "Oxidation States & Peroxides" },
  { term: "Cathode (-)", definition: "The electrode where reduction (gain of electrons / electronation) occurs in all electrochemical cells.", category: "Fundamental Principles" },
  { term: "Chromium Peroxide (CrO₅)", definition: "A butterfly-structured neutral peroxide containing two peroxy bonds with Chromium in +6 oxidation state.", category: "Oxidation States & Peroxides" },
  { term: "Comproportionation", definition: "A redox reaction where two reactants containing the same element in different oxidation states form a single intermediate product.", category: "Reaction Classes" },
  { term: "De-electronation", definition: "The removal or loss of one or more electrons from a chemical species (Oxidation).", category: "Fundamental Principles" },
  { term: "Disproportionation", definition: "A redox reaction where a single element in an intermediate oxidation state undergoes simultaneous self-oxidation and self-reduction.", category: "Reaction Classes" },
  { term: "Electronation", definition: "The addition or gain of one or more electrons by a chemical species (Reduction).", category: "Fundamental Principles" },
  { term: "Equivalent Mass (E.M.)", definition: "The molar mass of a substance divided by its n-factor (E.M. = M / n).", category: "Equivalence & Titrations" },
  { term: "Formal Charge", definition: "The theoretical electronic charge assigned to an individual atom in a Lewis structure.", category: "Oxidation States & Peroxides" },
  { term: "Half-Reaction", definition: "Either the oxidation or reduction component reaction of a complete balanced redox system.", category: "Reaction Classes" },
  { term: "Iodimetry", definition: "Direct titration of a reducing agent using a standardized Iodine (I₂) solution; deep blue starch complex appears at end point.", category: "Equivalence & Titrations" },
  { term: "Iodometry", definition: "Indirect titration where an oxidant liberates free I₂ from excess KI, and the free I₂ is titrated against standard Hypo; blue color disappears.", category: "Equivalence & Titrations" },
  { term: "Marshall's Acid", definition: "Peroxydisulfuric acid (H₂S₂O₈), containing a peroxy bridge with both Sulfur atoms in +6 state.", category: "Oxidation States & Peroxides" },
  { term: "n-Factor", definition: "The total change in oxidation number per mole of reactant in a redox process, or acidity/basicity/charge in non-redox systems.", category: "Equivalence & Titrations" },
  { term: "Normality (N)", definition: "The number of equivalents of solute per liter of solution (N = M × n-factor).", category: "Equivalence & Titrations" },
  { term: "Oxidant (Oxidizing Agent)", definition: "A chemical species that gains electrons, causing oxidation of another species while being reduced itself.", category: "Fundamental Principles" },
  { term: "Oxidation Number (ON)", definition: "The formal charge an atom would retain if all covalent bonding pairs were assigned entirely to the more electronegative atom.", category: "Oxidation States & Peroxides" },
  { term: "Peroxy Linkage", definition: "A single covalent bond between two oxygen atoms (-O-O-) where each oxygen has an oxidation number of -1.", category: "Oxidation States & Peroxides" },
  { term: "Reductant (Reducing Agent)", definition: "A chemical species that loses electrons, causing reduction of another species while being oxidized itself.", category: "Fundamental Principles" },
  { term: "Self-Indicator", definition: "A titrant that changes color noticeably at the equivalence point without requiring an added indicator (e.g., KMnO₄).", category: "Equivalence & Titrations" },
  { term: "Sodium Thiosulfate (Hypo)", definition: "Na₂S₂O₃, used as a standard reductant (n=1) in iodometric titrations to reduce free I₂ to I⁻.", category: "Equivalence & Titrations" },
  { term: "Starch Indicator", definition: "An indicator forming a deep blue inclusion complex with free I₂, used in iodometry/iodimetry.", category: "Equivalence & Titrations" },
  { term: "Superoxide", definition: "An oxide containing the O₂⁻ anion where oxygen has an oxidation state of -1/2 (e.g., KO₂).", category: "Oxidation States & Peroxides" },
  { term: "Tetrathionate Ion", definition: "S₄O₆²⁻, the oxidation product of thiosulfate containing two +5 and two zero-valent sulfur atoms.", category: "Oxidation States & Peroxides" },
];

// ============================================================================
// 5. DATA: ALL 20 NEST ASSESSMENT QUESTIONS (MATCHING USER TEXT)
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
    question: "What are the individual, true structural oxidation states of the four Sulfur atoms in the Tetrathionate anion (S₄O₆²⁻), and what is the average oxidation state of Sulfur calculated from its empirical formula?",
    options: [
      { key: "A", text: "True states: All four S = +2.5; Average = +2.5" },
      { key: "B", text: "True states: Two S = +5 and Two S = 0; Average = +2.5" },
      { key: "C", text: "True states: Two S = +6 and Two S = -1; Average = +2.5" },
      { key: "D", text: "True states: Three S = +3 and One S = +1; Average = +2.5" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "1. Structure of S₄O₆²⁻: Contains a central chain: [O₃S⁽¹⁾ - S⁽²⁾ - S⁽³⁾ - SO₃⁽⁴⁾]²⁻. 2. Central S⁽²⁾ and S⁽³⁾ are bonded only to sulfur (-S-S-), so ON = 0. 3. Terminal S⁽¹⁾ and S⁽⁴⁾ are bonded to 3 oxygens and 1 sulfur, so ON = +5. 4. Average ON = [2(+5) + 2(0)] / 4 = +2.5.",
  },
  {
    id: 2,
    part: "A",
    question: "What is the n-factor and equivalent mass of Ferrous Oxalate (FeC₂O₄, M = 143.85 g/mol) when it is completely oxidized to Fe³⁺ and CO₂ in an acidic KMnO₄ titration?",
    options: [
      { key: "A", text: "n-factor = 1; E.M. = M/1 = 143.85 g/eq" },
      { key: "B", text: "n-factor = 2; E.M. = M/2 = 71.93 g/eq" },
      { key: "C", text: "n-factor = 3; E.M. = M/3 = 47.95 g/eq" },
      { key: "D", text: "n-factor = 5; E.M. = M/5 = 28.77 g/eq" },
    ],
    correctKeys: ["C"],
    type: "single",
    explanation: "Both cation and anion undergo oxidation: Fe²⁺ → Fe³⁺ + e⁻ (n₁ = 1) PLUS C₂O₄²⁻ → 2CO₂ + 2e⁻ (n₂ = 2). Total n-factor = 1 + 2 = 3. E.M. = 143.85 / 3 = 47.95 g/eq.",
  },
  {
    id: 3,
    part: "A",
    question: "A 25.0 mL sample of an aqueous solution containing Hydrogen Peroxide (H₂O₂) requires 20.0 mL of 0.020 M KMnO₄ solution for complete reaction in acidic medium. What is the molarity (M) of the H₂O₂ solution?",
    options: [
      { key: "A", text: "0.040 M" },
      { key: "B", text: "0.080 M" },
      { key: "C", text: "0.016 M" },
      { key: "D", text: "0.100 M" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "Equivalents of H₂O₂ = Equivalents of KMnO₄ ⟹ (M₁ × n₁) V₁ = (M₂ × n₂) V₂. KMnO₄ in acid has n=5; H₂O₂ has n=2. M₁ × 2 × 25.0 = 0.020 × 5 × 20.0 ⟹ 50.0 M₁ = 2.0 ⟹ M₁ = 0.040 M.",
  },
  {
    id: 4,
    part: "A",
    question: "What is the n-factor of a substance undergoing a DISPROPORTIONATION reaction where 1 mole of reactant forms products with change in oxidation number n₁ = 2 (oxidation pathway) and n₂ = 4 (reduction pathway)?",
    options: [
      { key: "A", text: "n_net = 6" },
      { key: "B", text: "n_net = 1.33" },
      { key: "C", text: "n_net = 3" },
      { key: "D", text: "n_net = 2" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "For a single reactant undergoing disproportionation: n_net = (n₁ · n₂) / (n₁ + n₂) = (2 × 4) / (2 + 4) = 8 / 6 = 1.33.",
  },
  {
    id: 5,
    part: "A",
    question: "In an iodometric titration, 0.10 moles of Potassium Dichromate (K₂Cr₂O₇) is reacted with excess KI in acidic medium to liberate free Iodine (I₂). The liberated I₂ is subsequently titrated against standard Sodium Thiosulfate (Na₂S₂O₃, Hypo). How many moles of Hypo are required for complete reaction with the liberated Iodine?",
    options: [
      { key: "A", text: "0.10 mol" },
      { key: "B", text: "0.30 mol" },
      { key: "C", text: "0.60 mol" },
      { key: "D", text: "1.20 mol" },
    ],
    correctKeys: ["C"],
    type: "single",
    explanation: "Equivalents of K₂Cr₂O₇ = Equivalents of I₂ liberated = Equivalents of Hypo. Equivalents of K₂Cr₂O₇ = 0.10 mol × 6 = 0.60 eq. Since Hypo has n=1, Moles of Hypo = 0.60 / 1 = 0.60 mol.",
  },
  {
    id: 6,
    part: "A",
    question: "What are the true oxidation states of Chromium in Chromium Peroxide (CrO₅) and Sulfur in Caro's Acid (H₂SO₅), respectively?",
    options: [
      { key: "A", text: "Cr = +10, S = +8" },
      { key: "B", text: "Cr = +6, S = +6" },
      { key: "C", text: "Cr = +6, S = +4" },
      { key: "D", text: "Cr = +4, S = +6" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "CrO₅ has a butterfly structure with 2 peroxy linkages (4 peroxy O at -1, 1 oxide O at -2) ⟹ Cr = +6. H₂SO₅ has 1 peroxy linkage (2 peroxy O at -1, 3 oxide O at -2) ⟹ S = +6.",
  },
  {
    id: 7,
    part: "A",
    question: "Which of the following halogens CANNOT undergo a disproportionation reaction when treated with hot concentrated sodium hydroxide solution?",
    options: [
      { key: "A", text: "Cl₂" },
      { key: "B", text: "Br₂" },
      { key: "C", text: "I₂" },
      { key: "D", text: "F₂" },
    ],
    correctKeys: ["D"],
    type: "single",
    explanation: "Fluorine (F₂) is the most electronegative element and NEVER exhibits a positive oxidation state; it forms OF₂ (+2 for O) and cannot undergo disproportionation.",
  },
  {
    id: 8,
    part: "A",
    question: "What is the n-factor of Phosphorous Acid (H₃PO₃) when it acts as a reducing agent in a reaction where it is oxidized completely to Phosphoric Acid (H₃PO₄)?",
    options: [
      { key: "A", text: "n = 1" },
      { key: "B", text: "n = 2" },
      { key: "C", text: "n = 3" },
      { key: "D", text: "n = 5" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "In H₃PO₃, P is +3. In H₃PO₄, P is +5. n-factor = |+5 - (+3)| = 2.",
  },
  {
    id: 9,
    part: "A",
    question: "When 1 mole of Potassium Chlorate (KClO₃) decomposes thermally: 2 KClO₃(s) → 2 KCl(s) + 3 O₂(g), how many total moles of electrons are transferred in the redox process per mole of KClO₃?",
    options: [
      { key: "A", text: "2 mol e⁻" },
      { key: "B", text: "4 mol e⁻" },
      { key: "C", text: "6 mol e⁻" },
      { key: "D", text: "12 mol e⁻" },
    ],
    correctKeys: ["C"],
    type: "single",
    explanation: "Cl in KClO₃ (+5) reduces to Cl⁻ in KCl (-1), transferring 6 electrons per Cl atom. Oxygen (-2) oxidizes to O₂ (0), losing 6 electrons across 3 O atoms. Total = 6 moles of e⁻ per mole of KClO₃.",
  },
  {
    id: 10,
    part: "A",
    question: "What is the role of Diphenylamine in the redox titration of Fe²⁺ with Potassium Dichromate (K₂Cr₂O₇)?",
    options: [
      { key: "A", text: "Self-indicator that turns purple" },
      { key: "B", text: "Internal Redox Indicator that turns deep blue-violet upon oxidation at the end point" },
      { key: "C", text: "Primary standard salt" },
      { key: "D", text: "Precipitating agent for chromium ions" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "K₂Cr₂O₇ is not a self-indicator. Diphenylamine is an internal indicator; when all Fe²⁺ is oxidized, excess Cr₂O₇²⁻ oxidizes diphenylamine to diphenylbenzidine violet, turning the solution deep blue-violet.",
  },
  {
    id: 11,
    part: "B",
    question: "Which of the following compounds contain at least ONE Oxygen atom in an Oxidation State of -1 (Peroxy linkage)? (Select all that apply)",
    options: [
      { key: "A", text: "Caro's Acid (H₂SO₅)" },
      { key: "B", text: "Marshall's Acid (H₂S₂O₈)" },
      { key: "C", text: "Chromium Peroxide (CrO₅)" },
      { key: "D", text: "Hydrogen Peroxide (H₂O₂)" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four compounds contain peroxy linkages (-O-O-) where peroxy oxygen atoms have an oxidation state of -1.",
  },
  {
    id: 12,
    part: "B",
    question: "Select the valid statements regarding the oxidation state and behavior of Potassium Permanganate (KMnO₄): (Select all that apply)",
    options: [
      { key: "A", text: "Manganese is in its maximum +7 oxidation state in KMnO₄" },
      { key: "B", text: "In acidic medium, KMnO₄ reduces to Mn²⁺ with an n-factor of 5" },
      { key: "C", text: "In neutral/faintly alkaline medium, KMnO₄ reduces to MnO₂ with an n-factor of 3" },
      { key: "D", text: "In strongly basic medium, KMnO₄ reduces to MnO₄²⁻ with an n-factor of 1" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four statements correctly state the oxidation state of Mn and its n-factors across the three distinct pH regimes.",
  },
  {
    id: 13,
    part: "B",
    question: "Which of the following chemical reactions represent DISPROPORTIONATION processes? (Select all that apply)",
    options: [
      { key: "A", text: "2 H₂O₂(aq) → 2 H₂O(l) + O₂(g)" },
      { key: "B", text: "P₄(s) + 3 OH⁻(aq) + 3 H₂O(l) → PH₃(g) + 3 H₂PO₂⁻(aq)" },
      { key: "C", text: "3 Cl₂(g) + 6 OH⁻(aq, hot) → 5 Cl⁻(aq) + ClO₃⁻(aq) + 3 H₂O(l)" },
      { key: "D", text: "CuSO₄(aq) + Zn(s) → ZnSO₄(aq) + Cu(s)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are classic disproportionations (O: -1 → -2, 0; P: 0 → -3, +1; Cl: 0 → -1, +5). • D is a single metal displacement reaction.",
  },
  {
    id: 14,
    part: "B",
    question: "Select the correct options regarding Iodometric and Iodimetric Titrations: (Select all that apply)",
    options: [
      { key: "A", text: "Iodimetry involves direct titration of a reducing agent using a standard Iodine (I₂) solution" },
      { key: "B", text: "Iodometry involves indirect titration where an oxidant liberates free I₂ from excess KI, followed by titration against standard Hypo" },
      { key: "C", text: "Starch indicator forms a deep blue inclusion complex with free I₂" },
      { key: "D", text: "The end point of an iodometric titration is marked by the appearance of a deep blue color" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct. • D is incorrect: in iodometry, the end point is marked by the DISAPPEARANCE (colorless) of the blue color as free I₂ is consumed.",
  },
  {
    id: 15,
    part: "B",
    question: "Which of the following chemical species have an n-factor equal to 6 in appropriate redox reactions? (Select all that apply)",
    options: [
      { key: "A", text: "K₂Cr₂O₇ as an oxidant in acidic medium" },
      { key: "B", text: "KCr(SO₄)₂ · 12H₂O (Chrome Alum) when Cr³⁺ is oxidized to CrO₄²⁻" },
      { key: "C", text: "KMnO₄ in acidic medium" },
      { key: "D", text: "Fe₂(SO₄)₃ when reduced to Fe²⁺" },
    ],
    correctKeys: ["A", "B"],
    type: "multi",
    explanation: "• A is correct: Cr₂O₇²⁻ (+6) → 2Cr³⁺ (+3) ⟹ n = 2 × 3 = 6. • B is correct: Chrome Alum oxidation gives n = 6. • C has n = 5. • D has n = 2.",
  },
  {
    id: 16,
    part: "B",
    question: "Select the correct statements regarding the oxidation state of Oxygen in different chemical species: (Select all that apply)",
    options: [
      { key: "A", text: "In OF₂, oxygen has an oxidation state of +2" },
      { key: "B", text: "In O₂F₂, oxygen has an oxidation state of +1" },
      { key: "C", text: "In Potassium Superoxide (KO₂), oxygen has an oxidation state of -1/2" },
      { key: "D", text: "In Hydrogen Peroxide (H₂O₂), oxygen has an oxidation state of -2" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: OF₂ (+2), O₂F₂ (+1), and KO₂ (-1/2). • D is incorrect: in H₂O₂, oxygen is -1 (peroxide).",
  },
  {
    id: 17,
    part: "B",
    question: "Which of the following represent COMPROPORTIONATION (Conproportionation) reactions? (Select all that apply)",
    options: [
      { key: "A", text: "Ag(s) + Ag²⁺(aq) → 2 Ag⁺(aq)" },
      { key: "B", text: "IO₃⁻(aq) + 5 I⁻(aq) + 6 H⁺(aq) → 3 I₂(s) + 3 H₂O(l)" },
      { key: "C", text: "NH₄NO₃(s) → N₂O(g) + 2 H₂O(l)" },
      { key: "D", text: "2 Na(s) + Cl₂(g) → 2 NaCl(s)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are comproportionations where two different oxidation states form a single intermediate state. • D is a standard combination redox reaction.",
  },
  {
    id: 18,
    part: "B",
    question: "Select the correct statements regarding Equivalent Mass and Normality: (Select all that apply)",
    options: [
      { key: "A", text: "Normality = Molarity × n-factor" },
      { key: "B", text: "The equivalent mass of a substance can vary depending on the specific chemical reaction it undergoes" },
      { key: "C", text: "In all complete chemical reactions, 1 Equivalent of reactant A reacts with exactly 1 Equivalent of reactant B" },
      { key: "D", text: "1 M solution of KMnO₄ in acidic medium is equal to 1 N" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct. • D is incorrect: for KMnO₄ in acid, n = 5 ⟹ 1 M = 5 N, NOT 1 N.",
  },
  {
    id: 19,
    part: "B",
    question: "Which of the following compounds contain Nitrogen in a POSITIVE oxidation state? (Select all that apply)",
    options: [
      { key: "A", text: "Nitric Acid (HNO₃)" },
      { key: "B", text: "Nitrous Acid (HNO₂)" },
      { key: "C", text: "Dinitrogen Pentoxide (N₂O₅)" },
      { key: "D", text: "Ammonia (NH₃)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A (N=+5), B (N=+3), and C (N=+5) contain Nitrogen in positive states. • D (NH₃) contains Nitrogen in -3 state.",
  },
  {
    id: 20,
    part: "B",
    question: "Select the valid statements regarding Sodium Thiosulfate (Hypo, Na₂S₂O₃) in iodometry: (Select all that apply)",
    options: [
      { key: "A", text: "Hypo reduces free I₂ to Iodide ions (I⁻)" },
      { key: "B", text: "Hypo is oxidized to Sodium Tetrathionate (Na₂S₄O₆)" },
      { key: "C", text: "The n-factor of Hypo in this reaction is 1" },
      { key: "D", text: "The average oxidation state of Sulfur increases from +2 in thiosulfate to +2.5 in tetrathionate" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four options represent accurate chemical facts regarding the iodometric oxidation of thiosulfate to tetrathionate by iodine.",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
type Tab = "classical-electronic" | "anomalies" | "classification" | "balancing" | "equivalence" | "nfactor-matrix" | "titrations" | "applications" | "traps" | "glossary" | "selftest";

export const RedoxReactionsDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("classical-electronic");
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
    { id: "classical-electronic", label: "Redox Concepts", icon: <Zap className="w-3.5 h-3.5 shrink-0" /> },
    { id: "anomalies", label: "ON Rules & Anomalies", icon: <Atom className="w-3.5 h-3.5 shrink-0" /> },
    { id: "classification", label: "5 Reaction Classes", icon: <Split className="w-3.5 h-3.5 shrink-0" /> },
    { id: "balancing", label: "Half-Reaction Balancing", icon: <Scale className="w-3.5 h-3.5 shrink-0" /> },
    { id: "equivalence", label: "Equivalence & Normality", icon: <Activity className="w-3.5 h-3.5 shrink-0" /> },
    { id: "nfactor-matrix", label: "Variable n-Factor Matrix", icon: <Boxes className="w-3.5 h-3.5 shrink-0" /> },
    { id: "titrations", label: "Redox Titrations & Hypo", icon: <Beaker className="w-3.5 h-3.5 shrink-0" /> },
    { id: "applications", label: "Industrial Applications", icon: <Flame className="w-3.5 h-3.5 shrink-0" /> },
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
          CHEMISTRY INTERACTIVE MODULE — CHAPTER 7
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 shrink-0" />
            REDOX REACTIONS
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            De-electronation &amp; Electronation · Structural Peroxy Anomalies · Disproportionation vs Comproportionation · Ion-Electron Balancing · Variable n-Factor Matrix · Iodometry &amp; Hypo Mechanics · NEST 20-Q Module
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

      {/* TAB 1: REDOX CONCEPTS */}
      {activeTab === "classical-electronic" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600 shrink-0" />
              Classical vs. Electronic Redox Concepts &amp; Agent Roles
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-200 space-y-1.5">
                <span className="text-xs font-black text-orange-950 uppercase tracking-wider block">Oxidation Process</span>
                <p className="text-[11px] text-orange-900 font-semibold">• Classical: Gain of Oxygen / Loss of Hydrogen.</p>
                <p className="text-[11px] text-orange-900 font-semibold">• Electronic: <strong>De-electronation (Loss of e⁻)</strong>.</p>
                <p className="text-[11px] text-orange-900 font-semibold">• Oxidation Number: <strong>INCREASES</strong> algebraically.</p>
                <p className="text-[11px] text-orange-900 font-semibold">• Agent: Performed by a <strong>Reducing Agent (Reductant)</strong> which is oxidized.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1.5">
                <span className="text-xs font-black text-blue-950 uppercase tracking-wider block">Reduction Process</span>
                <p className="text-[11px] text-blue-900 font-semibold">• Classical: Loss of Oxygen / Gain of Hydrogen.</p>
                <p className="text-[11px] text-blue-900 font-semibold">• Electronic: <strong>Electronation (Gain of e⁻)</strong>.</p>
                <p className="text-[11px] text-blue-900 font-semibold">• Oxidation Number: <strong>DECREASES</strong> algebraically.</p>
                <p className="text-[11px] text-blue-900 font-semibold">• Agent: Performed by an <strong>Oxidizing Agent (Oxidant)</strong> which is reduced.</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <code className="text-xs font-mono font-bold text-slate-800 block">
                OXIDIZING AGENT (Oxidant): Gains e⁻ ──► Undergoes Reduction ──► ON Decreases<br />
                REDUCING AGENT (Reductant): Loses e⁻ ──► Undergoes Oxidation ──► ON Increases
              </code>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ON RULES & ANOMALIES */}
      {activeTab === "anomalies" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Atom className="w-4 h-4 text-emerald-600 shrink-0" />
              Structural Peroxy &amp; Poly-Sulfur Oxidation State Anomalies
            </h4>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-xs font-black text-emerald-950 block">Key Principle: Maximum Valence Constraint</span>
              <p className="text-[11px] text-emerald-900 font-semibold mt-0.5">
                Mathematical summation formulas (∑ ON = 0) fail when compounds contain peroxy (-O-O-) bonds or homonuclear chains. Oxidation states cannot exceed group valence (e.g., Max Cr = +6, Max S = +6).
              </p>
            </div>
            <div className="space-y-1.5">
              {structuralAnomaliesMatrix.map((item, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900">{item.compound} ({item.formula})</span>
                    <span className="font-mono font-black text-emerald-700">{item.trueON}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-600 font-semibold">
                    <span className="text-rose-600 line-through">Formula says: {item.formulaON}</span>
                    <span className="text-slate-700">{item.feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 5 REACTION CLASSES */}
      {activeTab === "classification" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Split className="w-4 h-4 text-indigo-600 shrink-0" />
              5 Mechanical Redox Classes: Disproportionation vs Comproportionation
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">1. Combination</span>
                <code className="text-[10px] font-mono font-bold text-indigo-700 block">A + B → C</code>
                <p className="text-[10px] text-slate-600">C(0) + O₂(0) → CO₂(+4, -2)</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">2. Decomposition</span>
                <code className="text-[10px] font-mono font-bold text-indigo-700 block">C → A + B</code>
                <p className="text-[10px] text-slate-600">2 KClO₃ → 2 KCl + 3 O₂</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">3. Displacement</span>
                <code className="text-[10px] font-mono font-bold text-indigo-700 block">X + YZ → XZ + Y</code>
                <p className="text-[10px] text-slate-600">Zn + CuSO₄ → ZnSO₄ + Cu</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1.5">
                <span className="text-xs font-black text-purple-950 block">4. Disproportionation (Self-Redox)</span>
                <p className="text-[10px] text-purple-900 font-semibold">One element in an intermediate state forms higher and lower states.</p>
                <code className="text-[10px] font-mono font-bold text-purple-900 block">• 2H₂O₂(-1) → 2H₂O(-2) + O₂(0)</code>
                <code className="text-[10px] font-mono font-bold text-purple-900 block">• P₄(0) + 3OH⁻ + 3H₂O → PH₃(-3) + 3H₂PO₂⁻(+1)</code>
                <code className="text-[10px] font-mono font-bold text-purple-900 block">• 3Cl₂(0) + 6OH⁻(hot) → 5Cl⁻(-1) + ClO₃⁻(+5) + 3H₂O</code>
                <p className="text-[10px] text-rose-700 font-bold">⚠️ Fluorine (F₂) NEVER disproportionates!</p>
              </div>
              <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200 space-y-1.5">
                <span className="text-xs font-black text-teal-950 block">5. Comproportionation (Reverse)</span>
                <p className="text-[10px] text-teal-900 font-semibold">Two different states of the same element form a single intermediate state.</p>
                <code className="text-[10px] font-mono font-bold text-teal-900 block">• Ag(0) + Ag²⁺(aq) → 2 Ag⁺(+1)</code>
                <code className="text-[10px] font-mono font-bold text-teal-900 block">• IO₃⁻(+5) + 5 I⁻(-1) + 6 H⁺ → 3 I₂(0) + 3 H₂O</code>
                <code className="text-[10px] font-mono font-bold text-teal-900 block">• NH₄⁺(-3) + NO₃⁻(+5) → N₂O(+1) + 2 H₂O</code>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: HALF-REACTION BALANCING */}
      {activeTab === "balancing" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-600 shrink-0" />
              Ion-Electron (Half-Reaction) Balancing Protocol
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                <span className="font-black text-slate-900 block">7-Step Half-Reaction Protocol</span>
                <p className="text-slate-700">1. Split into Oxidation and Reduction Half-Reactions.</p>
                <p className="text-slate-700">2. Balance elements other than O and H.</p>
                <p className="text-slate-700">3. Balance O by adding H₂O; balance H by adding H⁺.</p>
                <p className="text-slate-700">4. <strong>Basic Medium:</strong> Add equal OH⁻ to both sides.</p>
                <p className="text-slate-700">5. Balance charges by adding electrons (e⁻).</p>
                <p className="text-slate-700">6. Equalize electrons gained and lost.</p>
                <p className="text-slate-700">7. Sum half-reactions and cancel common species.</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5 text-[10px]">
                <span className="font-black text-emerald-950 block">Worked Example: Cr₂O₇²⁻ + Fe²⁺ in Acid</span>
                <code className="font-mono text-emerald-900 block">Reduction: Cr₂O₇²⁻ + 14 H⁺ + 6e⁻ → 2 Cr³⁺ + 7 H₂O</code>
                <code className="font-mono text-emerald-900 block">Oxidation: 6 (Fe²⁺ → Fe³⁺ + e⁻)</code>
                <div className="p-1.5 rounded bg-white border border-emerald-300">
                  <span className="font-mono font-black text-emerald-950 block">Net: Cr₂O₇²⁻ + 6 Fe²⁺ + 14 H⁺ → 2 Cr³⁺ + 6 Fe³⁺ + 7 H₂O</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: EQUIVALENCE & NORMALITY */}
      {activeTab === "equivalence" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-600 shrink-0" />
              The Law of Chemical Equivalence &amp; Normality Equations
            </h4>
            <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200">
              <code className="text-xs sm:text-sm font-mono font-black text-cyan-950 block">
                Equivalents of Oxidant = Equivalents of Reductant
              </code>
              <code className="text-xs font-mono font-bold text-cyan-800 block mt-1">
                n_eq = (w / M) × n-factor = N × V_(L)  |  Normality N = Molarity M × n-factor
              </code>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Acids &amp; Bases</span>
                <p className="text-[10px] text-slate-700">n = Basicity (H⁺ released) or Acidity (OH⁻ released). H₃PO₃ = 2, H₃PO₂ = 1.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Salts</span>
                <p className="text-[10px] text-slate-700">n = Total positive or negative charge in salt matrix. Al₂(SO₄)₃ = 6.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Redox Reagents</span>
                <p className="text-[10px] text-slate-700">n = Total change in ON per mole of reactant.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: VARIABLE n-FACTOR MATRIX */}
      {activeTab === "nfactor-matrix" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Boxes className="w-4 h-4 text-purple-600 shrink-0" />
              Variable n-Factor Analysis (KMnO₄, K₂Cr₂O₇, FeC₂O₄, Hypo)
            </h4>
            <div className="space-y-1.5">
              {nFactorMatrix.map((row, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900">{row.reagent} — <span className="text-purple-700">{row.medium}</span></span>
                    <span className="font-mono font-black text-purple-800">{row.nFactor} ({row.emFormula} = {row.emValue})</span>
                  </div>
                  <code className="text-slate-600 font-mono block">{row.reaction}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: TITRATIONS & HYPO */}
      {activeTab === "titrations" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Beaker className="w-4 h-4 text-amber-600 shrink-0" />
              Redox Titrations: Permanganometry, Dichrometry, &amp; Iodometry vs Iodimetry
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1.5">
                <span className="text-xs font-black text-purple-950 block">Permanganometry &amp; Dichrometry</span>
                <p className="text-[10px] text-purple-900 font-semibold">• <strong>KMnO₄</strong>: Self-indicator (Purple MnO₄⁻ → Colorless Mn²⁺, faint pink end point).</p>
                <p className="text-[10px] text-purple-900 font-semibold">• <strong>K₂Cr₂O₇</strong>: Requires <strong>Diphenylamine</strong> internal indicator (turns deep blue-violet at end point).</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1.5">
                <span className="text-xs font-black text-blue-950 block">Iodimetry vs. Iodometry</span>
                <p className="text-[10px] text-blue-900 font-semibold">• <strong>Iodimetry (Direct)</strong>: Reductant + standard I₂ ──[Starch]──► <strong>Deep Blue APPEARS</strong>.</p>
                <p className="text-[10px] text-blue-900 font-semibold">• <strong>Iodometry (Indirect)</strong>: Oxidant + KI ──► Liberated I₂ + Hypo ──[Starch]──► <strong>Deep Blue DISAPPEARS</strong>.</p>
                <p className="text-[10px] text-indigo-900 font-bold">• n-factor of Hypo (Na₂S₂O₃ → Na₂S₄O₆) = 1 (E.M. = Molar Mass).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: INDUSTRIAL APPLICATIONS */}
      {activeTab === "applications" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-600 shrink-0" />
              Practical &amp; Industrial Applications of Redox Systems
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">1. Energy Storage</span>
                <p className="text-[10px] text-slate-700">Galvanic cells, Lead-Acid batteries (Pb + PbO₂ + 2H₂SO₄ ⇌ 2PbSO₄ + 2H₂O), and Li-ion battery intercalation.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">2. Metallurgy</span>
                <p className="text-[10px] text-slate-700">Blast furnace Fe reduction (Fe₂O₃ + 3CO → 2Fe + 3CO₂) and Hall-Héroult Al electrolysis.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">3. Commercial Bleaching</span>
                <p className="text-[10px] text-slate-700">H₂O₂ oxidation decomposition and CaOCl₂ hypochlorite action on pulp/textile dyes.</p>
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
              All 10 High-Yield NEST Redox Misconceptions &amp; Traps
            </h4>
            <div className="space-y-2">
              {redoxTraps.map((trap) => {
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
                placeholder="Search redox glossary terms..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {["All", "Fundamental Principles", "Oxidation States & Peroxides", "Reaction Classes", "Equivalence & Titrations"].map((cat) => (
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
                {score >= 17 ? "Outstanding! Mastery level for NEST & IChO Redox Reactions." : score >= 12 ? "Good performance — review incorrect explanations." : "Needs practice — revisit earlier tabs and retake."}
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

export default RedoxReactionsDiagram;
