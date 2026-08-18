"use client";

import React, { useState } from "react";
import {
  Activity,
  Layers,
  Sparkles,
  Zap,
  Shield,
  Stethoscope,
  ChevronRight,
  RefreshCw,
  Flame,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Bone,
  Dna,
} from "lucide-react";

// ============================================================================
// DATA STRUCTURES
// ============================================================================

export interface JointData {
  id: string;
  name: string;
  kinematics: string;
  examples: string;
  type: string;
}

const jointsDatabase: Record<string, JointData> = {
  ballAndSocket: {
    id: "ballAndSocket",
    name: "Ball & Socket Joint",
    kinematics: "Multiaxial rotation in all 3 spatial planes",
    examples: "Shoulder Joint (Humerus - Glenoid Cavity); Hip Joint (Femur - Acetabulum)",
    type: "Diarthrosis (Freely Movable Synovial)",
  },
  hinge: {
    id: "hinge",
    name: "Hinge Joint",
    kinematics: "Uniaxial angular movement (flexion and extension in single plane)",
    examples: "Elbow Joint (Humerus - Ulna/Radius), Knee Joint, Interphalangeal Joints",
    type: "Diarthrosis (Freely Movable Synovial)",
  },
  pivot: {
    id: "pivot",
    name: "Pivot Joint",
    kinematics: "Rotational movement around a central longitudinal axis",
    examples: "Atlanto-axial Joint (C₁–C₂ Odontoid peg for 'No' movement); Proximal Radio-ulnar",
    type: "Diarthrosis (Freely Movable Synovial)",
  },
  gliding: {
    id: "gliding",
    name: "Gliding / Planar Joint",
    kinematics: "Planar sliding of flat bone surfaces over one another without rotation",
    examples: "Between Carpals (wrist), between Tarsals (ankle), Intervertebral zygapophyses",
    type: "Diarthrosis (Freely Movable Synovial)",
  },
  saddle: {
    id: "saddle",
    name: "Saddle Joint",
    kinematics: "Biaxial movement with reciprocal concave-convex surfaces",
    examples: "Between Carpal (Trapezium) and 1st Metacarpal of Thumb",
    type: "Diarthrosis (Freely Movable Synovial)",
  },
  condyloid: {
    id: "condyloid",
    name: "Condyloid / Ellipsoid Joint",
    kinematics: "Biaxial flexion, extension, abduction, and circumduction",
    examples: "Atlanto-occipital Joint ('Yes' nodding); Radiocarpal Wrist Joint",
    type: "Diarthrosis (Freely Movable Synovial)",
  },
};

export const LocomotionAndMovementDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "movementTypes" | "sarcomere" | "slidingFilament" | "skeleton" | "pathology"
  >("sarcomere");
  const [muscleType, setMuscleType] = useState<"skeletal" | "visceral" | "cardiac">("skeletal");
  const [selectedJoint, setSelectedJoint] = useState<string>("ballAndSocket");
  const [fiberType, setFiberType] = useState<"red" | "white">("red");
  const [selectedPathology, setSelectedPathology] = useState<"myasthenia" | "tetany" | "gout" | "osteoporosis">("myasthenia");

  const currentJoint = jointsDatabase[selectedJoint];

  return (
    <div className="my-4 sm:my-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-slate-50 to-amber-50/20 border border-slate-200/90 p-2.5 sm:p-7 shadow-xs space-y-4 sm:space-y-6 select-none w-full">
      {/* ════════════ TOP HERO HEADER ════════════ */}
      <div className="flex flex-col items-center text-center space-y-2.5 max-w-2xl mx-auto w-full">
        <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200 shadow-2xs flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-600" />
          MUSCULOSKELETAL &amp; BIOMECHANICS
        </span>
        <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-full space-y-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
            <Bone className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 shrink-0" />
            LOCOMOTION AND MOVEMENT
          </h3>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-600 leading-snug">
            Sarcomere Ultrastructure, Sliding Filament Cross-Bridges, 206 Bones &amp; Joint Kinematics
          </p>
        </div>
      </div>

      {/* ════════════ NAVIGATION TAB SWITCHER ════════════ */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-slate-100/90 rounded-xl sm:rounded-2xl border border-slate-200 w-full max-w-4xl mx-auto">
        <button
          onClick={() => setActiveTab("movementTypes")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "movementTypes"
              ? "bg-white text-amber-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Muscle Types</span>
        </button>

        <button
          onClick={() => setActiveTab("sarcomere")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "sarcomere"
              ? "bg-white text-amber-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span>Sarcomere Architecture</span>
        </button>

        <button
          onClick={() => setActiveTab("slidingFilament")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "slidingFilament"
              ? "bg-white text-amber-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-rose-600 shrink-0" />
          <span>Cross-Bridge Cycle</span>
        </button>

        <button
          onClick={() => setActiveTab("skeleton")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "skeleton"
              ? "bg-white text-amber-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Bone className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
          <span>Skeletal System (206)</span>
        </button>

        <button
          onClick={() => setActiveTab("pathology")}
          className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "pathology"
              ? "bg-white text-amber-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Stethoscope className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Joints &amp; Disorders</span>
        </button>
      </div>

      {/* ════════════ TAB 1: MOVEMENT & MUSCLE HISTOLOGY ════════════ */}
      {activeTab === "movementTypes" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          {/* 4 Basic Movements Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
              <span className="text-[9px] font-black uppercase text-amber-600 block">1. Amoeboid</span>
              <p className="text-slate-800 font-semibold">• Pseudopodia &amp; microfilaments</p>
              <p className="text-slate-500 text-[10px]">Macrophages &amp; Neutrophils</p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
              <span className="text-[9px] font-black uppercase text-cyan-600 block">2. Ciliary</span>
              <p className="text-slate-800 font-semibold">• 9+2 tubulin cilia (dynein)</p>
              <p className="text-slate-500 text-[10px]">Trachea &amp; Fallopian Tube</p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
              <span className="text-[9px] font-black uppercase text-indigo-600 block">3. Flagellar</span>
              <p className="text-slate-800 font-semibold">• Whip-like 9+2 axoneme</p>
              <p className="text-slate-500 text-[10px]">Spermatozoa &amp; Choanocytes</p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
              <span className="text-[9px] font-black uppercase text-rose-600 block">4. Muscular</span>
              <p className="text-slate-800 font-semibold">• Actin-myosin myofilaments</p>
              <p className="text-slate-500 text-[10px]">Limbs, Heart, &amp; Gut Motility</p>
            </div>
          </div>

          {/* 3 Muscle Tissue Types Selector */}
          <div className="p-3.5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-600 shrink-0" />
                COMPARATIVE MUSCLE HISTOLOGY (40–50% BODY WT)
              </h4>
              <div className="flex gap-1">
                <button
                  onClick={() => setMuscleType("skeletal")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                    muscleType === "skeletal"
                      ? "bg-amber-600 text-white shadow-2xs"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Skeletal
                </button>
                <button
                  onClick={() => setMuscleType("visceral")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                    muscleType === "visceral"
                      ? "bg-amber-600 text-white shadow-2xs"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Smooth / Visceral
                </button>
                <button
                  onClick={() => setMuscleType("cardiac")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                    muscleType === "cardiac"
                      ? "bg-amber-600 text-white shadow-2xs"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Cardiac
                </button>
              </div>
            </div>

            {muscleType === "skeletal" && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1.5 text-slate-800">
                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-amber-200 text-amber-900">
                  Striated • Voluntary • Somatic Control
                </span>
                <p>• <strong>Morphology:</strong> Long, unbranched cylindrical fibers bound by collagenous <em>Fascia</em>.</p>
                <p>• <strong>Nuclei:</strong> <strong>Syncytial / Multinucleated</strong> with nuclei located peripherally.</p>
                <p>• <strong>Sarcoplasmic Reticulum:</strong> Highly developed with terminal cisternae &amp; T-tubule triads.</p>
                <p className="text-amber-950 font-bold">• <strong>Contraction:</strong> Rapid, powerful; <strong>fatigues quickly</strong> under prolonged effort.</p>
              </div>
            )}

            {muscleType === "visceral" && (
              <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs space-y-1.5 text-slate-800">
                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-indigo-200 text-indigo-900">
                  Non-Striated (Smooth) • Involuntary • ANS Control
                </span>
                <p>• <strong>Location:</strong> Walls of hollow internal viscera (Gut, blood vessels, bronchi, uterus).</p>
                <p>• <strong>Morphology:</strong> Spindle-shaped / <strong>Fusiform fibers</strong> with tapering non-striated ends.</p>
                <p>• <strong>Nuclei:</strong> <strong>Uninucleate</strong> with a single centrally placed oval nucleus.</p>
                <p className="text-indigo-950 font-bold">• <strong>Contraction:</strong> Slow, rhythmic, sustained; <strong>fatigue-resistant</strong>.</p>
              </div>
            )}

            {muscleType === "cardiac" && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs space-y-1.5 text-slate-800">
                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-rose-200 text-rose-900">
                  Striated • Involuntary • Myogenic Autorhythmicity
                </span>
                <p>• <strong>Location:</strong> Exclusively in the myocardium of the heart wall.</p>
                <p>• <strong>Morphology:</strong> Short, cylindrical, <strong>branched fibers</strong> with regular sarcomeres.</p>
                <p className="text-rose-950 font-bold">
                  • <strong>Intercalated Discs:</strong> Contain <strong>Desmosomes</strong> (physical anchorage) and <strong>Gap Junctions</strong> (electrical coupling for syncytial contraction).
                </p>
                <p className="text-rose-950 font-black">• <strong>Fatigue:</strong> <strong>COMPLETELY FATIGUE-RESISTANT</strong> throughout life.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ════════════ TAB 2: SARCOMERE ARCHITECTURE & MYOFILAMENTS ════════════ */}
      {activeTab === "sarcomere" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          {/* Sarcomere Banding Visual Box */}
          <div className="p-3.5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
              SARCOMERE ULTRASTRUCTURE (Z-DISC TO Z-DISC)
            </h4>

            <div className="p-3 sm:p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-2">
              <div className="flex justify-between items-center text-[10px] text-cyan-400 font-bold border-b border-slate-700 pb-1">
                <span>Z-LINE (Krause)</span>
                <span className="text-amber-300">A-BAND (Dark / Myosin)</span>
                <span>Z-LINE (Krause)</span>
              </div>
              <div className="flex items-center justify-between text-center gap-1 text-[11px]">
                <div className="p-2 bg-cyan-950/80 rounded border border-cyan-800 text-cyan-300 flex-1">
                  I-BAND<br /><span className="text-[9px] text-slate-400">Actin Only</span>
                </div>
                <div className="p-2 bg-amber-950/80 rounded border border-amber-700 text-amber-200 flex-2">
                  A-BAND (Overlap + H-Zone)<br />
                  <span className="text-[9px] text-amber-400 font-black">H-Zone (Center) • M-Line</span>
                </div>
                <div className="p-2 bg-cyan-950/80 rounded border border-cyan-800 text-cyan-300 flex-1">
                  I-BAND<br /><span className="text-[9px] text-slate-400">Actin Only</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-300 font-sans text-center">
                * Sarcomere = Basic functional contractile unit between two consecutive Z-lines.
              </p>
            </div>

            {/* Protein Complex Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200 space-y-1.5">
                <span className="text-[10px] font-black uppercase text-cyan-900 block">
                  Thin Filament (Actin Complex)
                </span>
                <p className="text-slate-800">• <strong>F-Actin:</strong> Double-stranded helical polymer of G-actin monomers.</p>
                <p className="text-slate-800">• <strong>Tropomyosin:</strong> Fibrous strands masking myosin-binding sites at rest.</p>
                <p className="text-cyan-950 font-bold">• <strong>Troponin Complex:</strong> TnT (binds tropomyosin), TnI (inhibitory), and <strong>TnC (binds Ca²⁺ ions!)</strong>.</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5">
                <span className="text-[10px] font-black uppercase text-amber-900 block">
                  Thick Filament (Myosin Complex)
                </span>
                <p className="text-slate-800">• Polymer of ≈ 300 <strong>Meromyosin</strong> monomers.</p>
                <p className="text-slate-800">• <strong>HMM (Heavy Meromyosin):</strong> Globular Head + Short Cross-Arm.</p>
                <p className="text-slate-800">• <strong>LMM (Light Meromyosin):</strong> Fibrous Tail assembly.</p>
                <p className="text-amber-950 font-bold">• <strong>Head Sites:</strong> (1) Actin-binding site, (2) ATP-binding site with intrinsic <strong>Mg²⁺-ATPase</strong>.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 3: SLIDING FILAMENT & CROSS-BRIDGE CYCLE ════════════ */}
      {activeTab === "slidingFilament" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          {/* Stepwise Cross-Bridge Loop */}
          <div className="p-3.5 sm:p-6 rounded-2xl bg-white border border-rose-200 shadow-2xs space-y-4">
            <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-rose-600 shrink-0" />
              CROSS-BRIDGE POWER STROKE CYCLE (Huxley, 1954)
            </h4>

            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-slate-800 space-y-2">
              <p>1. <strong>Ca²⁺ Release:</strong> Motor impulse ➔ T-tubule depolarization ➔ RyR1 opens ➔ Ca²⁺ binds <strong>Troponin-C</strong> ➔ Tropomyosin shifts to unmask actin sites.</p>
              <p>2. <strong>ATP Hydrolysis:</strong> Myosin ATPase hydrolyzes ATP (ATP ➔ ADP + Pᵢ), cocking the myosin head into high-energy state.</p>
              <p>3. <strong>Cross-Bridge Formation:</strong> Cocked myosin head binds to exposed actin binding site.</p>
              <p className="text-rose-950 font-bold">4. <strong>POWER STROKE:</strong> Release of Pᵢ and ADP causes myosin head to pivot, pulling actin filaments inward toward the M-line.</p>
              <p className="text-emerald-900 font-bold">5. <strong>Cross-Bridge Detachment:</strong> Fresh <strong>ATP binds</strong> to myosin head, releasing it from actin.</p>
            </div>

            {/* Dimensional Changes Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 space-y-1">
                <span className="text-[10px] font-black uppercase text-red-700 block">
                  NARROWED / SHORTENED
                </span>
                <p className="text-slate-800">• <strong>Sarcomere Length</strong> (Z-lines move closer)</p>
                <p className="text-slate-800">• <strong>I-Band Length</strong> (shortens)</p>
                <p className="text-red-950 font-bold">• <strong>H-Zone</strong> (Narrows &amp; disappears completely!)</p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-[10px] font-black uppercase text-emerald-800 block">
                  REMAINS CONSTANT
                </span>
                <p className="text-emerald-950 font-bold">• <strong>A-Band Length</strong> (Length of Thick Myosin)</p>
                <p className="text-emerald-950 font-bold">• <strong>Individual Actin Filament Length</strong></p>
                <p className="text-slate-700 text-[11px]">* Filaments slide past each other without shrinking!</p>
              </div>
            </div>

            {/* Rigor Mortis Alert */}
            <div className="p-3 rounded-xl bg-slate-900 text-white text-xs space-y-1">
              <span className="text-[9px] font-black uppercase text-amber-400 block">
                Rigor Mortis Pathophysiology
              </span>
              <p className="text-slate-300">
                After death, cellular ATP synthesis ceases. Without fresh ATP binding, cross-bridges cannot detach from actin, locking muscles in a rigid, stiff state until lysosomal autolysis begins.
              </p>
            </div>
          </div>

          {/* Red vs White Fibers Selector */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                RED (TYPE I) vs WHITE (TYPE II) MUSCLE FIBERS
              </h4>
              <div className="flex gap-1">
                <button
                  onClick={() => setFiberType("red")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                    fiberType === "red" ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Red (Slow-Twitch)
                </button>
                <button
                  onClick={() => setFiberType("white")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                    fiberType === "white" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  White (Fast-Twitch)
                </button>
              </div>
            </div>

            {fiberType === "red" ? (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs space-y-1">
                <p>• <strong>High Myoglobin &amp; Mitochondria:</strong> Dark red appearance; dense capillaries.</p>
                <p>• <strong>Aerobic Metabolism:</strong> Dependent on oxidative phosphorylation.</p>
                <p className="font-bold text-rose-950">• <strong>Fatigue-Resistant:</strong> Ideal for sustained posture (back muscles, migratory bird flight).</p>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs space-y-1">
                <p>• <strong>Low Myoglobin &amp; Few Mitochondria:</strong> Pale/white appearance.</p>
                <p>• <strong>Anaerobic Glycolysis:</strong> Rich in glycogen; extensive Sarcoplasmic Reticulum.</p>
                <p className="font-bold text-slate-900">• <strong>Rapid Fatigue:</strong> High contraction velocity for explosive bursts (eye muscles, sprinting).</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ════════════ TAB 4: SKELETAL SYSTEM ARCHITECTURE ════════════ */}
      {activeTab === "skeleton" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          <div className="p-3.5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <Bone className="w-4 h-4 text-cyan-600 shrink-0" />
              HUMAN SKELETON (206 BONES) = AXIAL (80) + APPENDICULAR (126)
            </h4>

            {/* Axial Breakdown */}
            <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200 space-y-2 text-xs">
              <span className="text-[10px] font-black uppercase text-cyan-900 block">
                1. AXIAL SKELETON (80 BONES)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2 bg-white rounded border border-cyan-100">
                  <strong>• Skull &amp; Associated (29):</strong> Cranial (8), Facial (14), Hyoid (1), Auditory Ossicles (6: Malleus, Incus, Stapes). Dicondylic skull.
                </div>
                <div className="p-2 bg-white rounded border border-cyan-100">
                  <strong>• Vertebral Column (26):</strong> C₇, T₁₂, L₅, S₍₅₎➔₁, Co₍₄₎➔₁. Atlas (C₁) articulates with occipital condyles; Axis (C₂) has Odontoid peg.
                </div>
                <div className="p-2 bg-white rounded border border-cyan-100">
                  <strong>• Thoracic Cage (25):</strong> Sternum (1) + Ribs (24 = 12 pairs): True (1–7), False (8–10), Floating (11–12).
                </div>
              </div>
            </div>

            {/* Appendicular Breakdown */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-2 text-xs">
              <span className="text-[10px] font-black uppercase text-amber-900 block">
                2. APPENDICULAR SKELETON (126 BONES)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="p-2 bg-white rounded border border-amber-100">
                  <strong>• Girdles (6):</strong> Pectoral (4: 2 Clavicles + 2 Scapulae with Acromion &amp; Glenoid cavity); Pelvic (2 Coxal bones formed by Ilium, Ischium, &amp; Pubis with Acetabulum).
                </div>
                <div className="p-2 bg-white rounded border border-amber-100">
                  <strong>• Limbs (120):</strong> Upper (60: Humerus, Radius, Ulna, 8 Carpals, 5 Metacarpals, 14 Phalanges); Lower (60: Femur, Sesamoid Patella, Tibia, Fibula, 7 Tarsals, 5 Metatarsals, 14 Phalanges).
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 5: JOINTS & MUSCULOSKELETAL PATHOLOGY ════════════ */}
      {activeTab === "pathology" && (
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full">
          {/* Synovial Joints Explorer */}
          <div className="p-3.5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-600 shrink-0" />
              SYNOVIAL JOINT KINEMATICS &amp; ARTICULATIONS
            </h4>

            {/* Joint buttons */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {Object.keys(jointsDatabase).map((key) => {
                const j = jointsDatabase[key];
                const isSelected = selectedJoint === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedJoint(key)}
                    className={`p-2 rounded-xl text-[10px] sm:text-xs font-extrabold transition-all text-center truncate ${
                      isSelected
                        ? "bg-slate-900 text-white shadow-2xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {j.name.split(" ")[0]}
                  </button>
                );
              })}
            </div>

            {/* Selected Joint Card */}
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1.5">
              <div className="flex justify-between items-center">
                <strong className="text-emerald-950 text-sm">{currentJoint.name}</strong>
                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                  {currentJoint.type}
                </span>
              </div>
              <p className="text-slate-800">• <strong>Kinematics:</strong> {currentJoint.kinematics}</p>
              <p className="text-emerald-950 font-bold">• <strong>Anatomical Examples:</strong> {currentJoint.examples}</p>
            </div>
          </div>

          {/* Pathologies Selector */}
          <div className="p-3.5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                MUSCULOSKELETAL PATHOLOGIES
              </h4>
              <div className="flex gap-1">
                <button
                  onClick={() => setSelectedPathology("myasthenia")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                    selectedPathology === "myasthenia" ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Myasthenia
                </button>
                <button
                  onClick={() => setSelectedPathology("tetany")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                    selectedPathology === "tetany" ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Tetany
                </button>
                <button
                  onClick={() => setSelectedPathology("gout")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                    selectedPathology === "gout" ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Gout
                </button>
                <button
                  onClick={() => setSelectedPathology("osteoporosis")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                    selectedPathology === "osteoporosis" ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Osteoporosis
                </button>
              </div>
            </div>

            {selectedPathology === "myasthenia" && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs space-y-1">
                <strong className="text-rose-950">Myasthenia Gravis:</strong> Autoimmune disease where auto-antibodies attack and block <strong>Nicotinic Acetylcholine Receptors (AChR)</strong> at the motor end plate, causing progressive muscle weakness and ptosis (drooping eyelids).
              </div>
            )}

            {selectedPathology === "tetany" && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1">
                <strong className="text-amber-950">Tetany:</strong> Involuntary, rapid, painful muscular spasms caused by <strong>HYPOCALCEMIA (low serum Ca²⁺)</strong>, which increases neuronal membrane Na⁺ permeability and triggers spontaneous repetitive depolarization.
              </div>
            )}

            {selectedPathology === "gout" && (
              <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200 text-xs space-y-1">
                <strong className="text-cyan-950">Gout (Gouty Arthritis):</strong> Metabolic inborn error of purine metabolism causing <strong>Hyperuricemia</strong> and deposition of needle-like <strong>Monosodium Urate Crystals</strong> in synovial fluid and cartilage (most commonly Great Toe).
              </div>
            )}

            {selectedPathology === "osteoporosis" && (
              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs space-y-1">
                <strong className="text-purple-950">Osteoporosis:</strong> Age-related reduction in Bone Mineral Density (BMD) where osteoclast resorption exceeds osteoblast formation. Primary cause: <strong>Estrogen deficiency in post-menopausal women</strong>.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocomotionAndMovementDiagram;
