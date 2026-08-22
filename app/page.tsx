'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { TrustedBy } from '@/components/TrustedBy';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Results } from '@/components/Results';
import { PlatformPreview } from '@/components/PlatformPreview';
import { DiagnosticQuiz } from '@/components/DiagnosticQuiz';
import { Pricing } from '@/components/Pricing';
import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { TrialModal, VideoModal, EnrollModal } from '@/components/Modals';
import { LiveNotificationToast } from '@/components/LiveNotificationToast';

export default function HomePage() {
  const [trialOpen, setTrialOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('NEST 2026 Complete Prep Suite');

  const handleOpenEnroll = (courseName?: string) => {
    if (courseName) {
      setSelectedCourse(courseName);
    }
    setEnrollOpen(true);
  };

  const handleOpenTrial = () => {
    setTrialOpen(true);
  };

  const handleOpenVideo = () => {
    setVideoOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F8FAFC] overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Sticky Top Navigation */}
      <Navbar
        onOpenEnroll={handleOpenEnroll}
        onOpenTrial={handleOpenTrial}
      />

      {/* Hero Section */}
      <Hero
        onOpenTrial={handleOpenTrial}
        onOpenVideo={handleOpenVideo}
        onOpenEnroll={handleOpenEnroll}
      />

      {/* Marquee: Target Science Institutes */}
      <TrustedBy />

      {/* Why Choose SciPrep (Split View) */}
      <WhyChooseUs
        onOpenTrial={handleOpenTrial}
        onOpenEnroll={() => handleOpenEnroll()}
      />

      {/* Results, AIR Ranks & Wall of Fame */}
      <Results
        onOpenVideo={handleOpenVideo}
        onOpenEnroll={() => handleOpenEnroll()}
      />

      {/* Interactive Command Center & Learning Platform Simulation */}
      <PlatformPreview />

      {/* Instant Science Diagnostic Assessment Quiz */}
      <DiagnosticQuiz
        onOpenEnroll={() => handleOpenEnroll()}
        onOpenTrial={handleOpenTrial}
      />

      {/* 3-Tier Transparent Pricing */}
      <Pricing
        onOpenEnroll={handleOpenEnroll}
        onOpenTrial={handleOpenTrial}
      />

      {/* Accordion FAQ with Filter */}
      <FAQ onOpenTrial={handleOpenTrial} />

      {/* Final Immersive Batch Countdown CTA */}
      <FinalCTA
        onOpenTrial={handleOpenTrial}
        onOpenEnroll={() => handleOpenEnroll()}
      />

      {/* Comprehensive Footer */}
      <Footer
        onOpenTrial={handleOpenTrial}
        onOpenEnroll={handleOpenEnroll}
      />

      {/* Modals */}
      <TrialModal
        isOpen={trialOpen}
        onClose={() => setTrialOpen(false)}
      />

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
      />

      <EnrollModal
        isOpen={enrollOpen}
        courseName={selectedCourse}
        onClose={() => setEnrollOpen(false)}
      />

      {/* Subtle Live Toast Notifications */}
      <LiveNotificationToast />
    </div>
  );
}
