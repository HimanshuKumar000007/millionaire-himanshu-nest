"use client";

import * as React from "react";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  ArrowRight,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useOnboardingStore } from "@/lib/store/useOnboardingStore";
import { authService } from "@/lib/supabase/auth.service";
import { getToken, refreshPlanFromServer } from "@/lib/auth/authGuard";
import { pullAllAndRestore, pushAllLocalData, clearLocalProgress } from "@/lib/supabase/sync.service";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, signup } = useOnboardingStore();

  // Mode: "login" or "signup"
  const initialMode = searchParams?.get("mode") === "signup" ? "signup" : "login";
  const [mode, setMode] = useState<"login" | "signup">(initialMode);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // State
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-redirect if already logged in (like IISER SmartPrep)
  useEffect(() => {
    const checkAndRedirect = () => {
      const token = getToken();
      if (token) {
        const redirect = searchParams?.get("redirect");
        const target = redirect ? decodeURIComponent(redirect) : "/dashboard";
        window.location.replace(target);
      }
    };

    checkAndRedirect();

    const handlePageShow = () => checkAndRedirect();
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [searchParams]);

  // Password Strength Score (0 to 4)
  const passwordStrength = React.useMemo(() => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await authService.signIn(cleanEmail, password);
      if (res.error) {
        setIsLoading(false);
        setError(res.error.message || "Invalid email or password. Please check your credentials or create a new account.");
        return;
      }

      login(cleanEmail);
      
      const token = res.data?.session?.access_token;
      if (token) {
        localStorage.setItem("NEST_TOKEN", token);
      }
      localStorage.setItem("nest_user_email", cleanEmail);

      // Purge stale local storage from other accounts/guests on this device
      clearLocalProgress();

      await refreshPlanFromServer().catch(() => {});
      await pullAllAndRestore(true).catch(() => {});
      setSuccess("Login successful! Loading your dashboard...");
      
      const redirect = searchParams?.get("redirect");
      const target = redirect ? decodeURIComponent(redirect) : "/dashboard";
      
      setTimeout(() => {
        window.location.replace(target);
      }, 300);
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || "Invalid email or password. Please check your credentials.");
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName) {
      setError("Please enter your full name.");
      return;
    }

    if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      setError("Please enter a valid email address.");
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

    // Purge old local attempts/evals so new account starts with fresh honest stats
    const keysToPurge = [
      "nest_smartprep_lesson_progress",
      "nest_smartprep_mock_attempts",
      "nest_smartprep_pyq_attempts",
      "nest_smartprep_pyq_bookmarks",
      "nest_smartprep_practice_evaluations",
      "nest_smartprep_practice_answers",
      "nest_smartprep_practice_bookmarks",
      "nest_smartprep_assessment_results",
    ];
    keysToPurge.forEach((k) => localStorage.removeItem(k));

    try {
      const res = await authService.signUp(cleanEmail, password, cleanName);
      if (res.error) {
        setIsLoading(false);
        setError(res.error.message || "Failed to create account. Please try again.");
        return;
      }

      signup(cleanName, cleanEmail);

      const token = res.data?.session?.access_token;
      if (token) {
        localStorage.setItem("NEST_TOKEN", token);
      }
      localStorage.setItem("NEST_PLAN", "FREE");
      localStorage.setItem("currentUser", cleanName);
      localStorage.setItem("nest_user_name", cleanName);
      localStorage.setItem("nest_user_email", cleanEmail);

      await pushAllLocalData().catch(() => {});
      setSuccess("Account created successfully! Loading your dashboard...");
      
      const redirect = searchParams?.get("redirect");
      const target = redirect ? decodeURIComponent(redirect) : "/dashboard";
      
      setTimeout(() => {
        window.location.replace(target);
      }, 300);
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || "Failed to create account. Please try again.");
    }
  };

  const handleGoogleAuth = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const { error } = await authService.signInWithGoogle();
      if (error) {
        setIsLoading(false);
        setError(error.message || "Failed to initiate Google sign-in. Please try email and password.");
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || "Google sign-in error. Please use email and password.");
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

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-gray-500 hidden sm:inline">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}
          </span>
          <button
            suppressHydrationWarning
            type="button"
            onClick={() => {
              setError(null);
              setSuccess(null);
              setMode(mode === "login" ? "signup" : "login");
            }}
            className="font-extrabold text-[#4F46E5] hover:text-[#3730A3] hover:underline transition-all cursor-pointer"
          >
            {mode === "login" ? "Sign up free" : "Log in"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md mx-auto space-y-5"
        >
          {/* Header Badge */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 text-xs font-bold shadow-2xs">
              <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />
              <span>NISER & CEBS Admission Track</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              {mode === "login" ? "Log in to SciPrep" : "Create Free Account"}
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              {mode === "login"
                ? "Your preparation progress and test attempts are synchronized in real time."
                : "Join the dedicated preparation portal for NEST 2027 aspirants."}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-xl shadow-gray-200/50 space-y-5">
            {/* Dual Tabs (Login vs Sign Up) */}
            <div className="grid grid-cols-2 p-1 bg-gray-100/80 rounded-2xl border border-gray-200/60">
              <button
                suppressHydrationWarning
                type="button"
                onClick={() => {
                  setError(null);
                  setSuccess(null);
                  setMode("login");
                }}
                className={`py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  mode === "login"
                    ? "bg-white text-[#4F46E5] shadow-xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Log In
              </button>
              <button
                suppressHydrationWarning
                type="button"
                onClick={() => {
                  setError(null);
                  setSuccess(null);
                  setMode("signup");
                }}
                className={`py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  mode === "signup"
                    ? "bg-white text-[#4F46E5] shadow-xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Success Banner */}
            {success && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>{success}</span>
              </div>
            )}

            {/* Google OAuth Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full bg-white hover:bg-gray-50 text-gray-800 border-gray-300 font-bold h-11 text-xs rounded-2xl shadow-2xs cursor-pointer"
            >
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              {mode === "login" ? "Continue with Google" : "Sign up with Google"}
            </Button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-200 w-full" />
              <span className="bg-white px-3 text-[10px] text-gray-400 font-bold uppercase tracking-wider relative">
                or continue with email
              </span>
            </div>

            {/* Forms */}
            {mode === "login" ? (
              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                    <Mail className="h-3 w-3 text-[#4F46E5]" /> Email Address
                  </label>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="aspirant@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                    className="h-10 text-xs rounded-xl border-gray-300 focus:border-[#4F46E5]"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                      <Lock className="h-3 w-3 text-[#4F46E5]" /> Password
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
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                    className="h-10 text-xs rounded-xl border-gray-300 focus:border-[#4F46E5]"
                  />
                  <div className="flex justify-end pt-0.5">
                    <Link
                      href="/forgot-password"
                      className="text-[11px] font-bold text-[#4F46E5] hover:text-[#3730A3] hover:underline transition-all"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#4F46E5] hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-500/20 h-10 rounded-xl transition-all cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in…
                    </>
                  ) : (
                    <>
                      Log In to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                    <User className="h-3 w-3 text-[#4F46E5]" /> Full Name
                  </label>
                  <Input
                    type="text"
                    autoComplete="name"
                    placeholder="Ankit Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    required
                    className="h-10 text-xs rounded-xl border-gray-300 focus:border-[#4F46E5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                    <Mail className="h-3 w-3 text-[#4F46E5]" /> Email Address
                  </label>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="aspirant@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                    className="h-10 text-xs rounded-xl border-gray-300 focus:border-[#4F46E5]"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                      <Lock className="h-3 w-3 text-[#4F46E5]" /> Password (min 8 chars)
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
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                    minLength={8}
                    className="h-10 text-xs rounded-xl border-gray-300 focus:border-[#4F46E5]"
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

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                    <Lock className="h-3 w-3 text-[#4F46E5]" /> Confirm Password
                  </label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    required
                    className="h-10 text-xs rounded-xl border-gray-300 focus:border-[#4F46E5]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#4F46E5] hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-500/20 h-10 rounded-xl transition-all cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account…
                    </>
                  ) : (
                    <>
                      Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}

            <p className="text-[10px] text-gray-400 text-center leading-relaxed">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-indigo-600">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-indigo-600">
                Privacy Policy
              </Link>
              .
            </p>
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

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <Loader2 className="h-8 w-8 animate-spin text-[#4F46E5]" />
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}

