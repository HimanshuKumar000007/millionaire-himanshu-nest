"use client";

import * as React from "react";
import { Crown } from "lucide-react";

interface Institution {
  name: string;
  exam: string;
  sub: string;
  initials: string;
  avatarBg: string;
  badgeStyle: string;
}

const institutions: Institution[] = [
  {
    name: "IISc Bangalore",
    exam: "IAT",
    sub: "Rank #1 University in India • Bengaluru",
    initials: "IIS",
    avatarBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    badgeStyle: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
  {
    name: "IISER Pune",
    exam: "IAT (IISER Aptitude Test)",
    sub: "Premier Research Hub • Pune",
    initials: "IP",
    avatarBg: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    badgeStyle: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  },
  {
    name: "NISER Bhubaneswar",
    exam: "NEST Entrance Exam",
    sub: "Dept. of Atomic Energy • Bhubaneswar",
    initials: "NIS",
    avatarBg: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    badgeStyle: "bg-teal-500/15 text-teal-300 border-teal-500/30",
  },
  {
    name: "ISI Kolkata",
    exam: "ISI Entrance Exam",
    sub: "Global Mecca for Pure Math & Stats • Kolkata",
    initials: "ISI",
    avatarBg: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    badgeStyle: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  },
  {
    name: "CMI Chennai",
    exam: "CMI Entrance Exam",
    sub: "Center of Mathematical & CS • Chennai",
    initials: "CMI",
    avatarBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    badgeStyle: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
  {
    name: "IISER Kolkata",
    exam: "IAT (IISER Aptitude Test)",
    sub: "Pioneering Center of Biological Sciences • Kolkata",
    initials: "IK",
    avatarBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    badgeStyle: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  },
  {
    name: "UM-DAE CEBS Mumbai",
    exam: "NEST Entrance Exam",
    sub: "Atomic Energy Centre • Mumbai",
    initials: "CEB",
    avatarBg: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    badgeStyle: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  },
  {
    name: "IISER Mohali",
    exam: "IAT Exam",
    sub: "Quantum & Biophysics Hub • Mohali",
    initials: "IM",
    avatarBg: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    badgeStyle: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  },
  {
    name: "IISER Bhopal",
    exam: "IAT Exam",
    sub: "Only IISER with Engineering Sciences • Bhopal",
    initials: "IB",
    avatarBg: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    badgeStyle: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  },
  {
    name: "IISER TVM",
    exam: "IAT Exam",
    sub: "Ecology & Materials Science • Thiruvananthapuram",
    initials: "IT",
    avatarBg: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    badgeStyle: "bg-teal-500/15 text-teal-300 border-teal-500/30",
  },
];

export function TrustStrip() {
  return (
    <section className="bg-[#080911] border-y border-slate-800/80 py-8 overflow-hidden relative">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/20 via-slate-900/10 to-purple-950/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-indigo-400 mb-1.5">
          <Crown className="h-3.5 w-3.5 text-amber-400 fill-amber-400/20" />
          <span>GATEWAY TO INDIA&apos;S ELITE SCIENTIFIC INSTITUTIONS</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto font-normal">
          Our curriculum is engineered strictly for admissions into premier research universities across India
        </p>
      </div>

      {/* Infinite Scrolling Marquee */}
      <div className="relative overflow-hidden w-full">
        {/* Left and Right Fade Gradients */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#080911] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-[#080911] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
          {[...institutions, ...institutions].map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="inline-flex items-center gap-3 bg-[#0E1120] border border-slate-800/90 hover:border-indigo-500/40 px-4 py-3 rounded-xl mx-2 shadow-sm transition-all hover:bg-[#13172C] cursor-default shrink-0"
            >
              {/* Avatar Initials Badge */}
              <div
                className={`h-8 w-8 rounded-lg flex items-center justify-center font-black text-xs border ${item.avatarBg}`}
              >
                {item.initials}
              </div>

              {/* Institution Info */}
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{item.name}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${item.badgeStyle}`}
                  >
                    {item.exam}
                  </span>
                </div>
                <div className="text-[10.5px] text-slate-400 mt-0.5">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
