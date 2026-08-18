"use client";

import React, { useState } from "react";

export function EcosystemDiagram() {
  const [activeTab, setActiveTab] = useState<
    "stratification" | "decomposition" | "energy_flow" | "food_chains" | "pyramids"
  >("stratification");

  return (
    <div className="w-full bg-slate-900 border border-slate-700/60 rounded-2xl p-4 md:p-6 text-slate-100 shadow-2xl my-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-700/80 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Chapter 12 (Class XII)
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Unit X • Ecology
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
            Ecosystem Structure, Function &amp; Bioenergetics
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab("stratification")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "stratification"
                ? "bg-emerald-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🌲 Stratification &amp; NPP
          </button>
          <button
            onClick={() => setActiveTab("decomposition")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "decomposition"
                ? "bg-amber-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🍂 Decomposition (5 Steps)
          </button>
          <button
            onClick={() => setActiveTab("energy_flow")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "energy_flow"
                ? "bg-cyan-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            ⚡ Energy Flow &amp; 10% Law
          </button>
          <button
            onClick={() => setActiveTab("food_chains")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "food_chains"
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🥗 GFC vs DFC
          </button>
          <button
            onClick={() => setActiveTab("pyramids")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "pyramids"
                ? "bg-rose-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            📐 Ecological Pyramids
          </button>
        </div>
      </div>

      {/* Tab 1: Stratification & NPP */}
      {activeTab === "stratification" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Vertical Stratification */}
          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-3">
            <h4 className="text-sm font-bold text-emerald-300">🌲 Vertical Stratification in Forests</h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800"><strong className="text-emerald-400 block">1. Canopy</strong>Tall trees (direct sun)</div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800"><strong className="text-teal-400 block">2. Understory</strong>Small trees &amp; shrubs</div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800"><strong className="text-cyan-400 block">3. Herb Layer</strong>Perennial herbs &amp; ferns</div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800"><strong className="text-amber-400 block">4. Forest Floor</strong>Grasses, mosses, litter</div>
            </div>
          </div>

          {/* Productivity & Global NPP */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <strong className="text-cyan-400 block font-semibold text-sm">🌱 Gross vs Net Primary Productivity</strong>
              <p className="text-slate-300 font-mono bg-slate-900 p-2 rounded-lg text-center text-sm border border-slate-800">
                NPP = GPP - R
              </p>
              <p className="text-slate-400 text-[11px]">
                GPP = Total photosynthetic fixation | R = Autotrophic respiration losses | NPP = Biomass available to heterotrophs.
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <strong className="text-yellow-400 block font-semibold text-sm">🌍 Global NPP (170 Billion Tonnes Dry Wt)</strong>
              <p className="text-slate-300">• <strong>Land (30% area):</strong> 115 Billion Tonnes (<strong>67.6%</strong> of global NPP).</p>
              <p className="text-slate-300">• <strong>Oceans (70% area):</strong> ONLY 55 Billion Tonnes (<strong>32.4%</strong>) due to light limit (&lt;200 m euphotic zone) and N/P/Fe nutrient deficit.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Decomposition */}
      {activeTab === "decomposition" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-3">
            <h4 className="text-sm font-bold text-amber-300">🍂 The 5 Steps of Detritus Decomposition</h4>
            <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 space-y-2 border border-slate-800">
              <p>1. <strong>Fragmentation:</strong> Detritivores (earthworms) break detritus into smaller fragments.</p>
              <p>2. <strong>Leaching:</strong> Water-soluble inorganic nutrients percolate into soil horizons and precipitate.</p>
              <p>3. <strong>Catabolism:</strong> Extracellular fungal &amp; bacterial enzymes digest complex polymers into simple inorganics.</p>
              <p>4. <strong>Humification:</strong> Accumulation of dark, amorphous, colloidal <strong>Humus</strong> (resistant to microbes).</p>
              <p>5. <strong>Mineralization:</strong> Complete microbial breakdown of humus releasing free mineral ions (Ca²⁺, Mg²⁺, K⁺, NH₄⁺).</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-500/30 space-y-1.5">
              <strong className="text-emerald-300 block font-semibold">⚡ Fast Decomposition</strong>
              <p className="text-slate-300">Warm temperatures (&gt;25°C), high soil moisture, aerobic conditions, and detritus rich in <strong>Nitrogen and water-soluble sugars</strong>.</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-rose-500/30 space-y-1.5">
              <strong className="text-rose-300 block font-semibold">🛑 Slow Decomposition &amp; Peat Formation</strong>
              <p className="text-slate-300">Cold temperatures (&lt;10°C), <strong>Anaerobic conditions</strong>, and detritus rich in <strong>Lignin, Chitin, and Suberin</strong> (leads to Peat bogs).</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Energy Flow & 10% Law */}
      {activeTab === "energy_flow" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Solar Radiation & PAR */}
            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30 space-y-2">
              <strong className="text-cyan-300 block font-semibold text-sm">☀️ PAR Radiation Capture</strong>
              <p className="text-slate-300">• <strong>50%</strong> of Incident Solar Radiation is <strong>PAR (400–700 nm)</strong>.</p>
              <p className="text-slate-300">• Green plants capture only <strong>2–10% of PAR</strong> (1–5% of Total Incident Sunlight).</p>
              <p className="text-slate-400 text-[11px]">• Governed strictly by 1st &amp; 2nd Laws of Thermodynamics (energy is unidirectional; entropy increases via respiratory heat loss R).</p>
            </div>

            {/* Lindeman's 10% Law */}
            <div className="bg-slate-950 p-4 rounded-xl border border-teal-500/30 space-y-2">
              <strong className="text-teal-300 block font-semibold text-sm">⚡ Lindeman&apos;s 10% Law (1942)</strong>
              <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-xs space-y-1 text-slate-300 border border-slate-800">
                <p>T₄ (Tertiary Consumer): <span className="text-amber-300">1 J</span></p>
                <p>T₃ (Secondary Consumer): <span className="text-cyan-300">10 J</span></p>
                <p>T₂ (Primary Consumer): <span className="text-emerald-300">100 J</span></p>
                <p>T₁ (Primary Producer): <span className="text-teal-300">1,000 J</span></p>
                <p>Incident Solar PAR: <span className="text-yellow-300">100,000 J</span></p>
              </div>
              <p className="text-slate-400 text-[11px]">90% of energy is lost as heat at each transfer; limits food chains to 3–5 levels.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: GFC vs DFC */}
      {activeTab === "food_chains" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-2">
              <strong className="text-indigo-300 block font-semibold text-sm">🌊 Grazing Food Chain (GFC)</strong>
              <p className="text-slate-300">Producers (T₁) ➔ Herbivores (T₂) ➔ Carnivores (T₃).</p>
              <p className="text-indigo-400 font-bold">• Major conduit for energy flow in AQUATIC ecosystems.</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2">
              <strong className="text-emerald-300 block font-semibold text-sm">🍂 Detritus Food Chain (DFC)</strong>
              <p className="text-slate-300">Dead organic detritus ➔ Saprophytic microbes ➔ Detritivores.</p>
              <p className="text-emerald-400 font-bold">• Major conduit for energy flow in TERRESTRIAL ecosystems.</p>
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5 text-xs">
            <h4 className="text-sm font-bold text-white">🌾 Standing Crop vs Standing State</h4>
            <p className="text-slate-300">• <strong>Standing Crop:</strong> Total living biomass (dry weight, g/m²) or number of living organisms at a specific time.</p>
            <p className="text-slate-300">• <strong>Standing State:</strong> Total amount of inorganic nutrients (N, P, K, Ca) present in soil at a given time.</p>
          </div>
        </div>
      )}

      {/* Tab 5: Ecological Pyramids */}
      {activeTab === "pyramids" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-cyan-500/30 space-y-1.5">
              <strong className="text-cyan-300 block font-semibold text-sm">🔢 Pyramid of Numbers</strong>
              <p className="text-slate-300">• <strong>Upright:</strong> Grassland &amp; Pond.</p>
              <p className="text-amber-400">• <strong>Inverted / Spindle:</strong> Single Tree ecosystem (1 tree ➔ 1000s of insects ➔ hyper-parasites).</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-teal-500/30 space-y-1.5">
              <strong className="text-teal-300 block font-semibold text-sm">⚖️ Pyramid of Biomass</strong>
              <p className="text-slate-300">• <strong>Upright:</strong> Forest &amp; Grassland.</p>
              <p className="text-amber-400">• <strong>INVERTED:</strong> Open Ocean / Sea (Phytoplankton small biomass, high turnover ➔ large Fish biomass).</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-rose-500/30 space-y-1.5">
              <strong className="text-rose-300 block font-semibold text-sm">⚡ Pyramid of Energy</strong>
              <p className="text-emerald-400 font-bold">• ALWAYS UPRIGHT WITHOUT EXCEPTION!</p>
              <p className="text-slate-300">Energy declines at each step due to 10% law and 2nd Law of Thermodynamics.</p>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5 text-xs">
            <h4 className="text-sm font-bold text-amber-300">⚠️ Eltonian Pyramid Limitations</h4>
            <p className="text-slate-300">1. Assumes simple linear chains (ignores complex food webs).</p>
            <p className="text-slate-300">2. Fails when a species occupies multiple trophic levels (e.g. sparrows eating seeds &amp; insects).</p>
            <p className="text-slate-300">3. <strong>Completely excludes decomposers / saprotrophs</strong> despite their vital nutrient cycling role.</p>
          </div>
        </div>
      )}
    </div>
  );
}
