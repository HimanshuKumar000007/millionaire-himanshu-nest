"use client";

import React, { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard caught error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-lg text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
          <AlertCircle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            Dashboard View Encountered an Issue
          </h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            There was a temporary problem loading the dashboard content. Click below to recover the view.
          </p>
        </div>

        <div>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Retry Loading View</span>
          </button>
        </div>
      </div>
    </div>
  );
}
