import { Request, Response } from "express";
import pool from "../config/database";

export const getMeasurements = async (req: Request, res: Response) => {
  const { customerCode } = req.params;
  const { measure_type } = req.query;

  const measureType: any =
    typeof measure_type === "string" ? measure_type : undefined;
  const validMeasureTypes = ["WATER", "GAS"];
  if (measure_type && !validMeasureTypes.includes(measureType.toUpperCase())) {
    return res.status(400).json({
      error_code: "INVALID_TYPE",
      error_description: "Tipo de medição não permitida",
    });
  }

  try {
    let query = `SELECT measure_uuid, created_at AS measure_datetime, reading_type AS measure_type, confirmed AS has_confirmed, image_base64 AS image_url 
                 FROM your_table 
                 WHERE customer_code = $1`;

    const queryParams: any[] = [customerCode];

    if (measure_type) {
      query += ` AND reading_type ILIKE $2`;
      queryParams.push(measureType.toUpperCase());
    }

    const { rows } = await pool.query(query, queryParams);

    if (rows.length === 0) {
      return res.status(404).json({
        error_code: "MEASURES_NOT_FOUND",
        error_description: "Nenhuma leitura encontrada",
      });
    }

    const measures = rows.map((row) => ({
      measure_uuid: row.measure_uuid,
      measure_datetime: row.measure_datetime,
      measure_type: row.measure_type,
      has_confirmed: row.has_confirmed,
      image_url: row.image_url,
    }));

    return res.status(200).json({
      customer_code: customerCode,
      measures,
    });
  } catch (error: any) {
    console.error("Error processing request:", error);
    return res.status(500).json({
      error_code: "INTERNAL_SERVER_ERROR",
      error_description: "Erro ao processar a solicitação.",
      error_details: error.message,
    });
  }
};
