import { Router } from "express";
import { createProduct, disableProduct, editProduct, getAllProducts, getProducto } from "../controllers/producto.controller";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProducto);
router.post("/", createProduct);
router.put("/:id", editProduct);
router.patch("/:id", disableProduct);

export default router;
