"use client";

import React, { useState } from "react";

export function BiodiversityDiagram() {
  const [activeTab, setActiveTab] = useState<
    "levels" | "gradients" | "evil_quartet" | "in_situ" | "ex_situ"
  >("levels");

  return (
    <div className="w-full bg-slate-900 border border-slate-700/60 rounded-2xl p-4 md:p-6 text-slate-100 shadow-2xl my-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-700/80 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Chapter 13 (Class XII)
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Unit X • Ecology
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
            Biodiversity Patterns, Extinction &amp; Conservation
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab("levels")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "levels"
                ? "bg-emerald-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🌐 Levels &amp; May Estimate
          </button>
          <button
            onClick={() => setActiveTab("gradients")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "gradients"
                ? "bg-cyan-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🗺️ Gradients &amp; S=CAᶻ
          </button>
          <button
            onClick={() => setActiveTab("evil_quartet")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "evil_quartet"
                ? "bg-rose-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            ⚠️ The Evil Quartet
          </button>
          <button
            onClick={() => setActiveTab("in_situ")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "in_situ"
                ? "bg-amber-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🛡️ In-Situ &amp; Hotspots
          </button>
          <button
            onClick={() => setActiveTab("ex_situ")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "ex_situ"
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            ❄️ Ex-Situ &amp; Conventions
          </button>
        </div>
      </div>

      {/* Tab 1: Levels & Estimates */}
      {activeTab === "levels" && (
        <div className="space-y-6 animate-fadeIn">
          {/* 3 Levels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-500/30 space-y-1.5">
              <strong className="text-emerald-300 block font-semibold text-sm">🧬 1. Genetic Diversity</strong>
              <p className="text-slate-300">Within a single species: <em>Rauvolfia vomitoria</em> (Reserpine alkaloid chemical potency variations across Himalayas); &gt;50,000 rice strains &amp; 1,000 mango varieties in India.</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-cyan-500/30 space-y-1.5">
              <strong className="text-cyan-300 block font-semibold text-sm">🐸 2. Species Diversity</strong>
              <p className="text-slate-300">Variety of species within a defined region: Western Ghats amphibian species richness is significantly greater than Eastern Ghats.</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-amber-500/30 space-y-1.5">
              <strong className="text-amber-300 block font-semibold text-sm">🏞️ 3. Ecological Diversity</strong>
              <p className="text-slate-300">Variety of ecosystem types within a biome: India (deserts, rainforests, mangroves, coral reefs, wetlands) &gt; Scandinavia (Norway).</p>
            </div>
          </div>

          {/* Taxonomic Proportions & India Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <strong className="text-yellow-400 block font-semibold text-sm">📊 Global Estimates (Robert May = 7 Million)</strong>
              <p className="text-slate-300">• <strong>Animals:</strong> &gt;70% of described species (Insects make up &gt;70% of all animals!).</p>
              <p className="text-slate-300">• <strong>Plants:</strong> &lt;22% of described species.</p>
              <p className="text-emerald-400 font-bold">• Fungi species on Earth &gt; Fishes + Amphibians + Reptiles + Mammals combined!</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <strong className="text-teal-400 block font-semibold text-sm">🇮🇳 Indian Biodiversity Profile</strong>
              <p className="text-slate-300">• <strong>Land Area:</strong> 2.4% of world total.</p>
              <p className="text-slate-300">• <strong>Global Species Diversity:</strong> <strong>8.1%</strong> (Ranks among 12 Mega-Diversity nations).</p>
              <p className="text-slate-400 text-[11px]">• ≈45,000 plant species and &gt;90,000 animal species recorded.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Gradients & Species-Area */}
      {activeTab === "gradients" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Latitudinal Gradients & Amazon */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30 space-y-2">
              <strong className="text-cyan-300 block font-semibold text-sm">🌍 Latitudinal Gradients (Tropics &gt; Temperate &gt; Polar)</strong>
              <p className="text-slate-300">• Colombia (Equator): 1,400 bird species; New York (41°N): 105; Greenland (71°N): 56.</p>
              <p className="text-slate-300"><strong>Why Tropics Harbor High Diversity:</strong></p>
              <p className="text-slate-400">1. Undisturbed speciation time (no glaciations). 2. Predictable, constant climate. 3. High solar insolation &amp; NPP.</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2">
              <strong className="text-emerald-300 block font-semibold text-sm">🌴 Amazonian Rainforest (&quot;Lungs of the Planet&quot;)</strong>
              <p className="text-slate-300">• &gt;40,000 Plants | 3,000 Fishes | 1,300 Birds</p>
              <p className="text-slate-300">• 427 Mammals | 427 Amphibians | 378 Reptiles | &gt;125,000 Invertebrates</p>
              <p className="text-emerald-400 font-bold">• Produces 20% of Earth&apos;s atmospheric oxygen.</p>
            </div>
          </div>

          {/* Species-Area Relationship */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
            <strong className="text-yellow-400 block font-semibold text-sm">📐 Species-Area Relationship (Alexander von Humboldt)</strong>
            <p className="text-slate-300 font-mono bg-slate-900 p-2.5 rounded-lg text-center text-sm border border-slate-800">
              S = C Aᶻ  ➔  log S = log C + Z log A
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
              <p>• <strong>Regional Scale:</strong> Z = <strong>0.1 to 0.2</strong> regardless of taxonomic group or continent.</p>
              <p>• <strong>Continental Scale:</strong> Z = <strong>0.6 to 1.2</strong> (Frugivorous birds/mammals in tropical forests Z = 1.15).</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Evil Quartet */}
      {activeTab === "evil_quartet" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Evil Quartet Matrix */}
          <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 space-y-3">
            <h4 className="text-sm font-bold text-rose-300">⚠️ The &quot;Evil Quartet&quot; (Extinction Drivers)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <strong className="text-rose-400 block">1. Habitat Loss</strong>
                Most primary cause! Amazon cleared for soy &amp; cattle.
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <strong className="text-amber-400 block">2. Over-Exploitation</strong>
                Commercial over-harvesting (Steller&apos;s Sea Cow, Passenger Pigeon).
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <strong className="text-cyan-400 block">3. Alien Invasions</strong>
                Nile Perch (Lake Victoria) &amp; invasive weeds (<em>Parthenium</em>).
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <strong className="text-purple-400 block">4. Co-Extinctions</strong>
                Obligate mutualist/host loss kills dependent parasite/pollinator.
              </div>
            </div>
          </div>

          {/* Ehrlich & Tilman */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <strong className="text-indigo-300 block font-semibold">✈️ Paul Ehrlich&apos;s Rivet Popper Hypothesis</strong>
              <p className="text-slate-300">Airplane = Ecosystem; Rivets = Species; Popping rivets on wings = Extinction of a <strong>Keystone Species</strong> causing structural collapse.</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <strong className="text-emerald-300 block font-semibold">🌾 David Tilman&apos;s Grassland Plots</strong>
              <p className="text-slate-300">Long-term plots proved higher species richness produces <strong>less year-to-year biomass variation</strong> and higher overall productivity.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: In-Situ & Hotspots */}
      {activeTab === "in_situ" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Hotspots */}
          <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-2 text-xs">
            <strong className="text-amber-300 block font-semibold text-sm">🔥 Biodiversity Hotspots (Norman Myers)</strong>
            <p className="text-slate-300">• <strong>Criteria:</strong> High species richness, high <strong>Endemism</strong>, and under severe threat.</p>
            <p className="text-slate-300">• <strong>Global:</strong> 34 Hotspots (&lt;2% land area, but protection reduces mass extinction by &gt;30%).</p>
            <p className="text-emerald-400 font-bold">• <strong>India&apos;s 3 Hotspots:</strong> 1. Western Ghats &amp; Sri Lanka, 2. Indo-Burma, 3. Himalaya.</p>
          </div>

          {/* Protected Areas & Sacred Groves */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <strong className="text-teal-300 block font-semibold">🏞️ India Protected Area Network</strong>
              <p className="text-slate-300">• <strong>14 Biosphere Reserves</strong> (Core, Buffer, Transition zones).</p>
              <p className="text-slate-300">• <strong>90 National Parks</strong> (Strict protection; ZERO human activity).</p>
              <p className="text-slate-300">• <strong>448 Wildlife Sanctuaries</strong> (Limited forestry allowed).</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <strong className="text-emerald-300 block font-semibold">🌳 Sacred Groves (Cultural In-Situ Sanctuaries)</strong>
              <p className="text-slate-300">• Khasi &amp; Jaintia Hills in Meghalaya</p>
              <p className="text-slate-300">• Aravalli Hills of Rajasthan</p>
              <p className="text-slate-300">• Western Ghat regions of Karnataka &amp; Maharashtra</p>
              <p className="text-slate-300">• Sarguja, Chanda, and Bastar areas of Madhya Pradesh</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Ex-Situ & Conventions */}
      {activeTab === "ex_situ" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Ex-Situ */}
          <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-2 text-xs">
            <strong className="text-indigo-300 block font-semibold text-sm">❄️ Ex-Situ (Off-Site) Conservation Modalities</strong>
            <p className="text-slate-300">• <strong>Zoological Parks, Botanical Gardens, &amp; Safari Parks:</strong> Care facilities for endangered fauna/flora.</p>
            <p className="text-slate-300">• <strong>Cryopreservation:</strong> Gametes preserved in <strong>Liquid Nitrogen at -196°C</strong> in viable condition for decades.</p>
            <p className="text-slate-300">• <strong>Seed Banks &amp; In-Vitro Tissue Culture:</strong> Long-term germplasm storage.</p>
          </div>

          {/* Conventions & IUCN Red List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <strong className="text-cyan-300 block font-semibold">🌍 Global Conventions</strong>
              <p className="text-slate-300">• <strong>Earth Summit (Rio 1992):</strong> UN Convention on Biological Diversity.</p>
              <p className="text-slate-300">• <strong>World Summit (Johannesburg 2002):</strong> 190 nations pledged 2010 reduction target.</p>
              <p className="text-slate-300">• <strong>Ramsar Convention (1971):</strong> Wetland preservation.</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <strong className="text-rose-300 block font-semibold">📖 IUCN Red List Hierarchy</strong>
              <p className="text-slate-300">EX ➔ EW ➔ <strong>CR ➔ EN ➔ VU</strong> ➔ NT ➔ LC.</p>
              <p className="text-amber-400 font-bold">• Threatened Species = Critically Endangered (CR) + Endangered (EN) + Vulnerable (VU).</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
