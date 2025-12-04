import "dotenv/config";
import fs from "fs/promises";
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

// const folders = {
//   Hero: "Hero",
//   "V-Mute Core": "Over-Ear-Basic",
//   "V-Mute Advance": "Over-Ear-Pro",
//   "V-Mute Pro": "Over-Ear-Advance",
//   "V-Flow Go": "In-Ear-Basic",
//   "V-Flow ANC": "In-Ear-Pro",
//   "V-Roam Mini": "Portable-Basic",
//   "V-Roam Beast": "Portable-Pro",
//   "V-Stage Solo": "Soundbar-Basic",
//   "V-Stage Cinema 300": "Soundbar-Pro",
// };

const createFile = async (name, content) => {
  try {
    const fileContent = `export const ${name.replace(/-/g, "_")} = ${content};`;
    await fs.writeFile(`./cloudinary/${name}.js`, fileContent);
    console.log(`File ${name}.js created.`);
  } catch (error) {
    console.error(`Error creating file ${name}.js: ${error}.`);
  }
};

const getPhotosByProduct = async (folder) => {
  console.log(`🔄 Connecting to folder: ${folder}...`);

  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      max_results: 20,
      prefix: folder,
    });
    return result.resources;
  } catch (error) {
    console.error(`❌ Error in folder ${folder}:`, error);
    return [];
  }
};

const getAllPhotos = async () => {
  const promises = folders.map(async (folder) => {
    const data = await getPhotosByProduct(folder);
    const publicIds = data.map((item) => item.public_id);
    const content = JSON.stringify(publicIds);
    createFile(folder, content);
  });
  try {
    await Promise.all(promises);
    console.log("Finished! All files have been created.");
  } catch (error) {
    console.error("There was an error in the global process:", error);
  }
};

getAllPhotos();
