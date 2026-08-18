"use client";

import React, { useState } from "react";

export function HumanReproductionDiagram() {
  const [activeTab, setActiveTab] = useState<
    "male" | "female" | "menstrual" | "fertilization" | "placenta_birth"
  >("male");

  return (
    <div className="w-full bg-slate-900 border border-slate-700/60 rounded-2xl p-4 md:p-6 text-slate-100 shadow-2xl my-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-700/80 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Chapter 2 (Class XII)
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Unit VI • Reproduction in Humans
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
            Human Reproduction &amp; Developmental Biology
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab("male")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "male"
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            ♂️ Male Tract &amp; Spermatogenesis
          </button>
          <button
            onClick={() => setActiveTab("female")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "female"
                ? "bg-rose-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            ♀️ Female Tract &amp; Oogenesis
          </button>
          <button
            onClick={() => setActiveTab("menstrual")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "menstrual"
                ? "bg-purple-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            📅 Menstrual Cycle &amp; LH Surge
          </button>
          <button
            onClick={() => setActiveTab("fertilization")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "fertilization"
                ? "bg-cyan-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            ⚡ Fertilization &amp; Blastocyst
          </button>
          <button
            onClick={() => setActiveTab("placenta_birth")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "placenta_birth"
                ? "bg-amber-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🤱 Placenta &amp; Parturition
          </button>
        </div>
      </div>

      {/* Tab 1: Male System & Spermatogenesis */}
      {activeTab === "male" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Duct Pathway & Thermoregulation */}
          <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-2">
            <h4 className="text-sm font-bold text-indigo-300 flex items-center justify-between">
              <span>🔄 Male Duct System Pathway</span>
              <span className="text-[10px] text-slate-400 font-mono">Scrotum: 2–2.5°C Cooler</span>
            </h4>
            <div className="p-2.5 bg-slate-900 rounded-lg text-[11px] font-mono text-slate-300 border border-slate-800 overflow-x-auto">
              Seminiferous Tubules ➔ Rete Testis ➔ Vasa Efferentia ➔ Epididymis (Caput ➔ Cauda) ➔ Vas Deferens ➔ Ejaculatory Duct ➔ Urethra ➔ Urethral Meatus
            </div>
          </div>

          {/* Seminiferous Cells & Spermatogenesis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-indigo-300">🔬 Seminiferous Epithelium Cell Types</h4>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-900 rounded-lg border border-indigo-900/40">
                  <div className="font-bold text-indigo-400">1. Sertoli Cells (Nurse / Sustentacular)</div>
                  <p className="text-slate-300 text-[11px] mt-1">
                    • <strong>Blood-Testis Barrier (BTB):</strong> Occluding tight junctions protect haploid sperm from autoimmune destruction.<br/>
                    • <strong>Secretions:</strong> Androgen-Binding Protein (ABP), Inhibin (suppresses FSH), and AMH.
                  </p>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-amber-900/40">
                  <div className="font-bold text-amber-400">2. Leydig Cells (Interstitial Space)</div>
                  <p className="text-slate-300 text-[11px] mt-1">
                    Synthesize and secrete <strong>Androgens (Testosterone)</strong> under LH (ICSH) stimulation.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-cyan-300">🌱 Spermatogenesis &amp; Spermiogenesis</h4>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-1.5">
                <p className="text-slate-300 font-mono text-[11px]">Spermatogonia (2n) ──► Primary Spermatocyte (2n, 4C)</p>
                <p className="text-slate-300 font-mono text-[11px]">├── [Meiosis I] ──► 2 Secondary Spermatocytes (n, 2C)</p>
                <p className="text-slate-300 font-mono text-[11px]">└── [Meiosis II] ──► 4 Spermatids (n, C)</p>
                <div className="p-2 bg-indigo-950/40 rounded border border-indigo-800 text-[10px] text-indigo-300 mt-2">
                  <strong>Spermiogenesis Metamorphosis:</strong> Golgi ➔ <em>Acrosome Cap</em>; Centrioles ➔ <em>Axial Filament</em>; Mitochondria ➔ <em>Spiral Nebenkern</em>; sheds excess cytoplasm ➔ 4 Functional Spermatozoa.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Female System & Oogenesis */}
      {activeTab === "female" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Folliculogenesis Spectrum */}
          <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 space-y-3">
            <h4 className="text-sm font-bold text-rose-300 flex items-center justify-between">
              <span>🌺 Ovarian Folliculogenesis Spectrum</span>
              <span className="text-[10px] text-slate-400 font-mono">Cortex of Ovary</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 text-xs">
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <div className="text-rose-400 font-bold text-[11px]">1. Primordial</div>
                <p className="text-slate-300 text-[10px] mt-1">1° Oocyte arrested in <strong>Diplotene I</strong> from fetal life.</p>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <div className="text-amber-400 font-bold text-[11px]">2. Primary/Secondary</div>
                <p className="text-slate-300 text-[10px] mt-1">Granulosa proliferation + Theca interna/externa layers.</p>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-rose-800 bg-rose-950/20">
                <div className="text-rose-300 font-bold text-[11px]">3. Tertiary Follicle</div>
                <p className="text-slate-300 text-[10px] mt-1">Develops fluid-filled <strong>Antrum</strong> (liquor folliculi).</p>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-purple-800 bg-purple-950/20">
                <div className="text-purple-300 font-bold text-[11px]">4. Graafian Follicle</div>
                <p className="text-slate-300 text-[10px] mt-1"><strong>Zona Pellucida</strong> (ZP₃) + Corona Radiata; ready for ovulation.</p>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-emerald-800 bg-emerald-950/20">
                <div className="text-emerald-300 font-bold text-[11px]">5. Corpus Luteum</div>
                <p className="text-slate-300 text-[10px] mt-1">Ruptured follicle secretes <strong>Progesterone</strong>; becomes Corpus Albicans.</p>
              </div>
            </div>
          </div>

          {/* Comparative Table: Spermatogenesis vs Oogenesis */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-amber-300">⚖️ Spermatogenesis vs. Oogenesis Dynamics</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-indigo-900/40 space-y-1">
                <div className="font-bold text-indigo-400">Spermatogenesis (Continuous)</div>
                <p className="text-slate-300 text-[11px]">• Initiated at <strong>Puberty</strong> via GnRH.</p>
                <p className="text-slate-300 text-[11px]">• Equal cytokinesis yielding <strong>4 motile spermatozoa</strong>.</p>
                <p className="text-slate-300 text-[11px]">• Zero meiotic arrest points.</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-rose-900/40 space-y-1">
                <div className="font-bold text-rose-400">Oogenesis (Discontinuous)</div>
                <p className="text-slate-300 text-[11px]">• Initiated during <strong>Embryonic Fetal Life</strong>.</p>
                <p className="text-slate-300 text-[11px]">• Unequal cytokinesis yielding <strong>1 Ovum + 2–3 Polar Bodies</strong>.</p>
                <p className="text-slate-300 text-[11px]">• <strong>Arrest 1:</strong> Diplotene I. <strong>Arrest 2:</strong> Metaphase II (until fertilization).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Menstrual Cycle & LH Surge */}
      {activeTab === "menstrual" && (
        <div className="space-y-6 animate-fadeIn">
          {/* 4 Phases Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-rose-500/30">
              <div className="text-rose-400 font-bold mb-1">1. Menstrual (Days 1–5)</div>
              <p className="text-slate-300 text-[11px]">
                Drop in Progesterone ➔ Endometrium (Stratum Functionale) sloughs off with 50–80 mL blood.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-indigo-500/30">
              <div className="text-indigo-400 font-bold mb-1">2. Follicular (Days 6–13)</div>
              <p className="text-slate-300 text-[11px]">
                FSH matures follicles; Granulosa secretes <strong>Estrogen</strong> ➔ Repairs &amp; proliferates endometrium.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-purple-500/30 bg-purple-950/20">
              <div className="text-purple-300 font-bold mb-1">3. Ovulatory (Day 14)</div>
              <p className="text-slate-300 text-[11px]">
                Estrogen positive feedback triggers <strong>MASSIVE LH SURGE</strong> ➔ Ruptures Graafian follicle, releases 2° Oocyte.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-amber-500/30">
              <div className="text-amber-400 font-bold mb-1">4. Luteal (Days 15–28)</div>
              <p className="text-slate-300 text-[11px]">
                Corpus Luteum secretes <strong>high Progesterone</strong> ➔ Glandular secretory endometrium prepared for implantation.
              </p>
            </div>
          </div>

          {/* Hormonal Chart Overlay */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
            <h4 className="text-sm font-bold text-purple-300 mb-2">📈 Hormonal Dynamic Shifts</h4>
            <div className="p-3 bg-slate-900 rounded-lg text-slate-300 text-[11px] font-mono space-y-1">
              <p>• <strong>FSH:</strong> Gradual rise in follicular ➔ Minor ovulation peak ➔ Inhibited in luteal.</p>
              <p>• <strong>LH:</strong> Gradual rise ➔ <strong>EXPLOSIVE LH SURGE (Day 14)</strong> ➔ Low in luteal.</p>
              <p>• <strong>Estrogen:</strong> Steep rise peaking Day 12–13 ➔ Slight dip ➔ Secondary luteal peak.</p>
              <p>• <strong>Progesterone:</strong> Baseline low Days 1–14 ➔ <strong>STEEP MASSIVE PEAK Days 20–22</strong>.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Fertilization & Blastocyst */}
      {activeTab === "fertilization" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Blocks to Polyspermy */}
          <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30 space-y-3">
            <h4 className="text-sm font-bold text-cyan-300 flex items-center justify-between">
              <span>⚡ Fertilization &amp; Prevention of Polyspermy</span>
              <span className="text-[10px] text-slate-400 font-mono">Ampulla of Fallopian Tube</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-cyan-800">
                <div className="font-bold text-cyan-400 mb-1">Fast Block (Transient ~60s)</div>
                <p className="text-slate-300 text-[11px]">
                  Sperm binding triggers rapid <strong>Na⁺ Influx</strong>, depolarizing the oolemma from -70 mV to +20 mV.
                </p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-emerald-800">
                <div className="font-bold text-emerald-400 mb-1">Slow Block (Cortical Reaction - Permanent)</div>
                <p className="text-slate-300 text-[11px]">
                  Intracellular <strong>Ca²⁺ wave</strong> triggers exocytosis of cortical granules into perivitelline space, cleaving ZP₃ and hardening the Zona Pellucida.
                </p>
              </div>
            </div>
          </div>

          {/* Blastocyst Anatomy */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-amber-300">🐣 Blastocyst Structure (Day 6–7 Implantation)</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <div className="font-bold text-indigo-400 mb-1">1. Trophoblast (Outer)</div>
                <p className="text-slate-300 text-[11px]">Flattened outer layer; secretes proteases to hatch and form the <strong>Placenta</strong>.</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-rose-800 bg-rose-950/20">
                <div className="font-bold text-rose-300 mb-1">2. Inner Cell Mass (ICM)</div>
                <p className="text-slate-300 text-[11px]">Pluripotent embryoblast stem cells giving rise to the <strong>Embryo Proper</strong>.</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <div className="font-bold text-cyan-400 mb-1">3. Blastocoel</div>
                <p className="text-slate-300 text-[11px]">Fluid-filled central blastocyst cavity facilitating spatial morphogenesis.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Placenta & Parturition */}
      {activeTab === "placenta_birth" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Placental Hormones */}
            <div className="bg-slate-800/60 p-4 rounded-xl border border-amber-500/30 space-y-2">
              <h4 className="text-amber-400 font-bold text-sm">1. Hemochorial Placenta</h4>
              <p className="text-slate-300 text-[11px]">
                Fetal chorionic villi bathed directly in maternal blood pools (no RBC mixing).
              </p>
              <ul className="text-slate-400 text-[10px] space-y-1 mt-2">
                <li>• <strong>hCG:</strong> Syncytiotrophoblast maintains corpus luteum (Pregnancy test).</li>
                <li>• <strong>hPL:</strong> Maternal insulin resistance for fetal glucose.</li>
                <li>• <strong>Relaxin:</strong> Softens pubic symphysis for birth.</li>
              </ul>
            </div>

            {/* Parturition Reflex */}
            <div className="bg-slate-800/60 p-4 rounded-xl border border-rose-500/30 space-y-2">
              <h4 className="text-rose-400 font-bold text-sm">2. Fetal Ejection Reflex</h4>
              <p className="text-slate-300 text-[11px]">
                Fully developed fetus &amp; placenta trigger mild uterine contractions.
              </p>
              <p className="text-slate-400 text-[10px] mt-2">
                Signals maternal posterior pituitary to release <strong>Oxytocin</strong>, establishing a positive feedback loop (Ferguson reflex) that drives vigorous labor contractions.
              </p>
            </div>

            {/* Lactation & Colostrum */}
            <div className="bg-slate-800/60 p-4 rounded-xl border border-cyan-500/30 space-y-2">
              <h4 className="text-cyan-400 font-bold text-sm">3. Lactation &amp; Colostrum</h4>
              <p className="text-slate-300 text-[11px]">
                • <strong>Prolactin:</strong> Alveolar milk synthesis.<br/>
                • <strong>Oxytocin:</strong> Myoepithelial milk let-down ejection.
              </p>
              <div className="p-2 bg-cyan-950/60 rounded border border-cyan-800 text-[10px] text-cyan-300 mt-2">
                <strong>Colostrum:</strong> Yellowish early milk packed with <strong>Secretory IgA</strong> antibodies providing passive mucosal immunity.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
