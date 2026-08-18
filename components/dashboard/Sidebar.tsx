"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  PenTool,
  Target,
  ClipboardList,
  BarChart3,
  AlertTriangle,
  Compass,
  Calendar,
  User,
  Settings,
  Crown,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/supabase/auth.service";

interface SidebarProps {
  isPro?: boolean;
  activeSection?: string;
  onSelectSection?: (section: any) => void;
  onClose?: () => void;
  className?: string;
}

export function Sidebar({ isPro = false, activeSection = "dashboard", onSelectSection, className = "" }: SidebarProps) {
  const router = useRouter();

  const handleSidebarLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await authService.signOut();
      } catch (e) {
        console.error(e);
      }
      window.location.replace("/");
    }
  };

  const navSections = [
    {
      group: "",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      ],
    },
    {
      group: "LEARN",
      items: [
        { id: "smart-lessons", label: "Smart Lessons", icon: BookOpen },
        { id: "pyqs", label: "PYQs", icon: FileText },
        { id: "practice", label: "Practice", icon: PenTool },
      ],
    },
    {
      group: "TEST",
      items: [
        { id: "mock-tests", label: "Mock Tests", icon: Target },
        { id: "topic-tests", label: "Topic Tests", icon: ClipboardList },
      ],
    },
    {
      group: "ANALYZE",
      items: [
        { id: "performance", label: "Performance", icon: BarChart3 },
        { id: "weak-areas", label: "Weak Areas", icon: AlertTriangle },
      ],
    },
    {
      group: "PLAN",
      items: [
        { id: "roadmap", label: "Roadmap", icon: Compass },
        { id: "planner", label: "Study Planner", icon: Calendar },
      ],
    },
    {
      group: "ACCOUNT",
      items: [
        { id: "profile", label: "Profile", icon: User },
        { id: "settings", label: "Settings", icon: Settings },
      ],
    },
  ];

  return (
    <aside suppressHydrationWarning className={`w-60 bg-white border-r border-gray-200/80 flex flex-col justify-between shrink-0 h-screen sticky top-0 ${className}`}>
      {/* Top Header Logo */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <button
          suppressHydrationWarning
          type="button"
          onClick={() => onSelectSection && onSelectSection("dashboard")}
          className="inline-block focus:outline-hidden text-left cursor-pointer"
        >
          <Logo />
        </button>
      </div>

      {/* Navigation list */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin">
        {navSections.map((sec, idx) => (
          <div key={sec.group || idx} className="space-y-1">
            {sec.group && (
              <h3 className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                {sec.group}
              </h3>
            )}
            <div className="space-y-0.5 pt-0.5">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    suppressHydrationWarning
                    key={item.id}
                    onClick={() => onSelectSection && onSelectSection(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#EEF2FF] text-[#4F46E5] font-bold shadow-2xs"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`h-4 w-4 ${isActive ? "text-[#4F46E5]" : "text-gray-400"}`} />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Log Out button in sidebar */}
        <div className="pt-2 border-t border-gray-100">
          <button
            suppressHydrationWarning
            onClick={handleSidebarLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Bottom Pro Badge / Upgrade Box */}
      <div className="p-4 border-t border-gray-100">
        <div className="p-4 rounded-2xl bg-[#EEF2FF]/70 border border-indigo-100/80 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
            <Crown className="h-4 w-4 text-amber-500 fill-amber-400" />
            <span>Upgrade to Pro</span>
          </div>
          <p className="text-[11px] text-gray-500 font-normal leading-relaxed">
            Unlock all mocks, PYQs, analytics and more.
          </p>
          <button
            suppressHydrationWarning
            onClick={() => onSelectSection && onSelectSection("settings")}
            className="w-full py-2.5 px-3 rounded-xl bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-xs cursor-pointer"
          >
            <span>Upgrade Now</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}

