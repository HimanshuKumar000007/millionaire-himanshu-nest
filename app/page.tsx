"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnnouncementBanner } from "@/components/shared/AnnouncementBanner";
import { Navbar } from "@/components/homepage/Navbar";
import { Hero } from "@/components/homepage/Hero";
import { TrustStrip } from "@/components/homepage/TrustStrip";
import { PrecisionAdvantage } from "@/components/homepage/PrecisionAdvantage";
import { ProgramsPricingSection } from "@/components/homepage/ProgramsPricingSection";
import { HallOfFameSection } from "@/components/homepage/HallOfFameSection";
import { FAQSection } from "@/components/homepage/FAQSection";
import { Footer } from "@/components/homepage/Footer";
import { getToken } from "@/lib/auth/authGuard";

export default function HomePage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);

  // Auto-redirect to dashboard if user is already logged in
  React.useEffect(() => {
    const checkAndRedirect = () => {
      const token = getToken();
      if (token) {
        window.location.replace("/dashboard");
        return;
      }
      setIsCheckingAuth(false);
    };

    checkAndRedirect();

    // Listen for Back/Forward cache navigation
    const handlePageShow = () => {
      checkAndRedirect();
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  const handleOpenAssessment = () => {
    const token = getToken();
    if (token) {
      router.push("/assessment");
    } else {
      router.push("/login?mode=signup&redirect=%2Fassessment");
    }
  };

  const handleOpenLogin = () => {
    const token = getToken();
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  const handleEnrollNow = () => {
    const el = document.getElementById("study-programs");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      handleOpenAssessment();
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#07080F] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          <p className="text-xs text-slate-400 font-medium font-mono">Loading SciPrep Academy…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#07080F] text-slate-100 selection:bg-indigo-500/30 selection:text-white">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBanner onOpenAssessment={handleEnrollNow} onGetAccess={handleEnrollNow} />

      {/* 2. Sticky Navbar */}
      <Navbar
        onOpenAssessment={handleOpenAssessment}
        onOpenLogin={handleOpenLogin}
        onEnrollNow={handleEnrollNow}
      />

      {/* 3. Main Landing Flow */}
      <main className="flex-1">
        {/* Section 1: Hero with 24/7 AI Mentor, AIR 3 Card & IAT Mock Progression Chart */}
        <Hero
          onOpenAssessment={handleOpenAssessment}
          onWatchInsights={() => {
            const el = document.getElementById("hall-of-fame");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* Section 2: Gateway to India's Elite Scientific Institutions Marquee Strip */}
        <TrustStrip />

        {/* Section 3: The SciPrep Precision Advantage (Head-to-Head + 6 Feature Cards) */}
        <PrecisionAdvantage
          onOpenAssessment={handleOpenAssessment}
          onExploreDemo={handleOpenAssessment}
        />

        {/* Section 4: Study Material Engineered for Science Ranks (Pricing & Programs) */}
        <ProgramsPricingSection
          onOpenAssessment={handleOpenAssessment}
          onSelectPlan={handleEnrollNow}
        />

        {/* Section 5: Hall of Fame (Selection Ratio & Verified Rankers) */}
        <HallOfFameSection />

        {/* Section 6: FAQ Section */}
        <FAQSection />
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}
