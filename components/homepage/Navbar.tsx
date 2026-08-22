"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import {
  ArrowRight,
  Menu,
  Sparkles,
  ChevronDown,
  BookOpen,
  GraduationCap,
  Calculator,
  Bot,
  Layers,
  Award,
  HelpCircle,
  BarChart3,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth/authGuard";

interface NavbarProps {
  onOpenAssessment?: () => void;
  onOpenLogin?: () => void;
  onEnrollNow?: () => void;
}

export function Navbar({ onOpenAssessment, onOpenLogin, onEnrollNow }: NavbarProps) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCoursesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAssessmentClick = () => {
    if (onOpenAssessment) {
      onOpenAssessment();
    } else {
      const token = getToken();
      if (token) {
        router.push("/assessment");
      } else {
        router.push("/login?mode=signup&redirect=%2Fassessment");
      }
    }
  };

  const handleEnrollClick = () => {
    if (onEnrollNow) {
      onEnrollNow();
    } else {
      const el = document.getElementById("study-programs");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push("/login?mode=signup&redirect=%2Fdashboard");
      }
    }
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
    setCoursesDropdownOpen(false);
  };

  const coursesList = [
    {
      title: "IAT 2026 Complete Prep Suite",
      desc: "For IISERs (Pune, Kolkata, Mohali, Bhopal, TVM, Tirupati) & IISc",
      icon: GraduationCap,
      color: "text-indigo-400 bg-indigo-500/10",
      badge: "Bestseller",
      section: "study-programs",
    },
    {
      title: "NEST 2026 CBT & PYQ Pack",
      desc: "Engineered for NISER Bhubaneswar & UM-DAE CEBS Mumbai",
      icon: Award,
      color: "text-teal-400 bg-teal-500/10",
      badge: "High Rigor",
      section: "study-programs",
    },
    {
      title: "ISI & CMI Math PYQ & Mocks",
      desc: "B.Stat, B.Math, CMI UGA & UGB subjective proofs",
      icon: Calculator,
      color: "text-purple-400 bg-purple-500/10",
      badge: "Pure Math",
      section: "study-programs",
    },
    {
      title: "All-India CBT Test Series (AITS 2026)",
      desc: "Exact replica TCS-iON software with 150+ Mocks",
      icon: Layers,
      color: "text-amber-400 bg-amber-500/10",
      badge: "150+ Mocks",
      section: "study-programs",
    },
    {
      title: "Smart Notes & 15-Yr PYQ Vault",
      desc: "PCMB Mindmaps, formula sheets, NCERT extracts & PYQs",
      icon: BookOpen,
      color: "text-emerald-400 bg-emerald-500/10",
      badge: "High Yield",
      section: "study-programs",
    },
    {
      title: "24/7 AI Science Mentor Pro",
      desc: "Instant PCMB doubt solving in < 1.5s with step-by-step logic",
      icon: Bot,
      color: "text-cyan-400 bg-cyan-500/10",
      badge: "AI Powered",
      section: "study-programs",
    },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#090B14]/90 backdrop-blur-2xl border-b border-slate-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.6)] py-3"
            : "bg-[#090B14]/60 backdrop-blur-md py-4 border-b border-slate-800/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 group focus:outline-none transition-transform hover:scale-[1.02]"
          >
            <Logo theme="dark" showAcademy={true} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/60 backdrop-blur-xl px-3 py-1.5 rounded-full border border-slate-800/80 shadow-inner">
            {/* Courses Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCoursesDropdownOpen((prev) => !prev)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  coursesDropdownOpen
                    ? "text-white bg-slate-800/80"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <span>Courses</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    coursesDropdownOpen ? "rotate-180 text-indigo-400" : "text-slate-400"
                  }`}
                />
              </button>

              <AnimatePresence>
                {coursesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-2 w-[420px] bg-[#0E1122] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/80 p-3 z-50 overflow-hidden glow-purple"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-800/60 flex items-center justify-between">
                      <span>2026 Academic Programs</span>
                      <span className="text-indigo-400 font-mono">IAT • NEST • ISI • CMI</span>
                    </div>

                    <div className="grid grid-cols-1 gap-1.5 pt-2">
                      {coursesList.map((course) => {
                        const Icon = course.icon;
                        return (
                          <button
                            key={course.title}
                            onClick={() => handleScrollTo(course.section)}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/60 transition-all flex items-start gap-3 group cursor-pointer"
                          >
                            <div
                              className={`h-8 w-8 rounded-lg ${course.color} flex items-center justify-center shrink-0 mt-0.5 border border-white/5`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                                  {course.title}
                                </span>
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60 shrink-0 font-medium">
                                  {course.badge}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                                {course.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other links */}
            <button
              onClick={() => handleScrollTo("why-sciprep")}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-full transition-all cursor-pointer"
            >
              Why SciPrep
            </button>

            <button
              onClick={() => handleScrollTo("hall-of-fame")}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-full transition-all cursor-pointer"
            >
              Results (AIR)
            </button>

            <button
              onClick={() => handleScrollTo("platform-features")}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-full transition-all cursor-pointer"
            >
              Platform
            </button>

            <button
              onClick={handleAssessmentClick}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-full transition-all cursor-pointer"
            >
              Readiness Quiz
            </button>

            <button
              onClick={() => handleScrollTo("study-programs")}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-full transition-all cursor-pointer"
            >
              Pricing
            </button>

            <button
              onClick={() => handleScrollTo("faq")}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-full transition-all cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handleAssessmentClick}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-cyan-200 px-3 py-1.5 rounded-full hover:bg-cyan-500/10 transition-colors cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Free Diagnostic</span>
            </button>

            <div className="relative group">
              <Button
                onClick={handleEnrollClick}
                size="sm"
                className="relative bg-[#101328] hover:bg-[#161A36] text-white border border-slate-700/80 hover:border-indigo-500/50 shadow-md shadow-black/40 text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Enroll Now</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform text-indigo-400" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-xl border border-slate-800 text-slate-300 bg-slate-900/80 backdrop-blur-sm hover:bg-slate-800 transition-all active:scale-95 shadow-sm"
            aria-label="Open Mobile Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <Sheet isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col space-y-4 pt-2 h-full bg-[#0B0D18] text-white p-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <Logo theme="dark" showAcademy={true} />
              </div>

              <div className="space-y-1 overflow-y-auto max-h-[60vh] pr-1">
                <button
                  onClick={() => handleScrollTo("study-programs")}
                  className="w-full text-left py-2.5 px-3 text-sm font-semibold rounded-lg text-slate-200 hover:bg-slate-800/80 flex items-center justify-between"
                >
                  <span>Courses &amp; Programs</span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>
                <button
                  onClick={() => handleScrollTo("why-sciprep")}
                  className="w-full text-left py-2.5 px-3 text-sm font-semibold rounded-lg text-slate-200 hover:bg-slate-800/80"
                >
                  Why SciPrep
                </button>
                <button
                  onClick={() => handleScrollTo("hall-of-fame")}
                  className="w-full text-left py-2.5 px-3 text-sm font-semibold rounded-lg text-slate-200 hover:bg-slate-800/80"
                >
                  Results (AIR)
                </button>
                <button
                  onClick={() => handleScrollTo("platform-features")}
                  className="w-full text-left py-2.5 px-3 text-sm font-semibold rounded-lg text-slate-200 hover:bg-slate-800/80"
                >
                  Platform
                </button>
                <button
                  onClick={handleAssessmentClick}
                  className="w-full text-left py-2.5 px-3 text-sm font-semibold rounded-lg text-cyan-300 hover:bg-slate-800/80 flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4 text-cyan-400" /> Readiness Quiz
                </button>
                <button
                  onClick={() => handleScrollTo("study-programs")}
                  className="w-full text-left py-2.5 px-3 text-sm font-semibold rounded-lg text-slate-200 hover:bg-slate-800/80"
                >
                  Pricing
                </button>
                <button
                  onClick={() => handleScrollTo("faq")}
                  className="w-full text-left py-2.5 px-3 text-sm font-semibold rounded-lg text-slate-200 hover:bg-slate-800/80"
                >
                  FAQ
                </button>
              </div>

              <div className="mt-auto pt-4 space-y-2 border-t border-slate-800">
                <Button
                  onClick={handleAssessmentClick}
                  variant="outline"
                  className="w-full justify-center py-5 text-sm font-bold border-cyan-500/30 text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20"
                >
                  <Sparkles className="h-4 w-4 mr-2" /> Free Diagnostic Test
                </Button>
                <Button
                  onClick={handleEnrollClick}
                  className="w-full justify-center py-5 text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/20"
                >
                  Enroll Now <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Sheet>
    </>
  );
}
