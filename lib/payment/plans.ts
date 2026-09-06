export interface SubscriptionPlan {
  id: "annual";
  name: string;
  badge?: string;
  price: number;
  originalPrice?: number | null;
  period: string;
  durationDays: number;
  savingsText: string;
  popular: boolean;
  ctaLabel: string;
  description: string;
  features: string[];
}

export const SUBSCRIPTION_PLANS: Record<string, SubscriptionPlan> = {
  annual: {
    id: "annual",
    name: "SciPrep PRO 1-Year All-Access",
    price: 299,
    originalPrice: 999,
    period: "1 year",
    durationDays: 365,
    badge: "1-YEAR UNLIMITED ACCESS 🔥",
    savingsText: "Special Launch Price • Save 70%",
    popular: true,
    ctaLabel: "Get 1-Year Access for ₹299",
    description: "Complete unrestricted access to all NEST mocks, PYQs, lessons, and analytics for a full year.",
    features: [
      "All 10+ Full-Length NEST CBT Pattern Mocks",
      "Unlimited Official 2018–2025 PYQ Papers with Solutions",
      "100+ Chapter Smart Lessons & High-Yield Concept Notes",
      "Interactive Multi-Step Concept Explanations & Hints",
      "AI Diagnostic Error Breakdown & Weak-Area Insights",
      "Authentic CBT Exam Interface with Section Switching",
      "Adaptive Spaced Revision Planner & Reminders",
      "Predicted NEST Rank & Category Percentile Index",
      "NISER Bhubaneswar & UM-DAE CEBS Cutoff Analytics",
    ],
  },
};

export function getEffectivePlan(planId?: string): SubscriptionPlan {
  return SUBSCRIPTION_PLANS.annual;
}

