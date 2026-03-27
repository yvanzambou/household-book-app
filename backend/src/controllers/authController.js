import { register, login } from "../services/authService.js";

export async function registerHandler(req, res) {
  const { email, password } = req.body;
  try {
    const user = await register(email, password);
    res.status(201).json({ id: user.id, email: user.email });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

export async function loginHandler(req, res) {
  const { email, password } = req.body;
  try {
    const { user, token } = await login(email, password);
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
}