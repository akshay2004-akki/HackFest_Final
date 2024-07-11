import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addStudentCardDetails, getStudentCardDetails } from "../controllers/studenCredit.controller.js";

const router = Router();

router.post('/student-credit', verifyJWT ,addStudentCardDetails);
router.get('/:studentId', verifyJWT, getStudentCardDetails)

export default router