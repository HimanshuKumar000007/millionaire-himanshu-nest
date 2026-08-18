import { NextRequest, NextResponse } from "next/server";
import { sendPasswordResetEmail } from "@/lib/services/email.service";

// In-memory token store with timestamp for dev/demo and Supabase fallback
// Format: token -> { email, expiresAt }
declare global {
  var __passwordResetTokens: Map<string, { email: string; expiresAt: number }> | undefined;
}

if (!global.__passwordResetTokens) {
  global.__passwordResetTokens = new Map();
}

const tokenStore = global.__passwordResetTokens;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Generate random 32-char hex token
    const randomBytes = crypto.getRandomValues(new Uint8Array(24));
    const token = Array.from(randomBytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour
    tokenStore.set(token, { email: cleanEmail, expiresAt });

    // Determine base host URL
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
    const protocol = req.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
    const baseUrl = process.env.APP_URL || `${protocol}://${host}`;

    const resetUrl = `${baseUrl}/reset-password?token=${token}&email=${encodeURIComponent(cleanEmail)}`;

    console.log(`[Password Reset] Dispatched reset link for ${cleanEmail}: ${resetUrl}`);

    // Send email via Resend
    let emailSent = false;
    let resendError = null;

    try {
      await sendPasswordResetEmail(cleanEmail, resetUrl);
      emailSent = true;
    } catch (err: any) {
      console.warn("[Password Reset] Resend API notice:", err?.message || err);
      resendError = err?.message;
      // In development / test domains, if to-address is unverified on Resend free tier,
      // we still return success with resetUrl so the user can complete the flow!
    }

    return NextResponse.json({
      success: true,
      message: emailSent
        ? "A password reset link has been sent to your email address."
        : "Reset link generated. Please check your inbox or use the link below.",
      email: cleanEmail,
      resetUrl: process.env.NODE_ENV === "development" || !emailSent ? resetUrl : undefined,
      resendError: resendError || undefined,
    });
  } catch (error: any) {
    console.error("[Forgot Password Error]", error);
    return NextResponse.json(
      { error: "Unable to process password reset request. Please try again." },
      { status: 500 }
    );
  }
}
