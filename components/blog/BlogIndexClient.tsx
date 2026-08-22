"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth/authGuard";
import { BlogPost } from "@/lib/data/blogs";
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
  Flame,
  Filter,
  X,
  Layers,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";

interface BlogIndexClientProps {
  initialPosts: BlogPost[];
}

const CATEGORIES = [
  "All Guides",
  "News & Announcements",
  "Strategy & Roadmap",
  "Exam Pattern & Cutoffs",
  "College Insights",
  "PYQ Analysis",
] as const;

export function BlogIndexClient({ initialPosts }: BlogIndexClientProps) {
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
  const [selectedCategory, setSelectedCategory] = useState<string>("All Guides");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All Guides" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.keywords.some((k) =>
          k.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  const featuredPost = initialPosts[0];

  return (
    <div className="space-y-12">
      {/* Educational Knowledge Hub Header */}
      <div className="relative rounded-3xl bg-gradient-to-br from-white via-indigo-50/40 to-purple-50/30 p-6 sm:p-10 border border-gray-200/80 shadow-2xs overflow-hidden">
        {/* Subtle Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-purple-200/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-indigo-100 shadow-2xs text-xs font-black text-indigo-900">
            <GraduationCap className="h-4 w-4 text-indigo-600" />
            <span>SciPrep Academic Resource & Strategy Center</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            NEST Preparation Library &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              Academic Blueprints
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed max-w-3xl">
            Peer-reviewed syllabus guides, official category-wise SMAS cutoff algorithms, multi-year PYQ frequency breakdowns, and scientific scoring strategies for NISER Bhubaneswar & UM-DAE CEBS Mumbai.
          </p>

          {/* Academic Trust Tags */}
          <div className="flex flex-wrap gap-2.5 pt-1 text-xs font-bold text-gray-700">
            <span className="bg-white/80 border border-gray-200/90 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> DAE / NISER Syllabus Aligned
            </span>
            <span className="bg-white/80 border border-gray-200/90 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Best 3 of 4 Scoring Mathematics
            </span>
            <span className="bg-white/80 border border-gray-200/90 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> 2018–2025 Solved PYQ Archive
            </span>
          </div>

          {/* Live Search & Filter Bar */}
          <div className="pt-3 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search study guides, topics, syllabus, or cutoffs (e.g. SMAS, Optics, Genetics, NISER)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-white rounded-2xl border border-gray-200 text-xs sm:text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <Button
              onClick={handleAssessmentClick}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold px-5 h-10 shadow-sm shadow-indigo-600/20 gap-1.5 shrink-0 cursor-pointer"
            >
              <Flame className="h-3.5 w-3.5 text-amber-300" /> Free Diagnostic Test
            </Button>
          </div>
        </div>
      </div>

      {/* Category Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          const count =
            cat === "All Guides"
              ? initialPosts.length
              : initialPosts.filter((p) => p.category === cat).length;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? "bg-gray-900 text-white shadow-sm scale-100"
                  : "bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-200/80"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Featured Editorial Post (Visible when viewing All and no search) */}
      {selectedCategory === "All Guides" && !searchQuery && featuredPost && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white rounded-3xl p-6 sm:p-8 border border-indigo-100/80 shadow-md shadow-indigo-500/5 hover:shadow-lg hover:border-indigo-200 transition-all overflow-hidden group"
        >
          <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-indigo-50/50 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge className="bg-indigo-600 text-white font-black text-xs px-3 py-1 border-none shadow-xs">
                  🔥 Featured Masterguide
                </Badge>
                <Badge className="bg-purple-50 text-purple-700 font-bold text-xs border border-purple-200">
                  {featuredPost.category}
                </Badge>
                <span className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {featuredPost.readTime}
                </span>
              </div>

              <Link href={`/blog/${featuredPost.slug}`}>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight">
                  {featuredPost.title}
                </h2>
              </Link>

              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>

              {/* Key Takeaways Preview Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[11px] font-bold text-gray-700 bg-gray-50 border border-gray-200/80 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Best 3 out of 4 rule
                </span>
                <span className="text-[11px] font-bold text-gray-700 bg-gray-50 border border-gray-200/80 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" /> SMAS minimum threshold
                </span>
                <span className="text-[11px] font-bold text-gray-700 bg-gray-50 border border-gray-200/80 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" /> 6-Month study roadmap
                </span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="h-10 w-10 rounded-full object-cover border-2 border-indigo-200"
                  />
                  <div>
                    <div className="text-xs sm:text-sm font-black text-gray-900">
                      {featuredPost.author.name}
                    </div>
                    <div className="text-[11px] text-gray-500 font-medium">
                      {featuredPost.author.role}
                    </div>
                  </div>
                </div>

                <Link href={`/blog/${featuredPost.slug}`}>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs gap-1.5 shadow-sm">
                    Read Masterguide <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-inner border border-gray-100">
              <img
                src={featuredPost.featuredImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Grid of Filtered Articles */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-600" />
            <span>
              {searchQuery ? `Search Results (${filteredPosts.length})` : "All NEST Study Guides"}
            </span>
          </h3>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200/80 shadow-2xs space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center">
              <Search className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-black text-gray-900">No articles matched your search</h4>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
              We couldn't find any guides matching "{searchQuery}". Try searching for terms like "PYQ", "Cutoff", "Physics", or "NISER".
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Guides");
              }}
              className="rounded-xl text-xs font-bold"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/95 backdrop-blur-md text-indigo-950 font-extrabold text-xs shadow-2xs border border-white/60">
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
                        <h4 className="text-base sm:text-lg font-black text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h4>
                      </Link>

                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="h-7 w-7 rounded-full object-cover border border-gray-200"
                      />
                      <span className="text-xs font-bold text-gray-700 truncate max-w-[120px]">
                        {post.author.name}
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <span className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Read Guide <ArrowRight className="h-3 w-3" />
                      </span>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Conversion Banner: Diagnostic Test */}
      <section className="relative rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 p-8 sm:p-12 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-5">
          <Badge className="bg-white/10 text-indigo-200 border border-white/20 px-3 py-1 font-bold text-xs">
            <Sparkles className="h-3.5 w-3.5 mr-1 inline text-amber-300" /> Free 10-Minute Assessment
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Discover Your Real NEST Readiness Level Today
          </h2>
          <p className="text-indigo-100 text-xs sm:text-base leading-relaxed">
            Find out your predicted percentile, conceptual weak spots, and subject readiness across Physics, Chemistry, Biology, and Math before exam day.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              onClick={handleAssessmentClick}
              className="bg-white text-indigo-900 hover:bg-gray-100 font-black text-xs sm:text-sm px-6 h-11 rounded-xl shadow-md gap-2 cursor-pointer"
            >
              Take Free Diagnostic Assessment <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleDashboardClick}
              variant="outline"
              className="border-white/30 bg-white/5 text-white hover:bg-white/10 font-bold text-xs sm:text-sm px-6 h-11 rounded-xl cursor-pointer"
            >
              Explore CBT Mocks & PYQs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
