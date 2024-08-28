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
  },
});

export const fetchDataFromGemini = async (endpoint: string) => {
  try {
    const response = await instance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from Gemini:", error);
    throw error;
  }
};
