import * as React from "react";
import { Atom } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#3730A3] text-white shadow-md shadow-indigo-500/20 ring-1 ring-white/20">
        <Atom className="h-5 w-5 animate-pulse" style={{ animationDuration: '4s' }} />
        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
      </div>
      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-lg font-extrabold tracking-tight text-[#111827]">
              Sci
            </span>
            <span className="text-lg font-extrabold tracking-tight text-[#4F46E5]">
              Prep
            </span>
          </div>
          <span className="text-[10px] font-semibold tracking-wider text-[#6B7280] uppercase -mt-1">
            NISER & CEBS • NEST
          </span>
        </div>
      )}
    </div>
  );
}
