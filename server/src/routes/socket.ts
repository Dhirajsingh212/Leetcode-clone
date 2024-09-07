import express from "express";

import { middleware } from "../middlewares";
import { GetAllMessages } from "../controllers/socket";
const router = express.Router();

router.route("/getAllMessages").post(middleware, GetAllMessages);

export default router;
