'use client';

import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Trophy,
  Star,
  Users,
  Award,
  GraduationCap,
  PlayCircle,
  Quote,
  CheckCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface Topper {
  name: string;
  rank: string;
  exam: 'IAT' | 'NEST' | 'ISI' | 'CMI';
  allotment: string;
  score: string;
  avatarColor: string;
  initials: string;
  hometown: string;
  quote: string;
  hasVideo?: boolean;
}

const toppers: Topper[] = [
  {
    name: 'Tanmay Sahoo',
    rank: 'AIR 3',
    exam: 'NEST',
    allotment: 'NISER Bhubaneswar (Integrated M.Sc)',
    score: '168 / 180 Marks',
    avatarColor: 'from-amber-500 to-yellow-600',
    initials: 'TS',
    hometown: 'Cuttack, Odisha',
    quote:
      'The NEST-specific mock tests at SciPrep were identical to the real exam pattern. Their sectional cut-off strategy in Biology helped me secure a top 5 rank!',
    hasVideo: true,
  },
  {
    name: 'Ananya Sharma',
    rank: 'AIR 12',
    exam: 'IAT',
    allotment: 'IISER Pune (BS-MS Dual Degree)',
    score: '214 / 240 Marks',
    avatarColor: 'from-indigo-500 to-purple-600',
    initials: 'AS',
    hometown: 'Jaipur, Rajasthan',
    quote:
      'Coming from a PCM background, I had zero confidence in Biology. Dr. Debashis taught high-yield biology from scratch in 3 months. That added 45 crucial marks!',
    hasVideo: true,
  },
  {
    name: 'Rohan Sen',
    rank: 'AIR 8',
    exam: 'ISI',
    allotment: 'ISI Kolkata (B.Stat Hons + Full Stipend)',
    score: 'UGA: 112/120, UGB: 95/100',
    avatarColor: 'from-purple-500 to-pink-600',
    initials: 'RS',
    hometown: 'Kolkata, West Bengal',
    quote:
      'The subjective proof-writing sessions for UGB are unmatched. The mentors reviewed every single mathematical line and taught me how to write formal proofs.',
    hasVideo: false,
  },
  {
    name: 'Priyanshu Verma',
    rank: 'AIR 21',
    exam: 'IAT',
    allotment: 'IISc Bangalore (BS Research)',
    score: '208 / 240 Marks',
    avatarColor: 'from-cyan-500 to-blue-600',
    initials: 'PV',
    hometown: 'Lucknow, Uttar Pradesh',
    quote:
      'SciPrep’s Smart Notes & CBT Mocks made Physics problem solving intuitive. The 24/7 AI Mentor answered all my late-night derivations in seconds.',
    hasVideo: true,
  },
  {
    name: 'Kavya Murthy',
    rank: 'AIR 17',
    exam: 'NEST',
    allotment: 'UM-DAE CEBS Mumbai (Chemical Sciences)',
    score: '154 / 180 Marks',
    avatarColor: 'from-emerald-500 to-teal-600',
    initials: 'KM',
    hometown: 'Bengaluru, Karnataka',
    quote:
      'The 24/7 doubt resolution team was unbelievable. Even when solving DPPs at 1 AM, I got handwritten steps back within 10 minutes.',
    hasVideo: false,
  },
  {
    name: 'Siddharth Iyer',
    rank: 'AIR 14',
    exam: 'CMI',
    allotment: 'Chennai Mathematical Institute (B.Sc Math & CS)',
    score: 'Full Scholarship Allotment',
    avatarColor: 'from-rose-500 to-red-600',
    initials: 'SI',
    hometown: 'Chennai, Tamil Nadu',
    quote:
      'Non-routine mathematics requires creative intuition, not memorized steps. SciPrep solved past 15-year CMI questions with elegant proofs.',
    hasVideo: true,
  },
];

// Simple CountUp helper component
function StatCounter({ target, label, prefix = '', suffix = '' }: { target: number; label: string; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center p-6 rounded-3xl glass-card border border-white/5 bg-[#12121A]/70">
      <div className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-2 tracking-tight">
        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          {prefix}
          {count.toLocaleString()}
          {suffix}
        </span>
      </div>
      <p className="text-xs sm:text-sm text-slate-300 font-medium">{label}</p>
    </div>
  );
}

interface ResultsProps {
  onOpenVideo: () => void;
  onOpenEnroll: () => void;
}

export function Results({ onOpenVideo, onOpenEnroll }: ResultsProps) {
  const [filter, setFilter] = useState<'ALL' | 'IAT' | 'NEST' | 'ISI' | 'CMI'>('ALL');

  const filteredToppers = toppers.filter((t) => {
    if (filter === 'ALL') return true;
    return t.exam === filter;
  });

  return (
    <section id="results" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0A0A0F] via-[#12121A]/80 to-[#0A0A0F]">
      {/* Background glow orbs */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300 mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            Hall of Fame • Verified 2024 & 2025 Admissions
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4">
            India&apos;s Highest Selection Ratio in{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-400 bg-clip-text text-transparent">
              IISER & NEST
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Real rankers, authentic marks, and direct admissions into India&apos;s most prestigious research institutions.
          </p>
        </div>

        {/* Big Numbers Row with CountUp */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <StatCounter target={540} suffix="+" label="IISER & NISER Selections" />
          <StatCounter target={10000} suffix="+" label="Active Aspirants Trained" />
          <StatCounter target={50} suffix="+" label="IISER/IIT Alumni Faculty" />
          <StatCounter target={49} prefix="" suffix="/50" label="4.9 / 5 Rating (1,450+ Reviews)" />
        </div>

        {/* Exam Filter Chips */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {(['ALL', 'IAT', 'NEST', 'ISI', 'CMI'] as const).map((ex) => (
            <button
              key={ex}
              onClick={() => setFilter(ex)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filter === ex
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {ex === 'ALL' ? 'All Rankers' : `${ex} Selections`}
            </button>
          ))}
        </div>

        {/* Topper Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredToppers.map((topper, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass-card p-6 rounded-3xl border border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between group bg-[#12121A]/90 shadow-xl"
            >
              <div>
                {/* Header: Avatar, Name & Rank Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${topper.avatarColor} flex items-center justify-center font-bold text-white shadow-md text-sm`}
                    >
                      {topper.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">
                        {topper.name}
                      </h3>
                      <p className="text-xs text-slate-400">{topper.hometown}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 font-extrabold text-xs tracking-wide">
                      {topper.rank}
                    </span>
                    <div className="text-[10px] text-slate-400 font-semibold mt-0.5">{topper.exam}</div>
                  </div>
                </div>

                {/* Allotment & Score */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 mb-4 text-xs">
                  <div className="text-cyan-300 font-semibold flex items-center gap-1.5 mb-1">
                    <GraduationCap className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span className="line-clamp-1">{topper.allotment}</span>
                  </div>
                  <div className="text-slate-300 text-[11px] pl-5.5">
                    Score: <strong className="text-white">{topper.score}</strong>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-indigo-500/40 pl-3 mb-4">
                  &ldquo;{topper.quote}&rdquo;
                </p>
              </div>

              {/* Bottom Action */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-emerald-400 flex items-center gap-1 text-[11px] font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" /> Verified Scholar
                </span>

                {topper.hasVideo ? (
                  <button
                    onClick={onOpenVideo}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <PlayCircle className="w-4 h-4" /> Watch Journey
                  </button>
                ) : (
                  <span className="text-slate-400 text-[11px]">SciPrep Full Batch Alum</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Stories Callout Banner */}
        <div className="mt-12 p-8 rounded-3xl glass-panel border border-white/15 bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-indigo-400 flex-shrink-0">
              <PlayCircle className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Watch How 500+ Students Cracked Science Entrances</h4>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Unfiltered podcast conversations with top rankers discussing drop year routines, subject strategies, and life at IISER Pune, Kolkata & NISER.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenVideo}
            className="whitespace-nowrap px-6 py-3.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs shadow-xl transition-all cursor-pointer flex items-center gap-2 flex-shrink-0"
          >
            <PlayCircle className="w-4 h-4 text-indigo-600" />
            Watch Video Testimonials
          </button>
        </div>

      </div>
    </section>
  );
}
