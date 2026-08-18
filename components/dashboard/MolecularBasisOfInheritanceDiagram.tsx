"use client";

import React, { useState } from "react";

export function MolecularBasisOfInheritanceDiagram() {
  const [activeTab, setActiveTab] = useState<
    "historical" | "structure_packaging" | "replication" | "transcription_code" | "operon_hgp"
  >("historical");

  return (
    <div className="w-full bg-slate-900 border border-slate-700/60 rounded-2xl p-4 md:p-6 text-slate-100 shadow-2xl my-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-700/80 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Chapter 5 (Class XII)
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Unit VII • Genetics and Evolution
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
            Molecular Basis of Inheritance
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab("historical")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "historical"
                ? "bg-cyan-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🧪 Genetic Material Proofs
          </button>
          <button
            onClick={() => setActiveTab("structure_packaging")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "structure_packaging"
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🧬 DNA &amp; Nucleosome
          </button>
          <button
            onClick={() => setActiveTab("replication")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "replication"
                ? "bg-emerald-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            ⚡ Replication Fork
          </button>
          <button
            onClick={() => setActiveTab("transcription_code")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "transcription_code"
                ? "bg-purple-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            📜 Transcription &amp; Code
          </button>
          <button
            onClick={() => setActiveTab("operon_hgp")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "operon_hgp"
                ? "bg-amber-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🔬 Lac Operon &amp; HGP
          </button>
        </div>
      </div>

      {/* Tab 1: Historical Proofs */}
      {activeTab === "historical" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                1928 • Griffith Transformation
              </span>
              <h4 className="text-sm font-bold text-cyan-300">Streptococcus pneumoniae</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Heat-killed virulent S-strain converts live avirulent R-strain into virulent capsulated S-cells in mice. Proved existence of a heat-stable &ldquo;Transforming Principle&rdquo;.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300">
                1944 • Avery, MacLeod, McCarty
              </span>
              <h4 className="text-sm font-bold text-indigo-300">Biochemical Proof</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Proteases &amp; RNase did NOT affect transformation; only pure <strong>DNase</strong> abolished transforming activity, demonstrating DNA is the transforming molecule.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300">
                1952 • Hershey &amp; Chase
              </span>
              <h4 className="text-sm font-bold text-emerald-300">T2 Bacteriophage Proof</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                ³²P-labeled DNA entered host bacterial pellet, while ³⁵S-labeled protein ghost remained in supernatant. Unequivocal proof that DNA is the genetic material.
              </p>
            </div>
          </div>

          {/* Hershey Chase Visual Flow */}
          <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30 space-y-3">
            <h4 className="text-sm font-bold text-cyan-300">🧪 Hershey-Chase Experimental Tracking</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="font-bold text-rose-400">³⁵S-Labeled Phage Batch (Protein Coat)</span>
                <p className="text-slate-400">Infection ➔ Blending (shear coats) ➔ Centrifugation</p>
                <p className="text-emerald-400 font-semibold">Radioactivity detected in SUPERATANT (Phage ghosts), NOT in bacterial pellet.</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="font-bold text-cyan-400">³²P-Labeled Phage Batch (DNA Core)</span>
                <p className="text-slate-400">Infection ➔ Blending (shear coats) ➔ Centrifugation</p>
                <p className="text-cyan-300 font-semibold">Radioactivity detected in BACTERIAL PELLET (Injected genetic core).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Structure & Packaging */}
      {activeTab === "structure_packaging" && (
        <div className="space-y-6 animate-fadeIn">
          {/* B-DNA Dimensions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-slate-400 block text-[10px]">Helical Diameter</span>
              <strong className="text-cyan-400 text-base font-mono">2.0 nm (20 Å)</strong>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-slate-400 block text-[10px]">Helical Pitch</span>
              <strong className="text-emerald-400 text-base font-mono">3.4 nm (34 Å)</strong>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-slate-400 block text-[10px]">Base Pairs / Turn</span>
              <strong className="text-indigo-400 text-base font-mono">10 bp</strong>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-slate-400 block text-[10px]">Axial Rise / bp</span>
              <strong className="text-purple-400 text-base font-mono">0.34 nm (3.4 Å)</strong>
            </div>
          </div>

          {/* Nucleosome Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-2">
              <h4 className="text-sm font-bold text-indigo-300">📦 Nucleosome Core Particle</h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li><strong>Histone Octamer Core</strong>: Two molecules each of H2A, H2B, H3, and H4 [(H2A-H2B)₂ + (H3-H4)₂]. Rich in basic Lysine and Arginine residues (+ve charge).</li>
                <li><strong>DNA Wrapping</strong>: <strong>147 bp</strong> of negatively charged DNA wrapped in 1.65 left-handed superhelical turns.</li>
                <li><strong>Linker DNA &amp; H1</strong>: ~20–80 bp linker DNA bound to <strong>Histone H1</strong> (= Chromatosome 167 bp).</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/30 space-y-2">
              <h4 className="text-sm font-bold text-purple-300">🍀 tRNA Adapter Architecture</h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li><strong>3&apos;-Acceptor Stem</strong>: Unpaired terminal <strong>5&apos;-CCA-3&apos;</strong> sequence; covalent attachment site for amino acid.</li>
                <li><strong>Anticodon Loop</strong>: 3-nucleotide sequence complementary to mRNA codon.</li>
                <li><strong>DHU (D-Loop)</strong>: Binds aminoacyl-tRNA synthetase enzyme.</li>
                <li><strong>TψC Loop</strong>: Binds the ribosome 50S/60S large subunit.</li>
                <li><strong>3D Fold</strong>: Tertiary <strong>L-shaped</strong> spatial conformation.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Replication Fork */}
      {activeTab === "replication" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Meselson & Stahl */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-emerald-300">🧪 Meselson &amp; Stahl Experiment (1958) — Semiconservative Proof</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Gen 0 (¹⁵N Heavy)</span>
                <strong className="text-rose-400">100% Heavy Band</strong>
              </div>
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Gen 1 (¹⁴N 1st Div)</span>
                <strong className="text-amber-400">100% Hybrid (¹⁵N-¹⁴N)</strong>
              </div>
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Gen 2 (¹⁴N 2nd Div)</span>
                <strong className="text-emerald-400">50% Hybrid : 50% Light</strong>
              </div>
            </div>
          </div>

          {/* Replication Fork Enzymes */}
          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30">
            <h4 className="text-sm font-bold text-white mb-3">⚙️ Replication Fork Enzymatic Machinery</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <strong className="text-cyan-300">DnaB Helicase &amp; SSBs</strong>
                <p className="text-slate-400">Unwinds double helix using ATP; SSBs prevent strand re-annealing.</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <strong className="text-indigo-300">DNA Gyrase (Topoisomerase II)</strong>
                <p className="text-slate-400">Relieves positive torsional supercoiling strain ahead of fork.</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <strong className="text-emerald-300">DNA Polymerase III</strong>
                <p className="text-slate-400">Main replicative polymerase (5&apos;➔3&apos; synthesis + 3&apos;➔5&apos; proofreading).</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <strong className="text-rose-300">DNA Polymerase I &amp; Ligase</strong>
                <p className="text-slate-400">Pol I removes RNA primers via <strong>5&apos;➔3&apos; exonuclease</strong>; Ligase seals nicks.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Transcription & Code */}
      {activeTab === "transcription_code" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Eukaryotic RNA Polymerases & hnRNA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-300">RNA Polymerase I</span>
              <p className="text-slate-400">Transcribes 28S, 18S, 5.8S pre-rRNA in the nucleolus.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-purple-500/30 space-y-1">
              <span className="font-bold text-purple-300">RNA Polymerase II</span>
              <p className="text-slate-400">Transcribes <strong>hnRNA / pre-mRNA</strong> (sensitive to α-amanitin).</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-indigo-500/30 space-y-1">
              <span className="font-bold text-indigo-300">RNA Polymerase III</span>
              <p className="text-slate-400">Transcribes tRNA, 5S rRNA, and 7SL/snRNAs.</p>
            </div>
          </div>

          {/* hnRNA Processing & Wobble */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-purple-300">✂️ hnRNA Post-Transcriptional Processing</h4>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                <li><strong>5&apos;-Capping</strong>: Addition of 7-methylguanosine (7-mG) via unusual 5&apos;-5&apos; triphosphate bridge.</li>
                <li><strong>3&apos;-Polyadenylation</strong>: Addition of 200–300 Adenylates (Poly-A tail).</li>
                <li><strong>Splicing</strong>: Removal of non-coding Introns and joining of Exons by Spliceosome (U1-U6 snRNPs).</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-cyan-300">🔄 Crick&apos;s Wobble Hypothesis</h4>
              <p className="text-xs text-slate-300">
                Non-standard hydrogen bonding occurs at the <strong>3&apos; base of mRNA codon</strong> (1st position of tRNA anticodon).
              </p>
              <div className="p-2 bg-slate-900 rounded text-[11px] font-mono text-cyan-200 border border-slate-800">
                5&apos; Anticodon Inosine (I) ➔ pairs with U, C, or A at 3&apos; Codon
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Lac Operon & HGP */}
      {activeTab === "operon_hgp" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Lac Operon Dual Regulation */}
          <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-3">
            <h4 className="text-sm font-bold text-amber-300">⚙️ Dual Regulation of the Lac Operon (Jacob &amp; Monod)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <strong className="text-rose-400">Negative Control (Inducer Action)</strong>
                <p className="text-slate-400">Allolactose binds Lac Repressor (i gene product) ➔ Repressor detaches from Operator ➔ Operon ON.</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <strong className="text-emerald-400">Positive Control (Catabolite Activation)</strong>
                <p className="text-slate-400">Low Glucose ➔ cAMP rises ➔ cAMP-CAP complex binds promoter ➔ MAXIMAL transcription.</p>
              </div>
            </div>
          </div>

          {/* HGP & DNA Fingerprinting */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-white">📊 HGP Salient Findings</h4>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                <li>Total Genome: <strong>3.1647 × 10⁹ bp</strong> (~20,000–25,000 genes).</li>
                <li>Protein-coding DNA: <strong>&lt; 2% of total genome</strong>.</li>
                <li>Largest Gene: Dystrophin (2.4 Million bp).</li>
                <li>Chromosome 1: 2,968 genes (most); Y Chromosome: 231 genes (fewest).</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-white">🧬 DNA Fingerprinting (Alec Jeffreys)</h4>
              <p className="text-xs text-slate-300">
                Uses <strong>VNTRs / Minisatellites</strong> (11–60 bp repeats).
              </p>
              <div className="p-2 bg-slate-900 rounded text-[10px] font-mono text-slate-300 border border-slate-800">
                DNA Isolation ➔ Restriction Digestion ➔ Gel Electrophoresis ➔ Southern Blotting ➔ ³²P-VNTR Hybridization ➔ Autoradiography
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
