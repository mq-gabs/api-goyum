import { Router } from "express";
import { createStore, listStores } from "../services/stores";
import { signIn } from "../services/auth";
import {
  createProduct,
  listMyProducts,
  listProducts,
  updateProduct,
} from "../services/products";
import { ensureAuth } from "../middleware/ensure-auth";

export const router = Router();

router.get("/stores", listStores);
router.post("/stores", createStore);

router.post("/auth", signIn);

router.get("/products", ensureAuth, listMyProducts);
router.get("/products/:store_id", listProducts);
router.post("/products", ensureAuth, createProduct);
router.patch("/products/:id", ensureAuth, updateProduct);
