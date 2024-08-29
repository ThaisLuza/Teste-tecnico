import pool from "../config/database";

export const checkIfReadingExists = async (
  readingType: string,
  month: number
): Promise<boolean> => {
  const query = `
    SELECT 1
    FROM readings
    WHERE reading_type = $1 AND EXTRACT(MONTH FROM created_at) = $2
    LIMIT 1;
  `;

  const result = (await pool.query(query, [readingType, month])) as any;
  return result.rowCount > 0;
};
