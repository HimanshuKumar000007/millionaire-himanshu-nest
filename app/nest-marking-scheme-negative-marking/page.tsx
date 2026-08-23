import React from "react";
import type { Metadata } from "next";
import { AnnouncementBanner } from "@/components/shared/AnnouncementBanner";
import { Navbar } from "@/components/homepage/Navbar";
import { Footer } from "@/components/homepage/Footer";
import { MarkingSchemeClient } from "@/components/seo/MarkingSchemeClient";

export const metadata: Metadata = {
  title: "Does NEST Have Negative Marking? Official NEST Marking Scheme & SMAS Rules Explained — SciPrep",
  description:
    "Complete breakdown of the official NEST marking scheme, single correct (+3/-1) and multi-correct (+4/0) questions, Section-wise MAS (SMAS) formula, and negative marking penalty calculation for NISER & CEBS.",
  keywords: [
    "does nest have negative marking",
    "marking scheme of nest exam",
    "nest negative marking",
    "smas in nest",
    "what is smas in nest exam",
    "nest marking pattern",
    "nest multiple correct negative marking",
    "nest exam total marks",
    "niser cutoff marking scheme",
  ],
  alternates: {
    canonical: "https://sciprep.in/nest-marking-scheme-negative-marking",
  },
  openGraph: {
    title: "Official NEST Exam Marking Scheme & Negative Marking Breakdown",
    description:
      "Understand the exact marking system in NEST: +3 for single correct (-1 negative), +4 for multiple correct, and Section-wise Minimum Admissible Score (SMAS) calculation.",
    url: "https://sciprep.in/nest-marking-scheme-negative-marking",
    type: "article",
    images: [
      {
        url: "https://sciprep.in/logo.png",
        width: 1200,
        height: 630,
        alt: "NEST Marking Scheme & Negative Marking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEST Marking Scheme & Negative Marking Explained — SciPrep",
    description:
      "Detailed analysis of NEST +3/-1 single correct and +4/0 multi-correct marking rules, sectional SMAS thresholds, and safe score formulas.",
  },
};

const faqs = [
  {
    question: "Does NEST exam have negative marking?",
    answer:
      "Yes. In Section 1 (Single Correct MCQs), each correct answer awards +3 marks, while each incorrect answer deducts -1 mark (negative marking penalty). Unattempted questions receive 0 marks. In Section 2 (Multiple Correct MCQs), correct combinations award +4 marks with NO negative marking (0 marks for wrong choices).",
  },
  {
    question: "What is the total marks of NEST exam and how is rank calculated?",
    answer:
      "The total question paper is 240 marks across four sections (Physics, Chemistry, Mathematics, Biology - 60 marks each). However, your final merit rank and percentile are calculated out of 180 marks using only your BEST THREE scoring subjects, provided you qualify SMAS in all four subjects.",
  },
  {
    question: "What happens if a candidate fails the SMAS sectional cutoff in one subject?",
    answer:
      "If you fail the Section-wise Minimum Admissible Score (SMAS) in ANY of the four subjects, you will be disqualified from receiving a valid NEST merit rank and cannot be considered for NISER or CEBS counseling, even if your total score in the other three subjects is very high.",
  },
  {
    question: "How is SMAS (Sectional Cutoff) calculated in NEST?",
    answer:
      "For General category candidates, SMAS in a subject section equals 20% of the average of the top 100 scores in that section (SMAS = 20% × M_A). For OBC-NCL it is 90% of General SMAS, and for SC/ST/Divyangjan it is 50% of General SMAS.",
  },
  {
    question: "Is there partial marking in NEST multi-correct questions?",
    answer:
      "In modern NEST formats, full +4 marks are awarded only if all correct options (and no incorrect options) are selected. Incorrect or partially chosen options carry 0 marks, ensuring zero negative marking risk in Section 2.",
  },
];

export default function MarkingSchemePage() {
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
        name: "NEST Marking Scheme & Negative Marking",
        item: "https://sciprep.in/nest-marking-scheme-negative-marking",
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
          <MarkingSchemeClient faqs={faqs} />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
