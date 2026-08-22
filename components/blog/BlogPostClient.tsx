"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth/authGuard";
import { BlogPost } from "@/lib/data/blogs";
import {
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  BookOpen,
  Target,
  Copy,
  Check,
  Twitter,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  ListOrdered,
  Flame,
  GraduationCap,
  Share2,
  Bookmark,
  Compass,
  BarChart3,
  Layers,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const router = useRouter();

  const handleAssessmentClick = () => {
    const token = getToken();
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login?mode=signup&redirect=%2Fdashboard");
    }
  };

  const handleDashboardClick = () => {
    const token = getToken();
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login?redirect=%2Fdashboard");
    }
  };

  const [copied, setCopied] = useState(false);
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const [fontSizeMode, setFontSizeMode] = useState<"normal" | "large">("normal");

  // Scroll reading progress
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setProgressPercent(Math.round(v * 100));
    });
  }, [scrollYProgress]);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setShowFloatingNav(latest > 350);
    });
  }, [scrollY]);

  // Extract H2 headings for Table of Contents
  const headings = useMemo(() => {
    const regex = /^##\s+(.*$)/gim;
    const matches = [];
    let match;
    while ((match = regex.exec(post.content)) !== null) {
      const text = match[1].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      matches.push({ text, id });
    }
    return matches;
  }, [post.content]);

  // Track active heading on scroll
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map((h) =>
        document.getElementById(h.id)
      );
      const scrollPosition = window.scrollY + 140;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveHeading(headings[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Fixed Reading Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 origin-left z-50 shadow-sm"
        style={{ scaleX }}
      />

      {/* Floating Minimalist Top Reader Bar */}
      <AnimatePresence>
        {showFloatingNav && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-xs px-4 sm:px-8 py-2.5 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-3 max-w-xl truncate">
              <Link
                href="/blog"
                className="text-xs font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-1 shrink-0 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> All Guides
              </Link>
              <span className="text-gray-300">|</span>
              <span className="text-xs font-black text-gray-900 truncate">
                {post.title}
              </span>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <span className="hidden sm:inline-block text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {progressPercent}% read
              </span>
              <button
                onClick={handleCopyLink}
                className="p-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 text-xs font-bold transition-colors cursor-pointer"
                title="Copy Link"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-gray-500" />}
              </button>
              <Button
                onClick={handleAssessmentClick}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black px-3.5 h-8 shadow-xs cursor-pointer gap-1"
              >
                <Flame className="h-3 w-3 text-amber-300" /> Free Test
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Main Article Body (8 Columns on desktop) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-bold text-gray-500 overflow-x-auto pb-1">
            <Link href="/" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/blog" className="hover:text-indigo-600 transition-colors">
              Academic Guides
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-indigo-600 font-black truncate max-w-[200px] sm:max-w-xs">{post.category}</span>
          </nav>

          {/* Article Header Card */}
          <header className="space-y-5 bg-white rounded-3xl p-6 sm:p-10 border border-indigo-100/70 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-gradient-to-br from-indigo-100/40 via-purple-100/30 to-transparent rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-wrap items-center gap-2.5 relative z-10">
              <Badge className="bg-indigo-50 text-indigo-700 font-black text-xs px-3 py-1 border border-indigo-200 shadow-2xs">
                <GraduationCap className="h-3.5 w-3.5 mr-1 text-indigo-600" /> {post.category}
              </Badge>
              <Badge variant="outline" className="text-emerald-700 bg-emerald-50/80 border-emerald-200 text-[11px] font-bold">
                ✓ NEST 2027 Verified
              </Badge>
              <span className="text-xs text-gray-400 font-semibold">•</span>
              <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-gray-400" /> {post.readTime}
              </span>
              <span className="text-xs text-gray-400 font-semibold">•</span>
              <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-gray-400" /> {post.publishedAt}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight leading-[1.2] relative z-10">
              {post.title}
            </h1>

            <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed relative z-10">
              {post.excerpt}
            </p>

            {/* Quick Action Pills in Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100 relative z-10 text-xs">
              <div className="flex items-center gap-2 text-gray-500 font-bold">
                <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg">
                  NISER & CEBS Exam Blueprint
                </span>
                <span className="hidden sm:inline bg-gray-50 text-gray-600 px-2.5 py-1 rounded-lg border border-gray-200">
                  PCBM Sectional Evaluation
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Font Size Toggle */}
                <div className="flex items-center rounded-xl bg-gray-50 border border-gray-200 p-0.5 text-xs font-bold text-gray-600">
                  <button
                    onClick={() => setFontSizeMode("normal")}
                    className={`px-2 py-1 rounded-lg transition-all ${
                      fontSizeMode === "normal" ? "bg-white text-indigo-600 shadow-2xs font-black" : "hover:text-gray-900"
                    }`}
                    title="Standard Font Size"
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSizeMode("large")}
                    className={`px-2 py-1 rounded-lg transition-all ${
                      fontSizeMode === "large" ? "bg-white text-indigo-600 shadow-2xs font-black text-sm" : "hover:text-gray-900"
                    }`}
                    title="Comfortable Reading Size"
                  >
                    A+
                  </button>
                </div>

                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy Link to Clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-gray-500" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden shadow-sm border border-gray-200/80 bg-gray-100">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
          </div>

          {/* Key Conceptual Takeaways Card */}
          <div className="bg-gradient-to-br from-indigo-50/90 via-purple-50/60 to-white rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                <Target className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-gray-900">
                  Module Learning Objectives & Exam Relevance
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Key takeaways for maximizing your score in the upcoming NEST CBT examination
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3.5 border border-indigo-50 shadow-2xs space-y-1">
                <div className="text-xs font-black text-indigo-900 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> SMAS Compliance
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                  Ensure sectional clearance in all 4 subjects to qualify for MAS ranking.
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3.5 border border-indigo-50 shadow-2xs space-y-1">
                <div className="text-xs font-black text-indigo-900 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Best 3 of 4 Strategy
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                  Optimize your top three high-scoring sections to maximize aggregate out of 180.
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3.5 border border-indigo-50 shadow-2xs space-y-1">
                <div className="text-xs font-black text-indigo-900 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> PYQ Patterns
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                  Leverage multi-year question frequency trends from 2018–2025 examinations.
                </p>
              </div>
            </div>
          </div>

          {/* Article Body Content */}
          <article
            className={`bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6 text-slate-800 leading-relaxed ${
              fontSizeMode === "large" ? "text-base sm:text-lg" : "text-sm sm:text-[16.5px]"
            } font-normal`}
          >
            <div
              className="space-y-6 article-content"
              dangerouslySetInnerHTML={{
                __html: formatMarkdownToHtml(post.content),
              }}
            />
          </article>

          {/* Interactive Collapsible FAQs */}
          {post.faqs && post.faqs.length > 0 && (
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-2xs space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-black text-gray-900 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-indigo-600" /> Frequently Asked Questions
                </h3>
                <span className="text-xs font-bold text-gray-400">
                  {post.faqs.length} Questions
                </span>
              </div>
              <div className="space-y-3">
                {post.faqs.map((faq, i) => {
                  const isOpen = expandedFaq === i;
                  return (
                    <div
                      key={i}
                      className="rounded-2xl border border-gray-200/80 overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setExpandedFaq(isOpen ? null : i)}
                        className="w-full p-4 sm:p-5 text-left bg-gray-50/70 hover:bg-gray-100/70 font-black text-xs sm:text-sm text-gray-900 flex items-center justify-between gap-3 transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-gray-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-indigo-600" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="p-4 sm:p-5 bg-white border-t border-gray-100 text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Bottom Conversion Banner */}
          <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-3">
              <Badge className="bg-white/10 text-indigo-200 border border-white/20 px-3 py-1 font-bold text-xs">
                <Sparkles className="h-3.5 w-3.5 mr-1 inline text-amber-300" /> Apply This Framework
              </Badge>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                Put This Strategy into Action on Authentic CBT Mocks
              </h3>
              <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed max-w-xl font-medium">
                Experience the exact 180-mark evaluation engine, best-3 score calculation, and 2018–2025 PYQ archive on SciPrep.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  onClick={handleAssessmentClick}
                  className="bg-white text-indigo-900 hover:bg-gray-100 font-black text-xs sm:text-sm px-5 h-10 rounded-xl shadow-md gap-1.5 cursor-pointer"
                >
                  Take Free Diagnostic Assessment <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleDashboardClick}
                  variant="outline"
                  className="border-white/30 bg-white/5 text-white hover:bg-white/10 font-bold text-xs sm:text-sm px-5 h-10 rounded-xl cursor-pointer"
                >
                  Open Student Dashboard
                </Button>
              </div>
            </div>
          </section>

          {/* Related Articles Cards */}
          {relatedPosts.length > 0 && (
            <section className="space-y-5 pt-4">
              <h3 className="text-lg sm:text-xl font-black text-gray-900">
                Continue Learning Next
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between group space-y-4"
                  >
                    <div className="space-y-2">
                      <Badge className="bg-indigo-50 text-indigo-700 text-xs font-bold border-none">
                        {rel.category}
                      </Badge>
                      <h4 className="text-sm sm:text-base font-black text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-medium">
                        {rel.excerpt}
                      </p>
                    </div>
                    <div className="text-xs font-bold text-indigo-600 flex items-center gap-1 pt-2 border-t border-gray-100">
                      Read Guide <ArrowRight className="h-3 w-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Desktop Sticky Table of Contents & Quick Tools Sidebar (4 Columns) */}
        <div className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6">
          {/* Table of Contents Card */}
          {headings.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <ListOrdered className="h-4 w-4 text-indigo-600" />
                  <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider">
                    Study Module Outline
                  </h4>
                </div>
                <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                  {headings.length} Sections
                </span>
              </div>
              <nav className="space-y-1.5 max-h-[50vh] overflow-y-auto pr-1">
                {headings.map((h) => {
                  const isActive = activeHeading === h.id;
                  return (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={`block py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? "bg-indigo-600 text-white font-black shadow-xs translate-x-1"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {h.text}
                    </a>
                  );
                })}
              </nav>
            </div>
          )}

          {/* Quick Readiness Tool Box */}
          <div className="rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 border border-indigo-100 shadow-2xs space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider shadow-2xs">
              <GraduationCap className="h-3.5 w-3.5" /> Assessment Suite
            </div>
            <h4 className="text-base font-black text-gray-900 leading-tight">
              Test Your Real NEST AIR Readiness
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              Take our diagnostic assessment to benchmark your speed, accuracy, and SMAS clearance across Physics, Chemistry, Biology, and Math.
            </p>
            <Button
              onClick={handleAssessmentClick}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow-sm shadow-indigo-600/25 cursor-pointer"
            >
              Start Diagnostic Assessment <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showFloatingNav && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-slate-900 text-white shadow-xl hover:bg-indigo-600 transition-all cursor-pointer border border-white/20"
            title="Back to Top"
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

// Complete Markdown & Table parser for Blog Articles
function formatMathSymbols(str: string): string {
  return str
    .replace(/\\Delta/g, "Δ")
    .replace(/\\text\{([^}]+)\}/g, "$1")
    .replace(/\\ln/g, "ln")
    .replace(/\\times/g, "×")
    .replace(/\\ge/g, "≥")
    .replace(/\\le/g, "≤")
    .replace(/\\circ/g, "°")
    .replace(/\\pm/g, "±")
    .replace(/\^\\circ/g, "°")
    .replace(/\_\{([^}]+)\}/g, "<sub>$1</sub>")
    .replace(/\_([a-zA-Z0-9])/g, "<sub>$1</sub>");
}

function formatMarkdownToHtml(markdown: string): string {
  // 1. Math Display Blocks ($$...$$)
  let out = markdown.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
    return `<div class="my-6 py-4 px-6 rounded-2xl bg-slate-950 border border-slate-800 text-center font-mono text-sm sm:text-base font-bold text-indigo-300 shadow-md overflow-x-auto"><span class="text-[10px] font-sans font-bold uppercase tracking-widest text-indigo-400 block mb-1">📐 Equation / Mathematical Derivation</span>${formatMathSymbols(math.trim())}</div>`;
  });

  // 2. Inline Math ($...$)
  out = out.replace(/\$([^$\n]+)\$/g, (_, math) => {
    return `<span class="font-mono text-xs font-bold text-indigo-900 bg-indigo-50/95 px-2 py-0.5 rounded-md border border-indigo-200/80 shadow-2xs">${formatMathSymbols(math.trim())}</span>`;
  });

  // 3. Process Tables
  const lines = out.split("\n");
  const resultLines: string[] = [];
  let inTable = false;
  let tableRows: string[] = [];

  const renderTable = (rows: string[]): string => {
    if (rows.length < 2) return rows.join("\n");
    const headerCells = rows[0]
      .split("|")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);
    const bodyRows = rows.slice(2);

    const ths = headerCells
      .map(
        (h) =>
          `<th class="py-3.5 px-4 font-black text-white border-b border-slate-800 text-xs uppercase tracking-wider bg-slate-900">${h}</th>`
      )
      .join("");

    const trs = bodyRows
      .map((row) => {
        const cells = row
          .split("|")
          .map((c) => c.trim())
          .filter((c) => c.length > 0);
        const tds = cells
          .map((cell, idx) => {
            const isFirst = idx === 0;
            return `<td class="py-3.5 px-4 text-xs sm:text-sm ${
              isFirst ? "font-black text-gray-900 bg-slate-50/50" : "text-gray-600"
            }">${cell}</td>`;
          })
          .join("");
        return `<tr class="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors">${tds}</tr>`;
      })
      .join("");

    return `<div class="overflow-x-auto my-8 rounded-2xl border border-gray-200 shadow-sm"><table class="w-full text-left border-collapse bg-white"><thead class="border-b border-gray-200"><tr>${ths}</tr></thead><tbody class="divide-y divide-gray-100">${trs}</tbody></table></div>`;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("|") && line.endsWith("|")) {
      inTable = true;
      tableRows.push(line);
    } else {
      if (inTable) {
        resultLines.push(renderTable(tableRows));
        inTable = false;
        tableRows = [];
      }
      resultLines.push(lines[i]);
    }
  }
  if (inTable) {
    resultLines.push(renderTable(tableRows));
  }

  out = resultLines.join("\n");

  // 4. Alerts & Blockquotes
  out = out.replace(
    /^>\s*\[!IMPORTANT\]\s*\n^>\s*(.*$)/gim,
    '<div class="my-6 p-5 sm:p-6 rounded-2xl bg-amber-50/90 border-l-4 border-amber-500 text-amber-950 shadow-sm space-y-1.5"><div class="flex items-center gap-1.5 font-black text-xs uppercase tracking-wider text-amber-800">⚠️ Critical Examination Requirement</div><div class="text-xs sm:text-sm leading-relaxed font-medium">$1</div></div>'
  );
  out = out.replace(
    /^>\s*(.*$)/gim,
    '<blockquote class="my-6 p-5 sm:p-6 rounded-2xl bg-indigo-50/60 border-l-4 border-indigo-600 text-indigo-950 italic text-xs sm:text-sm leading-relaxed font-medium">$1</blockquote>'
  );

  // 5. Headings with IDs for TOC Anchor Jump Links
  out = out.replace(/^##\s+(.*$)/gim, (_, heading) => {
    const text = heading.trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return `<h2 id="${id}" class="text-xl sm:text-2xl font-black text-gray-900 mt-10 mb-4 tracking-tight border-b border-gray-100 pb-3 scroll-mt-28 flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-indigo-600 inline-block"></span><span>${text}</span></h2>`;
  });

  out = out.replace(/^###\s+(.*$)/gim, (_, heading) => {
    const text = heading.trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return `<h3 id="${id}" class="text-base sm:text-lg font-black text-indigo-950 mt-8 mb-3 tracking-tight scroll-mt-28">${text}</h3>`;
  });

  // 6. Bold & Italic
  out = out.replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-gray-900">$1</strong>');
  out = out.replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>');

  // 7. Lists
  out = out.replace(/^\-\s+(.*$)/gim, '<li class="text-slate-700 ml-4 list-disc text-sm sm:text-[15.5px] leading-relaxed mb-2 font-medium">$1</li>');
  out = out.replace(/^(\d+)\.\s+(.*$)/gim, '<li class="text-slate-700 ml-4 list-decimal text-sm sm:text-[15.5px] leading-relaxed mb-2 font-medium">$2</li>');

  // 8. Horizontal rules
  out = out.replace(/^---$/gim, '<hr class="my-10 border-gray-200" />');

  // 9. Paragraphs
  const paragraphs = out.split(/\n\s*\n/);
  out = paragraphs
    .map((p) => {
      const trimmed = p.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<div") ||
        trimmed.startsWith("<table") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<hr") ||
        trimmed.startsWith("<li")
      ) {
        return trimmed;
      }
      return `<p class="text-slate-700 leading-[1.8] my-4 font-normal">${trimmed}</p>`;
    })
    .join("\n");

  return out;
}
