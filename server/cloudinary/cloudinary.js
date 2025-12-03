import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const folders = [
  "Hero",
  "Over-Ear-Basic",
  "Over-Ear-Pro",
  "Over-Ear-Advance",
  "In-Ear-Basic",
  "In-Ear-Pro",
  "Portable-Basic",
  "Portable-Pro",
  "Soundbar-Basic",
  "Soundbar-Pro",
];

const getPhotosByProduct = async () => {
  console.log("🔄 Connecting to Cloudinary...");

  const productos = {};

  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      max_results: 100,
    });

    console.log(result.resources);
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

getPhotosByProduct();
