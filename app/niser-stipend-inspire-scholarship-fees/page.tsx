import React from "react";
import type { Metadata } from "next";
import { AnnouncementBanner } from "@/components/shared/AnnouncementBanner";
import { Navbar } from "@/components/homepage/Navbar";
import { Footer } from "@/components/homepage/Footer";
import { NiserStipendClient } from "@/components/seo/NiserStipendClient";

export const metadata: Metadata = {
  title: "NISER Stipend Per Month, DISHA Scholarship, Fees & 300-Acre Campus Master Guide — SciPrep",
  description:
    "Comprehensive detailed guide on NISER Bhubaneswar stipend per month (₹5,000/mo DISHA scholarship + ₹20,000 summer research grant = ₹80,000/year), semester fee breakdown, 300-acre campus facilities, direct BARC Scientific Officer recruitment, and global PhD placements.",
  keywords: [
    "niser stipend per month",
    "niser area in acres",
    "niser bhubaneswar scholarship",
    "disha scholarship niser",
    "inspire scholarship niser",
    "niser fees structure semester wise",
    "cebs stipend per month",
    "barc direct interview niser",
    "niser campus area jatni",
    "niser hostel facilities and mess fees",
    "niser placements salary",
    "niser vs cebs comparison",
  ],
  alternates: {
    canonical: "https://sciprep.in/niser-stipend-inspire-scholarship-fees",
  },
  openGraph: {
    title: "NISER Stipend, DISHA Scholarship, Fees & 300-Acre Campus Master Guide",
    description:
      "Detailed analysis of the ₹80,000 annual DISHA scholarship, complete semester fee structure, 300-acre Jatni campus infrastructure, direct BARC recruitment, and international PhD placements.",
    url: "https://sciprep.in/niser-stipend-inspire-scholarship-fees",
    type: "article",
    images: [
      {
        url: "https://sciprep.in/logo.png",
        width: 1200,
        height: 630,
        alt: "NISER Bhubaneswar Stipend, Fees and Campus Master Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NISER Stipend Per Month & DISHA Scholarship Master Guide — SciPrep",
    description:
      "All about the ₹60,000/year stipend + ₹20,000 summer research grant, semester fees, and life on NISER's 300-acre campus.",
  },
};

const faqs = [
  {
    question: "What is the exact NISER stipend per month for Integrated M.Sc. students?",
    answer:
      "All students admitted to the 5-year Integrated M.Sc. program at NISER Bhubaneswar and UM-DAE CEBS Mumbai receive the prestigious DISHA fellowship from the Department of Atomic Energy (DAE), Government of India. The fellowship is ₹5,000 per month (₹60,000 per year) credited directly to the student's bank account, plus an annual summer project contingency grant of ₹20,000. Total annual financial aid is ₹80,000 per year (totaling ₹4,00,000 over 5 years).",
  },
  {
    question: "What is the total campus area of NISER Bhubaneswar in acres?",
    answer:
      "The permanent campus of NISER Bhubaneswar spans 300 acres of lush green land located at Jatni, Khordha district near Bhubaneswar, Odisha. It is nestled against the picturesque Barunei Hills and houses world-class research centers, residential hostels, central library, sports complex, and advanced instrumentation buildings.",
  },
  {
    question: "What is the semester-wise fee structure at NISER Bhubaneswar?",
    answer:
      "The academic fees at NISER are remarkably subsidised. The tuition fee is approximately ₹8,000 per semester (General/OBC), with 100% tuition fee waiver for SC/ST students. Other recurring charges include hostel seat rent (~₹1,500/semester), electricity/water charges (~₹1,000/semester), medical and exam fees. The total academic expense is approximately ₹25,000–₹30,000 per year, which is completely covered by the ₹80,000 annual DISHA scholarship.",
  },
  {
    question: "How does the ₹20,000 annual Summer Research Grant work?",
    answer:
      "Every year during summer vacations (May–July), students undertake research internships at leading Indian or international institutions (such as IISc, TIFR, BARC, IITs, or Max Planck Institutes). The ₹20,000 contingency grant funds travel, hostel accommodation, and research materials, and is disbursed upon submission of the summer project report.",
  },
  {
    question: "Can NISER graduates join BARC directly as Scientific Officers without written exams?",
    answer:
      "Yes. Graduating Integrated M.Sc. students who maintain a Cumulative Grade Point Average (CGPA) of 7.5 or above on a 10-point scale are directly eligible for interview selection for Scientific Officer (Group A Gazetted) posts at Bhabha Atomic Research Centre (BARC) and other DAE units (such as IGCAR, RRCAT, VECC) without appearing for the competitive nationwide GATE or OCES written screening test.",
  },
  {
    question: "What are the eligibility conditions to maintain the DISHA fellowship?",
    answer:
      "To continue receiving the monthly ₹5,000 DISHA scholarship, students must maintain a minimum CGPA of 6.0 (or 60% equivalent) on a 10.0 scale at the end of each academic year and have no active academic backlogs.",
  },
  {
    question: "Do CEBS Mumbai students receive the exact same stipend and benefits?",
    answer:
      "Yes. Students admitted to the Centre for Excellence in Basic Sciences (UM-DAE CEBS) in Kalina, Mumbai receive the exact same DAE DISHA fellowship of ₹60,000 per year (₹5,000/month) + ₹20,000 summer project contingency, along with direct BARC interview eligibility.",
  },
  {
    question: "Where do NISER and CEBS graduates go for PhDs?",
    answer:
      "More than 60% of NISER and CEBS alumni secure fully funded PhD positions with full fellowship stipends ($35,000–$50,000/year) at top global universities, including Harvard, MIT, Stanford, Cambridge, Oxford, Princeton, Caltech, Max Planck Institutes (Germany), ETH Zurich, and top Indian research institutes like IISc, TIFR, and ICTS.",
  },
  {
    question: "What are the hostel and mess facilities like on the 300-acre campus?",
    answer:
      "NISER provides single and twin occupancy hostel rooms equipped with high-speed internet (1 Gbps LAN ports), 24/7 power backup, RO drinking water, automatic washing machines, student-run dining messes offering North and South Indian cuisines, indoor badminton courts, and 24/7 medical hospital facilities.",
  },
  {
    question: "What rank in NEST is required to get admission into NISER Bhubaneswar?",
    answer:
      "For General category candidates, an All India Rank (AIR) within 1–250 (score ~115–135+ out of 180 in Best 3 subjects) ensures guaranteed selection in Round 1. For OBC-NCL, AIR 1–600 (Category Rank 1–120) is safe, and for SC/ST, ranks up to 1500+ qualify.",
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
