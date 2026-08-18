"use client";

import React, { useState } from "react";
import {
  Atom,
  Zap,
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
} from "lucide-react";

// ============================================================================
// 1. DATA: SUBATOMIC PARTICLES & ISOTOPIC CLASSIFICATION
// ============================================================================
interface Particle {
  name: string;
  symbol: string;
  discoverer: string;
  year: string;
  charge: string;
  massKg: string;
  massU: string;
  notes: string;
}

const particlesData: Particle[] = [
  {
    name: "Electron",
    symbol: "e⁻ / β⁻",
    discoverer: "J.J. Thomson",
    year: "1897",
    charge: "-1.602176 × 10⁻¹⁹ C (-1)",
    massKg: "9.109383 × 10⁻³¹ kg",
    massU: "0.00054857 u",
    notes: "Cathode rays; constant e/m = 1.7588 × 10¹¹ C/kg invariant of gas.",
  },
  {
    name: "Proton",
    symbol: "p⁺ / ¹₁H⁺",
    discoverer: "E. Goldstein / Rutherford",
    year: "1886 / 1919",
    charge: "+1.602176 × 10⁻¹⁹ C (+1)",
    massKg: "1.672622 × 10⁻²⁷ kg",
    massU: "1.007276 u",
    notes: "Anode / canal rays; e/m depends on discharge tube residual gas.",
  },
  {
    name: "Neutron",
    symbol: "n⁰ / ¹₀n",
    discoverer: "James Chadwick",
    year: "1932",
    charge: "0 C (0)",
    massKg: "1.674927 × 10⁻²⁷ kg",
    massU: "1.008665 u",
    notes: "⁹₄Be + ⁴₂He → ¹²₆C + ¹₀n; slightly heavier than proton.",
  },
];

interface IsotopicClass {
  term: string;
  definition: string;
  example: string;
  keyRelation: string;
}

const isotopicClasses: IsotopicClass[] = [
  { term: "Isotopes", definition: "Identical Atomic Number (Z), different Mass Number (A).", example: "¹₁H (Protium), ²₁H (Deuterium), ³₁H (Tritium)", keyRelation: "Same Z, Different N" },
  { term: "Isobars", definition: "Identical Mass Number (A), different Atomic Number (Z).", example: "⁴⁰₁₈Ar, ⁴⁰₁₉K, ⁴⁰₂₀Ca", keyRelation: "Same A, Different Z" },
  { term: "Isotones", definition: "Identical number of neutrons (N = A - Z).", example: "¹⁴₆C, ¹⁵₇N, ¹⁶₈O (all have N = 8)", keyRelation: "N = A - Z = Constant" },
  { term: "Isodiaphers", definition: "Identical neutron excess (N - Z = A - 2Z).", example: "²³⁸₉₂U (N-Z = 54) and ²³⁴₉₀Th (N-Z = 54)", keyRelation: "N - Z = A - 2Z = Constant" },
  { term: "Isoelectronic", definition: "Species possessing identical total number of electrons.", example: "N³⁻, O²⁻, F⁻, Ne, Na⁺, Mg²⁺, Al³⁺ (all 10 e⁻)", keyRelation: "Total e⁻ = Constant" },
  { term: "Isosteres", definition: "Molecules with same number of atoms AND same electrons.", example: "CO₂ and N₂O (3 atoms, 22 electrons)", keyRelation: "Same Atoms & Same e⁻" },
];

// ============================================================================
// 2. DATA: SPECTRAL SERIES
// ============================================================================
interface SpectralSeries {
  name: string;
  n1: number;
  n2: string;
  region: string;
  shortestWavelength: string;
  color: string;
}

const spectralSeriesData: SpectralSeries[] = [
  { name: "Lyman", n1: 1, n2: "2, 3, 4, 5...", region: "Ultraviolet (UV)", shortestWavelength: "1/R_H ≈ 912 Å", color: "indigo" },
  { name: "Balmer", n1: 2, n2: "3, 4, 5, 6... (3-6 Visible)", region: "Visible / Near UV", shortestWavelength: "4/R_H ≈ 3646 Å", color: "cyan" },
  { name: "Paschen", n1: 3, n2: "4, 5, 6, 7...", region: "Near Infrared (IR)", shortestWavelength: "9/R_H ≈ 8206 Å", color: "emerald" },
  { name: "Brackett", n1: 4, n2: "5, 6, 7, 8...", region: "Mid Infrared (IR)", shortestWavelength: "16/R_H ≈ 14588 Å", color: "amber" },
  { name: "Pfund", n1: 5, n2: "6, 7, 8, 9...", region: "Far Infrared (IR)", shortestWavelength: "25/R_H ≈ 22793 Å", color: "rose" },
  { name: "Humphreys", n1: 6, n2: "7, 8, 9, 10...", region: "Far Infrared (IR)", shortestWavelength: "36/R_H ≈ 32823 Å", color: "purple" },
];

// ============================================================================
// 3. DATA: QUANTUM NUMBERS & NODAL ANALYSIS
// ============================================================================
interface QuantumNumber {
  name: string;
  symbol: string;
  values: string;
  significance: string;
  formula: string;
}

const quantumNumbersData: QuantumNumber[] = [
  { name: "Principal", symbol: "n", values: "1, 2, 3, 4...", significance: "Major shell size and energy level.", formula: "Max e⁻ = 2n²; Total orbitals = n²" },
  { name: "Azimuthal / Subsidiary", symbol: "l", values: "0, 1, 2... (n - 1)", significance: "Subshell 3D geometry (s, p, d, f) and orbital angular momentum.", formula: "L = √(l(l+1)) ℏ; Max e⁻ = 2(2l+1)" },
  { name: "Magnetic", symbol: "m_l", values: "-l... 0... +l", significance: "Spatial orientation in magnetic field.", formula: "Total orbitals per subshell = 2l + 1" },
  { name: "Spin", symbol: "m_s", values: "+1/2, -1/2", significance: "Intrinsic electron spin orientation.", formula: "Spin Angular Momentum S = √(s(s+1)) ℏ = (√3/2) ℏ" },
];

interface OrbitalNode {
  orbital: string;
  n: number;
  l: number;
  radial: number;
  angular: number;
  total: number;
  geometry: string;
}

const orbitalNodesData: OrbitalNode[] = [
  { orbital: "1s", n: 1, l: 0, radial: 0, angular: 0, total: 0, geometry: "Spherical symmetry; zero nodes." },
  { orbital: "2s", n: 2, l: 0, radial: 1, angular: 0, total: 1, geometry: "1 Spherical nodal surface." },
  { orbital: "2p_x", n: 2, l: 1, radial: 0, angular: 1, total: 1, geometry: "yz-plane is a nodal plane." },
  { orbital: "3p_x", n: 3, l: 1, radial: 1, angular: 1, total: 2, geometry: "1 Spherical node + yz-nodal plane." },
  { orbital: "3d_xy", n: 3, l: 2, radial: 0, angular: 2, total: 2, geometry: "xz and yz planes are nodal planes." },
  { orbital: "3d_z²", n: 3, l: 2, radial: 0, angular: 2, total: 2, geometry: "Two conical nodal surfaces at θ = 54.74° (Zero planar nodes)." },
];

// ============================================================================
// 4. DATA: ANOMALOUS CONFIGURATIONS
// ============================================================================
interface AnomalousConfig {
  element: string;
  z: number;
  predicted: string;
  actual: string;
  reason: string;
}

const anomalousConfigs: AnomalousConfig[] = [
  { element: "Chromium (Cr)", z: 24, predicted: "[Ar] 3d⁴ 4s²", actual: "[Ar] 3d⁵ 4s¹", reason: "Half-filled d⁵ stability (10K exchange energy vs 6K)." },
  { element: "Copper (Cu)", z: 29, predicted: "[Ar] 3d⁹ 4s²", actual: "[Ar] 3d¹⁰ 4s¹", reason: "Fully-filled d¹⁰ stability (20K exchange energy)." },
  { element: "Niobium (Nb)", z: 41, predicted: "[Kr] 4d³ 5s²", actual: "[Kr] 4d⁴ 5s¹", reason: "s→d transfer minimizes electron-electron repulsions." },
  { element: "Molybdenum (Mo)", z: 42, predicted: "[Kr] 4d⁴ 5s²", actual: "[Kr] 4d⁵ 5s¹", reason: "Half-filled 4d⁵ subshell stabilization." },
  { element: "Ruthenium (Ru)", z: 44, predicted: "[Kr] 4d⁶ 5s²", actual: "[Kr] 4d⁷ 5s¹", reason: "d-subshell exchange energy gain." },
  { element: "Rhodium (Rh)", z: 45, predicted: "[Kr] 4d⁷ 5s²", actual: "[Kr] 4d⁸ 5s¹", reason: "d-subshell exchange energy gain." },
  { element: "Palladium (Pd)", z: 46, predicted: "[Kr] 4d⁸ 5s²", actual: "[Kr] 4d¹⁰ 5s⁰", reason: "Double s→d shift yielding closed-shell 4d¹⁰." },
  { element: "Silver (Ag)", z: 47, predicted: "[Kr] 4d⁹ 5s²", actual: "[Kr] 4d¹⁰ 5s¹", reason: "Fully-filled 4d¹⁰ subshell stability." },
  { element: "Platinum (Pt)", z: 78, predicted: "[Xe] 4f¹⁴ 5d⁸ 6s²", actual: "[Xe] 4f¹⁴ 5d⁹ 6s¹", reason: "Near-filled 5d⁹ stabilization." },
  { element: "Gold (Au)", z: 79, predicted: "[Xe] 4f¹⁴ 5d⁹ 6s²", actual: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹", reason: "Fully-filled 5d¹⁰ subshell stability." },
];

// ============================================================================
// 5. DATA: NEST MISCONCEPTIONS & TRAPS
// ============================================================================
interface Misconception {
  id: string;
  trap: string;
  reality: string;
  tip: string;
}

const atomTraps: Misconception[] = [
  { id: "t1", trap: "The total number of nodes in any atomic orbital is given by (n - l).", reality: "Total nodes equal (n - 1). Radial nodes = (n - l - 1); Angular nodes = l. Total = (n - l - 1) + l = (n - 1).", tip: "Check whether the question asks for Radial, Angular, or Total nodes." },
  { id: "t2", trap: "The 3d_z² orbital possesses two planar nodal surfaces.", reality: "The 3d_z² orbital has ZERO planar nodal surfaces; it has TWO CONICAL nodal surfaces at θ = 54.74°.", tip: "All other d-orbitals (d_xy, d_yz, d_zx, d_x²-y²) have 2 planar nodes." },
  { id: "t3", trap: "Photoelectric emission occurs at any frequency as long as light intensity is high.", reality: "Photoelectric emission occurs ONLY if incident frequency ν ≥ ν₀ (threshold frequency), regardless of intensity.", tip: "Intensity governs photocurrent rate (photoelectrons/sec), NOT kinetic energy." },
  { id: "t4", trap: "Bohr's atomic model calculates exact energies for multi-electron atoms.", reality: "Bohr's model applies STRICTLY to single-electron species (H, He⁺, Li²⁺, Be³⁺). Fails for multi-electron atoms due to inter-electronic repulsions.", tip: "Check if the species is hydrogen-like (1 electron)." },
  { id: "t5", trap: "The 4s electron is lost after 3d electrons when transition metals ionize.", reality: "4s electrons lie at a greater radial distance and are ALWAYS LOST FIRST during ionization (e.g., Fe [Ar]3d⁶4s² → Fe²⁺ [Ar]3d⁶).", tip: "4s fills before 3d, but 4s empties before 3d during cation formation." },
  { id: "t6", trap: "Uncertainty principle allows precise simultaneous measurement of x and p for macroscopic objects.", reality: "Heisenberg Uncertainty Principle applies universally, but Δx·Δv is negligible for macroscopic masses (m ≫ m_e). It is significant only for subatomic masses.", tip: "Δx · Δp ≥ h / 4π is practically impactful for electrons." },
  { id: "t7", trap: "The wavefunction ψ represents the probability density of an electron.", reality: "ψ is the mathematical probability amplitude. Probability density is represented by ψ² (or |ψ|²).", tip: "ψ can be positive or negative; ψ² is always real and non-negative." },
  { id: "t8", trap: "Bohr radius a₀ is the maximum possible distance an electron can reach in 1s.", reality: "a₀ (0.529 Å) is the MOST PROBABLE distance where 4πr²R² peaks. Electron probability extends to infinity asymptotically.", tip: "1s radial probability peak is at r = a₀." },
  { id: "t9", trap: "Subshell orbital angular momentum depends on principal quantum number n.", reality: "Orbital angular momentum depends STRICTLY on Azimuthal quantum number l: L = √(l(l+1)) ℏ. Independent of n.", tip: "All s-orbitals (1s, 2s, 3s) have L = 0; all p-orbitals have L = √2 ℏ." },
  { id: "t10", trap: "Palladium (Z=46) has ground-state configuration [Kr] 4d⁸ 5s².", reality: "Palladium undergoes a double s→d transfer to give [Kr] 4d¹⁰ 5s⁰, possessing ZERO 5s valence electrons.", tip: "Pd has completely filled 4d and empty 5s." },
];

// ============================================================================
// 6. DATA: MASTER GLOSSARY (48 DEFINITIONS)
// ============================================================================
interface GlossaryTerm {
  term: string;
  definition: string;
  category: "Subatomic & Models" | "Quantum Theory & Photoelectric" | "Bohr & Spectroscopy" | "Quantum Mechanics & Wave" | "Quantum Numbers & Orbitals";
}

const masterGlossary: GlossaryTerm[] = [
  { term: "Absorption Spectrum", definition: "A spectrum of dark lines produced when continuous radiation passes through a cooler gas absorbing characteristic resonant wavelengths.", category: "Bohr & Spectroscopy" },
  { term: "Angular Node", definition: "A planar or conical surface passing through the nucleus where the angular wavefunction Y(θ,φ) = 0. Total count = l.", category: "Quantum Numbers & Orbitals" },
  { term: "Anode Rays (Canal Rays)", definition: "Streams of positive gaseous ions produced in discharge tubes whose e/m ratio depends on the residual gas.", category: "Subatomic & Models" },
  { term: "Aufbau Principle", definition: "The rule stating subshells fill in order of increasing (n + l) energy values.", category: "Quantum Numbers & Orbitals" },
  { term: "Azimuthal Quantum Number (l)", definition: "Quantum number determining subshell 3D geometry and orbital angular momentum (L = √(l(l+1)) ℏ).", category: "Quantum Numbers & Orbitals" },
  { term: "Balmer Series", definition: "Hydrogen spectral emission lines resulting from de-excitation to n₁ = 2, falling in the visible spectrum (400–700 nm).", category: "Bohr & Spectroscopy" },
  { term: "Bohr Radius (a₀)", definition: "The radius of the first ground-state orbit of the hydrogen atom (a₀ = 0.529177 Å).", category: "Bohr & Spectroscopy" },
  { term: "Cathode Rays", definition: "Streams of high-speed electrons emitted from the negative electrode in discharge tubes (e/m = 1.7588 × 10¹¹ C/kg).", category: "Subatomic & Models" },
  { term: "Compton Effect", definition: "The increase in wavelength (Δλ) of high-energy X-ray/gamma-ray photons when scattered by stationary electrons.", category: "Quantum Theory & Photoelectric" },
  { term: "de Broglie Wavelength", definition: "The matter wavelength (λ = h/p = h/mv) associated with any moving mass.", category: "Quantum Mechanics & Wave" },
  { term: "Degenerate Orbitals", definition: "Orbitals belonging to the same subshell having identical energy levels in the absence of external magnetic fields.", category: "Quantum Numbers & Orbitals" },
  { term: "Distance of Closest Approach (r₀)", definition: "The minimum distance an alpha particle reaches before reversing: r₀ = (1/4πε₀) · (2Ze² / E_k).", category: "Subatomic & Models" },
  { term: "Dulong-Petit Law", definition: "Approx. Atomic Mass × Specific Heat (cal/g·°C) ≈ 6.4 for solid heavy metals.", category: "Subatomic & Models" },
  { term: "Exchange Energy (E_ex)", definition: "Stabilizing electrostatic quantum energy released when parallel-spin electrons swap degenerate orbitals: E_ex = [n(n-1)/2] K.", category: "Quantum Numbers & Orbitals" },
  { term: "Hamiltonian Operator (Ĥ)", definition: "The total energy quantum operator combining kinetic and potential energy: Ĥψ = Eψ.", category: "Quantum Mechanics & Wave" },
  { term: "Heisenberg Uncertainty Principle", definition: "Fundamental quantum limit stating position and momentum cannot be measured simultaneously: Δx · Δp ≥ ℏ/2.", category: "Quantum Mechanics & Wave" },
  { term: "Hund's Rule of Maximum Multiplicity", definition: "Degenerate orbitals must be singly occupied with parallel spins before electron pairing begins.", category: "Quantum Numbers & Orbitals" },
  { term: "Isodiaphers", definition: "Nuclides possessing identical neutron excess (N - Z = A - 2Z).", category: "Subatomic & Models" },
  { term: "Isoelectronic", definition: "Chemical species possessing identical total numbers of electrons.", category: "Subatomic & Models" },
  { term: "Isosteres", definition: "Molecules possessing identical numbers of atoms and identical total electrons (e.g., CO₂ and N₂O).", category: "Subatomic & Models" },
  { term: "Isotones", definition: "Nuclides possessing identical numbers of neutrons (N = A - Z).", category: "Subatomic & Models" },
  { term: "Isotopes", definition: "Atoms of the same element with identical atomic number Z but different mass number A.", category: "Subatomic & Models" },
  { term: "Lyman Series", definition: "Hydrogen spectral transitions to n₁ = 1, located in the Ultraviolet (UV) spectrum.", category: "Bohr & Spectroscopy" },
  { term: "Magnetic Quantum Number (m_l)", definition: "Quantum number specifying 3D spatial orientation of an orbital in a magnetic field (-l... 0... +l).", category: "Quantum Numbers & Orbitals" },
  { term: "Nodal Plane", definition: "A flat planar surface passing through the nucleus where electron probability density is zero (ψ² = 0).", category: "Quantum Numbers & Orbitals" },
  { term: "Orbital", definition: "A 3D spatial region around the nucleus where the probability density of finding an electron is maximum (≥ 90%).", category: "Quantum Numbers & Orbitals" },
  { term: "Pauli Exclusion Principle", definition: "No two electrons in an atom can possess identical sets of all four quantum numbers (n, l, m_l, m_s).", category: "Quantum Numbers & Orbitals" },
  { term: "Photoelectric Effect", definition: "Emission of electrons from a metal surface when irradiated with light of frequency ν ≥ ν₀.", category: "Quantum Theory & Photoelectric" },
  { term: "Photon", definition: "A discrete quantum packet of electromagnetic radiation carrying energy E = hν and momentum p = h/λ.", category: "Quantum Theory & Photoelectric" },
  { term: "Planck's Constant (h)", definition: "Fundamental physical constant h = 6.62607015 × 10⁻³⁴ J·s.", category: "Quantum Theory & Photoelectric" },
  { term: "Principal Quantum Number (n)", definition: "Quantum number determining major shell size, distance from nucleus, and primary energy level.", category: "Quantum Numbers & Orbitals" },
  { term: "Radial Node", definition: "A spherical shell centered on the nucleus where radial wavefunction R(r) = 0. Count = n - l - 1.", category: "Quantum Numbers & Orbitals" },
  { term: "Radial Probability Function (4πr²R²dr)", definition: "The total probability of finding an electron in a spherical shell of thickness dr at distance r.", category: "Quantum Mechanics & Wave" },
  { term: "Rydberg Constant (R_H)", definition: "Fundamental spectroscopic constant R_H = 109677 cm⁻¹ = 1.09677 × 10⁷ m⁻¹.", category: "Bohr & Spectroscopy" },
  { term: "Schrödinger Wave Equation", definition: "The fundamental differential equation describing the 3D wave mechanics of the electron (Ĥψ = Eψ).", category: "Quantum Mechanics & Wave" },
  { term: "Spin Quantum Number (m_s)", definition: "Quantum number representing intrinsic electron angular momentum orientation (m_s = ±1/2).", category: "Quantum Numbers & Orbitals" },
  { term: "Stark Effect", definition: "The splitting of atomic spectral lines in an external static electric field.", category: "Bohr & Spectroscopy" },
  { term: "Stopping Potential (V_s)", definition: "The minimum negative anode potential required to halt the fastest photoelectrons: eV_s = K_max.", category: "Quantum Theory & Photoelectric" },
  { term: "Threshold Frequency (ν₀)", definition: "The minimum light frequency required to induce photoelectric emission (Φ = hν₀).", category: "Quantum Theory & Photoelectric" },
  { term: "Wavefunction (ψ)", definition: "Mathematical amplitude of the electron wave with no direct physical meaning.", category: "Quantum Mechanics & Wave" },
  { term: "Work Function (Φ)", definition: "The minimum photon energy required to liberate an electron from a clean metal surface into vacuum.", category: "Quantum Theory & Photoelectric" },
  { term: "Zeeman Effect", definition: "The splitting of atomic spectral lines in an external static magnetic field.", category: "Bohr & Spectroscopy" },
];

// ============================================================================
// 7. DATA: ALL 20 NEST ASSESSMENT QUESTIONS
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
    question: "An electron in a hydrogen-like ion Xᶻ⁺ undergoes a transition from an excited state n₂ to a lower state n₁. The emitted photon has a frequency of 2.466 × 10¹⁵ Hz. If this transition corresponds to the first line of the Lyman series (n₂ = 2 → n₁ = 1) for this specific ion, what is the atomic number Z and identity of the ion Xᶻ⁺? (R_H = 1.097 × 10⁷ m⁻¹, c = 3.0 × 10⁸ m/s)",
    options: [
      { key: "A", text: "Z = 1 (H atom)" },
      { key: "B", text: "Z = 2 (He⁺ ion)" },
      { key: "C", text: "Z = 3 (Li²⁺ ion)" },
      { key: "D", text: "Z = 4 (Be³⁺ ion)" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "1. Wave number ν̄ = ν / c = (2.466 × 10¹⁵) / (3.0 × 10⁸) = 8.22 × 10⁶ m⁻¹. 2. Rydberg formula for 2→1: ν̄ = R_H · Z² · (1/1² - 1/2²) = R_H · Z² · (3/4). 3. 8.22 × 10⁶ = (1.097 × 10⁷) × 0.75 × Z² → 8.22 × 10⁶ = 8.2275 × 10⁶ Z² → Z² ≈ 1 → Z = 1 (Hydrogen atom).",
  },
  {
    id: 2,
    part: "A",
    question: "When a clean lithium metal surface (Work Function Φ = 2.30 eV) is illuminated with monochromatic light of wavelength λ = 3000 Å, photoelectrons are ejected. What is the maximum kinetic energy (K_max) of the ejected photoelectrons and the corresponding stopping potential (V_s)? (hc ≈ 12400 eV·Å)",
    options: [
      { key: "A", text: "K_max = 1.83 eV; V_s = 1.83 V" },
      { key: "B", text: "K_max = 4.13 eV; V_s = 4.13 V" },
      { key: "C", text: "K_max = 2.30 eV; V_s = 2.30 V" },
      { key: "D", text: "K_max = 0.50 eV; V_s = 0.50 V" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "1. E_photon = 12400 / 3000 = 4.133 eV. 2. K_max = E_photon - Φ = 4.133 - 2.30 = 1.833 eV ≈ 1.83 eV. 3. eV_s = K_max → V_s = 1.833 V ≈ 1.83 V.",
  },
  {
    id: 3,
    part: "A",
    question: "An electron is accelerated from rest through a potential difference V = 100 Volts. What is the de Broglie wavelength (λ) associated with this accelerated electron?",
    options: [
      { key: "A", text: "1.227 Å" },
      { key: "B", text: "0.123 Å" },
      { key: "C", text: "12.27 Å" },
      { key: "D", text: "0.529 Å" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "Using the de Broglie formula for an accelerated electron: λ_e = 12.27 / √V Å = 12.27 / √100 = 12.27 / 10 = 1.227 Å (0.1227 nm).",
  },
  {
    id: 4,
    part: "A",
    question: "A microscopic particle of mass m = 1.0 × 10⁻²⁸ kg has its position measured with an uncertainty Δx = 1.055 × 10⁻¹¹ m. What is the minimum uncertainty in its velocity (Δv) as dictated by the Heisenberg Uncertainty Principle? (ℏ = 1.055 × 10⁻³⁴ J·s)",
    options: [
      { key: "A", text: "Δv = 5.0 × 10⁴ m/s" },
      { key: "B", text: "Δv = 5.0 × 10⁵ m/s" },
      { key: "C", text: "Δv = 1.0 × 10⁶ m/s" },
      { key: "D", text: "Δv = 3.0 × 10⁸ m/s" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Δx · (m Δv) ≥ ℏ / 2 → Δv = ℏ / (2 m Δx) = (1.055 × 10⁻³⁴) / [2 × (1.0 × 10⁻²⁸) × (1.055 × 10⁻¹¹)] = 1 / (2 × 10⁻⁵) = 5.0 × 10⁵ m/s.",
  },
  {
    id: 5,
    part: "A",
    question: "How many total nodes (radial + angular), radial nodes, and angular nodal planes are present in a 4d_xz atomic orbital?",
    options: [
      { key: "A", text: "Total = 3; Radial = 1; Angular = 2" },
      { key: "B", text: "Total = 4; Radial = 2; Angular = 2" },
      { key: "C", text: "Total = 3; Radial = 2; Angular = 1" },
      { key: "D", text: "Total = 2; Radial = 0; Angular = 2" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "For 4d_xz orbital: n = 4, l = 2. Angular Nodes = l = 2. Radial Nodes = n - l - 1 = 4 - 2 - 1 = 1. Total Nodes = n - 1 = 4 - 1 = 3.",
  },
  {
    id: 6,
    part: "A",
    question: "What is the total orbital angular momentum (L) of an electron occupying a 3d orbital in a transition metal ion?",
    options: [
      { key: "A", text: "L = 0" },
      { key: "B", text: "L = √2 ℏ" },
      { key: "C", text: "L = √6 ℏ" },
      { key: "D", text: "L = √12 ℏ" },
    ],
    correctKeys: ["C"],
    type: "single",
    explanation: "For any d-orbital, l = 2. L = √(l(l+1)) ℏ = √(2(3)) ℏ = √6 ℏ = √6 (h / 2π).",
  },
  {
    id: 7,
    part: "A",
    question: "An element X has the ground-state electronic configuration [Ar] 3d⁵ 4s¹. What is the total number of unpaired electrons in a gaseous X³⁺ cation, and what is its magnetic moment (μ_s) in Bohr Magnetons?",
    options: [
      { key: "A", text: "Unpaired e⁻ = 3; μ_s = √15 ≈ 3.87 BM" },
      { key: "B", text: "Unpaired e⁻ = 5; μ_s = √35 ≈ 5.92 BM" },
      { key: "C", text: "Unpaired e⁻ = 4; μ_s = √24 ≈ 4.90 BM" },
      { key: "D", text: "Unpaired e⁻ = 2; μ_s = √8 ≈ 2.83 BM" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "1. X is Cr (Z=24, [Ar] 3d⁵ 4s¹). 2. Cr³⁺ loses 1 from 4s and 2 from 3d → [Ar] 3d³ (3 unpaired electrons, n=3). 3. μ_s = √(n(n+2)) = √(3(5)) = √15 ≈ 3.87 BM.",
  },
  {
    id: 8,
    part: "A",
    question: "What is the ratio of the radius of the n=3 orbit of Li²⁺ to the radius of the n=2 orbit of He⁺?",
    options: [
      { key: "A", text: "3 : 2" },
      { key: "B", text: "9 : 4" },
      { key: "C", text: "3 : 4" },
      { key: "D", text: "1 : 1" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "Bohr radius r_n ∝ n² / Z. For Li²⁺ (Z=3, n=3): r₁ = a₀ (3²/3) = 3a₀. For He⁺ (Z=2, n=2): r₂ = a₀ (2²/2) = 2a₀. Ratio = 3a₀ / 2a₀ = 3 : 2.",
  },
  {
    id: 9,
    part: "A",
    question: "Calculate the total exchange energy (E_ex) released in terms of exchange constant K for a ground-state Manganese ion Mn²⁺ (Z=25, 3d⁵ subshell) containing 5 parallel-spin d-electrons.",
    options: [
      { key: "A", text: "5K" },
      { key: "B", text: "10K" },
      { key: "C", text: "15K" },
      { key: "D", text: "20K" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Exchange pairs for n parallel electrons = n(n-1)/2 = 5(4)/2 = 10. Total exchange energy = 10K.",
  },
  {
    id: 10,
    part: "A",
    question: "An alpha particle (⁴₂He²⁺, m = 6.64 × 10⁻²⁷ kg) is accelerated toward a stationary Gold nucleus (¹⁹⁷₇₉Au) with a kinetic energy E_k = 5.0 MeV = 8.0 × 10⁻¹³ J. What is the distance of closest approach (r₀)? (1/4πε₀ = 8.988 × 10⁹ N·m²/C², e = 1.602 × 10⁻¹⁹ C)",
    options: [
      { key: "A", text: "4.55 × 10⁻¹⁴ m (45.5 fm)" },
      { key: "B", text: "2.27 × 10⁻¹⁴ m (22.7 fm)" },
      { key: "C", text: "1.12 × 10⁻¹⁵ m (1.12 fm)" },
      { key: "D", text: "9.10 × 10⁻¹³ m (910 fm)" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "r₀ = (1/4πε₀) · [2 Z e² / E_k] = (8.988 × 10⁹) × [2 × 79 × (1.602 × 10⁻¹⁹)²] / (8.0 × 10⁻¹³) = (8.988 × 10⁹) × (5.068 × 10⁻²⁴) = 4.55 × 10⁻¹⁴ m = 45.5 fm.",
  },
  {
    id: 11,
    part: "B",
    question: "Which of the following sets of Quantum Numbers (n, l, m_l, m_s) represent VALID, physically allowed atomic orbital states for an electron in an atom? (Select all that apply)",
    options: [
      { key: "A", text: "n = 3, l = 2, m_l = -2, m_s = +1/2" },
      { key: "B", text: "n = 2, l = 2, m_l = 0, m_s = -1/2" },
      { key: "C", text: "n = 4, l = 0, m_l = 0, m_s = -1/2" },
      { key: "D", text: "n = 1, l = 0, m_l = +1, m_s = +1/2" },
    ],
    correctKeys: ["A", "C"],
    type: "multi",
    explanation: "A is valid (3d). B is invalid because for n=2, l cannot exceed 1. C is valid (4s). D is invalid because for l=0, m_l must be 0.",
  },
  {
    id: 12,
    part: "B",
    question: "Select the valid statements regarding the Photoelectric Effect: (Select all that apply)",
    options: [
      { key: "A", text: "Photoelectric emission occurs instantaneously when light frequency ν ≥ ν₀" },
      { key: "B", text: "The maximum kinetic energy (K_max) of photoelectrons increases linearly with light frequency ν" },
      { key: "C", text: "Increasing light intensity at constant frequency increases the photocurrent, but leaves K_max unchanged" },
      { key: "D", text: "Stopping potential V_s is inversely proportional to light intensity" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are correct statements of Einstein's photoelectric laws. D is false: stopping potential depends strictly on frequency (eV_s = hν - Φ), independent of intensity.",
  },
  {
    id: 13,
    part: "B",
    question: "Which of the following hydrogen spectral emission transitions belong strictly to the VISIBLE region of the electromagnetic spectrum? (Select all that apply)",
    options: [
      { key: "A", text: "n₂ = 3 → n₁ = 2 (H_α line of Balmer series, 656 nm)" },
      { key: "B", text: "n₂ = 4 → n₁ = 2 (H_β line of Balmer series, 486 nm)" },
      { key: "C", text: "n₂ = 2 → n₁ = 1 (Lyman series first line, 121.6 nm)" },
      { key: "D", text: "n₂ = 5 → n₁ = 2 (H_γ line of Balmer series, 434 nm)" },
    ],
    correctKeys: ["A", "B", "D"],
    type: "multi",
    explanation: "A, B, D belong to the Balmer series (n₁=2 for n₂=3,4,5,6) which falls in the visible range (400–700 nm). C belongs to Lyman (n₁=1), which is Ultraviolet.",
  },
  {
    id: 14,
    part: "B",
    question: "Select the correct options regarding the shapes and nodal surfaces of d-orbitals: (Select all that apply)",
    options: [
      { key: "A", text: "The 3d_xy, 3d_yz, and 3d_zx orbitals have cloverleaf shapes with lobes lying between the Cartesian axes" },
      { key: "B", text: "The 3d_x²-y² orbital has 4 lobes lying directly along the x and y axes" },
      { key: "C", text: "The 3d_z² orbital possesses two planar nodal surfaces passing through the origin" },
      { key: "D", text: "All 3d orbitals possess 2 angular nodes (l = 2)" },
    ],
    correctKeys: ["A", "B", "D"],
    type: "multi",
    explanation: "A, B, D are true. C is false: 3d_z² has zero planar nodal planes; it has two conical nodal surfaces.",
  },
  {
    id: 15,
    part: "B",
    question: "Which of the following ground-state transition metal atoms/ions possess an anomalous electronic configuration differing from standard (n+l) Aufbau predictions? (Select all that apply)",
    options: [
      { key: "A", text: "Chromium (Cr, Z=24): [Ar] 3d⁵ 4s¹" },
      { key: "B", text: "Copper (Cu, Z=29): [Ar] 3d¹⁰ 4s¹" },
      { key: "C", text: "Palladium (Pd, Z=46): [Kr] 4d¹⁰ 5s⁰" },
      { key: "D", text: "Zinc (Zn, Z=30): [Ar] 3d¹⁰ 4s²" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are well-known anomalous configurations driven by half-filled / fully-filled d-subshell exchange stability. Zn (D) follows standard Aufbau rules.",
  },
  {
    id: 16,
    part: "B",
    question: "Select the valid statements regarding the Heisenberg Uncertainty Principle: (Select all that apply)",
    options: [
      { key: "A", text: "It is expressed mathematically as Δx · Δp_x ≥ h / 4π" },
      { key: "B", text: "It proves that electrons cannot exist inside an atomic nucleus because Δv would exceed the speed of light" },
      { key: "C", text: "It applies to both subatomic particles and macroscopic objects, but is physically significant only for subatomic masses" },
      { key: "D", text: "It allows precise simultaneous measurement of both position and momentum if high-intensity lasers are used" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are correct. D is false: the uncertainty principle is an intrinsic wave-particle property of matter, not an instrumentation limitation.",
  },
  {
    id: 17,
    part: "B",
    question: "Which of the following chemical species are ISOELECTRONIC with each other (possessing exactly 10 electrons)? (Select all that apply)",
    options: [
      { key: "A", text: "Oxide ion (O²⁻)" },
      { key: "B", text: "Sodium cation (Na⁺)" },
      { key: "C", text: "Nitride ion (N³⁻)" },
      { key: "D", text: "Neon atom (Ne)" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four species contain exactly 10 electrons: O²⁻ (8+2=10), Na⁺ (11-1=10), N³⁻ (7+3=10), Ne (10).",
  },
  {
    id: 18,
    part: "B",
    question: "Select the correct statements regarding the Wavefunction ψ and Probability Density ψ²: (Select all that apply)",
    options: [
      { key: "A", text: "ψ is the probability amplitude and can take both positive and negative mathematical values" },
      { key: "B", text: "ψ² represents the probability density of finding an electron per unit volume at a given spatial point (x,y,z)" },
      { key: "C", text: "ψ² is always real and non-negative (ψ² ≥ 0)" },
      { key: "D", text: "Nodes are spatial regions where ψ² = 0" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four statements represent standard quantum mechanical definitions of wavefunction and probability density.",
  },
  {
    id: 19,
    part: "B",
    question: "Which of the following statements regarding Bohr's atomic model parameters are TRUE? (Select all that apply)",
    options: [
      { key: "A", text: "Total energy E_n is negative, indicating the electron is bound to the nucleus" },
      { key: "B", text: "Potential energy U_n is equal to twice the total energy (U_n = 2 E_n)" },
      { key: "C", text: "Kinetic energy K_n is equal to the negative of total energy (K_n = -E_n)" },
      { key: "D", text: "Electron velocity v_n is directly proportional to principal quantum number n" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are true. D is false: v_n ∝ Z / n is inversely proportional to n.",
  },
  {
    id: 20,
    part: "B",
    question: "Select the correct options regarding de Broglie matter waves: (Select all that apply)",
    options: [
      { key: "A", text: "The de Broglie wavelength is inversely proportional to momentum (λ = h / p)" },
      { key: "B", text: "According to de Broglie, a Bohr circular orbit contains an integral number of electron wavelengths (2πr = nλ)" },
      { key: "C", text: "Microscopic fast-moving electrons display observable wave diffraction patterns (Davisson-Germer experiment)" },
      { key: "D", text: "Macroscopic heavy objects have extremely large de Broglie wavelengths that dominate daily human movement" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "A, B, C are true. D is false: macroscopic objects have large masses, producing unimaginably tiny de Broglie wavelengths (~10⁻³⁵ m) with zero observable wave effects.",
  },
];

// ============================================================================
// COLOR STYLES
// ============================================================================
const colorStyles = {
  indigo: { badge: "bg-indigo-100 text-indigo-800 border-indigo-200", border: "border-indigo-200 hover:border-indigo-400", activeBg: "bg-indigo-950 text-white border-indigo-500", text: "text-indigo-700", header: "bg-indigo-50 border-indigo-200" },
  purple: { badge: "bg-purple-100 text-purple-800 border-purple-200", border: "border-purple-200 hover:border-purple-400", activeBg: "bg-purple-950 text-white border-purple-500", text: "text-purple-700", header: "bg-purple-50 border-purple-200" },
  emerald: { badge: "bg-emerald-100 text-emerald-800 border-emerald-200", border: "border-emerald-200 hover:border-emerald-400", activeBg: "bg-emerald-950 text-white border-emerald-500", text: "text-emerald-700", header: "bg-emerald-50 border-emerald-200" },
  amber: { badge: "bg-amber-100 text-amber-800 border-amber-200", border: "border-amber-200 hover:border-amber-400", activeBg: "bg-amber-950 text-white border-amber-500", text: "text-amber-700", header: "bg-amber-50 border-amber-200" },
  rose: { badge: "bg-rose-100 text-rose-800 border-rose-200", border: "border-rose-200 hover:border-rose-400", activeBg: "bg-rose-950 text-white border-rose-500", text: "text-rose-700", header: "bg-rose-50 border-rose-200" },
  cyan: { badge: "bg-cyan-100 text-cyan-800 border-cyan-200", border: "border-cyan-200 hover:border-cyan-400", activeBg: "bg-cyan-950 text-white border-cyan-500", text: "text-cyan-700", header: "bg-cyan-50 border-cyan-200" },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
type Tab = "particles" | "photoelectric" | "bohr" | "wave" | "schrodinger" | "orbitals" | "aufbau" | "traps" | "glossary" | "selftest";

export const AtomicStructureDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("particles");
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
    { id: "particles", label: "Particles & Models", icon: <Atom className="w-3.5 h-3.5 shrink-0" /> },
    { id: "photoelectric", label: "Photoelectric & Quantum", icon: <Zap className="w-3.5 h-3.5 shrink-0" /> },
    { id: "bohr", label: "Bohr Model & Spectrum", icon: <Radio className="w-3.5 h-3.5 shrink-0" /> },
    { id: "wave", label: "de Broglie & Uncertainty", icon: <Activity className="w-3.5 h-3.5 shrink-0" /> },
    { id: "schrodinger", label: "Schrödinger & Density", icon: <Layers className="w-3.5 h-3.5 shrink-0" /> },
    { id: "orbitals", label: "Quantum Nos & Nodes", icon: <Compass className="w-3.5 h-3.5 shrink-0" /> },
    { id: "aufbau", label: "Aufbau & Exchange", icon: <Grid className="w-3.5 h-3.5 shrink-0" /> },
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
          CHEMISTRY INTERACTIVE MODULE — CHAPTER 2
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <Atom className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 shrink-0" />
            STRUCTURE OF ATOM
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            Subatomic Discovery · Photoelectric Effect · Bohr Orbitals · de Broglie & HUP · Schrödinger Wave Mechanics · Quantum Numbers & Nodes · NEST 20-Q Module
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

      {/* TAB 1: PARTICLES & MODELS */}
      {activeTab === "particles" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Atom className="w-4 h-4 text-indigo-600 shrink-0" />
              Fundamental Subatomic Particles Matrix
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {particlesData.map((p) => (
                <div key={p.name} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">{p.name}</span>
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">{p.symbol}</span>
                  </div>
                  <p className="text-[10px] text-slate-600 font-semibold">{p.discoverer} ({p.year})</p>
                  <div className="space-y-0.5 font-mono text-[10px] text-slate-800">
                    <div>Charge: <span className="font-bold">{p.charge}</span></div>
                    <div>Mass: <span className="font-bold">{p.massKg}</span> ({p.massU})</div>
                  </div>
                  <p className="text-[9px] text-slate-600 font-medium pt-1 border-t border-slate-200">{p.notes}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-600 shrink-0" />
              Atomic Terminology & Isotopic Classification
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {isotopicClasses.map((item) => (
                <div key={item.term} className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-950">{item.term}</span>
                    <code className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">{item.keyRelation}</code>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-700 leading-snug">{item.definition}</p>
                  <p className="text-[10px] font-mono text-emerald-900 font-medium">Ex: {item.example}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900">Rutherford α-Scattering & Nuclear Dimensions</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <span className="text-[9px] font-black uppercase text-amber-800 tracking-wider block">Distance of Closest Approach (r₀)</span>
                <code className="text-xs font-mono font-black text-amber-950 block">r₀ = (1/4πε₀) · (2Ze² / E_k)</code>
                <p className="text-[10px] text-slate-600 font-medium">Equates α initial kinetic energy to electrostatic potential at reversal.</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <span className="text-[9px] font-black uppercase text-amber-800 tracking-wider block">Nuclear Radius Law</span>
                <code className="text-xs font-mono font-black text-amber-950 block">R = R₀ · A^(1/3)</code>
                <p className="text-[10px] text-slate-600 font-medium">R₀ ≈ 1.2–1.4 × 10⁻¹⁵ m (1.2–1.4 fm); A = Mass Number.</p>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
              <p className="text-xs font-bold text-rose-900">⚠ Rutherford Limitation: Accelerating electrons must radiate energy (Maxwell electromagnetism), spiraling into the nucleus in ~10⁻⁸ s. Also failed to explain discrete atomic line spectra.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PHOTOELECTRIC & QUANTUM */}
      {activeTab === "photoelectric" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              Planck's Quantum Theory & Photon Energy
            </h4>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <code className="text-xs sm:text-sm font-mono font-black text-amber-950 block leading-loose">E = hν = hc / λ = hc ν̄</code>
              <code className="text-xs font-mono font-black text-amber-800 block mt-1">E (eV) ≈ 12400 / λ (Å) ≈ 1240 / λ (nm)</code>
            </div>
            <p className="text-xs font-semibold text-slate-700 leading-relaxed">
              Energy is emitted or absorbed in discrete packets called <span className="font-bold text-slate-900">Quanta</span> (Photons for light). Planck constant <code className="font-mono font-bold text-indigo-700">h = 6.626 × 10⁻³⁴ J·s</code>.
            </p>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-indigo-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900">Einstein's Photoelectric Effect (1905)</h4>
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 space-y-1">
              <span className="text-[9px] font-black uppercase text-indigo-800 tracking-wider block">Energy Conservation Equation</span>
              <code className="text-xs sm:text-sm font-mono font-black text-indigo-950 block">hν = Φ + K_max = hν₀ + (1/2) m_e v_max² = e V_s</code>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[9px] font-black uppercase text-slate-600 tracking-wider block">Work Function (Φ)</span>
                <code className="text-xs font-mono font-bold text-slate-900">Φ = hν₀ = hc / λ₀</code>
                <p className="text-[9px] text-slate-600 mt-0.5">Minimum energy to liberate electron.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[9px] font-black uppercase text-slate-600 tracking-wider block">Stopping Potential (V_s)</span>
                <code className="text-xs font-mono font-bold text-slate-900">e V_s = K_max</code>
                <p className="text-[9px] text-slate-600 mt-0.5">Linear with frequency; independent of intensity.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[9px] font-black uppercase text-slate-600 tracking-wider block">Photocurrent</span>
                <code className="text-xs font-mono font-bold text-slate-900">Current ∝ Intensity</code>
                <p className="text-[9px] text-slate-600 mt-0.5">Number of ejected photoelectrons per second.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BOHR MODEL & SPECTRUM */}
      {activeTab === "bohr" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-600 shrink-0" />
              Bohr Single-Electron Formula Derivations (Z, n)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200">
                <span className="text-[9px] font-black uppercase text-cyan-800 tracking-wider block">Bohr Radius (r_n)</span>
                <code className="text-xs font-mono font-black text-cyan-950">r_n = 0.529 × (n² / Z) Å</code>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200">
                <span className="text-[9px] font-black uppercase text-cyan-800 tracking-wider block">Electron Velocity (v_n)</span>
                <code className="text-xs font-mono font-black text-cyan-950">v_n = 2.188 × 10⁶ × (Z / n) m/s</code>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200">
                <span className="text-[9px] font-black uppercase text-cyan-800 tracking-wider block">Total Energy (E_n)</span>
                <code className="text-xs font-mono font-black text-cyan-950">E_n = -13.6 × (Z² / n²) eV</code>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-700">
              <span>Energy Relations:</span>
              <code className="font-mono text-indigo-700">K_n = +13.6 (Z²/n²) eV</code>
              <code className="font-mono text-rose-700">U_n = -27.2 (Z²/n²) eV</code>
              <code className="font-mono text-slate-900">E_n = -K_n = U_n / 2</code>
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900">Hydrogen Emission Spectrum & Rydberg Equation</h4>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <code className="text-xs sm:text-sm font-mono font-black text-slate-900 block">ν̄ = 1 / λ = R_H · Z² · (1/n₁² − 1/n₂²)   [R_H = 109677 cm⁻¹ = 1.09677 × 10⁷ m⁻¹]</code>
            </div>
            <div className="space-y-1.5">
              {spectralSeriesData.map((s) => (
                <div key={s.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 gap-1 sm:gap-0">
                  <div className="flex items-center gap-2 sm:w-1/3">
                    <span className="text-xs font-black text-slate-900">{s.name} Series</span>
                    <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">n₁ = {s.n1}</span>
                  </div>
                  <span className="text-xs font-bold text-indigo-800 sm:w-1/3">{s.region}</span>
                  <code className="text-[11px] font-mono font-black text-slate-700 sm:w-1/3 sm:text-right">λ_min = {s.shortestWavelength}</code>
                </div>
              ))}
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200">
              <p className="text-xs font-bold text-cyan-950">Total Spectral Lines: N = (n₂ - n₁)(n₂ - n₁ + 1) / 2. (When returning to ground state n₁=1 → N = n(n-1)/2).</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: WAVE & UNCERTAINTY */}
      {activeTab === "wave" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-600 shrink-0" />
              de Broglie Matter-Wave Duality (1924)
            </h4>
            <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
              <code className="text-xs sm:text-sm font-mono font-black text-purple-950 block leading-loose">λ = h / p = h / (m v) = h / √(2 m E_k) = h / √(2 m q V)</code>
              <code className="text-xs font-mono font-black text-purple-800 block mt-1">Accelerated Electron: λ_e = 12.27 / √V Å = √(150 / V) Å</code>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[9px] font-black uppercase text-slate-600 tracking-wider block">Bohr-de Broglie Standing Wave Condition</span>
              <code className="text-xs font-mono font-black text-slate-900">2π r = n λ → 2π r = n (h / m v) → m v r = n h / 2π</code>
              <p className="text-[10px] text-slate-600 mt-0.5">The circumference of the n-th Bohr orbit contains exactly n integral electron de Broglie wavelengths.</p>
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-rose-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900">Heisenberg Uncertainty Principle (1927)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
                <span className="text-[9px] font-black uppercase text-rose-800 tracking-wider block">Position-Momentum</span>
                <code className="text-xs font-mono font-black text-rose-950">Δx · Δp_x ≥ h / 4π = ℏ / 2</code>
                <code className="text-xs font-mono font-bold text-rose-900 block">Δx · (m Δv_x) ≥ h / 4π</code>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
                <span className="text-[9px] font-black uppercase text-rose-800 tracking-wider block">Energy-Time</span>
                <code className="text-xs font-mono font-black text-rose-950">ΔE · Δt ≥ h / 4π = ℏ / 2</code>
                <p className="text-[9px] text-slate-600 mt-0.5">Governs excited state spectral lifetime.</p>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-xs font-bold text-slate-800">Proof of Non-existence of Free Electrons in Nucleus: For nuclear confinement (Δx ≈ 10⁻¹⁴ m), Δv ≥ 5.7 × 10¹⁰ m/s &gt; c (speed of light!), which is impossible.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SCHRODINGER & PROBABILITY */}
      {activeTab === "schrodinger" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
              Time-Independent Schrödinger Wave Equation (1926)
            </h4>
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200">
              <code className="text-xs sm:text-sm font-mono font-black text-indigo-950 block leading-loose">Ĥ ψ = E ψ</code>
              <code className="text-[11px] font-mono font-semibold text-indigo-800 block">∂²ψ/∂x² + ∂²ψ/∂y² + ∂²ψ/∂z² + (8π²m_e / h²) (E − V) ψ = 0</code>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[9px] font-black uppercase text-slate-600 tracking-wider block">Wavefunction (ψ)</span>
                <p className="text-xs font-semibold text-slate-800">Mathematical probability amplitude of electron 3D standing wave. Has no direct physical meaning; can be positive or negative.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[9px] font-black uppercase text-slate-600 tracking-wider block">Probability Density (ψ²)</span>
                <p className="text-xs font-semibold text-slate-800">Probability of finding the electron per unit volume at (x,y,z). Always real and non-negative (ψ² ≥ 0).</p>
              </div>
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900">Radial Probability Distribution Function (4πr² R² dr)</h4>
            <p className="text-xs font-semibold text-slate-700 leading-relaxed">
              Factorization: <code className="font-mono font-bold">ψ(r, θ, φ) = R(r) · Y(θ, φ)</code>. The probability of finding an electron in a spherical shell of thickness <code className="font-mono">dr</code> at distance <code className="font-mono">r</code> is given by <code className="font-mono font-bold text-indigo-700">4πr² R² dr</code>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200 text-center space-y-1">
                <span className="text-xs font-black text-cyan-900 block">1s Orbital</span>
                <p className="text-[10px] font-bold text-slate-700">Single peak at r_max = a₀ (0.529 Å). 0 radial nodes.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200 text-center space-y-1">
                <span className="text-xs font-black text-cyan-900 block">2s Orbital</span>
                <p className="text-[10px] font-bold text-slate-700">1 radial node, 2 peaks (major peak at higher r).</p>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200 text-center space-y-1">
                <span className="text-xs font-black text-cyan-900 block">2p Orbital</span>
                <p className="text-[10px] font-bold text-slate-700">0 radial nodes, peak at r_max = 4a₀.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: QUANTUM NUMBERS & NODES */}
      {activeTab === "orbitals" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-600 shrink-0" />
              The Four Quantum Numbers Spectrum
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {quantumNumbersData.map((q) => (
                <div key={q.name} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">{q.name} ({q.symbol})</span>
                    <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">{q.values}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-700">{q.significance}</p>
                  <code className="text-[10px] font-mono font-bold text-emerald-900 block">{q.formula}</code>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900">Orbital Shapes & Nodal Classification</h4>
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-emerald-950">
              <span>Radial Nodes = <code className="font-mono font-black">n − l − 1</code></span>
              <span>Angular Nodes = <code className="font-mono font-black">l</code></span>
              <span>Total Nodes = <code className="font-mono font-black">n − 1</code></span>
            </div>
            <div className="space-y-1.5">
              {orbitalNodesData.map((o) => (
                <div key={o.orbital} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
                  <div className="flex items-center gap-2 sm:w-1/4">
                    <span className="font-mono text-xs font-black text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">{o.orbital}</span>
                    <span className="text-[10px] font-semibold text-slate-600">n={o.n}, l={o.l}</span>
                  </div>
                  <div className="flex gap-3 text-[10px] font-mono font-bold text-slate-700 sm:w-1/3">
                    <span>Radial: {o.radial}</span>
                    <span>Angular: {o.angular}</span>
                    <span className="text-indigo-700">Total: {o.total}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-800 sm:w-5/12 sm:text-right">{o.geometry}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: AUFBAU & EXCHANGE */}
      {activeTab === "aufbau" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Grid className="w-4 h-4 text-indigo-600 shrink-0" />
              Fundamental Electron Filling Principles
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">1. Aufbau (n + l) Rule</span>
                <p className="text-[10px] font-semibold text-slate-700">Orbitals fill in order of increasing (n+l). If equal, lower n fills first (e.g. 4s fills before 3d).</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">2. Pauli Exclusion</span>
                <p className="text-[10px] font-semibold text-slate-700">No two electrons in an atom can have all 4 identical quantum numbers. Orbital holds max 2 e⁻ with opposite spins.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">3. Hund's Multiplicity</span>
                <p className="text-[10px] font-semibold text-slate-700">Degenerate orbitals are singly occupied with parallel spins before pairing begins, maximizing exchange energy.</p>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200">
              <span className="text-[9px] font-black uppercase text-indigo-800 tracking-wider block">Aufbau Order</span>
              <code className="text-[10px] sm:text-xs font-mono font-bold text-indigo-950 block">1s &lt; 2s &lt; 2p &lt; 3s &lt; 3p &lt; 4s &lt; 3d &lt; 4p &lt; 5s &lt; 4d &lt; 5p &lt; 6s &lt; 4f &lt; 5d &lt; 6p &lt; 7s &lt; 5f &lt; 6d &lt; 7p</code>
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900">Exchange Energy (E_ex) Dynamics</h4>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <code className="text-xs sm:text-sm font-mono font-black text-amber-950 block leading-loose">E_ex = [n(n - 1) / 2] · K</code>
              <p className="text-[10px] text-slate-700 font-semibold mt-1">Where n is the number of parallel-spin electrons in degenerate orbitals, and K is the single-exchange constant.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-800">3d⁴ 4s²: n = 4 → E_ex = 4(3)/2 K = <span className="font-black text-indigo-700">6K</span></span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-800">3d⁵ 4s¹: n = 5 → E_ex = 5(4)/2 K = <span className="font-black text-emerald-700">10K (4K More Stable!)</span></span>
              </div>
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900">Anomalous Ground-State Configurations Matrix</h4>
            <div className="space-y-1.5">
              {anomalousConfigs.map((c) => (
                <div key={c.z} className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 gap-1 sm:gap-0">
                  <div className="flex items-center gap-2 sm:w-1/3">
                    <span className="text-xs font-black text-slate-900">{c.element}</span>
                    <span className="font-mono text-[9px] font-bold text-slate-500">Z={c.z}</span>
                  </div>
                  <div className="flex gap-2 font-mono text-[10px] sm:w-1/3">
                    <span className="text-slate-400 line-through">{c.predicted}</span>
                    <span className="font-black text-indigo-700">{c.actual}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-700 sm:w-1/3 sm:text-right">{c.reason}</span>
                </div>
              ))}
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
              All 10 High-Yield NEST Misconceptions & Traps
            </h4>
            <div className="space-y-2">
              {atomTraps.map((trap) => {
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
                placeholder="Search 48 atomic structure glossary terms..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {["All", "Subatomic & Models", "Quantum Theory & Photoelectric", "Bohr & Spectroscopy", "Quantum Mechanics & Wave", "Quantum Numbers & Orbitals"].map((cat) => (
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
                {score >= 17 ? "Outstanding! Mastery level for NEST & IChO Atomic Structure." : score >= 12 ? "Good performance — review incorrect explanations." : "Needs practice — revisit earlier tabs and retake."}
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

export default AtomicStructureDiagram;
