import { Router } from "express";
import { getAllProducts } from "../controllers/product.controller.js";

const router = Router();
console.log("router");

router.get("/", getAllProducts);

export default router;
