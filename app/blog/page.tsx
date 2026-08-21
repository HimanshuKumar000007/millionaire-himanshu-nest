import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data/blogs";
import { AnnouncementBanner } from "@/components/shared/AnnouncementBanner";
import { Navbar } from "@/components/homepage/Navbar";
import { Footer } from "@/components/homepage/Footer";
import { BlogIndexClient } from "@/components/blog/BlogIndexClient";

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

      {/* Top Announcement Bar */}
      <AnnouncementBanner />

      {/* Header Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-8">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-bold">Blog & Guides</span>
        </nav>

        {/* Client Interactive Component */}
        <BlogIndexClient initialPosts={BLOG_POSTS} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
