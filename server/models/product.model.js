import pool from "../pg/db.js";

const getAllProducts = async () => {
  const result = await pool.query("SELECT * FROM product");
  return result.rows;
};

// const getAllProducts = async () => {
//   const result = await sql`SELECT * FROM product`;
//   return result;
// };

export { getAllProducts };
