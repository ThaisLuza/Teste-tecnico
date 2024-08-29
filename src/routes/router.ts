import { Router } from "express";
import { postAnalyzeImage } from "../controllers/geminiController";

const router = Router();

// router.get("/gemini-data", getGeminiData);
router.post("/upload", postAnalyzeImage);

export default router;
