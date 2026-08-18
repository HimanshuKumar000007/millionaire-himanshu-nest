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
  Link2,
  Boxes,
} from "lucide-react";

// ============================================================================
// 1. DATA: FAJANS' RULES MATRIX
// ============================================================================
interface FajansFactor {
  factor: string;
  rule: string;
  explanation: string;
  examples: string;
}

const fajansFactors: FajansFactor[] = [
  {
    factor: "Cation Size (r₊)",
    rule: "Small Cation Radius",
    explanation: "High charge density / Polarising Power (Φ = z⁺ / r₊) strongly distorts the anion's electron cloud.",
    examples: "LiCl > NaCl > KCl > RbCl > CsCl (Covalent character order)",
  },
  {
    factor: "Anion Size (r₋)",
    rule: "Large Anion Radius",
    explanation: "Loosely held outer electron cloud with high Polarisability is easily polarized toward the cation.",
    examples: "LiI > LiBr > LiCl > LiF (LiI is most covalent / soluble in organic solvents)",
  },
  {
    factor: "Ionic Charges (z⁺, z⁻)",
    rule: "High Positive/Negative Charges",
    explanation: "Stronger electrostatic field produces greater polarization distortion.",
    examples: "SnCl₄ > SnCl₂ | AlCl₃ > MgCl₂ > NaCl | Fe³⁺ > Fe²⁺",
  },
  {
    factor: "Electronic Configuration",
    rule: "Pseudo-Noble Gas Cation (n-1)d¹⁰ ns⁰",
    explanation: "Poor shielding by 10 d-electrons exerts higher effective nuclear charge than ns² np⁶ noble gas core.",
    examples: "CuCl (d¹⁰, MP 430°C) > NaCl (p⁶, MP 801°C) | AgCl > KCl",
  },
];

// ============================================================================
// 2. DATA: VSEPR GEOMETRIES & SHAPES MATRIX
// ============================================================================
interface VseprShape {
  sn: number;
  hybrid: string;
  bp: number;
  lp: number;
  geometry: string;
  shape: string;
  angles: string;
  examples: string;
}

const vseprShapes: VseprShape[] = [
  { sn: 2, hybrid: "sp", bp: 2, lp: 0, geometry: "Linear", shape: "Linear", angles: "180°", examples: "BeCl₂, CO₂, HCN, C₂H₂" },
  { sn: 3, hybrid: "sp²", bp: 3, lp: 0, geometry: "Trigonal Planar", shape: "Trigonal Planar", angles: "120°", examples: "BF₃, BCl₃, SO₃, NO₃⁻" },
  { sn: 3, hybrid: "sp²", bp: 2, lp: 1, geometry: "Trigonal Planar", shape: "Bent / V-shaped", angles: "< 120° (119.5°)", examples: "SO₂, O₃, SnCl₂, NO₂⁻" },
  { sn: 4, hybrid: "sp³", bp: 4, lp: 0, geometry: "Tetrahedral", shape: "Tetrahedral", angles: "109.5°", examples: "CH₄, CCl₄, NH₄⁺, SO₄²⁻" },
  { sn: 4, hybrid: "sp³", bp: 3, lp: 1, geometry: "Tetrahedral", shape: "Trigonal Pyramidal", angles: "< 109.5° (107°)", examples: "NH₃, PCl₃, H₃O⁺, XeO₃" },
  { sn: 4, hybrid: "sp³", bp: 2, lp: 2, geometry: "Tetrahedral", shape: "Bent / Angular", angles: "< 109.5° (104.5°)", examples: "H₂O, OF₂, SCl₂, NH₂⁻" },
  { sn: 5, hybrid: "sp³d", bp: 5, lp: 0, geometry: "Trigonal Bipyramidal", shape: "Trigonal Bipyramidal", angles: "90°, 120°, 180°", examples: "PCl₅, PF₅, AsF₅" },
  { sn: 5, hybrid: "sp³d", bp: 4, lp: 1, geometry: "Trigonal Bipyramidal", shape: "Seesaw", angles: "< 90°, < 120°", examples: "SF₄, SeF₄, IF₄⁺" },
  { sn: 5, hybrid: "sp³d", bp: 3, lp: 2, geometry: "Trigonal Bipyramidal", shape: "T-Shaped", angles: "< 90°, 180°", examples: "ClF₃, BrF₃, ICl₃" },
  { sn: 5, hybrid: "sp³d", bp: 2, lp: 3, geometry: "Trigonal Bipyramidal", shape: "Linear", angles: "180°", examples: "XeF₂, I₃⁻, ICl₂⁻, N₃⁻" },
  { sn: 6, hybrid: "sp³d²", bp: 6, lp: 0, geometry: "Octahedral", shape: "Octahedral", angles: "90°, 180°", examples: "SF₆, SeF₆, PF₆⁻, SiF₆²⁻" },
  { sn: 6, hybrid: "sp³d²", bp: 5, lp: 1, geometry: "Octahedral", shape: "Square Pyramidal", angles: "< 90°", examples: "BrF₅, IF₅, XeOF₄" },
  { sn: 6, hybrid: "sp³d²", bp: 4, lp: 2, geometry: "Octahedral", shape: "Square Planar", angles: "90°, 180°", examples: "XeF₄, ICl₄⁻, BrF₄⁻" },
  { sn: 7, hybrid: "sp³d³", bp: 7, lp: 0, geometry: "Pentagonal Bipyramidal", shape: "Pentagonal Bipyramidal", angles: "72°, 90°, 180°", examples: "IF₇" },
  { sn: 7, hybrid: "sp³d³", bp: 6, lp: 1, geometry: "Pentagonal Bipyramidal", shape: "Distorted Octahedral", angles: "Non-ideal", examples: "XeF₆ (Gas phase)" },
];

// ============================================================================
// 3. DATA: MOT SPECIES COMPARISONS (O₂ & N₂ FAMILIES)
// ============================================================================
interface MotSpecies {
  species: string;
  totalElectrons: number;
  config: string;
  bondOrder: number;
  magnetism: string;
  unpaired: number;
}

const oxygenFamilyMOT: MotSpecies[] = [
  { species: "O₂⁺", totalElectrons: 15, config: "σ2s² σ*2s² σ2p_z² (π2p_x = π2p_y)⁴ (π*2p_x)¹", bondOrder: 2.5, magnetism: "Paramagnetic", unpaired: 1 },
  { species: "O₂", totalElectrons: 16, config: "σ2s² σ*2s² σ2p_z² (π2p_x = π2p_y)⁴ (π*2p_x = π*2p_y)²", bondOrder: 2.0, magnetism: "Paramagnetic", unpaired: 2 },
  { species: "O₂⁻ (Superoxide)", totalElectrons: 17, config: "σ2s² σ*2s² σ2p_z² (π2p_x = π2p_y)⁴ (π*2p_x)² (π*2p_y)¹", bondOrder: 1.5, magnetism: "Paramagnetic", unpaired: 1 },
  { species: "O₂²⁻ (Peroxide)", totalElectrons: 18, config: "σ2s² σ*2s² σ2p_z² (π2p_x = π2p_y)⁴ (π*2p_x = π*2p_y)⁴", bondOrder: 1.0, magnetism: "Diamagnetic", unpaired: 0 },
];

const nitrogenFamilyMOT: MotSpecies[] = [
  { species: "N₂", totalElectrons: 14, config: "σ2s² σ*2s² (π2p_x = π2p_y)⁴ σ2p_z²", bondOrder: 3.0, magnetism: "Diamagnetic", unpaired: 0 },
  { species: "N₂⁺", totalElectrons: 13, config: "σ2s² σ*2s² (π2p_x = π2p_y)⁴ (σ2p_z)¹", bondOrder: 2.5, magnetism: "Paramagnetic", unpaired: 1 },
  { species: "N₂⁻", totalElectrons: 15, config: "σ2s² σ*2s² (π2p_x = π2p_y)⁴ σ2p_z² (π*2p_x)¹", bondOrder: 2.5, magnetism: "Paramagnetic", unpaired: 1 },
  { species: "N₂²⁻", totalElectrons: 16, config: "σ2s² σ*2s² (π2p_x = π2p_y)⁴ σ2p_z² (π*2p_x = π*2p_y)²", bondOrder: 2.0, magnetism: "Paramagnetic", unpaired: 2 },
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

const bondingTraps: Misconception[] = [
  { id: "t1", trap: "In trigonal bipyramidal sp³d geometry, lone pairs prefer axial positions.", reality: "Lone pairs and multiple bonds ALWAYS occupy EQUATORIAL positions (sp² hybrid, 33.3% s-character) to minimize 90° repulsions (Bent's Rule).", tip: "Axial positions (pd hybrid, 0% s-character) bind electronegative atoms (F, Cl)." },
  { id: "t2", trap: "NF₃ has a higher dipole moment than NH₃ because Fluorine is more electronegative than Hydrogen.", reality: "NH₃ (μ = 1.47 D) > NF₃ (μ = 0.23 D). In NF₃, N-F bond dipoles oppose the lone pair dipole; in NH₃, N-H dipoles reinforce it.", tip: "Always take the vector sum of bond dipoles with the lone pair dipole." },
  { id: "t3", trap: "O₂ is diamagnetic because it contains an even number of electrons (16 e⁻).", reality: "O₂ is PARAMAGNETIC containing 2 unpaired electrons in degenerate π* 2p_x = π* 2p_y antibonding MOs (proved by MOT).", tip: "VBT fails to explain O₂ paramagnetism; MOT predicts it directly." },
  { id: "t4", trap: "Intramolecular hydrogen bonding increases the boiling point of a liquid.", reality: "Intramolecular H-bonding LOWERS the boiling point (makes compound steam-volatile) by preventing intermolecular association (e.g. o-nitrophenol vs p-nitrophenol).", tip: "Intermolecular H-bonding raises boiling points; Intramolecular H-bonding lowers boiling points." },
  { id: "t5", trap: "The σ 2p_z MO is lower in energy than π 2p_x,y MOs in N₂.", reality: "In N₂ (Z ≤ 7), strong s-p mixing pushes σ 2p_z ABOVE π 2p_x,y. For Z > 7 (O₂, F₂), σ 2p_z is below π 2p_x,y.", tip: "Z ≤ 7 order: π2p_x,y < σ2p_z; Z > 7 order: σ2p_z < π2p_x,y." },
  { id: "t6", trap: "XeF₆ has a perfect, symmetric octahedral shape.", reality: "XeF₆ has 6 bp + 1 lp = SN 7, producing a Distorted Octahedral / Capped Octahedral shape in the gas phase.", tip: "XeF₄ (4 bp + 2 lp) is Square Planar; XeF₆ (6 bp + 1 lp) is Distorted Octahedral." },
  { id: "t7", trap: "A single π-bond is stronger than a single σ-bond.", reality: "A σ-bond is STRONGER than a π-bond due to greater extent of axial orbital overlap compared to lateral sideways overlap.", tip: "Bond strength: σ(p-p) > σ(s-p) > σ(s-s) > π(p-p)." },
  { id: "t8", trap: "The bond order of CO is 3, while CO⁺ has a lower bond order of 2.5.", reality: "CO⁺ has an anomalous higher bond order of 3.5 (BO_CO = 3.0) because an electron is removed from a slightly antibonding σ 2s* MO.", tip: "CO⁺ bond length is shorter than CO (anomalous heteronuclear exception)." },
  { id: "t9", trap: "All d-orbitals participate equally in sp³d² hybridization.", reality: "sp³d² uses d_x²-y² and d_z² (axial d-orbitals). sp³d uses d_z² only; dsp² uses d_x²-y² exclusively.", tip: "dsp² = d_x²-y²; sp³d = d_z²; sp³d² = d_x²-y² + d_z²." },
  { id: "t10", trap: "Second electron gain enthalpy (Δ_eg H₂) can be exothermic for highly electronegative anions.", reality: "Δ_eg H₂ is ALWAYS ENDOTHERMIC (Δ > 0) for ALL elements without exception due to strong anion-electron electrostatic repulsions.", tip: "O⁻ + e⁻ → O²⁻ is +780 kJ/mol (endothermic)." },
];

// ============================================================================
// 5. DATA: MASTER GLOSSARY (36 DEFINITIONS)
// ============================================================================
interface GlossaryTerm {
  term: string;
  definition: string;
  category: "Ionic Bonding & Lattice" | "Covalency, Fajans & Dipole" | "VSEPR & Hybridization" | "Molecular Orbital Theory" | "Hydrogen Bonding & Resonance";
}

const masterGlossary: GlossaryTerm[] = [
  { term: "Antibonding Molecular Orbital (ψ_AB)", definition: "A higher-energy MO formed by destructive interference of atomic wavefunctions with a nodal plane between nuclei.", category: "Molecular Orbital Theory" },
  { term: "Axial Bonds", definition: "The two perpendicular bonds (90°) pointing above and below the equatorial plane in trigonal bipyramidal (sp³d) geometry.", category: "VSEPR & Hybridization" },
  { term: "Bent's Rule", definition: "More electronegative atoms prefer hybrid orbitals with less s-character (pd), while lone pairs and multiple bonds prefer higher s-character (sp²).", category: "VSEPR & Hybridization" },
  { term: "Bond Order (BO)", definition: "Half the difference between bonding and antibonding electrons: BO = (N_b - N_a) / 2.", category: "Molecular Orbital Theory" },
  { term: "Bonding Molecular Orbital (ψ_B)", definition: "A lower-energy MO formed by constructive interference of atomic wavefunctions with high electron density between nuclei.", category: "Molecular Orbital Theory" },
  { term: "Born-Haber Cycle", definition: "A thermodynamic cycle applying Hess's law to calculate lattice energy from formation, sublimation, ionization, dissociation, and electron gain energies.", category: "Ionic Bonding & Lattice" },
  { term: "Born-Landé Equation", definition: "Equation relating lattice energy directly to ionic charges and inversely to inter-ionic distance: U ∝ -(z⁺ z⁻) / (r₊ + r₋).", category: "Ionic Bonding & Lattice" },
  { term: "Chelate Ring", definition: "A stable 5- or 6-membered ring structure formed by intramolecular hydrogen bonding or polydentate coordination.", category: "Hydrogen Bonding & Resonance" },
  { term: "Covalent Bond", definition: "A chemical bond formed by equal sharing of electron pairs between two atoms.", category: "Covalency, Fajans & Dipole" },
  { term: "Dipole Moment (μ)", definition: "Vector product of electric charge magnitude q and separation distance d (μ = q × d). 1 D = 3.336 × 10⁻³⁰ C·m.", category: "Covalency, Fajans & Dipole" },
  { term: "Equatorial Bonds", definition: "The three coplanar bonds (120°) lying in the central plane of trigonal bipyramidal (sp³d) geometry.", category: "VSEPR & Hybridization" },
  { term: "Fajans' Rules", definition: "Rules predicting the degree of covalent character in an ionic bond based on polarization of the anion by the cation.", category: "Covalency, Fajans & Dipole" },
  { term: "Formal Charge (FC)", definition: "The hypothetical charge on an atom in a Lewis structure: FC = V - N - B/2.", category: "Hydrogen Bonding & Resonance" },
  { term: "Hybridization", definition: "The quantum mixing of atomic orbitals of comparable energy to form equivalent hybrid orbitals with definite geometry.", category: "VSEPR & Hybridization" },
  { term: "Hydrogen Bond", definition: "An electrostatic dipole-dipole attraction between hydrogen covalently bound to F, O, N and another nearby electronegative atom.", category: "Hydrogen Bonding & Resonance" },
  { term: "Inert Pair Effect", definition: "The reluctance of outer ns² valence electrons to participate in bonding in heavy p-block elements (Tl, Pb, Bi).", category: "Covalency, Fajans & Dipole" },
  { term: "Intermolecular H-Bond", definition: "Hydrogen bonding occurring between distinct molecules, elevating boiling point and viscosity.", category: "Hydrogen Bonding & Resonance" },
  { term: "Intramolecular H-Bond", definition: "Hydrogen bonding occurring within the same single molecule, forming a chelate ring and lowering boiling point (steam volatile).", category: "Hydrogen Bonding & Resonance" },
  { term: "Ionic Bond", definition: "Electrostatic attraction between oppositely charged cations and anions formed by complete electron transfer.", category: "Ionic Bonding & Lattice" },
  { term: "Lattice Enthalpy (U)", definition: "Energy released when 1 mole of an ionic crystal lattice is formed from its constituent gaseous ions.", category: "Ionic Bonding & Lattice" },
  { term: "LCAO Method", definition: "Linear Combination of Atomic Orbitals method for constructing molecular wavefunctions (ψ_MO = c_A ψ_A ± c_B ψ_B).", category: "Molecular Orbital Theory" },
  { term: "Lone Pair", definition: "A valence electron pair that is not shared with another atom in a covalent bond.", category: "VSEPR & Hybridization" },
  { term: "Molecular Orbital (MO)", definition: "A 3D spatial region in a molecule where the probability density of finding delocalized electrons is maximum.", category: "Molecular Orbital Theory" },
  { term: "Octet Rule", definition: "Rule stating atoms gain, lose, or share electrons to achieve a stable ns² np⁶ noble gas valence configuration.", category: "Ionic Bonding & Lattice" },
  { term: "Paramagnetism", definition: "Weak attraction to an external magnetic field caused by the presence of one or more unpaired electrons.", category: "Molecular Orbital Theory" },
  { term: "Pi (π) Bond", definition: "A covalent bond formed by lateral / sideways overlap of atomic orbitals perpendicular to the internuclear axis.", category: "VSEPR & Hybridization" },
  { term: "Polarization", definition: "The distortion of an anion's electron cloud by the electrostatic pull of an adjacent cation.", category: "Covalency, Fajans & Dipole" },
  { term: "Polarising Power (Φ)", definition: "The ability of a cation to distort an anion's electron cloud: Φ = z⁺ / r₊.", category: "Covalency, Fajans & Dipole" },
  { term: "Resonance", definition: "Representation of a real molecular structure as an average hybrid of two or more canonical Lewis structures.", category: "Hydrogen Bonding & Resonance" },
  { term: "Resonance Energy", definition: "Energy difference between the actual experimental hybrid and the most stable canonical structure.", category: "Hydrogen Bonding & Resonance" },
  { term: "s-p Mixing", definition: "Quantum mixing of 2s and 2p_z orbitals in homonuclear diatomics with Z ≤ 7, shifting σ 2p_z above π 2p_x,y.", category: "Molecular Orbital Theory" },
  { term: "Sigma (σ) Bond", definition: "A strong covalent bond formed by axial head-on orbital overlap along the internuclear axis.", category: "VSEPR & Hybridization" },
  { term: "Steric Number (SN)", definition: "Total sum of bond pairs and lone pairs on a central atom: SN = bp + lp = 1/2 [V + M - C + A].", category: "VSEPR & Hybridization" },
  { term: "Valence Bond Theory (VBT)", definition: "Quantum model explaining covalent bonding via localized atomic orbital overlap and electron spin pairing.", category: "VSEPR & Hybridization" },
  { term: "VSEPR Theory", definition: "Model predicting molecular shapes based on valence shell electron pair repulsions (lp-lp > lp-bp > bp-bp).", category: "VSEPR & Hybridization" },
];

// ============================================================================
// 6. DATA: ALL 20 NEST ASSESSMENT QUESTIONS
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
    question: "Using the Born-Haber cycle data below, calculate the Lattice Enthalpy (U) of Potassium Chloride (KCl(s)): Standard Enthalpy of Formation Δ_f H° = -436 kJ/mol; Sublimation Enthalpy of K Δ_sub H = +89 kJ/mol; First Ionization Enthalpy of K Δ_i H = +418 kJ/mol; Bond Dissociation Enthalpy of Cl₂ Δ_bond H = +244 kJ/mol; First Electron Gain Enthalpy of Cl Δ_eg H = -349 kJ/mol.",
    options: [
      { key: "A", text: "U = -716 kJ/mol" },
      { key: "B", text: "U = -838 kJ/mol" },
      { key: "C", text: "U = -618 kJ/mol" },
      { key: "D", text: "U = -524 kJ/mol" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "1. Born-Haber equation: Δ_f H° = Δ_sub H + Δ_i H + (1/2) Δ_bond H + Δ_eg H + U. 2. Substitute: -436 = 89 + 418 + (1/2)(244) + (-349) + U = 89 + 418 + 122 - 349 + U = 280 + U. 3. U = -436 - 280 = -716 kJ/mol.",
  },
  {
    id: 2,
    part: "A",
    question: "Applying Fajans' Rules, arrange the following anhydrous metal chlorides in order of INCREASING covalent character (lowest covalent to highest covalent character): LiCl, BeCl₂, BCl₃, NaCl.",
    options: [
      { key: "A", text: "NaCl < LiCl < BeCl₂ < BCl₃" },
      { key: "B", text: "BCl₃ < BeCl₂ < LiCl < NaCl" },
      { key: "C", text: "LiCl < NaCl < BeCl₂ < BCl₃" },
      { key: "D", text: "BeCl₂ < LiCl < NaCl < BCl₃" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "Polarising power Φ = z⁺ / r₊. Na⁺ (1.02 Å, +1) < Li⁺ (0.76 Å, +1) < Be²⁺ (0.45 Å, +2) < B³⁺ (0.27 Å, +3). Thus covalent character increases: NaCl < LiCl < BeCl₂ < BCl₃.",
  },
  {
    id: 3,
    part: "A",
    question: "Experimental measurements show that the dipole moment of Hydrogen Fluoride (HF) is μ = 1.83 D and its bond length is d = 0.917 Å = 0.917 × 10⁻⁸ cm. What is the percentage ionic character of the H-F bond? (1 D = 10⁻¹⁸ esu·cm; e = 4.80 × 10⁻¹⁰ esu)",
    options: [
      { key: "A", text: "41.6%" },
      { key: "B", text: "58.4%" },
      { key: "C", text: "85.2%" },
      { key: "D", text: "18.3%" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "1. Theoretical 100% ionic dipole moment μ_ionic = q × d = (4.80 × 10⁻¹⁰ esu) × (0.917 × 10⁻⁸ cm) = 4.4016 × 10⁻¹⁸ esu·cm = 4.40 D. 2. % Ionic character = (μ_exp / μ_ionic) × 100 = (1.83 / 4.40) × 100 = 41.6%.",
  },
  {
    id: 4,
    part: "A",
    question: "What is the Steric Number (SN), hybridization of the central Xenon atom, and 3D molecular geometry of the Xenon Difluoride (XeF₂) molecule according to VSEPR theory?",
    options: [
      { key: "A", text: "SN = 4; sp³; Bent / V-shaped" },
      { key: "B", text: "SN = 5; sp³d; Linear shape (3 equatorial lone pairs)" },
      { key: "C", text: "SN = 6; sp³d²; Square Planar" },
      { key: "D", text: "SN = 5; sp³d; Trigonal Pyramidal" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "SN = 1/2 [V + M - C + A] = 1/2 [8 + 2 - 0 + 0] = 5 → sp³d hybridization. bp = 2, lp = 3. According to Bent's rule, the 3 lone pairs occupy equatorial positions (120°), forcing F atoms into axial positions (180°), producing a strictly Linear shape.",
  },
  {
    id: 5,
    part: "A",
    question: "In the Phosphorus Pentachloride (PCl₅) molecule (sp³d hybridization, Trigonal Bipyramidal geometry), why are the two axial P-Cl bonds (2.14 Å) significantly longer and weaker than the three equatorial P-Cl bonds (2.02 Å)?",
    options: [
      { key: "A", text: "Axial bonds contain 50% s-character while equatorial bonds contain 0% s-character." },
      { key: "B", text: "Axial bond pairs experience greater electrostatic repulsion from three equatorial bond pairs at 90° angles, compared to equatorial bond pairs which experience repulsions at 120°." },
      { key: "C", text: "Equatorial chlorine atoms undergo pπ-dπ back-bonding." },
      { key: "D", text: "Axial bonds are formed by d_x²-y² orbitals." },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "In TBP geometry, each axial bond pair suffers three 90° repulsions from equatorial bond pairs, whereas equatorial pairs suffer only two 90° repulsions. To minimize repulsion, axial bonds elongate (2.14 Å vs 2.02 Å) and become weaker.",
  },
  {
    id: 6,
    part: "A",
    question: "According to Molecular Orbital Theory (MOT), what is the Molecular Orbital electronic configuration and Bond Order of the superoxide anion (O₂⁻ with 17 total e⁻)?",
    options: [
      { key: "A", text: "BO = 2.5; Paramagnetic" },
      { key: "B", text: "BO = 1.5; Paramagnetic (1 unpaired e⁻ in π* 2p)" },
      { key: "C", text: "BO = 1.0; Diamagnetic" },
      { key: "D", text: "BO = 2.0; Diamagnetic" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "For O₂⁻ (17 e⁻): σ2s² σ*2s² σ2p_z² (π2p_x = π2p_y)⁴ (π*2p_x)² (π*2p_y)¹. N_b = 10, N_a = 7. BO = (10 - 7)/2 = 1.5. Contains 1 unpaired electron in π* 2p_y → Paramagnetic.",
  },
  {
    id: 7,
    part: "A",
    question: "Which of the following species possesses a fractional bond order of 2.5 and exhibits PARAMAGNETISM with a single unpaired electron in a σ 2p_z bonding molecular orbital?",
    options: [
      { key: "A", text: "O₂⁺ (15 e⁻)" },
      { key: "B", text: "N₂⁺ (13 e⁻)" },
      { key: "C", text: "N₂⁻ (13 e⁻)" },
      { key: "D", text: "C₂⁺ (11 e⁻)" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "For N₂⁺ (13 e⁻, Z ≤ 7): σ1s² σ*1s² σ2s² σ*2s² (π2p_x = π2p_y)⁴ (σ2p_z)¹. BO = (9 - 4)/2 = 2.5. Unpaired electron is in bonding σ 2p_z MO. (In N₂⁻, the unpaired electron lies in antibonding π* 2p).",
  },
  {
    id: 8,
    part: "A",
    question: "Why is o-Nitrophenol steam-volatile with a significantly lower boiling point (214°C) than its structural isomer p-Nitrophenol (279°C)?",
    options: [
      { key: "A", text: "o-Nitrophenol forms extensive intermolecular hydrogen bonds with water." },
      { key: "B", text: "o-Nitrophenol undergoes Intramolecular Hydrogen Bonding (chelation) within the single molecule, reducing intermolecular associations." },
      { key: "C", text: "p-Nitrophenol possesses a zero dipole moment." },
      { key: "D", text: "o-Nitrophenol contains an ionic sp³d³ iodine bond." },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "In o-Nitrophenol, adjacent -OH and -NO₂ groups form an Intramolecular H-bond (6-membered chelate ring), preventing intermolecular association. In p-Nitrophenol, intermolecular H-bonds link separate molecules, increasing boiling point.",
  },
  {
    id: 9,
    part: "A",
    question: "Using Formal Charge (FC = V - N - B/2), calculate the formal charge on the central Ozone oxygen atom (O(2)) in the predominant resonance structure of O₃ (O(1) = O(2) - O(3)):",
    options: [
      { key: "A", text: "FC = 0" },
      { key: "B", text: "FC = +1" },
      { key: "C", text: "FC = -1" },
      { key: "D", text: "FC = +2" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Central O(2) has 1 double bond + 1 single dative bond = 3 shared pairs (B = 6) and 1 lone pair (N = 2). Valence e⁻ V = 6. FC = 6 - 2 - (6/2) = 6 - 2 - 3 = +1.",
  },
  {
    id: 10,
    part: "A",
    question: "Which d-orbital participates in dsp² hybridization to form a Square Planar complex like [Ni(CN)₄]²⁻?",
    options: [
      { key: "A", text: "d_z²" },
      { key: "B", text: "d_xy" },
      { key: "C", text: "d_x²-y²" },
      { key: "D", text: "d_xz" },
    ],
    correctKeys: ["C"],
    type: "single",
    explanation: "Square planar geometry lies in the xy-plane with lobes pointing directly along Cartesian x and y axes. Thus dsp² hybridization utilizes the d_x²-y² orbital (along with s, p_x, p_y).",
  },
  {
    id: 11,
    part: "B",
    question: "Which of the following species contain a central atom with sp³d hybridization and a LINEAR molecular shape (possessing 3 equatorial lone pairs)? (Select all that apply)",
    options: [
      { key: "A", text: "Xenon Difluoride (XeF₂)" },
      { key: "B", text: "Triiodide Anion (I₃⁻)" },
      { key: "C", text: "Dichloroidate Anion (ICl₂⁻)" },
      { key: "D", text: "Sulfur Tetrafluoride (SF₄)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C all have SN = 5 (sp³d) with 2 bp + 3 lp. The 3 lone pairs occupy equatorial positions, producing a Linear molecular shape. SF₄ (D) has 4 bp + 1 lp = Seesaw.",
  },
  {
    id: 12,
    part: "B",
    question: "Select the valid statements regarding Molecular Orbital Theory (MOT) and homonuclear diatomic molecules: (Select all that apply)",
    options: [
      { key: "A", text: "For N₂ (Z ≤ 7), s-p mixing pushes the σ 2p_z MO higher in energy than the degenerate π 2p_x = π 2p_y MOs" },
      { key: "B", text: "For O₂ (Z > 7), no significant s-p mixing occurs, so σ 2p_z lies lower in energy than π 2p_x,y" },
      { key: "C", text: "C₂ contains two π-bonds and zero σ-bonds in its ground state because its 4 valence electrons occupy (π 2p_x)² (π 2p_y)²" },
      { key: "D", text: "B₂ is diamagnetic because all its 10 electrons are paired in bonding MOs" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are correct MOT facts. D is false: B₂ (10 e⁻) has (π 2p_x)¹ (π 2p_y)¹ with 2 unpaired electrons, making B₂ Paramagnetic.",
  },
  {
    id: 13,
    part: "B",
    question: "According to Fajans' Rules, which of the following factors INCREASE the degree of Covalent Character in an ionic bond? (Select all that apply)",
    options: [
      { key: "A", text: "Small cation radius (r₊)" },
      { key: "B", text: "Large anion radius (r₋)" },
      { key: "C", text: "High positive charge on the cation (z⁺)" },
      { key: "D", text: "Cation possessing a Pseudo-Noble Gas electronic configuration ((n-1)d¹⁰ ns⁰)" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four factors increase polarization (high polarising power of cation + high polarisability of anion), maximizing covalent character.",
  },
  {
    id: 14,
    part: "B",
    question: "Which of the following molecules possess a NET DIPOLE MOMENT (μ_net > 0) due to non-canceling bond/lone-pair vector dipoles? (Select all that apply)",
    options: [
      { key: "A", text: "Water (H₂O)" },
      { key: "B", text: "Ammonia (NH₃)" },
      { key: "C", text: "Sulfur Dioxide (SO₂)" },
      { key: "D", text: "Carbon Tetrafluoride (CF₄)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "H₂O (1.85 D), NH₃ (1.47 D), and SO₂ (1.62 D) are polar molecules with net dipoles. CF₄ is a symmetric regular tetrahedron with μ = 0.",
  },
  {
    id: 15,
    part: "B",
    question: "Select the correct options regarding Hydrogen Bonding and its physical consequences: (Select all that apply)",
    options: [
      { key: "A", text: "Intermolecular hydrogen bonding elevates boiling points, surface tension, and viscosity" },
      { key: "B", text: "Intramolecular hydrogen bonding in o-nitrophenol forms a chelate ring, lowering its boiling point relative to p-nitrophenol" },
      { key: "C", text: "Ice has a lower density than liquid water at 0°C due to a 3D open-cage tetrahedral hydrogen-bonded crystal lattice" },
      { key: "D", text: "Hydrogen bonds are covalent bonds formed by sharing d-electrons between hydrogen and metals" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are accurate physical effects of H-bonding. D is false: H-bonding is non-covalent electrostatic dipole-dipole attraction with F, O, N.",
  },
  {
    id: 16,
    part: "B",
    question: "Which of the following chemical species have a Steric Number SN = 4 and possess a BENT / ANGULAR molecular shape? (Select all that apply)",
    options: [
      { key: "A", text: "Water (H₂O)" },
      { key: "B", text: "Sulfur Dichloride (SCl₂)" },
      { key: "C", text: "Nitrogen Dioxide Anion (NO₂⁻)" },
      { key: "D", text: "Ozone (O₃)" },
    ],
    correctKeys: ["A", "B"],
    type: "multi",
    explanation: "H₂O and SCl₂ have SN = 4 (sp³, 2 bp + 2 lp) with bent shape (104.5°). NO₂⁻ and O₃ have SN = 3 (sp², 2 bp + 1 lp).",
  },
  {
    id: 17,
    part: "B",
    question: "Select the correct options regarding the stability, bond order, and magnetic properties of the Oxygen species series (O₂⁺, O₂, O₂⁻, O₂²⁻): (Select all that apply)",
    options: [
      { key: "A", text: "O₂⁺ has the highest bond order (BO = 2.5) and shortest bond length" },
      { key: "B", text: "O₂²⁻ (peroxide ion) has the lowest bond order (BO = 1.0) and is DIAMAGNETIC" },
      { key: "C", text: "Both O₂ (BO = 2.0) and O₂⁻ (BO = 1.5) are PARAMAGNETIC" },
      { key: "D", text: "The bond dissociation energy order is: O₂²⁻ > O₂⁻ > O₂ > O₂⁺" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are true. D is false: Bond dissociation energy ∝ BO. Correct order: O₂⁺ (2.5) > O₂ (2.0) > O₂⁻ (1.5) > O₂²⁻ (1.0).",
  },
  {
    id: 18,
    part: "B",
    question: "According to Bent's Rule, which of the following statements regarding trigonal bipyramidal (sp³d) molecules are TRUE? (Select all that apply)",
    options: [
      { key: "A", text: "More electronegative fluorine atoms prefer axial positions in PCl₃F₂" },
      { key: "B", text: "Lone pairs of electrons prefer equatorial positions in SF₄ and ClF₃" },
      { key: "C", text: "Multiple bonds (P=O) prefer equatorial positions in POCl₃" },
      { key: "D", text: "Axial hybrid orbitals are formed by sp² mixing, while equatorial orbitals are formed by pd mixing" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are true. D is false: Equatorial orbitals are sp² (33.3% s); Axial orbitals are pd (0% s).",
  },
  {
    id: 19,
    part: "B",
    question: "Which of the following molecules / ions violate the Classical Octet Rule? (Select all that apply)",
    options: [
      { key: "A", text: "Sulfur Hexafluoride (SF₆ - Hypervalent, 12 e⁻ around S)" },
      { key: "B", text: "Boron Trifluoride (BF₃ - Hypovalent, 6 e⁻ around B)" },
      { key: "C", text: "Nitric Oxide (NO - Odd-electron molecule, 11 valence e⁻)" },
      { key: "D", text: "Methane (CH₄ - Octet satisfied, 8 e⁻ around C)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "SF₆ (expanded octet), BF₃ (incomplete octet), and NO (odd-electron) violate the octet rule. CH₄ satisfies it.",
  },
  {
    id: 20,
    part: "B",
    question: "Select the correct statements contrasting Sigma (σ) and Pi (π) covalent bonds: (Select all that apply)",
    options: [
      { key: "A", text: "A σ-bond is formed by axial head-on orbital overlap along the internuclear axis" },
      { key: "B", text: "A π-bond is formed by lateral sideways orbital overlap perpendicular to the internuclear axis" },
      { key: "C", text: "Free rotation of atoms is permitted around a single σ-bond, but restricted around a double bond (σ + π)" },
      { key: "D", text: "A π-bond can exist independently without an underlying σ-bond in stable isolated molecules" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are correct. D is false: standard VBT requires a foundational σ-bond before π-overlap can occur.",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
type Tab = "born-haber" | "fajans" | "dipole" | "vbt" | "vsepr" | "bents-rule" | "mot" | "h-bond" | "traps" | "glossary" | "selftest";

export const ChemicalBondingDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("born-haber");
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
    { id: "born-haber", label: "Ionic & Born-Haber", icon: <Shield className="w-3.5 h-3.5 shrink-0" /> },
    { id: "fajans", label: "Fajans & Polarization", icon: <Scale className="w-3.5 h-3.5 shrink-0" /> },
    { id: "dipole", label: "Dipole Moments", icon: <Activity className="w-3.5 h-3.5 shrink-0" /> },
    { id: "vbt", label: "VBT & Overlap", icon: <Link2 className="w-3.5 h-3.5 shrink-0" /> },
    { id: "vsepr", label: "VSEPR Shapes", icon: <Boxes className="w-3.5 h-3.5 shrink-0" /> },
    { id: "bents-rule", label: "Bent's Rule & Hybrid", icon: <Compass className="w-3.5 h-3.5 shrink-0" /> },
    { id: "mot", label: "MOT & Bond Order", icon: <Layers className="w-3.5 h-3.5 shrink-0" /> },
    { id: "h-bond", label: "H-Bonding & Ice", icon: <Droplets className="w-3.5 h-3.5 shrink-0" /> },
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
          CHEMISTRY INTERACTIVE MODULE — CHAPTER 4
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <Link2 className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 shrink-0" />
            CHEMICAL BONDING & MOLECULAR STRUCTURE
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            Born-Haber Cycle · Fajans' Polarization · Dipole Moments · VSEPR Geometry · Bent’s Rule · MOT Energy Levels · Hydrogen Bonding · NEST 20-Q Module
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

      {/* TAB 1: BORN-HABER */}
      {activeTab === "born-haber" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-600 shrink-0" />
              Ionic Bonding & Born-Haber Cycle Energy Balance
            </h4>
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200">
              <code className="text-xs sm:text-sm font-mono font-black text-indigo-950 block leading-loose">
                Δ_f H° = Δ_sub H + Δ_i H + (1/2) Δ_bond H + Δ_eg H + U
              </code>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Lattice Enthalpy (U)</span>
                <p className="text-[11px] text-slate-700 font-semibold leading-relaxed">
                  Energy released when 1 mole of ionic solid is formed from constituent gaseous ions (always exothermic, U &lt; 0).
                </p>
                <code className="text-xs font-mono font-bold text-indigo-700 block">U ∝ - (z⁺ · z⁻) / (r₊ + r₋)</code>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Factors Enhancing Lattice Energy</span>
                <ul className="text-[10px] space-y-1 text-slate-700 font-semibold list-disc list-inside">
                  <li>High ionic charges: U(MgO) ≈ 4 × U(NaCl) (z⁺z⁻ = 4 vs 1)</li>
                  <li>Small inter-ionic distance: U(LiF) &gt; U(NaCl) &gt; U(KBr)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FAJANS */}
      {activeTab === "fajans" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-600 shrink-0" />
              Fajans' Rules &amp; Polarization Mechanism
            </h4>
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <p className="text-xs font-bold text-emerald-950">Polarization = Cation distorts Anion electron cloud → Electron density shifts into inter-nuclear region → <strong>COVALENT CHARACTER</strong></p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {fajansFactors.map((f) => (
                <div key={f.factor} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">{f.factor}</span>
                    <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">{f.rule}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-700">{f.explanation}</p>
                  <code className="text-[10px] font-mono font-bold text-indigo-700 block">{f.examples}</code>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 text-xs font-bold text-slate-800">
            <span>Consequences of High Covalent Character:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-indigo-700 block">1. Melting Point Drops</span>
                <span className="text-[10px] text-slate-600">MP of CuCl (430°C) &lt; MP of NaCl (801°C).</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-indigo-700 block">2. Organic Solubility</span>
                <span className="text-[10px] text-slate-600">LiCl dissolves in ethanol; NaCl does not.</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-indigo-700 block">3. Color Deepening</span>
                <span className="text-[10px] text-slate-600">AgF (white) → AgI (dark yellow).</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DIPOLE */}
      {activeTab === "dipole" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-600 shrink-0" />
              Dipole Moment Vector (μ = q × d)
            </h4>
            <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200">
              <code className="text-xs sm:text-sm font-mono font-black text-cyan-950 block">μ = q × d  [1 D = 3.336 × 10⁻³⁰ C·m = 10⁻¹⁸ esu·cm]</code>
              <code className="text-xs font-mono font-bold text-cyan-800 block mt-1">% Ionic Character = (μ_experimental / μ_theoretical) × 100</code>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">NH₃ (μ = 1.47 D)</span>
                <p className="text-[11px] text-slate-700 font-semibold">Three N-H bond dipoles REINFORCE the nitrogen lone pair dipole vector.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">NF₃ (μ = 0.23 D)</span>
                <p className="text-[11px] text-slate-700 font-semibold">Three N-F bond dipoles OPPOSE the nitrogen lone pair dipole vector, resulting in low net dipole.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: VBT & OVERLAP */}
      {activeTab === "vbt" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Link2 className="w-4 h-4 text-purple-600 shrink-0" />
              Valence Bond Theory: Sigma vs Pi Overlaps
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                <span className="text-xs font-black text-purple-950 block">Sigma (σ) Bond</span>
                <p className="text-[10px] text-slate-700 font-semibold">Axial / head-on overlap along internuclear axis. Cylindrically symmetric electron cloud. Free rotation permitted.</p>
                <code className="text-[10px] font-mono font-bold text-purple-900 block">s-s, s-p_x, p_x-p_x</code>
              </div>
              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                <span className="text-xs font-black text-purple-950 block">Pi (π) Bond</span>
                <p className="text-[10px] text-slate-700 font-semibold">Lateral / sideways parallel overlap perpendicular to internuclear axis. Two electron lobes above/below axis.</p>
                <code className="text-[10px] font-mono font-bold text-purple-900 block">p_y-p_y, p_z-p_z, p-d, d-d</code>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <code className="text-xs font-mono font-bold text-slate-900 block">Bond Strength Order: σ(p-p) &gt; σ(s-p) &gt; σ(s-s) &gt; π(p-p)</code>
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <h4 className="text-sm sm:text-base font-black text-slate-900">Formal Charge Formula</h4>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <code className="text-xs sm:text-sm font-mono font-black text-indigo-900 block">FC = V − N − (B / 2)</code>
              <p className="text-[10px] text-slate-600 mt-1">V = valence electrons, N = non-bonding lone pair electrons, B = total shared bonding electrons.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: VSEPR SHAPES */}
      {activeTab === "vsepr" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Boxes className="w-4 h-4 text-indigo-600 shrink-0" />
              Comprehensive VSEPR Geometry &amp; Molecular Shape Matrix
            </h4>
            <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200">
              <code className="text-xs font-mono font-black text-indigo-950 block">Steric Number (SN) = bp + lp = (1/2) [V + M − C + A]</code>
              <p className="text-[10px] text-slate-700 font-semibold mt-0.5">Repulsion Hierarchy: <strong>lp-lp &gt; lp-bp &gt; bp-bp</strong></p>
            </div>
            <div className="space-y-1.5">
              {vseprShapes.map((v, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 gap-1 text-[10px]">
                  <div className="flex items-center gap-1.5 sm:w-1/4">
                    <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">SN {v.sn}</span>
                    <span className="font-bold text-slate-900">{v.hybrid}</span>
                    <span className="text-slate-500">({v.bp}bp+{v.lp}lp)</span>
                  </div>
                  <div className="sm:w-1/3 font-semibold">
                    <span className="text-indigo-950 font-black">{v.shape}</span> <span className="text-slate-500">({v.angles})</span>
                  </div>
                  <div className="sm:w-5/12 sm:text-right font-mono text-slate-700">
                    {v.examples}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: BENT'S RULE */}
      {activeTab === "bents-rule" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-600 shrink-0" />
              Bent's Rule &amp; Hybrid Orbital Participation
            </h4>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
              <span className="text-xs font-black text-amber-950 block">Bent's Rule Postulate (1961)</span>
              <p className="text-[11px] text-slate-700 font-semibold leading-relaxed">
                "More electronegative substituents prefer hybrid orbitals with less s-character (pd hybrid), while electropositive substituents, lone pairs, and multiple bonds prefer hybrid orbitals with greater s-character (sp² hybrid)."
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Equatorial Positions (sp² hybrid)</span>
                <p className="text-[10px] text-slate-700 font-semibold">33.3% s-character → Binds Lone Pairs and Multiple Bonds (P=O, S=O).</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Axial Positions (pd hybrid)</span>
                <p className="text-[10px] text-slate-700 font-semibold">0% s-character → Binds Electronegative atoms (F, Cl) in TBP geometry.</p>
              </div>
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <h4 className="text-sm sm:text-base font-black text-slate-900">d-Orbital Participation in Hybridization</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-xs">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">dsp²</span>
                <span className="text-indigo-700 font-black">d_x²-y²</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">sp³d</span>
                <span className="text-indigo-700 font-black">d_z²</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">sp³d²</span>
                <span className="text-indigo-700 font-black">d_x²-y² + d_z²</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">sp³d³</span>
                <span className="text-indigo-700 font-black">d_x²-y² + d_z² + d_xy</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: MOT */}
      {activeTab === "mot" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
              Molecular Orbital Theory (MOT) &amp; s-p Mixing
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">For Z ≤ 7 (Li₂, B₂, C₂, N₂) [s-p mixing]</span>
                <code className="text-[10px] font-mono font-bold text-indigo-700 block">σ1s &lt; σ*1s &lt; σ2s &lt; σ*2s &lt; (π2p_x = π2p_y) &lt; σ2p_z &lt; (π*2p_x = π*2p_y) &lt; σ*2p_z</code>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">For Z &gt; 7 (O₂, F₂, Ne₂) [no s-p mixing]</span>
                <code className="text-[10px] font-mono font-bold text-indigo-700 block">σ1s &lt; σ*1s &lt; σ2s &lt; σ*2s &lt; σ2p_z &lt; (π2p_x = π2p_y) &lt; (π*2p_x = π*2p_y) &lt; σ*2p_z</code>
              </div>
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900">Oxygen &amp; Nitrogen Family MOT Configurations</h4>
            <div className="space-y-1.5">
              {oxygenFamilyMOT.map((s) => (
                <div key={s.species} className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 gap-1 text-[10px]">
                  <span className="font-mono font-black text-slate-900 sm:w-1/6">{s.species} ({s.totalElectrons} e⁻)</span>
                  <code className="font-mono text-slate-700 sm:w-1/2">{s.config}</code>
                  <span className="font-black text-indigo-700 sm:w-1/6">BO = {s.bondOrder}</span>
                  <span className="text-slate-600 sm:w-1/6 sm:text-right font-bold">{s.magnetism}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: H-BOND */}
      {activeTab === "h-bond" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-cyan-600 shrink-0" />
              Hydrogen Bonding: Intermolecular vs Intramolecular
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Intermolecular H-Bonding</span>
                <p className="text-[10px] text-slate-700 font-semibold">Forms between separate molecules. Elevates boiling point, viscosity, and water solubility (e.g. H₂O, HF, p-nitrophenol).</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Intramolecular H-Bonding</span>
                <p className="text-[10px] text-slate-700 font-semibold">Forms within the same single molecule (chelate ring). LOWERS boiling point and makes compound steam-volatile (e.g. o-nitrophenol).</p>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200">
              <p className="text-xs font-bold text-cyan-950">Open-Cage Density Anomaly of Ice: Upon freezing into ice, each H₂O molecule forms 4 directional H-bonds in a 3D tetrahedral open-cage lattice. The resulting empty interstitial cavities give ice a lower density than liquid water at 0°C (ice floats!). Maximum density occurs at 4°C.</p>
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
              All 10 High-Yield NEST Chemical Bonding Misconceptions &amp; Traps
            </h4>
            <div className="space-y-2">
              {bondingTraps.map((trap) => {
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
                placeholder="Search 36 chemical bonding glossary terms..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {["All", "Ionic Bonding & Lattice", "Covalency, Fajans & Dipole", "VSEPR & Hybridization", "Molecular Orbital Theory", "Hydrogen Bonding & Resonance"].map((cat) => (
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
              <Award className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-amber-500" />
              <h4 className="text-xl sm:text-2xl font-black text-slate-900">Your Score: {score} / {mcqData.length}</h4>
              <p className="text-sm font-semibold text-slate-600">
                {score >= 17 ? "Outstanding! Mastery level for NEST & IChO Chemical Bonding." : score >= 12 ? "Good performance — review incorrect explanations." : "Needs practice — revisit earlier tabs and retake."}
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
                      <span className="text-[9px] font-black uppercase tracking-wider text-indigo-700">Detailed Solution &amp; Math Explanation</span>
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

export default ChemicalBondingDiagram;
