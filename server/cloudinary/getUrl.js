import fs from "fs/promises";
import "dotenv/config";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

const authString = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");

const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload`;

const filterData = (data) => {
  return data.resources.map((resource) => resource.public_id);
};

const createFile = async (content) => {
  try {
    await fs.writeFile("cloudinaryUrls.js", content);
    console.log("Creado!");
  } catch (err) {
    console.log(err);
  }
};

const fetchCloudinary = async () => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        // Aquí es donde ocurre la magia del Basic Auth
        Authorization: `Basic ${authString}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `Error HTTP: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    const filtered = filterData(data);
    console.log(filtered);

    // const content = JSON.stringify(data);
    // await createFile(content);
  } catch (error) {
    console.error("Falló la petición:", error);
  }
};

fetchCloudinary();
