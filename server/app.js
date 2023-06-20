import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import todoRouter from "./routes/todoRoute.js";

dotenv.config({
  path: "config/config.env",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api/v1/todos", todoRouter);

export default app;
