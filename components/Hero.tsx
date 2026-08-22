'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  PlayCircle,
  Star,
  Trophy,
  Bot,
  FileText,
  Clock,
  TrendingUp,
  CheckCircle2,
  Atom,
  Flame,
  ArrowRight,
  ShieldCheck,
  Zap,
  BookOpen,
  HelpCircle,
  Layers
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface HeroProps {
  onOpenTrial: () => void;
  onOpenVideo: () => void;
  onOpenEnroll: (plan?: string) => void;
}

const mockChartData = [
  { week: 'W1', score: 94, topper: 170 },
  { week: 'W3', score: 118, topper: 178 },
  { week: 'W5', score: 135, topper: 185 },
  { week: 'W7', score: 156, topper: 192 },
  { week: 'W9', score: 174, topper: 200 },
  { week: 'W12', score: 198, topper: 210 },
];

export function Hero({ onOpenTrial, onOpenVideo, onOpenEnroll }: HeroProps) {
  // Kinetic typography words
  const titleLine1 = "Master IISER, NEST, ISI & CMI";
  const titleLine2 = "with Smart Notes & 24/7 AI Mentor";

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-6 pb-16 lg:py-20 cosmic-grid">
      {/* Animated Cosmic Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute -top-10 -left-20 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Subtle Star Particle Overlay */}
      <div className="absolute inset-0 cosmic-dots opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Kinetic Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Eyebrow Tag */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-indigo-500/30 text-xs font-semibold text-indigo-300 mb-6 backdrop-blur-md shadow-sm shadow-indigo-500/10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>2026 Test Series & Smart Notes Live</span>
              <span className="text-slate-500">•</span>
              <span className="text-cyan-400 font-medium">100% Real TCS-iON CBT Interface</span>
            </motion.div>

            {/* Kinetic Main Headline */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[60px] leading-[1.12] tracking-tight text-white mb-6">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="block bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent"
                >
                  {titleLine1}
                </motion.span>
              </span>
              <span className="block overflow-hidden mt-1">
                <motion.span
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                >
                  {titleLine2}
                </motion.span>
              </span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mb-6 font-normal"
            >
              Master high-yield science concepts without wasting hours in passive lectures. Prepare for <strong className="text-indigo-300 font-semibold">IISER, NISER, ISI, CMI & IISc</strong> with high-yield <strong className="text-white font-semibold">Smart Notes</strong>, exact <strong className="text-white font-semibold">CBT Mode Full Mocks</strong>, <strong className="text-white font-semibold">Quick Mocks</strong>, <strong className="text-white font-semibold">Chapter-wise Mocks</strong>, 15+ years solved <strong className="text-white font-semibold">PYQs</strong>, and an instant <strong className="text-cyan-300 font-semibold">24/7 AI Mentor</strong>.
            </motion.p>

            {/* Value Proposition Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {[
                'Smart High-Yield Notes',
                'TCS-iON CBT Full Mocks',
                '15-Min Quick Mocks',
                'Chapter-wise Practice',
                '15+ Years Solved PYQs',
                '24/7 AI Science Mentor',
              ].map((feat, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-200 font-medium flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  {feat}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10"
            >
              {/* Primary CTA */}
              <button
                onClick={onOpenTrial}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-base shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group border border-indigo-400/30"
              >
                <Sparkles className="w-5 h-5 text-cyan-300 group-hover:rotate-12 transition-transform" />
                <span>Try Free CBT Mock & Smart Notes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={onOpenVideo}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl glass-card text-slate-200 hover:text-white hover:bg-white/10 font-semibold text-base border border-white/10 hover:border-white/20 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <PlayCircle className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span>Watch Ranker Insights</span>
              </button>
            </motion.div>

            {/* Social Proof Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="w-full pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-amber-400 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-white ml-1">4.9/5</span>
                </div>
                <span className="text-xs text-slate-400">1,450+ Student Reviews</span>
              </div>

              <div className="flex flex-col">
                <span className="text-base font-extrabold text-white font-heading">10,000+</span>
                <span className="text-xs text-slate-400">Aspirants Practicing</span>
              </div>

              <div className="flex flex-col">
                <span className="text-base font-extrabold text-emerald-400 font-heading">540+</span>
                <span className="text-xs text-slate-400">IISER/NISER Selections</span>
              </div>

              <div className="flex flex-col">
                <span className="text-base font-extrabold text-cyan-400 font-heading">24/7</span>
                <span className="text-xs text-slate-400">AI Science Mentor</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: 3D-feeling Cosmic Bento Grid */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative space-y-4"
            >
              {/* Decorative background glow behind bento */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl -z-10" />

              {/* Bento Top Row (2 mini cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1. 24/7 AI Mentor Live Card */}
                <div className="glass-card p-4 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all relative overflow-hidden group bg-gradient-to-br from-[#12121A] to-[#1A1A2E]/90">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-[11px] font-bold text-cyan-300">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block mr-0.5" />
                      24/7 AI MENTOR
                    </span>
                    <Bot className="w-4 h-4 text-cyan-400" />
                  </div>

                  <div className="font-semibold text-xs text-slate-200 line-clamp-2">
                    &ldquo;Explain photo-electric effect cutoff frequency & work function&rdquo;
                  </div>

                  <div className="mt-2.5 p-2 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-[11px] text-cyan-200">
                    <div className="font-bold flex items-center gap-1 text-[10px] text-cyan-300 mb-0.5">
                      <Sparkles className="w-3 h-3 text-cyan-400" /> Step-by-Step Logic:
                    </div>
                    <p className="line-clamp-2 text-slate-300">
                      $E = h\nu = \Phi + K_{'{'}max{'}'}$. When $K_{'{'}max{'}'} = 0$, threshold frequency $\nu_0 = \Phi/h$.
                    </p>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Instant Response Time</span>
                    <span className="text-emerald-400 font-semibold">&lt; 1.2 seconds</span>
                  </div>
                </div>

                {/* 2. Top Ranker Card */}
                <div className="glass-card p-4 rounded-2xl border border-white/10 hover:border-amber-500/30 transition-all bg-gradient-to-br from-[#1A1A2E]/80 to-[#12121A]/90">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wide">
                      AIR 3 • NEST
                    </span>
                  </div>

                  <div className="text-sm font-bold text-white">Tanmay Sahoo</div>
                  <div className="text-xs text-slate-400">NISER Bhubaneswar &apos;25</div>

                  <p className="text-[11px] text-slate-300 italic mt-2 line-clamp-2 border-l-2 border-amber-500/40 pl-2">
                    &ldquo;SciPrep&apos;s CBT Mocks & Smart Notes were identical to the real NEST question pattern!&rdquo;
                  </p>
                </div>

              </div>

              {/* Bento Bottom: Performance / Growth Area Chart */}
              <div className="glass-card p-5 rounded-2xl border border-white/10 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                      CBT Mock Analytics
                    </div>
                    <div className="text-base font-bold text-white flex items-center gap-2">
                      <span>IAT Full Mock Progression</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +104 Marks
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-slate-400">Target Score</div>
                    <div className="text-sm font-bold text-indigo-400">198 / 240</div>
                  </div>
                </div>

                {/* Recharts Area Chart */}
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366F1" stopOpacity={0.5} />
                          <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="topperGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="week"
                        stroke="#64748B"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#64748B"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        domain={[60, 220]}
                      />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="p-2.5 rounded-xl bg-[#0E0E17]/95 border border-white/10 text-xs shadow-xl backdrop-blur-md">
                                <div className="font-semibold text-slate-300">{label} (CBT Full Mock)</div>
                                <div className="text-indigo-400 font-bold mt-1">
                                  Your Score: {payload[0]?.value} / 240
                                </div>
                                <div className="text-cyan-400 font-medium text-[11px]">
                                  AIR 50 Benchmark: {payload[1]?.value}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#818CF8"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#scoreGrad)"
                      />
                      <Area
                        type="monotone"
                        dataKey="topper"
                        stroke="#06B6D4"
                        strokeWidth={1.5}
                        strokeDasharray="4 4"
                        fillOpacity={1}
                        fill="url(#topperGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4 text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Your Trajectory
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> AIR 50 Benchmark
                    </span>
                  </div>

                  <button
                    onClick={onOpenTrial}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    Take Free Diagnostic CBT Mock →
                  </button>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
