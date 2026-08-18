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
// 1. DATA: 10 NEST COORDINATION CHEMISTRY MISCONCEPTIONS & TRAPS
// ============================================================================
interface Misconception {
  id: string;
  trap: string;
  reality: string;
  tip: string;
}

const coordTraps: Misconception[] = [
  { id: "t1", trap: "Tetrahedral complexes exhibit cis/trans geometrical isomerism.", reality: "Tetrahedral complexes (sp³) CANNOT exhibit geometrical isomerism because all four coordination positions are adjacent and structurally equivalent (109.5°).", tip: "Square planar (dsp²) and octahedral complexes exhibit cis/trans isomerism." },
  { id: "t2", trap: "The trans-isomer of [Co(en)₂Cl₂]⁺ is optically active.", reality: "trans-[Co(en)₂Cl₂]⁺ possesses a Plane of Symmetry (σ) and is strictly OPTICALLY INACTIVE (Achiral). Only the cis-isomer is chiral.", tip: "cis-[Co(en)₂Cl₂]⁺ lacks a plane of symmetry and is optically active." },
  { id: "t3", trap: "Tetrahedral crystal field splitting Δ_t is larger than octahedral Δ_o.", reality: "Δ_t = (4/9) Δ_o. Because Δ_t is less than half of Δ_o and is much smaller than pairing energy (Δ_t << P), tetrahedral complexes are almost ALWAYS High-Spin.", tip: "Tetrahedral complexes rarely pair electrons in lower orbitals." },
  { id: "t4", trap: "The intense purple color of KMnO₄ is caused by d-d transitions.", reality: "Permanganate (MnO₄⁻) has Mn in +7 OS (d⁰). Its intense purple color is caused by Ligand-to-Metal Charge Transfer (LMCT), not d-d transitions.", tip: "d⁰ and d¹⁰ ions cannot perform d-d transitions." },
  { id: "t5", trap: "Primary valency according to Werner is non-ionizable and directional.", reality: "Primary valency is IONIZABLE and NON-DIRECTIONAL (corresponds to Oxidation State). Secondary valency is non-ionizable and directional (corresponds to Coordination Number).", tip: "Primary = Oxidation State; Secondary = Coordination Number." },
  { id: "t6", trap: "EDTA⁴⁻ is a bidentate ligand.", reality: "EDTA⁴⁻ is a HEXADENTATE ligand possessing 6 donor atoms (2 amine Nitrogens + 4 carboxylate Oxygens).", tip: "Forms extremely stable 5-ring chelate complexes with Ca²⁺, Mg²⁺, Pb²⁺." },
  { id: "t7", trap: "Outer orbital octahedral complexes use inner (n-1)d orbitals.", reality: "Outer orbital complexes (sp³d²) use outer nd orbitals and are typically high-spin. Inner orbital complexes (d²sp³) use inner (n-1)d orbitals and are low-spin.", tip: "Strong-field ligands promote inner orbital d²sp³ hybridization." },
  { id: "t8", trap: "Ambidentate ligands form coordination position isomers.", reality: "Ambidentate ligands (-NO₂⁻, -SCN⁻, -CN⁻) form LINKAGE ISOMERS by coordinating through different donor atoms.", tip: "-NO₂⁻ (nitro-N) vs -ONO⁻ (nitrito-O) is Linkage Isomerism." },
  { id: "t9", trap: "In [Ni(CO)₄], Nickel is sp³d² hybridized.", reality: "In [Ni(CO)₄], Nickel is in 0 oxidation state (3d¹⁰ 4s⁰). Strong-field CO forces 4s electrons into 3d, using 4s + 4p to form sp³ Tetrahedral geometry (Diamagnetic).", tip: "[Ni(CO)₄] is sp³ tetrahedral and diamagnetic (n=0)." },
  { id: "t10", trap: "Double salts retain their complex identity in aqueous solution.", reality: "Double salts (e.g., Mohr's Salt, Potash Alum, Carnallite) completely dissociate into individual simple ions in water. Coordination complexes retain complex ion integrity.", tip: "FeSO₄·(NH₄)₂SO₄·6H₂O gives positive tests for Fe²⁺, NH₄⁺, and SO₄²⁻." },
];

// ============================================================================
// 2. DATA: MASTER GLOSSARY (42 DEFINITIONS)
// ============================================================================
interface GlossaryTerm {
  term: string;
  definition: string;
  category: "Werner & Nomenclature" | "Isomerism & Stereochemistry" | "VBT, CFT & Spectra" | "Applications & Bio-Inorganic";
}

const masterGlossary: GlossaryTerm[] = [
  { term: "Ambidentate Ligand", definition: "A ligand possessing two distinct donor atoms that can coordinate to a central metal ion through either single donor atom (e.g., -NO₂⁻ vs -ONO⁻, -SCN⁻ vs -NCS⁻).", category: "Werner & Nomenclature" },
  { term: "Anionic Complex", definition: "A coordination complex bearing a net negative charge, requiring the central metal name to end with the suffix -ate (e.g., Ferrate, Cuprate, Plumbate).", category: "Werner & Nomenclature" },
  { term: "Aquated Ion", definition: "A metal cation surrounded by a primary coordination sphere of coordinate water molecules (e.g., [Cu(H₂O)₆]²⁺).", category: "Werner & Nomenclature" },
  { term: "Bidentate Ligand", definition: "A ligand that coordinates simultaneously through two donor atoms to a single central metal ion (e.g., Ethylenediamine 'en', Oxalate 'ox²⁻', Glycinate 'gly⁻', DMG⁻).", category: "Werner & Nomenclature" },
  { term: "Carbonic Anhydrase", definition: "A vital Zinc (Zn²⁺) metalloenzyme that catalyzes the reversible hydration of carbon dioxide in respiration.", category: "Applications & Bio-Inorganic" },
  { term: "Chelate Effect", definition: "The enhanced thermodynamic stability of a complex containing multidentate chelating ligands forming 5- or 6-membered rings, driven by favorable entropy gain (ΔS° > 0).", category: "Werner & Nomenclature" },
  { term: "Chlorophyll", definition: "A green photosynthetic pigment containing a Magnesium (Mg²⁺) porphyrin coordination complex.", category: "Applications & Bio-Inorganic" },
  { term: "Cisplatin", definition: "cis-[Pt(NH₃)₂Cl₂], a square planar platinum(II) chemotherapeutic drug that binds and cross-links cellular DNA to destroy cancer cells.", category: "Applications & Bio-Inorganic" },
  { term: "Coordination Isomerism", definition: "Isomerism involving total or partial interchange of ligands between complex cationic and complex anionic coordination entities.", category: "Isomerism & Stereochemistry" },
  { term: "Coordination Number (CN)", definition: "The total number of ligand donor atoms directly bonded to the central metal ion via coordinate σ-bonds.", category: "Werner & Nomenclature" },
  { term: "Coordination Sphere", definition: "The central metal ion and its directly attached ligands enclosed within square brackets [...].", category: "Werner & Nomenclature" },
  { term: "Crystal Field Stabilization Energy (CFSE)", definition: "The net thermodynamic stability gained by the electronic configuration of d-orbitals upon splitting in a ligand crystal field.", category: "VBT, CFT & Spectra" },
  { term: "Crystal Field Theory (CFT)", definition: "An electrostatic bonding model treating metal-ligand interactions as point-charge repulsions between ligand lone pairs and metal d-electrons.", category: "VBT, CFT & Spectra" },
  { term: "d-d Transition", definition: "Promotion of an electron from lower t_2g orbitals to higher e_g orbitals upon absorbing visible photons (ΔE = hc/λ), giving rise to complex color.", category: "VBT, CFT & Spectra" },
  { term: "Denticity", definition: "The number of donor atoms through which a single ligand binds directly to a central metal ion.", category: "Werner & Nomenclature" },
  { term: "Diamagnetism", definition: "A magnetic property where all electrons are spin-paired (n = 0), causing the substance to be weakly repelled by magnetic fields.", category: "VBT, CFT & Spectra" },
  { term: "Double Salt", definition: "An equimolar crystalline combination of two simple salts that dissociates completely into its constituent simple ions in water (e.g., Mohr's salt).", category: "Werner & Nomenclature" },
  { term: "Effective Atomic Number (EAN)", definition: "Sidgwick's rule stating total metal electrons = Z - OS + 2(CN); equals the atomic number of the next noble gas for stable complexes.", category: "Werner & Nomenclature" },
  { term: "Facial (fac)-Isomer", definition: "An octahedral [MA₃B₃] geometrical isomer where three identical ligands occupy the corners of a single triangular face.", category: "Isomerism & Stereochemistry" },
  { term: "Hemoglobin", definition: "An oxygen-transport metalloprotein in erythrocytes containing an Iron(II) (Fe²⁺) protoporphyrin IX complex.", category: "Applications & Bio-Inorganic" },
  { term: "Hexadentate Ligand", definition: "A ligand possessing six donor atoms capable of binding a single metal ion (e.g., Ethylenediaminetetraacetate EDTA⁴⁻).", category: "Werner & Nomenclature" },
  { term: "High-Spin Complex", definition: "A complex formed in weak crystal fields (Δ_o < P) where electrons occupy higher e_g orbitals before pairing in t_2g, maximizing unpaired spins.", category: "VBT, CFT & Spectra" },
  { term: "Hydrate (Solvate) Isomerism", definition: "Structural isomerism where water molecules differ in placement between the coordination sphere and the crystal lattice.", category: "Isomerism & Stereochemistry" },
  { term: "Inner Orbital Complex", definition: "An octahedral complex utilizing inner (n-1)d orbitals (d²sp³), typically formed with strong-field ligands to yield low-spin states.", category: "VBT, CFT & Spectra" },
  { term: "Ionization Isomerism", definition: "Structural isomerism where exchange of anionic ligands between the coordination sphere and ionization sphere yields different ions in solution.", category: "Isomerism & Stereochemistry" },
  { term: "Ionization Sphere", definition: "The outer region outside the square brackets containing counter-ions that dissociate in aqueous solution.", category: "Werner & Nomenclature" },
  { term: "Ligand", definition: "An ion or neutral molecule containing at least one unshared electron pair that binds to a central metal cation via coordinate covalent bonds.", category: "Werner & Nomenclature" },
  { term: "Ligand-to-Metal Charge Transfer (LMCT)", definition: "Electronic transition involving transient movement of an electron from ligand orbital to empty metal d-orbital, generating intense color in d⁰ systems (MnO₄⁻).", category: "VBT, CFT & Spectra" },
  { term: "Linkage Isomerism", definition: "Structural isomerism occurring when an ambidentate ligand coordinates to a metal through different donor atoms.", category: "Isomerism & Stereochemistry" },
  { term: "Low-Spin Complex", definition: "A complex formed in strong crystal fields (Δ_o > P) where electrons pair up in lower t_2g orbitals before occupying e_g.", category: "VBT, CFT & Spectra" },
  { term: "MacArthur-Forrest Process", definition: "Industrial cyanide hydrometallurgy process for extracting gold and silver via soluble [Au(CN)₂]⁻ complexes and zinc displacement.", category: "Applications & Bio-Inorganic" },
  { term: "Meridional (mer)-Isomer", definition: "An octahedral [MA₃B₃] geometrical isomer where three identical ligands lie in a single plane encircling the metal center.", category: "Isomerism & Stereochemistry" },
  { term: "Monodentate Ligand", definition: "A ligand that coordinates through a single donor atom (e.g., Cl⁻, H₂O, NH₃, CN⁻).", category: "Werner & Nomenclature" },
  { term: "Optical Isomers (Enantiomers)", definition: "Non-superimposable mirror-image stereoisomers that rotate plane-polarized light in equal and opposite directions.", category: "Isomerism & Stereochemistry" },
  { term: "Outer Orbital Complex", definition: "An octahedral complex utilizing outer nd orbitals (sp³d²), typically formed with weak-field ligands to yield high-spin states.", category: "VBT, CFT & Spectra" },
  { term: "Pairing Energy (P)", definition: "The electrostatic repulsion energy required to force two electrons into the same d-orbital with paired spins.", category: "VBT, CFT & Spectra" },
  { term: "Primary Valency", definition: "Werner's valency corresponding to the metal's Oxidation State; ionizable and non-directional.", category: "Werner & Nomenclature" },
  { term: "Secondary Valency", definition: "Werner's valency corresponding to the metal's Coordination Number; non-ionizable and directional, defining spatial geometry.", category: "Werner & Nomenclature" },
  { term: "Spectrochemical Series", definition: "An empirically determined arrangement of ligands in order of increasing crystal field splitting power (Δ_o).", category: "VBT, CFT & Spectra" },
  { term: "Spin-Only Formula", definition: "Formula μ_s = √(n(n+2)) BM calculating the magnetic moment from the number of unpaired electrons n.", category: "VBT, CFT & Spectra" },
  { term: "Valence Bond Theory (VBT)", definition: "Pauling's quantum bonding theory explaining coordination complex geometries via vacant metal hybrid orbital overlap.", category: "VBT, CFT & Spectra" },
  { term: "Vitamin B₁₂", definition: "Cyanocobalamin, an essential cobalt (Co³⁺) corrinoid coordination complex necessary for DNA synthesis and nerve function.", category: "Applications & Bio-Inorganic" },
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
    question: "According to Werner’s coordination theory, when 1.0 mole of a violet coordination compound with empirical formula CoCl₃ · 5NH₃ · H₂O is treated with excess aqueous Silver Nitrate (AgNO₃), exactly 2.0 moles of AgCl precipitate immediately. Furthermore, drying the compound over conc. H₂SO₄ causes NO loss of mass (no water loss). What is the correct IUPAC name and primary/secondary valencies of Cobalt in this complex?",
    options: [
      { key: "A", text: "Aquapentaamminecobalt(III) chloride; Primary = 3, Secondary = 6" },
      { key: "B", text: "Pentaamminechloridocobalt(III) chloride monohydrate; Primary = 2, Secondary = 5" },
      { key: "C", text: "Aquatetramminedichloridocobalt(III) chloride; Primary = 3, Secondary = 6" },
      { key: "D", text: "Hexaamminecobalt(III) chloride; Primary = 3, Secondary = 6" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "2.0 moles of AgCl precipitate ⟹ 2 ionizable Cl⁻ ions outside the sphere. No mass loss over conc. H₂SO₄ ⟹ H₂O is an aqua ligand inside the sphere. Formula: [Co(NH₃)₅(H₂O)]Cl₂. Primary Valency (OS) = +3, Secondary Valency (CN) = 6. IUPAC: Aquapentaamminecobalt(III) chloride.",
  },
  {
    id: 2,
    part: "A",
    question: "What is the Crystal Field Stabilization Energy (CFSE) in terms of Δ_o for a high-spin octahedral complex of Fe²⁺ (3d⁶) in the presence of weak-field Fluoride ligands ([FeF₆]⁴⁻, where Δ_o < P)?",
    options: [
      { key: "A", text: "CFSE = -2.4 Δ_o + 2P" },
      { key: "B", text: "CFSE = -0.4 Δ_o" },
      { key: "C", text: "CFSE = -1.6 Δ_o + P" },
      { key: "D", text: "CFSE = -0.6 Δ_o" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Fe²⁺ (3d⁶) in weak field fills high-spin: t_2g⁴ e_g². CFSE = [-0.4(4) + 0.6(2)] Δ_o = [-1.6 + 1.2] Δ_o = -0.4 Δ_o.",
  },
  {
    id: 3,
    part: "A",
    question: "Which of the following square planar or octahedral coordination complexes is CHIRAL and can be resolved into optically active d- and l-enantiomers?",
    options: [
      { key: "A", text: "trans-[Co(en)₂Cl₂]⁺" },
      { key: "B", text: "cis-[Co(en)₂Cl₂]⁺" },
      { key: "C", text: "trans-[Pt(NH₃)₂Cl₂]" },
      { key: "D", text: "fac-[Co(NH₃)₃(NO₂)₃]" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "trans-[Co(en)₂Cl₂]⁺ has a plane of symmetry (σ) and is achiral. cis-[Co(en)₂Cl₂]⁺ lacks any symmetry plane or center of inversion, is chiral, and can be resolved into d- and l-enantiomers.",
  },
  {
    id: 4,
    part: "A",
    question: "Using Valence Bond Theory (VBT), determine the hybridization of Nickel, molecular geometry, and spin-only magnetic moment (μ_s) for the tetracyanidoniccolate(II) anion, [Ni(CN)₄]²⁻:",
    options: [
      { key: "A", text: "sp³; Tetrahedral; μ_s = 2.83 BM" },
      { key: "B", text: "dsp²; Square Planar; μ_s = 0.00 BM (Diamagnetic)" },
      { key: "C", text: "d²sp³; Octahedral; μ_s = 1.73 BM" },
      { key: "D", text: "sp³d; Trigonal Bipyramidal; μ_s = 3.87 BM" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Ni²⁺ is 3d⁸ 4s⁰. Strong-field CN⁻ forces pairing of 3d electrons into 4 inner orbitals, freeing 1 inner 3d orbital for dsp² square planar hybridization. All electrons paired ⟹ n=0 ⟹ μ_s = 0.00 BM (Diamagnetic).",
  },
  {
    id: 5,
    part: "A",
    question: "The octahedral crystal field splitting energy for [Co(H₂O)₆]³⁺ is Δ_o = 18,200 cm⁻¹. What is the estimated tetrahedral crystal field splitting energy (Δ_t) for the corresponding tetrahedral complex [Co(H₂O)₄]³⁺?",
    options: [
      { key: "A", text: "Δ_t = 8,089 cm⁻¹" },
      { key: "B", text: "Δ_t = 18,200 cm⁻¹" },
      { key: "C", text: "Δ_t = 40,950 cm⁻¹" },
      { key: "D", text: "Δ_t = 9,100 cm⁻¹" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "Δ_t = (4/9) Δ_o = (4/9) × 18,200 cm⁻¹ = 8088.89 cm⁻¹ ≈ 8089 cm⁻¹.",
  },
  {
    id: 6,
    part: "A",
    question: "What structural type of isomerism is demonstrated by the pair of coordination compounds [Co(NH₃)₅(SO₄)]Br (Deep Red) and [Co(NH₃)₅Br]SO₄ (Violet)?",
    options: [
      { key: "A", text: "Linkage Isomerism" },
      { key: "B", text: "Ionization Isomerism" },
      { key: "C", text: "Hydrate Isomerism" },
      { key: "D", text: "Coordination Isomerism" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "The two compounds exchange anionic ligands (SO₄²⁻ vs Br⁻) between coordination and ionization spheres, releasing Br⁻ (AgBr ppt) and SO₄²⁻ (BaSO₄ ppt) in water (Ionization Isomerism).",
  },
  {
    id: 7,
    part: "A",
    question: "In the extraction of Gold by the MacArthur-Forrest Cyanide process, crushed gold ore is treated with an aqueous solution of Sodium Cyanide (NaCN) in the presence of air (O₂). What is the chemical formula and geometry of the soluble gold complex ion formed?",
    options: [
      { key: "A", text: "[Au(CN)₄]⁻; Square Planar" },
      { key: "B", text: "[Au(CN)₂]⁻; Linear" },
      { key: "C", text: "[Au(CN)₆]³⁻; Octahedral" },
      { key: "D", text: "[Au(CN)₃]²⁻; Trigonal Planar" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "4Au + 8CN⁻ + 2H₂O + O₂ ──► 4[Au(CN)₂]⁻ + 4OH⁻. Gold(I) (Au⁺, d¹⁰) forms the sp-hybridized Linear soluble complex [Au(CN)₂]⁻.",
  },
  {
    id: 8,
    part: "A",
    question: "Which of the following octahedral complexes exhibits fac/mer (Facial/Meridional) geometrical isomerism?",
    options: [
      { key: "A", text: "[Co(NH₃)₄Cl₂]⁺" },
      { key: "B", text: "[Co(NH₃)₃(NO₂)₃]" },
      { key: "C", text: "[Co(en)₃]³⁺" },
      { key: "D", text: "[Pt(NH₃)₂Cl₂]" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Facial/Meridional (fac/mer) isomerism is unique to octahedral complexes of formula [MA₃B₃], such as [Co(NH₃)₃(NO₂)₃].",
  },
  {
    id: 9,
    part: "A",
    question: "What is the correct IUPAC name of the complex ion [Cr(H₂O)₄Cl₂]⁺?",
    options: [
      { key: "A", text: "Dichloridotetraaquachromium(III) ion" },
      { key: "B", text: "Tetraaquadichloridochromium(III) ion" },
      { key: "C", text: "Dichlorotetraaquachromate(III) ion" },
      { key: "D", text: "Tetraaquadichloridochromate(II) ion" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Ligands in alphabetical order: 'tetraaqua' before 'dichlorido'. Metal is 'chromium' in cationic complex; OS is +3 ⟹ Tetraaquadichloridochromium(III) ion.",
  },
  {
    id: 10,
    part: "A",
    question: "Calculate the crystal field stabilization energy (CFSE) for a low-spin d⁶ octahedral complex (t_2g⁶ e_g⁰) in terms of Δ_o and pairing energy P:",
    options: [
      { key: "A", text: "CFSE = -2.4 Δ_o + 2P" },
      { key: "B", text: "CFSE = -0.4 Δ_o" },
      { key: "C", text: "CFSE = -1.2 Δ_o + P" },
      { key: "D", text: "CFSE = -0.8 Δ_o" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "t_2g⁶ e_g⁰: CFSE = [-0.4(6) + 0.6(0)] Δ_o + 2P = -2.4 Δ_o + 2P (2 extra pairs forced into t_2g beyond high-spin).",
  },
  {
    id: 11,
    part: "B",
    question: "Which of the following ligands are classified as AMBIDENTATE ligands capable of forming Linkage Isomers? (Select all that apply)",
    options: [
      { key: "A", text: "Nitrito (-NO₂⁻ / -ONO⁻)" },
      { key: "B", text: "Thiocyanato (-SCN⁻ / -NCS⁻)" },
      { key: "C", text: "Cyanido (-CN⁻ / -NC⁻)" },
      { key: "D", text: "Ethylenediamine (en)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• -NO₂⁻, -SCN⁻, and -CN⁻ possess two distinct donor atoms (Ambidentate). • Ethylenediamine (en) is a symmetric bidentate chelating ligand.",
  },
  {
    id: 12,
    part: "B",
    question: "Select the valid statements regarding Crystal Field Theory (CFT) splitting in Octahedral complexes (Δ_o): (Select all that apply)",
    options: [
      { key: "A", text: "d-orbitals split into a lower energy t_2g triplet (d_xy, d_yz, d_zx) and higher energy e_g doublet (d_x²-y², d_z²)." },
      { key: "B", text: "Strong-field ligands (e.g., CN⁻, CO) produce a large Δ_o > P, forcing electron pairing in t_2g (Low-Spin)." },
      { key: "C", text: "Weak-field ligands (e.g., F⁻, Cl⁻) produce a small Δ_o < P, yielding High-Spin complexes." },
      { key: "D", text: "t_2g orbitals are raised in energy by +0.6 Δ_o while e_g orbitals are lowered by -0.4 Δ_o." },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct. • D is false: t_2g is LOWERED by -0.4 Δ_o; e_g is RAISED by +0.6 Δ_o.",
  },
  {
    id: 13,
    part: "B",
    question: "Which of the following coordination complex ions are PARAMAGNETIC? (Select all that apply)",
    options: [
      { key: "A", text: "[FeF₆]³⁻ (3d⁵, weak field F⁻)" },
      { key: "B", text: "[Fe(CN)₆]³⁻ (3d⁵, strong field CN⁻)" },
      { key: "C", text: "[Fe(CN)₆]⁴⁻ (3d⁶, strong field CN⁻)" },
      { key: "D", text: "[NiCl₄]²⁻ (3d⁸, weak field Cl⁻)" },
    ],
    correctKeys: ["A", "B", "D"],
    type: "multi",
    explanation: "• [FeF₆]³⁻ (n=5), [Fe(CN)₆]³⁻ (n=1), and [NiCl₄]²⁻ (n=2) are paramagnetic. • [Fe(CN)₆]⁴⁻ (t_2g⁶, n=0) is DIAMAGNETIC.",
  },
  {
    id: 14,
    part: "B",
    question: "Select the correct options regarding the Spectrochemical Series of ligands in order of increasing Δ_o: (Select all that apply)",
    options: [
      { key: "A", text: "I⁻ < Br⁻ < Cl⁻ < F⁻" },
      { key: "B", text: "F⁻ < H₂O < NH₃ < CN⁻" },
      { key: "C", text: "CO is a stronger field ligand than NH₃." },
      { key: "D", text: "Cl⁻ is a stronger field ligand than CN⁻." },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C accurately reflect the spectrochemical series. • D is false: CN⁻ is a much stronger field ligand than Cl⁻.",
  },
  {
    id: 15,
    part: "B",
    question: "Which of the following Biological Coordination Complexes are correctly paired with their central metal ion? (Select all that apply)",
    options: [
      { key: "A", text: "Chlorophyll ──► Magnesium (Mg²⁺)" },
      { key: "B", text: "Hemoglobin / Myoglobin ──► Iron (Fe²⁺)" },
      { key: "C", text: "Vitamin B₁₂ (Cyanocobalamin) ──► Cobalt (Co³⁺)" },
      { key: "D", text: "Carbonic Anhydrase ──► Zinc (Zn²⁺)" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four biological coordination complexes are correctly matched with their central metal ions.",
  },
  {
    id: 16,
    part: "B",
    question: "Select the valid statements regarding cis- and trans-isomers of [Pt(NH₃)₂Cl₂] (Square Planar, dsp²): (Select all that apply)",
    options: [
      { key: "A", text: "cis-[Pt(NH₃)₂Cl₂] is known as Cisplatin and is used as an anti-cancer drug." },
      { key: "B", text: "Both cis- and trans-isomers are optically active and can be resolved into enantiomers." },
      { key: "C", text: "The trans-isomer has a net dipole moment μ = 0 due to symmetrical opposite bond dipoles." },
      { key: "D", text: "Both cis- and trans-isomers possess square planar geometry." },
    ],
    correctKeys: ["A", "C", "D"],
    type: "multi",
    explanation: "• A, C, D are accurate. • B is false: Square planar complexes possess a molecular plane of symmetry and are OPTICALLY INACTIVE.",
  },
  {
    id: 17,
    part: "B",
    question: "Which of the following complex ions feature d²sp³ (Inner Orbital) Octahedral Hybridization? (Select all that apply)",
    options: [
      { key: "A", text: "[Co(NH₃)₆]³⁺" },
      { key: "B", text: "[Fe(CN)₆]⁴⁻" },
      { key: "C", text: "[CoF₆]³⁻" },
      { key: "D", text: "[Fe(CN)₆]³⁻" },
    ],
    correctKeys: ["A", "B", "D"],
    type: "multi",
    explanation: "• [Co(NH₃)₆]³⁺, [Fe(CN)₆]⁴⁻, and [Fe(CN)₆]³⁻ with strong-field ligands pair inner 3d electrons, using d²sp³. • [CoF₆]³⁻ uses sp³d² outer orbitals.",
  },
  {
    id: 18,
    part: "B",
    question: "Select the correct options regarding analytical applications of coordination chemistry: (Select all that apply)",
    options: [
      { key: "A", text: "Ni²⁺ is quantitatively estimated using dimethylglyoxime (DMG) forming a rose-red precipitate of [Ni(DMG)₂]." },
      { key: "B", text: "Fe³⁺ reacts with SCN⁻ to form a blood-red complex [Fe(SCN)]²⁺." },
      { key: "C", text: "Water hardness (Ca²⁺, Mg²⁺) is estimated by titration against EDTA⁴⁻." },
      { key: "D", text: "Brown ring test for NO₃⁻ yields the complex [Fe(H₂O)₅NO]²⁺." },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four options represent established analytical qualitative/quantitative applications of coordination complexes.",
  },
  {
    id: 19,
    part: "B",
    question: "Which of the following statements regarding Tetrahedral Crystal Field Splitting (Δ_t) are TRUE? (Select all that apply)",
    options: [
      { key: "A", text: "Δ_t = (4/9) Δ_o." },
      { key: "B", text: "The d_xy, d_yz, d_zx orbitals (t_2 set) are raised in energy by +0.4 Δ_t." },
      { key: "C", text: "Tetrahedral complexes are almost exclusively High-Spin because Δ_t < P." },
      { key: "D", text: "Tetrahedral complexes display fac/mer isomerism." },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are accurate. • D is false: fac/mer isomerism occurs only in octahedral [MA₃B₃] complexes.",
  },
  {
    id: 20,
    part: "B",
    question: "Select the correct IUPAC names for the given coordination compounds: (Select all that apply)",
    options: [
      { key: "A", text: "K₄[Fe(CN)₆] ──► Potassium hexacyanidoferrate(II)" },
      { key: "B", text: "[Co(NH₃)₆]Cl₃ ──► Hexaamminecobalt(III) chloride" },
      { key: "C", text: "[Ni(CO)₄] ──► Tetracarbonylnickel(0)" },
      { key: "D", text: "Na[Al(OH)₄] ──► Sodium tetrahydroxidoaluminate(III)" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four IUPAC names strictly adhere to international coordination naming conventions.",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
type Tab = "werner-ligands" | "iupac" | "structural-isomerism" | "stereoisomerism" | "vbt-geometry" | "cft-splitting" | "cfse-calculator" | "color-applications" | "traps" | "glossary" | "selftest";

export const CoordinationCompoundsDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("werner-ligands");
  const [activeTrapId, setActiveTrapId] = useState<string | null>(null);

  // CFSE Live Calculator State
  const [dn, setDn] = useState<number>(4); // d-electron count (1 to 10)
  const [fieldStrength, setFieldStrength] = useState<"weak" | "strong">("weak");

  const computeCFSE = () => {
    // Octahedral field electronic filling
    let nt2g = 0;
    let neg = 0;
    let extraPairs = 0;

    if (fieldStrength === "weak") {
      // High-spin filling: fill t2g (1,2,3), then eg (4,5), then pair t2g (6,7,8), then pair eg (9,10)
      if (dn <= 3) {
        nt2g = dn;
        neg = 0;
      } else if (dn <= 5) {
        nt2g = 3;
        neg = dn - 3;
      } else if (dn <= 8) {
        nt2g = 3 + (dn - 5);
        neg = 2;
      } else {
        nt2g = 6;
        neg = dn - 6;
      }
    } else {
      // Strong field (low-spin): fill and pair t2g (1 to 6), then fill eg (7 to 10)
      if (dn <= 6) {
        nt2g = dn;
        neg = 0;
        if (dn === 4) extraPairs = 1;
        if (dn === 5) extraPairs = 2;
        if (dn === 6) extraPairs = 2;
      } else {
        nt2g = 6;
        neg = dn - 6;
        if (dn === 7) extraPairs = 1;
      }
    }

    const netDo = (-0.4 * nt2g + 0.6 * neg).toFixed(1);
    return { nt2g, neg, netDo, extraPairs };
  };

  const cfseResult = computeCFSE();

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
    { id: "werner-ligands", label: "Werner & Ligands", icon: <Atom className="w-3.5 h-3.5 shrink-0" /> },
    { id: "iupac", label: "IUPAC Naming", icon: <Binary className="w-3.5 h-3.5 shrink-0" /> },
    { id: "structural-isomerism", label: "Structural Isomers", icon: <Split className="w-3.5 h-3.5 shrink-0" /> },
    { id: "stereoisomerism", label: "Stereoisomerism", icon: <Shapes className="w-3.5 h-3.5 shrink-0" /> },
    { id: "vbt-geometry", label: "VBT & Hybridization", icon: <Layers className="w-3.5 h-3.5 shrink-0" /> },
    { id: "cft-splitting", label: "CFT Splitting", icon: <Grid className="w-3.5 h-3.5 shrink-0" /> },
    { id: "cfse-calculator", label: "CFSE Calculator", icon: <Activity className="w-3.5 h-3.5 shrink-0" /> },
    { id: "color-applications", label: "Color & Applications", icon: <Palette className="w-3.5 h-3.5 shrink-0" /> },
    { id: "traps", label: "10 NEST Traps", icon: <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> },
    { id: "glossary", label: "Master Glossary", icon: <BookOpen className="w-3.5 h-3.5 shrink-0" /> },
    { id: "selftest", label: "NEST 20-Q Test", icon: <Award className="w-3.5 h-3.5 shrink-0" /> },
  ];

  return (
    <div className="my-4 sm:my-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-slate-50 to-blue-50/20 border border-slate-200/90 p-2.5 sm:p-7 shadow-xs space-y-4 sm:space-y-6 select-none w-full">

      {/* HEADER */}
      <div className="flex flex-col items-center text-center space-y-2.5 max-w-2xl mx-auto w-full">
        <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-200 shadow-2xs flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-blue-600" />
          CHEMISTRY INTERACTIVE MODULE — COORDINATION COMPOUNDS (CLASS XII / UNIT XIV)
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <Boxes className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 shrink-0" />
            COORDINATION COMPOUNDS: WERNER, IUPAC, ISOMERISM, VBT &amp; CFT
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            Werner’s Dual Valency · IUPAC Naming · Structural &amp; Stereoisomerism · VBT Geometry &amp; Magnetism · CFT Octahedral/Tetrahedral Splitting &amp; Live CFSE Engine
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

      {/* TAB 1: WERNER & LIGANDS */}
      {activeTab === "werner-ligands" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Atom className="w-4 h-4 text-blue-600 shrink-0" />
              Werner’s Dual Valency Theory &amp; Ligand Taxonomy
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-black text-slate-900 uppercase">Werner’s Dual Valency</span>
                <p className="text-slate-800 font-semibold">• <strong>Primary Valency:</strong> Ionizable, non-directional; corresponds to <strong>Oxidation State</strong>.</p>
                <p className="text-slate-800 font-semibold">• <strong>Secondary Valency:</strong> Non-ionizable, directional; corresponds to <strong>Coordination Number</strong> and defines 3D geometry.</p>
                <p className="text-slate-600 font-semibold">• Double salts dissociate completely (Mohr’s salt); complexes retain integrity (K₄[Fe(CN)₆]).</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1.5">
                <span className="font-black text-blue-950 uppercase">Ligand Denticity &amp; Chelate Effect</span>
                <p className="text-blue-900 font-semibold">• <strong>Denticity:</strong> Monodentate (Cl⁻), Bidentate (en, ox²⁻), Hexadentate (<strong>EDTA⁴⁻</strong>).</p>
                <p className="text-blue-950 font-bold">• <strong>Ambidentate:</strong> -NO₂⁻ vs -ONO⁻, -SCN⁻ vs -NCS⁻, -CN⁻ vs -NC⁻.</p>
                <p className="text-blue-900 font-semibold">• <strong>Chelate Effect:</strong> Multidentate rings increase stability through entropy (ΔS° &gt; 0).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: IUPAC */}
      {activeTab === "iupac" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Binary className="w-4 h-4 text-indigo-600 shrink-0" />
              Mononuclear Complex IUPAC Nomenclature
            </h4>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] space-y-1">
              <span className="font-black text-slate-900 block">Architecture: [Cation] ──► [Ligands Alphabetical] ──► [Metal(-ate if anionic)] ──► [(Roman Numeral OS)]</span>
              <p className="text-slate-700 font-semibold">• Anionic ligands: -ido (chlorido, cyanido, hydroxido, oxalato).</p>
              <p className="text-slate-700 font-semibold">• Neutral ligands: aqua (H₂O), ammine (NH₃), carbonyl (CO), nitrosyl (NO).</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[10px]">
              <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1 font-mono font-bold text-indigo-950">
                <p>[Co(NH₃)₅(CO₃)]Cl ──► Pentaamminecarbonatocobalt(III) chloride</p>
                <p>K₃[Fe(CN)₆] ──► Potassium hexacyanidoferrate(III)</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 font-mono font-bold text-slate-900">
                <p>[Cr(H₂O)₄Cl₂]⁺ ──► Tetraaquadichloridochromium(III) ion</p>
                <p>[Ni(CO)₄] ──► Tetracarbonylnickel(0)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STRUCTURAL ISOMERS */}
      {activeTab === "structural-isomerism" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Split className="w-4 h-4 text-emerald-600 shrink-0" />
              Structural Isomerism &amp; Diagnostic Chemical Tests
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 block">1. Ionization Isomerism</span>
                <p className="text-slate-700 font-semibold">[Co(NH₃)₅SO₄]Br (Red) ──► AgBr pale-yellow ppt with AgNO₃.</p>
                <p className="text-slate-700 font-semibold">[Co(NH₃)₅Br]SO₄ (Violet) ──► BaSO₄ white ppt with BaCl₂.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="font-black text-emerald-950 block">2. Solvate / Hydrate Isomerism</span>
                <p className="text-emerald-900 font-semibold">[Cr(H₂O)₆]Cl₃ (Violet) ──► 3 moles AgCl ppt.</p>
                <p className="text-emerald-900 font-semibold">[Cr(H₂O)₅Cl]Cl₂·H₂O (Green) ──► 2 moles AgCl ppt.</p>
                <p className="text-emerald-900 font-semibold">[Cr(H₂O)₄Cl₂]Cl·2H₂O (Dark green) ──► 1 mole AgCl ppt.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                <span className="font-black text-amber-950 block">3. Linkage Isomerism</span>
                <p className="text-amber-900 font-semibold">[Co(NH₃)₅(NO₂)]Cl₂ (Yellow, nitro-N bound).</p>
                <p className="text-amber-900 font-semibold">[Co(NH₃)₅(ONO)]Cl₂ (Red, nitrito-O bound).</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 block">4. Coordination Isomerism</span>
                <p className="text-slate-700 font-semibold">[Co(NH₃)₆][Cr(CN)₆] vs [Cr(NH₃)₆][Co(CN)₆].</p>
                <p className="text-slate-600">Total interchange of ligands between two metal centers.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: STEREOISOMERISM */}
      {activeTab === "stereoisomerism" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Shapes className="w-4 h-4 text-purple-600 shrink-0" />
              Geometrical (cis/trans, fac/mer) &amp; Optical Activity
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 block">Geometrical Isomerism Rules</span>
                <p className="text-slate-800 font-semibold">• <strong>Tetrahedral (CN=4):</strong> CANNOT exhibit geometrical isomerism!</p>
                <p className="text-slate-800 font-semibold">• <strong>Square Planar [MA₂B₂]:</strong> cis (90°, Cisplatin) vs trans (180°, Transplatin).</p>
                <p className="text-slate-800 font-semibold">• <strong>Octahedral [MA₃B₃]:</strong> Facial (fac, triangular face) vs Meridional (mer, equatorial plane).</p>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1">
                <span className="font-black text-purple-950 block">Optical Activity &amp; Chirality</span>
                <p className="text-purple-900 font-semibold">• <strong>[M(aa)₃] (e.g., [Co(en)₃]³⁺):</strong> Chiral; d- and l-enantiomers.</p>
                <p className="text-purple-900 font-semibold">• <strong>cis-[M(aa)₂B₂] (e.g., cis-[Co(en)₂Cl₂]⁺):</strong> Chiral; resolvable.</p>
                <p className="text-purple-950 font-bold">• <strong>trans-[M(aa)₂B₂]:</strong> Has a Plane of Symmetry (σ) ──► ACHIRAL / Optically Inactive!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: VBT & HYBRIDIZATION */}
      {activeTab === "vbt-geometry" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600 shrink-0" />
              Valence Bond Theory: Hybridization, Geometry, &amp; Magnetism
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[10px]">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 block">4-Coordinate Complexes (CN = 4)</span>
                <p className="text-slate-800 font-semibold">• <strong>[Ni(CN)₄]²⁻:</strong> Ni²⁺ (3d⁸), Strong CN⁻ ──► <strong>dsp² Square Planar</strong> (n=0, Diamagnetic).</p>
                <p className="text-slate-800 font-semibold">• <strong>[NiCl₄]²⁻:</strong> Ni²⁺ (3d⁸), Weak Cl⁻ ──► <strong>sp³ Tetrahedral</strong> (n=2, 2.83 BM).</p>
                <p className="text-slate-800 font-semibold">• <strong>[Ni(CO)₄]:</strong> Ni⁰ (3d¹⁰), Strong CO ──► <strong>sp³ Tetrahedral</strong> (n=0, Diamagnetic).</p>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
                <span className="font-black text-blue-950 block">6-Coordinate Complexes (CN = 6)</span>
                <p className="text-blue-900 font-semibold">• <strong>[Co(NH₃)₆]³⁺:</strong> Co³⁺ (3d⁶), Strong NH₃ ──► <strong>d²sp³ Inner Octahedral</strong> (n=0, Diamagnetic).</p>
                <p className="text-blue-900 font-semibold">• <strong>[CoF₆]³⁻:</strong> Co³⁺ (3d⁶), Weak F⁻ ──► <strong>sp³d² Outer Octahedral</strong> (n=4, 4.90 BM).</p>
                <p className="text-blue-900 font-semibold">• <strong>[Fe(CN)₆]⁴⁻:</strong> Fe²⁺ (3d⁶), Strong CN⁻ ──► <strong>d²sp³ Inner</strong> (n=0, Diamagnetic).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: CFT SPLITTING */}
      {activeTab === "cft-splitting" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Grid className="w-4 h-4 text-teal-600 shrink-0" />
              Crystal Field Theory: Octahedral (Δ_o) vs. Tetrahedral (Δ_t)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200 space-y-1.5">
                <span className="font-black text-teal-950 uppercase">Octahedral Splitting (Δ_o)</span>
                <p className="font-mono text-teal-900 font-bold">• e_g Doublet (d_x²-y², d_z²): Raised by +0.6 Δ_o (+6 Dq)</p>
                <p className="font-mono text-teal-900 font-bold">• t_2g Triplet (d_xy, d_yz, d_zx): Lowered by -0.4 Δ_o (-4 Dq)</p>
                <p className="text-teal-800">Ligands approach along x, y, z axes, directly repelling e_g orbitals.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-black text-slate-900 uppercase">Tetrahedral Splitting (Δ_t)</span>
                <p className="font-mono text-slate-800 font-bold">• t_2 Set: Raised by +0.4 Δ_t</p>
                <p className="font-mono text-slate-800 font-bold">• e Set: Lowered by -0.6 Δ_t</p>
                <p className="font-mono font-black text-blue-900">Δ_t = (4/9) Δ_o</p>
                <p className="text-slate-700 font-bold">• High-Spin Rule: Δ_t &lt;&lt; P enforces High-Spin configurations.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: CFSE LIVE CALCULATOR */}
      {activeTab === "cfse-calculator" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600 shrink-0" />
              Spectrochemical Series &amp; Live CFSE Calculation Engine
            </h4>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] space-y-1">
              <span className="font-black text-slate-900 block">Spectrochemical Series:</span>
              <p className="font-mono font-bold text-slate-800">I⁻ &lt; Br⁻ &lt; SCN⁻ &lt; Cl⁻ &lt; S²⁻ &lt; F⁻ &lt; OH⁻ &lt; ox²⁻ &lt; H₂O &lt; NCS⁻ &lt; EDTA⁴⁻ &lt; NH₃ &lt; en &lt; CN⁻ &lt; CO</p>
            </div>

            {/* Interactive Calculator Controls */}
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2 text-[10px]">
              <span className="font-black text-emerald-950 uppercase tracking-wider block">Live Octahedral CFSE Engine</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-bold text-slate-700 block">d-Electron Count (d¹ to d¹⁰):</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={dn}
                    onChange={(e) => setDn(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between font-mono font-bold text-slate-700 text-[9px]">
                    <span>d¹</span><span>d⁴</span><span>d⁶</span><span>d¹⁰</span>
                  </div>
                  <span className="font-mono font-black text-emerald-900 text-xs block mt-1">Selected: d^{dn}</span>
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-700 block">Ligand Field Splitting Power:</label>
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => setFieldStrength("weak")}
                      className={`flex-1 py-1.5 rounded font-black text-[10px] border transition-all ${
                        fieldStrength === "weak" ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-700 border-slate-200"
                      }`}
                    >
                      Weak Field (High-Spin, Δ_o &lt; P)
                    </button>
                    <button
                      onClick={() => setFieldStrength("strong")}
                      className={`flex-1 py-1.5 rounded font-black text-[10px] border transition-all ${
                        fieldStrength === "strong" ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-700 border-slate-200"
                      }`}
                    >
                      Strong Field (Low-Spin, Δ_o &gt; P)
                    </button>
                  </div>
                </div>
              </div>

              {/* Calculation Output Box */}
              <div className="p-3 rounded-lg bg-white border border-emerald-300 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">Orbital Filling:</span>
                  <span className="font-mono font-black text-emerald-900">t_2g^{cfseResult.nt2g} e_g^{cfseResult.neg}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">Calculated CFSE:</span>
                  <span className="font-mono font-black text-emerald-950">
                    {cfseResult.netDo} Δ_o {cfseResult.extraPairs > 0 ? `+ ${cfseResult.extraPairs}P` : ""}
                  </span>
                </div>
                <p className="text-[9px] text-slate-600 font-semibold">
                  Formula: CFSE = [-0.4 × {cfseResult.nt2g} + 0.6 × {cfseResult.neg}] Δ_o {cfseResult.extraPairs > 0 ? `+ ${cfseResult.extraPairs}P` : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: COLOR & APPLICATIONS */}
      {activeTab === "color-applications" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Palette className="w-4 h-4 text-purple-600 shrink-0" />
              Origin of Color (d-d vs. LMCT) &amp; Landmark Applications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1">
                <span className="font-black text-purple-950 uppercase block">Color &amp; Complementary Spectra</span>
                <p className="text-purple-900 font-semibold">• Absorbs RED (650 nm) ──► Appears GREEN (Cr³⁺).</p>
                <p className="text-purple-900 font-semibold">• Absorbs YELLOW (580 nm) ──► Appears BLUE (Cu²⁺).</p>
                <p className="text-purple-950 font-bold">• LMCT: MnO₄⁻ (Purple) and Cr₂O₇²⁻ (Orange) colors arise from LMCT!</p>
                <p className="text-purple-800">• d⁰ and d¹⁰ ions (Sc³⁺, Zn²⁺) are colorless.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 uppercase block">Landmark Applications</span>
                <p className="text-slate-800 font-semibold">• <strong>Analytical:</strong> Ni²⁺ + DMG ──► [Ni(DMG)₂] rose-red ppt.</p>
                <p className="text-slate-800 font-semibold">• <strong>Metallurgy:</strong> MacArthur-Forrest Gold extraction ([Au(CN)₂]⁻).</p>
                <p className="text-slate-800 font-semibold">• <strong>Biological:</strong> Chlorophyll (Mg²⁺), Hemoglobin (Fe²⁺), Vit B₁₂ (Co³⁺).</p>
                <p className="text-slate-800 font-semibold">• <strong>Medicinal:</strong> Cisplatin anti-cancer; Ca-EDTA²⁻ for lead poisoning.</p>
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
              All 10 High-Yield NEST Coordination Chemistry Misconceptions &amp; Traps
            </h4>
            <div className="space-y-2">
              {coordTraps.map((trap) => {
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
                placeholder="Search coordination chemistry terms..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {["All", "Werner & Nomenclature", "Isomerism & Stereochemistry", "VBT, CFT & Spectra", "Applications & Bio-Inorganic"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGlossaryCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                    glossaryCategory === cat ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
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
              <Award className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-blue-500" />
              <h4 className="text-xl sm:text-2xl font-black text-slate-900">Your Score: {score} / {mcqData.length}</h4>
              <p className="text-sm font-semibold text-slate-600">
                {score >= 17 ? "Outstanding! Mastery level for NEST & IChO Coordination Chemistry Module." : score >= 12 ? "Good performance — review incorrect explanations." : "Needs practice — revisit earlier tabs and retake."}
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
                        testPartFilter === part ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200"
                      }`}
                    >
                      {part === "ALL" ? "All 20 Questions" : part === "A" ? "Part A (Single MCQ)" : "Part B (Multi MSQ)"}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="flex-1 sm:w-36 h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full rounded-full bg-blue-500 transition-all duration-500" style={{ width: `${((currentQ + 1) / mcqData.length) * 100}%` }} />
                  </div>
                  <span className="text-[10px] font-black text-slate-700">Q{currentQ + 1} of {mcqData.length}</span>
                </div>
              </div>

              <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    {currentMCQ.id}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-slate-100 text-slate-700">
                        Part {currentMCQ.part}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                        currentMCQ.type === "multi" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
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
                      bg = "bg-blue-50 border-blue-400";
                    }

                    return (
                      <button key={opt.key} onClick={() => toggleAnswer(currentQ, opt.key, currentMCQ.type)} className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl border-2 text-left transition-all ${bg}`}>
                        <span className={`w-5 h-5 rounded shrink-0 border-2 flex items-center justify-center text-[10px] font-black transition-all ${
                          isSubmitted && isCorrect ? "bg-emerald-600 border-emerald-600 text-white" : isSubmitted && isSelected && !isCorrect ? "bg-rose-600 border-rose-600 text-white" : isSelected ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 text-slate-500"
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
                      <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="text-[9px] font-black uppercase tracking-wider text-blue-700">Detailed Solution &amp; Inorganic Explanation</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 leading-relaxed">{currentMCQ.explanation}</p>
                  </div>
                )}

                <div className="flex items-center gap-2 flex-wrap">
                  {!submitted[currentQ] ? (
                    <button onClick={() => submitAnswer(currentQ)} disabled={!(selectedAnswers[currentQ]?.length)} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-black hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all">Submit Answer</button>
                  ) : null}
                  {currentQ < mcqData.length - 1 && (
                    <button onClick={() => setCurrentQ((q) => q + 1)} className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-black hover:bg-slate-700 transition-all flex items-center gap-1.5">
                      Next Question <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {currentQ === mcqData.length - 1 && submitted[currentQ] && (
                    <button onClick={computeScore} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-black hover:bg-blue-700 transition-all flex items-center gap-1.5">
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
                      i === currentQ ? "bg-blue-600 text-white border-blue-600" : isDone ? isCorrect ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-rose-100 text-rose-800 border-rose-300" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
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

export default CoordinationCompoundsDiagram;
