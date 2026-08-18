"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#111827] flex flex-col justify-between">
      <header className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <Link href="/signup">
          <Button size="sm">Get Started</Button>
        </Link>
      </header>

      <main className="max-w-3xl mx-auto w-full px-4 py-12 space-y-6 bg-white p-8 sm:p-12 rounded-2xl border border-gray-200 shadow-sm my-8">
        <h1 className="text-3xl font-black text-gray-900">Privacy Policy</h1>
        <p className="text-xs text-gray-400">Last updated: August 2026</p>

        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            SciPrep values your privacy. This policy outlines how we collect, store, and protect your preparation and diagnostic data.
          </p>

          <h2 className="text-lg font-bold text-gray-900 pt-2">1. Information We Collect</h2>
          <p>
            We collect basic profile information (such as name and email address) and your performance metrics (diagnostic test scores, question accuracy, subject readiness index) to personalize your NEST preparation roadmap.
          </p>

          <h2 className="text-lg font-bold text-gray-900 pt-2">2. Data Usage</h2>
          <p>
            Your diagnostic data is strictly used to customize your learning path and calculate your readiness score for the National Entrance Screening Test. We do not sell or share your personal information with third parties.
          </p>

          <h2 className="text-lg font-bold text-gray-900 pt-2">3. Security</h2>
          <p>
            We implement standard security measures to protect your account details and learning history.
          </p>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <Link href="/signup" className="text-sm font-bold text-[#4F46E5] hover:underline">
            ← Back to Account Signup
          </Link>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-gray-400 border-t border-gray-200/60 bg-white/50">
        <p>© 2026 SciPrep. All rights reserved.</p>
      </footer>
    </div>
  );
}
