import { useState } from "react";
import { Link } from "react-router-dom";
import { request } from "../api";
import AuthLayout from "../components/AuthLayout";

const EMPTY = { name: "", email: "", password: "", confirmPassword: "" };

export default function Register() {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Die Passwörter stimmen nicht überein.");
      return;
    }

    setLoading(true);
    try {
      await request("/auth/register", {
        method: "POST",
        body: { name: form.name, email: form.email, password: form.password },
      });
      setSuccess("Registrierung erfolgreich! Du kannst dich jetzt anmelden.");
      setForm(EMPTY);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Konto erstellen" subtitle="Starte jetzt mit deinem eigenen Haushaltsbuch.">
      {error && <div className="alert-error mb-4">{error}</div>}
      {success && (
        <div className="alert-success mb-4">
          {success}{" "}
          <Link to="/login" className="font-semibold underline">Zur Anmeldung</Link>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label" htmlFor="name">Name</label>
          <input id="name" type="text" name="name" value={form.name} onChange={handleChange}
            required maxLength={100} autoComplete="name" placeholder="Dein Vorname"
            className="input" />
        </div>
        <div>
          <label className="label" htmlFor="email">E-Mail</label>
          <input id="email" type="email" name="email" value={form.email}
            onChange={handleChange} required autoComplete="email" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="password">Passwort</label>
          <input id="password" type="password" name="password" value={form.password}
            onChange={handleChange} required minLength={6} autoComplete="new-password"
            placeholder="Mindestens 6 Zeichen" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="confirmPassword">Passwort bestätigen</label>
          <input id="confirmPassword" type="password" name="confirmPassword"
            value={form.confirmPassword} onChange={handleChange} required
            autoComplete="new-password" className="input" />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Wird registriert …" : "Registrieren"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Bereits ein Konto?{" "}
        <Link to="/login" className="font-medium text-emerald-400 hover:underline">
          Jetzt anmelden
        </Link>
      </p>
    </AuthLayout>
  );
}
