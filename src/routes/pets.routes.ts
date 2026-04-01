import express from "express";
import type { Router } from "express";

import { getPets, getPetById } from "../controllers/pets.controllers";

export const petRouter: Router = express.Router();

petRouter.get("/", getPets);
petRouter.get("/:id", getPetById);
