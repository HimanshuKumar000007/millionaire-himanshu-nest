"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
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
 * 3. Logged-in users are kept on /dashboard when pressing browser Back button (preventing bounce to public homepage).
 */
export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = useCallback(() => {
    const token = getToken();
    if (!token) {
      setIsAuthenticated(false);
      const currentTarget = typeof window !== "undefined"
        ? window.location.pathname + window.location.search
        : "/dashboard";
      router.replace(`/login?redirect=${encodeURIComponent(currentTarget)}`);
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  useEffect(() => {
    // Initial mount check
    checkAuth();

    // Prevent browser Back button from navigating to public homepage while authenticated
    if (typeof window !== "undefined") {
      window.history.pushState({ page: "dashboard" }, "", window.location.pathname);

      const handlePopState = (e: PopStateEvent) => {
        const token = getToken();
        if (token) {
          // Keep user on dashboard
          window.history.pushState({ page: "dashboard" }, "", window.location.pathname);
        } else {
          // If logged out, go to login
          router.replace("/login");
        }
      };

      window.addEventListener("popstate", handlePopState);

      // Listen for browser Back/Forward Cache restoration
      const handlePageShow = (e: PageTransitionEvent) => {
        checkAuth();
      };

      window.addEventListener("pageshow", handlePageShow);

      return () => {
        window.removeEventListener("popstate", handlePopState);
        window.removeEventListener("pageshow", handlePageShow);
      };
    }
  }, [checkAuth, router]);

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
