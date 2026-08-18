"use client";

import React, { useState } from "react";

export function EvolutionDiagram() {
  const [activeTab, setActiveTab] = useState<
    "origin_life" | "evidences" | "adaptive_radiation" | "selection_hw" | "human_evolution"
  >("origin_life");

  return (
    <div className="w-full bg-slate-900 border border-slate-700/60 rounded-2xl p-4 md:p-6 text-slate-100 shadow-2xl my-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-700/80 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Chapter 6 (Class XII)
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Unit VII • Genetics and Evolution
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
            Evolution &amp; Population Genetics
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab("origin_life")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "origin_life"
                ? "bg-amber-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🧪 Origin of Life
          </button>
          <button
            onClick={() => setActiveTab("evidences")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "evidences"
                ? "bg-cyan-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🦴 Homology &amp; Fossils
          </button>
          <button
            onClick={() => setActiveTab("adaptive_radiation")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "adaptive_radiation"
                ? "bg-emerald-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🦘 Adaptive Radiation
          </button>
          <button
            onClick={() => setActiveTab("selection_hw")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "selection_hw"
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            📈 Selection &amp; Hardy-Weinberg
          </button>
          <button
            onClick={() => setActiveTab("human_evolution")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "human_evolution"
                ? "bg-rose-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            💀 Human Evolution
          </button>
        </div>
      </div>

      {/* Tab 1: Origin of Life & Miller-Urey */}
      {activeTab === "origin_life" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Miller-Urey Schematic */}
          <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-3">
            <h4 className="text-sm font-bold text-amber-300">⚡ The Miller-Urey Experiment (1953) — Pre-biotic Synthesis</h4>
            <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-amber-200 border border-slate-800 overflow-x-auto">
              Spark Discharge (800°C) ➔ Gas Ratio: CH₄ : NH₃ : H₂ : H₂O = 2 : 2 : 1 : 2 ➔ Condenser ➔ Liquid Trap ➔ Amino Acids (Glycine, Alanine, Aspartic Acid)
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Validated Oparin and Haldane&apos;s hypothesis of Chemical Evolution in a reducing primordial atmosphere (lacking free O₂).
            </p>
          </div>

          {/* Protobionts Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                Oparin&apos;s Model
              </span>
              <h4 className="text-sm font-bold text-white">Coacervates</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Large, non-membranous colloidal aggregates of proteins and polysaccharides. Could absorb organic molecules and grow, but lacked lipid bilayer membranes and could not reproduce.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                Sidney Fox&apos;s Model
              </span>
              <h4 className="text-sm font-bold text-white">Proteinoid Microspheres</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Formed by thermal polymerization of dry amino acids. Bounded by a semi-permeable lipid-protein membrane; exhibited osmotic swelling, binary-fission-like budding, and catalytic activity.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Evidences: Homology, Analogy & Fossils */}
      {activeTab === "evidences" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Homology vs Analogy Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300">
                Divergent Evolution
              </span>
              <h4 className="text-sm font-bold text-white">Homologous Structures</h4>
              <p className="text-xs text-slate-300">
                <strong>Same embryonic origin &amp; basic anatomical plan</strong>, adapted for different functions. Indicates common ancestry.
              </p>
              <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
                <li>Forelimbs of Human, Cheetah, Whale, and Bat.</li>
                <li>Thorns of <em>Bougainvillea</em> &amp; Tendrils of <em>Cucurbita</em> (modified stems).</li>
                <li>Vertebrate Hearts and Brains.</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300">
                Convergent Evolution
              </span>
              <h4 className="text-sm font-bold text-white">Analogous Structures</h4>
              <p className="text-xs text-slate-300">
                <strong>Different embryonic origins &amp; anatomy</strong>, adapted to perform similar functions due to similar selective pressures.
              </p>
              <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
                <li>Wings of Birds (feathered) &amp; Butterflies (chitinous).</li>
                <li>Eye of Octopus &amp; Mammals.</li>
                <li>Sweet Potato (root tuber) &amp; Potato (stem tuber).</li>
              </ul>
            </div>
          </div>

          {/* Paleontology & Embryology */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-amber-300">🦅 Archaeopteryx lithographica (Connecting Link)</h4>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                <li><strong>Reptilian Traits</strong>: Teeth in jaws, long bony tail, clawed digits, non-pneumatic bones.</li>
                <li><strong>Avian Traits</strong>: Feathered wings, wishbone (furcula), beak/bill.</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-indigo-300">📜 Von Baer&apos;s Law (Debunking Haeckel)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Karl Ernst von Baer proved that embryos pass through stages resembling the <strong>embryos</strong> of ancestors, but <strong>NEVER pass through the adult stages</strong> of other animals. (Disproved Haeckel&apos;s &ldquo;Ontogeny recapitulates phylogeny&rdquo;).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Adaptive Radiation & Marsupial-Placental Analogues */}
      {activeTab === "adaptive_radiation" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Adaptive Radiation Concepts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2">
              <h4 className="text-sm font-bold text-emerald-300">🐦 Darwin&apos;s Finches (Galapagos Islands)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                From an original seed-eating ancestral finch on the South American mainland, adaptive radiation gave rise to vegetarian, insectivorous, warbler-like, and cactus-feeding species with specialized beaks.
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2">
              <h4 className="text-sm font-bold text-emerald-300">🦘 Australian Marsupial Radiation</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ancestral marsupial radiated into diverse ecological niches in isolated Australia: Kangaroo, Wombat, Bandicoot, Koala, and Tasmanian Wolf.
              </p>
            </div>
          </div>

          {/* Convergent Marsupial-Placental Table */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h4 className="text-sm font-bold text-white mb-3">🔄 Convergent Analogues: Australian Marsupials vs. Placental Mammals</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400 block font-semibold">Marsupial Mole</span>
                <span className="text-slate-400">↔ Placental Mole</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400 block font-semibold">Numbat (Anteater)</span>
                <span className="text-slate-400">↔ Anteater</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400 block font-semibold">Flying Phalanger</span>
                <span className="text-slate-400">↔ Flying Squirrel</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400 block font-semibold">Tasmanian Tiger Cat</span>
                <span className="text-slate-400">↔ Bobcat</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400 block font-semibold">Tasmanian Wolf</span>
                <span className="text-slate-400">↔ Placental Wolf</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400 block font-semibold">Spotted Cuscus</span>
                <span className="text-slate-400">↔ Lemur</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Natural Selection & Hardy-Weinberg */}
      {activeTab === "selection_hw" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Natural Selection Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                Stabilizing Selection
              </span>
              <h4 className="text-sm font-bold text-white">Mean Favored</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Favors intermediate phenotype; eliminates extremes. Peak becomes narrower (e.g., Human birth weight around 3–4 kg).
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300">
                Directional Selection
              </span>
              <h4 className="text-sm font-bold text-indigo-300">One Extreme Favored</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Favors one extreme; population peak shifts in one direction (e.g., Industrial Melanism in <em>Biston betularia</em>, Antibiotic resistance).
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/30 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950 text-purple-300">
                Disruptive Selection
              </span>
              <h4 className="text-sm font-bold text-purple-300">Both Extremes Favored</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Favors both extremes over intermediate mean. Produces two distinct peaks (bimodal curve), driving speciation.
              </p>
            </div>
          </div>

          {/* Hardy-Weinberg Formula */}
          <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-3">
            <h4 className="text-sm font-bold text-indigo-300">📐 Hardy-Weinberg Equilibrium Equations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400">Allele Frequencies: p + q = 1</span>
                <p className="text-slate-400 font-mono">p = f(A) [Dominant], q = f(a) [Recessive]</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="font-bold text-cyan-400">Genotype Frequencies: p² + 2pq + q² = 1</span>
                <p className="text-slate-400 font-mono">p² = f(AA), 2pq = f(Aa) [Heterozygotes], q² = f(aa)</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              5 Disturbing Forces: Gene Flow, Genetic Drift (Founder/Bottleneck in small populations), Mutation, Recombination, and Natural Selection.
            </p>
          </div>
        </div>
      )}

      {/* Tab 5: Human Evolution */}
      {activeTab === "human_evolution" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Hominid Lineage Timeline */}
          <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 space-y-3">
            <h4 className="text-sm font-bold text-rose-300">💀 Chronological Hominid Evolution</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="text-[11px] uppercase bg-slate-900 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-2 px-3">Hominid Ancestor</th>
                    <th className="py-2 px-3">Geological Age</th>
                    <th className="py-2 px-3">Cranial Capacity</th>
                    <th className="py-2 px-3">Key Evolutionary Milestones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr>
                    <td className="py-2 px-3 font-bold text-white italic">Dryopithecus</td>
                    <td className="py-2 px-3 text-slate-400">~15 mya</td>
                    <td className="py-2 px-3 font-mono text-slate-400">—</td>
                    <td className="py-2 px-3">Arboreal ape-like ancestor; hairy; equal arm-leg length.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-white italic">Ramapithecus</td>
                    <td className="py-2 px-3 text-slate-400">~15 mya</td>
                    <td className="py-2 px-3 font-mono text-slate-400">—</td>
                    <td className="py-2 px-3">More man-like; semi-erect posture; Shivalik fossils.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-amber-300 italic">Australopithecus</td>
                    <td className="py-2 px-3 text-slate-400">3–4 mya</td>
                    <td className="py-2 px-3 font-mono text-amber-300 font-bold">400–500 cc</td>
                    <td className="py-2 px-3">Bipedal upright gait in African grasslands; Lucy fossil; fruit eater.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-cyan-300 italic">Homo habilis</td>
                    <td className="py-2 px-3 text-slate-400">2.0–1.5 mya</td>
                    <td className="py-2 px-3 font-mono text-cyan-300 font-bold">650–800 cc</td>
                    <td className="py-2 px-3">First hominid tool-maker (&ldquo;Handy Man&rdquo;); did NOT eat meat.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-emerald-300 italic">Homo erectus</td>
                    <td className="py-2 px-3 text-slate-400">~1.5 mya</td>
                    <td className="py-2 px-3 font-mono text-emerald-300 font-bold">900 cc</td>
                    <td className="py-2 px-3">Erect posture; ate meat; <strong>first to use fire</strong> (Java Man).</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-purple-300 italic">Homo neanderthalensis</td>
                    <td className="py-2 px-3 text-slate-400">100–40 kya</td>
                    <td className="py-2 px-3 font-mono text-purple-300 font-bold">1400 cc</td>
                    <td className="py-2 px-3">Cave dwellers; animal hides; <strong>buried dead with rituals</strong>.</td>
                  </tr>
                  <tr className="bg-rose-950/20">
                    <td className="py-2 px-3 font-bold text-rose-300 italic">Homo sapiens</td>
                    <td className="py-2 px-3 text-slate-400">75–10 kya</td>
                    <td className="py-2 px-3 font-mono text-rose-300 font-bold">1350–1450 cc</td>
                    <td className="py-2 px-3">Cave art (~18,000 ya); agriculture (~10,000 ya); modern man.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
