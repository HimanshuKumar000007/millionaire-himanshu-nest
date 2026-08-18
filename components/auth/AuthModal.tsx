"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Mail, Lock, User, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authService } from "@/lib/supabase/auth.service";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type Mode = "signin" | "signup";

export function AuthModal({ open, onClose, onSuccess }: AuthModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!open) return null;

  const reset = () => {
    setError(null);
    setSuccess(null);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (mode === "signup") {
      const { error } = await authService.signUp(email, password, name);
      setLoading(false);
      if (error) { setError(error.message); return; }
      setSuccess("Account created! Check your email to confirm, then sign in.");
    } else {
      const { error } = await authService.signIn(email, password);
      setLoading(false);
      if (error) { setError(error.message); return; }
      setSuccess("Signed in! Syncing your progress...");
      setTimeout(() => {
        onSuccess?.();
        onClose();
        router.push("/dashboard");
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 pb-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-gray-900">
              {mode === "signin" ? "Sign In to SciPrep" : "Create Your Account"}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {mode === "signin"
                ? "Your progress will sync across all devices."
                : "Start your NEST 2027 journey — progress saved forever."}
            </p>
          </div>
          <button suppressHydrationWarning onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          {mode === "signup" && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input suppressHydrationWarning
                type="text" placeholder="Full Name" value={name}
                onChange={(e) => setName(e.target.value)} required
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all" />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input suppressHydrationWarning
              type="email" placeholder="Email Address" value={email}
              onChange={(e) => setEmail(e.target.value)} required
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all" />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input suppressHydrationWarning
              type="password" placeholder="Password (min 6 chars)" value={password}
              onChange={(e) => setPassword(e.target.value)} required minLength={6}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all" />
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-100 text-xs text-rose-700 font-medium">
              <AlertCircle className="h-4 w-4 shrink-0 mt-px" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-700 font-medium">
              <CheckCircle2 className="h-4 w-4 shrink-0 mt-px" />
              <span>{success}</span>
            </div>
          )}

          <Button type="submit" disabled={loading}
            className="w-full h-10 bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-sm transition-all">
            {loading
              ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> {mode === "signup" ? "Creating..." : "Signing in..."}</>
              : mode === "signup" ? "Create Account & Sync" : "Sign In & Sync Progress"
            }
          </Button>

          <p className="text-center text-xs text-gray-500">
            {mode === "signin" ? (
              <>No account? <button suppressHydrationWarning type="button" onClick={() => { setMode("signup"); reset(); }}
                className="text-[#4F46E5] font-bold hover:underline">Sign up free</button></>
            ) : (
              <>Already have an account? <button suppressHydrationWarning type="button" onClick={() => { setMode("signin"); reset(); }}
                className="text-[#4F46E5] font-bold hover:underline">Sign in</button></>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
