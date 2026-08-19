import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getEffectivePlan } from "@/lib/payment/plans";

export const dynamic = "force-dynamic";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_live_TRW5i6BZ16XicD",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "0YOWF0HGPri34sKKFiuqnR91",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { planId = "six_month", email, userId } = body;

    const plan = getEffectivePlan(planId);
    if (!plan) {
      return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID || "rzp_live_TRW5i6BZ16XicD";
    const amountInPaise = plan.price * 100;

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `nest_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      notes: {
        planId: plan.id,
        planName: plan.name,
        email: email || "anonymous@sciprep.in",
        userId: userId || "guest",
        app: "SciPrep",
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      key: keyId,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      plan: {
        id: plan.id,
        name: plan.name,
        price: plan.price,
        period: plan.period,
      },
    });
  } catch (error: any) {
    console.error("[Razorpay create-order error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create payment order" },
      { status: 500 }
    );
  }
}
