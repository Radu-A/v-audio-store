import fs from "fs";
import path from "path";
import pool from "./db.js";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const folders = [];

const runSeed = async () => {
  const sqlPath = path.join(import.meta.dirname, "../sql/seed.sql");
  const content = fs.readFileSync(sqlPath, "utf8");
  const client = await pool.connect();

  try {
    const result = await client.query(content, folders);
    console.log(result);
  } catch (error) {
    console.error(`Error in connection with db: ${error}`);
  } finally {
    client.release();
    await pool.end();
  }
};

runSeed();
