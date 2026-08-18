"use client";

import * as React from "react";
import { useState, useSyncExternalStore } from "react";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { PerformancePoint } from "@/lib/types/dashboard";

interface PerformanceTrendProps {
  data: PerformancePoint[];
}

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function PerformanceTrend({ data }: PerformanceTrendProps) {
  const isClient = useIsClient();
  const [metric, setMetric] = useState<"readiness" | "mockScore" | "accuracy">("readiness");

  const hasRealData = data.length > 1 || (data.length === 1 && (data[0].mockScore > 0 || data[0].accuracy > 0));

  // Dynamic caption
  const caption = (() => {
    if (!hasRealData) return "Take your first mock test to see your performance trend here.";
    if (data.length < 2)  return "Keep practicing — your trend will show after more mock tests.";
    const first = data[0].readiness;
    const last  = data[data.length - 1].readiness;
    const delta = last - first;
    if (delta > 0)  return `Readiness improved by ${delta} points across your ${data.length} mock test${data.length > 1 ? "s" : ""}.`;
    if (delta < 0)  return `Readiness dropped ${Math.abs(delta)} points — focus on weak areas.`;
    return `Readiness held steady across your ${data.length} mock test${data.length > 1 ? "s" : ""}.`;
  })();
  const getMetricColor = () => {
    switch (metric) {
      case "readiness":
        return "#4F46E5";
      case "mockScore":
        return "#10B981";
      case "accuracy":
        return "#0284C7";
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-bold text-gray-900">
            Performance Trend
          </h3>
          <p className="text-[11px] text-gray-500 font-medium">
            Track how your readiness index and mock scores progress over time.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <div className="bg-gray-100/80 p-1 rounded-xl flex items-center gap-1 font-bold w-full sm:w-auto">
            <button suppressHydrationWarning
              onClick={() => setMetric("readiness")}
              className={`flex-1 sm:flex-none px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                metric === "readiness" ? "bg-white text-[#4F46E5] shadow-2xs" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Readiness
            </button>
            <button suppressHydrationWarning
              onClick={() => setMetric("mockScore")}
              className={`flex-1 sm:flex-none px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                metric === "mockScore" ? "bg-white text-emerald-600 shadow-2xs" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Mock Score
            </button>
            <button suppressHydrationWarning
              onClick={() => setMetric("accuracy")}
              className={`flex-1 sm:flex-none px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                metric === "accuracy" ? "bg-white text-sky-600 shadow-2xs" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Accuracy
            </button>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-56 w-full pt-1">
        {!hasRealData ? (
          <div className="h-full w-full flex flex-col items-center justify-center gap-3 text-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <LineChart className="h-5 w-5 text-[#4F46E5]" />
            </div>
            <p className="text-xs font-bold text-gray-600">No mock data yet</p>
            <p className="text-[11px] text-gray-400 font-medium">Complete a NEST Mock Test to see your performance trend here.</p>
          </div>
        ) : isClient ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="label" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis domain={[0, 100]} stroke="#94A3B8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  borderRadius: "12px",
                  border: "none",
                  color: "#FFFFFF",
                  fontSize: "12px",
                  padding: "8px 12px",
                }}
              />
              <Line
                type="monotone"
                dataKey={metric}
                stroke={getMetricColor()}
                strokeWidth={2.5}
                dot={{ r: 4, fill: getMetricColor(), strokeWidth: 2, stroke: "#FFFFFF" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full bg-slate-50 animate-pulse rounded-xl" />
        )}
      </div>

      <div className="text-[11px] text-gray-400 font-medium text-center">
        {caption}
      </div>
    </div>
  );
}
