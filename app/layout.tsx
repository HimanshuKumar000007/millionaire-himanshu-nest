import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { MixpanelPageView } from '@/components/analytics/MixpanelPageView';

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
  title: 'NEST Preparation 2026-2027: Best NEST Mock Tests, PYQs, SMAS Cutoff & Notes | SciPrep',
  description:
    'Ace your NEST preparation for NISER Bhubaneswar & UM-DAE CEBS Mumbai. Access 2018–2025 official solved PYQs, authentic 180-mark CBT mock tests, SMAS cutoff guides, chapter-wise concept notes & free diagnostic readiness test.',
  keywords: [
    'NEST preparation',
    'NEST exam preparation 2026 2027',
    'NEST mock tests',
    'NEST PYQ chapter wise',
    'NEST 2027',
    'National Entrance Screening Test',
    'NISER Bhubaneswar preparation',
    'UM-DAE CEBS Mumbai entrance',
    'NEST SMAS cutoff marks',
    'NISER cutoff marks category wise',
    'CEBS entrance exam',
    'NEST physics solved PYQ',
    'NEST chemistry preparation',
    'NEST biology for PCM students',
    'NEST mathematics preparation',
    'NEST online test series 180 marks',
    'science entrance exam India',
    'SciPrep NEST',
  ],
  authors: [{ name: 'SciPrep Academic Team' }],
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
    title: 'NEST Preparation 2026-2027: Best NEST Mock Tests, PYQs & Notes | SciPrep',
    description:
      'Ace your NEST preparation for NISER & CEBS. 2018–2025 official solved PYQs, 180-mark authentic CBT mock tests, SMAS cutoff guides & AI diagnostic reports.',
    url: 'https://sciprep.in',
    siteName: 'SciPrep',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEST Preparation 2026-2027: Best NEST Mock Tests, PYQs & Notes | SciPrep',
    description:
      'Focused NEST preparation for NISER & CEBS aspirants with smart analytics, 2018–2025 PYQs, authentic 180-mark CBT mocks, and AI readiness insights.',
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
      '@type': 'EducationalOrganization',
      '@id': 'https://sciprep.in/#organization',
      name: 'SciPrep',
      url: 'https://sciprep.in',
      logo: 'https://sciprep.in/favicon-512x512.png',
      description:
        'SciPrep is India’s dedicated smart preparation platform for NEST (National Entrance Screening Test) aspirants targeting admission to NISER Bhubaneswar and UM-DAE CEBS Mumbai.',
      foundingDate: '2026',
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://sciprep.in/#website',
      url: 'https://sciprep.in',
      name: 'SciPrep — NEST Preparation Platform',
      description: 'Best NEST Preparation, Mock Tests, Official PYQs & Cutoff Guides',
      publisher: { '@id': 'https://sciprep.in/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://sciprep.in/nest-pyq-chapter-wise?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'WebPage',
      '@id': 'https://sciprep.in/#webpage',
      url: 'https://sciprep.in',
      name: 'NEST Preparation 2026-2027: Best NEST Mock Tests, PYQs & Notes | SciPrep',
      isPartOf: { '@id': 'https://sciprep.in/#website' },
      about: { '@id': 'https://sciprep.in/#organization' },
      description:
        'Prepare for NEST 2026/2027 with AI-powered smart lessons, 2018–2025 official PYQs, realistic 180-mark CBT mock tests, SMAS cutoff guides, and personalized preparation roadmaps.',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://sciprep.in/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How should I start my NEST 2026/2027 exam preparation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Start by taking the Free 10-Minute Diagnostic Assessment on SciPrep to identify your subject baselines and weak topics across Physics, Chemistry, Biology, and Mathematics. Then follow a 3-step structured cycle: (1) Master high-weightage concept lessons, (2) Solve 2018–2025 official NEST PYQs chapter-wise, and (3) Take full-length 180-mark CBT mock simulations.',
          },
        },
        {
          '@type': 'Question',
          name: "How does the 'Best 3 of 4' subjects scoring rule work in NEST?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The NEST question paper contains 4 sections (Physics, Chemistry, Mathematics, Biology) worth 60 marks each (total 240 marks). However, your All India Rank (AIR) and final merit score are evaluated out of 180 marks based strictly on your highest scoring THREE subjects.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is SMAS in NEST and why is it mandatory to clear?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SMAS stands for Section-wise Minimum Admissible Score. It is the mandatory sectional cutoff required in EACH of the four subject sections (typically 4–8 marks out of 60). You MUST score above SMAS in all 4 sections to qualify for an All India Rank.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can PCM or PCB students crack NEST without offline coaching?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Because NEST evaluates first-principles scientific reasoning, students with strong conceptual fundamentals can easily clear NEST through self-study using SciPrep’s chapter-wise lessons, authentic 2018–2025 verified PYQ solutions, and 180-mark CBT mock tests.',
          },
        },
        {
          '@type': 'Question',
          name: 'What score and All India Rank (AIR) are required for NISER and CEBS?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For General category admission to NISER Bhubaneswar (evaluated out of 180 marks), a score of 115–135+ marks (AIR 1–250) is typically required. For UM-DAE CEBS Mumbai, a score of 95–115 marks (AIR 250–600) is safe.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do NISER and CEBS students receive a monthly stipend or scholarship?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! All admitted students receive the prestigious DISHA scholarship from the Department of Atomic Energy (DAE), amounting to ₹60,000 per year (₹5,000/month) plus an annual ₹20,000 summer project contingency grant (total ₹80,000/year).',
          },
        },
        {
          '@type': 'Question',
          name: 'Is SciPrep free to use for NEST aspirants?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Any student can sign up for free to take the AI-powered Diagnostic Readiness Assessment, access core syllabus topic guides, and practice select smart lessons and official NEST PYQs.',
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
        {/* Mixpanel Analytics */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(e,c){if(!c.__SV){var l,h;window.mixpanel=c;c._i=[];c.init=function(q,r,f){function t(d,a){var g=a.split(".");2==g.length&&(d=d[g[0]],a=g[1]);d[a]=function(){d.push([a].concat(Array.prototype.slice.call(arguments,0)))}}var b=c;"undefined"!==typeof f?b=c[f]=[]:f="mixpanel";b.people=b.people||[];b.toString=function(d){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);d||(a+=" (stub)");return a};b.people.toString=function(){return b.toString(1)+".people (stub)"};l="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders start_session_recording stop_session_recording people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");for(h=0;h<l.length;h++)t(b,l[h]);var n="set set_once union unset remove delete".split(" ");b.get_group=function(){function d(p){a[p]=function(){b.push([g,[p].concat(Array.prototype.slice.call(arguments,0))])}}for(var a={},g=["get_group"].concat(Array.prototype.slice.call(arguments,0)),m=0;m<n.length;m++)d(n[m]);return a};c._i.push([q,r,f])};c.__SV=1.2;var k=e.createElement("script");k.type="text/javascript";k.async=!0;k.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";e=e.getElementsByTagName("script")[0];e.parentNode.insertBefore(k,e)}})(document,window.mixpanel||[]);
mixpanel.init('${process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '44f5581631654066b2f69107c4d5f9e7'}', {
  autocapture: true,
  record_sessions_percent: 100,
  track_pageview: true,
});`,
          }}
        />
      </head>
      <body
        className="bg-[#F7F8FC] text-[#111827] antialiased selection:bg-indigo-100 selection:text-indigo-900 min-h-screen flex flex-col font-sans"
        suppressHydrationWarning
      >
        <MixpanelPageView />
        {children}
      </body>
    </html>
  );
}
