import pool from "../config/db.js";

// amount::float8 -> Zahl statt String (pg liefert NUMERIC sonst als String)
const COLUMNS = "id, user_id, type, amount::float8 AS amount, category, note, date";

export async function addTransaction(userId, { type, amount, category, note, date }) {
  const result = await pool.query(
    `INSERT INTO transactions (user_id, type, amount, category, note, date)
     VALUES ($1, $2, $3, $4, $5, COALESCE($6::timestamptz, NOW()))
     RETURNING ${COLUMNS}`,
    [userId, type, amount, category, note, date || null]
  );
  return result.rows[0];
}

export async function getTransactions(userId) {
  const result = await pool.query(
    `SELECT ${COLUMNS} FROM transactions WHERE user_id = $1 ORDER BY date DESC, id DESC`,
    [userId]
  );
  return result.rows;
}

export async function getTransaction(userId, id) {
  const result = await pool.query(
    `SELECT ${COLUMNS} FROM transactions WHERE id = $1 AND user_id = $2`,
    [id, userId]
  );
  return result.rows[0] || null;
}

export async function updateTransaction(userId, id, { type, amount, category, note, date }) {
  const result = await pool.query(
    `UPDATE transactions
        SET type = $3, amount = $4, category = $5, note = $6,
            date = COALESCE($7::timestamptz, date)
      WHERE id = $1 AND user_id = $2
      RETURNING ${COLUMNS}`,
    [id, userId, type, amount, category, note, date || null]
  );
  return result.rows[0] || null;
}

export async function deleteTransaction(userId, id) {
  const result = await pool.query(
    "DELETE FROM transactions WHERE id = $1 AND user_id = $2",
    [id, userId]
  );
  return result.rowCount > 0;
}
