export interface SubscriptionPlan {
  id: "monthly" | "six_month" | "annual";
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
  monthly: {
    id: "monthly",
    name: "Pro Monthly",
    price: 399,
    originalPrice: null,
    period: "1 month",
    durationDays: 30,
    savingsText: "Standard Monthly Plan",
    popular: false,
    ctaLabel: "Get 1 Month Pro",
    description: "Flexible access for quick revision and focused 30-day exam prep.",
    features: [
      "All 10+ Full-Length NEST CBT Pattern Mocks",
      "Unlimited Official 2018–2024 PYQ Papers with Solutions",
      "100+ Chapter Smart Lessons & High-Yield Notes",
      "Interactive Multi-Step Concept Explanations",
      "AI Diagnostic Error Breakdown & Weak-Area Insights",
      "Real-Time CBT Interface with Section Switching",
    ],
  },
  six_month: {
    id: "six_month",
    name: "Pro Premium",
    price: 499,
    originalPrice: 999,
    period: "6 months",
    durationDays: 180,
    badge: "MOST POPULAR 🔥",
    savingsText: "Save ₹1,895 vs monthly (50% OFF)",
    popular: true,
    ctaLabel: "Start 6 Month Pro",
    description: "Best choice for comprehensive semester-long NEST 2026/2027 prep.",
    features: [
      "All 10+ Full-Length NEST CBT Pattern Mocks",
      "Unlimited Official 2018–2024 PYQ Papers with Solutions",
      "100+ Chapter Smart Lessons & High-Yield Notes",
      "Interactive Multi-Step Concept Explanations",
      "AI Diagnostic Error Breakdown & Weak-Area Insights",
      "Real-Time CBT Interface with Section Switching",
      "Adaptive Spaced Revision Planner & Reminders",
      "Predicted NEST Rank & Category Percentile Index",
      "Priority Student Email Support",
    ],
  },
  annual: {
    id: "annual",
    name: "Pro Annual",
    price: 899,
    originalPrice: 1499,
    period: "1 year",
    durationDays: 365,
    badge: "BEST VALUE 👑",
    savingsText: "Save ₹3,889 vs monthly (40% OFF)",
    popular: false,
    ctaLabel: "Get 1 Year Annual Pro",
    description: "Complete peace of mind for the entire admission and counseling cycle.",
    features: [
      "All 10+ Full-Length NEST CBT Pattern Mocks",
      "Unlimited Official 2018–2024 PYQ Papers with Solutions",
      "100+ Chapter Smart Lessons & High-Yield Notes",
      "Interactive Multi-Step Concept Explanations",
      "AI Diagnostic Error Breakdown & Weak-Area Insights",
      "Real-Time CBT Interface with Section Switching",
      "Adaptive Spaced Revision Planner & Reminders",
      "Predicted NEST Rank & Category Percentile Index",
      "Priority 1-on-1 Academic Support",
      "NISER & UM-DAE CEBS Cutoff Analytics & Predictor",
    ],
  },
};

export function getEffectivePlan(planId: string): SubscriptionPlan {
  return SUBSCRIPTION_PLANS[planId] || SUBSCRIPTION_PLANS.six_month;
}
