"use client";

import React, { useState } from "react";

export function BiotechnologyPrinciplesDiagram() {
  const [activeTab, setActiveTab] = useState<
    "restriction" | "vectors" | "screening" | "gel_pcr" | "bioreactor_dsp"
  >("restriction");

  return (
    <div className="w-full bg-slate-900 border border-slate-700/60 rounded-2xl p-4 md:p-6 text-slate-100 shadow-2xl my-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-700/80 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Chapter 9 (Class XII)
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Unit IX • Biotechnology
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
            Biotechnology: Principles &amp; Processes
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab("restriction")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "restriction"
                ? "bg-purple-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            ✂️ Restriction Enzymes
          </button>
          <button
            onClick={() => setActiveTab("vectors")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "vectors"
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🧬 Cloning Vectors (pBR322)
          </button>
          <button
            onClick={() => setActiveTab("screening")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "screening"
                ? "bg-blue-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🎨 Blue-White Screening
          </button>
          <button
            onClick={() => setActiveTab("gel_pcr")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "gel_pcr"
                ? "bg-emerald-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            ⚡ Gel &amp; PCR
          </button>
          <button
            onClick={() => setActiveTab("bioreactor_dsp")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "bioreactor_dsp"
                ? "bg-amber-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🏭 Bioreactors &amp; DSP
          </button>
        </div>
      </div>

      {/* Tab 1: Restriction Enzymes */}
      {activeTab === "restriction" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/30 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950 text-purple-300">
                Discovery &amp; First Enzyme
              </span>
              <h4 className="text-sm font-bold text-white">Hind II (1963)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                First isolated restriction endonuclease by Hamilton Smith from <em>Haemophilus influenzae</em>. Cleaves specific 6-bp palindrome:
              </p>
              <div className="p-2 bg-slate-900 rounded font-mono text-xs text-purple-300 border border-slate-800">
                5&apos;-G T Y | R A C-3&apos; (Y = C/T, R = A/G)
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                Nomenclature System (Eco RI)
              </span>
              <ul className="text-xs text-slate-300 space-y-1">
                <li><strong className="text-purple-400">E:</strong> Genus <em>Escherichia</em></li>
                <li><strong className="text-purple-400">co:</strong> Species <em>coli</em></li>
                <li><strong className="text-purple-400">R:</strong> Strain RY 13</li>
                <li><strong className="text-purple-400">I:</strong> 1st enzyme isolated from strain</li>
              </ul>
            </div>
          </div>

          {/* Sticky vs Blunt */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white">Sticky vs. Blunt End Cleavage</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400">Sticky Overhangs (Eco RI):</span>
                <p className="text-slate-400">Cuts staggered away from center: <code className="text-emerald-300">5&apos;-G | AATTC-3&apos;</code></p>
                <p className="text-[11px] text-slate-500">Overhanging single strands facilitate T4 DNA Ligase bonding.</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="font-bold text-amber-400">Blunt / Flush Ends (Sma I):</span>
                <p className="text-slate-400">Cuts center on both strands: <code className="text-amber-300">5&apos;-CCC | GGG-3&apos;</code></p>
                <p className="text-[11px] text-slate-500">No single-stranded overhangs.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Cloning Vectors */}
      {activeTab === "vectors" && (
        <div className="space-y-6 animate-fadeIn">
          {/* pBR322 Restriction Map */}
          <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-indigo-300">🧬 Plasmid pBR322 Anatomy (4361 bp)</h4>
              <span className="text-[10px] font-mono text-slate-400">Bolivar &amp; Rodriguez</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <strong className="text-rose-400 block font-semibold">ampᴿ (Ampicillin Resistance)</strong>
                <p className="text-slate-400 font-mono text-[11px]">Sites: Pst I, Pvu I</p>
                <p className="text-[11px] text-slate-500">Selectable marker for transformants.</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <strong className="text-amber-400 block font-semibold">tetᴿ (Tetracycline Resistance)</strong>
                <p className="text-slate-400 font-mono text-[11px]">Sites: Bam HI, Sal I</p>
                <p className="text-[11px] text-slate-500">Insert at Bam HI destroys tetᴿ.</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <strong className="text-cyan-400 block font-semibold">Ori &amp; Rop Gene</strong>
                <p className="text-slate-400 font-mono text-[11px]">Rop site: Pvu II (Cla I, Hind III, Eco RI upstream)</p>
                <p className="text-[11px] text-slate-500">Controls plasmid copy number (15–20/cell).</p>
              </div>
            </div>
          </div>

          {/* Plant & Animal Vectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <strong className="text-emerald-400 block font-semibold">🌱 Plant Vector: Ti Plasmid</strong>
              <p className="text-slate-300">
                From <em>Agrobacterium tumefaciens</em> (&ldquo;Nature&apos;s Genetic Engineer&rdquo;). Disarmed <strong>T-DNA</strong> transfers foreign genes into dicot plants.
              </p>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <strong className="text-purple-400 block font-semibold">🐾 Animal Vector: Disarmed Retroviruses</strong>
              <p className="text-slate-300">
                Retroviruses are disarmed to transfer desirable genes into mammalian cells without oncogenic transformation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Blue-White Screening */}
      {activeTab === "screening" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-950 p-4 rounded-xl border border-blue-500/30 space-y-3">
            <h4 className="text-sm font-bold text-blue-300">🎨 Insertional Inactivation of lac Z Gene</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Foreign DNA is inserted into the Multiple Cloning Site (MCS) within the <strong>lac Z</strong> gene (encoding β-galactosidase).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-900 rounded-xl border border-blue-500/40 space-y-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950 text-blue-300">
                  Non-Recombinant Vector (No Insert)
                </span>
                <p className="text-slate-300">• Functional <em>lac Z</em> gene.</p>
                <p className="text-slate-300">• Expresses active β-Galactosidase.</p>
                <p className="text-blue-400 font-bold">• Cleaves X-Gal ➔ BLUE COLONIES</p>
              </div>

              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-700 space-y-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-200">
                  Recombinant Vector (Foreign Insert Present)
                </span>
                <p className="text-slate-300">• Insertional Inactivation of <em>lac Z</em>.</p>
                <p className="text-slate-300">• Non-functional β-Galactosidase.</p>
                <p className="text-white font-bold">• Cannot cleave X-Gal ➔ WHITE COLONIES</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-400">
            <strong>Key Exam Rule:</strong> In Blue-White screening, <strong>WHITE colonies are RECOMBINANTS</strong> (desired clones with insert); Blue colonies are non-recombinant empty vectors.
          </div>
        </div>
      )}

      {/* Tab 4: Gel & PCR */}
      {activeTab === "gel_pcr" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Gel Electrophoresis */}
          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-3">
            <h4 className="text-sm font-bold text-emerald-300">⚡ Agarose Gel Electrophoresis</h4>
            <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 space-y-1.5 border border-slate-800">
              <p>• <strong>Charge:</strong> DNA has negative sugar-phosphate backbone (PO₄³⁻) ➔ Migrates toward <strong>Positive Anode (+)</strong>.</p>
              <p>• <strong>Sieving Effect:</strong> Smaller DNA fragments move faster and travel furthest.</p>
              <p>• <strong>Staining:</strong> Stained with <strong>Ethidium Bromide (EtBr)</strong> ➔ Fluoresces <strong>Bright Orange</strong> under UV radiation.</p>
              <p>• <strong>Elution:</strong> Physically cutting out the orange DNA band and extracting DNA from agarose.</p>
            </div>
          </div>

          {/* PCR Thermal Cycle */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-white">🔄 PCR 3-Step Thermal Cycle (Kary Mullis 1983)</h4>
              <span className="text-[10px] font-mono text-emerald-400">Yield = 2ᴺ (1 Billion in 30 cycles)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <strong className="text-rose-400 block font-semibold">1. Denaturation (94–96°C)</strong>
                <p className="text-slate-400">Thermal energy breaks H-bonds, separating double strands.</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <strong className="text-cyan-400 block font-semibold">2. Annealing (50–65°C)</strong>
                <p className="text-slate-400">Oligonucleotide primers bind complementary 3&apos; ends.</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <strong className="text-emerald-400 block font-semibold">3. Extension (72°C)</strong>
                <p className="text-slate-400"><em>Taq</em> Polymerase (from <em>Thermus aquaticus</em>) extends DNA 5&apos;➔3&apos;.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Bioreactors & DSP */}
      {activeTab === "bioreactor_dsp" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Bioreactor Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-2">
              <h4 className="text-sm font-bold text-amber-300">Simple Stirred-Tank</h4>
              <p className="text-slate-300">
                Cylindrical vessel with curved base to facilitate mixing; motorized impeller blades maintain uniform nutrient distribution, temperature, and pH.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2">
              <h4 className="text-sm font-bold text-emerald-300">Sparged Stirred-Tank</h4>
              <p className="text-slate-300">
                Features a bottom <strong>sparger ring</strong> that bubbles sterile air (O₂) throughout culture, dramatically increasing oxygen transfer surface area.
              </p>
            </div>
          </div>

          {/* Downstream Processing */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-white">📦 Downstream Processing (DSP)</h4>
            <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 space-y-1.5 border border-slate-800">
              <p>• <strong>DSP Formula:</strong> <code className="text-amber-300">Downstream Processing = Separation + Purification</code></p>
              <p>• Occurs strictly <em>post-biosynthesis/fermentation</em>.</p>
              <p>• Followed by product formulation with preservatives, stability testing, and rigorous Quality Control (QC).</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
