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
  Battery,
  BatteryCharging,
  Cpu,
} from "lucide-react";

// ============================================================================
// 1. DATA: COMMERCIAL BATTERIES MATRIX
// ============================================================================
interface BatteryInfo {
  name: string;
  type: "Primary" | "Secondary" | "Fuel Cell";
  anode: string;
  cathode: string;
  electrolyte: string;
  reaction: string;
  voltage: string;
}

const batteryMatrix: BatteryInfo[] = [
  {
    name: "Dry Cell (Leclanché)",
    type: "Primary",
    anode: "Zinc Container (Zn)",
    cathode: "Carbon rod + MnO₂ + C paste",
    electrolyte: "Moist paste of NH₄Cl + ZnCl₂",
    reaction: "Zn + 2MnO₂ + 2NH₄⁺ ──► Zn²⁺ + Mn₂O₃ + 2NH₃ + H₂O",
    voltage: "~1.5 V",
  },
  {
    name: "Mercury Cell",
    type: "Primary",
    anode: "Zinc-Mercury Amalgam (Zn-Hg)",
    cathode: "Paste of HgO + C",
    electrolyte: "Moist paste of KOH + ZnO",
    reaction: "Zn(Hg) + HgO(s) ──► ZnO(s) + Hg(l)",
    voltage: "1.35 V (Constant voltage - no dissolved ions!)",
  },
  {
    name: "Lead Storage Battery",
    type: "Secondary",
    anode: "Spongy Lead (Pb)",
    cathode: "Lead Dioxide (PbO₂)",
    electrolyte: "38% w/w H₂SO₄ (d = 1.30 g/mL)",
    reaction: "Pb + PbO₂ + 2H₂SO₄ ⇌ 2PbSO₄(s) + 2H₂O",
    voltage: "2.0 V / cell (12 V pack)",
  },
  {
    name: "H₂-O₂ Fuel Cell",
    type: "Fuel Cell",
    anode: "Porous Carbon + Pt/Pd catalyst (H₂ gas)",
    cathode: "Porous Carbon + Pt/Pd catalyst (O₂ gas)",
    electrolyte: "Concentrated aqueous KOH",
    reaction: "2H₂(g) + O₂(g) ──► 2H₂O(l)",
    voltage: "~1.23 V (70% efficiency, pure water product)",
  },
];

// ============================================================================
// 2. DATA: 10 NEST MISCONCEPTIONS & TRAPS
// ============================================================================
interface Misconception {
  id: string;
  trap: string;
  reality: string;
  tip: string;
}

const electrochemTraps: Misconception[] = [
  { id: "t1", trap: "In a Galvanic cell, the Anode is positively charged.", reality: "In a Galvanic cell, the Anode is NEGATIVE (-) (source of electrons). In an Electrolytic cell, the Anode is Positive (+).", tip: "Remember ANOX: Anode is ALWAYS the site of Oxidation!" },
  { id: "t2", trap: "Conductivity (κ) increases when an electrolytic solution is diluted.", reality: "Conductivity (κ) DECREASES with dilution because the number of current-carrying ions per unit volume (1 cm³) decreases.", tip: "Molar conductivity (Λ_m) increases on dilution, but κ decreases." },
  { id: "t3", trap: "Standard reduction potential of SHE (E°_SHE) is zero only at 25°C.", reality: "E°_SHE is assigned a value of 0.000 V at ALL temperatures as a universal international reference convention.", tip: "SHE is the universal primary standard electrode." },
  { id: "t4", trap: "When a Lead Storage Battery discharges, the density of H₂SO₄ solution increases.", reality: "During discharging, H₂SO₄ is consumed (2H₂SO₄ ──► 2H₂O), so H₂SO₄ density DECREASES. Density rises back to 1.30 g/mL during recharging.", tip: "Discharging consumes acid; Recharging regenerates acid." },
  { id: "t5", trap: "Mercury cell potential decreases steadily during its operation.", reality: "Mercury cell potential stays STRICTLY CONSTANT (1.35 V) because the overall cell reaction involves zero dissolved ions whose concentrations could change.", tip: "Ideal for pacemakers and hearing aids." },
  { id: "t6", trap: "Faraday's constant F represents the charge of 1 electron.", reality: "Faraday's constant (1 F ≈ 96485 C) represents the total electrical charge carried by ONE MOLE of electrons (N_A × e⁻).", tip: "1 F = 6.022 × 10²³ × 1.602 × 10⁻¹⁹ C." },
  { id: "t7", trap: "The unit of Cell Constant (G*) is Siemens per centimeter.", reality: "Cell Constant G* = l/A has units of cm⁻¹ or m⁻¹. Conductivity (κ) has units of S·cm⁻¹.", tip: "G* = l/A (length / area = cm / cm² = cm⁻¹)." },
  { id: "t8", trap: "Extrapolation of Λ_m vs √C to zero concentration yields Λ°_m for weak electrolytes.", reality: "Weak electrolytes exhibit steep asymptotic curves near C ──► 0 and CANNOT be extrapolated. Kohlrausch's Law must be used.", tip: "Debye-Hückel extrapolation applies strictly to strong electrolytes." },
  { id: "t9", trap: "Rusting of iron requires only water.", reality: "Rusting requires BOTH oxygen (O₂) AND water (H₂O) along with acidic H⁺ ions. Absence of either prevents corrosion.", tip: "Cathodic reduction consumes both O₂ and H⁺." },
  { id: "t10", trap: "A concentration cell has a standard cell potential E°_cell > 0.", reality: "A concentration cell uses identical electrodes, so E°_cell = 0. Cell potential is driven strictly by (0.0591/n) log(C₂/C₁).", tip: "Spontaneous if C_cathode > C_anode." },
];

// ============================================================================
// 3. DATA: MASTER GLOSSARY (37 DEFINITIONS)
// ============================================================================
interface GlossaryTerm {
  term: string;
  definition: string;
  category: "Galvanic & Nernst Equations" | "Conductance & Kohlrausch" | "Electrolysis & Faraday" | "Batteries & Corrosion";
}

const masterGlossary: GlossaryTerm[] = [
  { term: "Anode", definition: "The electrode at which oxidation (loss of electrons) occurs in all electrochemical cells (Negative in Galvanic; Positive in Electrolytic).", category: "Galvanic & Nernst Equations" },
  { term: "Cathode", definition: "The electrode at which reduction (gain of electrons) occurs in all electrochemical cells (Positive in Galvanic; Negative in Electrolytic).", category: "Galvanic & Nernst Equations" },
  { term: "Cell Constant (G*)", definition: "The geometric ratio of distance between electrodes to their cross-sectional area (G* = l/A, units cm⁻¹ or m⁻¹).", category: "Conductance & Kohlrausch" },
  { term: "Concentration Cell", definition: "A galvanic cell utilizing identical electrodes immersed in solutions of the same electrolyte at different concentrations (E°_cell = 0).", category: "Galvanic & Nernst Equations" },
  { term: "Conductance (G)", definition: "The reciprocal of electrical resistance (G = 1/R), measured in Siemens (S) or Ω⁻¹.", category: "Conductance & Kohlrausch" },
  { term: "Conductivity (Specific Conductance, κ)", definition: "The conductance of a 1 cm³ cube of electrolytic solution (κ = G · G* = G*/R, in S/cm).", category: "Conductance & Kohlrausch" },
  { term: "Corrosion (Rusting)", definition: "Electrochemical destruction of metals via environmental oxidation, forming hydrated ferric oxide (Fe₂O₃·xH₂O) on iron.", category: "Batteries & Corrosion" },
  { term: "Daniell Cell", definition: "Classic galvanic cell consisting of a Zn anode in ZnSO₄ and a Cu cathode in CuSO₄ (E°_cell = +1.10 V).", category: "Galvanic & Nernst Equations" },
  { term: "Debye-Hückel-Onsager Equation", definition: "Linear equation describing the variation of molar conductivity of strong electrolytes with concentration: Λ_m = Λ°_m - A√C.", category: "Conductance & Kohlrausch" },
  { term: "Dry Cell (Leclanché)", definition: "A primary battery utilizing a Zinc container anode, Carbon cathode surrounded by MnO₂/C, and moist NH₄Cl/ZnCl₂ paste (1.5 V).", category: "Batteries & Corrosion" },
  { term: "Electrochemical Equivalent (Z)", definition: "The mass of substance deposited or liberated by 1 Coulomb of electricity during electrolysis (Z = Equivalent Mass / 96485).", category: "Electrolysis & Faraday" },
  { term: "Electrochemical Series", definition: "Arrangement of half-cell standard reduction potentials (E°) in increasing order, from strongest reducing agent (Li) to strongest oxidizing agent (F₂).", category: "Galvanic & Nernst Equations" },
  { term: "Electrolysis", definition: "The non-spontaneous decomposition of an electrolyte driven by external electrical energy (ΔG > 0, E_cell < 0).", category: "Electrolysis & Faraday" },
  { term: "Electromotive Force (EMF / E_cell)", definition: "The potential difference between two electrodes of a galvanic cell when no electric current is drawn.", category: "Galvanic & Nernst Equations" },
  { term: "Faraday's Constant (F)", definition: "The total electrical charge carried by 1 mole of electrons (1 F = N_A · e⁻ ≈ 96485 C/mol).", category: "Electrolysis & Faraday" },
  { term: "Faraday's First Law", definition: "The mass of substance deposited at an electrode is directly proportional to the total electrical charge passed: w = Z · I · t = (M·I·t)/(n·F).", category: "Electrolysis & Faraday" },
  { term: "Faraday's Second Law", definition: "When identical charge is passed through different cells in series, masses deposited are proportional to equivalent masses: w₁/w₂ = E₁/E₂.", category: "Electrolysis & Faraday" },
  { term: "Fuel Cell (H₂-O₂)", definition: "A galvanic cell converting the chemical energy of combustion directly into electrical energy with high ~70% efficiency.", category: "Batteries & Corrosion" },
  { term: "Galvanic (Voltaic) Cell", definition: "An electrochemical cell that generates electrical energy from a spontaneous redox reaction (ΔG < 0, E_cell > 0).", category: "Galvanic & Nernst Equations" },
  { term: "Galvanization", definition: "Coating iron or steel with a protective layer of more electropositive Zinc to prevent atmospheric corrosion.", category: "Batteries & Corrosion" },
  { term: "Kohlrausch’s Law", definition: "Principle stating limiting molar conductivity of an electrolyte equals the sum of individual limiting ionic conductivities: Λ°_m = x λ°_+ + y λ°_-.", category: "Conductance & Kohlrausch" },
  { term: "Lead Storage Battery", definition: "A secondary rechargeable battery utilizing a Pb anode, PbO₂ cathode, and 38% H₂SO₄ electrolyte (2.0 V/cell).", category: "Batteries & Corrosion" },
  { term: "Limiting Molar Conductivity (Λ°_m)", definition: "The molar conductivity of an electrolytic solution as concentration approaches zero (infinite dilution).", category: "Conductance & Kohlrausch" },
  { term: "Mercury Cell", definition: "A primary button cell utilizing a Zn-Hg amalgam anode and HgO cathode delivering a constant 1.35 V output.", category: "Batteries & Corrosion" },
  { term: "Molar Conductivity (Λ_m)", definition: "The conducting power of all ions produced by dissolving 1 mole of an electrolyte placed between electrodes 1 cm apart (Λ_m = 1000 κ / M).", category: "Conductance & Kohlrausch" },
  { term: "Nernst Equation", definition: "Equation relating non-standard cell potential to standard potential, temperature, and reaction quotient: E = E° - (0.05916/n) log₁₀ Q.", category: "Galvanic & Nernst Equations" },
  { term: "Overpotential (Overvoltage)", definition: "The extra potential above the thermodynamic reversible potential required to overcome kinetic activation barriers during gas discharge (e.g. Cl₂ vs O₂).", category: "Electrolysis & Faraday" },
  { term: "Primary Battery", definition: "A non-rechargeable battery whose electrochemical reactions cannot be reversed by external electric current (e.g., Dry cell, Mercury cell).", category: "Batteries & Corrosion" },
  { term: "Sacrificial Anode (Cathodic Protection)", definition: "Connecting an active metal (Mg or Zn) to an iron structure so that the active metal oxidizes preferentially, protecting the iron.", category: "Batteries & Corrosion" },
  { term: "Salt Bridge", definition: "A U-tube containing an inert electrolyte (KCl, KNO₃) in agar-agar connecting two half-cells to complete the circuit and maintain neutrality.", category: "Galvanic & Nernst Equations" },
  { term: "Secondary Battery", definition: "A rechargeable battery whose cell reactions can be reversed by passing an external electrical current in the opposite direction (e.g., Lead storage, Ni-Cad).", category: "Batteries & Corrosion" },
  { term: "Standard Hydrogen Electrode (SHE)", definition: "The primary reference half-cell (2H⁺ + 2e⁻ ⇌ H₂) assigned E° = 0.000 V by international convention at all temperatures.", category: "Galvanic & Nernst Equations" },
];

// ============================================================================
// 4. DATA: ALL 20 NEST ASSESSMENT QUESTIONS (MATCHING USER TEXT)
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
    question: "Consider a galvanic cell constructed at 298 K using the following two half-cells: Anode: Cr(s) | Cr³⁺(aq, 0.010 M); Cathode: Fe²⁺(aq, 0.100 M) | Fe(s). Given standard reduction potentials: E°(Cr³⁺/Cr) = -0.74 V and E°(Fe²⁺/Fe) = -0.44 V. What is the standard cell potential (E°_cell) and the non-standard cell potential (E_cell) at 298 K?",
    options: [
      { key: "A", text: "E°_cell = +0.300 V; E_cell = +0.310 V" },
      { key: "B", text: "E°_cell = +0.300 V; E_cell = +0.290 V" },
      { key: "C", text: "E°_cell = -1.180 V; E_cell = -1.200 V" },
      { key: "D", text: "E°_cell = +1.180 V; E_cell = +1.170 V" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "n = 6. E°_cell = -0.44 - (-0.74) = +0.300 V. Q = (0.010)² / (0.100)³ = 10⁻⁴ / 10⁻³ = 0.10. E_cell = 0.300 - (0.05916 / 6) log₁₀(0.10) = 0.300 + 0.00986 = +0.310 V.",
  },
  {
    id: 2,
    part: "A",
    question: "For the cell reaction Cu(s) + 2Ag⁺(aq) ⇌ Cu²⁺(aq) + 2Ag(s), the standard cell potential is E°_cell = +0.46 V at 298 K. What is the standard Gibbs free energy change (Δ_r G°) in kJ/mol and the equilibrium constant (K_eq) at 298 K? (F = 96485 C/mol)",
    options: [
      { key: "A", text: "Δ_r G° = -88.77 kJ/mol; K_eq = 3.9 × 10¹⁵" },
      { key: "B", text: "Δ_r G° = -44.38 kJ/mol; K_eq = 6.2 × 10⁷" },
      { key: "C", text: "Δ_r G° = +88.77 kJ/mol; K_eq = 2.5 × 10⁻¹⁶" },
      { key: "D", text: "Δ_r G° = -177.54 kJ/mol; K_eq = 1.5 × 10³⁰" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "n = 2. ΔG° = -2 × 96485 × 0.46 = -88766 J/mol = -88.77 kJ/mol. log₁₀ K_eq = (2 × 0.46) / 0.05916 = 15.551 ⟹ K_eq = 3.9 × 10¹⁵.",
  },
  {
    id: 3,
    part: "A",
    question: "A resistance cell filled with 0.02 M KCl solution has a resistance of 500 Ω at 298 K. The specific conductivity (κ) of 0.02 M KCl is 2.48 × 10⁻³ S·cm⁻¹. When the same cell is filled with 0.005 M CH₃COOH solution, the measured resistance is 2000 Ω. What is the cell constant (G*) and molar conductivity (Λ_m) of the acetic acid solution?",
    options: [
      { key: "A", text: "G* = 1.24 cm⁻¹; Λ_m = 124.0 S·cm²/mol" },
      { key: "B", text: "G* = 0.248 cm⁻¹; Λ_m = 24.8 S·cm²/mol" },
      { key: "C", text: "G* = 1.24 cm⁻¹; Λ_m = 62.0 S·cm²/mol" },
      { key: "D", text: "G* = 2.50 cm⁻¹; Λ_m = 248.0 S·cm²/mol" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "G* = κ × R = 2.48 × 10⁻³ × 500 = 1.24 cm⁻¹. κ_acid = 1.24 / 2000 = 6.20 × 10⁻⁴ S/cm. Λ_m = (1000 × 6.20 × 10⁻⁴) / 0.005 = 124.0 S·cm²/mol.",
  },
  {
    id: 4,
    part: "A",
    question: "Given limiting ionic conductivities at 298 K: λ°_m(CH₃COO⁻) = 40.9 S·cm²/mol and λ°_m(H⁺) = 349.6 S·cm²/mol. If a 0.01 M solution of Acetic acid has a measured molar conductivity Λ_m = 39.05 S·cm²/mol, what is its degree of dissociation (α) and acid dissociation constant (K_a)?",
    options: [
      { key: "A", text: "α = 0.100; K_a = 1.0 × 10⁻⁴" },
      { key: "B", text: "α = 0.100; K_a = 1.11 × 10⁻⁵" },
      { key: "C", text: "α = 0.010; K_a = 1.0 × 10⁻⁶" },
      { key: "D", text: "α = 0.050; K_a = 2.5 × 10⁻⁵" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Λ°_m = 40.9 + 349.6 = 390.5 S·cm²/mol. α = 39.05 / 390.5 = 0.100. K_a = (0.01 × (0.100)²) / (1 - 0.100) = 1.0 × 10⁻⁴ / 0.90 = 1.11 × 10⁻⁵.",
  },
  {
    id: 5,
    part: "A",
    question: "How many minutes (t) are required to electroplate 1.08 grams of Silver (Ag, M = 107.87 g/mol) onto a metallic spoon from an aqueous AgNO₃ solution using a steady electric current of 1.50 Amperes? (F = 96485 C/mol)",
    options: [
      { key: "A", text: "10.72 minutes" },
      { key: "B", text: "21.44 minutes" },
      { key: "C", text: "643.2 minutes" },
      { key: "D", text: "5.36 minutes" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "n = 1. t = (1.08 × 96485) / (107.87 × 1.50) = 644.0 seconds = 10.73 minutes ≈ 10.72 minutes.",
  },
  {
    id: 6,
    part: "A",
    question: "What is the cell potential (E_cell) at 298 K of a Hydrogen Concentration Cell constructed as follows: Pt(s) | H₂(g, 1.0 bar) | H⁺(aq, pH = 3.0) || H⁺(aq, pH = 1.0) | H₂(g, 1.0 bar) | Pt(s)?",
    options: [
      { key: "A", text: "E_cell = +0.118 V" },
      { key: "B", text: "E_cell = -0.118 V" },
      { key: "C", text: "E_cell = +0.0591 V" },
      { key: "D", text: "E_cell = 0.000 V" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "[H⁺]₁ = 10⁻³ M, [H⁺]₂ = 10⁻¹ M. E_cell = 0.05916 × log₁₀(10⁻¹ / 10⁻³) = 0.05916 × 2 = +0.1183 V ≈ +0.118 V.",
  },
  {
    id: 7,
    part: "A",
    question: "During the operation of a Lead Storage Battery during vehicle ignition (Discharging), what chemical species are formed at the Anode and Cathode, and what happens to the density of the 38% H₂SO₄ electrolyte?",
    options: [
      { key: "A", text: "Anode forms PbO₂; Cathode forms Pb; H₂SO₄ density increases" },
      { key: "B", text: "Both Anode and Cathode accumulate solid PbSO₄; H₂SO₄ density DECREASES" },
      { key: "C", text: "Anode releases O₂ gas; Cathode releases H₂ gas; density remains constant" },
      { key: "D", text: "Anode forms PbSO₄; Cathode forms PbO; density increases" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Pb + PbO₂ + 2H₂SO₄ ──► 2PbSO₄ + 2H₂O. Solid PbSO₄ forms at both electrodes and H₂SO₄ is consumed, reducing density.",
  },
  {
    id: 8,
    part: "A",
    question: "The solubility product of Silver Chloride at 298 K is K_sp = 1.8 × 10⁻¹⁰. If the limiting molar conductivities are λ°_m(Ag⁺) = 62.0 S·cm²/mol and λ°_m(Cl⁻) = 76.0 S·cm²/mol, what is the specific conductivity (κ) of a saturated aqueous solution of AgCl at 298 K?",
    options: [
      { key: "A", text: "κ = 1.85 × 10⁻⁶ S/cm" },
      { key: "B", text: "κ = 2.48 × 10⁻³ S/cm" },
      { key: "C", text: "κ = 1.34 × 10⁻⁵ S/cm" },
      { key: "D", text: "κ = 5.20 × 10⁻⁸ S/cm" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "S = √(1.8 × 10⁻¹⁰) = 1.3416 × 10⁻⁵ mol/L. Λ°_m = 62.0 + 76.0 = 138.0 S·cm²/mol. κ = (138.0 × 1.3416 × 10⁻⁵) / 1000 = 1.85 × 10⁻⁶ S/cm.",
  },
  {
    id: 9,
    part: "A",
    question: "Which of the following metals acts as the most effective 'Sacrificial Anode' for Cathodic Protection to prevent the electrochemical corrosion (rusting) of an underground Iron pipeline (Fe²⁺/Fe, E° = -0.44 V)?",
    options: [
      { key: "A", text: "Copper (Cu²⁺/Cu, E° = +0.34 V)" },
      { key: "B", text: "Magnesium (Mg²⁺/Mg, E° = -2.37 V)" },
      { key: "C", text: "Lead (Pb²⁺/Pb, E° = -0.13 V)" },
      { key: "D", text: "Silver (Ag⁺/Ag, E° = +0.80 V)" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Magnesium has a much more negative reduction potential (-2.37 V vs -0.44 V), undergoing preferential oxidation as a sacrificial anode.",
  },
  {
    id: 10,
    part: "A",
    question: "At 298 K, a current of 2.0 A is passed through an aqueous solution of CuSO₄ for 30.0 minutes. What mass of Copper (Cu, M = 63.55 g/mol) is deposited at the cathode? (F = 96485 C/mol)",
    options: [
      { key: "A", text: "1.185 g" },
      { key: "B", text: "2.370 g" },
      { key: "C", text: "0.592 g" },
      { key: "D", text: "4.740 g" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "n = 2. q = 2.0 × (30 × 60) = 3600 C. w = (63.55 × 3600) / (2 × 96485) = 228780 / 192970 = 1.1855 g ≈ 1.185 g.",
  },
  {
    id: 11,
    part: "B",
    question: "Which of the following conditions represent SPONTANEOUS electrochemical processes at constant temperature and pressure? (Select all that apply)",
    options: [
      { key: "A", text: "E_cell > 0" },
      { key: "B", text: "Δ_r G < 0" },
      { key: "C", text: "Reaction Quotient Q < K_eq" },
      { key: "D", text: "ΔS_total > 0" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four criteria correctly state conditions for thermodynamic spontaneity (E_cell > 0, ΔG < 0, Q < K_eq, and ΔS_total > 0).",
  },
  {
    id: 12,
    part: "B",
    question: "Select the valid statements regarding the Mercury Cell primary battery: (Select all that apply)",
    options: [
      { key: "A", text: "It utilizes a Zinc-Mercury Amalgam (Zn-Hg) as the anode and a paste of HgO+C as the cathode" },
      { key: "B", text: "The electrolyte consists of a moist paste of KOH and ZnO" },
      { key: "C", text: "The cell potential remains strictly constant (≈ 1.35 V) throughout its operational life" },
      { key: "D", text: "The constant cell potential occurs because the overall cell reaction involves no dissolved ions whose concentrations could change over time" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four options represent accurate chemical, structural, and operational facts of the Mercury Cell.",
  },
  {
    id: 13,
    part: "B",
    question: "Which of the following factors INCREASE the Molar Conductivity (Λ_m) of an electrolytic solution? (Select all that apply)",
    options: [
      { key: "A", text: "Increasing the temperature of the solution" },
      { key: "B", text: "Diluting the solution (decreasing solute concentration C)" },
      { key: "C", text: "Decreasing the inter-ionic electrostatic attractions between ions" },
      { key: "D", text: "Increasing the viscosity of the solvent" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C increase Λ_m. • D (viscosity) increases drag and lowers ionic mobility.",
  },
  {
    id: 14,
    part: "B",
    question: "Select the correct statements regarding the Hydrogen-Oxygen (H₂-O₂) Fuel Cell: (Select all that apply)",
    options: [
      { key: "A", text: "It converts the chemical energy of combustion (2H₂ + O₂ ──► 2H₂O) directly into electrical energy" },
      { key: "B", text: "It operates with a high thermodynamic efficiency (≈ 70%) compared to conventional thermal power plants (≈ 40%)" },
      { key: "C", text: "The only chemical product formed is pure water vapor, making it completely non-polluting" },
      { key: "D", text: "The anode reaction involves the reduction of molecular oxygen (O₂)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct. • D is incorrect: Oxygen reduction occurs at the CATHODE.",
  },
  {
    id: 15,
    part: "B",
    question: "Which of the following chemical species undergo discharge at the CATHODE during the electrolysis of concentrated aqueous Sodium Chloride (NaCl) using inert platinum electrodes? (Select all that apply)",
    options: [
      { key: "A", text: "Hydrogen gas (H₂)" },
      { key: "B", text: "Hydroxide ions (OH⁻) accumulating in the catholyte solution" },
      { key: "C", text: "Metallic Sodium (Na)" },
      { key: "D", text: "Chlorine gas (Cl₂)" },
    ],
    correctKeys: ["A", "B"],
    type: "multi",
    explanation: "• Water reduction produces H₂ gas and OH⁻ ions at the cathode. • Cl₂ is liberated at the anode.",
  },
  {
    id: 16,
    part: "B",
    question: "Select the valid statements regarding Kohlrausch’s Law of Independent Migration of Ions: (Select all that apply)",
    options: [
      { key: "A", text: "It allows the determination of limiting molar conductivity (Λ°_m) for weak electrolytes like CH₃COOH" },
      { key: "B", text: "The degree of dissociation (α) of a weak electrolyte can be calculated using α = Λ_m / Λ°_m" },
      { key: "C", text: "It can be used to calculate the molar solubility (S) of sparingly soluble salts like AgCl using S = (1000 · κ) / Λ°_m" },
      { key: "D", text: "It states that molar conductivity decreases linearly with √C for weak electrolytes" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are core applications of Kohlrausch's Law. • D is false (weak electrolytes show steep non-linear curves).",
  },
  {
    id: 17,
    part: "B",
    question: "Which of the following conditions cause an INCREASE in the measured Cell Potential (E_cell) for the Daniell Cell reaction: Zn(s) + Cu²⁺(aq) ⇌ Zn²⁺(aq) + Cu(s)? (Select all that apply)",
    options: [
      { key: "A", text: "Increasing the concentration of Cu²⁺(aq) ions" },
      { key: "B", text: "Decreasing the concentration of Zn²⁺(aq) ions" },
      { key: "C", text: "Diluting the anode compartment solution with pure water" },
      { key: "D", text: "Increasing the mass of the solid Zinc electrode" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C decrease Q, increasing E_cell. • D has no effect because pure solids have unit activity (1.0).",
  },
  {
    id: 18,
    part: "B",
    question: "Select the correct statements regarding the Electrochemical Mechanism of Rusting of Iron: (Select all that apply)",
    options: [
      { key: "A", text: "Iron acts as the anodic site undergoing oxidation: Fe(s) ──► Fe²⁺(aq) + 2e⁻" },
      { key: "B", text: "Dissolved oxygen in water droplets undergoes reduction at the cathodic site: O₂ + 4H⁺ + 4e⁻ ──► 2H₂O" },
      { key: "C", text: "Dissolved atmospheric CO₂ forms carbonic acid (H₂CO₃), supplying the necessary H⁺ ions" },
      { key: "D", text: "Rust is chemically hydrated ferric oxide (Fe₂O₃·xH₂O)" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four statements accurately represent the electrochemical mechanism of iron rusting.",
  },
  {
    id: 19,
    part: "B",
    question: "Which of the following relationships correctly connect Faraday's Constant (F ≈ 96485 C/mol) to other fundamental physical constants? (Select all that apply)",
    options: [
      { key: "A", text: "F = N_A · e (where N_A is Avogadro's number and e is electron charge)" },
      { key: "B", text: "1 Faraday is the charge required to deposit 1 gram-equivalent of any element during electrolysis" },
      { key: "C", text: "1 Faraday corresponds to the passage of 6.022 × 10²³ electrons" },
      { key: "D", text: "F = R · T · ln 2" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct definitions of Faraday's constant. • D is incorrect.",
  },
  {
    id: 20,
    part: "B",
    question: "Select the correct statements regarding the Standard Hydrogen Electrode (SHE): (Select all that apply)",
    options: [
      { key: "A", text: "It consists of a platinum foil coated with platinum black immersed in a 1.0 M H⁺ aqueous solution" },
      { key: "B", text: "Pure Hydrogen gas is bubbled over the electrode at 1.0 bar pressure" },
      { key: "C", text: "It can function as both an anode and a cathode depending on the connected half-cell" },
      { key: "D", text: "Its standard electrode potential (E°) is assigned 0.000 V by international convention at all temperatures" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four statements represent accurate structural, operational, and thermodynamic facts regarding the Standard Hydrogen Electrode.",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
type Tab = "daniell-she" | "nernst-thermo" | "concentration-cells" | "conductance-cell" | "kohlrausch-dilution" | "electrolysis-faraday" | "batteries-fuel" | "rusting-corrosion" | "traps" | "glossary" | "selftest";

export const ElectrochemistryDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("daniell-she");
  const [activeTrapId, setActiveTrapId] = useState<string | null>(null);

  // Nernst Live Calculator State
  const [calcE0, setCalcE0] = useState<number>(1.10);
  const [calcN, setCalcN] = useState<number>(2);
  const [calcZn, setCalcZn] = useState<number>(0.01);
  const [calcCu, setCalcCu] = useState<number>(1.0);

  const calcNernst = () => {
    if (calcZn <= 0 || calcCu <= 0 || calcN <= 0) return "Invalid";
    const Q = calcZn / calcCu;
    const logQ = Math.log10(Q);
    const eCell = calcE0 - (0.05916 / calcN) * logQ;
    return eCell.toFixed(4);
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
    { id: "daniell-she", label: "Daniell Cell & SHE", icon: <Battery className="w-3.5 h-3.5 shrink-0" /> },
    { id: "nernst-thermo", label: "Nernst & ΔG°/K_eq", icon: <Gauge className="w-3.5 h-3.5 shrink-0" /> },
    { id: "concentration-cells", label: "Concentration Cells", icon: <Radio className="w-3.5 h-3.5 shrink-0" /> },
    { id: "conductance-cell", label: "Conductance & Cell G*", icon: <Zap className="w-3.5 h-3.5 shrink-0" /> },
    { id: "kohlrausch-dilution", label: "Kohlrausch & Dilution", icon: <TrendingUp className="w-3.5 h-3.5 shrink-0" /> },
    { id: "electrolysis-faraday", label: "Electrolysis & Faraday", icon: <Beaker className="w-3.5 h-3.5 shrink-0" /> },
    { id: "batteries-fuel", label: "Batteries & Fuel Cells", icon: <BatteryCharging className="w-3.5 h-3.5 shrink-0" /> },
    { id: "rusting-corrosion", label: "Rusting & Corrosion", icon: <Shield className="w-3.5 h-3.5 shrink-0" /> },
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
          CHEMISTRY INTERACTIVE MODULE — ELECTROCHEMISTRY (CLASS XII / UNIT XI)
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 shrink-0" />
            ELECTROCHEMISTRY: POTENTIALS, CONDUCTANCE, &amp; CELLS
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            Daniell Cell &amp; SHE · Nernst Equation &amp; Equilibrium · Concentration Cells · Molar Conductance &amp; Kohlrausch’s Law · Faraday’s Quantitative Laws · Lead Storage &amp; Mercury Batteries · Rusting Mechanics
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

      {/* TAB 1: DANIELL CELL & SHE */}
      {activeTab === "daniell-she" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Battery className="w-4 h-4 text-amber-600 shrink-0" />
              Daniell Cell Anatomy &amp; Standard Hydrogen Electrode (SHE)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[10px]">
                <div className="flex items-center justify-between">
                  <span className="font-black text-slate-900 uppercase">Daniell Cell (Zn-Cu)</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">E° = +1.10 V</span>
                </div>
                <p className="font-mono text-slate-800 font-bold">Anode (-): Zn(s) ──► Zn²⁺(aq) + 2e⁻  (E°_ox = +0.76 V)</p>
                <p className="font-mono text-slate-800 font-bold">Cathode (+): Cu²⁺(aq) + 2e⁻ ──► Cu(s) (E°_red = +0.34 V)</p>
                <p className="text-slate-600 font-semibold">Salt Bridge: KCl/KNO₃ in agar-agar gel completes internal circuit &amp; prevents charge buildup.</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5 text-[10px]">
                <div className="flex items-center justify-between">
                  <span className="font-black text-amber-950 uppercase">SHE Reference</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-200 text-amber-950 font-bold">E° = 0.000 V</span>
                </div>
                <p className="font-mono text-amber-900 font-bold">2H⁺(aq, 1 M) + 2e⁻ ⇌ H₂(g, 1 bar)  |  Pt foil</p>
                <p className="text-amber-800 font-bold">• Arbitrary standard assigned 0.000 V at ALL temperatures.</p>
                <p className="text-amber-800 font-semibold">Li (-3.05 V) is strongest reducing agent; F₂ (+2.87 V) is strongest oxidizing agent.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: NERNST & THERMODYNAMICS */}
      {activeTab === "nernst-thermo" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-indigo-600 shrink-0" />
              Nernst Equation &amp; Thermodynamic Coupling (ΔG°, K_eq)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                <span className="font-black text-slate-900 block">Nernst Potential (at 298 K)</span>
                <p className="font-mono font-bold text-indigo-900">E_cell = E°_cell - (0.05916 / n) log₁₀ Q</p>
                <p className="text-slate-600 font-semibold">As reaction proceeds, [Products] rise ⟹ Q increases ⟹ E_cell drops to 0.</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1 text-[10px]">
                <span className="font-black text-purple-950 block">Thermodynamic Relationships</span>
                <p className="font-mono font-bold text-purple-900">Δ_r G = -n F E_cell  |  Δ_r G° = -n F E°_cell</p>
                <p className="font-mono font-bold text-purple-900">log₁₀ K_eq = (n · E°_cell) / 0.05916</p>
                <p className="text-purple-800">Spontaneous when E_cell &gt; 0 ⟹ ΔG &lt; 0.</p>
              </div>
            </div>

            {/* Interactive Nernst Calculator for Daniell Cell */}
            <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-2 text-[10px]">
              <span className="font-black text-indigo-950 uppercase tracking-wider block">Live Daniell Cell Nernst Calculator</span>
              <p className="font-mono text-indigo-900 font-bold">Reaction: Zn(s) + Cu²⁺(aq) ⇌ Zn²⁺(aq) + Cu(s) (n=2, E° = +1.10 V)</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="text-[9px] font-bold text-slate-700 block">[Zn²⁺] Anode (mol/L):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={calcZn}
                    onChange={(e) => setCalcZn(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 rounded bg-white border border-slate-300 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-700 block">[Cu²⁺] Cathode (mol/L):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={calcCu}
                    onChange={(e) => setCalcCu(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 rounded bg-white border border-slate-300 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-700 block">Standard E° (V):</label>
                  <input
                    type="number"
                    step="0.05"
                    value={calcE0}
                    onChange={(e) => setCalcE0(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 rounded bg-white border border-slate-300 font-bold text-slate-900"
                  />
                </div>
              </div>
              <div className="p-2 rounded bg-white border border-indigo-300 flex items-center justify-between">
                <span className="font-bold text-indigo-950">Calculated Cell Potential (E_cell):</span>
                <span className="font-mono font-black text-indigo-900 text-xs">+{calcNernst()} V</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CONCENTRATION CELLS */}
      {activeTab === "concentration-cells" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Radio className="w-4 h-4 text-teal-600 shrink-0" />
              Concentration Cells &amp; Electrochemical pH Sensors
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200 space-y-1.5 text-[10px]">
                <span className="font-black text-teal-950 uppercase block">Concentration Cell Principles</span>
                <p className="font-mono font-bold text-teal-900">M(s) | Mⁿ⁺(C₁) || Mⁿ⁺(C₂) | M(s)  [E°_cell = 0]</p>
                <p className="font-mono font-bold text-teal-900">E_cell = (0.05916 / n) log₁₀ (C₂ / C₁)</p>
                <p className="text-teal-950 font-bold">Spontaneous only when C₂ (cathode) &gt; C₁ (anode)!</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[10px]">
                <span className="font-black text-slate-900 uppercase block">Hydrogen pH Sensor</span>
                <p className="font-mono font-bold text-slate-800">Pt | H₂(1 bar) | H⁺(pH₁) || H⁺(pH₂) | H₂(1 bar) | Pt</p>
                <p className="font-mono font-bold text-slate-800">E_cell = 0.05916 × (pH₁ - pH₂)</p>
                <p className="text-slate-600">Every 1 unit change in pH produces a 59.16 mV change in cell potential.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CONDUCTANCE & CELL CONSTANTS */}
      {activeTab === "conductance-cell" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600 shrink-0" />
              Electrolytic Conductance, Molar Conductivity, &amp; Cell Constants
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5 text-[10px]">
                <span className="font-black text-slate-900 block">Resistance &amp; Conductance</span>
                <p className="font-mono text-slate-800">R = ρ(l/A) [Ω]  |  G = 1/R [Siemens, S]</p>
                <p className="text-slate-600 font-semibold">Cell Constant G* = l/A (units cm⁻¹ or m⁻¹)</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-0.5 text-[10px]">
                <span className="font-black text-amber-950 block">Specific Conductivity (κ)</span>
                <p className="font-mono text-amber-900 font-bold">κ = G · G* = G* / R  [S/cm]</p>
                <p className="text-amber-800">Conductance of 1 cm³ solution.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-0.5 text-[10px]">
                <span className="font-black text-indigo-950 block">Molar Conductivity (Λ_m)</span>
                <p className="font-mono text-indigo-900 font-bold">Λ_m = (1000 × κ) / M  [S·cm²/mol]</p>
                <p className="text-indigo-800">Conducting power of 1 mole electrolyte.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-0.5 text-[10px]">
                <span className="font-black text-purple-950 block">Equivalent Conductivity (Λ_eq)</span>
                <p className="font-mono text-purple-900 font-bold">Λ_eq = (1000 × κ) / N = Λ_m / n-factor</p>
                <p className="text-purple-800">Units: S·cm²/eq</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: KOHLRAUSCH & DILUTION */}
      {activeTab === "kohlrausch-dilution" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
              Kohlrausch’s Law &amp; Debye-Hückel-Onsager Dilution
            </h4>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
              <span className="font-black text-slate-900 block">Debye-Hückel-Onsager Linear Plot (Strong Electrolytes):</span>
              <p className="font-mono font-bold text-emerald-900">Λ_m = Λ°_m - A √C</p>
              <p className="text-slate-600">Linear plot with slope = -A and intercept = Λ°_m. Weak electrolytes show non-linear steep curves and cannot be extrapolated!</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5 text-[10px]">
              <span className="font-black text-emerald-950 block">Kohlrausch's Law of Independent Migration:</span>
              <p className="font-mono font-bold text-emerald-900">Λ°_m (A_x B_y) = x λ°_m (Aⁿ⁺) + y λ°_m (Bᵐ⁻)</p>
              <p className="text-emerald-900 font-semibold">• <strong>Weak Electrolytes:</strong> Λ°_m(CH₃COOH) = Λ°_m(CH₃COONa) + Λ°_m(HCl) - Λ°_m(NaCl)</p>
              <p className="text-emerald-900 font-semibold">• <strong>Degree of Dissociation:</strong> α = Λ_m / Λ°_m  ⟹  K_a = (C α²) / (1 - α)</p>
              <p className="text-emerald-900 font-semibold">• <strong>Sparingly Soluble Salt Solubility:</strong> S = (1000 × κ) / Λ°_m  ⟹  K_sp = S²</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: ELECTROLYSIS & FARADAY */}
      {activeTab === "electrolysis-faraday" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Beaker className="w-4 h-4 text-blue-600 shrink-0" />
              Electrolysis Preferential Discharge &amp; Faraday’s Laws
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                <span className="font-black text-slate-900 block">Electrolysis of Aqueous NaCl (Brine)</span>
                <p className="text-slate-700"><strong>Anode:</strong> 2Cl⁻ ──► Cl₂(g) + 2e⁻ (Oxygen overpotential favors Cl₂)</p>
                <p className="text-slate-700"><strong>Cathode:</strong> 2H₂O + 2e⁻ ──► H₂(g) + 2OH⁻ (H₂O reduced faster than Na⁺)</p>
                <p className="text-emerald-800 font-bold">Residual Solution: Accumulates NaOH ⟹ pH Rises!</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1 text-[10px]">
                <span className="font-black text-blue-950 block">Faraday's Quantitative Laws</span>
                <p className="font-mono font-bold text-blue-900">1st Law: w = (M · I · t) / (n · 96485)</p>
                <p className="font-mono font-bold text-blue-900">2nd Law: w₁ / w₂ = E₁ / E₂ = Z₁ / Z₂</p>
                <p className="text-blue-800">1 Faraday (96485 C) deposits 1 gram-equivalent of any element.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: BATTERIES & FUEL CELLS */}
      {activeTab === "batteries-fuel" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <BatteryCharging className="w-4 h-4 text-emerald-600 shrink-0" />
              Commercial Batteries &amp; H₂-O₂ Fuel Cells
            </h4>
            <div className="space-y-2">
              {batteryMatrix.map((item, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900">{item.name}</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 font-black text-[9px]">{item.voltage}</span>
                  </div>
                  <p className="text-slate-600 font-semibold">Anode: {item.anode} · Cathode: {item.cathode}</p>
                  <p className="font-mono text-emerald-900 font-bold">{item.reaction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: RUSTING & CORROSION */}
      {activeTab === "rusting-corrosion" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-rose-600 shrink-0" />
              Electrochemical Mechanism of Rusting &amp; Sacrificial Protection
            </h4>
            <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1.5 text-[10px]">
              <span className="font-black text-rose-950 block">Rusting Electrochemical Cell:</span>
              <p className="font-mono text-rose-900 font-bold">• Anode (Iron oxidation): Fe(s) ──► Fe²⁺(aq) + 2e⁻ (E° = -0.44 V)</p>
              <p className="font-mono text-rose-900 font-bold">• Cathode (O₂ reduction): O₂(g) + 4H⁺(aq) + 4e⁻ ──► 2H₂O(l) (E° = +1.23 V)</p>
              <p className="font-mono text-rose-950 font-bold">• Net Cell Potential: E°_cell = +1.67 V (Highly spontaneous!)</p>
              <p className="text-rose-900 font-semibold">Rust Formula: Fe₂O₃ · xH₂O (Hydrated ferric oxide).</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] space-y-1">
              <span className="font-black text-slate-900 block">Cathodic Protection (Sacrificial Anode):</span>
              <p className="text-slate-700">Connecting iron pipelines to active Magnesium (E° = -2.37 V) or Zinc (E° = -0.76 V) blocks forces the active metal to undergo preferential oxidation, preserving the iron structure.</p>
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
              All 10 High-Yield NEST Electrochemistry Misconceptions &amp; Traps
            </h4>
            <div className="space-y-2">
              {electrochemTraps.map((trap) => {
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
                          <span className="text-[9px] font-black uppercase text-amber-700 tracking-wider block">Electrochemical Reality</span>
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
                placeholder="Search electrochemistry terms..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {["All", "Galvanic & Nernst Equations", "Conductance & Kohlrausch", "Electrolysis & Faraday", "Batteries & Corrosion"].map((cat) => (
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
                {score >= 17 ? "Outstanding! Mastery level for NEST & IChO Electrochemistry Module." : score >= 12 ? "Good performance — review incorrect explanations." : "Needs practice — revisit earlier tabs and retake."}
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
                      <span className="text-[9px] font-black uppercase tracking-wider text-amber-700">Detailed Solution &amp; Electrochemical Explanation</span>
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

export default ElectrochemistryDiagram;
