import express from "express";
import {
  createProduct,
  getAllActiveProducts,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllActiveProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
