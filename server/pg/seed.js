import pool from "./db.js";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import {
  truncateQuery,
  mainCategoriesQuery,
  mainCategories,
  secondaryCategoriesQuery,
  secondaryCategories,
  productsQuery,
  products,
  variantsQuery,
  variants,
} from "./data.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ----------------------
// CLOUDINARY
// ----------------------
const getPhotosBySlug = async (slug) => {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: slug,
      max_results: 10,
    });
    return result;
  } catch (error) {
    console.error(`⚠️ Error Cloudinary ${slug}: ${error.message}`);
    return null;
  }
};

// ----------------------
// TRUNCATE
// ----------------------
const truncate = async () => {
  const client = await pool.connect();
  try {
    console.log("⏳ Cleaning tables...");
    await client.query(truncateQuery);
    console.log("✅ Tables cleaned.");
  } catch (e) {
    console.error("❌ Truncate error:", e);
    throw e;
  } finally {
    client.release();
  }
};

// ----------------------
// INSERTS
// ----------------------
const insertMainCategories = async () => {
  const client = await pool.connect();
  try {
    console.log("⏳ Iniciando inserción de categories_main...");
    for (const category of mainCategories) {
      process.stdout.write(`   Procesando ${category.name}... `);
      await client.query(mainCategoriesQuery, [
        category.name,
        category.slug,
        category.description,
      ]);
      console.log("✅ OK");
    }
  } catch (error) {
    console.error(`❌ Error durante la inserción de main categories: ${error}`);
  } finally {
    client.release();
  }
};

const insertSecondaryCategories = async () => {
  const client = await pool.connect();
  try {
    console.log("⏳ Iniciando inserción de categories_secondary...");
    for (const category of secondaryCategories) {
      process.stdout.write(`   Procesando ${category.name}... `);
      await client.query(secondaryCategoriesQuery, [
        category.main_id,
        category.name,
        category.slug,
        category.description,
      ]);
      console.log("✅ OK");
    }
  } catch (error) {
    console.error(
      `❌ Error durante la inserción de secondary categories: ${error}`
    );
  } finally {
    client.release();
  }
};

const insertProducts = async () => {
  const client = await pool.connect();
  try {
    console.log("⏳ Iniciando inserción de products...");
    for (const product of products) {
      process.stdout.write(`   Procesando ${product.name}... `);
      await client.query(productsQuery, [
        product.category_id,
        product.name,
        product.slug,
        product.price,
        product.short_description,
        product.description,
        product.feature_1,
        product.feature_2,
        product.feature_3,
        product.specs,
      ]);
      console.log("✅ OK");
    }
  } catch (error) {
    console.error(`❌ Error durante la inserción de products: ${error}`);
  } finally {
    client.release();
  }
};

const insertVariants = async () => {
  const client = await pool.connect();
  try {
    console.log("⏳ Iniciando inserción de variantes...");
    for (const variant of variants) {
      process.stdout.write(`   Procesando ${variant.slug}... `);
      const data = await getPhotosBySlug(variant.slug);
      let publicIdArray = [];
      if (data && data.resources) {
        publicIdArray = data.resources.map((item) => item.public_id);
      } else {
        console.warn(`(Sin fotos encontradas)`);
      }
      await client.query(variantsQuery, [
        variant.id,
        variant.slug,
        variant.color,
        variant.price,
        JSON.stringify(publicIdArray),
        variant.stock || 0,
      ]);
      console.log(`✅ OK`);
    }
    console.log("✨ ¡Todas las variantes insertadas correctamente!");
  } catch (error) {
    console.error(`❌ Error durante la inserción de variantes: ${error}`);
    throw error;
  } finally {
    client.release(); // Soltamos el cliente, PERO NO cerramos el pool
  }
};

// 3. LA MAGIA (El Orquestador)
const main = async () => {
  try {
    console.log("🚀 Iniciando proceso de Seed...");
    await truncate();
    await insertMainCategories();
    await insertSecondaryCategories();
    await insertProducts();
    await insertVariants();
    console.log("🏁 PROCESO COMPLETADO CON ÉXITO");
  } catch (error) {
    console.error("💀 El proceso falló fatalmente.");
    process.exit(1); // Salir con error
  } finally {
    console.log("👋 Cerrando conexión a la base de datos...");
    await pool.end();
  }
};

main();
