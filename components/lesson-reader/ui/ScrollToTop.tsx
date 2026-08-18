"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLDivElement | null> }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const onScroll = () => setVisible(el.scrollTop > 400);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [scrollContainerRef]);

  const handleClick = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      suppressHydrationWarning
      onClick={handleClick}
      className="fixed bottom-24 right-6 z-30 h-10 w-10 rounded-full bg-white border border-gray-200 shadow-lg text-gray-600 hover:text-gray-900 hover:shadow-xl transition-all flex items-center justify-center"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
