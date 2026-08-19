"use client";
/**
 * useAuth — React hook for Supabase auth state.
 * - Tracks session / user
 * - On login: pulls remote data and merges into localStorage
 * - On logout: clears local progress data
 */
import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";
import { pullAllAndRestore } from "@/lib/supabase/sync.service";

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isLoggedIn: boolean;
  userName: string;
  userEmail: string;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [localAuth, setLocalAuth] = useState<{ isLoggedIn: boolean; name: string; email: string }>({
    isLoggedIn: false,
    name: "Aspirant",
    email: "",
  });

  useEffect(() => {
    // Read local cache immediately
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("NEST_TOKEN");
      const storedName = localStorage.getItem("nest_user_name") || localStorage.getItem("currentUser") || "";
      const storedEmail = localStorage.getItem("nest_user_email") || "";
      if (storedToken || storedEmail) {
        setLocalAuth({
          isLoggedIn: true,
          name: storedName || (storedEmail ? storedEmail.split("@")[0] : "Aspirant"),
          email: storedEmail,
        });
      }
    }

    // Get Supabase session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) {
        const fullName = data.session.user.user_metadata?.full_name;
        const email = data.session.user.email ?? "";
        if (fullName) {
          localStorage.setItem("nest_user_name", fullName);
          localStorage.setItem("currentUser", fullName);
        }
        if (email) {
          localStorage.setItem("nest_user_email", email);
        }
        setLocalAuth({
          isLoggedIn: true,
          name: fullName || (email ? email.split("@")[0] : "Aspirant"),
          email,
        });
        pullAllAndRestore().catch(() => {});
      }
      setLoading(false);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (event === "SIGNED_IN" && session?.user) {
        const fullName = session.user.user_metadata?.full_name;
        const email = session.user.email ?? "";
        if (fullName) {
          localStorage.setItem("nest_user_name", fullName);
          localStorage.setItem("currentUser", fullName);
        }
        if (email) {
          localStorage.setItem("nest_user_email", email);
        }
        setLocalAuth({
          isLoggedIn: true,
          name: fullName || (email ? email.split("@")[0] : "Aspirant"),
          email,
        });
        // Pull remote data → merge into localStorage
        await pullAllAndRestore();
      } else if (event === "SIGNED_OUT") {
        setLocalAuth({
          isLoggedIn: false,
          name: "Aspirant",
          email: "",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const resolvedIsLoggedIn = !!user || localAuth.isLoggedIn;
  const resolvedName =
    user?.user_metadata?.full_name ||
    localAuth.name ||
    (user?.email ? user.email.split("@")[0] : "Aspirant");
  const resolvedEmail = user?.email || localAuth.email;

  return {
    user,
    session,
    loading,
    isLoggedIn: resolvedIsLoggedIn,
    userName: resolvedName,
    userEmail: resolvedEmail,
  };
}

