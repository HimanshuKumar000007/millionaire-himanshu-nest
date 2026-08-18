"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingUp, Target, Clock, Zap, ArrowRight, AlertTriangle } from "lucide-react";
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
  { mock: "Mock 01", score: 61, accuracy: 68 },
  { mock: "Mock 02", score: 67, accuracy: 72 },
  { mock: "Mock 03", score: 71, accuracy: 76 },
  { mock: "Mock 04", score: 76, accuracy: 80 },
  { mock: "Mock 05", score: 79, accuracy: 84 },
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
          }
        });
        return () => controls.stop();
      } else if (isFraction) {
        // Simple fade in for complex fractional strings to avoid messy counting
        node.textContent = valueStr;
      }
    }
  }, [inView, match, isFraction, valueStr]);

  return <div ref={nodeRef} className="text-2xl font-black text-[#111827]">{!inView && !isFraction ? "0" : valueStr}</div>;
}

export function PerformanceSection({ onOpenAssessment }: PerformanceSectionProps) {
  const mounted = useIsClient();

  const metrics = [
    { label: "Mock Score", value: "79%", change: "+18% overall", icon: TrendingUp },
    { label: "Accuracy", value: "84%", change: "+16% accuracy", icon: Target },
    { label: "Attempt Rate", value: "90%", change: "54 / 60 questions", icon: Zap },
    { label: "Time Efficiency", value: "78%", change: "2.8 min / question", icon: Clock },
    { label: "Readiness Index", value: "74/100", change: "On Track for NISER", icon: TrendingUp },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F7F8FC] border-b border-gray-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Performance Insights Dashboard"
          badgeVariant="default"
          title="Every test should tell you what to do next."
          subtitle="SciPrep analyzes test telemetry to reveal accuracy trends, time distribution, and targeted recommendations."
        />

        {/* Top 5 Metric Cards */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 mb-8"
        >
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                key={m.label}
                className="p-4 rounded-xl bg-white border border-gray-200/80 shadow-xs space-y-1 transition-colors cursor-pointer group"
              >
                <span className="text-xs text-gray-500 font-semibold flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-gray-400 group-hover:text-[#4F46E5] transition-colors" /> {m.label}
                </span>
                <AnimatedStat valueStr={m.value} />
                <span className="text-[11px] font-bold text-emerald-600 block">{m.change}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Performance Chart & Opportunity Highlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Chart Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-8"
          >
            <Card className="bg-white border-gray-200 p-6 sm:p-7 rounded-2xl shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="default" className="text-xs font-bold mb-1">
                    Score Growth Trend
                  </Badge>
                  <h3 className="text-xl font-extrabold text-[#111827]">
                    NEST Mock Performance Trajectory
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700">
                    <span className="h-3 w-3 rounded-full bg-[#4F46E5]" /> Mock Score
                  </div>
                </div>
              </div>

              {/* Recharts Area Chart */}
              <div className="h-64 w-full pt-4">
                {mounted && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.4, duration: 1 }}
                    className="h-full w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="mock" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                        <YAxis domain={[50, 100]} tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#111827",
                            borderColor: "#374151",
                            borderRadius: "12px",
                            color: "#FFFFFF",
                            fontSize: "12px",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="score"
                          stroke="#4F46E5"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#scoreGradient)"
                          animationDuration={1500}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Right Column: Opportunity Recommendation Box */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-4 space-y-4"
          >
            <Card className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-xl space-y-5 transform transition-transform hover:scale-[1.02]">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
                <AlertTriangle className="h-4 w-4" />
                <span>Your Biggest Opportunity</span>
              </div>

              <h4 className="text-xl font-bold text-white leading-snug">
                Improve Biology accuracy by revisiting Cell Biology and Genetics.
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                By focusing 45 minutes on Cell Organelles and Linkage Mapping, you can raise your predicted NEST Readiness Index from <strong>74 → 81</strong>.
              </p>

              <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-xs text-indigo-200">
                ⚡ <strong>Estimated Gain:</strong> +12 to +16 marks in Section 1
              </div>

              <Button onClick={onOpenAssessment} className="w-full bg-[#4F46E5] hover:bg-[#3730A3] transition-colors group" size="lg">
                See Performance Details <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
