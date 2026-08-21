"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AnnouncementBannerProps {
  onOpenAssessment?: () => void;
}

export function AnnouncementBanner({ onOpenAssessment }: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if dismissed previously in this session/browser
    const isDismissed = localStorage.getItem("sciprep_launch_banner_dismissed");
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem("sciprep_launch_banner_dismissed", "true");
    } catch {
      // Ignore storage errors in private browsing
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative bg-gradient-to-r from-[#312E81] via-[#4338CA] to-[#4F46E5] text-white border-b border-indigo-400/30 overflow-hidden z-50 shadow-xs"
        >
          {/* Subtle animated light highlight */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-400/20 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3 text-xs font-medium relative z-10">
            {/* Center Announcement Content */}
            <div className="flex-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center sm:text-left">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-amber-300 font-extrabold text-[11px] uppercase tracking-wider border border-white/20 shadow-xs">
                <Sparkles className="h-3 w-3 animate-pulse" /> Official Launch
              </span>

              <span className="text-white/95 font-semibold">
                <strong className="text-white font-extrabold">SciPrep.in</strong> is live! India&apos;s dedicated preparation hub for NEST (NISER &amp; CEBS) with smart lessons, PYQs &amp; CBT mocks.
              </span>

              <div className="inline-flex items-center gap-2">
                <Link
                  href="/blog/introducing-sciprep-nest-study-material-platform-launch"
                  className="inline-flex items-center gap-1 text-amber-200 hover:text-white font-extrabold underline decoration-amber-300/60 hover:decoration-white transition-all text-xs"
                >
                  Read Launch Story <ArrowRight className="h-3 w-3" />
                </Link>

                <span className="text-white/40 hidden md:inline">•</span>

                {onOpenAssessment ? (
                  <button
                    onClick={onOpenAssessment}
                    className="hidden md:inline-flex items-center gap-1 text-white bg-white/20 hover:bg-white/30 px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-colors cursor-pointer"
                  >
                    Free Diagnostic Test
                  </button>
                ) : (
                  <Link
                    href="/assessment"
                    className="hidden md:inline-flex items-center gap-1 text-white bg-white/20 hover:bg-white/30 px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-colors"
                  >
                    Free Diagnostic Test
                  </Link>
                )}
              </div>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={handleDismiss}
              className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
              aria-label="Dismiss announcement"
              title="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
