"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Crown,
  CheckCircle2,
  X,
  Sparkles,
  Zap,
  Target,
  FileText,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { isPro, setPlanLocally } from "@/lib/auth/authGuard";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureTitle?: string;
  featureDescription?: string;
}

export function UpgradeModal({
  isOpen,
  onClose,
  featureTitle = "Unlock Full SciPrep PRO",
  featureDescription = "Upgrade to access all full-length CBT mocks, complete 2018–2024 PYQ archives, and 100+ chapter smart lessons.",
}: UpgradeModalProps) {
  const [isUpgrading, setIsUpgrading] = React.useState(false);
  const [activePlan, setActivePlan] = React.useState<"annual" | "crash">("annual");

  if (!isOpen) return null;

  const handleInstantUpgrade = async () => {
    try {
      setIsUpgrading(true);
      // Update plan in authGuard and dispatch sync event
      setPlanLocally("PRO");
      setTimeout(() => {
        setIsUpgrading(false);
        onClose();
        // Force refresh state across views
        window.dispatchEvent(new Event("nest_plan_updated"));
      }, 600);
    } catch (e) {
      console.error(e);
      setIsUpgrading(false);
    }
  };

  const proFeatures = [
    {
      icon: Target,
      title: "All 10+ Full CBT Mock Simulators",
      desc: "Complete 180-mark NEST CBT pattern with Best 3 of 4 subject evaluation & real-time timer.",
    },
    {
      icon: FileText,
      title: "Complete 2018–2024 Official PYQ Papers",
      desc: "Every single past exam shift with question-by-question step explanations.",
    },
    {
      icon: BookOpen,
      title: "100+ Chapter Smart Lessons & Diagrams",
      desc: "Deep concept breakdowns, interactive biological pathways, and chemistry reaction maps.",
    },
    {
      icon: Zap,
      title: "AI Weakness Diagnostics & Readiness Index",
      desc: "Identifies your exact weak sub-topics and predicts your potential NEST percentile.",
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 my-auto"
        >
          {/* Top Banner with Crown */}
          <div className="bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 p-6 sm:p-8 text-white relative overflow-hidden">
            {/* Ambient Background Accents */}
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 rounded-full bg-amber-400/20 blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/30 text-amber-200 border border-amber-300/40 text-xs font-black tracking-wider uppercase backdrop-blur-xs">
                <Crown className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
                <span>SciPrep PRO All-Access</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {featureTitle}
              </h2>
              <p className="text-xs sm:text-sm text-indigo-100/90 font-medium leading-relaxed max-w-lg">
                {featureDescription}
              </p>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Features Grid */}
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-gray-400 block">
                Everything Included in PRO:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {proFeatures.map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100 flex items-start gap-3"
                    >
                      <div className="h-8 w-8 rounded-xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-gray-900 leading-snug">
                          {feat.title}
                        </h4>
                        <p className="text-[11px] text-gray-500 font-medium leading-tight">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pricing Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Plan Option 1: Full Access */}
              <div
                onClick={() => setActivePlan("annual")}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                  activePlan === "annual"
                    ? "border-[#4F46E5] bg-indigo-50/50 shadow-xs"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="absolute top-2.5 right-2.5">
                  <Badge className="bg-amber-500 text-white font-black text-[9px] px-1.5 py-0.5">
                    MOST POPULAR
                  </Badge>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-gray-900 block">
                    Full NEST 2027 Pass
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-gray-900">₹999</span>
                    <span className="text-xs text-gray-400 line-through">₹2,999</span>
                    <span className="text-[10px] text-emerald-600 font-bold">66% OFF</span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium">
                    Full 1-Year Access till NEST Exam
                  </p>
                </div>
              </div>

              {/* Plan Option 2: Crash Mock Pass */}
              <div
                onClick={() => setActivePlan("crash")}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  activePlan === "crash"
                    ? "border-[#4F46E5] bg-indigo-50/50 shadow-xs"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-gray-900 block">
                    Mock &amp; PYQ Pass
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-gray-900">₹499</span>
                    <span className="text-xs text-gray-400 line-through">₹1,499</span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium">
                    All Mocks + All PYQ Solutions
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <Button
                disabled={isUpgrading}
                onClick={handleInstantUpgrade}
                className="w-full h-12 bg-gradient-to-r from-[#4F46E5] to-purple-600 hover:from-[#3730A3] hover:to-purple-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isUpgrading ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Activating PRO Access…</span>
                  </>
                ) : (
                  <>
                    <Crown className="h-4 w-4 text-amber-300 fill-amber-300" />
                    <span>Unlock PRO Access Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-gray-400 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Secure 256-Bit SSL
                </span>
                <span>•</span>
                <span>Instant Digital Activation</span>
                <span>•</span>
                <span>NISER &amp; CEBS Syllabus</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
