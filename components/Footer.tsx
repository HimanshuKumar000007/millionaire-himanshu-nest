'use client';

import React from 'react';
import Link from 'next/link';
import {
  Orbit,
  Youtube,
  Instagram,
  Twitter,
  Linkedin,
  Send,
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowUpRight,
  LogIn,
  UserPlus
} from 'lucide-react';

interface FooterProps {
  onOpenTrial: () => void;
  onOpenEnroll: (plan?: string) => void;
}

export function Footer({ onOpenTrial, onOpenEnroll }: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-[#07070B] text-slate-400 text-xs relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-32 bg-indigo-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          
          {/* Column 1 & 2: Brand, Vision & Socials */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500 p-[1px] shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-[#0A0A0F] rounded-[11px] flex items-center justify-center">
                  <Orbit className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-lg tracking-tight text-white">
                  SciPrep NEST
                </span>
                <span className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase">
                  Dedicated NEST Exam Preparation Platform
                </span>
              </div>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering the next generation of Indian basic science researchers with first-principles self-paced learning for NISER Bhubaneswar & UM-DAE CEBS Mumbai via NEST.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 text-slate-300 border border-white/5 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-400 text-slate-300 border border-white/5 flex items-center justify-center transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-purple-500/20 hover:text-purple-400 text-slate-300 border border-white/5 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-sky-500/20 hover:text-sky-400 text-slate-300 border border-white/5 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-indigo-500/20 hover:text-indigo-400 text-slate-300 border border-white/5 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 space-y-1 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>Academic Office: DAE Innovation Corridor, Bhubaneswar & New Delhi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Helpline: +91 80 4718 2026 (Mon-Sat, 9 AM - 8 PM IST)</span>
              </div>
            </div>
          </div>

          {/* Column 3: Flagship Courses */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Study Packages
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#pricing"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>NEST 2026 Complete Suite</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>NEST All-India CBT Mocks</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>NEST Smart Notes & Mindmaps</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>15-Year Solved NEST PYQs</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>24/7 AI Science Mentor Pro</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Science Institutes */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Target Institutes (NEST)
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#results" className="hover:text-white transition-colors">
                  NISER Bhubaneswar (Main)
                </a>
              </li>
              <li>
                <a href="#results" className="hover:text-white transition-colors">
                  UM-DAE CEBS Mumbai
                </a>
              </li>
              <li>
                <a href="#results" className="hover:text-white transition-colors">
                  NISER Physical Sciences
                </a>
              </li>
              <li>
                <a href="#results" className="hover:text-white transition-colors">
                  NISER Chemical Sciences
                </a>
              </li>
              <li>
                <a href="#results" className="hover:text-white transition-colors">
                  NISER Biological Sciences
                </a>
              </li>
              <li>
                <a href="#results" className="hover:text-white transition-colors">
                  NISER Mathematical Sciences
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Student Portal & Free Resources */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Student Portal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/login"
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5 text-indigo-300 font-semibold"
                >
                  <LogIn className="w-3 h-3" />
                  <span>Student Log In</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5 text-cyan-300 font-semibold"
                >
                  <UserPlus className="w-3 h-3" />
                  <span>Create Free Account</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-white transition-colors text-left"
                >
                  Student Dashboard
                </Link>
              </li>
              <li>
                <a href="#quiz" className="hover:text-white transition-colors">
                  NEST Science Readiness Quiz
                </a>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Support Desk
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 SciPrep Academy Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Made with precision & passion for science education in India</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
