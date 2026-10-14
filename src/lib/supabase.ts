import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// These two values come from your .env file (see .env.example).
// The anon key is meant to be public: Row Level Security in the database protects the data.
const url = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
const anonKey = import.meta.env["VITE_SUPABASE_ANON_KEY"] as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

// Only created in the browser. On the server (SSR) this stays null.
export const supabase: SupabaseClient | null =
  isSupabaseConfigured && typeof window !== "undefined" ? createClient(url as string, anonKey as string) : null;
