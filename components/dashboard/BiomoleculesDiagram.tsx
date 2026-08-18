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

const biomoleculeTraps: Misconception[] = [
  {
    id: "t1",
    trap: "Sucrose is a reducing sugar because it is composed of glucose and fructose.",
    reality: "Sucrose is a NON-REDUCING sugar. The glycosidic bond locks C-1 of glucose and C-2 of fructose, eliminating free anomeric -OH groups.",
    tip: "Maltose and Lactose are reducing disaccharides; Sucrose is non-reducing.",
  },
  {
    id: "t2",
    trap: "Glycine forms D and L optical isomers in natural proteins.",
    reality: "Glycine (R = -H) is ACHIRAL and optically inactive. All other 19 standard amino acids are chiral and belong to the L-series.",
    tip: "Glycine is the only achiral standard amino acid.",
  },
  {
    id: "t3",
    trap: "Denaturation of a protein destroys its primary structure.",
    reality: "Denaturation destroys 2°, 3°, and 4° structures, but leaves the Primary Structure (1° covalent peptide bonds) COMPLETELY INTACT.",
    tip: "Peptide bonds require enzymatic or strong acid hydrolysis to break.",
  },
  {
    id: "t4",
    trap: "Fructose gives a negative Fehling's test because it is a ketohexose.",
    reality: "Fructose reduces Fehling's and Tollens' reagents due to alkaline enolization into glucose and mannose (Lobry de Bruyn-Ekenstein).",
    tip: "Enolization occurs via a 1,2-enediol intermediate in alkaline media.",
  },
  {
    id: "t5",
    trap: "Vitamin B₁₂ is excreted rapidly in urine like all other water-soluble vitamins.",
    reality: "Vitamin B₁₂ (Cyanocobalamin) is a water-soluble vitamin that is STORED in the liver for several years.",
    tip: "Deficiency causes pernicious anemia due to lack of intrinsic factor.",
  },
  {
    id: "t6",
    trap: "Cellulose yields a deep blue color when treated with iodine solution.",
    reality: "Cellulose does NOT form helical coils to trap iodine; it gives a NEGATIVE Iodine test. Amylose starch forms helices that give blue-black color.",
    tip: "Cellulose is an unbranched linear β-(1→4) glucan.",
  },
  {
    id: "t7",
    trap: "All amino acids in human body proteins belong to the D-configuration.",
    reality: "Naturally occurring amino acids in proteins belong strictly to the L-configuration (-NH₂ on the left in Fischer projection).",
    tip: "D-amino acids occur in bacterial cell walls and peptide antibiotics.",
  },
  {
    id: "t8",
    trap: "DNA contains 2'-hydroxyl groups on its ribose sugar rings.",
    reality: "DNA contains 2'-deoxyribose (lacks 2'-OH). RNA contains 2'-OH which makes it chemically reactive and susceptible to alkaline hydrolysis.",
    tip: "Absence of 2'-OH confers superior chemical stability on DNA.",
  },
  {
    id: "t9",
    trap: "Invert sugar is dextrorotatory like parent sucrose.",
    reality: "Invert sugar (equimolar glucose + fructose) is LEVOROTATORY (-19.85°) because fructose levorotation (-92.4°) exceeds glucose dextrorotation (+52.7°).",
    tip: "Sign of optical rotation inverts from + to - during sucrose hydrolysis.",
  },
  {
    id: "t10",
    trap: "Vitamin K deficiency causes scurvy and bleeding gums.",
    reality: "Vitamin K deficiency causes delayed blood clotting time. Vitamin C deficiency causes Scurvy and impaired collagen synthesis.",
    tip: "Vitamin K is required for hepatic synthesis of clotting factors II, VII, IX, X.",
  },
];

// ============================================================================
// 2. DATA: MASTER GLOSSARY (63 DEFINITIONS)
// ============================================================================
interface GlossaryTerm {
  term: string;
  definition: string;
  category: "Carbohydrates & Sugars" | "Proteins & Amino Acids" | "Vitamins & Hormones" | "Nucleic Acids & Bio";
}

const masterGlossary: GlossaryTerm[] = [
  { term: "Acrosome", definition: "A specialized cap-like lysosomal organelle covering the anterior sperm nucleus.", category: "Nucleic Acids & Bio" },
  { term: "Albuminous Seed", definition: "A seed retaining endosperm tissue at maturity (e.g., Castor, Maize).", category: "Nucleic Acids & Bio" },
  { term: "Aleurone Layer", definition: "Protein-rich outer layer of cereal endosperm synthesizing hydrolytic enzymes.", category: "Nucleic Acids & Bio" },
  { term: "Allolactose", definition: "The natural inducer of the Lac operon produced by β-galactosidase cleavage of lactose.", category: "Carbohydrates & Sugars" },
  { term: "Amylopectin", definition: "A branched starch homopolymer containing α-(1→4) linear and α-(1→6) branch linkages (every 24–30 units).", category: "Carbohydrates & Sugars" },
  { term: "Amylose", definition: "An unbranched linear starch homopolymer composed of α-(1→4) linked glucose units forming a helical lumen trapping iodine (blue-black).", category: "Carbohydrates & Sugars" },
  { term: "Anomers", definition: "Stereoisomers differing in configuration exclusively at the anomeric carbon atom (C-1 in aldoses; C-2 in ketoses).", category: "Carbohydrates & Sugars" },
  { term: "Anisotropy", definition: "Exhibiting direction-dependent physical or chemical properties.", category: "Nucleic Acids & Bio" },
  { term: "Antibody (H₂L₂)", definition: "A Y-shaped heterotetrameric immunoglobulin protein secreted by plasma B-cells.", category: "Proteins & Amino Acids" },
  { term: "Anticodon", definition: "A 3-nucleotide sequence on a tRNA loop complementary to an mRNA codon.", category: "Nucleic Acids & Bio" },
  { term: "Apoplastic Transport", definition: "Non-living cell wall/intercellular pathway blocked by Casparian strips.", category: "Nucleic Acids & Bio" },
  { term: "Ascorbic Acid (Vitamin C)", definition: "A water-soluble antioxidant vitamin required for collagen proline/lysine hydroxylation.", category: "Vitamins & Hormones" },
  { term: "B-DNA", definition: "Standard right-handed double-helical physiological conformation of DNA featuring 10 bp per turn (3.4 nm pitch).", category: "Nucleic Acids & Bio" },
  { term: "Berthollides", definition: "Non-stoichiometric chemical compounds exhibiting variable mass proportions.", category: "Nucleic Acids & Bio" },
  { term: "Beri-Beri", definition: "Deficiency disease caused by lack of Vitamin B₁ (Thiamine).", category: "Vitamins & Hormones" },
  { term: "Carboxypeptidase", definition: "A pancreatic zinc metallo-exopeptidase that cleaves C-terminal amino acids.", category: "Proteins & Amino Acids" },
  { term: "Cellulose", definition: "An unbranched structural plant homopolymer of β-(1→4) linked D-glucose units.", category: "Carbohydrates & Sugars" },
  { term: "Cheilosis", definition: "Fissuring and cracking at the mouth corners caused by Vitamin B₂ (Riboflavin) deficiency.", category: "Vitamins & Hormones" },
  { term: "Chitin", definition: "A structural homopolymer of β-(1→4) linked N-acetylglucosamine found in fungal cell walls and arthropod exoskeletons.", category: "Carbohydrates & Sugars" },
  { term: "Coacervates", definition: "Colloidal droplets of proteins and polysaccharides formed in pre-biotic chemical evolution.", category: "Nucleic Acids & Bio" },
  { term: "Colostrum", definition: "Antibody-rich (IgA) yellowish fluid secreted by mammary glands post-parturition.", category: "Proteins & Amino Acids" },
  { term: "Cyanocobalamin (Vitamin B₁₂)", definition: "A cobalt-containing water-soluble vitamin required for RBC maturation and myelin synthesis.", category: "Vitamins & Hormones" },
  { term: "Denaturation", definition: "Loss of native 2°, 3°, 4° protein structures leaving the primary peptide sequence intact.", category: "Proteins & Amino Acids" },
  { term: "Desmotubule", definition: "A membrane tubule derived from smooth ER running through a plasmodesmatal channel.", category: "Nucleic Acids & Bio" },
  { term: "Epimers", definition: "Stereoisomers differing in absolute configuration around a single asymmetric carbon atom (e.g., D-glucose and D-galactose at C-4).", category: "Carbohydrates & Sugars" },
  { term: "Essential Amino Acids", definition: "10 amino acids that cannot be synthesized de novo by human metabolism (PVT TIM HALL).", category: "Proteins & Amino Acids" },
  { term: "Fischer Projection", definition: "A 2D representation of 3D molecular spatial configurations on a planar grid.", category: "Carbohydrates & Sugars" },
  { term: "Floridean Starch", definition: "A storage glucan polymer in red algae structurally similar to amylopectin and glycogen.", category: "Carbohydrates & Sugars" },
  { term: "Glycerol", definition: "Propane-1,2,3-triol, a trihydric viscous alcohol forming the backbone of triglycerides.", category: "Carbohydrates & Sugars" },
  { term: "Glycogen", definition: "A highly branched animal storage polymer of α-(1→4) glucose with α-(1→6) branches every 8–12 units.", category: "Carbohydrates & Sugars" },
  { term: "Glycosidic Bond", definition: "A covalent ether linkage joining a carbohydrate to another group via an anomeric carbon.", category: "Carbohydrates & Sugars" },
  { term: "Haworth Projection", definition: "A common 3D structural representation of cyclic monosaccharide pyranose or furanose rings.", category: "Carbohydrates & Sugars" },
  { term: "Invert Sugar", definition: "An equimolar levorotatory mixture of glucose and fructose formed by sucrose hydrolysis (-19.85°).", category: "Carbohydrates & Sugars" },
  { term: "Isoelectric Point (pI)", definition: "The specific pH at which an amino acid carries a net electrical charge of zero (Zwitterion).", category: "Proteins & Amino Acids" },
  { term: "Kestose / Inulin", definition: "A linear plant storage polymer composed of β-(2→1) linked fructose units used to measure GFR.", category: "Carbohydrates & Sugars" },
  { term: "Lactase", definition: "A brush-border disaccharidase that cleaves lactose into glucose and galactose.", category: "Carbohydrates & Sugars" },
  { term: "Lactose", definition: "Milk sugar; a reducing disaccharide composed of β-D-galactose and α-D-glucose linked β-(1→4).", category: "Carbohydrates & Sugars" },
  { term: "Lobry de Bruyn-Ekenstein", definition: "Alkaline enolization converting fructose into glucose and mannose via a 1,2-enediol intermediate.", category: "Carbohydrates & Sugars" },
  { term: "Maltose", definition: "Malt sugar; a reducing disaccharide composed of two α-D-glucose units linked α-(1→4).", category: "Carbohydrates & Sugars" },
  { term: "Mutarotation", definition: "The spontaneous change in specific optical rotation of an anomer in solution until equilibrium is reached (+52.7°).", category: "Carbohydrates & Sugars" },
  { term: "Myoglobin", definition: "An iron- and oxygen-binding monomeric hemeprotein present in red muscle fibers.", category: "Proteins & Amino Acids" },
  { term: "Niacin (Vitamin B₃)", definition: "Precursor for NAD⁺/NADP⁺; deficiency causes Pellagra (Dermatitis, Diarrhea, Dementia).", category: "Vitamins & Hormones" },
  { term: "Nucleoside", definition: "A compound consisting of a nitrogenous purine or pyrimidine base linked to a pentose sugar via a β-N-glycosidic bond.", category: "Nucleic Acids & Bio" },
  { term: "Nucleotide", definition: "A phosphorylated nucleoside serving as the monomeric subunit of nucleic acids (joined by 3',5'-phosphodiester bonds).", category: "Nucleic Acids & Bio" },
  { term: "Nyctalopia", definition: "Night blindness caused by Vitamin A (Retinol) deficiency.", category: "Vitamins & Hormones" },
  { term: "Pellagra", definition: "Deficiency disease caused by lack of Vitamin B₃ (Niacin) characterized by Dermatitis, Diarrhea, and Dementia.", category: "Vitamins & Hormones" },
  { term: "Peptide Bond", definition: "A planar amide linkage (-CO-NH-) with 40% double-bond character connecting amino acids.", category: "Proteins & Amino Acids" },
  { term: "Pernicious Anemia", definition: "Megaloblastic anemia caused by Vitamin B₁₂ malabsorption due to loss of Intrinsic Factor.", category: "Vitamins & Hormones" },
  { term: "Phosphodiester Bond", definition: "A 3',5'-covalent bridge connecting adjacent nucleotides in nucleic acids.", category: "Nucleic Acids & Bio" },
  { term: "Primary Structure (1°)", definition: "The linear sequence of amino acids linked by covalent peptide bonds in a protein.", category: "Proteins & Amino Acids" },
  { term: "Pyranose", definition: "A 6-membered cyclic hemiacetal ring structure of a monosaccharide.", category: "Carbohydrates & Sugars" },
  { term: "Quaternary Structure (4°)", definition: "The 3D spatial arrangement of multiple polypeptide subunits in an oligomeric protein (e.g. Hemoglobin α₂β₂).", category: "Proteins & Amino Acids" },
  { term: "Reducing Sugar", definition: "A carbohydrate possessing a free, unlinked anomeric carbon capable of reducing Fehling's or Tollens' reagents.", category: "Carbohydrates & Sugars" },
  { term: "Rickets", definition: "Bone-softening disease in children caused by Vitamin D deficiency.", category: "Vitamins & Hormones" },
  { term: "Saccharic Acid", definition: "Glucaric acid; dicarboxylic acid formed by oxidizing C-1 and C-6 of glucose with conc. HNO₃.", category: "Carbohydrates & Sugars" },
  { term: "Scurvy", definition: "Disease caused by Vitamin C deficiency characterized by bleeding gums and impaired collagen synthesis.", category: "Vitamins & Hormones" },
  { term: "Secondary Structure (2°)", definition: "Local polypeptide folding patterns (α-helices, β-sheets) stabilized strictly by backbone H-bonds.", category: "Proteins & Amino Acids" },
  { term: "Sucrose", definition: "Non-reducing cane sugar composed of α-D-glucose and β-D-fructose linked α,β-(1→2).", category: "Carbohydrates & Sugars" },
  { term: "Tertiary Structure (3°)", definition: "The functional 3D globular conformation of a single polypeptide chain stabilized by -S-S-, salt bridges, and hydrophobic forces.", category: "Proteins & Amino Acids" },
  { term: "Thiamine (Vitamin B₁)", definition: "Precursor for TPP coenzyme; deficiency causes Beri-Beri.", category: "Vitamins & Hormones" },
  { term: "Xerophthalmia", definition: "Dryness and corneal hardening caused by severe Vitamin A deficiency.", category: "Vitamins & Hormones" },
  { term: "Zwitterion", definition: "A dipolar amino acid ion carrying equal positive and negative charges with a net electrical charge of zero.", category: "Proteins & Amino Acids" },
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
    question: "An unknown hexose sugar X undergoes reaction with excess Acetic Anhydride to form a Pentaacetate derivative. Oxidation of X with Bromine Water (Br₂/H₂O) yields a monocarboxylic acid Y (C₆H₁₂O₇). Oxidation of X with concentrated Nitric Acid (HNO₃) yields a dicarboxylic acid Z (C₆H₁₀O₈). What are the structural identities of X, Y, and Z, respectively?",
    options: [
      { key: "A", text: "X = D-Fructose; Y = Gluconic acid; Z = Saccharic acid" },
      { key: "B", text: "X = D-Glucose; Y = Gluconic acid; Z = Saccharic acid" },
      { key: "C", text: "X = D-Glucose; Y = Saccharic acid; Z = Gluconic acid" },
      { key: "D", text: "X = D-Galactose; Y = Galacturonic acid; Z = Saccharic acid" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "1. Forming a pentaacetate confirms 5 -OH groups. 2. Mild oxidation with Br₂/H₂O converts the C-1 aldehyde into a monocarboxylic acid ⟹ Y = Gluconic Acid (confirms X is an aldohexose, D-Glucose). 3. Strong oxidation with conc. HNO₃ oxidizes BOTH the C-1 aldehyde AND the C-6 1° alcohol (-CH₂OH) into a dicarboxylic acid ⟹ Z = Saccharic Acid / Glucaric Acid.",
  },
  {
    id: 2,
    part: "A",
    question: "At 25°C, the specific optical rotation of pure α-D-glucopyranose is [α]_D = +112.2°, and pure β-D-glucopyranose is [α]_D = +18.7°. When either pure anomer is dissolved in water, mutarotation occurs until the solution reaches an equilibrium specific rotation of [α]_D = +52.7°. What is the percentage abundance of the β-anomer at equilibrium?",
    options: [
      { key: "A", text: "36.4%" },
      { key: "B", text: "63.6%" },
      { key: "C", text: "50.0%" },
      { key: "D", text: "81.3%" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "1. Let x be the fraction of α-anomer and (1-x) be the fraction of β-anomer at equilibrium. 2. Weighted average equation: +112.2 x + 18.7 (1 - x) = +52.7 ⟹ 93.5 x = 34.0 ⟹ x = 34.0 / 93.5 = 0.3636 (36.4% α-anomer). 3. Percentage of β-anomer = 100% - 36.4% = 63.6%.",
  },
  {
    id: 3,
    part: "A",
    question: "Why is Sucrose classified as a NON-REDUCING sugar, whereas Maltose and Lactose are classified as REDUCING sugars?",
    options: [
      { key: "A", text: "Sucrose contains no fructose subunits." },
      { key: "B", text: "In Sucrose, the glycosidic bond links C-1 (α) of Glucose directly to C-2 (β) of Fructose, locking both anomeric carbon atoms. In Maltose and Lactose, one anomeric carbon remains free." },
      { key: "C", text: "Sucrose contains an unbranched β-(1 → 4) linkage that resists enzymatic cleavage." },
      { key: "D", text: "Sucrose undergoes mutarotation rapidly in neutral water." },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "A sugar is reducing if it possesses a free, unlinked anomeric carbon capable of opening into an active aldehyde/ketone group. In Sucrose, the glycosidic bond connects the C-1 anomeric carbon of α-D-Glucose and the C-2 anomeric carbon of β-D-Fructose (α,β-(1→2) linkage), locking both anomeric positions. Maltose and Lactose retain a free hemiacetal anomeric carbon at C-1 on their second sugar unit, making them reducing.",
  },
  {
    id: 4,
    part: "A",
    question: "The diprotic amino acid Aspartic Acid (HOOC-CH₂-CH(NH₃⁺)-COOH) possesses the following acid dissociation constants: pK_a1 (α-COOH) = 1.88, pK_a2 (β-COOH side chain) = 3.65, and pK_a3 (α-NH₃⁺) = 9.60. What is the Isoelectric Point (pI) of Aspartic Acid?",
    options: [
      { key: "A", text: "pI = 2.77" },
      { key: "B", text: "pI = 6.625" },
      { key: "C", text: "pI = 5.74" },
      { key: "D", text: "pI = 5.04" },
    ],
    correctKeys: ["A"],
    type: "single",
    explanation: "1. Aspartic acid is an acidic amino acid containing two carboxyl groups and one amino group. 2. For acidic amino acids, the zwitterion with net charge = 0 forms between the two acidic pKa transitions (pK_a1 and pK_a2). 3. Isoelectric point formula: pI = (pK_a1 + pK_a2) / 2 = (1.88 + 3.65) / 2 = 5.53 / 2 = 2.765 ≈ 2.77.",
  },
  {
    id: 5,
    part: "A",
    question: "When a globular protein is subjected to thermal denaturation by heating at 95°C, it loses its native biological activity. What specific structural level of the protein remains COMPLETELY INTACT following denaturation?",
    options: [
      { key: "A", text: "Quaternary Structure (4°)" },
      { key: "B", text: "Tertiary Structure (3°)" },
      { key: "C", text: "Secondary Structure (2°)" },
      { key: "D", text: "Primary Structure (1°)" },
    ],
    correctKeys: ["D"],
    type: "single",
    explanation: "Thermal denaturation disrupts weak non-covalent interactions (hydrogen bonds, salt bridges, hydrophobic interactions, disulfide tertiary bonds), destroying 2°, 3°, and 4° spatial configurations. However, the covalent amide peptide bonds linking amino acids in the Primary Structure (1°) remain completely intact.",
  },
  {
    id: 6,
    part: "A",
    question: "A patient presents with severe bleeding gums, petechial subcutaneous hemorrhages, delayed wound healing, and joint pain. Clinical history reveals a prolonged diet completely lacking fresh fruits and vegetables. What specific enzyme activity is impaired due to deficiency of the required vitamin co-factor?",
    options: [
      { key: "A", text: "Alcohol Dehydrogenase" },
      { key: "B", text: "Prolyl and Lysyl Hydroxylases in Collagen Synthesis (Vitamin C deficiency)" },
      { key: "C", text: "Pyruvate Decarboxylase" },
      { key: "D", text: "HMG-CoA Reductase" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "The symptoms describe Scurvy, caused by Vitamin C (Ascorbic Acid) deficiency. Ascorbic acid is the essential reducing co-factor for Prolyl Hydroxylase and Lysyl Hydroxylase enzymes. Impaired proline/lysine hydroxylation prevents triple-helical Collagen stabilization, causing blood vessel capillary fragility, bleeding gums, and poor wound healing.",
  },
  {
    id: 7,
    part: "A",
    question: "Which vitamin acts as the metabolic precursor for the coenzymes Flavin Mononucleotide (FMN) and Flavin Adenine Dinucleotide (FAD), and what characteristic symptom is produced by its deficiency?",
    options: [
      { key: "A", text: "Vitamin B₁ (Thiamine); Beri-Beri" },
      { key: "B", text: "Vitamin B₂ (Riboflavin); Cheilosis (cracking at mouth corners)" },
      { key: "C", text: "Vitamin B₃ (Niacin); Pellagra" },
      { key: "D", text: "Vitamin B₆ (Pyridoxine); Convulsions" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Vitamin B₂ (Riboflavin) is the biochemical precursor for the redox coenzymes FMN and FAD. Its deficiency causes Cheilosis (painful red cracking and fissuring at the angles of the mouth and lips), glossitis, and magenta tongue.",
  },
  {
    id: 8,
    part: "A",
    question: "What type of glycosidic linkage connects the α-D-glucose units in the linear unbranched chains of Amylose and Amylopectin, and what linkage forms the branch points in Amylopectin?",
    options: [
      { key: "A", text: "Linear: β-(1 → 4); Branches: β-(1 → 6)" },
      { key: "B", text: "Linear: α-(1 → 4); Branches: α-(1 → 6)" },
      { key: "C", text: "Linear: α-(1 → 2); Branches: β-(1 → 4)" },
      { key: "D", text: "Linear: β-(1 → 3); Branches: α-(1 → 4)" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "Starch components contain α-D-glucose monomers. Linear unbranched chains in both Amylose and Amylopectin are linked by α-(1 → 4) glycosidic bonds. The branch points in Amylopectin occur via α-(1 → 6) glycosidic linkages every 24–30 glucose units.",
  },
  {
    id: 9,
    part: "A",
    question: "Which pyrimidine nitrogenous base is present EXCLUSIVELY in RNA and replaces Thymine (5-methyluracil) found in DNA?",
    options: [
      { key: "A", text: "Adenine" },
      { key: "B", text: "Guanine" },
      { key: "C", text: "Cytosine" },
      { key: "D", text: "Uracil" },
    ],
    correctKeys: ["D"],
    type: "single",
    explanation: "Uracil (2,4-dioxy pyrimidine) is present exclusively in RNA. In DNA, Uracil is replaced by Thymine (5-methyluracil), which provides higher chemical stability against spontaneous cytosine deamination.",
  },
  {
    id: 10,
    part: "A",
    question: "In an aqueous solution at pH 7.0, an amino acid with pI = 9.60 (such as Lysine) is placed in an electrophoresis apparatus between an Anode (+) and a Cathode (-). Toward which electrode will the amino acid migrate?",
    options: [
      { key: "A", text: "Toward the Anode (+)" },
      { key: "B", text: "Toward the Cathode (-)" },
      { key: "C", text: "It will remain stationary at the origin" },
      { key: "D", text: "It will precipitate out as an insoluble gas" },
    ],
    correctKeys: ["B"],
    type: "single",
    explanation: "1. Since the solution pH (7.0) < pI (9.60), the environment is more acidic than the isoelectric point. 2. The amino acid accepts protons, existing predominantly as a positively charged Cation (H₃N⁺-CH(R)-COOH). 3. Positively charged cations migrate toward the negatively charged Cathode (-).",
  },
  {
    id: 11,
    part: "B",
    question: "Which of the following carbohydrates are classified as REDUCING SUGARS capable of reducing Tollens' and Fehling's reagents? (Select all that apply)",
    options: [
      { key: "A", text: "D-Glucose" },
      { key: "B", text: "D-Fructose" },
      { key: "C", text: "Maltose" },
      { key: "D", text: "Sucrose" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: Glucose (1° aldehyde), Fructose (enolizes in alkali to glucose/mannose), and Maltose (free C-1 hemiacetal -OH) are reducing sugars. • D is incorrect: Sucrose is a Non-Reducing sugar because both C-1 (Glc) and C-2 (Fru) anomeric carbons are locked in the glycosidic bond.",
  },
  {
    id: 12,
    part: "B",
    question: "Select the valid scientific facts regarding D-Glucose chemical reactions: (Select all that apply)",
    options: [
      { key: "A", text: "Reaction with HI upon heating produces n-hexane, proving a straight 6-carbon chain." },
      { key: "B", text: "Oxidation with Bromine water (Br₂/H₂O) produces Gluconic acid, confirming the presence of an aldehyde (-CHO) group." },
      { key: "C", text: "Oxidation with concentrated HNO₃ produces Saccharic acid, confirming a primary alcohol (-CH₂OH) at C-6." },
      { key: "D", text: "Reaction with acetic anhydride produces a pentaacetate, proving the presence of 5 hydroxyl groups on different carbons." },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four statements accurately state the classic structural elucidation reactions of D-glucose.",
  },
  {
    id: 13,
    part: "B",
    question: "Which of the following vitamins belong strictly to the FAT-SOLUBLE class? (Select all that apply)",
    options: [
      { key: "A", text: "Vitamin A (Retinol)" },
      { key: "B", text: "Vitamin D (Calciferol)" },
      { key: "C", text: "Vitamin E (α-Tocopherol)" },
      { key: "D", text: "Vitamin C (Ascorbic Acid)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: Vitamins A, D, E, and K are fat-soluble vitamins stored in liver and adipose tissue. • D is incorrect: Vitamin C (Ascorbic acid) is a water-soluble vitamin excreted in urine.",
  },
  {
    id: 14,
    part: "B",
    question: "Select the correct options regarding Amino Acid structural classification and properties: (Select all that apply)",
    options: [
      { key: "A", text: "Glycine is the only standard α-amino acid that lacks an asymmetric carbon and is optically inactive (achiral)." },
      { key: "B", text: "Naturally occurring amino acids in human proteins belong exclusively to the L-configuration." },
      { key: "C", text: "Valine, Leucine, and Isoleucine are essential branched-chain amino acids." },
      { key: "D", text: "At its Isoelectric Point (pI), an amino acid carries a net positive charge of +2." },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: Glycine is achiral, natural proteins contain L-amino acids, and Valine/Leucine/Isoleucine are essential branched-chain amino acids. • D is incorrect: At its Isoelectric Point (pI), an amino acid exists as a Zwitterion with a NET CHARGE OF ZERO.",
  },
  {
    id: 15,
    part: "B",
    question: "Which of the following forces/bonds stabilize the TERTIARY Structure (3°) of globular proteins? (Select all that apply)",
    options: [
      { key: "A", text: "Covalent Disulfide linkages (-S-S-) between Cysteine residues" },
      { key: "B", text: "Electrostatic Ionic Salt Bridges between -COO⁻ and -NH₃⁺ side chains" },
      { key: "C", text: "Hydrophobic interactions sequestering non-polar side chains internally" },
      { key: "D", text: "Hydrogen bonds between backbone and side-chain groups" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four interactions (disulfide bonds, salt bridges, hydrophobic forces, and hydrogen bonds) stabilize the 3D tertiary globular protein conformation.",
  },
  {
    id: 16,
    part: "B",
    question: "Select the correct statements regarding Invert Sugar: (Select all that apply)",
    options: [
      { key: "A", text: "It is produced by the acid or enzymatic (invertase) hydrolysis of sucrose." },
      { key: "B", text: "Parent sucrose is dextrorotatory (+66.5°), whereas the resulting equimolar mixture is levorotatory (-19.85°)." },
      { key: "C", text: "The sign of optical rotation changes from + to - due to the high levorotation of D-fructose (-92.4°)." },
      { key: "D", text: "Invert sugar is non-reducing and fails to reduce Fehling's solution." },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: Invert sugar is formed by sucrose hydrolysis, inverts optical rotation from +66.5° to -19.85° because D-fructose (-92.4°) overrides D-glucose (+52.7°). • D is incorrect: Invert sugar contains free glucose and free fructose, making it a powerful REDUCING sugar mixture.",
  },
  {
    id: 17,
    part: "B",
    question: "Which of the following Vitamin Deficiency Pathologies are correctly matched? (Select all that apply)",
    options: [
      { key: "A", text: "Vitamin B₁ (Thiamine) ──► Beri-Beri" },
      { key: "B", text: "Vitamin B₃ (Niacin) ──► Pellagra (Dermatitis, Diarrhea, Dementia)" },
      { key: "C", text: "Vitamin B₁₂ (Cyanocobalamin) ──► Pernicious Anemia" },
      { key: "D", text: "Vitamin K ──► Rickets and Osteomalacia" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: Thiamine ──► Beri-Beri; Niacin ──► Pellagra; B₁₂ ──► Pernicious anemia. • D is incorrect: Vitamin K deficiency causes delayed blood clotting time. Vitamin D deficiency causes Rickets and Osteomalacia.",
  },
  {
    id: 18,
    part: "B",
    question: "Select the correct options regarding the structural features of Cellulose: (Select all that apply)",
    options: [
      { key: "A", text: "It is an unbranched linear homopolymer of β-D-glucose monomers." },
      { key: "B", text: "Monomers are linked exclusively by β-(1 → 4) glycosidic bonds." },
      { key: "C", text: "Parallel linear chains form extensive inter-chain hydrogen bonds, creating rigid microfibrils." },
      { key: "D", text: "Human amylase enzymes readily hydrolyze cellulose into glucose in the stomach." },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: Cellulose is an unbranched β-(1→4) linear glucan stabilized by inter-chain H-bonds. • D is incorrect: Humans LACK cellulase enzymes capable of cleaving β-(1→4) bonds, making cellulose indigestible dietary fiber.",
  },
  {
    id: 19,
    part: "B",
    question: "Which of the following nitrogenous bases belong to the PYRIMIDINE class? (Select all that apply)",
    options: [
      { key: "A", text: "Cytosine (C)" },
      { key: "B", text: "Thymine (T)" },
      { key: "C", text: "Uracil (U)" },
      { key: "D", text: "Adenine (A)" },
    ],
    correctKeys: ["A", "B", "C"],
    type: "multi",
    explanation: "• A, B, C are correct: Cytosine, Thymine, and Uracil are single-ring 6-membered Pyrimidines. • D is incorrect: Adenine (and Guanine) are double-ring 9-membered Purines.",
  },
  {
    id: 20,
    part: "B",
    question: "Select the correct statements regarding Peptide Bond geometry: (Select all that apply)",
    options: [
      { key: "A", text: "The -CO-NH- peptide bond has ≈ 40% partial double-bond character due to resonance." },
      { key: "B", text: "Rotation around the C-N peptide bond is restricted at room temperature." },
      { key: "C", text: "The six backbone atoms of the peptide unit lie in a flat, coplanar trans-configuration." },
      { key: "D", text: "Peptide bonds are synthesized by dehydration condensation between amino acids." },
    ],
    correctKeys: ["A", "B", "C", "D"],
    type: "multi",
    explanation: "All four options represent accurate quantum, structural, and chemical facts regarding peptide bond planarity and synthesis.",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
type Tab = "carbohydrates-dl" | "glucose-reactions-anomers" | "disaccharides-invert-sugar" | "polysaccharides" | "amino-acids-pI" | "protein-hierarchy-denaturation" | "vitamins-hormones" | "nucleic-acids" | "traps" | "glossary" | "selftest";

export const BiomoleculesDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("carbohydrates-dl");
  const [activeTrapId, setActiveTrapId] = useState<string | null>(null);

  // Interactive Mutarotation Simulator State
  const [alphaPct, setAlphaPct] = useState<number>(36.4);
  const betaPct = Math.max(0, Math.min(100, 100 - alphaPct));
  const calculatedRotation = ((alphaPct * 112.2 + betaPct * 18.7) / 100).toFixed(1);

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
    { id: "carbohydrates-dl", label: "Carbohydrates & D/L", icon: <Atom className="w-3.5 h-3.5 shrink-0" /> },
    { id: "glucose-reactions-anomers", label: "Glucose & Mutarotation", icon: <FlaskConical className="w-3.5 h-3.5 shrink-0" /> },
    { id: "disaccharides-invert-sugar", label: "Disaccharides & Invert", icon: <Split className="w-3.5 h-3.5 shrink-0" /> },
    { id: "polysaccharides", label: "Polysaccharides", icon: <Layers className="w-3.5 h-3.5 shrink-0" /> },
    { id: "amino-acids-pI", label: "Amino Acids & pI", icon: <Scale className="w-3.5 h-3.5 shrink-0" /> },
    { id: "protein-hierarchy-denaturation", label: "Proteins & Denaturation", icon: <Shield className="w-3.5 h-3.5 shrink-0" /> },
    { id: "vitamins-hormones", label: "Vitamins & Hormones", icon: <Pipette className="w-3.5 h-3.5 shrink-0" /> },
    { id: "nucleic-acids", label: "Nucleic Acids (DNA/RNA)", icon: <Dna className="w-3.5 h-3.5 shrink-0" /> },
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
          CHEMISTRY INTERACTIVE MODULE — BIOMOLECULES (CLASS XII / UNIT XIX)
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <Dna className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 shrink-0" />
            BIOMOLECULES: CARBOHYDRATES, MUTAROTATION, INVERT SUGAR, pI, PROTEINS, VITAMINS &amp; DNA/RNA
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            Glucose Anomers (+52.7°) · Invert Sugar (-19.85°) · Amylose vs Cellulose · Amino Acid Zwitterions &amp; pI · Master Vitamin Pathology Matrix
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

      {/* TAB 1: CARBOHYDRATES & D/L CONFIGURATIONS */}
      {activeTab === "carbohydrates-dl" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Atom className="w-4 h-4 text-amber-600 shrink-0" />
              Carbohydrate Classification &amp; Fischer D/L Stereochemical Conventions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-black text-slate-900 uppercase">Degree of Polymerization</span>
                <p className="text-slate-800 font-semibold">• <strong>Monosaccharides:</strong> Cannot be hydrolyzed further (Aldoses: Glucose; Ketoses: Fructose).</p>
                <p className="text-slate-800 font-semibold">• <strong>Oligosaccharides:</strong> Yield 2–10 monosaccharides (Sucrose, Maltose, Lactose).</p>
                <p className="text-slate-800 font-semibold">• <strong>Polysaccharides:</strong> Yield &gt;10 units (Starch, Cellulose, Glycogen).</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                <span className="font-black text-amber-950 uppercase">D- and L- Conventions (C-5 Reference)</span>
                <p className="text-amber-900 font-semibold">• <strong>D-Series:</strong> -OH on the <strong>RIGHT</strong> side of highest chiral carbon (C-5 in aldohexoses).</p>
                <p className="text-amber-900 font-semibold">• <strong>L-Series:</strong> -OH on the <strong>LEFT</strong> side of highest chiral carbon.</p>
                <p className="text-amber-950 font-bold">• <strong>D/L vs (+/-):</strong> Spatial configuration has NO correlation with optical rotation! D-(+)-glucose is dextro; D-(-)-fructose is levo!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GLUCOSE REACTIONS & MUTAROTATION */}
      {activeTab === "glucose-reactions-anomers" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-emerald-600 shrink-0" />
              Glucose Diagnostic Reactions, Pyranose Anomers, &amp; Mutarotation
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 block uppercase">Structure Elucidation Reactions</span>
                <p className="text-slate-800 font-semibold">• <strong>HI + Δ:</strong> Yields <strong>n-Hexane</strong> (Proves straight 6C chain).</p>
                <p className="text-slate-800 font-semibold">• <strong>Br₂/H₂O:</strong> Yields <strong>Gluconic acid</strong> (Proves aldehyde group).</p>
                <p className="text-slate-800 font-semibold">• <strong>Conc. HNO₃:</strong> Yields <strong>Saccharic acid</strong> (Proves C-6 1° alcohol).</p>
                <p className="text-slate-800 font-semibold">• <strong>Ac₂O / Pyridine:</strong> Yields <strong>Pentaacetate</strong> (Proves 5 -OH groups).</p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="font-black text-emerald-950 block uppercase">Pyranose Anomers &amp; Fructose Enolization</span>
                <p className="text-emerald-900 font-semibold">• <strong>α-D-Glucopyranose:</strong> C-1 -OH lies <strong>BELOW</strong> plane (+112.2°).</p>
                <p className="text-emerald-900 font-semibold">• <strong>β-D-Glucopyranose:</strong> C-1 -OH lies <strong>ABOVE</strong> plane (+18.7°).</p>
                <p className="text-emerald-950 font-bold">• <strong>Fructose Enolization:</strong> Undergoes Lobry de Bruyn-Ekenstein enolization via 1,2-enediol in alkali ──► Reduces Tollens' &amp; Fehling's!</p>
              </div>
            </div>

            {/* Interactive Mutarotation Simulator */}
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 space-y-2 text-[10px]">
              <div className="flex items-center justify-between">
                <span className="font-black text-emerald-950 uppercase tracking-wide">Interactive Mutarotation Simulator</span>
                <button
                  onClick={() => setAlphaPct(36.4)}
                  className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-600 text-white border border-emerald-600 shadow-2xs"
                >
                  Reset to Equilibrium (36.4% α)
                </button>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>α-Anomer: {alphaPct.toFixed(1)}% (+112.2°)</span>
                  <span>β-Anomer: {betaPct.toFixed(1)}% (+18.7°)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.5"
                  value={alphaPct}
                  onChange={(e) => setAlphaPct(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-emerald-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-emerald-300 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Net Specific Optical Rotation [α]_D:</span>
                <span className="font-black font-mono text-emerald-900 text-sm">+{calculatedRotation}°</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DISACCHARIDES & INVERT SUGAR */}
      {activeTab === "disaccharides-invert-sugar" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Split className="w-4 h-4 text-blue-600 shrink-0" />
              Disaccharide Glycosidic Linkages, Reducing Status, &amp; Inversion of Sugar
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[10px]">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 block uppercase">1. Sucrose (Cane Sugar)</span>
                <p className="text-slate-800 font-semibold">• <strong>Linkage:</strong> α-D-Glc-(1→2)-β-D-Fru.</p>
                <p className="text-rose-900 font-bold">• <strong>Both Anomeric Locked:</strong> NON-REDUCING SUGAR (No mutarotation; fails Fehling's/Tollens').</p>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
                <span className="font-black text-blue-950 block uppercase">2. Maltose (Malt Sugar)</span>
                <p className="text-blue-900 font-semibold">• <strong>Linkage:</strong> α-D-Glc-(1→4)-α-D-Glc.</p>
                <p className="text-blue-950 font-bold">• <strong>Free C-1 Anomeric -OH:</strong> REDUCING SUGAR (Exhibits mutarotation; forms osazone).</p>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1">
                <span className="font-black text-purple-950 block uppercase">3. Lactose (Milk Sugar)</span>
                <p className="text-purple-900 font-semibold">• <strong>Linkage:</strong> β-D-Gal-(1→4)-α-D-Glc.</p>
                <p className="text-purple-950 font-bold">• <strong>Free C-1 Anomeric -OH:</strong> REDUCING SUGAR (Cleaved by intestinal lactase).</p>
              </div>
            </div>

            {/* Inversion of Cane Sugar Box */}
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 space-y-1 text-[10px]">
              <span className="font-black text-indigo-950 uppercase block">Inversion of Cane Sugar (+66.5° ──► -19.85°)</span>
              <p className="text-indigo-900 font-semibold">
                Sucrose (+66.5°) + H₂O ──[Invertase / H⁺]──► D-(+)-Glucose (+52.7°) + D-(-)-Fructose (-92.4°).
              </p>
              <p className="text-indigo-950 font-black">
                Net Optical Rotation = [+52.7° + (-92.4°)] / 2 = <strong>-19.85° (Levorotatory Invert Sugar)</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: POLYSACCHARIDES */}
      {activeTab === "polysaccharides" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600 shrink-0" />
              Polysaccharides: Amylose, Amylopectin, Cellulose, &amp; Glycogen
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
                <span className="font-black text-blue-950 block uppercase">Starch (Plant Storage)</span>
                <p className="text-blue-900 font-semibold">• <strong>Amylose (15–20%):</strong> Linear unbranched α-(1→4) helix (200–1000 units); water-soluble; traps I₂ to give <strong>deep blue-black color</strong>.</p>
                <p className="text-blue-900 font-semibold">• <strong>Amylopectin (80–85%):</strong> Linear α-(1→4) with <strong>α-(1→6) branch points</strong> every 24–30 units; water-insoluble; <strong>red-violet with iodine</strong>.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="font-black text-emerald-950 block uppercase">Cellulose &amp; Glycogen</span>
                <p className="text-emerald-900 font-semibold">• <strong>Cellulose:</strong> Linear unbranched <strong>β-(1→4) glucan</strong> (6000–10000 units); rigid inter-chain H-bonds; <strong>gives NO color with iodine</strong>; indigestible in humans.</p>
                <p className="text-emerald-900 font-semibold">• <strong>Glycogen ("Animal Starch"):</strong> Hyper-branched with α-(1→6) branches every 8–12 units; <strong>red-brown with iodine</strong>.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: AMINO ACIDS & ISOELECTRIC POINT */}
      {activeTab === "amino-acids-pI" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-600 shrink-0" />
              Amino Acid Zwitterions, Isoelectric Point (pI), &amp; Peptide Bond Planarity
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 block uppercase">Zwitterionic Dissociation &amp; pI</span>
                <p className="text-slate-800 font-semibold">• <strong>pH &lt; pI:</strong> Cation (H₃N⁺-CH(R)-COOH) ──► Migrates to Cathode (-).</p>
                <p className="text-slate-800 font-semibold">• <strong>pH = pI:</strong> Dipolar Zwitterion (Net charge = 0) ──► Stationary.</p>
                <p className="text-slate-800 font-semibold">• <strong>pH &gt; pI:</strong> Anion (H₂N-CH(R)-COO⁻) ──► Migrates to Anode (+).</p>
                <p className="text-indigo-950 font-bold">• <strong>Aspartic Acid (Acidic):</strong> pI = (1.88 + 3.65)/2 = <strong>2.77</strong>.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1">
                <span className="font-black text-indigo-950 block uppercase">Chirality &amp; Peptide Bond Planarity</span>
                <p className="text-indigo-900 font-semibold">• <strong>Glycine:</strong> ONLY achiral standard amino acid (all others are chiral L-series!).</p>
                <p className="text-indigo-900 font-semibold">• <strong>10 Essential (PVT TIM HALL):</strong> Phe, Val, Thr, Trp, Ile, Met, His, Arg, Leu, Lys.</p>
                <p className="text-indigo-950 font-bold">• <strong>Peptide Bond (-CO-NH-):</strong> 40% partial double-bond character due to resonance; rigid coplanar trans geometry.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: PROTEINS & DENATURATION */}
      {activeTab === "protein-hierarchy-denaturation" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-600 shrink-0" />
              Four Structural Levels of Proteins &amp; Denaturation Mechanisms
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1">
                <span className="font-black text-purple-950 block uppercase">Protein Structural Hierarchy</span>
                <p className="text-purple-900 font-semibold">• <strong>Primary (1°):</strong> Linear amino acid sequence held by covalent peptide bonds.</p>
                <p className="text-purple-900 font-semibold">• <strong>Secondary (2°):</strong> Local backbone folding (α-helix with 3.6 residues/turn, 0.54 nm pitch; β-pleated sheets) held by <strong>H-bonds</strong>.</p>
                <p className="text-purple-900 font-semibold">• <strong>Tertiary (3°):</strong> 3D globular folding held by -S-S- disulfide bridges, salt bridges, hydrophobic forces.</p>
                <p className="text-purple-900 font-semibold">• <strong>Quaternary (4°):</strong> Multi-subunit oligomeric assembly (e.g. Hemoglobin α₂β₂).</p>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1">
                <span className="font-black text-rose-950 block uppercase">Denaturation of Proteins</span>
                <p className="text-rose-900 font-semibold">• Induced by heat, pH extremes, heavy metal salts, or urea.</p>
                <p className="text-rose-900 font-semibold">• Unfolds 2°, 3°, and 4° native spatial structures ──► Loss of biological activity.</p>
                <p className="text-rose-950 font-bold">• <strong>CRITICAL NEST TRAP:</strong> Denaturation leaves the <strong>PRIMARY STRUCTURE (1° peptide bonds) COMPLETELY INTACT</strong>!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: VITAMINS & HORMONES */}
      {activeTab === "vitamins-hormones" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Pipette className="w-4 h-4 text-rose-600 shrink-0" />
              Master Vitamin Deficiency Pathology Matrix &amp; Hormone Classes
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 block uppercase">Vitamin Pathology Summary</span>
                <p className="text-slate-800 font-semibold">• <strong>Vit A:</strong> Xerophthalmia, Night Blindness (Nyctalopia).</p>
                <p className="text-slate-800 font-semibold">• <strong>Vit B₁:</strong> Beri-Beri; <strong>Vit B₂:</strong> Cheilosis (mouth corner cracking).</p>
                <p className="text-slate-800 font-semibold">• <strong>Vit B₃:</strong> Pellagra (Dermatitis, Diarrhea, Dementia).</p>
                <p className="text-slate-800 font-semibold">• <strong>Vit B₁₂:</strong> Pernicious Anemia (Stored in liver!).</p>
                <p className="text-slate-800 font-semibold">• <strong>Vit C:</strong> Scurvy (Collagen hydroxylation cofactor).</p>
                <p className="text-slate-800 font-semibold">• <strong>Vit D:</strong> Rickets (children), Osteomalacia (adults).</p>
                <p className="text-slate-800 font-semibold">• <strong>Vit K:</strong> Delayed Blood Clotting (Factors II, VII, IX, X).</p>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1">
                <span className="font-black text-rose-950 block uppercase">Hormones Chemical Taxonomy</span>
                <p className="text-rose-900 font-semibold">• <strong>Steroids (from Cholesterol):</strong> Cortisol, Aldosterone, Testosterone, Estrogen.</p>
                <p className="text-rose-900 font-semibold">• <strong>Peptides / Proteins:</strong> Insulin, Glucagon, Oxytocin, Vasopressin, TSH, GH.</p>
                <p className="text-rose-900 font-semibold">• <strong>Amino Acid Derivatives:</strong> Epinephrine (from Tyrosine), Melatonin (from Tryptophan).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: NUCLEIC ACIDS */}
      {activeTab === "nucleic-acids" && (
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Dna className="w-4 h-4 text-indigo-600 shrink-0" />
              Nucleic Acids: DNA vs RNA Architecture &amp; 3',5'-Phosphodiester Bridge
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1">
                <span className="font-black text-indigo-950 block uppercase">DNA (Deoxyribonucleic Acid)</span>
                <p className="text-indigo-900 font-semibold">• <strong>Sugar:</strong> 2'-Deoxy-D-ribose (lacks 2'-OH ──► Alkali stable).</p>
                <p className="text-indigo-900 font-semibold">• <strong>Pyrimidines:</strong> Cytosine (C) &amp; <strong>Thymine (T)</strong>.</p>
                <p className="text-indigo-900 font-semibold">• <strong>Structure:</strong> Double-stranded right-handed helix (B-DNA, 10 bp/turn).</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                <span className="font-black text-amber-950 block uppercase">RNA (Ribonucleic Acid)</span>
                <p className="text-amber-900 font-semibold">• <strong>Sugar:</strong> D-Ribose (contains reactive 2'-OH ──► Alkali labile).</p>
                <p className="text-amber-900 font-semibold">• <strong>Pyrimidines:</strong> Cytosine (C) &amp; <strong>Uracil (U)</strong>.</p>
                <p className="text-amber-900 font-semibold">• <strong>Structure:</strong> Single-stranded; folds into complex hairpins.</p>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] space-y-1">
              <span className="font-black text-slate-900 block uppercase">Nucleotide Polymerization</span>
              <p className="text-slate-800 font-semibold">
                Nucleosides (Base + Sugar via β-N-glycosidic bond) + 5'-Phosphate ──► Nucleotide. Linear polymerization occurs via <strong>3',5'-Phosphodiester Bridges</strong>.
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
              All 10 High-Yield NEST Biomolecules Misconceptions &amp; Traps
            </h4>
            <div className="space-y-2">
              {biomoleculeTraps.map((trap) => {
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
                placeholder="Search biomolecule terms..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {["All", "Carbohydrates & Sugars", "Proteins & Amino Acids", "Vitamins & Hormones", "Nucleic Acids & Bio"].map((cat) => (
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
                {score >= 17 ? "Outstanding! Mastery level for NEST & IChO Biomolecules Module." : score >= 12 ? "Good performance — review incorrect explanations." : "Needs practice — revisit earlier tabs and retake."}
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

export default BiomoleculesDiagram;
