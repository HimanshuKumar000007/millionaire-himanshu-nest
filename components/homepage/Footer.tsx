"use client";

import * as React from "react";
import { Logo } from "@/components/shared/Logo";
import { motion } from "motion/react";
import { ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "SciPrep Academy",
    "description": "Smart Preparation for IISER, NEST, ISI & CMI",
    "url": "https://sciprep.in",
    "logo": "https://sciprep.in/logo.png",
  };

  return (
    <footer className="relative bg-[#05060A] text-slate-400 pt-16 pb-12 overflow-hidden border-t border-slate-800/80">
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Top subtle glow line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-slate-800/80">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Logo theme="dark" showAcademy={true} />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              India&apos;s premier preparation platform engineered for pure science admissions into IISER Pune, Kolkata, Mohali, Bhopal, TVM, NISER Bhubaneswar, UM-DAE CEBS Mumbai, ISI &amp; CMI.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="h-4 w-4" />
              <span>Authentic TCS-iON CBT Engine &amp; 24/7 AI Science Mentor</span>
            </div>
          </div>

          {/* Links (7 cols) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-white uppercase tracking-widest">
                Programs
              </h4>
              <ul className="space-y-2.5 text-xs font-medium">
                <li>
                  <a href="#study-programs" className="text-slate-400 hover:text-indigo-400 transition-colors">
                    IAT 2026 Complete Prep
                  </a>
                </li>
                <li>
                  <a href="#study-programs" className="text-slate-400 hover:text-teal-400 transition-colors">
                    NEST 2026 CBT &amp; PYQ Pack
                  </a>
                </li>
                <li>
                  <a href="#study-programs" className="text-slate-400 hover:text-purple-400 transition-colors">
                    ISI &amp; CMI Math Suite
                  </a>
                </li>
                <li>
                  <a href="#study-programs" className="text-slate-400 hover:text-amber-400 transition-colors">
                    All-India CBT Test Series
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-white uppercase tracking-widest">
                Resources
              </h4>
              <ul className="space-y-2.5 text-xs font-medium">
                <li>
                  <a href="#platform-features" className="text-slate-400 hover:text-indigo-400 transition-colors">
                    24/7 AI Mentor
                  </a>
                </li>
                <li>
                  <a href="#hall-of-fame" className="text-slate-400 hover:text-indigo-400 transition-colors">
                    Hall of Fame (AIRs)
                  </a>
                </li>
                <li>
                  <a href="/assessment" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Free Diagnostic Quiz
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-slate-400 hover:text-indigo-400 transition-colors">
                    Science Prep Guides
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-white uppercase tracking-widest">
                Institutions
              </h4>
              <ul className="space-y-2.5 text-xs font-medium">
                <li>
                  <span className="text-slate-400">IISER (7 Campuses)</span>
                </li>
                <li>
                  <span className="text-slate-400">NISER &amp; UM-DAE CEBS</span>
                </li>
                <li>
                  <span className="text-slate-400">ISI Kolkata &amp; Bangalore</span>
                </li>
                <li>
                  <span className="text-slate-400">CMI Chennai</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© 2026 SciPrep Academy. All rights reserved.</p>
          <p className="text-center sm:text-right max-w-xl text-slate-400 leading-relaxed text-[11px]">
            SciPrep Academy is an independent scientific educational platform and is not affiliated with IISERs, NISER Bhubaneswar, UM-DAE CEBS Mumbai, ISI, or CMI examination authorities.
          </p>
        </div>
      </div>
    </footer>
  );
}
