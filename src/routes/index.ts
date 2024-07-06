import { Router } from "express";
import { createStore, listStores } from "../services/stores";

export const router = Router();

router.get("/stores", listStores);
router.post("/stores", createStore);
