import { Pool } from "pg";
import * as dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const createTable = async () => {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS dataImage;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS dataImage (
        id SERIAL PRIMARY KEY,
        reading_type VARCHAR(255) NOT NULL,
        customer_code VARCHAR(255),
        image_base64 TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        confirmed BOOLEAN DEFAULT FALSE,
        confirmed_value INTEGER,
        measure_uuid VARCHAR(36)
      );
    `);

    console.log("Tabela criada com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tabela:", error);
  }
};

createTable();

export default pool;
