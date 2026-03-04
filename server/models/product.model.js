import pool from "../pg/db.js";

import { getAllProductsQuery } from "../pg/queries.js";

const getAllProductsModel = async () => {
  try {
    const response = await pool.query(getAllProductsQuery);
    console.log(response);
    return response.rows;
  } catch (error) {
    console.error(`Something went wrong in model: ${error}`);
    throw error;
  }
};

export { getAllProductsModel };
