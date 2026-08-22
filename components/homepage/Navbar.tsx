"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { ArrowRight, Menu, LogIn, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth/authGuard";

interface NavbarProps {
  onOpenAssessment?: () => void;
  onOpenLogin?: () => void;
}

export function Navbar({ onOpenAssessment, onOpenLogin }: NavbarProps) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("/");

  const handleNavLinkClick = (e: React.MouseEvent, href: string) => {
    if (href === "/dashboard") {
      e.preventDefault();
      const token = getToken();
      if (token) {
        router.push("/dashboard");
      } else {
        router.push("/login?redirect=%2Fdashboard");
      }
      return;
    }
    setActiveLink(href);
  };

  const handleMobileNavLinkClick = (e: React.MouseEvent, href: string) => {
    setMobileMenuOpen(false);
    if (href === "/dashboard") {
      e.preventDefault();
      const token = getToken();
      if (token) {
        router.push("/dashboard");
      } else {
        router.push("/login?redirect=%2Fdashboard");
      }
      return;
    }
    setActiveLink(href);
  };

  const handleAssessmentClick = () => {
    if (onOpenAssessment) {
      onOpenAssessment();
    } else {
      const token = getToken();
      if (token) {
        router.push("/dashboard");
      } else {
        router.push("/login?mode=signup&redirect=%2Fdashboard");
      }
    }
  };

  const handleLoginClick = () => {
    if (onOpenLogin) {
      onOpenLogin();
    } else {
      const token = getToken();
      if (token) {
        router.push("/dashboard");
      } else {
        router.push("/login?redirect=%2Fdashboard");
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Smart Lessons", href: "/#smart-lessons" },
    { label: "PYQs", href: "/#pyqs" },
    { label: "Mock Tests", href: "/#mock-tests" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl border-b border-[#E5E7EB]/50 shadow-sm py-3"
            : "bg-transparent py-4 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            onClick={() => setActiveLink("/")} 
            className="flex items-center gap-2 group focus:outline-none transition-transform hover:scale-[1.02]"
          >
            <Logo />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-100/60 p-1.5 rounded-full border border-gray-200/60 backdrop-blur-md shadow-inner transition-colors hover:bg-slate-100/80">
            {navLinks.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                    isActive 
                      ? "text-[#111827]" 
                      : "text-[#6B7280] hover:text-[#111827] hover:bg-white/50"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-white rounded-full shadow-sm border border-gray-200/50"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLoginClick}
              className="text-[#6B7280] hover:text-[#111827] text-xs font-semibold hover:bg-gray-100/50 transition-colors"
            >
              <LogIn className="h-3.5 w-3.5 mr-1.5" /> Log in
            </Button>
            <Button
              onClick={handleAssessmentClick}
              size="sm"
              className="bg-[#4F46E5] hover:bg-[#3730A3] text-white shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] text-xs font-bold px-4 transition-all group"
            >
              Start Free Assessment 
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-lg border border-gray-200/80 text-gray-700 bg-white/50 backdrop-blur-sm hover:bg-gray-100/80 transition-all active:scale-95"
            aria-label="Open Mobile Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Navigation */}
      <Sheet isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, staggerChildren: 0.1 }}
              className="flex flex-col space-y-6 pt-2 h-full"
            >
              <div className="space-y-1.5 border-b border-gray-100 pb-5">
                {navLinks.map((link, i) => {
                  const isActive = activeLink === link.href;
                  return (
                    <motion.a
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleMobileNavLinkClick(e, link.href)}
                      className={`block py-3 px-4 text-sm font-semibold rounded-xl transition-all ${
                        isActive
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-[#111827] hover:bg-gray-50"
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        {link.label}
                        {isActive && <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />}
                      </span>
                    </motion.a>
                  );
                })}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3 pt-2"
              >
                <Button
                  variant="outline"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLoginClick();
                  }}
                  className="w-full justify-center py-5 text-sm font-semibold border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <LogIn className="h-4 w-4 mr-2 text-gray-500" /> Log in
                </Button>
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleAssessmentClick();
                  }}
                  className="w-full justify-center py-5 text-sm font-bold bg-[#4F46E5] hover:bg-[#3730A3] shadow-md shadow-indigo-500/20 transition-all"
                >
                  <Sparkles className="h-4 w-4 mr-2" /> Start Free Assessment
                </Button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-auto pt-6 pb-4 text-center text-xs font-medium text-gray-400"
              >
                SciPrep • Serious Prep for NISER & CEBS
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Sheet>
    </>
  );
}
