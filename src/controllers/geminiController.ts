import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const postAnalyzeImage = async (req: Request, res: Response) => {
  const { imageBase64, readingType } = req.body;

  try {
    if (!imageBase64 || !readingType) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description:
          "Os dados fornecidos no corpo da requisição são inválidos.",
      });
    }

    const currentMonth = new Date().getMonth() + 1;
    const existingReading = false;

    if (existingReading) {
      return res.status(409).json({
        error_code: "DOUBLE_REPORT",
        error_description: "Leitura do mês já realizada",
      });
    }

    const measureValue = Math.floor(Math.random() * 100);
    const measureUuid = uuidv4();
    const imageUrl = `http://localhost:3001/temp/${measureUuid}.png`;

    return res.status(200).json({
      image_url: imageUrl,
      measure_value: measureValue,
      measure_uuid: measureUuid,
    });
  } catch (error) {
    return res.status(500).json({
      error_code: "INTERNAL_SERVER_ERROR",
      error_description: "Erro ao processar a imagem.",
    });
  }
};
