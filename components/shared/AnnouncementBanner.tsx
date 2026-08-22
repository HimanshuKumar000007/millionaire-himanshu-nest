"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, X, Flame } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AnnouncementBannerProps {
  onOpenAssessment?: () => void;
  onGetAccess?: () => void;
}

export function AnnouncementBanner({ onOpenAssessment, onGetAccess }: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem("sciprep_2026_batch_alert_dismissed");
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    try {
      localStorage.setItem("sciprep_2026_batch_alert_dismissed", "true");
    } catch {
      // Ignore storage errors
    }
  };

  const handleAction = () => {
    if (onGetAccess) {
      onGetAccess();
    } else if (onOpenAssessment) {
      onOpenAssessment();
    } else {
      const el = document.getElementById("study-programs");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
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
          className="relative bg-gradient-to-r from-[#170C2A] via-[#21113F] to-[#120B24] border-b border-purple-500/20 overflow-hidden z-50 text-xs text-slate-200"
        >
          {/* Subtle top glow line */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3">
            <div className="flex-1 flex flex-wrap items-center justify-center sm:justify-start gap-x-2.5 gap-y-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 font-bold text-[11px] uppercase tracking-wide">
                <Flame className="h-3 w-3 text-amber-400 fill-amber-400 animate-pulse" />
                New Batch Alert
              </span>
              <span className="text-slate-300 font-medium">
                IAT &amp; NEST 2026 Smart Notes, CBT Mocks &amp; 24/7 AI Mentor are <strong className="text-white font-bold">Live</strong>. • Instant Access Available
              </span>
              <button
                onClick={handleAction}
                className="inline-flex items-center gap-1 text-purple-300 hover:text-white font-bold underline underline-offset-4 decoration-purple-400/60 hover:decoration-white transition-all cursor-pointer group ml-1"
              >
                <span>Get Instant Access</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <button
              onClick={handleDismiss}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
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
