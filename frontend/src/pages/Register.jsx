import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwörter stimmen nicht überein");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registrierung fehlgeschlagen");
        return;
      }

      setSuccess("Registrierung erfolgreich! Du kannst dich jetzt einloggen.");
      setForm({ email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setError("Serverfehler. Bitte später erneut versuchen.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Registrieren
        </h2>

        {error && (
          <p className="bg-red-600 text-white p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        {success && (
          <p className="bg-green-600 text-white p-2 rounded mb-4 text-center">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-300">E-Mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white mt-1"
            />
          </div>

          <div>
            <label className="text-gray-300">Passwort</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white mt-1"
            />
          </div>

          <div>
            <label className="text-gray-300">Passwort bestätigen</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold"
          >
            Registrieren
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Bereits ein Konto?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Jetzt einloggen
          </a>
        </p>
      </div>
    </div>
  );
}