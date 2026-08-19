import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, iconOnly = false, size = "md" }: LogoProps) {
  const imgDimension = size === "sm" ? 28 : size === "lg" ? 40 : 34;

  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      <div className="relative flex items-center justify-center rounded-xl overflow-hidden shadow-xs hover:scale-105 transition-transform shrink-0">
        <Image
          src="/logo.png"
          alt="SciPrep Logo"
          width={imgDimension}
          height={imgDimension}
          className="rounded-xl object-contain"
          priority
        />
      </div>
      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-lg font-black tracking-tight text-[#111827]">
              Sci
            </span>
            <span className="text-lg font-black tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Prep
            </span>
          </div>
          <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase -mt-1">
            NISER &amp; CEBS • NEST
          </span>
        </div>
      )}
    </div>
  );
}
