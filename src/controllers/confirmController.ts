import { Request, Response } from "express";
import pool from "../config/database";

export const patchConfirm = async (req: Request, res: Response) => {
  const { measure_uuid, confirmed_value } = req.body;

  if (typeof measure_uuid !== "string" || typeof confirmed_value !== "number") {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description:
        "Os dados fornecidos no corpo da requisição são inválidos. Esperado `measure_uuid` como string e `confirmed_value` como número.",
    });
  }

  try {
    const { rows: existingRows } = await pool.query(
      "SELECT * FROM dataImage WHERE measure_uuid = $1",
      [measure_uuid]
    );
    if (existingRows.length === 0) {
      return res.status(404).json({
        error_code: "MEASURE_NOT_FOUND",
        error_description: "Leitura não encontrada.",
      });
    }

    const existingReading = existingRows[0];

    if (existingReading.confirmed) {
      return res.status(409).json({
        error_code: "ALREADY_CONFIRMED",
        error_description: "Leitura já confirmada.",
      });
    }

    await pool.query(
      "UPDATE dataImage SET confirmed = true, confirmed_value = $1 WHERE measure_uuid = $2",
      [confirmed_value, measure_uuid]
    );

    return res.status(200).json({
      success: true,
    });
  } catch (error: any) {
    console.error("Erro ao processar a solicitação:", error);
    return res.status(500).json({
      error_code: "INTERNAL_SERVER_ERROR",
      error_description: "Erro ao processar a solicitação.",
      error_details: error.message,
    });
  }
};
