'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  BarChart3,
  Bot,
  Sparkles,
  Send,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Zap,
  Clock,
  Layers,
  BookOpen,
  Trophy,
  RotateCcw,
  Check,
  Bookmark
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const analyticsProgressData = [
  { test: 'Quick 1', myScore: 112, topperScore: 185 },
  { test: 'Ch. Test 2', myScore: 128, topperScore: 188 },
  { test: 'CBT Mock 1', myScore: 142, topperScore: 194 },
  { test: 'CBT Mock 2', myScore: 160, topperScore: 198 },
  { test: 'CBT Mock 3', myScore: 178, topperScore: 204 },
  { test: 'Full Mock 4', myScore: 195, topperScore: 212 },
];

const subjectStrengthData = [
  { subject: 'Physics', accuracy: 88, color: '#6366F1' },
  { subject: 'Chemistry', accuracy: 94, color: '#06B6D4' },
  { subject: 'Mathematics', accuracy: 76, color: '#8B5CF6' },
  { subject: 'Biology', accuracy: 85, color: '#10B981' },
];

export function PlatformPreview() {
  const [activeTab, setActiveTab] = useState<'cbt_mock' | 'smart_notes' | 'ai_mentor'>('cbt_mock');
  
  // Interactive CBT Mock simulator states
  const [cbtSelectedOption, setCbtSelectedOption] = useState<number | null>(null);
  const [cbtQuestionIdx, setCbtQuestionIdx] = useState<number>(0);
  const [cbtSavedStatus, setCbtSavedStatus] = useState<Record<number, 'answered' | 'review' | 'unvisited'>>({
    0: 'answered',
    1: 'review',
    2: 'unvisited',
    3: 'unvisited',
    4: 'unvisited',
  });

  // Interactive AI Mentor state
  const [aiQuestion, setAiQuestion] = useState<string>('Why does total internal reflection only occur from denser to rarer medium?');
  const [aiResponse, setAiResponse] = useState<string | null>(
    'When light travels from a denser medium (higher refractive index n₁) to a rarer medium (lower n₂), it bends AWAY from the normal according to Snell’s Law: n₁ sin(θ₁) = n₂ sin(θ₂). Since n₁ > n₂, sin(θ₂) > sin(θ₁). As the angle of incidence θ₁ increases, the refracted angle θ₂ reaches 90° at the critical angle θc = arcsin(n₂/n₁). For any θ₁ > θc, no real solution for θ₂ exists in the second medium, forcing 100% of electromagnetic energy to reflect back into the denser medium.'
  );
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  const handleAskMentor = (sampleQuery: string) => {
    setAiLoading(true);
    setAiQuestion(sampleQuery);
    setTimeout(() => {
      if (sampleQuery.includes('Markovnikov')) {
        setAiResponse(
          'Markovnikov’s Rule states that in the electrophilic addition of HX to an unsymmetrical alkene, the acidic proton (H⁺) attaches to the carbon with more hydrogen substituents, forming the more stable carbocation intermediate (3° > 2° > 1°). SciPrep Smart Note Tip: Watch out for 1,2-hydride or 1,2-methyl shifts that can yield a rearranged tertiary product!'
        );
      } else if (sampleQuery.includes('PYQ')) {
        setAiResponse(
          'NEST 2023 Physics PYQ Analysis: Question 14 tested the rotational kinetic energy ratio of a rolling sphere vs cylinder. Formula: K_rot / K_total = (k² / R²) / (1 + k² / R²). For solid sphere: 2/7 (28.5%). For solid cylinder: 1/3 (33.3%). Recurring trend: Appears in 4 out of the last 6 NEST papers!'
        );
      } else {
        setAiResponse(
          'For Young’s Double Slit Experiment immersed in a liquid of refractive index μ: Wavelength changes to λ’ = λ / μ. Since fringe width β = (λ · D) / d, the new fringe width becomes β’ = β / μ. The fringe pattern contracts uniformly.'
        );
      }
      setAiLoading(false);
    }, 600);
  };

  return (
    <section id="platform" className="py-24 relative overflow-hidden bg-[#0A0A0F]">
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 mb-3">
            <Zap className="w-3.5 h-3.5" />
            Active Practice Architecture
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4">
            Interactive Portal for{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Self-Paced Science Rankers
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Experience our purpose-built exam tools: exact TCS-iON CBT Mocks, high-density Smart Notes, and an instant 24/7 AI Science Mentor.
          </p>

          {/* Interactive 3 Tabs Navigation */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-[#12121A] border border-white/10 shadow-2xl">
            <button
              onClick={() => setActiveTab('cbt_mock')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'cbt_mock'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>TCS-iON CBT Mock Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab('smart_notes')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'smart_notes'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Smart Notes & Mindmaps</span>
            </button>

            <button
              onClick={() => setActiveTab('ai_mentor')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'ai_mentor'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>24/7 AI Science Mentor</span>
            </button>
          </div>
        </div>

        {/* Browser Frame Mockup Container */}
        <div className="rounded-3xl border border-white/15 bg-[#12121A]/90 backdrop-blur-2xl shadow-2xl shadow-black/80 overflow-hidden">
          
          {/* Mock Browser Header Bar */}
          <div className="px-5 py-3.5 border-b border-white/10 bg-[#0E0E17] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-slate-500 ml-2 font-mono hidden sm:inline">
                sciprep.in/cbt-portal/nest-full-mock-04
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <Clock className="w-3 h-3 text-cyan-400" />
                Remaining: 02:44:18
              </span>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
          </div>

          {/* Tab Content Display Area */}
          <div className="p-4 sm:p-6 min-h-[480px]">
            <AnimatePresence mode="wait">
              
              {/* 1. CBT Mock Simulator Tab */}
              {activeTab === 'cbt_mock' && (
                <motion.div
                  key="cbt_mock"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                >
                  {/* Left: Active Question Screen */}
                  <div className="lg:col-span-8 flex flex-col rounded-2xl bg-[#09090E] border border-white/10 overflow-hidden shadow-inner">
                    {/* Test Sub-Header */}
                    <div className="p-3 bg-[#12121A] border-b border-white/10 flex items-center justify-between flex-wrap gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                          Section: Physics
                        </span>
                        <span className="text-slate-400">Question No. 04</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400 font-semibold">+4.00</span>
                        <span className="text-rose-400 font-semibold">-1.00</span>
                      </div>
                    </div>

                    {/* Question Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="text-xs font-mono text-cyan-400 bg-cyan-950/30 p-2.5 rounded-xl border border-cyan-500/20 inline-block">
                          NEST 2024 Pattern • Mechanics & Non-Conservative Forces
                        </div>
                        <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-medium">
                          A block of mass <strong className="text-white">m = 2 kg</strong> is released from rest on an inclined plane of inclination <strong className="text-white">θ = 30°</strong>. The coefficient of friction varies with distance <strong className="text-white">x</strong> along the incline as <strong className="text-white">μ(x) = 0.2x</strong>. Find the maximum distance travelled by the block before it momentarily comes to rest. (Take g = 10 m/s²)
                        </p>

                        {/* Interactive Options */}
                        <div className="space-y-2.5 pt-2">
                          {[
                            { id: 0, text: 'A) x_max = 5.0 meters', correct: false },
                            { id: 1, text: 'B) x_max = 5.77 meters (5√3 / 3 m)', correct: true },
                            { id: 2, text: 'C) x_max = 10.0 meters', correct: false },
                            { id: 3, text: 'D) x_max = 3.33 meters', correct: false },
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => {
                                setCbtSelectedOption(opt.id);
                                setCbtSavedStatus(prev => ({ ...prev, [cbtQuestionIdx]: 'answered' }));
                              }}
                              className={`w-full p-3 rounded-xl text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer border ${
                                cbtSelectedOption === opt.id
                                  ? 'bg-indigo-600/30 border-indigo-500 text-white font-semibold shadow-md'
                                  : 'bg-white/5 hover:bg-white/10 border-white/5 text-slate-300'
                              }`}
                            >
                              <span>{opt.text}</span>
                              {cbtSelectedOption === opt.id && (
                                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* CBT Action Buttons */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-2 text-xs">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setCbtSavedStatus(prev => ({ ...prev, [cbtQuestionIdx]: 'review' }));
                            }}
                            className="px-3.5 py-2 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30 font-semibold cursor-pointer"
                          >
                            Mark for Review
                          </button>
                          <button
                            onClick={() => setCbtSelectedOption(null)}
                            className="px-3.5 py-2 rounded-xl bg-white/5 text-slate-400 hover:text-white border border-white/10 cursor-pointer"
                          >
                            Clear Response
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            setCbtQuestionIdx((prev) => (prev + 1) % 5);
                          }}
                          className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold shadow-md cursor-pointer"
                        >
                          Save & Next →
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: Question Palette & Section Navigation */}
                  <div className="lg:col-span-4 flex flex-col rounded-2xl bg-[#09090E] border border-white/10 overflow-hidden shadow-inner p-4 space-y-4">
                    <div className="pb-3 border-b border-white/10">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Question Palette
                      </h4>
                      <p className="text-[11px] text-slate-300">TCS-iON All-India Realtime Grid</p>
                    </div>

                    {/* Status Legend */}
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <span className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span>Answered (1)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <span className="w-3 h-3 rounded-full bg-purple-500" />
                        <span>Review (1)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <span className="w-3 h-3 rounded-full bg-slate-700" />
                        <span>Unvisited (3)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <span className="w-3 h-3 rounded-full bg-rose-500" />
                        <span>Not Answered (0)</span>
                      </div>
                    </div>

                    {/* Question Grid Numbers */}
                    <div className="grid grid-cols-5 gap-2 pt-2">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((q) => {
                        const status = cbtSavedStatus[q] || 'unvisited';
                        const isCurrent = cbtQuestionIdx === q;
                        return (
                          <button
                            key={q}
                            onClick={() => setCbtQuestionIdx(q % 5)}
                            className={`h-9 rounded-lg text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                              isCurrent
                                ? 'ring-2 ring-cyan-400 font-extrabold'
                                : ''
                            } ${
                              status === 'answered'
                                ? 'bg-emerald-600 text-white'
                                : status === 'review'
                                ? 'bg-purple-600 text-white'
                                : 'bg-[#161626] text-slate-400 hover:text-white border border-white/5'
                            }`}
                          >
                            {q + 1}
                          </button>
                        );
                      })}
                    </div>

                    {/* Test Series Info Card */}
                    <div className="mt-auto p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-slate-300 space-y-1.5">
                      <div className="font-bold text-cyan-300 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" /> Quick Mock Mode Available
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Need 15-minute speed practice? Switch to Quick Mocks anytime for rapid topic drills.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 2. Smart Notes & Mindmaps Tab */}
              {activeTab === 'smart_notes' && (
                <motion.div
                  key="smart_notes"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                >
                  {/* Left: Smart Note Sheet Preview */}
                  <div className="lg:col-span-8 p-6 rounded-2xl bg-[#09090E] border border-white/10 space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400">
                          Smart Note #PCMB-104 • Chemistry
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                          Organic Reaction Mechanisms & Reagent Master Chart
                        </h3>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                        High Yield: 4-6 Qs in NEST
                      </span>
                    </div>

                    {/* Smart Note Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                      <div className="p-3.5 rounded-xl bg-[#161626] border border-indigo-500/30 space-y-2">
                        <div className="font-bold text-indigo-300 flex items-center justify-between">
                          <span>Aldol vs Cannizzaro</span>
                          <span className="text-[10px] text-cyan-400">Carbonyl Chemistry</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-[11px]">
                          <strong>Aldol:</strong> Requires α-H (forms β-hydroxy carbonyl).<br />
                          <strong>Cannizzaro:</strong> No α-H + conc. alkali (Redox disproportionation into alcohol + carboxylate salt).
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#161626] border border-cyan-500/30 space-y-2">
                        <div className="font-bold text-cyan-300 flex items-center justify-between">
                          <span>Lucas Reagent (ZnCl₂ + HCl)</span>
                          <span className="text-[10px] text-indigo-400">Alcohol Test</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-[11px]">
                          <strong>3° Alcohol:</strong> Instant turbidity (&lt; 10 sec)<br />
                          <strong>2° Alcohol:</strong> Turbidity in 5 minutes<br />
                          <strong>1° Alcohol:</strong> Turbidity only upon heating.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#161626] border border-purple-500/30 space-y-2">
                        <div className="font-bold text-purple-300 flex items-center justify-between">
                          <span>Biology for PCM Track: Photosynthesis</span>
                          <span className="text-[10px] text-emerald-400">Bio Primer</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-[11px]">
                          <strong>Light Reaction:</strong> Thylakoids (ATP + NADPH generated via Z-scheme).<br />
                          <strong>Dark Reaction (Calvin):</strong> Stroma (RuBisCO fixes CO₂ into 3-PGA).
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#161626] border border-emerald-500/30 space-y-2">
                        <div className="font-bold text-emerald-300 flex items-center justify-between">
                          <span>Electrodynamics Short-cuts</span>
                          <span className="text-[10px] text-amber-400">Physics Recall</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-[11px]">
                          Self-inductance of solenoid: <strong>L = μ₀ N² A / l</strong><br />
                          Energy density of B-field: <strong>u = B² / (2μ₀)</strong>
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-slate-300">Included in all 400+ Smart Note revision packs</span>
                      <span className="text-indigo-400 font-bold">Downloadable & Printable</span>
                    </div>
                  </div>

                  {/* Right: Smart Notes Directory */}
                  <div className="lg:col-span-4 p-4 rounded-2xl bg-[#09090E] border border-white/10 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Smart Note Subject Vault
                    </h4>
                    <div className="space-y-2 text-xs">
                      {[
                        { subj: 'Physics (78 Smart Notes)', count: '45 Mindmaps' },
                        { subj: 'Chemistry (92 Smart Notes)', count: '60 Mechanisms' },
                        { subj: 'Mathematics (84 Smart Notes)', count: '50 Proof Cheats' },
                        { subj: 'Biology Booster (66 Smart Notes)', count: '40 NCERT Sheets' },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-[#12121A] border border-white/5 flex items-center justify-between text-slate-300 hover:border-indigo-500/40 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-indigo-400" />
                            <span className="font-semibold">{item.subj}</span>
                          </div>
                          <span className="text-[10px] text-cyan-400 font-medium">{item.count}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs space-y-1">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> 15-Year Solved NEST PYQ Cross-Linked
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Every formula in the Smart Notes links directly to past NEST questions where it was tested.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 3. 24/7 AI Mentor Tab */}
              {activeTab === 'ai_mentor' && (
                <motion.div
                  key="ai_mentor"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                >
                  {/* Left: AI Science Mentor Chat Terminal */}
                  <div className="lg:col-span-8 flex flex-col rounded-2xl bg-[#09090E] border border-white/10 overflow-hidden shadow-inner h-[420px]">
                    <div className="p-3.5 bg-[#12121A] border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">SciPrep AI Science Mentor</div>
                          <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Active 24/7 • Trained on NEST & Pure Science Curricula
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">Latency: &lt; 1.5s</span>
                    </div>

                    {/* Chat Log */}
                    <div className="p-4 flex-1 overflow-y-auto space-y-4 text-xs">
                      {/* User Query */}
                      <div className="flex justify-end">
                        <div className="max-w-[85%] p-3 rounded-2xl bg-indigo-600 text-white rounded-tr-none shadow-md">
                          {aiQuestion}
                        </div>
                      </div>

                      {/* AI Response */}
                      <div className="flex justify-start">
                        <div className="max-w-[90%] p-4 rounded-2xl bg-[#161626] text-slate-200 border border-indigo-500/30 rounded-tl-none space-y-2">
                          <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-[11px]">
                            <Sparkles className="w-3.5 h-3.5" /> First-Principles Derivation
                          </div>
                          {aiLoading ? (
                            <div className="text-slate-400 italic flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                              Deriving solution from physics principles...
                            </div>
                          ) : (
                            <p className="leading-relaxed text-xs text-slate-200 font-sans">
                              {aiResponse}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Input Bar */}
                    <div className="p-3 bg-[#12121A] border-t border-white/10 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Ask any PCMB doubt or NEST PYQ concept..."
                        className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        value={aiQuestion}
                        onChange={(e) => setAiQuestion(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAskMentor(aiQuestion);
                        }}
                      />
                      <button
                        onClick={() => handleAskMentor(aiQuestion)}
                        className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right: Quick Prompts & PYQ Instant Lookups */}
                  <div className="lg:col-span-4 p-4 rounded-2xl bg-[#09090E] border border-white/10 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Try Sample Science Queries
                    </h4>
                    <div className="space-y-2 text-xs">
                      <button
                        onClick={() => handleAskMentor('Explain Markovnikov addition and carbocation stability for NEST')}
                        className="w-full text-left p-2.5 rounded-xl bg-[#12121A] hover:bg-indigo-950/40 border border-white/5 hover:border-indigo-500/30 text-slate-300 transition-colors cursor-pointer"
                      >
                        🧪 Markovnikov & Carbocation Stability
                      </button>
                      <button
                        onClick={() => handleAskMentor('Breakdown NEST 2023 Physics PYQ Question on Rotational Energy')}
                        className="w-full text-left p-2.5 rounded-xl bg-[#12121A] hover:bg-indigo-950/40 border border-white/5 hover:border-indigo-500/30 text-slate-300 transition-colors cursor-pointer"
                      >
                        🎯 NEST 2023 Rotational Mechanics PYQ Breakdown
                      </button>
                      <button
                        onClick={() => handleAskMentor('What happens to YDSE fringe width when immersed in liquid μ?')}
                        className="w-full text-left p-2.5 rounded-xl bg-[#12121A] hover:bg-indigo-950/40 border border-white/5 hover:border-indigo-500/30 text-slate-300 transition-colors cursor-pointer"
                      >
                        🔬 YDSE Liquid Immersion Fringe Formula
                      </button>
                    </div>

                    <div className="pt-2">
                      <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-[11px] text-slate-300 space-y-1">
                        <div className="font-bold text-purple-300 flex items-center gap-1">
                          <Bot className="w-3.5 h-3.5" /> 24/7 Unlimited Access
                        </div>
                        <p className="text-slate-400">
                          Included across all CBT Test Series and Smart Notes packages. Zero queue time.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
