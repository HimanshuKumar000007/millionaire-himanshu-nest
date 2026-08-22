"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth/authGuard";
import { BlogPost } from "@/lib/data/blogs";
import {
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Share2,
  Bookmark,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Award,
  BookOpen,
  Target,
  FlaskConical,
  Copy,
  Check,
  Twitter,
  Linkedin,
  MessageCircle,
  ChevronDown,
  ListOrdered,
  Flame,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, useScroll, useSpring } from "motion/react";

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

  // Scroll reading progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Extract H2 headings for Table of Contents
  const headings = React.useMemo(() => {
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
      const scrollPosition = window.scrollY + 120;

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

  const shareOnTwitter = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`Check out this NEST guide: "${post.title}" on @SciPrep`);
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
    }
  };

  const shareOnWhatsApp = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`Must read NEST preparation guide: ${post.title}\n${url}`);
      window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    }
  };

  return (
    <>
      {/* Top Fixed Reading Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Main Article Body (8 Columns on desktop) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-bold text-gray-500 overflow-x-auto pb-1">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/blog" className="hover:text-indigo-600 transition-colors">
              Academic Guides
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-indigo-600 truncate max-w-[200px] sm:max-w-xs">{post.category}</span>
          </nav>

          {/* Article Header */}
          <header className="space-y-5 bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-2xs">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge className="bg-indigo-50 text-indigo-700 font-extrabold text-xs px-3 py-1 border border-indigo-200">
                <GraduationCap className="h-3.5 w-3.5 mr-1 text-indigo-600" /> {post.category}
              </Badge>
              <Badge variant="outline" className="text-emerald-700 bg-emerald-50/70 border-emerald-200 text-[10px] font-bold">
                ✓ NEST 2026/2027 Syllabus Verified
              </Badge>
              <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-gray-400" /> {post.readTime}
              </span>
              <span className="text-xs text-gray-400 font-semibold">•</span>
              <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-gray-400" /> {post.publishedAt}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author Byline & Social Share Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-11 w-11 rounded-full object-cover border-2 border-indigo-200 shadow-2xs"
                />
                <div>
                  <div className="text-xs sm:text-sm font-black text-gray-900 flex items-center gap-1">
                    {post.author.name}
                    <span className="text-indigo-600 text-xs font-bold" title="Verified Academic Author">✓ Verified Educator</span>
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">
                    {post.author.role}
                  </div>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy Guide Link"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-gray-500" />
                      <span className="hidden sm:inline">Copy Link</span>
                    </>
                  )}
                </button>

                <button
                  onClick={shareOnTwitter}
                  className="p-2 rounded-xl bg-gray-50 hover:bg-sky-50 hover:text-sky-600 text-gray-600 border border-gray-200 transition-colors cursor-pointer"
                  title="Share on X (Twitter)"
                >
                  <Twitter className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={shareOnWhatsApp}
                  className="p-2 rounded-xl bg-gray-50 hover:bg-emerald-50 hover:text-emerald-600 text-gray-600 border border-gray-200 transition-colors cursor-pointer"
                  title="Share on WhatsApp"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden shadow-2xs border border-gray-200/80 bg-gray-100">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Body Content */}
          <article className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-2xs space-y-6 text-gray-800 leading-relaxed text-sm sm:text-base font-normal">
            <div
              className="space-y-6"
              dangerouslySetInnerHTML={{
                __html: formatMarkdownToHtml(post.content),
              }}
            />
          </article>

          {/* Interactive Collapsible FAQs */}
          {post.faqs && post.faqs.length > 0 && (
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-2xs space-y-5">
              <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-indigo-600" /> Frequently Asked Questions
              </h3>
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
                        <div className="p-4 sm:p-5 bg-white border-t border-gray-100 text-xs sm:text-sm text-gray-600 leading-relaxed">
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
          <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-8 text-white shadow-xl space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-3">
              <Badge className="bg-white/10 text-indigo-200 border border-white/20 px-3 py-1 font-bold text-xs">
                <Sparkles className="h-3.5 w-3.5 mr-1 inline text-amber-300" /> Take Action Today
              </Badge>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                Put This Strategy into Action on Authentic CBT Mocks
              </h3>
              <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed max-w-xl">
                Experience the exact 180-mark evaluation engine, best-3 score calculation, and 2018–2025 PYQ archive on SciPrep.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  onClick={handleAssessmentClick}
                  className="bg-white text-indigo-900 hover:bg-gray-100 font-black text-xs sm:text-sm px-5 h-10 rounded-xl shadow-md gap-1.5 cursor-pointer"
                >
                  Start Free Diagnostic Assessment <ArrowRight className="h-4 w-4" />
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
              <h3 className="text-xl font-black text-gray-900">
                Continue Reading Next
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
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
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
            <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <ListOrdered className="h-4 w-4 text-indigo-600" />
                <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider">
                  Study Module Outline
                </h4>
              </div>
              <nav className="space-y-1.5">
                {headings.map((h) => {
                  const isActive = activeHeading === h.id;
                  return (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={`block py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? "bg-indigo-50 text-indigo-700 font-extrabold translate-x-1"
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
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider">
              <GraduationCap className="h-3.5 w-3.5" /> Assessment Suite
            </div>
            <h4 className="text-base font-black text-gray-900 leading-tight">
              Test Your Real NEST AIR Readiness
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Take our diagnostic assessment to benchmark your speed, accuracy, and SMAS clearance across Physics, Chemistry, Biology, and Math.
            </p>
            <Button
              onClick={handleAssessmentClick}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm cursor-pointer"
            >
              Start Diagnostic Assessment <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
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
    return `<div class="my-5 py-3.5 px-5 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 text-center font-mono text-sm font-bold text-indigo-950 shadow-2xs">${formatMathSymbols(math.trim())}</div>`;
  });

  // 2. Inline Math ($...$)
  out = out.replace(/\$([^$\n]+)\$/g, (_, math) => {
    return `<span class="font-mono text-xs font-bold text-indigo-900 bg-indigo-50/90 px-1.5 py-0.5 rounded border border-indigo-200/60">${formatMathSymbols(math.trim())}</span>`;
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
          `<th class="py-3.5 px-4 font-black text-gray-900 border-b border-gray-200 text-xs uppercase tracking-wider bg-gray-50/90">${h}</th>`
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
              isFirst ? "font-black text-gray-900" : "text-gray-600"
            }">${cell}</td>`;
          })
          .join("");
        return `<tr class="border-b border-gray-100 hover:bg-indigo-50/20 transition-colors">${tds}</tr>`;
      })
      .join("");

    return `<div class="overflow-x-auto my-8 rounded-2xl border border-gray-200 shadow-2xs"><table class="w-full text-left border-collapse bg-white"><thead class="border-b border-gray-200"><tr>${ths}</tr></thead><tbody class="divide-y divide-gray-100">${trs}</tbody></table></div>`;
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
    '<div class="my-6 p-5 rounded-2xl bg-amber-50/90 border-l-4 border-amber-500 text-amber-950 shadow-2xs space-y-1"><div class="flex items-center gap-1.5 font-black text-xs uppercase tracking-wider text-amber-800">⚠️ Pro Tip</div><div class="text-xs sm:text-sm leading-relaxed">$1</div></div>'
  );
  out = out.replace(
    /^>\s*(.*$)/gim,
    '<blockquote class="my-5 p-4 rounded-2xl bg-indigo-50/60 border-l-4 border-indigo-600 text-indigo-950 italic text-xs sm:text-sm leading-relaxed">$1</blockquote>'
  );

  // 5. Headings with IDs for TOC Anchor Jump Links
  out = out.replace(/^##\s+(.*$)/gim, (_, heading) => {
    const text = heading.trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return `<h2 id="${id}" class="text-2xl sm:text-3xl font-black text-gray-900 mt-10 mb-4 tracking-tight border-b border-gray-100 pb-2.5 scroll-mt-24">${text}</h2>`;
  });

  out = out.replace(/^###\s+(.*$)/gim, (_, heading) => {
    const text = heading.trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return `<h3 id="${id}" class="text-lg sm:text-xl font-black text-gray-900 mt-8 mb-3 tracking-tight text-indigo-950 scroll-mt-24">${text}</h3>`;
  });

  // 6. Bold & Italic
  out = out.replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-gray-900">$1</strong>');
  out = out.replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>');

  // 7. Lists
  out = out.replace(/^\-\s+(.*$)/gim, '<li class="text-gray-700 ml-4 list-disc text-sm sm:text-base mb-1.5">$1</li>');
  out = out.replace(/^(\d+)\.\s+(.*$)/gim, '<li class="text-gray-700 ml-4 list-decimal text-sm sm:text-base mb-1.5">$2</li>');

  // 8. Horizontal rules
  out = out.replace(/^---$/gim, '<hr class="my-8 border-gray-200" />');

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
      return `<p class="text-sm sm:text-base text-gray-700 leading-relaxed my-3.5">${trimmed}</p>`;
    })
    .join("\n");

  return out;
}
