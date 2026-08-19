"use client";

/**
 * authGuard.ts — Authentication & Plan helpers based on IISER SmartPrep structure.
 * Single source of truth for token access, plan status, and route guarding.
 */

import { supabase } from "@/lib/supabase/client";

export const AUTH_KEYS = {
  TOKEN: "NEST_TOKEN",
  PLAN: "NEST_PLAN",
  CURRENT_USER: "currentUser",
  EMAIL: "nest_user_email",
  NAME: "nest_user_name",
  IS_PRO: "nest_user_is_pro",
  PLAN_SYNCED_AT: "NEST_PLAN_SYNCED_AT",
} as const;

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem(AUTH_KEYS.TOKEN);
  if (token) return token;

  // Fallback: If user has an email or existing session stored, synthesize token and persist
  const email = localStorage.getItem(AUTH_KEYS.EMAIL) || localStorage.getItem("currentUser");
  if (email) {
    const fallbackToken = `nest_tk_${btoa(email)}_${Date.now()}`;
    localStorage.setItem(AUTH_KEYS.TOKEN, fallbackToken);
    return fallbackToken;
  }

  const legacyToken = localStorage.getItem("nest_auth_token") || localStorage.getItem("nest_user_session");
  if (legacyToken) {
    localStorage.setItem(AUTH_KEYS.TOKEN, legacyToken);
    return legacyToken;
  }

  return null;
}

export function getPlan(): "FREE" | "PRO" {
  if (typeof window === "undefined") return "FREE";
  const plan = localStorage.getItem(AUTH_KEYS.PLAN) || (localStorage.getItem(AUTH_KEYS.IS_PRO) === "true" ? "PRO" : "FREE");
  return plan.toUpperCase() === "PRO" ? "PRO" : "FREE";
}

export function isPro(): boolean {
  return getPlan() === "PRO";
}

/**
 * Updates the user's plan in localStorage and dispatches a global update event.
 * Also synchronizes with Supabase if the user is authenticated.
 */
export function setPlanLocally(plan: "FREE" | "PRO"): void {
  if (typeof window === "undefined") return;
  const isProBool = plan === "PRO";
  localStorage.setItem(AUTH_KEYS.PLAN, plan);
  localStorage.setItem(AUTH_KEYS.IS_PRO, String(isProBool));
  localStorage.setItem(AUTH_KEYS.PLAN_SYNCED_AT, String(Date.now()));

  // Dispatch custom event so all active views re-render
  window.dispatchEvent(new CustomEvent("nest_plan_updated", { detail: { plan, isPro: isProBool } }));

  // Background sync with Supabase
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session?.user?.id) {
      void supabase
        .from("user_settings")
        .upsert({
          user_id: session.user.id,
          plan: plan,
          updated_at: new Date().toISOString(),
        });
    }
  }).catch(() => {});
}

export function getCurrentUser(): { name: string; email: string; id: string } {
  if (typeof window === "undefined") return { name: "Aspirant", email: "", id: "guest" };
  const name = localStorage.getItem(AUTH_KEYS.NAME) || localStorage.getItem(AUTH_KEYS.CURRENT_USER) || "Aspirant";
  const email = localStorage.getItem(AUTH_KEYS.EMAIL) || localStorage.getItem("currentUser") || "";
  const id = localStorage.getItem("nest_user_id") || "guest";
  return { name, email, id };
}

/**
 * Ensures user is authenticated before accessing a page.
 * If not authenticated, redirects to /login with redirect URL parameter.
 */
export function requireLogin(redirectPath?: string): boolean {
  if (typeof window === "undefined") return false;
  const token = getToken();
  if (!token) {
    const currentUrl = encodeURIComponent(redirectPath || window.location.pathname + window.location.search);
    window.location.href = `/login?redirect=${currentUrl}`;
    return false;
  }
  return true;
}

/**
 * Guard for PRO features.
 */
export function requirePro(redirectPath?: string): boolean {
  if (!requireLogin(redirectPath)) return false;
  if (!isPro()) {
    if (typeof window !== "undefined") {
      alert("This feature is for PRO users only. Upgrade to unlock full access to all PYQs and CBT Mock Simulators.");
      window.location.href = "/dashboard#settings";
    }
    return false;
  }
  return true;
}

/**
 * Synchronize plan and profile from Supabase DB on login or protected page loads.
 */
export async function refreshPlanFromServer(): Promise<string> {
  if (typeof window === "undefined") return "FREE";
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      return getPlan();
    }

    // Set token
    localStorage.setItem(AUTH_KEYS.TOKEN, session.access_token);

    // Fetch user_settings from Supabase
    const { data, error } = await supabase
      .from("user_settings")
      .select("name, plan, email")
      .eq("user_id", session.user.id)
      .single();

    if (!error && data) {
      const plan = data.plan?.toUpperCase() === "PRO" ? "PRO" : "FREE";
      localStorage.setItem(AUTH_KEYS.PLAN, plan);
      localStorage.setItem(AUTH_KEYS.IS_PRO, String(plan === "PRO"));
      if (data.name) {
        localStorage.setItem(AUTH_KEYS.NAME, data.name);
        localStorage.setItem(AUTH_KEYS.CURRENT_USER, data.name);
      }
      if (data.email) {
        localStorage.setItem(AUTH_KEYS.EMAIL, data.email);
      }
      localStorage.setItem(AUTH_KEYS.PLAN_SYNCED_AT, String(Date.now()));
      return plan;
    }
  } catch (err) {
    console.warn("[authGuard] refreshPlanFromServer failed:", err);
  }
  return getPlan();
}
