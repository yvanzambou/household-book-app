import pool from "../config/db.js";

export async function addTransaction(userId, { type, amount, category, date }) {
  const result = await pool.query(
    `INSERT INTO transactions (user_id, type, amount, category, date)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, user_id, type, amount, category, date`,
    [userId, type, amount, category, date || new Date()]
  );
  return result.rows[0];
}

export async function getTransactions(userId) {
  const result = await pool.query(
    "SELECT id, user_id, type, amount, category, date FROM transactions WHERE user_id = $1 ORDER BY date DESC",
    [userId]
  );
  return result.rows;
}