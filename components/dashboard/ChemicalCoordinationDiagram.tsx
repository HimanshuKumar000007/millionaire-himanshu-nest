"use client";

import React, { useState } from "react";

export function ChemicalCoordinationDiagram() {
  const [activeTab, setActiveTab] = useState<
    "taxonomy" | "pituitary" | "calcium_glucose" | "adrenal" | "pathology"
  >("taxonomy");

  return (
    <div className="w-full bg-slate-900 border border-slate-700/60 rounded-2xl p-4 md:p-6 text-slate-100 shadow-2xl my-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-700/80 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Chapter 20 Visualizer
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Class XI • Human Physiology (Unit V Final)
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
            Chemical Coordination &amp; Endocrine Integration
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab("taxonomy")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "taxonomy"
                ? "bg-rose-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🧪 Classes &amp; GPCR/Nuclear
          </button>
          <button
            onClick={() => setActiveTab("pituitary")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "pituitary"
                ? "bg-amber-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🏛️ Hypothalamus-Pituitary
          </button>
          <button
            onClick={() => setActiveTab("calcium_glucose")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "calcium_glucose"
                ? "bg-emerald-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            ⚖️ Ca²⁺ &amp; Glucose Axes
          </button>
          <button
            onClick={() => setActiveTab("adrenal")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "adrenal"
                ? "bg-cyan-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            ⚡ Adrenal Zonation
          </button>
          <button
            onClick={() => setActiveTab("pathology")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "pathology"
                ? "bg-purple-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🩺 Endocrine Disorders
          </button>
        </div>
      </div>

      {/* Tab 1: Hormone Chemical Taxonomy & Molecular Signalling */}
      {activeTab === "taxonomy" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Chemical Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="p-3.5 bg-slate-800/60 rounded-xl border border-rose-500/30">
              <div className="text-rose-400 font-bold text-xs mb-1">1. Peptides / Proteins</div>
              <div className="text-[11px] text-slate-300 space-y-1">
                <p>• Hydrophilic / Water-Soluble.</p>
                <p>• <strong>Receptor:</strong> Membrane Surface GPCRs.</p>
                <p className="text-slate-400"><em>Insulin, Glucagon, Pituitary, PTH, TCT, ANF</em>.</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-800/60 rounded-xl border border-amber-500/30">
              <div className="text-amber-400 font-bold text-xs mb-1">2. Steroid Hormones</div>
              <div className="text-[11px] text-slate-300 space-y-1">
                <p>• Derived from <strong>Cholesterol</strong> (CPPP).</p>
                <p>• <strong>Receptor:</strong> Intracellular / Nuclear.</p>
                <p className="text-slate-400"><em>Cortisol, Aldosterone, Testosterone, Estrogen</em>.</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-800/60 rounded-xl border border-cyan-500/30">
              <div className="text-cyan-400 font-bold text-xs mb-1">3. Iodothyronines</div>
              <div className="text-[11px] text-slate-300 space-y-1">
                <p>• Iodinated Tyrosine residues.</p>
                <p>• <strong>Receptor:</strong> Nuclear (binds HRE DNA).</p>
                <p className="text-slate-400"><em>T₃ (Triiodothyronine) &amp; T₄ (Thyroxine)</em>.</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-800/60 rounded-xl border border-purple-500/30">
              <div className="text-purple-400 font-bold text-xs mb-1">4. Amino Acid Derivatives</div>
              <div className="text-[11px] text-slate-300 space-y-1">
                <p>• From Tyrosine or Tryptophan.</p>
                <p>• <strong>Receptor:</strong> Surface Receptors.</p>
                <p className="text-slate-400"><em>Epinephrine/NE (Tyrosine), Melatonin (Tryptophan)</em>.</p>
              </div>
            </div>
          </div>

          {/* Molecular Signalling Cascades */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* GPCR Second Messenger Cascades */}
            <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 space-y-3">
              <h4 className="text-sm font-bold text-rose-300 flex items-center justify-between">
                <span>🔄 Surface Receptor Cascades (Second Messengers)</span>
                <span className="text-[10px] text-slate-400 font-mono">Hydrophilic Hormones</span>
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="font-bold text-rose-400 mb-1">A. Adenylate Cyclase - cAMP Pathway</div>
                  <p className="text-slate-300 font-mono text-[11px]">
                    Hormone (1st msg) ➔ GPCR (Gs) ➔ Adenylate Cyclase ➔ ATP to <strong>cAMP</strong> (2nd msg) ➔ Activates <strong>Protein Kinase A (PKA)</strong> ➔ Phosphorylation.
                  </p>
                  <p className="text-slate-400 text-[10px] mt-1"><em>Used by: Glucagon, ACTH, TSH, FSH, LH, Epinephrine (β-receptors)</em>.</p>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="font-bold text-amber-400 mb-1">B. Phospholipase C (PLC) - IP₃ / DAG Pathway</div>
                  <p className="text-slate-300 font-mono text-[11px]">
                    Hormone ➔ GPCR (Gq) ➔ Phospholipase C ➔ PIP₂ cleaved to <strong>IP₃ + DAG</strong>. IP₃ releases Ca²⁺ from ER lumen ➔ Ca²⁺-Calmodulin &amp; PKC activation.
                  </p>
                  <p className="text-slate-400 text-[10px] mt-1"><em>Used by: Oxytocin, Vasopressin (V₁), TRH, GnRH</em>.</p>
                </div>
              </div>
            </div>

            {/* Intracellular / Nuclear Receptor Cascade */}
            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30 space-y-3">
              <h4 className="text-sm font-bold text-cyan-300 flex items-center justify-between">
                <span>🧬 Nuclear Receptor Cascade (Gene Transcription)</span>
                <span className="text-[10px] text-slate-400 font-mono">Lipophilic Hormones</span>
              </h4>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <span>Stepwise Genomic Mechanism</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300 font-mono text-[11px]">
                  <li>Lipid-soluble hormone (Steroid / T₃) diffuses across lipid bilayer.</li>
                  <li>Binds intracellular receptor in cytoplasm/nucleus ➔ <strong>Hormone-Receptor Complex</strong>.</li>
                  <li>Complex translocates to nucleus and binds <strong>Hormone Response Elements (HRE)</strong> on DNA.</li>
                  <li>Modulates mRNA transcription ➔ Ribosomal translation of functional proteins.</li>
                </ol>
                <div className="p-2 bg-cyan-950/60 rounded border border-cyan-800 text-[10px] text-cyan-300">
                  <strong>Exam Traps:</strong> Steroids DO NOT generate second messengers (cAMP/IP₃). Their physiological effects have a slower onset but prolonged duration.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Hypothalamus-Pituitary Axis */}
      {activeTab === "pituitary" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Dual Vascular vs Neural Connection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/60 p-4 rounded-xl border border-amber-500/30">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-amber-400 font-bold text-sm">
                  1. Adenohypophysis (Anterior Lobe)
                </h4>
                <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-700">
                  Portal System
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-2">
                Connected via the <strong>Hypophyseal Portal System</strong>. Hypothalamic neurosecretory cells discharge releasing/inhibiting factors into portal blood:
              </p>
              <ul className="text-xs text-slate-300 space-y-1">
                <li>• <strong>GH (Somatotropin):</strong> Stimulates liver IGF-1 (Somatomedin-C); somatic growth.</li>
                <li>• <strong>TSH (Thyrotropin):</strong> Stimulates thyroid follicular synthesis of T₃/T₄.</li>
                <li>• <strong>ACTH:</strong> Stimulates adrenal cortex (Zona Fasciculata) cortisol.</li>
                <li>• <strong>Prolactin (PRL):</strong> Mammary milk synthesis (inhibited by dopamine).</li>
                <li>• <strong>FSH &amp; LH (Gonadotropins):</strong> Ovarian follicles / ovulation &amp; spermatogenesis / Leydig testosterone.</li>
                <li>• <strong>MSH (Pars Intermedia):</strong> Melanin pigmentation in dermal melanocytes.</li>
              </ul>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-cyan-500/30">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-cyan-400 font-bold text-sm">
                  2. Neurohypophysis (Pars Nervosa)
                </h4>
                <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-700">
                  Direct Axonal Tract
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-2">
                Connected via the <strong>Hypothalamic-Hypophyseal Neurosecretory Tract</strong>. <em>Pars Nervosa synthesizes ZERO hormones</em> (only stores and releases hypothalamic hormones):
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="font-bold text-cyan-300">Oxytocin (Paraventricular Nuclei)</div>
                  <p className="text-slate-400 mt-0.5">
                    • <strong>Parturition:</strong> Ferguson reflex uterine contractions.<br/>
                    • <strong>Lactation:</strong> Myoepithelial cell contraction for Milk Ejection (let-down reflex).
                  </p>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="font-bold text-emerald-300">Vasopressin / ADH (Supraoptic Nuclei)</div>
                  <p className="text-slate-400 mt-0.5">
                    • Inserts Aquaporin-2 in kidney DCT/Collecting Ducts ➔ Water reabsorption (prevents Diuresis). Deficiency causes <strong>Diabetes Insipidus</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Calcium & Glucose Homeostasis */}
      {activeTab === "calcium_glucose" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Dual Feedback Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Calcium Homeostasis: PTH vs TCT */}
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-3">
              <h4 className="text-sm font-bold text-emerald-300 flex items-center justify-between">
                <span>🦴 Calcium Homeostasis (9.0–11.0 mg/dL)</span>
                <span className="text-[10px] text-slate-400 font-mono">Antagonistic Pair</span>
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-900 rounded-lg border border-emerald-800">
                  <div className="flex justify-between font-bold text-emerald-400 mb-1">
                    <span>Parathyroid Hormone (PTH / Collip&apos;s)</span>
                    <span className="text-[10px] text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded">HYPERCALCEMIC</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Released by Parathyroid Chief cells during hypocalcemia (&lt;9 mg/dL). Stimulates osteoclast bone resorption, increases renal tubular Ca²⁺ reabsorption, and activates Calcitriol (Vitamin D) for intestinal absorption.
                  </p>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-cyan-800">
                  <div className="flex justify-between font-bold text-cyan-400 mb-1">
                    <span>Thyrocalcitonin (TCT)</span>
                    <span className="text-[10px] text-cyan-300 bg-cyan-950 px-1.5 py-0.5 rounded">HYPOCALCEMIC</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Released by Thyroid Parafollicular C-cells during hypercalcemia (&gt;11 mg/dL). Inhibits osteoclasts and stimulates osteoblast bone deposition; inhibits renal Ca²⁺ reabsorption.
                  </p>
                </div>
              </div>
            </div>

            {/* Glucose Homeostasis: Insulin vs Glucagon */}
            <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 space-y-3">
              <h4 className="text-sm font-bold text-rose-300 flex items-center justify-between">
                <span>🩸 Blood Glucose Homeostasis (70–110 mg/dL)</span>
                <span className="text-[10px] text-slate-400 font-mono">Pancreatic Islets</span>
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-900 rounded-lg border border-cyan-800">
                  <div className="flex justify-between font-bold text-cyan-400 mb-1">
                    <span>Insulin (Pancreatic β-Cells)</span>
                    <span className="text-[10px] text-cyan-300 bg-cyan-950 px-1.5 py-0.5 rounded">HYPOGLYCEMIC</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Stimulates GLUT4 membrane translocation in muscle/adipose cells. Promotes <strong>Glycogenesis &amp; Lipogenesis</strong>; inhibits Gluconeogenesis. Deficiency causes <strong>Diabetes Mellitus</strong>.
                  </p>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-rose-800">
                  <div className="flex justify-between font-bold text-rose-400 mb-1">
                    <span>Glucagon (Pancreatic α-Cells)</span>
                    <span className="text-[10px] text-rose-300 bg-rose-950 px-1.5 py-0.5 rounded">HYPERGLYCEMIC</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Stimulates hepatic <strong>Glycogenolysis &amp; Gluconeogenesis</strong>; promotes lipolysis to elevate blood glucose during fasting/hypoglycemia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Adrenal Zonation & Stress */}
      {activeTab === "adrenal" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Adrenal Gland Diagram Breakdown */}
          <div className="bg-slate-950 p-4 md:p-6 rounded-xl border border-cyan-500/30">
            <h4 className="text-sm font-bold text-cyan-300 mb-4 flex items-center justify-between">
              <span>⚡ Adrenal Gland Functional Zonation (Cortex vs. Medulla)</span>
              <span className="text-xs text-slate-400 font-mono">Suprarenal Gland</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-amber-500/30">
                <div className="text-amber-400 font-bold mb-1">1. Zona Glomerulosa (Outer)</div>
                <p className="text-[11px] text-slate-300 font-semibold mb-1">Mineralocorticoids (Aldosterone)</p>
                <p className="text-[11px] text-slate-400">
                  Regulated by RAAS. Stimulates renal Na⁺/H₂O reabsorption and K⁺/H⁺ excretion; maintains blood pressure.
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-rose-500/30">
                <div className="text-rose-400 font-bold mb-1">2. Zona Fasciculata (Middle)</div>
                <p className="text-[11px] text-slate-300 font-semibold mb-1">Glucocorticoids (Cortisol)</p>
                <p className="text-[11px] text-slate-400">
                  Regulated by ACTH. Gluconeogenesis, lipolysis, proteolysis. Potent anti-inflammatory &amp; immunosuppressive.
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-purple-500/30">
                <div className="text-purple-400 font-bold mb-1">3. Zona Reticularis (Inner)</div>
                <p className="text-[11px] text-slate-300 font-semibold mb-1">Gonadocorticoids (Androgens)</p>
                <p className="text-[11px] text-slate-400">
                  Secretes DHEA/Androstenedione; contributes to pubic/axillary hair development during adrenarche.
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-cyan-500/30">
                <div className="text-cyan-400 font-bold mb-1">4. Adrenal Medulla (Core)</div>
                <p className="text-[11px] text-slate-300 font-semibold mb-1">Catecholamines (Epi 80% / NE 20%)</p>
                <p className="text-[11px] text-slate-400">
                  Chromaffin cells (Ectodermal). 3F emergency response: Tachycardia, bronchodilation, glycogen breakdown.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Endocrine Pathologies */}
      {activeTab === "pathology" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Pituitary Disorders */}
            <div className="bg-slate-800/60 p-4 rounded-xl border border-amber-500/30 space-y-2">
              <h4 className="text-amber-400 font-bold text-sm">Pituitary Disorders</h4>
              <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
                <strong className="text-amber-300">Dwarfism:</strong> Childhood GH hyposecretion; proportionate stunted growth with normal IQ.
              </div>
              <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
                <strong className="text-amber-300">Gigantism:</strong> Childhood GH hypersecretion before epiphyseal fusion; extreme tall stature.
              </div>
              <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
                <strong className="text-amber-300">Acromegaly:</strong> Adult GH hypersecretion after epiphyseal fusion; disfiguring enlargement of facial bones/hands.
              </div>
            </div>

            {/* Thyroid Disorders */}
            <div className="bg-slate-800/60 p-4 rounded-xl border border-cyan-500/30 space-y-2">
              <h4 className="text-cyan-400 font-bold text-sm">Thyroid Disorders</h4>
              <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
                <strong className="text-cyan-300">Cretinism:</strong> Infantile hypothyroidism; stunted growth, severe mental retardation, low IQ, deaf-mutism.
              </div>
              <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
                <strong className="text-cyan-300">Myxedema:</strong> Adult hypothyroidism; low BMR, weight gain, lethargy, non-pitting edema.
              </div>
              <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
                <strong className="text-cyan-300">Grave&apos;s Disease:</strong> Autoimmune hyperthyroidism (TSI antibodies); high BMR, exophthalmos (protruding eyes).
              </div>
            </div>

            {/* Adrenal & Metabolic Disorders */}
            <div className="bg-slate-800/60 p-4 rounded-xl border border-rose-500/30 space-y-2">
              <h4 className="text-rose-400 font-bold text-sm">Adrenal &amp; Pancreas</h4>
              <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
                <strong className="text-rose-300">Addison&apos;s Disease:</strong> Adrenal cortex hyposecretion; hypoglycemia, hypotension, bronze skin pigmentation.
              </div>
              <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
                <strong className="text-rose-300">Cushing&apos;s Syndrome:</strong> Cortisol hypersecretion; hyperglycemia, moon face, buffalo hump, muscle wasting.
              </div>
              <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
                <strong className="text-rose-300">Diabetes Mellitus:</strong> Insulin deficiency (Type 1) / resistance (Type 2); 3 Polys, glucosuria, ketonuria.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
