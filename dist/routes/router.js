"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const geminiController_1 = require("../controllers/geminiController");
const router = (0, express_1.Router)();
// router.get("/gemini-data", getGeminiData);
router.post("/upload", geminiController_1.postAnalyzeImage);
exports.default = router;
