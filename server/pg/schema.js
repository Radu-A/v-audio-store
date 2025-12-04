import fs from "fs";
import path from "path";
import pool from "./db.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runSchema = async () => {
  const client = await pool.connect();

  try {
    const sqlPath = path.join(__dirname, "../sql/schema.sql");

    console.log(`📂 Reading file from: ${sqlPath}`);

    const sqlContent = fs.readFileSync(sqlPath, "utf8");

    console.log("⏳ Running schema.sql...");

    await client.query(sqlContent);

    console.log("✅ Database reseted successfully.");
  } catch (error) {
    console.error("❌ Error al ejecutar el SQL:", error);
  } finally {
    client.release();
    await pool.end();
  }
};

runSchema();
