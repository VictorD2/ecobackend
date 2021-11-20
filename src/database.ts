import { createPool } from "mysql2/promise";

export async function connect() {
  try {
    const connection = await createPool({
      host: process.env.BD_HOST,
      user: process.env.BD_USER,
      // password:process.env.BD_PASSWORD,
      database: process.env.BD_NAME,
      port: parseInt(process.env.BD_PORT || "3306"),
      connectionLimit: 10,
    });
    return connection;
  } catch (error) {
    console.log(error);
  }
}
