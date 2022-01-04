import { Router } from "express";
const router = Router();
import {
  LoginGet,
  LoginPost,
  SignUpGet,
  SignUpPost,
} from "../controllers/userController.js";

router.get("/login", LoginGet);
router.get("/signup", SignUpGet);
router.post("/login", LoginPost);
router.post("/signup", SignUpPost);

export default router;
