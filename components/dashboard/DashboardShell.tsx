"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { HeroSection } from "@/components/dashboard/HeroSection";

import { QuickActionsRow } from "@/components/dashboard/QuickActionsRow";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { YourProgressCard } from "@/components/dashboard/YourProgressCard";
import { ContinueLearningCard } from "@/components/dashboard/ContinueLearningCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { NextMilestoneCard } from "@/components/dashboard/NextMilestoneCard";

import { PerformanceTrend } from "@/components/dashboard/PerformanceTrend";
import { WeakAreas } from "@/components/dashboard/WeakAreas";
import { PracticeOverview } from "@/components/dashboard/PracticeOverview";
import { MockPerformance } from "@/components/dashboard/MockPerformance";
import { PreparationProgress } from "@/components/dashboard/PreparationProgress";
import { SyllabusCoverage } from "@/components/dashboard/SyllabusCoverage";

import { RoadmapPreview } from "@/components/dashboard/RoadmapPreview";
import { SmartLessonsView } from "@/components/dashboard/SmartLessonsView";
import { PYQModuleView } from "@/components/dashboard/PYQModuleView";
import { PracticeView } from "@/components/dashboard/PracticeView";
import { MockTestsView } from "@/components/dashboard/MockTestsView";
import { PerformanceView } from "@/components/dashboard/PerformanceView";
import { WeakAreasView } from "@/components/dashboard/WeakAreasView";
import { RoadmapView } from "@/components/dashboard/RoadmapView";
import { SettingsView } from "@/components/dashboard/SettingsView";
import { ProfileView } from "@/components/dashboard/ProfileView";
import { SubscriptionView } from "@/components/dashboard/SubscriptionView";
import { AuthModal } from "@/components/auth/AuthModal";

import { useProgressOrchestrator } from "@/lib/store/useProgressOrchestrator";
import { useAuth } from "@/lib/supabase/useAuth";
import { pullAllAndRestore, pushAllLocalData } from "@/lib/supabase/sync.service";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { DashboardSection } from "@/lib/types/dashboard";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
  PenTool,
  Target,
  LineChart,
} from "lucide-react";

export function DashboardShell() {
  const router = useRouter();

  const [activeSection, setActiveSection] = useState<DashboardSection>("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Live single source of truth orchestrator for all student progress across the platform
  const { data } = useProgressOrchestrator();
  const { user, isLoggedIn, userName, userEmail } = useAuth();

  // Sync real cloud data with Supabase on mount and auth change
  React.useEffect(() => {
    const email = userEmail || (typeof window !== "undefined" ? localStorage.getItem("nest_user_email") : null);
    if (isLoggedIn || email) {
      pullAllAndRestore().catch((err) => {
        console.warn("[DashboardShell] Cloud sync notice:", err);
      });
    }
  }, [isLoggedIn, userEmail]);

  const handleStartAssessment = () => {
    // Navigate directly to the assessment engine page
    router.push("/assessment");
  };

  return (
    <div suppressHydrationWarning className="min-h-screen bg-[#F7F8FC] flex flex-col font-sans text-[#111827]">


      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar (Visible on wide desktop, hidden on half-screen PC) */}
        <Sidebar
          activeSection={activeSection}
          onSelectSection={(sec) => setActiveSection(sec)}
          className="hidden xl:flex"
        />

        {/* Mobile / Half-Screen Drawer Sidebar */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-50 xl:hidden flex">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-xs"
                aria-hidden="true"
              />

              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 26, stiffness: 280 }}
                className="relative z-50 w-72 max-w-[85vw] h-full shadow-2xl bg-white flex flex-col"
              >
                <Sidebar
                  activeSection={activeSection}
                  onSelectSection={(sec) => {
                    setActiveSection(sec);
                    setMobileSidebarOpen(false);
                  }}
                  onClose={() => setMobileSidebarOpen(false)}
                  className="w-full h-full shadow-none border-r border-gray-200"
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 pb-28 xl:pb-16 overflow-y-auto">
          {/* Header */}
          <Header
            userName={userName}
            userRole="NEST 2027 Aspirant"
            isLoggedIn={isLoggedIn}
            activeSection={activeSection}
            onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
            onOpenAuthModal={() => setAuthModalOpen(true)}
            onNavigateToSection={(sec) => setActiveSection(sec as DashboardSection)}
          />

          {/* Body Content */}
          <main className="flex-1 px-2 sm:px-8 py-3 sm:py-6 max-w-7xl w-full mx-auto space-y-4 sm:space-y-8">
            <AnimatePresence mode="wait">
              {activeSection === "dashboard" && (
                <motion.div
                  key="dashboard-view"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-8"
                >
                  {/* Full Dashboard — live data from useProgressOrchestrator */}
                  <>
                    {/* 1. Hero Section (Banner & Readiness Radar) */}
                    <HeroSection
                      readinessScore={data.readinessScore}
                      status={data.status}
                      scoreTrend={data.scoreTrend}
                      subjects={data.subjects}
                      hasCompletedAssessment={data.hasCompletedAssessment}
                      onViewAnalysis={() => setActiveSection("performance")}
                    />

                    {/* 2. Quick Stats */}
                    <QuickStats stats={data.quickStats} />

                    {/* 3. Quick Actions Row */}
                    <QuickActionsRow
                      onNavigate={(sec) => setActiveSection(sec as DashboardSection)}
                    />

                    {/* 3. Main Dashboard 2-Column Split */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                      <div className="lg:col-span-7 space-y-5">
                        <YourProgressCard progress={data.preparationProgress} />
                        <ContinueLearningCard
                          items={data.continueLearning}
                          onNavigate={(sec) => setActiveSection(sec as DashboardSection)}
                        />
                      </div>

                      <div className="lg:col-span-5 space-y-5">
                        <RecentActivityCard
                          activities={data.recentActivities}
                          onViewAll={() => setActiveSection("performance")}
                        />
                        <NextMilestoneCard
                          milestoneText={data.roadmap.nextMilestone}
                          ctaText={data.hasCompletedAssessment ? "View Roadmap" : "Start Assessment"}
                          onViewRoadmap={() => data.hasCompletedAssessment
                            ? setActiveSection("roadmap")
                            : handleStartAssessment()
                          }
                        />
                      </div>
                    </div>



                    {/* 5. Weak Areas & Performance Trend */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <WeakAreas
                        weakAreas={data.weakAreas}
                        onActionClick={(area) => {
                          if (area.actionType === "lesson") setActiveSection("smart-lessons");
                          else if (area.actionType === "pyq") setActiveSection("pyqs");
                          else setActiveSection("practice");
                        }}
                      />
                      <PerformanceTrend data={data.performanceTrend} />
                    </div>

                    {/* 6. Practice Overview Cards */}
                    <PracticeOverview
                      practice={data.practice}
                      onNavigate={(sec) => setActiveSection(sec as DashboardSection)}
                    />

                    {/* 7. Mock Test Performance Details */}
                    <MockPerformance
                      mockData={data.mockPerformance}
                      onViewAll={() => setActiveSection("mock-tests")}
                    />

                    {/* 8. Preparation Progress & Syllabus Coverage */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <PreparationProgress progress={data.preparationProgress} />
                      <SyllabusCoverage
                        coverage={data.syllabusCoverage}
                        onSelectSubject={() => setActiveSection("performance")}
                      />
                    </div>



                    {/* 10. Preparation Roadmap Preview */}
                    <RoadmapPreview
                      roadmap={data.roadmap}
                      onViewFull={() => setActiveSection("roadmap")}
                    />
                  </>
                </motion.div>
              )}

              {/* Sub-views */}
              {activeSection === "smart-lessons" && (
                <motion.div key="smart-lessons-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <ErrorBoundary fallbackTitle="Smart Lessons failed to load">
                    <SmartLessonsView
                      subjects={data.subjects}
                      onBackToDashboard={() => setActiveSection("dashboard")}
                    />
                  </ErrorBoundary>
                </motion.div>
              )}

              {activeSection === "pyqs" && (
                <motion.div key="pyqs-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <ErrorBoundary fallbackTitle="PYQ module failed to load">
                    <PYQModuleView
                      onBackToDashboard={() => setActiveSection("dashboard")}
                      onStartAssessment={handleStartAssessment}
                    />
                  </ErrorBoundary>
                </motion.div>
              )}

              {activeSection === "practice" && (
                <motion.div key="practice-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <ErrorBoundary fallbackTitle="Practice module failed to load">
                    <PracticeView onBackToDashboard={() => setActiveSection("dashboard")} />
                  </ErrorBoundary>
                </motion.div>
              )}

              {activeSection === "mock-tests" && (
                <motion.div key="mock-tests-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <ErrorBoundary fallbackTitle="Mock Tests failed to load">
                    <MockTestsView onBackToDashboard={() => setActiveSection("dashboard")} />
                  </ErrorBoundary>
                </motion.div>
              )}

              {activeSection === "performance" && (
                <motion.div key="performance-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <ErrorBoundary fallbackTitle="Performance view failed to load">
                    <PerformanceView
                      performanceTrend={data.performanceTrend}
                      subjects={data.subjects}
                      weakAreas={data.weakAreas}
                      preparationProgress={data.preparationProgress}
                      mockPerformance={data.mockPerformance}
                      onBackToDashboard={() => setActiveSection("dashboard")}
                      onNavigateToSection={(sec) => setActiveSection(sec as DashboardSection)}
                    />
                  </ErrorBoundary>
                </motion.div>
              )}

              {activeSection === "weak-areas" && (
                <motion.div key="weak-areas-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <WeakAreasView
                    weakAreas={data.weakAreas}
                    onBackToDashboard={() => setActiveSection("dashboard")}
                  />
                </motion.div>
              )}

              {activeSection === "roadmap" && (
                <motion.div key="roadmap-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <RoadmapView
                    roadmap={data.roadmap}
                    onBackToDashboard={() => setActiveSection("dashboard")}
                  />
                </motion.div>
              )}

              {activeSection === "planner" && (
                <motion.div key="planner-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <RoadmapView
                    roadmap={data.roadmap}
                    onBackToDashboard={() => setActiveSection("dashboard")}
                  />
                </motion.div>
              )}

              {activeSection === "topic-tests" && (
                <motion.div key="topic-tests-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <PracticeView onBackToDashboard={() => setActiveSection("dashboard")} />
                </motion.div>
              )}

              {activeSection === "settings" && (
                <motion.div key="settings-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <SettingsView
                    onBackToDashboard={() => setActiveSection("dashboard")}
                    onOpenAuthModal={() => setAuthModalOpen(true)}
                  />
                </motion.div>
              )}

              {activeSection === "profile" && (
                <motion.div key="profile-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <ProfileView
                    onBackToDashboard={() => setActiveSection("dashboard")}
                    onNavigateToSection={(sec) => setActiveSection(sec as DashboardSection)}
                  />
                </motion.div>
              )}

              {activeSection === "subscription" && (
                <motion.div key="subscription-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <SubscriptionView
                    onBackToDashboard={() => setActiveSection("dashboard")}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Mobile / Half-Screen Navigation Dock */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/90 px-3 py-2 flex items-center justify-around shadow-lg">
        <button suppressHydrationWarning
          onClick={() => setActiveSection("dashboard")}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeSection === "dashboard" ? "text-[#4F46E5] font-extrabold" : "text-gray-500 font-bold"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button suppressHydrationWarning
          onClick={() => setActiveSection("smart-lessons")}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeSection === "smart-lessons" ? "text-[#4F46E5] font-extrabold" : "text-gray-500 font-bold"
          }`}
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-[10px]">Lessons</span>
        </button>

        <button suppressHydrationWarning
          onClick={() => setActiveSection("pyqs")}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeSection === "pyqs" ? "text-[#4F46E5] font-extrabold" : "text-gray-500 font-bold"
          }`}
        >
          <PenTool className="h-5 w-5" />
          <span className="text-[10px]">PYQs</span>
        </button>

        <button suppressHydrationWarning
          onClick={() => setActiveSection("mock-tests")}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeSection === "mock-tests" ? "text-[#4F46E5] font-extrabold" : "text-gray-500 font-bold"
          }`}
        >
          <Target className="h-5 w-5" />
          <span className="text-[10px]">Mocks</span>
        </button>

        <button suppressHydrationWarning
          onClick={() => setActiveSection("performance")}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeSection === "performance" ? "text-[#4F46E5] font-extrabold" : "text-gray-500 font-bold"
          }`}
        >
          <LineChart className="h-5 w-5" />
          <span className="text-[10px]">Analytics</span>
        </button>
      </div>

      {/* Supabase Authentication Modal */}
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}
