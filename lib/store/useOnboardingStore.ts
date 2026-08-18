import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  name: string;
  email: string;
  exam: "NEST";
  id?: string;
}

interface OnboardingStore {
  exam: "NEST";
  user: User | null;
  isLoggedIn: boolean;
  onboardingCompleted: boolean;
  setUser: (user: User | null) => void;
  signup: (name: string, email: string) => void;
  login: (email: string) => void;
  logout: () => void;
  setOnboardingCompleted: (completed: boolean) => void;
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      exam: "NEST",
      user: null,
      isLoggedIn: false,
      onboardingCompleted: false,
      setUser: (user) => set({ user, isLoggedIn: !!user }),
      signup: (name, email) =>
        set({
          user: { name, email, exam: "NEST", id: `nest_${Date.now()}` },
          isLoggedIn: true,
          onboardingCompleted: true,
        }),
      login: (email) =>
        set({
          user: {
            name: email.split("@")[0]
              ? email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1)
              : "Aspirant",
            email,
            exam: "NEST",
            id: `nest_${Date.now()}`,
          },
          isLoggedIn: true,
          onboardingCompleted: true,
        }),
      logout: () => set({ user: null, isLoggedIn: false, onboardingCompleted: false }),
      setOnboardingCompleted: (completed) => set({ onboardingCompleted: completed }),
    }),
    {
      name: "nest-smartprep-onboarding",
    }
  )
);
