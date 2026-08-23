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
  Award,
  BookOpen,
  Cpu,
  Microscope,
  FileCheck,
  Check,
  Percent,
  Calculator,
  Compass,
  Star,
  Layers,
  Target
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

  // Financial Calculator State
  const [messFeeMonthly, setMessFeeMonthly] = useState(3200);
  const [personalMonthlyExpense, setPersonalMonthlyExpense] = useState(1500);

  const annualStipend = 60000;
  const annualSummerGrant = 20000;
  const totalFinancialAid = annualStipend + annualSummerGrant; // 80,000

  const annualTuitionFee = 16000;
  const annualHostelFee = 6000;
  const annualMessFee = messFeeMonthly * 10; // 10 months academic stay
  const annualPersonalExpense = personalMonthlyExpense * 10;
  const totalAnnualExpenses = annualTuitionFee + annualHostelFee + annualMessFee + annualPersonalExpense;
  const netAnnualSavings = totalFinancialAid - totalAnnualExpenses;
  const fiveYearTotalSavings = netAnnualSavings * 5;

  const handleStartPrep = () => {
    const token = getToken();
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login?mode=signup&redirect=%2Fdashboard");
    }
  };

  return (
    <div className="space-y-16 pb-24 text-slate-800">
      {/* Editorial Master Header */}
      <section className="relative pt-12 pb-14 overflow-hidden bg-gradient-to-b from-indigo-50/70 via-slate-50 to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Award className="h-4 w-4 text-emerald-600" />
            <span>Official Department of Atomic Energy (DAE) Fellowship & Campus Review</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 max-w-5xl mx-auto leading-[1.12]">
            NISER Stipend Per Month, DISHA Scholarship,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600">
              Fee Structure & 300-Acre Campus Guide
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            An exhaustive, verified breakdown of the <strong>₹80,000 annual DISHA fellowship</strong>, semester-by-semester fee schedules, world-class research facilities on the <strong>300-acre Jatni campus</strong>, direct <strong>BARC Scientific Officer recruitment</strong>, and global PhD admissions for NISER Bhubaneswar and UM-DAE CEBS Mumbai aspirants.
          </p>

          {/* Quick Key Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto pt-4 text-left">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="text-3xl font-black text-emerald-600">₹5,000 / mo</div>
              <div className="text-xs font-bold text-slate-900 mt-1">Direct Bank Fellowship</div>
              <div className="text-[11px] text-slate-500">₹60,000 per academic year</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="text-3xl font-black text-indigo-600">₹20,000 / yr</div>
              <div className="text-xs font-bold text-slate-900 mt-1">Summer Research Grant</div>
              <div className="text-[11px] text-slate-500">For global & Indian internships</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="text-3xl font-black text-purple-600">300 Acres</div>
              <div className="text-xs font-bold text-slate-900 mt-1">Lush Green Campus</div>
              <div className="text-[11px] text-slate-500">Jatni, Bhubaneswar (Odisha)</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="text-3xl font-black text-slate-900">Direct BARC</div>
              <div className="text-xs font-bold text-slate-900 mt-1">Scientific Officer (Group A)</div>
              <div className="text-[11px] text-slate-500">Eligible for CGPA ≥ 7.5</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sticky Quick Navigator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column / Table of Contents (Desktop Sticky) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-2">
                In This Master Guide
              </span>
              <nav className="space-y-1.5 text-xs font-semibold text-slate-600">
                <a href="#section-stipend" className="block py-1 hover:text-indigo-600 transition-colors">
                  1. The ₹80,000 DISHA Fellowship
                </a>
                <a href="#section-fees" className="block py-1 hover:text-indigo-600 transition-colors">
                  2. Semester Fee Structure & Net Savings
                </a>
                <a href="#section-calculator" className="block py-1 hover:text-indigo-600 transition-colors">
                  3. Interactive Financial Balance Calculator
                </a>
                <a href="#section-campus" className="block py-1 hover:text-indigo-600 transition-colors">
                  4. The 300-Acre Jatni Campus Facilities
                </a>
                <a href="#section-barc" className="block py-1 hover:text-indigo-600 transition-colors">
                  5. Direct BARC Scientific Officer Entry
                </a>
                <a href="#section-phd" className="block py-1 hover:text-indigo-600 transition-colors">
                  6. Global Top-50 PhD Placements
                </a>
                <a href="#section-comparison" className="block py-1 hover:text-indigo-600 transition-colors">
                  7. NISER vs CEBS Comparison Table
                </a>
                <a href="#section-strategy" className="block py-1 hover:text-indigo-600 transition-colors">
                  8. How to Qualify via NEST
                </a>
                <a href="#section-faqs" className="block py-1 hover:text-indigo-600 transition-colors">
                  9. Frequently Asked Questions
                </a>
              </nav>

              <div className="pt-4 border-t border-slate-100">
                <Button
                  onClick={handleStartPrep}
                  className="w-full bg-slate-900 hover:bg-indigo-600 text-white rounded-xl py-2 text-xs font-bold"
                >
                  Start NEST Prep Free
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Deep Detailed Article Content */}
          <div className="lg:col-span-9 space-y-14 leading-relaxed">

            {/* Section 1: The DISHA Fellowship */}
            <section id="section-stipend" className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                <Award className="h-4 w-4 text-emerald-600" />
                <span>Financial Independence</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                1. The Department of Atomic Energy (DAE) DISHA Fellowship Explained
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Unlike most Indian engineering or medical colleges where parents incur substantial student loan debts, <strong>NISER Bhubaneswar</strong> and <strong>UM-DAE CEBS Mumbai</strong> operate under the direct patronage of the <strong>Department of Atomic Energy (DAE), Government of India</strong>. To foster scientific research talent from an early age, every admitted candidate receives the prestigious <strong>DISHA Fellowship</strong> (formerly INSPIRE-SHE).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                    Monthly Fellowship: ₹5,000 / Month
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Credited directly to the student’s personal SBI bank account on campus. Across 12 months, this totals <strong>₹60,000 per year</strong>, providing complete personal pocket allowance and covering campus dining.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2">
                  <h3 className="text-base font-bold text-indigo-950 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-600" />
                    Summer Research Grant: ₹20,000 / Year
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An annual contingency grant disbursed to support students during their mandatory 2-month summer research internships at premier national labs (IISc, TIFR, BARC, IITs, CERN, Max Planck Institutes).
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
                <strong className="text-slate-900 block font-bold">Fellowship Continuation Criteria:</strong>
                <p>
                  To maintain the DISHA scholarship every year, students must maintain a minimum Cumulative Grade Point Average (CGPA) of <strong>6.0 / 10.0</strong> at the end of each academic year and have no active backlogs. Over 96% of students easily maintain this baseline.
                </p>
              </div>
            </section>

            {/* Section 2: Complete Semester Fee Structure */}
            <section id="section-fees" className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-indigo-700">
                <Building2 className="h-4 w-4 text-indigo-600" />
                <span>Transparent Accounting</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                2. Semester-by-Semester Fee Breakdown & Tuition Waivers
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Because NISER is heavily funded by the Central Government, tuition and hostel fees are minimal. Here is the official fee structure for Integrated M.Sc. students:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3.5">Fee Component</th>
                      <th className="px-5 py-3.5">General / OBC (Per Semester)</th>
                      <th className="px-5 py-3.5">SC / ST / PwD (Per Semester)</th>
                      <th className="px-5 py-3.5">Frequency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-5 py-3 font-semibold text-slate-900">Tuition Fee</td>
                      <td className="px-5 py-3 font-medium text-slate-800">₹8,000</td>
                      <td className="px-5 py-3 font-bold text-emerald-600">₹0 (100% Fee Waiver)</td>
                      <td className="px-5 py-3 text-slate-400">Every Semester</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-semibold text-slate-900">Hostel Seat Rent</td>
                      <td className="px-5 py-3 font-medium text-slate-800">₹1,500</td>
                      <td className="px-5 py-3 font-medium text-slate-800">₹1,500</td>
                      <td className="px-5 py-3 text-slate-400">Every Semester</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-semibold text-slate-900">Electricity & Water Charges</td>
                      <td className="px-5 py-3 font-medium text-slate-800">₹1,000</td>
                      <td className="px-5 py-3 font-medium text-slate-800">₹1,000</td>
                      <td className="px-5 py-3 text-slate-400">Every Semester</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-semibold text-slate-900">Lab, Library & Internet Fee</td>
                      <td className="px-5 py-3 font-medium text-slate-800">₹1,500</td>
                      <td className="px-5 py-3 font-medium text-slate-800">₹1,500</td>
                      <td className="px-5 py-3 text-slate-400">Every Semester</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-semibold text-slate-900">Examination & Grade Card Fee</td>
                      <td className="px-5 py-3 font-medium text-slate-800">₹1,000</td>
                      <td className="px-5 py-3 font-medium text-slate-800">₹1,000</td>
                      <td className="px-5 py-3 text-slate-400">Every Semester</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-semibold text-slate-900">Medical Insurance & Student Welfare</td>
                      <td className="px-5 py-3 font-medium text-slate-800">₹1,000</td>
                      <td className="px-5 py-3 font-medium text-slate-800">₹1,000</td>
                      <td className="px-5 py-3 text-slate-400">Annual (Once a Year)</td>
                    </tr>
                    <tr className="bg-slate-50 font-bold">
                      <td className="px-5 py-3.5 text-slate-900">Total Academic Fee Per Semester</td>
                      <td className="px-5 py-3.5 text-indigo-600 text-sm">~₹14,000 / sem</td>
                      <td className="px-5 py-3.5 text-emerald-700 text-sm">~₹6,000 / sem</td>
                      <td className="px-5 py-3.5 text-slate-500">2 Semesters / Year</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-slate-500 italic">
                * Note: Refundable caution deposit of ₹5,000 is charged one-time at the time of initial admission and returned upon graduation.
              </p>
            </section>

            {/* Section 3: Interactive Financial Calculator */}
            <section id="section-calculator" className="space-y-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                  <Calculator className="h-4 w-4" /> Live Interactive Savings Model
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  3. Calculate Your Personal 5-Year Savings at NISER
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Adjust your monthly dining mess and personal pocket expenses below to estimate net financial savings.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-300">Estimated Monthly Mess Food Fee:</span>
                      <span className="text-emerald-400">₹{messFeeMonthly} / month</span>
                    </div>
                    <input
                      type="range"
                      min={2500}
                      max={4500}
                      step={100}
                      value={messFeeMonthly}
                      onChange={(e) => setMessFeeMonthly(parseInt(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>₹2,500 (Basic)</span>
                      <span>₹3,500 (Average)</span>
                      <span>₹4,500 (Special)</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-300">Personal Pocket Expenses:</span>
                      <span className="text-indigo-400">₹{personalMonthlyExpense} / month</span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={3000}
                      step={100}
                      value={personalMonthlyExpense}
                      onChange={(e) => setPersonalMonthlyExpense(parseInt(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>₹500</span>
                      <span>₹1,500</span>
                      <span>₹3,000</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/10 border border-white/15 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs text-indigo-300 font-bold uppercase tracking-wider">Annual Net Balance</div>
                    <div className="text-3xl font-black text-emerald-400">
                      +₹{netAnnualSavings.toLocaleString("en-IN")} <span className="text-xs font-normal text-slate-300">Saved / Year</span>
                    </div>
                    <div className="text-xs text-slate-300 pt-1">
                      Total 5-Year Integrated M.Sc. Savings:
                    </div>
                    <div className="text-2xl font-black text-white">
                      ₹{fiveYearTotalSavings.toLocaleString("en-IN")}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300 border-t border-white/10 pt-3">
                    ✨ <strong>Result</strong>: You graduate with an internationally recognized Master’s degree without spending a single rupee of parental savings.
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: 300-Acre Campus Infrastructure */}
            <section id="section-campus" className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-purple-700">
                <MapPin className="h-4 w-4 text-purple-600" />
                <span>World-Class Research Infrastructure</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                4. The 300-Acre Jatni Campus: Research Labs, Hostels & Life
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Located in Jatni near Bhubaneswar, the 300-acre permanent NISER campus is built on the foothills of the scenic Barunei Hills. It is equipped with advanced equipment that surpasses almost every generic university in India:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                    <Microscope className="h-5 w-5" />
                    <span>Premier Scientific Instrumentation</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                    <li><strong>High-Field NMR Facility</strong>: 700 MHz & 400 MHz spectrometers.</li>
                    <li><strong>Electron Microscopy</strong>: HR-TEM (Transmission) & FE-SEM.</li>
                    <li><strong>X-Ray Diffraction</strong>: Single-Crystal & Powder XRD instruments.</li>
                    <li><strong>Ultrafast Laser Facility</strong>: Femtosecond transient absorption setup.</li>
                    <li><strong>Low Temperature Cryogenics</strong>: Liquid Helium facilities (&lt; 2 Kelvin).</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-purple-700 font-bold text-sm">
                    <Cpu className="h-5 w-5" />
                    <span>High-Performance Computing Cluster</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                    <li>100+ Teraflop dedicated supercomputing cluster for theoretical physics, quantum chemistry, and bioinformatics simulations.</li>
                    <li>Gigabit optical fiber backbone connected to the National Knowledge Network (NKN).</li>
                    <li>1 Gbps LAN connectivity in all individual hostel rooms.</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <strong className="text-slate-900 block font-bold">Residential Hostels</strong>
                  <p className="text-slate-600">Single and twin rooms with private balconies, 24/7 water/power, automatic laundry units, and common study spaces.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <strong className="text-slate-900 block font-bold">Central Library</strong>
                  <p className="text-slate-600">5-story facility with 24/7 reading halls, digital repository, and full subscription to Nature, Science, ACS, and IEEE.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <strong className="text-slate-900 block font-bold">Sports & Health</strong>
                  <p className="text-slate-600">Olympic-size football ground, indoor badminton courts, lawn tennis, multi-gym, and 24/7 on-campus health center with ambulance.</p>
                </div>
              </div>
            </section>

            {/* Section 5: Direct BARC Recruitment */}
            <section id="section-barc" className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-amber-700">
                <Briefcase className="h-4 w-4 text-amber-600" />
                <span>Government Career Fast-Track</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                5. Direct Selection into BARC as Scientific Officer (Group A)
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                One of the most unique advantages of joining NISER or CEBS is the <strong>Direct DAE Fast-Track</strong>. Every year, over 50,000 engineering and science graduates write the grueling nationwide GATE and OCES screening tests to join the Bhabha Atomic Research Centre (BARC).
              </p>

              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                <h3 className="text-base font-bold text-amber-950 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-amber-600" />
                  The CGPA ≥ 7.5 Direct Interview Privilege
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Integrated M.Sc. graduates from NISER and CEBS with a <strong>CGPA ≥ 7.5</strong> are completely exempted from the written screening test. They are called directly for the final selection interview conducted by the DAE Expert Board.
                </p>
                <div className="pt-2 border-t border-amber-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800">
                  <div><strong>Designation:</strong> Scientific Officer (SO/C or SO/D)</div>
                  <div><strong>Pay Scale:</strong> Level 10 (7th CPC) ₹56,100 Basic</div>
                  <div><strong>Starting Compensation:</strong> ₹14.5+ Lakhs CTC + Allowances</div>
                  <div><strong>Posting Units:</strong> BARC, IGCAR, RRCAT, VECC, NPCIL</div>
                </div>
              </div>
            </section>

            {/* Section 6: Global PhD Placements */}
            <section id="section-phd" className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-indigo-700">
                <Globe2 className="h-4 w-4 text-indigo-600" />
                <span>International Research Placements</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                6. Global Top-50 Universities PhD Admissions
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Over <strong>60% of NISER and CEBS graduates</strong> choose to pursue fully funded doctoral research abroad. Because NISER’s curriculum involves a full 1-year master’s research thesis with published peer-reviewed papers, global university admission committees hold NISER degrees in extremely high regard.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                {[
                  "Harvard University (USA)",
                  "MIT (USA)",
                  "Stanford University (USA)",
                  "Max Planck Institutes (Germany)",
                  "University of Cambridge (UK)",
                  "University of Oxford (UK)",
                  "Caltech (USA)",
                  "ETH Zurich (Switzerland)",
                  "Princeton University (USA)",
                  "IISc Bangalore (India)",
                  "TIFR Mumbai (India)",
                  "EPFL (Switzerland)"
                ].map((uni, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 text-center flex items-center justify-center">
                    {uni}
                  </div>
                ))}
              </div>
            </section>

            {/* Section 7: NISER vs CEBS Comparison */}
            <section id="section-comparison" className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                <Layers className="h-4 w-4 text-slate-600" />
                <span>Head-to-Head Evaluation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                7. NISER Bhubaneswar vs UM-DAE CEBS Mumbai Comparison
              </h2>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm text-slate-600">
                  <thead className="bg-slate-50 font-bold text-slate-700 uppercase text-[11px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3.5">Parameter</th>
                      <th className="px-5 py-3.5">NISER Bhubaneswar</th>
                      <th className="px-5 py-3.5">UM-DAE CEBS Mumbai</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-5 py-3 font-semibold text-slate-900">Total Seat Intake</td>
                      <td className="px-5 py-3 font-bold text-indigo-600">~200 Seats</td>
                      <td className="px-5 py-3 font-bold text-purple-600">~57 Seats</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-semibold text-slate-900">Campus Setting</td>
                      <td className="px-5 py-3">300-Acre integrated campus in Jatni</td>
                      <td className="px-5 py-3">University of Mumbai Kalina campus</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-semibold text-slate-900">Monthly Stipend</td>
                      <td className="px-5 py-3 font-bold text-emerald-600">₹5,000 / month (₹60k/yr)</td>
                      <td className="px-5 py-3 font-bold text-emerald-600">₹5,000 / month (₹60k/yr)</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-semibold text-slate-900">Summer Contingency Grant</td>
                      <td className="px-5 py-3 font-bold text-emerald-600">₹20,000 / year</td>
                      <td className="px-5 py-3 font-bold text-emerald-600">₹20,000 / year</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-semibold text-slate-900">Degree Awarding Body</td>
                      <td className="px-5 py-3">Homi Bhabha National Institute (HBNI)</td>
                      <td className="px-5 py-3">University of Mumbai & DAE</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-semibold text-slate-900">Direct BARC Selection</td>
                      <td className="px-5 py-3">Yes (CGPA ≥ 7.5)</td>
                      <td className="px-5 py-3">Yes (CGPA ≥ 7.5)</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-semibold text-slate-900">Major Research Neighbors</td>
                      <td className="px-5 py-3">IOP Bhubaneswar, IIT BBS, AIIMS BBS</td>
                      <td className="px-5 py-3">BARC Trombay, TIFR Colaba, IIT Bombay</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 8: Preparation Roadmap */}
            <section id="section-strategy" className="space-y-5 bg-gradient-to-br from-indigo-50 to-slate-50 p-6 sm:p-8 rounded-3xl border border-indigo-100 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-indigo-700">
                <Target className="h-4 w-4 text-indigo-600" />
                <span>Action Plan</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                8. How to Qualify for NEST & Secure Your NISER Seat
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                To win a seat at NISER Bhubaneswar and claim the ₹80,000 fellowship, you must clear two essential thresholds in the **National Entrance Screening Test (NEST)**:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <div className="text-xs sm:text-sm text-slate-700">
                    <strong>Clear SMAS in all 4 subjects</strong>: You must score at least 5–8 marks in Physics, Chemistry, Math, and Biology individually. Failing sectional cutoff in any one subject disqualifies your rank.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <div className="text-xs sm:text-sm text-slate-700">
                    <strong>Target 120+ Marks out of 180 (Best 3 Subjects)</strong>: A score of 120+ gives a 99%+ percentile, guaranteeing admission into NISER in Round 1.
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/nest-pyq-chapter-wise"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-200"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Solve Chapter-Wise NEST PYQs</span>
                </Link>

                <Button
                  onClick={handleStartPrep}
                  variant="outline"
                  className="w-full sm:w-auto rounded-xl text-xs font-bold py-3"
                >
                  Launch Free CBT Mock Test
                </Button>
              </div>
            </section>

            {/* Section 9: Detailed FAQs */}
            <section id="section-faqs" className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  9. Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Official rules regarding DISHA disbursement, campus life, and seat allocation.
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
                      >
                        <span className="text-sm sm:text-base">{faq.question}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-indigo-600" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
