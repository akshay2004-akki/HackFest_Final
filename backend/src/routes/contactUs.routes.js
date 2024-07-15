import {Router} from 'express'
import { submitContactForm } from '../controllers/contactUs.controller.js'
import {verifyJWT} from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/' ,submitContactForm)

export default router