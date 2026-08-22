'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Atom,
  FlaskConical,
  Calculator,
  BookOpen,
  ClipboardCheck,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Award,
  Clock,
  BookMarked,
  FileText,
  Bot,
  Zap,
  RotateCcw
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  target: string;
  badge: string;
  badgeColor: string;
  icon: React.ElementType;
  iconGradient: string;
  description: string;
  duration: string;
  studyResources: string;
  highlights: string[];
  price: string;
  originalPrice: string;
  curriculum: {
    physics: string[];
    chemistry: string[];
    maths: string[];
    biology: string[];
  };
}

const courses: Course[] = [
  {
    id: 'iat-complete-suite',
    title: 'IAT 2026 Complete Prep Suite',
    target: 'IISER Pune, Kolkata, Mohali, Bhopal, TVM, Tirupati, Berhampur & IISc',
    badge: 'Bestseller',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    icon: Atom,
    iconGradient: 'from-indigo-500 to-cyan-500',
    description:
      'The ultimate self-paced mastery ecosystem: High-Yield Smart Notes for PCMB, full CBT Mode Mocks, Quick Mocks, Chapter tests, solved PYQs and 24/7 AI Mentor assistance.',
    duration: 'Valid Till Exam 2026',
    studyResources: 'Smart Notes + 120+ CBT Mocks',
    highlights: [
      'Concise High-Yield Smart Notes for Physics, Chem, Math & Biology',
      '50 Full-Length CBT Mocks on authentic TCS-iON test simulator',
      '120+ Chapter-wise Mocks & 15-minute Quick Mocks for speed drills',
      '15+ Years Solved PYQ question archive with step-by-step explanations',
      '24/7 AI Science Mentor for instant doubts, hints & formula recall',
    ],
    price: '₹5,999',
    originalPrice: '₹12,999',
    curriculum: {
      physics: ['Quantum & Atomic Physics Smart Notes', 'Rotational Mechanics & Gravitation Chapter Mocks', 'Electrodynamics & Optics Speed Tests', 'Thermodynamics & Kinetic Theory PYQs'],
      chemistry: ['Physical Equilibrium & Kinetics Formulas', 'Organic Reaction Mechanisms & Roadmaps', 'Inorganic Coordination & Periodic Trends', 'Bio-molecules & Polymers Summary Notes'],
      maths: ['Calculus & Differential Equations Mocks', 'Coordinate Geometry & Vectors 3D Notes', 'Algebra & Complex Numbers Shortcut Sheets', 'Permutations, Probability & Matrices Tests'],
      biology: ['Cellular Biology & Genetics Mindmaps', 'Plant & Animal Physiology Smart Notes', 'Ecology & Evolution PYQs', 'High-Yield Biology for PCM Students Track'],
    },
  },
  {
    id: 'nest-cbt-pyq',
    target: 'NISER Bhubaneswar & UM-DAE CEBS Mumbai',
    title: 'NEST 2026 CBT & PYQ Pack',
    badge: 'High Rigor',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    icon: FlaskConical,
    iconGradient: 'from-cyan-500 to-teal-500',
    description:
      'Engineered specifically for NISER & CEBS entrance with sectional cutoff mastery, advanced research-tier Smart Notes, NEST CBT simulations and 24/7 AI Mentor support.',
    duration: 'Valid Till Exam 2026',
    studyResources: 'Smart Notes + 80+ CBT Mocks',
    highlights: [
      'Sectional Cut-Off Strategy & score maximization algorithm',
      '35 Full NEST CBT Mode Mocks with exact negative marking software',
      '90+ Chapter-wise concept test sprints for PCMB',
      '15-Year NEST Solved Previous Year Papers with verified keys',
      '24/7 AI Mentor trained on DAE & Olympiad science patterns',
    ],
    price: '₹4,999',
    originalPrice: '₹9,999',
    curriculum: {
      physics: ['Advanced Wave Optics & Wave Mechanics Notes', 'Electromagnetism & Circuit Laws Mocks', 'Thermal Physics & Statistical Concepts', 'Modern Physics & Nuclear Reactions PYQs'],
      chemistry: ['Thermodynamics & Electrochemistry Roadmaps', 'Advanced Organic Synthesis Smart Notes', 'Main Group & Transition Metals Flashcards', 'Spectroscopy Foundations'],
      maths: ['Real Analysis & Functions Chapter Mocks', 'Trigonometry & Calculus Mastery Sprints', 'Linear Algebra & Determinants Notes', 'Combinatorics & Probability PYQs'],
      biology: ['Genetics & Molecular Inheritance Mindmaps', 'Cell Structure & Biomolecules Notes', 'Human Physiology Speed Quizzes', 'Experimental Biology Reasoning'],
    },
  },
  {
    id: 'isi-cmi-pure-math',
    target: 'Indian Statistical Institute (B.Stat/B.Math) & CMI',
    title: 'ISI & CMI Math PYQ & Mocks',
    badge: 'Pure Math',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    icon: Calculator,
    iconGradient: 'from-purple-500 to-pink-500',
    description:
      'Rigorously structured for objective (UGA) and subjective proof-writing (UGB). Includes formal proof-writing Smart Notes, non-routine Chapter Mocks, and 20-year PYQ archives.',
    duration: 'Valid Till Exam 2026',
    studyResources: 'Proof Notes + 60+ Subjective Mocks',
    highlights: [
      'Step-by-step UGB Subjective Proof-Writing Smart Notes & Templates',
      '25 Full-Length UGA Objective + UGB Subjective CBT Mocks',
      'Non-routine Chapter Mocks (Number Theory, Combinatorics, Geometry)',
      '20+ Years Solved ISI Kolkata & CMI Chennai Archive',
      '24/7 AI Math Mentor for theorem validation & proof hints',
    ],
    price: '₹6,499',
    originalPrice: '₹14,999',
    curriculum: {
      physics: ['Fundamental Mechanics Principles for Math Aspirants'],
      chemistry: ['Physical Chemistry Mathematical Foundations'],
      maths: [
        'Number Theory: Modular Arithmetic, Diophantine Eq. Proofs',
        'Combinatorics & Pigeonhole Principle Smart Notes',
        'Polynomials, Functional Equations & Inequalities Mocks',
        'Euclidean & Analytical Geometry Proofs Archive',
        'Advanced Calculus & Infinite Series PYQs',
      ],
      biology: ['N/A (Pure Mathematics Specialization)'],
    },
  },
  {
    id: 'aits-test-series',
    target: 'All Science Aspirants (IAT, NEST, ISI)',
    title: 'All-India CBT Test Series (AITS 2026)',
    badge: '150+ Total Mocks',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    icon: ClipboardCheck,
    iconGradient: 'from-amber-500 to-orange-500',
    description:
      'The gold standard for exam simulation: Exact replica TCS-iON software, 40 Full CBT Mocks, 60 Quick Mocks (15/30 min), 100 Chapter Mocks, and All-India Rank benchmarks.',
    duration: 'Valid Till Exam 2026',
    studyResources: '150+ Mocks + AIR Analytics',
    highlights: [
      '40 Full-Length Mocks + 60 Quick Mocks + 100 Chapter Tests',
      'Accurate All-India Rank (AIR) benchmark against 10,000+ peers',
      'AI Question-by-Question time-management & accuracy analytics',
      'Complete step-by-step solutions for every single question',
      'Rank predictor with historical institute cutoff matching',
    ],
    price: '₹2,499',
    originalPrice: '₹4,999',
    curriculum: {
      physics: ['Full Syllabus CBT Tests 1-15', 'Mechanics & Electrodynamics Quick Drills'],
      chemistry: ['Full Syllabus CBT Tests 1-15', 'Organic & Inorganic Memory Recall Quizzes'],
      maths: ['Full Syllabus CBT Tests 1-15', 'High-Speed Calculus & Algebra Sectionals'],
      biology: ['Full Syllabus CBT Tests 1-15', 'Rapid NCERT-based Biology Drills'],
    },
  },
  {
    id: 'smart-notes-pyq-vault',
    target: 'PCM, PCB & PCMB Self-Study Students',
    title: 'Smart Notes & 15-Yr PYQ Vault',
    badge: 'High Yield',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    icon: BookOpen,
    iconGradient: 'from-emerald-500 to-teal-500',
    description:
      'Everything you need to revise and memorize high-yield science concepts fast: PCMB mindmaps, Organic reaction sheets, Formula cheat-sheets, and 15 years of solved PYQs.',
    duration: 'Lifetime Access',
    studyResources: '400+ Smart Note PDF Sheets',
    highlights: [
      'Comprehensive high-yield Smart Notes for Physics, Chem, Math & Bio',
      'Special "Biology Formula & Mindmap Kit" for PCM students',
      '15+ Years Solved PYQ papers with detailed reasoning',
      'Printable formula wall charts & reaction mechanism sheets',
      'Includes 24/7 AI Mentor integration for rapid doubt clearance',
    ],
    price: '₹1,999',
    originalPrice: '₹3,999',
    curriculum: {
      physics: ['Complete PCMB Formula Handbooks & Mindmaps'],
      chemistry: ['Organic Reaction Flowcharts & Inorganic Tables'],
      maths: ['Key Theorems, Graphs & Shortcut Formula Handbooks'],
      biology: ['High-Yield NCERT Diagram Sheets & Genetics Summary'],
    },
  },
  {
    id: 'ai-mentor-unlimited',
    target: '24/7 Instant Doubt Solving & Strategy',
    title: '24/7 AI Science Mentor Pro',
    badge: 'AI Powered',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    icon: Bot,
    iconGradient: 'from-sky-500 to-indigo-500',
    description:
      'Your personal science genius available 24/7. Ask any question in Physics, Chem, Math, or Biology to receive immediate step-by-step logic, formula recall, and mock diagnostics.',
    duration: 'Valid Till Exam 2026',
    studyResources: 'Unlimited 24/7 AI Doubts',
    highlights: [
      'Instant answers in < 1.5 seconds for complex PCMB questions',
      'First-principles conceptual reasoning without spoon-feeding answers',
      'Personalized weak-area diagnosis after every CBT or Quick Mock',
      'Custom daily revision schedules generated to fit your drop year',
      'Available anytime on web & mobile without waiting for office hours',
    ],
    price: '₹1,499',
    originalPrice: '₹3,499',
    curriculum: {
      physics: ['Instant Physics Derivations & Concept Queries'],
      chemistry: ['Mechanism Explanations & Equilibrium Calculations'],
      maths: ['Proof Hints, Calculus Integration Steps & Vectors'],
      biology: ['NCERT Concept Clarifications & Diagrammatic Explanations'],
    },
  },
];

interface CoursesProps {
  onOpenEnroll: (courseName: string) => void;
  onOpenTrial: () => void;
}

export function Courses({ onOpenEnroll, onOpenTrial }: CoursesProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'iiser' | 'nest' | 'isi'>('all');

  const filteredCourses = courses.filter((c) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'iiser') return c.id.includes('iat') || c.id.includes('aits') || c.id.includes('smart-notes');
    if (activeTab === 'nest') return c.id.includes('nest') || c.id.includes('aits') || c.id.includes('ai-mentor');
    if (activeTab === 'isi') return c.id.includes('isi') || c.id.includes('aits');
    return true;
  });

  return (
    <section id="courses" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Self-Paced Precision • Smart Notes, CBT Mocks & 24/7 AI Mentor
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4">
            Study Material Engineered for <span className="italic bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Science Ranks</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            No rigid lecture schedules. Learn at your own pace with concise Smart Notes, exact TCS-iON CBT Mocks, Quick Sprints, Chapter Tests, 15-Year PYQs, and an always-on 24/7 AI Mentor.
          </p>

          {/* Exam Filter Tabs */}
          <div className="mt-8 inline-flex p-1 rounded-2xl bg-[#12121A] border border-white/10 shadow-inner">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Programs
            </button>
            <button
              onClick={() => setActiveTab('iiser')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'iiser'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              IISER (IAT)
            </button>
            <button
              onClick={() => setActiveTab('nest')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'nest'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              NISER (NEST)
            </button>
            <button
              onClick={() => setActiveTab('isi')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'isi'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ISI & CMI
            </button>
          </div>
        </div>

        {/* Bento Grid: 3 Columns Desktop, 1 Column Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, idx) => {
            const Icon = course.icon;
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card rounded-3xl p-6 border border-white/10 hover:border-indigo-500/40 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden bg-[#12121A]/80 shadow-xl"
              >
                {/* Subtle top-right gradient spotlight on card hover */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />

                <div>
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${course.iconGradient} p-0.5 shadow-lg`}
                    >
                      <div className="w-full h-full bg-[#0A0A0F] rounded-[14px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full border ${course.badgeColor}`}
                    >
                      {course.badge}
                    </span>
                  </div>

                  {/* Title & Target */}
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors mb-1 font-heading">
                    {course.title}
                  </h3>
                  <div className="text-xs text-cyan-400 font-medium mb-3 flex items-center gap-1">
                    <span>Target:</span>
                    <span className="text-slate-300 line-clamp-1">{course.target}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-5 line-clamp-3">
                    {course.description}
                  </p>

                  {/* Metrics Pills */}
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-300 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="line-clamp-1">{course.studyResources}</span>
                    </div>
                  </div>

                  {/* Key Highlights Bullet points */}
                  <div className="space-y-2 mb-6">
                    {course.highlights.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer of Card: Price & Actions */}
                <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-slate-400 line-through mr-1.5">
                        {course.originalPrice}
                      </span>
                      <span className="text-2xl font-extrabold text-white font-heading">
                        {course.price}
                      </span>
                      <span className="text-[11px] text-slate-400 ml-1">/ full package</span>
                    </div>
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
                    >
                      Module Details
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="py-2.5 px-3 rounded-xl glass-panel hover:bg-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-all text-center cursor-pointer border border-white/10"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onOpenEnroll(course.title)}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 transition-all text-center cursor-pointer flex items-center justify-center gap-1 group/btn"
                    >
                      <span>Get Instant Access</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Course Detailed Syllabus & Blueprint Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl max-h-[88vh] overflow-y-auto glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl relative bg-[#12121A]"
            >
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${selectedCourse.badgeColor}`}>
                  {selectedCourse.badge}
                </span>
                <span className="text-xs text-cyan-400 font-medium">{selectedCourse.duration}</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 font-heading">{selectedCourse.title}</h3>
              <p className="text-xs text-slate-300 mb-6">{selectedCourse.description}</p>

              {/* Complete Highlights Checklist */}
              <div className="mb-6 bg-white/5 p-4 rounded-2xl border border-white/5">
                <h4 className="text-xs uppercase font-bold text-indigo-300 tracking-wider mb-3">
                  What is Included in this Package:
                </h4>
                <div className="space-y-2">
                  {selectedCourse.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subject Breakdown Tabs */}
              <div className="mb-6">
                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3">
                  Smart Notes & Test Modules Breakdown:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(selectedCourse.curriculum).map(([subj, topics]) => (
                    <div key={subj} className="p-3.5 rounded-xl bg-[#1A1A2E]/70 border border-white/5">
                      <div className="text-xs font-bold text-indigo-300 uppercase mb-2 flex items-center justify-between">
                        <span>{subj}</span>
                        <span className="text-[10px] text-slate-400">{topics.length} Units</span>
                      </div>
                      <ul className="space-y-1">
                        {topics.map((t, idx) => (
                          <li key={idx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-cyan-400" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Bottom CTA */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400">Total Program Investment</div>
                  <div className="text-2xl font-extrabold text-white font-heading">
                    {selectedCourse.price}{' '}
                    <span className="text-xs text-slate-400 line-through font-normal">
                      {selectedCourse.originalPrice}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setSelectedCourse(null);
                      onOpenTrial();
                    }}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl glass-panel text-xs font-semibold text-slate-200 hover:text-white cursor-pointer"
                  >
                    Try Free Sample
                  </button>
                  <button
                    onClick={() => {
                      const title = selectedCourse.title;
                      setSelectedCourse(null);
                      onOpenEnroll(title);
                    }}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Get Instant Access</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
