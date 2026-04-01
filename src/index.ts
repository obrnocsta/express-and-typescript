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

type PetQueryParams = {
  species?: string;
  adopted?: "true" | "false";
  minAge?: string;
  maxAge?: string;
};

app.get(
  "/",
  (req: Request<{}, unknown, {}, PetQueryParams>, res: Response<Pet[]>) => {
    const { species, adopted, minAge, maxAge } = req.query;
    let filteredPets: Pet[] = pets;
    if (species) {
      filteredPets = filteredPets.filter(
        (pet: Pet): boolean =>
          pet.species.toLowerCase() === species.toLowerCase(),
      );
    }
    if (adopted) {
      filteredPets = filteredPets.filter(
        (pet: Pet): boolean => pet.adopted === JSON.parse(adopted),
      );
    }
    if (minAge) {
      filteredPets = filteredPets.filter(
        (pet: Pet): boolean => pet.age >= parseInt(minAge),
      );
    }
    if (maxAge) {
      filteredPets = filteredPets.filter(
        (pet: Pet): boolean => pet.age <= parseInt(maxAge),
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
