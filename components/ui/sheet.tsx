"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: "left" | "right";
}

export function Sheet({ isOpen, onClose, children, side = "right" }: SheetProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 z-50 flex w-full max-w-xs flex-col bg-white p-6 shadow-2xl border-l border-gray-100 transition-transform duration-300 ease-in-out",
          side === "right" ? "right-0 animate-in slide-in-from-right" : "left-0 animate-in slide-in-from-left"
        )}
      >
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
          <span className="font-bold text-[#111827] text-lg">Menu</span>
          <button suppressHydrationWarning
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
