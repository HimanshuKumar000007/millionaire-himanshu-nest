"use client";

import * as React from "react";
import { useState } from "react";
import {
  Trophy,
  GraduationCap,
  CheckCircle2,
  Play,
  Star,
  Users,
  Award,
  Video,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";

type RankerCategory = "all" | "iat" | "nest" | "isi" | "cmi";

interface Ranker {
  id: string;
  category: "iat" | "nest" | "isi" | "cmi";
  initials: string;
  avatarBg: string;
  name: string;
  location: string;
  airBadge: string;
  targetInstitute: string;
  scoreText: string;
  quote: string;
  footerRightText?: string;
  hasWatchLink?: boolean;
}

const rankers: Ranker[] = [
  {
    id: "tanmay-sahoo",
    category: "nest",
    initials: "TS",
    avatarBg: "bg-amber-500 text-black font-black",
    name: "Tanmay Sahoo",
    location: "Cuttack, Odisha",
    airBadge: "AIR 3 • NEST",
    targetInstitute: "NISER Bhubaneswar (Integrated M.Sc)",
    scoreText: "Score: 168 / 180 Marks",
    quote:
      "The NEST-specific mock tests at SciPrep were identical to the real exam pattern. Their sectional cut-off strategy in Biology helped me secure a top 5 rank!",
    hasWatchLink: true,
  },
  {
    id: "ananya-sharma",
    category: "iat",
    initials: "AS",
    avatarBg: "bg-purple-600 text-white font-black",
    name: "Ananya Sharma",
    location: "Jaipur, Rajasthan",
    airBadge: "AIR 12 • IAT",
    targetInstitute: "IISER Pune (BS-MS Dual Degree)",
    scoreText: "Score: 214 / 240 Marks",
    quote:
      "Coming from a PCM background, I had zero confidence in Biology. Dr. Debashis taught high-yield biology from scratch in 3 months. That added 45 crucial marks!",
    hasWatchLink: true,
  },
  {
    id: "rohan-sen",
    category: "isi",
    initials: "RS",
    avatarBg: "bg-pink-600 text-white font-black",
    name: "Rohan Sen",
    location: "Kolkata, West Bengal",
    airBadge: "AIR 8 • ISI",
    targetInstitute: "ISI Kolkata (B.Stat Hons + Full Stipend)",
    scoreText: "Score: UGA: 112/120, UGB: 95/100",
    quote:
      "The subjective proof-writing sessions for UGB are unmatched. The mentors reviewed every single mathematical line and taught me how to write formal proofs.",
    footerRightText: "SciPrep Full Batch Alum",
  },
  {
    id: "priyanshu-verma",
    category: "iat",
    initials: "PV",
    avatarBg: "bg-blue-600 text-white font-black",
    name: "Priyanshu Verma",
    location: "Lucknow, Uttar Pradesh",
    airBadge: "AIR 21 • IAT",
    targetInstitute: "IISc Bangalore (BS Research)",
    scoreText: "Score: 208 / 240 Marks",
    quote:
      "SciPrep's Smart Notes & CBT Mocks made Physics problem solving intuitive. The 24/7 AI Mentor answered all my late-night derivations in seconds.",
    hasWatchLink: true,
  },
  {
    id: "kavya-murthy",
    category: "nest",
    initials: "KM",
    avatarBg: "bg-teal-500 text-black font-black",
    name: "Kavya Murthy",
    location: "Bengaluru, Karnataka",
    airBadge: "AIR 17 • NEST",
    targetInstitute: "UM-DAE CEBS Mumbai (Chemical Sciences)",
    scoreText: "Score: 154 / 180 Marks",
    quote:
      "The 24/7 doubt resolution team was unbelievable. Even when solving DPPs at 1 AM, I got handwritten steps back within 10 minutes.",
    footerRightText: "SciPrep Full Batch Alum",
  },
  {
    id: "siddharth-iyer",
    category: "cmi",
    initials: "SI",
    avatarBg: "bg-rose-600 text-white font-black",
    name: "Siddharth Iyer",
    location: "Chennai, Tamil Nadu",
    airBadge: "AIR 14 • CMI",
    targetInstitute: "Chennai Mathematical Institute (B.Sc Math & CS)",
    scoreText: "Score: Full Scholarship Allotment",
    quote:
      "Non-routine mathematics requires creative intuition, not memorized steps. SciPrep solved past 15-year CMI questions with elegant proofs.",
    hasWatchLink: true,
  },
];

export function HallOfFameSection() {
  const [selectedCategory, setSelectedCategory] = useState<RankerCategory>("all");
  const [activeVideoModal, setActiveVideoModal] = useState(false);

  const filterTabs = [
    { label: "All Rankers", value: "all" as RankerCategory },
    { label: "IAT Selections", value: "iat" as RankerCategory },
    { label: "NEST Selections", value: "nest" as RankerCategory },
    { label: "ISI Selections", value: "isi" as RankerCategory },
    { label: "CMI Selections", value: "cmi" as RankerCategory },
  ];

  const filteredRankers =
    selectedCategory === "all"
      ? rankers
      : rankers.filter((r) => r.category === selectedCategory);

  return (
    <section id="hall-of-fame" className="py-20 sm:py-28 bg-[#07080F] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F1326] border border-amber-500/25 text-xs font-semibold text-amber-300 shadow-sm">
            <Trophy className="h-3.5 w-3.5 text-amber-400" />
            <span>Hall of Fame • Verified 2024 &amp; 2025 Admissions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-white tracking-tight leading-[1.1]">
            India&apos;s Highest Selection Ratio in{" "}
            <span className="bg-gradient-to-r from-amber-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              IISER &amp; NEST
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Real rankers, authentic marks, and direct admissions into India&apos;s most prestigious research institutions.
          </p>
        </div>

        {/* 4 Metric Boxes Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl bg-[#0D1022] border border-slate-800 p-6 text-center space-y-1.5 shadow-lg">
            <div className="text-3xl sm:text-4xl font-black text-indigo-400">540+</div>
            <div className="text-xs sm:text-sm font-bold text-slate-300">
              IISER &amp; NISER Selections
            </div>
          </div>

          <div className="rounded-2xl bg-[#0D1022] border border-slate-800 p-6 text-center space-y-1.5 shadow-lg">
            <div className="text-3xl sm:text-4xl font-black text-cyan-400">10,000+</div>
            <div className="text-xs sm:text-sm font-bold text-slate-300">
              Active Aspirants Trained
            </div>
          </div>

          <div className="rounded-2xl bg-[#0D1022] border border-slate-800 p-6 text-center space-y-1.5 shadow-lg">
            <div className="text-3xl sm:text-4xl font-black text-purple-400">50+</div>
            <div className="text-xs sm:text-sm font-bold text-slate-300">
              IISER/IIT Alumni Faculty
            </div>
          </div>

          <div className="rounded-2xl bg-[#0D1022] border border-slate-800 p-6 text-center space-y-1.5 shadow-lg">
            <div className="text-3xl sm:text-4xl font-black text-amber-400">49/50</div>
            <div className="text-xs sm:text-sm font-bold text-slate-300">
              4.9 / 5 Rating (1,450+ Reviews)
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
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

        {/* 6 Ranker Testimonial Cards (2 rows x 3 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredRankers.map((ranker) => (
              <motion.div
                key={ranker.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-[#0D1022] border border-slate-800/90 hover:border-indigo-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all hover:bg-[#11152C] shadow-xl group"
              >
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div
                        className={`h-11 w-11 rounded-2xl flex items-center justify-center text-sm ${ranker.avatarBg} shadow-sm`}
                      >
                        {ranker.initials}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors">
                          {ranker.name}
                        </h4>
                        <div className="text-xs text-slate-400">{ranker.location}</div>
                      </div>
                    </div>

                    {/* AIR Badge */}
                    <span className="px-2.5 py-1 rounded-full text-[10.5px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {ranker.airBadge}
                    </span>
                  </div>

                  {/* Target Institute & Score Box */}
                  <div className="p-3 rounded-xl bg-[#13172E] border border-slate-800/80 space-y-1">
                    <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                      <span className="truncate">{ranker.targetInstitute}</span>
                    </div>
                    <div className="text-[11px] text-cyan-300 font-mono font-semibold pl-5">
                      {ranker.scoreText}
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed italic border-l-2 border-indigo-500/50 pl-3">
                    &ldquo;{ranker.quote}&rdquo;
                  </p>
                </div>

                {/* Card Footer */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Verified Scholar</span>
                  </span>

                  {ranker.hasWatchLink ? (
                    <button
                      onClick={() => setActiveVideoModal(true)}
                      className="inline-flex items-center gap-1 text-indigo-300 hover:text-white font-bold text-[11px] transition-colors cursor-pointer"
                    >
                      <Play className="h-3 w-3 text-indigo-400 fill-indigo-400/20" />
                      <span>Watch Journey</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-medium">
                      {ranker.footerRightText}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Banner Card: Podcast / Video Testimonials */}
        <div className="rounded-2xl bg-[#0E1124] border border-indigo-500/20 p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
              <Play className="h-6 w-6 fill-purple-400/20 text-purple-400" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Watch How 500+ Students Cracked Science Entrances
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Unfiltered podcast conversations with top rankers discussing drop year routines, subject strategies, and life at IISER Pune, Kolkata &amp; NISER.
              </p>
            </div>
          </div>

          <Button
            onClick={() => setActiveVideoModal(true)}
            className="w-full sm:w-auto bg-[#FFFFFF] hover:bg-slate-100 text-slate-950 text-xs sm:text-sm font-extrabold px-5 py-3 rounded-xl transition-all shrink-0 cursor-pointer flex items-center gap-2 shadow-lg"
          >
            <Play className="h-4 w-4 fill-slate-950 text-slate-950" />
            <span>Watch Video Testimonials</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
