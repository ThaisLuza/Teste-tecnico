import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const BASE_URL = "https://ai.google.dev/gemini-api/docs/vision";
if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});

export const analyzeImageWithGemini = async (imageBase64: string) => {
  try {
    const response = await instance.post("/your-endpoint", {
      image: imageBase64,
    });

    return response.data;
  } catch (error) {
    console.error("Error analyzing image with Gemini:", error);
    throw error;
  }
};
