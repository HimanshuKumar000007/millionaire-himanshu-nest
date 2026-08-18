"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, Check, ArrowRight, ShieldCheck, Sparkles, BookOpen } from "lucide-react";
import { useOnboardingStore } from "@/lib/store/useOnboardingStore";

export default function OnboardingPage() {
  const router = useRouter();
  const { isLoggedIn, user, setOnboardingCompleted } = useOnboardingStore();

  React.useEffect(() => {
    setOnboardingCompleted(true);
    router.replace("/dashboard");
  }, [router, setOnboardingCompleted]);

  const handleContinue = () => {
    setOnboardingCompleted(true);
    router.push("/dashboard");
  };

  const subjects = [
    { name: "Physics", icon: "⚛️" },
    { name: "Chemistry", icon: "🧪" },
    { name: "Biology", icon: "🧬" },
    { name: "Mathematics", icon: "📐" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FC] flex flex-col justify-between text-[#111827]">
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className="inline-block focus:outline-hidden rounded-lg">
            <Logo />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-2 text-sm"
        >
          <span className="text-[#6B7280] hidden sm:inline">Already have an account?</span>
          <Link
            href="/login"
            className="font-bold text-[#4F46E5] hover:text-[#3730A3] hover:underline transition-all"
          >
            Log in
          </Link>
        </motion.div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="w-full max-w-xl mx-auto text-center space-y-8">
          
          {/* Step Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[#4F46E5] text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#4F46E5]" />
            <span>1 Step Onboarding • NEST 2027</span>
          </motion.div>

          {/* Heading Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-3"
          >
            <h1 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight leading-tight">
              Preparing for NEST? You&apos;re in the right place.
            </h1>
            <p className="text-base sm:text-lg text-[#6B7280] max-w-lg mx-auto font-normal leading-relaxed">
              Start with a free assessment to understand your current preparation and discover where you should focus next.
            </p>
          </motion.div>

          {/* Single Selected NEST Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="relative bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#4F46E5] bg-indigo-50/40 shadow-xl shadow-indigo-500/10 text-left transition-all"
          >
            {/* Top Badge Check */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4F46E5] text-white text-xs font-bold shadow-xs">
              <Check className="h-3.5 w-3.5 stroke-[3]" />
              <span>Your preparation track</span>
            </div>

            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-indigo-100 text-[#4F46E5] flex items-center justify-center ring-4 ring-indigo-50">
                <FlaskConical className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-2xl font-black text-[#111827] tracking-tight flex items-center gap-2">
                  NEST
                </h2>
                <p className="text-sm font-semibold text-[#6B7280]">
                  National Entrance Screening Test
                </p>
              </div>

              <div className="pt-2 border-t border-indigo-100/80 text-xs font-medium text-slate-600 flex items-center justify-between">
                <span>Target Institutions:</span>
                <span className="font-bold text-indigo-900">NISER Bhubaneswar & UM-DAE CEBS</span>
              </div>
            </div>
          </motion.div>

          {/* Supporting Subject Chips */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="space-y-3 bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-gray-200/80 text-left shadow-xs"
          >
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider text-center sm:text-left">
              Your assessment evaluates all 4 key NEST subjects:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {subjects.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#F7F8FC] border border-gray-200 text-xs font-bold text-gray-800"
                >
                  <span>{s.icon}</span>
                  <span>{s.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="space-y-3 pt-2"
          >
            <Button
              onClick={handleContinue}
              size="xl"
              className="w-full bg-[#4F46E5] hover:bg-[#3730A3] text-white font-bold text-base shadow-lg shadow-indigo-500/25 active:scale-[0.99] transition-all cursor-pointer"
            >
              Continue to Free Assessment <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#6B7280]">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Free to start • No payment required</span>
            </div>
          </motion.div>

        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-6 text-center text-xs text-gray-400 border-t border-gray-200/60 bg-white/50">
        <p>© 2026 SciPrep. Dedicated preparation for NISER & CEBS admissions.</p>
      </footer>
    </div>
  );
}
