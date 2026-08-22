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
  title: "SciPrep — Smart Preparation for NEST (NISER & UM-DAE CEBS)",
  description:
    "India's dedicated preparation platform for NEST (National Entrance Screening Test). Master PCMB with high-yield Smart Notes, 100% authentic TCS-iON CBT Mocks, 15+ years solved PYQs, and 24/7 AI Science Mentor.",
  keywords: [
    "NEST 2026",
    "NEST 2027",
    "National Entrance Screening Test",
    "NISER Bhubaneswar Preparation",
    "UM-DAE CEBS Mumbai",
    "NEST PYQ Papers",
    "NEST Mock Tests",
    "NEST CBT Simulator",
    "NEST SMAS Cutoff",
    "NEST Smart Notes"
  ],
  openGraph: {
    title: "SciPrep — Dedicated NEST (NISER & CEBS) Preparation Platform",
    description:
      "Crack NEST with authentic TCS-iON CBT mock tests, high-yield smart notes, solved PYQs, and 24/7 AI Science Mentor.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "SciPrep — Crack NEST for NISER & UM-DAE CEBS",
    description: "Transform your passion for pure sciences into admission at NISER Bhubaneswar & UM-DAE CEBS Mumbai.",
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
    name: "SciPrep",
    description: "India's dedicated coaching and mentorship platform for the NEST examination (NISER Bhubaneswar & UM-DAE CEBS Mumbai).",
    url: "https://sciprep.in",
    sameAs: [
      "https://youtube.com/@sciprep",
      "https://t.me/sciprep_nest",
      "https://instagram.com/sciprep"
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: "0",
      highPrice: "5999",
      offerCount: "4"
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

