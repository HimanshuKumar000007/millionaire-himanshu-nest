"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Crown,
  LogOut,
  ArrowLeft,
  CheckCircle2,
  Cloud,
  CloudOff,
  ShieldCheck,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/supabase/useAuth";
import { authService } from "@/lib/supabase/auth.service";
import { isPro as checkIsPro, setPlanLocally, getPlan } from "@/lib/auth/authGuard";
import { UpgradeModal } from "@/components/shared/UpgradeModal";

interface SettingsViewProps {
  onBackToDashboard: () => void;
  onOpenAuthModal?: () => void;
}

export function SettingsView({ onBackToDashboard, onOpenAuthModal }: SettingsViewProps) {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();

  // User details state
  const [userName, setUserName] = useState<string>("Guest Aspirant");
  const [emailId, setEmailId] = useState<string>("Local Storage Mode (Not Signed In)");
  const [isPro, setIsPro] = useState<boolean>(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState<boolean>(false);

  // Load saved user info from localStorage or Supabase
  useEffect(() => {
    try {
      setIsPro(checkIsPro());
      if (user?.email) {
        setEmailId(user.email);
        const nameFromMeta = user.user_metadata?.full_name;
        if (nameFromMeta) {
          setUserName(nameFromMeta);
        } else {
          const savedName = localStorage.getItem("nest_user_name") || localStorage.getItem("currentUser");
          if (savedName) setUserName(savedName);
        }
      } else {
        const savedName = localStorage.getItem("nest_user_name") || localStorage.getItem("currentUser");
        const savedEmail = localStorage.getItem("nest_user_email");
        if (savedName) setUserName(savedName);
        if (savedEmail) {
          setEmailId(savedEmail);
        } else {
          setEmailId("Local Storage Mode (Not Signed In)");
        }
      }
    } catch (e) {
      console.warn("Could not read user settings from storage:", e);
    }

    const handler = () => setIsPro(checkIsPro());
    window.addEventListener("nest_plan_updated", handler);
    return () => window.removeEventListener("nest_plan_updated", handler);
  }, [user]);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out of your account?")) {
      try {
        await authService.signOut();
      } catch (e) {
        console.error(e);
      }
      window.location.replace("/");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex items-center gap-3 bg-white p-5 rounded-3xl border border-gray-100 shadow-2xs">
        <Button
          variant="outline"
          size="sm"
          onClick={onBackToDashboard}
          className="h-9 w-9 p-0 rounded-xl border-gray-200 hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4 text-gray-700" />
        </Button>
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tight">
            Account Settings
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Account credentials, cloud backup status, and membership tier.
          </p>
        </div>
      </div>

      {/* Cloud Sync Status Banner */}
      <div className={`p-4 rounded-3xl border flex items-center justify-between gap-3 ${
        isLoggedIn
          ? "bg-emerald-50/70 border-emerald-200/80 text-emerald-900"
          : "bg-amber-50/70 border-amber-200/80 text-amber-900"
      }`}>
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 ${
            isLoggedIn ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
          }`}>
            {isLoggedIn ? <Cloud className="h-5 w-5" /> : <CloudOff className="h-5 w-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold">
                {isLoggedIn ? "Supabase Cloud Sync: Active" : "Local Storage Mode (Guest)"}
              </span>
              {isLoggedIn && (
                <Badge className="bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.5">
                  LIVE
                </Badge>
              )}
            </div>
            <p className="text-xs opacity-80 mt-0.5 font-medium">
              {isLoggedIn
                ? `All progress automatically backed up to Supabase (${user?.email})`
                : "Sign in to backup your test attempts and sync across devices."}
            </p>
          </div>
        </div>

        {!isLoggedIn && onOpenAuthModal && (
          <Button
            size="sm"
            onClick={onOpenAuthModal}
            className="h-8 bg-[#4F46E5] hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-2xs shrink-0 cursor-pointer"
          >
            <LogIn className="h-3.5 w-3.5 mr-1" /> Sign In
          </Button>
        )}
      </div>

      {/* Main Settings Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-6">
        {/* User Avatar + Name Row */}
        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center text-xl font-black shadow-md shrink-0">
            {userName && userName !== "Guest Aspirant" ? userName.slice(0, 2).toUpperCase() : "GA"}
          </div>
          <div>
            <h2 className="text-lg font-black text-gray-900">{userName}</h2>
            <p className="text-xs text-gray-500 font-medium">{emailId}</p>
          </div>
        </div>

        {/* 1. Name Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-purple-600" /> Full Name
          </label>
          <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200/80 text-sm font-bold text-gray-900">
            {userName}
          </div>
        </div>

        {/* 2. Email ID Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-purple-600" /> Email ID
          </label>
          <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200/80 text-sm font-bold text-gray-900">
            {emailId}
          </div>
        </div>

        {/* 3. Plan (Pro or Not) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <Crown className="h-3.5 w-3.5 text-amber-500" /> Membership Tier
          </label>
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                isPro ? "bg-amber-100 text-amber-700 shadow-2xs" : "bg-gray-200 text-gray-600"
              }`}>
                <Crown className="h-5 w-5 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-gray-900">
                    {isPro ? "SciPrep PRO All-Access" : "Free Plan"}
                  </span>
                  {isPro ? (
                    <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-[10px] px-2 py-0.5 shadow-2xs">
                      <Crown className="h-3 w-3 mr-1 fill-amber-200" /> PRO ACTIVE
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-500 text-[10px] font-bold">
                      1 Mock • 1 PYQ • 1 Note
                    </Badge>
                  )}
                </div>
                <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                  {isPro
                    ? "Full unrestricted access to all 10+ Mocks, 2018–2025 PYQs with derivations, 100+ Notes & AI Diagnostics."
                    : "Basic access to 1 Mock, 1 PYQ paper, and 1 chapter note."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isPro ? (
                <button
                  onClick={() => setUpgradeModalOpen(true)}
                  className="w-full sm:w-auto text-xs font-black text-white bg-gradient-to-r from-amber-500 to-[#4F46E5] hover:from-amber-600 hover:to-indigo-700 px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Crown className="h-3.5 w-3.5 text-amber-200 fill-amber-200" />
                  <span>Upgrade to PRO</span>
                </button>
              ) : (
                <button
                  onClick={() => setPlanLocally("FREE")}
                  className="w-full sm:w-auto text-xs font-bold text-gray-500 hover:text-gray-700 bg-white border border-gray-200 px-3 py-2 rounded-xl transition-all cursor-pointer"
                  title="Switch to Free Tier for testing"
                >
                  Switch to Free
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 4. Log Out Button */}
        <div className="pt-4 border-t border-gray-100">
          <Button
            onClick={handleLogout}
            className="w-full h-11 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-black text-xs rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
          >
            <LogOut className="h-4 w-4" /> Log Out
          </Button>
        </div>
      </div>

      {/* Global Upgrade Modal */}
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
      />
    </div>
  );
}

