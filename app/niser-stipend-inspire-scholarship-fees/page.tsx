import React from "react";
import type { Metadata } from "next";
import { AnnouncementBanner } from "@/components/shared/AnnouncementBanner";
import { Navbar } from "@/components/homepage/Navbar";
import { Footer } from "@/components/homepage/Footer";
import { NiserStipendClient } from "@/components/seo/NiserStipendClient";

export const metadata: Metadata = {
  title: "NISER Stipend Per Month, INSPIRE DISHA Scholarship, Fees & 300-Acre Campus Guide — SciPrep",
  description:
    "Complete breakdown of NISER Bhubaneswar stipend per month (₹5,000/mo DISHA scholarship + ₹20,000 summer grant = ₹80,000/yr), 300-acre Jatni campus, semester fee structure, and direct BARC Scientific Officer recruitment.",
  keywords: [
    "niser stipend per month",
    "niser area in acres",
    "niser bhubaneswar scholarship",
    "disha scholarship niser",
    "inspire scholarship niser",
    "niser fees structure",
    "cebs stipend per month",
    "barc direct interview niser",
    "niser campus area",
    "niser hostel facilities",
  ],
  alternates: {
    canonical: "https://sciprep.in/niser-stipend-inspire-scholarship-fees",
  },
  openGraph: {
    title: "NISER Stipend, DISHA Scholarship, Fees & Campus Guide",
    description:
      "All about the ₹80,000 annual DISHA scholarship, ₹5,000 monthly stipend, 300-acre campus, hostel fees, and direct career paths to BARC and top global PhDs.",
    url: "https://sciprep.in/niser-stipend-inspire-scholarship-fees",
    type: "article",
    images: [
      {
        url: "https://sciprep.in/logo.png",
        width: 1200,
        height: 630,
        alt: "NISER Stipend and Campus Life Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NISER Stipend Per Month & DISHA Scholarship — SciPrep",
    description:
      "Learn how all NISER & CEBS students receive ₹60,000/year stipend + ₹20,000 summer research grant on a 300-acre world-class campus.",
  },
};

const faqs = [
  {
    question: "What is the NISER stipend per month for Integrated M.Sc. students?",
    answer:
      "All students admitted to NISER Bhubaneswar and UM-DAE CEBS Mumbai receive the prestigious DISHA fellowship from the Department of Atomic Energy (DAE), Government of India. The stipend is ₹5,000 per month (₹60,000 per year), plus an annual summer project contingency grant of ₹20,000, bringing total financial support to ₹80,000 per year.",
  },
  {
    question: "What is the campus area of NISER Bhubaneswar in acres?",
    answer:
      "NISER Bhubaneswar spans a sprawling 300-acre ultra-modern campus located in Jatni, Khordha district (near Bhubaneswar, Odisha). The campus includes state-of-the-art research laboratories, specialized science libraries, high-performance computing clusters, residential hostels, sports complexes, and lush green open surroundings.",
  },
  {
    question: "Is education at NISER completely free?",
    answer:
      "Yes, effectively! The total academic and hostel fees at NISER are roughly ₹25,000–₹30,000 per year. Because every student receives ₹80,000 per year in DISHA scholarship and summer research grants, students not only study tuition-free but actually save ₹40,000–₹50,000 annually.",
  },
  {
    question: "Can NISER graduates join BARC directly without written exams?",
    answer:
      "Yes. Graduating Integrated M.Sc. students with a cumulative grade point average (CGPA) of 7.5 or above are eligible for direct personal interview selection for Scientific Officer (Group A) posts at Bhabha Atomic Research Centre (BARC) and other DAE units without needing to take the GATE or OCES written exam.",
  },
  {
    question: "Do CEBS Mumbai students receive the same stipend?",
    answer:
      "Yes! UM-DAE CEBS Mumbai students receive the exact same ₹60,000 annual stipend (₹5,000/month) plus ₹20,000 summer research contingency under the DAE DISHA scheme.",
  },
];

export default function NiserStipendPage() {
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
        name: "NISER Stipend & Campus Guide",
        item: "https://sciprep.in/niser-stipend-inspire-scholarship-fees",
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
          <NiserStipendClient faqs={faqs} />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
