import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
  theme?: "light" | "dark";
  showAcademy?: boolean;
}

export function Logo({
  className,
  iconOnly = false,
  size = "md",
  theme = "dark",
  showAcademy = true,
}: LogoProps) {
  const imgDimension = size === "sm" ? 28 : size === "lg" ? 42 : 36;

  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      <div className="relative flex items-center justify-center rounded-xl overflow-hidden p-0.5 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-cyan-500/20 border border-white/10 shadow-sm hover:scale-105 transition-transform shrink-0">
        <Image
          src="/logo.png"
          alt="SciPrep Logo"
          width={imgDimension}
          height={imgDimension}
          className="rounded-lg object-contain"
          priority
        />
      </div>
      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "text-lg font-black tracking-tight",
                theme === "dark" ? "text-white" : "text-[#111827]"
              )}
            >
              SciPrep
            </span>
            {showAcademy && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide bg-indigo-600/90 text-indigo-100 border border-indigo-400/30 shadow-xs">
                ACADEMY
              </span>
            )}
          </div>
          <span
            className={cn(
              "text-[9.5px] font-bold tracking-wider uppercase -mt-0.5",
              theme === "dark" ? "text-slate-400" : "text-gray-400"
            )}
          >
            NISER • UM-DAE CEBS (NEST)
          </span>
        </div>
      )}
    </div>
  );
}
