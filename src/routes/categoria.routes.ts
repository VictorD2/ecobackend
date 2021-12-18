import { Router } from "express";
import { createCategory, editCategory, getAllCategories, enableCategory, deleteCategory } from "../controllers/categoria.controller";

const router = Router();

router.get("/", getAllCategories);
router.post("/", createCategory);
router.put("/:id", editCategory);
router.patch("/:id", enableCategory);
router.delete("/:id", deleteCategory);

export default router;
