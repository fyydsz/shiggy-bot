import express, { Request, Response } from "express";
import logger from "./utils/logger";
import mongoose from "mongoose";
import CustomClient from "./ts-module/classes/CustomClient";
(new CustomClient).Init();
import { configDotenv } from "dotenv";
const env = configDotenv();

const mongourl = process.env.MONGOURL;
mongoose.connect(mongourl!).then((): void => {
  console.log(`Successfully connected to MongoDB`);
});

const app = express();
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

const PORT: number = 3000;
app.listen(PORT, () => {
  console.log(`Listening to port 3000`);
})

process.on("uncaughtException", (err): void => {
  console.error(err);
  logger.error("Error!", err);
});

process.on("unhandledRejection", (err): void => {
  console.error(err);
  logger.error("Error!", err);
});