"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getToken } from "@/lib/auth/authGuard";

/**
 * DashboardPage
 * Protected route for SciPrep Dashboard.
 *
 * Guarantees:
 * 1. Unauthenticated users (or users who logged out) are redirected to /login immediately.
 * 2. Back button / BFCache traversal after logout instantly re-verifies auth token and redirects.
 */
export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = React.useCallback(() => {
    const token = getToken();
    if (!token) {
      setIsAuthenticated(false);
      router.replace("/login?redirect=%2Fdashboard");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  useEffect(() => {
    // Initial mount check
    checkAuth();

    // Listen for browser Back/Forward Cache restoration
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted || !getToken()) {
        checkAuth();
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [checkAuth]);

  if (isAuthenticated === null || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-[#4F46E5] border-t-transparent animate-spin" />
          <p className="text-xs text-gray-400 font-medium">Verifying session…</p>
        </div>
      </div>
    );
  }

  return <DashboardShell />;
}

