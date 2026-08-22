'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Atom,
  Orbit,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  BookOpen,
  Trophy,
  Users,
  HelpCircle,
  PhoneCall,
  GraduationCap,
  ArrowRight,
  Flame
} from 'lucide-react';

interface NavbarProps {
  onOpenEnroll: (planName?: string) => void;
  onOpenTrial: () => void;
}

export function Navbar({ onOpenEnroll, onOpenTrial }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Study Packages', href: '#pricing', hasDropdown: true },
    { name: 'Why SciPrep', href: '#why-us' },
    { name: 'Results (AIR)', href: '#results' },
    { name: 'Platform', href: '#platform' },
    { name: 'Readiness Quiz', href: '#quiz' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  const courseList = [
    {
      title: 'IAT 2026 Complete Prep Suite',
      subtitle: 'Smart Notes, CBT Mocks & 24/7 AI Mentor',
      badge: 'Bestseller',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      href: '#pricing',
    },
    {
      title: 'NEST 2026 CBT & PYQ Pack',
      subtitle: 'NISER & CEBS Mocks, Smart Notes & AI Mentor',
      badge: 'Popular',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      href: '#pricing',
    },
    {
      title: 'ISI & CMI Math PYQ & Mocks',
      subtitle: 'Proof-writing notes & Olympiad chapter tests',
      badge: 'Specialized',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      href: '#pricing',
    },
    {
      title: 'All-India CBT Test Series (AITS)',
      subtitle: 'Full Mocks, Quick Sprints & Chapter Tests',
      badge: '150+ Mocks',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      href: '#pricing',
    },
  ];

  return (
    <>
      {/* Top Batch Alert Bar */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-purple-950/80 to-slate-950 border-b border-indigo-500/20 text-xs py-2 px-4 text-center relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap text-slate-300">
          <span className="inline-flex items-center gap-1 bg-indigo-500/20 text-indigo-300 font-semibold px-2 py-0.5 rounded-full border border-indigo-500/30 text-[11px]">
            <Flame className="w-3 h-3 text-amber-400 fill-amber-400" /> New Batch Alert
          </span>
          <span className="font-medium text-slate-200">
            IAT & NEST 2026 Smart Notes, CBT Mocks & 24/7 AI Mentor are <strong className="text-white font-bold">Live</strong>.
          </span>
          <span className="hidden sm:inline text-indigo-300 font-semibold">• Instant Access Available</span>
          <button
            onClick={() => onOpenEnroll('IAT 2026 Complete Prep Suite')}
            className="text-indigo-400 hover:text-indigo-200 underline font-semibold ml-1 cursor-pointer transition-colors inline-flex items-center gap-0.5"
          >
            Get Instant Access <ArrowRight className="w-3 h-3 inline" />
          </button>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'glass-panel py-3 shadow-2xl shadow-black/50 border-b border-white/10'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500 p-[1px] shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
              <div className="w-full h-full bg-[#0A0A0F] rounded-[11px] flex items-center justify-center">
                <Orbit className="w-5 h-5 text-cyan-400 group-hover:rotate-90 transition-transform duration-700" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                  SciPrep
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Academy
                </span>
              </div>
              <span className="text-[10px] text-slate-400 tracking-wide -mt-0.5">
                IISER • NEST • ISI • CMI
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#12121A]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5 shadow-inner">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setCoursesDropdownOpen(true)}
                    onMouseLeave={() => setCoursesDropdownOpen(false)}
                  >
                    <button
                      className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white rounded-full transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          coursesDropdownOpen ? 'rotate-180 text-indigo-400' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {coursesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className="absolute top-full left-0 mt-2 w-84 p-2 rounded-2xl glass-panel border border-white/10 shadow-2xl z-50 bg-[#12121A]/95"
                        >
                          <div className="text-[11px] font-semibold text-slate-400 px-3 py-1.5 uppercase tracking-wider">
                            Popular Target Batches
                          </div>
                          <div className="space-y-1">
                            {courseList.map((item, idx) => (
                              <a
                                key={idx}
                                href={item.href}
                                onClick={() => setCoursesDropdownOpen(false)}
                                className="block p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                                    {item.title}
                                  </span>
                                  <span
                                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                                  >
                                    {item.badge}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-400 mt-0.5">{item.subtitle}</p>
                              </a>
                            ))}
                          </div>
                          <div className="mt-2 pt-2 border-t border-white/10 px-2 flex items-center justify-between text-xs">
                            <span className="text-slate-400">Need exam counseling?</span>
                            <button
                              onClick={() => {
                                setCoursesDropdownOpen(false);
                                onOpenTrial();
                              }}
                              className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                            >
                              Free 1-on-1 Call <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenTrial}
              className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Free Diagnostic</span>
            </button>

            <button
              onClick={() => onOpenEnroll()}
              className="relative group overflow-hidden rounded-xl p-[1px] font-semibold text-sm cursor-pointer shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-transform"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative flex items-center gap-1.5 px-4 py-2 rounded-[11px] bg-[#0E0E17] group-hover:bg-opacity-80 text-white transition-all">
                <span>Enroll Now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenEnroll()}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white sm:hidden"
            >
              Enroll
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors border border-white/5"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-b border-white/10 bg-[#0E0E17]/95 backdrop-blur-2xl overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {courseList.map((c, i) => (
                    <a
                      key={i}
                      href={c.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs font-medium text-slate-200"
                    >
                      <div className="font-semibold text-white truncate">{c.title}</div>
                      <div className="text-[10px] text-indigo-400 mt-0.5">{c.badge}</div>
                    </a>
                  ))}
                </div>

                <div className="space-y-1 pt-2 border-t border-white/10">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>

                <div className="pt-3 flex flex-col gap-2.5">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenTrial();
                    }}
                    className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-white flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Take Free Diagnostic Test
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenEnroll();
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
                  >
                    Enroll in 2026 Batches
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
