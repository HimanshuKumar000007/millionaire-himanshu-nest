"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getToken } from "@/lib/auth/authGuard";

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsAuthenticated(false);
      const currentTarget = typeof window !== "undefined"
        ? window.location.pathname + window.location.search
        : "/dashboard";
      window.location.replace(`/login?redirect=${encodeURIComponent(currentTarget)}`);
      return;
    }

    setIsAuthenticated(true);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-[#4F46E5] border-t-transparent animate-spin" />
          <p className="text-xs text-gray-500 font-medium">Redirecting to login…</p>
        </div>
      </div>
    );
  }

  return <DashboardShell />;
}
