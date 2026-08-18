"use client";

import * as React from "react";
import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Lock,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
} from "lucide-react";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token") || "";
  const emailParam = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Password strength calculation (0 to 4)
  const passwordStrength = useMemo(() => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Invalid or missing reset token. Please request a new password reset link.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          email: emailParam,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password.");
      }

      setIsSuccess(true);

      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (err: any) {
      setError(err?.message || "Failed to reset password. The link may have expired.");
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
              <span>Choose New Password</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              Create New Password
            </h1>
            <p className="text-xs text-gray-500 font-medium max-w-sm mx-auto">
              {emailParam ? `For account: ${emailParam}` : "Enter and confirm your new secure password."}
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

            {isSuccess ? (
              <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in-95">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-gray-900">
                    Password Reset Complete!
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed max-w-sm mx-auto">
                    Your password has been successfully updated. Redirecting you to login…
                  </p>
                </div>

                <div className="pt-3">
                  <Link href="/login">
                    <Button className="w-full bg-[#4F46E5] hover:bg-[#3730A3] text-white font-bold text-xs h-10 rounded-xl">
                      Log In Now <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleResetSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                      <Lock className="h-3 w-3 text-[#4F46E5]" /> New Password (min 8 chars)
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[10px] font-bold text-gray-400 hover:text-gray-700 flex items-center gap-1 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      <span>{showPassword ? "Hide" : "Show"}</span>
                    </button>
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Enter new strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                    minLength={8}
                    className="h-11 text-xs rounded-xl border-gray-300 focus:border-[#4F46E5]"
                  />

                  {/* Password Strength Bars */}
                  {password.length > 0 && (
                    <div className="pt-1 space-y-1">
                      <div className="grid grid-cols-4 gap-1">
                        <div className={`h-1 rounded-full ${passwordStrength >= 1 ? "bg-rose-500" : "bg-gray-200"}`} />
                        <div className={`h-1 rounded-full ${passwordStrength >= 2 ? "bg-amber-500" : "bg-gray-200"}`} />
                        <div className={`h-1 rounded-full ${passwordStrength >= 3 ? "bg-emerald-500" : "bg-gray-200"}`} />
                        <div className={`h-1 rounded-full ${passwordStrength >= 4 ? "bg-indigo-600" : "bg-gray-200"}`} />
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium block text-right">
                        {passwordStrength <= 1 && "Weak password"}
                        {passwordStrength === 2 && "Moderate password"}
                        {passwordStrength === 3 && "Strong password"}
                        {passwordStrength === 4 && "Very strong password"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                    <Lock className="h-3 w-3 text-[#4F46E5]" /> Confirm New Password
                  </label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Repeat new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                      Updating Password…
                    </>
                  ) : (
                    <>
                      Update Password & Log In <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-gray-400 font-medium">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Encrypted & Verified via Resend Auth Security</span>
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

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <Loader2 className="h-8 w-8 animate-spin text-[#4F46E5]" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
