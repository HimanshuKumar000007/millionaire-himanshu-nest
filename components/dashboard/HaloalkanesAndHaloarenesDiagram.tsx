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

const haloTraps: Misconception[] = [
  { id: "t1", trap: "Neopentyl bromide undergoes rapid S_N2 substitution because it is a primary alkyl halide.", reality: "Neopentyl bromide (1°) is extremely inert to S_N2 due to severe steric crowding from the bulky t-butyl group.", tip: "It reacts slowly via S_N1 with carbocation rearrangement." },
  { id: "t2", trap: "In S_N1 reactions, complete 100% inversion of configuration occurs.", reality: "S_N1 yields Racemization with partial inversion (frontside attack is slightly hindered by the departing leaving group ion pair).", tip: "100% complete inversion is the hallmark of S_N2." },
  { id: "t3", trap: "All 4 Chlorines in CCl₄ contribute to a strong molecular dipole moment.", reality: "CCl₄ is a symmetrical regular tetrahedron (sp³); its four C-Cl bond dipoles cancel out completely, giving μ_net = 0.", tip: "CHCl₃ has a net dipole moment (μ = 1.04 D)." },
  { id: "t4", trap: "Chloride ions in chlorobenzene are easily replaced by OH⁻ at room temperature.", reality: "Chlorobenzene is inert to S_N2; replacement requires extreme conditions (623 K, 300 atm, Dow process) or o,p-nitro activation.", tip: "Partial double bond character renders C-Cl resistant to cleavage." },
  { id: "t5", trap: "Propan-1-ol gives a positive yellow precipitate with Iodoform reagent (I₂/NaOH).", reality: "Propan-1-ol (CH₃CH₂CH₂OH) gives a NEGATIVE Iodoform test. Propan-2-ol (CH₃CH(OH)CH₃) gives a positive test.", tip: "Test requires a CH₃-CH(OH)- or CH₃-CO- group." },
  { id: "t6", trap: "Polar protic solvents favor S_N2 reactions by stabilizing nucleophiles.", reality: "Polar protic solvents (H₂O, EtOH) INHIBIT S_N2 by hydrogen-bonding to nucleophiles. Polar Aprotic solvents (DMSO, DMF) favor S_N2.", tip: "Protic solvents favor S_N1 by stabilizing carbocations." },
  { id: "t7", trap: "DDT is easily broken down by soil microorganisms.", reality: "DDT is non-biodegradable and highly lipophilic, accumulating up aquatic food chains via Biomagnification.", tip: "Causes calcium deficiency and eggshell thinning in birds." },
  { id: "t8", trap: "The Meisenheimer complex formed during S_NAr is a carbocation intermediate.", reality: "The Meisenheimer complex is a CARBANION σ-complex (negatively charged ring intermediate stabilized by o,p-nitro groups).", tip: "S_EAr forms an Arenium ion (positive); S_NAr forms a Meisenheimer complex (negative)." },
  { id: "t9", trap: "Glycerol is purified by steam distillation.", reality: "Glycerol is purified by Distillation under Reduced Pressure (Vacuum Distillation) because it decomposes at its normal BP (290°C).", tip: "Aniline is purified by steam distillation." },
  { id: "t10", trap: "A racemic mixture rotates plane-polarized light to the right.", reality: "A racemic mixture is an equimolar (1:1) mixture of d- and l-enantiomers and is OPTICALLY INACTIVE (α = 0) due to external compensation.", tip: "Rotation of one enantiomer cancels the other." },
];

// ============================================================================
// 2. DATA: MASTER GLOSSARY (52 DEFINITIONS)
// ============================================================================
interface GlossaryTerm {
  term: string;
  definition: string;
  category: "Mechanisms & Kinetics" | "Stereochemistry & Bonds" | "Polyhalogen & Reagents" | "Toxicology & Biomolecules";
}

const masterGlossary: GlossaryTerm[] = [
  { term: "Acrosin", definition: "A serine protease in the sperm acrosome that digests a path through the Zona Pellucida.", category: "Toxicology & Biomolecules" },
  { term: "Acrodont", definition: "Dentition where teeth are fused directly to the jawbone summit.", category: "Toxicology & Biomolecules" },
  { term: "Actinomycin", definition: "An antibiotic that intercalates into DNA to inhibit transcription.", category: "Toxicology & Biomolecules" },
  { term: "Activation Energy (E_a)", definition: "The minimum energy barrier reactants must overcome to form a transition state.", category: "Mechanisms & Kinetics" },
  { term: "Allolactose", definition: "The natural inducer of the Lac operon produced by β-galactosidase cleavage of lactose.", category: "Toxicology & Biomolecules" },
  { term: "Ambident Nucleophile", definition: "A nucleophile possessing two distinct donor atoms capable of attacking an electrophile (e.g., CN⁻, NO₂⁻).", category: "Mechanisms & Kinetics" },
  { term: "Amniocentesis", definition: "Prenatal extraction of amniotic fluid (14–16 weeks) for fetal karyotyping.", category: "Toxicology & Biomolecules" },
  { term: "Anions", definition: "Negatively charged ions that migrate toward the anode during electrolysis.", category: "Mechanisms & Kinetics" },
  { term: "Anti-Addition", definition: "Addition of two substituents to opposite faces of a double or triple bond.", category: "Stereochemistry & Bonds" },
  { term: "Apc / APC/C", definition: "Anaphase-Promoting Complex; an E3 ubiquitin ligase driving securin destruction and cohesin cleavage.", category: "Toxicology & Biomolecules" },
  { term: "Apolipoprotein", definition: "A protein component that combines with lipids to form chylomicrons.", category: "Toxicology & Biomolecules" },
  { term: "Aprotic Solvent", definition: "A solvent lacking ionizable acidic protons (e.g., DMSO, DMF, Acetone) that accelerates S_N2 reactions.", category: "Mechanisms & Kinetics" },
  { term: "Aromaticity", definition: "The special thermodynamic stability of cyclic, planar, conjugated (4n+2)π-electron systems.", category: "Stereochemistry & Bonds" },
  { term: "Azo Compound", definition: "Organic molecule featuring a conjugated -N=N- linkage.", category: "Polyhalogen & Reagents" },
  { term: "Benzyne", definition: "A highly strained, reactive neutral intermediate featuring a formal triple bond in a benzene ring.", category: "Mechanisms & Kinetics" },
  { term: "Biomagnification", definition: "The progressive concentration increase of a non-biodegradable lipophilic toxicant (e.g., DDT) at higher trophic levels.", category: "Toxicology & Biomolecules" },
  { term: "Bohrium", definition: "A synthetic superheavy radioactive element (Z=107).", category: "Toxicology & Biomolecules" },
  { term: "Capacitation", definition: "The 5–6 h physiological conditioning of sperm in the female reproductive tract required for acrosomal reaction.", category: "Toxicology & Biomolecules" },
  { term: "Carbocation", definition: "A planar, sp²-hybridized, 6-valence-electron reactive intermediate bearing a positive charge on carbon.", category: "Mechanisms & Kinetics" },
  { term: "Carbenes", definition: "Neutral 6-valence-electron reactive intermediates containing a divalent carbon atom (e.g., :CCl₂).", category: "Mechanisms & Kinetics" },
  { term: "Carius Method", definition: "Quantitative elemental estimation digesting organic compounds with fuming HNO₃ and AgNO₃/BaCl₂.", category: "Polyhalogen & Reagents" },
  { term: "Chirality", definition: "The geometric property of a rigid object or molecule being non-superimposable on its mirror image.", category: "Stereochemistry & Bonds" },
  { term: "Chylomicron", definition: "A lipoprotein droplet (0.1–1 µm) synthesized in enterocytes that carries absorbed fats into lacteals.", category: "Toxicology & Biomolecules" },
  { term: "Cine Substitution", definition: "A nucleophilic substitution where the incoming group attaches to the carbon adjacent to the carbon bearing the leaving group (via Benzyne).", category: "Mechanisms & Kinetics" },
  { term: "Clathrin", definition: "A triskelion protein coat driving coated vesicle endocytosis.", category: "Toxicology & Biomolecules" },
  { term: "Coacervates", definition: "Colloidal protein-polysaccharide droplets formed during pre-biotic chemical evolution.", category: "Toxicology & Biomolecules" },
  { term: "DDT", definition: "p,p'-Dichlorodiphenyltrichloroethane, an organochlorine synthetic insecticide causing biomagnification and eggshell thinning.", category: "Toxicology & Biomolecules" },
  { term: "Dichloromethane (CH₂Cl₂)", definition: "A volatile organic solvent used as a paint stripper and aerosol propellant.", category: "Polyhalogen & Reagents" },
  { term: "Dimerization", definition: "Combination of two identical molecules to form a single complex (e.g., Benzoic acid in benzene).", category: "Stereochemistry & Bonds" },
  { term: "Diphyodont", definition: "Possessing two successive sets of teeth (milk and permanent) during a lifetime.", category: "Toxicology & Biomolecules" },
  { term: "Dow Process", definition: "Industrial synthesis of phenol by heating chlorobenzene with molten NaOH at 623 K and 300 atm.", category: "Mechanisms & Kinetics" },
  { term: "Ecdysis", definition: "Periodic shedding of the chitinous exoskeleton in arthropods.", category: "Toxicology & Biomolecules" },
  { term: "Elution", definition: "Extraction or recovery of adsorbed DNA/solute from a gel or chromatographic column using solvent.", category: "Polyhalogen & Reagents" },
  { term: "Enantiomers", definition: "Non-superimposable mirror image stereoisomers that rotate plane-polarized light in opposite directions with equal magnitude.", category: "Stereochemistry & Bonds" },
  { term: "Fajans’ Rules", definition: "Rules predicting the degree of covalent character in an ionic bond based on polarization.", category: "Stereochemistry & Bonds" },
  { term: "Fast Block to Polyspermy", definition: "Transient electrical depolarization of the oolemma (Na⁺ influx) upon sperm fusion.", category: "Toxicology & Biomolecules" },
  { term: "Freons (CFCs)", definition: "Stable chlorofluorocarbon compounds that photolyze in the stratosphere to release catalytic ozone-destroying Cl• radicals.", category: "Toxicology & Biomolecules" },
  { term: "G-Protein", definition: "A membrane-bound GTP-binding regulatory protein that couples receptors to second messenger enzymes.", category: "Toxicology & Biomolecules" },
  { term: "Gilman Reagent", definition: "Lithium dialkylcuprate (R₂CuLi) used in Corey-House alkane coupling.", category: "Polyhalogen & Reagents" },
  { term: "Hammond Postulate", definition: "Principle linking the transition state structure of a reaction step to the nearest energetic stable intermediate.", category: "Mechanisms & Kinetics" },
  { term: "Heterolytic Fission", definition: "Unsymmetrical covalent bond cleavage where the more electronegative fragment retains both bonding electrons.", category: "Mechanisms & Kinetics" },
  { term: "Homolytic Fission", definition: "Symmetrical covalent bond cleavage where each fragment retains one bonding electron, producing free radicals.", category: "Mechanisms & Kinetics" },
  { term: "Iodoform Test", definition: "Diagnostic yellow precipitate test (CHI₃ ↓) for methyl ketones (CH₃CO-) and secondary methyl carbinols (CH₃CH(OH)-).", category: "Polyhalogen & Reagents" },
  { term: "Kharasch Effect", definition: "Free-radical anti-Markovnikov addition of HBr across alkenes in the presence of peroxides.", category: "Mechanisms & Kinetics" },
  { term: "Meisenheimer Intermediate", definition: "A negatively charged carbanion σ-complex formed during S_NAr nucleophilic substitution on activated haloarenes.", category: "Mechanisms & Kinetics" },
  { term: "Neopentyl Halide", definition: "A 1° alkyl halide (CH₃)₃C-CH₂X that is extremely unreactive toward S_N2 due to steric crowding.", category: "Mechanisms & Kinetics" },
  { term: "Phosgene (COCl₂)", definition: "A deadly, highly toxic gas formed by the autoxidation of chloroform (CHCl₃) in the presence of air and light.", category: "Polyhalogen & Reagents" },
  { term: "Racemic Mixture", definition: "An equimolar (1:1) mixture of two enantiomers that is optically inactive due to external compensation.", category: "Stereochemistry & Bonds" },
  { term: "S_N1 Reaction", definition: "Unimolecular nucleophilic substitution proceeding in two steps via a carbocation intermediate with racemization.", category: "Mechanisms & Kinetics" },
  { term: "S_N2 Reaction", definition: "Bimolecular nucleophilic substitution proceeding in a single concerted step with complete Walden inversion.", category: "Mechanisms & Kinetics" },
  { term: "Swarts Reaction", definition: "Synthesis of alkyl fluorides or freons using heavy metal fluorides (AgF, SbF₃, Hg₂F₂).", category: "Polyhalogen & Reagents" },
  { term: "Walden Inversion", definition: "The complete inversion of 3D spatial configuration accompanying an S_N2 backside nucleophilic attack.", category: "Stereochemistry & Bonds" },
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
    question: "An optically active pure enantiomer of 2-bromobutane ([α]_D²⁵ = +36.0°) undergoes nucleophilic substitution with aqueous Potassium Hydroxide (KOH) in a 80% ethanol / 20% water mixture. The isolated 2-butanol product exhibits a specific rotation of [α]_D²⁵ = -3.60°. Assuming the pure enantiomer of (S)-2-butanol has a specific rotation of -18.0°, what are the percentage contributions of the S_N1 and S_N2 reaction pathways in this solvolysis?",
    options: [
      { key: "A", text: "S_N1 = 60%; S_N2 = 40%" },
      { key: "B", text: "S_N1 = 80%; S_N2 = 20%" },
      { key: "C", text: "S_N1 = 20%; S_N2 = 80%" },
      { key: "D", text: "S_N1 = 100%; S_N2 = 0%" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "1. Enantiomeric Excess (ee): ee = (Observed Rotation / Pure Enantiomer Rotation) × 100 = (-3.60° / -18.0°) × 100 = 20% Net Inversion. 2. S_N2 yields 100% net inversion; S_N1 yields 100% racemization (0% net rotation). 3. Therefore, % S_N2 = 20%, and % S_N1 = 100% - 20% = 80%.",
  },
  {
    id: 2,
    part: "A",
    question: "What is the correct order of increasing reactivity toward bimolecular nucleophilic substitution (S_N2) for the following alkyl halides? 1: 1-bromobutane, 2: 2-bromobutane, 3: 2-bromo-2-methylpropane, 4: 1-bromo-2,2-dimethylpropane (Neopentyl bromide)",
    options: [
      { key: "A", text: "3 < 4 < 2 < 1" },
      { key: "B", text: "4 < 3 < 2 < 1" },
      { key: "C", text: "1 < 2 < 3 < 4" },
      { key: "D", text: "3 < 2 < 4 < 1" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "S_N2 reactivity depends strictly on steric hindrance: 3-methyl-3-bromo (3°) is most sterically crowded (3), followed by neopentyl bromide (4), 2-bromobutane (2), and unhindered 1-bromobutane (1). Increasing order: 3 < 4 < 2 < 1.",
  },
  {
    id: 3,
    part: "A",
    question: "Chlorobenzene is treated with Sodium Amide (NaNH₂) in liquid Ammonia (liquid NH₃) at -33°C. The reaction yields Aniline via an Elimination-Addition mechanism. What intermediate is formed during this transformation, and what type of carbon-carbon bond does it contain?",
    options: [
      { key: "A", text: "Meisenheimer Complex; Carbanion σ-complex" },
      { key: "B", text: "Benzyne Intermediate; formal C≡C triple bond formed by sp²-sp² lateral overlap in the plane of the ring" },
      { key: "C", text: "Phenyl Carbocation; vacant sp² orbital" },
      { key: "D", text: "Arenium Ion; non-aromatic sp³ center" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Unactivated haloarenes react with ultra-strong bases (NaNH₂/liq. NH₃) via the Benzyne Mechanism. Elimination of HCl forms a Benzyne Intermediate containing a formal, highly strained C≡C triple bond formed by lateral overlap of two sp² hybrid orbitals in the ring plane.",
  },
  {
    id: 4,
    part: "A",
    question: "A student attempts to prepare 1-fluoro-2,4-dinitrobenzene by reacting 1-chloro-2,4-dinitrobenzene with Potassium Fluoride (KF) in DMSO at 100°C. The reaction proceeds rapidly via an S_NAr nucleophilic aromatic substitution mechanism. What species acts as the rate-determining intermediate, and why do o,p-nitro groups accelerate this reaction?",
    options: [
      { key: "A", text: "Phenyl cation; nitro groups donate electrons by +M effect" },
      { key: "B", text: "Meisenheimer Carbanion Complex; nitro groups delocalize the negative charge via strong -M resonance" },
      { key: "C", text: "Free radical; nitro groups block S_N2 backside attack" },
      { key: "D", text: "Benzyne intermediate; nitro groups eliminate HNO₂" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "In S_NAr addition-elimination reactions of activated haloarenes, nucleophilic attack forms a negatively charged Meisenheimer Carbanion σ-Complex (RDS). Nitro groups at ortho and para positions strongly stabilize this carbanion via -M resonance.",
  },
  {
    id: 5,
    part: "A",
    question: "Chloroform (CHCl₃) stored in a transparent glass bottle exposed to sunlight and air reacts to form a deadly poisonous gas X. To prevent the accumulation of gas X, 1% Ethanol is added to bottle preparations. What is the identity of gas X, and what non-toxic compound is formed when Ethanol reacts with gas X?",
    options: [
      { key: "A", text: "Chlorine gas (Cl₂); Ethyl Chloride" },
      { key: "B", text: "Phosgene (COCl₂); Diethyl Carbonate ((C₂H₅O)₂C=O)" },
      { key: "C", text: "Mustard Gas; Ethyl Acetate" },
      { key: "D", text: "Carbon Monoxide (CO); Ethanolate" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Autoxidation of Chloroform forms toxic Phosgene gas (COCl₂): 2CHCl₃ + O₂ ──► 2COCl₂ + 2HCl. 1% ethanol converts trace phosgene into non-toxic Diethyl Carbonate: COCl₂ + 2C₂H₅OH ──► (C₂H₅O)₂C=O + 2HCl.",
  },
  {
    id: 6,
    part: "A",
    question: "Which of the following organic compounds will give a POSITIVE Iodoform Test, forming a bright yellow crystalline precipitate of CHI₃ upon treatment with Iodine (I₂) and aqueous NaOH?",
    options: [
      { key: "A", text: "Methanol (CH₃OH)" },
      { key: "B", text: "Propan-1-ol (CH₃CH₂CH₂OH)" },
      { key: "C", text: "Propan-2-ol (CH₃CH(OH)CH₃)" },
      { key: "D", text: "Benzophenone (C₆H₅COC₆H₅)" },
    ],
    correctKeys: ["C"],
    type: "single",
    explanation: "The Iodoform test requires a Secondary Methyl Carbinol group (CH₃-CH(OH)-R) or a Methyl Ketone group (CH₃-CO-R). Propan-2-ol possesses this group, oxidizing in-situ to acetone and giving yellow CHI₃ ↓. Methanol, Propan-1-ol, and Benzophenone fail the test.",
  },
  {
    id: 7,
    part: "A",
    question: "Chlorofluorocarbons such as Freon-12 (CCl₂F₂) diffuse into the stratosphere, where high-energy solar UV radiation triggers their photolytic breakdown. Which reactive radical species is released during this photolysis to act as a catalytic agent in destroying the stratospheric ozone layer?",
    options: [
      { key: "A", text: "Fluorine Radical (F•)" },
      { key: "B", text: "Chlorine Radical (Cl•)" },
      { key: "C", text: "Methyl Radical (CH₃•)" },
      { key: "D", text: "Hydroxyl Radical (OH•)" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "UV light cleaves the weaker C-Cl bond in Freon-12 homolytically, releasing a Chlorine Radical (Cl•): CCl₂F₂ ──► •CClF₂ + Cl•. Cl• destroys >100,000 ozone molecules via catalytic chain reaction.",
  },
  {
    id: 8,
    part: "A",
    question: "The synthetic organochlorine insecticide DDT (p,p'-Dichlorodiphenyltrichloroethane) is highly lipophilic and resistant to metabolic breakdown. What ecological phenomenon explains why top predatory fish-eating birds suffer severe population crashes following environmental DDT contamination?",
    options: [
      { key: "A", text: "Eutrophication causing oceanic hypoxia" },
      { key: "B", text: "Biomagnification along food chains, causing calcium metabolic disruption and eggshell thinning" },
      { key: "C", text: "Direct inhibition of plant photosynthesis" },
      { key: "D", text: "Destruction of stratospheric ozone" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "DDT is fat-soluble and non-biodegradable, accumulating along food chains (Biomagnification: 0.003 ppb in water to 25 ppm in raptors). In birds, DDT inhibits calcium-ATPase in the shell gland, causing eggshell thinning and brooding breakage.",
  },
  {
    id: 9,
    part: "A",
    question: "When 2-bromobutane is heated with alcoholic KOH, a mixture of 2-butene (81%) and 1-butene (19%) is obtained. Which regioselectivity rule governs the preferential formation of 2-butene as the major product?",
    options: [
      { key: "A", text: "Hofmann Rule" },
      { key: "B", text: "Saytzeff (Zaitsev) Rule" },
      { key: "C", text: "Markovnikov's Rule" },
      { key: "D", text: "Kharasch Rule" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Dehydrohalogenation of an alkyl halide using an unhindered base (alc. KOH / EtO⁻) follows the Saytzeff (Zaitsev) Rule, yielding the more substituted, more stable alkene (2-butene with 6 α-hydrogens).",
  },
  {
    id: 10,
    part: "A",
    question: "An S_N2 reaction performed at an asymmetric stereocenter of (2R)-2-bromooctane using Sodium Hydroxide in DMF yields 2-octanol. What is the absolute stereochemical configuration of the resulting 2-octanol product?",
    options: [
      { key: "A", text: "(2R)-2-octanol (Complete Retention)" },
      { key: "B", text: "(2S)-2-octanol (Complete Walden Inversion)" },
      { key: "C", text: "Equimolar 50:50 Racemic Mixture of (2R) and (2S)" },
      { key: "D", text: "Optically inactive achiral 2-octanol" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "S_N2 reactions proceed via concerted backside nucleophilic attack 180° opposite the leaving group, causing 100% complete Walden Inversion from (2R) to (2S)-2-octanol.",
  },
  {
    id: 11,
    part: "B",
    question: "Which of the following factors explain why Chlorobenzene is extremely unreactive toward standard Nucleophilic Substitution (S_N2) compared to Cyclohexyl chloride? (Select all that apply)",
    options: [
      { key: "A", text: "The C-Cl bond in chlorobenzene possesses partial double-bond character due to resonance delocalization of chlorine lone pairs into the aromatic ring." },
      { key: "B", text: "The carbon atom attached to chlorine is sp²-hybridized in chlorobenzene (more electronegative, shorter 1.69 Å bond) vs sp³-hybridized in cyclohexyl chloride." },
      { key: "C", text: "Backside S_N2 attack is blocked by the dense π-electron cloud of the benzene ring." },
      { key: "D", text: "Chlorobenzene spontaneously undergoes S_N1 ionization to form a highly stable phenyl cation." },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: Partial double bond character, sp² carbon electronegativity, and π-cloud electrostatic repulsion prevent substitution. • D is false: The phenyl cation is EXTREMELY UNSTABLE.",
  },
  {
    id: 12,
    part: "B",
    question: "Select the valid statements regarding S_N1 versus S_N2 nucleophilic substitution mechanisms: (Select all that apply)",
    options: [
      { key: "A", text: "S_N1 reactions proceed via a planar sp² carbocation intermediate and are prone to 1,2-rearrangements." },
      { key: "B", text: "S_N2 reactions proceed in a single concerted step via a 5-coordinate trigonal bipyramidal transition state." },
      { key: "C", text: "Polar Aprotic Solvents (e.g., DMSO, DMF) accelerate S_N2 reactions by leaving nucleophiles un-solvated." },
      { key: "D", text: "S_N1 reactions exhibit 100% Walden Inversion, whereas S_N2 reactions exhibit complete racemization." },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct. • D is false: S_N2 gives 100% Walden Inversion, while S_N1 gives Racemization.",
  },
  {
    id: 13,
    part: "B",
    question: "Which of the following organic compounds will yield a POSITIVE Iodoform Test (CHI₃ ↓ yellow precipitate) when treated with I₂ / NaOH? (Select all that apply)",
    options: [
      { key: "A", text: "Ethanol (CH₃CH₂OH)" },
      { key: "B", text: "Acetaldehyde (CH₃CHO)" },
      { key: "C", text: "Acetone (CH₃COCH₃)" },
      { key: "D", text: "Methanol (CH₃OH)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• Ethanol, Acetaldehyde, and Acetone possess CH₃CH(OH)- or CH₃CO- groups and yield yellow CHI₃ ↓. • Methanol lacks a C-C bond and fails the test.",
  },
  {
    id: 14,
    part: "B",
    question: "Select the correct statements regarding the Environmental Impact of Polyhalogen Compounds: (Select all that apply)",
    options: [
      { key: "A", text: "Freon-12 (CCl₂F₂) releases atomic Chlorine radicals (Cl•) under stratospheric UV light, catalytically destroying ozone." },
      { key: "B", text: "Carbon Tetrachloride (CCl₄) causes liver damage, CNS depression, and stratospheric ozone depletion." },
      { key: "C", text: "DDT is an organochlorine insecticide that biomagnifies up aquatic food chains, causing eggshell thinning in birds." },
      { key: "D", text: "Chloroform autoxidizes in air and light to form non-toxic sodium bicarbonate." },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct. • D is false: Chloroform autoxidizes to form deadly Phosgene gas (COCl₂).",
  },
  {
    id: 15,
    part: "B",
    question: "Which of the following substrate halides undergo S_N1 solvolysis at an exceptionally FAST rate due to resonance stabilization of their carbocation intermediates? (Select all that apply)",
    options: [
      { key: "A", text: "Allyl bromide (CH₂=CH-CH₂Br)" },
      { key: "B", text: "Benzyl chloride (C₆H₅CH₂Cl)" },
      { key: "C", text: "Chlorobenzene (C₆H₅Cl)" },
      { key: "D", text: "Vinyl chloride (CH₂=CH-Cl)" },
    ],
    correctKeys: ["A", "B"],
    type: "multi",
    explanation: "• Allyl and Benzyl carbocations are heavily stabilized by π-resonance delocalization. • Chlorobenzene and Vinyl chloride form unstable sp² cations and are inert to S_N1.",
  },
  {
    id: 16,
    part: "B",
    question: "Select the correct options regarding electrophilic substitution (S_EAr) reactions of Chlorobenzene: (Select all that apply)",
    options: [
      { key: "A", text: "Chlorine deactivates the benzene ring overall due to its strong electron-withdrawing -I effect." },
      { key: "B", text: "Incoming electrophiles (NO₂⁺, Cl⁺) are directed to the Ortho and Para positions due to +M resonance stabilization." },
      { key: "C", text: "The Para-isomer is generally the major product due to minimal steric hindrance." },
      { key: "D", text: "Chlorobenzene reacts much faster with nitrating mixture than unsubstituted Benzene." },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: Chlorine is deactivating (-I) but ortho/para directing (+M). • D is false: Chlorobenzene reacts slower than benzene.",
  },
  {
    id: 17,
    part: "B",
    question: "Which of the following reaction conditions convert Chlorobenzene into Phenol? (Select all that apply)",
    options: [
      { key: "A", text: "Heating with aqueous NaOH at 623 K and 300 atm pressure (Dow Process)" },
      { key: "B", text: "Introducing a -NO₂ group at position 4 (2,4-dinitrochlorobenzene) and heating with aqueous Na₂CO₃ at 368 K" },
      { key: "C", text: "Introducing three -NO₂ groups (2,4,6-trinitrochlorobenzene / Picryl chloride) and warming with water alone" },
      { key: "D", text: "Treating with cold dilute HCl at 0°C" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• Unactivated chlorobenzene requires 623 K/300 atm. • 2 o,p-nitro groups lower temp to 368 K. • Picryl chloride hydrolyzes to Picric Acid in warm water alone.",
  },
  {
    id: 18,
    part: "B",
    question: "Select the correct statements regarding the stereochemistry of S_N1 reactions: (Select all that apply)",
    options: [
      { key: "A", text: "Solvolysis of an optically active 3° alkyl halide yields a Racemic Mixture." },
      { key: "B", text: "The carbocation intermediate is planar (sp²-hybridized) with an unhybridized vacant p-orbital." },
      { key: "C", text: "The incoming nucleophile can attack the planar carbocation with equal probability from either the frontside or backside." },
      { key: "D", text: "Ion-pair formation between carbocation and departing leaving group often results in slight excess of Inversion over Retention." },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four statements accurately describe S_N1 stereochemical and ion-pair mechanics.",
  },
  {
    id: 19,
    part: "B",
    question: "Which of the following compounds represent CHIRAL molecules capable of rotating plane-polarized light (Optical Activity)? (Select all that apply)",
    options: [
      { key: "A", text: "2-Chlorobutane" },
      { key: "B", text: "Lactic Acid (CH₃-CH(OH)-COOH)" },
      { key: "C", text: "1-Chlorobutane" },
      { key: "D", text: "2-Chloropropane" },
    ],
    correctKeys: ["A", "B"],
    type: "multi",
    explanation: "• 2-Chlorobutane and Lactic acid contain an asymmetric sp³ carbon bonded to 4 different groups (chiral). • 1-Chlorobutane and 2-Chloropropane are achiral.",
  },
  {
    id: 20,
    part: "B",
    question: "Select the correct options regarding the elimination reactions of alkyl halides: (Select all that apply)",
    options: [
      { key: "A", text: "Dehydrohalogenation of alkyl halides using alcoholic KOH follows an E2 mechanism." },
      { key: "B", text: "Saytzeff's rule states that the major product is the more substituted, highly alkylated alkene." },
      { key: "C", text: "Using a bulky base like Potassium tert-butoxide (t-BuOK) shifts regioselectivity toward the less substituted Hofmann alkene product." },
      { key: "D", text: "Dehydrohalogenation requires an anti-periplanar spatial arrangement between the α-X and β-H atoms." },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four statements correctly state E2 mechanism, Saytzeff vs Hofmann regioselectivity, and anti-periplanar stereoelectronics.",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
type Tab = "cx-bond-unreactivity" | "sn1-vs-sn2" | "stereochemistry-calculator" | "snar-benzyne" | "sear-anomaly" | "polyhalogen-iodoform" | "freons-ddt" | "traps" | "glossary" | "selftest";

export const HaloalkanesAndHaloarenesDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("cx-bond-unreactivity");
  const [activeTrapId, setActiveTrapId] = useState<string | null>(null);

  // Live Optical Purity / % S_N1 vs % S_N2 Calculator State
  const [obsRotation, setObsRotation] = useState<number>(-3.6);
  const [pureRotation, setPureRotation] = useState<number>(-18.0);

  const computeSolvolysis = () => {
    if (pureRotation === 0) return { ee: 0, sn2Percent: 0, sn1Percent: 100 };
    const ee = Math.min(100, Math.max(0, Math.abs((obsRotation / pureRotation) * 100)));
    const sn2Percent = ee;
    const sn1Percent = 100 - ee;
    return { ee: ee.toFixed(1), sn2Percent: sn2Percent.toFixed(1), sn1Percent: sn1Percent.toFixed(1) };
  };

  const solvolysisResult = computeSolvolysis();

  // Interactive Iodoform Test State
  const [selectedIodoformSample, setSelectedIodoformSample] = useState<string>("acetone");
  const iodoformSamples: Record<string, { name: string; formula: string; result: "positive" | "negative"; explanation: string }> = {
    ethanol: { name: "Ethanol", formula: "CH₃CH₂OH", result: "positive", explanation: "Contains secondary methyl carbinol precursor CH₃CH(OH)-H. Oxidizes in-situ to acetaldehyde ──► Yellow CHI₃ ppt!" },
    acetaldehyde: { name: "Acetaldehyde", formula: "CH₃CHO", result: "positive", explanation: "Contains CH₃CO-H (only aldehyde giving positive test) ──► Yellow CHI₃ ppt!" },
    acetone: { name: "Acetone", formula: "CH₃COCH₃", result: "positive", explanation: "Contains CH₃COCH₃ methyl ketone group ──► Yellow CHI₃ ppt!" },
    propan2ol: { name: "Propan-2-ol", formula: "CH₃CH(OH)CH₃", result: "positive", explanation: "Contains secondary methyl carbinol CH₃CH(OH)- ──► Yellow CHI₃ ppt!" },
    propan1ol: { name: "Propan-1-ol", formula: "CH₃CH₂CH₂OH", result: "negative", explanation: "Primary alcohol without CH₃CH(OH)- structure ──► NO PRECIPITATE." },
    methanol: { name: "Methanol", formula: "CH₃OH", result: "negative", explanation: "Lacks C-C bond and CH₃CO- unit ──► NO PRECIPITATE." },
    benzophenone: { name: "Benzophenone", formula: "C₆H₅COC₆H₅", result: "negative", explanation: "Lacks methyl ketone group (two phenyl rings) ──► NO PRECIPITATE." },
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
    { id: "cx-bond-unreactivity", label: "C–X Bond & Unreactivity", icon: <Atom className="w-3.5 h-3.5 shrink-0" /> },
    { id: "sn1-vs-sn2", label: "S_N1 vs S_N2 Dynamics", icon: <Layers className="w-3.5 h-3.5 shrink-0" /> },
    { id: "stereochemistry-calculator", label: "Stereo & % S_N1/S_N2", icon: <Activity className="w-3.5 h-3.5 shrink-0" /> },
    { id: "snar-benzyne", label: "S_NAr & Benzyne", icon: <Split className="w-3.5 h-3.5 shrink-0" /> },
    { id: "sear-anomaly", label: "S_EAr & Halogen Anomaly", icon: <Grid className="w-3.5 h-3.5 shrink-0" /> },
    { id: "polyhalogen-iodoform", label: "Polyhalogen & Iodoform", icon: <FlaskConical className="w-3.5 h-3.5 shrink-0" /> },
    { id: "freons-ddt", label: "Freons, DDT & Elimination", icon: <Shield className="w-3.5 h-3.5 shrink-0" /> },
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
          CHEMISTRY INTERACTIVE MODULE — HALOALKANES AND HALOARENES (CLASS XII / UNIT XV)
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 shrink-0" />
            HALOALKANES &amp; HALOARENES: S_N1, S_N2, S_NAr, BENZYNE, S_EAr &amp; TOXICOLOGY
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            C–X Bond Hybridization · S_N1 vs S_N2 Comparison Matrix · S_NAr Meisenheimer Complex · Benzyne · Iodoform Test &amp; DDT Biomagnification
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

      {/* TAB 1: C-X BOND & UNREACTIVITY */}
      {activeTab === "cx-bond-unreactivity" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Atom className="w-4 h-4 text-amber-600 shrink-0" />
              C–X Bond Nature &amp; 4 Causes of Haloarene Unreactivity
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-black text-slate-900 uppercase">C–X Bond Comparison</span>
                <p className="text-slate-800 font-semibold">• <strong>Haloalkanes (R-X):</strong> sp³ carbon, 1.78 Å (C-Cl), no resonance ──► <strong>HIGHLY REACTIVE</strong>.</p>
                <p className="text-slate-800 font-semibold">• <strong>Haloarenes (Ar-X):</strong> sp² carbon, 1.69 Å (Ph-Cl), partial double bond ──► <strong>INERT</strong>.</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                <span className="font-black text-amber-950 uppercase">4 Synergistic Unreactivity Causes</span>
                <p className="text-amber-900 font-semibold">• 1. <strong>Resonance Effect:</strong> Lone pairs delocalize giving partial double bond.</p>
                <p className="text-amber-900 font-semibold">• 2. <strong>sp² Hybridization:</strong> 33% s-character holds e⁻ tightly (1.69 Å).</p>
                <p className="text-amber-900 font-semibold">• 3. <strong>Phenyl Cation Instability:</strong> S_N1 ionization cannot occur.</p>
                <p className="text-amber-900 font-semibold">• 4. <strong>π-Repulsion:</strong> Dense aromatic π-cloud repels nucleophiles.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: S_N1 VS S_N2 DYNAMICS */}
      {activeTab === "sn1-vs-sn2" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600 shrink-0" />
              S_N1 vs. S_N2 Mechanistic Dynamics &amp; Comparison Matrix
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1.5">
                <span className="font-black text-blue-950 uppercase">S_N1 Mechanism (Unimolecular)</span>
                <p className="text-blue-900 font-semibold">• <strong>Kinetics:</strong> Rate = k[R-X] (1st order, 2 steps).</p>
                <p className="text-blue-900 font-semibold">• <strong>Intermediate:</strong> Planar sp² Carbocation (R⁺, prone to 1,2-shifts).</p>
                <p className="text-blue-900 font-semibold">• <strong>Reactivity:</strong> 3° &gt; 2° &gt; 1° (Allyl ≈ Benzyl &gt; 3°).</p>
                <p className="text-blue-900 font-semibold">• <strong>Outcome:</strong> Racemization with partial inversion.</p>
                <p className="text-blue-900 font-semibold">• <strong>Solvent:</strong> Polar Protic (H₂O, EtOH, AcOH) solvates R⁺ and X⁻.</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                <span className="font-black text-emerald-950 uppercase">S_N2 Mechanism (Bimolecular)</span>
                <p className="text-emerald-900 font-semibold">• <strong>Kinetics:</strong> Rate = k[R-X][Nu⁻] (2nd order, 1 concerted step).</p>
                <p className="text-emerald-900 font-semibold">• <strong>Transition State:</strong> 5-coordinate Trigonal Bipyramidal.</p>
                <p className="text-emerald-900 font-semibold">• <strong>Reactivity:</strong> CH₃X &gt; 1° &gt; 2° &gt; 3° (Neopentyl is INERT!).</p>
                <p className="text-emerald-900 font-semibold">• <strong>Outcome:</strong> 100% Complete Walden Inversion.</p>
                <p className="text-emerald-900 font-semibold">• <strong>Solvent:</strong> Polar Aprotic (DMSO, DMF, Acetone) leaves Nu⁻ bare.</p>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] space-y-1 text-center font-mono font-bold text-slate-800">
              Leaving Group Ability Trend (Both Mechanisms): I⁻ &gt; Br⁻ &gt; Cl⁻ &gt;&gt; F⁻
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STEREOCHEMISTRY & CALCULATOR */}
      {activeTab === "stereochemistry-calculator" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-600 shrink-0" />
              Stereochemistry &amp; Live % S_N1 vs. % S_N2 Solvolysis Engine
            </h4>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] space-y-1">
              <span className="font-black text-slate-900 block">Specific Rotation Formula: [α]_λ^T = α / (l · c)</span>
              <p className="text-slate-700 font-semibold">• Enantiomers: Non-superimposable mirror images with ±α.</p>
              <p className="text-slate-700 font-semibold">• Racemic Mixture: 1:1 d/l mixture, optically inactive (α = 0) by external compensation.</p>
            </div>

            {/* Interactive Calculator */}
            <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 space-y-2 text-[10px]">
              <span className="font-black text-purple-950 uppercase tracking-wider block">Live Solvolysis Kinetic Pathway Calculator</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-bold text-slate-700 block">Observed Optical Rotation (α_obs in °):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={obsRotation}
                    onChange={(e) => setObsRotation(parseFloat(e.target.value) || 0)}
                    className="w-full p-1.5 rounded border bg-white text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-700 block">Pure Inverted Enantiomer Rotation (α_pure in °):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={pureRotation}
                    onChange={(e) => setPureRotation(parseFloat(e.target.value) || 1)}
                    className="w-full p-1.5 rounded border bg-white text-xs font-mono font-bold"
                  />
                </div>
              </div>

              {/* Result Box */}
              <div className="p-3 rounded-lg bg-white border border-purple-300 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">Enantiomeric Excess (ee):</span>
                  <span className="font-mono font-black text-purple-900">{solvolysisResult.ee}% Net Inversion</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">% S_N2 Contribution (Walden Inversion):</span>
                  <span className="font-mono font-black text-emerald-700">{solvolysisResult.sn2Percent}% S_N2</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">% S_N1 Contribution (Racemization):</span>
                  <span className="font-mono font-black text-blue-700">{solvolysisResult.sn1Percent}% S_N1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: S_NAr & BENZYNE */}
      {activeTab === "snar-benzyne" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Split className="w-4 h-4 text-amber-600 shrink-0" />
              S_NAr (Meisenheimer Complex) &amp; Benzyne Mechanisms
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                <span className="font-black text-amber-950 uppercase">S_NAr (Addition-Elimination)</span>
                <p className="text-amber-900 font-semibold">• <strong>Intermediate:</strong> Negatively charged Meisenheimer Carbanion σ-complex.</p>
                <p className="text-amber-900 font-semibold">• <strong>Activation:</strong> o,p-NO₂ groups delocalize charge into oxygens via -M effect.</p>
                <p className="text-amber-950 font-bold">• Dow Process: 623 K, 300 atm ──► o-Nitro: 443 K ──► 2,4-Dinitro: 368 K ──► Picryl Chloride: Warm H₂O (Picric Acid!).</p>
                <p className="text-amber-800">• Meta-NO₂ does not activate (negative charge never resides on meta carbon).</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-black text-slate-900 uppercase">Benzyne (Elimination-Addition)</span>
                <p className="text-slate-800 font-semibold">• <strong>Reagents:</strong> NaNH₂ in liquid NH₃ at -33°C.</p>
                <p className="text-slate-800 font-semibold">• <strong>Intermediate:</strong> Highly strained Benzyne with formal C≡C triple bond.</p>
                <p className="text-slate-800 font-semibold">• <strong>Bond Structure:</strong> Lateral overlap of two sp² hybrid orbitals in the ring plane.</p>
                <p className="text-slate-800 font-semibold">• <strong>Outcome:</strong> Cine substitution (Nu⁻ attaches to adjacent carbon).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: S_EAr & HALOGEN ANOMALY */}
      {activeTab === "sear-anomaly" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Grid className="w-4 h-4 text-indigo-600 shrink-0" />
              The Halogen Anomaly &amp; S_EAr Reactions of Chlorobenzene
            </h4>
            <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200 text-[10px] space-y-1">
              <span className="font-black text-indigo-950 block">THE HALOGEN ANOMALY: Ortho/Para Directing BUT DEACTIVATING</span>
              <p className="text-indigo-900 font-semibold">• Strong -I effect withdraws σ-electron density, deactivating the ring (reacts slower than benzene).</p>
              <p className="text-indigo-900 font-semibold">• Weak +M effect donates p-electrons, specifically stabilizing o,p arenium carbocations.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[10px]">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 font-mono font-bold text-slate-900">
                <p>• Chlorination: Ph-Cl + Cl₂/FeCl₃ ──► 1,4-Dichlorobenzene (Major, p-)</p>
                <p>• Nitration: Ph-Cl + HNO₃/H₂SO₄ ──► 1-Chloro-4-nitrobenzene (Major, p-)</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 font-mono font-bold text-slate-900">
                <p>• Sulfonation: Ph-Cl + Fuming H₂SO₄ ──► 4-Chlorobenzenesulfonic acid (Major, p-)</p>
                <p>• FC Alkylation: Ph-Cl + CH₃Cl/AlCl₃ ──► 1-Chloro-4-methylbenzene (Major, p-)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: POLYHALOGEN & IODOFORM */}
      {activeTab === "polyhalogen-iodoform" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-amber-600 shrink-0" />
              Polyhalogen Compounds &amp; Interactive Iodoform Test Simulator
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 block">CCl₄ &amp; Chloroform Safe Storage</span>
                <p className="text-slate-700 font-semibold">• <strong>CCl₄:</strong> Tetrahedral symmetry ──► μ_net = 0 (Non-polar, Pyrene).</p>
                <p className="text-slate-700 font-semibold">• <strong>Chloroform Autoxidation:</strong> 2CHCl₃ + O₂ ──(hν)──► 2COCl₂ (Phosgene) + 2HCl.</p>
                <p className="text-slate-800 font-bold">• 1% ethanol converts deadly phosgene into non-toxic Diethyl Carbonate ((C₂H₅O)₂C=O).</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                <span className="font-black text-amber-950 block">Iodoform Reaction Criteria (I₂ / NaOH)</span>
                <p className="text-amber-900 font-semibold">• Requires <strong>CH₃CO-</strong> (Methyl ketone) or <strong>CH₃CH(OH)-</strong> (Sec-methyl carbinol).</p>
                <p className="text-amber-900 font-semibold">• Forms bright yellow precipitate of CHI₃ (MP 119°C) with antiseptic odor.</p>
              </div>
            </div>

            {/* Interactive Iodoform Test Simulator */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 space-y-2 text-[10px]">
              <span className="font-black text-amber-950 uppercase tracking-wider block">Interactive Iodoform Test Substrate Tester</span>
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(iodoformSamples).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedIodoformSample(key)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                      selectedIodoformSample === key ? "bg-amber-600 text-white border-amber-600 shadow-xs" : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {iodoformSamples[key].name}
                  </button>
                ))}
              </div>
              <div className="p-3 rounded-lg bg-white border border-amber-300 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">Tested Compound: {iodoformSamples[selectedIodoformSample].name} ({iodoformSamples[selectedIodoformSample].formula})</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    iodoformSamples[selectedIodoformSample].result === "positive" ? "bg-amber-200 text-amber-950" : "bg-slate-100 text-slate-600"
                  }`}>
                    {iodoformSamples[selectedIodoformSample].result === "positive" ? "✓ POSITIVE (Yellow CHI₃ ↓)" : "✗ NEGATIVE (No Ppt)"}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-700 leading-relaxed">{iodoformSamples[selectedIodoformSample].explanation}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: FREONS, DDT & ELIMINATION */}
      {activeTab === "freons-ddt" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-teal-600 shrink-0" />
              Freons (CFCs), DDT Biomagnification, &amp; Elimination Regioselectivity
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-2.5 rounded-xl bg-teal-50/70 border border-teal-200 space-y-1">
                <span className="font-black text-teal-950 uppercase block">Freon-12 Ozone Destruction</span>
                <p className="text-teal-900 font-semibold">• CCl₂F₂ ──(UV)──► •CClF₂ + Cl•</p>
                <p className="text-teal-900 font-semibold">• Cl• + O₃ ──► ClO• + O₂; ClO• + O• ──► Cl• + O₂</p>
                <p className="text-teal-950 font-bold">• 1 Chlorine radical destroys &gt;100,000 ozone molecules in catalytic chain.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 uppercase block">DDT &amp; Biomagnification</span>
                <p className="text-slate-800 font-semibold">• Synthesis: Chloral + 2 Chlorobenzene with conc. H₂SO₄.</p>
                <p className="text-slate-800 font-semibold">• Biomagnification: Water 0.003 ppb ──► Fish-eating Birds 25 ppm.</p>
                <p className="text-slate-800 font-semibold">• Inhibits calcium-ATPase, thinning eggshells and collapsing bird populations.</p>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] space-y-1">
              <span className="font-black text-slate-900 block">Elimination Regiochemistry:</span>
              <p className="text-slate-700 font-semibold">• <strong>Saytzeff (Zaitsev) Rule:</strong> Unhindered base (alc. KOH) ──► More substituted alkene (2-butene major).</p>
              <p className="text-slate-700 font-semibold">• <strong>Hofmann Rule:</strong> Bulky base (t-BuOK) ──► Less substituted alkene (1-butene major).</p>
              <p className="text-slate-700 font-semibold">• E2 requires <strong>anti-periplanar</strong> arrangement of α-X and β-H (180° dihedral angle).</p>
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
              All 10 High-Yield NEST Haloalkanes &amp; Haloarenes Misconceptions &amp; Traps
            </h4>
            <div className="space-y-2">
              {haloTraps.map((trap) => {
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
                placeholder="Search haloalkanes & haloarenes terms..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {["All", "Mechanisms & Kinetics", "Stereochemistry & Bonds", "Polyhalogen & Reagents", "Toxicology & Biomolecules"].map((cat) => (
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

      {/* TAB 10: NEST 20-Q SELF-TEST */}
      {activeTab === "selftest" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          {score !== null ? (
            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center space-y-3">
              <Award className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-amber-500" />
              <h4 className="text-xl sm:text-2xl font-black text-slate-900">Your Score: {score} / {mcqData.length}</h4>
              <p className="text-sm font-semibold text-slate-600">
                {score >= 17 ? "Outstanding! Mastery level for NEST & IChO Haloalkanes and Haloarenes Module." : score >= 12 ? "Good performance — review incorrect explanations." : "Needs practice — revisit earlier tabs and retake."}
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
                      <span className="text-[9px] font-black uppercase tracking-wider text-amber-700">Detailed Solution &amp; Mechanistic Explanation</span>
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

export default HaloalkanesAndHaloarenesDiagram;
