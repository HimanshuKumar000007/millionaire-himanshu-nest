"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  DollarSign, 
  MapPin, 
  GraduationCap, 
  Building2, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Landmark, 
  Briefcase, 
  Globe2, 
  Wallet, 
  ShieldCheck,
  TrendingUp,
  Award
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getToken } from "@/lib/auth/authGuard";

interface FAQItem {
  question: string;
  answer: string;
}

interface NiserStipendClientProps {
  faqs: FAQItem[];
}

export function NiserStipendClient({ faqs }: NiserStipendClientProps) {
  const router = useRouter();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Financial Calculator
  const [messFeeMonthly, setMessFeeMonthly] = useState(3200);

  const annualStipend = 60000;
  const annualSummerGrant = 20000;
  const totalFinancialAid = annualStipend + annualSummerGrant; // 80,000

  const annualTuitionFee = 16000;
  const annualHostelFee = 6000;
  const annualMessFee = messFeeMonthly * 10; // 10 months academic stay
  const totalAnnualExpenses = annualTuitionFee + annualHostelFee + annualMessFee;
  const netAnnualSavings = totalFinancialAid - totalAnnualExpenses;

  const handleStartPrep = () => {
    const token = getToken();
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login?mode=signup&redirect=%2Fdashboard");
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Header */}
      <section className="relative pt-12 pb-12 overflow-hidden bg-gradient-to-b from-indigo-50/60 via-slate-50 to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            <Award className="h-3.5 w-3.5 text-emerald-600" />
            <span>Department of Atomic Energy (DAE) DISHA Fellowship</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.12]">
            NISER Stipend Per Month,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              DISHA Scholarship & 300-Acre Campus
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Every student admitted through NEST to <strong>NISER Bhubaneswar</strong> and <strong>UM-DAE CEBS Mumbai</strong> receives <strong>₹80,000 per year</strong> in financial aid with zero tuition debt, world-class research labs, and direct recruitment pathways to BARC.
          </p>

          {/* Key Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4 text-center">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="text-3xl font-black text-emerald-600">₹5,000</div>
              <div className="text-xs font-bold text-slate-800 mt-1">Stipend Per Month</div>
              <div className="text-[11px] text-slate-500">(₹60,000 / Year)</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="text-3xl font-black text-indigo-600">₹20,000</div>
              <div className="text-xs font-bold text-slate-800 mt-1">Summer Research Grant</div>
              <div className="text-[11px] text-slate-500">For global internships</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="text-3xl font-black text-purple-600">300 Acres</div>
              <div className="text-xs font-bold text-slate-800 mt-1">Lush Green Campus</div>
              <div className="text-[11px] text-slate-500">Jatni, Bhubaneswar</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="text-3xl font-black text-slate-900">Direct BARC</div>
              <div className="text-xs font-bold text-slate-800 mt-1">Scientific Officer Entry</div>
              <div className="text-[11px] text-slate-500">For CGPA $\ge$ 7.5</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Financial Calculator */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
            <Wallet className="h-3.5 w-3.5 text-emerald-600" />
            Financial Balance Calculator
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            How Much Will You Actually Save at NISER?
          </h2>
          <p className="text-sm text-slate-500">
            Compare annual fellowship income against all tuition, hostel, and dining expenses.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Income Side */}
            <div className="space-y-4 p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
              <h3 className="font-bold text-emerald-950 text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-600" />
                Annual Financial Income (DAE DISHA)
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-emerald-100">
                  <span className="text-slate-700 font-medium">Monthly Fellowship (₹5,000 × 12 mo):</span>
                  <span className="font-bold text-emerald-700">+₹60,000</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-emerald-100">
                  <span className="text-slate-700 font-medium">Summer Internship Research Grant:</span>
                  <span className="font-bold text-emerald-700">+₹20,000</span>
                </div>
                <div className="flex justify-between items-center pt-2 font-black text-emerald-950 text-base">
                  <span>Total Annual Aid:</span>
                  <span>+₹{totalFinancialAid.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Expense Side */}
            <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Building2 className="h-5 w-5 text-slate-600" />
                Estimated Annual Expenses
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-slate-600 font-medium">Semester Tuition & Academic Fees:</span>
                  <span className="font-bold text-slate-800">~₹16,000 / yr</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-slate-600 font-medium">Hostel Room Rent & Electricity:</span>
                  <span className="font-bold text-slate-800">~₹6,000 / yr</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-slate-600 font-medium">Mess & Food (~₹{messFeeMonthly}/mo × 10):</span>
                  <span className="font-bold text-slate-800">~₹{annualMessFee.toLocaleString("en-IN")} / yr</span>
                </div>
                <div className="flex justify-between items-center pt-2 font-black text-slate-950 text-base">
                  <span>Total Estimated Expenses:</span>
                  <span>₹{totalAnnualExpenses.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Net Balance Highlight */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Net Financial Outcome for Students
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white">
                100% Free Education + Surplus Savings
              </div>
              <p className="text-xs text-emerald-100">
                Your annual stipend exceeds all living and tuition expenses by approximately ₹{netAnnualSavings.toLocaleString("en-IN")} every single year.
              </p>
            </div>
            <Button
              onClick={handleStartPrep}
              className="bg-white hover:bg-emerald-50 text-emerald-900 font-bold px-6 py-3 rounded-xl text-xs shrink-0"
            >
              Start Preparing for NEST
            </Button>
          </div>
        </div>
      </section>

      {/* 300-Acre Campus Infrastructure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <MapPin className="h-3.5 w-3.5 text-indigo-600" />
            Jatni, Bhubaneswar, Odisha
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Life on NISER&apos;s 300-Acre State-of-the-Art Campus
          </h2>
          <p className="text-sm text-slate-500">
            Designed as an integrated science hub with premier research infrastructure and residential comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm">
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 w-fit">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Advanced Research Facilities</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Equipped with Femtosecond laser laboratories, High-field NMR spectrometers (400 MHz to 700 MHz), High-Resolution Transmission Electron Microscopes (HR-TEM), and High-Performance Computing (HPC) clusters.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 w-fit">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Modern Residential Hostels</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Single and twin occupancy student residences with high-speed campus-wide Wi-Fi, 24/7 power backup, hygienic dining halls, sports complexes, synthetic running tracks, and gymnasiums.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm">
            <div className="p-3 rounded-xl bg-purple-50 text-purple-600 w-fit">
              <Globe2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Prestigious Academic Neighbors</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Located in Odisha&apos;s primary scientific corridor with close research collaborations with the <strong>Institute of Physics (IOP)</strong>, <strong>IIT Bhubaneswar</strong>, <strong>AIIMS Bhubaneswar</strong>, and <strong>ILS</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Career & PhD Outcomes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Unrivaled Career & Global PhD Trajectories
          </h2>
          <p className="text-sm text-slate-500">
            Where NISER and CEBS graduates go after completing their 5-year Integrated M.Sc.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Direct Entry to BARC as Scientific Officer</h3>
                <span className="text-xs font-medium text-emerald-600">Starting package: ₹14+ LPA CTC (Group A Gazetted)</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Graduates with a CGPA $\ge$ 7.5 bypass the nationwide OCES written exam and are invited directly for interview selection to join premier Department of Atomic Energy research facilities, including Bhabha Atomic Research Centre (BARC), IGCAR, and RRCAT.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Fully Funded Global PhD Placements</h3>
                <span className="text-xs font-medium text-indigo-600">Over 60% of graduates enter global top 50 universities</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Alumni regularly secure direct admissions with full fellowship to doctoral programs at MIT, Stanford, Harvard, Cambridge, Max Planck Institutes, Caltech, Princeton, Oxford, IISc Bangalore, and TIFR Mumbai.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500">
            Everything you need to know about the DISHA scholarship, campus life, and admissions.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-emerald-700 transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-emerald-700" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Conversion Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-xs px-3 py-1 font-semibold">
              Target NISER Bhubaneswar
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Begin Your Preparation to Secure the ₹80,000 Fellowship
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Join thousands of aspiring scientists preparing for NEST with authentic chapter-wise PYQs, Smart Lessons, and CBT mock tests.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                onClick={handleStartPrep}
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-emerald-500/30 text-sm"
              >
                Start Free Preparation
              </Button>
              <Link
                href="/nest-pyq-chapter-wise"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all text-center"
              >
                Explore Chapter-Wise PYQs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
