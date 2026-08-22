'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  CheckCircle2,
  X,
  Play,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  QrCode,
  Smartphone,
  Trophy,
  GraduationCap,
  Star,
  Users,
  Video,
  Clock,
  FileText,
  Bot
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TrialModal({ isOpen, onClose }: TrialModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    exam: 'IAT (IISER)',
    stream: 'PCM',
    grade: 'Class 12',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err) {}
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl relative bg-[#12121A]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-300" /> Instant Free Diagnostic Pack
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 font-heading">
              Get Free Smart Notes & CBT Mocks
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Instant access to 2 full CBT Mocks, 5 Quick Mocks, sample PCMB Smart Notes & 24/7 AI Mentor queries.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryan Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    WhatsApp Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Target Exam
                  </label>
                  <select
                    value={formData.exam}
                    onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-xl bg-[#1A1A2E] border border-white/10 text-xs text-white"
                  >
                    <option value="IAT (IISER)">IAT (IISER)</option>
                    <option value="NEST (NISER)">NEST (NISER)</option>
                    <option value="ISI / CMI">ISI / CMI</option>
                    <option value="IISc BS">IISc BS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Subject Stream
                  </label>
                  <select
                    value={formData.stream}
                    onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-xl bg-[#1A1A2E] border border-white/10 text-xs text-white"
                  >
                    <option value="PCM">PCM</option>
                    <option value="PCB">PCB</option>
                    <option value="PCMB">PCMB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Current Grade
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-xl bg-[#1A1A2E] border border-white/10 text-xs text-white"
                  >
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                    <option value="Dropper">Dropper</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition-all hover:opacity-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>Activate Free Demo Pack</span>
                </button>
              </div>

              <div className="text-[11px] text-center text-slate-500">
                🔒 No payment required. Portal login credentials dispatched instantly.
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 font-heading">
              Welcome aboard, {formData.name.split(' ')[0]}!
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto mb-6">
              Your Free Access Pack has been unlocked for <strong className="text-cyan-300">{formData.exam}</strong>. Login instructions sent to <strong className="text-white">{formData.phone}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 max-w-xs mx-auto mb-6 text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Portal ID:</span>
                <span className="font-mono font-bold text-indigo-300">SCIPREP-8492</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Unlocked Suite:</span>
                <span className="font-bold text-white">Smart Notes + CBT Mocks</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">AI Doubts Credit:</span>
                <span className="font-bold text-emerald-400">20 Free Queries</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Start Free CBT Mock Test
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const [selectedStory, setSelectedStory] = useState(0);

  const stories = [
    {
      student: 'Tanmay Sahoo',
      rank: 'AIR 3 • NEST 2025',
      institute: 'NISER Bhubaneswar (Integrated M.Sc)',
      videoTitle: 'How I scored 168/180 in NEST using Smart Notes & 40+ CBT Mocks',
      duration: '14:20 mins',
      tips: [
        'Solved 15 years of NEST question papers on SciPrep CBT simulator',
        'Revised high-yield Biology concepts using PCMB Smart Notes',
        'Took 15-minute Quick Mocks daily to eliminate negative marking',
      ],
      quote: 'SciPrep completely changed my accuracy and speed under exam conditions.',
    },
    {
      student: 'Ananya Sharma',
      rank: 'AIR 12 • IAT 2025',
      institute: 'IISER Pune (BS-MS Dual Degree)',
      videoTitle: 'PCM student to 48/60 in Biology: Self-Paced Smart Notes Strategy',
      duration: '18:45 mins',
      tips: [
        'Relied solely on SciPrep Biology Smart Notes for Math Students',
        'Clarified night doubts instantly using 24/7 AI Science Mentor',
        'Practiced 50+ Full TCS-iON CBT Mocks before actual IAT day',
      ],
      quote: 'No passive video lectures. Pure active testing and high-yield notes.',
    },
    {
      student: 'Rohan Sen',
      rank: 'AIR 8 • ISI B.Stat 2025',
      institute: 'Indian Statistical Institute Kolkata',
      videoTitle: 'Cracking Objective UGA & Subjective UGB with PYQs & Proof Notes',
      duration: '22:10 mins',
      tips: [
        'Writing rigorous proofs line-by-line using proof template sheets',
        'Deep dive into 20-year solved ISI & CMI question archives',
        'Used AI Math Mentor for step-by-step theorem hints',
      ],
      quote: 'The CBT Mocks and PYQ archives are gold standard for serious math aspirants.',
    },
  ];

  if (!isOpen) return null;

  const current = stories[selectedStory];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl relative bg-[#12121A]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Student Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          {stories.map((st, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedStory(idx)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedStory === idx
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {st.student} ({st.rank.split('•')[0].trim()})
            </button>
          ))}
        </div>

        {/* Simulated Video Player Box */}
        <div className="relative rounded-2xl bg-black/90 aspect-video border border-white/10 overflow-hidden flex flex-col justify-between p-6 mb-6 shadow-inner group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-600/80 text-white flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5" /> SciPrep Topper Spotlight
            </span>
            <span className="text-xs text-slate-300 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {current.duration}
            </span>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center my-auto">
            <div className="w-16 h-16 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform cursor-pointer border border-indigo-400/50">
              <Play className="w-7 h-7 fill-white ml-1" />
            </div>
            <span className="text-xs font-semibold text-slate-200 mt-2">Click to Watch Strategy Video</span>
          </div>

          <div className="relative z-10">
            <h4 className="text-sm sm:text-base font-bold text-white mb-0.5 font-heading">
              {current.videoTitle}
            </h4>
            <p className="text-xs text-cyan-300">
              {current.student} • {current.institute}
            </p>
          </div>
        </div>

        {/* Key Strategy Takeaways */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-200 space-y-2">
          <div className="font-bold text-indigo-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Key Strategy Takeaways from {current.student}:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            {current.tips.map((tip, i) => (
              <div key={i} className="p-2 rounded-xl bg-black/30 border border-white/5 text-[11px] text-slate-300">
                • {tip}
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
}

interface EnrollModalProps {
  isOpen: boolean;
  courseName?: string;
  onClose: () => void;
}

export function EnrollModal({ isOpen, courseName = 'IAT 2026 Complete Prep Suite', onClose }: EnrollModalProps) {
  const [coupon, setCoupon] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [step, setStep] = useState<'details' | 'success'>('details');

  const basePrice = 5999;
  const discount = discountApplied ? 1000 : 0;
  const finalPrice = basePrice - discount;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'SCIPREP20' || coupon.toUpperCase() === 'EARLYBIRD') {
      setDiscountApplied(true);
    }
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch (err) {}
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl relative bg-[#12121A]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'details' ? (
          <div>
            <div className="text-xs font-semibold uppercase text-indigo-400 mb-1">Direct Activation Desk</div>
            <h3 className="text-2xl font-bold text-white mb-1 font-heading">
              Unlock {courseName}
            </h3>
            <p className="text-xs text-slate-300 mb-5">
              Instant access to Smart Notes, CBT Mocks, Quick Drills, PYQs & 24/7 AI Mentor.
            </p>

            {/* Fee Breakdown Card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 mb-5 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Standard Package Price:</span>
                <span className="line-through text-slate-500">₹12,999</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Direct Access Price:</span>
                <span className="font-semibold text-white">₹{basePrice.toLocaleString()}</span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Coupon Discount (SCIPREP20):</span>
                  <span>- ₹1,000</span>
                </div>
              )}
              <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                <span>Final Payable Amount:</span>
                <span className="text-cyan-400 text-lg font-heading">₹{finalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Coupon Code Input */}
            <div className="flex gap-2 mb-5">
              <input
                type="text"
                placeholder="Enter coupon (Try: SCIPREP20)"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 uppercase"
              />
              <button
                type="button"
                onClick={applyCoupon}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white cursor-pointer"
              >
                Apply
              </button>
            </div>

            {/* Simulated Payment Methods */}
            <form onSubmit={handlePay} className="space-y-3">
              <div className="text-xs font-semibold text-slate-300 mb-1">Select Payment Method:</div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <label className="p-3 rounded-xl bg-white/5 border border-indigo-500/40 text-center cursor-pointer flex flex-col items-center gap-1.5 hover:bg-white/10">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span className="text-[11px] font-bold text-white">UPI / GPay</span>
                </label>
                <label className="p-3 rounded-xl bg-white/5 border border-white/10 text-center cursor-pointer flex flex-col items-center gap-1.5 hover:bg-white/10">
                  <CreditCard className="w-4 h-4 text-indigo-400" />
                  <span className="text-[11px] font-bold text-white">Card / EMI</span>
                </label>
                <label className="p-3 rounded-xl bg-white/5 border border-white/10 text-center cursor-pointer flex flex-col items-center gap-1.5 hover:bg-white/10">
                  <QrCode className="w-4 h-4 text-cyan-400" />
                  <span className="text-[11px] font-bold text-white">NetBanking</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Confirm & Unlock ₹{finalPrice.toLocaleString()}</span>
              </button>

              <div className="text-[10px] text-center text-slate-500">
                🔒 256-Bit SSL Encrypted Gateway • Instant Portal Login & Resource Unlocking
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 font-heading">
              Access Granted!
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto mb-6">
              Congratulations on taking the strategic leap toward IISER & NISER. Your access to <strong className="text-cyan-300">{courseName}</strong> is now live.
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 max-w-xs mx-auto mb-6 text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Student ID:</span>
                <span className="font-mono font-bold text-indigo-300">IAT2026-ENG-9104</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">CBT Portal:</span>
                <span className="font-bold text-white">100+ Tests Activated</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">AI Science Mentor:</span>
                <span className="font-bold text-emerald-400">24/7 Unlimited Access</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs cursor-pointer"
            >
              Launch CBT Practice Dashboard
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
