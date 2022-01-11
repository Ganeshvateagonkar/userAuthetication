import { Router } from "express";
const router = Router();
import {
  HomePage,
  LoginGet,
  LoginPost,
  Logout,
  SignUpGet,
  SignUpPost,
} from "../controllers/userController.js";
router.get("/", HomePage);
router.get("/login", LoginGet);
router.get("/signup", SignUpGet);
router.post("/login", LoginPost);
router.post("/signup", SignUpPost);
router.get("/logout", Logout);

export default router;
