/**
 * email.service.ts
 * Resend Email Service for SciPrep.
 * Uses Resend API for transactional emails (Password Reset, Welcome, Verification).
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  from = "SciPrep <onboarding@resend.dev>",
}: SendEmailParams) {
  const recipients = Array.isArray(to) ? to : [to];

  if (!RESEND_API_KEY) {
    console.warn("[Email Service] RESEND_API_KEY is not set. Skipping remote email dispatch.");
    return { success: false, reason: "NO_API_KEY" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: recipients,
      subject,
      html,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.error?.message || "Failed to send email via Resend.");
  }

  return data;
}

/**
 * Sends a branded password reset email to the user.
 */
export async function sendPasswordResetEmail(
  toEmail: string,
  resetUrl: string,
  userName?: string
) {
  const nameDisplay = userName ? `Hello ${userName},` : "Hello Aspirant,";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your SciPrep Password</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f8fc; margin: 0; padding: 24px; color: #111827;">
  <div style="max-width: 540px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; padding: 36px 32px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);">
    
    <!-- Logo & Header -->
    <div style="text-align: center; margin-bottom: 28px;">
      <div style="display: inline-block; background: linear-gradient(135deg, #4F46E5, #3730A3); padding: 10px 18px; border-radius: 12px; color: #ffffff; font-weight: 900; font-size: 18px; letter-spacing: -0.5px;">
        ⚛️ SciPrep
      </div>
      <p style="font-size: 11px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 1px; margin-top: 8px;">
        NEST Preparation Intelligence
      </p>
    </div>

    <!-- Main Message -->
    <h2 style="font-size: 22px; font-weight: 800; color: #111827; margin: 0 0 12px; text-align: center;">
      Password Reset Request
    </h2>
    
    <p style="font-size: 14px; line-height: 1.6; color: #4B5563; margin-bottom: 20px;">
      ${nameDisplay}
    </p>

    <p style="font-size: 14px; line-height: 1.6; color: #4B5563; margin-bottom: 24px;">
      We received a request to reset the password for your <strong>SciPrep</strong> account associated with <strong>${toEmail}</strong>. Click the button below to choose a new password:
    </p>

    <!-- Reset CTA Button -->
    <div style="text-align: center; margin: 32px 0;">
      <a href="${resetUrl}" style="background-color: #4F46E5; color: #ffffff; padding: 14px 28px; border-radius: 10px; font-weight: 700; font-size: 14px; text-decoration: none; display: inline-block; box-shadow: 0 4px 14px rgba(79, 70, 229, 0.3);">
        Reset Password →
      </a>
    </div>

    <p style="font-size: 12px; color: #6B7280; line-height: 1.5; margin-bottom: 16px;">
      Or copy and paste this link in your browser:
      <br>
      <a href="${resetUrl}" style="color: #4F46E5; word-break: break-all; font-size: 11px;">${resetUrl}</a>
    </p>

    <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 14px; margin-top: 24px;">
      <p style="font-size: 11px; color: #64748B; margin: 0; line-height: 1.5;">
        ⏱️ <strong>Note:</strong> This link will expire in <strong>1 hour</strong>. If you did not request a password reset, you can safely ignore this email; your account remains secure.
      </p>
    </div>

    <!-- Footer -->
    <div style="border-top: 1px solid #F1F5F9; margin-top: 32px; padding-top: 20px; text-align: center; font-size: 11px; color: #94A3B8;">
      <p style="margin: 0 0 4px;">© 2026 SciPrep. Dedicated preparation for NISER & CEBS.</p>
      <p style="margin: 0;">Support Desk: weborbitsolutions0@gmail.com</p>
    </div>

  </div>
</body>
</html>
  `.trim();

  return sendEmail({
    to: toEmail,
    subject: "Reset your SciPrep password",
    html,
  });
}
