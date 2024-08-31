"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAnalyzeImage = void 0;
const uuid_1 = require("uuid");
const database_1 = __importDefault(require("../config/database"));
const postAnalyzeImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { imageBase64, readingType, customer_code } = req.body;
    console.log("customer_code", customer_code);
    try {
        if (!imageBase64 || !readingType) {
            return res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "Os dados fornecidos no corpo da requisição são inválidos.",
            });
        }
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        const { rows } = yield database_1.default.query("SELECT * FROM your_table WHERE reading_type = $1 AND EXTRACT(MONTH FROM created_at) = $2 AND EXTRACT(YEAR FROM created_at) = $3", [readingType, currentMonth, currentYear]);
        const existingReading = rows.length > 0;
        if (existingReading) {
            const existingMeasureUuid = rows[0].measure_uuid;
            yield database_1.default.query("UPDATE your_table SET confirmed = true WHERE measure_uuid = $1", [existingMeasureUuid]);
            return res.status(409).json({
                error_code: "DOUBLE_REPORT",
                error_description: "Leitura do mês já realizada",
            });
        }
        const measureValue = Math.floor(Math.random() * 100);
        const measureUuid = (0, uuid_1.v4)();
        const imageUrl = `http://localhost:3000/temp/${measureUuid}.png`;
        yield insertReading(imageBase64, readingType, measureUuid, customer_code);
        return res.status(200).json({
            image_url: imageUrl,
            measure_value: measureValue,
            measure_uuid: measureUuid,
        });
    }
    catch (error) {
        console.error("Error processing request:", error);
        return res.status(500).json({
            error_code: "INTERNAL_SERVER_ERROR",
            error_description: "Erro ao processar a imagem.",
            error_details: error.message,
        });
    }
});
exports.postAnalyzeImage = postAnalyzeImage;
const insertReading = (imageBase64, readingType, measureUuid, customerCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.query("INSERT INTO your_table (image_base64, reading_type, measure_uuid, customer_code) VALUES ($1, $2, $3, $4)", [imageBase64, readingType, measureUuid, customerCode]);
    }
    catch (error) {
        console.error("Error inserting data:", error);
        throw error;
    }
});
