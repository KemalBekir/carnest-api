"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = 8000;
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Hello from express + TS");
});
app.get("/hi", (req, res) => {
    res.send("Ciao");
});
app.listen(PORT, () => {
    console.log(`now listening on port ${PORT}`);
});
