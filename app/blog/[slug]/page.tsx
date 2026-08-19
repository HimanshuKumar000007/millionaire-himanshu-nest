import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS, BlogPost } from "@/lib/data/blogs";
import { Navbar } from "@/components/homepage/Navbar";
import { Footer } from "@/components/homepage/Footer";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found — SciPrep",
    };
  }

  const canonicalUrl = `https://sciprep.in/blog/${post.slug}`;

  return {
    title: `${post.title} — SciPrep`,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [post.featuredImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  // Article Schema
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "SciPrep",
      url: "https://sciprep.in",
      logo: "https://sciprep.in/logo.png",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://sciprep.in/blog/${post.slug}`,
    },
  };

  // FAQ Schema
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Breadcrumb Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://sciprep.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://sciprep.in/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://sciprep.in/blog/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] flex flex-col justify-between text-[#111827]">
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header */}
      <Navbar />

      {/* Article Content Wrapper */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-8">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-indigo-600 transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-bold truncate max-w-xs sm:max-w-md">
            {post.title}
          </span>
        </nav>

        {/* Article Header */}
        <header className="space-y-6 mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-indigo-50 text-indigo-700 font-extrabold text-xs px-3 py-1 border border-indigo-200">
              {post.category}
            </Badge>
            <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-gray-400" /> {post.readTime}
            </span>
            <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-gray-400" /> {post.publishedAt}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author Byline */}
          <div className="flex items-center justify-between py-4 border-y border-gray-200/80">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-11 w-11 rounded-full object-cover border-2 border-indigo-200 shadow-2xs"
              />
              <div>
                <div className="text-sm font-black text-gray-900">
                  {post.author.name}
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  {post.author.role}
                </div>
              </div>
            </div>

            <Link href="/blog">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl border-gray-200 text-xs font-bold gap-1 hover:bg-gray-50"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> All Guides
              </Button>
            </Link>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden mb-12 shadow-sm border border-gray-200/80">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content */}
        <article className="prose prose-indigo max-w-none bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-2xs space-y-6 text-gray-800 leading-relaxed text-sm sm:text-base font-normal">
          <div
            className="space-y-6"
            dangerouslySetInnerHTML={{
              __html: formatMarkdownToHtml(post.content),
            }}
          />
        </article>

        {/* Embedded Interactive FAQs */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-2xs space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-indigo-600" /> Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {post.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-gray-50/80 border border-gray-100 space-y-2"
                >
                  <h4 className="text-sm sm:text-base font-black text-gray-900">
                    {faq.question}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* In-Article High-Converting Assessment CTA */}
        <section className="mt-12 bg-gradient-to-r from-purple-900 via-indigo-900 to-indigo-800 rounded-3xl p-8 text-white shadow-xl space-y-4">
          <Badge className="bg-white/10 text-indigo-200 border border-white/20 px-3 py-1 font-bold text-xs">
            <Sparkles className="h-3.5 w-3.5 mr-1 inline text-amber-300" /> SciPrep Smart Platform
          </Badge>
          <h3 className="text-2xl font-black tracking-tight">
            Put This Strategy Into Practice on Official NEST Mocks
          </h3>
          <p className="text-indigo-100 text-sm leading-relaxed max-w-2xl">
            Experience the real 180-mark evaluation engine, best-3 score optimizer, and chapter-wise official PYQ bank on SciPrep.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/assessment">
              <Button className="bg-white text-indigo-900 hover:bg-gray-100 font-black text-xs sm:text-sm px-5 h-10 rounded-xl shadow-sm gap-1.5">
                Take Free Diagnostic Test <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 font-bold text-xs sm:text-sm px-5 h-10 rounded-xl">
                Open Student Dashboard
              </Button>
            </Link>
          </div>
        </section>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-14 space-y-6">
            <h3 className="text-xl font-black text-gray-900">
              Related NEST Preparation Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-2">
                    <Badge className="bg-indigo-50 text-indigo-700 text-xs font-bold border-none">
                      {rel.category}
                    </Badge>
                    <h4 className="text-base font-black text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
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
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Helper to format LaTeX math formulas to clean HTML
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

// Complete Markdown & Table parser for Blog Articles
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

  // 5. Headings
  out = out.replace(
    /^##\s+(.*$)/gim,
    '<h2 class="text-2xl sm:text-3xl font-black text-gray-900 mt-10 mb-4 tracking-tight border-b border-gray-100 pb-2.5">$1</h2>'
  );
  out = out.replace(
    /^###\s+(.*$)/gim,
    '<h3 class="text-lg sm:text-xl font-black text-gray-900 mt-8 mb-3 tracking-tight text-indigo-950">$1</h3>'
  );

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
