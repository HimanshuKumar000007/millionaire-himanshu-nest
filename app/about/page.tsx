"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScientificBackground } from "@/components/shared/ScientificBackground";
import {
  Atom,
  Award,
  BookOpen,
  CheckCircle2,
  Compass,
  GraduationCap,
  Layers,
  Lightbulb,
  LineChart,
  Microscope,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  ArrowRight,
  ChevronRight,
  FileText,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const pillars = [
    {
      icon: Target,
      title: "Diagnostic Precision",
      desc: "Identify baseline knowledge and exact topic gaps in Mechanics, Organic Chemistry, Genetics, or Calculus before wasting hundreds of hours on familiar topics.",
      badge: "Step 01: Assess",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    {
      icon: BookOpen,
      title: "Focused 15-Min Smart Lessons",
      desc: "Bite-sized, high-yield conceptual lessons curated specifically for NEST depth—omitting unnecessary formula rote-memorization and focusing on first-principles science.",
      badge: "Step 02: Understand",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      icon: FileText,
      title: "Authentic 10-Year NEST PYQs",
      desc: "Exhaustive bank of past NEST papers with step-by-step conceptual breakdowns, difficulty tagging, and trap-option analysis.",
      badge: "Step 03: Practice",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      icon: LineChart,
      title: "Readiness Index & CBT Mocks",
      desc: "Timed computer-based test simulation providing real-time readiness telemetry, section-wise speed distribution, and predicted cutoff qualification.",
      badge: "Step 04: Excel",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
  ];

  const differences = [
    {
      aspect: "Curriculum Focus",
      standard: "Generic engineering (JEE) or medical (NEET) syllabus emphasizing speed and formula memorization.",
      sciprep: "Specialized for fundamental pure sciences (Physics, Chemistry, Biology, Mathematics) testing deep conceptual inquiry.",
    },
    {
      aspect: "Scoring Strategy",
      standard: "Fixed subject weightages with rigid scoring formulas.",
      sciprep: "Tailored for NEST's unique evaluation rule (evaluated on Best 3 of 4 subject sections out of 180 marks).",
    },
    {
      aspect: "Question Philosophy",
      standard: "Speed drills, short-cut tricks, and repetitive template problems.",
      sciprep: "Multi-concept synthesis problems, analytical reasoning, and rigorous experimental deduction.",
    },
    {
      aspect: "Learning Feedback",
      standard: "Simple raw scores or ranks with little actionable guidance.",
      sciprep: "Topic-level diagnostic gap analysis, time efficiency telemetry, and personalized daily action missions.",
    },
  ];

  const institutes = [
    {
      name: "NISER Bhubaneswar",
      full: "National Institute of Science Education and Research",
      location: "Jatni, Odisha",
      established: "An autonomous institute under the Department of Atomic Energy (DAE), Govt. of India.",
      highlight: "Affiliated with Homi Bhabha National Institute (HBNI). World-class research infrastructure across Physics, Chemistry, Biology, and Mathematics.",
      stipend: "DISHA / INSPIRE Scholarship (~₹60,000/year + ₹20,000 summer project contingency grant)",
    },
    {
      name: "UM-DAE CEBS Mumbai",
      full: "University of Mumbai - Department of Atomic Energy Centre for Excellence in Basic Sciences",
      location: "Kalina Campus, Mumbai",
      established: "Joint initiative of Department of Atomic Energy (DAE) and University of Mumbai.",
      highlight: "Direct proximity and research collaboration with premier institutes like BARC, TIFR, ACTREC, and IIT Bombay.",
      stipend: "DISHA / INSPIRE Scholarship (~₹60,000/year + ₹20,000 summer project contingency grant)",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FC] text-[#111827]">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-xs py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-[1.02]">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center space-x-1 bg-slate-100/70 p-1 rounded-full border border-gray-200/60">
            <Link
              href="/"
              className="px-3.5 py-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#111827] hover:bg-white rounded-full transition-all"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="px-3.5 py-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#111827] hover:bg-white rounded-full transition-all"
            >
              Dashboard
            </Link>
            <span className="px-3.5 py-1.5 text-xs font-bold text-indigo-600 bg-white rounded-full shadow-2xs">
              About SciPrep
            </span>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-xs font-semibold text-gray-700">
                Log in
              </Button>
            </Link>
            <Link href="/assessment">
              <Button size="sm" className="bg-[#4F46E5] hover:bg-[#3730A3] text-white text-xs font-bold shadow-xs">
                Free Diagnostic <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-gray-200/80 bg-white">
          <ScientificBackground />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[#4F46E5] text-xs font-bold tracking-wide uppercase"
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              <span>About SciPrep</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111827] leading-[1.14]"
            >
              Empowering India&apos;s Next Generation of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#3730A3]">
                Pure Science Scholars.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-3xl mx-auto font-normal"
            >
              SciPrep is the dedicated preparation platform built specifically for aspirants targeting 
              <strong> NISER Bhubaneswar</strong> and <strong>UM-DAE CEBS Mumbai</strong> through the National Entrance Screening Test (NEST).
            </motion.p>

            {/* Micro Stats Banner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-bold text-gray-700"
            >
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/80">
                <Atom className="h-4 w-4 text-indigo-600" />
                <span>Physics • Chemistry • Biology • Maths</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/80">
                <FileText className="h-4 w-4 text-emerald-600" />
                <span>10+ Years Authentic NEST PYQs</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/80">
                <Target className="h-4 w-4 text-purple-600" />
                <span>AI-Driven Readiness Telemetry</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Background Section */}
        <section className="py-16 sm:py-24 bg-[#F7F8FC] border-b border-gray-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                  <Compass className="h-3.5 w-3.5" />
                  <span>Our Mission</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111827] tracking-tight leading-tight">
                  Why Pure Science Deserves a Dedicated Preparation Architecture.
                </h2>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  For decades, Indian competitive preparation has been monopolized by engineering (JEE) and medical (NEET) coaching formulas. Students who dream of careers in atomic physics, quantum materials, biochemistry, astrophysics, or pure mathematics are forced to study from generic material that fails to nurture real scientific intuition.
                </p>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  <strong>SciPrep was founded to bridge this void.</strong> We believe that cracking prestigious entrance tests like NEST requires a system built exclusively around conceptual depth, multi-subject synergy, and continuous diagnostic feedback.
                </p>

                <div className="pt-2 flex items-center gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> No Content Clutter
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Concept-First Learning
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Transparent Diagnostics
                  </div>
                </div>
              </div>

              {/* Right Box: Key Tenets Card */}
              <div className="lg:col-span-6">
                <Card className="bg-white border-gray-200 p-6 sm:p-8 rounded-2xl shadow-md space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                      The SciPrep Core Difference
                    </span>
                    <Badge variant="success" className="text-[11px]">
                      Pure Science First
                    </Badge>
                  </div>

                  <div className="space-y-4 text-xs font-medium text-gray-700">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex gap-3 items-start">
                      <Lightbulb className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-sm text-gray-900 block font-bold mb-0.5">
                          First-Principles Mastery
                        </strong>
                        We break down core principles rather than relying on shortcut tricks that fail when NEST presents novel scientific setups.
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex gap-3 items-start">
                      <TrendingUp className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-sm text-gray-900 block font-bold mb-0.5">
                          Best 3 of 4 Evaluation Engine
                        </strong>
                        NEST evaluates candidates on their top 3 scoring subjects out of Physics, Chemistry, Biology, and Mathematics. Our diagnostic engine models this exact calculation.
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex gap-3 items-start">
                      <Microscope className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-sm text-gray-900 block font-bold mb-0.5">
                          Research & Scholar Aligned
                        </strong>
                        Created with insights from NISER & CEBS alumni who have walked the path and understand what the examiners test.
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

            </div>
          </div>
        </section>

        {/* The 4-Pillar System */}
        <section className="py-16 sm:py-24 bg-white border-b border-gray-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <Badge variant="default" className="text-xs uppercase font-bold tracking-wider">
                Our Methodology
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
                How SciPrep Prepares You for NISER & CEBS
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                A structured four-phase ecosystem connecting conceptual clarity with realistic test telemetry.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <motion.div key={p.title} variants={itemVariants}>
                    <Card className="bg-[#F7F8FC] border-gray-200/90 p-6 sm:p-7 rounded-2xl hover:border-indigo-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded-md border ${p.badgeColor}`}>
                            {p.badge}
                          </span>
                          <div className="h-10 w-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-indigo-600 group-hover:bg-[#4F46E5] group-hover:text-white transition-colors">
                            <Icon className="h-5 w-5" />
                          </div>
                        </div>

                        <h3 className="text-xl font-extrabold text-[#111827]">
                          {p.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                          {p.desc}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-gray-200/60 flex items-center text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
                        <span>Explore Module Features</span>
                        <ChevronRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Comparison: Generic Coaching vs SciPrep */}
        <section className="py-16 sm:py-24 bg-[#F7F8FC] border-b border-gray-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <Badge variant="warning" className="text-xs uppercase font-bold tracking-wider">
                Clear Contrast
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
                Generic Coaching vs. SciPrep
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Why standard coaching programs fail to address what NEST examiners are actually testing.
              </p>
            </div>

            <Card className="bg-white border-gray-200 rounded-2xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-gray-200">
                      <th className="py-4 px-5 font-black text-gray-900 w-1/4 uppercase tracking-wider text-xs">
                        Dimension
                      </th>
                      <th className="py-4 px-5 font-bold text-gray-500 w-3/8 uppercase tracking-wider text-xs">
                        Generic Coaching (JEE/NEET)
                      </th>
                      <th className="py-4 px-5 font-black text-indigo-600 w-3/8 uppercase tracking-wider text-xs bg-indigo-50/50">
                        SciPrep (NEST Dedicated)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {differences.map((d, i) => (
                      <tr key={d.aspect} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/40"}>
                        <td className="py-4 px-5 font-bold text-gray-900 align-top">
                          {d.aspect}
                        </td>
                        <td className="py-4 px-5 text-gray-500 leading-relaxed align-top">
                          {d.standard}
                        </td>
                        <td className="py-4 px-5 text-gray-900 font-medium leading-relaxed align-top bg-indigo-50/20">
                          <span className="flex items-start gap-1.5">
                            <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{d.sciprep}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        {/* Target Institutions Section */}
        <section className="py-16 sm:py-24 bg-white border-b border-gray-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <Badge variant="default" className="text-xs uppercase font-bold tracking-wider">
                Target Institutions
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
                Where SciPrep Leads You: NISER & UM-DAE CEBS
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                India&apos;s apex institutions for 5-Year Integrated M.Sc. education and fundamental scientific research.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {institutes.map((inst) => (
                <Card key={inst.name} className="bg-[#F7F8FC] border-gray-200 p-6 sm:p-8 rounded-2xl shadow-md space-y-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-200/70">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-indigo-600" />
                        <span className="text-sm font-mono font-bold text-gray-500 uppercase">
                          {inst.location}
                        </span>
                      </div>
                      <Badge variant="success" className="text-[11px]">
                        DAE Institute
                      </Badge>
                    </div>

                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                      {inst.name}
                    </h3>
                    <p className="text-xs font-semibold text-indigo-600 -mt-2">
                      {inst.full}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {inst.established}
                    </p>

                    <div className="p-3.5 rounded-xl bg-white border border-gray-200 text-xs text-gray-700 space-y-1.5">
                      <strong className="text-gray-900 block font-bold">Research Excellence:</strong>
                      <p className="text-gray-600 leading-relaxed">{inst.highlight}</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center gap-2">
                    <Award className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{inst.stipend}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white relative overflow-hidden">
          <ScientificBackground />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-indigo-200 border border-white/10 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>Begin Your Science Journey</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Ready to Discover Your NEST Readiness Index?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
              Take our free 3-minute diagnostic assessment to map your current accuracy across Physics, Chemistry, Biology, and Maths.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <Link href="/assessment" className="w-full sm:w-auto">
                <Button size="xl" className="w-full bg-[#4F46E5] hover:bg-[#3730A3] text-white font-bold shadow-lg shadow-indigo-500/30 text-sm">
                  Start Free Diagnostic Assessment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button variant="outline" size="xl" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 text-sm font-semibold">
                  Open Learning Dashboard
                </Button>
              </Link>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> 100% Free Diagnostic
              </span>
              <span>•</span>
              <span>No Credit Card Required</span>
              <span>•</span>
              <span>Personalized NEST Subject Insights</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 text-gray-600 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-gray-100">
            <div className="md:col-span-5 space-y-4">
              <Logo />
              <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                Dedicated preparation for the National Entrance Screening Test (NEST) for admissions to NISER Bhubaneswar and UM-DAE CEBS Mumbai.
              </p>
            </div>

            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Product</h4>
                <ul className="space-y-2 text-xs font-semibold">
                  <li><Link href="/#smart-lessons" className="hover:text-indigo-600 transition-colors">Smart Lessons</Link></li>
                  <li><Link href="/#pyqs" className="hover:text-indigo-600 transition-colors">PYQ Practice</Link></li>
                  <li><Link href="/#mock-tests" className="hover:text-indigo-600 transition-colors">Mock Tests</Link></li>
                  <li><Link href="/#how-it-works" className="hover:text-indigo-600 transition-colors">Methodology</Link></li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Company</h4>
                <ul className="space-y-2 text-xs font-semibold">
                  <li><Link href="/about" className="text-indigo-600 font-bold hover:underline">About SciPrep</Link></li>
                  <li><a href="mailto:support@sciprep.in" className="hover:text-indigo-600 transition-colors">Contact Support</a></li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Legal</h4>
                <ul className="space-y-2 text-xs font-semibold">
                  <li><Link href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <p>© 2026 SciPrep. All rights reserved.</p>
            <p className="text-center sm:text-right max-w-md">
              Disclaimer: SciPrep is an independent educational platform. NEST is conducted by NISER Bhubaneswar & UM-DAE CEBS Mumbai.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
