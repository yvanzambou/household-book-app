import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export async function register(name, email, password) {
  const hash = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hash]
    );
    return result.rows[0];
  } catch (e) {
    if (e.code === "23505") {
      throw new Error("Diese E-Mail-Adresse ist bereits registriert.");
    }
    throw e;
  }
}

export async function login(email, password) {
  const result = await pool.query(
    "SELECT id, name, email, password_hash FROM users WHERE email = $1",
    [email]
  );
  const user = result.rows[0];
  if (!user) throw new Error("E-Mail oder Passwort ist falsch.");

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) throw new Error("E-Mail oder Passwort ist falsch.");

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { user, token };
}
