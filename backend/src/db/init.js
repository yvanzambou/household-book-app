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

    console.log("⏳ Initializing database...");

    const client = await pool.connect(); // <‑‑ wichtig!
    await client.query(schema);
    client.release();

    console.log("✅ Database initialized");
  } catch (err) {
    console.error("❌ Database initialization failed:", err);
  }
}