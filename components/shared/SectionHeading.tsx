import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  badgeVariant?: "default" | "secondary" | "success" | "warning" | "outline";
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  className,
  badgeVariant = "default",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-3 max-w-3xl mb-12",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {badge && (
        <div className={cn("flex", align === "center" ? "justify-center" : "justify-start")}>
          <Badge variant={badgeVariant} className="px-3 py-1 text-xs font-semibold tracking-wide uppercase">
            {badge}
          </Badge>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-[#111827] leading-[1.18]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed font-normal max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
