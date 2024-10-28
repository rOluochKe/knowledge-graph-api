import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const initializeDb = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS nodes (
        id SERIAL PRIMARY KEY,
        name TEXT,
        type TEXT
      );

      CREATE TABLE IF NOT EXISTS relationships (
        id SERIAL PRIMARY KEY,
        fromNode INTEGER REFERENCES nodes(id),
        toNode INTEGER REFERENCES nodes(id),
        relationship TEXT
      );
    `);
  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    client.release();
  }
};
