"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  Cookie,
  UserCheck,
  Trash2,
  Mail,
  ArrowLeft,
  Server,
  FileCheck,
} from "lucide-react";

export default function PrivacyPage() {
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-bold shadow-2xs">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Data Protection &amp; Security</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Privacy Policy
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
          {/* Intro */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-emerald-950 font-medium text-xs sm:text-sm leading-relaxed">
            Your privacy and data security are of fundamental importance to us. This Privacy Policy outlines how <strong>SciPrep</strong> (<Link href="https://sciprep.in" className="text-[#4F46E5] underline font-bold">sciprep.in</Link>) collects, encrypts, uses, and safeguards your personal and academic performance information.
          </div>

          {/* Section 1 */}
          <section className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 border-l-4 border-emerald-500 pl-3">
              <Database className="h-4 w-4 text-emerald-600" />
              <h2>1. Information We Collect</h2>
            </div>
            <p>
              We only collect data that is strictly essential to deliver an effective, customized, and secure learning experience:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Account Identity:</strong> Full name and email address provided during account registration.</li>
              <li><strong>Authentication Data:</strong> Securely hashed passwords and JWT session tokens (we never store plain-text passwords).</li>
              <li><strong>Academic &amp; Diagnostic Telemetry:</strong> Mock test attempts, question-level timing metrics, topic accuracy percentages, bookmarked formulas, and readiness index scores across Physics, Chemistry, Biology, and Mathematics.</li>
              <li><strong>Transaction Records:</strong> Subscription status, order IDs, and payment verification timestamps (we do <em>not</em> collect or store financial instruments).</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 border-l-4 border-[#4F46E5] pl-3">
              <Lock className="h-4 w-4 text-[#4F46E5]" />
              <h2>2. Payment Gateway &amp; Financial Security</h2>
            </div>
            <p>
              All financial payments are handled by certified, PCI-DSS Level 1 compliant payment gateways (including Razorpay, Cashfree, and banking partners):
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>SciPrep <strong>never sees, handles, or stores</strong> your credit/debit card numbers, CVVs, net banking credentials, or UPI PINs on our servers.</li>
              <li>All payment transactions are completed over 256-bit SSL encrypted channels directly with the payment gateway.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 border-l-4 border-[#4F46E5] pl-3">
              <FileCheck className="h-4 w-4 text-[#4F46E5]" />
              <h2>3. How We Use Your Information</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>To compute your real-time subject readiness score and predict diagnostic strengths for NEST.</li>
              <li>To recommend high-priority Smart Lessons and PYQ sets based on identified weak areas.</li>
              <li>To manage your active plan entitlements and synchronize progress across all your devices.</li>
              <li>To send essential transactional notifications (such as password reset links powered by Resend).</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 border-l-4 border-[#4F46E5] pl-3">
              <Cookie className="h-4 w-4 text-[#4F46E5]" />
              <h2>4. Cookies &amp; Local Storage</h2>
            </div>
            <p>
              We utilize browser LocalStorage and essential session tokens exclusively for authentication (keeping you signed in securely) and offline persistence of your ongoing test attempt state. We do not use intrusive tracking cookies or cross-site tracking scripts.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 border-l-4 border-emerald-500 pl-3">
              <UserCheck className="h-4 w-4 text-emerald-600" />
              <h2>5. Zero Third-Party Data Selling</h2>
            </div>
            <p className="font-semibold text-gray-900">
              We uphold a strict zero-compromise policy on student data:
            </p>
            <p>
              We <strong>do not sell, rent, lease, or monetize</strong> your personal details, test results, or contact information to any third-party marketing companies, coaching centers, or advertisers under any circumstance.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 border-l-4 border-[#4F46E5] pl-3">
              <Trash2 className="h-4 w-4 text-[#4F46E5]" />
              <h2>6. User Rights &amp; Data Deletion</h2>
            </div>
            <p>
              You maintain complete ownership of your data. You may request a complete export or permanent deletion of your account and all associated test records at any time by sending an email to our support team at <a href="mailto:weborbitsolutions0@gmail.com" className="text-[#4F46E5] font-bold underline">weborbitsolutions0@gmail.com</a>. Account deletion requests are processed within 48 to 72 business hours.
            </p>
          </section>

          {/* Section 7 - Contact */}
          <section className="space-y-3 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 border-l-4 border-[#4F46E5] pl-3">
              <Mail className="h-4 w-4 text-[#4F46E5]" />
              <h2>7. Privacy Inquiries &amp; Data Officer</h2>
            </div>
            <p>
              If you have any questions, privacy concerns, or grievance requests regarding our data handling policies, please reach out to our privacy desk:
            </p>
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-emerald-900 block">Privacy &amp; Data Desk:</span>
                <a href="mailto:weborbitsolutions0@gmail.com" className="text-sm font-bold text-emerald-800 hover:underline">
                  weborbitsolutions0@gmail.com
                </a>
              </div>
              <span className="text-xs text-gray-500 font-medium">
                SLA: Under 24 Hours Response
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
              href="/terms"
              className="text-xs font-bold text-gray-500 hover:text-[#4F46E5] hover:underline transition-all"
            >
              View Terms &amp; Conditions →
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
