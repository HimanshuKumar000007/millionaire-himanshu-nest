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
    name: 'NISER Bhubaneswar',
    short: 'NISER',
    tag: 'Dept. of Atomic Energy, Govt. of India',
    nirf: 'DAE Premier Autonomous Institute',
    exam: 'NEST Entrance Exam',
    degrees: '5-Yr Integrated M.Sc + ₹60,000/yr DISHA Scholarship',
    location: 'Jatni, Bhubaneswar, Odisha',
    color: 'from-cyan-500/20 to-teal-500/20 text-cyan-300 border-cyan-500/30',
  },
  {
    name: 'UM-DAE CEBS Mumbai',
    short: 'CEBS Mumbai',
    tag: 'Centre for Excellence in Basic Sciences',
    nirf: 'DAE & University of Mumbai',
    exam: 'NEST Entrance Exam',
    degrees: '5-Yr Integrated M.Sc + ₹60,000/yr DISHA Scholarship',
    location: 'Kalina Campus, Mumbai, Maharashtra',
    color: 'from-rose-500/20 to-orange-500/20 text-rose-300 border-rose-500/30',
  },
  {
    name: 'NISER School of Physical Sciences',
    short: 'SPS NISER',
    tag: 'High Energy & Quantum Physics',
    nirf: 'World-Class Research Facilities',
    exam: 'NEST Physics Cutoff (SMAS)',
    degrees: 'Integrated M.Sc in Physics',
    location: 'Bhubaneswar, Odisha',
    color: 'from-indigo-500/20 to-blue-500/20 text-indigo-300 border-indigo-500/30',
  },
  {
    name: 'NISER School of Chemical Sciences',
    short: 'SCS NISER',
    tag: 'Synthetic & Material Chemistry',
    nirf: 'Advanced Nuclear & Atomic Labs',
    exam: 'NEST Chemistry Cutoff (SMAS)',
    degrees: 'Integrated M.Sc in Chemical Sciences',
    location: 'Bhubaneswar, Odisha',
    color: 'from-amber-500/20 to-yellow-500/20 text-amber-300 border-amber-500/30',
  },
  {
    name: 'NISER School of Biological Sciences',
    short: 'SBS NISER',
    tag: 'Molecular, Structural & Cancer Biology',
    nirf: 'Cutting-Edge Bio-Imaging Hub',
    exam: 'NEST Biology Cutoff (SMAS)',
    degrees: 'Integrated M.Sc in Biological Sciences',
    location: 'Bhubaneswar, Odisha',
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    name: 'NISER School of Mathematical Sciences',
    short: 'SMS NISER',
    tag: 'Algebra, Geometry & Computation',
    nirf: 'Pure & Applied Mathematics',
    exam: 'NEST Mathematics Cutoff (SMAS)',
    degrees: 'Integrated M.Sc in Mathematics',
    location: 'Bhubaneswar, Odisha',
    color: 'from-purple-500/20 to-violet-500/20 text-purple-300 border-purple-500/30',
  },
  {
    name: 'CEBS Dept. of Physical Sciences',
    short: 'DPS CEBS',
    tag: 'Astrophysics & Condensed Matter',
    nirf: 'DAE Autonomous Collaboration',
    exam: 'NEST Entrance Exam',
    degrees: 'Integrated M.Sc in Physics',
    location: 'Mumbai, Maharashtra',
    color: 'from-sky-500/20 to-blue-500/20 text-sky-300 border-sky-500/30',
  },
  {
    name: 'CEBS Dept. of Chemical Sciences',
    short: 'DCS CEBS',
    tag: 'Biophysical & Inorganic Chemistry',
    nirf: 'BARC & TIFR Research Linkages',
    exam: 'NEST Entrance Exam',
    degrees: 'Integrated M.Sc in Chemistry',
    location: 'Mumbai, Maharashtra',
    color: 'from-orange-500/20 to-amber-500/20 text-orange-300 border-orange-500/30',
  },
];

export function TrustedBy() {
  const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(null);

  return (
    <section className="py-12 border-y border-white/5 bg-[#0E0E17]/60 backdrop-blur-md relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
          <GraduationCap className="w-4 h-4 text-indigo-400" />
          <span>Gateway to NISER Bhubaneswar & UM-DAE CEBS Mumbai via NEST</span>
        </div>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Our curriculum is engineered strictly for admissions to NISER & CEBS (Department of Atomic Energy, Govt. of India).
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
