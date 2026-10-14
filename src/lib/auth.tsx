import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "./supabase";

type SignUpResult = { error: string | null; needsConfirmation: boolean };

type AuthValue = {
  user: User | null;
  loading: boolean;
  configured: boolean;
  signInWithPassword: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string) => Promise<SignUpResult>;
  signInWithGoogle: () => Promise<string | null>;
  sendPasswordReset: (email: string) => Promise<string | null>;
  updatePassword: (password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthValue | null>(null);
const notConfigured = "Sign-in isn't set up yet. Add your Supabase keys to the .env file.";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    // Who is signed in right now?
    void supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    // Keep in sync when someone signs in or out (including in another tab).
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const value = useMemo<AuthValue>(
    () => ({
      user,
      loading,
      configured: isSupabaseConfigured,
      async signInWithPassword(email, password) {
        if (!supabase) return notConfigured;
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return error?.message ?? null;
      },
      async signUp(email, password) {
        if (!supabase) return { error: notConfigured, needsConfirmation: false };
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        // If email confirmation is switched on in Supabase, there is no session yet.
        return { error: error?.message ?? null, needsConfirmation: !error && !data.session };
      },
      async signInWithGoogle() {
        if (!supabase) return notConfigured;
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: window.location.origin },
        });
        return error?.message ?? null;
      },
      async sendPasswordReset(email) {
        if (!supabase) return notConfigured;
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        return error?.message ?? null;
      },
      async updatePassword(password) {
        if (!supabase) return notConfigured;
        const { error } = await supabase.auth.updateUser({ password });
        return error?.message ?? null;
      },
      async signOut() {
        if (supabase) await supabase.auth.signOut();
      },
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside <AuthProvider>");
  return value;
}
