import { Router } from "express";
import { createStore, listStores } from "../services/stores";
import { signIn } from "../services/auth";

export const router = Router();

router.get("/stores", listStores);
router.post("/stores", createStore);

router.post("/auth", signIn);
