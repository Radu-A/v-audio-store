import pool from "../config/db.js";

const getAllProducts = async () => {
  const result = await pool.query("SELECT * FROM product");
  return result.rows;
};

export { getAllProducts };
