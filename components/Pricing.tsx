'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Check,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  Zap,
  Flame,
  Star,
  FileText,
  Trophy,
  Bot,
  LogIn
} from 'lucide-react';

interface PricingProps {
  onOpenEnroll: (planName: string) => void;
  onOpenTrial: () => void;
}

export function Pricing({ onOpenEnroll, onOpenTrial }: PricingProps) {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

  const plans = [
    {
      id: 'starter',
      name: 'Free NEST Diagnostic Pack',
      badge: 'Free Access',
      badgeColor: 'bg-white/10 text-slate-300 border-white/10',
      price: '₹0',
      period: 'Forever free',
      description: 'Test-drive our NEST TCS-iON simulator, try 5 Quick Mocks, and download sample Smart Notes.',
      popular: false,
      features: [
        '2 Full-Length NEST CBT Benchmark Mocks',
        '5 Quick Mocks (15-min speed drills)',
        'Sample PCMB Smart Notes & Organic Cheat Sheets',
        '20 AI Science Mentor query credits',
        'NEST All-India Rank & SMAS Cutoff Estimation',
      ],
      notIncluded: [
        'Full 400+ Smart Notes & Mindmap Library',
        'Full 150+ CBT & Chapter-wise Mock Archive',
        '15-Year Solved NEST PYQ Complete Vault',
        'Unlimited 24/7 AI Mentor Access',
      ],
      ctaText: 'Start Free Sample Access',
      ctaAction: 'trial',
    },
    {
      id: 'champion',
      name: 'NEST Complete Achiever Suite 2026',
      badge: 'Flagship • 88% Choose This',
      badgeColor: 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/40',
      price: billingCycle === 'annual' ? '₹5,999' : '₹1,199',
      period: billingCycle === 'annual' ? 'One-time (Valid Till Exam)' : '/month',
      oneTimePrice: billingCycle === 'annual' ? '₹5,999 full access' : '₹1,199 / mo',
      description: 'The definitive all-in-one NEST preparation ecosystem: Smart Notes, CBT Mocks, Quick Mocks, PYQs & 24/7 AI Mentor.',
      popular: true,
      features: [
        'Complete PCMB High-Yield Smart Notes & Mindmaps (400+ sheets)',
        '35 Full-Length NEST CBT Mode Mocks with TCS-iON interface',
        '60 Quick Mocks (15/30 min sprints) + 120 Chapter Tests',
        '15-Year Solved NEST PYQ Vault with verified keys & step solutions',
        'Unlimited 24/7 AI Science Mentor (Instant derivations & doubt solving)',
        'Special "Biology for Math Students" & "Math for Bio Students" kits',
        'Real-time All-India Rank (AIR) & SMAS Sectional Cutoff Analytics',
      ],
      notIncluded: [],
      ctaText: 'Get Complete Achiever Suite',
      ctaAction: 'enroll',
    },
    {
      id: 'aits-only',
      name: 'NEST All-India CBT Test Series (AITS)',
      badge: 'Test Takers Only',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      price: billingCycle === 'annual' ? '₹2,499' : '₹699',
      period: billingCycle === 'annual' ? 'One-time (Valid Till Exam)' : '/month',
      oneTimePrice: billingCycle === 'annual' ? '₹2,499 full access' : '₹699 / mo',
      description: 'Engineered for NEST aspirants who only require extensive CBT Mocks, Quick Mocks, and PYQ tests.',
      popular: false,
      features: [
        '35 Full-Length NEST CBT Mode Mocks (exact TCS-iON replica)',
        '60 Quick Mocks (15/30 min speed drills)',
        '100+ Chapter-wise Part Tests for targeted PCMB drill',
        '15-Year Solved NEST PYQ Mock Test Series',
        'SMAS (Section-wise Minimum Admissible Score) Diagnostics',
        'Step-by-step verified written solutions for all test questions',
        'AIR Leaderboard benchmark against 10,000+ NEST peers',
      ],
      notIncluded: [
        'Full PCMB Smart Notes & Theory Mindmaps',
        'Unlimited 24/7 AI Mentor Pro',
      ],
      ctaText: 'Enroll in NEST Test Series',
      ctaAction: 'enroll',
    },
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0A0A0F] via-[#0E0E17] to-[#0A0A0F]">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Transparent & Affordable NEST Packages
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4">
            Invest in Your <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">NEST (NISER / CEBS) Rank</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            No overpriced lecture subscriptions. Pay once for high-yield NEST Smart Notes, authentic TCS-iON CBT Mocks, and a 24/7 AI Mentor.
          </p>

          {/* Billing Cycle Switch */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-2xl bg-[#12121A] border border-white/10 shadow-inner">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Full Access (One-Time)</span>
              <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950">
                Best Value
              </span>
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Subscription
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? 'glass-card bg-[#161629] border-2 border-indigo-500/60 shadow-2xl shadow-indigo-500/20 lg:-translate-y-2'
                  : 'glass-panel bg-[#12121A]/80 border border-white/10 hover:border-white/20'
              }`}
            >
              {/* Most Popular Floating Top Pill */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-slate-950 font-extrabold text-[11px] shadow-lg uppercase tracking-wider flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-slate-950" /> {plan.badge}
                </div>
              )}

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white font-heading">{plan.name}</h3>
                  {!plan.popular && (
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${plan.badgeColor}`}>
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 mb-6 leading-relaxed min-h-[36px]">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-400">{plan.period}</span>
                  </div>
                  {plan.oneTimePrice && (
                    <div className="text-[11px] text-indigo-300 font-semibold mt-1">
                      {plan.oneTimePrice}
                    </div>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Included Features:
                  </div>
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}

                  {plan.notIncluded.map((notFeat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-500 opacity-60">
                      <div className="w-4 h-4 rounded-full bg-white/5 text-slate-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        ✕
                      </div>
                      <span className="line-through">{notFeat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div>
                {plan.ctaAction === 'trial' ? (
                  <Link
                    href="/signup"
                    className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg bg-white/10 hover:bg-white/15 text-white border border-white/15"
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button
                    onClick={() => onOpenEnroll(plan.name)}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                      plan.popular
                        ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/30 hover:scale-[1.02]'
                        : 'bg-white/10 hover:bg-white/15 text-white border border-white/15'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Existing Student Direct Login Hint */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400">
            Already have an active NEST subscription or account?{' '}
            <Link
              href="/login"
              className="text-indigo-400 hover:text-indigo-300 font-bold underline inline-flex items-center gap-1 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" /> Log In to Access Your Dashboard →
            </Link>
          </p>
        </div>

        {/* Trust Badges Row */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2 border border-emerald-500/20">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">7-Day Money-Back Guarantee</h4>
            <p className="text-xs text-slate-400 mt-0.5">Zero questions asked refund if not 100% satisfied.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-2 border border-indigo-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">256-Bit Encrypted Payments</h4>
            <p className="text-xs text-slate-400 mt-0.5">UPI, NetBanking, Debit/Credit Cards & Instant Activation.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-2 border border-cyan-500/20">
              <Star className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Always-On 24/7 AI Science Mentor</h4>
            <p className="text-xs text-slate-400 mt-0.5">No waiting for office hours. Instant step-by-step logic anytime.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
