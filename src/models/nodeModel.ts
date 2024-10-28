import { pool } from '../db';
import { NodeType } from '../types';

export const createNode = async (name: string, type: string): Promise<NodeType> => {
  const client = await pool.connect();
  try {
    const result = await client.query<NodeType>(
      'INSERT INTO nodes (name, type) VALUES ($1, $2) RETURNING id',
      [name, type]
    );
    return { id: result.rows[0].id, name, type };
  } catch (error) {
    console.error('Error creating node:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const getAllNodes = async (): Promise<NodeType[]> => {
  const client = await pool.connect();
  try {
    const result = await client.query<NodeType>('SELECT * FROM nodes');
    return result.rows;
  } catch (error) {
    console.error('Error fetching nodes:', error);
    throw error;
  } finally {
    client.release();
  }
};
