"use client";

import React, { useState } from "react";

export function SexualReproductionInFloweringPlantsDiagram() {
  const [activeTab, setActiveTab] = useState<
    "microsporo" | "megasporo" | "pollination" | "fertilization" | "apomixis"
  >("microsporo");

  return (
    <div className="w-full bg-slate-900 border border-slate-700/60 rounded-2xl p-4 md:p-6 text-slate-100 shadow-2xl my-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-700/80 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Chapter 1 (Class XII)
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Unit VI • Reproduction in Organisms &amp; Plants
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
            Sexual Reproduction in Flowering Plants
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab("microsporo")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "microsporo"
                ? "bg-emerald-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🌸 Microsporogenesis &amp; Pollen
          </button>
          <button
            onClick={() => setActiveTab("megasporo")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "megasporo"
                ? "bg-pink-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🌾 Ovule &amp; Embryo Sac
          </button>
          <button
            onClick={() => setActiveTab("pollination")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "pollination"
                ? "bg-amber-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🐝 Pollination &amp; SI Devices
          </button>
          <button
            onClick={() => setActiveTab("fertilization")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "fertilization"
                ? "bg-cyan-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            ⚡ Double Fertilization &amp; Seed
          </button>
          <button
            onClick={() => setActiveTab("apomixis")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "apomixis"
                ? "bg-purple-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🧬 Apomixis &amp; Polyembryony
          </button>
        </div>
      </div>

      {/* Tab 1: Microsporogenesis & Pollen Architecture */}
      {activeTab === "microsporo" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Anther Wall Concentric Layers */}
          <div className="bg-slate-950 p-4 md:p-5 rounded-xl border border-emerald-500/30 space-y-3">
            <h4 className="text-sm font-bold text-emerald-300 flex items-center justify-between">
              <span>🔬 Concentric Anther Wall Histology (Outer ➔ Inner)</span>
              <span className="text-[10px] text-slate-400 font-mono">Tetrasporangiate Bilobed Anther</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <div className="text-emerald-400 font-bold mb-1">1. Epidermis (Outer)</div>
                <p className="text-slate-300 text-[11px]">Single outermost protective cell layer; stretches during anther enlargement.</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <div className="text-amber-400 font-bold mb-1">2. Endothecium</div>
                <p className="text-slate-300 text-[11px]">
                  Sub-epidermal layer with hygroscopic <strong>α-cellulose fibrous bands</strong>. Shrinks on drying to drive dehiscence at the <strong>Stomium</strong>.
                </p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <div className="text-cyan-400 font-bold mb-1">3. Middle Layers</div>
                <p className="text-slate-300 text-[11px]">1–3 ephemeral parenchymatous layers; crushed and consumed during microsporogenesis.</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-emerald-700 bg-emerald-950/30">
                <div className="text-emerald-300 font-bold mb-1">4. Tapetum (Nutritive)</div>
                <p className="text-slate-300 text-[11px]">
                  Dense cytoplasm; polyploid/multinucleate via endomitosis. Secretes <strong>Callase</strong>, <strong>Ubisch bodies (Sporopollenin)</strong>, and <strong>Pollen-kit</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Pollen Grain Structure & Gametophyte Stages */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-amber-300">🧱 Pollen Wall (Sporoderm) Dual Layers</h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-900 rounded-lg border border-amber-900/40">
                  <div className="font-bold text-amber-400">Exine (Outer Sculptured Layer)</div>
                  <p className="text-slate-300 text-[11px] mt-0.5">
                    Composed of <strong>Sporopollenin</strong> (extremely resistant carotenoid biopolymer). Resists strong acids, alkalis, high temperatures, and enzymes. Interrupted at <strong>Germ Pores</strong>.
                  </p>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="font-bold text-cyan-400">Intine (Inner Thin Layer)</div>
                  <p className="text-slate-300 text-[11px] mt-0.5">
                    Continuous layer composed of <strong>Cellulose and Pectin</strong>; emerges through germ pore as the elongating pollen tube.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-emerald-300">🌱 Male Gametophyte Development</h4>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-2">
                <div className="text-[11px] text-slate-300 font-mono">
                  Microspore (n) ──► Asymmetric Mitosis ──► <strong>2-Celled Pollen (60% Angiosperms)</strong>
                </div>
                <ul className="text-slate-300 text-[11px] space-y-1 list-disc list-inside">
                  <li><strong>Vegetative Cell:</strong> Large, abundant food reserves, irregular lobed nucleus.</li>
                  <li><strong>Generative Cell:</strong> Small, spindle-shaped with dense cytoplasm, floats in vegetative cell.</li>
                </ul>
                <div className="p-2 bg-emerald-950/40 rounded border border-emerald-800 text-[10px] text-emerald-300">
                  <strong>3-Celled Stage (40% Angiosperms):</strong> Generative cell divides by 2nd mitosis before shedding, yielding 1 vegetative cell + 2 non-motile male gametes.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Megasporogenesis, Ovule Typology, & Embryo Sac */}
      {activeTab === "megasporo" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Ovule Typology */}
          <div className="bg-slate-950 p-4 rounded-xl border border-pink-500/30 space-y-3">
            <h4 className="text-sm font-bold text-pink-300 flex items-center justify-between">
              <span>🌾 Angiosperm Ovule Typology Matrix</span>
              <span className="text-[10px] text-slate-400 font-mono">Megasporangium Morphology</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 text-xs">
              <div className="p-2.5 bg-slate-900 rounded-lg border border-pink-700 bg-pink-950/20">
                <div className="text-pink-400 font-bold text-[11px]">1. Anatropous (82%)</div>
                <p className="text-slate-300 text-[10px] mt-1">180° inverted; micropyle lies adjacent to hilum/funicle (most common).</p>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <div className="text-amber-400 font-bold text-[11px]">2. Orthotropous</div>
                <p className="text-slate-300 text-[10px] mt-1">0° completely erect; micropyle, chalaza, and hilum aligned vertically (Polygonum).</p>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <div className="text-cyan-400 font-bold text-[11px]">3. Campylotropous</div>
                <p className="text-slate-300 text-[10px] mt-1">Curved ovule body; micropyle bent downward at right angles (Leguminosae, Mustard).</p>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <div className="text-purple-400 font-bold text-[11px]">4. Amphitropous</div>
                <p className="text-slate-300 text-[10px] mt-1">Both ovule body AND embryo sac curved into a horseshoe shape (Poaceae, Lemna).</p>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <div className="text-emerald-400 font-bold text-[11px]">5. Circinotropous</div>
                <p className="text-slate-300 text-[10px] mt-1">Funicle coils 360° completely around the ovule body (Opuntia / Cactaceae).</p>
              </div>
            </div>
          </div>

          {/* Polygonum-Type Embryo Sac */}
          <div className="bg-slate-950 p-4 md:p-5 rounded-xl border border-pink-500/30 space-y-3">
            <h4 className="text-sm font-bold text-pink-300">
              🧬 Monosporic Polygonum-Type Embryo Sac (7-Celled, 8-Nucleate)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-purple-800">
                <div className="text-purple-400 font-bold mb-1">Chalazal Pole (3 Cells)</div>
                <p className="text-slate-300 text-[11px]">
                  <strong>3 Antipodal Cells (n):</strong> Ephemeral, metabolically active cells; degenerate before or soon after fertilization.
                </p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-cyan-800">
                <div className="text-cyan-400 font-bold mb-1">Central Region (1 Large Cell)</div>
                <p className="text-slate-300 text-[11px]">
                  <strong>1 Central Cell with 2 Polar Nuclei (n + n):</strong> Fuses with 2nd male gamete to form triploid (3n) Primary Endosperm Nucleus (PEN).
                </p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-pink-800">
                <div className="text-pink-400 font-bold mb-1">Micropylar Pole (3 Cells)</div>
                <p className="text-slate-300 text-[11px]">
                  <strong>Egg Apparatus:</strong> 1 Egg Cell (n) [female gamete] + 2 Synergids (n) with <strong>Filiform Apparatus</strong> (finger-like wall folds secreting chemotropic attractants).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Pollination & Outbreeding Devices */}
      {activeTab === "pollination" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Pollination Types & Agencies */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-800/60 p-4 rounded-xl border border-amber-500/30 space-y-2">
              <h4 className="text-amber-400 font-bold text-sm">🐝 Pollination Vectors &amp; Agencies</h4>
              <div className="space-y-1.5 text-slate-300 text-[11px]">
                <p>• <strong>Anemophily (Wind):</strong> Light, dry, non-sticky pollen; feathery stigmas; single-ovule ovaries (Grasses, Maize).</p>
                <p>• <strong>Epihydrophily (Water Surface):</strong> Female flowers on long uncoiling stalks (<em>Vallisneria</em>).</p>
                <p>• <strong>Hypohydrophily (Submerged):</strong> Ribbon-like pollen lacking exine, specific gravity matches water (<em>Zostera</em>).</p>
                <p>• <strong>Entomophily (Insects):</strong> Bright petals, nectar, sticky <strong>Pollen-kit</strong> (Rose, Yucca-Pronuba mutualism).</p>
              </div>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-cyan-500/30 space-y-2">
              <h4 className="text-cyan-400 font-bold text-sm">🛡️ Outbreeding Contrivances</h4>
              <div className="space-y-1.5 text-slate-300 text-[11px]">
                <p>• <strong>Dicliny:</strong> Unisexual flowers (Monoecious prevents autogamy; Dioecious prevents autogamy &amp; geitonogamy).</p>
                <p>• <strong>Dichogamy:</strong> Temporal separation (Protandry: anthers first; Protogyny: stigma first).</p>
                <p>• <strong>Herkogamy:</strong> Physical barriers separating anthers and stigma (<em>Calotropis</em>).</p>
                <p>• <strong>Heterostyly:</strong> Different style and stamen lengths (<em>Primula</em>).</p>
                <p>• <strong>Self-Incompatibility (SI):</strong> Genetic S-locus pollen inhibition (Gametophytic GSI vs Sporophytic SSI).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Double Fertilization & Seed Development */}
      {activeTab === "fertilization" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Double Fertilization Equation */}
          <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30 space-y-3">
            <h4 className="text-sm font-bold text-cyan-300 flex items-center justify-between">
              <span>⚡ Double Fertilization Mechanics (S.G. Nawaschin, 1898)</span>
              <span className="text-[10px] text-slate-400 font-mono">Angiosperm Exclusive Hallmark</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-cyan-800">
                <div className="font-bold text-cyan-400 mb-1">1. Syngamy (Generative Fertilization)</div>
                <p className="text-slate-300 font-mono text-[11px]">1st Male Gamete (n) + Egg Cell (n) ➔ Zygote (2n) ➔ Embryo (2n)</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-amber-800">
                <div className="font-bold text-amber-400 mb-1">2. Triple Fusion (Vegetative Fertilization)</div>
                <p className="text-slate-300 font-mono text-[11px]">2nd Male Gamete (n) + 2 Polar Nuclei (2n) ➔ Primary Endosperm Nucleus (PEN, 3n)</p>
              </div>
            </div>
          </div>

          {/* Endosperm & Seed Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 space-y-2">
              <h4 className="text-emerald-400 font-bold text-sm">🥥 Endosperm Development Types</h4>
              <ul className="text-slate-300 text-[11px] space-y-1">
                <li>• <strong>Free-Nuclear:</strong> Repeated nuclear divisions without walls (Coconut water).</li>
                <li>• <strong>Cellular:</strong> Division followed immediately by cytokinesis (Coconut meat, Datura).</li>
                <li>• <strong>Helobial:</strong> Intermediate monocot type; 1st division makes 2 chambers.</li>
              </ul>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 space-y-2">
              <h4 className="text-purple-400 font-bold text-sm">🌾 Seed Transformations &amp; Perisperm</h4>
              <ul className="text-slate-300 text-[11px] space-y-1">
                <li>• <strong>Integuments ➔ Seed Coat:</strong> Outer <em>Testa</em> + Inner <em>Tegmen</em>.</li>
                <li>• <strong>Perisperm (2n):</strong> Persistent nucellus remnant (Black Pepper, Beet).</li>
                <li>• <strong>Albuminous (3n retained):</strong> Castor, Maize, Wheat, Sunflower.</li>
                <li>• <strong>Exalbuminous (3n consumed):</strong> Pea, Bean, Gram, Groundnut.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Apomixis, Parthenocarpy, & Polyembryony */}
      {activeTab === "apomixis" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-800/60 p-4 rounded-xl border border-purple-500/30 space-y-2">
              <h4 className="text-purple-400 font-bold text-sm">1. Apomixis (Agamospermy)</h4>
              <p className="text-slate-300 text-[11px]">
                Asexual reproduction mimicking seed formation <strong>without meiosis or syngamy</strong>.
              </p>
              <ul className="text-slate-400 text-[10px] space-y-1 mt-2">
                <li>• <strong>Adventive Embryony:</strong> Diploid nucellar cells form embryos (Citrus, Mango).</li>
                <li>• <strong>Apospory:</strong> Somatic nucellar cell forms diploid embryo sac.</li>
                <li>• <strong>Diplospory:</strong> Unreduced MMC forms diploid embryo sac.</li>
              </ul>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-amber-500/30 space-y-2">
              <h4 className="text-amber-400 font-bold text-sm">2. Parthenocarpy</h4>
              <p className="text-slate-300 text-[11px]">
                Development of fruits <strong>WITHOUT fertilization of ovules</strong>, yielding naturally or chemically induced seedless fruits.
              </p>
              <p className="text-slate-400 text-[10px] mt-2">
                <em>Examples: Banana, Seedless Grapes, Pineapple. Induced by Auxins and Gibberellins.</em>
              </p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-cyan-500/30 space-y-2">
              <h4 className="text-cyan-400 font-bold text-sm">3. Polyembryony</h4>
              <p className="text-slate-300 text-[11px]">
                Occurrence of <strong>&gt;1 embryo within a single seed</strong> (discovered by Antonie van Leeuwenhoek in 1719).
              </p>
              <p className="text-slate-400 text-[10px] mt-2">
                <em>Common in Citrus, Mango, and Gymnosperms (Pinus cleavage polyembryony).</em>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
