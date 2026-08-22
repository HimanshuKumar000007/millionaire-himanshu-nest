import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "SciPrep Academy — Crack IISER (IAT), NEST, ISI, CMI & IISc",
  description:
    "India's premier science entrance exam preparation platform. Learn from IISER & IIT alumni with live 2-way classes, All-India Test Series, and 24/7 doubt resolution.",
  keywords: [
    "IISER Aptitude Test",
    "IAT 2026",
    "NEST 2026",
    "NISER Preparation",
    "ISI Entrance Exam",
    "CMI Math Prep",
    "SciAstra alternative",
    "Prep4IISER",
    "IISc BS Research",
    "Indian Science Entrance"
  ],
  openGraph: {
    title: "SciPrep Academy — India's #1 Science Entrance Prep",
    description:
      "Join 10,000+ students cracking IISER, NEST, ISI & CMI with India's top science mentors.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "SciPrep Academy — Crack IISER, NEST & ISI",
    description: "Transform your passion for science into a research career at India's top institutes.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "SciPrep Academy",
    description: "India's premier coaching and mentorship platform for IISER IAT, NEST, ISI, and CMI examinations.",
    url: "https://sciprep.academy",
    sameAs: [
      "https://youtube.com/@sciprep",
      "https://t.me/sciprep_iiser",
      "https://instagram.com/sciprep"
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: "0",
      highPrice: "19999",
      offerCount: "6"
    }
  };

  return (
    <html lang="en" className={`dark scroll-smooth ${plusJakartaSans.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="bg-[#0A0A0F] text-[#F8FAFC] min-h-screen antialiased selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden font-sans"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

