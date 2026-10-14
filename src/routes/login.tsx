import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in · Gilded Pages" },
      { name: "description", content: "Sign in to your Gilded Pages reading journal." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user, loading, configured, signInWithPassword, signUp, signInWithGoogle, sendPasswordReset } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Already signed in? Go to the journal.
  useEffect(() => {
    if (!loading && user) void navigate({ to: "/" });
  }, [loading, user, navigate]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setNotice(null);
    setBusy(true);
    if (mode === "signin") {
      const message = await signInWithPassword(email.trim(), password);
      if (message) setError(message);
    } else {
      const result = await signUp(email.trim(), password);
      if (result.error) setError(result.error);
      else if (result.needsConfirmation) setNotice("Almost done! Check your email and click the link to confirm your account.");
    }
    setBusy(false);
  }

  async function onGoogle() {
    setError(null);
    const message = await signInWithGoogle();
    if (message) setError(message);
  }

  async function onForgot() {
    setError(null);
    setNotice(null);
    if (!email.trim()) { setError("Type your email above first, then click “Forgot password”."); return; }
    const message = await sendPasswordReset(email.trim());
    if (message) setError(message);
    else setNotice("If that email has an account, a reset link is on its way.");
  }

  return (
    <div className="pw-auth">
      <div className="pw-auth-card">
        <div className="pw-auth-brand">
          <img src="/logo.png" alt="" width={44} height={44} />
          <div><strong>gildedpages</strong><small>YOUR READING UNIVERSE</small></div>
        </div>
        <h1>{mode === "signin" ? "Welcome back" : "Start your journal"}</h1>
        <p className="pw-auth-sub">{mode === "signin" ? "Sign in to open your reading journal." : "Create an account to keep your books, notes and quotes safe."}</p>

        {!configured && <p className="pw-auth-error">Sign-in isn't set up yet. Add your Supabase keys to the <code>.env</code> file and restart.</p>}

        <button type="button" className="pw-auth-google" onClick={() => void onGoogle()} disabled={!configured}>
          <span className="pw-auth-g">G</span>Continue with Google
        </button>
        <div className="pw-auth-divider"><span>or use your email</span></div>

        <form onSubmit={(event) => void onSubmit(event)}>
          <label>Email
            <input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>Password
            <input type="password" required minLength={6} autoComplete={mode === "signin" ? "current-password" : "new-password"} value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          {error && <p className="pw-auth-error" role="alert">{error}</p>}
          {notice && <p className="pw-auth-notice" role="status">{notice}</p>}
          <button type="submit" className="pw-auth-button" disabled={busy || !configured}>
            {busy ? "One moment…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <div className="pw-auth-links">
          <button type="button" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); setNotice(null); }}>
            {mode === "signin" ? "New here? Create an account" : "Have an account? Sign in"}
          </button>
          {mode === "signin" && <button type="button" onClick={() => void onForgot()}>Forgot password?</button>}
        </div>
      </div>
    </div>
  );
}
