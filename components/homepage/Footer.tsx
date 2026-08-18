"use client";

import * as React from "react";
import { Logo } from "@/components/shared/Logo";
import { motion, type Variants } from "motion/react";

export function Footer() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "SciPrep",
    "description": "Smart Preparation for NEST & Pure Sciences",
    "url": "https://sciprep.in",
    "logo": "https://sciprep.in/logo.png",
    "sameAs": [
      "https://twitter.com/sciprep",
      "https://instagram.com/sciprep"
    ]
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <footer className="relative bg-white text-gray-600 pt-16 pb-8 overflow-hidden">
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Subtle Gradient Divider at Top */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50" />
      <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30 blur-[1px]" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-100">
          
          {/* Brand Info (5 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-5 space-y-5">
            <Logo />
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              A focused preparation platform for students preparing for the National Entrance Screening Test (NEST) for admissions to NISER Bhubaneswar & UM-DAE CEBS Mumbai.
            </p>
          </motion.div>

          {/* Links (7 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest">
                Product
              </h4>
              <ul className="space-y-3 text-sm font-semibold">
                <li><a href="#smart-lessons" className="text-gray-500 hover:text-indigo-600 hover:translate-x-1 transition-all inline-block">Smart Lessons</a></li>
                <li><a href="#pyqs" className="text-gray-500 hover:text-indigo-600 hover:translate-x-1 transition-all inline-block">PYQ Practice</a></li>
                <li><a href="#mock-tests" className="text-gray-500 hover:text-indigo-600 hover:translate-x-1 transition-all inline-block">Mock Tests</a></li>
                <li><a href="#how-it-works" className="text-gray-500 hover:text-indigo-600 hover:translate-x-1 transition-all inline-block">Performance Insights</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest">
                Company
              </h4>
              <ul className="space-y-3 text-sm font-semibold">
                <li><a href="/about" className="text-gray-500 hover:text-indigo-600 hover:translate-x-1 transition-all inline-block">About SciPrep</a></li>
                <li><a href="/contact" className="text-gray-500 hover:text-indigo-600 hover:translate-x-1 transition-all inline-block">Contact Support</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest">
                Legal
              </h4>
              <ul className="space-y-3 text-sm font-semibold">
                <li><a href="/privacy" className="text-gray-500 hover:text-indigo-600 hover:translate-x-1 transition-all inline-block">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-500 hover:text-indigo-600 hover:translate-x-1 transition-all inline-block">Terms of Service</a></li>
              </ul>
            </div>
          </motion.div>

        </div>

        {/* Footer Bottom Bar */}
        <motion.div variants={itemVariants} className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-medium">
          <p>© 2026 SciPrep. All rights reserved.</p>
          <p className="text-center sm:text-right max-w-md">
            Disclaimer: SciPrep is an independent educational platform. NEST is conducted by NISER Bhubaneswar & UM-DAE CEBS Mumbai.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
