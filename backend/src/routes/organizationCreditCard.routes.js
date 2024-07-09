import express from 'express';
import { addCardDetails, getOrganizationDetails } from '../controllers/organizationCreditCard.controller.js';
import {verifyJWT} from '../middlewares/auth.middleware.js'

const router = express.Router();

router.post('/add', verifyJWT ,addCardDetails);
router.get('/:organizationId', verifyJWT, getOrganizationDetails);

export default router;