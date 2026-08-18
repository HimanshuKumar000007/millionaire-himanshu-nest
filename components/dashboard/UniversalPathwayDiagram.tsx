"use client";

import React from "react";
import {
  Sun,
  Sparkles,
  Zap,
  ArrowRight,
  FlaskConical,
  Clock,
  Layers,
  Repeat,
  CheckCircle2,
  Atom,
  Binary,
} from "lucide-react";
import { renderFormattedDiagramText } from "@/lib/utils/formatDiagramText";

export interface PathwayCompartment {
  id?: string;
  name: string;
  badge?: string;
  subtext?: string;
  accentColor?: "emerald" | "amber" | "rose" | "purple" | "indigo" | "cyan" | "blue";
  reactions: string[];
  transfers?: {
    target: string;
    substance: string;
    direction?: "forward" | "backward" | "both";
  }[];
}

export interface UniversalPathwayData {
  badgeText?: string;
  title: string;
  subtitle?: string;
  equation?: string;
  type?: "multi_compartment" | "z_scheme" | "chemiosmotic" | "general_pathway" | "milestones" | "equation_tree";
  compartments?: PathwayCompartment[];
  steps?: string[];
  takeawayText?: string;
}

export interface UniversalPathwayDiagramProps {
  data?: UniversalPathwayData;
  asciiText?: string;
}

const colorStyles = {
  emerald: {
    border: "border-emerald-200 hover:border-emerald-400",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    headerBg: "bg-emerald-50/80 text-emerald-950",
    reactionBg: "bg-emerald-50/60 border-emerald-100 text-emerald-950",
    arrow: "text-emerald-500",
  },
  amber: {
    border: "border-amber-200 hover:border-amber-400",
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    headerBg: "bg-amber-50/80 text-amber-950",
    reactionBg: "bg-amber-50/60 border-amber-100 text-amber-950",
    arrow: "text-amber-500",
  },
  rose: {
    border: "border-rose-200 hover:border-rose-400",
    badge: "bg-rose-100 text-rose-800 border-rose-200",
    headerBg: "bg-rose-50/80 text-rose-950",
    reactionBg: "bg-rose-50/60 border-rose-100 text-rose-950",
    arrow: "text-rose-500",
  },
  purple: {
    border: "border-purple-200 hover:border-purple-400",
    badge: "bg-purple-100 text-purple-800 border-purple-200",
    headerBg: "bg-purple-50/80 text-purple-950",
    reactionBg: "bg-purple-50/60 border-purple-100 text-purple-950",
    arrow: "text-purple-500",
  },
  indigo: {
    border: "border-indigo-200 hover:border-indigo-400",
    badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
    headerBg: "bg-indigo-50/80 text-indigo-950",
    reactionBg: "bg-indigo-50/60 border-indigo-100 text-indigo-950",
    arrow: "text-indigo-500",
  },
  cyan: {
    border: "border-cyan-200 hover:border-cyan-400",
    badge: "bg-cyan-100 text-cyan-800 border-cyan-200",
    headerBg: "bg-cyan-50/80 text-cyan-950",
    reactionBg: "bg-cyan-50/60 border-cyan-100 text-cyan-950",
    arrow: "text-cyan-500",
  },
  blue: {
    border: "border-blue-200 hover:border-blue-400",
    badge: "bg-blue-100 text-blue-800 border-blue-200",
    headerBg: "bg-blue-50/80 text-blue-950",
    reactionBg: "bg-blue-50/60 border-blue-100 text-blue-950",
    arrow: "text-blue-500",
  },
};

const defaultColorSequence: ("emerald" | "amber" | "rose" | "purple" | "indigo" | "cyan")[] = [
  "emerald",
  "amber",
  "purple",
  "cyan",
  "rose",
  "indigo",
];

/**
 * Intelligent ASCII pathway parser for multi-organelle axes (Photorespiration),
 * Van Niel's generalized equations, milestone chronologies, and Z-scheme redox pathways.
 */
export function parseAsciiToPathway(ascii: string): UniversalPathwayData | null {
  if (!ascii) return null;

  try {
    const rawLines = ascii.split("\n");
    const lines = rawLines.map((l) => l.trimEnd());
    if (lines.length < 2) return null;

    const firstLineClean = lines[0].replace(/[│|┌┐└┘\+─\[\]▼v┴┬┼├┤=~•]/g, "").trim() || "METABOLIC PATHWAY";
    const tLower = firstLineClean.toLowerCase();
    const fullAsciiLower = ascii.toLowerCase();

    // 1. Van Niel's Generalized Equation
    if (tLower.includes("van niel") || tLower.includes("generalized equation") || fullAsciiLower.includes("van niel") || ascii.includes("2\\text{H}_2\\text{A}") || ascii.includes("2H₂A") || (ascii.includes("Green Plants:") && ascii.includes("Sulfur Bacteria:"))) {
      return {
        badgeText: "GENERALIZED PHOTOSYNTHETIC EQUATION",
        title: "VAN NIEL'S GENERALIZED EQUATION",
        subtitle: "Hydrogen donor oxidation coupled to carbon dioxide reduction",
        equation: "2H₂A + CO₂ ──[Light / Pigments]──► 2A + [CH₂O] + H₂O",
        type: "equation_tree",
        takeawayText: "Proved that molecular oxygen (O₂) evolved during oxygenic photosynthesis originates exclusively from the photolysis of H₂O, not CO₂.",
        compartments: [
          {
            name: "OXYGENIC PHOTOSYNTHESIS",
            badge: "Green Plants, Algae, Cyanobacteria",
            subtext: "H₂A = H₂O ➔ Releases O₂ as Byproduct",
            accentColor: "emerald",
            reactions: [
              "• Hydrogen Donor (H₂A): H₂O (Water)",
              "• Oxidized Byproduct (2A): O₂ (Molecular Oxygen Gas)",
              "• Reaction: 2 H₂O + CO₂ ──[Light]──► O₂ ↑ + [CH₂O] + H₂O",
              "• Confirmation: Ruben & Kamen (1941) verified with isotopic ¹⁸O-water",
            ],
          },
          {
            name: "ANOXYGENIC PHOTOSYNTHESIS",
            badge: "Purple & Green Sulfur Bacteria",
            subtext: "H₂A = H₂S ➔ Releases 2S as Byproduct (No O₂)",
            accentColor: "amber",
            reactions: [
              "• Hydrogen Donor (H₂A): H₂S (Hydrogen Sulfide)",
              "• Oxidized Byproduct (2A): 2S (Elemental Sulfur Pellets / Sulfate)",
              "• Reaction: 2 H₂S + CO₂ ──[Light]──► 2 S + [CH₂O] + H₂O",
              "• Significance: Proved that H₂O is not universally required for all autotrophs",
            ],
          },
        ],
      };
    }

    // 2. Historical Experimental Milestones
    if (tLower.includes("historical") || tLower.includes("experimental milestones") || fullAsciiLower.includes("priestley") && fullAsciiLower.includes("ingenhousz")) {
      return {
        badgeText: "HISTORICAL MILESTONES",
        title: "HISTORICAL EXPERIMENTAL MILESTONES IN PHOTOSYNTHESIS",
        subtitle: "Key Discoveries Establishing Oxygenic Photosynthesis & Carbon Assimilation",
        type: "milestones",
        takeawayText: "Historical experiments systematically decoupled the photochemical light reactions (H₂O photolysis) from the stromatic dark reactions (CO₂ fixation).",
        steps: [
          "Joseph Priestley (1770): Candle, Bell Jar, and Mint (*Mentha*) experiment; proved green plants restore oxygen to air fouled by respiration/combustion.",
          "Jan Ingenhousz (1779): Showed that sunlight and green plant tissues (*Hydrilla*) are strictly required for oxygen bubble release.",
          "Julius von Sachs (1854): Discovered that green plant parts produce glucose, stored as starch within discrete chloroplast bodies.",
          "T. W. Engelmann (1883): Split white light through a prism to illuminate *Cladophora* alga with aerobic bacteria, plotting the first Action Spectrum (peaks in blue and red).",
          "Cornelis van Niel (1931): Used purple/green sulfur bacteria (H₂S) to prove that O₂ evolves exclusively from the photolysis of H₂O.",
          "Melvin Calvin (1954): Traced the path of carbon in the C₃ dark cycle using radioactive ¹⁴CO₂ in *Chlorella*, identifying 3-PGA as the first stable product.",
        ],
      };
    }

    // 3. Absorption vs Action Spectra
    if (tLower.includes("absorption vs action") || (fullAsciiLower.includes("absorption spectrum") && fullAsciiLower.includes("action spectrum"))) {
      return {
        badgeText: "SPECTRAL BIOPHYSICS",
        title: "ABSORPTION SPECTRUM vs. ACTION SPECTRUM",
        subtitle: "Comparison of Purified Pigment Optical Absorption vs Intact Tissue Photosynthetic Efficacy",
        type: "multi_compartment",
        takeawayText: "Both spectra display overlapping peak maxima in the Blue (430–470 nm) and Red (650–680 nm) regions of Photosynthetically Active Radiation (PAR, 400–700 nm).",
        compartments: [
          {
            name: "ABSORPTION SPECTRUM",
            badge: "Physical Pigment Property",
            subtext: "Spectrophotometric Light Absorption (A) vs Wavelength (λ)",
            accentColor: "indigo",
            reactions: [
              "• Measured on purified, isolated pigments in solution.",
              "• Chlorophyll a peaks: Blue (~430 nm) and Red (~660 nm).",
              "• Chlorophyll b peaks: Blue (~450 nm) and Red-Orange (~640 nm).",
              "• Carotenoids peak in the Blue-Green (~440–490 nm) region.",
            ],
          },
          {
            name: "ACTION SPECTRUM",
            badge: "Biological Functional Response",
            subtext: "Photosynthetic Efficacy (O₂ Evolution / CO₂ Fixation) vs λ",
            accentColor: "emerald",
            reactions: [
              "• Measured across intact, living photosynthetic tissue.",
              "• First plotted by T.W. Engelmann (1883) using *Cladophora* + aerobic bacteria.",
              "• Shows highest photosynthetic rates in Blue and Red light.",
              "• Broader than Chl a absorption due to accessory pigment energy transfer (FRET).",
            ],
          },
        ],
      };
    }

    // 4. Förster Resonance Energy Transfer (FRET)
    if (tLower.includes("resonance energy transfer") || tLower.includes("fret") || fullAsciiLower.includes("fret") || (ascii.includes("Antenna Pigment") && ascii.includes("Reaction Center"))) {
      return {
        badgeText: "QUANTUM ENERGY TRANSFER",
        title: "FÖRSTER RESONANCE ENERGY TRANSFER (FRET)",
        subtitle: "Non-Radiative Dipole-Dipole Resonance Coupling Across Antenna Complexes",
        type: "z_scheme",
        takeawayText: "Antenna pigments channel excitation energy down an energetic gradient with >90% quantum efficiency to the P680/P700 reaction center dimers.",
        steps: [
          "1. Photon Absorption (ħν): Incident photon strikes peripheral antenna carotenoid or Chlorophyll b molecule.",
          "2. Resonance Excitation: Energy excites electrons without emitting fluorescence, transferring radiationlessly via FRET dipole coupling.",
          "3. Energy Funneling: Excitons migrate down energetic levels toward core antenna Chlorophyll a pigments.",
          "4. Reaction Center Trapping: Excitation arrives at specialized Chlorophyll a dimer (P680 in PS II / P700 in PS I).",
          "5. Charge Separation: P680* or P700* ejects high-energy electron to primary electron acceptor (Pheophytin / A₀), initiating electron transport.",
        ],
      };
    }

    // 5. Photorespiratory Three-Organelle Axis Detection
    if (tLower.includes("photorespiratory") || tLower.includes("three-organelle") || (ascii.includes("CHLOROPLAST") && ascii.includes("PEROXISOME") && ascii.includes("MITOCHONDRIA"))) {
      return {
        badgeText: "COOPERATIVE ORGANELLAR AXIS",
        title: "PHOTORESPIRATORY THREE-ORGANELLE AXIS (C₂ CYCLE)",
        subtitle: "Chloroplast ➔ Peroxisome ➔ Mitochondria ➔ Peroxisome ➔ Chloroplast Carbon Recovery",
        type: "multi_compartment",
        takeawayText: "Photorespiration consumes O₂ and ATP to rescue 75% of carbon from toxic 2-phosphoglycolate (25% lost as CO₂).",
        compartments: [
          {
            name: "CHLOROPLAST",
            badge: "Primary Oxygenation",
            subtext: "Site of RuBisCO Oxygenase & 3-PGA Recovery",
            accentColor: "emerald",
            reactions: [
              "RuBP (5C) + O₂ ──[RuBisCO]──► 3-PGA (3C) + 2-Phosphoglycolate (2C)",
              "2-Phosphoglycolate ──[Phosphatase]──► Glycolate (2C)",
              "◄── Glycerate (3C) phosphorylated by Glycerate Kinase (+ 1 ATP) ──► 3-PGA (3C)",
            ],
          },
          {
            name: "PEROXISOME",
            badge: "Peroxide Scavenging & Transamination",
            subtext: "Site of Glycolate Oxidase & Catalase",
            accentColor: "amber",
            reactions: [
              "Glycolate (2C) + O₂ ──[Glycolate Oxidase]──► Glyoxylate (2C) + H₂O₂",
              "2 H₂O₂ ──[Catalase]──► 2 H₂O + O₂ (Detoxification)",
              "Glyoxylate + Glutamate ──[Transaminase]──► Glycine (2C)",
              "◄── Hydroxypyruvate (3C) reduced by Glycerate Dehydrogenase ──► Glycerate (3C)",
            ],
          },
          {
            name: "MITOCHONDRIA",
            badge: "Decarboxylation & Deamination",
            subtext: "Site of Glycine Decarboxylase Multienzyme Complex",
            accentColor: "rose",
            reactions: [
              "2 Glycine (2C + 2C) + NAD⁺ + H₂O ──► Serine (3C) + CO₂ ↑ + NH₃ ↑ + NADH + H⁺",
              "Serine (3C) transported back into Peroxisome ──► Transaminated to Hydroxypyruvate",
            ],
          },
        ],
      };
    }

    // 6. Hatch-Slack C4 Two-Cell Pathway Detection
    if (tLower.includes("hatch-slack") || tLower.includes("c₄") || tLower.includes("c4") || (ascii.includes("MESOPHYLL") && ascii.includes("BUNDLE SHEATH"))) {
      return {
        badgeText: "SPATIAL CARBON CONCENTRATING MECHANISM",
        title: "HATCH-SLACK (C₄) PATHWAY FLOW",
        subtitle: "Mesophyll (Primary Fixation) ➔ Plasmodesmata ➔ Bundle Sheath (Secondary C₃ Fixation)",
        type: "multi_compartment",
        takeawayText: "C₄ plants suppress photorespiration by pumping CO₂ into bundle sheath cells to saturate RuBisCO at 10× atmospheric levels.",
        compartments: [
          {
            name: "MESOPHYLL CELL",
            badge: "Primary HCO₃⁻ Fixation",
            subtext: "Granal Chloroplasts lacking RuBisCO; Rich in PEPCase",
            accentColor: "emerald",
            reactions: [
              "CO₂ + H₂O ──[Carbonic Anhydrase]──► HCO₃⁻",
              "HCO₃⁻ + PEP (3C) ──[PEP Carboxylase]──► Oxaloacetic Acid / OAA (4C)",
              "OAA (4C) + NADPH ──[Malate Dehydrogenase]──► Malate (4C) + NADP⁺",
              "◄── Pyruvate (3C) + 2 ATP ──[PPDK]──► Phosphoenolpyruvate / PEP (3C)",
            ],
          },
          {
            name: "BUNDLE SHEATH CELL",
            badge: "C₃ Calvin Cycle & Decarboxylation",
            subtext: "Large Agranal Chloroplasts rich in RuBisCO; Thick gas-tight walls",
            accentColor: "purple",
            reactions: [
              "Malate (4C) + NADP⁺ ──[NADP-Malic Enzyme]──► Pyruvate (3C) + CO₂ + NADPH",
              "Concentrated CO₂ ──► Enters Calvin Cycle (RuBisCO) ──► Glucose (6C)",
              "Pyruvate (3C) ──[Plasmodesmata Transport]──► Shuttled back to Mesophyll Cell",
            ],
          },
        ],
      };
    }

    // 7. Z-Scheme / Non-Cyclic Electron Flow Detection
    if (tLower.includes("z-scheme") || tLower.includes("electron flow") || (ascii.includes("P680") && ascii.includes("P700"))) {
      return {
        badgeText: "PHOTOCHEMICAL ENERGY CONVERSION",
        title: "THE Z-SCHEME PHOTOCHEMICAL REDOX CASCADE",
        subtitle: "Non-Cyclic Electron Flow from H₂O Photolysis to NADP⁺ Reduction across PS II & PS I",
        type: "z_scheme",
        takeawayText: "Non-cyclic electron flow establishes a 12 H⁺ lumen proton gradient per O₂ evolved, yielding 3 ATP and 2 NADPH.",
        steps: [
          "1. Water Photolysis at OEC: 2 H₂O ──► 4 H⁺ (Lumen) + 4 e⁻ + O₂ ↑",
          "2. Excitation at PS II: P680 + Photon (680 nm) ──► P680* (Strong Reductant)",
          "3. Primary Acceptor Transfer: P680* ──► Pheophytin ──► Plastoquinone (PQ_A ➔ PQ_B)",
          "4. Q-Cycle & Proton Translocation: PQH₂ ──► Cytochrome b₆f (Pumps 8 H⁺ into Lumen) ──► Plastocyanin (PC)",
          "5. Excitation at PS I: PC reduces P700⁺ ──► P700 + Photon (700 nm) ──► P700*",
          "6. Terminal Reduction: P700* ──► A₀ (Chl) ──► A₁ (Phylloquinone) ──► F_X ──► F_A/F_B ──► Ferredoxin (Fd) ──► FNR ──► NADPH + H⁺",
        ],
      };
    }

    // 8. Chemiosmotic Proton Gradient Detection
    if (tLower.includes("chemiosmotic") || tLower.includes("proton gradient") || (ascii.includes("STROMA") && ascii.includes("LUMEN"))) {
      return {
        badgeText: "CHEMIOSMOTIC PROTON TRANSLOCATION",
        title: "THYLAKOID PROTON GRADIENT & ATP SYNTHASE ENGINE",
        subtitle: "Electrochemical pH Gradient (pH ~8.0 Stroma vs pH ~5.0 Lumen) Driving CF₀-CF₁ Rotation",
        type: "chemiosmotic",
        takeawayText: "The 1000-fold H⁺ concentration gradient across the thylakoid membrane drives CF₁ rotational catalysis (4 H⁺ per 1 ATP).",
        steps: [
          "• Water Splitting (OEC): Releases 4 H⁺ directly into the thylakoid lumen.",
          "• Plastoquinol (PQH₂) Oxidation: Q-cycle translocates 8 H⁺ from stroma into lumen.",
          "• FNR Reduction: Consumes 2 H⁺ on the stromal face to reduce NADP⁺ to NADPH.",
          "• Chemiosmotic Efflux: 4 H⁺ flow down gradient through CF₀ channel ──► Catalyzes ADP + P_i ──► ATP at CF₁.",
        ],
      };
    }

    // 9. Calvin Cycle Stoichiometry
    if (tLower.includes("calvin cycle stoichiometry") || (ascii.includes("1 CO₂ Fixed") && ascii.includes("GLUCOSE"))) {
      return {
        badgeText: "QUANTITATIVE BIOENERGETICS",
        title: "CALVIN CYCLE STOICHIOMETRIC LEDGER",
        subtitle: "Assimilatory Power Requirement per CO₂ Fixed and per Mole of Glucose Synthesized",
        type: "multi_compartment",
        takeawayText: "Fixing 6 CO₂ into 1 mole of glucose requires 18 ATP and 12 NADPH (a 3:2 ATP:NADPH ratio).",
        compartments: [
          {
            name: "PER SINGLE CO₂ FIXED",
            badge: "Single Turn Cost",
            subtext: "1 CO₂ ➔ 2 × 3-PGA ➔ 2 × Triose-P",
            accentColor: "emerald",
            reactions: [
              "• 1 CO₂ Fixed onto 1 RuBP",
              "• 2 ATP consumed in Reduction (Phosphoglycerate Kinase)",
              "• 2 NADPH consumed in Reduction (G3P Dehydrogenase)",
              "• 1 ATP consumed in Regeneration (Phosphoribulokinase)",
              "• Total Cost: 3 ATP + 2 NADPH",
            ],
          },
          {
            name: "PER MOLE OF GLUCOSE (C₆H₁₂O₆)",
            badge: "Net 6-Turn Synthesis",
            subtext: "6 CO₂ + 18 ATP + 12 NADPH ➔ 1 Glucose",
            accentColor: "purple",
            reactions: [
              "• 6 CO₂ Fixed",
              "• 12 ATP consumed in Reduction (12 × 3-PGA ➔ 12 × G3P)",
              "• 12 NADPH consumed in Reduction",
              "• 6 ATP consumed in Regeneration (10 G3P ➔ 6 RuBP)",
              "• Net Input: 6 CO₂ + 18 ATP + 12 NADPH",
            ],
          },
        ],
      };
    }

    // 10. CAM Pathway Cycle
    if (tLower.includes("cam pathway") || (ascii.includes("NIGHT:") && ascii.includes("DAY:"))) {
      return {
        badgeText: "TEMPORAL CARBON PARTITIONING",
        title: "CAM DIURNAL BIOCHEMICAL CYCLE",
        subtitle: "Temporal Partitioning of Carbon Fixation in Succulent Xerophytes",
        type: "multi_compartment",
        takeawayText: "Nighttime scotoactive stomata opening allows CO₂ capture into vacuolar malic acid with minimal transpiration water loss.",
        compartments: [
          {
            name: "NIGHTTIME (SCOTOACTIVE)",
            badge: "Stomata OPEN",
            subtext: "PEPCase Carboxylation & Vacuolar Acidification",
            accentColor: "indigo",
            reactions: [
              "• Stomata OPEN in cool, humid night air.",
              "• CO₂ + H₂O ──► HCO₃⁻",
              "• HCO₃⁻ + PEP (3C) ──[PEPCase]──► Oxaloacetate (4C)",
              "• OAA + NADH ──► Malate (4C) + NAD⁺",
              "• Malate actively pumped into central vacuole as Malic Acid.",
            ],
          },
          {
            name: "DAYTIME (PHOTOACTIVE)",
            badge: "Stomata CLOSED",
            subtext: "Decarboxylation & RuBisCO C₃ Fixation",
            accentColor: "amber",
            reactions: [
              "• Stomata CLOSED to prevent desiccation.",
              "• Malic acid effluxes from vacuole into cytoplasm.",
              "• Malic acid ──[NADP-ME]──► Pyruvate (3C) + CO₂ + NADPH",
              "• High internal CO₂ is fixed by RuBisCO in the Calvin cycle.",
              "• Solar light reactions generate required ATP & NADPH.",
            ],
          },
        ],
      };
    }

    return null;
  } catch {
    return null;
  }
}

export const UniversalPathwayDiagram: React.FC<UniversalPathwayDiagramProps> = (props) => {
  let pathwayData: UniversalPathwayData | null = props.data || null;

  if (!pathwayData && props.asciiText) {
    pathwayData = parseAsciiToPathway(props.asciiText);
  }

  if (!pathwayData) return null;

  const { badgeText = "METABOLIC ARCHITECTURE", title, subtitle, equation, compartments, steps, takeawayText, type } = pathwayData;

  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-white via-emerald-50/15 to-slate-50 border border-emerald-100/90 p-6 sm:p-8 shadow-md space-y-8 select-none">
      
      {/* ════════════ TOP ROOT HEADER ════════════ */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-2xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs flex items-center gap-1.5">
          <Sun className="w-3.5 h-3.5 text-emerald-600" />
          {badgeText}
        </span>
        <div className="p-5 rounded-2xl bg-white border border-emerald-200/90 shadow-sm w-full space-y-1.5 group hover:border-emerald-500 transition-all">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            {renderFormattedDiagramText(title)}
          </h4>
          {subtitle && (
            <p className="text-xs sm:text-sm font-semibold text-slate-600">
              {renderFormattedDiagramText(subtitle)}
            </p>
          )}
        </div>
      </div>

      {/* ════════════ PROMINENT EQUATION HERO BANNER ════════════ */}
      {equation && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-300 text-center font-mono text-sm sm:text-base font-black text-emerald-950 shadow-sm max-w-3xl mx-auto flex items-center justify-center gap-2">
          <Atom className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{renderFormattedDiagramText(equation)}</span>
        </div>
      )}

      {/* ════════════ MULTI-COMPARTMENT / MULTI-ORGANELLE VIEW ════════════ */}
      {compartments && compartments.length > 0 && (
        <div className={`grid grid-cols-1 ${compartments.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"} gap-6`}>
          {compartments.map((comp, idx) => {
            const colorKey = comp.accentColor || defaultColorSequence[idx % defaultColorSequence.length];
            const st = colorStyles[colorKey] || colorStyles.emerald;

            return (
              <div
                key={idx}
                className={`rounded-2xl bg-white border-2 ${st.border} shadow-sm p-5 space-y-4 flex flex-col justify-between hover:shadow-md transition-all relative`}
              >
                <div className="space-y-3.5">
                  {/* Compartment Header */}
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-gray-100">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${st.badge}`}>
                          {comp.badge || `Stage ${idx + 1}`}
                        </span>
                      </div>
                      <h5 className="text-base font-black text-slate-900 leading-tight pt-1">
                        {renderFormattedDiagramText(comp.name)}
                      </h5>
                      {comp.subtext && (
                        <p className="text-[11px] font-semibold text-slate-500 leading-tight">
                          {renderFormattedDiagramText(comp.subtext)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Reaction Equations */}
                  <div className="space-y-2">
                    {comp.reactions.map((rxn, rIdx) => (
                      <div
                        key={rIdx}
                        className={`p-2.5 rounded-xl border text-xs font-semibold leading-relaxed ${st.reactionBg}`}
                      >
                        {renderFormattedDiagramText(rxn)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connecting Inter-organelle indicator */}
                {idx < compartments.length - 1 && type === "multi_compartment" && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 border border-slate-200 shadow-2xs">
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ════════════ SEQUENTIAL REDOX / MILESTONE STEPS ════════════ */}
      {steps && steps.length > 0 && (
        <div className="space-y-3 max-w-3xl mx-auto">
          {steps.map((st, sIdx) => (
            <div
              key={sIdx}
              className="p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-2xs flex items-start gap-3 hover:border-emerald-400 transition-all"
            >
              <div className="h-6 w-6 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                {sIdx + 1}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                {renderFormattedDiagramText(st)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ════════════ BOTTOM TAKEAWAY ════════════ */}
      {takeawayText && (
        <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200/80 flex items-center justify-between gap-4 text-xs font-extrabold text-emerald-900 max-w-3xl mx-auto shadow-2xs">
          <div className="flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{renderFormattedDiagramText(takeawayText)}</span>
          </div>
        </div>
      )}
    </div>
  );
};
