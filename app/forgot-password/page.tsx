"use client";

import * as React from "react";
import { useState, Suspense } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

function ForgotPasswordContent() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [directResetUrl, setDirectResetUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to dispatch password reset email.");
      }

      setIsSubmitted(true);
      if (data.resetUrl) {
        setDirectResetUrl(data.resetUrl);
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between text-[#0F172A] relative">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_15%_20%,rgba(79,70,229,0.08),transparent_50%),radial-gradient(circle_at_85%_80%,rgba(13,148,136,0.07),transparent_50%)]" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between relative z-10">
        <Link href="/" className="inline-block focus:outline-hidden rounded-lg">
          <Logo />
        </Link>

        <Link
          href="/login"
          className="text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] flex items-center gap-1 hover:underline transition-all"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Login
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md mx-auto space-y-5"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 text-xs font-bold shadow-2xs">
              <KeyRound className="h-3.5 w-3.5 text-indigo-600" />
              <span>Account Recovery</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              Reset Your Password
            </h1>
            <p className="text-xs text-gray-500 font-medium max-w-sm mx-auto">
              Enter your registered email address and we&apos;ll send you a secure password reset link via Resend.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-xl shadow-gray-200/50 space-y-5">
            {error && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            {isSubmitted ? (
              <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in-95">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-gray-900">
                    Reset Link Dispatched!
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed max-w-sm mx-auto">
                    We have sent password reset instructions to <strong>{email}</strong>. Please check your email inbox and spam folder.
                  </p>
                </div>

                {directResetUrl && (
                  <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-left space-y-2 mt-4">
                    <span className="text-[11px] font-bold text-indigo-900 block">
                      ⚡ Quick Reset Link (Direct Preview):
                    </span>
                    <a
                      href={directResetUrl}
                      className="text-xs font-semibold text-[#4F46E5] hover:underline flex items-center gap-1 break-all"
                    >
                      <span>Proceed to Reset Password</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                    </a>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                  <Link href="/login">
                    <Button className="w-full bg-[#4F46E5] hover:bg-[#3730A3] text-white font-bold text-xs h-10 rounded-xl">
                      Return to Log In <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </Link>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setDirectResetUrl(null);
                    }}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors pt-1"
                  >
                    Didn&apos;t receive email? Try again
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                    <Mail className="h-3 w-3 text-[#4F46E5]" /> Registered Email Address
                  </label>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="aspirant@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                    className="h-11 text-xs rounded-xl border-gray-300 focus:border-[#4F46E5]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#4F46E5] hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-500/20 h-11 rounded-xl transition-all cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Reset Link…
                    </>
                  ) : (
                    <>
                      Send Password Reset Link <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-gray-400 font-medium">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Powered by Resend Transactional Email Engine</span>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-gray-400 border-t border-gray-200/60 bg-white/50 relative z-10">
        <p>© 2026 SciPrep. Dedicated preparation for NISER & CEBS admissions.</p>
      </footer>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <Loader2 className="h-8 w-8 animate-spin text-[#4F46E5]" />
        </div>
      }
    >
      <ForgotPasswordContent />
    </Suspense>
  );
}
