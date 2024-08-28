import { Request, Response } from "express";
import { fetchDataFromGemini } from "../services/geminiService";

export const getGeminiData = async (req: Request, res: Response) => {
  try {
    const data = await fetchDataFromGemini(
      "https://ai.google.dev/gemini-api/docs/vision"
    ); // Substitua pelo endpoint real
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data" });
  }
};
