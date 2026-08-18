"use client";

import React, { useState } from "react";

export function BiotechnologyApplicationsDiagram() {
  const [activeTab, setActiveTab] = useState<
    "bt_crops" | "rnai" | "tissue_culture" | "insulin_gene" | "transgenics_ethics"
  >("bt_crops");

  return (
    <div className="w-full bg-slate-900 border border-slate-700/60 rounded-2xl p-4 md:p-6 text-slate-100 shadow-2xl my-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-700/80 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
              Chapter 10 (Class XII)
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Unit IX • Biotechnology
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
            Biotechnology and its Applications
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab("bt_crops")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "bt_crops"
                ? "bg-teal-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🌾 Bt Crops &amp; Golden Rice
          </button>
          <button
            onClick={() => setActiveTab("rnai")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "rnai"
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🐛 RNAi Silencing
          </button>
          <button
            onClick={() => setActiveTab("tissue_culture")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "tissue_culture"
                ? "bg-emerald-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🌱 Tissue Culture
          </button>
          <button
            onClick={() => setActiveTab("insulin_gene")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "insulin_gene"
                ? "bg-cyan-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            💉 Humulin &amp; Gene Therapy
          </button>
          <button
            onClick={() => setActiveTab("transgenics_ethics")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "transgenics_ethics"
                ? "bg-amber-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🐄 Transgenics &amp; GEAC
          </button>
        </div>
      </div>

      {/* Tab 1: Bt Crops & Golden Rice */}
      {activeTab === "bt_crops" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Bt Cry Toxin Cascade */}
          <div className="bg-slate-950 p-4 rounded-xl border border-teal-500/30 space-y-3">
            <h4 className="text-sm font-bold text-teal-300">🐛 Bt Cry Toxin Activation Cascade</h4>
            <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 space-y-1.5 border border-slate-800">
              <p>1. <em>Bacillus thuringiensis</em> produces inactive, crystalline <strong>Cry Protoxins</strong>.</p>
              <p>2. Ingested by target insect ➔ <strong>Alkaline pH (&gt;8.5)</strong> in insect midgut solubilizes the crystal protoxin.</p>
              <p>3. Midgut proteases cleave protoxin into <strong>Active Cry Toxin</strong>.</p>
              <p>4. Active toxin binds cadherin receptors on midgut epithelial cells ➔ Creates pores ➔ Swelling, cell lysis, death from septicemia.</p>
              <p>• <em>Safe for humans:</em> Acidic gastric pH (1.8) denatures protoxins safely without activation.</p>
            </div>
          </div>

          {/* Gene Specificity & Golden Rice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <strong className="text-amber-400 block font-semibold text-sm">🎯 Bt Gene Target Specificity</strong>
              <p className="text-slate-300"><code className="text-amber-300">cry1Ac &amp; cry2Ab</code> ➔ Controls <strong>Cotton Bollworms</strong> (<em>Helicoverpa</em>).</p>
              <p className="text-slate-300"><code className="text-amber-300">cry1Ab</code> ➔ Controls <strong>Corn Borer</strong> (<em>Ostrinia nubilalis</em>).</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <strong className="text-yellow-400 block font-semibold text-sm">🍚 Golden Rice (Provitamin A)</strong>
              <p className="text-slate-300">
                Biofortified rice producing <strong>β-Carotene</strong> to prevent childhood blindness.
              </p>
              <p className="text-slate-400 text-[11px]">
                Genes: <em>psy</em> (Phytoene Synthase from Daffodil) + <em>crtI</em> (Phytoene Desaturase from <em>Erwinia</em>).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: RNAi Silencing */}
      {activeTab === "rnai" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-3">
            <h4 className="text-sm font-bold text-indigo-300">🐛 RNA Interference (RNAi) in Transgenic Tobacco</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Protects tobacco plant roots from the root-knot nematode <em>Meloidogyne incognita</em>.
            </p>

            <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 space-y-2 border border-slate-800">
              <p>1. <em>Agrobacterium</em> introduces nematode-specific genes into host plant genome.</p>
              <p>2. Plant transcribes both <strong>Sense &amp; Anti-sense RNA</strong> ➔ Base-pairing forms <strong>Double-Stranded RNA (dsRNA)</strong>.</p>
              <p>3. Nematode ingests plant dsRNA while feeding on roots.</p>
              <p>4. <strong>Dicer Enzyme</strong> cuts dsRNA into <strong>21–23 bp siRNA (Small Interfering RNA)</strong>.</p>
              <p>5. siRNA enters <strong>RISC (RNA-Induced Silencing Complex)</strong> ➔ Degrades complementary nematode mRNA.</p>
              <p className="text-emerald-400 font-bold">• Specific nematode gene silenced ➔ Nematode dies; plant is protected!</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Tissue Culture */}
      {activeTab === "tissue_culture" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-500/30 space-y-1.5">
              <strong className="text-emerald-300 block font-semibold text-sm">🌱 Cellular Totipotency</strong>
              <p className="text-slate-300">
                The innate capacity of a single plant cell/explant to regenerate into an entire plant (Gottlieb Haberlandt).
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-500/30 space-y-1.5">
              <strong className="text-emerald-300 block font-semibold text-sm">🌿 Micropropagation &amp; Somaclones</strong>
              <p className="text-slate-300">
                Rapid in-vitro multiplication producing thousands of plants genetically identical to parent (<strong>Somaclones</strong>).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <strong className="text-cyan-400 block font-semibold">🦠 Meristem Culture (Virus-Free Plants)</strong>
              <p className="text-slate-300">
                Apical/axillary meristems divide faster than viral replication and have high auxin levels, allowing generation of <strong>virus-free plants</strong> from infected stock.
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <strong className="text-purple-400 block font-semibold">🧬 Somatic Hybridization (Pomato)</strong>
              <p className="text-slate-300">
                Cell wall digested with <strong>Cellulase &amp; Pectinase</strong> ➔ Naked <strong>Protoplasts</strong> fused with <strong>PEG (Polyethylene Glycol)</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Humulin & Gene Therapy */}
      {activeTab === "insulin_gene" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Recombinant Insulin */}
          <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30 space-y-2">
            <h4 className="text-sm font-bold text-cyan-300">💉 Recombinant Human Insulin (Humulin, Eli Lilly 1983)</h4>
            <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 space-y-1.5 border border-slate-800">
              <p>• <strong>Pro-insulin (Inactive):</strong> Chain A (21 AA) + C-Peptide (31 AA) + Chain B (30 AA).</p>
              <p>• <strong>Mature Insulin (Active):</strong> Chain A (21 AA) linked to Chain B (30 AA) by <strong>2 Disulfide Bonds</strong> (Lacks C-peptide!).</p>
              <p>• <strong>Eli Lilly Breakthrough:</strong> Synthesized DNA for Chain A &amp; B separately in <em>E. coli</em>, purified, and joined in-vitro with disulfide bonds.</p>
            </div>
          </div>

          {/* Gene Therapy */}
          <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 space-y-2">
            <h4 className="text-sm font-bold text-rose-300">🧬 Clinical Gene Therapy: ADA Deficiency (SCID, 1990)</h4>
            <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 space-y-1.5 border border-slate-800">
              <p>• <strong>Cause:</strong> Deletion in Adenosine Deaminase (ADA) gene ➔ Toxic dATP destroys T/B-lymphocytes ➔ SCID.</p>
              <p>• <strong>1990 Trial:</strong> Retroviral vector delivered functional ADA cDNA into cultured T-cells of 4-year-old girl.</p>
              <p>• <em>Limitation:</em> Not permanent because T-cells die over time (requires periodic infusions). <strong>Permanent cure:</strong> Gene inserted into embryonic bone marrow cells.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Transgenics & Ethics */}
      {activeTab === "transgenics_ethics" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-amber-500/30 space-y-1.5">
              <strong className="text-amber-300 block font-semibold text-sm">🐄 Rosie the Cow (1997)</strong>
              <p className="text-slate-300">
                Produced human protein-enriched milk (2.4 g/L) containing <strong>human α-Lactalbumin</strong> (nutritionally superior for infants).
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-amber-500/30 space-y-1.5">
              <strong className="text-amber-300 block font-semibold text-sm">🐑 α₁-Antitrypsin (Emphysema)</strong>
              <p className="text-slate-300">
                Human protein expressed in transgenic sheep/goat milk used clinically to treat hereditary <strong>Emphysema</strong>.
              </p>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
            <h4 className="text-sm font-bold text-white">⚖️ GEAC &amp; Biopiracy Defense</h4>
            <p className="text-slate-300">
              • <strong>GEAC:</strong> Genetic Engineering Appraisal Committee (Indian statutory body under MoEFCC) evaluates GM crop safety &amp; approval.
            </p>
            <p className="text-slate-300">
              • <strong>Biopiracy Cases Revoked by India:</strong> Basmati Rice (RiceTec patent revoked using 27 native strain proof), Turmeric (wound-healing patent revoked), and Neem (antifungal patent revoked).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
