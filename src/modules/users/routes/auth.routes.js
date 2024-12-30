import express from 'express'
import { registerUser, loginUser, logoutUser, profileUser } from '../controllers/auth.controller.js'
import { authRequired } from '../../../middlewares/jwt.js'
import { registerValidation, loginValidation } from '../validators/auth.validators.js'
import { validateResult } from '../../../middlewares/validations.middleware.js'

const router = express.Router()

router.post('/register', registerValidation, validateResult, registerUser)
router.post('/login', loginValidation, validateResult, loginUser)
router.post('/logout', authRequired, logoutUser)
router.get('/profile', authRequired, profileUser)

export default router