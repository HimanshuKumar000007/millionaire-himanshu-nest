"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ArrowRight, Flag, Compass, Route } from "lucide-react";
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
    { step: "01", title: "Diagnostic Assessment", status: "complete", desc: "Pinpoint exact strengths & conceptual baseline across PCMB" },
    { step: "02", title: "Pure Science Foundation", status: "complete", desc: "Target high-yield NCERT & NISER syllabus weightages" },
    { step: "03", title: "Smart Concept Building", status: "complete", desc: "15-min modular lessons with formula retention summaries" },
    { step: "04", title: "Official PYQ Mastery", status: "current", desc: "Solving 8-year authentic NEST previous papers (2018–2025)" },
    { step: "05", title: "180-Mark CBT Simulations", status: "next", desc: "Timed sectional drills under authentic exam constraints" },
    { step: "06", title: "Final SMAS Optimization", status: "later", desc: "Targeted error elimination & best-3 subject score maximization" },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Route className="h-3.5 w-3.5 text-indigo-600" /> Structured Path Forward
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-slate-950 tracking-tight leading-tight max-w-3xl mx-auto">
            Know exactly what to do next,
            <br />
            <span className="text-slate-500 font-medium">from day one to exam day.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            SciPrep turns your performance telemetry into a structured, milestone-driven route to NISER and CEBS.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="bg-[#F8FAFC] border-slate-200/90 p-6 sm:p-9 rounded-3xl shadow-lg max-w-5xl mx-auto space-y-8 relative z-10">
            {/* Header journey bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-slate-200/80">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="text-xs font-bold bg-indigo-600 text-white">
                    Personalized Path
                  </Badge>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    62% Complete
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Target Phase: Official NEST PYQ Mastery
                </h3>
              </div>

              <div className="sm:w-56 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Journey Progress</span>
                  <span className="font-mono text-indigo-600 font-bold">62%</span>
                </div>
                <AnimatedProgress value={62} className="h-2" />
              </div>
            </div>

            {/* Connected Journey Track */}
            <div className="relative">
              {/* Desktop connected progress rail */}
              <div className="hidden lg:block absolute top-[44px] left-[6%] right-[6%] h-1 bg-slate-200 -z-10 rounded-full">
                <div className="h-full bg-gradient-to-r from-emerald-500 via-indigo-600 to-indigo-400 w-[62%] rounded-full" />
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
              >
                {milestones.map((m) => {
                  const isComplete = m.status === "complete";
                  const isCurrent = m.status === "current";
                  return (
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 16 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
                      }}
                      whileHover={{ y: -3 }}
                      key={m.title}
                      className={`p-5 rounded-2xl border transition-all space-y-3 relative ${
                        isCurrent
                          ? "bg-white border-indigo-600 ring-2 ring-indigo-500/20 shadow-md transform scale-[1.02]"
                          : isComplete
                          ? "bg-white border-slate-200 shadow-2xs hover:border-slate-300"
                          : "bg-slate-100/60 border-slate-200/60 text-slate-400"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-mono font-bold uppercase ${isCurrent ? "text-indigo-600" : isComplete ? "text-slate-500" : "text-slate-400"}`}>
                          Stage {m.step}
                        </span>

                        {isComplete && (
                          <Badge variant="success" className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-600" /> Done
                          </Badge>
                        )}
                        {isCurrent && (
                          <Badge variant="default" className="text-[10px] bg-indigo-600 text-white font-bold animate-pulse">
                            ● Active Phase
                          </Badge>
                        )}
                        {m.status === "next" && (
                          <span className="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                            Next Up
                          </span>
                        )}
                        {m.status === "later" && (
                          <span className="text-[10px] font-medium text-slate-400">Later</span>
                        )}
                      </div>

                      <h4 className={`text-base font-black ${isCurrent ? "text-slate-900" : isComplete ? "text-slate-900" : "text-slate-500"}`}>
                        {m.title}
                      </h4>

                      <p className={`text-xs leading-relaxed font-normal ${isCurrent ? "text-slate-600" : isComplete ? "text-slate-500" : "text-slate-400"}`}>
                        {m.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Next Recommended Action Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="p-5 rounded-2xl bg-white border border-indigo-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
            >
              <div className="flex items-center gap-3.5">
                <div className="h-11 w-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Flag className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Recommended Next Action
                  </span>
                  <span className="text-sm font-extrabold text-slate-900">
                    Complete remaining high-priority Biology topics (Cell Biology &amp; Genetics).
                  </span>
                </div>
              </div>

              <Button onClick={onOpenAssessment} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors shrink-0 group">
                Open My Roadmap <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
