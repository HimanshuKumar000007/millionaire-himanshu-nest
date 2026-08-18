"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Bell, ChevronDown, Menu, Cloud, CloudOff, LogIn, LogOut, User, Settings } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/supabase/auth.service";

interface HeaderProps {
  userName?: string;
  userRole?: string;
  isLoggedIn?: boolean;
  activeSection?: string;
  onLogout?: () => void;
  onToggleDemoData?: () => void;
  hasDemoData?: boolean;
  onOpenMobileSidebar?: () => void;
  onOpenAuthModal?: () => void;
  onNavigateToSection?: (section: string) => void;
}

export function Header({
  userName,
  isLoggedIn = false,
  activeSection,
  onToggleDemoData,
  hasDemoData = true,
  onOpenMobileSidebar,
  onOpenAuthModal,
  onNavigateToSection,
}: HeaderProps) {
  const router = useRouter();
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);
  const nameToDisplay = userName || "Aspirant";

  const handleHeaderLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await authService.signOut();
      } catch (e) {
        console.error(e);
      }
      window.location.replace("/");
    }
  };

  return (
    <header
      suppressHydrationWarning
      className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30 px-4 sm:px-8 py-3 sm:py-5"
    >
      {/* ── MOBILE / HALF-SCREEN NAVBAR (xl:hidden) — Compact Logo Bar ── */}
      <div className="flex xl:hidden items-center justify-between gap-3">
        {/* Left: Mobile Sidebar Menu Toggle + Logo */}
        <div className="flex items-center gap-3">
          <button
            suppressHydrationWarning
            onClick={onOpenMobileSidebar}
            className="flex items-center justify-center h-9 w-9 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <button
            suppressHydrationWarning
            type="button"
            onClick={() => onNavigateToSection && onNavigateToSection("dashboard")}
            className="inline-block focus:outline-hidden text-left cursor-pointer"
          >
            <Logo />
          </button>
        </div>

        {/* Right: Cloud Sync, Notifications & Profile Avatar */}
        <div className="flex items-center gap-2">
          {!isLoggedIn && onOpenAuthModal && (
            <Button
              size="sm"
              onClick={onOpenAuthModal}
              className="h-8 bg-[#4F46E5] hover:bg-indigo-700 text-white text-xs font-bold rounded-xl px-2.5 shadow-2xs gap-1"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </Button>
          )}

          <button
            suppressHydrationWarning
            className="h-8 w-8 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center relative"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#4F46E5]" />
          </button>

          <button
            suppressHydrationWarning
            onClick={() => onNavigateToSection && onNavigateToSection("settings")}
            className="h-8 w-8 rounded-xl bg-[#4F46E5] text-white flex items-center justify-center font-black text-xs shadow-2xs cursor-pointer"
          >
            {nameToDisplay.charAt(0)}
          </button>
        </div>
      </div>

      {/* ── DESKTOP NAVBAR (hidden xl:flex) — Full Greeting & Search ── */}
      <div className="hidden xl:flex items-center justify-between gap-4">
        {/* Left Greeting */}
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2 tracking-tight">
            Welcome back, {nameToDisplay} 👋
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 font-medium">
            Let&apos;s continue your NEST preparation journey.
          </p>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative w-64 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              suppressHydrationWarning
              type="text"
              placeholder="Search lessons, topics..."
              className="w-full bg-gray-50/80 hover:bg-gray-100/80 focus:bg-white transition-all border border-gray-200/80 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]"
            />
          </div>

          {/* Cloud Sync Status / Sign In Button */}
          {isLoggedIn ? (
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-extrabold shadow-2xs"
              title="Cloud Sync Active — All progress synced to Supabase"
            >
              <Cloud className="h-3.5 w-3.5 text-emerald-600" />
              <span>Synced</span>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={onOpenAuthModal}
              className="h-8 bg-[#4F46E5] hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-2xs gap-1.5"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Sign In / Sync</span>
            </Button>
          )}

          {/* Notifications Icon */}
          <button
            suppressHydrationWarning
            className="h-9 w-9 rounded-xl border border-gray-200/90 bg-gray-50/80 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center justify-center relative"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#4F46E5]" />
          </button>

          {/* Profile Pill & Dropdown */}
          <div className="relative">
            <button
              suppressHydrationWarning
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2.5 pl-2 border-l border-gray-200/80 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="h-9 w-9 rounded-xl bg-[#4F46E5] text-white flex items-center justify-center font-black text-sm shadow-2xs">
                {nameToDisplay.charAt(0)}
              </div>
              <div className="hidden xl:block text-left">
                <span className="text-xs font-extrabold text-gray-900 block leading-tight">
                  {nameToDisplay}
                </span>
                <span className="text-[10px] text-gray-400 font-semibold block">
                  NEST 2027 Aspirant
                </span>
              </div>
              <ChevronDown className={`h-3.5 w-3.5 text-gray-400 transition-transform ${profileDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-gray-200/90 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <button
                  suppressHydrationWarning
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onNavigateToSection && onNavigateToSection("profile");
                  }}
                  className="w-full px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-indigo-50 hover:text-[#4F46E5] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <User className="h-3.5 w-3.5" />
                  <span>My Profile</span>
                </button>

                <button
                  suppressHydrationWarning
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onNavigateToSection && onNavigateToSection("settings");
                  }}
                  className="w-full px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-indigo-50 hover:text-[#4F46E5] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Settings className="h-3.5 w-3.5" />
                  <span>Account Settings</span>
                </button>

                <div className="my-1 border-t border-gray-100" />

                <button
                  suppressHydrationWarning
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    handleHeaderLogout();
                  }}
                  className="w-full px-3.5 py-2 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

