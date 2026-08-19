import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/lib/data/blogs";
import { Navbar } from "@/components/homepage/Navbar";
import { Footer } from "@/components/homepage/Footer";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2,
  GraduationCap,
  Target,
  FlaskConical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "NEST Exam Preparation Blog & Guides — SciPrep",
  description:
    "Expert guides, strategic roadmaps, cutoff analyses, PYQ breakdowns, and NISER/CEBS insights for aspirants preparing for the National Entrance Screening Test (NEST).",
  keywords: [
    "NEST exam preparation blog",
    "how to crack NEST exam",
    "NISER Bhubaneswar cutoff",
    "UM-DAE CEBS Mumbai stipend",
    "NEST PYQ analysis",
    "NEST 2026 strategy",
    "pure science entrance exam tips",
  ],
  alternates: {
    canonical: "https://sciprep.in/blog",
  },
  openGraph: {
    title: "NEST Preparation Guides & Expert Articles — SciPrep",
    description:
      "Actionable strategies, cutoffs, syllabus breakdowns, and career insights for NISER and CEBS aspirants.",
    url: "https://sciprep.in/blog",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "SciPrep NEST Preparation Blog",
      },
    ],
  },
};

export default function BlogIndexPage() {
  const featuredPost = BLOG_POSTS[0];
  const remainingPosts = BLOG_POSTS.slice(1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "SciPrep NEST Exam Blog",
    description:
      "Expert guides, strategic roadmaps, cutoff analyses, PYQ breakdowns, and NISER/CEBS insights.",
    url: "https://sciprep.in/blog",
    publisher: {
      "@type": "Organization",
      name: "SciPrep",
      url: "https://sciprep.in",
      logo: "https://sciprep.in/logo.png",
    },
    blogPost: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription,
      url: `https://sciprep.in/blog/${post.slug}`,
      datePublished: post.publishedAt,
      author: {
        "@type": "Person",
        name: post.author.name,
      },
      image: post.featuredImage,
    })),
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] flex flex-col justify-between text-[#111827]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-6">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-bold">Blog & Guides</span>
        </nav>

        {/* Hero Section */}
        <div className="space-y-4 mb-12">
          <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 px-3 py-1 font-bold text-xs">
            <Sparkles className="h-3 w-3 mr-1 text-indigo-600 inline" /> Official NISER & CEBS Exam Insights
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            The NEST Aspirant's <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">Knowledge Hub</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl leading-relaxed">
            High-authority strategy guides, historical cutoff analyses, previous year question trends, and inside reports on NISER Bhubaneswar and UM-DAE CEBS Mumbai.
          </p>
        </div>

        {/* Featured Post Hero Card */}
        {featuredPost && (
          <div className="mb-14 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <Badge className="bg-purple-100 text-purple-800 font-bold border-none text-xs">
                    {featuredPost.category}
                  </Badge>
                  <span className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {featuredPost.readTime}
                  </span>
                  <span className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {featuredPost.publishedAt}
                  </span>
                </div>

                <Link href={`/blog/${featuredPost.slug}`}>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 hover:text-indigo-600 transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="h-10 w-10 rounded-full object-cover border border-indigo-200"
                    />
                    <div>
                      <div className="text-sm font-black text-gray-900">
                        {featuredPost.author.name}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        {featuredPost.author.role}
                      </div>
                    </div>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs gap-1.5 shadow-sm">
                      Read Guide <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-inner">
                <img
                  src={featuredPost.featuredImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Grid of Remaining Articles */}
        <div className="space-y-6 mb-16">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-600" /> Latest NEST Articles & Analyses
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 backdrop-blur-md text-indigo-900 font-extrabold text-xs shadow-sm border border-white/50">
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-semibold">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {post.readTime}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {post.publishedAt}
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h4 className="text-lg font-black text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h4>
                    </Link>

                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-7 w-7 rounded-full object-cover border border-gray-200"
                    />
                    <span className="text-xs font-bold text-gray-700">
                      {post.author.name}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <span className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                      Read <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* High-Converting CTA Banner */}
        <section className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden mb-16">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-5">
            <Badge className="bg-white/10 text-indigo-200 border border-white/20 px-3 py-1 font-bold text-xs">
              <Sparkles className="h-3.5 w-3.5 mr-1 inline text-amber-300" /> Free 10-Minute Assessment
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Test Your Real NEST Readiness Level Today
            </h2>
            <p className="text-indigo-100 text-sm sm:text-base leading-relaxed">
              Find out your predicted percentile, conceptual weak spots, and subject readiness across Physics, Chemistry, Biology, and Math before exam day.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/assessment">
                <Button className="bg-white text-indigo-900 hover:bg-gray-100 font-extrabold text-sm px-6 h-11 rounded-xl shadow-md gap-2">
                  Take Free Diagnostic Assessment <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 font-bold text-sm px-6 h-11 rounded-xl">
                  Explore CBT Mocks & PYQs
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
