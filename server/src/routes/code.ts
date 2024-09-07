import express from "express";
import { SubmitFunction } from "../controllers/code";
const router = express.Router();

router.route("/submit").post(SubmitFunction);

export default router;
