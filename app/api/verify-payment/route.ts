import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/lib/supabase/client";
import { getEffectivePlan } from "@/lib/payment/plans";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId = "six_month",
      email,
      userId,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Missing required payment signature fields" },
        { status: 400 }
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || "2RHQoo6poMXEaGyx7YOCgrY1";
    const signPayload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(signPayload)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.warn(`[Razorpay Signature Mismatch]: order=${razorpay_order_id}, payment=${razorpay_payment_id}`);
      return NextResponse.json(
        { success: false, error: "Payment verification signature mismatch" },
        { status: 400 }
      );
    }

    const effectivePlan = getEffectivePlan(planId);

    // Save payment log & upgrade user in Supabase in background (safe against UUID mismatch)
    try {
      const isValidUUID = typeof userId === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId);

      if (isValidUUID) {
        await supabase
          .from("user_settings")
          .upsert({
            user_id: userId,
            plan: "PRO",
            updated_at: new Date().toISOString(),
          });
      } else if (email) {
        const { data: foundUser } = await supabase
          .from("user_settings")
          .select("user_id")
          .eq("email", email)
          .maybeSingle();

        if (foundUser?.user_id) {
          await supabase
            .from("user_settings")
            .update({
              plan: "PRO",
              updated_at: new Date().toISOString(),
            })
            .eq("user_id", foundUser.user_id);
        }
      }

      await supabase.from("payments").insert({
        user_id: isValidUUID ? userId : null,
        email: email || null,
        plan_id: planId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount: effectivePlan.price * 100,
        currency: "INR",
        status: "captured",
      });
    } catch (dbErr) {
      console.warn("[Verify-Payment DB record warning]:", dbErr);
    }

    return NextResponse.json({
      success: true,
      plan: "PRO",
      isPro: true,
      planId: planId,
      message: "Payment successfully verified and PRO access unlocked!",
    });
  } catch (error: any) {
    console.error("[Razorpay verify-payment error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error during verification" },
      { status: 500 }
    );
  }
}
