import express from "express";
import {
  GetAllUsers,
  GetSingleUser,
  LoginFunction,
  SignupFunction,
} from "../controllers/auth";
import { middleware } from "../middlewares";
const router = express.Router();

router.route("/login").post(LoginFunction);
router.route("/signup").post(SignupFunction);
router.route("/getUsers").get(middleware, GetAllUsers);
router.route("/getSingleUser/:id").get(middleware, GetSingleUser);

export default router;
