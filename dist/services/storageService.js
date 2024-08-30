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
exports.saveImageToTemporaryStorage = void 0;
// import { v4 as uuidv4 } from "uuid";
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const saveImageToTemporaryStorage = (imageBase64, guid) => __awaiter(void 0, void 0, void 0, function* () {
    const imageBuffer = Buffer.from(imageBase64, "base64");
    const imagePath = path_1.default.join(__dirname, "../../temp", `${guid}.png`);
    yield fs_1.default.promises.writeFile(imagePath, imageBuffer);
    return `http://localhost:3000/temp/${guid}.png`;
});
exports.saveImageToTemporaryStorage = saveImageToTemporaryStorage;
