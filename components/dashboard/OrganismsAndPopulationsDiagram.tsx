"use client";

import React, { useState } from "react";

export function OrganismsAndPopulationsDiagram() {
  const [activeTab, setActiveTab] = useState<
    "age_pyramids" | "growth_models" | "life_history" | "mutualism_ophrys" | "competition_predation"
  >("age_pyramids");

  return (
    <div className="w-full bg-slate-900 border border-slate-700/60 rounded-2xl p-4 md:p-6 text-slate-100 shadow-2xl my-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-700/80 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Chapter 11 (Class XII)
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Unit X • Ecology
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
            Organisms and Populations
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab("age_pyramids")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "age_pyramids"
                ? "bg-emerald-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            📊 Age Pyramids
          </button>
          <button
            onClick={() => setActiveTab("growth_models")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "growth_models"
                ? "bg-cyan-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            📈 Growth Models (J &amp; S)
          </button>
          <button
            onClick={() => setActiveTab("life_history")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "life_history"
                ? "bg-amber-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            ⚖️ r vs K Strategies
          </button>
          <button
            onClick={() => setActiveTab("mutualism_ophrys")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "mutualism_ophrys"
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🤝 Mutualism &amp; Ophrys
          </button>
          <button
            onClick={() => setActiveTab("competition_predation")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "competition_predation"
                ? "bg-rose-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            ⚔️ Competition &amp; Predation
          </button>
        </div>
      </div>

      {/* Tab 1: Age Pyramids */}
      {activeTab === "age_pyramids" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Attributes & Rates */}
          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-3">
            <h4 className="text-sm font-bold text-emerald-300">👥 Population Attributes &amp; Vital Rates</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold block">🐣 Natality (Birth Rate, b)</span>
                <p>Per capita births per unit time: <code className="text-emerald-300">b = ΔN_births / (N₀ · Δt)</code></p>
                <p className="text-slate-400 text-[11px]">Example: 20 lotus plants ➔ 28 lotus in 1 year = 0.4 per lotus/year.</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-rose-400 font-bold block">💀 Mortality (Death Rate, d)</span>
                <p>Per capita deaths per unit time: <code className="text-rose-300">d = ΔN_deaths / (N₀ · Δt)</code></p>
                <p className="text-slate-400 text-[11px]">Example: 40 fruitflies ➔ 4 deaths in 1 week = 0.1 per fruitfly/week.</p>
              </div>
            </div>
          </div>

          {/* Age Pyramid Morphologies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-teal-500/30 space-y-2">
              <strong className="text-teal-300 block font-semibold text-sm">📐 Expanding (Triangular)</strong>
              <p className="text-slate-300">
                <strong>Broad Base:</strong> Pre-reproductive &gt; Reproductive &gt; Post-reproductive.
              </p>
              <p className="text-teal-400 font-mono text-[11px]">➔ Rapidly growing population.</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-blue-500/30 space-y-2">
              <strong className="text-blue-300 block font-semibold text-sm">🔔 Stable (Bell-Shaped)</strong>
              <p className="text-slate-300">
                <strong>Moderate Base:</strong> Pre-reproductive ≈ Reproductive.
              </p>
              <p className="text-blue-400 font-mono text-[11px]">➔ Zero population growth (stationary).</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-amber-500/30 space-y-2">
              <strong className="text-amber-300 block font-semibold text-sm">🏺 Declining (Urn-Shaped)</strong>
              <p className="text-slate-300">
                <strong>Narrow Base:</strong> Pre-reproductive &lt; Reproductive.
              </p>
              <p className="text-amber-400 font-mono text-[11px]">➔ Negative growth (shrinking population).</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Growth Models */}
      {activeTab === "growth_models" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Population Equation */}
          <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30 space-y-2 text-xs">
            <h4 className="text-sm font-bold text-cyan-300">📊 Population Dynamics Equation</h4>
            <p className="text-slate-300 font-mono text-sm bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-center">
              N_(t+1) = N_t + [(B + I) - (D + E)]
            </p>
            <p className="text-slate-400 text-[11px]">
              B = Natality, I = Immigration (adds individuals) | D = Mortality, E = Emigration (removes individuals).
            </p>
          </div>

          {/* Exponential vs Logistic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <strong className="text-cyan-400 block font-semibold text-sm">📈 Exponential Growth (J-Curve)</strong>
              <p className="text-slate-300">Occurs when resources (food, space) are <strong>unlimited</strong>.</p>
              <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-cyan-300 space-y-1">
                <p>dN/dt = rN = (b - d)N</p>
                <p>N_t = N₀ · e^(rt)</p>
                <p>t_double = ln(2)/r ≈ 0.693/r</p>
              </div>
              <p className="text-slate-400 text-[11px]"><em>r</em> = Intrinsic rate of natural increase (Malthusian parameter).</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <strong className="text-emerald-400 block font-semibold text-sm">📉 Logistic Growth (S-Curve / Sigmoid)</strong>
              <p className="text-slate-300">Verhulst-Pearl model with finite resources &amp; <strong>Carrying Capacity (K)</strong>.</p>
              <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-emerald-300 space-y-1">
                <p>dN/dt = rN · [(K - N) / K]</p>
                <p>Max dN/dt at: N = K / 2</p>
                <p>At N = K: dN/dt = 0 (Asymptote)</p>
              </div>
              <p className="text-slate-400 text-[11px]">Phases: Lag ➔ Log / Acceleration ➔ Deceleration ➔ Asymptote.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: r vs K Strategies */}
      {activeTab === "life_history" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* r-Selected */}
            <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-2">
              <strong className="text-amber-300 block font-semibold text-sm">⚡ r-Selected Species (Opportunistic)</strong>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li><strong>Habitat:</strong> Unstable, unpredictable, frequently disturbed.</li>
                <li><strong>Body Size &amp; Lifespan:</strong> Small body size; short life cycle.</li>
                <li><strong>Offspring Strategy:</strong> Produces <strong>many small offspring</strong>.</li>
                <li><strong>Parental Care:</strong> Absent or minimal.</li>
                <li><strong>Survivorship:</strong> Type III curve (high early juvenile mortality).</li>
                <li><strong>Taxa:</strong> Insects, marine oysters, weeds, pelagic fish.</li>
              </ul>
            </div>

            {/* K-Selected */}
            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-2">
              <strong className="text-indigo-300 block font-semibold text-sm">🐘 K-Selected Species (Equilibrium)</strong>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li><strong>Habitat:</strong> Stable, crowded, near carrying capacity (N ≈ K).</li>
                <li><strong>Body Size &amp; Lifespan:</strong> Large body size; long lifespan.</li>
                <li><strong>Offspring Strategy:</strong> Produces <strong>few large offspring</strong>.</li>
                <li><strong>Parental Care:</strong> Extensive, high parental investment.</li>
                <li><strong>Survivorship:</strong> Type I curve (low early juvenile mortality).</li>
                <li><strong>Taxa:</strong> Elephants, primates, humans, whales, large trees.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Mutualism & Ophrys */}
      {activeTab === "mutualism_ophrys" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Interaction Spectrum Table */}
          <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-3">
            <h4 className="text-sm font-bold text-indigo-300">🤝 Interspecific Population Interactions</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800"><span className="text-emerald-400 font-bold">Mutualism (+/+)</span>: Both benefit</div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800"><span className="text-rose-400 font-bold">Competition (-/-)</span>: Both harmed</div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800"><span className="text-amber-400 font-bold">Predation (+/-)</span>: Predator kills prey</div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800"><span className="text-purple-400 font-bold">Parasitism (+/-)</span>: Parasite exploits host</div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800"><span className="text-cyan-400 font-bold">Commensalism (+/0)</span>: One +, other 0</div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800"><span className="text-slate-400 font-bold">Amensalism (-/0)</span>: One -, other 0</div>
            </div>
          </div>

          {/* Mutualism Examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <strong className="text-indigo-400 block font-semibold text-sm">🌺 Ophrys Orchid &amp; Sexual Deceit</strong>
              <p className="text-slate-300">
                The Mediterranean orchid <em>Ophrys</em> mimics female solitary bee (<em>Colletes</em>) appearance on its petal.
              </p>
              <p className="text-slate-400 text-[11px]">
                Male bee attempts <strong>Pseudocopulation</strong>, transferring pollen sacs. Obligates <strong>co-evolution</strong> between orchid and bee.
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <strong className="text-emerald-400 block font-semibold text-sm">🌿 Obligate Symbioses</strong>
              <p className="text-slate-300">• <strong>Lichens:</strong> Fungus (Mycobiont) + Algae/Cyanobacteria (Phycobiont).</p>
              <p className="text-slate-300">• <strong>Mycorrhizae:</strong> <em>Glomus</em> fungus absorbs phosphorus for roots.</p>
              <p className="text-slate-300">• <strong>Fig &amp; Wasp:</strong> <em>Ficus</em> + <em>Blastophaga</em> wasp (obligate oviposition &amp; pollination).</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Competition & Predation */}
      {activeTab === "competition_predation" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Competition */}
          <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 space-y-2 text-xs">
            <h4 className="text-sm font-bold text-rose-300">⚔️ Competition (-/-) Field Evidence</h4>
            <div className="space-y-1.5 text-slate-300">
              <p>• <strong>Gause's Competitive Exclusion Principle (1934):</strong> Two species competing for the same limiting resource cannot coexist (<em>P. aurelia</em> excludes <em>P. caudatum</em>).</p>
              <p>• <strong>Connell's Competitive Release:</strong> Removing dominant barnacle <em>Balanus</em> allows smaller <em>Chthamalus</em> to expand into lower intertidal zone.</p>
              <p>• <strong>MacArthur's Resource Partitioning (1958):</strong> 5 Warbler species coexisted on a single spruce tree by hunting at different heights and times.</p>
            </div>
          </div>

          {/* Predation & Parasitism */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <strong className="text-amber-400 block font-semibold text-sm">🦁 Predation (+/-) Dynamics</strong>
              <p className="text-slate-300">• <strong>Pisaster Starfish Removal:</strong> Removal caused extinction of &gt;10 invertebrate species (predators maintain diversity by preventing competitive exclusion).</p>
              <p className="text-slate-300">• <strong>Monarch Butterfly:</strong> Sequesters toxic <strong>Cardiac Glycosides</strong> from milkweed caterpillars for defense.</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <strong className="text-purple-400 block font-semibold text-sm">🪱 Parasitism &amp; Commensalism</strong>
              <p className="text-slate-300">• <strong>Cuscuta:</strong> Total stem parasite lacking chlorophyll; uses <strong>haustoria</strong>.</p>
              <p className="text-slate-300">• <strong>Brood Parasitism:</strong> Cuckoo (Koel) lays eggs in Crow nests (eggs mimic host).</p>
              <p className="text-slate-300">• <strong>Commensalism (+/0):</strong> Epiphytic Orchid on Mango; Cattle Egret &amp; Grazing Cattle.</p>
              <p className="text-slate-300">• <strong>Amensalism (-/0):</strong> <em>Penicillium</em> producing Penicillin; Walnut <em>Juglone</em> allelopathy.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
