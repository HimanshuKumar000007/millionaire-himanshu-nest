import React from "react";
import type { Metadata } from "next";
import { AnnouncementBanner } from "@/components/shared/AnnouncementBanner";
import { Navbar } from "@/components/homepage/Navbar";
import { Footer } from "@/components/homepage/Footer";
import { MarkingSchemeClient } from "@/components/seo/MarkingSchemeClient";

export const metadata: Metadata = {
  title: "Does NEST Have Negative Marking? Official NEST Marking Scheme, SMAS & MAS Formula Guide — SciPrep",
  description:
    "Exhaustive guide to the official NEST marking scheme: single correct (+3/-1 penalty), multi-correct (+4/0 zero risk), Section-wise Minimum Admissible Score (SMAS = 20% × M_A), MAS aggregate cutoff, and 180-mark Best-3 merit evaluation.",
  keywords: [
    "does nest have negative marking",
    "marking scheme of nest exam",
    "nest negative marking",
    "smas in nest",
    "what is smas in nest exam",
    "nest marking pattern",
    "nest multiple correct negative marking",
    "nest exam total marks 240 vs 180",
    "niser cutoff marking scheme",
    "smas formula nest exam",
    "nest percentile calculation",
    "nest negative marking rules",
  ],
  alternates: {
    canonical: "https://sciprep.in/nest-marking-scheme-negative-marking",
  },
  openGraph: {
    title: "Official NEST Exam Marking Scheme & Negative Marking Master Guide",
    description:
      "Master the exact evaluation mechanism of NEST: +3 for single correct (-1 penalty), +4 for multiple correct (no negative), SMAS sectional cutoffs, and Best-3 merit scoring.",
    url: "https://sciprep.in/nest-marking-scheme-negative-marking",
    type: "article",
    images: [
      {
        url: "https://sciprep.in/logo.png",
        width: 1200,
        height: 630,
        alt: "NEST Marking Scheme, SMAS and Negative Marking Master Guide",
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
      "Yes. In Section 1 (Single Correct MCQs), each correct answer awards +3 marks, while each incorrect answer deducts -1 mark (negative marking penalty). Unattempted questions carry 0 marks. In Section 2 (Multiple Correct MSQs), selecting all correct options awards +4 marks, with NO negative marking (0 marks for incorrect or unattempted choices).",
  },
  {
    question: "What is the total marks of NEST exam and how is rank calculated?",
    answer:
      "The total question paper is 240 marks across four sections (Physics, Chemistry, Mathematics, Biology - 60 marks each). However, your final merit rank and percentile are calculated out of 180 marks using only your BEST THREE scoring subjects, provided you qualify the Section-wise Minimum Admissible Score (SMAS) in ALL FOUR subjects.",
  },
  {
    question: "What happens if a candidate fails the SMAS sectional cutoff in their 4th subject?",
    answer:
      "If you fail the Section-wise Minimum Admissible Score (SMAS) in ANY of the four subjects, you will be completely disqualified from receiving a valid NEST merit rank and cannot participate in NISER or CEBS counseling, even if your total score in the other three subjects is 170/180.",
  },
  {
    question: "How is SMAS (Sectional Cutoff) calculated mathematically in NEST?",
    answer:
      "For General category candidates, SMAS in a subject section equals 20% of the average of the top 100 scores (M_A) in that section: SMAS = 20% × M_A. For OBC-NCL it is 90% of General SMAS (18% × M_A), and for SC/ST/Divyangjan it is 50% of General SMAS (10% × M_A). Historically, SMAS ranges between 4.5 and 8.5 marks per subject.",
  },
  {
    question: "What is the Minimum Admissible Score (MAS) in NEST?",
    answer:
      "MAS is the overall aggregate threshold across your Best 3 scoring subjects. For General category candidates, MAS is 50% of the average of the top 100 total scores (T_A) nationwide: MAS = 50% × T_A (typically ~65–75 marks out of 180). For OBC-NCL it is 90% of General MAS, and for SC/ST/PwD it is 50% of General MAS.",
  },
  {
    question: "Is there partial marking in NEST multi-correct questions?",
    answer:
      "In the modern NEST examination format, full +4 marks are awarded only when ALL correct options (and no incorrect options) are selected. Incorrect or partially chosen options carry 0 marks. Crucially, there is NO negative marking in Section 2, making it completely risk-free to attempt.",
  },
  {
    question: "What is the mathematical penalty of random guessing in NEST Section 1?",
    answer:
      "With 4 options in Section 1, random guessing has a 25% probability of getting +3 marks and a 75% probability of getting -1 mark. The expected value is E = (0.25 × 3) + (0.75 × -1) = 0.75 - 0.75 = 0.0 marks. However, if you eliminate just ONE option, the expected value becomes positive: E = (0.33 × 3) + (0.67 × -1) = +0.33 marks. If you eliminate TWO options, E = (0.5 × 3) + (0.5 × -1) = +1.0 mark per question.",
  },
  {
    question: "How does NEST marking scheme compare to JEE Advanced and NEET?",
    answer:
      "JEE Advanced features aggressive negative marking (-2 on multi-correct and -1 on single choice). NEET has +4/-1 on all 180 questions with no multi-correct sections. NEST is unique because its multi-correct questions carry +4 with 0 negative penalty, and ranking is determined by Best-3 subjects (180 marks) rather than all 4 subjects (240 marks).",
  },
  {
    question: "What is a safe score out of 180 to guarantee NISER Bhubaneswar?",
    answer:
      "A score of 120+ out of 180 (across your best 3 subjects) with at least 10–15 marks in your 4th non-core subject provides a 99%+ percentile and guarantees safe admission into NISER Bhubaneswar in Round 1. For UM-DAE CEBS Mumbai, a score of 100–115 marks is typically safe for General category.",
  },
  {
    question: "What is the best time allocation strategy for the 3.5-hour NEST exam?",
    answer:
      "Devote the first 25–30 minutes to your weakest/4th subject to bank 3–4 direct questions and secure ~10 marks to clear SMAS. Then allocate 55 minutes each to your 3 primary scoring subjects to maximize your Best-3 aggregate score, reserving the last 15 minutes for review and risk-free Section 2 multi-choice questions.",
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
