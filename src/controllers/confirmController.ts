import { Request, Response } from "express";
import pool from "../config/database";

export const patchConfirm = async (req: Request, res: Response) => {
  const { measure_uuid, confirmed_value } = req.body;
  console.log("measure_uuid", typeof measure_uuid);
  console.log("confirmed_value", typeof confirmed_value);

  // 1. Validar o tipo de dados dos parâmetros enviados
  if (typeof measure_uuid !== "string" || typeof confirmed_value !== "number") {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description:
        "Os dados fornecidos no corpo da requisição são inválidos. Esperado `measure_uuid` como string e `confirmed_value` como número.",
    });
  }

  try {
    // 2. Verificar se o código de leitura informado existe
    const { rows: existingRows } = await pool.query(
      "SELECT * FROM your_table WHERE measure_uuid = $1",
      [measure_uuid]
    );
    console.log("existingRows", existingRows);
    if (existingRows.length === 0) {
      return res.status(404).json({
        error_code: "MEASURE_NOT_FOUND",
        error_description: "Leitura não encontrada.",
      });
    }

    const existingReading = existingRows[0];
    console.log("existingReading", existingReading);

    // 3. Verificar se o código de leitura já foi confirmado
    if (existingReading.confirmed) {
      return res.status(409).json({
        error_code: "ALREADY_CONFIRMED",
        error_description: "Leitura já confirmada.",
      });
    }

    // 4. Salvar no banco de dados o novo valor informado
    await pool.query(
      "UPDATE your_table SET confirmed = true, confirmed_value = $1 WHERE measure_uuid = $2",
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
