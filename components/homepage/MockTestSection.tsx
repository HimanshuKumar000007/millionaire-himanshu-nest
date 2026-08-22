"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, Play } from "lucide-react";
import { motion, useInView, animate, AnimatePresence } from "motion/react";

interface MockTestSectionProps {
  onOpenAssessment: () => void;
}

function Counter({ from, to, duration = 1.5, suffix = "" }: { from: number; to: number; duration?: number; suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const node = nodeRef.current;
    if (node) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.round(value).toString() + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, suffix, inView]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
}

export function MockTestSection({ onOpenAssessment }: MockTestSectionProps) {
  const [selectedMock, setSelectedMock] = useState(0);

  const mockTests = [
    {
      title: "NEST FULL MOCK #05",
      tag: "Full Syllabus Diagnostic",
      questions: 60,
      time: "180 Minutes",
      difficulty: "Moderate",
      prevScore: "76%",
      prevScoreNum: 76,
      accuracy: "81%",
      accuracyNum: 81,
      attempted: "54 / 60",
      timeEfficiency: "78%",
      subjects: ["Physics (15)", "Chemistry (15)", "Biology (15)", "Mathematics (15)"],
    },
    {
      title: "NEST SUBJECT MOCK — PHYSICS & MATHS",
      tag: "PCM Sectional Drill",
      questions: 30,
      time: "90 Minutes",
      difficulty: "Hard",
      prevScore: "71%",
      prevScoreNum: 71,
      accuracy: "79%",
      accuracyNum: 79,
      attempted: "27 / 30",
      timeEfficiency: "82%",
      subjects: ["Mechanics", "Electromagnetism", "Calculus", "Vectors"],
    },
    {
      title: "NEST SUBJECT MOCK — BIOLOGY & CHEMISTRY",
      tag: "PCB Sectional Drill",
      questions: 30,
      time: "90 Minutes",
      difficulty: "Moderate",
      prevScore: "82%",
      prevScoreNum: 82,
      accuracy: "86%",
      accuracyNum: 86,
      attempted: "29 / 30",
      timeEfficiency: "85%",
      subjects: ["Cell Biology", "Genetics", "Organic Chemistry", "Thermodynamics"],
    },
  ];

  const currentMock = mockTests[selectedMock];

  return (
    <section id="mock-tests" className="py-16 sm:py-24 bg-white border-b border-gray-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Realistic Timed Simulation"
          badgeVariant="success"
          title="Practice under real exam conditions."
          subtitle="Full-length NEST simulations with authentic 180-mark structure, sectional timing, and comprehensive subject-wise speed analysis."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Mock Test Switch Cards */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="lg:col-span-5 space-y-4"
          >
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
              Available NEST Mock Series
            </span>

            {mockTests.map((mock, idx) => {
              const isSelected = selectedMock === idx;
              return (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  key={mock.title}
                  onClick={() => setSelectedMock(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? "bg-indigo-50/80 border-[#4F46E5] ring-1 ring-indigo-500/20 shadow-xs"
                      : "bg-[#F7F8FC] border-gray-200 hover:border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Badge variant={isSelected ? "default" : "outline"} className="text-[10px]">
                      {mock.tag}
                    </Badge>
                    <span className="text-xs font-mono font-bold text-gray-500">{mock.time}</span>
                  </div>

                  <h4 className="text-base font-extrabold text-[#111827]">
                    {mock.title}
                  </h4>

                  <div className="flex items-center gap-4 text-xs font-semibold text-gray-600 pt-1">
                    <span>{mock.questions} Questions</span>
                    <span>•</span>
                    <span>Accuracy: <strong className="text-emerald-600">{mock.accuracy}</strong></span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right Column: Detailed Active Mock Interface Frame */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <Card className="bg-white border-gray-200 shadow-xl p-6 sm:p-8 rounded-2xl space-y-6 transition-all">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMock.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
                    <div>
                      <Badge variant="success" className="px-2.5 py-0.5 text-xs font-bold mb-1">
                        {currentMock.tag}
                      </Badge>
                      <h3 className="text-2xl font-extrabold text-[#111827]">
                        {currentMock.title}
                      </h3>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-gray-400 block font-medium">Difficulty Rating</span>
                      <Badge variant="warning">{currentMock.difficulty}</Badge>
                    </div>
                  </div>

                  {/* Grid Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-gray-100 text-center hover:border-gray-200 transition-colors">
                      <span className="text-xs text-gray-500 block font-medium">Questions</span>
                      <span className="text-lg font-bold text-gray-900">
                        <Counter from={0} to={currentMock.questions} duration={1} />
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-gray-100 text-center hover:border-gray-200 transition-colors">
                      <span className="text-xs text-gray-500 block font-medium">Duration</span>
                      <span className="text-lg font-bold text-gray-900">{currentMock.time.split(' ')[0]} <span className="text-xs">min</span></span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-gray-100 text-center hover:border-indigo-100 transition-colors">
                      <span className="text-xs text-gray-500 block font-medium">Previous Score</span>
                      <span className="text-lg font-bold text-indigo-600">
                        <Counter from={0} to={currentMock.prevScoreNum} duration={1.5} suffix="%" />
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-gray-100 text-center hover:border-emerald-100 transition-colors">
                      <span className="text-xs text-gray-500 block font-medium">Avg Accuracy</span>
                      <span className="text-lg font-bold text-emerald-600">
                        <Counter from={0} to={currentMock.accuracyNum} duration={1.5} suffix="%" />
                      </span>
                    </div>
                  </div>

                  {/* Live Simulation Indicator Bar */}
                  <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
                    <div className="flex items-center gap-2.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-mono text-emerald-300 font-bold">LIVE CBT SIMULATOR</span>
                      <span className="text-slate-600">|</span>
                      <span className="font-mono text-slate-300">Time Left: <strong className="text-white">02:44:18</strong></span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] font-mono">
                      <span className="text-emerald-400">42 Answered</span>
                      <span className="text-amber-400">6 Marked</span>
                      <span className="text-slate-400">12 Unvisited</span>
                    </div>
                  </div>

                  {/* Included Sections Tag Pills */}
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      Sectional Breakdown (180 Marks Total)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentMock.subjects.map((s, i) => (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          key={s} 
                          className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                <span className="text-xs text-slate-500 font-medium">
                  Instant SMAS scorecard &amp; topic error analysis generated immediately upon submission.
                </span>
                <Button onClick={onOpenAssessment} size="lg" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-md">
                  <Play className="h-4 w-4 mr-2 fill-current" /> Take a Timed CBT Mock
                </Button>
              </div>

            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
