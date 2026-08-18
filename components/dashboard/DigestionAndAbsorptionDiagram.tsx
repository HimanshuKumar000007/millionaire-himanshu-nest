"use client";

import React, { useState } from "react";
import {
  Utensils,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Activity,
  Droplet,
  Shield,
  Stethoscope,
  ChevronRight,
  RefreshCw,
  Flame,
} from "lucide-react";

// ============================================================================
// DATA STRUCTURES
// ============================================================================

export interface LayerData {
  id: string;
  name: string;
  location: string;
  histology: string;
  keyFeatures: string;
  specialStructures: string;
}

const gutLayersDatabase: Record<string, LayerData> = {
  serosa: {
    id: "serosa",
    name: "Serosa (Visceral Peritoneum)",
    location: "Outermost layer of gut tube",
    histology: "Simple squamous mesothelium combined with thin loose connective tissue.",
    keyFeatures: "Produces lubricating serous fluid reducing frictional drag against neighboring abdominal organs.",
    specialStructures: "Absent in the esophagus (replaced by non-mesothelial fibrous Adventitia).",
  },
  muscularis: {
    id: "muscularis",
    name: "Muscularis Externa",
    location: "Between serosa and submucosa",
    histology: "Smooth muscle arranged into outer longitudinal and inner circular layers.",
    keyFeatures: "Innervated by Auerbach's (Myenteric) Plexus situated between layers to drive peristaltic motility.",
    specialStructures: "Stomach Exception: Contains an additional innermost Oblique layer for vigorous mechanical churning.",
  },
  submucosa: {
    id: "submucosa",
    name: "Submucosa",
    location: "Between muscularis and mucosa",
    histology: "Dense irregular to loose connective tissue rich in blood vessels, lymphatics, and nerves.",
    keyFeatures: "Contains Meissner's (Submucosal) Plexus regulating local glandular secretions and mucosal blood flow.",
    specialStructures: "Brunner's Glands: Specialized alkaline mucus-secreting compound tubular glands in the Duodenum.",
  },
  mucosa: {
    id: "mucosa",
    name: "Mucosa (Absorptive Lining)",
    location: "Innermost luminally exposed layer",
    histology: "Three sub-layers: Simple Columnar Epithelium, Lamina Propria, and Muscularis Mucosae.",
    keyFeatures: "Folded into Rugae in stomach and Villi + Microvilli + Crypts of Lieberkühn in small intestine.",
    specialStructures: "Paneth cells (secrete lysozyme) and Peyer's Patches (aggregated lymphoid nodules in terminal ileum).",
  },
};

export const DigestionAndAbsorptionDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "histology" | "dentition" | "secretions" | "absorption" | "hormones"
  >("histology");
  const [selectedLayer, setSelectedLayer] = useState<string>("muscularis");
  const [dentitionType, setDentitionType] = useState<"adult" | "milk">("adult");
  const [selectedDisorder, setSelectedDisorder] = useState<"marasmus" | "kwashiorkor">("kwashiorkor");

  const currentLayer = gutLayersDatabase[selectedLayer];

  return (
    <div className="my-4 sm:my-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-slate-50 to-amber-50/20 border border-slate-200/90 p-2.5 sm:p-7 shadow-xs space-y-4 sm:space-y-6 select-none w-full">
      {/* ════════════ TOP HERO HEADER ════════════ */}
      <div className="flex flex-col items-center text-center space-y-2.5 max-w-2xl mx-auto w-full">
        <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200 shadow-2xs flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-600" />
          DIGESTIVE PHYSIOLOGY &amp; BIOENERGETICS
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <Utensils className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 shrink-0" />
            DIGESTION AND ABSORPTION
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            Gut Histology, Zymogen Cascade, SGLT1 / Chylomicron Transport, GI Hormones &amp; PEM Disorders
          </p>
        </div>
      </div>

      {/* ════════════ NAVIGATION TAB SWITCHER ════════════ */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-slate-100/90 rounded-xl sm:rounded-2xl border border-slate-200 w-full max-w-4xl mx-auto">
        <button
          onClick={() => setActiveTab("histology")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "histology"
              ? "bg-white text-amber-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Gut Histology</span>
        </button>

        <button
          onClick={() => setActiveTab("dentition")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "dentition"
              ? "bg-white text-amber-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span>Dentition &amp; Saliva</span>
        </button>

        <button
          onClick={() => setActiveTab("secretions")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "secretions"
              ? "bg-white text-amber-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-rose-600 shrink-0" />
          <span>Zymogen Cascade</span>
        </button>

        <button
          onClick={() => setActiveTab("absorption")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "absorption"
              ? "bg-white text-amber-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Droplet className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>Absorption &amp; Chylomicron</span>
        </button>

        <button
          onClick={() => setActiveTab("hormones")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "hormones"
              ? "bg-white text-amber-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Stethoscope className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Hormones &amp; PEM</span>
        </button>
      </div>

      {/* ════════════ TAB 1: GUT WALL HISTOLOGY ════════════ */}
      {activeTab === "histology" && (
        <div className="space-y-4 sm:space-y-6 w-full">
          {/* Layer Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 max-w-4xl mx-auto w-full">
            {Object.keys(gutLayersDatabase).map((key) => {
              const l = gutLayersDatabase[key];
              const isSelected = selectedLayer === key;

              return (
                <button
                  key={key}
                  onClick={() => setSelectedLayer(key)}
                  className={`p-2 sm:p-2.5 rounded-xl border-2 text-[11px] sm:text-xs font-extrabold transition-all text-center flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? "bg-slate-900 text-white border-amber-500 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className="truncate w-full text-center">{l.name.split(" ")[0]}</span>
                  <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full font-black bg-amber-100 text-amber-800">
                    {key === "serosa" && "Outer"}
                    {key === "muscularis" && "Motility"}
                    {key === "submucosa" && "Vascular"}
                    {key === "mucosa" && "Lumen"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Layer Display Card */}
          <div className="p-3 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-amber-200/90 shadow-2xs space-y-4 max-w-4xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                  {currentLayer.location}
                </span>
                <h4 className="text-base sm:text-xl font-black text-slate-900 tracking-tight mt-1">
                  {currentLayer.name}
                </h4>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[9px] sm:text-[10px] font-black uppercase text-amber-700 tracking-wider block">
                  Histological Architecture
                </span>
                <p className="text-xs font-semibold text-slate-900 leading-relaxed">{currentLayer.histology}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[9px] sm:text-[10px] font-black uppercase text-indigo-700 tracking-wider block">
                  Physiological Specialization
                </span>
                <p className="text-xs font-semibold text-slate-800 leading-relaxed">{currentLayer.keyFeatures}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1">
              <h5 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-900">
                High-Yield Anatomical Exceptions &amp; Structures
              </h5>
              <p className="text-xs font-semibold text-amber-950 leading-relaxed">
                {currentLayer.specialStructures}
              </p>
            </div>
          </div>

          {/* Neural Control Plexuses Card */}
          <div className="p-3.5 sm:p-6 rounded-2xl bg-slate-900 text-white space-y-3 max-w-4xl mx-auto w-full">
            <h4 className="text-xs sm:text-sm font-black text-amber-300 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              INTRINSIC ENTERIC NERVOUS SYSTEM (ENS) PLEXUSES
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
              <div className="p-3 rounded-xl bg-slate-800/90 border border-amber-500/40 space-y-1">
                <span className="text-[10px] font-black uppercase text-amber-400 block">Auerbach's (Myenteric) Plexus</span>
                <p className="text-slate-200">• Located BETWEEN Longitudinal and Circular smooth muscle layers.</p>
                <p className="text-amber-300 font-bold">• Primary Function: Controls Gastrointestinal Motility &amp; Peristalsis.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/90 border border-indigo-500/40 space-y-1">
                <span className="text-[10px] font-black uppercase text-indigo-400 block">Meissner's (Submucosal) Plexus</span>
                <p className="text-slate-200">• Located inside the SUBMUCOSA connective tissue layer.</p>
                <p className="text-indigo-300 font-bold">• Primary Function: Controls Local Glandular Secretions &amp; Blood Flow.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 2: DENTAL ANATOMY & SALIVARY GLANDS ════════════ */}
      {activeTab === "dentition" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-amber-600 shrink-0" />
                HUMAN DENTITION &amp; DENTAL FORMULAS
              </h4>
              <div className="flex gap-1">
                <button
                  onClick={() => setDentitionType("adult")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                    dentitionType === "adult"
                      ? "bg-amber-600 text-white shadow-2xs"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Adult (32 Teeth)
                </button>
                <button
                  onClick={() => setDentitionType("milk")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                    dentitionType === "milk"
                      ? "bg-amber-600 text-white shadow-2xs"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Milk (20 Teeth)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-black uppercase text-amber-800 block">Thecodont</span>
                <p className="text-slate-800 font-semibold">Teeth firmly rooted in deep alveolar bone sockets of maxilla and mandible.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-black uppercase text-indigo-800 block">Diphyodont</span>
                <p className="text-slate-800 font-semibold">Two sets formed in lifespan: Deciduous milk teeth replaced by permanent adult teeth.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-black uppercase text-rose-800 block">Heterodont</span>
                <p className="text-slate-800 font-semibold">Four distinct morphologies: Incisors (I), Canines (C), Premolars (PM), Molars (M).</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 font-mono text-xs text-amber-950 font-bold space-y-1">
              {dentitionType === "adult" ? (
                <>
                  <p>Permanent Adult Formula: (2.1.2.3 / 2.1.2.3) × 2 = 32 Teeth</p>
                  <p className="text-[11px] font-sans text-amber-900 font-medium">• Incisors: 8 | Canines: 4 | Premolars: 8 | Molars: 12 (incl. 4 Wisdom teeth)</p>
                </>
              ) : (
                <>
                  <p>Primary Deciduous Milk Formula: (2.1.0.2 / 2.1.0.2) × 2 = 20 Teeth</p>
                  <p className="text-[11px] font-sans text-amber-900 font-medium">• Premolars are ZERO in milk teeth. Third molars develop only in adulthood.</p>
                </>
              )}
            </div>

            {/* Enamel vs Dentin */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                <strong>• Enamel:</strong> Hardest substance in animal body (96% hydroxyapatite), secreted by ectodermal <strong>Ameloblasts</strong>.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                <strong>• Dentin:</strong> Living bulk tooth tissue surrounding pulp cavity, secreted by neural crest <strong>Odontoblasts</strong>.
              </div>
            </div>
          </div>

          {/* Salivary Glands Ducts */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-indigo-200 shadow-2xs space-y-3">
            <h4 className="text-xs sm:text-sm font-black text-indigo-950 uppercase tracking-wider">
              SALIVARY GLANDS &amp; DUCTS (pH ≈ 6.8, 1.0–1.5 L/day)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-semibold">
              <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200">
                <span className="text-[9px] font-black uppercase text-indigo-700 block">1. Parotid Gland</span>
                <p className="text-slate-900 font-bold">Stensen's Duct</p>
                <p className="text-[10px] text-slate-600">Cheek / Near Ear (Largest)</p>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-[9px] font-black uppercase text-amber-700 block">2. Submandibular</span>
                <p className="text-slate-900 font-bold">Wharton's Duct</p>
                <p className="text-[10px] text-slate-600">Angle of Lower Jaw</p>
              </div>

              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
                <span className="text-[9px] font-black uppercase text-rose-700 block">3. Sublingual</span>
                <p className="text-slate-900 font-bold">Duct of Rivinus</p>
                <p className="text-[10px] text-slate-600">Below Tongue (Smallest)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 3: GASTRIC & ZYMOGEN CASCADE ════════════ */}
      {activeTab === "secretions" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          {/* Gastric Glands */}
          <div className="p-3.5 sm:p-6 rounded-2xl bg-white border border-rose-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-rose-600 shrink-0" />
              GASTRIC GLAND SECRETORY CELL TYPES
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs font-semibold">
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
                <span className="text-[9px] font-black text-rose-800 uppercase block">Parietal / Oxyntic Cells</span>
                <p className="text-slate-900 font-bold">• Hydrochloric Acid (HCl, pH 1.8)</p>
                <p className="text-slate-900 font-bold">• Castle's Intrinsic Factor</p>
                <p className="text-[10px] text-rose-900">Essential for Vit B₁₂ absorption in ileum</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <span className="text-[9px] font-black text-amber-800 uppercase block">Chief / Peptic Cells</span>
                <p className="text-slate-900 font-bold">• Pepsinogen (Inactive zymogen)</p>
                <p className="text-slate-900 font-bold">• Prorennin (Infant milk curdling)</p>
                <p className="text-[10px] text-amber-900">Cleaved to active enzymes by HCl</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[9px] font-black text-slate-700 uppercase block">Mucous Neck Cells</span>
                <p className="text-slate-900 font-bold">• Alkaline Mucus &amp; HCO₃⁻</p>
                <p className="text-[10px] text-slate-600">Forms mucosal barrier protecting gastric wall from acidic autolysis</p>
              </div>
            </div>

            {/* Pernicious Anemia Callout */}
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-xs text-rose-950 font-bold space-y-0.5">
              <strong className="text-rose-900">Pernicious Anemia:</strong> Autoimmune loss of parietal cells eliminates Castle's Intrinsic Factor, halting Vitamin B₁₂ absorption in the terminal ileum and causing megaloblastic anemia.
            </div>
          </div>

          {/* Pancreatic Zymogen Activation Cascade */}
          <div className="p-3.5 sm:p-6 rounded-2xl bg-slate-900 text-white space-y-3">
            <h4 className="text-xs sm:text-sm font-black text-amber-400 uppercase tracking-wider">
              PANCREATIC ZYMOGEN ACTIVATION CASCADE IN DUODENUM
            </h4>
            <div className="space-y-1.5 text-xs font-mono">
              <p className="text-amber-300">1. Duodenal Enterocytes ──► Enterokinase (Enteropeptidase)</p>
              <p className="text-emerald-300 font-bold">2. Trypsinogen (Inactive) ──[Enterokinase]──► ACTIVE TRYPSIN</p>
              <p className="text-rose-300">3. Chymotrypsinogen ──[Trypsin]──► Active Chymotrypsin</p>
              <p className="text-white font-black">4. Procarboxypeptidase ──[Trypsin]──► Active Carboxypeptidase</p>
            </div>
            <p className="text-[11px] text-slate-300 pt-1 border-t border-slate-800">
              <strong>Bile Physiology:</strong> Bile contains <strong>ZERO digestive enzymes</strong>; it physically emulsifies fats into micelles (4–8 nm) to activate pancreatic lipases.
            </p>
          </div>
        </div>
      )}

      {/* ════════════ TAB 4: ABSORPTION MECHANICS ════════════ */}
      {activeTab === "absorption" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <Droplet className="w-4 h-4 text-blue-600 shrink-0" />
              CARBOHYDRATE, PROTEIN, &amp; LIPID ABSORPTION PATHWAYS
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
              <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 space-y-1.5">
                <span className="text-[10px] font-black uppercase text-blue-900 block">Carbohydrate Transporters</span>
                <p>• <strong>Glucose / Galactose:</strong> Apical entry via <strong>SGLT1</strong> (Secondary Active Na⁺ symport); Basolateral exit via <strong>GLUT2</strong>.</p>
                <p>• <strong>Fructose:</strong> Apical entry via <strong>GLUT5</strong> (Facilitated diffusion); Basolateral exit via GLUT2.</p>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50/80 border border-indigo-200 space-y-1.5">
                <span className="text-[10px] font-black uppercase text-indigo-900 block">Protein Transporters</span>
                <p>• <strong>Free Amino Acids:</strong> Na⁺-dependent secondary active transport.</p>
                <p>• <strong>Di- &amp; Tri-peptides:</strong> <strong>PepT1</strong> (H⁺ symporter), cleaved to free amino acids inside enterocytes.</p>
              </div>
            </div>

            {/* Fat & Chylomicron Pathway */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-2 text-xs">
              <span className="text-[10px] font-black uppercase text-amber-900 block">Fat Absorption &amp; Chylomicron Pathway</span>
              <div className="space-y-1 text-slate-800 font-medium">
                <p>1. Luminal Micelles (4–8 nm) diffuse passively across enterocyte apical brush-border.</p>
                <p>2. Smooth Endoplasmic Reticulum (SER) re-esterifies fatty acids into <strong>Triglycerides</strong>.</p>
                <p>3. Golgi body encases triglycerides with apolipoproteins into <strong>Chylomicrons (0.1–1.0 µm)</strong>.</p>
                <p className="text-amber-950 font-bold">4. Chylomicrons are exocytosed into <strong>Lacteals (lymphatic capillaries)</strong> ➔ Thoracic Duct ➔ Left Subclavian Vein.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 5: GI HORMONES & PEM DISORDERS ════════════ */}
      {activeTab === "hormones" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          {/* Calorific Values Grid */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-rose-500" />
              GROSS vs. PHYSIOLOGICAL CALORIFIC VALUES
            </h4>

            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[9px] font-sans font-bold text-slate-400 block uppercase">Carbohydrates</span>
                <p className="text-slate-900">Gross: 4.1 kcal/g</p>
                <p className="text-emerald-600 font-bold">Net: 4.0 kcal/g</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[9px] font-sans font-bold text-slate-400 block uppercase">Proteins</span>
                <p className="text-slate-900">Gross: 5.65 kcal/g</p>
                <p className="text-emerald-600 font-bold">Net: 4.0 kcal/g</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[9px] font-sans font-bold text-slate-400 block uppercase">Fats / Lipids</span>
                <p className="text-slate-900">Gross: 9.45 kcal/g</p>
                <p className="text-emerald-600 font-bold">Net: 9.0 kcal/g</p>
              </div>
            </div>
          </div>

          {/* PEM Disorder Differential (Marasmus vs Kwashiorkor) */}
          <div className="p-3.5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                PROTEIN-ENERGY MALNUTRITION (PEM)
              </h4>
              <div className="flex gap-1">
                <button
                  onClick={() => setSelectedDisorder("kwashiorkor")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                    selectedDisorder === "kwashiorkor"
                      ? "bg-rose-600 text-white shadow-2xs"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Kwashiorkor
                </button>
                <button
                  onClick={() => setSelectedDisorder("marasmus")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                    selectedDisorder === "marasmus"
                      ? "bg-rose-600 text-white shadow-2xs"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Marasmus
                </button>
              </div>
            </div>

            {selectedDisorder === "kwashiorkor" ? (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs space-y-1.5">
                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-rose-200 text-rose-900">
                  Protein-Only Deficiency • Child &gt; 1 Year
                </span>
                <h5 className="font-black text-slate-900 text-sm">KWASHIORKOR</h5>
                <p className="text-rose-950 font-semibold leading-relaxed">
                  • Etiology: Severe deficiency of <strong>Protein ALONE</strong> (calorie intake is adequate).
                </p>
                <p className="text-rose-950 font-semibold leading-relaxed">
                  • Diagnostic Hallmark: <strong>Severe Peripheral Edema ("Pot Belly")</strong> due to collapsed plasma albumin oncotic pressure.
                </p>
                <p className="text-rose-950 font-semibold leading-relaxed">
                  • Liver: Severe <strong>Fatty Liver</strong> enlargement and skin hyperpigmentation lesions.
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1.5">
                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-amber-200 text-amber-900">
                  Protein + Calorie Deficiency • Infant &lt; 1 Year
                </span>
                <h5 className="font-black text-slate-900 text-sm">MARASMUS</h5>
                <p className="text-amber-950 font-semibold leading-relaxed">
                  • Etiology: Simultaneous severe deficiency of <strong>BOTH Protein AND Total Calories</strong>.
                </p>
                <p className="text-amber-950 font-semibold leading-relaxed">
                  • Diagnostic Hallmark: Extreme emaciation ("skin and bones"), dry wrinkled skin, prominent ribs, and <strong>COMPLETE ABSENCE OF EDEMA</strong>.
                </p>
                <p className="text-amber-950 font-semibold leading-relaxed">
                  • Liver: NO fatty liver changes.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DigestionAndAbsorptionDiagram;
