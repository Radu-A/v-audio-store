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

const folders = [
  "PHOTOS_OVER_EAR_BASIC",
  "PHOTOS_OVER_EAR_PRO",
  "PHOTOS_OVER_EAR_ADVANCE",
  "PHOTOS_IN_EAR_BASIC",
  "PHOTOS_IN_EAR_PRO",
  "PHOTOS_PORTABLE_BASIC",
  "PHOTOS_PORTABLE_PRO",
  "PHOTOS_SOUNDBAR_BASIC",
  "PHOTOS_SOUNDBAR_PRO",
  "PHOTOS_HIFI_BASIC",
];

const runSeed = async () => {
  const sqlPath = path.join(import.meta.dirname, "../sql/seed.sql");
  const content = fs.readFileSync(sqlPath, "utf8");
  const client = await pool.connect();

  try {
    const result = await client.query(content);
    console.log(result);
  } catch (error) {
    console.error(`Error in connection with db: ${error}`);
  } finally {
    client.release();
    await pool.end();
  }
};

runSeed();
