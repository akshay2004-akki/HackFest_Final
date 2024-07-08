import { Router } from "express";
import { getUserDetails, loginUser, logOutUser, registerUser, updateTasks } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logOutUser)
router.route("/user-details").get(verifyJWT,getUserDetails)
router.put('/update-tasks', verifyJWT, upload.array('uploadedImages', 30), updateTasks);


export default router