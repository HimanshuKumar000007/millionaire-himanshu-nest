"use client";

import * as React from "react";
import { ArrowRight, Info } from "lucide-react";

interface SubjectScore {
  subject: string;
  score: number;
}

interface HeroSectionProps {
  readinessScore?: number;
  status?: string;
  scoreTrend?: number;
  subjects?: SubjectScore[];
  hasCompletedAssessment?: boolean;
  onViewAnalysis?: () => void;
}

export function HeroSection({
  readinessScore = 0,
  status = "Needs Acceleration",
  scoreTrend = 0,
  subjects = [],
  hasCompletedAssessment = false,
  onViewAnalysis,
}: HeroSectionProps) {
  // Map subjects to their radar positions (top=Physics, right=Chem, bottom=Math, left=Bio)
  const subjectMap: Record<string, number> = {};
  for (const s of subjects) {
    subjectMap[s.subject] = s.score;
  }

  const physics = subjectMap["Physics"] ?? 0;
  const chemistry = subjectMap["Chemistry"] ?? 0;
  const mathematics = subjectMap["Mathematics"] ?? 0;
  const biology = subjectMap["Biology"] ?? 0;

  // Convert scores (0–100) to radar polygon points
  // Radar diamond: top=120,15 → 120,125; right=40,70 → 200,70
  const scale = (score: number) => score / 100;
  const topY    = 125 - 110 * scale(physics);      // Physics (top)
  const rightX  = 40  + 160 * scale(chemistry);    // Chemistry (right)
  const bottomY = 15  + 110 * scale(mathematics);  // Mathematics (bottom)
  const leftX   = 200 - 160 * scale(biology);      // Biology (left)

  const hasRealData = hasCompletedAssessment && (physics > 0 || chemistry > 0 || biology > 0 || mathematics > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      {/* Left Hero Banner */}
      <div className="lg:col-span-7 bg-gradient-to-r from-[#EEF2FF] via-[#EBF3FF] to-[#E0E7FF] rounded-2xl p-6 sm:p-8 border border-indigo-100/80 flex flex-col justify-between relative overflow-hidden min-h-[220px] shadow-2xs">
        <div className="max-w-md z-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1E1B4B] tracking-tight leading-tight">
            Understand. Practice. Improve.
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium">
            Everything you need to crack NEST
          </p>
        </div>

        {/* 3D Stacked Books & Beaker */}
        <div className="absolute right-3 bottom-0 sm:right-6 w-40 sm:w-52 h-40 sm:h-48 pointer-events-none z-0">
          <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
            <ellipse cx="100" cy="165" rx="70" ry="12" fill="#818CF8" fillOpacity="0.2" />
            <path d="M40 145 L150 120 L165 130 L55 155 Z" fill="#3B82F6" />
            <path d="M40 145 L55 155 L55 160 L40 150 Z" fill="#1D4ED8" />
            <path d="M55 155 L165 130 L165 135 L55 160 Z" fill="#EFF6FF" />
            <path d="M48 128 L142 108 L155 116 L60 136 Z" fill="#8B5CF6" />
            <path d="M48 128 L60 136 L60 141 L48 133 Z" fill="#6D28D9" />
            <path d="M60 136 L155 116 L155 121 L60 141 Z" fill="#F5F3FF" />
            <path d="M55 112 L135 95 L146 102 L65 119 Z" fill="#4F46E5" />
            <path d="M55 112 L65 119 L65 124 L55 117 Z" fill="#3730A3" />
            <path d="M65 119 L146 102 L146 107 L65 124 Z" fill="#EEF2FF" />
            <path d="M92 45 L108 45 L108 60 L125 90 C128 95 124 100 118 100 L82 100 C76 100 72 95 75 90 L92 60 Z" fill="url(#glassGrad)" stroke="#A5B4FC" strokeWidth="2" fillOpacity="0.8" />
            <path d="M80 88 C85 85 95 91 100 88 C105 85 115 90 120 88 L122 93 C123 97 120 99 116 99 L84 99 C80 99 77 97 78 93 Z" fill="#A855F7" fillOpacity="0.85" />
            <circle cx="100" cy="50" r="3" fill="#C084FC" />
            <circle cx="106" cy="38" r="2" fill="#E879F9" />
            <circle cx="94" cy="30" r="2.5" fill="#818CF8" />
            <path d="M150 45 L155 52 L150 59 L145 52 Z" fill="#818CF8" opacity="0.8" />
            <path d="M35 70 L39 76 L35 82 L31 76 Z" fill="#A855F7" opacity="0.7" />
            <circle cx="165" cy="80" r="3" fill="#F472B6" />
            <defs>
              <linearGradient id="glassGrad" x1="80" y1="45" x2="120" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="1" stopColor="#EEF2FF" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Right Readiness Card */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs flex flex-col justify-between space-y-4">
        {/* Top Stats */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-gray-900">NEST Readiness</span>
              <Info className="h-3.5 w-3.5 text-gray-400 cursor-pointer" />
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-gray-900 tracking-tight">
                {readinessScore > 0 ? readinessScore : "—"}
              </span>
              <span className="text-sm font-semibold text-gray-400">/ 100</span>

              <span className={`ml-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                readinessScore >= 70
                  ? "text-emerald-600 bg-emerald-50 border-emerald-100"
                  : readinessScore > 0
                  ? "text-amber-600 bg-amber-50 border-amber-100"
                  : "text-gray-500 bg-gray-100 border-gray-200"
              }`}>
                {status}
              </span>
            </div>

            <p className="text-[11px] text-gray-500 font-medium mt-0.5">
              {scoreTrend > 0
                ? `↑ +${scoreTrend} pts from your first mock`
                : scoreTrend < 0
                ? `↓ ${scoreTrend} pts — focus on weak areas`
                : readinessScore > 0
                ? "Complete more mocks to track your trend"
                : "Take a mock test to generate your readiness score"}
            </p>
          </div>

          <button suppressHydrationWarning
            onClick={onViewAnalysis}
            className="text-xs font-bold text-gray-700 hover:text-[#4F46E5] border border-gray-200 hover:bg-gray-50 rounded-lg px-3 py-1.5 transition-all flex items-center gap-1 shrink-0"
          >
            <span>View Full Analysis</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* Diamond Subject Radar */}
        <div className="relative w-full h-36 flex items-center justify-center pt-2">
          {hasRealData ? (
            <svg viewBox="0 0 240 140" className="w-full h-full max-w-[240px]">
              {/* Grid Rings */}
              <polygon points="120,15 200,70 120,125 40,70" fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />
              <polygon points="120,30 180,70 120,110 60,70" fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />
              <polygon points="120,45 160,70 120,95 80,70" fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />
              {/* Axes */}
              <line x1="120" y1="15" x2="120" y2="125" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="40" y1="70" x2="200" y2="70" stroke="#E5E7EB" strokeWidth="1" />
              {/* Subject Polygon */}
              <polygon
                points={`120,${topY} ${rightX},70 120,${bottomY} ${leftX},70`}
                fill="#818CF8"
                fillOpacity="0.2"
                stroke="#4F46E5"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {/* Vertex Dots */}
              <circle cx="120" cy={topY} r="3.5" fill="#4F46E5" />
              <circle cx={rightX} cy="70" r="3.5" fill="#4F46E5" />
              <circle cx="120" cy={bottomY} r="3.5" fill="#4F46E5" />
              <circle cx={leftX} cy="70" r="3.5" fill="#4F46E5" />
              {/* Labels */}
              <text x="120" y="8" textAnchor="middle" className="text-[10px] font-bold fill-gray-700">Physics</text>
              <text x="120" y="18" textAnchor="middle" className="text-[9px] font-black fill-gray-900">{physics}</text>
              <text x="215" y="68" textAnchor="middle" className="text-[10px] font-bold fill-gray-700">Chemistry</text>
              <text x="215" y="78" textAnchor="middle" className="text-[9px] font-black fill-gray-900">{chemistry}</text>
              <text x="120" y="133" textAnchor="middle" className="text-[10px] font-bold fill-gray-700">Mathematics</text>
              <text x="120" y="141" textAnchor="middle" className="text-[9px] font-black fill-gray-900">{mathematics}</text>
              <text x="25" y="68" textAnchor="middle" className="text-[10px] font-bold fill-gray-700">Biology</text>
              <text x="25" y="78" textAnchor="middle" className="text-[9px] font-black fill-gray-900">{biology}</text>
            </svg>
          ) : (
            /* Empty State — no assessment data yet */
            <div className="flex flex-col items-center justify-center gap-2 py-2">
              <svg viewBox="0 0 240 140" className="w-full h-full max-w-[240px] opacity-25">
                <polygon points="120,15 200,70 120,125 40,70" fill="none" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="3 3" />
                <polygon points="120,30 180,70 120,110 60,70" fill="none" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="3 3" />
                <polygon points="120,45 160,70 120,95 80,70" fill="none" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="120" y1="15" x2="120" y2="125" stroke="#9CA3AF" strokeWidth="1" />
                <line x1="40" y1="70" x2="200" y2="70" stroke="#9CA3AF" strokeWidth="1" />
                <text x="120" y="8" textAnchor="middle" fontSize="9" fill="#9CA3AF">Physics</text>
                <text x="215" y="68" textAnchor="middle" fontSize="9" fill="#9CA3AF">Chemistry</text>
                <text x="120" y="133" textAnchor="middle" fontSize="9" fill="#9CA3AF">Mathematics</text>
                <text x="25" y="68" textAnchor="middle" fontSize="9" fill="#9CA3AF">Biology</text>
              </svg>
              <p className="text-[10px] font-medium text-gray-400 text-center -mt-4">
                Complete assessment to analyze subjects
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
