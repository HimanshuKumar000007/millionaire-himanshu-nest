'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Landmark, Sparkles, GraduationCap, Award, Compass, ExternalLink } from 'lucide-react';

interface Institute {
  name: string;
  short: string;
  tag: string;
  nirf: string;
  exam: string;
  degrees: string;
  location: string;
  color: string;
}

const institutes: Institute[] = [
  {
    name: 'IISc Bangalore',
    short: 'IISc',
    tag: 'Rank #1 University in India',
    nirf: 'NIRF #1 Overall',
    exam: 'IAT / JEE Adv / NEET',
    degrees: 'BS (Research), Integrated M.Sc',
    location: 'Bengaluru, Karnataka',
    color: 'from-amber-500/20 to-yellow-500/20 text-amber-300 border-amber-500/30',
  },
  {
    name: 'IISER Pune',
    short: 'IISER Pune',
    tag: 'Premier Research Hub',
    nirf: 'NIRF Top 30',
    exam: 'IAT (IISER Aptitude Test)',
    degrees: '5-Yr BS-MS Dual Degree, BS-Eng',
    location: 'Pune, Maharashtra',
    color: 'from-indigo-500/20 to-blue-500/20 text-indigo-300 border-indigo-500/30',
  },
  {
    name: 'NISER Bhubaneswar',
    short: 'NISER',
    tag: 'Dept. of Atomic Energy',
    nirf: 'DAE Autonomous',
    exam: 'NEST Entrance Exam',
    degrees: '5-Yr Integrated M.Sc + ₹60,000/yr DISHA',
    location: 'Bhubaneswar, Odisha',
    color: 'from-cyan-500/20 to-teal-500/20 text-cyan-300 border-cyan-500/30',
  },
  {
    name: 'ISI Kolkata',
    short: 'ISI Kolkata',
    tag: 'Global Mecca for Pure Math & Stats',
    nirf: 'Institute of National Importance',
    exam: 'ISI Entrance Exam',
    degrees: 'B.Stat (Hons), B.Math (Hons) + Full Stipend',
    location: 'Kolkata, West Bengal',
    color: 'from-purple-500/20 to-violet-500/20 text-purple-300 border-purple-500/30',
  },
  {
    name: 'CMI Chennai',
    short: 'CMI',
    tag: 'Center of Mathematics & CS',
    nirf: 'World-Renowned Faculty',
    exam: 'CMI Entrance Exam',
    degrees: 'B.Sc (Hons) Math & CS / Data Science',
    location: 'Chennai, Tamil Nadu',
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    name: 'IISER Kolkata',
    short: 'IISER-K',
    tag: 'Pioneering Earth & Biological Sciences',
    nirf: 'Top Science Institution',
    exam: 'IAT (IISER Aptitude Test)',
    degrees: '5-Yr BS-MS Dual Degree',
    location: 'Mohanpur, West Bengal',
    color: 'from-blue-500/20 to-indigo-500/20 text-blue-300 border-blue-500/30',
  },
  {
    name: 'UM-DAE CEBS Mumbai',
    short: 'CEBS Mumbai',
    tag: 'Atomic Energy Center',
    nirf: 'University of Mumbai & DAE',
    exam: 'NEST Entrance Exam',
    degrees: '5-Yr Integrated M.Sc',
    location: 'Mumbai, Maharashtra',
    color: 'from-rose-500/20 to-orange-500/20 text-rose-300 border-rose-500/30',
  },
  {
    name: 'IISER Mohali',
    short: 'IISER Mohali',
    tag: 'Quantum & Biophysics Hub',
    nirf: 'Premier Science Hub',
    exam: 'IAT Exam',
    degrees: '5-Yr BS-MS Dual Degree',
    location: 'Mohali, Punjab',
    color: 'from-sky-500/20 to-blue-500/20 text-sky-300 border-sky-500/30',
  },
  {
    name: 'IISER Bhopal',
    short: 'IISER Bhopal',
    tag: 'Only IISER with Engineering Sciences',
    nirf: 'Top 50 University',
    exam: 'IAT Exam',
    degrees: 'BS (Engineering), BS-MS Science',
    location: 'Bhopal, Madhya Pradesh',
    color: 'from-indigo-500/20 to-purple-500/20 text-indigo-300 border-indigo-500/30',
  },
  {
    name: 'IISER TVM',
    short: 'IISER TVM',
    tag: 'Ecology & Materials Science',
    nirf: 'Green Campus Excellence',
    exam: 'IAT Exam',
    degrees: '5-Yr BS-MS Dual Degree',
    location: 'Vithura, Kerala',
    color: 'from-teal-500/20 to-emerald-500/20 text-teal-300 border-teal-500/30',
  },
];

export function TrustedBy() {
  const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(null);

  return (
    <section className="py-12 border-y border-white/5 bg-[#0E0E17]/60 backdrop-blur-md relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
          <GraduationCap className="w-4 h-4 text-indigo-400" />
          <span>Gateway to India&apos;s Elite Scientific Institutions</span>
        </div>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Our curriculum is engineered strictly for admissions into premier research universities across India.
        </p>
      </div>

      {/* Infinite Horizontal Carousel */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right gradient fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0A0A0F] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0A0F] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 w-max animate-[shimmer_40s_linear_infinite] hover:[animation-play-state:paused] py-2 px-4">
          {/* Double array for seamless loop */}
          {[...institutes, ...institutes].map((inst, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedInstitute(inst)}
              className="flex-shrink-0 px-5 py-3 rounded-2xl glass-card border border-white/10 hover:border-indigo-500/40 transition-all cursor-pointer group hover:bg-[#1A1A2E] flex items-center gap-3.5"
            >
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${inst.color} flex items-center justify-center font-heading font-extrabold text-sm border shadow-sm`}>
                {inst.short.slice(0, 3)}
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                    {inst.name}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                    {inst.exam.split('/')[0]}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors">
                  {inst.tag} • {inst.location.split(',')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Institute Detail Modal */}
      {selectedInstitute && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md glass-panel p-6 rounded-3xl border border-white/15 shadow-2xl relative bg-[#12121A]"
          >
            <button
              onClick={() => setSelectedInstitute(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selectedInstitute.color} flex items-center justify-center font-heading font-extrabold text-lg border`}>
                {selectedInstitute.short.slice(0, 3)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{selectedInstitute.name}</h3>
                <p className="text-xs text-indigo-400 font-medium">{selectedInstitute.tag}</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300 mb-5">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">NIRF & Accreditations:</span>
                <span className="font-semibold text-white">{selectedInstitute.nirf}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">Target Entrance Exam:</span>
                <span className="font-semibold text-cyan-300">{selectedInstitute.exam}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">Degree Programmes:</span>
                <span className="font-semibold text-white text-right max-w-[200px]">{selectedInstitute.degrees}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">Campus Location:</span>
                <span className="font-semibold text-slate-200">{selectedInstitute.location}</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 mb-5 bg-white/5 p-3 rounded-xl border border-white/5">
              SciPrep offers targeted modules for {selectedInstitute.name} with previous 15-year solved papers and direct mentorship from enrolled scholars.
            </p>

            <button
              onClick={() => setSelectedInstitute(null)}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
            >
              Explore Prep Batch for {selectedInstitute.short}
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}
