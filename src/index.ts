import dotenv from "dotenv";
import express from "express";
import type { Express, Request, Response } from "express";
import cors from "cors";

import { pets } from "./data/pets";
import type { Pet } from "./data/pets";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app: Express = express();

app.use(cors());

app.get("/", (req: Request, res: Response<Pet[]>): void => {
  res.json(pets);
});

app.use(
  (
    req: Request,
    res: Response<{ success: boolean; message: string }>,
  ): void => {
    res.status(404).json({ success: false, message: "No route found" });
  },
);

app.listen(PORT, (): void => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
