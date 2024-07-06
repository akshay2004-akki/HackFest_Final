import { Router } from "express";
import { getUserDetails, loginUser, logOutUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logOutUser)
router.route("/user-details").get(verifyJWT,getUserDetails)


export default router