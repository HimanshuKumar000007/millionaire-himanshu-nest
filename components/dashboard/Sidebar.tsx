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
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/supabase/auth.service";
import { isPro as checkIsPro } from "@/lib/auth/authGuard";
import { UpgradeModal } from "@/components/shared/UpgradeModal";

interface SidebarProps {
  isPro?: boolean;
  activeSection?: string;
  onSelectSection?: (section: any) => void;
  onClose?: () => void;
  className?: string;
}

export function Sidebar({ isPro: propIsPro, activeSection = "dashboard", onSelectSection, className = "" }: SidebarProps) {
  const router = useRouter();
  const [isProUser, setIsProUser] = React.useState<boolean>(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsProUser(propIsPro !== undefined ? propIsPro : checkIsPro());
    const handler = () => {
      setIsProUser(checkIsPro());
    };
    window.addEventListener("nest_plan_updated", handler);
    return () => window.removeEventListener("nest_plan_updated", handler);
  }, [propIsPro]);

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
        { id: "subscription", label: "PRO Membership", icon: Crown },
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

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {section.group && (
              <div className="px-3 py-1 text-[10px] font-extrabold text-gray-400 tracking-wider">
                {section.group}
              </div>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
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
        {isProUser ? (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-indigo-500/10 border border-amber-200/80 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-900">
              <Crown className="h-4 w-4 text-amber-500 fill-amber-400" />
              <span>PRO MEMBER 👑</span>
            </div>
            <p className="text-[11px] text-gray-600 font-medium leading-tight">
              All 10+ Mocks, PYQs &amp; 100+ Notes Unlocked.
            </p>
            <div className="w-full py-1.5 px-2.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-[10px] flex items-center justify-center gap-1 border border-emerald-200">
              <Sparkles className="h-3 w-3 text-emerald-600" />
              <span>Full Access Active</span>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-[#EEF2FF]/70 border border-indigo-100/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                <Crown className="h-4 w-4 text-amber-500 fill-amber-400" />
                <span>Free Plan</span>
              </div>
              <span className="text-[9px] font-extrabold bg-gray-200/80 text-gray-700 px-1.5 py-0.5 rounded">
                1 Mock • 1 PYQ
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-normal leading-relaxed">
              Unlock all 10+ Mocks, 2018–2024 PYQs &amp; 100+ Smart Lessons.
            </p>
            <button
              suppressHydrationWarning
              onClick={() => setUpgradeModalOpen(true)}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-[#4F46E5] hover:from-amber-600 hover:to-indigo-700 text-white font-black text-xs flex items-center justify-center gap-1 transition-all shadow-xs cursor-pointer"
            >
              <Crown className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
              <span>Upgrade to PRO</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Global Upgrade Modal */}
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
      />
    </aside>
  );
}
