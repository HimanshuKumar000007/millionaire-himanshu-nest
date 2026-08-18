"use client";

import React, { useState } from "react";

export function HumanHealthAndDiseasesDiagram() {
  const [activeTab, setActiveTab] = useState<
    "pathogens" | "plasmodium" | "immunity_antibodies" | "allergies_cancer" | "hiv_drugs"
  >("pathogens");

  return (
    <div className="w-full bg-slate-900 border border-slate-700/60 rounded-2xl p-4 md:p-6 text-slate-100 shadow-2xl my-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-700/80 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Chapter 7 (Class XII)
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Unit VIII • Biology in Human Welfare
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
            Human Health, Immunology &amp; Diseases
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab("pathogens")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "pathogens"
                ? "bg-rose-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🦠 Pathogen Matrix
          </button>
          <button
            onClick={() => setActiveTab("plasmodium")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "plasmodium"
                ? "bg-amber-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🦟 Malaria Cycle
          </button>
          <button
            onClick={() => setActiveTab("immunity_antibodies")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "immunity_antibodies"
                ? "bg-cyan-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🛡️ Immunity &amp; Antibodies
          </button>
          <button
            onClick={() => setActiveTab("allergies_cancer")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "allergies_cancer"
                ? "bg-purple-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            ⚠️ Allergy, Autoimmunity &amp; Cancer
          </button>
          <button
            onClick={() => setActiveTab("hiv_drugs")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "hiv_drugs"
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            💊 HIV/AIDS &amp; Drugs
          </button>
        </div>
      </div>

      {/* Tab 1: Pathogen Matrix */}
      {activeTab === "pathogens" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center">
                <strong className="text-rose-400 text-sm">Typhoid</strong>
                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">Bacterial</span>
              </div>
              <p className="text-slate-300 font-mono text-[11px]"><em>Salmonella typhi</em></p>
              <p className="text-slate-400 leading-relaxed">
                Fecal-oral route ➔ Small intestine ➔ High sustained fever (39–40°C), intestinal perforations. <strong>Widal Test</strong> diagnostic.
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center">
                <strong className="text-rose-400 text-sm">Pneumonia</strong>
                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">Bacterial</span>
              </div>
              <p className="text-slate-300 font-mono text-[11px]"><em>S. pneumoniae / H. influenzae</em></p>
              <p className="text-slate-400 leading-relaxed">
                Infects <strong>Alveoli</strong> (fluid-filled), chills, cough; severe cases lead to cyanosis (lips/fingernails turn blue-gray).
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center">
                <strong className="text-cyan-400 text-sm">Common Cold</strong>
                <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300">Viral</span>
              </div>
              <p className="text-slate-300 font-mono text-[11px]"><em>Rhinovirus</em></p>
              <p className="text-slate-400 leading-relaxed">
                Infects <strong>Nose &amp; Respiratory Passage (NOT lungs)</strong>. Nasal congestion, sore throat, hoarseness; lasts 3–7 days.
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center">
                <strong className="text-cyan-400 text-sm">Dengue &amp; Chikungunya</strong>
                <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300">Viral</span>
              </div>
              <p className="text-slate-300 font-mono text-[11px]"><em>Aedes aegypti Vector</em></p>
              <p className="text-slate-400 leading-relaxed">
                Dengue: severe joint pain, <strong>Thrombocytopenia</strong>. Chikungunya: persistent polyarthralgia.
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center">
                <strong className="text-amber-400 text-sm">Filariasis</strong>
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-950 text-amber-300">Helminthic</span>
              </div>
              <p className="text-slate-300 font-mono text-[11px]"><em>Wuchereria bancrofti / malayi</em></p>
              <p className="text-slate-400 leading-relaxed">
                Vector: <em>Culex</em> mosquito. Causes chronic inflammation of <strong>lymphatic vessels</strong> of lower limbs (Elephantiasis).
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center">
                <strong className="text-emerald-400 text-sm">Amoebiasis &amp; Ringworm</strong>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300">Protozoan / Fungal</span>
              </div>
              <p className="text-slate-300 font-mono text-[11px]"><em>E. histolytica / Microsporum</em></p>
              <p className="text-slate-400 leading-relaxed">
                Amoebiasis: large intestine, stools with bloody mucus. Ringworm: dry, scaly skin lesions with intense itching.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Plasmodium Life Cycle */}
      {activeTab === "plasmodium" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Dual-Host Pathway */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300">
                Human Host (Intermediate • Asexual)
              </span>
              <h4 className="text-sm font-bold text-white">Schizogony &amp; Hemozoin Toxin</h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li><strong>Sporozoites Injected</strong>: Enters bloodstream via female <em>Anopheles</em> saliva.</li>
                <li><strong>Hepatic Schizogony</strong>: Reproduces asexually inside liver cells ➔ releases Merozoites.</li>
                <li><strong>Erythrocytic Cycle</strong>: Invades RBCs ➔ Trophozoite (Signet ring stage) ➔ Schizont.</li>
                <li><strong>Hemozoin Release</strong>: RBC rupture releases merozoites + <strong>Hemozoin toxin</strong>, triggering cyclic fever &amp; chills every 48–72 hours.</li>
                <li><strong>Gametocytogenesis</strong>: Forms male &amp; female Gametocytes in RBCs.</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300">
                Mosquito Host (Definitive • Sexual)
              </span>
              <h4 className="text-sm font-bold text-white">Syngamy &amp; Sporogony</h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li><strong>Blood Meal</strong>: Female <em>Anopheles</em> ingests gametocytes from infected human blood.</li>
                <li><strong>Syngamy in Midgut</strong>: Fertilization occurs in mosquito stomach lumen to form a motile <strong>Ookinete</strong>.</li>
                <li><strong>Oocyst Formation</strong>: Ookinete penetrates gut wall and transforms into Oocyst.</li>
                <li><strong>Sporogony</strong>: Oocyst bursts to release thousands of infectious <strong>Sporozoites</strong>.</li>
                <li><strong>Salivary Migration</strong>: Sporozoites migrate to mosquito <strong>salivary glands</strong> ready for inoculation.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Immunity & Antibodies */}
      {activeTab === "immunity_antibodies" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Innate Barriers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <strong className="text-cyan-400 block font-semibold">1. Physical</strong>
              <p className="text-slate-400 mt-1">Skin (keratin), Mucus coating of respiratory, GI, and urogenital tract.</p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <strong className="text-cyan-400 block font-semibold">2. Physiological</strong>
              <p className="text-slate-400 mt-1">Stomach HCl (pH 1.8), Saliva and Tears (Lysozyme).</p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <strong className="text-cyan-400 block font-semibold">3. Cellular</strong>
              <p className="text-slate-400 mt-1">PMN-Neutrophils, Monocytes, Macrophages, <strong>Natural Killer (NK) cells</strong>.</p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <strong className="text-cyan-400 block font-semibold">4. Cytokines</strong>
              <p className="text-slate-400 mt-1"><strong>Interferons (IFN-α, β, γ)</strong> protect uninfected neighboring cells.</p>
            </div>
          </div>

          {/* Antibody Isotypes Table */}
          <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30">
            <h4 className="text-sm font-bold text-white mb-3">🛡️ Immunoglobulin Isotypes (H₂L₂ Heterotetramer)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400 text-sm">IgG (75–80%)</span>
                <p className="text-slate-400">Most abundant; <strong>ONLY antibody that crosses the placenta</strong> to protect fetus.</p>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="font-bold text-amber-400 text-sm">IgA (10–15%)</span>
                <p className="text-slate-400">Secretory dimer; abundant in <strong>Colostrum</strong> and mucosal secretions.</p>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="font-bold text-purple-400 text-sm">IgE (&lt;0.05%)</span>
                <p className="text-slate-400">Binds Mast cells / Basophils; mediates <strong>Allergic Hypersensitivity</strong>.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Allergy, Autoimmunity & Cancer */}
      {activeTab === "allergies_cancer" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Allergies vs Autoimmunity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/30 space-y-2">
              <h4 className="text-sm font-bold text-purple-300">💥 Type I Allergic Hypersensitivity</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Allergen binds <strong>IgE</strong> on tissue <strong>Mast Cells &amp; Basophils</strong> ➔ Degranulation releases <strong>Histamine &amp; Serotonin</strong> ➔ Vasodilation &amp; bronchospasm.
              </p>
              <p className="text-xs text-emerald-400 font-semibold">
                Treatment: Antihistamines, Adrenaline (Epinephrine), and Corticosteroids.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 space-y-2">
              <h4 className="text-sm font-bold text-rose-300">⚔️ Autoimmune Disorders</h4>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                <li><strong>Rheumatoid Arthritis</strong>: Rheumatoid Factor (IgM) attacks synovial joints.</li>
                <li><strong>Myasthenia Gravis</strong>: Auto-antibodies block Nicotinic ACh receptors at neuromuscular junction.</li>
                <li><strong>Type 1 Diabetes</strong>: Destruction of pancreatic β-cells.</li>
                <li><strong>Hashimoto&apos;s Disease</strong>: Auto-antibodies destroy thyroid follicles.</li>
              </ul>
            </div>
          </div>

          {/* Cancer Hallmarks */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-white">🦀 Cancer Biology &amp; Therapeutics</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1">
                <strong className="text-rose-400">Hallmarks of Malignancy</strong>
                <p className="text-slate-400">Loss of Contact Inhibition ➔ Uncontrolled tumor mass ➔ <strong>Metastasis</strong> via blood/lymph (most feared property).</p>
              </div>
              <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1">
                <strong className="text-cyan-400">Therapies &amp; Immunotherapy</strong>
                <p className="text-slate-400">Surgery, Radiotherapy, Chemotherapy (Vincristine/Vinblastine), and <strong>α-Interferon</strong> (biological response modifier).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: HIV/AIDS & Abused Drugs */}
      {activeTab === "hiv_drugs" && (
        <div className="space-y-6 animate-fadeIn">
          {/* HIV Virology */}
          <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-2">
            <h4 className="text-sm font-bold text-indigo-300">🔬 HIV Retrovirus Replication</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              gp120 binds <strong>CD4⁺ Receptors</strong> on Macrophages &amp; Helper T-cells ➔ Reverse Transcriptase converts ssRNA into dsDNA ➔ Integrated into host genome.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="font-bold text-amber-400">Macrophage:</span> Acts as &ldquo;HIV Factory&rdquo; producing virus without dying.
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="font-bold text-rose-400">CD4⁺ T-Cells:</span> Bursts &amp; depletes (&lt;200/μL) leading to opportunistic infections.
              </div>
            </div>
          </div>

          {/* Abused Drugs Classification */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <strong className="text-rose-400 text-sm">Opioids (Depressants)</strong>
              <p className="text-slate-300 font-mono text-[11px]"><em>Papaver somniferum</em></p>
              <p className="text-slate-400">Morphine &amp; Heroin (Diacetylmorphine / &ldquo;Smack&rdquo;). Binds CNS &amp; GI receptors; slows body functions.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <strong className="text-emerald-400 text-sm">Cannabinoids</strong>
              <p className="text-slate-300 font-mono text-[11px]"><em>Cannabis sativa</em></p>
              <p className="text-slate-400">Marijuana, Hashish, Ganja. Binds brain cannabinoid receptors; affects <strong>cardiovascular system</strong>.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <strong className="text-cyan-400 text-sm">Coca Alkaloids (Stimulant)</strong>
              <p className="text-slate-300 font-mono text-[11px]"><em>Erythroxylum coca</em></p>
              <p className="text-slate-400">Cocaine (&ldquo;Coke&rdquo;/&ldquo;Crack&rdquo;). Blocks <strong>Dopamine reuptake transporter</strong>; euphoria, hyper-alertness, hallucinations.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
