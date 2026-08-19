"use client";

import React, { useState, useEffect } from "react";
import {
  Crown,
  Check,
  ShieldCheck,
  Zap,
  Target,
  FileText,
  BookOpen,
  ArrowLeft,
  CreditCard,
  Loader2,
  AlertCircle,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { isPro, setPlanLocally, getCurrentUser } from "@/lib/auth/authGuard";
import { SUBSCRIPTION_PLANS, SubscriptionPlan } from "@/lib/payment/plans";

interface SubscriptionViewProps {
  onBackToDashboard: () => void;
}

// Dynamically load Razorpay script
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function SubscriptionView({ onBackToDashboard }: SubscriptionViewProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<"monthly" | "six_month" | "annual">("six_month");
  const [isProUser, setIsProUser] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsProUser(isPro());
    loadRazorpayScript();

    const handlePlanUpdate = () => {
      setIsProUser(isPro());
    };
    window.addEventListener("nest_plan_updated", handlePlanUpdate);
    return () => window.removeEventListener("nest_plan_updated", handlePlanUpdate);
  }, []);

  const handleSubscribe = async (planId: "monthly" | "six_month" | "annual") => {
    setSelectedPlanId(planId);
    setIsProcessing(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      setErrorMessage("Razorpay payment gateway failed to load. Please check your network connection.");
      setIsProcessing(false);
      return;
    }

    try {
      const user = getCurrentUser();
      const plan = SUBSCRIPTION_PLANS[planId];

      // 1. Create order
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: planId,
          email: user.email,
          userId: user.name,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || "Order creation failed");
      }

      // 2. Open Razorpay Checkout Modal
      const options = {
        key: orderData.key || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_TRUy5H8A8WKDNm",
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        order_id: orderData.order_id,
        name: "SciPrep",
        description: `SciPrep PRO — ${plan.name} (${plan.period})`,
        image: "/icons/icon-192.png",
        prefill: {
          name: user.name !== "Aspirant" ? user.name : "",
          email: user.email || "",
        },
        handler: async function (response: any) {
          try {
            setIsProcessing(true);
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planId: planId,
                email: user.email,
                userId: user.name,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setPlanLocally("PRO");
              setSuccessMessage(`🎉 Welcome to SciPrep PRO! Your ${plan.name} subscription is now active.`);
            } else {
              setErrorMessage(verifyData.error || "Payment verification failed.");
            }
          } catch (vErr: any) {
            console.error("Verification error:", vErr);
            setErrorMessage("Payment completed but verification failed. Support: weborbitsolutions0@gmail.com");
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
        theme: { color: "#4F46E5" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (resp: any) {
        console.error("Payment failed:", resp);
        setErrorMessage(resp.error?.description || "Payment was cancelled or failed");
        setIsProcessing(false);
      });
      rzp.open();
    } catch (err: any) {
      console.error("Subscription purchase error:", err);
      setErrorMessage(err.message || "Failed to initialize payment process");
      setIsProcessing(false);
    }
  };

  const plans = [
    SUBSCRIPTION_PLANS.monthly,
    SUBSCRIPTION_PLANS.six_month,
    SUBSCRIPTION_PLANS.annual,
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200/80">
        <div className="space-y-1">
          <button
            onClick={onBackToDashboard}
            className="text-xs font-bold text-[#4F46E5] hover:text-indigo-700 flex items-center gap-1.5 transition-colors cursor-pointer mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              SciPrep PRO Subscription
            </h1>
            {isProUser ? (
              <Badge className="bg-amber-100 text-amber-800 border-amber-300 font-black text-xs px-2.5 py-0.5">
                <Crown className="h-3.5 w-3.5 mr-1 fill-amber-500 text-amber-600" /> PRO ACTIVE
              </Badge>
            ) : (
              <Badge variant="outline" className="text-gray-500 font-bold text-xs">
                Free Tier Active
              </Badge>
            )}
          </div>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Unlock the complete NISER &amp; UM-DAE CEBS question bank, all 10+ CBT mocks, and 100+ chapter notes.
          </p>
        </div>

        {/* Current Plan Status Box */}
        <div className="p-3.5 bg-white rounded-2xl border border-gray-200 shadow-2xs flex items-center gap-3">
          <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
            isProUser ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"
          }`}>
            <Crown className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Current Membership
            </span>
            <span className="text-xs font-black text-gray-900">
              {isProUser ? "SciPrep PRO All-Access 👑" : "Free Plan (1 Mock • 1 PYQ)"}
            </span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold flex items-center gap-2 animate-in fade-in">
          <Sparkles className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          const isPopular = plan.popular;

          return (
            <div
              key={plan.id}
              className={`bg-white rounded-3xl p-6 border-2 transition-all flex flex-col justify-between space-y-6 relative ${
                isPopular
                  ? "border-[#4F46E5] shadow-xl shadow-indigo-100/50 bg-linear-to-b from-white to-indigo-50/20"
                  : "border-gray-200 hover:border-gray-300 shadow-2xs"
              }`}
            >
              {/* Badge if Popular or Best Value */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-[10px] px-3 py-1 shadow-md">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <div className="space-y-4">
                {/* Plan Header */}
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-gray-900">{plan.name}</h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="py-3 border-y border-gray-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-gray-900">₹{plan.price}</span>
                    {plan.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">₹{plan.originalPrice}</span>
                    )}
                    <span className="text-xs text-gray-500 font-semibold">/ {plan.period}</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 block mt-1">
                    {plan.savingsText}
                  </span>
                </div>

                {/* Feature List */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                    What&apos;s Included:
                  </span>
                  <ul className="space-y-2">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-700 font-medium leading-snug">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Button
                  disabled={isProcessing}
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full h-12 font-black text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isPopular
                      ? "bg-gradient-to-r from-amber-500 to-[#4F46E5] hover:from-amber-600 hover:to-indigo-700 text-white shadow-indigo-200"
                      : "bg-[#4F46E5] hover:bg-indigo-700 text-white"
                  }`}
                >
                  {isProcessing && selectedPlanId === plan.id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Opening Razorpay…</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 text-amber-200" />
                      <span>{plan.ctaLabel}</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="p-6 bg-linear-to-r from-indigo-50/70 via-purple-50/50 to-amber-50/50 rounded-3xl border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-gray-900">Official Razorpay Secured Checkout</h4>
            <p className="text-[11px] text-gray-500 font-medium">
              Supports UPI (GPay, PhonePe, Paytm), All Major Debit/Credit Cards, Net Banking &amp; Wallets.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 text-xs font-bold text-indigo-700">
          <span>Support: weborbitsolutions0@gmail.com</span>
        </div>
      </div>
    </div>
  );
}
