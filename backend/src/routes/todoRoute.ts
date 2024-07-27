import { Router } from "express";
import { authenticateToken } from "../middleware/verifyJWT";
import {
  create_Todo,
  delete_Todo,
  edit_Todo,
  get_Todo,
} from "../controllers/todoController";
const router = Router();

router.post("/create_todo", authenticateToken, create_Todo);
router.put("/edit_todo", authenticateToken, edit_Todo);
router.get("/get_todo", authenticateToken, get_Todo);
router.get("/delete_todo", authenticateToken, delete_Todo);

export default router;
