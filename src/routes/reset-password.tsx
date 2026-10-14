import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset password · Gilded Pages" }] }),
  component: ResetPasswordPage,
});

// People land here from the link in the "reset your password" email.
function ResetPasswordPage() {
  const { user, loading, updatePassword } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    const message = await updatePassword(password);
    setBusy(false);
    if (message) setError(message);
    else void navigate({ to: "/" });
  }

  return (
    <div className="pw-auth">
      <div className="pw-auth-card">
        <h1>Choose a new password</h1>
        {!loading && !user ? (
          <>
            <p className="pw-auth-sub">This link has expired or was already used. Ask for a new one from the sign-in page.</p>
            <button type="button" className="pw-auth-button" onClick={() => void navigate({ to: "/login" })}>Back to sign in</button>
          </>
        ) : (
          <form onSubmit={(event) => void onSubmit(event)}>
            <label>New password
              <input type="password" required minLength={6} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            {error && <p className="pw-auth-error" role="alert">{error}</p>}
            <button type="submit" className="pw-auth-button" disabled={busy || loading}>{busy ? "Saving…" : "Save new password"}</button>
          </form>
        )}
      </div>
    </div>
  );
}
