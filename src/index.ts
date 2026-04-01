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

app.get(
  "/",
  (
    req: Request<{}, unknown, {}, { species?: string }>,
    res: Response<Pet[]>,
  ) => {
    const { species } = req.query;
    let filteredPets: Pet[] = pets;
    if (species) {
      filteredPets = filteredPets.filter(
        (pet: Pet): boolean =>
          pet.species.toLowerCase() === species.toLowerCase(),
      );
    }
    res.json(filteredPets);
  },
);

app.get(
  "/:id",
  (
    req: Request<{ id: string }>,
    res: Response<Pet | { success: boolean; message: string }>,
  ): void => {
    const { id } = req.params;
    const pet: Pet | undefined = pets.find(
      (pet: Pet): boolean => pet.id === parseInt(id),
    );
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ success: false, message: "No pet with that ID" });
    }
  },
);

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
