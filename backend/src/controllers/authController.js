import { register, login } from "../services/authService.js";

export async function registerHandler(req, res) {
  const name = String(req.body.name ?? "").trim();
  const email = String(req.body.email ?? "").trim().toLowerCase();
  const password = String(req.body.password ?? "");

  if (!name) return res.status(400).json({ message: "Bitte gib deinen Namen ein." });
  if (!email) return res.status(400).json({ message: "Bitte gib eine E-Mail-Adresse ein." });
  if (password.length < 6) {
    return res.status(400).json({ message: "Das Passwort muss mindestens 6 Zeichen lang sein." });
  }

  try {
    const user = await register(name, email, password);
    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (e) {
    console.error(e);
    const known = e.message.startsWith("Diese E-Mail");
    res.status(known ? 400 : 500).json({
      message: known ? e.message : "Registrierung fehlgeschlagen.",
    });
  }
}

export async function loginHandler(req, res) {
  const email = String(req.body.email ?? "").trim().toLowerCase();
  const password = String(req.body.password ?? "");
  try {
    const { user, token } = await login(email, password);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
}
