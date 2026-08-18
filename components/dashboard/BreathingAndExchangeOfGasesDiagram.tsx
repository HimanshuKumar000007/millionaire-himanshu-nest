"use client";

import React, { useState } from "react";
import {
  Wind,
  Activity,
  Layers,
  BrainCircuit,
  AlertTriangle,
  CheckCircle2,
  Scale,
  Sparkles,
  RefreshCw,
  TrendingUp,
  Microscope,
  Zap,
  Award,
  ChevronRight,
  Stethoscope,
  Gauge,
  Flame,
} from "lucide-react";

// ============================================================================
// DATA & STRUCTURES
// ============================================================================

export interface LungVolumeData {
  id: string;
  name: string;
  abbreviation: string;
  normalValue: string;
  definition: string;
  formula: string;
  isSpirometerMeasurable: boolean;
  clinicalSignificance: string;
  category: "Volume" | "Capacity";
}

const lungVolumesDatabase: Record<string, LungVolumeData> = {
  tv: {
    id: "tv",
    name: "Tidal Volume",
    abbreviation: "TV",
    normalValue: "500 mL (6000–8000 mL/min)",
    definition: "Volume of air inspired or expired during a normal quiet breathing cycle at rest.",
    formula: "TV = 500 mL",
    isSpirometerMeasurable: true,
    clinicalSignificance: "Reduces in restrictive lung diseases; increased in metabolic acidosis compensation.",
    category: "Volume",
  },
  irv: {
    id: "irv",
    name: "Inspiratory Reserve Volume",
    abbreviation: "IRV",
    normalValue: "2500–3000 mL",
    definition: "Additional maximal volume of air that can be inspired forcibly beyond normal tidal inspiration.",
    formula: "IRV = IC - TV",
    isSpirometerMeasurable: true,
    clinicalSignificance: "Reflects pulmonary compliance and inspiratory muscle strength (diaphragm + EIM).",
    category: "Volume",
  },
  erv: {
    id: "erv",
    name: "Expiratory Reserve Volume",
    abbreviation: "ERV",
    normalValue: "1000–1100 mL",
    definition: "Additional maximal volume of air that can be expired forcibly beyond normal tidal expiration.",
    formula: "ERV = FRC - RV = EC - TV",
    isSpirometerMeasurable: true,
    clinicalSignificance: "Reduced in obesity, ascites, and conditions pushing abdominal contents upward.",
    category: "Volume",
  },
  rv: {
    id: "rv",
    name: "Residual Volume",
    abbreviation: "RV",
    normalValue: "1100–1200 mL",
    definition: "Volume of air remaining in the lungs even after a maximal forced expiration.",
    formula: "RV = FRC - ERV = TLC - VC",
    isSpirometerMeasurable: false,
    clinicalSignificance: "CRITICAL: Cannot be measured by spirometry! Markedly increased in Emphysema due to air trapping.",
    category: "Volume",
  },
  ic: {
    id: "ic",
    name: "Inspiratory Capacity",
    abbreviation: "IC",
    normalValue: "3000–3500 mL",
    definition: "Total volume of air a person can inspire after a normal tidal expiration.",
    formula: "IC = TV + IRV",
    isSpirometerMeasurable: true,
    clinicalSignificance: "Evaluates maximum inspiratory effort.",
    category: "Capacity",
  },
  frc: {
    id: "frc",
    name: "Functional Residual Capacity",
    abbreviation: "FRC",
    normalValue: "2100–2300 mL",
    definition: "Volume of air remaining in the lungs after a normal quiet tidal expiration.",
    formula: "FRC = ERV + RV",
    isSpirometerMeasurable: false,
    clinicalSignificance: "CRITICAL: Cannot be measured by spirometry! Acts as a buffer to maintain continuous alveolar gas exchange.",
    category: "Capacity",
  },
  vc: {
    id: "vc",
    name: "Vital Capacity",
    abbreviation: "VC",
    normalValue: "3500–4500 mL",
    definition: "Maximum volume of air a person can expire after a maximal forced inspiration.",
    formula: "VC = ERV + TV + IRV",
    isSpirometerMeasurable: true,
    clinicalSignificance: "Higher in athletes and non-smokers; severely decreased in neuromuscular disorders and pulmonary fibrosis.",
    category: "Capacity",
  },
  tlc: {
    id: "tlc",
    name: "Total Lung Capacity",
    abbreviation: "TLC",
    normalValue: "5700–6000 mL",
    definition: "Total volume of air accommodated in the lungs at the end of a maximal forced inspiration.",
    formula: "TLC = VC + RV = IC + FRC",
    isSpirometerMeasurable: false,
    clinicalSignificance: "CRITICAL: Cannot be measured by spirometry! Increased in COPD (hyperinflation) and decreased in restrictive diseases.",
    category: "Capacity",
  },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const BreathingAndExchangeOfGasesDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"spirometry" | "curve" | "transport" | "regulation">(
    "spirometry"
  );
  const [selectedVolKey, setSelectedVolKey] = useState<string>("vc");
  const [curveShift, setCurveShift] = useState<"Normal" | "Right" | "Left">("Normal");
  const [exchangeSite, setExchangeSite] = useState<"alveoli" | "tissues">("alveoli");

  const currentVol = lungVolumesDatabase[selectedVolKey];

  return (
    <div className="my-4 sm:my-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-slate-50 to-indigo-50/20 border border-slate-200/90 p-2.5 sm:p-7 shadow-xs space-y-4 sm:space-y-6 select-none w-full">
      {/* ════════════ TOP HERO HEADER ════════════ */}
      <div className="flex flex-col items-center text-center space-y-2.5 max-w-2xl mx-auto w-full">
        <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200 shadow-2xs flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#4F46E5]" />
          HUMAN PHYSIOLOGY INTERACTIVE MODULE
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <Wind className="w-5 h-5 sm:w-6 sm:h-6 text-[#4F46E5] shrink-0" />
            BREATHING &amp; GAS EXCHANGE PHYSIOLOGY
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            Spirometry, Bohr &amp; Haldane Effects, Chloride Shift, &amp; Respiratory Regulation
          </p>
        </div>
      </div>

      {/* ════════════ NAVIGATION TAB SWITCHER ════════════ */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-slate-100/90 rounded-xl sm:rounded-2xl border border-slate-200 w-full max-w-3xl mx-auto">
        <button
          onClick={() => setActiveTab("spirometry")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "spirometry"
              ? "bg-white text-indigo-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Gauge className="w-3.5 h-3.5 text-[#4F46E5] shrink-0" />
          <span>Spirometry Volumes</span>
        </button>

        <button
          onClick={() => setActiveTab("curve")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "curve"
              ? "bg-white text-indigo-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-rose-600 shrink-0" />
          <span>Hb-O₂ Curve &amp; Bohr</span>
        </button>

        <button
          onClick={() => setActiveTab("transport")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "transport"
              ? "bg-white text-indigo-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Gas Transport &amp; Cl⁻ Shift</span>
        </button>

        <button
          onClick={() => setActiveTab("regulation")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "regulation"
              ? "bg-white text-indigo-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <BrainCircuit className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Neural Control &amp; COPD</span>
        </button>
      </div>

      {/* ════════════ TAB 1: SPIROMETRY & RESPIRATORY VOLUMES ════════════ */}
      {activeTab === "spirometry" && (
        <div className="space-y-4 sm:space-y-6 w-full">
          {/* Volume Selector Buttons */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 sm:gap-2 max-w-4xl mx-auto w-full">
            {Object.keys(lungVolumesDatabase).map((key) => {
              const item = lungVolumesDatabase[key];
              const isSelected = selectedVolKey === key;

              return (
                <button
                  key={key}
                  onClick={() => setSelectedVolKey(key)}
                  className={`p-2 sm:p-2.5 rounded-xl border-2 text-[11px] sm:text-xs font-extrabold transition-all text-center flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? "bg-indigo-950 text-white border-indigo-500 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className="font-black text-xs sm:text-sm">{item.abbreviation}</span>
                  <span
                    className={`text-[8px] sm:text-[9px] px-1 py-0.5 rounded-full font-black ${
                      item.category === "Volume"
                        ? "bg-indigo-100 text-indigo-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {item.category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Volume Card */}
          <div className="p-3 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-indigo-200/90 shadow-2xs space-y-4 sm:space-y-5 max-w-4xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200">
                    {currentVol.category}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-wider ${
                      currentVol.isSpirometerMeasurable
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-rose-100 text-rose-800 border border-rose-200"
                    }`}
                  >
                    {currentVol.isSpirometerMeasurable ? "Spirometry Measurable" : "NOT Spirometry Measurable"}
                  </span>
                </div>
                <h4 className="text-base sm:text-xl font-black text-slate-900 tracking-tight mt-1">
                  {currentVol.name} ({currentVol.abbreviation})
                </h4>
              </div>

              <div className="sm:text-right">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase">Normal Value</span>
                <span className="text-xs sm:text-sm font-black text-[#4F46E5] font-mono">{currentVol.normalValue}</span>
              </div>
            </div>

            {/* Formula & Definition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[9px] sm:text-[10px] font-black uppercase text-indigo-700 tracking-wider block">
                  Diagnostic Calculation Formula
                </span>
                <p className="text-xs font-mono font-black text-slate-900">{currentVol.formula}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[9px] sm:text-[10px] font-black uppercase text-purple-700 tracking-wider block">
                  Physiological Definition
                </span>
                <p className="text-xs font-semibold text-slate-800 leading-snug">{currentVol.definition}</p>
              </div>
            </div>

            {/* Clinical Significance */}
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-1">
              <h5 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Clinical &amp; Diagnostic Relevance
              </h5>
              <p className="text-xs font-semibold text-emerald-950 leading-relaxed">
                {currentVol.clinicalSignificance}
              </p>
            </div>

            {/* Spirometry NEST Golden Trap */}
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50 border border-amber-300 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-900 font-extrabold text-xs">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>NEST CRITICAL SPIROMETRY TRAP</span>
              </div>
              <p className="text-xs text-amber-950 font-bold leading-relaxed">
                Any parameter that includes <strong>Residual Volume (RV)</strong>—namely <strong>RV, FRC (ERV + RV), and TLC (VC + RV)</strong>—CANNOT be directly measured using standard spirometry because residual air never leaves the lungs!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 2: OXYGEN DISSOCIATION CURVE & BOHR EFFECT ════════════ */}
      {activeTab === "curve" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          {/* Shift State Controller */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl sm:rounded-2xl border border-slate-200 max-w-md mx-auto w-full">
            <button
              onClick={() => setCurveShift("Left")}
              className={`py-1.5 rounded-lg text-[10px] sm:text-xs font-black transition-all ${
                curveShift === "Left" ? "bg-indigo-600 text-white shadow-2xs" : "text-slate-600"
              }`}
            >
              Left Shift (Loading)
            </button>
            <button
              onClick={() => setCurveShift("Normal")}
              className={`py-1.5 rounded-lg text-[10px] sm:text-xs font-black transition-all ${
                curveShift === "Normal" ? "bg-slate-900 text-white shadow-2xs" : "text-slate-600"
              }`}
            >
              Normal (P₅₀ = 26.6)
            </button>
            <button
              onClick={() => setCurveShift("Right")}
              className={`py-1.5 rounded-lg text-[10px] sm:text-xs font-black transition-all ${
                curveShift === "Right" ? "bg-rose-600 text-white shadow-2xs" : "text-slate-600"
              }`}
            >
              Right Shift (Bohr Effect)
            </button>
          </div>

          {/* Interactive State Card */}
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span
                  className={`px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-wider ${
                    curveShift === "Right"
                      ? "bg-rose-100 text-rose-900 border border-rose-200"
                      : curveShift === "Left"
                      ? "bg-indigo-100 text-indigo-900 border border-indigo-200"
                      : "bg-slate-100 text-slate-900 border border-slate-200"
                  }`}
                >
                  {curveShift === "Right" ? "BOHR EFFECT (O₂ Unloading at Tissues)" : curveShift === "Left" ? "HALDANE / ALVEOLAR STATE (O₂ Loading)" : "BASELINE RESTING PHYSIOLOGY"}
                </span>
                <h4 className="text-base sm:text-xl font-black text-slate-900 tracking-tight mt-1">
                  {curveShift === "Right" ? "Rightward Shift (Decreased O₂ Affinity / ↑ P₅₀)" : curveShift === "Left" ? "Leftward Shift (Increased O₂ Affinity / ↓ P₅₀)" : "Normal Sigmoid Hemoglobin Dissociation Curve"}
                </h4>
              </div>

              <div className="sm:text-right">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase">P₅₀ Parameter</span>
                <span className="text-xs sm:text-sm font-mono font-black text-slate-900">
                  {curveShift === "Right" ? "> 26.6 mmHg" : curveShift === "Left" ? "< 26.6 mmHg" : "≈ 26.6 mmHg"}
                </span>
              </div>
            </div>

            {/* Contributing Physiological Triggers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-0.5">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block">pCO₂</span>
                <span className={`text-xs font-black ${curveShift === "Right" ? "text-rose-600" : curveShift === "Left" ? "text-indigo-600" : "text-slate-800"}`}>
                  {curveShift === "Right" ? "HIGH (↑)" : curveShift === "Left" ? "LOW (↓)" : "40 mmHg"}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-0.5">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block">H⁺ / pH</span>
                <span className={`text-xs font-black ${curveShift === "Right" ? "text-rose-600" : curveShift === "Left" ? "text-indigo-600" : "text-slate-800"}`}>
                  {curveShift === "Right" ? "↑ H⁺ (Acidosis)" : curveShift === "Left" ? "↓ H⁺ (Alkalosis)" : "pH = 7.4"}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-0.5">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block">Temperature</span>
                <span className={`text-xs font-black ${curveShift === "Right" ? "text-rose-600" : curveShift === "Left" ? "text-indigo-600" : "text-slate-800"}`}>
                  {curveShift === "Right" ? "HIGH (↑ Temp)" : curveShift === "Left" ? "LOW (↓ Temp)" : "37°C"}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-0.5">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block">2,3-BPG / HbF</span>
                <span className={`text-xs font-black ${curveShift === "Right" ? "text-rose-600" : curveShift === "Left" ? "text-indigo-600" : "text-slate-800"}`}>
                  {curveShift === "Right" ? "HIGH (↑ 2,3-BPG)" : curveShift === "Left" ? "Fetal Hb (α₂γ₂)" : "Normal"}
                </span>
              </div>
            </div>

            {/* Physiological Significance Box */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h5 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-700">
                Physiological Mechanism &amp; Outcome
              </h5>
              <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                {curveShift === "Right" && "At exercising tissues, high pCO₂, lactic acidosis, and heat stabilize deoxyhemoglobin's T-state, causing oxygen to dissociate readily from Hb and diffuse into working cells."}
                {curveShift === "Left" && "In alveolar capillaries, cool temperatures and low pCO₂ stabilize the R-state of Hb, maximizing oxygen loading. Fetal Hb (HbF, α₂γ₂) binds 2,3-BPG poorly, giving it a left-shifted curve to extract O₂ from maternal blood across the placenta."}
                {curveShift === "Normal" && "At rest, 100 mL of oxygenated arterial blood carries ≈ 20 mL of O₂ and delivers ≈ 5 mL of O₂ to peripheral tissues (25% extraction ratio)."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 3: GAS TRANSPORT & THE CHLORIDE SHIFT ════════════ */}
      {activeTab === "transport" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          {/* Site Switcher */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl sm:rounded-2xl border border-slate-200 max-w-md mx-auto w-full">
            <button
              onClick={() => setExchangeSite("tissues")}
              className={`py-1.5 rounded-lg text-[10px] sm:text-xs font-black transition-all ${
                exchangeSite === "tissues" ? "bg-emerald-600 text-white shadow-2xs" : "text-slate-600"
              }`}
            >
              Tissue Capillaries (Cl⁻ Influx)
            </button>
            <button
              onClick={() => setExchangeSite("alveoli")}
              className={`py-1.5 rounded-lg text-[10px] sm:text-xs font-black transition-all ${
                exchangeSite === "alveoli" ? "bg-indigo-600 text-white shadow-2xs" : "text-slate-600"
              }`}
            >
              Alveolar Capillaries (Reverse Shift)
            </button>
          </div>

          {/* Transport Modes 3-Card Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 shadow-2xs">
              <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-slate-100 text-slate-800">
                7% of Total CO₂
              </span>
              <h5 className="text-xs sm:text-sm font-black text-slate-900">Dissolved in Plasma</h5>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
                Physically dissolved as simple carbonic solution. (CO₂ solubility is 20–25× higher than O₂).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 shadow-2xs">
              <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-purple-100 text-purple-800">
                20–25% of Total CO₂
              </span>
              <h5 className="text-xs sm:text-sm font-black text-slate-900">Carbamino-Hemoglobin</h5>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
                Bound reversibly to N-terminal amino groups of globin chains (Hb-NH-COOH).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-emerald-200 space-y-1 shadow-2xs">
              <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-100 text-emerald-800">
                70% of Total CO₂
              </span>
              <h5 className="text-xs sm:text-sm font-black text-slate-900">Bicarbonate (HCO₃⁻)</h5>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
                Converted inside RBCs by Carbonic Anhydrase (Zn²⁺) and transported in plasma.
              </p>
            </div>
          </div>

          {/* Chloride Shift Step-by-Step Box */}
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-emerald-200 shadow-2xs space-y-3 sm:space-y-4">
            <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-emerald-600 shrink-0" />
              {exchangeSite === "tissues" ? "THE HAMBURGER PHENOMENON (CHLORIDE SHIFT AT TISSUES)" : "REVERSAL OF CHLORIDE SHIFT AT ALVEOLI"}
            </h4>

            {exchangeSite === "tissues" ? (
              <div className="space-y-2 text-xs text-slate-800 font-semibold leading-relaxed">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>1. CO₂ Influx:</strong> Metabolic CO₂ (pCO₂ ≥ 45 mmHg) diffuses from tissues across capillary endothelium into RBCs.
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>2. Bicarbonate Formation:</strong> Carbonic Anhydrase (Zn²⁺) hydrates CO₂ + H₂O ➔ H₂CO₃ ➔ H⁺ + HCO₃⁻. (H⁺ is buffered by deoxy-Hb).
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 font-bold text-emerald-950">
                  <strong>3. Cl⁻ Influx:</strong> HCO₃⁻ diffuses OUT of RBC into plasma via AE1 (Band 3). To maintain electrical neutrality, Chloride (Cl⁻) moves INTO the RBC.
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-xs text-slate-800 font-semibold leading-relaxed">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>1. Chloride Efflux:</strong> In pulmonary capillaries, low pCO₂ (40 mmHg) drives Cl⁻ OUT of RBCs back into plasma.
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>2. CO₂ Regeneration:</strong> HCO₃⁻ enters RBCs and is converted by Carbonic Anhydrase back to CO₂ + H₂O.
                </div>
                <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 font-bold text-indigo-950">
                  <strong>3. Haldane Effect:</strong> O₂ binding to Hb at alveoli decreases Hb affinity for CO₂, displacing carbamino-CO₂ into alveolar air.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ════════════ TAB 4: NEURAL REGULATION & DISORDERS ════════════ */}
      {activeTab === "regulation" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          {/* Neural Centers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-indigo-200 shadow-2xs space-y-2">
              <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase bg-indigo-100 text-indigo-800">
                Brainstem Rhythm Generator
              </span>
              <h4 className="text-sm sm:text-base font-black text-slate-900">MEDULLARY RHYTHM CENTER</h4>
              <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                • <strong>Dorsal Respiratory Group (DRG):</strong> Generates baseline quiet inspiratory rhythm.<br />
                • <strong>Ventral Respiratory Group (VRG):</strong> Active during forced inspiration &amp; expiration.
              </p>
            </div>

            <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-2">
              <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase bg-amber-100 text-amber-800">
                Pons Switch-Off Mechanism
              </span>
              <h4 className="text-sm sm:text-base font-black text-slate-900">PNEUMOTAXIC CENTER (Upper Pons)</h4>
              <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                Sends inhibitory signals to DRG to <strong>switch off inspiration</strong>, shortening inspiratory duration and increasing the respiratory rate.
              </p>
            </div>
          </div>

          {/* Respiratory Disorders Matrix */}
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3 sm:space-y-4">
            <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-rose-600 shrink-0" />
              RESPIRATORY PATHOPHYSIOLOGY &amp; DISORDERS
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
                <h5 className="text-xs sm:text-sm font-black text-rose-950">ASTHMA</h5>
                <p className="text-[11px] sm:text-xs text-rose-900 font-semibold leading-relaxed">
                  Allergic hyper-reactivity (IgE-mediated); smooth muscle spasms in bronchioles causing expiratory wheezing.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <h5 className="text-xs sm:text-sm font-black text-amber-950">EMPHYSEMA (COPD)</h5>
                <p className="text-[11px] sm:text-xs text-amber-900 font-semibold leading-relaxed">
                  Cigarette smoking or α₁-antitrypsin deficiency destroys alveolar septal walls, permanently reducing surface area.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 space-y-1">
                <h5 className="text-xs sm:text-sm font-black text-slate-950">SILICOSIS / ASBESTOSIS</h5>
                <p className="text-[11px] sm:text-xs text-slate-800 font-semibold leading-relaxed">
                  Occupational dust inhalation causing chronic macrophage inflammation and irreversible lung Fibrosis.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreathingAndExchangeOfGasesDiagram;
