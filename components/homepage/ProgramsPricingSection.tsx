"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  BookOpen,
  FlaskConical,
  GraduationCap,
  Layers,
  Calculator,
  Bot,
  Flame,
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth/authGuard";

interface ProgramsPricingSectionProps {
  onOpenAssessment: () => void;
  onSelectPlan?: (planId: string) => void;
}

type FilterCategory = "all" | "iat" | "nest" | "isi_cmi";

interface ProgramItem {
  id: string;
  category: "all" | "iat" | "nest" | "isi_cmi";
  title: string;
  badge: string;
  badgeStyle: string;
  target: string;
  desc: string;
  icon: any;
  iconStyle: string;
  pills: string[];
  features: string[];
  originalPrice: string;
  price: string;
  popular?: boolean;
}

const programs: ProgramItem[] = [
  {
    id: "iat-2026",
    category: "iat",
    title: "IAT 2026 Complete Prep Suite",
    badge: "Bestseller",
    badgeStyle: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    target: "Target: IISER Pune, Kolkata, Mohali, Bhopal, TVM, Tirupati,...",
    desc: "The ultimate self-paced mastery ecosystem: High-Yield Smart Notes for PCMB, full CBT Mode Mocks, Quick Mocks, Chapter tests, solved PYQs and 24/7 AI Mentor assistance.",
    icon: GraduationCap,
    iconStyle: "text-indigo-400 bg-indigo-500/15 border-indigo-500/25",
    pills: ["🕒 Valid Till Exam 2026", "📚 Smart Notes + 120+ CBT Mocks"],
    features: [
      "Concise High-Yield Smart Notes for Physics, Chem, Math & Bio",
      "50 Full-Length CBT Mocks on authentic TCS-iON test player",
      "120+ Chapter-wise Mocks & 15-minute Quick Mocks for speed",
    ],
    originalPrice: "₹12,999",
    price: "₹5,999",
    popular: true,
  },
  {
    id: "nest-2026",
    category: "nest",
    title: "NEST 2026 CBT & PYQ Pack",
    badge: "High Rigor",
    badgeStyle: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    target: "Target: NISER Bhubaneswar & UM-DAE CEBS Mumbai",
    desc: "Engineered specifically for NISER & CEBS entrance with sectional cutoff mastery, advanced research-tier Smart Notes, NEST CBT simulations and 24/7 AI Mentor support.",
    icon: FlaskConical,
    iconStyle: "text-teal-400 bg-teal-500/15 border-teal-500/25",
    pills: ["🕒 Valid Till Exam 2026", "📚 Smart Notes + 80+ CBT Tests"],
    features: [
      "Sectional Cut-Off Strategy & score maximization methodology",
      "35 Full NEST CBT Mode Mocks with exact negative marking",
      "90+ Chapter-wise concept test sprints for PCMB",
    ],
    originalPrice: "₹9,999",
    price: "₹4,999",
  },
  {
    id: "isi-cmi-2026",
    category: "isi_cmi",
    title: "ISI & CMI Math PYQ & Mocks",
    badge: "Pure Math",
    badgeStyle: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    target: "Target: Indian Statistical Institute (B.Stat/B.Math) & CMI",
    desc: "Rigorously structured for objective (UGA) and subjective proof-writing (UGB). Includes formal proof-writing Smart Notes, non-routine Chapter Mocks, and 20-year PYQs.",
    icon: Calculator,
    iconStyle: "text-purple-400 bg-purple-500/15 border-purple-500/25",
    pills: ["🕒 Valid Till Exam 2026", "📚 Proof Notes + 60+ Subjective Mocks"],
    features: [
      "Step-by-step UGB Subjective Proof-Writing Smart Notes",
      "25 Full-Length UGA Objective + UGB Subjective CBT Mocks",
      "Non-routine Chapter Mocks (Number Theory, Algebra, Combinatorics)",
    ],
    originalPrice: "₹14,999",
    price: "₹6,499",
  },
  {
    id: "aits-2026",
    category: "all",
    title: "All-India CBT Test Series (AITS 2026)",
    badge: "150+ Total Mocks",
    badgeStyle: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    target: "Target: All Science Aspirants (IAT, NEST, ISI)",
    desc: "The gold standard for exam simulation: Exact replica TCS-iON software, 40 Full CBT Mocks, 60 Quick Mocks (15/30 min), 100 Chapter Mocks, and All-India Rank benchmarks.",
    icon: Layers,
    iconStyle: "text-amber-400 bg-amber-500/15 border-amber-500/25",
    pills: ["🕒 Valid Till Exam 2026", "📊 150+ Mocks + AIR Benchmark"],
    features: [
      "40 Full-Length Mocks + 60 Quick Mocks + 100 Chapter Tests",
      "Accurate All-India Rank (AIR) benchmark against 10,000+ peers",
      "AI Question-by-Question time-management & accuracy breakdown",
    ],
    originalPrice: "₹4,999",
    price: "₹2,499",
  },
  {
    id: "smart-notes-pyq",
    category: "all",
    title: "Smart Notes & 15-Yr PYQ Vault",
    badge: "High Yield",
    badgeStyle: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    target: "Target: PCM, PCB & PCMB Self-Study Students",
    desc: "Everything you need to revise and memorize high-yield science concepts fast: PCMB mindmaps, Organic reaction sheets, Formula cheat-sheets, and 15 years of solved PYQs.",
    icon: BookOpen,
    iconStyle: "text-emerald-400 bg-emerald-500/15 border-emerald-500/25",
    pills: ["🕒 Lifetime Access", "📄 400+ Smart Note PDFs"],
    features: [
      "Comprehensive high-yield Smart Notes for Physics, Chem, Math & Bio",
      "Special 'Biology Formula & Mindmap Kit' for PCM Students",
      "15+ Years Solved PYQ papers with detailed reasoning",
    ],
    originalPrice: "₹3,999",
    price: "₹1,999",
  },
  {
    id: "ai-mentor-pro",
    category: "all",
    title: "24/7 AI Science Mentor Pro",
    badge: "AI Powered",
    badgeStyle: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    target: "Target: 24/7 Instant Doubt Solving & Strategy",
    desc: "Your personal science genius available 24/7. Ask any question in Physics, Chem, Math, or Biology to receive immediate step-by-step logic, formula recall, and mock test diagnosis.",
    icon: Bot,
    iconStyle: "text-cyan-400 bg-cyan-500/15 border-cyan-500/25",
    pills: ["🕒 Valid Till Exam 2026", "🤖 Unlimited 24/7 AI Derivations"],
    features: [
      "Instant answers in < 1.5 seconds for complex PCMB derivations",
      "First-principles conceptual reasoning without spoon-feeding answers",
      "Personalized weak-area diagnosis after every CBT or chapter mock",
    ],
    originalPrice: "₹3,499",
    price: "₹1,499",
  },
];

export function ProgramsPricingSection({ onOpenAssessment, onSelectPlan }: ProgramsPricingSectionProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("all");
  const [selectedDetailsId, setSelectedDetailsId] = useState<string | null>(null);

  const filterTabs = [
    { label: "All Programs", value: "all" as FilterCategory },
    { label: "IISER (IAT)", value: "iat" as FilterCategory },
    { label: "NISER (NEST)", value: "nest" as FilterCategory },
    { label: "ISI & CMI", value: "isi_cmi" as FilterCategory },
  ];

  const filteredPrograms =
    selectedCategory === "all"
      ? programs
      : programs.filter((p) => p.category === selectedCategory || p.category === "all");

  const handleAccess = (programId: string) => {
    if (onSelectPlan) {
      onSelectPlan(programId);
      return;
    }
    const token = getToken();
    if (token) {
      router.push("/dashboard");
    } else {
      router.push(`/login?mode=signup&redirect=%2Fdashboard`);
    }
  };

  return (
    <section id="study-programs" className="py-20 sm:py-28 bg-[#07080F] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F1326] border border-indigo-500/25 text-xs font-semibold text-slate-300 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Self-Paced Precision • Smart Notes, CBT Mocks &amp; 24/7 AI Mentor</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-white tracking-tight leading-[1.1]">
            Study Material Engineered for{" "}
            <span className="bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#38BDF8] bg-clip-text text-transparent">
              Science Ranks
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            No rigid lecture schedules. Learn at your own pace with concise Smart Notes, exact TCS-iON CBT Mocks, Quick Sprints, Chapter Tests, 15–Year PYQs, and an always-on 24/7 AI Mentor.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {filterTabs.map((tab) => {
              const isActive = selectedCategory === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setSelectedCategory(tab.value)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400/40"
                      : "bg-[#0E1122] text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Programs Grid (2 rows x 3 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl bg-[#0D1022] border border-slate-800/90 hover:border-indigo-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all hover:bg-[#11152C] shadow-xl group relative overflow-hidden"
                >
                  {/* Top Bar with Icon & Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div
                        className={`h-11 w-11 rounded-2xl flex items-center justify-center border shrink-0 ${item.iconStyle}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-extrabold border uppercase tracking-wider ${item.badgeStyle}`}
                      >
                        {item.badge}
                      </span>
                    </div>

                    {/* Program Title & Target */}
                    <h3 className="text-xl font-black text-white tracking-tight group-hover:text-indigo-200 transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-xs text-indigo-400 font-semibold mt-1">
                      {item.target}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed mt-3 font-normal">
                      {item.desc}
                    </p>

                    {/* Pills Row */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.pills.map((pill, idx) => (
                        <span
                          key={idx}
                          className="text-[10.5px] font-medium bg-[#131830] text-slate-300 border border-slate-700/60 px-2.5 py-1 rounded-lg truncate"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>

                    {/* Feature Checklist */}
                    <div className="space-y-2.5 mt-5 pt-4 border-t border-slate-800/80 text-xs">
                      {item.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-slate-300">
                          <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & Bottom Actions */}
                  <div className="mt-8 pt-5 border-t border-slate-800/80 space-y-4">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs text-slate-500 line-through font-mono">
                          {item.originalPrice}
                        </span>
                        <span className="text-2xl font-black text-white tracking-tight">
                          {item.price}
                        </span>
                        <span className="text-xs text-slate-400">/ full package</span>
                      </div>

                      <button
                        onClick={() => setSelectedDetailsId(item.id)}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4 cursor-pointer"
                      >
                        Module Details
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-12 gap-2.5">
                      <button
                        onClick={() => setSelectedDetailsId(item.id)}
                        className="col-span-4 py-2.5 px-3 rounded-xl border border-slate-700/80 bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer text-center"
                      >
                        View Details
                      </button>

                      <Button
                        onClick={() => handleAccess(item.id)}
                        className="col-span-8 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-[#4338CA] hover:to-[#6D28D9] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-md shadow-indigo-600/20 group cursor-pointer border border-indigo-400/30 flex items-center justify-center gap-1.5"
                      >
                        <span>Get Instant Access</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
