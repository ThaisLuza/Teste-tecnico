import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import pool from "../config/database";

export const postAnalyzeImage = async (req: Request, res: Response) => {
  const { imageBase64, readingType, customer_code } = req.body;

  try {
    if (!imageBase64 || !readingType) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description:
          "Os dados fornecidos no corpo da requisição são inválidos.",
      });
    }

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const { rows } = await pool.query(
      "SELECT * FROM dataImage WHERE reading_type = $1 AND EXTRACT(MONTH FROM created_at) = $2 AND EXTRACT(YEAR FROM created_at) = $3",
      [readingType, currentMonth, currentYear]
    );

    const existingReading = rows.length > 0;

    if (existingReading) {
      const existingMeasureUuid = rows[0].measure_uuid;
      await pool.query(
        "UPDATE dataImage SET confirmed = true WHERE measure_uuid = $1",
        [existingMeasureUuid]
      );
      return res.status(409).json({
        error_code: "DOUBLE_REPORT",
        error_description: "Leitura do mês já realizada",
      });
    }

    const measureValue = Math.floor(Math.random() * 100);
    const measureUuid = uuidv4();
    const imageUrl = `http://localhost:3000/temp/${measureUuid}.png`;

    await insertReading(imageBase64, readingType, measureUuid, customer_code);

    return res.status(200).json({
      image_url: imageUrl,
      measure_value: measureValue,
      measure_uuid: measureUuid,
    });
  } catch (error: any) {
    console.error("Error processing request:", error);
    return res.status(500).json({
      error_code: "INTERNAL_SERVER_ERROR",
      error_description: "Erro ao processar a imagem.",
      error_details: error.message,
    });
  }
};

const insertReading = async (
  imageBase64: string,
  readingType: string,
  measureUuid: string,
  customerCode: string
) => {
  try {
    await pool.query(
      "INSERT INTO dataImage (image_base64, reading_type, measure_uuid, customer_code) VALUES ($1, $2, $3, $4)",
      [imageBase64, readingType, measureUuid, customerCode]
    );
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};
