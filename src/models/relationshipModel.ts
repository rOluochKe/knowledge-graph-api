import { pool } from '../db';
import { RelationshipType } from '../types';

export const createRelationship = async (
  fromNode: number,
  toNode: number,
  relationship: string
): Promise<RelationshipType> => {
  const client = await pool.connect();
  try {
    const result = await client.query<RelationshipType>(
      'INSERT INTO relationships (fromNode, toNode, relationship) VALUES ($1, $2, $3) RETURNING id',
      [fromNode, toNode, relationship]
    );
    return { id: result.rows[0].id, fromNode, toNode, relationship };
  } catch (error) {
    console.error('Error creating relationship:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const getAllRelationships = async (): Promise<RelationshipType[]> => {
  const client = await pool.connect();
  try {
    const result = await client.query<RelationshipType>('SELECT * FROM relationships');
    return result.rows;
  } catch (error) {
    console.error('Error fetching relationships:', error);
    throw error;
  } finally {
    client.release();
  }
};
