"use client";

import React, { useState } from "react";
import {
  Heart,
  Activity,
  Droplet,
  Shield,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Scale,
  RefreshCw,
  TrendingUp,
  Stethoscope,
  ChevronRight,
  ShieldCheck,
  BrainCircuit,
} from "lucide-react";

// ============================================================================
// DATA STRUCTURES
// ============================================================================

export interface WbcData {
  id: string;
  name: string;
  category: "Granulocyte" | "Agranulocyte";
  abundance: string;
  nucleusShape: string;
  staining: string;
  function: string;
  clinicalSignificance: string;
}

const wbcDatabase: Record<string, WbcData> = {
  neutrophil: {
    id: "neutrophil",
    name: "Neutrophil (PMN)",
    category: "Granulocyte",
    abundance: "60–65% (Most abundant WBC)",
    nucleusShape: "Multilobed (3–5 lobes)",
    staining: "Neutral-staining fine granules (pink/purple)",
    function: "First responder phagocyte; engulfs and destroys invading bacteria through oxidative burst.",
    clinicalSignificance: "Elevated in acute bacterial infections and tissue trauma (Neutrophilia).",
  },
  eosinophil: {
    id: "eosinophil",
    name: "Eosinophil (Acidophil)",
    category: "Granulocyte",
    abundance: "2–3%",
    nucleusShape: "Bilobed (Spectacle-shaped)",
    staining: "Coarse acidophilic granules staining bright pink/red with Eosin dye",
    function: "Combats parasitic helminth infections via major basic protein; modulates allergic responses.",
    clinicalSignificance: "Elevated in bronchial asthma, allergic rhinitis, and intestinal worm infestations (Eosinophilia).",
  },
  basophil: {
    id: "basophil",
    name: "Basophil",
    category: "Granulocyte",
    abundance: "0.5–1% (Least abundant WBC)",
    nucleusShape: "S-shaped / Twisted 3-lobed nucleus",
    staining: "Coarse basophilic granules staining dark blue/purple with Basic dyes (Methylene blue)",
    function: "Secretes Histamine (vasodilator), Serotonin (vasoconstrictor), and Heparin (anticoagulant).",
    clinicalSignificance: "Key mediator of acute systemic inflammation and Type I anaphylactic hypersensitivity.",
  },
  monocyte: {
    id: "monocyte",
    name: "Monocyte",
    category: "Agranulocyte",
    abundance: "6–8%",
    nucleusShape: "Kidney-shaped / Horseshoe-shaped",
    staining: "Agranular grey-blue cytoplasm; largest WBC in peripheral blood",
    function: "Circulates in blood then enters tissues to become active Macrophages (Kupffer cells, Microglia, Osteoclasts).",
    clinicalSignificance: "Elevated in chronic inflammatory disorders, tuberculosis, and malaria.",
  },
  lymphocyte: {
    id: "lymphocyte",
    name: "Lymphocyte (B & T Cells)",
    category: "Agranulocyte",
    abundance: "20–25%",
    nucleusShape: "Large, spherical nucleus filling almost the entire cell with a thin rim of cytoplasm",
    staining: "Agranular pale blue cytoplasm",
    function: "B-cells secrete antibodies (Humoral Immunity); T-cells orchestrate Cell-Mediated Immunity.",
    clinicalSignificance: "Elevated in viral infections (infectious mononucleosis) and lymphocytic leukemias.",
  },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const BodyFluidsAndCirculationDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "blood" | "clotting" | "cardiacCycle" | "ecg" | "disorders"
  >("blood");
  const [selectedWbc, setSelectedWbc] = useState<string>("neutrophil");
  const [aboBloodGroup, setAboBloodGroup] = useState<"A" | "B" | "AB" | "O">("AB");
  const [cardiacPhase, setCardiacPhase] = useState<
    "jointDiastole" | "atrialSystole" | "ventricularSystole" | "ventricularDiastole"
  >("ventricularSystole");

  const currentWbc = wbcDatabase[selectedWbc];

  return (
    <div className="my-4 sm:my-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-slate-50 to-rose-50/20 border border-slate-200/90 p-2.5 sm:p-7 shadow-xs space-y-4 sm:space-y-6 select-none w-full">
      {/* ════════════ TOP HERO HEADER ════════════ */}
      <div className="flex flex-col items-center text-center space-y-2.5 max-w-2xl mx-auto w-full">
        <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200 shadow-2xs flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-rose-600" />
          CARDIOVASCULAR &amp; HEMATOLOGY MODULE
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600 shrink-0 fill-rose-500/20" />
            BODY FLUIDS &amp; CIRCULATION
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            Formed Elements, Coagulation Cascade, Cardiac Bioenergetics, Nodal ECG &amp; Pathophysiology
          </p>
        </div>
      </div>

      {/* ════════════ NAVIGATION TAB SWITCHER ════════════ */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-slate-100/90 rounded-xl sm:rounded-2xl border border-slate-200 w-full max-w-4xl mx-auto">
        <button
          onClick={() => setActiveTab("blood")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "blood"
              ? "bg-white text-rose-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Droplet className="w-3.5 h-3.5 text-rose-600 shrink-0" />
          <span>Formed Elements &amp; ABO</span>
        </button>

        <button
          onClick={() => setActiveTab("clotting")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "clotting"
              ? "bg-white text-rose-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Shield className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Coagulation Cascade</span>
        </button>

        <button
          onClick={() => setActiveTab("cardiacCycle")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "cardiacCycle"
              ? "bg-white text-rose-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Heart className="w-3.5 h-3.5 text-rose-600 shrink-0" />
          <span>Cardiac Cycle (0.8s)</span>
        </button>

        <button
          onClick={() => setActiveTab("ecg")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "ecg"
              ? "bg-white text-rose-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span>Nodal Conduction &amp; ECG</span>
        </button>

        <button
          onClick={() => setActiveTab("disorders")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "disorders"
              ? "bg-white text-rose-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Stethoscope className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Cardio Disorders</span>
        </button>
      </div>

      {/* ════════════ TAB 1: FORMED ELEMENTS & BLOOD GROUPING ════════════ */}
      {activeTab === "blood" && (
        <div className="space-y-4 sm:space-y-6 w-full">
          {/* WBC Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2 max-w-4xl mx-auto w-full">
            {Object.keys(wbcDatabase).map((key) => {
              const w = wbcDatabase[key];
              const isSelected = selectedWbc === key;

              return (
                <button
                  key={key}
                  onClick={() => setSelectedWbc(key)}
                  className={`p-2 sm:p-2.5 rounded-xl border-2 text-[11px] sm:text-xs font-extrabold transition-all text-center flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? "bg-slate-900 text-white border-rose-500 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className="truncate w-full text-center">{w.name.split(" ")[0]}</span>
                  <span
                    className={`text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full font-black ${
                      w.category === "Granulocyte"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-indigo-100 text-indigo-800"
                    }`}
                  >
                    {w.abundance.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active WBC Card */}
          <div className="p-3 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-rose-200/90 shadow-2xs space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200">
                  {currentWbc.category}
                </span>
                <h4 className="text-base sm:text-xl font-black text-slate-900 tracking-tight mt-1">
                  {currentWbc.name}
                </h4>
              </div>

              <div className="sm:text-right">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase">Abundance in Blood</span>
                <span className="text-xs sm:text-sm font-black text-rose-600 font-mono">{currentWbc.abundance}</span>
              </div>
            </div>

            {/* Quick Morphometric Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[9px] sm:text-[10px] font-black uppercase text-rose-700 tracking-wider block">
                  Nuclear Morphology
                </span>
                <p className="text-xs font-extrabold text-slate-900">{currentWbc.nucleusShape}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[9px] sm:text-[10px] font-black uppercase text-indigo-700 tracking-wider block">
                  Cytoplasmic Granules &amp; Staining
                </span>
                <p className="text-xs font-semibold text-slate-800">{currentWbc.staining}</p>
              </div>
            </div>

            {/* Function & Clinical */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h5 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-700">
                Primary Physiological Mechanism
              </h5>
              <p className="text-xs font-semibold text-slate-900 leading-relaxed">
                {currentWbc.function}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1">
              <h5 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-800">
                Diagnostic &amp; Clinical Relevance
              </h5>
              <p className="text-xs font-semibold text-amber-950 leading-relaxed">
                {currentWbc.clinicalSignificance}
              </p>
            </div>
          </div>

          {/* ABO & Rh Grouping Matrix Interactive */}
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3 sm:space-y-4 max-w-4xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-rose-600 shrink-0" />
                ABO &amp; Rh BLOOD GROUP COMPATIBILITY
              </h4>
              <div className="grid grid-cols-4 gap-1 self-start sm:self-auto">
                {(["A", "B", "AB", "O"] as const).map((grp) => (
                  <button
                    key={grp}
                    onClick={() => setAboBloodGroup(grp)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                      aboBloodGroup === grp
                        ? "bg-rose-600 text-white shadow-2xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Group {grp}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block">RBC Surface Antigens</span>
                <p className="text-xs font-black text-slate-900">
                  {aboBloodGroup === "A" && "Antigen A"}
                  {aboBloodGroup === "B" && "Antigen B"}
                  {aboBloodGroup === "AB" && "Antigen A & Antigen B"}
                  {aboBloodGroup === "O" && "NONE (Universal Donor)"}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block">Plasma Antibodies</span>
                <p className="text-xs font-black text-slate-900">
                  {aboBloodGroup === "A" && "Anti-B"}
                  {aboBloodGroup === "B" && "Anti-A"}
                  {aboBloodGroup === "AB" && "NONE (Universal Recipient)"}
                  {aboBloodGroup === "O" && "Anti-A & Anti-B"}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
                <span className="text-[9px] sm:text-[10px] font-bold text-rose-800 uppercase block">Transfusion Safety</span>
                <p className="text-xs font-black text-rose-950">
                  {aboBloodGroup === "A" && "Can receive from: A, O | Can donate to: A, AB"}
                  {aboBloodGroup === "B" && "Can receive from: B, O | Can donate to: B, AB"}
                  {aboBloodGroup === "AB" && "Can receive from: ALL (A, B, AB, O) | Donate to: AB"}
                  {aboBloodGroup === "O" && "Can donate to: ALL (Universal Donor) | Receive: O only"}
                </p>
              </div>
            </div>

            {/* Erythroblastosis Fetalis Callout */}
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-rose-50 border border-rose-300 space-y-1.5">
              <div className="flex items-center gap-1.5 text-rose-900 font-extrabold text-xs">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>ERYTHROBLASTOSIS FETALIS (Rh INCOMPATIBILITY CASCADE)</span>
              </div>
              <p className="text-xs text-rose-950 font-bold leading-relaxed">
                Occurs when an <strong>Rh⁻ mother</strong> carries a <strong>second Rh⁺ fetus</strong>. Maternal anti-Rh IgG antibodies cross the placenta to destroy fetal erythrocytes. Prevented by administering <strong>RhoGAM (Anti-D Immunoglobulin)</strong> to the mother immediately after the first Rh⁺ delivery.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 2: BLOOD COAGULATION CASCADE ════════════ */}
      {activeTab === "clotting" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          {/* Step-by-Step Pathway Card */}
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-amber-200 shadow-2xs space-y-4">
            <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-amber-600 shrink-0" />
              THE ENZYMATIC BLOOD COAGULATION CASCADE
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Extrinsic */}
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-amber-200 text-amber-900">
                  Extrinsic Pathway (Rapid)
                </span>
                <h5 className="text-xs sm:text-sm font-black text-slate-900">Traumatized Tissue</h5>
                <p className="text-[11px] sm:text-xs text-slate-700 font-medium">
                  Releases <strong>Tissue Thromboplastin (Factor III)</strong> upon physical vascular injury.
                </p>
              </div>

              {/* Intrinsic */}
              <div className="p-3 rounded-xl bg-indigo-50/80 border border-indigo-200 space-y-1">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-indigo-200 text-indigo-900">
                  Intrinsic Pathway (Contact)
                </span>
                <h5 className="text-xs sm:text-sm font-black text-slate-900">Foreign Surface Contact</h5>
                <p className="text-[11px] sm:text-xs text-slate-700 font-medium">
                  Collagen contact activates <strong>Factor XII (Hageman Factor)</strong> cascade inside blood vessels.
                </p>
              </div>
            </div>

            <div className="flex justify-center text-amber-500 -my-1.5">
              <ChevronRight className="w-5 h-5 rotate-90" />
            </div>

            {/* Common Pathway */}
            <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-2">
              <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-amber-400 text-slate-950">
                Common Pathway Convergence
              </span>
              <div className="space-y-1.5 text-xs font-mono">
                <p className="text-amber-300">1. Factor X ➔ Factor Xa (Active Stuart Factor)</p>
                <p className="text-emerald-300 font-bold">2. Prothrombinase Complex (Factor Xa + Va + Ca²⁺ + Phospholipids)</p>
                <p className="text-rose-300">3. Prothrombin (Factor II) ──[Prothrombinase]──► Thrombin (Factor IIa)</p>
                <p className="text-white font-black">4. Fibrinogen (Factor I) ──[Thrombin]──► Fibrin Monomers ──[Factor XIIIa + Ca²⁺]──► INSOLUBLE FIBRIN CLOT</p>
              </div>
            </div>

            {/* Vitamin K Clotting Factors Callout */}
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
              <h5 className="text-xs font-black text-emerald-950">
                VITAMIN K-DEPENDENT CLOTTING FACTORS
              </h5>
              <p className="text-xs text-emerald-900 font-semibold leading-relaxed">
                Hepatic synthesis of <strong>Factors II (Prothrombin), VII, IX (Christmas), and X</strong> strictly requires Vitamin K for post-translational gamma-carboxylation (Mnemonic: <em>2 + 7 = 9, then 10</em>).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 3: CARDIAC CYCLE & BIOENERGETICS ════════════ */}
      {activeTab === "cardiacCycle" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          {/* Phase Controller */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl sm:rounded-2xl border border-slate-200 max-w-2xl mx-auto w-full">
            <button
              onClick={() => setCardiacPhase("jointDiastole")}
              className={`py-1.5 rounded-lg text-[10px] sm:text-xs font-black transition-all ${
                cardiacPhase === "jointDiastole" ? "bg-rose-600 text-white shadow-2xs" : "text-slate-600"
              }`}
            >
              Joint Diastole (0.4s)
            </button>
            <button
              onClick={() => setCardiacPhase("atrialSystole")}
              className={`py-1.5 rounded-lg text-[10px] sm:text-xs font-black transition-all ${
                cardiacPhase === "atrialSystole" ? "bg-rose-600 text-white shadow-2xs" : "text-slate-600"
              }`}
            >
              Atrial Systole (0.1s)
            </button>
            <button
              onClick={() => setCardiacPhase("ventricularSystole")}
              className={`py-1.5 rounded-lg text-[10px] sm:text-xs font-black transition-all ${
                cardiacPhase === "ventricularSystole" ? "bg-rose-600 text-white shadow-2xs" : "text-slate-600"
              }`}
            >
              Vent. Systole (0.3s)
            </button>
            <button
              onClick={() => setCardiacPhase("ventricularDiastole")}
              className={`py-1.5 rounded-lg text-[10px] sm:text-xs font-black transition-all ${
                cardiacPhase === "ventricularDiastole" ? "bg-rose-600 text-white shadow-2xs" : "text-slate-600"
              }`}
            >
              Vent. Diastole (0.5s)
            </button>
          </div>

          {/* Phase Detail Card */}
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-rose-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase bg-rose-100 text-rose-900">
                {cardiacPhase === "jointDiastole" && "Phase 1 • 0.4 Seconds"}
                {cardiacPhase === "atrialSystole" && "Phase 2 • 0.1 Seconds"}
                {cardiacPhase === "ventricularSystole" && "Phase 3 • 0.3 Seconds"}
                {cardiacPhase === "ventricularDiastole" && "Phase 4 • 0.5 Seconds"}
              </span>
              <span className="text-xs font-mono font-bold text-rose-600">Total Cycle = 0.8 s (75 bpm)</span>
            </div>

            <h4 className="text-sm sm:text-base font-black text-slate-900">
              {cardiacPhase === "jointDiastole" && "JOINT DIASTOLE (Complete Cardiac Relaxation)"}
              {cardiacPhase === "atrialSystole" && "ATRIAL SYSTOLE (Active Atrial Contraction)"}
              {cardiacPhase === "ventricularSystole" && "VENTRICULAR SYSTOLE (Active Ventricular Pumping)"}
              {cardiacPhase === "ventricularDiastole" && "VENTRICULAR DIASTOLE (Isovolumetric Relaxation)"}
            </h4>

            <p className="text-xs text-slate-700 font-semibold leading-relaxed">
              {cardiacPhase === "jointDiastole" && "All 4 chambers are relaxed. AV valves (Tricuspid/Bicuspid) are OPEN while Semilunar valves are CLOSED. Blood flows passively from great veins into atria and ventricles (70% passive ventricular filling)."}
              {cardiacPhase === "atrialSystole" && "SA Node fires, causing both atria to contract simultaneously. This pushes the remaining 30% of blood into ventricles ('Atrial Kick'), reaching End-Diastolic Volume (EDV ≈ 120 mL)."}
              {cardiacPhase === "ventricularSystole" && "Ventricles contract. Rapid pressure surge closes AV valves producing FIRST HEART SOUND ('LUB'). When pressure exceeds arterial pressure, Semilunar valves open, ejecting Stroke Volume (SV ≈ 70 mL)."}
              {cardiacPhase === "ventricularDiastole" && "Ventricles relax. Ventricular pressure drops below arterial pressure, snapping Semilunar valves shut to produce SECOND HEART SOUND ('DUP'). AV valves reopen when ventricular pressure falls below atrial pressure."}
            </p>
          </div>

          {/* Cardiac Output Bioenergetics Grid */}
          <div className="p-3.5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-rose-950 text-white shadow-md space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-rose-800 pb-2.5">
              <h4 className="text-xs sm:text-sm font-extrabold text-rose-300 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-rose-400 shrink-0" /> VOLUMETRIC BIOENERGETICS &amp; CARDIAC OUTPUT
              </h4>
              <span className="text-[10px] sm:text-xs font-mono bg-rose-900 text-rose-200 px-2 py-0.5 rounded-full border border-rose-700 self-start sm:self-auto">
                CO = SV × HR = 5040 mL/min
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-rose-800/80 space-y-1">
                <span className="text-[10px] font-black uppercase text-rose-400 block">End-Diastolic Vol (EDV)</span>
                <p className="text-sm font-black text-white">120 mL</p>
                <p className="text-[10px] text-slate-300">Volume at end of filling</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-rose-800/80 space-y-1">
                <span className="text-[10px] font-black uppercase text-amber-400 block">End-Systolic Vol (ESV)</span>
                <p className="text-sm font-black text-white">50 mL</p>
                <p className="text-[10px] text-slate-300">Residual volume after beat</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-emerald-800/80 space-y-1">
                <span className="text-[10px] font-black uppercase text-emerald-400 block">Stroke Volume (SV)</span>
                <p className="text-sm font-black text-emerald-300">70 mL / beat</p>
                <p className="text-[10px] text-slate-300">SV = EDV - ESV</p>
              </div>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed pt-1 border-t border-rose-800/80">
              <strong className="text-rose-400">Frank-Starling Law:</strong> Increased venous return stretches ventricular myocardium (higher EDV), generating a more forceful contraction and boosting Stroke Volume.
            </p>
          </div>
        </div>
      )}

      {/* ════════════ TAB 4: NODAL CONDUCTION & ECG ════════════ */}
      {activeTab === "ecg" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          {/* Nodal Conduction Pathway */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-indigo-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-indigo-600 shrink-0" />
              MYOGENIC NODAL CONDUCTION SYSTEM
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs font-semibold">
              <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 space-y-0.5">
                <span className="text-[9px] font-black text-indigo-700 uppercase">1. SA Node</span>
                <p className="text-slate-900 font-bold">Pacemaker (70–75 bpm)</p>
                <p className="text-[10px] text-slate-600">Upper right Right Atrium</p>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 space-y-0.5">
                <span className="text-[9px] font-black text-amber-700 uppercase">2. AV Node</span>
                <p className="text-slate-900 font-bold">Pacesetter (0.1s Delay)</p>
                <p className="text-[10px] text-slate-600">Lower left Right Atrium</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="text-[9px] font-black text-slate-700 uppercase">3. Bundle of His</span>
                <p className="text-slate-900 font-bold">AV Bundle Branches</p>
                <p className="text-[10px] text-slate-600">Interventricular Septum</p>
              </div>

              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 space-y-0.5">
                <span className="text-[9px] font-black text-rose-700 uppercase">4. Purkinje Fibers</span>
                <p className="text-slate-900 font-bold">Fastest (≈ 4 m/s)</p>
                <p className="text-[10px] text-slate-600">Ventricular Myocardium</p>
              </div>
            </div>
          </div>

          {/* ECG Waveform Interpretation */}
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-rose-600 shrink-0" />
              STANDARD ECG WAVEFORM COMPONENTS &amp; DIAGNOSTIC RULES
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-indigo-100 text-indigo-900">
                  P Wave
                </span>
                <h5 className="text-xs font-black text-slate-900">Atrial Depolarization</h5>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Electrical excitation spreading from SA node across atria; precedes atrial contraction.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-rose-200 space-y-1">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-rose-100 text-rose-900">
                  QRS Complex
                </span>
                <h5 className="text-xs font-black text-slate-900">Ventricular Depolarization</h5>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Rapid spread through Purkinje fibers triggering ventricular systole. <strong>Counting QRS determines Heart Rate!</strong>
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-100 text-emerald-900">
                  T Wave
                </span>
                <h5 className="text-xs font-black text-slate-900">Ventricular Repolarization</h5>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Recovery of ventricular myocardium from excited to resting state; marks end of systole.
                </p>
              </div>
            </div>

            {/* ST Elevation Callout */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 font-semibold space-y-0.5">
              <strong className="text-amber-900">Clinical ECG Trap:</strong> Sustained <strong>ST-Segment Elevation (STEMI)</strong> indicates acute transmural Myocardial Infarction (Heart Attack), whereas prolonged P-R interval indicates AV Block.
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 5: CARDIOVASCULAR DISORDERS ════════════ */}
      {activeTab === "disorders" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3 sm:space-y-4">
            <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-rose-600 shrink-0" />
              PATHOPHYSIOLOGY OF CARDIOVASCULAR DISORDERS
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
                <h5 className="text-xs sm:text-sm font-black text-rose-950">HYPERTENSION (&gt;140/90 mmHg)</h5>
                <p className="text-[11px] sm:text-xs text-rose-900 font-semibold leading-relaxed">
                  Persistent elevation of arterial blood pressure above normal (120/80). Damages kidneys, retina, and increases risk of stroke and heart failure.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <h5 className="text-xs sm:text-sm font-black text-amber-950">CORONARY ARTERY DISEASE (CAD / Atherosclerosis)</h5>
                <p className="text-[11px] sm:text-xs text-amber-900 font-semibold leading-relaxed">
                  Sub-endothelial deposition of cholesterol, fat, calcium, and fibrous tissue narrowing coronary arterial lumens.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 space-y-1">
                <h5 className="text-xs sm:text-sm font-black text-indigo-950">ANGINA PECTORIS</h5>
                <p className="text-[11px] sm:text-xs text-indigo-900 font-semibold leading-relaxed">
                  Transient, crushing substernal chest pain radiating to the left arm due to acute myocardial ischemia without permanent cell death.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 text-white space-y-1">
                <h5 className="text-xs sm:text-sm font-black text-rose-400">MYOCARDIAL INFARCTION (Heart Attack)</h5>
                <p className="text-[11px] sm:text-xs text-slate-300 font-semibold leading-relaxed">
                  Sudden ischemic necrosis of a region of myocardium due to complete coronary thrombotic occlusion (elevated cardiac troponin).
                </p>
              </div>
            </div>

            {/* Heart Failure vs Arrest Golden Rule */}
            <div className="p-3 rounded-xl bg-slate-100 border border-slate-300 text-xs text-slate-900 space-y-1">
              <p><strong>• Heart Failure:</strong> The heart fails to pump blood effectively to meet metabolic demand (symptom is pulmonary congestion).</p>
              <p><strong>• Cardiac Arrest:</strong> Complete cessation of electrical and mechanical pumping (heart stops beating completely).</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyFluidsAndCirculationDiagram;
