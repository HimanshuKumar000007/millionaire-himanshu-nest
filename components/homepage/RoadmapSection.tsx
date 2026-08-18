"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ArrowRight, Flag } from "lucide-react";
import { motion, useInView, animate } from "motion/react";

interface RoadmapSectionProps {
  onOpenAssessment: () => void;
}

function AnimatedProgress({ value, className }: { value: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (v) => setCurrentValue(v),
      });
      return controls.stop;
    }
  }, [inView, value]);

  return (
    <div ref={ref} className="w-full">
      <Progress value={currentValue} className={className} />
    </div>
  );
}

export function RoadmapSection({ onOpenAssessment }: RoadmapSectionProps) {
  const milestones = [
    { title: "Assessment", status: "complete", desc: "Diagnostic evaluation across all 4 subjects" },
    { title: "Foundation", status: "complete", desc: "High-yield NCERT concept alignment" },
    { title: "Concept Building", status: "complete", desc: "15-minute Smart Lessons & formula mastery" },
    { title: "PYQ Mastery", status: "current", desc: "Solving 10-year authentic NEST previous papers" },
    { title: "Mock Tests", status: "next", desc: "Full-length timed exam simulations" },
    { title: "Final Revision", status: "later", desc: "High-probability formula & topic refresher" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-gray-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Structured Path Forward"
          badgeVariant="default"
          title="Know what comes next."
          subtitle="Your preparation should have a direction. SciPrep turns your current performance into a structured path forward."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="bg-[#F7F8FC] border-gray-200 p-6 sm:p-8 rounded-2xl shadow-md max-w-4xl mx-auto space-y-8 relative z-10">
            
            {/* Progress Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="text-xs font-bold">
                    Personalized Path
                  </Badge>
                  <span className="text-xs text-emerald-700 font-bold">
                    62% Preparation Complete
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#111827] mt-1">
                  Target Milestone: NEST PYQ Mastery
                </h3>
              </div>

              <div className="sm:w-48 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                  <span>Overall Journey</span>
                  <span>62%</span>
                </div>
                <AnimatedProgress value={62} className="h-2" />
              </div>
            </div>

            {/* Milestone Steps Timeline */}
            <div className="relative">
              {/* Subtle connecting line behind cards */}
              <div className="hidden lg:block absolute top-[50%] left-[5%] right-[5%] h-0.5 bg-indigo-100/60 -z-10 rounded-full" />
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15 }
                  }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {milestones.map((m, idx) => (
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                    whileHover={{ y: -2 }}
                    key={m.title}
                    className={`p-4 rounded-xl border transition-all space-y-2 relative z-20 ${
                      m.status === "complete"
                        ? "bg-white border-emerald-200 text-gray-800 shadow-xs"
                        : m.status === "current"
                        ? "bg-indigo-50/90 border-[#4F46E5] ring-2 ring-indigo-500/20 text-[#111827] shadow-md transform scale-[1.02]"
                        : "bg-white/80 border-gray-200 text-gray-500 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase text-gray-400">
                        Stage 0{idx + 1}
                      </span>
                      {m.status === "complete" && (
                        <Badge variant="success" className="text-[10px] bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.3 + idx * 0.1 }}
                            className="flex items-center"
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Complete
                          </motion.div>
                        </Badge>
                      )}
                      {m.status === "current" && (
                        <Badge variant="default" className="text-[10px]">
                          <motion.span
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="flex items-center gap-1"
                          >
                            ● Current Phase
                          </motion.span>
                        </Badge>
                      )}
                      {m.status === "next" && (
                        <Badge variant="outline" className="text-[10px]">
                          Upcoming
                        </Badge>
                      )}
                      {m.status === "later" && (
                        <span className="text-[10px] font-semibold text-gray-400">Later</span>
                      )}
                    </div>

                    <h4 className="text-base font-extrabold text-[#111827]">
                      {m.title}
                    </h4>

                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      {m.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Next Milestone Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="p-4 rounded-xl bg-white border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center shrink-0">
                  <Flag className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    Next Recommended Action
                  </span>
                  <span className="text-sm font-extrabold text-[#111827]">
                    Complete your remaining high-priority Biology topics (Cell Biology & Genetics).
                  </span>
                </div>
              </div>

              <Button onClick={onOpenAssessment} className="bg-[#4F46E5] hover:bg-[#3730A3] transition-colors shrink-0 group">
                View My Roadmap <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

          </Card>
        </motion.div>
      </div>
    </section>
  );
}
