import { Router } from "express";
import { getGeminiData } from "../controllers/geminiController";

const router = Router();

router.get("/gemini-data", getGeminiData);

export default router;
