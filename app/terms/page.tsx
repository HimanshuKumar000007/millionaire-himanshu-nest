"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {
  FileText,
  ShieldCheck,
  CreditCard,
  Ban,
  AlertTriangle,
  Mail,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Scale,
  Sparkles,
} from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col justify-between relative">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_15%_20%,rgba(79,70,229,0.06),transparent_50%),radial-gradient(circle_at_85%_80%,rgba(13,148,136,0.05),transparent_50%)]" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between relative z-10">
        <Link href="/" className="inline-block focus:outline-hidden rounded-lg">
          <Logo />
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/contact" className="hidden sm:inline-block text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors">
            Support Desk
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm" className="rounded-full text-xs font-bold border-gray-300">
              Log In
            </Button>
          </Link>
          <Link href="/login?mode=signup">
            <Button size="sm" className="rounded-full text-xs font-bold bg-[#4F46E5] hover:bg-[#3730A3] text-white">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        {/* Document Header */}
        <div className="text-center space-y-3 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 text-xs font-bold shadow-2xs">
            <Scale className="h-3.5 w-3.5 text-indigo-600" />
            <span>Official Legal Terms</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Terms &amp; Conditions
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full font-semibold">
              Last Updated: August 2026
            </span>
            <span>•</span>
            <span>SciPrep Platform (sciprep.in)</span>
          </div>
        </div>

        {/* Document Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 sm:p-12 rounded-3xl border border-gray-200/90 shadow-xl shadow-gray-200/40 space-y-8 leading-relaxed text-sm text-gray-600"
        >
          {/* Intro Notice */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-indigo-950 font-medium text-xs sm:text-sm leading-relaxed">
            Welcome to <strong>SciPrep</strong> (<Link href="https://sciprep.in" className="text-[#4F46E5] underline font-bold">sciprep.in</Link>). By accessing or using our platform, smart learning modules, past year question archives, diagnostic systems, and mock test suites, you agree to comply with and be bound by the following terms and conditions.
          </div>

          {/* Section 1 */}
          <section className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 border-l-4 border-[#4F46E5] pl-3">
              <FileText className="h-4 w-4 text-[#4F46E5]" />
              <h2>1. Services Provided</h2>
            </div>
            <p>
              SciPrep provides specialized digital educational services, including self-paced smart lessons, previous year question (PYQ) concept breakdowns, interactive mock test simulations, topic-level diagnostic readiness tracking, and performance analytics specifically designed for students preparing for pure science entrance exams including the <strong>National Entrance Screening Test (NEST)</strong> for admission to NISER Bhubaneswar and UM-DAE CEBS Mumbai.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 border-l-4 border-[#4F46E5] pl-3">
              <Lock className="h-4 w-4 text-[#4F46E5]" />
              <h2>2. User Accounts &amp; Registration</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>You must provide accurate, complete, and authentic information during the registration and onboarding process.</li>
              <li>You are solely responsible for maintaining the confidentiality and security of your account credentials and password.</li>
              <li><strong>Strict Single-User Policy:</strong> Account sharing, credential distribution, or concurrent access from multiple disparate geographical locations is strictly prohibited and will result in automated session termination or permanent account suspension.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 border-l-4 border-[#4F46E5] pl-3">
              <CreditCard className="h-4 w-4 text-[#4F46E5]" />
              <h2>3. Payments &amp; Subscriptions</h2>
            </div>
            <p>
              All financial transactions and premium plan upgrades on SciPrep are processed through authorized, RBI-compliant, 128-bit SSL encrypted third-party payment gateways (including Razorpay, Cashfree, and associated payment aggregators).
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>All prices are displayed in Indian Rupees (INR) inclusive of applicable taxes unless stated otherwise.</li>
              <li>Purchased subscriptions, mock test access tokens, and feature tiers are non-transferable and strictly bound to the purchasing user account.</li>
            </ul>
          </section>

          {/* Section 4 - No-Refund Policy */}
          <section className="space-y-3 pt-2 border-t border-gray-100 bg-slate-50/70 -mx-6 sm:-mx-12 p-6 sm:p-12 border-y border-slate-200/80">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 border-l-4 border-rose-500 pl-3">
              <Ban className="h-4 w-4 text-rose-600" />
              <h2>4. Cancellation &amp; Strict No-Refund Policy</h2>
            </div>
            <p className="font-semibold text-gray-900">
              SciPrep operates a strict <strong>No-Refund and Non-Cancellable Policy</strong> for all digital purchases. By completing a transaction on our website, you explicitly understand, acknowledge, and agree to the following terms:
            </p>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <span><strong>All Sales Are Final:</strong> Once a payment is completed, it is strictly non-refundable under any circumstances. This applies to all subscription tiers, mock test packs, and diagnostic features.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <span><strong>Instant Digital Access:</strong> Because our services are 100% digital and provide immediate, unrestricted access to smart lessons, question banks, AI explanations, and analytical algorithms upon payment confirmation, standard physical return policies do not apply.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <span><strong>No Unauthorized Chargebacks:</strong> Initiating an unauthorized chargeback or payment dispute with your issuing bank without first contacting our support desk constitutes a breach of these Terms. We reserve the right to suspend platform access and recover disputed amounts via appropriate legal channels.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <span><strong>Free Evaluation Available:</strong> We provide free interactive lessons, diagnostic previews, and sample PYQ assessments so students can evaluate the platform thoroughly before choosing to upgrade.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <span><strong>Technical Resolution Guarantee:</strong> In the rare event of a verified technical glitch directly attributable to our platform preventing access, our technical team will promptly resolve the error or extend subscription validity.</span>
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 border-l-4 border-[#4F46E5] pl-3">
              <ShieldCheck className="h-4 w-4 text-[#4F46E5]" />
              <h2>5. Intellectual Property &amp; Usage Restrictions</h2>
            </div>
            <p>
              All proprietary algorithms, question solutions, concept summaries, diagnostic formulas, user interface designs, and interactive lesson modules available on SciPrep are the exclusive intellectual property of SciPrep.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Content is licensed strictly for individual, personal, non-commercial educational preparation.</li>
              <li>Screen recording, systematic downloading, web scraping, commercial redistribution, or reselling of test materials is strictly prohibited and subject to civil and criminal copyright law.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 border-l-4 border-amber-500 pl-3">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <h2>6. Legal Non-Affiliation Disclaimer</h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              SciPrep is an independent educational technology platform. SciPrep is <strong>not affiliated, associated, authorized, endorsed by, or in any way officially connected</strong> with the National Institute of Science Education and Research (NISER), UM-DAE Centre for Excellence in Basic Sciences (UM-DAE CEBS), the Department of Atomic Energy (DAE), or the official NEST Examination Organizing Committee. All exam names and institutional titles are trademarks of their respective holders.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 border-l-4 border-[#4F46E5] pl-3">
              <Scale className="h-4 w-4 text-[#4F46E5]" />
              <h2>7. Governing Law &amp; Jurisdiction</h2>
            </div>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising in connection with these Terms or the use of SciPrep shall be subject to the exclusive jurisdiction of the competent courts in India.
            </p>
          </section>

          {/* Section 8 - Contact */}
          <section className="space-y-3 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 border-l-4 border-[#4F46E5] pl-3">
              <Mail className="h-4 w-4 text-[#4F46E5]" />
              <h2>8. Customer Support &amp; Grievance Redressal</h2>
            </div>
            <p>
              If you have any questions, clarifications, or technical inquiries regarding these Terms and Conditions, please contact our support desk:
            </p>
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-indigo-900 block">Official Support Desk:</span>
                <a href="mailto:weborbitsolutions0@gmail.com" className="text-sm font-bold text-[#4F46E5] hover:underline">
                  weborbitsolutions0@gmail.com
                </a>
              </div>
              <span className="text-xs text-gray-500 font-medium">
                Response SLA: 12 – 24 Hours (Mon–Sat)
              </span>
            </div>
          </section>

          {/* Back Action */}
          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <Link
              href="/"
              className="text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] flex items-center gap-1 hover:underline transition-all"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Return to Homepage
            </Link>

            <Link
              href="/privacy"
              className="text-xs font-bold text-gray-500 hover:text-[#4F46E5] hover:underline transition-all"
            >
              View Privacy Policy →
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-gray-400 border-t border-gray-200/60 bg-white/50 relative z-10">
        <p>© 2026 SciPrep. Dedicated preparation for NISER &amp; CEBS admissions.</p>
      </footer>
    </div>
  );
}
