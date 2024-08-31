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
exports.getMeasurements = void 0;
const database_1 = __importDefault(require("../config/database")); // Ajuste o caminho conforme necessário
const getMeasurements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer_code } = req.params; // Código do cliente
    const { measure_type } = req.query; // Tipo de medida opcional
    // Validar o parâmetro measure_type
    const measureType = typeof measure_type === "string" ? measure_type : undefined;
    const validMeasureTypes = ["WATER", "GAS"];
    if (measure_type && !validMeasureTypes.includes(measureType.toUpperCase())) {
        return res.status(400).json({
            error_code: "INVALID_TYPE",
            error_description: "Tipo de medição não permitida",
        });
    }
    try {
        // Construir a consulta SQL
        let query = `SELECT measure_uuid, created_at AS measure_datetime, reading_type AS measure_type, confirmed AS has_confirmed, image_base64 AS image_url 
                 FROM your_table 
                 WHERE customer_code = $1`;
        const queryParams = [customer_code];
        if (measure_type) {
            query += ` AND reading_type ILIKE $2`; // Case insensitive search
            queryParams.push(measureType.toUpperCase());
        }
        // Executar a consulta
        const { rows } = yield database_1.default.query(query, queryParams);
        if (rows.length === 0) {
            return res.status(404).json({
                error_code: "MEASURES_NOT_FOUND",
                error_description: "Nenhuma leitura encontrada",
            });
        }
        // Formatar a resposta
        const measures = rows.map((row) => ({
            measure_uuid: row.measure_uuid,
            measure_datetime: row.measure_datetime,
            measure_type: row.measure_type,
            has_confirmed: row.has_confirmed,
            image_url: row.image_url,
        }));
        return res.status(200).json({
            customer_code: customer_code,
            measures,
        });
    }
    catch (error) {
        console.error("Error processing request:", error);
        return res.status(500).json({
            error_code: "INTERNAL_SERVER_ERROR",
            error_description: "Erro ao processar a solicitação.",
            error_details: error.message,
        });
    }
});
exports.getMeasurements = getMeasurements;
