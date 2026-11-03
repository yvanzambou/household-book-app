import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { request } from "../api";
import { useAuth } from "../auth";
import AuthLayout from "../components/AuthLayout";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await request("/auth/login", { method: "POST", body: form });
      login(data.token, data.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Willkommen zurück" subtitle="Melde dich an, um dein Haushaltsbuch zu öffnen.">
      {error && <div className="alert-error mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label" htmlFor="email">E-Mail</label>
          <input id="email" type="email" name="email" value={form.email}
            onChange={handleChange} required autoComplete="email" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="password">Passwort</label>
          <input id="password" type="password" name="password" value={form.password}
            onChange={handleChange} required autoComplete="current-password" className="input" />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Wird angemeldet …" : "Anmelden"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Noch kein Konto?{" "}
        <Link to="/register" className="font-medium text-emerald-400 hover:underline">
          Jetzt registrieren
        </Link>
      </p>
    </AuthLayout>
  );
}
