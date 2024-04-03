import express, { Express, Request, Response } from "express";
import { connectDB } from "./config/dbConfig";

require("dotenv").config();

connectDB();

const app: Express = express();

app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));

const port = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello, this is Express + TypeScript" });
});

app.listen(port, () => {
  console.log(`Server running at https://localhost:${port}`);
});
