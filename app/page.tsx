"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/homepage/Navbar";
import { Hero } from "@/components/homepage/Hero";
import { TrustStrip } from "@/components/homepage/TrustStrip";
import { ProblemSection } from "@/components/homepage/ProblemSection";
import { PreparationSystem } from "@/components/homepage/PreparationSystem";
import { ReadinessSection } from "@/components/homepage/ReadinessSection";
import { SmartLessonsSection } from "@/components/homepage/SmartLessonsSection";
import { PYQSection } from "@/components/homepage/PYQSection";
import { MockTestSection } from "@/components/homepage/MockTestSection";
import { PerformanceSection } from "@/components/homepage/PerformanceSection";
import { RoadmapSection } from "@/components/homepage/RoadmapSection";
import { WhySmartPrep } from "@/components/homepage/WhySmartPrep";
import { FinalCTA } from "@/components/homepage/FinalCTA";
import { Footer } from "@/components/homepage/Footer";
import { getToken } from "@/lib/auth/authGuard";

export default function HomePage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);

  // Auto-redirect to dashboard if user is already logged in (like IISER SmartPrep)
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
      router.push("/dashboard");
    } else {
      router.push("/login?mode=signup&redirect=%2Fdashboard");
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

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-[#4F46E5] border-t-transparent animate-spin" />
          <p className="text-xs text-gray-400 font-medium">Loading SciPrep…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FC] text-[#111827]">
      {/* Sticky Navbar */}
      <Navbar onOpenAssessment={handleOpenAssessment} onOpenLogin={handleOpenLogin} />

      {/* Main Flow */}
      <main className="flex-1">
        <Hero onOpenAssessment={handleOpenAssessment} />
        <TrustStrip />
        <ProblemSection />
        <PreparationSystem />
        <ReadinessSection onOpenAssessment={handleOpenAssessment} />
        <SmartLessonsSection onOpenAssessment={handleOpenAssessment} />
        <PYQSection onOpenAssessment={handleOpenAssessment} />
        <MockTestSection onOpenAssessment={handleOpenAssessment} />
        <PerformanceSection onOpenAssessment={handleOpenAssessment} />
        <RoadmapSection onOpenAssessment={handleOpenAssessment} />
        <WhySmartPrep />
        <FinalCTA onOpenAssessment={handleOpenAssessment} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
