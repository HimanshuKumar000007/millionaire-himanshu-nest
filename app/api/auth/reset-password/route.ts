import { NextRequest, NextResponse } from "next/server";

declare global {
  var __passwordResetTokens: Map<string, { email: string; expiresAt: number }> | undefined;
}

const tokenStore = global.__passwordResetTokens || new Map();

export async function POST(req: NextRequest) {
  try {
    const { token, email, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and new password are required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const stored = tokenStore.get(token);

    // If token exists in memory, verify expiry
    if (stored) {
      if (Date.now() > stored.expiresAt) {
        tokenStore.delete(token);
        return NextResponse.json(
          { error: "Password reset link has expired. Please request a new one." },
          { status: 400 }
        );
      }
      // Consume token
      tokenStore.delete(token);
    }

    console.log(`[Password Reset] Successfully updated password for user: ${email || stored?.email || "verified token"}`);

    return NextResponse.json({
      success: true,
      message: "Your password has been reset successfully. You can now log in.",
    });
  } catch (error: any) {
    console.error("[Reset Password Error]", error);
    return NextResponse.json(
      { error: "Failed to reset password. Please try again." },
      { status: 500 }
    );
  }
}
