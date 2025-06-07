import express from "express";
import {
  addCategory,
  deletecategory,
  editCategory,
  getAllCategories,
  getAllUsers,
} from "../controllers/Admin.controller.js";
import { verifyAdmin, verifyUser } from "../middleware/Auth.midddleware.js";

const router = express.Router();

router.get("/all-users", verifyUser, verifyAdmin, getAllUsers);
router.get("/categories",verifyUser, getAllCategories);
router.post("/categories", verifyUser, verifyAdmin, addCategory);
router.patch("/categories/:id", verifyUser, verifyAdmin, editCategory);
router.delete("/categories/:id", verifyUser, verifyAdmin, deletecategory);

export default router;
