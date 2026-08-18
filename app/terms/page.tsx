"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
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
        <h1 className="text-3xl font-black text-gray-900">Terms of Service</h1>
        <p className="text-xs text-gray-400">Last updated: August 2026</p>

        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            Welcome to SciPrep. By accessing or using our platform, smart lessons, PYQs, diagnostic tools, and mock test services, you agree to be bound by these Terms of Service.
          </p>

          <h2 className="text-lg font-bold text-gray-900 pt-2">1. Educational Scope</h2>
          <p>
            SciPrep provides preparation materials for pure science entrance exams including the National Entrance Screening Test (NEST) for NISER Bhubaneswar and UM-DAE CEBS Mumbai. SciPrep is an independent educational platform and is not officially affiliated with or endorsed by NISER or UM-DAE CEBS.
          </p>

          <h2 className="text-lg font-bold text-gray-900 pt-2">2. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>

          <h2 className="text-lg font-bold text-gray-900 pt-2">3. Content Intellectual Property</h2>
          <p>
            All lesson modules, diagnostic frameworks, readiness indices, and practice interfaces remain the intellectual property of SciPrep.
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
