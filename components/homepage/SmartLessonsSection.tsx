"use client";

import * as React from "react";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "motion/react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, FileText, CheckCircle2, ArrowRight, Sparkles, Zap, Layers, Bookmark } from "lucide-react";

interface SmartLessonsSectionProps {
  onOpenAssessment: () => void;
}

export function SmartLessonsSection({ onOpenAssessment }: SmartLessonsSectionProps) {
  const [activeTab, setActiveTab] = useState<"summary" | "breakdown" | "terms" | "pyqs">("breakdown");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="smart-lessons" className="py-16 sm:py-24 bg-white border-b border-gray-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            badge="High-Yield Concept Modules"
            title="Learn the concept. Then apply it."
            subtitle="Focused lessons designed to help you understand important concepts without getting lost in unnecessary content."
          />
        </motion.div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          
          {/* Left Column: Lesson Explainer Info */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-sm transition-all hover:shadow-md cursor-default">
                <BookOpen className="h-3.5 w-3.5 text-emerald-600" />
                <span>NEST Concept Architecture</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] leading-tight">
                Designed for speed and retention in competitive exams.
              </h3>

              <p className="text-base text-[#6B7280] leading-relaxed">
                NEST questions test deep conceptual understanding, not rote memorization. Smart Lessons break down complex topics into 15-minute bite-sized, high-yield summaries linked directly to real PYQ applications.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              {[
                "Concise 15-minute focused modules",
                "High-yield formulas & diagrammatic insights",
                "NEST PYQ Connections tagged directly to concepts",
                "Important terminology & common trap points highlighted",
              ].map((feature, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-sm font-semibold text-gray-800 transition-transform cursor-pointer"
                >
                  <div className="h-5 w-5 rounded-full bg-indigo-50 flex items-center justify-center text-[#4F46E5] shrink-0">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span>{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="pt-2">
              <Button 
                onClick={onOpenAssessment} 
                size="lg" 
                className="bg-[#4F46E5] hover:bg-[#3730A3] shadow-md hover:shadow-xl transition-all group"
              >
                Explore Smart Lessons 
                <motion.div 
                  className="inline-block ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Realistic Lesson Preview Interface */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white border-gray-200 shadow-xl rounded-2xl overflow-hidden ring-1 ring-gray-900/5 transition-all hover:border-indigo-200">
                
                {/* Lesson Top Bar */}
                <div className="bg-[#F7F8FC] p-4 sm:p-5 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 transition-colors">
                  <div className="flex items-center gap-3">
                    <Badge variant="default" className="px-2.5 py-0.5 text-xs font-bold">
                      BIOLOGY
                    </Badge>
                    <span className="text-sm font-extrabold text-gray-900">The Living World & Diversity</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-semibold text-gray-500">
                    <span className="flex items-center gap-1 group cursor-default">
                      <Clock className="h-3.5 w-3.5 text-gray-400 group-hover:text-indigo-400 transition-colors" /> 15 min read
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-1 text-emerald-700 font-bold group cursor-default">
                      <Zap className="h-3.5 w-3.5 text-emerald-500 group-hover:scale-110 transition-transform" /> High NEST Weightage
                    </span>
                  </div>
                </div>

                {/* Lesson Sub Navigation Tabs */}
                <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-200 overflow-x-auto scrollbar-hide relative">
                  {[
                    { id: "breakdown", label: "Concept Breakdown" },
                    { id: "summary", label: "Quick Summary" },
                    { id: "terms", label: "Important Terms" },
                    { id: "pyqs", label: "NEST PYQ Connections" },
                  ].map((tb) => (
                    <button
                      key={tb.id}
                      onClick={() => setActiveTab(tb.id as any)}
                      className={`relative px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer z-10 ${
                        activeTab === tb.id
                          ? "text-[#4F46E5]"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
                      }`}
                    >
                      {activeTab === tb.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-white border border-gray-200 shadow-sm rounded-lg -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      {tb.label}
                    </button>
                  ))}
                </div>

                {/* Lesson Body Content */}
                <div className="p-6 sm:p-7 max-h-[360px] overflow-y-auto overflow-x-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {activeTab === "breakdown" && (
                        <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                          <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-1 transition-all hover:bg-indigo-50">
                            <span className="text-xs font-extrabold uppercase text-[#4F46E5] block">
                              Core Focus: Biological Diversity & Hierarchical Classification
                            </span>
                            <p className="text-xs text-indigo-950 font-medium">
                              Living organisms are characterized by growth, reproduction, metabolism, cellular organization, and consciousness. Taxonomical hierarchy ranges from Species to Kingdom.
                            </p>
                          </div>

                          <h4 className="font-extrabold text-gray-900 text-base">Key Concepts Examined in NEST:</h4>
                          <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm text-gray-700">
                            <li><strong>Defining Features:</strong> Metabolism and cellular organization are defining features of life; growth and reproduction have exceptions.</li>
                            <li><strong>Binomial Nomenclature:</strong> Linnaeus system using italicized Genus (capitalized) + specific epithet (lowercase).</li>
                            <li><strong>Taxonomic Hierarchy:</strong> Domain → Kingdom → Phylum → Class → Order → Family → Genus → Species.</li>
                          </ul>
                        </div>
                      )}

                      {activeTab === "summary" && (
                        <div className="space-y-3 text-xs text-gray-700">
                          <p className="p-3 rounded-lg bg-gray-50 border border-gray-200 transition-colors hover:border-indigo-200 hover:bg-white">
                            <strong>1. Biodiversity:</strong> Estimated 1.7 to 1.8 million species described on Earth.
                          </p>
                          <p className="p-3 rounded-lg bg-gray-50 border border-gray-200 transition-colors hover:border-indigo-200 hover:bg-white">
                            <strong>2. Three Domains:</strong> Archaea, Bacteria, and Eukarya proposed by Carl Woese based on 16S rRNA gene sequencing.
                          </p>
                          <p className="p-3 rounded-lg bg-gray-50 border border-gray-200 transition-colors hover:border-indigo-200 hover:bg-white">
                            <strong>3. Taxon vs Category:</strong> Category is abstract rank (e.g. Order); Taxon is concrete biological group (e.g. Primata).
                          </p>
                        </div>
                      )}

                      {activeTab === "terms" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <motion.div whileHover={{ y: -2 }} className="p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white hover:border-indigo-200 transition-all cursor-default shadow-sm">
                            <span className="font-bold text-gray-900 block">Systematics</span>
                            <span className="text-gray-600">Study of diversification of living forms and their evolutionary relationships.</span>
                          </motion.div>
                          <motion.div whileHover={{ y: -2 }} className="p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white hover:border-indigo-200 transition-all cursor-default shadow-sm">
                            <span className="font-bold text-gray-900 block">Holotype</span>
                            <span className="text-gray-600">Single physical specimen designated as the type of a species when described.</span>
                          </motion.div>
                        </div>
                      )}

                      {activeTab === "pyqs" && (
                        <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/50 space-y-2 text-xs transition-colors hover:bg-indigo-50">
                          <div className="flex items-center justify-between font-bold text-indigo-900">
                            <span>Direct NEST PYQ Link (2023 Paper)</span>
                            <Badge variant="default" className="text-[10px]">Medium Difficulty</Badge>
                          </div>
                          <p className="text-gray-800">
                            &quot;Which of the following biological processes is considered a defining (unexceptionable) characteristic of all living organisms?&quot;
                          </p>
                          <p className="text-indigo-700 font-semibold pt-1">
                            → Answer: In vitro / cellular metabolic reactions and internal cellular organization.
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom Action */}
                <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs transition-colors">
                  <span className="text-gray-500 font-medium">Lesson 01 / 09 in The Living World</span>
                  <button
                    onClick={onOpenAssessment}
                    className="font-bold text-[#4F46E5] hover:text-[#3730A3] transition-colors flex items-center gap-1 group cursor-pointer"
                  >
                    Start Next Lesson <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </Card>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
