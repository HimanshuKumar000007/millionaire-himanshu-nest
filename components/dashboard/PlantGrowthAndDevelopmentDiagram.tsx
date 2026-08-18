"use client";

import React, { useState } from "react";
import {
  Sun,
  Moon,
  Zap,
  Sparkles,
  Activity,
  TrendingUp,
  Layers,
  Repeat,
  FlaskConical,
  Award,
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowRight,
  Scale,
  Microscope,
  Atom,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

// ============================================================================
// TYPES & DATA STRUCTURES
// ============================================================================

export interface PhytohormoneData {
  id: string;
  name: string;
  category: "Growth Promoter" | "Growth Inhibitor" | "Dual Role";
  chemicalNature: string;
  precursor: string;
  discovery: string;
  bioassays: string[];
  keyFunctions: string[];
  agrochemicalUses: string[];
  nestTraps: string[];
  accentColor: "emerald" | "amber" | "purple" | "rose" | "indigo";
}

const phytohormoneDatabase: Record<string, PhytohormoneData> = {
  auxin: {
    id: "auxin",
    name: "Auxins (IAA, IBA, NAA, 2,4-D)",
    category: "Growth Promoter",
    chemicalNature: "Indole Compounds (Indole-3-acetic acid)",
    precursor: "Tryptophan (Requires Zn²⁺ co-factor)",
    discovery: "Charles & Francis Darwin (Canary grass phototropism) ➔ F.W. Went (Isolated from Avena coleoptile tips in agar)",
    bioassays: ["Avena Curvature Test (Quantitative curvature degree)", "Straight Growth Bioassay of Oat Coleoptile"],
    keyFunctions: [
      "Apical Dominance: Terminal bud inhibits lateral bud outgrowth.",
      "Cell Elongation: Acid growth hypothesis (stimulates H⁺-ATPase pump).",
      "Differential Leaf Abscission: Prevents premature leaf/fruit drop, but accelerates abscission of older senescent organs.",
      "Rooting & Vascular Differentiation: Induces adventitious root formation in stem cuttings and xylem differentiation.",
    ],
    agrochemicalUses: [
      "2,4-D (2,4-Dichlorophenoxyacetic acid): Selective weedicide killing broad-leaved dicots while sparing monocots.",
      "NAA & IBA: Rooting hormones for rapid vegetative propagation in nurseries.",
      "Inducing Parthenocarpy: Seedless fruit development in Tomatoes.",
    ],
    nestTraps: [
      "TRAP 1: Auxin promotes abscission of older leaves/fruits BUT PREVENTS drop of young leaves/fruits.",
      "TRAP 2: High concentrations of Auxin stimulate Ethylene synthesis, inhibiting root elongation.",
      "TRAP 3: Tryptophan biosynthesis strictly requires Zinc (Zn²⁺); Zn deficiency mimics Auxin deficiency (little leaf disease).",
    ],
    accentColor: "emerald",
  },
  gibberellin: {
    id: "gibberellin",
    name: "Gibberellins (GA₁, GA₂, GA₃)",
    category: "Growth Promoter",
    chemicalNature: "Terpenes / Terpenoids (Gibbane Ring structure)",
    precursor: "Acetyl-CoA / Mevalonic Acid / Kaurene",
    discovery: "E. Kurosawa (1926) ➔ 'Bakanae' (foolish seedling) disease in rice caused by fungal pathogen Gibberella fujikuroi",
    bioassays: ["Barley Endosperm α-Amylase Induction Bioassay", "Dwarf Pea / Maize Shoot Lengthening Bioassay"],
    keyFunctions: [
      "Bolting Response: Stem elongation prior to flowering in rosette plants (Cabbage, Beet).",
      "Seed Germination: Hydrolytic enzyme mobilization (α-amylase synthesis in aleurone layer).",
      "Overcoming Genetic Dwarfism: Converts single-gene dwarf mutants (pea, corn) into tall plants.",
      "Delaying Senescence: Extends harvest window for ripe citrus fruits.",
    ],
    agrochemicalUses: [
      "Malting Industry: Accelerates malting process in barley grains for brewing.",
      "Sugarcane Yield: Spraying sugarcane fields increases stem length, boosting yield by ~20 tonnes/acre.",
      "Fruit Lengthening: Improves length and shape of Apples and Grape stalks (Gibberellin elongates pedicels).",
    ],
    nestTraps: [
      "TRAP 1: GA breaks seed dormancy by activating hydrolytic enzymes, but DOES NOT induce apical dominance or rooting.",
      "TRAP 2: GA₃ application induces maleness (staminate flowers) in Cannabis and cucumbers.",
      "TRAP 3: GA cannot replace cold treatment (vernalization) completely unless cold-responsive genes are competent.",
    ],
    accentColor: "purple",
  },
  cytokinin: {
    id: "cytokinin",
    name: "Cytokinins (Kinetin, Zeatin, 6-BAP)",
    category: "Growth Promoter",
    chemicalNature: "Adenine Derivatives (N⁶-furfurylaminopurine)",
    precursor: "Adenine / Isopentenyl Pyrophosphate (IPP)",
    discovery: "Skoog & Miller (1955) ➔ Isolated Kinetin from autoclaved herring sperm DNA; Letham isolated Zeatin from corn kernels & coconut milk",
    bioassays: ["Tobacco Pith Tissue Culture Callus Bioassay", "Chlorophyll Retention Bioassay (Richmond-Lang Effect)"],
    keyFunctions: [
      "Cell Division & Cytokinesis: Essential for M-phase entry in plant tissue culture.",
      "Overcoming Apical Dominance: Promotes lateral bud outgrowth even in presence of apical bud.",
      "Nutrient Mobilization: Creates metabolic sinks, drawing amino acids and solutes to treated tissues.",
      "Delaying Leaf Senescence: Richmond-Lang Effect (maintains active chloroplasts and structural proteins).",
    ],
    agrochemicalUses: [
      "Plant Tissue Culture Organogenesis: High Cytokinin : Auxin ratio induces Shoot Differentiation.",
      "Post-Harvest Preservation: Extends shelf life of green leafy vegetables and cut flowers.",
      "Promoting Lateral Shoot Growth: Boosts bushy branching in tea gardens and hedges.",
    ],
    nestTraps: [
      "TRAP 1: High Cytokinin/Auxin = Shoots; Low Cytokinin/Auxin = Roots; Equal ratio = Unorganized Callus proliferation.",
      "TRAP 2: Kinetin is a synthetic adenine derivative (NOT naturally found in plants); Zeatin is the primary natural plant cytokinin.",
      "TRAP 3: Cytokinins synthesized mainly in root apices and transported acropetally via xylem.",
    ],
    accentColor: "indigo",
  },
  ethylene: {
    id: "ethylene",
    name: "Ethylene (C₂H₄)",
    category: "Dual Role",
    chemicalNature: "Simple Gaseous Hydrocarbon",
    precursor: "Methionine (via SAM and ACC intermediate)",
    discovery: "H.H. Cousins (1910) ➔ Showed ripe oranges emitted a volatile gas that accelerated ripening of stored bananas",
    bioassays: ["Pea Seedling Triple Response Bioassay (Shortened stem, thickened axis, horizontal growth)"],
    keyFunctions: [
      "Climacteric Fruit Ripening: Triggers respiratory burst (CO₂ surge) and tissue softening.",
      "Epinasty: Downward curvature of leaf petioles under waterlogged/flooded conditions.",
      "Abscission & Senescence: Promotes organ detachment by activating cell wall hydrolases.",
      "Break Stem Dormancy: Promotes seed/bud germination in peanuts and potato tubers.",
    ],
    agrochemicalUses: [
      "Ethephon (2-Chloroethylphosphonic acid): Liquid formulation releasing Ethylene slowly inside plant tissues.",
      "Fruit Ripening: Synchronized ripening of Tomatoes, Apples, and Bananas.",
      "Sex Expression: Promotes female flowers (pistillate) in Cucumbers to increase fruit yield.",
    ],
    nestTraps: [
      "TRAP 1: Ethylene is the ONLY gaseous plant hormone.",
      "TRAP 2: Ethylene promotes root hair formation and root growth at low concentrations (alongside Auxin).",
      "TRAP 3: Silver thiosulfate ($Ag_2S_2O_3$) and CO₂ act as competitive inhibitors of Ethylene action.",
    ],
    accentColor: "amber",
  },
  aba: {
    id: "aba",
    name: "Abscisic Acid (ABA / Stress Hormone)",
    category: "Growth Inhibitor",
    chemicalNature: "Sesquiterpenoid (15-Carbon isoprenoid)",
    precursor: "Carotenoids (Violaxanthin / Mevalonic Acid pathway)",
    discovery: "Addicott, Eagles, & Wareing (1960s) ➔ Isolated Abscisin II & Dormin, later confirmed to be identical chemical ABA",
    bioassays: ["Cotton Explant Abscission Bioassay", "Stomatal Closure Induction Bioassay in Epidermal Strips"],
    keyFunctions: [
      "Stomatal Closure: Triggers efflux of K⁺ and Cl⁻ from guard cells during drought stress.",
      "Inducing Seed Dormancy: Prevents premature seed germination on parent plant (prevents vivipary).",
      "General Metabolic Inhibitor: Halts cell division, protein synthesis, and nucleic acid transcription.",
      "Stress Tolerance: Enhances plant resistance to desiccation, cold, and saline environments.",
    ],
    agrochemicalUses: [
      "Anti-Transpirant Spray: Reduces transpiration water loss during agricultural drought conditions.",
      "Seed Storage Improvement: Prevents precocious germination during post-harvest grain storage.",
    ],
    nestTraps: [
      "TRAP 1: ABA is a direct antagonist to Gibberellins (GA/ABA balance dictates seed germination vs dormancy).",
      "TRAP 2: ABA closes stomata by binding to PYR/PYL/RCAR receptors, activating SnRK2 kinase to release guard cell anions.",
      "TRAP 3: Despite its name, Ethylene is more directly responsible for leaf/fruit abscission than ABA.",
    ],
    accentColor: "rose",
  },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const PlantGrowthAndDevelopmentDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"hormones" | "kinetics" | "differentiation" | "photoperiod">(
    "hormones"
  );
  const [selectedHormone, setSelectedHormone] = useState<string>("auxin");
  const [photoperiodMode, setPhotoperiodMode] = useState<"SDP" | "LDP" | "DNP">("SDP");
  const [phytochromeState, setPhytochromeState] = useState<"Red" | "FarRed">("Red");

  const currentHormone = phytohormoneDatabase[selectedHormone];

  return (
    <div className="my-4 sm:my-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-slate-50 to-emerald-50/20 border border-slate-200/90 p-2.5 sm:p-7 shadow-xs space-y-4 sm:space-y-6 select-none w-full">
      {/* ════════════ TOP HERO HEADER ════════════ */}
      <div className="flex flex-col items-center text-center space-y-2.5 max-w-2xl mx-auto w-full">
        <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          PLANT PHYSIOLOGY INTERACTIVE MODULE
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 shrink-0" />
            PLANT GROWTH &amp; DEVELOPMENT
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            Phytohormones, Growth Kinetics, Differentiation Cascades, &amp; Phytochromes
          </p>
        </div>
      </div>

      {/* ════════════ NAVIGATION TAB SWITCHER ════════════ */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-slate-100/90 rounded-xl sm:rounded-2xl border border-slate-200 w-full max-w-3xl mx-auto">
        <button
          onClick={() => setActiveTab("hormones")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "hormones"
              ? "bg-white text-emerald-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <FlaskConical className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Hormone Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab("kinetics")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "kinetics"
              ? "bg-white text-emerald-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-purple-600 shrink-0" />
          <span>Growth Curves</span>
        </button>

        <button
          onClick={() => setActiveTab("differentiation")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "differentiation"
              ? "bg-white text-emerald-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span>Differentiation</span>
        </button>

        <button
          onClick={() => setActiveTab("photoperiod")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "photoperiod"
              ? "bg-white text-emerald-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Sun className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Photoperiodism</span>
        </button>
      </div>

      {/* ════════════ TAB 1: PHYTOHORMONE MATRIX ════════════ */}
      {activeTab === "hormones" && (
        <div className="space-y-4 sm:space-y-6 w-full">
          {/* Hormone Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2 max-w-4xl mx-auto w-full">
            {Object.keys(phytohormoneDatabase).map((key) => {
              const h = phytohormoneDatabase[key];
              const isSelected = selectedHormone === key;

              return (
                <button
                  key={key}
                  onClick={() => setSelectedHormone(key)}
                  className={`p-2 sm:p-2.5 rounded-xl border-2 text-[11px] sm:text-xs font-extrabold transition-all text-center flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? "bg-emerald-950 text-white border-emerald-500 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className="truncate w-full text-center">{h.name.split(" ")[0]}</span>
                  <span
                    className={`text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full font-black ${
                      h.category === "Growth Promoter"
                        ? "bg-emerald-100 text-emerald-800"
                        : h.category === "Growth Inhibitor"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {h.category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Hormone Display Card */}
          <div className="p-3 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-emerald-200/90 shadow-2xs space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {currentHormone.category}
                </span>
                <h4 className="text-base sm:text-xl font-black text-slate-900 tracking-tight mt-1">
                  {currentHormone.name}
                </h4>
              </div>

              <div className="sm:text-right">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase">Chemical Nature</span>
                <span className="text-[11px] sm:text-xs font-extrabold text-slate-800">{currentHormone.chemicalNature}</span>
              </div>
            </div>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[9px] sm:text-[10px] font-black uppercase text-emerald-700 tracking-wider block">
                  Biosynthetic Precursor
                </span>
                <p className="text-xs font-extrabold text-slate-900">{currentHormone.precursor}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[9px] sm:text-[10px] font-black uppercase text-purple-700 tracking-wider block">
                  Historical Discovery
                </span>
                <p className="text-xs font-semibold text-slate-800">{currentHormone.discovery}</p>
              </div>
            </div>

            {/* Bioassays */}
            <div className="space-y-1.5">
              <h5 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Microscope className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Standard Physiological Bioassays
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                {currentHormone.bioassays.map((b, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs font-bold text-emerald-950 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Physiological Functions */}
            <div className="space-y-1.5">
              <h5 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Key Physiological Functions
              </h5>
              <div className="space-y-1.5">
                {currentHormone.keyFunctions.map((fn, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 leading-relaxed">
                    • {fn}
                  </div>
                ))}
              </div>
            </div>

            {/* Agrochemical Applications */}
            <div className="space-y-1.5">
              <h5 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Commercial Agrochemical Applications
              </h5>
              <div className="space-y-1.5">
                {currentHormone.agrochemicalUses.map((app, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs font-bold text-indigo-950">
                    ✓ {app}
                  </div>
                ))}
              </div>
            </div>

            {/* NEST Tricky Exam Traps Callout */}
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50 border border-amber-300 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-900 font-extrabold text-xs">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>NEST &amp; INBO HIGH-YIELD EXAM TRAPS</span>
              </div>
              <ul className="space-y-1 text-xs text-amber-950 font-bold pl-4 list-disc">
                {currentHormone.nestTraps.map((trap, idx) => (
                  <li key={idx}>{trap}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 2: GROWTH KINETICS & SIGMOID CURVE ════════════ */}
      {activeTab === "kinetics" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          {/* Arithmetic vs Geometric Growth Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {/* Arithmetic Growth Card */}
            <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase bg-emerald-100 text-emerald-800">
                  Linear Rate
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700">L_t = L_0 + rt</span>
              </div>
              <h4 className="text-sm sm:text-base font-black text-slate-900">ARITHMETIC GROWTH</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Following cell division, only <strong>one daughter cell</strong> continues to divide while the other differentiates and matures.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-50 font-mono text-[11px] sm:text-xs text-slate-800 border border-slate-200">
                • Constant Growth Rate (r)<br />
                • Curve: Straight Linear Line<br />
                • Example: Elongating root or shoot apex
              </div>
            </div>

            {/* Geometric Growth Card */}
            <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-purple-200 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase bg-purple-100 text-purple-800">
                  Exponential Rate
                </span>
                <span className="text-xs font-mono font-bold text-purple-700">W_1 = W_0 e^(rt)</span>
              </div>
              <h4 className="text-sm sm:text-base font-black text-slate-900">GEOMETRIC GROWTH</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Both daughter cells retain the ability to divide continuously, leading to exponential cell multiplication.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-50 font-mono text-[11px] sm:text-xs text-slate-800 border border-slate-200">
                • Exponential Rate (e = 2.718)<br />
                • Curve: Sigmoid / S-shaped Curve<br />
                • Example: Early embryo, unicellular algae
              </div>
            </div>
          </div>

          {/* Sigmoid Growth Curve Phases */}
          <div className="p-3.5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3 sm:space-y-4">
            <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-600 shrink-0" /> SIGMOID (S-SHAPED) GROWTH CURVE PHASES
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-amber-200 text-amber-900">
                  Phase 1
                </span>
                <h5 className="text-xs sm:text-sm font-black text-slate-900">1. LAG PHASE</h5>
                <p className="text-[11px] sm:text-xs text-slate-700 font-semibold leading-relaxed">
                  Initial slow growth period. Cells undergo metabolic preparation and hydration.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-200 text-emerald-900">
                  Phase 2
                </span>
                <h5 className="text-xs sm:text-sm font-black text-slate-900">2. LOG / EXPONENTIAL</h5>
                <p className="text-[11px] sm:text-xs text-slate-700 font-semibold leading-relaxed">
                  Maximal growth velocity. Exponential cell division and rapid elongation occur unhindered.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 space-y-1">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-slate-200 text-slate-900">
                  Phase 3
                </span>
                <h5 className="text-xs sm:text-sm font-black text-slate-900">3. STATIONARY</h5>
                <p className="text-[11px] sm:text-xs text-slate-700 font-semibold leading-relaxed">
                  Growth rate decelerates to zero due to nutrient depletion and toxic accumulation.
                </p>
              </div>
            </div>
          </div>

          {/* Absolute vs Relative Growth Rate Numerical Comparison */}
          <div className="p-3.5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950 text-white shadow-md space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-emerald-800 pb-2.5">
              <h4 className="text-xs sm:text-sm font-extrabold text-emerald-300 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-emerald-400 shrink-0" /> ABSOLUTE vs. RELATIVE GROWTH RATE
              </h4>
              <span className="text-[10px] sm:text-xs font-mono bg-emerald-900 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-700 self-start sm:self-auto">
                RGR = (ΔGrowth / Initial) × 100
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-emerald-800/80 space-y-1 text-xs font-mono">
                <span className="text-xs font-black uppercase text-emerald-400 block">LEAF A (Small Leaf)</span>
                <p>• Initial: 5 cm² ➔ Final: 10 cm²</p>
                <p className="text-emerald-300 font-bold">• AGR: 5 cm²/day</p>
                <p className="text-emerald-400 font-black">• RGR: (5/5) × 100 = 100%</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-emerald-800/80 space-y-1 text-xs font-mono">
                <span className="text-xs font-black uppercase text-amber-400 block">LEAF B (Large Leaf)</span>
                <p>• Initial: 50 cm² ➔ Final: 55 cm²</p>
                <p className="text-amber-300 font-bold">• AGR: 5 cm²/day</p>
                <p className="text-amber-400 font-black">• RGR: (5/50) × 100 = 10%</p>
              </div>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed pt-1 border-t border-emerald-800/80">
              <strong className="text-emerald-400">Takeaway:</strong> Identical Absolute Growth (5 cm²/day), but Leaf A displays a 10× higher Relative Growth Rate (100% vs 10%) due to smaller initial size!
            </p>
          </div>
        </div>
      )}

      {/* ════════════ TAB 3: DIFFERENTIATION MATRIX ════════════ */}
      {activeTab === "differentiation" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          {/* Step-by-Step Pathway Card */}
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-indigo-200 shadow-2xs space-y-4 sm:space-y-5">
            <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600 shrink-0" /> DIFFERENTIATION &amp; REDIFFERENTIATION CASCADE
            </h4>

            <div className="space-y-2.5 sm:space-y-3">
              {/* Step 1 */}
              <div className="p-3 rounded-xl bg-indigo-50/80 border border-indigo-200 flex items-start gap-2.5">
                <span className="h-6 w-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <div className="space-y-0.5">
                  <h5 className="text-xs sm:text-sm font-black text-slate-900">PRIMARY MERISTEM (Apical Meristem)</h5>
                  <p className="text-[11px] sm:text-xs text-slate-700 font-semibold leading-relaxed">
                    Undifferentiated, actively dividing cells with dense cytoplasm.
                  </p>
                </div>
              </div>

              <div className="flex justify-center text-indigo-400 -my-1.5">
                <ChevronRight className="w-5 h-5 rotate-90" />
              </div>

              {/* Step 2 */}
              <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-2.5">
                <span className="h-6 w-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <div className="space-y-0.5">
                  <h5 className="text-xs sm:text-sm font-black text-slate-900">DIFFERENTIATION ➔ PRIMARY TISSUE</h5>
                  <p className="text-[11px] sm:text-xs text-slate-700 font-semibold leading-relaxed">
                    Cells lose division capacity to form Tracheids, Parenchyma, and Primary Xylem.
                  </p>
                </div>
              </div>

              <div className="flex justify-center text-emerald-400 -my-1.5">
                <ChevronRight className="w-5 h-5 rotate-90" />
              </div>

              {/* Step 3 */}
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-2.5">
                <span className="h-6 w-6 rounded-lg bg-amber-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <div className="space-y-0.5">
                  <h5 className="text-xs sm:text-sm font-black text-slate-900">DEDIFFERENTIATION ➔ SECONDARY MERISTEM</h5>
                  <p className="text-[11px] sm:text-xs text-slate-700 font-semibold leading-relaxed">
                    Mature cells REGAIN division capacity (Interfascicular Cambium, Cork Cambium/Phellogen).
                  </p>
                </div>
              </div>

              <div className="flex justify-center text-amber-400 -my-1.5">
                <ChevronRight className="w-5 h-5 rotate-90" />
              </div>

              {/* Step 4 */}
              <div className="p-3 rounded-xl bg-purple-50/80 border border-purple-200 flex items-start gap-2.5">
                <span className="h-6 w-6 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                  4
                </span>
                <div className="space-y-0.5">
                  <h5 className="text-xs sm:text-sm font-black text-slate-900">REDIFFERENTIATION ➔ SECONDARY TISSUE</h5>
                  <p className="text-[11px] sm:text-xs text-slate-700 font-semibold leading-relaxed">
                    Secondary meristems produce permanent Secondary Xylem, Secondary Phloem, and Cork.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Developmental Plasticity & Heterophylly */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
            <h4 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" /> DEVELOPMENTAL PLASTICITY &amp; HETEROPHYLLY
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Developmental Heterophylly</span>
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">
                  Juvenile vs adult leaf shapes (*Cotton, Coriander, Larkspur*).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 block">Environmental Heterophylly</span>
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">
                  Submerged vs aerial leaf shapes (*Buttercup / Ranunculus flabellaris*).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 4: PHOTOPERIODISM & PHYTOCHROMES ════════════ */}
      {activeTab === "photoperiod" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          {/* Photoperiod Selector Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl sm:rounded-2xl border border-slate-200 max-w-md mx-auto w-full">
            <button
              onClick={() => setPhotoperiodMode("SDP")}
              className={`py-1.5 rounded-lg text-[10px] sm:text-xs font-black transition-all ${
                photoperiodMode === "SDP" ? "bg-amber-500 text-slate-950 shadow-2xs" : "text-slate-600"
              }`}
            >
              SDP (Short-Day)
            </button>
            <button
              onClick={() => setPhotoperiodMode("LDP")}
              className={`py-1.5 rounded-lg text-[10px] sm:text-xs font-black transition-all ${
                photoperiodMode === "LDP" ? "bg-amber-500 text-slate-950 shadow-2xs" : "text-slate-600"
              }`}
            >
              LDP (Long-Day)
            </button>
            <button
              onClick={() => setPhotoperiodMode("DNP")}
              className={`py-1.5 rounded-lg text-[10px] sm:text-xs font-black transition-all ${
                photoperiodMode === "DNP" ? "bg-amber-500 text-slate-950 shadow-2xs" : "text-slate-600"
              }`}
            >
              Day-Neutral
            </button>
          </div>

          {/* Photoperiod Card Display */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-2.5">
            {photoperiodMode === "SDP" && (
              <div className="space-y-2">
                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-amber-100 text-amber-900">
                  Long-Night Plants
                </span>
                <h4 className="text-sm sm:text-base font-black text-slate-900">SHORT-DAY PLANTS (SDPs)</h4>
                <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                  Require an uninterrupted dark night period <strong>LONGER than critical duration</strong>.
                </p>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-bold space-y-1">
                  <p>• Examples: Xanthium (Cocklebur), Chrysanthemum, Rice, Soybeans, Tobacco.</p>
                  <p>• Night Break: Red flash in dark completely INHIBITS flowering!</p>
                </div>
              </div>
            )}

            {photoperiodMode === "LDP" && (
              <div className="space-y-2">
                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-indigo-100 text-indigo-900">
                  Short-Night Plants
                </span>
                <h4 className="text-sm sm:text-base font-black text-slate-900">LONG-DAY PLANTS (LDPs)</h4>
                <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                  Require photoperiod <strong>LONGER than critical day length</strong>.
                </p>
                <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 font-bold space-y-1">
                  <p>• Examples: Henbane (Hyoscyamus), Wheat, Radish, Spinach, Barley.</p>
                  <p>• Night Break: Red flash during long night INDUCES flowering!</p>
                </div>
              </div>
            )}

            {photoperiodMode === "DNP" && (
              <div className="space-y-2">
                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-slate-100 text-slate-900">
                  Photoperiod Independent
                </span>
                <h4 className="text-sm sm:text-base font-black text-slate-900">DAY-NEUTRAL PLANTS (DNPs)</h4>
                <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                  Flowering is triggered by vegetative maturity rather than photoperiods.
                </p>
                <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-900 font-bold space-y-1">
                  <p>• Examples: Tomato, Cucumber, Cotton, Sunflower, Maize.</p>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Phytochrome System Interconversion */}
          <div className="p-3.5 sm:p-6 rounded-2xl bg-slate-950 text-white shadow-md space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-1.5">
                <Atom className="w-4 h-4 text-amber-400 shrink-0" />
                <h4 className="text-xs sm:text-sm font-extrabold text-amber-300">
                  PHYTOCHROME SYSTEM (P_r ⇌ P_fr)
                </h4>
              </div>
              <button
                onClick={() => setPhytochromeState(phytochromeState === "Red" ? "FarRed" : "Red")}
                className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-black transition-all flex items-center justify-center gap-1 self-start sm:self-auto"
              >
                <RefreshCw className="w-3 h-3" /> Toggle Wavelength
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              {/* P_r Form */}
              <div
                className={`p-3.5 rounded-xl border-2 transition-all space-y-1.5 ${
                  phytochromeState === "Red"
                    ? "bg-rose-950/80 border-rose-500 shadow-md"
                    : "bg-slate-900/80 border-slate-800 opacity-60"
                }`}
              >
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-rose-900 text-rose-200">
                  Inactive Form
                </span>
                <h5 className="text-sm sm:text-base font-black text-rose-300">P_r (Phytochrome Red)</h5>
                <p className="text-[11px] sm:text-xs text-slate-300 font-medium leading-relaxed">
                  • Absorbs Red (660 nm)<br />
                  • Stable form accumulated in darkness<br />
                  • Converts to P_fr in daylight
                </p>
              </div>

              {/* P_fr Form */}
              <div
                className={`p-3.5 rounded-xl border-2 transition-all space-y-1.5 ${
                  phytochromeState === "FarRed"
                    ? "bg-emerald-950/80 border-emerald-500 shadow-md"
                    : "bg-slate-900/80 border-slate-800 opacity-60"
                }`}
              >
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-900 text-emerald-200">
                  Active Form
                </span>
                <h5 className="text-sm sm:text-base font-black text-emerald-300">P_fr (Phytochrome Far-Red)</h5>
                <p className="text-[11px] sm:text-xs text-slate-300 font-medium leading-relaxed">
                  • Absorbs Far-Red (730 nm)<br />
                  • Physiologically ACTIVE form<br />
                  • Dark decay back to P_r during night
                </p>
              </div>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800">
              <strong className="text-amber-400">Photoperiodic Rule:</strong> In SDPs, high P_fr INHIBITS flowering (must decay during night). In LDPs, high P_fr STIMULATES flowering!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantGrowthAndDevelopmentDiagram;
