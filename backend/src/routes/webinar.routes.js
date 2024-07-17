import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { regiterWbinar } from "../controllers/webinar.controller.js";

const router = Router();

router.post("/", verifyJWT, regiterWbinar)

export default router