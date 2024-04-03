"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConfig_1 = require("./config/dbConfig");
require("dotenv").config();
(0, dbConfig_1.connectDB)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/users", require("./routes/userRoutes"));
const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello, this is Express + TypeScript" });
});
app.listen(port, () => {
    console.log(`Server running at https://localhost:${port}`);
});
