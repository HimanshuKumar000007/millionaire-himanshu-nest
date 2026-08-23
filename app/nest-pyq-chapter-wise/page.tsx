import React from "react";
import type { Metadata } from "next";
import { AnnouncementBanner } from "@/components/shared/AnnouncementBanner";
import { Navbar } from "@/components/homepage/Navbar";
import { Footer } from "@/components/homepage/Footer";
import { ChapterWisePyqClient } from "@/components/seo/ChapterWisePyqClient";

export const metadata: Metadata = {
  title: "NEST PYQ Chapter Wise: Physics, Chemistry, Math & Biology (2018–2025 Solved) — SciPrep",
  description:
    "Practice official NEST Previous Year Questions (PYQs) chapter-wise with step-by-step verified solutions for Physics, Chemistry, Mathematics, and Biology from 2018 to 2025. Master high-weightage NISER & CEBS topics in authentic CBT test mode.",
  keywords: [
    "nest pyq chapter wise",
    "nest pyqs chapter wise",
    "nest previous year questions chapter wise",
    "nest physics pyq chapter wise",
    "nest chemistry pyqs solved",
    "nest biology pyq chapterwise",
    "nest math pyq chapter wise",
    "nest 2025 pyq solutions",
    "niser pyqs chapter wise pdf",
    "cebs previous year papers",
  ],
  alternates: {
    canonical: "https://sciprep.in/nest-pyq-chapter-wise",
  },
  openGraph: {
    title: "NEST PYQ Chapter Wise: Physics, Chemistry, Math & Biology (2018–2025)",
    description:
      "Practice official NEST Previous Year Questions chapter-wise with verified solutions for Physics, Chemistry, Mathematics, and Biology in real CBT test mode.",
    url: "https://sciprep.in/nest-pyq-chapter-wise",
    type: "website",
    images: [
      {
        url: "https://sciprep.in/logo.png",
        width: 1200,
        height: 630,
        alt: "SciPrep NEST PYQ Chapter Wise Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEST PYQ Chapter Wise (2018–2025 Solved) — SciPrep",
    description:
      "Chapter-wise sorted NEST previous year questions with step-by-step solutions and CBT mode for NISER & CEBS aspirants.",
  },
};

const faqs = [
  {
    question: "Are NEST PYQs sufficient to crack NISER Bhubaneswar?",
    answer:
      "Solving all official NEST Previous Year Questions from 2018 to 2025 chapter-wise is critical because NEST repeats structural problem styles, experimental conceptual models, and multi-concept calculus/organic chemistry applications. When paired with SciPrep's Smart Lessons and 180-mark mock tests, it provides complete preparation.",
  },
  {
    question: "How many questions are in NEST each year?",
    answer:
      "In modern NEST exams (2020–2025), each subject section (Physics, Chemistry, Mathematics, Biology) contains 17 questions totaling 60 marks per section (240 marks total in the paper). Your final merit rank is evaluated out of 180 marks from your best three scoring subjects.",
  },
  {
    question: "How can I solve NEST PYQs in chapter-wise CBT mode?",
    answer:
      "On SciPrep, every past year question from 2018 to 2025 is organized both year-wise and chapter-wise. You can launch instant CBT tests with a live timer, official marking schemes (+3/-1 single correct, +4/0 multi-correct), and instant AI diagnostic analytics.",
  },
  {
    question: "Which chapters have the highest weightage in NEST Biology and Physics?",
    answer:
      "In Physics, high-weightage chapters include Rotational Motion, Wave Optics, Thermodynamics, and Electrodynamics. In Biology, Genetics & Molecular Biology, Cell Biology, Plant Physiology, and Ecology carry substantial marks and are crucial for clearing the Biology SMAS sectional cutoff.",
  },
];

export default function ChapterWisePyqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

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
        name: "NEST PYQ Chapter Wise",
        item: "https://sciprep.in/nest-pyq-chapter-wise",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
        {/* Top Announcement Bar */}
        <AnnouncementBanner />

        {/* Sticky Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">
          <ChapterWisePyqClient faqs={faqs} />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
