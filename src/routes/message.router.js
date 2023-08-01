import { Router } from "express";
import * as messageController from "../controllers/message.controller.js";

const router = Router();

router.get("/", messageController.getAll);
router.post("/", messageController.newMessage);

export default router;