import express from "express";
import { LoginFunction, SignupFunction } from "../controllers/auth";
const router = express.Router();

router.route("/login").post(LoginFunction);
router.route("/signup").post(SignupFunction);

export default router;
