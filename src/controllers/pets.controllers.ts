import type { Request, Response } from "express";

import { pets } from "../data/pets";
import type { Pet } from "../data/pets";

type PetQueryParams = {
  species?: string;
  adopted?: "true" | "false";
  minAge?: string;
  maxAge?: string;
};

export const getPets = (
  req: Request<{}, unknown, {}, PetQueryParams>,
  res: Response<Pet[]>,
) => {
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
};

export const getPetById = (
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
};
