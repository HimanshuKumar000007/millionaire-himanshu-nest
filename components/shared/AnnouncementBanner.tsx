"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AnnouncementBannerProps {
  onOpenAssessment?: () => void;
}

export function AnnouncementBanner({ onOpenAssessment }: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative bg-indigo-50/90 border-b border-indigo-100/80 overflow-hidden z-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
            <div className="flex-1 flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-xs">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-wide">
                NEW
              </span>
              <span className="text-slate-700 font-medium">
                NEST 2025 Results Released — Category-wise SMAS Cutoff Analysis now available.
              </span>
              <Link
                href="/blog/nest-exam-cut-off-marks-category-wise-smas-mas"
                className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold text-xs transition-colors"
              >
                Read Analysis <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-indigo-100 transition-colors shrink-0 cursor-pointer"
              aria-label="Dismiss announcement"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
