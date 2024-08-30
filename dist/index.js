"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const router_1 = __importDefault(require("./routes/router"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use("/temp", express_1.default.static(path_1.default.join(__dirname, "../temp")));
app.use("/api", router_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
app.get("/", (req, res) => {
    res.send("Hello, world!");
});
