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
