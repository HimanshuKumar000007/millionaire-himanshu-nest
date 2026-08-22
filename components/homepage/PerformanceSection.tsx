"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import {
  TrendingUp,
  Target,
  Clock,
  Zap,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Sparkles,
  ShieldCheck,
  Award,
} from "lucide-react";
import { motion, useInView, animate } from "motion/react";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

interface PerformanceSectionProps {
  onOpenAssessment: () => void;
}

const mockTrendData = [
  { mock: "Diag #01", score: 58, niserCutoff: 75, accuracy: 64 },
  { mock: "Mock #02", score: 65, niserCutoff: 75, accuracy: 70 },
  { mock: "Mock #03", score: 71, niserCutoff: 75, accuracy: 76 },
  { mock: "Mock #04", score: 76, niserCutoff: 75, accuracy: 81 },
  { mock: "Mock #05", score: 82, niserCutoff: 75, accuracy: 86 },
];

const errorAnalysisData = [
  {
    category: "Conceptual Gaps",
    percent: 48,
    color: "bg-rose-500",
    topics: "Genetics (Linkage), Wave Optics",
    action: "Review 15-min Smart Lesson",
  },
  {
    category: "Calculation & Time Rush",
    percent: 32,
    color: "bg-amber-500",
    topics: "Thermodynamics, Integration",
    action: "Practice untimed formula steps",
  },
  {
    category: "Exam Traps & Misreads",
    percent: 20,
    color: "bg-indigo-500",
    topics: "Inorganic Trends, Cell Division",
    action: "Review 'Trap Option' notes",
  },
];

function AnimatedStat({ valueStr }: { valueStr: string }) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  const match = valueStr.match(/^(\d+)(.*)$/);
  const isFraction = valueStr.includes("/");

  useEffect(() => {
    if (!inView) return;
    const node = nodeRef.current;
    if (node) {
      if (match && !isFraction) {
        const num = parseInt(match[1], 10);
        const suffix = match[2];
        const controls = animate(0, num, {
          duration: 1.5,
          ease: "easeOut",
          onUpdate(val) {
            node.textContent = Math.round(val).toString() + suffix;
          },
        });
        return () => controls.stop();
      } else if (isFraction) {
        node.textContent = valueStr;
      }
    }
  }, [inView, match, isFraction, valueStr]);

  return (
    <div ref={nodeRef} className="text-2xl font-black text-slate-900">
      {!inView && !isFraction ? "0" : valueStr}
    </div>
  );
}

export function PerformanceSection({ onOpenAssessment }: PerformanceSectionProps) {
  const mounted = useIsClient();
  const [activeTab, setActiveTab] = useState<"trajectory" | "errors">("trajectory");

  const telemetryMetrics = [
    {
      label: "Readiness Index",
      value: "82/100",
      sub: "Top 4% Band",
      status: "On Track",
      icon: TrendingUp,
      badgeColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    },
    {
      label: "SMAS Status",
      value: "4/4 Cleared",
      sub: "All Sectional Cutoffs",
      status: "Safe",
      icon: ShieldCheck,
      badgeColor: "text-indigo-700 bg-indigo-50 border-indigo-200",
    },
    {
      label: "Pace per Correct Q",
      value: "2.1 min",
      sub: "Target: < 2.5 min",
      status: "+18% Speed",
      icon: Clock,
      badgeColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    },
    {
      label: "Negative Mark Loss",
      value: "-4 marks",
      sub: "Down from -16 marks",
      status: "75% Reduction",
      icon: Zap,
      badgeColor: "text-indigo-700 bg-indigo-50 border-indigo-200",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-slate-200/80 overflow-hidden relative">
      {/* Background blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,.4) 1px,transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
            <BarChart3 className="h-3.5 w-3.5 text-indigo-600" /> Deep Performance Telemetry
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-slate-950 tracking-tight leading-tight max-w-3xl mx-auto">
            Every mock test should tell you
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              exactly what to do next.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            SciPrep turns test telemetry into actionable prescriptions: identifying root-cause errors, SMAS cutoff compliance, and high-probability score boosters.
          </p>
        </motion.div>

        {/* 4 Actionable Telemetry Metric Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {telemetryMetrics.map((m) => {
            const Icon = m.icon;
            return (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
                }}
                whileHover={{ y: -2 }}
                key={m.label}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 hover:border-indigo-200 transition-all cursor-default"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5 text-indigo-600" /> {m.label}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${m.badgeColor}`}>
                    {m.status}
                  </span>
                </div>
                <AnimatedStat valueStr={m.value} />
                <span className="text-xs text-slate-400 font-medium block">{m.sub}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Core Dashboard: Chart & AI Prescription */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Dual-View Performance Inspector (8 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-8 flex flex-col"
          >
            <Card className="bg-white border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6 flex-1 flex flex-col justify-between">
              
              {/* Header & Tab Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="text-xs font-bold bg-indigo-600 text-white">
                      Diagnostic Telemetry
                    </Badge>
                    <span className="text-xs text-slate-400 font-medium">5-Mock Sequence</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    {activeTab === "trajectory" ? "Score Progression vs NISER Cutoff" : "Root-Cause Error Breakdown"}
                  </h3>
                </div>

                <div className="flex items-center p-1 bg-slate-100 rounded-xl">
                  <button
                    onClick={() => setActiveTab("trajectory")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      activeTab === "trajectory"
                        ? "bg-white text-indigo-700 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Score Growth
                  </button>
                  <button
                    onClick={() => setActiveTab("errors")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      activeTab === "errors"
                        ? "bg-white text-indigo-700 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Error Diagnosis
                  </button>
                </div>
              </div>

              {/* View 1: Recharts Area Chart */}
              {activeTab === "trajectory" ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                        <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                        Your Mock Score
                      </span>
                      <span className="flex items-center gap-1.5 text-rose-600 font-semibold">
                        <span className="h-0.5 w-4 bg-rose-400 border-dashed" />
                        NISER Cutoff Benchmark (75)
                      </span>
                    </div>
                    <span className="font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      +24 pts growth in 5 mocks
                    </span>
                  </div>

                  <div className="h-64 sm:h-72 w-full pt-2">
                    {mounted && (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="scoreGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.35} />
                              <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                          <XAxis dataKey="mock" tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
                          <YAxis domain={[45, 95]} tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#0F172A",
                              borderColor: "#334155",
                              borderRadius: "14px",
                              color: "#FFFFFF",
                              fontSize: "12px",
                              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                            }}
                          />
                          <ReferenceLine y={75} stroke="#F43F5E" strokeDasharray="4 4" label={{ value: "NISER Cutoff (75)", fill: "#F43F5E", fontSize: 11, position: "insideTopRight" }} />
                          <Area
                            type="monotone"
                            dataKey="score"
                            stroke="#4F46E5"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#scoreGrowthGradient)"
                            animationDuration={1200}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
              ) : (
                /* View 2: Error Root-Cause Breakdown */
                <div className="space-y-4 py-2">
                  <span className="text-xs text-slate-500 font-medium block">
                    SciPrep categorizes every lost mark into 3 distinct behavioral buckets so you don&apos;t practice blindly:
                  </span>

                  <div className="space-y-3">
                    {errorAnalysisData.map((err, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-slate-800 flex items-center gap-2">
                            <span className={`h-2.5 w-2.5 rounded-full ${err.color}`} />
                            {err.category}
                          </span>
                          <span className="font-mono text-slate-900">{err.percent}% of Lost Marks</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div className={`h-full ${err.color} rounded-full`} style={{ width: `${err.percent}%` }} />
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] pt-1">
                          <span className="text-slate-500">Affected: <strong>{err.topics}</strong></span>
                          <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                            Prescription: {err.action}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Insight Strip */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  SMAS best-3 rule applied automatically to your top 3 subject sections.
                </span>
                <span className="font-mono font-bold text-slate-700">Updated after every mock attempt</span>
              </div>
            </Card>
          </motion.div>

          {/* Right: AI Admission Prescription & Target Seat Probability (4 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-4 flex flex-col"
          >
            <Card className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6 flex-1 flex flex-col justify-between border-0 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
                    <Sparkles className="h-4 w-4" />
                    <span>SciPrep Prescription</span>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                    High Confidence
                  </span>
                </div>

                {/* Admission Probability Gauge */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">NISER / CEBS Seat Probability</span>
                    <span className="text-emerald-400 font-black font-mono text-base">88%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full w-[88%]" />
                  </div>
                  <span className="text-[11px] text-slate-400 block font-normal">
                    Based on your SMAS compliance and 82/100 Readiness Index.
                  </span>
                </div>

                {/* 3-Step Action Plan */}
                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
                    Highest Leverage 45-Min Action
                  </span>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="h-5 w-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                      <div>
                        <strong className="text-white block">Review Concept: Linkage &amp; Crossing Over</strong>
                        <span className="text-slate-400 text-[11px]">15-min Smart Lesson to eliminate 4 trap errors</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="h-5 w-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                      <div>
                        <strong className="text-white block">Solve 10 NEST PYQs</strong>
                        <span className="text-slate-400 text-[11px]">2021–2024 official questions</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                      <div>
                        <strong className="text-white block">Predicted Readiness Jump: 82 → 87</strong>
                        <span className="text-emerald-300 text-[11px] font-medium">+5 marks expected delta</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2 relative z-10">
                <Button
                  onClick={onOpenAssessment}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-600/30 group py-5 text-sm"
                >
                  Generate My Performance Report
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
