import { Router } from "express";
import { postAnalyzeImage } from "../controllers/analyzeImageController";
import { patchConfirm } from "../controllers/confirmController";
import { getMeasurements } from "../controllers/getMeasurementsController";

const router = Router();

// router.get("/gemini-data", getGeminiData);
router.post("/upload", postAnalyzeImage);
router.patch("/confirm", patchConfirm);
router.get("/list", getMeasurements);

export default router;
