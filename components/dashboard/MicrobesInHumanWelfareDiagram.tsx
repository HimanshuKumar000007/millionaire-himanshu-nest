"use client";

import React, { useState } from "react";

export function MicrobesInHumanWelfareDiagram() {
  const [activeTab, setActiveTab] = useState<
    "household" | "industrial" | "bioactive" | "sewage_bod" | "biogas_biocontrol"
  >("household");

  return (
    <div className="w-full bg-slate-900 border border-slate-700/60 rounded-2xl p-4 md:p-6 text-slate-100 shadow-2xl my-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-700/80 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Chapter 8 (Class XII)
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Unit VIII • Biology in Human Welfare
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
            Microbes in Human Welfare
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab("household")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "household"
                ? "bg-emerald-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🧀 Household &amp; Dairy
          </button>
          <button
            onClick={() => setActiveTab("industrial")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "industrial"
                ? "bg-amber-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🍷 Fermentation &amp; Antibiotics
          </button>
          <button
            onClick={() => setActiveTab("bioactive")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "bioactive"
                ? "bg-cyan-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🧪 Bioactive Molecules
          </button>
          <button
            onClick={() => setActiveTab("sewage_bod")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "sewage_bod"
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            💧 Sewage &amp; BOD (STP)
          </button>
          <button
            onClick={() => setActiveTab("biogas_biocontrol")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "biogas_biocontrol"
                ? "bg-purple-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🌿 Biogas &amp; Biocontrol
          </button>
        </div>
      </div>

      {/* Tab 1: Household & Dairy */}
      {activeTab === "household" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300">
                Dairy Fermentation
              </span>
              <h4 className="text-sm font-bold text-white">Lactic Acid Bacteria (LAB)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ferments lactose into lactic acid ➔ lowers pH and coagulates milk protein (<strong>Casein</strong>) into curd.
              </p>
              <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
                <li>Increases <strong>Vitamin B₁₂</strong> nutritional content.</li>
                <li>Acts as probiotic to suppress gut pathogenic microbes.</li>
                <li>Added as Inoculum / Starter containing millions of LAB.</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                Cheese Varieties
              </span>
              <h4 className="text-sm font-bold text-white">Microbial Cheese Ripening</h4>
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <strong className="text-amber-400">Swiss Cheese:</strong> <em>Propionibacterium shermanii</em> (Large holes from massive CO₂ release).
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <strong className="text-cyan-400">Roquefort Cheese:</strong> <em>Penicillium roqueforti</em> (Fungal ripening gives blue-green veins &amp; sharp flavor).
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300">
            <strong>Dough &amp; Traditional Foods:</strong> Bread leavening uses Baker&apos;s Yeast (<em>Saccharomyces cerevisiae</em>). Dosa/Idli dough fermentation by <em>Leuconostoc</em> releases CO₂ causing dough puffing. <strong>Toddy</strong> is fermented palm sap from Southern India.
          </div>
        </div>
      )}

      {/* Tab 2: Fermentation & Antibiotics */}
      {activeTab === "industrial" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Distilled vs Non-Distilled */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-2">
              <h4 className="text-sm font-bold text-amber-300">🍷 Non-Distilled Beverages</h4>
              <p className="text-xs text-slate-300">
                Fermented without distillation; yeast dies above ~13% alcohol due to toxicity.
              </p>
              <div className="p-2.5 bg-slate-900 rounded-lg text-xs font-mono text-amber-200 border border-slate-800">
                Wine (10–14% alcohol) • Beer (4–8% alcohol)
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 space-y-2">
              <h4 className="text-sm font-bold text-rose-300">🥃 Distilled Beverages</h4>
              <p className="text-xs text-slate-300">
                Fermented broth is distilled to concentrate ethanol content.
              </p>
              <div className="p-2.5 bg-slate-900 rounded-lg text-xs font-mono text-rose-200 border border-slate-800">
                Whisky, Brandy, Rum (40–50% alcohol)
              </div>
            </div>
          </div>

          {/* Antibiotics Discovery */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-white">💊 Penicillin Discovery Timeline (1945 Nobel Prize)</h4>
            <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 space-y-1.5 border border-slate-800">
              <p>• <strong>Alexander Fleming (1928):</strong> Observed <em>Staphylococcus</em> inhibition around <em>Penicillium notatum</em> mold contaminant.</p>
              <p>• <strong>Howard Florey &amp; Ernst Chain (1940s):</strong> Established Penicillin as a potent clinical antibiotic for WWII wounded soldiers.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Bioactive Molecules */}
      {activeTab === "bioactive" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Organic Acids */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <strong className="text-cyan-400 block font-semibold">Citric Acid</strong>
              <p className="text-slate-300 font-mono text-[11px]"><em>Aspergillus niger</em></p>
              <span className="text-[10px] text-slate-500">Fungus (Ascomycete)</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <strong className="text-cyan-400 block font-semibold">Acetic Acid</strong>
              <p className="text-slate-300 font-mono text-[11px]"><em>Acetobacter aceti</em></p>
              <span className="text-[10px] text-slate-500">Bacterium</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <strong className="text-cyan-400 block font-semibold">Butyric Acid</strong>
              <p className="text-slate-300 font-mono text-[11px]"><em>Clostridium butylicum</em></p>
              <span className="text-[10px] text-slate-500">Anaerobic Bacterium</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <strong className="text-cyan-400 block font-semibold">Lactic Acid</strong>
              <p className="text-slate-300 font-mono text-[11px]"><em>Lactobacillus</em></p>
              <span className="text-[10px] text-slate-500">Bacterium</span>
            </div>
          </div>

          {/* High-Yield Bioactive Molecules */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-500/30 space-y-1.5">
              <span className="font-bold text-emerald-400 text-sm">Statins</span>
              <p className="text-slate-300 font-mono text-[11px]"><em>Monascus purpureus (Yeast)</em></p>
              <p className="text-slate-400">
                <strong>Blood-Cholesterol Lowering Agent</strong>: Acts as a <strong>competitive inhibitor of HMG-CoA Reductase</strong>.
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-purple-500/30 space-y-1.5">
              <span className="font-bold text-purple-400 text-sm">Cyclosporin A</span>
              <p className="text-slate-300 font-mono text-[11px]"><em>Trichoderma polysporum (Fungus)</em></p>
              <p className="text-slate-400">
                <strong>Immunosuppressive Drug</strong>: Inhibits T-lymphocyte activation to prevent organ transplant graft rejection.
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-rose-500/30 space-y-1.5">
              <span className="font-bold text-rose-400 text-sm">Streptokinase</span>
              <p className="text-slate-300 font-mono text-[11px]"><em>Streptococcus (Bacterium)</em></p>
              <p className="text-slate-400">
                <strong>&ldquo;Clot Buster&rdquo;</strong>: Genetically modified enzyme used to dissolve intravascular thrombi in myocardial infarction.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Sewage & BOD */}
      {activeTab === "sewage_bod" && (
        <div className="space-y-6 animate-fadeIn">
          {/* STP Flowchart */}
          <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-3">
            <h4 className="text-sm font-bold text-indigo-300">💧 Sewage Treatment Plant (STP) Flow Architecture</h4>
            <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 space-y-2 border border-slate-800">
              <p>1. <strong>Primary (Physical)</strong>: Sequential Filtration (floating debris) ➔ Sedimentation (grit) ➔ Primary Sludge &amp; Primary Effluent.</p>
              <p>2. <strong>Secondary (Biological)</strong>: Aeration Tanks with <strong>FLOCS</strong> (bacteria + fungal filaments) ➔ Aerobic organic oxidation ➔ <strong>BOD drops &gt;90%</strong>.</p>
              <p>3. <strong>Settling Tank</strong>: Flocs sediment as <strong>Activated Sludge</strong> (small inoculum recycled to aeration tank).</p>
              <p>4. <strong>Anaerobic Sludge Digester</strong>: Methanogens digest sludge ➔ Generates <strong>Biogas (CH₄, CO₂, H₂S)</strong>.</p>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
            <strong>BOD Invariant:</strong> Higher BOD = Higher organic pollution load = Severe depletion of dissolved oxygen (DO) = Aquatic hypoxia.
          </div>
        </div>
      )}

      {/* Tab 5: Biogas & Biocontrol */}
      {activeTab === "biogas_biocontrol" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Biogas Composition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-2">
              <h4 className="text-sm font-bold text-amber-300">⚡ Biogas Composition (Gobar Gas)</h4>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                <li><strong>Methane (CH₄):</strong> 50–70% (Primary combustible fuel).</li>
                <li><strong>Carbon Dioxide (CO₂):</strong> 30–40%.</li>
                <li><strong>Hydrogen &amp; H₂S:</strong> Trace amounts.</li>
                <li>Developed in India by <strong>IARI &amp; KVIC</strong>.</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2">
              <h4 className="text-sm font-bold text-emerald-300">🐛 Biocontrol &amp; IPM Agents</h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li><strong>Ladybird Beetle:</strong> Controls sap-sucking aphids.</li>
                <li><strong>Dragonflies:</strong> Controls mosquito larvae.</li>
                <li><strong>Bacillus thuringiensis (Bt):</strong> Cry crystal protein solubilized in insect alkaline gut pH to kill caterpillars.</li>
                <li><strong>Baculoviruses (Nucleopolyhedrovirus):</strong> Narrow-spectrum, species-specific; zero non-target toxicity.</li>
              </ul>
            </div>
          </div>

          {/* Biofertilizers */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300">
            <strong>Biofertilizers:</strong> Symbiotic N₂ fixers (<em>Rhizobium</em> in legumes; <em>Frankia</em> in non-legume <em>Alnus</em>; <em>Anabaena azollae</em> in <em>Azolla</em> paddy fern). Free-living N₂ fixers (<em>Azotobacter</em> [aerobic], <em>Rhodospirillum</em> [anaerobic], <em>Nostoc</em>). <strong>Mycorrhiza (<em>Glomus</em>):</strong> Absorbs <strong>Phosphorus (Phosphate)</strong> from soil.
          </div>
        </div>
      )}
    </div>
  );
}
