"use client";

import React, { useState } from "react";

export function NeuralControlAndCoordinationDiagram() {
  const [activeTab, setActiveTab] = useState<
    "neuron" | "biophysics" | "synapse" | "brain" | "ans"
  >("neuron");

  return (
    <div className="w-full bg-slate-900 border border-slate-700/60 rounded-2xl p-4 md:p-6 text-slate-100 shadow-2xl my-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-700/80 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Chapter 19 Visualizer
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Class XI • Human Physiology
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
            Neural Control, Coordination & Bioelectrics
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab("neuron")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "neuron"
                ? "bg-emerald-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🧠 Cytology & Glia
          </button>
          <button
            onClick={() => setActiveTab("biophysics")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "biophysics"
                ? "bg-cyan-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            ⚡ Action Potential
          </button>
          <button
            onClick={() => setActiveTab("synapse")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "synapse"
                ? "bg-purple-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🔄 Synapses & PSPs
          </button>
          <button
            onClick={() => setActiveTab("brain")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "brain"
                ? "bg-amber-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🏛️ Brain & CSF
          </button>
          <button
            onClick={() => setActiveTab("ans")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "ans"
                ? "bg-rose-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🌐 PNS & Autonomic
          </button>
        </div>
      </div>

      {/* Tab 1: Neuron Cytology & Neuroglia */}
      {activeTab === "neuron" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Anatomical Regions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/60 p-4 rounded-xl border border-emerald-500/30">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-emerald-400 font-bold text-sm">
                  1. Dendrites (Input Zone)
                </h4>
                <span className="text-[10px] bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-600/30">
                  Centripetal
                </span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li>• Short, highly branched tapered processes.</li>
                <li>• Conducts bioelectric signals <strong>TOWARD</strong> cyton.</li>
                <li>• Contains abundant <strong>Nissl&apos;s Granules</strong> and neurofibrils.</li>
                <li>• Primary reception site for presynaptic terminals.</li>
              </ul>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-cyan-500/30">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-cyan-400 font-bold text-sm">
                  2. Cyton / Soma (Processing)
                </h4>
                <span className="text-[10px] bg-cyan-950/80 text-cyan-300 px-2 py-0.5 rounded border border-cyan-600/30">
                  Metabolic Core
                </span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li>• Large spherical euchromatic nucleus + prominent nucleolus.</li>
                <li>• <strong>Nissl&apos;s Granules</strong>: Aggregated RER + free ribosomes (protein synthesis).</li>
                <li>• Neurofibrils: Microfilaments for structural scaffolding.</li>
                <li>• Integrates graded postsynaptic potentials (EPSPs/IPSPs).</li>
              </ul>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-purple-500/30">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-purple-400 font-bold text-sm">
                  3. Axon (Conduction Zone)
                </h4>
                <span className="text-[10px] bg-purple-950/80 text-purple-300 px-2 py-0.5 rounded border border-purple-600/30">
                  Centrifugal
                </span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li>• Single long cylindrical fiber (axoplasm + axolemma).</li>
                <li>• <strong>Axon Hillock</strong>: Spike trigger zone (highest Na⁺ channel density).</li>
                <li>• <strong>CRITICAL TRAP</strong>: <em>Nissl&apos;s granules completely ABSENT</em>.</li>
                <li>• Terminates in Telodendria with Synaptic Knobs.</li>
              </ul>
            </div>
          </div>

          {/* Structural Classification & Glia Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Structural Classes */}
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Morphological Neuron Classifications
              </h4>
              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                  <div className="flex justify-between font-bold text-emerald-300">
                    <span>Unipolar Neuron</span>
                    <span className="text-slate-400 font-normal">1 Axon only (no dendrites)</span>
                  </div>
                  <p className="text-slate-400 mt-1">Found predominantly during early <strong>Embryonic stages</strong>.</p>
                </div>
                <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                  <div className="flex justify-between font-bold text-cyan-300">
                    <span>Bipolar Neuron</span>
                    <span className="text-slate-400 font-normal">1 Axon + 1 Dendrite</span>
                  </div>
                  <p className="text-slate-400 mt-1">Located in sensory structures: <strong>Retina of Eye</strong> &amp; <strong>Olfactory Epithelium</strong>.</p>
                </div>
                <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                  <div className="flex justify-between font-bold text-indigo-300">
                    <span>Multipolar Neuron</span>
                    <span className="text-slate-400 font-normal">1 Axon + ≥2 Dendrites</span>
                  </div>
                  <p className="text-slate-400 mt-1">Most common neuron in human body; found in <strong>Cerebral Cortex</strong> and spinal motor neurons.</p>
                </div>
                <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                  <div className="flex justify-between font-bold text-amber-300">
                    <span>Pseudounipolar Neuron</span>
                    <span className="text-slate-400 font-normal">Single process splits T-shape</span>
                  </div>
                  <p className="text-slate-400 mt-1">Diagnostic of <strong>Dorsal Root Ganglia (DRG)</strong> of Spinal Nerves.</p>
                </div>
                <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                  <div className="flex justify-between font-bold text-rose-300">
                    <span>Anaxonic Neuron</span>
                    <span className="text-slate-400 font-normal">Lacks distinct axon</span>
                  </div>
                  <p className="text-slate-400 mt-1">Found in <strong>Amacrine cells</strong> of retina and interneurons of brain.</p>
                </div>
              </div>
            </div>

            {/* Glial Cells Matrix */}
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                Neuroglial Support Cells (Glial Network)
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                  <div className="flex justify-between items-center text-cyan-300 font-bold">
                    <span>Astrocytes (CNS)</span>
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">Ectodermal</span>
                  </div>
                  <p className="text-slate-300 mt-1">Perivascular end-feet form the <strong>Blood-Brain Barrier (BBB)</strong>; buffers extracellular K⁺ and recycles transmitters.</p>
                </div>
                <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                  <div className="flex justify-between items-center text-purple-300 font-bold">
                    <span>Oligodendrocytes (CNS)</span>
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">Ectodermal</span>
                  </div>
                  <p className="text-slate-300 mt-1">Synthesizes myelin around <strong>MULTIPLE CNS axons</strong> simultaneously. Lacks neurilemma (no CNS regeneration).</p>
                </div>
                <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                  <div className="flex justify-between items-center text-emerald-300 font-bold">
                    <span>Schwann Cells (PNS)</span>
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">Neural Crest</span>
                  </div>
                  <p className="text-slate-300 mt-1">Myelinates <strong>SINGLE PNS axon segment</strong>; forms outer <strong>Neurilemma</strong> driving axonal regeneration.</p>
                </div>
                <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                  <div className="flex justify-between items-center text-rose-300 font-bold">
                    <span>Microglia (CNS)</span>
                    <span className="text-[10px] text-rose-400 bg-rose-950/80 px-1.5 py-0.5 rounded border border-rose-700/50">MESODERMAL (Unique!)</span>
                  </div>
                  <p className="text-slate-300 mt-1">Resident phagocytic macrophages derived from hematopoietic stem cells; engulfs cellular debris and pathogens.</p>
                </div>
                <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                  <div className="flex justify-between items-center text-amber-300 font-bold">
                    <span>Ependymal Cells (CNS)</span>
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">Ectodermal</span>
                  </div>
                  <p className="text-slate-300 mt-1">Ciliated epithelium lining brain ventricles and central canal; forms <strong>Choroid Plexuses</strong> to secrete CSF.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Membrane Potential & Action Potential */}
      {activeTab === "biophysics" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Action Potential Waveform Visualizer */}
          <div className="bg-slate-950 p-4 md:p-6 rounded-xl border border-cyan-500/40 relative overflow-hidden">
            <h4 className="text-sm font-bold text-cyan-300 mb-2 flex items-center justify-between">
              <span>⚡ Action Potential Phases &amp; Voltage-Gated Channel Kinetics</span>
              <span className="text-xs text-slate-400 font-mono">Threshold = -55 mV • Peak = +30 mV</span>
            </h4>

            {/* ASCII / Graphical Waveform Representation */}
            <div className="bg-slate-900/90 p-4 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto space-y-1">
              <div className="text-emerald-400 font-bold">
                +30 mV ┌───────────────────────/\  ◄── Peak Overshoot (Massive Na⁺ Influx via Open Activation Gates)
              </div>
              <div className="text-slate-400">
                &nbsp;&nbsp;0 mV ├─────────────────────/────\──────────────────────────
              </div>
              <div className="text-cyan-400">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│                    /      \  ◄── Repolarization (Na⁺ Channels Inactivate, K⁺ Channels Open ──► K⁺ Efflux)
              </div>
              <div className="text-amber-400">
                -55 mV ├.................../        \ ◄── Threshold Potential (All-or-None Trigger Point)
              </div>
              <div className="text-indigo-400">
                -70 mV ├──────────────────/          \─────────────────────── ◄── Resting Membrane Potential (Vm)
              </div>
              <div className="text-purple-400">
                -90 mV └─────────────────/────────────\______________________ ◄── Undershoot / Hyperpolarization (Slow K⁺ channel closure)
              </div>
            </div>

            {/* 4 Sequential Phases Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4">
              <div className="p-3 bg-slate-900 rounded-lg border border-indigo-500/30">
                <div className="text-indigo-400 font-bold text-xs mb-1">1. Resting (Vm = -70 mV)</div>
                <p className="text-[11px] text-slate-300">
                  Na⁺/K⁺ pump active (3 Na⁺ out / 2 K⁺ in). High K⁺ leak permeability. Na⁺/K⁺ voltage gates closed.
                </p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-emerald-500/30">
                <div className="text-emerald-400 font-bold text-xs mb-1">2. Depolarization (-55 ➔ +30 mV)</div>
                <p className="text-[11px] text-slate-300">
                  Threshold stimulus opens Na⁺ activation gates. Explosive <strong>Na⁺ Influx</strong> down gradient.
                </p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-cyan-500/30">
                <div className="text-cyan-400 font-bold text-xs mb-1">3. Repolarization (+30 ➔ -70 mV)</div>
                <p className="text-[11px] text-slate-300">
                  Na⁺ inactivation gates close. Voltage-gated K⁺ channels open ➔ massive <strong>K⁺ Efflux</strong>.
                </p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-purple-500/30">
                <div className="text-purple-400 font-bold text-xs mb-1">4. Hyperpolarization (-90 mV)</div>
                <p className="text-[11px] text-slate-300">
                  Delayed K⁺ channel closure dips Vm toward EK (-90 mV). Na⁺/K⁺ ATPase restores resting state.
                </p>
              </div>
            </div>
          </div>

          {/* Refractory Periods & Saltatory Conduction */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
              <h4 className="text-sm font-bold text-amber-300 mb-2">
                ⏱️ Absolute vs. Relative Refractory Periods
              </h4>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-2 bg-slate-900/80 rounded border border-amber-500/20">
                  <strong className="text-amber-400">Absolute Refractory Period:</strong> From threshold to middle of repolarization. Na⁺ channels are open or inactivated. <em>NO stimulus, regardless of strength, can fire a 2nd AP</em>. Guarantees unidirectional forward propagation.
                </div>
                <div className="p-2 bg-slate-900/80 rounded border border-amber-500/20">
                  <strong className="text-amber-400">Relative Refractory Period:</strong> During hyperpolarization. Na⁺ channels have reset, but K⁺ channels remain open. A 2nd AP <em>can</em> be triggered by a supra-threshold stimulus.
                </div>
              </div>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
              <h4 className="text-sm font-bold text-emerald-300 mb-2">
                🚀 Saltatory Conduction in Myelinated Axons
              </h4>
              <div className="space-y-2 text-xs text-slate-300">
                <p>
                  • <strong>Myelin Sheath:</strong> High electrical resistance &amp; low capacitance; prevents transmembrane ion leakage.
                </p>
                <p>
                  • <strong>Nodes of Ranvier:</strong> Bare axolemma where voltage-gated Na⁺ channels are heavily concentrated.
                </p>
                <p>
                  • <strong>Electrotonic Current:</strong> AP &quot;leaps&quot; node-to-node, increasing conduction velocity up to <strong>120 m/s</strong> (50–100× faster) while conserving metabolic ATP.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Synapses & Neurotransmitters */}
      {activeTab === "synapse" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Electrical vs Chemical Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/60 p-4 rounded-xl border border-cyan-500/30">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-cyan-400 font-bold text-sm">⚡ Electrical Synapse</h4>
                <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-700">Direct Contact</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li>• Pre- &amp; postsynaptic membranes bridged by <strong>Connexons (Gap Junctions)</strong>.</li>
                <li>• Tiny synaptic gap (<strong>1.5 nm</strong>).</li>
                <li>• Direct ionic current flow; <strong>Bi-directional</strong>.</li>
                <li>• Extremely rapid transmission (delay <strong>&lt; 0.2 ms</strong>).</li>
                <li>• Rare in mammalian CNS; found in cardiac muscle &amp; smooth muscle.</li>
              </ul>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-purple-500/30">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-purple-400 font-bold text-sm">🧪 Chemical Synapse</h4>
                <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-700">Neurotransmitter</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li>• Separated by physical <strong>Synaptic Cleft (20–50 nm)</strong>.</li>
                <li>• Requires Ca²⁺ influx ➔ Synaptotagmin/SNARE vesicle exocytosis.</li>
                <li>• Neurotransmitters bind postsynaptic ligand-gated receptors.</li>
                <li>• Strictly <strong>Unidirectional</strong>; synaptic delay (<strong>0.5–2.0 ms</strong>).</li>
                <li>• Predominant synapse throughout human CNS and PNS.</li>
              </ul>
            </div>
          </div>

          {/* Molecular Cascade */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-700">
            <h4 className="text-sm font-bold text-purple-300 mb-3">
              🧬 Chemical Synaptic Transmission Cascade
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <div className="text-slate-400 font-bold mb-1">Step 1</div>
                <div className="text-white">AP arrives at Presynaptic Knob</div>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-cyan-800">
                <div className="text-cyan-400 font-bold mb-1">Step 2</div>
                <div className="text-white">Voltage-gated <strong>Ca²⁺ Influx</strong></div>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-purple-800">
                <div className="text-purple-400 font-bold mb-1">Step 3</div>
                <div className="text-white">Synaptotagmin/SNARE Exocytosis</div>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-indigo-800">
                <div className="text-indigo-400 font-bold mb-1">Step 4</div>
                <div className="text-white">Diffusion across Cleft (20–50 nm)</div>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-emerald-800">
                <div className="text-emerald-400 font-bold mb-1">Step 5</div>
                <div className="text-white">Receptor Binding ➔ <strong>EPSP / IPSP</strong></div>
              </div>
            </div>
          </div>

          {/* EPSP vs IPSP and Neurotransmitter Reference */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700">
              <h4 className="text-sm font-bold text-emerald-400 mb-2">🟢 EPSP vs. 🔴 IPSP Integration</h4>
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-slate-900/80 rounded border border-emerald-500/20">
                  <strong className="text-emerald-300">EPSP (Excitatory Postsynaptic Potential):</strong> Local graded depolarization. Opens ligand-gated Na⁺ or Ca²⁺ channels, bringing Vm closer to threshold. Mediated by <strong>Glutamate</strong> (CNS) and <strong>ACh</strong> (NMJ).
                </div>
                <div className="p-2 bg-slate-900/80 rounded border border-rose-500/20">
                  <strong className="text-rose-300">IPSP (Inhibitory Postsynaptic Potential):</strong> Local graded hyperpolarization. Opens ligand-gated Cl⁻ or K⁺ channels, driving Vm away from threshold. Mediated by <strong>GABA</strong> (brain) and <strong>Glycine</strong> (spinal cord).
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700">
              <h4 className="text-sm font-bold text-purple-400 mb-2">💊 Clinical Neurotransmitters</h4>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div>• <strong>Acetylcholine (ACh):</strong> Hydrolyzed by Acetylcholinesterase (AChE). Blocked in Myasthenia Gravis.</div>
                <div>• <strong>Dopamine:</strong> Nigrostriatal loss causes <strong>Parkinson&apos;s Disease</strong> (tremor, rigidity, bradykinesia).</div>
                <div>• <strong>GABA:</strong> Targets of sedatives (Benzodiazepines); prevents hyperexcitable seizures.</div>
                <div>• <strong>Glycine:</strong> Blocked by <strong>Strychnine</strong>, causing lethal convulsions.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Gross Brain Neuroanatomy & CSF */}
      {activeTab === "brain" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Embryonic Divisions of Brain */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/60 p-4 rounded-xl border border-amber-500/30">
              <h4 className="text-amber-400 font-bold text-sm mb-2">1. Forebrain (Prosencephalon)</h4>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li>• <strong>Cerebrum:</strong> Hemispheres linked by <strong>Corpus Callosum</strong>. Frontal (Broca&apos;s motor speech), Temporal (Wernicke&apos;s comprehension), Parietal (somatosensory), Occipital (vision).</li>
                <li>• <strong>Thalamus:</strong> Principal sensory relay station for all senses <em>EXCEPT Olfaction</em>.</li>
                <li>• <strong>Hypothalamus:</strong> Master homeostatic regulator (temperature, hunger, thirst, circadian, ADH/Oxytocin).</li>
                <li>• <strong>Limbic System:</strong> Hippocampus (memory) + Amygdala (fear/rage).</li>
              </ul>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-cyan-500/30">
              <h4 className="text-cyan-400 font-bold text-sm mb-2">2. Midbrain (Mesencephalon)</h4>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li>• <strong>Corpora Quadrigemina:</strong> 4 rounded swellings on dorsal tectum:</li>
                <li>&nbsp;&nbsp;• <em>Superior Colliculi (2):</em> Visual tracking reflexes.</li>
                <li>&nbsp;&nbsp;• <em>Inferior Colliculi (2):</em> Auditory reflex centers.</li>
                <li>• <strong>Cerebral Aqueduct (Aqueduct of Sylvius):</strong> Traverses midbrain connecting 3rd &amp; 4th ventricles.</li>
                <li>• <strong>Cerebral Peduncles (Crura Cerebri):</strong> Descending motor tracts.</li>
              </ul>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-rose-500/30">
              <h4 className="text-rose-400 font-bold text-sm mb-2">3. Hindbrain (Rhombencephalon)</h4>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li>• <strong>Pons Varolii:</strong> Transverse fiber bridge; contains Pneumotaxic &amp; Apneustic centers.</li>
                <li>• <strong>Cerebellum:</strong> &quot;Little Brain&quot; with <strong>Arbor Vitae</strong>; coordinates voluntary movement, posture, &amp; balance.</li>
                <li>• <strong>Medulla Oblongata:</strong> Vital autonomic centers (Cardiac, Vasomotor, Respiratory rhythm) &amp; reflexes (vomiting, coughing).</li>
                <li>• <strong>BRAINSTEM:</strong> Midbrain + Pons + Medulla (<em>Cerebellum is EXCLUDED</em>).</li>
              </ul>
            </div>
          </div>

          {/* Meninges & CSF Circulation */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-700">
            <h4 className="text-sm font-bold text-cyan-300 mb-2">
              🌊 Meninges &amp; Ventricular CSF Circulation Pathway
            </h4>
            <div className="text-xs text-slate-300 space-y-2">
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex flex-wrap items-center gap-2">
                <span className="font-bold text-amber-400">Meninges (Outer to Inner):</span>
                <span>Dura Mater (tough outer) ➔ Arachnoid Mater (spiderweb-like) ➔ [Subarachnoid Space with CSF] ➔ Pia Mater (vascular inner adherent to brain).</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <span className="font-bold text-cyan-400">CSF Flow Cascade:</span>
                <p className="mt-1 font-mono text-[11px] text-slate-400">
                  Choroid Plexuses (Ventricles) ➔ Lateral Ventricles (1st &amp; 2nd) ➔ <strong>Foramen of Monro</strong> ➔ 3rd Ventricle ➔ <strong>Aqueduct of Sylvius</strong> ➔ 4th Ventricle ➔ <strong>Foramina of Luschka &amp; Magendie</strong> ➔ Subarachnoid Space ➔ Arachnoid Villi (reabsorbed into Dural Venous Sinuses).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: PNS & Autonomic Nervous System */}
      {activeTab === "ans" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Cranial & Spinal Nerve Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
              <h4 className="text-sm font-bold text-white mb-2">
                🧠 Cranial Nerves (12 Pairs in Amniotes)
              </h4>
              <ul className="text-xs text-slate-300 space-y-1">
                <li>• <strong>Purely Sensory (3):</strong> CN I (Olfactory), CN II (Optic), CN VIII (Vestibulocochlear).</li>
                <li>• <strong>Purely Motor (5):</strong> CN III (Oculomotor), CN IV (Trochlear), CN VI (Abducens), CN XI (Accessory), CN XII (Hypoglossal).</li>
                <li>• <strong>Mixed Nerves (4):</strong> CN V (Trigeminal), CN VII (Facial), CN IX (Glossopharyngeal), CN X (Vagus).</li>
              </ul>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
              <h4 className="text-sm font-bold text-white mb-2">
                🦴 Spinal Nerves (31 Pairs in Humans)
              </h4>
              <ul className="text-xs text-slate-300 space-y-1">
                <li>• <strong>ALL 31 PAIRS ARE MIXED NERVES</strong> (carry sensory &amp; motor fibers).</li>
                <li>• <strong>Dorsal Root:</strong> Carries afferent sensory fibers; contains Dorsal Root Ganglion (DRG) with pseudounipolar neurons.</li>
                <li>• <strong>Ventral Root:</strong> Carries efferent motor fibers emerging from the ventral horn of spinal grey matter.</li>
                <li>• <strong>Patellar Stretch Reflex:</strong> Monosynaptic arc (Muscle spindle ➔ Dorsal root ➔ Ventral root ➔ Quadriceps).</li>
              </ul>
            </div>
          </div>

          {/* Sympathetic vs Parasympathetic Matrix */}
          <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30">
            <h4 className="text-sm font-bold text-rose-300 mb-3">
              ⚡ Autonomic Nervous System (ANS): Sympathetic vs. Parasympathetic
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2">Parameter / Organ</th>
                    <th className="p-2 text-rose-400">Sympathetic (&quot;Fight or Flight&quot;)</th>
                    <th className="p-2 text-cyan-400">Parasympathetic (&quot;Rest &amp; Digest&quot;)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2 font-semibold">Anatomical Outflow</td>
                    <td className="p-2"><strong>Thoracolumbar Outflow</strong> (T₁–L₂)</td>
                    <td className="p-2"><strong>Craniosacral Outflow</strong> (CN III, VII, IX, X + S₂–S₄)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Ganglionic Fibers</td>
                    <td className="p-2">Short preganglionic; Long postganglionic</td>
                    <td className="p-2">Long preganglionic; Short postganglionic</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Postganglionic Transmitter</td>
                    <td className="p-2"><strong>Noradrenaline / Norepinephrine</strong> (Adrenergic)</td>
                    <td className="p-2"><strong>Acetylcholine</strong> (Cholinergic)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Pupil of Eye (Iris)</td>
                    <td className="p-2"><strong>Mydriasis</strong> (Pupil Dilation)</td>
                    <td className="p-2"><strong>Miosis</strong> (Pupil Constriction)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Heart Rate &amp; Cardiac Output</td>
                    <td className="p-2 text-rose-400">Increases (Tachycardia)</td>
                    <td className="p-2 text-cyan-400">Decreases (Bradycardia via Vagus X)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Bronchioles (Airways)</td>
                    <td className="p-2"><strong>Bronchodilation</strong> (Relaxes smooth muscle)</td>
                    <td className="p-2"><strong>Bronchoconstriction</strong></td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">GI Motility &amp; Secretions</td>
                    <td className="p-2">Inhibits peristalsis &amp; secretions</td>
                    <td className="p-2">Stimulates peristalsis &amp; secretions</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Urinary Bladder</td>
                    <td className="p-2">Relaxes detrusor; constricts sphincter (retention)</td>
                    <td className="p-2">Contracts detrusor; relaxes sphincter (Micturition)</td>
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
