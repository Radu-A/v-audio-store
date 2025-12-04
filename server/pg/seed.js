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

const PHOTOS_OVER_EAR_BASIC = {
  "Tipo de Driver": "Dinámico de 40mm con diafragma de biocelulosa",
  "Respuesta de Frecuencia": "20Hz - 20kHz",
  Conectividad: "Bluetooth 5.4 / USB-C Audio",
  Batería: "40h (ANC activado) / 60h (ANC desactivado)",
  "Carga Rápida": "10 min de carga = 4h de reproducción",
  Peso: "250g",
  Micrófonos: "8 micrófonos con beamforming",
  Codecs: "AAC, LDAC, aptX Adaptive",
};
const PHOTOS_OVER_EAR_PRO = {
  "Tipo de Driver": "Dinámico de 40mm con diafragma de biocelulosa",
  "Respuesta de Frecuencia": "20Hz - 20kHz",
  Conectividad: "Bluetooth 5.4 / USB-C Audio",
  Batería: "40h (ANC activado) / 60h (ANC desactivado)",
  "Carga Rápida": "10 min de carga = 4h de reproducción",
  Peso: "250g",
  Micrófonos: "8 micrófonos con beamforming",
  Codecs: "AAC, LDAC, aptX Adaptive",
};
const PHOTOS_OVER_EAR_ADVANCE = {
  "Tipo de Driver": "Dinámico de 40mm con diafragma de biocelulosa",
  "Respuesta de Frecuencia": "20Hz - 20kHz",
  Conectividad: "Bluetooth 5.4 / USB-C Audio",
  Batería: "40h (ANC activado) / 60h (ANC desactivado)",
  "Carga Rápida": "10 min de carga = 4h de reproducción",
  Peso: "250g",
  Micrófonos: "8 micrófonos con beamforming",
  Codecs: "AAC, LDAC, aptX Adaptive",
};
const PHOTOS_IN_EAR_BASIC = {
  "Tipo de Driver": "Dinámico de 40mm con diafragma de biocelulosa",
  "Respuesta de Frecuencia": "20Hz - 20kHz",
  Conectividad: "Bluetooth 5.4 / USB-C Audio",
  Batería: "40h (ANC activado) / 60h (ANC desactivado)",
  "Carga Rápida": "10 min de carga = 4h de reproducción",
  Peso: "250g",
  Micrófonos: "8 micrófonos con beamforming",
  Codecs: "AAC, LDAC, aptX Adaptive",
};
const PHOTOS_IN_EAR_PRO = {
  "Tipo de Driver": "Dinámico de 40mm con diafragma de biocelulosa",
  "Respuesta de Frecuencia": "20Hz - 20kHz",
  Conectividad: "Bluetooth 5.4 / USB-C Audio",
  Batería: "40h (ANC activado) / 60h (ANC desactivado)",
  "Carga Rápida": "10 min de carga = 4h de reproducción",
  Peso: "250g",
  Micrófonos: "8 micrófonos con beamforming",
  Codecs: "AAC, LDAC, aptX Adaptive",
};
const PHOTOS_PORTABLE_BASIC = {
  "Tipo de Driver": "Dinámico de 40mm con diafragma de biocelulosa",
  "Respuesta de Frecuencia": "20Hz - 20kHz",
  Conectividad: "Bluetooth 5.4 / USB-C Audio",
  Batería: "40h (ANC activado) / 60h (ANC desactivado)",
  "Carga Rápida": "10 min de carga = 4h de reproducción",
  Peso: "250g",
  Micrófonos: "8 micrófonos con beamforming",
  Codecs: "AAC, LDAC, aptX Adaptive",
};
const PHOTOS_PORTABLE_PRO = {
  "Tipo de Driver": "Dinámico de 40mm con diafragma de biocelulosa",
  "Respuesta de Frecuencia": "20Hz - 20kHz",
  Conectividad: "Bluetooth 5.4 / USB-C Audio",
  Batería: "40h (ANC activado) / 60h (ANC desactivado)",
  "Carga Rápida": "10 min de carga = 4h de reproducción",
  Peso: "250g",
  Micrófonos: "8 micrófonos con beamforming",
  Codecs: "AAC, LDAC, aptX Adaptive",
};
const PHOTOS_SOUNDBAR_BASIC = {
  "Tipo de Driver": "Dinámico de 40mm con diafragma de biocelulosa",
  "Respuesta de Frecuencia": "20Hz - 20kHz",
  Conectividad: "Bluetooth 5.4 / USB-C Audio",
  Batería: "40h (ANC activado) / 60h (ANC desactivado)",
  "Carga Rápida": "10 min de carga = 4h de reproducción",
  Peso: "250g",
  Micrófonos: "8 micrófonos con beamforming",
  Codecs: "AAC, LDAC, aptX Adaptive",
};
const PHOTOS_SOUNDBAR_PRO = {
  "Tipo de Driver": "Dinámico de 40mm con diafragma de biocelulosa",
  "Respuesta de Frecuencia": "20Hz - 20kHz",
  Conectividad: "Bluetooth 5.4 / USB-C Audio",
  Batería: "40h (ANC activado) / 60h (ANC desactivado)",
  "Carga Rápida": "10 min de carga = 4h de reproducción",
  Peso: "250g",
  Micrófonos: "8 micrófonos con beamforming",
  Codecs: "AAC, LDAC, aptX Adaptive",
};
const PHOTOS_HIFI_BASIC = {
  "Tipo de Driver": "Dinámico de 40mm con diafragma de biocelulosa",
  "Respuesta de Frecuencia": "20Hz - 20kHz",
  Conectividad: "Bluetooth 5.4 / USB-C Audio",
  Batería: "40h (ANC activado) / 60h (ANC desactivado)",
  "Carga Rápida": "10 min de carga = 4h de reproducción",
  Peso: "250g",
  Micrófonos: "8 micrófonos con beamforming",
  Codecs: "AAC, LDAC, aptX Adaptive",
};

const folders = [
  PHOTOS_OVER_EAR_BASIC,
  PHOTOS_OVER_EAR_PRO,
  PHOTOS_OVER_EAR_ADVANCE,
  PHOTOS_IN_EAR_BASIC,
  PHOTOS_IN_EAR_PRO,
  PHOTOS_PORTABLE_BASIC,
  PHOTOS_PORTABLE_PRO,
  PHOTOS_SOUNDBAR_BASIC,
  PHOTOS_SOUNDBAR_PRO,
  PHOTOS_HIFI_BASIC,
];

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
