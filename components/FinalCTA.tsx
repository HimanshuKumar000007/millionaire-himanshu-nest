'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, PhoneCall, ArrowRight, ShieldCheck, Clock, Flame, Bot, FileText } from 'lucide-react';

interface FinalCTAProps {
  onOpenTrial: () => void;
  onOpenEnroll: () => void;
}

export function FinalCTA({ onOpenTrial, onOpenEnroll }: FinalCTAProps) {
  // Countdown timer to batch closing
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Immersive Cosmic Gradient Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/90 via-[#0A0A0F] to-purple-950/90 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-cyan-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute inset-0 cosmic-grid opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Urgent Early Access Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold mb-8 shadow-lg shadow-amber-500/10">
          <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>2026 Achievers Suite • Instant Activation & Study Access</span>
        </div>

        {/* Headline */}
        <h2 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight mb-6">
          Ready to Crack India&apos;s Top{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            Science Entrance Exams?
          </span>
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Power your preparation with high-yield <strong className="text-white">Smart Notes</strong>, full-length <strong className="text-white">CBT Mode Mocks</strong>, <strong className="text-white">Quick Drills</strong>, 15-Year PYQs, and an instant <strong className="text-cyan-300">24/7 AI Science Mentor</strong>.
        </p>

        {/* Countdown Timer Block */}
        <div className="inline-flex items-center gap-3 sm:gap-4 p-4 rounded-3xl glass-panel border border-white/15 mb-10 bg-[#12121A]/80 shadow-2xl">
          <div className="flex flex-col items-center px-3 py-1">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Days</span>
          </div>
          <span className="text-2xl font-bold text-slate-600">:</span>

          <div className="flex flex-col items-center px-3 py-1">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Hours</span>
          </div>
          <span className="text-2xl font-bold text-slate-600">:</span>

          <div className="flex flex-col items-center px-3 py-1">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Mins</span>
          </div>
          <span className="text-2xl font-bold text-slate-600">:</span>

          <div className="flex flex-col items-center px-3 py-1">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-cyan-400 font-mono">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Secs</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 max-w-md mx-auto mb-10">
          <button
            onClick={onOpenTrial}
            className="w-full sm:w-auto flex-1 px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-base shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span>Try Free CBT Mock & Notes</span>
          </button>

          <button
            onClick={onOpenEnroll}
            className="w-full sm:w-auto flex-1 px-8 py-4 rounded-2xl glass-card text-white hover:bg-white/10 font-bold text-base border border-white/20 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-5 h-5 text-cyan-400" />
            <span>Unlock Complete Suite</span>
          </button>
        </div>

        {/* Footnote reassurance */}
        <div className="flex items-center justify-center gap-6 text-xs text-slate-400 flex-wrap">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Free sample access included
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-cyan-400" /> Instant access to Smart Notes & CBT Mocks
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> 100% money-back guarantee (7 Days)
          </span>
        </div>

      </div>
    </section>
  );
}
