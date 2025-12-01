import { Router } from "express";
import { getProducts } from "../controllers/product.controller.js";

const router = Router();
console.log("router");

router.get("/", getProducts);

export default router;
