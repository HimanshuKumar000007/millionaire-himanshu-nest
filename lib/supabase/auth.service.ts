"use client";
/**
 * auth.service.ts
 * Thin wrapper around Supabase Auth — email/password + magic link.
 * All calls return { data, error } so callers can handle failures gracefully.
 */
import { supabase } from "@/lib/supabase/client";

export const authService = {
  /** Sign up with email + password */
  async signUp(email: string, password: string, name: string) {
    let res: any = { data: null, error: null };
    try {
      res = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
    } catch (e: any) {
      res.error = e;
    }

    // Always store auth credentials and tokens locally so user is immediately logged in
    const token = res.data?.session?.access_token || `nest_tk_${btoa(email)}_${Date.now()}`;
    localStorage.setItem("NEST_TOKEN", token);
    localStorage.setItem("NEST_PLAN", "FREE");
    localStorage.setItem("currentUser", name);
    localStorage.setItem("nest_user_name", name);
    localStorage.setItem("nest_user_email", email);

    if (res.data?.user) {
      try {
        await supabase.from("profiles").upsert({
          id: res.data.user.id,
          email,
          full_name: name,
          onboarding_complete: false,
        });
        await supabase.from("user_settings").upsert({
          user_id: res.data.user.id,
          name,
          email,
          signup_date: new Date().toISOString(),
        });
      } catch (_) {}
    }
    return res;
  },

  /** Sign in with email + password */
  async signIn(email: string, password: string) {
    let res: any = { data: null, error: null };
    try {
      res = await supabase.auth.signInWithPassword({ email, password });
    } catch (e: any) {
      res.error = e;
    }

    const token = res.data?.session?.access_token || `nest_tk_${btoa(email)}_${Date.now()}`;
    localStorage.setItem("NEST_TOKEN", token);
    localStorage.setItem("nest_user_email", email);

    if (res.data?.user?.user_metadata?.full_name) {
      localStorage.setItem("currentUser", res.data.user.user_metadata.full_name);
      localStorage.setItem("nest_user_name", res.data.user.user_metadata.full_name);
    }
    // Re-sync plan
    if (res.data?.user?.id) {
      try {
        const { data: settings } = await supabase
          .from("user_settings")
          .select("name, is_pro")
          .eq("user_id", res.data.user.id)
          .single();
        if (settings) {
          const plan = settings.is_pro ? "PRO" : "FREE";
          localStorage.setItem("NEST_PLAN", plan);
          localStorage.setItem("nest_user_is_pro", String(settings.is_pro));
          if (settings.name) {
            localStorage.setItem("currentUser", settings.name);
            localStorage.setItem("nest_user_name", settings.name);
          }
        }
      } catch (_) {}
    }
    return res;
  },

  /** Send magic link */
  async sendMagicLink(email: string) {
    return supabase.auth.signInWithOtp({ email });
  },

  /** Sign out completely from Supabase and clear all local sessions */
  async signOut() {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn("Supabase signOut warning:", e);
    }
    try {
      localStorage.removeItem("NEST_TOKEN");
      localStorage.removeItem("NEST_PLAN");
      localStorage.removeItem("NEST_PLAN_SYNCED_AT");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("nest_auth_token");
      localStorage.removeItem("nest_user_session");
      localStorage.removeItem("nest_user_name");
      localStorage.removeItem("nest_user_email");
      localStorage.removeItem("nest_user_is_pro");
      localStorage.removeItem("nest-smartprep-onboarding");
    } catch (e) {
      console.warn("Local storage cleanup warning:", e);
    }
  },

  /** Get current session (sync) */
  async getSession() {
    return supabase.auth.getSession();
  },

  /** Get current user */
  async getUser() {
    return supabase.auth.getUser();
  },

  /** Subscribe to auth state changes */
  onAuthStateChange(callback: Parameters<typeof supabase.auth.onAuthStateChange>[0]) {
    return supabase.auth.onAuthStateChange(callback);
  },
};
