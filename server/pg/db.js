import { Pool } from "pg";
import "dotenv/config";

// Conexion with parameters
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

// Conexion with URL
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

pool.on("connect", () => {
  console.log("Database succesfully conected");
});

export default pool;
