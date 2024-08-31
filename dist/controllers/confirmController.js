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
exports.patchConfirm = void 0;
const database_1 = __importDefault(require("../config/database"));
const patchConfirm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { measure_uuid, confirmed_value } = req.body;
    console.log("measure_uuid", typeof measure_uuid);
    console.log("confirmed_value", typeof confirmed_value);
    // 1. Validar o tipo de dados dos parâmetros enviados
    if (typeof measure_uuid !== "string" || typeof confirmed_value !== "number") {
        return res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "Os dados fornecidos no corpo da requisição são inválidos. Esperado `measure_uuid` como string e `confirmed_value` como número.",
        });
    }
    try {
        // 2. Verificar se o código de leitura informado existe
        const { rows: existingRows } = yield database_1.default.query("SELECT * FROM your_table WHERE measure_uuid = $1", [measure_uuid]);
        console.log("existingRows", existingRows);
        if (existingRows.length === 0) {
            return res.status(404).json({
                error_code: "MEASURE_NOT_FOUND",
                error_description: "Leitura não encontrada.",
            });
        }
        const existingReading = existingRows[0];
        console.log("existingReading", existingReading);
        // 3. Verificar se o código de leitura já foi confirmado
        if (existingReading.confirmed) {
            return res.status(409).json({
                error_code: "ALREADY_CONFIRMED",
                error_description: "Leitura já confirmada.",
            });
        }
        // 4. Salvar no banco de dados o novo valor informado
        yield database_1.default.query("UPDATE your_table SET confirmed = true, confirmed_value = $1 WHERE measure_uuid = $2", [confirmed_value, measure_uuid]);
        return res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        console.error("Erro ao processar a solicitação:", error);
        return res.status(500).json({
            error_code: "INTERNAL_SERVER_ERROR",
            error_description: "Erro ao processar a solicitação.",
            error_details: error.message,
        });
    }
});
exports.patchConfirm = patchConfirm;
