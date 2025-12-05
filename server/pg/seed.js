import fs from "fs";
import path from "path";
import pool from "./db.js";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import { variants } from "./variantsData.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

const getPhotosBySlug = async (slug) => {
  console.log(`🔄 Connecting to folder: ${slug}...`);
  try {
    const result = await cloudinary.api.resources({
      folder: slug,
      fields: "public_id",
    });
    console.log(`The photos from ${slug} have been downloaded.`);
    return result;
  } catch (error) {
    console.error(`Error connecting to to folder: ${slug}... Error: ${error}`);
  }
};

const insertVariants = async () => {
  const client = await pool.connect();
  const query = `INSERT INTO public.product_variant (product_id, slug, color, price, photos, stock_quantity)
    VALUES ($1, $2, $3, $4, $5, $6)`;
  variants.forEach(async (variant) => {
    const data = await getPhotosBySlug(variant.slug);
    const publicIdArray = data.resources.map(async (item) => item.public_id);

    variant.photos = JSON.stringify(publicIdArray);
    try {
      const result = await client.query(query, [
        variant.id,
        variant.slug,
        variant.color,
        variant.price,
        variant.photos,
        variant.stock,
      ]);
      console.log(result);
    } catch (error) {
      console.error(
        `Something went wrong during data base connection: ${error}`
      );
    } finally {
      client.release();
      await pool.end();
    }
  });
};

runSeed();
insertVariants();
