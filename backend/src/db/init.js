import fs from "fs";
import path from "path";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function initDatabase() {
  try {
    const schemaPath = path.resolve("src/db/schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");

    console.log("⏳ INITIALISIERUNG DER DATANBANK...");

    const client = await pool.connect(); // <‑‑ wichtig!
    await client.query(schema);
    client.release();

    console.log("✅ DATENBANK INITIALISIERT");
  } catch (err) {
    console.error("❌ INITIALISIERUNG DER DATANBANK FEHLGESCHLAGEN:", err);
  }
}