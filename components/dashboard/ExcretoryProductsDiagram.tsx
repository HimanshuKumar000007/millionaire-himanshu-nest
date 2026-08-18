"use client";

import React, { useState } from "react";
import {
  Activity,
  Layers,
  Sparkles,
  Zap,
  Droplets,
  Shield,
  Stethoscope,
  ChevronRight,
  RefreshCw,
  Flame,
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Scale,
} from "lucide-react";

// ============================================================================
// DATA STRUCTURES
// ============================================================================

export interface WasteModeData {
  id: string;
  name: string;
  chemical: string;
  toxicity: string;
  waterDemand: string;
  synthesis: string;
  physicalForm: string;
  taxa: string;
}

const wasteModesDatabase: Record<string, WasteModeData> = {
  ammonotelism: {
    id: "ammonotelism",
    name: "Ammonotelism (Ammonia)",
    chemical: "NH₃ / NH₄⁺ (Ammonium)",
    toxicity: "Extremely High (100,000× more toxic than uric acid)",
    waterDemand: "≈ 500 mL H₂O per gram Nitrogen",
    synthesis: "Direct deamination of amino acids (0 ATP energy cost)",
    physicalForm: "Highly soluble gas/ion excreted by simple branchial/cutaneous diffusion",
    taxa: "Aquatic Invertebrates, Bony Fishes, Aquatic Amphibian Larvae (Tadpoles)",
  },
  ureotelism: {
    id: "ureotelism",
    name: "Ureotelism (Urea)",
    chemical: "NH₂-CO-NH₂ (Urea)",
    toxicity: "Moderate (100,000× less toxic than NH₃)",
    waterDemand: "≈ 50 mL H₂O per gram Nitrogen",
    synthesis: "Synthesized in Liver via Krebs-Henseleit Urea Cycle (consumes 3 ATP)",
    physicalForm: "Soluble concentrated aqueous liquid urine",
    taxa: "Mammals, Terrestrial Amphibians (Adult Frogs), Marine Cartilaginous Fishes (Sharks)",
  },
  uricotelism: {
    id: "uricotelism",
    name: "Uricotelism (Uric Acid)",
    chemical: "2,6,8-trioxypurine (Uric Acid)",
    toxicity: "Minimal / Completely Non-toxic",
    waterDemand: "≈ 1–5 mL H₂O per gram Nitrogen (Maximum Conservation)",
    synthesis: "Synthesized via Purine degradation pathway (High ATP metabolic cost)",
    physicalForm: "Insoluble semi-solid paste or pelleted crystals",
    taxa: "Birds, Reptiles (Lizards, Snakes), Land Snails (Gastropods), Terrestrial Insects",
  },
};

export const ExcretoryProductsDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "wasteModes" | "nephron" | "filtration" | "countercurrent" | "regulation"
  >("wasteModes");
  const [selectedMode, setSelectedMode] = useState<string>("ureotelism");
  const [nephronType, setNephronType] = useState<"cortical" | "juxtamedullary">("juxtamedullary");
  const [activeSegment, setActiveSegment] = useState<string>("pct");
  const [selectedDisorder, setSelectedDisorder] = useState<"uremia" | "calculi" | "nephritis">("calculi");

  const currentMode = wasteModesDatabase[selectedMode];

  return (
    <div className="my-4 sm:my-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-slate-50 to-cyan-50/20 border border-slate-200/90 p-2.5 sm:p-7 shadow-xs space-y-4 sm:space-y-6 select-none w-full">
      {/* ════════════ TOP HERO HEADER ════════════ */}
      <div className="flex flex-col items-center text-center space-y-2.5 max-w-2xl mx-auto w-full">
        <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-100 text-cyan-800 border border-cyan-200 shadow-2xs flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-cyan-600" />
          RENAL PHYSIOLOGY &amp; OSMOREGULATION
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 shrink-0" />
            EXCRETORY PRODUCTS &amp; ELIMINATION
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            Nitrogenous Waste Modes, Ultrafiltration Dynamics, Counter-Current Multiplier, RAAS &amp; Hemodialysis
          </p>
        </div>
      </div>

      {/* ════════════ NAVIGATION TAB SWITCHER ════════════ */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-slate-100/90 rounded-xl sm:rounded-2xl border border-slate-200 w-full max-w-4xl mx-auto">
        <button
          onClick={() => setActiveTab("wasteModes")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "wasteModes"
              ? "bg-white text-cyan-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Filter className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
          <span>Waste Modes</span>
        </button>

        <button
          onClick={() => setActiveTab("nephron")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "nephron"
              ? "bg-white text-cyan-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span>Nephron Anatomy</span>
        </button>

        <button
          onClick={() => setActiveTab("filtration")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "filtration"
              ? "bg-white text-cyan-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-rose-600 shrink-0" />
          <span>Ultrafiltration &amp; NFP</span>
        </button>

        <button
          onClick={() => setActiveTab("countercurrent")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "countercurrent"
              ? "bg-white text-cyan-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Counter-Current</span>
        </button>

        <button
          onClick={() => setActiveTab("regulation")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "regulation"
              ? "bg-white text-cyan-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Stethoscope className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>RAAS &amp; Dialysis</span>
        </button>
      </div>

      {/* ════════════ TAB 1: NITROGENOUS WASTE MODES ════════════ */}
      {activeTab === "wasteModes" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          {/* Mode Selector Buttons */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 w-full">
            {Object.keys(wasteModesDatabase).map((key) => {
              const m = wasteModesDatabase[key];
              const isSelected = selectedMode === key;

              return (
                <button
                  key={key}
                  onClick={() => setSelectedMode(key)}
                  className={`p-2 sm:p-2.5 rounded-xl border-2 text-[11px] sm:text-xs font-extrabold transition-all text-center flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? "bg-slate-900 text-white border-cyan-500 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className="truncate w-full text-center">{m.name.split(" ")[0]}</span>
                  <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full font-black bg-cyan-100 text-cyan-800">
                    {key === "ammonotelism" && "500 mL H₂O"}
                    {key === "ureotelism" && "50 mL H₂O"}
                    {key === "uricotelism" && "1–5 mL H₂O"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Mode Card */}
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-cyan-200/90 shadow-2xs space-y-4 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-cyan-100 text-cyan-800 border border-cyan-200">
                  {currentMode.chemical}
                </span>
                <h4 className="text-base sm:text-xl font-black text-slate-900 tracking-tight mt-1">
                  {currentMode.name}
                </h4>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[9px] sm:text-[10px] font-black uppercase text-rose-700 tracking-wider block">
                  Toxicity &amp; Water Requirement
                </span>
                <p className="text-xs font-semibold text-slate-900 leading-relaxed">• Toxicity: {currentMode.toxicity}</p>
                <p className="text-xs font-bold text-cyan-700 leading-relaxed">• Hydration Cost: {currentMode.waterDemand}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[9px] sm:text-[10px] font-black uppercase text-indigo-700 tracking-wider block">
                  Synthesis Pathway &amp; Physical Form
                </span>
                <p className="text-xs font-semibold text-slate-800 leading-relaxed">• Synthesis: {currentMode.synthesis}</p>
                <p className="text-xs font-semibold text-slate-800 leading-relaxed">• Physical State: {currentMode.physicalForm}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-cyan-50/80 border border-cyan-200 space-y-1">
              <h5 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-cyan-900">
                Representative Animal Taxa
              </h5>
              <p className="text-xs font-semibold text-cyan-950 leading-relaxed">
                {currentMode.taxa}
              </p>
            </div>
          </div>

          {/* Special Excretory Modes Callout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 space-y-0.5">
              <span className="text-[9px] font-black uppercase text-slate-700 block">Guanotelism</span>
              <p className="text-slate-900">Excretion of insoluble <strong>Guanine</strong> in Arachnids (<em>Spiders &amp; Scorpions</em>).</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 space-y-0.5">
              <span className="text-[9px] font-black uppercase text-slate-700 block">Aminotelism</span>
              <p className="text-slate-900">Excretion of intact <strong>Amino Acids</strong> in freshwater Molluscs (<em>Unio, Pila during drought</em>).</p>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 2: NEPHRON ANATOMY & HETEROGENEITY ════════════ */}
      {activeTab === "nephron" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
                NEPHRON HETEROGENEITY (1.2 MILLION PER KIDNEY)
              </h4>
              <div className="flex gap-1">
                <button
                  onClick={() => setNephronType("cortical")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                    nephronType === "cortical"
                      ? "bg-indigo-600 text-white shadow-2xs"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Cortical (85%)
                </button>
                <button
                  onClick={() => setNephronType("juxtamedullary")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                    nephronType === "juxtamedullary"
                      ? "bg-indigo-600 text-white shadow-2xs"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Juxtamedullary (15%)
                </button>
              </div>
            </div>

            {nephronType === "cortical" ? (
              <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs space-y-2">
                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-indigo-200 text-indigo-900">
                  85% of Total Nephrons • Outer Cortex
                </span>
                <h5 className="font-black text-slate-900 text-sm">CORTICAL NEPHRONS</h5>
                <p className="text-slate-800 font-medium leading-relaxed">
                  • Glomerulus is situated in the <strong>outer renal cortex</strong>.
                </p>
                <p className="text-slate-800 font-medium leading-relaxed">
                  • Loop of Henle is <strong>short</strong> and extends only slightly into the outer medulla.
                </p>
                <p className="text-indigo-950 font-bold leading-relaxed">
                  • <strong>Vasa Recta is reduced or COMPLETELY ABSENT</strong> (Peritubular capillaries dominate).
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-cyan-50 border border-cyan-200 text-xs space-y-2">
                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-cyan-200 text-cyan-900">
                  15% of Total Nephrons • Deep Corticomedullary Junction
                </span>
                <h5 className="font-black text-slate-900 text-sm">JUXTAMEDULLARY NEPHRONS</h5>
                <p className="text-slate-800 font-medium leading-relaxed">
                  • Glomerulus is situated deep in the cortex near the <strong>corticomedullary junction</strong>.
                </p>
                <p className="text-slate-800 font-medium leading-relaxed">
                  • Loop of Henle is <strong>very long and dips deep into the inner medulla / papilla</strong>.
                </p>
                <p className="text-cyan-950 font-bold leading-relaxed">
                  • <strong>Accompanied by well-developed, hairpin-shaped Vasa Recta</strong> operating parallel to Henle's loop.
                </p>
                <p className="text-cyan-950 font-black leading-relaxed">
                  • <strong>ESSENTIAL FOR CONCENTRATING URINE (Counter-Current Multiplier)!</strong>
                </p>
              </div>
            )}

            {/* Renal Anatomy Macro Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong>• Renal Cortex:</strong> Outer zone extending between medullary pyramids as <strong>Columns of Bertini</strong>.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong>• Renal Medulla:</strong> Divided into 8–18 conical pyramids opening into Calyces ➔ <strong>Renal Pelvis</strong>.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 3: ULTRAFILTRATION & NFP ════════════ */}
      {activeTab === "filtration" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          {/* Pressure Equation Box */}
          <div className="p-3.5 sm:p-6 rounded-2xl bg-white border border-rose-200 shadow-2xs space-y-4">
            <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-rose-600 shrink-0" />
              NET FILTRATION PRESSURE (NFP) &amp; GFR DYNAMICS
            </h4>

            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-mono space-y-1.5 text-rose-950">
              <p className="text-emerald-700 font-bold">1. Glomerular Hydrostatic Pressure (GHP) = +60 mmHg (Favors Filtration)</p>
              <p className="text-rose-700 font-bold">2. Blood Colloid Osmotic Pressure (BCOP) = -32 mmHg (Opposes Filtration - Albumin)</p>
              <p className="text-rose-700 font-bold">3. Capsular Hydrostatic Pressure (CHP)  = -18 mmHg (Opposes Filtration - Bowman Space)</p>
              <div className="pt-1 border-t border-rose-300 text-sm font-sans font-black text-slate-900">
                NFP = GHP - (BCOP + CHP) = 60 - (32 + 18) = <span className="text-rose-600">+10 mmHg</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[9px] font-sans font-bold text-slate-400 block uppercase">Glomerular Filtration Rate</span>
                <p className="text-slate-900 font-black text-sm">125 mL/min</p>
                <p className="text-emerald-600 font-bold">180 Liters / Day</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[9px] font-sans font-bold text-slate-400 block uppercase">Filtration Fraction</span>
                <p className="text-slate-900 font-black text-sm">GFR / RPF</p>
                <p className="text-indigo-600 font-bold">≈ 19–20 %</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[9px] font-sans font-bold text-slate-400 block uppercase">Final Urine Excreted</span>
                <p className="text-slate-900 font-black text-sm">1.5 L / Day</p>
                <p className="text-rose-600 font-bold">&gt; 99% Reabsorbed</p>
              </div>
            </div>
          </div>

          {/* Filtration Barrier Layers */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-slate-900 text-white space-y-3">
            <h4 className="text-xs sm:text-sm font-black text-cyan-400 uppercase tracking-wider">
              3-LAYER MALPIGHIAN BODY FILTRATION MEMBRANE
            </h4>
            <div className="space-y-1.5 text-xs font-mono">
              <p className="text-slate-300">1. Glomerular Endothelium: Fenestrated pores (70–90 nm)</p>
              <p className="text-slate-300">2. Basement Membrane: Acellular negatively charged glycoprotein mesh</p>
              <p className="text-cyan-300 font-bold">3. Visceral Podocytes: Pedicel foot processes forming 25 nm Filtration Slits</p>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 4: COUNTER-CURRENT MULTIPLIER & EXCHANGER ════════════ */}
      {activeTab === "countercurrent" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-amber-600 shrink-0" />
              MEDULLARY OSMOLAR GRADIENT (300 ➔ 1200 mOsmol/L)
            </h4>

            {/* Gradient Visual */}
            <div className="p-3 rounded-xl bg-gradient-to-b from-cyan-50 via-amber-50 to-rose-50 border border-slate-200 space-y-2 text-xs font-semibold">
              <div className="flex justify-between items-center px-2 py-1 bg-white/80 rounded-md">
                <span className="text-cyan-900 font-black">Renal Cortex</span>
                <span className="font-mono text-cyan-700">300 mOsmol/L (Isotonic)</span>
              </div>
              <div className="flex justify-between items-center px-2 py-1 bg-white/80 rounded-md">
                <span className="text-amber-900 font-black">Outer Medulla</span>
                <span className="font-mono text-amber-700">600–900 mOsmol/L</span>
              </div>
              <div className="flex justify-between items-center px-2 py-1 bg-white/80 rounded-md">
                <span className="text-rose-900 font-black">Inner Medullary Papilla</span>
                <span className="font-mono text-rose-700 font-bold">1200 mOsmol/L (4× Concentrated!)</span>
              </div>
            </div>

            {/* Mechanism Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5">
                <span className="text-[10px] font-black uppercase text-amber-900 block">
                  1. Multiplier (Loop of Henle)
                </span>
                <p className="text-slate-800">• <strong>Descending Limb:</strong> Permeable to H₂O (Aquaporin-1); Impermeable to salts ➔ Fluid becomes hypertonic (1200).</p>
                <p className="text-slate-800">• <strong>Ascending Limb:</strong> <strong>IMPERMEABLE to H₂O</strong>; Actively pumps NaCl (NKCC2) into interstitium ➔ Fluid becomes hypotonic (200).</p>
              </div>

              <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200 space-y-1.5">
                <span className="text-[10px] font-black uppercase text-cyan-900 block">
                  2. Exchanger (Vasa Recta)
                </span>
                <p className="text-slate-800">• Blood flows counter-current to Henle's loop.</p>
                <p className="text-slate-800">• <strong>Descending:</strong> Takes in NaCl, gives out H₂O.</p>
                <p className="text-slate-800">• <strong>Ascending:</strong> Returns NaCl to interstitium, reabsorbs H₂O.</p>
                <p className="text-cyan-950 font-bold">• <strong>Preserves medullary gradient without washout!</strong></p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs">
              <strong>• Urea Recycling:</strong> Urea diffuses out of the lower collecting duct into the inner medulla and re-enters the thin ascending limb, creating a continuous hyperosmolarity booster loop.
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 5: REGULATION, RAAS, & PATHOPHYSIOLOGY ════════════ */}
      {activeTab === "regulation" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          {/* RAAS Cascade */}
          <div className="p-3.5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
              RENIN-ANGIOTENSIN-ALDOSTERONE SYSTEM (RAAS)
            </h4>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-950 space-y-1">
              <p>1. Low Blood Pressure / Low GFR ➔ <strong>Juxtaglomerular (JG) Cells</strong> release <strong>RENIN</strong>.</p>
              <p>2. Renin converts hepatic <strong>Angiotensinogen</strong> ➔ <strong>Angiotensin I</strong>.</p>
              <p>3. Pulmonary <strong>ACE</strong> converts Angiotensin I ➔ <strong>Angiotensin II</strong> (Potent Vasoconstrictor).</p>
              <p>4. Angiotensin II triggers Adrenal Cortex to release <strong>ALDOSTERONE</strong>.</p>
              <p className="font-bold text-slate-900">5. Aldosterone promotes Na⁺ and H₂O reabsorption in DCT/CD ➔ Blood Pressure &amp; GFR restored!</p>
            </div>

            {/* ADH vs ANF Antagonism */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
                <span className="text-[10px] font-black uppercase text-blue-800 block">ADH / Vasopressin</span>
                <p className="text-slate-800">• High blood osmolarity triggers posterior pituitary ADH.</p>
                <p className="text-slate-800">• Inserts <strong>Aquaporin-2</strong> in CD ➔ Concentrates urine.</p>
              </div>

              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
                <span className="text-[10px] font-black uppercase text-rose-800 block">ANF (Atrial Natriuretic Factor)</span>
                <p className="text-slate-800">• Released by heart atria during high blood pressure.</p>
                <p className="text-rose-950 font-bold">• <strong>Inhibits Renin &amp; Aldosterone</strong>; causes Natriuresis (Na⁺ excretion).</p>
              </div>
            </div>
          </div>

          {/* Renal Disorders & Hemodialysis */}
          <div className="p-3.5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                RENAL DISORDERS &amp; HEMODIALYSIS CIRCUIT
              </h4>
              <div className="flex gap-1">
                <button
                  onClick={() => setSelectedDisorder("calculi")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                    selectedDisorder === "calculi"
                      ? "bg-emerald-600 text-white shadow-2xs"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Calculi
                </button>
                <button
                  onClick={() => setSelectedDisorder("uremia")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                    selectedDisorder === "uremia"
                      ? "bg-emerald-600 text-white shadow-2xs"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Uremia &amp; Dialysis
                </button>
                <button
                  onClick={() => setSelectedDisorder("nephritis")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                    selectedDisorder === "nephritis"
                      ? "bg-emerald-600 text-white shadow-2xs"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Glomerulonephritis
                </button>
              </div>
            </div>

            {selectedDisorder === "calculi" && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1">
                <strong className="text-amber-950">Renal Calculi (Kidney Stones):</strong> Insoluble crystalline masses composed primarily of <strong>Calcium Oxalate (≈ 80%)</strong> or uric acid precipitated in the renal pelvis/calyces.
              </div>
            )}

            {selectedDisorder === "uremia" && (
              <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200 text-xs space-y-1.5">
                <strong className="text-cyan-950">Uremia &amp; Hemodialysis:</strong>
                <p className="text-slate-800">1. Blood from radial artery mixed with <strong>Heparin</strong> (anticoagulant).</p>
                <p className="text-slate-800">2. Circulated through coiled cellophane tubing in dialyzing bath containing <strong>ZERO nitrogenous wastes</strong>.</p>
                <p className="text-slate-800">3. Urea and creatinine diffuse out down their concentration gradient.</p>
                <p className="text-cyan-950 font-bold">4. <strong>Anti-Heparin</strong> is added before returning cleared blood via a vein.</p>
              </div>
            )}

            {selectedDisorder === "nephritis" && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs space-y-1">
                <strong className="text-rose-950">Glomerulonephritis (Bright's Disease):</strong> Post-streptococcal or autoimmune inflammation of glomerular capillary tufts causing hematuria, proteinuria, and oliguria.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcretoryProductsDiagram;
