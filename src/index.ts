import "dotenv/config";
import express from "express";
import type { Express } from "express";

const PORT = process.env.PORT || 8000;
const app: Express = express();

type Pet = {
  name: string;
  species: string;
  adopted: boolean;
  age: number;
};

const pet: Pet = {
  name: "Augusto",
  species: "dog",
  adopted: true,
  age: 1,
};

app.get("/", (req, res) => {
  res.json(pet);
});

app.listen(PORT, (): void => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
