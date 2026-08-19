import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SciPrep — Smart Preparation for NEST & Pure Sciences',
  description:
    'Prepare for NEST (NISER & UM-DAE CEBS) with AI-powered smart lessons, official previous-year questions (PYQs), authentic CBT mock tests, personalized roadmaps, and readiness insights. The focused preparation platform for serious NEST aspirants.',
  keywords: [
    'SciPrep',
    'NEST exam preparation',
    'NEST 2027',
    'National Entrance Screening Test',
    'NISER Bhubaneswar preparation',
    'UM-DAE CEBS Mumbai',
    'NEST PYQs',
    'NEST mock tests',
    'NEST readiness',
    'NISER entrance exam',
    'CEBS entrance exam',
    'NEST physics preparation',
    'NEST chemistry preparation',
    'NEST biology preparation',
    'NEST mathematics preparation',
    'NEST online test series',
    'science entrance exam India',
  ],
  authors: [{ name: 'SciPrep Team' }],
  creator: 'SciPrep',
  publisher: 'SciPrep',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'SciPrep — Smart Preparation for NEST 2027',
    description:
      'A focused preparation platform for NEST aspirants — combining smart lessons, PYQs, realistic CBT mock tests, AI-powered readiness insights, and personalized roadmaps.',
    url: 'https://sciprep.in',
    siteName: 'SciPrep',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SciPrep — Smart Preparation for NEST 2027',
    description:
      'Focused NEST preparation for NISER & CEBS aspirants with smart analytics, PYQs, mock tests, and AI readiness insights.',
    creator: '@sciprep',
  },
  alternates: {
    canonical: 'https://sciprep.in',
  },
  verification: {
    google: 'googleec5a9ca46fd461da',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  category: 'Education',
};

/* JSON-LD Structured Data */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://sciprep.in/#organization',
      name: 'SciPrep',
      url: 'https://sciprep.in',
      description:
        'SciPrep is a focused exam preparation platform for NEST (National Entrance Screening Test) aspirants targeting admission to NISER Bhubaneswar and UM-DAE CEBS Mumbai.',
      foundingDate: '2026',
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://sciprep.in/#website',
      url: 'https://sciprep.in',
      name: 'SciPrep',
      description: 'Smart Preparation for NEST & Pure Sciences',
      publisher: { '@id': 'https://sciprep.in/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://sciprep.in/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'WebPage',
      '@id': 'https://sciprep.in/#webpage',
      url: 'https://sciprep.in',
      name: 'SciPrep — Smart Preparation for NEST & Pure Sciences',
      isPartOf: { '@id': 'https://sciprep.in/#website' },
      about: { '@id': 'https://sciprep.in/#organization' },
      description:
        'Prepare for NEST 2027 with AI-powered smart lessons, curated PYQs, realistic mock tests, performance analytics, and personalized preparation roadmaps.',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://sciprep.in/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is NEST exam?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'NEST (National Entrance Screening Test) is conducted jointly by NISER Bhubaneswar and UM-DAE CEBS Mumbai for admission to their 5-year Integrated M.Sc. programmes in basic sciences.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is SciPrep free to use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SciPrep offers a free diagnostic assessment and access to select smart lessons and PYQs. Premium features including full mock tests and AI-powered readiness analytics are available with SciPrep Pro.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does SciPrep help with NEST preparation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SciPrep provides a 5-step method: Assess your baseline, Understand concepts through smart lessons, Practice with curated PYQs, Analyze your performance, and Improve with personalized roadmaps and AI insights.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`scroll-smooth ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="bg-[#F7F8FC] text-[#111827] antialiased selection:bg-indigo-100 selection:text-indigo-900 min-h-screen flex flex-col font-sans"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
